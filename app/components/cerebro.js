/**
 * X-MEN TTRPG - Cerebro Component
 * NPC Database and search
 */

export const CerebroComponent = {
  _container: null,
  _npcs: [],
  _selectedNpc: null,
  _filter: 'all',
  _search: '',

  async mount(container, params) {
    this._container = container;
    this._filter = params.category || 'all';
    this._search = params.search || '';

    await this._loadNpcs();
    this._render();
  },

  async _loadNpcs() {
    try {
      this._npcs = await ApiService.listNPCs();
    } catch (e) {
      console.error('[Cerebro] Error loading NPCs:', e);
      this._npcs = [];
    }
  },

  _render() {
    const filtered = this._npcs.filter(npc => {
      if (this._filter !== 'all' && npc.category !== this._filter) return false;
      if (this._search && !npc.name.toLowerCase().includes(this._search.toLowerCase())) return false;
      return true;
    });

    this._container.innerHTML = `
      <div class="cerebro-layout">
        <div class="cerebro-sidebar">
          <div class="cerebro-search">
            <input type="text" id="cerebro-search" class="form-input" placeholder="Buscar NPC..." value="${this._search}">
          </div>
          <div class="cerebro-cats">
            <a href="/cerebro?category=all" class="cat-pill ${this._filter === 'all' ? 'active' : ''}" data-link>Todos</a>
            <a href="/cerebro?category=xmen" class="cat-pill ${this._filter === 'xmen' ? 'active' : ''}" data-link>X-Men</a>
            <a href="/cerebro?category=villain" class="cat-pill ${this._filter === 'villain' ? 'active' : ''}" data-link>Vilões</a>
            <a href="/cerebro?category=ally" class="cat-pill ${this._filter === 'ally' ? 'active' : ''}" data-link>Aliados</a>
          </div>
          <div class="npc-list-wrap">
            ${filtered.length === 0 ? '<div class="npc-empty">Nenhum NPC encontrado</div>' : ''}
            ${filtered.map(npc => this._renderNpcItem(npc)).join('')}
          </div>
        </div>
        <div class="cerebro-content">
          ${this._selectedNpc ? this._renderNpcDetail() : '<div class="npc-empty">Selecione um NPC</div>'}
        </div>
      </div>
    `;

    this._attachEvents();
  },

  _renderNpcItem(npc) {
    const prColor = this._getPRColor(npc.power_rank);
    return `
      <div class="npc-item" onclick="CerebroComponent._selectNpc('${npc.id}')">
        <div class="npc-item-dot" style="background:${prColor}"></div>
        <div class="npc-item-info">
          <div class="npc-item-name">${npc.name}</div>
          <div class="npc-item-sub">${npc.codename || ''}</div>
        </div>
        <div class="npc-item-pr" style="border-color:${prColor};color:${prColor}">${npc.power_rank}</div>
      </div>
    `;
  },

  _renderNpcDetail() {
    if (!this._selectedNpc) return '';
    const npc = this._selectedNpc;
    const prColor = this._getPRColor(npc.power_rank);
    
    return `
      <div class="npc-header">
        <div class="npc-header-top">
          <div class="npc-name">${npc.name}</div>
          <div class="npc-actions">
            <button class="btn" onclick="CerebroComponent._addToEncounter('${npc.id}')">+ ENCOUNTER</button>
          </div>
        </div>
        <div class="npc-codename">${npc.codename || ''}</div>
        <div class="npc-meta">
          <div class="npc-initiative">INI: ${npc.initiative || '-'}</div>
          <div class="npc-pr-badge" style="border-color:${prColor};color:${prColor}">PR: ${npc.power_rank}</div>
        </div>
      </div>
      
      <div class="attr-grid">
        <div class="attr-group">
          <div class="attr-group-hdr">Físico</div>
          <div class="attr-row"><span>DES</span><span>${npc.stats?.destreza || '-'}</span></div>
          <div class="attr-row"><span>FOR</span><span>${npc.stats?.forca || '-'}</span></div>
          <div class="attr-row"><span>COR</span><span>${npc.stats?.corpo || '-'}</span>
        </div></div>
        <div class="attr-group">
          <div class="attr-group-hdr">Mental</div>
          <div class="attr-row"><span>INT</span><span>${npc.stats?.inteligencia || '-'}</span></div>
          <div class="attr-row"><span>VON</span><span>${npc.stats?.vontade || '-'}</span></div>
          <div class="attr-row"><span>MEN</span><span>${npc.stats?.mente || '-'}</span>
        </div></div>
        <div class="attr-group">
          <div class="attr-group-hdr">Social</div>
          <div class="attr-row"><span>INF</span><span>${npc.stats?.influencia || '-'}</span></div>
          <div class="attr-row"><span>AUR</span><span>${npc.stats?.aura || '-'}</span></div>
          <div class="attr-row"><span>ESP</span><span>${npc.stats?.espirito || '-'}</span>
        </div></div>
      </div>
      
      <div class="npc-tags">
        ${npc.tags?.map(t => `<span class="npc-tag" style="border-color:var(--accent);color:var(--accent)">${t}</span>`).join('') || ''}
      </div>
      
      <div class="npc-desc">${npc.description || ''}</div>
    `;
  },

  _getPRColor(rank) {
    if (rank <= 3) return 'var(--pr-baixo)';
    if (rank <= 6) return 'var(--pr-medio)';
    if (rank <= 9) return 'var(--pr-alto)';
    return 'var(--pr-extremo)';
  },

  _attachEvents() {
    const searchInput = document.getElementById('cerebro-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this._search = e.target.value;
        this._render();
      });
    }
  },

  _selectNpc(id) {
    this._selectedNpc = this._npcs.find(n => n.id === id);
    this._render();
  },

  _addToEncounter(npcId) {
    Router.navigate('/combate?npc=' + npcId);
  },

  unmount() {
    this._container = null;
    this._npcs = [];
    this._selectedNpc = null;
  }
};

window.CerebroComponent = CerebroComponent;