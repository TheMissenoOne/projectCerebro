/**
 * X-MEN TTRPG - API Service
 * Unified API layer using Supabase
 */

const ApiService = {
  _client: null,
  
  init(client) {
    this._client = client;
  },
  
  // Profile operations
  async getProfile(userId) {
    const { data } = await this._client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return data;
  },
  
  async updateProfile(userId, updates) {
    const { data, error } = await this._client
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  // Party operations
  async getPlayerParty(playerId) {
    const { data } = await this._client
      .from('party_members')
      .select('party_id')
      .eq('player_id', playerId)
      .limit(1)
      .single();
    
    if (!data) return null;
    
    const { data: party } = await this._client
      .from('parties')
      .select('*')
      .eq('id', data.party_id)
      .single();
    return party;
  },
  
  async getGMParty(gmId) {
    const { data } = await this._client
      .from('parties')
      .select('*')
      .eq('gm_id', gmId)
      .limit(1)
      .single();
    return data;
  },
  
  async createParty(name, gmId) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await this._client
      .from('parties')
      .insert({ name, gm_id: gmId, code })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async getPartyByCode(code) {
    const { data } = await this._client
      .from('parties')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();
    return data;
  },
  
  async joinParty(partyId, playerId) {
    const { error } = await this._client
      .from('party_members')
      .insert({ party_id: partyId, player_id: playerId });
    if (error) throw error;
  },
  
  async getPartyMembers(partyId) {
    const { data } = await this._client
      .from('party_members')
      .select('player_id')
      .eq('party_id', partyId);
    
    if (!data || data.length === 0) return [];
    
    const playerIds = data.map(m => m.player_id);
    
    const { data: profiles } = await this._client
      .from('profiles')
      .select('id, username, display_name')
      .in('id', playerIds);
    
    return data.map(m => {
      const profile = profiles?.find(p => p.id === m.player_id);
      return {
        player_id: m.player_id,
        username: profile?.username || 'Unknown',
        display_name: profile?.display_name || profile?.username || 'Unknown'
      };
    });
  },
  
  // Character operations
  async createCharacter(playerId, partyId) {
    const { data, error } = await this._client
      .from('characters')
      .insert({ player_id: playerId, party_id: partyId, name: 'Novo Personagem', is_active: true })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async loadCharacter(charId) {
    const { data } = await this._client
      .from('characters')
      .select('*')
      .eq('id', charId)
      .single();
    return data;
  },
  
  async saveCharacter(charId, updates) {
    const { data, error } = await this._client
      .from('characters')
      .update(updates)
      .eq('id', charId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async listCharacters(playerId) {
    const { data } = await this._client
      .from('characters')
      .select('*')
      .eq('player_id', playerId)
      .order('name');
    return data || [];
  },
  
  async listPartyCharacters(partyId) {
    const { data } = await this._client
      .from('characters')
      .select('*, profiles(display_name)')
      .eq('party_id', partyId)
      .order('name');
    return data || [];
  },
  
  async listAllGMCharacters(gmId) {
    const { data: parties } = await this._client
      .from('parties')
      .select('id')
      .eq('gm_id', gmId);
    
    if (!parties || parties.length === 0) return [];
    
    const partyIds = parties.map(p => p.id);
    
    const { data } = await this._client
      .from('characters')
      .select('id, player_id, party_id, name, is_active')
      .in('party_id', partyIds)
      .order('name');
    
    return (data || []).map(c => ({
      ...c,
      player_name: c.player_id?.substring(0, 8) || 'Unknown',
      party_name: parties.find(p => p.id === c.party_id)?.name || 'Unknown'
    }));
  },
  
  // NPC operations
  async listNPCs(gmId) {
    const { data } = await this._client
      .from('npcs')
      .select('*')
      .eq('gm_id', gmId)
      .order('name');
    return data || [];
  },
  
  async createNPC(gmId, npc) {
    const { data, error } = await this._client
      .from('npcs')
      .insert({ ...npc, gm_id: gmId })
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async updateNPC(npcId, updates) {
    const { data, error } = await this._client
      .from('npcs')
      .update(updates)
      .eq('id', npcId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  
  async deleteNPC(npcId) {
    const { error } = await this._client
      .from('npcs')
      .delete()
      .eq('id', npcId);
    if (error) throw error;
  }
};

window.ApiService = ApiService;