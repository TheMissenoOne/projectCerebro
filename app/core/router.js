/**
 * X-MEN TTRPG - Router
 * Lazy-loads route components dynamically
 */

const Router = {
  routes: {},
  current: null,
  root: document.getElementById('app'),
  
  init() {
    window.addEventListener('popstate', () => {
      this._handleLocation();
    });
    
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('href');
        this.navigate(path);
      }
    });
    
    this._handleLocation();
  },
  
  add(path, loader) {
    this.routes[path] = loader;
  },
  
  async navigate(path, pushState = true) {
    if (pushState && path !== this.current) {
      history.pushState(null, '', path);
    }
    
    this.current = path;
    await this._load(path);
  },
  
  async _handleLocation() {
    const path = location.pathname || '/';
    
    // Redirect old URLs
    if (path === '/dashboard.html') {
      this.navigate('/dashboard', true);
      return;
    }
    if (path === '/ficha.html' || path === '/admin.html' || path === '/wiki.html') {
      const newPath = path.replace('.html', '');
      this.navigate(newPath + location.search, true);
      return;
    }
    
    await this._load(path);
  },
  
  async _load(path) {
    // Check for query params
    const [routePath, query] = path.split('?');
    const params = {};
    if (query) {
      query.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = value;
      });
    }
    
    const route = this.routes[routePath];
    
    if (!route) {
      const notFound = this.routes['/404'];
      if (notFound) {
        await notFound(this.root, { path });
      } else {
        this.root.innerHTML = '<h1>404 - Page Not Found</h1>';
      }
      return;
    }
    
    AppState.setLoading(true);
    
    try {
      // If route is a function that returns a promise, await it (lazy load)
      let handler = route;
      if (typeof route === 'function' && route.length === 0) {
        handler = await route();
      }
      
      await handler(this.root, params);
    } catch (e) {
      console.error('[Router] Error loading route:', e);
      this.root.innerHTML = '<h1>Error loading page</h1><pre>' + e.message + '</pre>';
    } finally {
      AppState.setLoading(false);
    }
  }
};

// Auto-register routes as they are loaded
window.Route = (path, loader) => Router.add(path, loader);

window.Router = Router;