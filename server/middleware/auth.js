const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Não autenticado' });
  
  try {
    const token = header.replace('Bearer ', '');
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'xmen-dev-secret');
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
