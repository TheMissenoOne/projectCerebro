const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

router.post('/', requireAuth, async (req, res) => {
  const { name, gm_id } = req.body;
  const code = generateCode();
  try {
    const { rows } = await db.query(
      'INSERT INTO parties (name, gm_id, code) VALUES ($1, $2, $3) RETURNING *',
      [name, gm_id, code]
    );
    await db.query('INSERT INTO sessions (party_id) VALUES ($1) ON CONFLICT DO NOTHING', [rows[0].id]);
    res.json(rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Código já existe, tente novamente' });
    res.status(500).json({ error: e.message });
  }
});

router.get('/gm/:gmId', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM parties WHERE gm_id = $1', [req.params.gmId]);
    res.json(rows[0] || null);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/code/:code', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM parties WHERE code = $1', [req.params.code.toUpperCase()]);
    if (!rows[0]) return res.status(404).json({ error: 'Código inválido' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/:id/members', requireAuth, async (req, res) => {
  const { player_id } = req.body;
  try {
    await db.query(
      'INSERT INTO party_members (party_id, player_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.params.id, player_id]
    );
    await db.query(
      'UPDATE characters SET party_id = $1 WHERE player_id = $2 AND party_id IS NULL',
      [req.params.id, player_id]
    );
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id/members', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT pm.*, p.username, p.display_name, p.role
       FROM party_members pm JOIN profiles p ON p.id = pm.player_id
       WHERE pm.party_id = $1`,
      [req.params.id]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id/characters', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT c.id, c.name, c.codename, c.player_id, c.is_active,
              p.display_name as player_name
       FROM characters c JOIN profiles p ON p.id = c.player_id
       WHERE c.party_id = $1 ORDER BY c.name`,
      [req.params.id]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id/session', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM sessions WHERE party_id = $1', [req.params.id]);
    res.json(rows[0] || null);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/:id/session', requireAuth, async (req, res) => {
  const { title, notes, round, encounter } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO sessions (party_id, title, notes, round, encounter, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (party_id) DO UPDATE
       SET title = $2, notes = $3, round = $4, encounter = $5, updated_at = NOW()
       RETURNING *`,
      [req.params.id, title || '', notes || '', round || 0, JSON.stringify(encounter || [])]
    );
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
