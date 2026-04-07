# Project Cerebro - X-Men TTRPG Tool

## Overview
A web-based TTRPG (Tabletop Role-Playing Game) tool for X-Men campaigns, built on a "City of Mist" hack system. Provides a platform for Game Masters and players to manage character sheets, an NPC database ("Cerebro"), and combat calculations.

## Architecture
- **Frontend**: Static HTML/CSS/Vanilla JS files served from the project root
- **Backend**: Node.js + Express.js REST API (serves both static files and API routes)
- **Database**: PostgreSQL via Supabase (connection configured in `server/db.js`)
- **Auth**: JWT tokens + bcryptjs password hashing

## Project Structure
```
.
├── assets/          # CSS, images, JS for frontend
├── server/          # Express backend
│   ├── routes/      # API route handlers (auth, characters, npcs, parties, etc.)
│   ├── middleware/  # JWT auth middleware
│   ├── db.js        # Supabase client config
│   └── index.js     # Main entry point (port 5000)
├── supabase/        # DB schema and RLS policies
├── scripts/         # Utility scripts (NPC seeding)
├── *.html           # Frontend pages
└── server/package.json  # Dependencies
```

## Key Pages
- `index.html` - Login/register
- `dashboard.html` - Main hub
- `ficha.html` / `xmen-ficha.html` - Character sheets
- `cerebro.html` / `npcs.html` - NPC database
- `combate.html` - Combat calculator
- `wiki.html` - Rules wiki
- `admin.html` - Admin panel

## Running Locally
The server runs on port 5000 and serves everything (frontend + API).
```bash
cd server && node index.js
```

## Dependencies
Managed via npm, installed in `server/node_modules`. Run `cd server && npm install` to install.

## Configuration
- Supabase URL and anon key are hardcoded in `server/db.js`
- JWT secret should be set via environment variable `JWT_SECRET`
