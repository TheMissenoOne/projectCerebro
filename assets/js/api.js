const api = {
  async request(endpoint, options = {}) {
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
    
    const response = await fetch(endpoint, config);
    
    let data;
    const text = await response.text();
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      data = { error: text || 'Invalid response' };
    }
    
    if (!response.ok) {
      throw new Error(data.error || `Request failed: ${response.status}`);
    }
    
    return data;
  },

  getOrigin() {
    return window.location.origin;
  },

  async register(email, password, username, displayName, role) {
    const data = await this.request(this.getOrigin() + '/auth/register', {
      method: 'POST',
      body: { email, password, username, displayName, role }
    });
    if (data.session) {
      localStorage.setItem('session', JSON.stringify(data.session));
    }
    return data;
  },

  async login(email, password) {
    const data = await this.request(this.getOrigin() + '/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    if (data.session) {
      localStorage.setItem('session', JSON.stringify(data.session));
    }
    return data;
  },

  async getProfile(userId) {
    return this.request(this.getOrigin() + '/profiles/' + userId);
  },

  async createParty(name, gmId) {
    return this.request(this.getOrigin() + '/parties', {
      method: 'POST',
      body: { name, gm_id: gmId }
    });
  },

  async getGMParty(gmId) {
    return this.request(this.getOrigin() + '/parties/gm/' + gmId);
  },

  async getPartyByCode(code) {
    return this.request(this.getOrigin() + '/parties/code/' + code);
  },

  async joinParty(partyId, playerId) {
    return this.request(this.getOrigin() + '/parties/' + partyId + '/members', {
      method: 'POST',
      body: { player_id: playerId }
    });
  },

  async getPartyMembers(partyId) {
    return this.request(this.getOrigin() + '/parties/' + partyId + '/members');
  },

  async getPlayerParty(playerId) {
    return this.request(this.getOrigin() + '/players/' + playerId + '/party');
  },

  async createCharacter(playerId, partyId = null) {
    return this.request(this.getOrigin() + '/characters', {
      method: 'POST',
      body: { player_id: playerId, party_id: partyId }
    });
  },

  async loadCharacter(charId) {
    return this.request(this.getOrigin() + '/characters/' + charId);
  },

  async loadPublicCharacter(charId) {
    return this.request(this.getOrigin() + '/characters/' + charId + '/public');
  },

  async saveCharacter(charId, data) {
    return this.request(this.getOrigin() + '/characters/' + charId, {
      method: 'PUT',
      body: { data }
    });
  },

  async listCharacters(playerId) {
    return this.request(this.getOrigin() + '/players/' + playerId + '/characters');
  },

  async listPartyCharacters(partyId) {
    return this.request(this.getOrigin() + '/parties/' + partyId + '/characters');
  },

  async deleteCharacter(charId) {
    return this.request(this.getOrigin() + '/characters/' + charId, { method: 'DELETE' });
  },

  async listNPCs(partyId = null, includeGlobal = true) {
    let url = this.getOrigin() + '/npcs?';
    if (partyId) url += 'partyId=' + partyId + '&';
    if (includeGlobal) url += 'includeGlobal=true';
    return this.request(url);
  },

  async createNPC(partyId, createdBy, npcData) {
    return this.request(this.getOrigin() + '/npcs', {
      method: 'POST',
      body: { party_id: partyId, created_by: createdBy, ...npcData }
    });
  },

  async getSession(partyId) {
    return this.request(this.getOrigin() + '/parties/' + partyId + '/session');
  },

  async updateSession(partyId, sessionData) {
    return this.request(this.getOrigin() + '/parties/' + partyId + '/session', {
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
