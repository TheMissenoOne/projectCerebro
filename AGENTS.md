# projectCerebro Agent Guidelines

## Modes & Plugins (always on)
- **caveman ultra** — brief, direct, 1-4 lines. No fluff. Answer only what asked. Off only on
  "normal mode" / "stop caveman". Code/commits/PRs written normal.
- **ponytail** — lazy-senior on all code. YAGNI → reuse → stdlib → native → installed dep →
  one line → minimal. Root-cause fix, not symptom patch. Shortcuts get `ponytail:` comment.
- **superpowers** — skill check before acting. Feature → brainstorming. Bug →
  systematic-debugging. Impl → TDD. "Done" → verification-before-completion.
- **impeccable** — every frontend/UI change through impeccable/design skills.

## Agent Orchestration
Route + judgment stay in main session; delegate doing to a model-tier subagent by task weight:
- **quick** (Haiku) — fast answers, summaries, extraction, lookups. Read-only.
- **builder** (Sonnet) — default for real work: coding, debugging, refactoring, multi-file, tests.
- **architect** (Opus) — deep reasoning only: system/data design, hard root-cause debugging.
Orchestrator keeps: commits/pushes, prod-DB mutations, final calls. Subagents never
commit/push/mutate prod or spawn further agents.

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
