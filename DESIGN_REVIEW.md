# X-Men TTRPG Web App - Design Review
**Review Date:** April 2026  
**Reviewer:** Design Director  
**Scope:** index.html, dashboard.html, cerebro.html, ficha.html, combate.html, wiki.html, npcs.html, admin.html

---

## 1. AI Slop Verdict: **CLEAN** ✅

**Verdict: NOT AI-generated.** The project shows clear evidence of intentional, human-crafted design:

- **Custom Bebas Neue + Share Tech Mono + Barlow Condensed font stack** - distinct, deliberate typography choices
- **X-Men internal system aesthetic** - fully realized concept (logo, color system, copy)
- **No anti-patterns detected:**
  - No gradient text anywhere
  - No side-stripe borders (>1px) - borders are 1-3px solid accent lines
  - No glassmorphism blur effects
  - No hero metric card layouts
  - No generic Inter/Roboto fonts
- **Authentic comic-book-inspired design:**
  - Custom SVG X-logo with precise geometric construction
  - Diagonal accent lines, clipped corners, scan-line overlay effects
  - Thematic faction color coding (X-Men yellow, Brotherhood red, Morlock green, etc.)

---

## 2. Nielsen's 10 Heuristics (0-4 scale)

| # | Heuristic | Score | Notes |
|---|----------|-------|-------|
| 1 | Visibility of system status | **3** | Save indicators, loading states present but inconsistent (some use "// SALVANDO..." text, others use colored dots) |
| 2 | Match between system and real world | **4** | Excellent. X-Men faction terminology, comic book semantics, "Cérebro" database metaphor, "Xavier Institute" branding |
| 3 | User control and freedom | **3** | Undo not available in forms. Back buttons exist but no explicit cancel/revert. Party create/join modals good |
| 4 | Consistency and standards | **3** | Generally consistent header/toolbar/content pattern across pages. Some JS injection inconsistencies |
| 5 | Error prevention | **2** | Very weak. No input validation feedback on most forms. Password minlength enforced but no realtime validation |
| 6 | Recognition rather than recall | **3** | Good iconography + labels. Character cards show name+codename. Category pills use visual color dots |
| 7 | Flexibility and efficiency of use | **3** | GM vs player modes in Cerebro. Theme switcher. Tab navigation. Speed-ups exist but keyboard shortcuts absent |
| 8 | Aesthetic and minimalist design | **3** | Information-dense but intentional. Comic panel aesthetic. Could be overwhelming for new users |
| 9 | Help users recognize, diagnose, recover from errors | **1** | Near absent. Only generic alert() with error.message. No inline validation, no recovery guidance |
| 10 | Help and documentation | **2** | Wiki exists but disconnected from context. No inline help tooltips. Modal help text minimal |

**Total Score: 27/40** (67.5%)

---

## 3. Cognitive Load Assessment (8-item checklist)

| Item | Status | Failure Count |
|------|-------|--------------|
| 1. Simple language | ✅ PASS | 0 |
| 2. Limited choices per screen | ⚠️ PARTIAL | 1 failure |
| 3. Clear visual hierarchy | ✅ PASS | 0 |
| 4. Consistent navigation | ✅ PASS | 0 |
| 5. No hidden states | ⚠️ PARTIAL | 1 failure |
| 6. Clear feedback | ⚠️ PARTIAL | 1 failure |
| 7. Grouped elements | ✅ PASS | 0 |
| 8. Progressive disclosure | ❌ FAIL | 2 failures |

**Failures: 5/8** (62.5% pass rate - HIGH cognitive load)

**Issues:**
- **Failure: too many categories at once** - npcs.html/cerebro.html show 8 category pills immediately (X-Men, Novatos, Morlock, Irmandade, Vilão, Crime, Neutro + TODOS)
- **Failure: hidden encounter state** - Encounter section starts collapsed but requires interaction to discover
- **Failure: inconsistent feedback** - some saves show "// SALVO ✓", others show colored dot, some show nothing
- **Failure: no progressive disclosure** - all stat inputs shown at once in ficha.html; NPC detail view shows all attributes simultaneously

---

## 4. What's Working (2-3 items)

### ✅ T1: Thematic Identity (Outstanding)
- Custom X-logo SVG with diagonal accent aesthetic
- Color-coded factions with distinct hues (X-Men yellow, Brotherhood red, Morlock green)
- Theme system with 5 color options (yellow/red/green/purple/blue)
- "Xavier Institute", "Cérebro Database" copy that creates immersive worldbuilding
- Scanline overlay pattern (body::after) adds cinematic depth

### ✅ T2: Character Sheet Structure (Excellent)
- Tabbed interface (ficha/temas/esquadrão) provides intuitive navigation
- Portrait + ID fields + 9 attribute grid is clean and scannable
- Theme cards with Attention/Dissipation trackers are mechanically clear
- Export/import .MD preserves portability

### ✅ T3: Combat Calculator (Solid Tool)
- MEGS system AV/OV/EV/RV/RAPs properly implemented
- Dice roller with 2d10 distribution visualization
- Reference tables for all calculation modes
- Character/NPC selector dropdowns

---

## 5. Priority Issues (3-5 with What/Why/Fix)

### 🔴 P1: No Form Validation Feedback (Error Prevention Failure)
- **What:** Password requirements enforced in HTML but no realtime validation; error messages only show after submit
- **Why:** Players waste time submitting invalid forms; frustration with unclear requirements
- **Fix:** Add inline validation (CSS :valid/:invalid), show password requirements before submit, inline error text

### 🔴 P2: Inconsistent Save State Feedback (Cognitive Load)
- **What:** Different pages use different save states: "// SALVO ✓" vs colored dot vs nothing
- **Why:** Users can't quickly determine if save succeeded; no unified feedback pattern
- **Fix:** Create single save-indicator component, standardizing across all pages (e.g., fixed bottom bar showing last save timestamp)

### 🔴 P3: Hidden Discovery in Cerebro/Cards (Flexibility)
- **What:** Encounter panel and settings panel start collapsed with no hint that expandable content exists
- **Why:** New GMs must click around to find encounter management; discoverability failure
- **Fix:** Add subtle "active" indicator or expand panel by default when encounter has participants

### 🟡 P4: Information Overload in NPC Detail (Cognitive Load)
- **What:** NPC detail shows all 9 attributes + tags + description at once with no prioritization
- **Why:** Difficult to quickly scan relevant info during combat; requires cognitive parsing
- **Fix:** Add collapsible attribute groups, prioritize tags with highest degree, add "quick stats" summary bar

### 🟡 P5: No Inline Help / Error Recovery (Heuristics 9)
- **What:** No help text near complex inputs; error recovery limited to alert()
- **Why:** Users face cryptic error states with no guidance to resolve
- **Fix:** Add field-level helper text (?), inline error messages below fields, "need help?" links

---

## 6. Minor Observations

- **npcs.html and cerebro.html are functionally identical** - duplicate pages suggest architectural uncertainty
- **Hardcoded Supabase keys in code** - known blocker per AGENTS.md
- **foto_base64 column missing in remote DB** - noted blocker
- **inline CSS in HTML** - significant style debt (scattered in `<style>` tags across all pages)
- **No loading skeleton states** - blank screens during async operations
- **Character deletion confirmation** - some pages missing confirm() dialogs
- **Mobile responsive:** Some pages mostly work but npcs.html left panel on mobile needs hamburger menu toggle

---

## 7. Provocative Questions

1. **Why does npcs.html exist alongside cerebro.html?** - They share 90%+ code. Consolidate or sunset one?

2. **Should Wiki content be integrated contextual inline help?** - Currently a separate section. Players leave context to reference rules.

3. **Is the dark theme actually optimal for extended VTT play?** - #080808 is very deep. Consider mid-dark option (#1a1a1a) for fatigue reduction.

4. **Why no keyboard shortcuts for GM encounter management?** - Tab-dice-calc cycle is 3 clicks minimum.

5. **Should character portrait be required or optional?** - Currently optional but high-value visual for VTT immersion.

6. **What's the plan for character transfer/legacy?** - No export of full character state including party affiliations.

7. **Is localStorage the right persistence layer?** - Encounter state in npcs.html vs Cerebro-specific keys = fragmentation risk.

---

## Summary Metrics

| Metric | Score |
|--------|-------|
| AI Slop Verdict | CLEAN |
| Nielsen Score | 27/40 (67.5%) |
| Cognitive Load Failures | 5/8 (62.5% pass) |
| Working Highlights | 3 |
| Priority Issues | 5 |
| Minor Issues | 7 |
| Provocative Questions | 7 |

**Recommendation:** Address P1 (form validation) and P3 (hidden discoverability) in next sprint. Overall solid execution of thematic vision; technical debt in consistency and error handling is main friction for production use.
