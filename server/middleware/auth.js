const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Não autenticado' });
  
  try {
    const token = header.replace('Bearer ', '');
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
