/**
 * X-MEN TTRPG - Auth Service
 * Authentication management with AppState integration
 */

const AuthService = {
  _client: null,
  
  init(client) {
    this._client = client;
    this._checkSession();
  },
  
  async _checkSession() {
    try {
      const { data: { session } } = await this._client.auth.getSession();
      if (session) {
        const profile = await this._loadProfile(session.user.id);
        AppState.setAuth({
          session,
          user: session.user,
          profile
        });
        return true;
      }
    } catch (e) {
      console.log('[Auth] No session:', e.message);
    }
    AppState.setAuth(null);
    return false;
  },
  
  async _loadProfile(userId) {
    try {
      const { data } = await this._client
        .from('profiles')
        .select('id, email, username, display_name, role')
        .eq('id', userId)
        .single();
      
      if (data) return data;
    } catch (e) {
      console.log('[Auth] Profile not found, using metadata');
    }
    
    return {
      id: userId,
      role: 'player'
    };
  },
  
  async login(email, password) {
    const { data, error } = await this._client.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    return this._checkSession();
  },
  
  async register(email, password, username) {
    const { data, error } = await this._client.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });
    
    if (error) throw error;
    
    if (data.session) {
      return this._checkSession();
    }
    
    return { needsConfirmation: true };
  },
  
  async logout() {
    await this._client.auth.signOut();
    AppState.setAuth(null);
  },
  
  isLoggedIn() {
    return !!AppState.get('auth');
  },
  
  getUser() {
    const auth = AppState.get('auth');
    return auth?.user || null;
  },
  
  getProfile() {
    const auth = AppState.get('auth');
    return auth?.profile || null;
  },
  
  isGM() {
    const profile = this.getProfile();
    return profile?.role === 'gm';
  }
};

window.AuthService = AuthService;