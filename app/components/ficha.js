/**
 * X-MEN TTRPG - Ficha Component
 */

export const FichaComponent = {
  _container: null,
  _charId: null,
  _character: null,
  _saveTimer: null,
  
  async mount(container, params) {
    this._container = container;
    this._charId = params.id || null;

    if (!AuthService.isLoggedIn()) {
      Router.navigate('/login');
      return;
    }
    
    // Check if creating new character
    if (params.new && !this._charId) {
      await this._createCharacter();
      return;
    }
    
    // No character ID, redirect to dashboard
    if (!this._charId) {
      Router.navigate('/dashboard');
      return;
    }
    
    // Load character
    await this._loadCharacter();
  },
  
  async _createCharacter() {
    try {
      const user = AuthService.getUser();
      const party = await ApiService.getPlayerParty(user.id);
      
      this._character = await ApiService.createCharacter(user.id, party?.id || null);
      Router.navigate('/ficha/' + this._character.id, true);
    } catch (e) {
      console.error('[Ficha] Error creating character:', e);
      this._container.innerHTML = `
        <div class="error-container">
          <h1>Erro ao criar personagem</h1>
          <p>${e.message}</p>
          <a href="/dashboard" class="btn" data-link>Voltar</a>
        </div>
      `;
    }
  },
  
  async _loadCharacter() {
    this._render();
    
    try {
      this._character = await ApiService.loadCharacter(this._charId);
      if (this._character) {
        this._renderForm();
      }
    } catch (e) {
      console.error('[Ficha] Error loading character:', e);
    }
  },
  
  _render() {
    this._container.innerHTML = `
      <div class="toolbar">
        <div class="toolbar-brand">
          <a href="/dashboard" class="x-logo" data-link>
            <svg viewBox="0 0 64 64" fill="none">
              <rect x="2" y="2" width="60" height="60" rx="3" stroke="var(--accent)" stroke-width="3"/>
              <rect x="8" y="8" width="48" height="48" rx="1" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>
              <line x1="16" y1="16" x2="48" y2="48" stroke="var(--accent)" stroke-width="4.5"/>
              <line x1="48" y1="16" x2="16" y2="48" stroke="var(--accent)" stroke-width="4.5"/>
            </svg>
          </a>
          <span class="toolbar-title">FICHA</span>
        </div>
        <div class="toolbar-spacer"></div>
        <div class="save-indicator" id="save-indicator">SALVO</div>
        <div class="theme-dots-row" id="theme-dots-row"></div>
      </div>
      
      <div class="ficha-content">
        <div class="ficha-header">
          <div class="ficha-name-section">
            <label>NOME</label>
            <input type="text" id="char-name" class="ficha-input" placeholder="Nome do Personagem">
          </div>
          <div class="ficha-name-section">
            <label>CODINOME</label>
            <input type="text" id="char-codinome" class="ficha-input" placeholder="Codinome">
          </div>
        </div>
        
        <div class="ficha-stats">
          <div class="stat-group">
            <label>FÍSICO</label>
            <div class="stat-row">
              <div class="stat"><span>DES</span><input type="text" id="stat-destreza" placeholder="0"></div>
              <div class="stat"><span>FOR</span><input type="text" id="stat-forca" placeholder="0"></div>
              <div class="stat"><span>COR</span><input type="text" id="stat-corpo" placeholder="0"></div>
            </div>
          </div>
          <div class="stat-group">
            <label>MENTAL</label>
            <div class="stat-row">
              <div class="stat"><span>INT</span><input type="text" id="stat-inteligencia" placeholder="0"></div>
              <div class="stat"><span>VON</span><input type="text" id="stat-vontade" placeholder="0"></div>
              <div class="stat"><span>MEN</span><input type="text" id="stat-mente" placeholder="0"></div>
            </div>
          </div>
          <div class="stat-group">
            <label>SOCIAL</label>
            <div class="stat-row">
              <div class="stat"><span>INF</span><input type="text" id="stat-influencia" placeholder="0"></div>
              <div class="stat"><span>AUR</span><input type="text" id="stat-aura" placeholder="0"></div>
              <div class="stat"><span>ESP</span><input type="text" id="stat-espirito" placeholder="0"></div>
            </div>
          </div>
        </div>
        
        <div class="ficha-section">
          <div class="sec-bar"></div>
          <span class="sec-label">STATUS</span>
          <div class="sec-line"></div>
        </div>
        <textarea id="char-status" class="ficha-textarea" placeholder="Condições, efeitos, munição, etc."></textarea>
        
        <div class="ficha-section">
          <div class="sec-bar"></div>
          <span class="sec-label">MUTAÇÃO</span>
          <div class="sec-line"></div>
        </div>
        <textarea id="char-mutacao" class="ficha-textarea" placeholder="Descreva a mutação do personagem..."></textarea>
      </div>
    `;
    
    // Render theme dots
    this._renderThemeDots();
    
    // Attach event listeners
    this._attachEvents();
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
  
  _attachEvents() {
    const inputs = this._container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._scheduleSave();
      });
    });
  },
  
  _scheduleSave() {
    clearTimeout(this._saveTimer);
    this._setIndicator('salvando', 'SALVANDO...');
    
    this._saveTimer = setTimeout(() => {
      this._save();
    }, 1500);
  },
  
  _setIndicator(state, text) {
    const indicator = document.getElementById('save-indicator');
    if (!indicator) return;
    
    indicator.textContent = text;
    indicator.className = 'save-indicator ' + state;
  },
  
  async _save() {
    if (!this._character) return;
    
    try {
      const updates = {
        name: document.getElementById('char-name')?.value || '',
        codinome: document.getElementById('char-codinome')?.value || '',
        status: document.getElementById('char-status')?.value || '',
        mutacao_temas: document.getElementById('char-mutacao')?.value || '',
        data: {
          stats: {
            destreza: document.getElementById('stat-destreza')?.value || '',
            forca: document.getElementById('stat-forca')?.value || '',
            corpo: document.getElementById('stat-corpo')?.value || '',
            inteligencia: document.getElementById('stat-inteligencia')?.value || '',
            vontade: document.getElementById('stat-vontade')?.value || '',
            mente: document.getElementById('stat-mente')?.value || '',
            influencia: document.getElementById('stat-influencia')?.value || '',
            aura: document.getElementById('stat-aura')?.value || '',
            espirito: document.getElementById('stat-espirito')?.value || ''
          }
        }
      };
      
      await ApiService.saveCharacter(this._character.id, updates);
      this._setIndicator('salvo', 'SALVO ✓');
    } catch (e) {
      console.error('[Ficha] Error saving:', e);
      this._setIndicator('erro', 'ERRO');
    }
  },
  
  _renderForm() {
    if (!this._character) return;
    
    const nameEl = document.getElementById('char-name');
    const codinomeEl = document.getElementById('char-codinome');
    const statusEl = document.getElementById('char-status');
    const mutacaoEl = document.getElementById('char-mutacao');
    
    if (nameEl) nameEl.value = this._character.name || '';
    if (codinomeEl) codinomeEl.value = this._character.codename || '';
    if (statusEl) statusEl.value = this._character.data?.status || '';
    if (mutacaoEl) mutacaoEl.value = this._character.data?.mutacao_temas || '';
    
    // Stats
    const stats = this._character.data?.stats || {};
    ['destreza', 'forca', 'corpo', 'inteligencia', 'vontade', 'mente', 'influencia', 'aura', 'espirito'].forEach(stat => {
      const el = document.getElementById('stat-' + stat);
      if (el && stats[stat]) el.value = stats[stat];
    });
  },
  
  unmount() {
    clearTimeout(this._saveTimer);
    this._save();
    this._container = null;
    this._character = null;
  }
};

window.FichaComponent = FichaComponent;