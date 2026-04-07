const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API routes
app.use('/auth', require('./routes/auth'));
app.use('/profiles', require('./routes/profiles'));
app.use('/parties', require('./routes/parties'));
app.use('/characters', require('./routes/characters'));
app.use('/players', require('./routes/players'));
app.use('/npcs', require('./routes/npcs'));

// Serve static frontend from root
app.use(express.static(path.join(__dirname, '..')));

// SPA fallback
app.get('*', (req, res) => {
  if (!req.path.startsWith('/auth') && !req.path.startsWith('/profiles') &&
      !req.path.startsWith('/parties') && !req.path.startsWith('/characters') &&
      !req.path.startsWith('/npcs') && !req.path.startsWith('/players')) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
