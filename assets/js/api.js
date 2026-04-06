const API_URL = 'https://projectcerebro.onrender.com';

const api = {
  async request(endpoint, options = {}) {
    const url = API_URL + endpoint;
    const config = {
      headers: { 'Content-Type': 'application/json' },
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
  
  // Auth
  async register(email, password, username, displayName, role) {
    return this.request('/auth/register', {
      method: 'POST',
      body: { email, password, username, displayName, role }
    });
  },
  
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  },
  
  // Profiles
  async getProfile(userId) {
    return this.request(`/profiles/${userId}`);
  },
  
  // Parties
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
  
  // Characters
  async createCharacter(playerId, partyId = null) {
    return this.request('/characters', {
      method: 'POST',
      body: { player_id: playerId, party_id: partyId }
    });
  },
  
  async loadCharacter(charId) {
    return this.request(`/characters/${charId}`);
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
  
  // NPCs
  async listNPCs(partyId = null, includeGlobal = true) {
    let url = '/npcs';
    if (partyId || includeGlobal) {
      url += '?';
      if (partyId) url += `partyId=${partyId}&`;
      if (includeGlobal) url += 'includeGlobal=true';
    }
    return this.request(url);
  },
  
  async createNPC(partyId, createdBy, npcData) {
    return this.request('/npcs', {
      method: 'POST',
      body: { party_id: partyId, created_by: createdBy, ...npcData }
    });
  },
  
  // Sessions
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

if (typeof window !== 'undefined') {
  window.api = api;
}
