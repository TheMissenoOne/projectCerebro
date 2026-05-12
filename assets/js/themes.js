/**
 * X-MEN TTRPG - Global Theme System
 * Tom Muller / House of X aesthetic
 */

if (typeof THEME_KEY === 'undefined') {
  var THEME_KEY = 'cerebro_tema';
}

const THEMES = {
  yellow: { name: 'AMARELO', color: '#FFD600' },
  red: { name: 'VERMELHO', color: '#E8001C' },
  green: { name: 'VERDE', color: '#00C853' },
  purple: { name: 'ROXO', color: '#b040ff' },
  blue: { name: 'AZUL', color: '#3a8fc0' }
};

function getCurrentTheme() {
  return localStorage.getItem(THEME_KEY) || 'yellow';
}

function setTheme(theme, skipStorage) {
  if (!THEMES[theme]) return;
  
  // Remove all theme classes
  document.body.classList.remove('theme-yellow', 'theme-red', 'theme-green', 'theme-purple', 'theme-blue');
  
  // Add new theme class (except default yellow)
  if (theme !== 'yellow') {
    document.body.classList.add('theme-' + theme);
  }
  
  if (!skipStorage) {
    localStorage.setItem(THEME_KEY, theme);
  }
  
  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

function initTheme() {
  const savedTheme = getCurrentTheme();
  setTheme(savedTheme, true);
  return savedTheme;
}

function getThemeSwitcherHTML() {
  const current = getCurrentTheme();
  return `
    <div class="theme-switcher">
      ${Object.entries(THEMES).map(([key, val]) => `
        <div class="theme-dot ${key === current ? 'active' : ''}" 
             data-theme="${key}" 
             style="background:${val.color}"
             title="${val.name}"
             onclick="window.setTheme('${key}')"></div>
      `).join('')}
    </div>
  `;
}

function getXLogoSVG() {
  return `
    <svg class="x-logo-svg" viewBox="0 0 64 64" fill="none">
      <rect x="2" y="2" width="60" height="60" rx="3"/>
      <rect x="8" y="8" width="48" height="48" rx="1"/>
      <line x1="16" y1="16" x2="48" y2="48"/>
      <line x1="48" y1="16" x2="16" y2="48"/>
      <rect class="logo-ext" x="27" y="3" width="10" height="3.5"/>
      <rect class="logo-ext" x="27" y="57.5" width="10" height="3.5"/>
      <rect class="logo-ext" x="3" y="27" width="3.5" height="10"/>
      <rect class="logo-ext" x="57.5" y="27" width="3.5" height="10"/>
    </svg>
  `;
}

function getPanelSettingsHTML() {
  const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'pt-BR';
  const L = window.LANGUAGES || { 'pt-BR': { name: 'PT-BR', icon: '' }, 'en': { name: 'EN', icon: '' } };
  return `
    <div class="panel-footer">
      <button class="pf-toggle" onclick="window.togglePanelSettings()">
        // ${window.t ? t('common.config') : 'CONFIGURAÇÕES'}
        <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
      <div class="pf-settings" id="pf-settings">
        <div class="pf-inner">
          <div style="font-family:var(--mono);font-size:.42rem;color:var(--muted2);letter-spacing:.1em">${window.t ? t('theme.title') : 'TEMA DE COR'}</div>
          <div class="theme-btns">
            ${Object.entries(THEMES).map(([key, val]) => `
              <button class="th-btn" onclick="window.setTheme('${key}')">
                <div class="th-dot" style="background:${val.color}"></div>${window.t ? t('theme.' + key) : val.name}
              </button>
            `).join('')}
          </div>
          <div style="font-family:var(--mono);font-size:.42rem;color:var(--muted2);letter-spacing:.1em;margin-top:8px">${window.t ? t('lang.title') : 'IDIOMA'}</div>
          <div class="theme-btns">
            ${Object.entries(L).map(([key, val]) => `
              <button class="th-btn${key === lang ? ' active' : ''}" onclick="window.setLanguage('${key}')">${val.icon} ${val.name}</button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

window.THEMES = THEMES;
window.getCurrentTheme = getCurrentTheme;
window.setTheme = setTheme;
window.setTema = setTheme;
window.initTheme = initTheme;
window.getThemeSwitcherHTML = getThemeSwitcherHTML;
window.getXLogoSVG = getXLogoSVG;
window.getPanelSettingsHTML = getPanelSettingsHTML;

window.togglePanelSettings = function() {
  const toggle = document.querySelector('.pf-toggle');
  const settings = document.getElementById('pf-settings');
  if (toggle) toggle.classList.toggle('open');
  if (settings) settings.classList.toggle('open');
};

document.addEventListener('DOMContentLoaded', initTheme);
