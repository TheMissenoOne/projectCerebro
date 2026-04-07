const API_URL = window.location.origin;

const api = {
  async request(endpoint, options = {}) {
    const url = API_URL + endpoint;
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
      },
      ...options
    };
    
    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }
    
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  },

  async register(email, password, username, displayName, role) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: { email, password, username, displayName, role }
    });
    if (data.session) {
      localStorage.setItem('session', JSON.stringify(data.session));
    }
    return data;
  },

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    if (data.session) {
      localStorage.setItem('session', JSON.stringify(data.session));
    }
    return data;
  },

  async getProfile(userId) {
    return this.request(`/profiles/${userId}`);
  },

  async createParty(name, gmId) {
    return this.request('/parties', {
      method: 'POST',
      body: { name, gm_id: gmId }
    });
  },

  async getGMParty(gmId) {
    return this.request(`/parties/gm/${gmId}`);
  },

  async getPartyByCode(code) {
    return this.request(`/parties/code/${code}`);
  },

  async joinParty(partyId, playerId) {
    return this.request(`/parties/${partyId}/members`, {
      method: 'POST',
      body: { player_id: playerId }
    });
  },

  async getPartyMembers(partyId) {
    return this.request(`/parties/${partyId}/members`);
  },

  async getPlayerParty(playerId) {
    return this.request(`/players/${playerId}/party`);
  },

  async createCharacter(playerId, partyId = null) {
    return this.request('/characters', {
      method: 'POST',
      body: { player_id: playerId, party_id: partyId }
    });
  },

  async loadCharacter(charId) {
    return this.request(`/characters/${charId}`);
  },

  async loadPublicCharacter(charId) {
    return this.request(`/characters/${charId}/public`);
  },

  async saveCharacter(charId, data) {
    return this.request(`/characters/${charId}`, {
      method: 'PUT',
      body: { data }
    });
  },

  async listCharacters(playerId) {
    return this.request(`/players/${playerId}/characters`);
  },

  async listPartyCharacters(partyId) {
    return this.request(`/parties/${partyId}/characters`);
  },

  async deleteCharacter(charId) {
    return this.request(`/characters/${charId}`, { method: 'DELETE' });
  },

  async listNPCs(partyId = null, includeGlobal = true) {
    let url = '/npcs?';
    if (partyId) url += `partyId=${partyId}&`;
    if (includeGlobal) url += 'includeGlobal=true';
    return this.request(url);
  },

  async createNPC(partyId, createdBy, npcData) {
    return this.request('/npcs', {
      method: 'POST',
      body: { party_id: partyId, created_by: createdBy, ...npcData }
    });
  },

  async getSession(partyId) {
    return this.request(`/parties/${partyId}/session`);
  },

  async updateSession(partyId, sessionData) {
    return this.request(`/parties/${partyId}/session`, {
      method: 'POST',
      body: sessionData
    });
  }
};

async function getSession() {
  return JSON.parse(localStorage.getItem('session'));
}

function getCurrentUser() {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.user || null;
}

async function logout() {
  localStorage.removeItem('session');
  window.location.href = 'index.html';
}

if (typeof window !== 'undefined') {
  window.api = api;
  window.getSession = getSession;
  window.getCurrentUser = getCurrentUser;
  window.logout = logout;
}
