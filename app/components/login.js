/**
 * X-MEN TTRPG - Login Component
 */

export const LoginComponent = {
  async mount(container) {
    container.innerHTML = `
      <div class="auth-container">
        <div class="auth-logo">
          <svg viewBox="0 0 64 64" fill="none">
            <rect x="2" y="2" width="60" height="60" rx="3" stroke="var(--accent)" stroke-width="3"/>
            <rect x="8" y="8" width="48" height="48" rx="1" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>
            <line x1="16" y1="16" x2="48" y2="48" stroke="var(--accent)" stroke-width="4.5"/>
            <line x1="48" y1="16" x2="16" y2="48" stroke="var(--accent)" stroke-width="4.5"/>
          </svg>
        </div>
        
        <h1 class="auth-title">XAVIER INSTITUTE</h1>
        <p class="auth-subtitle">Acesso Restrito</p>
        
        <div class="auth-card">
          <div class="auth-tabs">
            <button class="auth-tab active" data-tab="login">Entrar</button>
            <button class="auth-tab" data-tab="register">Cadastrar</button>
          </div>
          
          <div id="auth-error" class="auth-error"></div>
          
          <form id="login-form" class="auth-form active">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" name="email" required>
            </div>
            <div class="form-group">
              <label class="form-label">Senha</label>
              <input type="password" class="form-input" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Acessar</button>
          </form>
          
          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" name="email" required>
            </div>
            <div class="form-group">
              <label class="form-label">Senha</label>
              <input type="password" class="form-input" name="password" required minlength="6">
            </div>
            <div class="form-group">
              <label class="form-label">Usuário</label>
              <input type="text" class="form-input" name="username" required>
            </div>
            <div class="form-group">
              <label class="form-label">Nome de Exibição</label>
              <input type="text" class="form-input" name="displayName" required>
            </div>
            <input type="hidden" name="role" value="player">
            <button type="submit" class="btn btn-primary">Criar Conta</button>
          </form>
        </div>
        
        <p class="auth-footer">X-MEN // CITY OF MIST</p>
      </div>
    `;
    
    this._attachEvents();
  },
  
  _attachEvents() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    const errorEl = document.getElementById('auth-error');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        forms.forEach(f => f.classList.remove('active'));
        document.getElementById(tab.dataset.tab + '-form').classList.add('active');
        errorEl.classList.remove('show');
      });
    });
    
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Entrando...';
      btn.disabled = true;
      
      try {
        await AuthService.login(e.target.email.value, e.target.password.value);
        Router.navigate('/dashboard');
      } catch (err) {
        errorEl.textContent = err.message;
        errorEl.classList.add('show');
        btn.textContent = origText;
        btn.disabled = false;
      }
    });
    
    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Criando...';
      btn.disabled = true;
      
      try {
        await AuthService.register(
          e.target.email.value,
          e.target.password.value,
          e.target.username.value
        );
        Router.navigate('/dashboard');
      } catch (err) {
        errorEl.textContent = err.message;
        errorEl.classList.add('show');
        btn.textContent = origText;
        btn.disabled = false;
      }
    });
  }
};

window.LoginComponent = LoginComponent;