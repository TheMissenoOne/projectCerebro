const router = require('express').Router();
const supabase = require('../db');
const requireAuth = require('../middleware/auth');

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, username, display_name, role, avatar_url, created_at')
      .eq('id', req.params.id)
      .single();
    
    if (error || !data) return res.status(404).json({ error: 'Perfil não encontrado' });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
