/**
 * X-MEN TTRPG - Unified Navigation Module
 * Renders header + toolbar consistently across all pages.
 * Call renderNavBar({ page: 'dashboard' }) after DOM ready.
 */

const NAV_CONFIG = {
  dashboard: {
    title: 'X-MEN',
    sub: 'TTRPG // DASHBOARD',
    codes: 'XAVIER INSTITUTE',
    toolbar: ['newCharacter', 'cerebro', 'wiki', 'combate', 'admin', 'theme', 'logout']
  },
  ficha: {
    title: 'X-MEN',
    sub: 'FICHA DE PERSONAGEM',
    codes: 'AG\u201417.19349.583 \u00B7 LS\u201416.23435.161 \u00B7 XAVIER INSTITUTE',
    toolbar: ['back', 'cerebro', 'wiki', 'import', 'export', 'reset', 'theme', 'logout']
  },
  admin: {
    title: 'X-MEN',
    sub: 'PAINEL DO GM',
    codes: '',
    toolbar: ['dashboard', 'ficha', 'wiki', 'theme']
  },
  cerebro: {
    title: 'C\u00c9REBRO DATABASE',
    sub: 'NPCs // XAVIER INSTITUTE // X-MEN TTRPG',
    codes: '',
    toolbar: ['back', 'newNpc', 'import', 'export', 'reload', 'theme', 'config', 'logout'],
    hamburger: true
  },
  ficha: {
    title: 'X-MEN',
    sub: 'FICHA DE PERSONAGEM',
    codes: 'AG\u201417.19349.583 \u00B7 LS\u201416.23435.161 \u00B7 XAVIER INSTITUTE',
    toolbar: ['back', 'cerebro', 'wiki', 'fichimport', 'fichexport', 'reset', 'theme']
  },
  combate: {
    title: 'COMBATE',
    sub: 'CALCULADORA // MEGS SYSTEM',
    codes: 'MEGS v1.0',
    toolbar: ['dashboard', 'wiki', 'cerebro', 'theme']
  },
  wiki: {
    title: 'X-MEN',
    sub: 'TTRPG // WIKI',
    codes: '',
    toolbar: ['dashboard', 'ficha', 'cerebro', 'theme']
  }
};

const NAV_ITEMS = {
  dashboard: { href: 'dashboard.html', icon: 'polyline', i18n: 'common.dashboard', label: 'DASHBOARD' },
  ficha: { href: 'ficha.html?new=true', icon: 'plus', i18n: 'common.ficha', label: 'Ficha' },
  cerebro: { href: 'cerebro.html', icon: 'box', i18n: 'common.cerebro', label: 'C\u00c9rebro' },
  wiki: { href: 'wiki.html', icon: 'book', i18n: 'common.wiki', label: 'Wiki' },
  combate: { href: 'combate.html', icon: 'zap', i18n: 'common.combat', label: 'Combate', gmOnly: true },
  admin: { href: 'admin.html', icon: 'settings', i18n: 'common.admin', label: 'Admin', gmOnly: true },
  newCharacter: { href: 'ficha.html?new=true', icon: 'plus', i18n: 'nav.newCharacter', label: 'Nova Ficha' },
  back: { href: 'dashboard.html', icon: 'chevron-left', i18n: 'common.dashboard', label: 'DASHBOARD' },
  newNpc: { action: 'abrirAddModal()', icon: 'plus', i18n: 'cerebro.newNpc', label: 'NOVO NPC', accented: true },
  import: { action: 'abrirImportModal()', icon: 'download', i18n: 'common.import', label: 'IMPORTAR' },
  export: { action: 'exportarTodos()', icon: 'upload', i18n: 'common.export', label: 'EXPORTAR' },
  fichimport: { action: 'abrirImport()', icon: 'download', i18n: 'common.import', label: 'IMPORTAR .MD' },
  fichexport: { action: 'exportarMD()', icon: 'upload', i18n: 'common.export', label: 'EXPORTAR .MD' },
  reload: { action: 'recarregarDB()', icon: 'refresh', i18n: 'common.reload', label: 'RECARREGAR' },
  config: { action: "window.open('dashboard.html','_self')", icon: 'settings', i18n: 'common.config', label: 'CONFIG' },
  reset: { action: 'resetarFicha()', icon: 'trash', i18n: 'nav.reset', label: 'RESETAR', red: true },
  logout: { action: 'logout()', icon: 'log-out', i18n: 'common.logout', label: 'SAIR' }
};

const NAV_ICONS = {
  'polyline': '<polyline points="15 18 9 12 15 6"/>',
  'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
  'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  'box': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
  'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
  'download': '<polyline points="8 17 12 21 16 17"/><line x1="12" y1="21" x2="12" y2="3"/>',
  'upload': '<polyline points="8 7 12 3 16 7"/><line x1="12" y1="3" x2="12" y2="21"/>',
  'refresh': '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.36"/>',
  'trash': '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'
};

function renderNavBar(opts) {
  const cfg = NAV_CONFIG[opts.page] || NAV_CONFIG.dashboard;
  const title = opts.title || cfg.title;
  const sub = opts.sub || cfg.sub;
  const codes = opts.codes !== undefined ? opts.codes : cfg.codes;
  const hamburger = opts.hamburger !== undefined ? opts.hamburger : cfg.hamburger;
  const items = opts.toolbar || cfg.toolbar;
  const gmRole = window._isGM === true;
  const userCode = opts.userCode || '';

  renderHeader(title, sub, codes, hamburger, userCode);
  renderToolbar(items, gmRole);
}

function renderHeader(title, sub, codes, hamburger, userCode) {
  const el = document.getElementById('header-container');
  if (!el) return;
  el.innerHTML = `
  <header class="header">
    <div class="header-logo">
      <a href="dashboard.html" class="x-logo" title="${t('nav.dashboard')}">
        <svg viewBox="0 0 64 64" fill="none">
          <rect x="2" y="2" width="60" height="60" rx="3" stroke="var(--accent)" stroke-width="3"/>
          <rect x="8" y="8" width="48" height="48" rx="1" stroke="var(--accent)" stroke-width="1" opacity=".3"/>
          <line x1="16" y1="16" x2="48" y2="48" stroke="var(--accent)" stroke-width="4.5" stroke-linecap="square"/>
          <line x1="48" y1="16" x2="16" y2="48" stroke="var(--accent)" stroke-width="4.5" stroke-linecap="square"/>
          <rect x="27" y="3" width="10" height="3.5" fill="var(--accent)" opacity=".6"/>
          <rect x="27" y="57.5" width="10" height="3.5" fill="var(--accent)" opacity=".6"/>
          <rect x="3" y="27" width="3.5" height="10" fill="var(--accent)" opacity=".6"/>
          <rect x="57.5" y="27" width="3.5" height="10" fill="var(--accent)" opacity=".6"/>
        </svg>
      </a>
      <div class="hdr-title">
        <h1>${title}</h1>
        ${sub ? '<div class="hdr-sub">' + sub + '</div>' : ''}
      </div>
    </div>
    <div class="hdr-spacer"></div>
    ${codes ? '<div class="hdr-codes">' + (userCode ? '<span class="ac" id="hdr-user-code">' + userCode + '</span>' : '') + '<span>' + codes + '</span></div>' : ''}
    ${hamburger ? '<button class="hdr-ham" onclick="window.toggleMobileMenu ? window.toggleMobileMenu() : abrirPainel()"><svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>' : ''}
  </header>`;
}

function renderToolbar(items, gmRole) {
  const el = document.getElementById('toolbar-container');
  if (!el) return;

  const THEME_COLORS = [
    { key: 'yellow', color: '#FFD600', i18n: 'theme.yellow' },
    { key: 'red', color: '#E8001C', i18n: 'theme.red' },
    { key: 'green', color: '#00C853', i18n: 'theme.green' },
    { key: 'purple', color: '#b040ff', i18n: 'theme.purple' },
    { key: 'blue', color: '#3a8fc0', i18n: 'theme.blue' }
  ];

  var lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'pt-BR';
  let html = '<div class="toolbar">';
  html += '<span class="save-ind" id="save-ind" data-i18n="common.loading">' + t('common.loading') + '</span>';
  html += '<div class="toolbar-divider"></div>';

  items.forEach(function(id) {
    if (id === 'theme') return;
    if (id === 'logout') return;
    const it = NAV_ITEMS[id];
    if (!it) return;
    if (it.gmOnly && !gmRole) return;
    const icon = NAV_ICONS[it.icon] ? '<svg viewBox="0 0 24 24" width="10" height="10" style="stroke:currentColor;fill:none;stroke-width:2">' + NAV_ICONS[it.icon] + '</svg>' : '';
    const cls = 'tbtn' + (it.accented ? ' tbtn-acc' : '') + (it.red ? ' tbtn-red' : '');
    const click = it.action ? ' onclick="' + it.action + '"' : '';
    const href = it.href ? ' href="' + it.href + '"' : '';
    const tag = it.href ? 'a' : 'button';
    html += '<' + tag + ' class="' + cls + '"' + click + href + ' data-i18n="' + it.i18n + '">' + icon + (icon ? ' ' : '') + t(it.i18n) + '</' + tag + '>';
    html += '<div class="toolbar-divider"></div>';
  });

  // Theme switcher
  html += '<div class="theme-switcher" id="theme-switcher">';
  html += '<div class="theme-dots-row">';
  THEME_COLORS.forEach(function(th) {
    html += '<div class="theme-dot" style="background:' + th.color + '" title="' + t(th.i18n) + '" onclick="window.setTheme(\'' + th.key + '\')"></div>';
  });
  html += '</div></div>';
  html += '<div class="toolbar-divider"></div>';

  // Language toggle
  html += '<button class="tbtn" id="lang-toggle-btn" onclick="var l=window.getCurrentLanguage();window.setLanguage(l===\'pt-BR\'?\'en\':\'pt-BR\')" style="min-width:32px;font-size:.5rem;letter-spacing:.06em">' + lang + '</button>';
  html += '<div class="toolbar-divider"></div>';

  // Config + logout always at end when requested
  if (items.indexOf('config') !== -1) {
    const it = NAV_ITEMS.config;
    html += '<button class="tbtn" data-i18n="' + it.i18n + '" onclick="' + it.action + '">' + (NAV_ICONS[it.icon] ? '<svg viewBox="0 0 24 24" width="10" height="10" style="stroke:currentColor;fill:none;stroke-width:2">' + NAV_ICONS[it.icon] + '</svg> ' : '') + t(it.i18n) + '</button>';
    html += '<div class="toolbar-divider"></div>';
  }
  if (items.indexOf('logout') !== -1) {
    const it = NAV_ITEMS.logout;
    html += '<button class="tbtn" data-i18n="' + it.i18n + '" onclick="' + it.action + '">' + (NAV_ICONS[it.icon] ? '<svg viewBox="0 0 24 24" width="10" height="10" style="stroke:currentColor;fill:none;stroke-width:2">' + NAV_ICONS[it.icon] + '</svg> ' : '') + t(it.i18n) + '</button>';
  }

  html += '</div>';
  el.innerHTML = html;
}

function setGMFlag(isGM) {
  window._isGM = isGM;
}



window.renderNavBar = renderNavBar;
window.setGMFlag = setGMFlag;
window.NAV_ITEMS = NAV_ITEMS;
