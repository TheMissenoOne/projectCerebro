/**
 * X-MEN TTRPG - Admin Component
 * GM Panel for party and encounter management
 */

export const AdminComponent = {
  _container: null,
  _currentTab: 'party',
  _party: null,
  _characters: [],
  _currentEdit: null,

  async mount(container, params) {
    this._container = container;
    this._currentTab = params.tab || 'party';

    if (!AuthService.isLoggedIn()) {
      Router.navigate('/login');
      return;
    }

    const user = AuthService.getUser();
    this._party = await ApiService.getPlayerParty(user.id);
    this._characters = await ApiService.getUserCharacters(user.id);

    this._render();
  },

  _render() {
    this._container.innerHTML = `
      <div class="admin-layout">
        <div class="admin-sidebar">
          <a href="/admin?tab=party" class="admin-nav-link ${this._currentTab === 'party' ? 'active' : ''}" data-link>Party</a>
          <a href="/admin?tab=encounter" class="admin-nav-link ${this._currentTab === 'encounter' ? 'active' : ''}" data-link>Encounter</a>
          <a href="/admin?tab=notes" class="admin-nav-link ${this._currentTab === 'notes' ? 'active' : ''}" data-link>Notas</a>
          <a href="/dashboard" class="admin-nav-link" data-link>Voltar</a>
        </div>
        <div class="admin-content">
          ${this._currentTab === 'party' ? this._renderPartyTab() : ''}
          ${this._currentTab === 'encounter' ? this._renderEncounterTab() : ''}
          ${this._currentTab === 'notes' ? this._renderNotesTab() : ''}
        </div>
      </div>
    `;

    this._attachEvents();
  },

  _renderPartyTab() {
    return `
      <div class="admin-section">
        <div class="admin-section-header">
          <h2 class="admin-section-title">Party</h2>
          <button class="btn" onclick="AdminComponent._createParty()">CRIAR PARTY</button>
        </div>
        <div id="no-party-msg" class="no-party" ${this._party ? 'style="display:none"' : ''}>
          <p>Nenhuma party encontrada.</p>
          <p>Crie uma party para começar.</p>
        </div>
        <div id="party-admin-content" ${!this._party ? 'style="display:none"' : ''}>
          <table class="party-chars-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Codinome</th>
                <th>Player</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody id="party-chars-body">
              ${this._characters.map(c => `
                <tr>
                  <td>${c.name || 'Sem nome'}</td>
                  <td>${c.codename || '-'}</td>
                  <td>${c.player_id === AuthService.getUser()?.id ? 'Você' : 'Outro'}</td>
                  <td>
                    <button class="btn btn-sm" onclick="AdminComponent._editCharacter('${c.id}')">EDITAR</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  _renderEncounterTab() {
    return `
      <div class="admin-section">
        <div class="admin-section-header">
          <h2 class="admin-section-title">Encounter</h2>
        </div>
        <div class="enc-section">
          <div class="enc-header" onclick="AdminComponent._toggleEncounter()">
            <span class="enc-lbl">STATUS</span>
            <span id="enc-status-badge" class="enc-count-badge">INATIVO</span>
          </div>
        </div>
      </div>
    `;
  },

  _renderNotesTab() {
    return `
      <div class="admin-section">
        <div class="admin-section-header">
          <h2 class="admin-section-title">Notas da Sessão</h2>
          <button class="btn" onclick="AdminComponent._saveNotes()">SALVAR</button>
        </div>
        <textarea id="session-notes" class="ficha-textarea" placeholder="Anotações da sessão..."></textarea>
      </div>
    `;
  },

  _attachEvents() {
  },

  async _createParty() {
    try {
      const name = prompt('Nome da party:');
      if (!name) return;

      this._party = await ApiService.createParty(name);
      this._render();
    } catch (e) {
      console.error('[Admin] Error creating party:', e);
    }
  },

  _editCharacter(charId) {
    Router.navigate('/ficha/' + charId);
  },

  _toggleEncounter() {
  },

  async _saveNotes() {
    const notes = document.getElementById('session-notes')?.value || '';
    if (this._party) {
      await ApiService.updateParty(this._party.id, { notes });
      alert('Notas salvas!');
    }
  },

  unmount() {
    this._container = null;
    this._party = null;
  }
};

export { AdminComponent };
window.AdminComponent = AdminComponent;