# Fase G: CodeRabbit Review Issues

## Overview
Address all issues identified in the CodeRabbit review (coderabbitReview.md) to improve code quality, accessibility, security, and maintainability.

## Tasks

### CSS Theme Fixes
- [x] Replace hardcoded colors with CSS variables in combate.css and combate.html
  - Line 195: .roll-result.success color #44bb44 → var(--green)
  - Line 111: .result-value.success color #44bb44 → var(--green)
  - Line 144: .mode-btn.active background rgba(255,214,0,.1) → rgba(var(--accentRGB), 0.1)
  - combat.html line 39: .result-value.success { color: #44bb44; } → var(--green)
  - combat.html line 54: .roll-result.success { color: #44bb44; } → var(--green)
- [x] Fix wiki.css theme issues
  - Line 24-31: .wiki-nav-title font-size .4rem → .65rem (accessibility)
  - Line 46-50: .wiki-nav-link.active hardcoded red → theme variables (--accent, --accentRGB)
  - Line 58-66: .wiki-content h1 border var(--red) → var(--accent)
- [x] Fix admin.css theme and accessibility issues
  - Line 103-112: Add .admin-select:focus state for keyboard accessibility
  - Line 150-173: Add focus states to buttons (.admin-btn, .admin-btn-danger)
- [x] Fix components.css accessibility
  - Line 575-592: Add :focus-visible state for .music-toggle-btn
- [x] Fix base.css duplicate selector
  - Line 163-172: Remove duplicate .th-btn selector and consolidate styles

### JavaScript Fixes
- [x] Fix music.js issues
  - Line 50-52: Add error handling for musicPlayer.play() Promise rejection
  - Line 9-12: Replace unreliable Google Drive URL with local audio + change var to let
  - Line 20-23: Only persist MUSIC_KEY after successful playback
- [x] Fix header.js security
  - Line 90-99: Add guard against undefined profile in requireGM function
- [x] Fix api.js configuration
  - Line 8-9: Replace hardcoded Supabase credentials with window.SUPABASE_CONFIG
- [x] Fix config.js duplicate
  - Line 14-26: Remove duplicate getSupabaseClient function definition
- [x] Fix auth-module.js profile query
  - Line 38-49: Change profile lookup from email to user.id
- [ ] Fix api-module.js raw fetch
  - Line 73-93: Refactor saveCharacter to use Supabase client instead of raw fetch

### Workflow & Deployment
- [x] Fix deploy.yml workflow
  - Line 30-32: Added comment clarifying no build step needed (static site)

### Database Security
- [x] Fix supabase-setup.sql policies
  - Line 26-28: Add SELECT policy for party members to view party
  - Line 30-35: Add DELETE policy for party_members (leave/remove members)
  - Line 37-39: Add SELECT policy for party members to view sessions
  - Line 23-24: Restrict NPC management to GM only (remove overly permissive policy)

### HTML/UI Fixes
- [x] Fix index.html registration
  - Line 74-81: Remove GM role selection from registration form (player-only registration)
- [ ] Fix cerebro.html duplicates
  - Line 865-875: Remove duplicate function definitions (filtrar, setCat, mudaRodada, etc.)
  - Line 248-249: Remove duplicate id="toast" element (done, keep API version)
- [x] Fix wiki.html duplicates
  - Line 538-591: Remove duplicate evrvData definition (kept first, used by combinedData)
- [x] Fix wiki.html.bak duplicates
  - Line 574-591: Remove duplicate evrvData declaration

### Code Cleanup
- [x] Fix test-page.js CI compatibility
  - Line 38-41: Add exit code for CI pipeline compatibility (process.exit based on errors)
- [ ] Remove session log from version control
  - Add session-*.md to .gitignore and remove session-ses_2914.md

### Testing (ALL PASSED)
- [x] E2E Tests: All 7 pages load without errors
- [x] Unit Tests: 7/7 tests passed
- [x] Validation: Theme switching works
- [x] Fix wiki.html renderThemeDots (was missing)

### Kanban Updates
- [x] Fix kanban/INDEX.md inconsistencies
  - Line 24-28: Resolve Fase F status conflict (table shows Done but text says in progress)
  - Line 36: Update architectural statement to reflect actual backend presence
- [x] Fix kanban/done/fase-f-modularizacao.md
  - Line 42-57: Remove duplicated "Server Services Layer (Fase 4)" section

## Notes
- All CSS variable changes should verify that variables are defined in assets/css/base.css
- Test theme switching after CSS changes
- Verify accessibility improvements with keyboard navigation
- Test JavaScript fixes in browser console
- Ensure SQL policies are tested with appropriate auth roles