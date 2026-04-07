# XMEN-TTRPG — PLANO DE IMPLEMENTAÇÃO COMPLETO
> Stack: Node.js + Express + PostgreSQL · Render.com (full-stack)
> Frontend servido pelo próprio backend (sem GitHub Pages separado)
> Referência de código: arquivos fornecidos em `/uploads`

---

## STACK DEFINITIVO

| Camada | Tecnologia | Onde roda |
|---|---|---|
| Backend API | Node.js + Express | Render Web Service |
| Banco de dados | PostgreSQL 15 | Render Managed PostgreSQL |
| Frontend | HTML/CSS/JS estático | Servido pelo Express (`express.static`) |
| Auth | JWT + bcrypt (sem Supabase Auth) | Backend próprio |
| Storage de fotos | Base64 → PostgreSQL TEXT | Sem serviço externo |
| Seed NPCs | Script Node.js | Executado via Render Shell ou `npm run seed` |

**Por que tudo no Render:**
- Um único deploy, sem coordenar dois serviços
- PostgreSQL gerenciado com backup automático
- Variáveis de ambiente centralizadas
- Free tier cobre o projeto: 750h/mês compute + 1GB PostgreSQL

**ATENÇÃO sobre `supabase.js`:** o arquivo existe nos uploads mas **não será usado**. O `api.js` já aponta para o backend correto em `https://projectcerebro.onrender.com`. O `compat.js` já faz a ponte. Manter `supabase.js` no repositório apenas como referência histórica, sem importá-lo em nenhuma página.

---

## ESTRUTURA DE ARQUIVOS DO PROJETO

```
xmen-ttrpg/
├── package.json
├── .env                          # LOCAL ONLY — não commitar
├── .env.example
├── .gitignore
│
├── server/
│   ├── index.js                  # Entry point Express
│   ├── db.js                     # Pool PostgreSQL
│   ├── middleware/
│   │   ├── auth.js               # Verificar JWT
│   │   └── requireRole.js        # Verificar role (gm/player)
│   └── routes/
│       ├── auth.js               # POST /auth/register, /auth/login
│       ├── profiles.js           # GET /profiles/:id
│       ├── parties.js            # CRUD de parties + members
│       ├── characters.js         # CRUD de personagens
│       ├── npcs.js               # CRUD de NPCs
│       └── sessions.js           # Sessão de party (notas, rodada, encontro)
│
├── scripts/
│   └── seed-npcs.js              # Importar 134 NPCs (arquivo já existe nos uploads)
│
├── public/                       # Servido em / pelo Express
│   ├── index.html
│   ├── dashboard.html
│   ├── ficha.html
│   ├── cerebro.html
│   ├── admin.html
│   ├── wiki.html
│   ├── combate.html              # Calculadora AV/OV (NOVA PÁGINA)
│   └── assets/
│       ├── css/
│       │   ├── base.css          # Arquivo dos uploads — copiar direto
│       │   └── components.css    # Arquivo dos uploads — copiar direto
│       └── js/
│           ├── api.js            # Arquivo dos uploads — ajustar API_URL
│           ├── auth.js           # Arquivo dos uploads — copiar direto
│           ├── compat.js         # Arquivo dos uploads — copiar direto
│           └── wiki.js           # Arquivo dos uploads (stub, popular depois)
│
└── supabase/                     # Manter como referência, não usar em prod
    └── schema.sql
```

---

## BANCO DE DADOS

### `server/db.js`

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
```

### Schema SQL (executar na criação do banco)

```sql
-- Executar via: psql $DATABASE_URL -f schema.sql
-- Ou via Render Shell: node -e "require('./server/db').query(fs.readFileSync('schema.sql','utf8'))"

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USUÁRIOS
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  username    TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('player','gm')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- PARTIES
CREATE TABLE IF NOT EXISTS parties (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  code        TEXT UNIQUE NOT NULL,
  gm_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBROS DA PARTY
CREATE TABLE IF NOT EXISTS party_members (
  party_id    UUID NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
  player_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (party_id, player_id)
);

-- PERSONAGENS
CREATE TABLE IF NOT EXISTS characters (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  party_id    UUID REFERENCES parties(id) ON DELETE SET NULL,
  name        TEXT DEFAULT 'Novo Personagem',
  codename    TEXT DEFAULT '',
  data        JSONB NOT NULL DEFAULT '{}',
  foto_base64 TEXT,                           -- foto armazenada como base64
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- NPCs
CREATE TABLE IF NOT EXISTS npcs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id    UUID REFERENCES parties(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  codename    TEXT DEFAULT '',
  faction     TEXT DEFAULT 'neutro',
  danger      TEXT DEFAULT 'medio' CHECK (danger IN ('baixo','medio','alto','extremo')),
  data        JSONB NOT NULL DEFAULT '{}',
  is_global   BOOLEAN DEFAULT FALSE,
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_npcs_global ON npcs(is_global);
CREATE INDEX IF NOT EXISTS idx_npcs_party  ON npcs(party_id);

-- SESSÕES
CREATE TABLE IF NOT EXISTS sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id    UUID NOT NULL REFERENCES parties(id) ON DELETE CASCADE UNIQUE,
  title       TEXT DEFAULT '',
  notes       TEXT DEFAULT '',
  round       INT DEFAULT 0,
  encounter   JSONB DEFAULT '[]',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- WIKI PAGES (conteúdo editável pelo GM via Render Studio)
CREATE TABLE IF NOT EXISTS wiki_pages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL DEFAULT '',
  category    TEXT DEFAULT 'geral',
  order_idx   INT DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Índices de performance
CREATE INDEX IF NOT EXISTS idx_characters_player ON characters(player_id);
CREATE INDEX IF NOT EXISTS idx_characters_party  ON characters(party_id);
CREATE INDEX IF NOT EXISTS idx_party_members_player ON party_members(player_id);
```

---

## BACKEND — `server/index.js`

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // limite para base64 de imagens

// Servir frontend estático
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da API
app.use('/auth',       require('./routes/auth'));
app.use('/profiles',   require('./routes/profiles'));
app.use('/parties',    require('./routes/parties'));
app.use('/characters', require('./routes/characters'));
app.use('/players',    require('./routes/players'));  // /players/:id/characters, /party
app.use('/npcs',       require('./routes/npcs'));

// SPA fallback — qualquer rota não-API serve o index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/auth') && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### `package.json`

```json
{
  "name": "xmen-ttrpg",
  "version": "1.0.0",
  "main": "server/index.js",
  "scripts": {
    "start": "node server/index.js",
    "dev": "nodemon server/index.js",
    "seed": "node scripts/seed-npcs.js",
    "db:init": "node scripts/init-db.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "jsonwebtoken": "^9.0.0",
    "pg": "^8.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  },
  "engines": { "node": ">=18" }
}
```

### `.env.example`

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=gerar_uma_string_aleatoria_longa_aqui
NODE_ENV=production
PORT=3000
```

---

## ROTAS DA API

### `server/routes/auth.js` — Registro e Login

```javascript
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// POST /auth/register
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

// POST /auth/login
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
```

### `server/middleware/auth.js` — Verificar JWT

```javascript
const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Não autenticado' });
  try {
    const token = header.replace('Bearer ', '');
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
```

**NOTA sobre `api.js` atual:** o arquivo não envia Authorization header. Adicionar este método ao objeto `api`:

```javascript
// Adicionar ao topo de api.js
function getAuthHeader() {
  const session = JSON.parse(localStorage.getItem('session') || 'null');
  return session?.token ? { 'Authorization': `Bearer ${session.token}` } : {};
}

// Modificar o método request() para incluir:
headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
```

### `server/routes/characters.js` — CRUD Completo

```javascript
const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

// POST /characters — criar nova ficha
router.post('/', requireAuth, async (req, res) => {
  const { player_id, party_id } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO characters (player_id, party_id, name, data)
       VALUES ($1, $2, 'Novo Personagem', '{}') RETURNING *`,
      [player_id, party_id || null]
    );
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /characters/:id
router.get('/:id', requireAuth, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM characters WHERE id = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Não encontrado' });
  // Checar ownership ou GM da party
  if (rows[0].player_id !== req.user.userId) {
    const partyCheck = await db.query(
      'SELECT id FROM parties WHERE id = $1 AND gm_id = $2',
      [rows[0].party_id, req.user.userId]
    );
    if (!partyCheck.rows[0]) return res.status(403).json({ error: 'Proibido' });
  }
  res.json(rows[0]);
});

// GET /characters/:id/public — sem auth, para visualização
router.get('/:id/public', async (req, res) => {
  const { rows } = await db.query(
    'SELECT id, name, codename, data, foto_base64 FROM characters WHERE id = $1 AND is_active = true',
    [req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Não encontrado' });
  res.json(rows[0]);
});

// PUT /characters/:id — salvar ficha completa
router.put('/:id', requireAuth, async (req, res) => {
  const { data, foto_base64, name, codename } = req.body;
  try {
    const { rows } = await db.query(
      `UPDATE characters
       SET data = $1, foto_base64 = COALESCE($2, foto_base64),
           name = COALESCE($3, name), codename = COALESCE($4, codename),
           updated_at = NOW()
       WHERE id = $5 AND player_id = $6
       RETURNING *`,
      [data, foto_base64 || null, name || null, codename || null, req.params.id, req.user.userId]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Não encontrado ou sem permissão' });
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// DELETE /characters/:id
router.delete('/:id', requireAuth, async (req, res) => {
  await db.query('DELETE FROM characters WHERE id = $1 AND player_id = $2', [req.params.id, req.user.userId]);
  res.json({ ok: true });
});

module.exports = router;
```

### `server/routes/parties.js` — Parties + Members + Session

```javascript
const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

// POST /parties
router.post('/', requireAuth, async (req, res) => {
  const { name, gm_id } = req.body;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    const { rows } = await db.query(
      'INSERT INTO parties (name, gm_id, code) VALUES ($1, $2, $3) RETURNING *',
      [name, gm_id, code]
    );
    // Criar sessão vazia
    await db.query('INSERT INTO sessions (party_id) VALUES ($1) ON CONFLICT DO NOTHING', [rows[0].id]);
    res.json(rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Código já existe, tente novamente' });
    res.status(500).json({ error: e.message });
  }
});

// GET /parties/gm/:gmId
router.get('/gm/:gmId', requireAuth, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM parties WHERE gm_id = $1', [req.params.gmId]);
  res.json(rows[0] || null);
});

// GET /parties/code/:code
router.get('/code/:code', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM parties WHERE code = $1', [req.params.code.toUpperCase()]);
  if (!rows[0]) return res.status(404).json({ error: 'Código inválido' });
  res.json(rows[0]);
});

// POST /parties/:id/members
router.post('/:id/members', requireAuth, async (req, res) => {
  const { player_id } = req.body;
  try {
    await db.query(
      'INSERT INTO party_members (party_id, player_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.params.id, player_id]
    );
    // Vincular personagens existentes do player a esta party
    await db.query(
      'UPDATE characters SET party_id = $1 WHERE player_id = $2 AND party_id IS NULL',
      [req.params.id, player_id]
    );
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// GET /parties/:id/members
router.get('/:id/members', requireAuth, async (req, res) => {
  const { rows } = await db.query(
    `SELECT pm.*, p.username, p.display_name, p.role
     FROM party_members pm JOIN profiles p ON p.id = pm.player_id
     WHERE pm.party_id = $1`,
    [req.params.id]
  );
  res.json(rows);
});

// GET /parties/:id/characters
router.get('/:id/characters', requireAuth, async (req, res) => {
  const { rows } = await db.query(
    `SELECT c.id, c.name, c.codename, c.player_id, c.is_active,
            p.display_name as player_name
     FROM characters c JOIN profiles p ON p.id = c.player_id
     WHERE c.party_id = $1 ORDER BY c.name`,
    [req.params.id]
  );
  res.json(rows);
});

// GET /parties/:id/session
router.get('/:id/session', requireAuth, async (req, res) => {
  const { rows } = await db.query('SELECT * FROM sessions WHERE party_id = $1', [req.params.id]);
  res.json(rows[0] || null);
});

// POST /parties/:id/session
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
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
```

### `server/routes/npcs.js`

```javascript
const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

// GET /npcs?partyId=xxx&includeGlobal=true
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
  const { rows } = await db.query(query, params);
  res.json(rows);
});

// POST /npcs — GM cria NPC custom
router.post('/', requireAuth, async (req, res) => {
  const { party_id, created_by, name, codename, faction, danger, data } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO npcs (party_id, created_by, name, codename, faction, danger, data, is_global)
       VALUES ($1, $2, $3, $4, $5, $6, $7, false) RETURNING *`,
      [party_id, created_by, name, codename || '', faction || 'neutro', danger || 'medio', data || {}]
    );
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// PUT /npcs/:id
router.put('/:id', requireAuth, async (req, res) => {
  const { name, codename, faction, danger, data } = req.body;
  const { rows } = await db.query(
    `UPDATE npcs SET name=$1, codename=$2, faction=$3, danger=$4, data=$5, updated_at=NOW()
     WHERE id=$6 AND is_global=false RETURNING *`,
    [name, codename, faction, danger, data, req.params.id]
  );
  res.json(rows[0] || null);
});

// DELETE /npcs/:id
router.delete('/:id', requireAuth, async (req, res) => {
  await db.query('DELETE FROM npcs WHERE id = $1 AND is_global = false', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
```

### `server/routes/players.js`

```javascript
const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

// GET /players/:id/characters
router.get('/:id/characters', requireAuth, async (req, res) => {
  const { rows } = await db.query(
    'SELECT id, name, codename, party_id, is_active, created_at, updated_at FROM characters WHERE player_id = $1 ORDER BY created_at DESC',
    [req.params.id]
  );
  res.json(rows);
});

// GET /players/:id/party
router.get('/:id/party', requireAuth, async (req, res) => {
  const { rows } = await db.query(
    `SELECT p.* FROM parties p
     JOIN party_members pm ON pm.party_id = p.id
     WHERE pm.player_id = $1`,
    [req.params.id]
  );
  res.json(rows[0] || null);
});

module.exports = router;
```

### `server/routes/profiles.js`

```javascript
const router = require('express').Router();
const db = require('../db');
const requireAuth = require('../middleware/auth');

// GET /profiles/:id
router.get('/:id', requireAuth, async (req, res) => {
  const { rows } = await db.query(
    'SELECT id, email, username, display_name, role, avatar_url, created_at FROM profiles WHERE id = $1',
    [req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Perfil não encontrado' });
  res.json(rows[0]);
});

module.exports = router;
```

---

## SCRIPT DE SEED — `scripts/seed-npcs.js`

O arquivo `seed-npcs.js` dos uploads gera SQL. **Modificar** para inserir direto no banco:

```javascript
// scripts/seed-npcs.js — versão com inserção direta
require('dotenv').config();
const db = require('../server/db');
const fs = require('fs');

const MARKDOWN_FILE = process.env.CEREBRO_MD || './cerebro_rebalanceado.md';

function parseNPCs(markdown) {
  // Manter o parser exato do arquivo dos uploads
  // ... (código idêntico ao seed-npcs.js fornecido)
}

async function main() {
  console.log('Limpando NPCs globais antigos...');
  await db.query('DELETE FROM npcs WHERE is_global = true');
  
  const markdown = fs.readFileSync(MARKDOWN_FILE, 'utf-8');
  const npcs = parseNPCs(markdown);
  console.log(`Inserindo ${npcs.length} NPCs...`);
  
  for (const npc of npcs) {
    await db.query(
      `INSERT INTO npcs (name, codename, faction, danger, data, is_global)
       VALUES ($1, $2, $3, $4, $5, true)`,
      [npc.name, npc.codename, npc.faction, npc.danger, npc.data]
    );
  }
  console.log('Seed completo!');
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
```

**Executar via Render Shell:**
```bash
npm run seed
```

---

## AJUSTES NOS ARQUIVOS EXISTENTES

### `public/assets/js/api.js` — 3 mudanças obrigatórias

**1. URL da API** (já está correto nos uploads, manter):
```javascript
const API_URL = 'https://projectcerebro.onrender.com';
```

**2. Adicionar auth header em todas as requests:**
```javascript
// Substituir o método request() atual por:
async request(endpoint, options = {}) {
  const session = JSON.parse(localStorage.getItem('session') || 'null');
  const url = API_URL + endpoint;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(session?.token ? { 'Authorization': `Bearer ${session.token}` } : {})
    },
    ...options
  };
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }
  const response = await fetch(url, config);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
},
```

**3. Corrigir bug de sintaxe** (linha com backtick incorreto no arquivo dos uploads):
```javascript
// ERRADO (linha ~linha 46 do arquivo):
async loadPublicCharacter(charId) {
  return this.request(`/characters/${charId}/public');  // ← aspas misturadas
// CORRETO:
async loadPublicCharacter(charId) {
  return this.request(`/characters/${charId}/public`);
```

### `public/assets/js/auth.js` — Ajuste do header de auth

O `auth.js` dos uploads usa `session.user.id`. Com o novo backend o token JWT está em `session.token`. Verificar que `getCurrentUser()` retorna corretamente e que `requireAuth()` passa o token via header (já corrigido no `api.js` acima).

### `public/assets/js/compat.js` — Remover referência a Supabase

Remover ou ignorar qualquer import do `supabase.js`. O `compat.js` já mapeia para `api.*` corretamente.

---

## CALCULADORA AV/OV — `public/combate.html`

Nova página. Integrada ao mesmo header/toolbar das outras páginas.

### O que implementar

A tabela AV/OV do documento (documento 10 dos uploads) é a **tabela de resolução de ação** do sistema MEGS (base do sistema de atributos usado nos NPCs). Funciona assim:

- **AV** (Action Value) = Atributo de quem ataca
- **OV** (Opposing Value) = Atributo de quem defende
- **Resultado** = número que você precisa tirar nos dados (2d10) para ter sucesso
- Se tirar igual ou maior ao resultado = sucesso → ir para tabela EV/RV
- **EV** (Effect Value) = poder/dano do efeito
- **RV** (Resistance Value) = resistência do alvo
- **RAPs** (Result Action Points) = diferença aplicada como dano ou efeito

**Três modos de dano:**
1. **Temporário** — dano que some após a cena (atordoamento, imobilização)
2. **Persistente** — dano que some após o combate (machucados, condições)
3. **Permanente** — dano que fica (ferimentos sérios, perda de capacidades)

### Layout da página

```
┌─────────────────────────────────────────────────┐
│  HEADER X-MEN / TOOLBAR                         │
├─────────────────────────────────────────────────┤
│  [AV/OV CALC]  [EV/RV CALC]  [TABELA COMPLETA] │  ← 3 abas
├────────────────────────┬────────────────────────┤
│  AV ─────── [input]   │  RESULTADO              │
│  OV ─────── [input]   │  ┌──────────────────┐   │
│                        │  │ ALVO: 17         │   │
│  MODO DE DANO:         │  │ (tirar 17+ em    │   │
│  ○ Temporário          │  │  2d10)           │   │
│  ○ Persistente         │  └──────────────────┘   │
│  ○ Permanente          │                         │
│                        │  EV ─── [input]         │
│  [CALCULAR]            │  RV ─── [input]         │
│                        │  RAPs: __ pontos         │
└────────────────────────┴────────────────────────┘
│  TABELA COMPLETA (colapsável, scroll horizontal) │
└─────────────────────────────────────────────────┘
```

### Dados das tabelas (extraídos do documento 10)

```javascript
// A tabela AV/OV principal (linhas=AV, colunas=OV, valor=alvo nos dados)
// Valores 'N' = impossível sem ajuda
// Formato: AVOV_TABLE[av-1][ov-1] = resultado
// NOTA: tabela vai de AV/OV 1-50, mas usar subset 1-25 na UI
// (valores além disso são extrapolados ou raramente usados)

const AVOV_TABLE = [
  // AV=1: OV de 1 a 25
  [11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56,61,66,71,77,83,89,95],
  // AV=2
  [10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56,61,66,71,77,83,89],
  // AV=3
  [9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56,61,66,71,77,83],
  // AV=4
  [8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56,61,66,71,77],
  // AV=5
  [7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56,61,66,71],
  // AV=6
  [5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56,61,66],
  // AV=7
  [3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56,61],
  // AV=8
  [0,3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56],
  // AV=9
  [0,0,3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51],
  // AV=10
  [0,0,0,3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47],
  // AV=11
  [0,0,0,0,3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39,43],
  // AV=12
  [0,0,0,0,0,3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35,39],
  // AV=13
  [0,0,0,0,0,0,3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32,35],
  // AV=14
  [0,0,0,0,0,0,0,3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29,32],
  // AV=15
  [0,0,0,0,0,0,0,0,3,5,7,8,9,10,11,12,13,14,15,17,19,21,23,26,29]
];
// 0 = impossível (N na tabela original)

// Tabela EV/RV — Temporários
// EVRV_TEMP[ev-1][rv-1] = RAPs aplicados
// (extrair do documento 10, tabela "EV/RV Efeitos temporários")

// Tabela EV/RV — Persistentes
// EVRV_PERS[ev-1][rv-1] = RAPs

// Tabela EV/RV — Permanentes
// EVRV_PERM[ev-1][rv-1] = RAPs
```

**IMPORTANTE para o agente:** parsear as 3 tabelas do documento 10 (os dados estão no arquivo enviado pelo usuário como documento sem título). A estrutura é TSV (tab-separated). Extrair os valores e criar os arrays JavaScript correspondentes.

As tabelas têm 52 colunas e 52 linhas. Para a UI, mostrar apenas 1-20 com scroll para 1-52.

### Lógica da calculadora

```javascript
function calcularAlvo(av, ov) {
  if (av < 1 || av > 52 || ov < 1 || ov > 52) return null;
  const val = AVOV_TABLE[av-1][ov-1];
  return val === 0 ? 'N' : val;  // N = impossível
}

function calcularRAPs(ev, rv, modo) {
  // modo: 'temp' | 'pers' | 'perm'
  let table;
  if (modo === 'temp') table = EVRV_TEMP;
  else if (modo === 'pers') table = EVRV_PERS;
  else table = EVRV_PERM;
  
  if (ev < 1 || rv < 1) return null;
  const ev_idx = Math.min(ev-1, table.length-1);
  const rv_idx = Math.min(rv-1, table[0].length-1);
  const val = table[ev_idx][rv_idx];
  return val === 0 ? 0 : val;  // 0/N = sem efeito
}

// Resultado completo de uma ação
function resolverAcao(av, ov, ev, rv, modo, dadosRolados) {
  const alvo = calcularAlvo(av, ov);
  if (alvo === 'N') return { sucesso: false, alvo: 'N', raps: 0, mensagem: 'Ação impossível' };
  
  const sucesso = alvo === 0 || dadosRolados >= alvo;
  const raps = sucesso ? calcularRAPs(ev, rv, modo) : 0;
  
  return {
    sucesso,
    alvo,
    dadosRolados,
    raps,
    modo,
    mensagem: sucesso
      ? `Sucesso! ${raps} RAPs de dano ${modo === 'temp' ? 'temporário' : modo === 'pers' ? 'persistente' : 'permanente'}`
      : `Falha. Era necessário ${alvo}, tirou ${dadosRolados}.`
  };
}
```

### Integração com fichas e NPCs

Na página `combate.html`, adicionar:
- Seletor "Carregar atributo da ficha" → dropdown com os 9 stats do personagem logado
- Seletor "Carregar atributo do NPC" → dropdown com NPCs do Cérebro ativos no encontro

```javascript
// Ao carregar combate.html:
async function carregarAtributosPersonagem() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session) return;
  const chars = await api.listCharacters(session.user.id);
  // Popular dropdown de personagens para preencher AV/EV automaticamente
}

async function carregarAtributosNPC() {
  const npcs = await api.listNPCs(null, true);
  // Popular dropdown de NPCs para preencher OV/RV automaticamente
}
```

---

## DEPLOY NO RENDER

### Passo a passo completo

**1. Criar banco de dados PostgreSQL no Render**
- Dashboard → New → PostgreSQL
- Nome: `xmen-db`
- Plano: Free
- Anotar a `Internal Database URL` (usar como `DATABASE_URL`)

**2. Criar Web Service no Render**
- Dashboard → New → Web Service
- Conectar ao repositório GitHub
- Configurações:
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
  - **Node Version:** 18

**3. Variáveis de ambiente no Render (Environment)**
```
DATABASE_URL=<Internal URL do banco criado no passo 1>
JWT_SECRET=<string aleatória longa, ex: openssl rand -hex 32>
NODE_ENV=production
```

**4. Inicializar schema** (uma única vez após deploy):
- Render Dashboard → Web Service → Shell
```bash
node -e "
const db = require('./server/db');
const fs = require('fs');
const sql = fs.readFileSync('./server/schema.sql', 'utf8');
db.query(sql).then(() => { console.log('Schema OK'); process.exit(0); }).catch(e => { console.error(e); process.exit(1); });
"
```

**5. Popular NPCs** (uma única vez):
```bash
# Colocar cerebro_rebalanceado.md na raiz do projeto
npm run seed
```

**6. Frontend:** apenas copiar os arquivos HTML/CSS/JS para `public/` e commitar. O Express os serve automaticamente.

### `render.yaml` (opcional, para deploy automático)

```yaml
services:
  - type: web
    name: xmen-ttrpg
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: xmen-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production

databases:
  - name: xmen-db
    plan: free
    databaseName: xmen
    user: xmen
```

---

## PÁGINAS — CHECKLIST DE FUNCIONALIDADE

### `index.html` (já existe nos uploads)
- [x] Login/cadastro com tabs
- [x] Seleção de role (Jogador/Mestre)
- [ ] **Ajustar:** `login()` e `register()` passam token recebido para `session.token` no localStorage

### `dashboard.html` (já existe nos uploads)
- [ ] Listar fichas do jogador via `api.listCharacters(userId)`
- [ ] Criar nova ficha → `api.createCharacter(userId, partyId)`
- [ ] Criar party (GM) → `api.createParty(name, userId)` → exibir código
- [ ] Entrar na party (Jogador) → `api.getPartyByCode(code)` + `api.joinParty(partyId, userId)`
- [ ] Link para `combate.html` no toolbar

### `ficha.html` (já existe nos uploads)
- [ ] Carregar via `?id=UUID` → `api.loadCharacter(id)`
- [ ] Auto-save com debounce 600ms → `api.saveCharacter(id, data)`
- [ ] Foto: converter para base64 e salvar via `api.saveCharacter` (campo `foto_base64`)
- [ ] Import/export .md mantidos como estão
- [ ] **NOVO campo:** link para calculadora de combate no toolbar

### `cerebro.html` (já existe nos uploads)
- [ ] Carregar NPCs via `api.listNPCs(partyId, true)`
- [ ] GM pode criar/editar NPCs custom da party
- [ ] Filtros funcionando com dados do banco
- [ ] Modo encontro: selecionar NPCs → salvar em `session.encounter`

### `admin.html` (já existe nos uploads)
- [ ] `requireAuth('gm')` no topo
- [ ] Carregar personagens da party via `api.listPartyCharacters(partyId)`
- [ ] Salvar notas de sessão via `api.updateSession(partyId, {...})`
- [ ] Tracker de rodada sincronizado via polling a cada 10s (sem WebSocket no free tier)

### `combate.html` (NOVA — criar do zero)
- [ ] Calculadora AV/OV
- [ ] Calculadora EV/RV com 3 modos
- [ ] Tabela completa com scroll horizontal
- [ ] Seletor de atributos da ficha/NPC
- [ ] Integrada ao header/toolbar padrão

---

## POLLING (substitui Realtime do Supabase)

No free tier do Render o WebSocket tem limitações. Usar polling simples:

```javascript
// Em admin.html e dashboard.html — checar atualizações a cada 15s
let pollInterval;

function iniciarPolling(partyId) {
  pollInterval = setInterval(async () => {
    const session = await api.getSession(partyId);
    if (session) atualizarUIComSessao(session);
  }, 15000);
}

function pararPolling() {
  if (pollInterval) clearInterval(pollInterval);
}
```

---

## NOTAS PARA O AGENTE DE CÓDIGO

1. **Ordem de implementação sugerida:**
   - Fase 1: backend (schema + Express + todas as rotas) + deploy Render
   - Fase 2: ajustar `api.js` (auth header + bug do backtick)
   - Fase 3: `seed-npcs.js` adaptar para inserção direta + executar
   - Fase 4: `index.html` + `dashboard.html` funcionais end-to-end
   - Fase 5: `ficha.html` com save/load do banco
   - Fase 6: `cerebro.html` com dados do banco
   - Fase 7: `combate.html` (calculadora AV/OV)
   - Fase 8: `admin.html` funcional

2. **Foto do personagem:** não usar Supabase Storage. Converter para base64 no cliente e salvar no campo `foto_base64 TEXT` da tabela `characters`. Limite: comprimir para max 400KB antes de salvar (`canvas.toBlob` com quality 0.7).

3. **O campo `data` de characters** é o objeto JSON completo da ficha (o `D` do `salvarAuto()` do `xmen-ficha.html`). Nenhuma transformação necessária — salvar e carregar diretamente.

4. **NPCs globais** têm `is_global = true` e `party_id = NULL`. O endpoint `GET /npcs` sem parâmetros retorna só os globais (os 134 do seed). Com `partyId` retorna os da party + globais.

5. **Sessão de party:** há uma única sessão por party (constraint UNIQUE em `party_id`). O upsert no `POST /parties/:id/session` é por isso que usa `ON CONFLICT (party_id) DO UPDATE`.

6. **As 3 tabelas EV/RV** do documento 10 precisam ser parseadas como arrays 2D. O documento está em formato TSV. Usar regex ou split('\t') para extrair. Os valores 'N' viram 0 nos arrays JavaScript (zero RAPs = sem efeito).

7. **`combate.html` e a calculadora AV/OV** devem funcionar 100% offline (sem chamadas à API) já que são apenas cálculos locais com arrays pré-definidos. A integração com fichas/NPCs é opcional e carregada assincronamente.

8. **Não criar `wiki.html` agora** — o usuário ainda vai fornecer o conteúdo das regras. Criar a estrutura de navegação com placeholders.

---

*Versão: implementação completa · Render full-stack · AV/OV integrado*
