# Agent Guidelines for projectCerebro

## Memory Usage (CRITICAL)

**One line, detailed** - Keep each memory on a single line to avoid git conflicts. Be detailed but concise. Include file references where applicable.

- Use `memory_recall()` at session START and before answering any questions
- **NEVER** use `memory_remember()` automatically - only when user explicitly asks to remember something
- If user asks to remember: store as patterns, decisions, learnings, preferences, blockers, or context
- If new info contradicts existing memory: ask user before using `memory_forget()` + `memory_remember()`
- **End of session**: If significant patterns, decisions, or learnings were discovered, ask user: "Would you like me to remember [specific thing]?"

**Use memory_recall freely. NEVER memory_remember automatically.**

### Memory Types

| Type | Use For | Example |
|------|---------|---------|
| decision | Architecture/design choices | "Using Supabase for auth + database. See: server/db.js" |
| learning | Codebase discoveries | "Character sheets stored in characters.data JSONB column. See: supabase/schema.sql" |
| preference | User/project preferences | "User prefers modular JS files over monolithic api.js" |
| blocker | Known issues | "Hardcoded Supabase keys in assets/js/api.js - needs env vars" |
| context | Feature/system info | "Uses JWT tokens for API auth, not Supabase Auth" |
| pattern | Code patterns | "All HTML pages use same CSS vars from base.css. See: assets/css/base.css" |

### Memory Scopes

| Scope | Use For |
|-------|---------|
| `project` | Project-wide decisions and patterns |
| `kanban` | Kanban board structure and current phase status |
| `frontend` | HTML/CSS/JS frontend decisions |
| `backend` | Server, routes, database decisions |
| `database` | Supabase schema and table structures |
| `auth` | Authentication/authorization context |

---

## Kanban System Usage (CRITICAL)

This project uses a kanban board for tracking development phases. **Always reference and update the kanban** when working on features.

### Kanban Location
- Index: `kanban/INDEX.md`
- Done phases: `kanban/done/fase-*.md`

### How to Use Kanban

1. **Read the kanban at session START**: Always check `kanban/INDEX.md` to understand current project status
2. **Reference existing phases**: When working on a feature, check if there's a related phase in `kanban/done/`
3. **Update the kanban** when:
   - Completing a task from a phase
   - Discovering new work needed
   - Finding that something is already done
4. **Create new phase cards** for significant new features:
   - Format: `fase-X-feature-name.md`
   - Include: Overview, Tasks (checkboxes), Notes

### Example Kanban Workflow

```
# Before starting work:
1. Read kanban/INDEX.md to see current phase
2. memory_recall() for project context
3. Check if related phase exists in kanban/done/

# During work:
4. Update the kanban file when completing tasks
5. Note any new discoveries or blockers

# End of session:
6. Ask user: "Should I remember [key learnings]?"
7. Summarize what was done for future reference
```

---

## Project Structure

### Frontend (assets/)
```
assets/
├── css/
│   ├── base.css        # CSS variables, animations, layout
│   ├── components.css # Reusable UI components
│   ├── auth.css       # Login/register page styles
│   ├── dashboard.css  # Dashboard page styles
│   ├── combate.css    # Combat calculator styles
│   ├── wiki.css       # Wiki page styles
│   └── admin.css      # Admin panel styles
└── js/
    ├── config.js           # Supabase URL/key config
    ├── supabase-client.js # Client initialization
    ├── auth-module.js     # Login/register/logout
    ├── api-module.js      # CRUD operations
    ├── globals.js         # Window.* aliases
    ├── themes.js          # Theme switching
    ├── header.js          # Header toolbar
    ├── music.js           # Background music
    └── wiki.js            # Wiki data
```

### Backend (server/)
```
server/
├── config.js      # Centralized configuration
├── db.js          # Supabase client
├── index.js       # Express entry point
├── middleware/
│   └── auth.js    # JWT verification
├── routes/
│   ├── auth.js       # Register/login
│   ├── characters.js # Character CRUD
│   ├── parties.js    # Party management
│   ├── players.js    # Player endpoints
│   ├── profiles.js   # User profiles
│   └── npcs.js       # NPC CRUD
└── services/        # Business logic layer (future)
```

### Database (supabase/)
```
supabase/
├── schema.sql    # Table definitions
├── seed.sql      # Initial data
└── rls.sql       # Row-level security
```

---

## Key Patterns

### HTML Pages
- 8 main HTML files: `index.html`, `dashboard.html`, `ficha.html`, `cerebro.html`, `npcs.html`, `combate.html`, `wiki.html`, `admin.html`
- Most have inline `<style>` blocks that should be moved to external CSS
- Load JS in order: config.js → supabase-client.js → auth-module.js → api-module.js → globals.js → themes.js → page-specific

### CSS Variables
- Defined in `assets/css/base.css`
- Theme colors use: `--accent`, `--accent2`, `--accent3`, `--accentRGB`
- Available themes: yellow (default), red, green, purple, blue

### API Pattern
- Client uses Supabase JS SDK directly
- Some pages call REST API via fetch() for special operations
- Server routes use JWT for auth, not Supabase Auth

---

## Known Issues / Technical Debt

- Inline CSS in HTML pages needs extraction to external CSS files
- Duplicate pages: `xmen-ficha.html` (likely old version of `ficha.html`), `npcs.html` (similar to `cerebro.html`)
- Hardcoded credentials in `assets/js/config.js` and `server/config.js`
- Server services layer not implemented yet

---

## Useful Commands

```bash
# Start backend server
cd server && npm start

# Check kanban status
cat kanban/INDEX.md
```

---

## End of Session Checklist

- [ ] memory_recall() to get project context
- [ ] Update kanban if any tasks completed
- [ ] Ask user: "Would you like me to remember [specific learnings/decisions]?"
- [ ] Ensure all file changes are reflected in kanban if needed