# projectCerebro

X-MEN TTRPG Character & Campaign Management System — a web companion for **X-Men City of Mist** (tabletop RPG).

Built with vanilla JS + Supabase. No frameworks.

## Pages

| Page | What it does |
|---|---|
| `index.html` | Login / register (Supabase auth) |
| `dashboard.html` | Player hub — character grid, party, create character |
| `ficha.html` | Full character sheet editor (3 tabs: sheet, themes, squad) |
| `admin.html` | GM panel — all characters, encounters, session notes, members |
| `cerebro.html` | NPC database + encounter tracker + conditions |
| `combate.html` | AV/OV combat calculator with EV/RV table |
| `wiki.html` | Campaign wiki with categories and search |

## Character Sheet Features

- Portrait upload (base64 to DB)
- 9 attributes in 3 groups: Físico (Destreza, Força, Corpo), Mental (Inteligência, Vontade, Mente), Social (Influência, Aura, Espírito)
- Theme cards — Mutação (10 types), Humanidade (8 types), Adicional (3 types) — defined in `temas.json`
- Power / Fraqueza tags per theme with grau (1-6)
- Melhorias + Momentos de Evolução checkboxes
- Progressão tracker (6-dot system)
- Squad members table with Apoio / Antagonismo
- Full-width notes section
- Attributes live on the Themes tab for quick access alongside theme cards
- Auto-save with visual indicator
- Export as a print-ready **PDF**

## NPC Database (Cerebro)

- 9 faction categories (X-Men, Novatos, Morlock, Irmandade, Vilão, Criminoso, Neutro, Humano)
- 4 danger levels (Baixo, Médio, Alto, Extremo)
- Attribute bars, **theme cards** (powers/weaknesses grouped), encounter conditions (10 presets + custom)
- Markdown import / export

## Combat Calculator

- Action Value (AV) vs Opposition Value (OV)
- MEGS **Action Table** & **Result Table** with value ranges (rulebook layout)
- Push / Edge mechanics
- Condition application

## Tech Stack

- **Frontend:** Vanilla HTML5 + CSS3 + JS (no frameworks)
- **Backend:** Supabase (auth + PostgreSQL + REST API)
- **Themes:** 5 color systems (yellow, red, green, purple, blue) via CSS custom properties
- **Caching:** localStorage with TTL (`cache-module.js`)
- **Fonts:** Share Tech Mono, Bebas Neue, Barlow Condensed, Oswald
- **Testing:** Playwright (10 test files in `tests/`)

## Quick Start

```bash
npm install
npm run serve     # http-server on port 3000
```

Configure Supabase credentials in `assets/js/config.js` or `.env`.

Run tests:
```bash
npx playwright test
```

## Project Structure

```
projectCerebro/
├── *.html                 # Pages (7)
├── assets/
│   ├── js/                # 9 JS modules (strict load order)
│   ├── css/               # 7 CSS files
│   └── img/
├── supabase/
│   ├── schema.sql         # DB schema (7 tables)
│   ├── rls.sql            # Row-level security
│   └── seed.sql           # Seed data
├── temas.json             # Theme definitions (860 lines)
├── momentosDeEvolucao.json
├── tests/                 # 10 Playwright test files
├── kanban/                # Project tracking
└── icons/                 # SVG theme icons
```

## JS Load Order

`config.js → supabase-client.js → cache-module.js → auth-module.js → api.js → globals.js → themes.js → page-specific`

## Database Tables

`profiles`, `parties`, `party_members`, `characters`, `npcs`, `sessions`, `wiki_pages`

## License

MIT
