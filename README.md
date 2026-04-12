# projectCerebro

X-MEN TTRPG Character Management System

A web-based character sheet and campaign management tool for the X-Men City of Mist tabletop RPG. Features include character creation, theme-based power systems, party management, and campaign tracking.

## Features

- Character creation with attributes, powers, and themes
- Theme card system (Mutazione/Umanità) with visual icons
- Party management (create/join parties)
- Campaign tracking (Cerebro wiki, encounters, NPCs)
- Local data persistence with caching
- Responsive design for desktop and mobile
- Theme customization (5 color schemes)
- Export/import character data as Markdown
- Toast notifications for user feedback
- Automatic saving with visual indicators

## Technology Stack

- HTML5, CSS3, Vanilla JavaScript
- Supabase backend (authentication, database)
- LocalStorage caching with TTL
- Modular JavaScript architecture
- Responsive design with CSS variables

## Project Structure

```
/projectCerebro
├── dashboard.html        # Main dashboard (characters, party)
├── ficha.html           # Character sheet editor
├── cerebro.html         # Campaign wiki/NPC management
├── combatt.html         # Combat tracker
├── wiki.html            # Campaign wiki
├── admin.html           # GM administration panel
├── assets/
│   ├── js/              # JavaScript modules
│   │   ├── config.js           # App configuration
│   │   ├── supabase-client.js  # Supabase setup
│   │   ├── auth-module.js      # Authentication
│   │   ├── api-module.js       # Data operations
│   │   ├── globals.js          # Global exports
│   │   ├── cache-module.js     # LocalStorage caching
│   │   ├── themes.js           # Theme definitions
│   │   ├── theme-icons.js      # Theme SVG icons
│   │   └── header.js           # Header functionality
│   ├── css/             # Stylesheets
│   │   ├── base.css          # Base styles
│   │   ├── components.css    # Shared components
│   │   ├── dashboard.css     # Dashboard-specific
│   │   ├── ficha.css         # Character sheet
│   │   ├── cerebro.css       # Cerebro/wiki
│   │   ├── combatt.css       # Combat tracker
│   │   ├── wiki.css          # Wiki pages
│   │   └── admin.css         # Admin panel
│   └── img/             # Images and icons
└── kanban/              # Project tracking
```

## Development

### Prerequisites
- Node.js (for development tools)
- Supabase account (for backend)

### Setup
1. Clone repository
2. Configure Supabase credentials in `assets/js/config.js`
3. Open `dashboard.html` in browser

### Architecture
- Modular JavaScript with global exports via `globals.js`
- Event-driven UI with delegated event handlers
- LocalStorage caching with TTL for performance
- CSS variables for easy theming
- Web Components-like patterns for reusable UI

## License

MIT