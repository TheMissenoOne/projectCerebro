# Project Cerebro - X-Men TTRPG Tool

## Overview
A web-based TTRPG (Tabletop Role-Playing Game) tool for X-Men campaigns, built on a "City of Mist" hack system. Provides a platform for Game Masters and players to manage character sheets, an NPC database ("Cerebro"), and combat calculations.

## Architecture
- **Frontend**: Static HTML/CSS/Vanilla JS files served from the project root
- **Backend**: Node.js + Express.js REST API (serves both static files and API routes)
- **Database**: PostgreSQL via Supabase (connection configured in `server/db.js`)
- **Auth**: JWT tokens + bcryptjs password hashing; session stored in `localStorage` as `{token, user}`

## Project Structure
```
.
├── assets/
│   ├── js/
│   │   ├── api.js        # API client (window.api.*), uses Bearer token from localStorage.session
│   │   └── auth.js       # requireAuth(role) — reads session, redirects if not authed
│   └── css/
├── server/
│   ├── routes/           # auth, characters, npcs, parties, profiles
│   ├── middleware/auth.js # JWT verification → req.user.userId
│   ├── db.js             # Supabase client
│   └── index.js          # Port 5000
├── supabase/             # Schema SQL + RLS policies
├── scripts/              # seed-npcs.js (parses cerebro_rebalanceado.md)
├── attached_assets/      # Original demo HTML files (reference only)
└── *.html                # Frontend pages
```

## Key Pages
- `index.html` — Login/register
- `dashboard.html` — Main hub; links to ficha with `?id=<charId>` or `?new=true`
- `ficha.html` — **Character sheet** (fully rewritten with demo design + API integration)
  - Loads character via `GET /characters/:id`
  - Auto-saves via `PUT /characters/:id` with `{data, foto_base64, name, codename}`
  - `?new=true` → creates new character and redirects to `?id=<newId>`
  - Tabs: Ficha / Temas / Esquadrão; import/export .md
- `cerebro.html` — **NPC Database** (fully rewritten with demo design + API integration)
  - Fetches NPCs via `GET /npcs?partyId=X&includeGlobal=true`
  - CRUD via `POST/PUT/DELETE /npcs/:id`
  - Global NPCs (seeded) are read-only
  - Encounter tracking in `localStorage` (key: `cerebro_enc_v6`)
  - Encounter tracked by NPC `id` (UUID)
- `combate.html` — Combat calculator
- `wiki.html` — Rules wiki
- `admin.html` — Admin panel

## NPC Data Model
**API format** (stored in DB):
```json
{ "id": "uuid", "name": "...", "codename": "...", "faction": "neutro", "danger": "medio",
  "data": { "iniciativa": 5, "atributos": {"Destreza": 8, "Força": 4, ...}, "tags": ["Telepatia 6"], "descricao": "..." },
  "is_global": false }
```
**Seeded NPCs** (legacy): use `data.stats` (lowercase keys) + `data.tags` as `[{texto, grau}]` objects.
`cerebro.html` normalizes both formats via `apiToInternal()`.

## Character Data Model
```json
{ "nome": "", "codinome": "", "jogador": "", "mutacao_ficha": "", "mutacao_temas": "",
  "stats": { "destreza": 0, ... }, "status": "", "progressao": 0, "evolucao": [],
  "temas": [...cards], "esq_nome": "", "apoio": 0, "antagonismo": 0,
  "membros": [], "extras": [...cards] }
```
Photo (`foto`) stored separately as `foto_base64` column, not inside the `data` JSON.

## Running Locally
```bash
cd server && node index.js
```
Server runs on port 5000 and serves everything (frontend + API).

## Environment
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `server/db.js`
- `JWT_SECRET` via environment variable
