/**
 * X-MEN TTRPG - Combate Component
 * Combat calculator and encounter manager
 */

const CombateComponent = {
  _container: null,
  _activeTab: 'calculator',
  _encounter: [],
  _round: 1,

  async mount(container, params) {
    this._container = container;
    this._activeTab = params.tab || 'calculator';

    if (params.npc) {
      try {
        const npc = await ApiService.loadNPC(params.npc);
        if (npc) {
          this._activeTab = 'encounter';
          this._encounter.push({ ...npc, currentHP: npc.hp, conditions: [] });
        }
      } catch (e) {
        console.error('[Combate] Error loading NPC:', e);
      }
    }

    this._render();
  },

  _render() {
    this._container.innerHTML = `
      <div class="combate-container">
        <div class="tabs-container">
          <div class="mode-selector">
            <button class="mode-btn ${this._activeTab === 'calculator' ? 'active' : ''}" onclick="CombateComponent._switchTab('calculator')">Calculadora</button>
            <button class="mode-btn ${this._activeTab === 'encounter' ? 'active' : ''}" onclick="CombateComponent._switchTab('encounter')">Encounter</button>
            <button class="mode-btn ${this._activeTab === 'tables' ? 'active' : ''}" onclick="CombateComponent._switchTab('tables')">Tabelas</button>
          </div>
        </div>
        
        ${this._activeTab === 'calculator' ? this._renderCalculator() : ''}
        ${this._activeTab === 'encounter' ? this._renderEncounter() : ''}
        ${this._activeTab === 'tables' ? this._renderTables() : ''}
      </div>
    `;

    this._attachEvents();
  },

  _renderCalculator() {
    return `
      <div class="calc-grid">
        <div class="calc-panel">
          <div class="calc-panel-title">Atacante</div>
          <div class="calc-row">
            <span class="calc-label">AV</span>
            <input type="number" id="atk-av" class="calc-input" value="0" min="0" max="20">
          </div>
          <div class="calc-row">
            <span class="calc-label">Dano</span>
            <input type="number" id="atk-dano" class="calc-input" value="0" min="0">
          </div>
        </div>
        <div class="calc-panel">
          <div class="calc-panel-title">Defensor</div>
          <div class="calc-row">
            <span class="calc-label">OV</span>
            <input type="number" id="def-ov" class="calc-input" value="0" min="0" max="20">
          </div>
          <div class="calc-row">
            <span class="calc-label">Armor</span>
            <input type="number" id="def-armor" class="calc-input" value="0" min="0">
          </div>
        </div>
      </div>
      
      <button class="action-btn" onclick="CombateComponent._calculate()">CALCULAR</button>
      
      <div id="calc-result" class="result-box" style="display:none">
        <div class="result-label">RESULTADO</div>
        <div class="result-value" id="result-value">-</div>
        <div class="result-sub" id="result-sub"></div>
      </div>
    `;
  },

  _renderEncounter() {
    const totalEnemies = this._encounter.filter(e => e.type === 'enemy').length;
    const totalAllies = this._encounter.filter(e => e.type === 'ally').length;
    
    return `
      <div class="enc-status-banner">
        <div class="enc-banner-top">
          <div class="enc-banner-title">
            <span>ROUND</span>
            <span class="enc-round-val">${this._round}</span>
          </div>
          <div class="enc-banner-controls">
            <button class="btn btn-sm" onclick="CombateComponent._nextRound()">PRÓXIMA RONDA</button>
            <button class="btn btn-sm btn-red" onclick="CombateComponent._resetEncounter()">RESET</button>
          </div>
        </div>
      </div>
      
      <div class="npc-list-wrap">
        ${this._encounter.length === 0 ? '<div class="enc-empty-msg">Nenhum participante. Adicione NPCs do Cerebro.</div>' : ''}
        ${this._encounter.map((entity, idx) => this._renderEncParticipant(entity, idx)).join('')}
      </div>
      
      <div class="enc-add-bar">
        <button class="btn tbtn" onclick="Router.navigate('/cerebro')">+ ADICIONAR NPC</button>
      </div>
    `;
  },

  _renderEncParticipant(entity, idx) {
    const prColor = entity.power_rank ? this._getPRColor(entity.power_rank) : 'var(--accent)';
    return `
      <div class="enc-npc-item">
        <div class="enc-npc-dot" style="background:${prColor}"></div>
        <div class="enc-npc-info">
          <div class="enc-npc-name">${entity.name}</div>
        </div>
      </div>
    `;
  },

  _renderTables() {
    return `
      <div class="tables-section">
        <h3>Resultados de Teste</h3>
        <table>
          <thead>
            <tr>
              <th>Diff</th>
              <th>12+</th>
              <th>10-11</th>
              <th>8-9</th>
              <th>6-7</th>
              <th>4-5</th>
              <th>2-3</th>
              <th>0-1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Normal</td>
              <td>✓</td>
              <td>✓</td>
              <td>Parcial</td>
              <td>✗</td>
              <td>✗</td>
              <td>✗</td>
              <td>✗</td>
            </tr>
            <tr>
              <td>Difícil</td>
              <td>✓</td>
              <td>Parcial</td>
              <td>✗</td>
              <td>✗</td>
              <td>✗</td>
              <td>✗</td>
              <td>✗</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  },

  _getPRColor(rank) {
    if (rank <= 3) return 'var(--pr-baixo)';
    if (rank <= 6) return 'var(--pr-medio)';
    if (rank <= 9) return 'var(--pr-alto)';
    return 'var(--pr-extremo)';
  },

  _attachEvents() {
  },

  _switchTab(tab) {
    this._activeTab = tab;
    this._render();
  },

  _calculate() {
    const av = parseInt(document.getElementById('atk-av')?.value || 0);
    const dano = parseInt(document.getElementById('atk-dano')?.value || 0);
    const ov = parseInt(document.getElementById('def-ov')?.value || 0);
    const armor = parseInt(document.getElementById('def-armor')?.value || 0);
    
    const total = av + 12 - ov;
    const result = total;
    const damage = Math.max(0, dano - armor);
    
    const resultEl = document.getElementById('result-value');
    const resultSub = document.getElementById('result-sub');
    const resultBox = document.getElementById('calc-result');
    
    if (resultEl && resultSub && resultBox) {
      resultBox.style.display = 'block';
      resultEl.textContent = result >= 10 ? 'SUCESSO' : result >= 8 ? 'PARCIAL' : 'FALHA';
      resultEl.className = 'result-value ' + (result >= 10 ? 'success' : result >= 8 ? '' : 'fail');
      resultSub.textContent = `Dano: ${damage}`;
    }
  },

  _nextRound() {
    this._round++;
    this._render();
  },

  _resetEncounter() {
    this._encounter = [];
    this._round = 1;
    this._render();
  },

  addToEncounter(entity) {
    this._encounter.push(entity);
    this._activeTab = 'encounter';
    this._render();
  },

  unmount() {
    this._container = null;
    this._encounter = [];
  }
};

window.CombateComponent = CombateComponent;