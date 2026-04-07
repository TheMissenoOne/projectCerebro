const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

router.get('/:partyId/session', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM sessions WHERE party_id = $1', [req.params.partyId]);
    res.json(rows[0] || null);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/:partyId/session', requireAuth, async (req, res) => {
  const { title, notes, round, encounter } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO sessions (party_id, title, notes, round, encounter, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (party_id) DO UPDATE
       SET title = $2, notes = $3, round = $4, encounter = $5, updated_at = NOW()
       RETURNING *`,
      [req.params.partyId, title || '', notes || '', round || 0, JSON.stringify(encounter || [])]
    );
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
