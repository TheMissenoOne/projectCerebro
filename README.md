# projectCerebro

X-MEN TTRPG Character Management System

Web-based character sheet and campaign management tool for X-Men City of Mist tabletop RPG.

## Features

- **Character Sheet** - Full character creation with:
  - Portrait upload (base64)
  - Attributes (9 stats: Destreza, Força, Corpo, Inteligência, Vontade, Mente, Influência, Aura, Espírito)
  - Theme cards (Mutação, Humanidade, Adicional)
  - Power/Fraqueza tags from JSON
  - Melhorias checkboxes
  - Momentos de Evolução checkboxes
  - Progressão tracker (5 dots)
  - Membros do esquadrão
  
- **Themes** (from JSON):
  - Mutação: Adaptabilidade, Bastião, Destino, Adivinhação, Enclave, Expressão, Familiar, Mobilidade, Relíquia, Subversão
  - Humanidade: Evento Marcante, Relação Marcante, Missão, Personalidade, Posses, Rotina, Treinamento, Território
  - Adicional: Aliado, Base de Operações, Transporte

- **Pages**:
  - `dashboard.html` - Player dashboard with party/characters
  - `ficha.html` - Character sheet editor
  - `admin.html` - GM panel (characters, encounters, session notes)
  - `cerebro.html` - NPC management, wiki, combat tracker
  - `wiki.html` - Campaign wiki

- **Technical**:
  - Supabase (auth, database)
  - LocalStorage caching with TTL
  - Responsive design (mobile: 520px, 600px, 900px breakpoints)
  - 5 color themes (yellow/red/green/purple/blue)
  - Auto-save with visual indicators
  - Toast notifications

## Quick Start

1. Open `dashboard.html`
2. Login with Supabase auth
3. Create character via + button
4. Edit themes in character sheet

## Project Structure

```
/projectCerebro
├── dashboard.html     # Main player hub
├── ficha.html       # Character sheet
├── admin.html      # GM panel
├── cerebro.html    # NPCs & wiki
├── wiki.html       # Campaign wiki
├── temas.json      # Theme definitions
├── momentosDeEvolucao.json  # Evolution moments
├── assets/
│   ├── js/
│   │   ├── config.js
│   │   ├── supabase-client.js
│   │   ├── api.js
│   │   ├── cache-module.js
│   │   └── auth-module.js
│   └── css/
│       ├── base.css
│       ├── components.css
│       ├── dashboard.css
│       ├── admin.css
│       └── *.css
└── supabase/
    └── sql/        # Database schema
```

## License

MIT