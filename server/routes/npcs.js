const router = require('express').Router();
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

// GET /npcs?partyId=xxx&includeGlobal=true
router.get('/', async (req, res) => {
  const { partyId, includeGlobal } = req.query;
  let query = supabase.from('npcs').select('*').order('name');
  
  if (partyId && includeGlobal === 'true') {
    query = query.or(`party_id.eq.${partyId},is_global.eq.true`);
  } else if (partyId) {
    query = query.eq('party_id', partyId);
  } else {
    query = query.eq('is_global', true);
  }
  
  const { data } = await query;
  res.json(data || []);
});

// POST /npcs
router.post('/', requireAuth, async (req, res) => {
  const { party_id, created_by, name, codename, faction, danger, data, is_global } = req.body;
  try {
    const { data: npc, error } = await supabase.from('npcs').insert({
      party_id, created_by, name, codename: codename || '',
      faction: faction || 'neutro', danger: danger || 'medio',
      data: data || {}, is_global: is_global || false
    }).select().single();
    if (error) throw new Error(error.message);
    res.json(npc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /npcs/:id
router.put('/:id', requireAuth, async (req, res) => {
  const { name, codename, faction, danger, data } = req.body;
  const { data: updated, error } = await supabase
    .from('npcs')
    .update({ name, codename, faction, danger, data, updated_at: new Date().toISOString() })
    .eq('id', req.params.id)
    .eq('is_global', false)
    .select()
    .single();
  res.json(updated || null);
});

// DELETE /npcs/:id
router.delete('/:id', requireAuth, async (req, res) => {
  await supabase.from('npcs').delete().eq('id', req.params.id).eq('is_global', false);
  res.json({ ok: true });
});

module.exports = router;
