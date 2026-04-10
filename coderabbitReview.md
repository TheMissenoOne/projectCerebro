
============================================================================
File: assets/css/combate.css
Line: 195
Type: potential_issue

Comment:
Replace hardcoded color with CSS variable.

The hardcoded green color #44bb44 prevents proper theme switching (same issue as line 111). As per coding guidelines, theme colors should be defined using CSS variables.




🎨 Proposed fix using CSS variable

-.roll-result.success { color: #44bb44; }
+.roll-result.success { color: var(--green); }


Note: Ensure --green is defined in assets/css/base.css for all themes.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/combate.css at line 195, Replace the hardcoded color in the .roll-result.success rule with a CSS variable so themes can override it: change the rule to use var(--green) (or another theme token like --color-success) in place of #44bb44 and ensure the variable is declared in assets/css/base.css for all themes; update any related selectors that rely on .roll-result.success if needed to maintain specificity.

============================================================================
File: .github/workflows/deploy.yml
Line: 34 to 37
Type: potential_issue

Comment:
Uploading entire workspace will deploy unnecessary files.

Using path: '.' uploads the entire repository including node_modules/, .git/, source files, and configuration files. This bloats the deployment, slows it down significantly, and may expose unintended files.

Update the path to your actual build output directory (commonly dist/, build/, or public/).



🔧 Proposed fix to upload only build output

       - name: Upload artifact
         uses: actions/upload-pages-artifact@v3
         with:
-          path: '.'
+          path: './dist'


Adjust ./dist to match your project's actual build output directory.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @.github/workflows/deploy.yml around lines 34 - 37, The workflow is uploading the entire repository because actions/upload-pages-artifact is configured with path: '.'; change the artifact path to your actual build output directory (e.g., './dist', './build' or './public') so only built assets are uploaded—update the step using actions/upload-pages-artifact@v3 to reference your project's build output (replace path: '.' with the correct output folder) and verify the build step produces files there before the upload step.

============================================================================
File: assets/css/combate.css
Line: 111
Type: potential_issue

Comment:
Replace hardcoded color with CSS variable.

The hardcoded green color #44bb44 prevents proper theme switching. As per coding guidelines, theme colors should be defined using CSS variables to support all available themes (yellow, red, green, purple, blue).

Consider defining a success color variable (e.g., --success or --green) in assets/css/base.css and using it here.




🎨 Proposed fix using CSS variable

-.result-value.success { color: #44bb44; }
+.result-value.success { color: var(--green); }


Note: Ensure --green is defined in assets/css/base.css for all themes.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/combate.css at line 111, The CSS rule .result-value.success uses a hardcoded color #44bb44 which breaks theme switching; replace the literal with a CSS variable (e.g., use var(--success) or var(--green)) and ensure that variable (--success or --green) is defined for all themes in assets/css/base.css so the selector .result-value.success picks up the correct color per theme.

============================================================================
File: assets/css/combate.css
Line: 144
Type: potential_issue

Comment:
Replace hardcoded RGBA with CSS variable.

The hardcoded yellow RGBA value rgba(255,214,0,.1) prevents proper theme switching. As per coding guidelines, theme colors should use CSS variables, and --accentRGB is available for RGBA usage.




🎨 Proposed fix using CSS variable

-.mode-btn.active {
-  border-color: var(--accent);
-  background: rgba(255,214,0,.1);
-  color: var(--accent);
-}
+.mode-btn.active {
+  border-color: var(--accent);
+  background: rgba(var(--accentRGB), 0.1);
+  color: var(--accent);
+}

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/combate.css at line 144, Replace the hardcoded background color rgba(255,214,0,.1) with the theme CSS variable by using the RGB variable with the alpha value, e.g. change background: rgba(255,214,0,.1); to background: rgba(var(--accentRGB), .1); so the rule uses --accentRGB for proper theme switching.

============================================================================
File: .github/workflows/deploy.yml
Line: 30 to 32
Type: potential_issue

Comment:
Missing build step.

The step is named "Install and Build" but only runs npm install. If this project requires a build step (e.g., npm run build), it's missing. This would result in deploying source files instead of built output.



🔧 Proposed fix to add build command

       - name: Install and Build
         run: |
           npm install
+          npm run build

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @.github/workflows/deploy.yml around lines 30 - 32, The "Install and Build" step currently only runs npm install; update that step (named "Install and Build") to run the actual build after installing dependencies (e.g., replace npm install with npm install && npm run build or separate lines npm install then npm run build), and ensure the package.json contains a matching "build" script so the workflow fails on build errors.

============================================================================
File: assets/css/wiki.css
Line: 24 to 31
Type: potential_issue

Comment:
Font size .4rem is extremely small and may cause readability issues.

At a base of 16px, .4rem equals ~6.4px, which is below minimum readable text size. Consider increasing to at least .65rem or .7rem for better accessibility.




🔧 Proposed fix

 .wiki-nav-title {
   font-family: var(--mono);
-  font-size: .4rem;
+  font-size: .65rem;
   color: var(--muted2);
   letter-spacing: .15em;
   text-transform: uppercase;
   padding: 6px 16px;
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/wiki.css around lines 24 - 31, The .wiki-nav-title rule sets font-size: .4rem (about 6.4px) which is too small; update the CSS rule for .wiki-nav-title to use a larger, accessible size (e.g., font-size: .65rem or .7rem) and verify the change still fits the layout and spacing defined by padding and letter-spacing; ensure only the font-size value in the .wiki-nav-title selector is adjusted so other styles (font-family, color, letter-spacing, text-transform, padding) remain unchanged.

============================================================================
File: assets/css/admin.css
Line: 103 to 112
Type: potential_issue

Comment:
Add focus state to .admin-select for accessibility consistency.

The .admin-input has a :focus state (line 99-101), but .admin-select does not. For keyboard accessibility and consistency, the select element should have a matching focus indicator.



♿ Proposed fix to add focus state

 .admin-select {
   padding: 8px 12px;
   background: var(--p2);
   border: 1px solid var(--b2);
   color: var(--white);
   font-family: var(--mono);
   font-size: .55rem;
   outline: none;
   cursor: pointer;
 }
+.admin-select:focus {
+  border-color: var(--accent);
+}

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/admin.css around lines 103 - 112, Add a matching focus state for the .admin-select rule to provide the same keyboard-accessible outline as .admin-input: update the stylesheet to include a .admin-select:focus selector that applies the same outline (and outline-offset if used) and ensures outline-none is removed only for non-focused state; reference the existing .admin-input :focus behavior and replicate its properties for .admin-select to keep visual and accessibility consistency.

============================================================================
File: assets/css/wiki.css
Line: 46 to 50
Type: potential_issue

Comment:
Hardcoded red color breaks theme support.

The .active state uses hardcoded red (rgba(232,0,28,.1) and var(--red)) instead of the theme-aware accent variables. As per coding guidelines, theme colors should use --accent and --accentRGB to support all themes (yellow, red, green, purple, blue).




🎨 Proposed fix for theme compatibility

 .wiki-nav-link.active {
-  background: rgba(232,0,28,.1);
-  color: var(--red);
-  border-left: 2px solid var(--red);
+  background: rgba(var(--accentRGB),.1);
+  color: var(--accent);
+  border-left: 2px solid var(--accent);
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/wiki.css around lines 46 - 50, The .wiki-nav-link.active selector is using hardcoded red values (rgba(232,0,28,.1) and var(--red)) which breaks theme support; update .wiki-nav-link.active to use the theme variables --accentRGB for the translucent background (e.g., rgba(var(--accentRGB), 0.1)) and --accent for the text/border color instead of var(--red) so the active state respects yellow/green/blue/purple themes and follows the existing CSS variable convention.

============================================================================
File: assets/css/admin.css
Line: 150 to 173
Type: potential_issue

Comment:
Add focus states to buttons for keyboard accessibility.

The buttons have hover states but lack :focus or :focus-visible styles. This affects keyboard navigation accessibility.



♿ Proposed fix to add focus states

 .admin-btn:hover {
   border-color: var(--accent);
   color: var(--accent);
 }
+.admin-btn:focus-visible {
+  border-color: var(--accent);
+  color: var(--accent);
+  outline: none;
+}
 .admin-btn-danger {
   border-color: var(--red2);
   color: var(--red);
 }
 .admin-btn-danger:hover {
   background: var(--red);
   color: var(--white);
 }
+.admin-btn-danger:focus-visible {
+  background: var(--red);
+  color: var(--white);
+  outline: none;
+}

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/admin.css around lines 150 - 173, Buttons (.admin-btn and .admin-btn-danger) only have hover styles and need keyboard focus styling for accessibility; add :focus and/or :focus-visible rules matching the hover affordance (e.g., change border-color and color, and add a visible outline or focus-ring/box-shadow) so keyboard users see focus, and ensure :focus-visible is used where available to avoid showing the ring on mouse clicks; update both .admin-btn:focus, .admin-btn:focus-visible and .admin-btn-danger:focus, .admin-btn-danger:focus-visible to mirror hover states with a clear, high-contrast focus indicator.

============================================================================
File: assets/css/wiki.css
Line: 58 to 66
Type: potential_issue

Comment:
h1 border uses --red instead of theme-aware --accent.

For consistency with h3 (which correctly uses var(--accent)) and to support all themes, the h1 border should use the accent color variable.




🎨 Proposed fix

 .wiki-content h1 {
   font-family: var(--disp);
   font-size: clamp(1.6rem, 4vw, 2.2rem);
   color: var(--white);
   letter-spacing: .1em;
   margin-bottom: 20px;
-  border-bottom: 2px solid var(--red);
+  border-bottom: 2px solid var(--accent);
   padding-bottom: 8px;
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/wiki.css around lines 58 - 66, The h1 rule under .wiki-content currently uses a hardcoded border color var(--red); update the border property in the .wiki-content h1 CSS selector to use the theme-aware variable var(--accent) instead (to match the .wiki-content h3 behavior), ensuring consistency across themes by replacing the existing "border-bottom: 2px solid var(--red);" with a "border-bottom: 2px solid var(--accent);" declaration.

============================================================================
File: assets/css/components.css
Line: 575 to 592
Type: potential_issue

Comment:
Add :focus state for keyboard accessibility.

The button is missing a :focus state, which is required for keyboard navigation. Users navigating with the keyboard won't have any visual feedback when the button receives focus.




♿ Proposed fix to add focus state

 .music-toggle-btn {
   position: fixed;
   bottom: 20px;
   right: 20px;
   width: 48px;
   height: 48px;
   border-radius: 50%;
   background: var(--accent);
   border: 2px solid var(--accent);
   color: var(--black);
   cursor: pointer;
   z-index: 9999;
   display: flex;
   align-items: center;
   justify-content: center;
   box-shadow: 0 4px 12px rgba(0,0,0,0.4);
   transition: all .2s;
+  outline: none;
 }
+
+.music-toggle-btn:focus-visible {
+  outline: 2px solid var(--accent2);
+  outline-offset: 2px;
+}

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/components.css around lines 575 - 592, The .music-toggle-btn has no keyboard focus style; add a visible focus state by defining .music-toggle-btn:focus and/or .music-toggle-btn:focus-visible to apply a clear outline or contrasting box-shadow and/or change border color (e.g., outline: 3px solid rgba(...) or box-shadow with an accent ring) and ensure :focus styles persist for keyboard users while not interfering with click styles; update the transition to include outline/box-shadow if needed and keep selector .music-toggle-btn for consistency.

============================================================================
File: assets/js/music.js
Line: 50 to 52
Type: potential_issue

Comment:
Unhandled Promise rejection on play().

musicPlayer.play() returns a Promise that can reject (e.g., if user hasn't interacted with the page yet). This could cause an unhandled rejection warning in the console.




Proposed fix

     } else {
-      musicPlayer.play();
+      musicPlayer.play().catch(function(e) {
+        console.warn('Playback failed:', e.message);
+      });
     }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/music.js around lines 50 - 52, The else branch calling musicPlayer.play() can produce an unhandled rejected Promise (e.g., autoplay blocked); update the call in the else block that contains musicPlayer.play() to handle rejection by either awaiting it inside an async function with try/catch or chaining .catch(...) on the returned Promise and log/handle the error (use the musicPlayer.play() call site to add the catch or wrap in try/catch so all rejections are handled).

============================================================================
File: assets/js/music.js
Line: 9 to 12
Type: potential_issue

Comment:
External audio URL may be unreliable.

Google Drive uc?export=download URLs are subject to rate limiting, CORS restrictions, and can break if the file sharing settings change. Consider hosting the audio file on your own server or a CDN designed for media delivery.

Also, prefer let over var for mutable module-level state to avoid hoisting issues.




Suggested improvement

-const XMEN97_THEME = 'https://docs.google.com/uc?export=download&id=1rZp6_1vL6iR8wK3zKj8N9hL4mX2cT6B8';
+const XMEN97_THEME = '/assets/audio/xmen97-theme.mp3'; // Host locally for reliability

-var musicPlayer = null;
-var musicMuted = false;
+let musicPlayer = null;
+let musicMuted = false;

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/music.js around lines 9 - 12, Replace the fragile Google Drive download link in XMEN97_THEME with a stable media-hosted URL (your server or a CDN) and update any code that references XMEN97_THEME to use the new location; also change the module-level mutable declarations from var musicPlayer and var musicMuted to let musicPlayer and let musicMuted to avoid hoisting/closure issues and ensure consistent block-scoped behavior across functions that use musicPlayer and musicMuted.

============================================================================
File: assets/js/music.js
Line: 20 to 23
Type: potential_issue

Comment:
Premature persistence of "played" flag.

If playTheme() fails due to autoplay being blocked (which is common on modern browsers), the MUSIC_KEY is still set to 'true'. This means the music will never attempt to play again on subsequent logins, even after the user interacts with the page.

Consider only persisting the flag after successful playback, or restructuring to always attempt playback on login until the user explicitly mutes.




Proposed fix

  if (!hasPlayed) {
-   playTheme();
-   localStorage.setItem(MUSIC_KEY, 'true');
+   playTheme().then(function(played) {
+     if (played) {
+       localStorage.setItem(MUSIC_KEY, 'true');
+     }
+   });
  }


This requires playTheme() to return a Promise indicating success (see related comment on that function).

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/music.js around lines 20 - 23, The current logic sets MUSIC_KEY prematurely even if playTheme() fails; update playTheme to return a Promise that resolves on successful playback (or rejects on failure), then change the block that checks hasPlayed so it awaits playTheme() and only calls localStorage.setItem(MUSIC_KEY, 'true') when the returned Promise resolves; alternatively, if you prefer auto-retry behavior, ensure the login path always calls playTheme() until the user explicitly mutes rather than flipping MUSIC_KEY on failure. Use the hasPlayed variable, playTheme() function, and MUSIC_KEY constant to locate and implement this change.

============================================================================
File: assets/css/base.css
Line: 163 to 172
Type: potential_issue

Comment:
Critical: Duplicate .th-btn selector creates cascade conflicts.

The .th-btn selector is defined twice in this file:
- New definition at lines 163-166 (with min-width and padding override using !important)
- Existing definition at line 200 (with comprehensive styling: font, border, colors, transitions, etc.)

This creates several issues:
1. Cascade confusion: Due to source order, properties from the new definition will override the existing one, potentially breaking existing buttons styled with the complete definition
2. !important code smell: The use of !important on line 165 indicates a specificity issue that should be resolved properly rather than forced
3. Maintenance burden: Future developers won't know which definition is authoritative

Additionally, the new .th-btn span creates an 8px circular indicator, which appears redundant with the existing .th-dot class at line 202 (7px circle).




♻️ Proposed fix: Consolidate selectors

Consider one of these approaches:

Option 1: If these are for different button variants, use a modifier class:

-.th-btn {
-  min-width: 24px;
-  padding: 4px 6px !important;
-}
-.th-btn span {
-  width: 8px;
-  height: 8px;
-  border-radius: 50%;
-  display: block;
-}
+.th-btn-compact {
+  min-width: 24px;
+  padding: 4px 6px;
+}
+.th-btn-compact span {
+  width: 8px;
+  height: 8px;
+  border-radius: 50%;
+  display: block;
+}


Option 2: If these properties should apply to all .th-btn elements, merge them into the existing definition at line 200:

.th-btn {
  font-family: var(--mono);
  font-size: .42rem;
  letter-spacing: .05em;
  min-width: 24px;  / added /
  padding: 4px 6px;  / modified /
  border: 1px solid var(--b2);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all .12s;
  -webkit-tap-highlight-color: transparent;
}


And add the span styling separately if needed.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/base.css around lines 163 - 172, There are duplicate .th-btn rules causing cascade conflicts and a needless !important; remove the separate short .th-btn block and either merge its min-width and padding into the main .th-btn declaration (the comprehensive rule currently at the later .th-btn definition) or convert the short variant into a modifier class (e.g., .th-btn--compact) and update usages accordingly; also remove the .th-btn span 8px indicator if it duplicates .th-dot (or replace it by using .th-dot) so you have a single source of truth for the circular indicator and eliminate the !important from padding.

============================================================================
File: kanban/INDEX.md
Line: 24 to 28
Type: potential_issue

Comment:
Inconsistency: Fase F status conflict.

The progress table (lines 24-28) marks Fase F and all its sub-items as "✅ Done", but line 48 in "Próximos Passos" states "Fase F em progresso" (Fase F in progress). These statements contradict each other.

Please clarify: Is Fase F complete or still in progress?



🔧 Suggested fix if Fase F is complete

-- Fase F em progresso: JS modularizado + CSS extraído
+- Fase F concluída: JS modularizado + CSS extraído




Also applies to: 48-48

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/INDEX.md around lines 24 - 28, The progress table entry "F - Modularização" and its sub-items currently show "✅ Done" but the "Próximos Passos" section still says "Fase F em progresso"; update one to be consistent: either mark the table rows for "F - Modularização" and its bullets as "Em progresso" (or a consistent intermediate state) if work remains, or change the "Próximos Passos" text "Fase F em progresso" to "Fase F concluída" (or remove it) if Fase F is complete; edit the strings exactly where "F - Modularização" and the "Próximos Passos" mention "Fase F" appear so both reflect the same status.

============================================================================
File: kanban/INDEX.md
Line: 36
Type: potential_issue

Comment:
Verify architectural accuracy: Frontend-only vs. Backend presence.

Line 36 states "Frontend-only com Supabase client-side (sem backend)", but AGENTS.md (lines 103-119) documents an extensive backend structure including Express server, routes (auth.js, characters.js, parties.js, etc.), middleware, and a server/ directory.

Please clarify:
- Has the backend been deprecated and replaced with frontend-only Supabase client?
- Or is the backend still active and this description needs updating?

If the backend is still in use, this documentation is misleading.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/INDEX.md at line 36, Update the architectural statement in INDEX.md that currently reads "Frontend-only com Supabase client-side (sem backend)" to accurately reflect the repository: inspect AGENTS.md and the codebase for the server/ directory and Express artifacts (e.g., Express app, routes named auth.js, characters.js, parties.js, middleware files) to determine whether the backend is still active; if the backend is active, replace the frontend-only claim with a short note that the project includes a backend (Express server + listed routes) and link or reference AGENTS.md, otherwise mark the backend as deprecated/removed and update AGENTS.md to reflect the frontend-only Supabase architecture. Ensure the change references INDEX.md and AGENTS.md and mentions the Express route filenames (auth.js, characters.js, parties.js) or server/ directory so reviewers can find and verify the corrected statement.

============================================================================
File: wiki.html.bak
Line: 574 to 591
Type: potential_issue

Comment:
Duplicate evrvData declaration.

evrvData is defined twice (Lines 574-590 and 627-643), which causes the second definition to silently overwrite the first. This appears to be a copy-paste error.




Also applies to: 627-643

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @wiki.html.bak around lines 574 - 591, The file contains a duplicate declaration of the variable evrvData (two identical blocks), causing the second to overwrite the first; remove the redundant declaration and keep a single authoritative evrvData definition (or merge any differing entries into one if needed) so only one evrvData object exists; search for the symbol evrvData and delete the duplicate block (the later occurrence) and run a quick smoke check to ensure any references to evrvData still behave correctly.

============================================================================
File: wiki.html
Line: 538 to 591
Type: potential_issue

Comment:
Duplicate evrvData definition with conflicting data.

evrvData is defined twice with different structures:
- Lines 538-591: 52-column arrays
- Lines 646-662: 47-column arrays (overwrites the first)

The second definition silently overwrites the first. Consolidate into a single authoritative definition.




Also applies to: 646-662

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @wiki.html around lines 538 - 591, There are two conflicting definitions of the evrvData object (the one with 52-column arrays and a later one with 47-column arrays) causing the latter to silently overwrite the former; remove the duplicate and consolidate into a single authoritative evrvData definition (keep the correct/complete dataset — e.g., the 52-column version if consumers expect that) and ensure all consumers of evrvData (any code referencing evrvData) are updated/validated to match the final column count and data layout so no offsets break.

============================================================================
File: supabase-setup.sql
Line: 26 to 28
Type: potential_issue

Comment:
Missing SELECT policy prevents party members from viewing their party.

With only a FOR ALL policy restricted to the GM, party members cannot read party information. Any query like "show my party details" will return empty for non-GM users.




🔒 Proposed fix to allow party members to view their party

 -- Parties: owner only
+DROP POLICY IF EXISTS "Party members can view party" ON parties;
+CREATE POLICY "Party members can view party" ON parties FOR SELECT USING (
+  auth.uid() = gm_id OR
+  auth.uid() IN (SELECT player_id FROM party_members WHERE party_id = id)
+);
+
 DROP POLICY IF EXISTS "Owner can manage party" ON parties;
 CREATE POLICY "Owner can manage party" ON parties FOR ALL USING (auth.uid() = gm_id);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 26 - 28, The current "Owner can manage party" policy on table parties restricts all operations to the GM (gm_id), which blocks non-GM party members from reading party rows; add a dedicated FOR SELECT policy (e.g., "Party members can select") that allows SELECT when auth.uid() = gm_id OR the caller is a member of the party — either by checking a member_ids array (auth.uid() = ANY(member_ids)) or by using an EXISTS subquery against your party_members table (EXISTS (SELECT 1 FROM party_members pm WHERE pm.party_id = parties.id AND pm.user_id = auth.uid())); ensure the new CREATE POLICY references the parties table and uses auth.uid() in the USING clause so members can view their party while the existing GM-restricted FOR ALL policy remains for management actions.

============================================================================
File: supabase-setup.sql
Line: 30 to 35
Type: potential_issue

Comment:
Missing DELETE policy for party_members - users cannot leave parties.

The current policies allow viewing and joining, but there's no way for:
- A player to leave a party
- A GM to remove a member




🔒 Proposed fix to allow leaving/removal

 DROP POLICY IF EXISTS "Party members can join" ON party_members;
 CREATE POLICY "Party members can join" ON party_members FOR INSERT WITH CHECK (auth.uid() = player_id);
+
+DROP POLICY IF EXISTS "Party members can leave" ON party_members;
+CREATE POLICY "Party members can leave" ON party_members FOR DELETE USING (
+  auth.uid() = player_id OR
+  auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id)
+);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 30 - 35, Add a DELETE policy for the party_members table so players can leave and GMs can remove members: create (after the existing SELECT/INSERT policies) a policy (e.g. "Party members can leave") ON party_members FOR DELETE USING (auth.uid() = player_id OR auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id)); also include a DROP POLICY IF EXISTS for the same policy name to match the pattern used for SELECT/INSERT. Ensure you reference the table name party_members and columns player_id, party_id and parties.gm_id in the condition.

============================================================================
File: CHANGELOG.md
Line: 75
Type: potential_issue

Comment:
Overly permissive NPC management policy.

The policy allows ANY authenticated user to create, update, and delete NPCs. In a TTRPG context, typically only GMs (game masters) should have this privilege. This could allow players to modify or delete NPCs inappropriately.




🔒 Proposed fix to restrict NPC management to GMs only

If you have a way to identify GMs (e.g., a gm_id check or a custom claim), consider restricting this policy:

 -- NPCs: public read, authenticated write
 CREATE POLICY "Public read NPCs" ON npcs FOR SELECT USING (true);
-CREATE POLICY "Authenticated can manage NPCs" ON npcs FOR ALL USING (auth.role() = 'authenticated');
+-- Option 1: If NPCs table has a gm_id column
+CREATE POLICY "GM can manage NPCs" ON npcs FOR ALL USING (auth.uid() = gm_id);
+
+-- Option 2: If using custom claims for GM role
+CREATE POLICY "GM can manage NPCs" ON npcs FOR ALL USING (auth.jwt()->>'role' = 'gm');


Choose the approach that matches your authentication schema.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @CHANGELOG.md at line 75, The CREATE POLICY "Authenticated can manage NPCs" on table npcs is too permissive because it uses auth.role() = 'authenticated'; change the policy to restrict CRUD to GMs by checking whatever GM indicator your auth provides (e.g., auth.role() = 'gm' or a custom claim like auth.jwt().claims.role = 'gm' or comparing auth.uid() to a stored gm_id); update the policy name if desired (e.g., "GM can manage NPCs") and ensure the USING/ WITH CHECK expressions reference the chosen GM check so only game masters can create, update, or delete rows in npcs.

============================================================================
File: assets/js/config.js
Line: 6 to 9
Type: potential_issue

Comment:
Hardcoded Supabase credentials should use environment variables.

While the anon key (sb_publishable_*) is safe to expose client-side, the coding guidelines specify moving these credentials to environment variables. For a client-side app without a build step, consider:

1. Injecting config via server-side templating
2. Using a build tool to replace placeholders
3. Loading config from a separate endpoint

As per coding guidelines: "Move hardcoded Supabase credentials from assets/js/config.js to environment variables for security".

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/config.js around lines 6 - 9, The file currently hardcodes Supabase values in window.SUPABASE_CONFIG (url and anonKey); replace those literal strings by reading injected environment-driven values instead: remove the hardcoded url and anonKey and make window.SUPABASE_CONFIG read from server-injected globals or a runtime config endpoint or build-time replaced placeholders (e.g., use template placeholders like {{SUPABASE_URL}}/{{SUPABASE_ANON_KEY}} or fetch /config and assign to window.SUPABASE_CONFIG), ensure the code that constructs/reads window.SUPABASE_CONFIG (the object with properties url and anonKey) falls back gracefully if values are missing and document which injection method you chose (server-side templating, build replacement, or separate endpoint).

============================================================================
File: session-ses_2914.md
Line: 1 to 6
Type: potential_issue

Comment:
Session log file should not be committed to version control.

This file appears to be an AI assistant session log containing internal implementation details, file paths, and sensitive information (Supabase credentials are visible in the logged code snippets around lines 344-346). Consider:

1. Adding session-*.md to .gitignore
2. Removing this file from the repository
3. If needed for documentation, redact sensitive credentials first

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @session-ses_2914.md around lines 1 - 6, This session log contains sensitive data (Supabase credentials around the logged snippets) and should not be committed: add a gitignore rule for session-*.md (or the exact filename pattern used) so future session logs are ignored, remove this specific file from the repo history/working tree (and from the index) so it is no longer tracked, and redact/rotate any exposed Supabase credentials referenced in the log (and verify no other logs contain secrets); ensure the cleanup covers both the current commit (untrack/remove the file) and, if necessary, purge it from history or force-remove from the remote.

============================================================================
File: supabase-setup.sql
Line: 37 to 39
Type: potential_issue

Comment:
Missing SELECT policy prevents party members from viewing sessions.

With only a FOR ALL policy for the GM, party members cannot read session data. This will break any UI showing session information to players.




🔒 Proposed fix to allow party members to view sessions

 -- Sessions: GM only
+DROP POLICY IF EXISTS "Party members can view sessions" ON sessions;
+CREATE POLICY "Party members can view sessions" ON sessions FOR SELECT USING (
+  auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id) OR
+  auth.uid() IN (SELECT player_id FROM party_members WHERE party_id = sessions.party_id)
+);
+
 DROP POLICY IF EXISTS "GM can manage session" ON sessions;
 CREATE POLICY "GM can manage session" ON sessions FOR ALL USING (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id));

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 37 - 39, The current "GM can manage session" FOR ALL policy on the sessions table only lets GMs access sessions and blocks regular party members from SELECT; add a separate SELECT policy that allows users whose auth.uid() is a member of the session's party to read rows. Concretely, keep the existing "GM can manage session" policy for GMs but add a new policy (e.g., "Party members can view session") ON sessions FOR SELECT USING (auth.uid() IN (SELECT user_id FROM party_members WHERE party_id = sessions.party_id)); reference the sessions table, its party_id column, and the party_members.user_id relation when adding the policy.

============================================================================
File: supabase-setup.sql
Line: 23 to 24
Type: potential_issue

Comment:
Any authenticated user can modify or delete any NPC.

This policy allows any authenticated user to update or delete NPCs created by others. Consider whether this is intentional:

- If NPCs should be shared/editable by all: current policy is fine but risky
- If NPCs belong to a GM or creator: add an ownership check (e.g., auth.uid() = created_by)
- If only GMs should manage NPCs: use a GM check similar to sessions




🔒 Proposed fix for GM-only NPC management

 DROP POLICY IF EXISTS "Authenticated can manage NPCs" ON npcs;
-CREATE POLICY "Authenticated can manage NPCs" ON npcs FOR ALL USING (auth.role() = 'authenticated');
+CREATE POLICY "GM can manage NPCs" ON npcs FOR ALL USING (
+  auth.uid() IN (SELECT gm_id FROM parties)
+);


Or for ownership-based access (requires created_by column):

 DROP POLICY IF EXISTS "Authenticated can manage NPCs" ON npcs;
-CREATE POLICY "Authenticated can manage NPCs" ON npcs FOR ALL USING (auth.role() = 'authenticated');
+CREATE POLICY "Owner can manage NPCs" ON npcs FOR ALL USING (auth.uid() = created_by);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 23 - 24, The current policy "Authenticated can manage NPCs" on table npcs grants all authenticated users full access; change the USING condition in that policy to enforce either ownership or GM role checks instead of just auth.role() = 'authenticated'. Specifically, update the policy referenced by name "Authenticated can manage NPCs" (or create a new policy if you prefer) to require auth.uid() = created_by for creator-only access (ensure the npcs table has a created_by column) or replace the condition with the GM-role check used elsewhere (e.g., the same check used for sessions) to restrict management to GMs. Ensure the modified policy uses the same policy name ("Authenticated can manage NPCs") and targets FOR ALL as before.

============================================================================
File: assets/js/header.js
Line: 90 to 99
Type: potential_issue

Comment:
Guard against undefined profile in requireGM.

If requireAuth() resolves with an auth object that lacks a profile property (e.g., profile fetch failed silently), accessing auth.profile.role will throw a TypeError.



🛡️ Proposed defensive check

 function requireGM() {
   return window.requireAuth().then(function(auth) {
     if (!auth) return null;
+    if (!auth.profile) {
+      window.location.href = 'dashboard.html';
+      return null;
+    }
     if (auth.profile.role !== 'gm') {
       window.location.href = 'dashboard.html';
       return null;
     }
     return auth;
   });
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/header.js around lines 90 - 99, The requireGM function can throw if auth.profile is undefined; update requireGM to defensively check that auth and auth.profile exist before reading auth.profile.role (i.e., after resolving requireAuth(), verify auth is truthy and typeof auth.profile === 'object' or auth.profile !== undefined), and if the profile is missing treat it like unauthorized (redirect to 'dashboard.html' and return null) or log a helpful message; reference the requireGM function and the call to requireAuth() when making the change.

============================================================================
File: test-page.js
Line: 38 to 41
Type: refactor_suggestion

Comment:
Add exit code for CI pipeline compatibility.

The script logs errors but always exits with code 0, so CI pipelines won't detect test failures. Add an explicit exit code:


♻️ Suggested fix

 console.log('\n' + (errors.length === 0 ? '✅ All pages loaded without errors!' : '❌ Some errors found:'));
 errors.forEach(e => console.log('  -', e));

 await browser.close();
+process.exit(errors.length > 0 ? 1 : 0);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @test-page.js around lines 38 - 41, The script currently logs errors but always exits 0; after the existing await browser.close() call, add an explicit process exit based on the errors array (e.g., call process.exit(1) when errors.length > 0, otherwise process.exit(0)) so CI will fail when tests found errors; ensure you reference the same errors variable used in the errors.forEach and place the exit call immediately after browser.close() so the browser is closed before exiting.

============================================================================
File: index.html
Line: 74 to 81
Type: potential_issue

Comment:
Registration form still allows selecting "Mestre" role.

The session notes indicate registration should only allow player accounts, but the form still includes the "Mestre" (GM) role button at Line 77. Users can still click this button to register as GM, which contradicts the intended restriction.



🔧 Proposed fix to enforce player-only registration


           Tipo de Conta

             Jogador
-            Mestre





Alternatively, remove the role selector entirely since only player registration is allowed.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @index.html around lines 74 - 81, The form currently exposes a selectable GM button (role-btn with data-role="gm") which allows users to register as "Mestre"; remove the GM button element (or disable/remove any click handlers that reference .role-select/.role-btn) and ensure the hidden input name="role" remains hard-coded to value="player" so the server always receives player registrations; also remove any JavaScript that toggles the selected class or reads data-role to set the hidden input to prevent bypassing the restriction.

============================================================================
File: kanban/done/fase-f-modularizacao.md
Line: 42 to 57
Type: potential_issue

Comment:
Duplicated "Server Services Layer (Fase 4)" section.

Lines 42-49 and 50-57 contain identical content. Remove the duplicate section.



🧹 Remove duplicate section

 ### Server Services Layer (Fase 4)

 - [ ] 4.1 - Criar server/services/auth.js
 - [ ] 4.2 - Criar server/services/characters.js
 - [ ] 4.3 - Criar server/services/parties.js
 - [ ] 4.4 - Criar server/services/npcs.js
 - [ ] 4.5 - Refatorar routes para usar services

-### Server Services Layer (Fase 4)
-
-- [ ] 4.1 - Criar server/services/auth.js
-- [ ] 4.2 - Criar server/services/characters.js
-- [ ] 4.3 - Criar server/services/parties.js
-- [ ] 4.4 - Criar server/services/npcs.js
-- [ ] 4.5 - Refatorar routes para usar services

 ### Limpeza e Decisões (Fase 5)

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/done/fase-f-modularizacao.md around lines 42 - 57, The file contains a duplicated "Server Services Layer (Fase 4)" heading and identical checklist blocks (items like "4.1 - Criar server/services/auth.js", "4.2 - Criar server/services/characters.js", etc.); remove the second duplicate block (either the one starting at the second "Server Services Layer (Fase 4)" heading or the earlier copy) so the checklist appears only once, preserving a single heading and one set of items.

============================================================================
File: cerebro.html
Line: 865 to 875
Type: potential_issue

Comment:
Multiple duplicate function definitions will cause confusion.

Several functions are defined multiple times in this file:
- filtrar() at lines 865-868 and 734
- setCat() at lines 870-875 and 735-738
- mudaRodada() at lines 952-956 and 1047-1050
- adicionarAoEncontro() at lines 924-934 and 1028-1036
- adicionarNPCAtualAoEncontro() at lines 936-939 and 1037-1040
- removerDoEncontro() at lines 941-950 and 1041-1046
- abrirPainel() / fecharPainel() at lines 882-894 and 1168-1169

The later definitions overwrite the earlier ones. Some use async/await patterns with external API calls (lines 924-950) while others use localStorage (lines 1027-1076). This looks like incomplete refactoring—choose one implementation and remove duplicates.




Also applies to: 1027-1055

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @cerebro.html around lines 865 - 875, This file contains duplicate definitions of several functions (filtrar, setCat, mudaRodada, adicionarAoEncontro, adicionarNPCAtualAoEncontro, removerDoEncontro, abrirPainel, fecharPainel) where later definitions overwrite earlier ones and mixed implementations (async API calls vs localStorage) exist; choose the intended implementation for each symbol (pick either the async/API versions or the localStorage versions), delete the duplicate definitions you don't want, and ensure all callers reference the remaining functions; verify functions like adicionarAoEncontro, adicionarNPCAtualAoEncontro, removerDoEncontro and mudaRodada use a consistent state backend (API or localStorage) and that abrirPainel/fecharPainel have single definitions to avoid unexpected overwrites.

============================================================================
File: cerebro.html
Line: 248 to 249
Type: potential_issue

Comment:
Duplicate id="toast" elements in the DOM.

There are two  elements (lines 248 and 524). Having duplicate IDs is invalid HTML and will cause document.getElementById('toast') to only find the first one, potentially causing inconsistent behavior.



🐛 Proposed fix - remove the duplicate

Remove one of the toast elements. Since the one at line 524 is positioned after the scripts' expected location, keep the one at line 248:

-
-





Also applies to: 524-524

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @cerebro.html around lines 248 - 249, Remove the duplicate  element so there is only one DOM node with id="toast"; specifically delete the later occurrence (the duplicate after the scripts) and keep the original toast element earlier in the markup, and verify any JS that calls document.getElementById('toast') still targets that single element.

============================================================================
File: assets/js/api.js
Line: 8 to 9
Type: potential_issue

Comment:
Hardcoded Supabase credentials should use configuration.

The Supabase URL and anon key are hardcoded. Since config.js is now part of the load order, these should reference window.SUPABASE_CONFIG for consistency and easier management.

Additionally, the anon key format sb_publishable_... appears unusual—Supabase anon keys typically look like JWT tokens starting with eyJ.... Verify this is the correct key.



Supabase anon key format 2024

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/api.js around lines 8 - 9, Replace hardcoded SUPABASE_URL and SUPABASE_ANON_KEY with values pulled from the global config object (window.SUPABASE_CONFIG) so the module uses window.SUPABASE_CONFIG.SUPABASE_URL and window.SUPABASE_CONFIG.SUPABASE_ANON_KEY (or clearly named properties) instead of literal strings; update any code referencing SUPABASE_URL / SUPABASE_ANON_KEY to read from those properties and add a runtime check that throws or logs a clear error if they are missing. Also verify the anon key value in window.SUPABASE_CONFIG is the correct Supabase anon key format (JWT-like starting with "eyJ") and replace the current unusual "sb_publishable_…" value if it is incorrect.

============================================================================
File: assets/js/config.js
Line: 14 to 26
Type: potential_issue

Comment:
Duplicate getSupabaseClient function definition.

This function is also defined in assets/js/supabase-client.js. Since both files are loaded, the second definition will overwrite the first. Either:

1. Remove this definition and keep only the one in supabase-client.js
2. Remove the duplicate in supabase-client.js

Having both creates confusion about which implementation is active.



🐛 Suggested fix: Remove duplicate from config.js

 window.SUPABASE_CONFIG = {
   url: 'https://wlpdfrqzbpwuxyqeayjt.supabase.co',
   anonKey: 'sb_publishable_YqV49fEJhRWGUxBZ7hYfRw_Aghqpp4I'
 };
-
-/
- * Get or initialize Supabase client
- */
-window.getSupabaseClient = (function() {
-  let supabaseClient = null;
-
-  return function() {
-    if (!supabaseClient && window.supabase) {
-      supabaseClient = window.supabase.createClient(
-        window.SUPABASE_CONFIG.url,
-        window.SUPABASE_CONFIG.anonKey
-      );
-    }
-    return supabaseClient;
-  };
-})();

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/config.js around lines 14 - 26, The file defines a duplicate getSupabaseClient IIFE that conflicts with the implementation in assets/js/supabase-client.js; remove this definition from assets/js/config.js (the IIFE that references getSupabaseClient, window.supabase, and window.SUPABASE_CONFIG) so only the canonical getSupabaseClient implementation in supabase-client.js remains, ensuring consumers use the single source of truth for createClient behavior.

============================================================================
File: assets/js/auth-module.js
Line: 38 to 49
Type: potential_issue

Comment:
Profile query uses email instead of user.id.

After successful login, the code queries the profiles table by email (line 38). However, inside requireAuth (line 89), the profile is queried by id. Using the user's id consistently would be more reliable and avoids potential issues with email uniqueness or case sensitivity.



🐛 Proposed fix

       // After login, fetch the profile to get the correct role and update user metadata
-      return client().from('profiles').select('role').eq('email', email.toLowerCase()).single()
+      return client().from('profiles').select('role').eq('id', result.data.user.id).single()
         .then(function(profileResult) {

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/auth-module.js around lines 38 - 49, The profile lookup inside the post-login chain is querying profiles by email which is inconsistent with requireAuth and can be unreliable; change the query in the promise that currently calls client().from('profiles').select('role').eq('email', email.toLowerCase()).single() to use the authenticated user's id instead (use result.data.user.id) so it becomes .eq('id', result.data.user.id), and keep returning the same updated user/session object after calling client().auth.updateUser({ data: { role: profileResult.data.role } }).

============================================================================
File: assets/js/api-module.js
Line: 73 to 93
Type: potential_issue

Comment:
saveCharacter bypasses Supabase client and uses raw fetch.

Unlike other methods that use client(), this function uses direct fetch with the anon key. This bypasses the Supabase client's session management, meaning the request uses the anon key rather than the authenticated user's JWT. This could cause RLS (Row Level Security) policies to fail if they rely on auth.uid().



🐛 Proposed fix - use Supabase client's update method

   window.api.saveCharacter = function(charId, data) {
     var updateData = { data: data.data };
     if (data.name !== undefined) updateData.name = data.name;
     if (data.codename !== undefined) updateData.codename = data.codename;
     if (data.foto_base64 !== undefined && data.foto_base64 !== null) updateData.foto_base64 = data.foto_base64;

-    var config = window.SUPABASE_CONFIG;
-    return fetch(config.url + '/rest/v1/characters?id=eq.' + charId, {
-      method: 'PATCH',
-      headers: {
-        'Content-Type': 'application/json',
-        'apikey': config.anonKey,
-        'Authorization': 'Bearer ' + config.anonKey,
-        'Prefer': 'return=representation'
-      },
-      body: JSON.stringify(updateData)
-    }).then(function(res) {
-      if (!res.ok) return res.text().then(function(t) { throw new Error(t); });
-      return res.json();
-    });
+    return client().from('characters').update(updateData).eq('id', charId).select().single()
+      .then(function(result) { if (result.error) throw result.error; return result.data; });
   };

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/api-module.js around lines 73 - 93, The saveCharacter function is making a raw fetch with the anon key which bypasses the Supabase client and authenticated session; replace the direct fetch usage in saveCharacter with the app's Supabase client (use client() or the existing client wrapper) and call the PostgREST update flow (e.g., client.from('characters').update(updateData).eq('id', charId).select() or equivalent) so the request uses the current user's JWT and respects RLS; keep the same updateData construction and error handling semantics when converting to the client call.

============================================================================
File: admin.html
Line: 53 to 58
Type: potential_issue

Comment:
Duplicate CSS selector with conflicting properties.

There are two .admin-section rules - the first sets display: none; (lines 53-55) and the second sets margin-bottom: 24px; (lines 56-58). This is likely from a merge or incremental edit. Combine them into a single rule.



🐛 Proposed fix

     .admin-section {
       display: none;
-    }
-    .admin-section {
       margin-bottom: 24px;
     }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @admin.html around lines 53 - 58, Combine the duplicate CSS rules for .admin-section into a single rule: find both occurrences of the .admin-section selector and merge their declarations so that the final .admin-section block contains both display: none; and margin-bottom: 24px; (remove the redundant duplicate selector that caused the split/merge artifact).

============================================================================
File: cerebro.html
Line: 640 to 643
Type: potential_issue

Comment:
isGM is an implicit global variable.

The variable isGM is assigned at line 642 but never declared with var, let, or const. This creates an implicit global variable, which can lead to bugs and is considered bad practice.



🐛 Proposed fix

Add declaration at the top of the script with other state variables (around line 567):

 / ═══ STATE ═══ /
 let NPC_DB=[];
 let currentId=null;
+let isGM=false;
 let categoriaAtual='todos';

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @cerebro.html around lines 640 - 643, The assignment to isGM creates an implicit global; declare it with proper scope among the other state variables (e.g., add let isGM = false; alongside the existing state declarations) and then keep the assignment isGM = (auth.profile || {}).role === 'gm'; so isGM is no longer global—refer to the symbols isGM, auth.profile and profile to locate and update the code.

============================================================================
File: assets/js/globals.js
Line: 12 to 15
Type: potential_issue

Comment:
Self-referential assignments are no-ops and likely bugs.

Lines 12, 14, and 15 assign window.checkAuth, window.requireAuth, and window.requireGM to themselves. These should be mapping from window.api or another source, but currently do nothing.

Based on auth-module.js, these functions are already defined on window directly (not on window.api), so these lines can be removed entirely, or if the intent was to ensure consistency, verify the source module actually exports them.



🐛 Proposed fix - remove no-op assignments

   // Auth functions
   window.login = window.api.login;
   window.register = window.api.register;
   window.logout = window.api.logout;
-  window.checkAuth = window.checkAuth;
   window.getCurrentUser = window.api.getCurrentUser;
-  window.requireAuth = window.requireAuth;
-  window.requireGM = window.requireGM;

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/globals.js around lines 12 - 15, The three self-referential assignments (window.checkAuth, window.requireAuth, window.requireGM) are no-ops and should be removed or corrected; remove those lines from globals.js (or, if the intent was to re-export from an API surface, change them to assign from the real source, e.g., window.api.checkAuth / window.api.requireAuth / window.api.requireGM), and verify that the auth-module actually exposes the functions (checkAuth, requireAuth, requireGM) on window or window.api before keeping any assignment.

============================================================================
File: admin.html
Line: 406 to 413
Type: potential_issue

Comment:
showTab function doesn't handle the 'members' tab.

The sidebar includes a link to ?tab=members (line 314), but showTab only handles party, encounter, and notes. Clicking the "Membros" tab will hide all sections since there's no #tab-members element.



🐛 Proposed fix - either add the members tab content or update showTab

Option 1: Add members tab handling:
     function showTab(tabId) {
       document.querySelectorAll('.admin-nav-link').forEach(link => {
         link.classList.toggle('active', link.dataset.tab === tabId);
       });
       document.getElementById('tab-party').style.display = tabId === 'party' ? 'block' : 'none';
       document.getElementById('tab-encounter').style.display = tabId === 'encounter' ? 'block' : 'none';
       document.getElementById('tab-notes').style.display = tabId === 'notes' ? 'block' : 'none';
+      var membersEl = document.getElementById('tab-members');
+      if (membersEl) membersEl.style.display = tabId === 'members' ? 'block' : 'none';
     }


Option 2: Remove the members link if not implemented yet.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @admin.html around lines 406 - 413, The showTab function doesn't handle the 'members' tab so clicking the sidebar link hides all sections; update showTab (the function named showTab) to include handling for the 'members' tab by toggling display for the element with id 'tab-members' when tabId === 'members' (and ensure document.querySelectorAll('.admin-nav-link') still toggles the active class based on link.dataset.tab); alternatively, if the members UI is not implemented, remove the sidebar link that uses ?tab=members to avoid pointing to a non-existent #tab-members element.

Review completed: 45 findings ✔
