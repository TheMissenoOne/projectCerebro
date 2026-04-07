const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

router.post('/register', async (req, res) => {
  const { email, password, username, displayName, role } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await db.query(
      `INSERT INTO profiles (email, password_hash, username, display_name, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, display_name, role`,
      [email.toLowerCase(), hash, username, displayName, role || 'player']
    );
    const user = rows[0];
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ session: { user, token }, profile: user });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Email ou username já em uso' });
    res.status(500).json({ error: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await db.query(
      'SELECT * FROM profiles WHERE email = $1', [email.toLowerCase()]
    );
    if (!rows[0]) return res.status(401).json({ error: 'Email ou senha incorretos' });
    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: 'Email ou senha incorretos' });
    const { password_hash, ...user } = rows[0];
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ session: { user, token }, profile: user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
