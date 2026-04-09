const router = require('express').Router();
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

// GET /players/:id/characters
router.get('/:id/characters', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('characters')
      .select('id, name, codename, party_id, is_active, created_at, updated_at')
      .eq('player_id', req.params.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data || []);
  } catch (e) {
    console.error('[/players/:id/characters] Error:', e);
    res.status(500).json({ error: e.message });
  }
});

// GET /players/:id/party
router.get('/:id/party', requireAuth, async (req, res) => {
  const playerId = req.params.id;
  
  console.log('=== GET /players/:id/party ===');
  console.log('playerId:', playerId);
  console.log('playerId type:', typeof playerId);
  
  try {
    // First check if user is a member of any party via party_members
    console.log('Checking party_members table...');
    const { data: member, error: memberErr } = await supabase
      .from('party_members')
      .select('party_id, player_id')
      .eq('player_id', playerId);
    
    console.log('party_members query result:', { member, memberErr });
    
    if (memberErr) {
      console.error('party_members query error:', memberErr);
      throw memberErr;
    }
    
    console.log('Number of party_members entries:', member?.length || 0);
    
    if (member && member.length > 0) {
      const partyId = member[0].party_id;
      console.log('Found party_id in party_members:', partyId);
      
      const { data: party, error: partyErr } = await supabase
        .from('parties')
        .select('*')
        .eq('id', partyId)
        .single();
      
      console.log('Party query result:', { party, partyErr });
      
      if (partyErr) {
        console.error('Party query error:', partyErr);
      }
      
      return res.json(party || null);
    }
    
    // Check if user is GM of any party
    console.log('No party_members entry, checking parties table for gm_id...');
    const { data: gmParty, error: gmErr } = await supabase
      .from('parties')
      .select('*')
      .eq('gm_id', playerId);
    
    console.log('parties query by gm_id result:', { gmParty, gmErr });
    
    if (gmErr) {
      console.error('GM party query error:', gmErr);
      throw gmErr;
    }
    
    // .eq() returns array, get first if exists
    const party = gmParty && gmParty.length > 0 ? gmParty[0] : null;
    console.log('Final party result:', party);
    
    res.json(party);
    
  } catch (e) {
    console.error('[/players/:id/party] Fatal error:', e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
