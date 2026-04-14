/**
 * X-MEN TTRPG - State Management
 * Atomized SPA with global state and pub/sub
 */

const AppState = {
  _state: {
    auth: null,
    theme: 'yellow',
    party: null,
    profile: null,
    characters: null,
    loading: false
  },
  _listeners: new Map(),
  _persistKeys: ['auth', 'theme', 'party', 'profile', 'characters'],
  
  init() {
    const savedTheme = localStorage.getItem('cerebro_tema') || 'yellow';
    this._state.theme = savedTheme;
    
    this._persistKeys.forEach(key => {
      const stored = localStorage.getItem('cerebro_' + key);
      if (stored) {
        try { this._state[key] = JSON.parse(stored); }
        catch (e) { this._state[key] = null; }
      }
    });
  },
  
  get(key) {
    return this._state[key];
  },
  
  set(key, value) {
    const oldValue = this._state[key];
    this._state[key] = value;
    if (this._persistKeys.includes(key)) {
      localStorage.setItem('cerebro_' + key, JSON.stringify(value));
    }
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
  },
  
  async preload(user) {
    if (!user) return;
    try {
      const profile = await window.api.getProfile(user.id, true);
      this.set('profile', profile);
      
      const characters = await window.api.listCharacters(user.id, true);
      this.set('characters', characters);
      
      let party = await window.api.getGMParty(user.id, true);
      if (!party) {
        party = await window.api.getPlayerParty(user.id, true);
      }
      this.set('party', party);
    } catch (e) {
      console.error('[AppState.preload] Error:', e);
    }
  },
  
  clear() {
    this._persistKeys.forEach(key => {
      this._state[key] = key === 'theme' ? 'yellow' : null;
      localStorage.removeItem('cerebro_' + key);
    });
  }
};

window.AppState = AppState;