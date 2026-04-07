const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { partyId, includeGlobal } = req.query;
  let query, params;
  if (partyId && includeGlobal === 'true') {
    query = 'SELECT * FROM npcs WHERE party_id = $1 OR is_global = true ORDER BY name';
    params = [partyId];
  } else if (partyId) {
    query = 'SELECT * FROM npcs WHERE party_id = $1 ORDER BY name';
    params = [partyId];
  } else {
    query = 'SELECT * FROM npcs WHERE is_global = true ORDER BY name';
    params = [];
  }
  try {
    const { rows } = await db.query(query, params);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  const { party_id, created_by, name, codename, faction, danger, data } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO npcs (party_id, created_by, name, codename, faction, danger, data, is_global)
       VALUES ($1, $2, $3, $4, $5, $6, $7, false) RETURNING *`,
      [party_id, created_by, name, codename || '', faction || 'neutro', danger || 'medio', data || {}]
    );
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  const { name, codename, faction, danger, data } = req.body;
  try {
    const { rows } = await db.query(
      `UPDATE npcs SET name=$1, codename=$2, faction=$3, danger=$4, data=$5, updated_at=NOW()
       WHERE id=$6 AND is_global=false RETURNING *`,
      [name, codename, faction, danger, data, req.params.id]
    );
    res.json(rows[0] || null);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await db.query('DELETE FROM npcs WHERE id = $1 AND is_global = false', [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
