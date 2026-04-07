require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

app.use('/auth', require('./routes/auth'));
app.use('/profiles', require('./routes/profiles'));
app.use('/parties', require('./routes/parties'));
app.use('/characters', require('./routes/characters'));
app.use('/players', require('./routes/players'));
app.use('/npcs', require('./routes/npcs'));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/auth') && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../', 'index.html'));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
