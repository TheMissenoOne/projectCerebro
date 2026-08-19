# Changelog - X-MEN TTRPG

All notable changes to this project will be documented in this file.

---

## [2026-08-19] - Temas extras, Progressão, performance e PWA

### Added
- **PWA** - `manifest.webmanifest`, service worker (`sw.js`), ícones 192/512/maskable +
  apple-touch, página `offline.html`, faixa de estado offline e barra "instalar como app".
  O app abre em tela cheia (standalone), funciona offline e se atualiza sozinho.
- **Progressão de volta** - aba `05 PROGRESSÃO` na ficha: marcador de 5 quadrados,
  registro de evoluções e os 7 Momentos de Evolução (de `momentosDeEvolucao.json`),
  com descrição completa. Volta também ao export em PDF.
- **Botão + nos Cards Extras** - o grid de Esquadrão agora também cria cards.
- `npm run icons` regenera os PNGs do PWA a partir dos SVGs.

### Fixed
- **Temas Adicionais sumiram** (Aliado, Base de Operações, Transporte): o parser só lia
  `d.temas_adicionais`, chave inexistente em `temas.json` — os temas estão em `d.temas`
  com `tipo: "Adicional"`. Passa a ler pelo tipo.
- **404 de ícones de tema** - `adaptabilidade`, `enclave` e `conflitodificuldade` pediam
  arquivos que não existem em `icons/`. Resolução centralizada em `iconFor()` com aliases.
- **`listAllNPCs` sem cache** - o caminho do GM refazia a consulta inteira a cada load.
  Agora usa o cache de 5 min, invalidado em toda escrita de NPC; o botão RECARREGAR
  força a rede.
- **`filtrar()` e `setCat()` duplicados** em `cerebro.html`.

### Changed
- **Wizard de criação de tema removido** - modal, CSS, estado e chaves i18n. O botão `+`
  cria um card vazio direto, sem passo intermediário.
- **Performance** - `wiki.html` e `admin.html` carregavam todo o JS de forma bloqueante no
  `<head>` (incluindo os 124 KB de `wiki-pages.js`); os scripts foram para o fim do body.
  Busca do Cérebro com debounce de 120 ms, `content-visibility` nas linhas da lista de NPCs
  e `preconnect` para o Supabase e o jsDelivr.

---

## [2026-04-08] - GitHub Pages Version (feature/gh-pages)

### Added
- **Direct Supabase Integration** - All API calls now go directly to Supabase without needing a server
- **Theme System** - Added theme switcher to dashboard, ficha, admin, and wiki pages
- **Theme Persistence** - Theme choice saved to localStorage and applied on page load
- **Navigation Links** - Standardized toolbars with links to all pages (Dashboard, Cérebro, Wiki, Ficha, Admin)
- **Theme Switcher** - Visual buttons to switch between Yellow, Red, Green, Purple, Blue themes

### Changed
- **API Client** - Replaced custom auth with Supabase Auth (supabase-js library)
- **All HTML files** - Added Supabase CDN script
- **Header Border** - Now uses `var(--accent)` instead of hardcoded `var(--red)`
- **Global Aliases** - Fixed to use arrow functions to preserve `this` context

### Removed
- **Server Dependencies** - No longer requires Express server; runs entirely on GitHub Pages
- **auth.js** - Functionality merged into api.js

---

## [2026-04-07] - Bug Fixes Applied

### Priority 1 - Core Bugs
- ✅ ficha.html: Fixed `api.saveCharacter()` call to use proper method
- ✅ ficha.html: Added theme snippet to load saved theme on page load

### Priority 2 - Design and Theme
- ✅ base.css: Changed header border to use `var(--accent)` for theme support
- ✅ All pages: Added theme loading snippet in `<body>`
- ✅ All pages: Added theme switcher buttons in toolbars

### Priority 3 - Navigation
- ✅ dashboard.html: Added Cérebro, Wiki, Admin links, theme switcher, logout button
- ✅ ficha.html: Added Cérebro, Wiki links, theme switcher
- ✅ admin.html: Added Ficha, Cérebro, Wiki links, theme switcher
- ✅ wiki.html: Added Ficha, Cérebro links, theme switcher

### Priority 4 - Secondary Bugs
- ✅ api.js: Fixed global aliases to use arrow functions (preserves `this` context)
- ✅ api.js: Added `setTema()` function for theme switching

---

## Configuration Required

To use the GitHub Pages version, you need to configure Supabase credentials:

1. Edit `assets/js/api.js`
2. Replace `YOUR_SUPABASE_URL` with your project URL (e.g., `https://xxxxx.supabase.co`)
3. Replace `YOUR_SUPABASE_ANON_KEY` with your anon key

### Database Setup (Run in Supabase SQL Editor)

```sql
-- Enable RLS
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Characters: public read, owner write
CREATE POLICY "Public read characters" ON characters FOR SELECT USING (true);
CREATE POLICY "Owner can manage own characters" ON characters FOR ALL USING (auth.uid() = player_id);

-- NPCs: public read, authenticated write
CREATE POLICY "Public read NPCs" ON npcs FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage NPCs" ON npcs FOR ALL USING (auth.role() = 'authenticated');

-- Parties: owner only
CREATE POLICY "Owner can manage party" ON parties FOR ALL USING (auth.uid() = gm_id);

-- Party members
CREATE POLICY "Party members can view" ON party_members FOR SELECT USING (auth.uid() = player_id);
CREATE POLICY "Party members can join" ON party_members FOR INSERT WITH CHECK (auth.uid() = player_id);
```

---

## Files Modified

| File | Changes |
|------|---------|
| `assets/js/api.js` | Direct Supabase client, theme system, fixed aliases |
| `assets/css/base.css` | Theme-aware header, toolbar-spacer, th-btn styles |
| `index.html` | Added Supabase CDN, theme snippet, theme switcher |
| `dashboard.html` | Added Supabase CDN, theme snippet, toolbar links, theme switcher |
| `ficha.html` | Added Supabase CDN, theme snippet, toolbar links, theme switcher |
| `admin.html` | Added Supabase CDN, theme snippet, toolbar links, theme switcher |
| `cerebro.html` | Added Supabase CDN, theme snippet |
| `wiki.html` | Added Supabase CDN, theme snippet, toolbar links, theme switcher |
| `combate.html` | Added Supabase CDN |