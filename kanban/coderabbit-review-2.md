[vetor@fedora]~/projetos/projectCerebro% coderabbit review
╔═══════════════════════════════════════════╗
║                                           ║
║   New update available! 0.4.1 -> 0.4.3    ║
║          Run: coderabbit update           ║
║                                           ║
╚═══════════════════════════════════════════╝

Starting CodeRabbit review in plain text mode...

Review directory: /home/vetor/projetos/projectCerebro

Connecting to review service
Setting up
Summarizing
Reviewing

============================================================================
File: supabase/crawler/raw-data/Aamir_Khan.json
Line: 1 to 11
Type: potential_issue

Comment:
Missing foto_base64 field.

Based on learnings, foto_base64 field was added to database in 2025. This raw data entry should include it.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/Aamir_Khan.json around lines 1 - 11, This JSON record for "Aamir Khan" is missing the required foto_base64 field; add a "foto_base64" key to the object (alongside existing keys like "name", "url", "faction", "danger", "realName", "alias", "powerGrid", "rawPowers", "timestamp") and populate it with the base64-encoded image string (or an empty string/null placeholder if no image is available) so the raw data conforms to the 2025 schema change.

============================================================================
File: supabase/crawler/raw-data/A_P_E_.json
Line: 1 to 12
Type: potential_issue

Comment:
Missing foto_base64 field.

Database schema includes foto_base64 field (added 2025). Crawler should capture character images. Based on learnings, account for foto_base64 field added to database in 2025 when handling file uploads and storage.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_P_E_.json around lines 1 - 12, The JSON for A_P_E_ is missing the required foto_base64 field; update the crawler output generator that produces this JSON (look for code that emits fields like "name", "url", "title", "faction", "danger", "realName", "alias", "powerGrid", "rawPowers", "timestamp") to also fetch the character image, convert it to a base64 data URI (or raw base64 string per DB schema), and include it under the "foto_base64" property in the emitted object; ensure the image download handles failures (set null or empty string if unavailable) and that any file-upload/storage logic that maps crawler output to the DB consumes the new "foto_base64" field.

============================================================================
File: supabase/crawler/raw-data/A_Sai.json
Line: 12
Type: potential_issue

Comment:
Add trailing newline.

JSON file missing trailing newline per AI summary.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_Sai.json at line 12, The JSON file A_Sai.json is missing a trailing newline at EOF; open the file and add a single newline character after the final closing brace ('}') so the file ends with a newline, then save the file to satisfy POSIX/formatter expectations.

============================================================================
File: supabase/crawler/raw-data/A_yin.json
Line: 6
Type: potential_issue

Comment:
Language inconsistency: "medio" is Spanish.

Use "medium" or define consistent enum values. Rest of codebase appears English.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_yin.json at line 6, The "danger" field in the JSON uses Spanish value "medio" which is inconsistent with the English enum used elsewhere; update the value for the "danger" key in A_yin.json from "medio" to "medium" (or adjust to the project's defined Danger enum value) so it matches the rest of the codebase and any parsing/validation logic that expects English enum values.

============================================================================
File: supabase/crawler/raw-data/A_J__Patton.json
Line: 1 to 12
Type: potential_issue

Comment:
Missing foto_base64 field.

File dated 2026 but foto_base64 field missing. Should be present since it was added to database in 2025. Based on learnings, account for foto_base64 field when handling file uploads/storage.




📸 Proposed fix to add missing field

   "rawPowers": [],
+  "foto_base64": "",
   "timestamp": "2026-04-15T21:26:53.718Z"

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_J__Patton.json around lines 1 - 12, This JSON record for "A.J. Patton" is missing the required foto_base64 field; update the object to include a foto_base64 key (even if empty or a placeholder) so ingestion/storage code expecting foto_base64 will not fail—add "foto_base64": "" (or a valid base64 string) alongside existing keys like name, url, title, faction, danger, powerGrid, rawPowers, and timestamp; ensure downstream upload/validation logic that references foto_base64 can handle empty-string placeholders if no image is available.

============================================================================
File: supabase/crawler/raw-data/A3.json
Line: 6
Type: potential_issue

Comment:
Language inconsistency: "medio" is Spanish.

Use "medium" instead of "medio" for English consistency with other fields.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A3.json at line 6, The "danger" field value is in Spanish ("medio"); update the JSON entry for the "danger" key (in A3.json) to use the English term "medium" to match the rest of the dataset and maintain language consistency.

============================================================================
File: supabase/crawler/raw-data/Wolverine.json
Line: 14
Type: potential_issue

Comment:
Malformed intro field contains raw wiki template artifacts.

The intro field contains unparsed wiki template syntax (}}), parameter declarations (| others =), and image filenames (.jpg, .png) rather than actual character introduction text. This appears to be a crawler parsing issue.

If this is intentional raw data to be processed later, consider renaming to rawIntro for clarity. Otherwise, the crawler's parsing logic should be fixed to extract clean intro text.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/Wolverine.json at line 14, The intro field currently contains unparsed wiki template artifacts (e.g., "}}", "| others =", image filenames like .jpg/.png) instead of clean text; either rename this field to rawIntro to mark it as unprocessed or update the crawler's parsing step (e.g., the parseIntro/extractIntro routine) to strip template tokens and image filenames (remove patterns like "}}", lines starting with "|" and trailing image filename tokens matching /\.(jpg|png)$/i) and populate intro with cleaned text while preserving the original raw content in rawIntro if needed for downstream processing.

============================================================================
File: supabase/crawler/raw-data/A_Kane.json
Line: 6
Type: potential_issue

Comment:
Verify language consistency for danger field.

Field uses "medio" (Spanish) while other fields use English ("unknown"). Confirm if this is intentional or should be English (e.g., "medium", "low", "high").

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_Kane.json at line 6, The "danger" field in A_Kane.json currently uses Spanish ("medio") while other records use English values like "unknown"; update the "danger" value to the correct English term (e.g., "medium", "low", or "high") to match the rest of the dataset and keep language consistent—locate the "danger" key in the record and replace "medio" with the appropriate English severity string.

============================================================================
File: tests/e2e.test.js
Line: 59
Type: potential_issue

Comment:
Add top-level error handling.

If chromium.launch() or other operations outside the try block fail, the promise rejection goes unhandled, potentially causing a silent or confusing exit.




🛡️ Proposed fix

-runTests();
+runTests().catch(err => {
+  console.error('E2E test runner failed:', err.message);
+  process.exit(1);
+});

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @tests/e2e.test.js at line 59, The test harness currently calls runTests() at top-level without catching rejections, so failures from chromium.launch() or other async work can be unhandled; wrap the top-level invocation in a top-level async try/catch (or attach a .catch handler) to capture and log the error and exit non-zero: call runTests() inside an async IIFE or use runTests().catch(err => { / log via console.error or test logger / process.exit(1); }) so any thrown/rejected promise from functions like chromium.launch or runTests is handled; refer to the runTests invocation and the chromium.launch usage to locate where to add the handler.

============================================================================
File: supabase/crawler/raw-data/A_Sai.json
Line: 6
Type: potential_issue

Comment:
Inconsistent language in danger field.

"medio" is Spanish. Use "medium" for consistency if English expected.




🔧 Proposed fix

-  "danger": "medio",
+  "danger": "medium",

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_Sai.json at line 6, The "danger" field in A_Sai.json uses Spanish value "medio"; update the value of the "danger" key in the JSON object (in A_Sai.json) from "medio" to the English "medium" to maintain consistent language across records.

============================================================================
File: assets/js/globals.js
Line: 48 to 56
Type: potential_issue

Comment:
Theme code is dead — themes.js loads after globals.js.

Per the coding guideline load order, themes.js runs after globals.js, so window.THEMES will always be falsy when this check runs. This entire block is dead code.

Additionally, line 50 hardcodes the theme list instead of using window.THEMES, and tema parameter lacks validation—arbitrary values could inject unintended classes.



Consider either:
1. Moving this logic to themes.js where THEMES is defined, or
2. Changing the load order so themes.js precedes globals.js


🔧 If moving to themes.js, add validation

window.setTema = function(tema) {
  if (!window.THEMES || window.THEMES.indexOf(tema) === -1) {
    console.warn('Invalid theme:', tema);
    return;
  }
  window.THEMES.forEach(function(t) { document.body.classList.remove('theme-' + t); });
  document.body.classList.add('theme-' + tema);
  localStorage.setItem('cerebro_tema', tema);
  if (window.renderThemeDots) window.renderThemeDots();
};

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/globals.js around lines 48 - 56, The block in globals.js that defines window.setTema is dead because window.THEMES is defined only after globals.js loads; move the window.setTema implementation into themes.js (or ensure themes.js loads before globals.js), and when implementing setTema (the window.setTema function) validate the tema argument against window.THEMES (e.g., return/warn if tema is not in window.THEMES) instead of using the hardcoded ['yellow','red','green','purple','blue']; also use window.THEMES to remove existing theme- classes, keep setting localStorage key 'cerebro_tema', and still call window.renderThemeDots if present.

============================================================================
File: supabase/crawler/raw-data/A_di.json
Line: 6
Type: potential_issue

Comment:
Language inconsistency in danger field.

"medio" is Spanish while other fields use English. Should be "medium" for consistency.




🔧 Proposed fix

-  "danger": "medio",
+  "danger": "medium",

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_di.json at line 6, The "danger" field value in A_di.json is in Spanish ("medio") while the dataset uses English; update the "danger" property value from "medio" to "medium" so it matches the rest of the records and preserves language consistency (locate the "danger" key in the JSON object and replace the value).

============================================================================
File: supabase/crawler/raw-data/A_14.json
Line: 6
Type: refactor_suggestion

Comment:
Language inconsistency in danger field.

"medio" is Spanish. Should use English ("medium") or standardized danger level values.



🌐 Proposed fix

-  "danger": "medio",
+  "danger": "medium",

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_14.json at line 6, The "danger" field in A_14.json currently uses Spanish value "medio"; change it to the standardized English enum value "medium" (i.e., replace "medio" with "medium" in the "danger" property of the record in A_14.json) and scan other raw-data files to ensure all "danger" values follow the same standardized set (e.g., "low", "medium", "high") so the dataset and any validation/schema (if present) remain consistent.

============================================================================
File: supabase/crawler/raw-data/A_Lars.json
Line: 1 to 12
Type: potential_issue

Comment:
Missing foto_base64 field.

Based on learnings, foto_base64 was added to database in 2025. This 2026 file should include it.




📸 Proposed fix

   "alias": "Mentor",
   "powerGrid": {},
   "rawPowers": [],
+  "foto_base64": "",
   "timestamp": "2026-04-15T21:26:39.138Z"

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_Lars.json around lines 1 - 12, This JSON object for A'Lars is missing the required "foto_base64" field; update the record (the object with "name": "A'Lars" and keys like "powerGrid" and "rawPowers") to include a "foto_base64" key (set to a valid base64 image string if available, otherwise an empty string or null) preserving the rest of the fields and the "timestamp" value.

============================================================================
File: kanban/INDEX.md
Line: 12
Type: potential_issue

Comment:
Fix inconsistent path for Fase G.

Fase G links to kanban/fase-g-coderabbit-review.md instead of done/fase-g-coderabbit-review.md. All other completed phases link to the done/ directory.




🔧 Proposed fix

-- Fase G: CodeRabbit Review - TESTS PASSED ✅
+- Fase G: CodeRabbit Review - TESTS PASSED ✅

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/INDEX.md at line 12, The link for Fase G in INDEX.md is using the wrong relative path; replace the target URL string "Fase G: CodeRabbit Review - TESTS PASSED ✅" with the consistent done/ path so it reads "Fase G: CodeRabbit Review - TESTS PASSED ✅"; locate the link text in INDEX.md and update only the URL portion to match other completed phases.

============================================================================
File: supabase/crawler/raw-data/A_C__O_Connor.json
Line: 6
Type: potential_issue

Comment:
Language inconsistency in danger field.

"medio" is Spanish. Should be "medium" or match project's danger level enum.




📝 Proposed fix

-  "danger": "medio",
+  "danger": "medium",

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_C__O_Connor.json at line 6, The "danger" field in A_C__O_Connor.json uses the Spanish value "medio" which mismatches the project's danger-level enum; update the "danger" property to the correct enum value (e.g., "medium") to match other entries and the schema, ensuring capitalization and spelling exactly match the project's accepted values for danger.

============================================================================
File: supabase/crawler/raw-data/Aalbort.json
Line: 1 to 11
Type: potential_issue

Comment:
Missing foto_base64 field.

Based on learnings, foto_base64 field was added to database in 2025. This record should include it (empty string or null if no image available).




📷 Proposed fix to add missing field

   "alias": "",
+  "foto_base64": "",
   "powerGrid": {},

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/Aalbort.json around lines 1 - 11, The JSON record for the character "Aalbort" is missing the required foto_base64 field; update the object (the top-level keys including "name": "Aalbort") to include "foto_base64" with an empty string or null (e.g., "foto_base64": "" or "foto_base64": null) so the record matches the 2025 DB schema; keep all existing fields (url, faction, danger, realName, alias, powerGrid, rawPowers, timestamp) unchanged.

============================================================================
File: .github/workflows/deploy.yml
Line: 35 to 38
Type: potential_issue

Comment:
Avoid uploading entire repository root.

Using path: '.' uploads .git/, node_modules/, .github/, and potentially sensitive files (.env, config files). This bloats the artifact and risks exposing secrets.


🐛 Proposed fix: specify only the directories/files needed

       - name: Upload artifact
         uses: actions/upload-pages-artifact@v3
         with:
-          path: '.'
+          path: './public'  # or './dist', './build', or specific static files directory


If serving from root, create an explicit list or ensure .gitignore-style exclusions are respected (they are not by this action).

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @.github/workflows/deploy.yml around lines 35 - 38, The Upload artifact step using actions/upload-pages-artifact@v3 currently sets path: '.' which uploads the entire repo (including .git, node_modules, .github, and secrets); change the step in the "Upload artifact" job to list only the build/output directories or files needed (e.g., 'build', 'public', or the generated site folder) instead of '.', or provide an explicit array of paths to include, ensuring you do not reference sensitive files like .env or node_modules and that the step name/uses ("Upload artifact" / actions/upload-pages-artifact@v3) remains the same.

============================================================================
File: supabase/crawler/raw-data/A_Kurru_U_mbaya.json
Line: 1 to 12
Type: potential_issue

Comment:
Missing foto_base64 field.

Database schema includes foto_base64 since 2025. File timestamp is 2026-04-15 but field is absent. Based on learnings, account for foto_base64 field added to database in 2025 when handling file uploads and storage.




🔧 Proposed fix

   "alias": "Icon",
+  "foto_base64": "",
   "powerGrid": {},

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_Kurru_U_mbaya.json around lines 1 - 12, The JSON record for "A'Kurru U'mbaya" is missing the required foto_base64 field introduced in 2025; add a foto_base64 key to the object (use a sensible default such as null or an empty string if no image is available) and update the record in supabase/crawler/raw-data/A_Kurru_U_mbaya.json; also ensure any ingestion/upload code that writes or validates records (where you reference fields like "foto_base64", "timestamp", "rawPowers") defaults or enforces foto_base64 so future files include this key.

============================================================================
File: supabase/crawler/raw-data/Aala__Deity_.json
Line: 5
Type: potential_issue

Comment:
Language inconsistency: "medio" is Spanish.

If other entries use English, change to "medium". If Spanish is intentional, ignore.




🌍 Proposed fix if English is preferred

-  "danger": "medio",
+  "danger": "medium",

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/Aala__Deity_.json at line 5, The "danger" field currently contains the Spanish value "medio"; change it to the English equivalent "medium" (update the JSON key "danger" where its value is "medio" to "medium") to maintain language consistency across entries.

============================================================================
File: evrv-test.html
Line: 2867
Type: potential_issue

Comment:
Remove leftover "AGUARDANDO" text.

"AGUARDANDO" (Portuguese for "WAITING") appears to be residual placeholder or debug text that should be removed before deployment. It's rendered outside the main content area.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @evrv-test.html at line 2867, Remove the leftover StaticText node showing "AGUARDANDO": locate the element with identifier/markup uid=4_2760 or the StaticText node whose content is "AGUARDANDO" and delete it (or remove its rendering from the DOM/template), ensuring no stray placeholder text remains outside the main content area; if it was intended as a status indicator, replace it with the proper status component or conditional rendering instead of leaving the literal string.

============================================================================
File: supabase/crawler/raw-data/A_14.json
Line: 1 to 12
Type: potential_issue

Comment:
Missing foto_base64 field.

Based on learnings, foto_base64 field was added to database in 2025. This record should include it.



➕ Proposed fix

   "alias": "Agent A-14",
   "powerGrid": {},
   "rawPowers": [],
+  "foto_base64": "",
   "timestamp": "2026-04-15T21:26:44.062Z"

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A_14.json around lines 1 - 12, The JSON record for "A-14" is missing the required foto_base64 field; update the object (identify by "name": "A-14" or "url": "https://marvel.fandom.com/wiki/A-14_(Earth-616)") to include a foto_base64 key with the base64-encoded image string (or an empty string placeholder if image not available) so the schema added in 2025 is satisfied; ensure the new field is added at top-level of the JSON object alongside existing keys like "alias" and "rawPowers".

============================================================================
File: supabase/crawler/raw-data/Aamir.json
Line: 5
Type: potential_issue

Comment:
Language inconsistency in danger field.

"medio" is Spanish. Use "medium" or define language standard for enum values.




🔧 Proposed fix

-  "danger": "medio",
+  "danger": "medium",

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/Aamir.json at line 5, The "danger" field in Aamir.json uses a Spanish value "medio"; change it to the English enum value "medium" (or whatever canonical enum your project uses) to keep language consistent across raw-data entries; update the "danger" property in the JSON object (key: "danger") from "medio" to "medium" and scan other raw-data files for similar mismatches to ensure the enum language is consistent.

============================================================================
File: assets/js/globals.js
Line: 12 to 15
Type: potential_issue

Comment:
Self-assignments are no-ops and likely bugs.

Lines 12, 14, and 15 assign window.checkAuth, window.requireAuth, and window.requireGM to themselves. This does nothing. If these functions exist on window.api, they should be forwarded like the others. If they're defined elsewhere, these lines should be removed.




🐛 Proposed fix (if from api module)

-  window.checkAuth = window.checkAuth;
+  window.checkAuth = window.api.checkAuth;
   window.getCurrentUser = window.api.getCurrentUser;
-  window.requireAuth = window.requireAuth;
-  window.requireGM = window.requireGM;
+  window.requireAuth = window.api.requireAuth;
+  window.requireGM = window.api.requireGM;

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/globals.js around lines 12 - 15, The three self-assignments window.checkAuth, window.requireAuth, and window.requireGM are no-ops and should either forward to the API exports or be removed; update the assignments so they reference the api object (e.g., set window.checkAuth = window.api.checkAuth, window.requireAuth = window.api.requireAuth, window.requireGM = window.api.requireGM) if those functions exist on window.api, otherwise delete the redundant lines; locate these symbols in assets/js/globals.js (the existing window.getCurrentUser = window.api.getCurrentUser line is a good model) and make the change accordingly.

============================================================================
File: supabase/crawler/raw-data/Aaliyah_Hardin.json
Line: 1 to 11
Type: potential_issue

Comment:
Missing foto_base64 field.

Database schema includes foto_base64 field (added 2025). Should be present even if empty string.

Based on learnings: foto_base64 field added to database in 2025.




🔧 Proposed fix

   "alias": "",
   "powerGrid": {},
   "rawPowers": [],
+  "foto_base64": "",
   "timestamp": "2026-04-15T21:24:02.416Z"

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/Aaliyah_Hardin.json around lines 1 - 11, The JSON lacks the required foto_base64 field introduced in 2025; update the Aaliyah_Hardin.json record by adding the "foto_base64" key (use an empty string if no image is available) alongside existing keys such as "name", "url", "faction", "danger", "realName", "alias", "powerGrid", "rawPowers", and "timestamp" so the document matches the current database schema.

============================================================================
File: supabase-setup.sql
Line: 16 to 17
Type: potential_issue

Comment:
FOR ALL policy missing WITH CHECK clause for INSERT operations.

The USING clause only applies to existing rows (SELECT, UPDATE, DELETE). For INSERT, PostgreSQL RLS requires a WITH CHECK clause to validate new rows. Without it, inserts may fail or bypass validation.




🔒 Proposed fix

 DROP POLICY IF EXISTS "Owner can manage own characters" ON characters;
-CREATE POLICY "Owner can manage own characters" ON characters FOR ALL USING (auth.uid() = player_id);
+CREATE POLICY "Owner can manage own characters" ON characters FOR ALL
+  USING (auth.uid() = player_id)
+  WITH CHECK (auth.uid() = player_id);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 16 - 17, The RLS policy "Owner can manage own characters" on table characters uses FOR ALL with a USING clause but is missing a WITH CHECK clause required to validate INSERTs; update the policy definition for "Owner can manage own characters" to include WITH CHECK (auth.uid() = player_id) so new rows are validated against the same ownership condition (ensuring INSERTs are allowed only when player_id matches auth.uid()).

============================================================================
File: supabase-setup.sql
Line: 65 to 66
Type: potential_issue

Comment:
Missing WITH CHECK for INSERT operations on profiles.




🔒 Proposed fix

 DROP POLICY IF EXISTS "Owner can manage profile" ON profiles;
-CREATE POLICY "Owner can manage profile" ON profiles FOR ALL USING (auth.uid() = id);
+CREATE POLICY "Owner can manage profile" ON profiles FOR ALL
+  USING (auth.uid() = id)
+  WITH CHECK (auth.uid() = id);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 65 - 66, The "Owner can manage profile" policy on the profiles table lacks a WITH CHECK clause to validate new rows on INSERT; update the policy named "Owner can manage profile" on the profiles table to include WITH CHECK (auth.uid() = id) so that INSERTs are only allowed when the inserted row's id matches the authenticated user (keep the existing USING clause intact).

============================================================================
File: supabase-setup.sql
Line: 35 to 36
Type: potential_issue

Comment:
Missing WITH CHECK for INSERT operations on parties.

Same issue as characters - FOR ALL needs both USING (for existing rows) and WITH CHECK (for new rows).




🔒 Proposed fix

 DROP POLICY IF EXISTS "Owner can manage party" ON parties;
-CREATE POLICY "Owner can manage party" ON parties FOR ALL USING (auth.uid() = gm_id);
+CREATE POLICY "Owner can manage party" ON parties FOR ALL
+  USING (auth.uid() = gm_id)
+  WITH CHECK (auth.uid() = gm_id);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 35 - 36, The "Owner can manage party" policy on table parties uses FOR ALL but only provides a USING clause; add a WITH CHECK clause that mirrors the USING expression so INSERT/UPDATE validations apply to new rows — update the policy "Owner can manage party" to include WITH CHECK (auth.uid() = gm_id) so auth.uid() = gm_id is enforced for new rows as well as existing ones.

============================================================================
File: supabase/crawler/raw-data/Aaf_Capmi_Piap.json
Line: 1 to 12
Type: potential_issue

Comment:
Missing foto_base64 field.

File timestamped 2026-04-15 but lacks foto_base64 field. Based on learnings, foto_base64 was added to database in 2025 for file uploads/storage.





📝 Proposed fix

   "alias": "Amaranth Hawlut",
   "powerGrid": {},
   "rawPowers": [],
+  "foto_base64": "",
   "timestamp": "2026-04-15T21:27:01.709Z"
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/Aaf_Capmi_Piap.json around lines 1 - 12, The JSON record is missing the foto_base64 field; add a "foto_base64" key to this object (alongside "name", "url", "title", etc.) and populate it with either a valid base64-encoded image string or null if no image is available, ensuring the value type matches the database schema used for foto_base64 and keep the existing "timestamp" unchanged.

============================================================================
File: supabase-setup.sql
Line: 58 to 59
Type: potential_issue

Comment:
Missing WITH CHECK for INSERT operations on sessions.




🔒 Proposed fix

 DROP POLICY IF EXISTS "GM can manage session" ON sessions;
-CREATE POLICY "GM can manage session" ON sessions FOR ALL USING (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id));
+CREATE POLICY "GM can manage session" ON sessions FOR ALL
+  USING (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id))
+  WITH CHECK (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id));

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 58 - 59, The CREATE POLICY "GM can manage session" on table sessions currently only defines a USING clause (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id)), which enforces row visibility but does not enforce INSERT/UPDATE checks; update the policy to include a WITH CHECK clause with the same expression (or add a separate INSERT/UPDATE policy) so inserts are only allowed when auth.uid() is in (SELECT gm_id FROM parties WHERE id = party_id); modify the policy definition referenced as "GM can manage session" on sessions to include WITH CHECK (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id)).

============================================================================
File: supabase/crawler/raw-data/Aahmes.json
Line: 1 to 11
Type: potential_issue

Comment:
Missing foto_base64 field.

Schema should include foto_base64 field (added 2025). Even if empty, maintain consistent structure. Based on learnings, account for foto_base64 field added to database in 2025 when handling file uploads and storage.




🔧 Proposed fix

   "powerGrid": {},
   "rawPowers": [],
+  "foto_base64": "",
   "timestamp": "2026-04-15T21:23:55.710Z"

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/Aahmes.json around lines 1 - 11, This JSON record for Aahmes is missing the required foto_base64 field introduced in 2025; add a "foto_base64" key to the object (use an empty string or null if no image is available) to maintain schema consistency across records (update the Aahmes.json object where keys like "name", "url", and "timestamp" appear and ensure "foto_base64" is present for downstream upload/storage handling).

============================================================================
File: kanban/INDEX.md
Line: 14 to 15
Type: potential_issue

Comment:
Remove duplicate "Done" section header.

Two separate "### ✅ Done" sections (lines 5 and 14) create confusing organization. Merge into single section.




♻️ Proposed refactor

 - Fase F: Modularização - Config Centralizada
 - Fase G: CodeRabbit Review - TESTS PASSED ✅
-
-### ✅ Done
 - Fase L: Wiki + Cerebro + NPCs + Combate

 ---

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/INDEX.md around lines 14 - 15, There are two identical "### ✅ Done" headers in INDEX.md; remove the duplicate header and merge its content into the first "### ✅ Done" block so all completed items live under a single section; specifically, locate the second "### ✅ Done" header and the link "- Fase L: Wiki + Cerebro + NPCs + Combate" and move that list item into the first "### ✅ Done" section (or delete the second header if you've moved the item), ensuring there is only one "### ✅ Done" header remaining.

============================================================================
File: assets/js/api-module.js
Line: 13 to 23
Type: potential_issue

Comment:
No-op stubs may cause silent failures if methods are expected to return Promises.

These API methods (e.g., getProfile, saveCharacter) likely return Promises. The empty no-ops return undefined, so callers using await or .then() will get confusing errors or silent failures instead of clear feedback that the method isn't implemented.




🛡️ Suggested improvement: return rejected Promises with warning

-  window.api.getProfile = window.api.getProfile || function() {};
-  window.api.getGMParty = window.api.getGMParty || function() {};
-  window.api.getPlayerParty = window.api.getPlayerParty || function() {};
-  window.api.getPartyMembers = window.api.getPartyMembers || function() {};
-  window.api.joinParty = window.api.joinParty || function() {};
-  window.api.createCharacter = window.api.createCharacter || function() {};
-  window.api.loadCharacter = window.api.loadCharacter || function() {};
-  window.api.saveCharacter = window.api.saveCharacter || function() {};
-  window.api.listCharacters = window.api.listCharacters || function() {};
-  window.api.listPartyCharacters = window.api.listPartyCharacters || function() {};
-  window.api.listNPCs = window.api.listNPCs || function() {};
+  const stubMethod = (name) => () => {
+    console.warn([api-module.js] ${name} not implemented in api.js);
+    return Promise.reject(new Error(${name} not implemented));
+  };
+
+  const methods = [
+    'getProfile', 'getGMParty', 'getPlayerParty', 'getPartyMembers',
+    'joinParty', 'createCharacter', 'loadCharacter', 'saveCharacter',
+    'listCharacters', 'listPartyCharacters', 'listNPCs'
+  ];
+
+  methods.forEach(m => {
+    window.api[m] = window.api[m] || stubMethod(m);
+  });

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/api-module.js around lines 13 - 23, Replace the silent no-op stubs so callers using await/.then get a clear failure: update each stubbed function (e.g., window.api.getProfile, getGMParty, getPlayerParty, getPartyMembers, joinParty, createCharacter, loadCharacter, saveCharacter, listCharacters, listPartyCharacters, listNPCs) to return a rejected Promise with a descriptive Error indicating the API method is not implemented (include the method name in the message); this ensures consumers immediately receive a rejected Promise instead of undefined and can handle or log the error.

============================================================================
File: supabase/crawler/raw-data/A__Summers.json
Line: 1 to 12
Type: potential_issue

Comment:
Missing foto_base64 field from schema.

Per learnings, foto_base64 field added to database in 2025. Should be included here.




🔧 Add missing field

   "powerGrid": {},
   "rawPowers": [],
+  "foto_base64": "",
   "timestamp": "2026-04-15T21:26:47.325Z"

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/raw-data/A__Summers.json around lines 1 - 12, This JSON for "A. Summers" is missing the required foto_base64 field; update the object (the entry with "name": "A. Summers") to include a foto_base64 key (e.g., an empty string or null if no image available) alongside the existing keys like "rawPowers" and "timestamp" so it conforms to the 2025 schema change.

============================================================================
File: assets/js/globals.js
Line: 4
Type: potential_issue

Comment:
Load order comment is incomplete and inconsistent with guideline.

Comment is missing cache-module.js and uses api-module.js instead of api.js. As per coding guidelines, the correct load order is: config.js → supabase-client.js → cache-module.js → auth-module.js → api.js → globals.js → themes.js → page-specific.




📝 Proposed fix

- * Load order: config.js → supabase-client.js → auth-module.js → api-module.js → globals.js
+ * Load order: config.js → supabase-client.js → cache-module.js → auth-module.js → api.js → globals.js → themes.js

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/globals.js at line 4, Update the load order comment text in globals.js to match the coding guideline: include cache-module.js and use api.js (not api-module.js), replacing the existing line with the correct sequence "config.js → supabase-client.js → cache-module.js → auth-module.js → api.js → globals.js → themes.js → page-specific" so the comment accurately documents module initialization order.

============================================================================
File: supabase/crawler/process-browser.js
Line: 130
Type: potential_issue

Comment:
Wrap JSON.parse in try-catch.

If the input file contains malformed JSON, this will throw an unhandled exception with an unclear error message.



🛡️ Proposed fix

-  const raw = JSON.parse(readFileSync(inputFile, 'utf-8'));
+  let raw;
+  try {
+    raw = JSON.parse(readFileSync(inputFile, 'utf-8'));
+  } catch (e) {
+    console.error(❌ Invalid JSON in ${inputFile}: ${e.message});
+    process.exit(1);
+  }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/process-browser.js at line 130, Wrap the JSON.parse(readFileSync(inputFile, 'utf-8')) call in a try-catch to handle malformed JSON: catch the SyntaxError, log a clear message including the inputFile and the parse error (or attach it to a new Error), and then either rethrow or exit gracefully; update the code around the raw variable assignment so raw is only set on successful parse and errors include file context for easier debugging.

============================================================================
File: assets/js/gm-config.js
Line: 2 to 4
Type: potential_issue

Comment:
Hard-coded email exposes PII.

Email addresses are personally identifiable information. Move whitelist to environment variables or secure configuration outside source control.




🔒 Proposed fix using environment variable

-// GM whitelist - users with these emails will be treated as Game Masters
-var GM_WHITELIST = [
-  'vmfs2000@gmail.com'
-];
+// GM whitelist - users with these emails will be treated as Game Masters
+const GM_WHITELIST = (import.meta.env.VITE_GM_WHITELIST || '').split(',').filter(Boolean);


Then set in .env file (not committed):

VITE_GM_WHITELIST=vmfs2000@gmail.com

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/gm-config.js around lines 2 - 4, GM_WHITELIST currently hard-codes a PII email; change it to read from an environment/config variable (e.g., VITE_GM_WHITELIST) so secrets aren’t in source control: replace the static GM_WHITELIST array in gm-config.js with logic that reads process.env or the Vite equivalent (import.meta.env.VITE_GM_WHITELIST), splits/parses the CSV into an array, defaults to an empty array if undefined, and update docs/.env.example to instruct adding VITE_GM_WHITELIST (do not commit the real .env).

============================================================================
File: assets/js/supabase-client.js
Line: 22 to 28
Type: potential_issue

Comment:
Silent null return when window.supabase is unavailable.

If the Supabase library hasn't loaded yet, this returns null without warning. Callers chaining methods (e.g., getSupabaseClient().from(...)) will get a TypeError.




🛡️ Proposed fix: add warning log

     return function() {
       if (!supabaseClient && window.supabase) {
         supabaseClient = window.supabase.createClient(config.url, config.anonKey);
         console.log('[supabase-client.js] Client created');
+      } else if (!window.supabase) {
+        console.warn('[supabase-client.js] Supabase library not loaded yet');
       }
       return supabaseClient;
     };

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/supabase-client.js around lines 22 - 28, The factory currently returns null silently when the Supabase library isn't loaded; update the returned function (the closure that references supabaseClient and window.supabase) to detect the case where !supabaseClient && !window.supabase and emit a clear warning (e.g., console.warn) explaining that the Supabase script hasn't loaded yet and that callers should retry or check loading order before returning null, so callers get a helpful message instead of a silent TypeError when calling getSupabaseClient().from(...) .

============================================================================
File: tests/validation.test.js
Line: 39
Type: potential_issue

Comment:
Same port mismatch for combate.html.

-  await page.goto('http://localhost:8080/combate.html', { waitUntil: 'networkidle' });
+  await page.goto('http://localhost:3000/combate.html', { waitUntil: 'networkidle' });

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @tests/validation.test.js at line 39, The test is navigating to combate.html on the wrong port; update the URL used in the page.goto call (page.goto('http://localhost:8080/combate.html', ...)) to match the server port used by the suite (e.g., replace 8080 with the correct port variable or constant the tests use) so page.goto points to the same port as other tests and the running dev/test server.

============================================================================
File: .opencode/opencode.json
Line: 1 to 6
Type: potential_issue

Comment:
Potential configuration conflict with root opencode.json.

Both .opencode/opencode.json and opencode.json exist in this PR. Clarify which configuration file OpenCode will use, as having two conflicting configurations may lead to unexpected behavior.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @.opencode/opencode.json around lines 1 - 6, There are two OpenCode configuration files causing a conflict: .opencode/opencode.json and opencode.json; decide which config should be authoritative, then remove or merge the duplicate so only one opencode.json remains (either keep root opencode.json and delete .opencode/opencode.json, or merge the nested file into the root and remove the nested file), and update the remaining file to include the desired "plugin" entries (e.g., "check") and any other settings to preserve; also add a short comment or PR note clarifying that the repository uses the root opencode.json as the single source of truth.

============================================================================
File: supabase-setup.sql
Line: 23 to 26
Type: potential_issue

Comment:
Overly permissive: Any GM can manage ALL NPCs across all parties.

This policy allows any user who is a GM of any party to modify all NPCs, regardless of which party the NPC belongs to. If NPCs are party-scoped, this is a privilege escalation vulnerability.

Additionally, FOR ALL is missing WITH CHECK for INSERT operations.




🔒 Proposed fix (assuming NPCs have a party_id column)

 DROP POLICY IF EXISTS "GM can manage NPCs" ON npcs;
-CREATE POLICY "GM can manage NPCs" ON npcs FOR ALL USING (
-  auth.uid() IN (SELECT gm_id FROM parties)
-);
+CREATE POLICY "GM can manage NPCs" ON npcs FOR ALL
+  USING (auth.uid() IN (SELECT gm_id FROM parties WHERE id = npcs.party_id))
+  WITH CHECK (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id));


If NPCs are intentionally global, add a comment clarifying this design decision.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase-setup.sql around lines 23 - 26, The policy "GM can manage NPCs" on table npcs is too permissive; change the USING clause to restrict access to only NPCs whose party_id maps to a party the current GM owns (e.g. USING (EXISTS (SELECT 1 FROM parties p WHERE p.id = npcs.party_id AND p.gm_id = auth.uid()))), and add a WITH CHECK clause to enforce this same constraint on INSERT/UPDATE (e.g. WITH CHECK (EXISTS (SELECT 1 FROM parties p WHERE p.id = new.party_id AND p.gm_id = auth.uid()))); keep the policy name "GM can manage NPCs" but replace the global auth.uid() IN (...) logic with the party-scoped EXISTS checks referencing npcs.party_id and parties.gm_id so GMs can only manage NPCs belonging to their own parties.

============================================================================
File: tests/admin.test.js
Line: 54 to 61
Type: potential_issue

Comment:
Test name is misleading and test depends on prior test execution.

1. Test is named "app.js - registers /admin route" but doesn't load app.js and tests /test route instead
2. Relies on Router being loaded by previous tests - will fail if run in isolation or reordered


🔧 Proposed fix

-// Test admin route registration
-test('app.js - registers /admin route', async ({ page }) => {
+// Test Router dynamic registration
+test('router.js - allows dynamic route registration', async ({ page }) => {
+  await page.addScriptTag({ path: 'app/core/router.js' });
   const hasRoute = await page.evaluate(() => {
     Router.add('/test', () => {});
     return typeof Router.routes['/test'] === 'function';
   });
   assert(hasRoute, 'Router should allow dynamic route registration');
 });

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @tests/admin.test.js around lines 54 - 61, Rename and rewrite the test so it actually loads the app and verifies the /admin route without depending on prior tests: change the test title from "app.js - registers /admin route" to match the assertion, or better, import/require the app module (or the Router class) directly in the test, instantiate or reset a fresh Router instance, call Router.add('/admin', ...) (or use the app's route registration method) and assert typeof Router.routes['/admin'] === 'function'; ensure the test does not rely on global Router state by creating a new Router or clearing Router.routes before calling Router.add.

============================================================================
File: assets/js/wiki.js
Line: 322 to 327
Type: potential_issue

Comment:
Inconsistent language in mode descriptions.

The temp mode uses Portuguese ("Modo Temporário: dificuldade normal...") while persist and perm modes use English ("difficulty +1 (harder)"). Consider using a consistent language for all descriptions.


💡 Suggested fix (Portuguese consistency)

     const descriptions = {
       'temp': 'Modo Temporário: dificuldade normal (coluna = obstáculo)',
-      'persist': 'Modo Indefinida: difficulty +1 (harder)',
-      'perm': 'Modo Permanente: difficulty +3 (much harder)'
+      'persist': 'Modo Indefinido: dificuldade +1 (mais difícil)',
+      'perm': 'Modo Permanente: dificuldade +3 (muito mais difícil)'
     };

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/wiki.js around lines 322 - 327, The mode descriptions object (descriptions) contains mixed languages — 'temp' is Portuguese while 'persist' and 'perm' are English — so update the values for the 'persist' and 'perm' keys to Portuguese to match 'temp'; modify the descriptions object (keys 'temp', 'persist', 'perm') and ensure desc.textContent = descriptions[mode] || '' still returns the unified Portuguese strings.

============================================================================
File: tests/validation.test.js
Line: 12
Type: potential_issue

Comment:
Port mismatch will cause test failures.

The test connects to localhost:8080, but the serve script in package.json starts the server on port 3000. This will cause connection refused errors.

-  await page.goto('http://localhost:8080/dashboard.html', { waitUntil: 'networkidle' });
+  await page.goto('http://localhost:3000/dashboard.html', { waitUntil: 'networkidle' });

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @tests/validation.test.js at line 12, The test is trying to reach http://localhost:8080 but the app is served on port 3000, causing connection errors; update the test's page.goto call in tests/validation.test.js to use the correct port (e.g., change 'http://localhost:8080/dashboard.html' to 'http://localhost:3000/dashboard.html') or make the server port configurable and read it in the test (use an env var like process.env.PORT) so page.goto and the serve script in package.json stay in sync.

============================================================================
File: supabase/crawler/bookmarklet-auto.js
Line: 144 to 161
Type: potential_issue

Comment:
Script context is destroyed on navigation — async flow won't work.

When window.location.href = char.url executes on line 148, the browser navigates and this script's execution context is destroyed. Lines 149-160 will never run. The same issue affects startCrawl at line 174.

As a console script, this cannot survive page navigation. Consider:
1. Converting to a browser extension or Tampermonkey userscript that auto-loads on each page
2. Using a single-page approach where users manually re-run cerebroAuto.start() after each navigation, with state-driven resumption
3. Using fetch to retrieve page HTML without navigating (avoids CORS if same-origin)




🔧 Alternative: Use fetch instead of navigation

  async function processCharacter(char) {
    console.log(📡 Fetching: ${char.name});

-   window.location.href = char.url;
-   await new Promise(r => setTimeout(r, 2000)); // Wait for page load
-
-   const data = crawlCurrentPage();
+   try {
+     const response = await fetch(char.url);
+     const html = await response.text();
+     const parser = new DOMParser();
+     const doc = parser.parseFromString(html, 'text/html');
+
+     const data = crawlDocument(doc, char.url);
+     data.name = char.name;
+
+     const existing = getData();
+     existing.push(data);
+     saveData(existing);
+
+     console.log(✅ Saved: ${data.name});
+     return data;
+   } catch (e) {
+     console.error(Failed to fetch ${char.name}: ${e.message});
+     return null;
+   }
-   data.name = char.name; // Use clean name
-
-   const existing = getData();
-   existing.push(data);
-   saveData(existing);
-
-   console.log(✅ Saved: ${data.name}, Grid: ${JSON.stringify(data.powerGrid)});
-
-   return data;
  }


You'd also need to refactor crawlCurrentPage to accept a document parameter instead of using the global document.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/bookmarklet-auto.js around lines 144 - 161, The current processCharacter (and startCrawl) set window.location.href which destroys the script context; instead fetch the target page HTML and parse it so the script can continue—modify processCharacter to use fetch(char.url), create a Document via DOMParser, refactor crawlCurrentPage to accept a Document or HTML string (e.g., crawlCurrentPage(doc)), call crawlCurrentPage with the parsed document, then proceed to merge/save data and return; also remove navigation from startCrawl and iterate via fetch so the loop remains in-page (alternatively implement as an extension/userscript that reloads and resumes state, but the immediate fix is replacing navigation with fetch + refactor of crawlCurrentPage).

============================================================================
File: supabase/crawler/process-browser.js
Line: 149 to 150
Type: potential_issue

Comment:
SQL injection: faction and danger are not escaped.

These fields are interpolated directly into SQL without escaping single quotes. If the input JSON contains ' characters in these fields, the SQL will break or could be exploited.



🐛 Proposed fix

     const safeName = c.name.replace(/'/g, "''");
     const safeCode = c.codename.replace(/'/g, "''");
     const data = JSON.stringify(c.data).replace(/'/g, "''");
+    const safeFaction = c.faction.replace(/'/g, "''");
+    const safeDanger = c.danger.replace(/'/g, "''");

     lines.push(-- ${c.name});
     lines.push(INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES ();
     lines.push(  gen_random_uuid(),);
     lines.push(  '${safeName}',);
     lines.push(  '${safeCode}',);
-    lines.push(  '${c.faction}',);
-    lines.push(  '${c.danger}',);
+    lines.push(  '${safeFaction}',);
+    lines.push(  '${safeDanger}',);
     lines.push(  '${data}'::jsonb,);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/process-browser.js around lines 149 - 150, The SQL construction is vulnerable because c.faction and c.danger are interpolated directly into strings via lines.push(  '${c.faction}',) and lines.push(  '${c.danger}',); fix by sanitizing or parameterizing these values: add a small helper (e.g., escapeSqlString(value)) that returns null-safe strings with single quotes doubled (replace all ' with '') or use parameterized query bindings, then call escapeSqlString(c.faction) and escapeSqlString(c.danger) inside the lines.push calls so the generated SQL is safe.

============================================================================
File: supabase/crawler/bookmarklet-auto.js
Line: 29 to 38
Type: potential_issue

Comment:
Add defensive parsing for corrupted localStorage data.

JSON.parse will throw if localStorage contains invalid JSON (e.g., from manual edits or storage corruption). This could crash the script on start() or status().




🛡️ Wrap JSON.parse in try-catch

  function getState() {
-   return JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
+   try {
+     return JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
+   } catch {
+     console.warn('Corrupted state, resetting...');
+     return {};
+   }
  }

  function getData() {
-   return JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
+   try {
+     return JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
+   } catch {
+     console.warn('Corrupted data cache, resetting...');
+     return [];
+   }
  }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/bookmarklet-auto.js around lines 29 - 38, Wrap JSON.parse calls in getState and getData with try-catch to defensively handle corrupted localStorage; if parsing throws, log or silently handle the error and return the safe defaults ({} for getState, [] for getData), and optionally clear the corrupted key (STATE_KEY or CACHE_KEY) so subsequent calls won't fail; leave saveState unchanged. Update the functions getState and getData to catch JSON.parse errors and return their respective fallback values so start() and status() won't crash.

============================================================================
File: supabase/crawler/crawler-brightdata.cjs
Line: 104 to 192
Type: potential_issue

Comment:
Browser not cleaned up on error — resource leak.

If any unhandled error occurs after browser.newPage() (line 117) but before browser.disconnect() (line 185), the remote browser connection leaks.



Wrap in try/finally

   const page = await browser.newPage();

   const collected = [];
+
+  try {

   for (const letter of ALPHABET) {
     // ... existing loop code ...
   }

-  await browser.disconnect();
-
   // Save combined
   writeFileSync(path.join(OUT_DIR, 'cerebro_crawl_combined.json'), JSON.stringify(collected, null, 2));

   console.log(\n🎉 Done! Collected ${collected.length} characters);
   console.log(   Saved to: ${OUT_DIR}/);
+  } finally {
+    await browser.disconnect();
+  }
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawler-brightdata.cjs around lines 104 - 192, The crawlWithBrightData function can leak the remote browser connection if an error occurs after browser.newPage() and before browser.disconnect(); wrap the main crawling logic (everything after connecting and creating the page) in a try/finally so that browser.disconnect() is always called (or browser.close() as appropriate) in the finally block, and ensure you check that the browser variable is defined before attempting to disconnect; reference crawlWithBrightData, the browser local variable, and the page created by browser.newPage() when adding the try/finally cleanup.

============================================================================
File: CHANGELOG.md
Line: 67
Type: potential_issue

Comment:
Missing RLS policies for sessions table.

Row Level Security is enabled for the sessions table on line 67, but no corresponding policies are defined in the SQL block. This will block all access to the sessions table, preventing legitimate operations.




📋 Suggested policies to add

-- Sessions: Add appropriate policies based on your data model
-- Example (adjust based on your schema):
CREATE POLICY "Users can view sessions they're part of" ON sessions
  FOR SELECT USING (
    auth.uid() IN (
      SELECT player_id FROM party_members
      WHERE party_id = sessions.party_id
    ) OR auth.uid() = gm_id
  );

CREATE POLICY "GM can manage their sessions" ON sessions
  FOR ALL USING (auth.uid() = gm_id);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @CHANGELOG.md at line 67, Row Level Security was enabled for the sessions table but no policies were added, which will block access; add appropriate RLS policies for the sessions table (e.g., a SELECT policy allowing auth.uid() to view sessions when they are the gm_id or are listed in party_members for sessions.party_id, and an ALL (or UPDATE/DELETE) policy allowing auth.uid() = gm_id to manage their sessions) by creating POLICY entries targeting the sessions table and referencing auth.uid(), gm_id and party_members to control access.

============================================================================
File: supabase/crawler/crawler-api-proper.cjs
Line: 96 to 118
Type: potential_issue

Comment:
Function appears unused and cmstart parameter is misused.

This function is never called - the main crawler uses Puppeteer page scraping instead (lines 144-158). Also, cmstart is a continuation token for pagination, not a filter for titles starting with a letter.



Consider removing this dead code or using cmprefix if you want to filter by letter prefix:

-    cmstart: letter,
+    cmprefix: letter,



MediaWiki API categorymembers cmprefix parameter

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawler-api-proper.cjs around lines 96 - 118, The findEarth616Pages function is dead or incorrect: it’s not called by the crawler and it misuses the MediaWiki API parameter cmstart (which is a continuation token) when you intended to filter by starting letter. Either remove this unused function, or update it to use cmprefix to filter page titles by prefix and handle pagination via cmcontinue (and keep its return shape); reference the function name findEarth616Pages and the apiRequest call to adjust parameters from cmstart -> cmprefix and add handling for cmcontinue if you keep the helper.

============================================================================
File: assets/js/wiki.js
Line: 213 to 248
Type: potential_issue

Comment:
Critical syntax error: orphaned array literals outside AVOV_DATA.

Lines 214-248 contain array rows that are not part of any variable assignment. AVOV_DATA closes at line 213 with ];, leaving 35 standalone array literals that will cause a JavaScript parse error.

These rows should either be removed or integrated into the correct data structure.


🐛 Proposed fix: Remove orphaned data

 // AV=50
 ['N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N','N',3,5,7,8,9,10,11,12,13]
 ];
-[29,23,21,19,18,16,15,14,13,12,11,9,8,7,6,5,4,3,"N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"],
-[30,25,22,20,19,17,16,15,14,13,12,11,10,9,8,6,5,4,3,"N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"],
-... (remove all lines 214-248)

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/wiki.js around lines 213 - 248, The snippet contains 35 orphaned array literals that were left after AVOV_DATA was closed (AVOV_DATA ends with "];"), causing a parse error; fix by either removing these standalone rows entirely or reintegrating them into the AVOV_DATA array (move the rows so they sit before the closing bracket of AVOV_DATA, ensure proper commas between entries and a single closing "];"), and then run a quick lint/parse to confirm no stray tokens remain.

============================================================================
File: supabase/crawler/bookmarklet.js
Line: 35 to 36
Type: potential_issue

Comment:
:contains() is not a valid CSS selector for querySelector.

The :contains() pseudo-selector is jQuery-specific and not supported by the native DOM querySelector API. This will throw a SyntaxError or silently fail.



🐛 Proposed fix using standard DOM traversal

-      const cell = document.querySelector(.infobox .pi-data-value:contains("${label}"))
-                || document.querySelector([data-source="${label}"]);
+      // Try data-source attribute first (more reliable)
+      let cell = document.querySelector([data-source="${label}"]);
+      if (!cell) {
+        // Fallback: search infobox cells by text content
+        document.querySelectorAll('.infobox .pi-data-value').forEach(el => {
+          if (!cell && el.textContent.includes(label)) cell = el;
+        });
+      }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/bookmarklet.js around lines 35 - 36, The selector using :contains() is invalid for querySelector; update the lookup that sets the cell variable so it first queries all .infobox .pi-data-value elements (e.g., via querySelectorAll) and then finds the one whose textContent includes the label, and only use the [data-source="${label}"] fallback if that find returns null; reference the cell assignment and the label variable in bookmarklet.js when applying this change.

============================================================================
File: supabase/crawler/bookmarklet.js
Line: 100 to 102
Type: potential_issue

Comment:
URL-encoded characters in wiki path not decoded.

Special characters like apostrophes (%27) in URLs will remain encoded in the wiki field.



🔧 Proposed fix

-    const wiki = window.location.pathname.split('/').pop().replace(/_/g, ' ');
+    const wiki = decodeURIComponent(window.location.pathname.split('/').pop()).replace(/_/g, ' ');

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/bookmarklet.js around lines 100 - 102, The wiki variable in crawlCurrentPage leaves URL-encoded characters (e.g., %27) intact; update the extraction in function crawlCurrentPage to decode the pathname segment before/after replacing underscores by applying decodeURIComponent to the result of window.location.pathname.split('/').pop() (or to the string after .replace(/_/g, ' ')), so wiki becomes decodeURIComponent().replace(/_/g, ' ').trim() to correctly convert encoded characters like %27 to apostrophes.

============================================================================
File: opencode.json
Line: 10
Type: potential_issue

Comment:
Security risk: Using npx -y and @latest together.

The combination of -y (auto-accept) and @latest poses security and stability risks:
- -y automatically installs and runs packages without confirmation
- @latest can pull breaking changes or potentially malicious updates

Consider pinning to a specific version and removing the -y flag for better security control.



🔒 Recommended fix to pin version

-      "command": ["npx", "-y", "chrome-devtools-mcp@latest"],
+      "command": ["npx", "chrome-devtools-mcp@1.0.0"],


Note: Replace 1.0.0 with the specific stable version you want to use.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @opencode.json at line 10, Change the "command" entry that currently uses npx with auto-accept and @latest by removing the "-y" flag and pinning the chrome-devtools-mcp package to a specific version instead of "@latest"; specifically update the array value referencing the "command" key so it runs e.g. ["npx", "chrome-devtools-mcp@1.2.3"] (choose the vetted version) or, if you must avoid interactive prompts, ensure you vendor or install the pinned package via your lockfile rather than using "-y".

============================================================================
File: supabase/crawler/crawler-puppeteer.cjs
Line: 24 to 26
Type: potential_issue

Comment:
Use page.setUserAgent() instead of setExtraHTTPHeaders for User-Agent.

Setting User-Agent via extra headers may conflict with Puppeteer's internal handling and won't affect all requests consistently.

-await page.setExtraHTTPHeaders({
-  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
-});
+await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawler-puppeteer.cjs around lines 24 - 26, Replace the manual User-Agent header passed to page.setExtraHTTPHeaders with Puppeteer's dedicated API: call page.setUserAgent(...) using the same UA string and remove that header from the page.setExtraHTTPHeaders call; update the code around the existing page.setExtraHTTPHeaders usage and ensure page.setUserAgent is invoked before navigation so the UA applies to all requests.

============================================================================
File: supabase/crawler/crawler-brightdata.cjs
Line: 25 to 27
Type: potential_issue

Comment:
URL encoding incomplete for special characters in password.

Only : is encoded. If the password contains @, /, or ?, the WebSocket URL will be malformed.



Suggested fix using encodeURIComponent

 const AUTH = process.env.BRIGHT_DATA_AUTH || 'brd-customer-YOUR_ACCOUNT-zone-YOUR_ZONE:YOUR_PASSWORD';
-const SBR_WS_ENDPOINT = wss://${AUTH.replace(':', '%3A')}@brd.superproxy.io:9222;
+const [user, ...passParts] = AUTH.split(':');
+const pass = passParts.join(':'); // Handle passwords containing ':'
+const SBR_WS_ENDPOINT = wss://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@brd.superproxy.io:9222;

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawler-brightdata.cjs around lines 25 - 27, The current SBR_WS_ENDPOINT only percent-encodes ':' and will break if the password contains @, /, ? or other special chars; update the code to split AUTH into user and pass (split on the first ':'), URL-encode each part with encodeURIComponent (e.g., encodeURIComponent(user) and encodeURIComponent(pass)), then reconstruct the userinfo as ${encodedUser}:${encodedPass} and use that in SBR_WS_ENDPOINT (wss://${encodedUser}:${encodedPass}@brd.superproxy.io:9222) so all special characters are safely encoded; adjust AUTH/SBR_WS_ENDPOINT handling accordingly.

============================================================================
File: kanban/fase-g-coderabbit-review.md
Line: 75
Type: potential_issue

Comment:
Misplaced task in Testing section.

"Fix wiki.html renderThemeDots" is an implementation fix, not a test. Move this to the HTML/UI Fixes or JavaScript Fixes section.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/fase-g-coderabbit-review.md at line 75, The checklist item "Fix wiki.html renderThemeDots" is incorrectly placed under the Testing section; update the kanban/phase-g-coderabbit-review.md document by moving that task entry out of Testing and into the appropriate implementation section (either "HTML/UI Fixes" or "JavaScript Fixes"), ensuring the exact checklist line "- [x] Fix wiki.html renderThemeDots" is removed from Testing and added under the chosen fixes section so the task categorization matches its implementation nature.

============================================================================
File: kanban/fase-g-coderabbit-review.md
Line: 68 to 69
Type: potential_issue

Comment:
Pending repository cleanup task.

Session log removal and .gitignore update are incomplete. Complete this before closing the phase to prevent committing future session files.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/fase-g-coderabbit-review.md around lines 68 - 69, Remove the tracked session log and ignore future ones by deleting the committed session-ses_2914.md from the repository (use git rm --cached if you need to keep a local copy) and add a pattern like session-*.md to .gitignore so new session files are not committed; commit the .gitignore change and then commit the removal so the repo no longer contains session logs.

============================================================================
File: kanban/fase-g-coderabbit-review.md
Line: 40 to 41
Type: potential_issue

Comment:
Pending JavaScript refactor remains incomplete.

The api-module.js saveCharacter refactor is still pending. This should be completed or moved to a future phase before closing Fase G.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/fase-g-coderabbit-review.md around lines 40 - 41, The saveCharacter function in api-module.js still uses a raw fetch and must be refactored to use the Supabase client: replace the fetch call inside saveCharacter with a supabase.from('characters').insert(...) (or upsert if appropriate) using the existing Supabase client instance (e.g., supabase or createClient reference), await the response, check for error and handle it by throwing or returning a structured error, and return the inserted record(s) instead of the raw fetch response; ensure you use the same column names/shape expected by the rest of the code and update any tests/call sites to handle the Supabase response format.

============================================================================
File: supabase/crawler/crawler-api.cjs
Line: 56 to 139
Type: potential_issue

Comment:
Browser may leak if unhandled error occurs before close.

If an error escapes the try/catch blocks (e.g., in page.setViewport), the browser process stays open. Use try/finally to guarantee cleanup.


🛡️ Proposed fix

 async function crawlWithAPI() {
   console.log('🚀 Launching browser...');
   const browser = await puppeteer.launch({
     headless: false,
     args: ['--disable-blink-features=AutomationControlled']
   });

+  try {
     const page = await browser.newPage();
     await page.setViewport({ width: 1280, height: 800 });

     // ... rest of crawl logic ...

-  await browser.close();
+  } finally {
+    await browser.close();
+  }

   writeFileSync(path.join(OUT_DIR, 'cerebro_crawl_combined.json'), JSON.stringify(collected, null, 2));

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawler-api.cjs around lines 56 - 139, The crawlWithAPI function can leak the Puppeteer browser if an error occurs before browser.close (for example in page.setViewport); wrap the main logic after launching the browser in a try/finally and call browser.close() in the finally to guarantee cleanup. Specifically, after creating browser = await puppeteer.launch(...) move the loop and page operations into a try block (covering page.setViewport, page.goto, the ALPHABET loop and inner work) and ensure the finally calls await browser.close() (and guards if browser is undefined) so the browser is always closed even on unexpected exceptions.

============================================================================
File: kanban/fase-g-coderabbit-review.md
Line: 57 to 59
Type: potential_issue

Comment:
Inconsistent task completion status.

The parent checkbox is unchecked, but line 248-249 sub-task is marked "(done, keep API version)". Either check the parent box if all sub-tasks are complete, or split this into separate tasks for clarity.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @kanban/fase-g-coderabbit-review.md around lines 57 - 59, The kanban task list shows the parent checkbox unchecked while a sub-task (remove duplicate id="toast" at lines 248-249) is marked done; update the checklist so status is consistent: either mark the parent checkbox as checked if all sub-tasks (remove duplicate functions filtrar, setCat, mudaRodada at lines 865-875 and removing duplicate id="toast") are completed, or split the completed id="toast" item into its own separate task and leave the parent unchecked. Make the change in the markdown so the parent checkbox and the sub-task items (filtrar, setCat, mudaRodada, id="toast") accurately reflect completion.

============================================================================
File: supabase/crawler/bookmarklet.js
Line: 88 to 89
Type: potential_issue

Comment:
Same :contains() issue.



🐛 Proposed fix

-    const el = document.querySelector('[data-source="RealName"]')
-            || document.querySelector('.infobox td:contains("Real name")');
+    let el = document.querySelector('[data-source="RealName"]');
+    if (!el) {
+      document.querySelectorAll('.infobox td').forEach(td => {
+        if (!el && td.textContent.includes('Real name')) el = td.nextElementSibling || td;
+      });
+    }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/bookmarklet.js around lines 88 - 89, The selector using ':contains("Real name")' isn't valid for document.querySelector, so change the lookup for the RealName element (the code that sets const el) to first try document.querySelector('[data-source="RealName"]') and if that returns null, fall back to selecting candidate cells (e.g., document.querySelectorAll('.infobox td') or similar) and iterate/find the TD whose textContent or innerText includes or equals "Real name" (trimmed) to then pick its adjacent/value cell; update the reference where const el is assigned to use this two-step approach and ensure you match the exact text using textContent/innerText rather than a CSS pseudo-class.

============================================================================
File: assets/css/wiki.css
Line: 26
Type: potential_issue

Comment:
Consider increasing font sizes for better accessibility.

Several elements use very small font sizes that may impact readability:
- Line 26: .65rem (~10.4px) for nav titles
- Line 37: .72rem (~11.5px) for nav links
- Line 157: .65rem (~10.4px) for table headers
- Line 189: .55rem (~8.8px) for search input

The search input at .55rem is particularly small. WCAG recommends a minimum of ~14px (0.875rem) for readable body text. Consider increasing these values, especially for the search input.




💡 Suggested font size improvements

 .wiki-nav-title {
   font-family: var(--mono);
-  font-size: .65rem;
+  font-size: .75rem;
   color: var(--muted2);
   letter-spacing: .15em;


 .wiki-nav-link {
   display: block;
   padding: 8px 16px;
   font-family: var(--body);
-  font-size: .72rem;
+  font-size: .8rem;
   color: var(--text);


 .wiki-content th {
   background: var(--p2);
   font-family: var(--cond);
-  font-size: .65rem;
+  font-size: .75rem;
   font-weight: 700;


 .wiki-search-input {
   width: 100%;
   padding: 8px 12px;
   background: var(--p2);
   border: 1px solid var(--b2);
   color: var(--white);
   font-family: var(--mono);
-  font-size: .55rem;
+  font-size: .75rem;
   outline: none;
 }




Also applies to: 37-37, 157-157, 189-189

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/wiki.css at line 26, Increase the small font sizes in assets/css/wiki.css for better accessibility: update the nav title (was 0.65rem), nav links (was 0.72rem), table headers (was 0.65rem), and especially the search input (was 0.55rem) to at least 0.875rem (≈14px) or adjust to a readable scale, by editing the corresponding selectors (nav title selector, nav link selector, table th rule, and the search input selector) to use the new font-size values and verify spacing/line-height remains acceptable after the change.

============================================================================
File: supabase/crawler/bookmarklet.js
Line: 72
Type: potential_issue

Comment:
Same :contains() issue - not valid CSS.

Replace with standard DOM traversal.



🐛 Proposed fix

-    const section = document.querySelector('#Powers') || document.querySelector('h2:contains("Powers")');
+    let section = document.querySelector('#Powers');
+    if (!section) {
+      document.querySelectorAll('h2').forEach(h2 => {
+        if (!section && h2.textContent.includes('Powers')) section = h2;
+      });
+    }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/bookmarklet.js at line 72, The selector uses the invalid CSS pseudo-class ':contains()' when trying to find a "Powers" heading; replace this with standard DOM traversal by first trying document.querySelector('#Powers') and, if not found, iterating over document.querySelectorAll('h2') (or desired heading level) and selecting the element whose textContent matches or includes "Powers" (trim and optionally case-insensitive) and assign that to the constant 'section' so the code no longer relies on the unsupported 'h2:contains("Powers")' selector.

============================================================================
File: supabase/crawler/crawler-api-proper.cjs
Line: 195 to 196
Type: potential_issue

Comment:
Synchronous file write can crash crawler on I/O errors.

writeFileSync inside the character loop will throw on disk full or permission errors, terminating the entire crawl. Wrap in try/catch or use async writes.




🛡️ Proposed fix

         const filename = char.name.replace(/[^a-z0-9]/gi, '_').substring(0, 50) + '.json';
-        writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2));
+        try {
+          writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2));
+        } catch (writeErr) {
+          console.log(       ⚠️ Failed to write file: ${writeErr.message});
+        }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawler-api-proper.cjs around lines 195 - 196, Replace the synchronous writeFileSync call with a safe write that won't crash the crawler: catch and handle I/O errors around the write or use async writes (fs.promises.writeFile) so failures don't throw out of the character loop; specifically update the block that builds filename from char.name and calls writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2)) to instead perform an awaited fs.promises.writeFile (or wrap writeFileSync in try/catch) and log or skip on error while continuing the loop.

============================================================================
File: supabase/crawler/crawl.js
Line: 80
Type: potential_issue

Comment:
Duplicate entry: Bastion appears twice in the character list.

Lines 80 and 105 both define Bastion with identical wiki and faction. While the deduplication logic in main() handles this at runtime, removing the duplicate keeps the source array clean.



🔧 Suggested fix

Remove line 105 (the duplicate Bastion entry):
   // Sentinels / Human foes
-  { name: 'Bastion',         wiki: 'Bastion_(comics)',       faction: 'vilao',      danger: 'extremo' },
   { name: 'Bolivar Trask',   wiki: 'Bolivar_Trask',         faction: 'humano',     danger: 'medio'   },




Also applies to: 105-105

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawl.js at line 80, Remove the duplicate character entry for "Bastion" from the source characters array to avoid redundant data (the runtime dedup in main() already handles duplicates); locate the array containing objects like { name: 'Bastion', wiki: 'Bastion_(comics)', faction: 'vilao', danger: 'extremo' } and delete the second/duplicate occurrence (the one that matches the existing Bastion object) so only a single Bastion entry remains.

============================================================================
File: supabase/crawler/crawl.js
Line: 45
Type: potential_issue

Comment:
Duplicate entry: Longshot appears twice in the character list.

Lines 45 and 115 both define Longshot with identical wiki and faction. Remove one to keep the array clean.




Also applies to: 115-115

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawl.js at line 45, The characters array contains a duplicate object for the character 'Longshot' (same name/wiki/faction); remove one of the two identical objects (the duplicate with name 'Longshot') from the array in supabase/crawler/crawl.js so the list no longer includes the same entry twice, and run a quick grep for 'Longshot' to confirm only the intended single entry remains and no other code relies on both entries.

============================================================================
File: assets/js/api.js
Line: 356 to 380
Type: potential_issue

Comment:
ReferenceError: GM_WHITELIST is not defined in this scope.

GM_WHITELIST is declared as a local variable inside the IIFE (line 6) but referenced at line 364 outside the IIFE. This will throw a ReferenceError if window.GM_WHITELIST is undefined globally.



🐛 Use window.GM_WHITELIST consistently

 function requireAuth(requiredRole) {
   var client = window.getSupabaseInternal();
   if (!client) { window.location.href = 'index.html'; return Promise.resolve(null); }
   return client.auth.getSession().then(function(result) {
     var session = result.data.session;
     if (!session) { window.location.href = 'index.html'; return null; }
     var user = session.user;
     // Check if user is in GM whitelist
-    if (typeof GM_WHITELIST !== 'undefined' && GM_WHITELIST.indexOf(user.email.toLowerCase()) !== -1) {
+    var gmWhitelist = (typeof window.GM_WHITELIST !== 'undefined') ? window.GM_WHITELIST : [];
+    if (gmWhitelist.indexOf(user.email.toLowerCase()) !== -1) {
       var profile = { id: user.id, email: user.email, username: 'GM', display_name: 'GM', role: 'gm' };
       return { session: session, profile: profile };
     }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/api.js around lines 356 - 380, The code in requireAuth references GM_WHITELIST which is defined inside an IIFE and may be unavailable, causing a ReferenceError; update the check to use the global window.GM_WHITELIST (e.g. replace typeof GM_WHITELIST !== 'undefined' && GM_WHITELIST.indexOf(...) with typeof window.GM_WHITELIST !== 'undefined' && window.GM_WHITELIST.indexOf(user.email.toLowerCase()) !== -1) and ensure you always access window.GM_WHITELIST when building the GM profile; this keeps the GM whitelist lookup in requireAuth consistent with the global declaration and avoids the ReferenceError.

============================================================================
File: supabase/crawler/crawler-api-proper.cjs
Line: 29 to 39
Type: potential_issue

Comment:
Missing HTTP error handling and JSON parse protection.

fetch() doesn't reject on HTTP errors (4xx/5xx), and res.json() can throw on invalid JSON. This could cache error responses or crash the crawler.




🛡️ Proposed fix

 function fetchWithCache(url) {
   const now = Date.now();
   if (cache.has(url)) {
     const { data, time } = cache.get(url);
     if (now - time  res.json()).then(data => {
-    cache.set(url, { data, time: now });
+  return fetch(url).then(res => {
+    if (!res.ok) throw new Error(HTTP ${res.status}: ${res.statusText});
+    return res.json();
+  }).then(data => {
+    cache.set(url, { data, time: Date.now() });
     return data;
   });
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawler-api-proper.cjs around lines 29 - 39, The fetchWithCache function currently caches any response and assumes res.json() always succeeds; update fetchWithCache to first await fetch(url) and check response.ok (throw or reject with a helpful error if !ok) so HTTP 4xx/5xx are not treated as success, then safely parse the body by reading res.text() and attempting JSON.parse in a try/catch (or use a safe JSON parse) so malformed JSON doesn't throw out of the function; only call cache.set(url, { data, time }) when the response is ok and parsing succeeded, and propagate/throw errors otherwise so error responses are not cached by fetchWithCache.

============================================================================
File: supabase/crawler/crawler-api.cjs
Line: 79 to 84
Type: potential_issue

Comment:
Potential name mismatch in API call.

Line 82 strips (Earth-616) from text, then line 101 re-appends it. If original text was formatted differently (e.g., spacing, case), the reconstructed title may not match the actual wiki page title. Consider using the original href to extract the exact page title.


🐛 Suggested approach

 document.querySelectorAll('.category-page__member-link').forEach(link => {
   if (link.querySelector('img')) return;
   const text = link.textContent || '';
   const href = link.href || '';
   if (text.includes('(Earth-616)') || href.includes('(Earth-616)')) {
-    const name = text.replace('(Earth-616)', '').trim();
-    if (name && name.length

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/crawler-api.cjs around lines 79 - 84, The code that strips "(Earth-616)" from link text (variable name) then later re-appends it can produce mismatches for differently formatted titles; instead extract the canonical page title from the original href (e.g., parse the path or last segment) and use that exact value (e.g., char.pageTitle or the parsed title) in the API call rather than reconstructing from the trimmed text; update the code around the name/href handling and the place that calls the API (where result.push is used and where the API consumes the character title) to pass the parsed href-based title.

============================================================================
File: supabase/crawler/README.md
Line: 44 to 48
Type: potential_issue

Comment:
Clarify default model behavior.

Line 44 states Qwen is the default, but the models table (lines 117-121) lists --model=qwen as a flag without indicating it's the default. Consider adding "(default)" to the Qwen row in the table or explicitly stating in line 44 that no flag is needed for the default.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/README.md around lines 44 - 48, The README is ambiguous about which model is used by default; update the documentation so it explicitly states that running "node process.js" uses Qwen 2.5 1.5B by default and/or mark the Qwen row in the models table as "(default)". Modify the top usage lines referencing process.js and the models table entry for --model=qwen so they clearly indicate the default behavior (e.g., note that no --model flag required to use Qwen).

============================================================================
File: cerebro.html
Line: 876 to 887
Type: potential_issue

Comment:
Duplicate function definitions will cause unexpected behavior.

Several functions are defined twice with different implementations:

- filtrar(): Lines 746 and 876-880
- setCat(): Lines 747-750 and 882-887
- abrirPainel(): Lines 894-900 and 1231
- fecharPainel(): Lines 901-906 and 1232
- showToast(): Lines 908-913 vs toast() at Line 1233

The second definitions will override the first. This appears to be leftover code from refactoring.



🐛 Recommended action

Remove the duplicate function definitions (Lines 876-913). The earlier implementations (Lines 746-750, 1231-1233) appear to be the correct ones based on usage patterns.



Also applies to: 889-906, 908-913

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @cerebro.html around lines 876 - 887, There are duplicate definitions of filtrar, setCat, abrirPainel, fecharPainel and toast/showToast causing overrides; remove the later duplicate implementations (the ones around the 876–913 range) so the original functions (the earlier filtrar and setCat and the abrirPainel/fecharPainel/toast implementations used elsewhere) remain unique, and ensure all call sites reference the original function names (filtrar, setCat, abrirPainel, fecharPainel, toast) after cleanup.

============================================================================
File: CHANGELOG.md
Line: 74 to 75
Type: potential_issue

Comment:
Critical: Overly permissive NPC access policy.

The NPC policy grants full access (INSERT/UPDATE/DELETE) to ALL NPCs for ANY authenticated user. In a multi-user TTRPG system, this allows any player to modify or delete NPCs created by other GMs, which could corrupt game data.

Consider restricting NPC management to GMs only or adding ownership tracking.




🔒 Recommended fix with GM-only access

 -- NPCs: public read, authenticated write
 CREATE POLICY "Public read NPCs" ON npcs FOR SELECT USING (true);
-CREATE POLICY "Authenticated can manage NPCs" ON npcs FOR ALL USING (auth.role() = 'authenticated');
+-- Option 1: If NPCs have a created_by or gm_id field
+CREATE POLICY "GM can manage own NPCs" ON npcs FOR ALL USING (auth.uid() = gm_id);
+
+-- Option 2: If you have a separate gms table or role
+CREATE POLICY "Only GMs can manage NPCs" ON npcs FOR ALL USING (
+  auth.uid() IN (SELECT user_id FROM gms)
+);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @CHANGELOG.md around lines 74 - 75, The NPC RLS policy "Authenticated can manage NPCs" on table npcs is too permissive (grants ALL to any authenticated user); change it to restrict management to GMs or owners by replacing the USING clause with a GM role check (e.g., USING (auth.role() = 'gm')) or implement ownership-based checks (e.g., USING (auth.role() = 'gm' OR owner_id = auth.uid()) and set WITH CHECK (owner_id = auth.uid()) for INSERT/UPDATE) so only GMs or the NPC owner can create/update/delete NPCs; update the policy named "Authenticated can manage NPCs" accordingly and ensure the npcs table has owner_id if you choose ownership tracking.

============================================================================
File: ficha.html
Line: 821
Type: potential_issue

Comment:
Reference to body before it is defined causes runtime error.

In the sel.addEventListener('change', ...) handler, body is referenced (e.g., body.setAttribute('data-icon', ...)) but body is only created later at Line 864 (const body=document.createElement('div')). When the type is changed, this will throw ReferenceError: body is not defined.



🐛 Explanation

The body variable is created after the event listener is attached. When the select changes, the handler runs and tries to access body, but at that point body doesn't exist in scope.

You need to either:
1. Move the body creation before the event listener, or
2. Query for the card body element within the event handler using div.querySelector('.card-body')

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @ficha.html at line 821, The change handler attached in sel.addEventListener('change', ...) references the variable body before it is defined (const body=document.createElement('div')), causing a ReferenceError; fix by either moving the body creation above the sel.addEventListener call or, better, resolve the element at runtime inside the handler (e.g., use div.querySelector('.card-body') to get the body element) and then update attributes/style (data-icon and --card-bg using newIconUrl/newIconMap) or remove them when newIconUrl is falsy.

============================================================================
File: supabase/crawler/README.md
Line: 102 to 109
Type: potential_issue

Comment:
Clarify conversion formulas with concrete examples.

The conversion formulas use ambiguous terminology:
- "tier" (line 102): Does "-1 tier" mean subtract 1 from the MEGS value, or move down one row in the conversion table?
- "destreza modifier" (line 106): This term is undefined—how is the modifier calculated from Speed?
- "+1 if durability ≥ 6" (line 104): Does this mean +1 to the MEGS value or bump to the next tier in the table?
- "influência, aura" (line 107): Do both attributes receive the same MEGS value from Energy?

Consider adding concrete examples for at least one character to demonstrate how these formulas work in practice.




📋 Recommended enhancement: Add example calculation

Consider adding a section like:

### Example: Wolverine
Wiki stats: Intelligence 2, Strength 4, Speed 2, Durability 7, Energy 1, Fighting 7

Conversions:
- inteligência: 4 (wiki 2 → MEGS 4)
- vontade: 2 (intelligence tier -1 → 4-2 = 2)
- força: 8 (wiki 4 → MEGS 8)
- corpo: 14 (avg of strength 8 + durability 17 = 12.5, +1 for durability ≥ 6 → 13.5 → 14)
...

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/README.md around lines 102 - 109, Clarify the ambiguous conversion rules in the README by explicitly defining what "tier" means (e.g., whether it is subtracting 1 from the numeric MEGS value or moving one row in the conversion table), define how the "destreza modifier" is calculated from Speed (provide the exact formula or lookup rule), specify whether "+1 if durability ≥ 6" means adding one to the computed MEGS value or bumping to the next tier, and state if Energy maps to both "influência" and "aura" (same value or different). Update the lines containing "wiki Intelligence → inteligência, vontade (vontade = int -1 tier)", "wiki Strength+Durability → corpo (averaged, +1 if durability ≥ 6)", "wiki Agility+Fighting → destreza (max of both)", "wiki Speed → destreza modifier + iniciativa", and "wiki Energy → influência, aura" to include these precise definitions and then add a concrete worked example (use the suggested Wolverine example or another character) showing step‑by‑step conversion from wiki stats to final MEGS values so readers can follow the formulas.

============================================================================
File: assets/css/dashboard.css
Line: 599 to 610
Type: potential_issue

Comment:
Duplicate selector definitions will cause style conflicts.

.party-name is defined at line 318 (display font, 1.3rem) and again here at line 599 (mono font, .6rem). Same for .party-code at lines 325 and 605. The second definitions override the first, which may break the party info header styling.

Use scoped selectors to differentiate contexts.




🔧 Proposed fix using scoped selectors

 / In PARTY LIST section (lines 599-610) /
-.party-name {
+.party-item .party-name {
   font-family: var(--mono);
   font-size: .6rem;
   color: var(--white);
   letter-spacing: .05em;
 }
-.party-code {
+.party-item .party-code {
   font-family: var(--mono);
   font-size: .48rem;
   color: var(--muted2);
   letter-spacing: .1em;
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/dashboard.css around lines 599 - 610, The duplicate .party-name and .party-code rules are overwriting the original header styles; fix by scoping or renaming the second set so they don't collide: update the new rules (the ones at the later diff) to use a more specific selector such as a contextual class (e.g., .compact .party-name / .compact .party-code or .party-header-compact .party-name / .party-header-compact .party-code) or rename those classes and then update the corresponding HTML to use the new class names so the original header styles for .party-name and .party-code remain untouched.

============================================================================
File: assets/js/api.js
Line: 406
Type: potential_issue

Comment:
ReferenceError: getSupabase is not defined in this scope.

getSupabase is declared inside the IIFE (line 10) and is not accessible outside. This line will throw a ReferenceError at runtime. Line 354 already correctly assigns the function, so this line is both broken and redundant.



🐛 Remove the broken line

-window.getSupabase = getSupabase;

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/api.js at line 406, Remove the redundant and out-of-scope export that causes ReferenceError: delete the trailing global assignment "window.getSupabase = getSupabase;" which refers to getSupabase declared inside the IIFE and is not accessible there; rely on the existing correct assignment already made earlier in the file (the earlier export of getSupabase inside the IIFE) and ensure no other global references to the undefined symbol remain.

============================================================================
File: assets/css/dashboard.css
Line: 106 to 122
Type: potential_issue

Comment:
Hardcoded colors break theme consistency.

The encounter banner uses hardcoded #c07040 / rgba(192,112,64,...) instead of theme CSS custom properties. This won't adapt when users switch themes.

As per coding guidelines: "Use theme CSS custom properties: --accent, --accent2, --accent3 with available themes: yellow, red, green, purple, blue"




🎨 Proposed fix using theme variables

 .encounter-banner {
   display: none;
   padding: 10px 16px;
-  background: rgba(192,112,64,.08);
-  border: 1px solid rgba(192,112,64,.35);
-  border-left: 3px solid #c07040;
+  background: rgba(var(--accentRGB),.08);
+  border: 1px solid rgba(var(--accentRGB),.35);
+  border-left: 3px solid var(--accent);
   margin-bottom: 20px;
 }
 .encounter-banner.active { display: flex; align-items: center; gap: 8px; }
 .enc-banner-title {
   font-family: var(--mono);
   font-size: .58rem;
-  color: #c07040;
+  color: var(--accent);
   letter-spacing: .14em;
   text-transform: uppercase;
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/dashboard.css around lines 106 - 122, Replace hardcoded color values in the encounter banner styles with theme CSS custom properties: change background (currently rgba(192,112,64,.08)) to use --accent3 (or an rgba built from --accent3), set the main border color (rgba(192,112,64,.35)) to --accent2 (with appropriate alpha), set the left border color (#c07040) to --accent, and change .enc-banner-title color from #c07040 to var(--accent); update selectors .encounter-banner, .encounter-banner.active, and .enc-banner-title to reference these variables so the banner adapts to the yellow/red/green/purple/blue themes.

============================================================================
File: ficha.html
Line: 635 to 636
Type: potential_issue

Comment:
Dead code: Duplicate return statement.

Two consecutive return; statements — the second one is unreachable dead code, likely a merge conflict artifact.



🐛 Proposed fix

       window.location.href = newUrl;
       return;
-      return;
     } catch(e) {

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @ficha.html around lines 635 - 636, Remove the duplicate unreachable return; statement so only a single return; remains; locate the consecutive "return;" tokens in the function/block in ficha.html and delete the second one (the extra "return;") to eliminate dead code.

============================================================================
File: assets/js/auth-module.js
Line: 7
Type: potential_issue

Comment:
Critical: Missing function call parentheses will cause runtime errors.

window.getSupabaseClient without () assigns the function reference itself, not the client instance. When client().auth.signUp() is called on Line 15, this will fail because client is the function, not the Supabase client object.



🐛 Proposed fix

-  const client = window.getSupabaseClient;
+  const client = window.getSupabaseClient();


Alternatively, if the intent was to create a getter to always fetch a fresh client:

-  const client = window.getSupabaseClient;
+  const getClient = window.getSupabaseClient;


Then use getClient() throughout instead of client().

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/auth-module.js at line 7, The code assigns the function reference instead of its return value; change the assignment of client to call the factory: replace the current const client = window.getSupabaseClient with a call to obtain the actual Supabase client (i.e., invoke window.getSupabaseClient()) so that later uses like client().auth.signUp() operate on the client object; alternatively, if you intended a getter function, rename the variable to getClient and update all callers to use getClient() consistently (adjust references to client or client() accordingly).

============================================================================
File: assets/js/auth-module.js
Line: 38 to 49
Type: potential_issue

Comment:
Missing error handling for profile query during login.

If the profiles query fails (e.g., network issue, RLS policy), profileResult.error is not checked. The code only checks profileResult.data, but a failed query with an error would still fall through without logging or handling the error.



🛡️ Suggested improvement

       return client().from('profiles').select('role').eq('id', result.data.user.id).single()
         .then(function(profileResult) {
+          if (profileResult.error) {
+            console.warn('[login] Profile fetch error:', profileResult.error.message);
+          }
           if (profileResult.data) {

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/auth-module.js around lines 38 - 49, The profiles query callback ignores errors; update the promise chain inside the .then for client().from('profiles').select(...).eq(...).single() to check profileResult.error and handle it (e.g., log the error and either reject/throw or return a safe fallback) before using profileResult.data; ensure you surface the error to the caller or call processLogger/console.error with profileResult.error and avoid calling client().auth.updateUser when profileResult.error exists, and use the existing result.data.user/session when appropriate.

============================================================================
File: ficha.html
Line: 673 to 678
Type: potential_issue

Comment:
Parameter v is shadowed immediately, making it unused.

The function signature declares v as a parameter, but Line 674 immediately shadows it with a local var v. The parameter is never used.



🐛 Proposed fix

-function validaCampo(el,v){
-  var v=parseInt(el.value),min=parseInt(el.min),max=parseInt(el.max);
+function validaCampo(el){
+  var v=parseInt(el.value),min=parseInt(el.min),max=parseInt(el.max);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @ficha.html around lines 673 - 678, The function validaCampo declares a parameter v but immediately shadows it with a local var v, so remove the unused parameter from the signature (change function validaCampo(el) ...) or rename the local parsed variable (e.g., parsedV) used for parseInt to avoid shadowing; update all uses inside validaCampo (the checks using v) to reference the new local name, and convert var to let/const for clarity (ensure el.min/el.max parsing still works and empty el.value is handled as before).

============================================================================
File: cerebro.html
Line: 651
Type: potential_issue

Comment:
Undeclared variable isGM creates implicit global.

isGM = profile.role === 'gm' assigns to an undeclared variable, creating an implicit global. This works but is bad practice and will fail in strict mode.



🐛 Proposed fix

Add declaration at the top of the state section (around line 579):

 let condTargetId=null;
 let currentPartyId=null;
+let isGM=false;
 let ENCONTRO={rodada:1,participantes:[]};

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @cerebro.html at line 651, The line assigns to an undeclared variable (isGM = profile.role === 'gm'), creating an implicit global; declare isGM in the state scope instead (e.g., add a declaration like "let isGM;" or "let isGM = false;" in the top of the state section) and then keep the assignment using profile.role === 'gm', or alternatively replace the assignment with a block-scoped declaration "const isGM = profile.role === 'gm';" to avoid creating a global.

============================================================================
File: supabase/crawler/process.js
Line: 376 to 384
Type: potential_issue

Comment:
JSON.parse is outside try-catch — corrupted file crashes entire script.

If any JSON file in raw-data/ is malformed, the script terminates without processing remaining characters. Wrap the parse in the error handler for resilience.


🛡️ Proposed fix to handle invalid JSON gracefully

   for (const file of files) {
-    const raw = JSON.parse(readFileSync(join(RAW_DIR, file), 'utf-8'));
     try {
+      const raw = JSON.parse(readFileSync(join(RAW_DIR, file), 'utf-8'));
       const sheet = await processCharacter(raw, pipe, useLLM && !!pipe);
       sheets.push(sheet);
     } catch (err) {
-      console.warn(  ✗ ${raw.name}: ${err.message});
+      console.warn(  ✗ ${file}: ${err.message});
     }
   }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/process.js around lines 376 - 384, The JSON.parse call is outside the try-catch so a malformed file aborts the whole loop; move the parsing and file read inside the per-file error handler so each file is handled independently: for each entry in files, call readFileSync and JSON.parse within the try block that surrounds processCharacter (referencing the for loop over files, readFileSync(join(RAW_DIR, file)), JSON.parse, and processCharacter) and on catch log the error and continue so one bad JSON file won’t crash the script and sheets only receives successfully parsed/processed results.

============================================================================
File: assets/css/components.css
Line: 29 to 35
Type: potential_issue

Comment:
Duplicate .portrait-img rule - second definition overrides this one.

This .portrait-img block (lines 29-35) is overwritten by another definition at lines 47-54 which adds display: none. Either consolidate them or remove the duplicate.



🔧 Suggested fix - remove duplicate

-.portrait-img {
-  position: absolute;
-  inset: 0;
-  width: 100%;
-  height: 100%;
-  object-fit: cover;
-}


Keep the definition at lines 47-54 which includes display: none.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/components.css around lines 29 - 35, The .portrait-img CSS rule is duplicated: the earlier block (position/size/object-fit) is overridden by a later .portrait-img that adds display:none; remove or consolidate the duplicate by keeping a single .portrait-img rule that combines the needed declarations (position, inset, width, height, object-fit, and display) so the final stylesheet has one canonical .portrait-img definition; update whichever rule (the earlier or the later one) to include all required properties and delete the other.

============================================================================
File: assets/js/wiki-pages.js
Line: 63 to 93
Type: potential_issue

Comment:
Duplicate object key tags will cause content loss.

The key tags is defined twice (lines 63-93 and lines 494-515). The second definition overwrites the first.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/wiki-pages.js around lines 63 - 93, The object contains a duplicate top-level property named "tags" which causes the first entry to be overwritten; locate both occurrences of the "tags" property and either merge their HTML content into a single "tags" value (preserving both sections and removing the duplicate) or rename one key to a distinct identifier (e.g., "tagsExtended") and update any references that expect the original "tags" symbol so consumers use the merged/renamed property consistently; update only the object literal containing "tags" to remove duplication and ensure no runtime overwrites occur.

============================================================================
File: assets/css/components.css
Line: 963 to 988
Type: potential_issue

Comment:
Toast text color #000 likely incorrect for dark theme.

The toast uses background: var(--p1) (dark panel) with color: #000 (black text), which would be unreadable. Should likely use a light text color.



🐛 Suggested fix

 .toast {
   position: fixed;
   bottom: 60px;
   left: 50%;
   transform: translateX(-50%) translateY(20px);
   background: var(--p1);
   border: 1px solid var(--accent);
   padding: 10px 16px;
   font-family: var(--mono);
   font-size: 0.85rem;
-  color: #000;
+  color: var(--text);
   letter-spacing: 0.05em;

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/components.css around lines 963 - 988, The .toast rule sets color: #000 which is unreadable on the dark background (background: var(--p1)); update the .toast selector to use the appropriate theme token instead of the hardcoded black (e.g., color: var(--text) or color: var(--on-p1)/--contrast-on-p1) so text contrasts with var(--p1), leaving .toast.show behavior unchanged; modify the color property in the .toast block (and any related overrides) to use the chosen theme variable.

============================================================================
File: assets/js/api.js
Line: 267 to 274
Type: potential_issue

Comment:
Remove debug logging before production.

Multiple console.log statements logging potentially sensitive data (player IDs, profile information) should be removed or converted to debug-level logging that can be disabled.



🧹 Remove debug statements

               var playerIds = chars.map(function(c) { return c.player_id; });
-              console.log('[listAllGMCharacters] playerIds:', playerIds);
               return getSupabase().from('profiles').select('id, display_name').in('id', playerIds)
                 .then(function(profiles) {
-                  if (profiles.error) console.error('[listAllGMCharacters] profiles error:', profiles.error);
-                  console.log('[listAllGMCharacters] profiles:', profiles);
+                  if (profiles.error) console.error('[listAllGMCharacters] profiles error:', profiles.error);
                   var profileMap = {};
                   if (profiles.data) profiles.data.forEach(function(p) { profileMap[p.id] = p.display_name; });
-                  console.log('[listAllGMCharacters] profileMap:', profileMap);
                   var mapped = chars.map(function(c) {

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/api.js around lines 267 - 274, In the listAllGMCharacters function remove or replace the debug console.log calls that print sensitive data (the console.log lines referencing playerIds, profiles, and profileMap); either delete them or replace with a proper debug/logging utility that can be toggled off in production (e.g., logger.debug) and ensure no PII (playerIds or profiles.data) is logged at info/error level; update the lines that currently log playerIds, profiles, and profileMap accordingly and keep the error handling console.error for profiles.error only if it doesn't expose PII.

============================================================================
File: coderabbitReview.md
Line: 676 to 708
Type: potential_issue

Comment:
Overlapping findings: NPC policy issues reported twice.

Lines 676-708 flag overly permissive NPC management in CHANGELOG.md line 75, and lines 780-815 flag the same issue in supabase-setup.sql lines 23-24. Both refer to the same policy allowing any authenticated user to manage NPCs. Consolidate these or clarify if they reference different policy instances.




Also applies to: 780-815

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @coderabbitReview.md around lines 676 - 708, The CREATE POLICY "Authenticated can manage NPCs" on table npcs is too permissive; change it to restrict ALL operations to GMs by replacing the auth.role() = 'authenticated' check with a GM-specific check (e.g., auth.role() = 'gm', auth.jwt()->>'role' = 'gm', or auth.uid() = gm_id if npcs has a gm_id column) and rename the policy (e.g., "GM can manage NPCs"); update both instances (the policy named "Authenticated can manage NPCs" and any duplicate in supabase-setup.sql/CHANGELOG.md) and ensure the USING and WITH CHECK expressions use the chosen GM check so only game masters can CREATE/SELECT/UPDATE/DELETE rows in npcs.

============================================================================
File: coderabbitReview.md
Line: 3 to 27
Type: potential_issue

Comment:
Recommendations assume CSS variables exist without verification.

Findings at lines 3-27 and 59-85 recommend using var(--green) and note "Ensure --green is defined in assets/css/base.css for all themes" but no finding verifies this variable actually exists. Add a verification finding or make the recommendation conditional.




Also applies to: 59-85

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @coderabbitReview.md around lines 3 - 27, Replace the hardcoded color in the .roll-result.success rule in assets/css/combate.css by using a theme variable (e.g., var(--green) or var(--color-success)) instead of #44bb44; before changing, verify in assets/css/base.css that the chosen variable (--green or --color-success) is declared for all themes and, if missing, add the variable definitions there so theme switching works; update any selectors depending on .roll-result.success specificity only if the change alters visual output.

============================================================================
File: assets/css/components.css
Line: 1175 to 1188
Type: potential_issue

Comment:
Duplicate grid transition rules for .enc-body and .pf-settings.

These rules duplicate definitions already present at lines 455-457 (.enc-body) and lines 494-497 (.pf-settings). The CSS cascade means these later rules win, making the earlier ones dead code.



♻️ Consolidate or remove duplicates

Either remove lines 455-457 and 494-497, or remove this block and keep only the earlier definitions. Having both is confusing for maintenance.

-/ ════════════════════════════════════════════════════════════════════ /
-/ LAYOUT TRANSITIONS FIX (P7) - grid-template-rows method               /
-/ ════════════════════════════════════════════════════════════════════ /
-
-.enc-body, .pf-settings, .collapsible {
-  display: grid;
-  grid-template-rows: 0fr;
-  overflow: hidden;
-  transition: grid-template-rows 0.3s ease;
-}
-
-.enc-body.open, .pf-settings.open, .collapsible.open {
-  grid-template-rows: 1fr;
-}
-
-.enc-body > , .pf-settings > , .collapsible > * {
-  min-height: 0;
-}


Or consolidate by removing lines 455-457 and 494-497, keeping only this unified block that also adds .collapsible.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/components.css around lines 1175 - 1188, The CSS contains duplicate rules for the selectors .enc-body and .pf-settings which makes earlier declarations dead and confusing; remove the earlier duplicate definitions and keep this unified block (the consolidated rules for .enc-body, .pf-settings, .collapsible including the grid-template-rows, overflow, transition and .open state) or alternatively delete this block and retain the original declarations—ensure only one canonical definition exists for .enc-body and .pf-settings and that .collapsible is included in that canonical rule set so maintenance is unambiguous.

============================================================================
File: assets/js/wiki-pages.js
Line: 71
Type: potential_issue

Comment:
Malformed HTML tag.

 for the  tag.


Proposed fix

-           O nível de poder (6 é Ômega)
+          Grau (1-6): O nível de poder (6 é Ômega)

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/wiki-pages.js at line 71, The HTML snippet contains a malformed tag " tag so the text reads "Grau (1-6):" wrapped by ... (update the string in the assets/js/wiki-pages.js template where the list item containing "Grau (1-6)" is defined).

============================================================================
File: supabase/crawler/process.js
Line: 318 to 324
Type: potential_issue

Comment:
Argument parsing can yield unexpected values when flag is absent.

When --model is not provided, findIndex returns -1, causing args[0] to be used (could be --dry-run or any other first arg). The fallback at line 349 catches invalid model names, but the logic is fragile.

Same issue applies to --char parsing on line 323-324, where an invalid charArg could cause incorrect file filtering.


🛡️ Proposed fix to guard against missing flags

-  const modelArg = args.find(a => a.startsWith('--model='))?.split('=')[1]
-    ?? args[args.findIndex(a => a === '--model') + 1]
-    ?? 'qwen';
+  const modelIdx = args.findIndex(a => a === '--model');
+  const modelArg = args.find(a => a.startsWith('--model='))?.split('=')[1]
+    ?? (modelIdx !== -1 ? args[modelIdx + 1] : null)
+    ?? 'qwen';
   const dryRun  = args.includes('--dry-run');
   const noLLM   = args.includes('--no-llm');
-  const charArg = args.find(a => a.startsWith('--char='))?.split('=')[1]
-    ?? args[args.findIndex(a => a === '--char') + 1];
+  const charIdx = args.findIndex(a => a === '--char');
+  const charArg = args.find(a => a.startsWith('--char='))?.split('=')[1]
+    ?? (charIdx !== -1 ? args[charIdx + 1] : undefined);

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @supabase/crawler/process.js around lines 318 - 324, The current parsing of modelArg and charArg reads args[findIndex(...) + 1] without checking if findIndex returned -1, which can pick up unrelated args; update the parsing to safely resolve values by first checking the index result !== -1 (or using a small helper like getArgValue(flag) that returns undefined if flag not present) before accessing the next array element, keep the existing fallback to 'qwen' for modelArg and null/undefined for charArg, and ensure you only accept non-empty strings (and optionally validate against allowed models/chars) before using modelArg or charArg elsewhere; reference the modelArg and charArg parsing logic that reads args and uses startsWith('--model=') / startsWith('--char=') and args.findIndex(...) to locate the flag.

============================================================================
File: assets/js/header.js
Line: 90 to 103
Type: potential_issue

Comment:
Missing error handling for requireAuth() rejection.

If requireAuth() rejects (e.g., network error), the promise chain will fail without handling. Add a .catch() to handle errors gracefully.


Proposed fix

 function requireGM() {
   return window.requireAuth().then(function(auth) {
     if (!auth) return null;
     if (!auth.profile) {
       window.location.href = 'dashboard.html';
       return null;
     }
     if (auth.profile.role !== 'gm') {
       window.location.href = 'dashboard.html';
       return null;
     }
     return auth;
+  }).catch(function(err) {
+    console.error('requireGM error:', err);
+    window.location.href = 'dashboard.html';
+    return null;
   });
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/header.js around lines 90 - 103, The requireGM function currently assumes window.requireAuth() always resolves; add rejection handling by appending a .catch handler to the promise returned by window.requireAuth() (inside requireGM) to handle network/errors: log the error (or send to the existing logger), optionally redirect to an appropriate page (e.g., 'login.html' or 'dashboard.html'), and ensure requireGM resolves to null on failure so callers get a consistent value; update the requireGM function to reference window.requireAuth() in its catch and perform the graceful fallback.

============================================================================
File: wiki.html
Line: 380
Type: potential_issue

Comment:
Duplicate script include for wiki-pages.js.

This file is already loaded in the  at line 23. Remove this duplicate to avoid re-execution and potential issues.


Proposed fix

-

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @wiki.html at line 380, Remove the duplicate script tag that re-includes "assets/js/wiki-pages.js" at the end of the file; locate the  reference (the duplicate) and delete it so the module is only loaded once (it is already included in the head).

============================================================================
File: assets/js/wiki-pages.js
Line: 386 to 409
Type: potential_issue

Comment:
Duplicate object key aps_distancia will cause content loss.

The key aps_distancia is defined twice in this object (lines 386-409 and lines 843-911). In JavaScript, the second definition overwrites the first, so the action table UI (AV/OV and EV/RV buttons) will be lost and replaced with the distance reference table.

Rename one of these keys to preserve both pages:


Proposed fix

-      aps_distancia:
+      acao_resultado:
         Tabela de Ação e Resultado


And update the navigation link in wiki.html accordingly.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/js/wiki-pages.js around lines 386 - 409, The object contains a duplicate key 'aps_distancia' so the second definition overwrites the first; rename one of the keys (for example rename the action/result page key to 'aps_acao_resultado' or similar) and update any references to that key (e.g., the navigation link in wiki.html) so both pages (the action/result UI with showARTableType/showARMode and the distance reference table) are preserved; search for usages of 'aps_distancia' and replace the appropriate occurrences in the object and in wiki.html navigation to match the new key name.

============================================================================
File: combate.html
Line: 321 to 328
Type: potential_issue

Comment:
Duplicate script loading will cause double execution.

All modules are loaded twice: once in  with defer (lines 15-22) and again in  without defer (lines 321-328). This causes double initialization and potential state corruption.

Remove the body scripts since the head scripts with defer will execute after DOM is ready.


Proposed fix

-
-
-
-
-
-
-
-

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @combate.html around lines 321 - 328, The page loads the same module scripts twice causing double execution and state issues; remove the duplicate script tags in the body that include the same module files (e.g., "assets/js/config.js", "assets/js/supabase-client.js", "assets/js/cache-module.js", "assets/js/auth-module.js", "assets/js/api.js", "assets/js/globals.js", "assets/js/themes.js" and the CDN for "@supabase/supabase-js@2") so only the head-deferred imports run; locate the duplicated  tags in the body and delete them so the deferred head scripts are the single source of initialization.

============================================================================
File: wiki.html.bak
Line: 610 to 614
Type: potential_issue

Comment:
Potential issue with evrvData lookup fallback.

When ev exceeds 15 (which happens with persist offset +2 or perm offset +5), the code falls back to evrvData[15]. For example, with perm mode and i=15, ev=20 which doesn't exist, so it uses row 15. This may not be the intended behavior for high EV values.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @wiki.html.bak around lines 610 - 614, The fallback to evrvData[15] causes incorrect rows when ev > 15; change the lookup used in the loop that builds tr.innerHTML so it safely bounds ev into the actual evrvData range (e.g., compute a lookup index like idx = Math.min(Math.max(0, ev), evrvData.length - 1) or use evrvData.length-1) and then use evrvData[idx] (or skip/handle missing rows) instead of always falling back to index 15; update the code paths that compute ev (from i with persist/perm offsets) to use this bounded index when building the row.

============================================================================
File: admin.html
Line: 232 to 282
Type: potential_issue

Comment:
XSS vulnerability in character edit modal.

Character data is directly interpolated into template literals and set via innerHTML. Fields like char.nome, char.codename, and nested data properties could contain malicious scripts.




🛡️ Suggested approach - escape HTML or use DOM methods

// Helper function to escape HTML
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(//g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Then use:

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @admin.html around lines 232 - 282, The modal sets innerHTML with unescaped user data (e.g., char.nome, char.codename, data.*) causing XSS; fix by escaping all interpolated values before inserting into the template or, preferably, build the modal via DOM APIs. Add a reusable escapeHtml(text) helper and use it when rendering values for inputs/textareas and in renderCharDataFields, and update code paths that call document.getElementById('char-modal-body').innerHTML so IDs like edit-char-name, edit-char-codename, edit-char-desc, edit-char-background and functions renderCharDataFields and addCharDataField receive only escaped/textContent values or are changed to createElement + textContent to avoid innerHTML with untrusted data.

============================================================================
File: index.html
Line: 16 to 20
Type: potential_issue

Comment:
Critical: Duplicate script loading causes race conditions.

Scripts are loaded twice:
- Lines 16-20: In  with defer attribute
- Lines 87-91: In  without defer

This causes:
1. Double network requests
2. Race conditions - the body scripts may execute before deferred head scripts
3. window.checkAuth() on line 94 may fail if auth-module hasn't loaded

Remove the duplicate scripts from the body.




🐛 Proposed fix

-
-
-
-
-

+    // Wait for DOMContentLoaded to ensure deferred scripts have loaded
+    document.addEventListener('DOMContentLoaded', function() {
       // Redirect if already logged in
       window.checkAuth();
+      // ... rest of initialization
+    });




Also applies to: 87-91

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @index.html around lines 16 - 20, Remove the duplicate script tags in the body that re-load assets/js/config.js, @supabase/supabase-js, assets/js/supabase-client.js, assets/js/auth-module.js, and assets/js/themes.js and keep only the single set in the head that use defer; then ensure the window.checkAuth() call runs after those deferred modules have loaded (e.g., leave the call where it is after the head/deferred scripts or wrap it in a DOMContentLoaded/async-ready check) so auth-module.js is guaranteed to be available when window.checkAuth() is invoked.

============================================================================
File: dashboard.html
Line: 16 to 24
Type: potential_issue

Comment:
Duplicate Supabase CDN script loading.

Supabase is loaded twice:
- Line 17:  (in head)
- Line 708:  (in body, without defer)

This causes unnecessary network requests and potential race conditions. Remove the duplicate.




🐛 Proposed fix


-





Also applies to: 707-708

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @dashboard.html around lines 16 - 24, There are two inclusions of the Supabase CDN which can cause duplicate loads and race conditions; remove the duplicated  tag in the body and keep the single deferred inclusion in the head, and ensure dependent scripts like supabase-client.js still appear after that head include so they execute with Supabase available; verify no other duplicate supabase-js tags exist elsewhere in the document.

============================================================================
File: admin.html
Line: 16 to 23
Type: potential_issue

Comment:
Duplicate script loading.

Scripts are loaded twice - once in  and again before the main script block. This is the same issue as in index.html and dashboard.html.




🐛 Proposed fix - remove duplicate loads

-
-
-
-
-

-





Also applies to: 135-141

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @admin.html around lines 16 - 23, The page is loading the same JS files twice; remove the duplicate  tags so each of these modules (assets/js/config.js, @supabase/supabase-js, assets/js/supabase-client.js, assets/js/cache-module.js, assets/js/auth-module.js, assets/js/api.js, assets/js/globals.js, assets/js/themes.js) is only included once and retains the correct execution order (keep one set either in the head or just before the main script block); also remove the duplicate set referenced at lines near 135-141 to prevent double initialization.

============================================================================
File: assets/css/admin.css
Line: 713 to 716
Type: potential_issue

Comment:
Possible CSS variable typo: --display vs --disp.

Line 714 uses var(--display) but other files appear to use var(--disp) for the display font family. Verify the correct variable name is being used.





🐛 Proposed fix (if --disp is correct)

 .char-card-avatar {
   width: 100%;
   aspect-ratio: 3 / 4;
   background: var(--p2);
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 2rem;
-  font-family: var(--display);
+  font-family: var(--disp);
   color: var(--muted);
 }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @assets/css/admin.css around lines 713 - 716, The CSS uses var(--display) in the rule (font-family: var(--display)) but your project consistently defines the display font as --disp; verify the correct variable name across your CSS/variables and replace var(--display) with var(--disp) where appropriate (or update the variable definition to --display if that was intended) so the font-family resolves correctly; check the root/custom-properties file to confirm which variable to standardize and make the change in the rule containing font-family: var(--display).

============================================================================
File: tests/spa-e2e.test.js
Line: 134 to 143
Type: potential_issue

Comment:
Page reuse between tests may cause test pollution.

The same page instance is used across all tests without clearing state between runs. Console error listeners from previous tests will accumulate, potentially causing false positives in later tests. Consider creating a fresh page per test or clearing listeners.




🛡️ Suggested fix: create fresh page per test

 for (const { name, fn } of TESTS) {
   try {
+    const page = await context.newPage();
     await fn({ page });
+    await page.close();
     console.log('✅ ' + name);
     passed++;
   } catch (e) {
     console.log('❌ ' + name + ': ' + e.message);
     failed++;
   }
 }
-
-await browser.close();

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @tests/spa-e2e.test.js around lines 134 - 143, The loop reuses a single page across all TESTS causing listener accumulation and state leakage; update the test runner to create a fresh page for each iteration (e.g., call context.newPage() or equivalent before invoking fn({ page })) and ensure you close the page after each test (page.close()) or explicitly remove listeners (e.g., page.off/removeAllListeners for console) so each TESTS entry (name, fn) runs with a clean page instance; adjust the try/catch to create the page before await fn({ page }) and always close/remove listeners in a finally block.

============================================================================
File: index.html
Line: 213 to 225
Type: potential_issue

Comment:
Confusing class name: error class used for valid state.

When the password is valid (≥6 chars), the code adds hint.classList.add('error') which is semantically incorrect. The class should indicate success, not error.




🐛 Proposed fix

     if (this.value.length >= 6) {
       hint.textContent = '✓ SENHA VÁLIDA';
-      hint.classList.add('error');
+      hint.classList.remove('error');
+      hint.classList.add('valid');
       this.classList.remove('validate-error');
       this.classList.add('validate-valid');
     } else {
       hint.textContent = 'Mínimo 6 caracteres';
-      hint.classList.remove('error');
+      hint.classList.remove('valid');
       this.classList.remove('validate-valid');
     }

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @index.html around lines 213 - 225, The password validation handler on the 'reg-password' input incorrectly adds the 'error' CSS class when the password is valid; update the event listener callback to remove adding 'error' in the valid branch and instead add a success-class (e.g., 'success' or 'valid') to the hint element, ensure the invalid branch adds/removes the corresponding classes consistently, and update references to class names ('error', 'validate-valid', 'validate-error') in the callback so the DOM state matches the validation state.

============================================================================
File: tests/spa-e2e.test.js
Line: 87 to 98
Type: potential_issue

Comment:
Test app/core/state.js has valid syntax is ineffective.

This test always passes (assert(true, ...)) regardless of the actual syntax check result. The ok variable from the evaluate is never used in the assertion.




🐛 Proposed fix

 test('app/core/state.js has valid syntax', async ({ page }) => {
-  const { ok } = await page.evaluate(async () => {
+  await page.goto('http://localhost:3000/app/core/state.js');
+  const { ok, error } = await page.evaluate(async () => {
     try {
-      new Function('const AppState = ' + document.querySelector('script[src*="state.js"]')?.textContent || '');
+      // Check if file loaded successfully
+      const content = document.body?.innerText || '';
+      new Function(content);
       return { ok: true };
     } catch(e) {
       return { ok: false, error: e.message };
     }
   });
-  // This test is more of a syntax check
-  assert(true, 'Syntax check for reference');
+  assert(ok, 'Syntax error in state.js: ' + (error || 'unknown'));
 });

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @tests/spa-e2e.test.js around lines 87 - 98, The test "app/core/state.js has valid syntax" currently ignores the evaluated result (the {ok, error} returned from page.evaluate); update the assertion to use that result (the ok variable) and fail with the returned error message when ok is false — i.e., after the page.evaluate that assigns { ok, error }, replace the unconditional assert(true, ...) with an assertion that checks ok (for example assert.ok(ok, state.js syntax error: ${error}) or assert(ok, error || 'unknown error')), keeping the existing page.evaluate and variable names so the change is minimal.

============================================================================
File: dashboard.html
Line: 821 to 830
Type: potential_issue

Comment:
Potential XSS vulnerability in character card rendering.

Character data (char.name, char.codinome, char.foto_base64) is inserted directly into innerHTML without sanitization. If any of these values contain malicious HTML/JavaScript, it could execute.




🛡️ Suggested fix using textContent for text values

 chars.forEach(function(char) {
   var card = document.createElement('a');
   card.className = 'char-card';
   card.href = 'ficha.html?id=' + char.id;
   var foto = char.foto_base64 || '';
-  var initial = char.codinome ? char.codinome.charAt(0).toUpperCase() : '?';
+  var name = char.name || 'Sem nome';
+  var codename = char.codinome || '—';
+  var initial = codename.charAt(0).toUpperCase() || '?';
+
+  // Create elements safely
+  var imgDiv = document.createElement('div');
+  var infoDiv = document.createElement('div');
+  infoDiv.className = 'char-info';
+
   if (foto) {
-    card.innerHTML = '' + (char.name || 'Sem nome') + '' + (char.codinome || '—') + '';
+    imgDiv.className = 'char-card-img';
+    imgDiv.style.backgroundImage = 'url(' + foto + ')';
   } else {
-    card.innerHTML = '' + initial + '' + (char.name || 'Sem nome') + '' + (char.codinome || '—') + '';
+    imgDiv.className = 'char-avatar';
+    imgDiv.textContent = initial;
   }
+
+  var nameEl = document.createElement('div');
+  nameEl.className = 'char-info-name';
+  nameEl.textContent = name;
+
+  var codeEl = document.createElement('div');
+  codeEl.className = 'char-info-codename';
+  codeEl.textContent = codename;
+
+  infoDiv.appendChild(nameEl);
+  infoDiv.appendChild(codeEl);
+  card.appendChild(imgDiv);
+  card.appendChild(infoDiv);
   grid.appendChild(card);
 });

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @dashboard.html around lines 821 - 830, The current code injects untrusted values (char.name, char.codinome, char.foto_base64) via card.innerHTML causing XSS; replace the innerHTML approach in the character rendering block by building DOM nodes with document.createElement, set text nodes via element.textContent for name and codename, and set the avatar/photo using a dedicated element whose style.backgroundImage is assigned programmatically (e.g., imageEl.style.backgroundImage = 'url(' + encodeURI(foto) + ')' or set imageEl.src if using an ), instead of concatenating HTML strings; update the code paths that currently write to card.innerHTML (both the .char-card-img/.char-avatar branches) to use these safe DOM methods and then append the card to grid.

============================================================================
File: sistema_hibrido_v3.md
Line: 1243 to 1245
Type: potential_issue

Comment:
Reconcile narrative restriction with mechanical possibility for urgent lasting effects.

Line 1245 states that actions under extreme urgency "nunca podem produzir efeitos duradouros ou permanentes" (can never produce lasting or permanent effects). However, Section 6.6 (lines 218-227) allows creating lasting/permanent conditions by applying OV/RV modifiers, and Section 27.2 applies rhythm modifiers to the same OV/RV.

Mechanically, both modifiers could stack (extreme urgency +5, lasting +1 column), making it merely harder but not impossible. The narrative prohibition at line 1245 suggests this should be mechanically prevented, not just difficult.

Consider explicitly stating that duration modifiers cannot be applied at extreme urgency rhythm, or that the combined difficulty makes success effectively impossible.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @sistema_hibrido_v3.md around lines 1243 - 1245, The text claims "Ações sob urgência extrema nunca podem produzir efeitos duradouros ou permanentes" but the mechanics in Section 6.6 (OV/RV modifiers) and Section 27.2 (rhythm modifiers) allow stacking modifiers that could still yield lasting effects; update the rules to reconcile narrative and mechanics by adding a clear rule: either forbid applying duration/lasting/permanent OV or RV modifiers when the rhythm is "urgência extrema", or add a hard cap/override that prevents duration columns from being gained under extreme urgency (e.g., disallow stacking of the +5 extreme urgency rhythm with any lasting-duration modifier), and reference Section 6.6 and 27.2 and the "urgência extrema" statement so readers know which rules are overridden.

============================================================================
File: sistema_hibrido_v3.md
Line: 192 to 197
Type: potential_issue

Comment:
Clarify maximum condition degree formula to avoid double-counting confusion.

Line 194 states "Grau máximo = EV + grau total das tags utilizadas," but line 112 already defines EV as "atributo base + grau total das tags utilizadas." This creates apparent double-counting: if EV already includes tags, adding tag total again would yield attribute + 2×tags.

Either: (1) the formula should be "Grau máximo = EV" (tags already included), or (2) EV in this context means base attribute only. The example at lines 640-668 uses EV as attribute+tags, making the line 194 formula ambiguous.



🔍 Proposed clarification

-O grau máximo de uma condição criada em uma única ação é:
-
-> Grau máximo = EV + grau total das tags utilizadas
+O grau máximo de uma condição criada em uma única ação é igual ao EV da ação:
+
+> Grau máximo = EV
+
+Onde EV já inclui o atributo base e o grau total das tags (ver Seção 4.1).

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @sistema_hibrido_v3.md around lines 192 - 197, Corrija a ambiguidade na definição de "Grau máximo": alinhe a fórmula em "Grau máximo = EV + grau total das tags utilizadas" com a definição de EV (atualmente "atributo base + grau total das tags utilizadas") ou vice‑versa; concretamente, escolha uma das duas opções e atualize os trechos correspondentes — ou redefina EV para significar apenas "atributo base" e mantenha a fórmula atual, ou mantenha EV como "atributo base + tags" e mude a fórmula para "Grau máximo = EV"; atualize também o exemplo usado nas linhas ~640-668 e qualquer ocorrência que mencione EV/Grau máximo para garantir consistência terminológica.

============================================================================
File: sistema_hibrido_v3.md
Line: 892 to 896
Type: potential_issue

Comment:
Clarify relationship between condition degree and RAPs in object destruction rules.

Lines 892-896 discuss object destruction using both "condição exceder o limiar" (condition exceeding threshold) and "RAPs" in the same sentence, creating ambiguity. It's unclear whether the 2× Structure comparison is against:
- The degree of the condition applied to the object, or
- The RAPs from the attack that created the condition.

Since RAPs determine condition degree (Section 4), these may be equivalent, but the mixed terminology makes the rule harder to parse.



📝 Proposed clarification

-Se uma condição exceder o limiar de Estrutura mas os RAPs ainda forem inferiores ao dobro da Estrutura, o objeto é inutilizável mas reparável.
+Se o grau da condição aplicada exceder a Estrutura do objeto mas for inferior ao dobro da Estrutura, o objeto é inutilizável mas reparável.

-Se os RAPs excederem o dobro da Estrutura, o objeto é destruído permanentemente.
+Se o grau da condição for igual ou superior ao dobro da Estrutura, o objeto é destruído permanentemente.

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @sistema_hibrido_v3.md around lines 892 - 896, Reescreva as duas linhas para deixar explícito que a comparação com "2× Estrutura" usa os RAPs do ataque (que, como definido na Seção 4, determinam o grau da condição) ou, alternativamente, o valor numérico do grau da condição gerado por esses RAPs; por exemplo, troque a frase ambígua que menciona simultaneamente "condição exceder o limiar" e "RAPs" por uma formulação única que diga algo como: se a condição atingir o limiar de Estrutura o objeto fica "inutilizável mas reparável"; se os RAPs do ataque (ou o grau de condição por eles gerado) excederem o dobro da Estrutura o objeto é "destruído permanentemente" — mantenha as expressões-chave "limiar de Estrutura", "RAPs", "inutilizável mas reparável" e "destruído permanentemente" para localizar o trecho a alterar.

============================================================================
File: sistema_hibrido_v3.md
Line: 86 to 90
Type: potential_issue

Comment:
Clarify automatic action behavior with pre-existing zero-degree states.

Lines 87-89 state that automatic actions can create new effects/conditions but cannot increase existing ones. This creates an ambiguity: if a condition already exists at degree 0 (dormant/trace state), does creating a new instance of that same condition count as "creating new" or "increasing existing"?

Suggest explicitly addressing this edge case in the rules.



📝 Proposed clarification

 - Podem criar novos efeitos ou condições.
 - Podem reduzir efeitos ou condições existentes.
 - Não podem aumentar o grau de um efeito ou condição já existente.
+- Se uma condição de grau 0 existir, aplicar uma ação automática cria uma instância separada (não soma).

Prompt for AI Agent:
Verify each finding against the current code and only fix it if needed.

In @sistema_hibrido_v3.md around lines 86 - 90, Clarify the edge case by adding a sentence that a pre-existing condition at degree 0 is considered an existing effect for the purposes of the automatic-action rules: reference the rules "Podem criar novos efeitos ou condições" and "Não podem aumentar o grau de um efeito ou condição já existente" and state explicitly that attempting to create the same condition when a degree 0 instance already exists counts as increasing an existing effect and is therefore not allowed; conversely, if you intend the opposite behavior, state instead that degree 0 is treated as dormant and creation of a new instance of the same condition is permitted and will be treated as a new effect (choose and make that policy explicit).

Review completed: 111 findings ✔

