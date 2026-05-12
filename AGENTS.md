# projectCerebro Agent Guidelines

## Memory
memory_recall() @ start | NEVER memory_remember auto | ask user before forget+remember
End session: ask "remember [specific thing]?"

## Kanban
kanban/INDEX.md @ start | check kanban/done/fase-*.md | update when task done

## Patterns
JS load order: config.js → supabase-client.js → cache-module.js → auth-module.js → api.js → globals.js → themes.js → page-specific
Theme colors: --accent, --accent2, --accent3 | themes: yellow/red/green/purple/blue

## Known Blockers
duplicate pages (xmen-ficha.html, npcs.html) | foto_base64 added to DB (2025)

## Commands
cd server && npm start | cat kanban/INDEX.md

## Communication
**Always caveman mode** - brief, direct, 1-4 lines. No fluff. Answer question only. /caveman lite|full|ultra

## Session End
memory_recall() | update kanban | ask remember learnings | ensure changes in kanban