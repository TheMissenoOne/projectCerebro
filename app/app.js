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
    // Login route (always available)
    Router.add('/login', async () => {
      const { LoginComponent } = await import('./components/login.js');
      LoginComponent.mount(document.getElementById('app'));
    });
    
    // Dashboard - lazy load
    Router.add('/dashboard', async () => {
      const { DashboardComponent } = await import('./components/dashboard.js');
      DashboardComponent.mount(document.getElementById('app'));
    });
    
    // 404 handler
    Router.add('/404', (container) => {
      container.innerHTML = '<h1>404 - Page Not Found</h1>';
    });
  }
};

window.App = App;