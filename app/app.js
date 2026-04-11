/**
 * X-MEN TTRPG - Main App Entry
 * SPA Initialization with route registration
 */

const App = {
  async init() {
    console.log('[App] Initializing...');
    
    // Initialize state
    AppState.init();
    
    // Initialize Supabase client
    const client = window.getSupabaseClient();
    if (!client) {
      console.error('[App] Supabase client not found');
      return;
    }
    
    // Initialize services
    AuthService.init(client);
    ApiService.init(client);
    
    // Register routes
    this._registerRoutes();
    
    // Initialize router
    Router.init();
    
    // Subscribe to auth changes
    AppState.subscribe('auth', (auth) => {
      if (!auth && !Router.current) {
        Router.navigate('/login');
      }
    });
    
    // Subscribe to theme changes
    AppState.subscribe('theme', (theme) => {
      document.body.classList.remove('theme-yellow', 'theme-red', 'theme-green', 'theme-purple', 'theme-blue');
      document.body.classList.add('theme-' + theme);
    });
    
    console.log('[App] Initialized');
  },
  
  _registerRoutes() {
    // Root route - redirect to dashboard
    Router.add('/', async (container) => {
      Router.navigate('/dashboard', false);
    });
    
    // Login route (always available)
    Router.add('/login', async (container) => {
      const { LoginComponent } = await import('./components/login.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = LoginComponent;
      await LoginComponent.mount(container);
    });
    
    // Dashboard - lazy load
    Router.add('/dashboard', async (container) => {
      const { DashboardComponent } = await import('./components/dashboard.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = DashboardComponent;
      await DashboardComponent.mount(container);
    });
    
    // Ficha - new character
    Router.add('/ficha/new', async (container, params) => {
      const { FichaComponent } = await import('./components/ficha.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = FichaComponent;
      await FichaComponent.mount(container, { id: 'new' });
    });
    
    // Ficha - with route param /ficha/:id
    Router.add('/ficha/:id', async (container, params) => {
      const { FichaComponent } = await import('./components/ficha.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = FichaComponent;
      // Fallback: extract ID directly from URL if router params are missing
      const charId = params.id || location.pathname.split('/').pop();
      await FichaComponent.mount(container, { ...params, id: charId });
    });
    
    // Admin - lazy load
    Router.add('/admin', async (container, params) => {
      const { AdminComponent } = await import('./components/admin.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = AdminComponent;
      await AdminComponent.mount(container, params);
    });
    
    // Wiki - lazy load
    Router.add('/wiki', async (container, params) => {
      const { WikiComponent } = await import('./components/wiki.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = WikiComponent;
      await WikiComponent.mount(container, params);
    });
    
    // Cerebro - lazy load
    Router.add('/cerebro', async (container, params) => {
      const { CerebroComponent } = await import('./components/cerebro.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = CerebroComponent;
      await CerebroComponent.mount(container, params);
    });
    
    // NPCs - lazy load (uses cerebro)
    Router.add('/npcs', async (container, params) => {
      const { CerebroComponent } = await import('./components/cerebro.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = CerebroComponent;
      await CerebroComponent.mount(container, params);
    });
    
    // Combate - lazy load
    Router.add('/combate', async (container, params) => {
      const { CombateComponent } = await import('./components/combate.js');
      if (container._component && container._component.unmount) {
        container._component.unmount();
      }
      container._component = CombateComponent;
      await CombateComponent.mount(container, params);
    });
    
    // 404 handler
    Router.add('/404', (container) => {
      container.innerHTML = '<h1>404 - Page Not Found</h1>';
    });
  }
};

window.App = App;