const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;

const db = {
  users: new Map(),
  profiles: new Map(),
  parties: new Map(),
  partyMembers: new Map(),
  characters: new Map(),
  npcs: new Map(),
  sessions: new Map()
};

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

app.post('/auth/register', (req, res) => {
  const { email, password, username, displayName, role } = req.body;
  const id = uuidv4();
  
  db.users.set(id, { email, password, id });
  db.profiles.set(id, { id, username, display_name: displayName, role, created_at: new Date().toISOString() });
  
  res.json({ user: { id, email }, session: { user: { id, email } } });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = [...db.users.values()].find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({ user: { id: user.id, email: user.email }, session: { user: { id: user.id, email: user.email } } });
});

app.get('/profiles/:id', (req, res) => {
  const profile = db.profiles.get(req.params.id);
  if (!profile) return res.status(404).json({ error: 'Not found' });
  res.json(profile);
});

app.post('/parties', (req, res) => {
  const { name, gm_id } = req.body;
  const id = uuidv4();
  const party = { id, name, gm_id, code: generateCode(), created_at: new Date().toISOString() };
  db.parties.set(id, party);
  res.json(party);
});

app.get('/parties/gm/:gmId', (req, res) => {
  const party = [...db.parties.values()].find(p => p.gm_id === req.params.gmId);
  res.json(party || null);
});

app.get('/parties/code/:code', (req, res) => {
  const party = [...db.parties.values()].find(p => p.code === req.params.code.toUpperCase());
  res.json(party || null);
});

app.post('/parties/:partyId/members', (req, res) => {
  const { player_id } = req.body;
  const key = `${req.params.partyId}_${player_id}`;
  db.partyMembers.set(key, { party_id: req.params.partyId, player_id, joined_at: new Date().toISOString() });
  res.json({ success: true });
});

app.get('/parties/:partyId/members', (req, res) => {
  const members = [...db.partyMembers.values()].filter(m => m.party_id === req.params.partyId);
  const profiles = members.map(m => {
    const profile = db.profiles.get(m.player_id);
    return { ...m, profiles: profile };
  });
  res.json(profiles);
});

app.get('/players/:playerId/party', (req, res) => {
  const member = [...db.partyMembers.values()].find(m => m.player_id === req.params.playerId);
  if (!member) return res.json(null);
  const party = db.parties.get(member.party_id);
  res.json(party);
});

app.get('/characters/:id', (req, res) => {
  const char = db.characters.get(req.params.id);
  res.json(char || null);
});

app.get('/characters/:id/public', (req, res) => {
  const char = db.characters.get(req.params.id);
  if (!char) return res.status(404).json({ error: 'Not found' });
  res.json({ id: char.id, name: char.name, codename: char.codename, data: char.data });
});

app.post('/characters', (req, res) => {
  const { player_id, party_id, name, codename, data } = req.body;
  const id = uuidv4();
  const char = { 
    id, player_id, party_id, name, codename, data: data || {}, 
    is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() 
  };
  db.characters.set(id, char);
  res.json(char);
});

app.put('/characters/:id', (req, res) => {
  const char = db.characters.get(req.params.id);
  if (!char) return res.status(404).json({ error: 'Not found' });
  
  const updated = { ...char, ...req.body, updated_at: new Date().toISOString() };
  db.characters.set(req.params.id, updated);
  res.json(updated);
});

app.delete('/characters/:id', (req, res) => {
  db.characters.delete(req.params.id);
  res.json({ success: true });
});

app.get('/players/:playerId/characters', (req, res) => {
  const chars = [...db.characters.values()].filter(c => c.player_id === req.params.playerId);
  res.json(chars);
});

app.get('/parties/:partyId/characters', (req, res) => {
  const chars = [...db.characters.values()].filter(c => c.party_id === req.params.partyId);
  res.json(chars);
});

app.get('/npcs', (req, res) => {
  const { partyId, includeGlobal } = req.query;
  let npcs = [...db.npcs.values()];
  
  if (partyId) {
    if (includeGlobal === 'true') {
      npcs = npcs.filter(n => n.party_id === partyId || n.is_global);
    } else {
      npcs = npcs.filter(n => n.party_id === partyId);
    }
  } else {
    npcs = npcs.filter(n => n.is_global);
  }
  
  res.json(npcs);
});

app.post('/npcs', (req, res) => {
  const { party_id, created_by, name, codename, faction, danger, data, is_global } = req.body;
  const id = uuidv4();
  const npc = { id, party_id, created_by, name, codename, faction, danger, data: data || {}, is_global: is_global || false, created_at: new Date().toISOString() };
  db.npcs.set(id, npc);
  res.json(npc);
});

app.delete('/npcs/:id', (req, res) => {
  db.npcs.delete(req.params.id);
  res.json({ success: true });
});

app.get('/parties/:partyId/session', (req, res) => {
  const session = [...db.sessions.values()].find(s => s.party_id === req.params.partyId);
  res.json(session || null);
});

app.post('/parties/:partyId/session', (req, res) => {
  const existing = [...db.sessions.values()].find(s => s.party_id === req.params.partyId);
  const session = { 
    id: existing?.id || uuidv4(), 
    party_id: req.params.partyId, 
    ...req.body, 
    created_at: existing?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  db.sessions.set(session.id, session);
  res.json(session);
});

const sampleNPCs = [
  { name: 'Professor X', codename: 'Charles Xavier', faction: 'x-men', danger: 'extremo', iniciativa: 7, stats: { mente: 15 }, tags: ['Telepatia Ômega'], descricao: 'Lider dos X-Men' },
  { name: 'Ciclope', codename: 'Scott Summers', faction: 'x-men', danger: 'alto', iniciativa: 9, stats: { destreza: 9 }, tags: ['Rajada Óptica'], descricao: 'Lider de campo' },
  { name: 'Wolverine', codename: 'Logan', faction: 'x-men', danger: 'alto', iniciativa: 8, stats: { corpo: 12 }, tags: ['Fator de Cura'], descricao: 'Mutante com garras' },
  { name: 'Magneto', codename: 'Erik Lehnsherr', faction: 'irmandade', danger: 'extremo', iniciativa: 8, stats: { influencia: 12 }, tags: ['Controle Magnético'], descricao: 'Mutante磁 control' }
];

sampleNPCs.forEach(npc => {
  const id = uuidv4();
  db.npcs.set(id, { id, ...npc, is_global: true, data: { stats: npc.stats, tags: npc.tags, descricao: npc.descricao }, created_at: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
