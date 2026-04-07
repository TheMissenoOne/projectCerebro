const router = require('express').Router();
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

// GET /players/:id/characters
router.get('/:id/characters', requireAuth, async (req, res) => {
  const { data } = await supabase
    .from('characters')
    .select('id, name, codename, party_id, is_active, created_at, updated_at')
    .eq('player_id', req.params.id)
    .order('created_at', { ascending: false });
  res.json(data || []);
});

// GET /players/:id/party
router.get('/:id/party', requireAuth, async (req, res) => {
  const { data } = await supabase
    .from('party_members')
    .select('*, parties(*)')
    .eq('player_id', req.params.id)
    .single();
  res.json(data ? data.parties : null);
});

module.exports = router;
