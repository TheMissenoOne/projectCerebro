const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

router.get('/:id/characters', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT id, name, codename, party_id, is_active, created_at, updated_at FROM characters WHERE player_id = $1 ORDER BY created_at DESC',
      [req.params.id]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id/party', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT p.* FROM parties p
       JOIN party_members pm ON pm.party_id = p.id
       WHERE pm.player_id = $1`,
      [req.params.id]
    );
    res.json(rows[0] || null);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
