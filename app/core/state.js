/**
 * X-MEN TTRPG - State Management
 * Atomized SPA with global state and pub/sub
 */

const AppState = {
  _state: {
    auth: null,
    theme: 'yellow',
    party: null,
    loading: false
  },
  _listeners: new Map(),
  
  init() {
    const savedTheme = localStorage.getItem('cerebro_tema') || 'yellow';
    this._state.theme = savedTheme;
  },
  
  get(key) {
    return this._state[key];
  },
  
  set(key, value) {
    const oldValue = this._state[key];
    this._state[key] = value;
    this._emit(key, value, oldValue);
  },
  
  subscribe(key, fn) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(fn);
    return () => this._listeners.get(key).delete(fn);
  },
  
  _emit(key, value, oldValue) {
    const listeners = this._listeners.get(key);
    if (listeners) {
      listeners.forEach(fn => fn(value, oldValue));
    }
  },
  
  setAuth(auth) {
    this.set('auth', auth);
  },
  
  setTheme(theme) {
    document.body.classList.remove('theme-yellow', 'theme-red', 'theme-green', 'theme-purple', 'theme-blue');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('cerebro_tema', theme);
    this.set('theme', theme);
  },
  
  setParty(party) {
    this.set('party', party);
  },
  
  setLoading(loading) {
    this.set('loading', loading);
  }
};

window.AppState = AppState;