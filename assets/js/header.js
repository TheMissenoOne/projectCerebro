/**
 * X-MEN TTRPG - Unified Navigation Module
 * Renders header + toolbar consistently across all pages.
 * Call renderNavBar({ page: 'dashboard' }) after DOM ready.
 *
 * Layout (styles: "SHARED NAV" section of assets/css/mobile.css):
 *   header  = logo · title · [desktop: theme / language / logout] · [mobile: MENU button]
 *   toolbar = [desktop: site nav, same on every page] · page actions · codes · save status
 *   mobile  = site nav + theme / language / logout live in a bottom sheet opened by MENU
 *
 * Labels sit in their own <span data-i18n>, never on an element that also holds an icon:
 * applyTranslations() rewrites textContent and would wipe the <svg>.
 */

/* Site navigation — identical on every page; GM-only entries appear once the role is known. */
const NAV_PAGES = [
  { page: 'dashboard', href: 'dashboard.html', icon: 'home', i18n: 'common.dashboard' },
  { page: 'cerebro', href: 'cerebro.html', icon: 'box', i18n: 'common.cerebro' },
  { page: 'wiki', href: 'wiki.html', icon: 'book', i18n: 'common.wiki' },
  { page: 'combate', href: 'combate.html', icon: 'zap', i18n: 'common.combat', gmOnly: true },
  { page: 'admin', href: 'admin.html', icon: 'settings', i18n: 'common.admin', gmOnly: true }
];
/* pages that live "under" a nav entry (a character sheet is opened from the dashboard) */
const NAV_PARENT = { ficha: 'dashboard' };

/* Page actions — the only per-page part of the toolbar. */
const NAV_ACTIONS = {
  newCharacter: { href: 'ficha.html?new=true', icon: 'plus', i18n: 'nav.newCharacter', primary: true },
  newNpc: { action: 'abrirAddModal()', icon: 'plus', i18n: 'cerebro.newNpc', primary: true },
  import: { action: 'abrirImportModal()', icon: 'download', i18n: 'common.import' },
  export: { action: 'exportarTodos()', icon: 'upload', i18n: 'common.export' },
  fichexport: { action: 'exportarPDF()', icon: 'upload', i18n: 'common.exportPdf' },
  reload: { action: 'recarregarDB()', icon: 'refresh', i18n: 'common.reload' },
  reset: { action: 'resetarFicha()', icon: 'trash', i18n: 'nav.reset', danger: true }
};

/* title = brand literal or titleKey (i18n); subKey = i18n key; resolved with t() at render.
   h1: the header title is the page's heading only where the page has none of its own
   (wiki/admin render their own <h1>; a page that adds one passes renderNavBar({ h1: false })). */
const NAV_CONFIG = {
  dashboard: { title: 'X-MEN', subKey: 'header.dashSub', codes: 'XAVIER INSTITUTE', actions: ['newCharacter'], h1: true },
  ficha: { title: 'X-MEN', subKey: 'header.fichaSub', codes: 'AG—17.19349.583 · LS—16.23435.161 · XAVIER INSTITUTE', actions: ['fichexport', 'reset'], status: true, h1: true },
  admin: { title: 'X-MEN', subKey: 'header.adminSub', codes: '', actions: [] },
  cerebro: { title: 'CÉREBRO DATABASE', subKey: 'header.cerebroSub', codes: '', actions: ['newNpc', 'import', 'export', 'reload'], status: true, h1: true },
  combate: { titleKey: 'common.combat', subKey: 'header.combatSub', codes: 'MEGS v1.0', actions: [], h1: true },
  wiki: { title: 'X-MEN', subKey: 'header.wikiSub', codes: '', actions: [] }
};

const THEME_COLORS = [
  { key: 'yellow', color: '#FFD600', i18n: 'theme.yellow' },
  { key: 'red', color: '#E8001C', i18n: 'theme.red' },
  { key: 'green', color: '#00C853', i18n: 'theme.green' },
  { key: 'purple', color: '#b040ff', i18n: 'theme.purple' },
  { key: 'blue', color: '#3a8fc0', i18n: 'theme.blue' }
];

const NAV_ICONS = {
  'home': '<path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  'box': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
  'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  'download': '<polyline points="8 13 12 17 16 13"/><line x1="12" y1="17" x2="12" y2="3"/><line x1="4" y1="21" x2="20" y2="21"/>',
  'upload': '<polyline points="8 7 12 3 16 7"/><line x1="12" y1="3" x2="12" y2="17"/><line x1="4" y1="21" x2="20" y2="21"/>',
  'refresh': '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.36"/>',
  'trash': '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  'menu': '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  'x': '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>'
};

function navIcon(name) {
  return NAV_ICONS[name] ? '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + NAV_ICONS[name] + '</svg>' : '';
}
function navLabel(cls, key) {
  return '<span class="' + cls + '" data-i18n="' + key + '">' + t(key) + '</span>';
}
function currentTheme() {
  return typeof getCurrentTheme === 'function' ? getCurrentTheme() : 'yellow';
}

/* Site nav links. `variant` = 'bar' (desktop toolbar) | 'sheet' (mobile menu). */
function navLinksHTML(page, variant) {
  const here = page;
  const parent = NAV_PARENT[page];
  return NAV_PAGES.map(function(p) {
    const current = p.page === here ? ' aria-current="page"' : (p.page === parent ? ' aria-current="true"' : '');
    const gm = p.gmOnly ? ' data-gm hidden' : '';
    const tip = variant === 'bar' ? ' title="' + t(p.i18n) + '"' : '';
    return '<a class="nav-link nav-link--' + variant + '" href="' + p.href + '"' + current + gm + tip + '>' +
      navIcon(p.icon) + navLabel('nav-lbl', p.i18n) +
      (variant === 'sheet' && p.page === here ? '<span class="nav-here" data-i18n="nav.here">' + t('nav.here') + '</span>' : '') +
      '</a>';
  }).join('');
}

/* Theme / language / logout. Only the desktop instance carries ids (tests + page code use #lang-toggle-btn). */
function navToolsHTML(withIds) {
  const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'pt-BR';
  const next = lang === 'pt-BR' ? 'en' : 'pt-BR';
  const theme = currentTheme();
  let html = '<div class="theme-switcher" role="group" aria-label="' + t('theme.title') + '"' + (withIds ? ' id="theme-switcher"' : '') + '>';
  THEME_COLORS.forEach(function(th) {
    html += '<button type="button" class="theme-dot" data-theme="' + th.key + '" style="--dot:' + th.color + '" aria-pressed="' + (th.key === theme) + '"' +
      ' aria-label="' + t('theme.title') + ': ' + t(th.i18n) + '" title="' + t(th.i18n) + '" onclick="window.setTheme(\'' + th.key + '\')"></button>';
  });
  html += '</div>';
  html += '<button type="button" class="tbtn nav-tool nav-lang"' + (withIds ? ' id="lang-toggle-btn"' : '') +
    ' aria-label="' + t('lang.title') + ': ' + lang + ' → ' + next + '"' +
    ' onclick="window.setLanguage(\'' + next + '\')">' + lang + '</button>';
  html += '<button type="button" class="tbtn nav-tool nav-logout" onclick="logout()">' + navIcon('log-out') + navLabel('tbtn-lbl', 'common.logout') + '</button>';
  return html;
}

function renderHeader(page, cfg) {
  const el = document.getElementById('header-container');
  if (!el) return;
  el.innerHTML =
  '<header class="header">' +
    '<div class="header-logo">' +
      '<a href="dashboard.html" class="x-logo" aria-label="' + t('common.dashboard') + '" title="' + t('common.dashboard') + '">' +
        '<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
          '<rect x="2" y="2" width="60" height="60" rx="3" stroke="var(--accent)" stroke-width="3"/>' +
          '<rect x="8" y="8" width="48" height="48" rx="1" stroke="var(--accent)" stroke-width="1" opacity=".3"/>' +
          '<line x1="16" y1="16" x2="48" y2="48" stroke="var(--accent)" stroke-width="4.5" stroke-linecap="square"/>' +
          '<line x1="48" y1="16" x2="16" y2="48" stroke="var(--accent)" stroke-width="4.5" stroke-linecap="square"/>' +
          '<rect x="27" y="3" width="10" height="3.5" fill="var(--accent)" opacity=".6"/>' +
          '<rect x="27" y="57.5" width="10" height="3.5" fill="var(--accent)" opacity=".6"/>' +
          '<rect x="3" y="27" width="3.5" height="10" fill="var(--accent)" opacity=".6"/>' +
          '<rect x="57.5" y="27" width="3.5" height="10" fill="var(--accent)" opacity=".6"/>' +
        '</svg>' +
      '</a>' +
      '<div class="hdr-title">' +
        (cfg.h1 ? '<h1 class="hdr-name">' + cfg.title + '</h1>' : '<div class="hdr-name">' + cfg.title + '</div>') +
        (cfg.sub ? '<div class="hdr-sub">' + cfg.sub + '</div>' : '') +
      '</div>' +
    '</div>' +
    '<div class="hdr-spacer"></div>' +
    '<div class="hdr-tools">' + navToolsHTML(true) + '</div>' +
    '<button type="button" class="hdr-menu-btn" id="nav-menu-btn" aria-expanded="false" aria-controls="nav-sheet">' +
      navIcon('menu') + navLabel('hdr-menu-lbl', 'nav.menu') +
    '</button>' +
    '<div class="nav-scrim" id="nav-scrim" hidden></div>' +
    '<div class="nav-sheet" id="nav-sheet" role="dialog" aria-modal="true" aria-labelledby="nav-sheet-title" hidden>' +
      '<div class="nav-sheet-hd">' +
        '<span class="nav-sheet-title" id="nav-sheet-title" data-i18n="nav.menuTitle">' + t('nav.menuTitle') + '</span>' +
        '<button type="button" class="nav-sheet-close" id="nav-sheet-close" aria-label="' + t('common.close') + '">' + navIcon('x') + '</button>' +
      '</div>' +
      '<nav class="nav-sheet-links" aria-label="' + t('nav.siteNav') + '">' + navLinksHTML(page, 'sheet') + '</nav>' +
      '<div class="nav-sheet-tools">' + navToolsHTML(false) + '</div>' +
    '</div>' +
  '</header>';
  bindNavSheet(el);
}

function renderToolbar(page, cfg, actions, userCode) {
  const el = document.getElementById('toolbar-container');
  if (!el) return;
  let html = '<div class="toolbar' + (actions.length ? '' : ' toolbar--empty') + '">';
  html += '<nav class="tb-nav" aria-label="' + t('nav.siteNav') + '">' + navLinksHTML(page, 'bar') + '</nav>';
  if (actions.length) {
    html += '<div class="tb-actions" role="group" aria-label="' + t('nav.pageActions') + '">';
    actions.forEach(function(id) {
      const it = NAV_ACTIONS[id];
      const cls = 'tbtn' + (it.primary ? ' tbtn-acc' : '') + (it.danger ? ' tbtn-red' : '');
      const inner = navIcon(it.icon) + navLabel('tbtn-lbl', it.i18n);
      // aria-label keeps icon-only (mobile) buttons named; it is re-applied by applyTranslations too
      const name = ' aria-label="' + t(it.i18n) + '" data-i18n-aria-label="' + it.i18n + '"';
      html += it.href
        ? '<a class="' + cls + '" href="' + it.href + '"' + name + '>' + inner + '</a>'
        : '<button type="button" class="' + cls + '" onclick="' + it.action + '"' + name + '>' + inner + '</button>';
    });
    html += '</div>';
  }
  html += '<div class="tb-right">';
  if (cfg.codes) {
    html += '<div class="hdr-codes">' + (userCode ? '<span class="ac" id="hdr-user-code">' + userCode + '</span>' : '') + '<span>' + cfg.codes + '</span></div>';
  }
  // Only saving pages start as "loading"; the page owns the text afterwards (no data-i18n, so it is never clobbered).
  html += '<span class="save-ind" id="save-ind" role="status" aria-live="polite">' + (cfg.status ? t('common.loading') : '') + '</span>';
  html += '</div></div>';
  el.innerHTML = html;
}

/* ── mobile menu sheet ── */
function bindNavSheet(root) {
  const btn = root.querySelector('#nav-menu-btn');
  const sheet = root.querySelector('#nav-sheet');
  const scrim = root.querySelector('#nav-scrim');
  if (!btn || !sheet) return;
  function setOpen(open) {
    btn.setAttribute('aria-expanded', String(open));
    sheet.hidden = !open;
    scrim.hidden = !open;
    document.body.classList.toggle('nav-open', open);
    if (open) {
      const first = sheet.querySelector('.nav-link[aria-current="page"]') || sheet.querySelector('.nav-link:not([hidden])');
      if (first) first.focus();
    } else {
      btn.focus();
    }
  }
  btn.addEventListener('click', function() { setOpen(sheet.hidden); });
  scrim.addEventListener('click', function() { setOpen(false); });
  root.querySelector('#nav-sheet-close').addEventListener('click', function() { setOpen(false); });
  sheet.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); return; }
    if (e.key !== 'Tab') return;
    // keep focus inside the open sheet
    const f = Array.prototype.filter.call(sheet.querySelectorAll('a[href],button'), function(x) { return !x.hidden && x.offsetParent !== null; });
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
}

/* keep theme buttons in sync with the active theme (setTheme dispatches this) */
document.addEventListener('themechange', function(e) {
  const key = e.detail && e.detail.theme;
  document.querySelectorAll('#header-container .theme-dot').forEach(function(d) {
    d.setAttribute('aria-pressed', String(d.dataset.theme === key));
  });
});

/* GM-only nav entries: shown as soon as the role is known (page code or session metadata). */
function setGMFlag(isGM) {
  window._isGM = isGM;
  document.querySelectorAll('#header-container [data-gm], #toolbar-container [data-gm]').forEach(function(a) {
    a.hidden = !isGM;
  });
}

function resolveGMFromSession() {
  if (window._isGM === true || typeof window.getCurrentUser !== 'function') return;
  // same rule as requireAuth() in api.js; local session read, no redirect
  window.getCurrentUser().then(function(user) {
    if (!user) return;
    const wl = window.GM_WHITELIST || [];
    const isGM = (user.user_metadata && user.user_metadata.role === 'gm') || (user.email && wl.indexOf(user.email.toLowerCase()) !== -1);
    if (isGM) setGMFlag(true);
  }).catch(function() {});
}

window.renderNavBar = function(opts) {
  const page = NAV_CONFIG[opts.page] ? opts.page : 'dashboard';
  const base = NAV_CONFIG[page];
  const cfg = {
    title: opts.title || (base.titleKey ? t(base.titleKey) : base.title),
    sub: opts.sub || t(base.subKey),
    codes: opts.codes !== undefined ? opts.codes : base.codes,
    status: base.status,
    h1: opts.h1 !== undefined ? opts.h1 : !!base.h1
  };
  // opts.toolbar (legacy) may still list nav/utility ids: only real page actions are kept,
  // the site nav, theme, language and logout are always rendered by the shell.
  const actions = (opts.toolbar || base.actions).filter(function(id) { return NAV_ACTIONS[id]; });

  renderHeader(page, cfg);
  renderToolbar(page, cfg, actions, opts.userCode || '');
  setGMFlag(window._isGM === true);
  resolveGMFromSession();
};

window.setGMFlag = setGMFlag;
