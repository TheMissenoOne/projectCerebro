# projectCerebro Agent Guidelines

## Mode
**Always caveman ultra** — brief, direct, 1-4 lines. No fluff. Answer only what asked.

## Memory
- `memory_recall()` @ session start
- NEVER auto-remember — ask user first
- Session end: ask "remember [specific thing]?"

## Kanban
- Read `kanban/INDEX.md` @ session start
- Check `kanban/done/fase-*.md` for context
- Update when task done

## Project
X-Men TTRPG companion. Vanilla JS + Supabase. No frameworks.

Pages: `index` login | `dashboard` player hub | `ficha` char sheet | `admin` GM panel | `cerebro` NPCs | `combate` AV/OV calc | `wiki` campaign wiki

## JS Load Order (strict)
`config.js` → `i18n.js` → `supabase-client.js` → `cache-module.js` → `auth-module.js` → `api.js` → `globals.js` → `themes.js` → `header.js` → page-specific

## Theme System
CSS vars: `--accent`, `--accent2`, `--accent3`
Themes: `yellow` | `red` | `green` | `purple` | `blue`

## i18n
Keys in `assets/js/i18n.js`. Use `t('key')` in JS, `data-i18n="key"` in HTML.
Lang swap reloads page so all `t()` calls rerun.

## Known Issues
- Duplicate pages: `xmen-ficha.html`, `npcs.html` (legacy, ignore)
- `foto_base64` column added to DB (2025)

## Dev
```
npm run serve   # http-server :3000
npx playwright test
```

## Session End
`memory_recall()` | update kanban | ask remember learnings | confirm changes logged
