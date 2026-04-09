const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

// POST /characters
router.post('/', requireAuth, async (req, res) => {
  const { player_id, party_id } = req.body;
  const id = uuidv4();
  try {
    const { data, error } = await supabase
      .from('characters')
      .insert({ id, player_id, party_id: party_id || null, name: 'Novo Personagem', data: {} })
      .select()
      .single();
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /characters/:id
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('characters').select('*').eq('id', req.params.id).single();
    if (error || !data) return res.status(404).json({ error: 'Não encontrado' });
    
    // Check ownership or GM of party
    if (data.player_id !== req.user.userId) {
      const { data: party } = await supabase.from('parties').select('id').eq('id', data.party_id).eq('gm_id', req.user.userId).single();
      if (!party) return res.status(403).json({ error: 'Proibido' });
    }
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: 'Não encontrado' });
  }
});

// GET /characters/:id/public
router.get('/:id/public', async (req, res) => {
  const { data, error } = await supabase
    .from('characters')
    .select('id, name, codename, data, foto_base64')
    .eq('id', req.params.id)
    .eq('is_active', true)
    .single();
  if (error || !data) return res.status(404).json({ error: 'Não encontrado' });
  res.json(data);
});

// PUT /characters/:id
router.put('/:id', requireAuth, async (req, res) => {
  const { data, foto_base64, name, codename } = req.body;
  try {
    const { data: updated, error } = await supabase
      .from('characters')
      .upsert({
        id: req.params.id,
        data: data,
        foto_base64: foto_base64 || null,
        name: name || null,
        codename: codename || null,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (!updated) return res.status(404).json({ error: 'Não encontrado ou sem permissão' });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /characters/:id
router.delete('/:id', requireAuth, async (req, res) => {
  await supabase.from('characters').delete().eq('id', req.params.id).eq('player_id', req.user.userId);
  res.json({ ok: true });
});

module.exports = router;
