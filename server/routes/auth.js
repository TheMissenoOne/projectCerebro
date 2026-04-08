const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const supabase = require('../db');
const config = require('../config');

// POST /auth/register
router.post('/register', async (req, res) => {
  const { email, password, username, displayName, role } = req.body;
  try {
    const id = uuidv4();
    const hash = await bcrypt.hash(password, 10);
    
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id,
        email: email.toLowerCase(),
        password_hash: hash,
        username,
        display_name: displayName,
        role: role || 'player'
      })
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email ou username já em uso' });
      }
      throw new Error(error.message);
    }
    
    const token = jwt.sign(
      { userId: data.id, role: data.role },
      config.jwtSecret,
      { expiresIn: '30d' }
    );
    
    const user = {
      id: data.id,
      email: data.email,
      username: data.username,
      display_name: data.display_name,
      role: data.role,
      profile: data
    };
    
    res.json({ session: { token, user }, user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();
    
    if (error || !profiles) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    
    const valid = await bcrypt.compare(password, profiles.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }
    
     const token = jwt.sign(
      { userId: profiles.id, role: profiles.role },
      config.jwtSecret,
      { expiresIn: '30d' }
    );
    
    const user = {
      id: profiles.id,
      email: profiles.email,
      username: profiles.username,
      display_name: profiles.display_name,
      role: profiles.role,
      profile: profiles
    };
    
    res.json({ session: { token, user }, user });
  } catch (e) {
    res.status(401).json({ error: 'Email ou senha incorretos' });
  }
});

module.exports = router;
