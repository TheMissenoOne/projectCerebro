/**
 * X-MEN TTRPG - Dashboard Component
 */

const DashboardComponent = {
  _container: null,
  _party: null,
  _characters: [],
  _members: [],
  
  async mount(container, params) {
    this._container = container;
    
    if (!AuthService.isLoggedIn()) {
      Router.navigate('/login');
      return;
    }
    
    const user = AuthService.getUser();
    const profile = AuthService.getProfile();
    
    container.innerHTML = `
      <div class="toolbar">
        <div class="toolbar-brand">
          <a href="/" class="x-logo" data-link>X-MEN</a>
          <span class="toolbar-divider">//</span>
          <span class="toolbar-current">DASHBOARD</span>
        </div>
        <div class="toolbar-user">
          <span class="user-code">${(profile?.username || user?.email)?.toUpperCase()}</span>
        </div>
      </div>
      
      <div class="content dash-body">
        <div class="dash-identity">
          <div class="dash-welcome">Bem-vindo, <span class="user-name">${profile?.display_name || profile?.username || 'Player'}</span></div>
          <div class="user-role">${profile?.role === 'gm' ? 'MESTRE' : 'JOGADOR'}</div>
        </div>
        
        <div class="dash-section" id="characters-section">
          <h3 class="dash-section-title">PERSONAGENS</h3>
          <button class="btn btn-primary btn-new" onclick="Router.navigate('/ficha?new=true')">NOVA FICHA</button>
          <div class="chars-list" id="chars-list">
            <div class="char-empty">—</div>
          </div>
        </div>
        
        <div class="dash-section" id="party-section">
          <h3 class="dash-section-title">PARTY</h3>
          <div id="party-empty" class="party-empty">
            <p>Você ainda não faz parte de uma party.</p>
            <button class="btn btn-primary" onclick="showCreateParty()">CRIAR PARTY</button>
            <button class="btn" onclick="showJoinParty()">ENTRAR COM CÓDIGO</button>
          </div>
          <div id="party-info" class="party-info" style="display:none;">
            <div class="party-name" id="party-name">—</div>
            <div class="party-code">Código: <span id="party-code">—</span></div>
            <div class="party-members" id="party-members"></div>
          </div>
        </div>
        
<div class="dash-nav">
          <a href="/wiki" class="tbtn" data-link>WIKI</a>
          <a href="/combate" class="tbtn" data-link>COMBATE</a>
          ${profile?.role === 'gm' ? '<a href="/admin" class="tbtn" data-link>ADMIN GM</a>' : ''}
          <a href="/cerebro" class="tbtn" data-link>CÉREBRO</a>
          <div class="toolbar-spacer"></div>
          <div class="theme-switcher">
            <div class="theme-dots-row" id="theme-dots-row"></div>
          </div>
          <button class="tbtn" onclick="AuthService.logout();Router.navigate('/login')">SAIR</button>
        </div>
      </div>
    `;
    
    // Render theme dots
    this._renderThemeDots();
    await this._loadData();
  },
  
  _renderThemeDots() {
    const container = document.getElementById('theme-dots-row');
    if (!container) return;
    
    const current = AppState.get('theme') || 'yellow';
    container.innerHTML = Object.entries(THEMES).map(([key, val]) => `
      <div class="theme-dot-sm ${key === current ? 'active' : ''}" 
           style="background:${val.color}"
           onclick="AppState.setTheme('${key}')" 
           title="${val.name}"></div>
    `).join('');
  },
  
  async _loadData() {
    const user = AuthService.getUser();
    const profile = AuthService.getProfile();
    
    // Load characters
    try {
      this._characters = await ApiService.listCharacters(user.id);
    } catch (e) {
      console.error('[Dashboard] Error loading characters:', e);
    }
    
    // Load party
    try {
      if (profile?.role === 'gm') {
        this._party = await ApiService.getGMParty(user.id);
      } else {
        this._party = await ApiService.getPlayerParty(user.id);
      }
    } catch (e) {
      console.error('[Dashboard] Error loading party:', e);
    }
    
    this._render();
  },
  
  _render() {
    // Render characters
    const charsList = document.getElementById('chars-list');
    if (charsList) {
      if (this._characters.length > 0) {
        charsList.innerHTML = this._characters.map(c => `
          <a href="/ficha?id=${c.id}" class="char-link" data-link>${c.name || 'Sem Nome'}</a>
        `).join('');
      } else {
        charsList.innerHTML = '<div class="char-empty">—</div>';
      }
    }
    
    // Render party
    const partyEmpty = document.getElementById('party-empty');
    const partyInfo = document.getElementById('party-info');
    
    if (this._party) {
      partyEmpty.style.display = 'none';
      partyInfo.style.display = 'block';
      
      const partyName = document.getElementById('party-name');
      const partyCode = document.getElementById('party-code');
      
      if (partyName) partyName.textContent = this._party.name;
      if (partyCode) partyCode.textContent = this._party.code;
    } else {
      partyEmpty.style.display = 'block';
      partyInfo.style.display = 'none';
    }
  },
  
  unmount() {
    this._container = null;
    this._party = null;
    this._characters = [];
  }
};

window.DashboardComponent = DashboardComponent;