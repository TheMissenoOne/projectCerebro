const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

router.post('/', requireAuth, async (req, res) => {
  const { player_id, party_id } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO characters (player_id, party_id, name, data)
       VALUES ($1, $2, 'Novo Personagem', '{}') RETURNING *`,
      [player_id, party_id || null]
    );
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM characters WHERE id = $1', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Não encontrado' });
    if (rows[0].player_id !== req.user.userId) {
      const partyCheck = await db.query(
        'SELECT id FROM parties WHERE id = $1 AND gm_id = $2',
        [rows[0].party_id, req.user.userId]
      );
      if (!partyCheck.rows[0]) return res.status(403).json({ error: 'Proibido' });
    }
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id/public', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT id, name, codename, data, foto_base64 FROM characters WHERE id = $1 AND is_active = true',
      [req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Não encontrado' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  const { data, foto_base64, name, codename } = req.body;
  try {
    const { rows } = await db.query(
      `UPDATE characters
       SET data = COALESCE($1, data), foto_base64 = COALESCE($2, foto_base64),
           name = COALESCE($3, name), codename = COALESCE($4, codename),
           updated_at = NOW()
       WHERE id = $5 AND player_id = $6
       RETURNING *`,
      [data, foto_base64 || null, name || null, codename || null, req.params.id, req.user.userId]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Não encontrado ou sem permissão' });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await db.query('DELETE FROM characters WHERE id = $1 AND player_id = $2', [req.params.id, req.user.userId]);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
