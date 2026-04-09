/**
 * X-MEN TTRPG - Header Module
 * Standardized header with settings dropdown and theme switcher
 */

function getHeaderHTML(opts) {
  const page = opts.page || 'dashboard';
  const title = opts.title || 'X-MEN TTRPG';
  const sub = opts.sub || 'SESSION ACTIVE';
  const codes = opts.codes || '';
  const showCerebro = opts.showCerebro !== false;
  const showAdmin = opts.showAdmin || false;
  const showCombate = false;
  
  return `
  <header class="header">
    <div class="header-logo">
      <a href="dashboard.html" class="x-logo" title="Dashboard">
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
        <div class="hdr-sub">${sub}</div>
      </div>
    </div>
    <div class="hdr-spacer"></div>
    <div class="hdr-codes">${codes ? `<span>${codes}</span>` : '<span>SESSION ACTIVE</span>'}</div>
    <div class="hdr-settings">
      <button class="hdr-settings-btn" onclick="window.toggleSettings()" title="Configuracoes">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>
      <div class="settings-dropdown" id="settings-dropdown">
        <div class="settings-label">TEMA</div>
        <div class="theme-dots-row" id="theme-dots-row"></div>
        <div class="settings-dropdown-divider"></div>
        <div class="settings-dropdown-item" onclick="window.logout()">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          SAIR
        </div>
      </div>
    </div>
  </header>`;
}

function getToolbarHTML(opts) {
  const showCerebro = opts.showCerebro !== false;
  const showAdmin = opts.showAdmin || false;
  const showCombate = false;
  const showNew = opts.showNew !== false;
  
  let links = '';
  if (showNew) {
    links += `<a href="ficha.html?new=true" class="tbtn"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Nova Ficha</a>`;
    links += '<div class="toolbar-divider"></div>';
  }
  if (showCerebro) links += '<a href="cerebro.html" class="tbtn">Cérebro</a>';
  if (showCerebro) links += '<div class="toolbar-divider"></div>';
  links += '<a href="wiki.html" class="tbtn">Wiki</a>';
  if (showCombate) {
    links += '<div class="toolbar-divider"></div>';
    links += '<a href="combate.html" class="tbtn" id="combate-link" style="display:none;">Combate</a>';
  }
  if (showAdmin) {
    links += '<div class="toolbar-divider"></div>';
    links += '<a href="admin.html" class="tbtn" id="admin-link" style="display:none;">Admin</a>';
  }
  
  const themes = [
    { key: 'yellow', color: '#FFD600', title: 'Amarelo' },
    { key: 'red', color: '#E8001C', title: 'Vermelho' },
    { key: 'green', color: '#00C853', title: 'Verde' },
    { key: 'purple', color: '#b040ff', title: 'Roxo' },
    { key: 'blue', color: '#3a8fc0', title: 'Azul' }
  ];
  
  const themeBtns = themes.map(t => 
    `<button class="tbtn th-btn" onclick="window.setTheme('${t.key}')" title="${t.title}" style="padding:4px 6px;min-width:24px;"><span style="width:8px;height:8px;border-radius:50%;background:${t.color};display:block;"></span></button>`
  ).join('');
  
  return `
  <div class="toolbar">
    <span class="save-ind salvo">●</span>
    <div class="toolbar-divider"></div>
    ${links}
    <div class="toolbar-spacer"></div>
    <div class="theme-switcher">${themeBtns}</div>
    <div class="toolbar-divider"></div>
    <button class="tbtn" onclick="window.logout()">
      <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Sair
    </button>
  </div>`;
}

function requireGM() {
  return window.requireAuth().then(function(auth) {
    if (!auth) return null;
    if (auth.profile.role !== 'gm') {
      window.location.href = 'dashboard.html';
      return null;
    }
    return auth;
  });
}

window.getHeaderHTML = getHeaderHTML;
window.getToolbarHTML = getToolbarHTML;
window.requireGM = requireGM;