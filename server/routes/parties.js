const router = require('express').Router();
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// POST /parties
router.post('/', requireAuth, async (req, res) => {
  const { name, gm_id } = req.body;
  const code = generateCode();
  try {
    const { data, error } = await supabase
      .from('parties')
      .insert({ name, gm_id, code })
      .select()
      .single();
    if (error) throw new Error(error.message);
    
    // Add GM as member automatically
    await supabase.from('party_members').insert({ party_id: data.id, player_id: gm_id });
    
    // Create empty session
    await supabase.from('sessions').insert({ party_id: data.id }).select();
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /parties/gm/:gmId
router.get('/gm/:gmId', requireAuth, async (req, res) => {
  console.log('[GET /parties/gm/:gmId] gmId:', req.params.gmId);
  const { data, error } = await supabase.from('parties').select('*').eq('gm_id', req.params.gmId).single();
  console.log('[GET /parties/gm/:gmId] result:', data, error);
  res.json(data || null);
});

// GET /parties/code/:code
router.get('/code/:code', async (req, res) => {
  const { data } = await supabase.from('parties').select('*').eq('code', req.params.code.toUpperCase()).single();
  if (!data) return res.status(404).json({ error: 'Código inválido' });
  res.json(data);
});

// POST /parties/:id/members
router.post('/:id/members', requireAuth, async (req, res) => {
  const { player_id } = req.body;
  try {
    // ON CONFLICT DO NOTHING per spec
    await supabase.from('party_members').insert({ party_id: req.params.id, player_id });
    // Link existing characters without party
    await supabase.from('characters').update({ party_id: req.params.id }).eq('player_id', player_id).is('party_id', null);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /parties/:id/members
router.get('/:id/members', requireAuth, async (req, res) => {
  const { data } = await supabase
    .from('party_members')
    .select('*, profiles(id, username, display_name, role)')
    .eq('party_id', req.params.id);
  res.json(data || []);
});

// GET /parties/:id/characters
router.get('/:id/characters', requireAuth, async (req, res) => {
  const { data } = await supabase
    .from('characters')
    .select('id, name, codename, player_id, is_active, profiles(display_name)')
    .eq('party_id', req.params.id)
    .order('name');
  res.json(data || []);
});

// GET /parties/:id/session
router.get('/:id/session', requireAuth, async (req, res) => {
  const { data } = await supabase.from('sessions').select('*').eq('party_id', req.params.id).order('created_at', { ascending: false }).limit(1).single();
  res.json(data || null);
});

// POST /parties/:id/session
router.post('/:id/session', requireAuth, async (req, res) => {
  const { title, notes, round, encounter } = req.body;
  try {
    const { data, error } = await supabase
      .from('sessions')
      .upsert({
        party_id: req.params.id,
        title: title || '',
        notes: notes || '',
        round: round || 0,
        encounter: encounter || [],
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
