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
  const playerId = req.params.id;
  
  // First check if user is a member of any party
  const { data: member } = await supabase
    .from('party_members')
    .select('party_id')
    .eq('player_id', playerId)
    .single();
  
  if (member) {
    const { data: party } = await supabase
      .from('parties')
      .select('*')
      .eq('id', member.party_id)
      .single();
    return res.json(party || null);
  }
  
  // Check if user is GM of any party
  const { data: gmParty } = await supabase
    .from('parties')
    .select('*')
    .eq('gm_id', playerId)
    .single();
  
  res.json(gmParty || null);
});

module.exports = router;
