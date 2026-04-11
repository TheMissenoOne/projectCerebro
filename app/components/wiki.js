/**
 * X-MEN TTRPG - Wiki Component
 * Theme reference and game rules
 */

export const WikiComponent = {
  _container: null,
  _currentTheme: 'themes',

  async mount(container, params) {
    this._container = container;
    this._currentTheme = params.theme || 'themes';
    this._render();
  },

  _render() {
    this._container.innerHTML = `
      <div class="wiki-layout">
        <div class="wiki-sidebar">
          <div class="wiki-nav-section">
            <div class="wiki-nav-title">Personagens</div>
            <a href="/wiki?theme=themes" class="wiki-nav-link ${this._currentTheme === 'themes' ? 'active' : ''}" data-link>Temas</a>
          </div>
          <div class="wiki-nav-section">
            <div class="wiki-nav-title">Regras</div>
            <a href="/wiki?theme=attributes" class="wiki-nav-link ${this._currentTheme === 'attributes' ? 'active' : ''}" data-link>Atributos</a>
            <a href="/wiki?theme=moves" class="wiki-nav-link ${this._currentTheme === 'moves' ? 'active' : ''}" data-link>Movimentos</a>
            <a href="/wiki?theme=combat" class="wiki-nav-link ${this._currentTheme === 'combat' ? 'active' : ''}" data-link>Combate</a>
          </div>
          <div class="wiki-nav-section">
            <div class="wiki-nav-title">Sistema</div>
            <a href="/dashboard" class="wiki-nav-link" data-link>Voltar</a>
          </div>
        </div>
        <div class="wiki-content">
          ${this._currentTheme === 'themes' ? this._renderThemes() : ''}
          ${this._currentTheme === 'attributes' ? this._renderAttributes() : ''}
          ${this._currentTheme === 'moves' ? this._renderMoves() : ''}
          ${this._currentTheme === 'combat' ? this._renderCombat() : ''}
        </div>
      </div>
    `;
  },

  _renderThemes() {
    return `
      <h1>Temas de Mutação</h1>
      <p>Os Temas definem as habilidades mutantes únicas de cada personagem.</p>
      
      <div class="theme-card">
        <div class="theme-card-header">
          <span class="theme-card-name">Fênix</span>
          <span class="theme-card-type">Cosmico</span>
        </div>
        <div class="theme-card-body">
          <div class="theme-card-flavor">Poder derivado da Força Fênix</div>
          <div class="theme-moves">
            <div class="theme-move">
              <span class="theme-move-label">ATO</span>
              <span class="theme-move-text"> Quando você canaliza poder cósmico,uba +2</span>
            </div>
            <div class="theme-move">
              <span class="theme-move-label">PASSIVO</span>
              <span class="theme-move-text"> Imune a fogo e calor extremo</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="theme-card">
        <div class="theme-card-header">
          <span class="theme-card-name">Gelo</span>
          <span class="theme-card-type">Elemental</span>
        </div>
        <div class="theme-card-body">
          <div class="theme-card-flavor">Controle sobre frio extremo</div>
          <div class="theme-moves">
            <div class="theme-move">
              <span class="theme-move-label">ATO</span>
              <span class="theme-move-text">Congele um alvo,uba +1</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  _renderAttributes() {
    return `
      <h1>Atributos</h1>
      <p>Nove atributos dividos em três categorias</p>
      
      <h2>Físico</h2>
      <p><strong>Destreza</strong> - Agilidade, reflexos, precisão</p>
      <p><strong>Força</strong> - Potência física, resistência</p>
      <p><strong>Corpo</strong> - Resistência, vitalidade</p>
      
      <h2>Mental</h2>
      <p><strong>Inteligência</strong> - Conhecimento, análise</p>
      <p><strong>Vontade</strong> - Determinação, autocontrole</p>
      <p><strong>Mente</strong> - Proteção psychic</p>
      
      <h2>Social</h2>
      <p><strong>Influência</strong> - Persuasão, status</p>
      <p><strong>Aura</strong> - Carisma, magnetismo pessoal</p>
      <p><strong>Espírito</strong> - Conexão mística</p>
    `;
  },

  _renderMoves() {
    return `
      <h1>Movimentos</h1>
      <p>Ações especiais que personagens podem realizar</p>
      
      <h2>Movimentos de Atributo</h2>
      <p>Cada atributo tem movimentos associados usados em testes.</p>
    `;
  },

  _renderCombat() {
    return `
      <h1>Combate</h1>
      <p>Sistema de combate tático</p>
      
      <h2>Ordem de Iniciativa</h2>
      <p>Ordenado por Destreza, do maior para o menor.</p>
      
      <h2>Ações de Ronda</h2>
      <p>Cada personagemtem uma ação por round.</p>
    `;
  },

  unmount() {
    this._container = null;
  }
};

window.WikiComponent = WikiComponent;