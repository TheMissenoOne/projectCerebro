const SUPABASE_URL = 'https://wlpdfrqzbpwuxyqeayjt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscGRmcnF6YnB3dXh5cWVheWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDQwODYsImV4cCI6MjA5MTA4MDA4Nn0.RkLXucAPwp0Edba7nG8pZOXrsOzjjrEbOIFwg-uyRLM';

const api = {
  async request(endpoint, options = {}) {
    const url = SUPABASE_URL + '/rest/v1' + endpoint;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        ...options.headers
      },
      ...options
    };
    
    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }
    
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Request failed');
    }
    
    return data;
  },

  // Auth - use Supabase Auth API
  async register(email, password, username, displayName, role) {
    // First create auth user
    const authUrl = SUPABASE_URL + '/auth/v1/signup';
    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ email, password })
    });
    const authData = await authResponse.json();
    
    console.log('Register response:', authData);
    
    if (!authResponse.ok) {
      throw new Error(authData.msg || authData.message || 'Registration failed');
    }
    
    const userId = authData.user?.id || authData.id;
    if (!userId) {
      throw new Error('User ID not returned from auth');
    }
    
    // Then create profile
    await this.request('/profiles', {
      method: 'POST',
      headers: { 'Prefer': 'return=minimal' },
      body: { 
        id: userId, 
        email,
        username, 
        display_name: displayName, 
        role: role || 'player'
      }
    });
    
    // Create session manually
    const session = {
      user: { id: userId, email },
      access_token: authData.session?.access_token || authData.access_token,
      refresh_token: authData.session?.refresh_token || authData.refresh_token
    };
    localStorage.setItem('session', JSON.stringify(session));
    
    return { session, user: { id: userId, email } };
  },
  
  async login(email, password) {
    const authUrl = SUPABASE_URL + '/auth/v1/token?grant_type=password';
    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ email, password })
    });
    const authData = await authResponse.json();
    
    if (!authResponse.ok) {
      throw new Error(authData.msg || authData.error_description || 'Login failed');
    }
    
    const userId = authData.user?.id || authData.id;
    const session = {
      user: { id: userId, email },
      access_token: authData.access_token,
      refresh_token: authData.refresh_token
    };
    localStorage.setItem('session', JSON.stringify(session));
    
    return { session, user: { id: userId, email } };
  },

  // Profiles
  async getProfile(userId) {
    return this.request(`/profiles?id=eq.${userId}`).then(r => r[0]);
  },

  // Parties
  async createParty(name, gmId) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return this.request('/parties', {
      method: 'POST',
      body: { name, gm_id: gmId, code }
    });
  },
  
  async getGMParty(gmId) {
    const result = await this.request(`/parties?gm_id=eq.${gmId}`);
    return result[0] || null;
  },
  
  async getPartyByCode(code) {
    const result = await this.request(`/parties?code=eq.${code.toUpperCase()}`);
    return result[0] || null;
  },
  
  async joinParty(partyId, playerId) {
    return this.request('/party_members', {
      method: 'POST',
      body: { party_id: partyId, player_id: playerId }
    });
  },
  
  async getPartyMembers(partyId) {
    return this.request(`/party_members?party_id=eq.${partyId}&select=*,profiles(*)`);
  },
  
  async getPlayerParty(playerId) {
    const result = await this.request(`/party_members?player_id=eq.${playerId}&select=*,parties(*)`);
    return result[0]?.parties || null;
  },

  // Characters
  async createCharacter(playerId, partyId = null) {
    const id = crypto.randomUUID();
    return this.request('/characters', {
      method: 'POST',
      body: { 
        id, 
        player_id: playerId, 
        party_id: partyId,
        name: 'Novo Personagem',
        data: {}
      }
    });
  },
  
  async loadCharacter(charId) {
    const result = await this.request(`/characters?id=eq.${charId}`);
    return result[0] || null;
  },
  
  async saveCharacter(charId, data) {
    return this.request(`/characters?id=eq.${charId}`, {
      method: 'PATCH',
      body: { data, updated_at: new Date().toISOString() }
    });
  },
  
  async listCharacters(playerId) {
    return this.request(`/characters?player_id=eq.${playerId}&order=created_at.desc`);
  },
  
  async listPartyCharacters(partyId) {
    return this.request(`/characters?party_id=eq.${partyId}&order=name`);
  },
  
  async deleteCharacter(charId) {
    return this.request(`/characters?id=eq.${charId}`, { method: 'DELETE' });
  },

  // NPCs
  async listNPCs(partyId = null, includeGlobal = true) {
    let query = '';
    if (partyId && includeGlobal) {
      query = `?or=(party_id.eq.${partyId},is_global.eq.true)&order=name`;
    } else if (partyId) {
      query = `?party_id=eq.${partyId}&order=name`;
    } else {
      query = `?is_global=eq.true&order=name`;
    }
    return this.request('/npcs' + query);
  },
  
  async createNPC(partyId, createdBy, npcData) {
    const id = crypto.randomUUID();
    return this.request('/npcs', {
      method: 'POST',
      body: { 
        id,
        party_id: partyId, 
        created_by: createdBy, 
        name: npcData.name,
        codename: npcData.codename || '',
        faction: npcData.faction || 'neutro',
        danger: npcData.danger || 'medio',
        data: npcData.data || {},
        is_global: false
      }
    });
  },

  // Sessions
  async getSession(partyId) {
    const result = await this.request(`/sessions?party_id=eq.${partyId}`);
    return result[0] || null;
  },
  
  async updateSession(partyId, sessionData) {
    // Try update first, then insert if not found
    const existing = await this.getSession(partyId);
    if (existing) {
      return this.request(`/sessions?party_id=eq.${partyId}`, {
        method: 'PATCH',
        body: { ...sessionData, updated_at: new Date().toISOString() }
      });
    } else {
      return this.request('/sessions', {
        method: 'POST',
        body: { party_id: partyId, ...sessionData }
      });
    }
  }
};

// Helper to get current user
function getCurrentUser() {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.user || null;
}

function getAuthHeader() {
  const session = JSON.parse(localStorage.getItem('session') || 'null');
  return session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {};
}

if (typeof window !== 'undefined') {
  window.api = api;
  window.getCurrentUser = getCurrentUser;
  window.getAuthHeader = getAuthHeader;
}
