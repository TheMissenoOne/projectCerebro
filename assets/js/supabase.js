const SUPABASE_URL = 'https://wlpdfrqzbpwuxyqeayjt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscGRmcnF6YnB3dXh5cWVheWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDQwODYsImV4cCI6MjA5MTA4MDA4Nn0.RkLXucAPwp0Edba7nG8pZOXrsOzjjrEbOIFwg-uyRLM';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const api = {
  // Auth
  async register(email, password, username, displayName, role) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, display_name: displayName, role: role || 'player' }
      }
    });
    
    if (error) throw new Error(error.message);
    
    // Create profile if user was created
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        username,
        display_name: displayName,
        role: role || 'player'
      });
    }
    
    return data;
  },
  
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw new Error(error.message);
    return data;
  },

  // Profiles
  async getProfile(userId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    return data;
  },

  // Parties
  async createParty(name, gmId) {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await supabase.from('parties').insert({ name, gm_id: gmId, code }).select().single();
    if (error) throw new Error(error.message);
    return data;
  },
  
  async getGMParty(gmId) {
    const { data } = await supabase.from('parties').select('*').eq('gm_id', gmId).single();
    return data;
  },
  
  async getPartyByCode(code) {
    const { data } = await supabase.from('parties').select('*').eq('code', code.toUpperCase()).single();
    return data;
  },
  
  async joinParty(partyId, playerId) {
    const { error } = await supabase.from('party_members').insert({ party_id: partyId, player_id: playerId });
    if (error) throw new Error(error.message);
    return { success: true };
  },
  
  async getPartyMembers(partyId) {
    const { data } = await supabase.from('party_members').select('*, profiles(*)').eq('party_id', partyId);
    return data || [];
  },
  
  async getPlayerParty(playerId) {
    const { data } = await supabase.from('party_members').select('*, parties(*)').eq('player_id', playerId).single();
    return data?.parties || null;
  },

  // Characters
  async createCharacter(playerId, partyId = null) {
    const id = crypto.randomUUID();
    const { data, error } = await supabase.from('characters').insert({
      id,
      player_id: playerId,
      party_id: partyId,
      name: 'Novo Personagem',
      data: {}
    }).select().single();
    if (error) throw new Error(error.message);
    return data;
  },
  
  async loadCharacter(charId) {
    const { data } = await supabase.from('characters').select('*').eq('id', charId).single();
    return data;
  },
  
  async saveCharacter(charId, data) {
    const { error } = await supabase.from('characters').upsert({
      id: charId,
      data,
      updated_at: new Date().toISOString()
    });
    if (error) throw new Error(error.message);
    return { success: true };
  },
  
  async listCharacters(playerId) {
    const { data } = await supabase.from('characters').select('*').eq('player_id', playerId).order('created_at', { ascending: false });
    return data || [];
  },
  
  async listPartyCharacters(partyId) {
    const { data } = await supabase.from('characters').select('*').eq('party_id', partyId).order('name');
    return data || [];
  },
  
  async deleteCharacter(charId) {
    const { error } = await supabase.from('characters').delete().eq('id', charId);
    if (error) throw new Error(error.message);
    return { success: true };
  },

  // NPCs
  async listNPCs(partyId = null, includeGlobal = true) {
    let query = supabase.from('npcs').select('*').order('name');
    
    if (partyId && includeGlobal) {
      query = query.or(`party_id.eq.${partyId},is_global.eq.true`);
    } else if (partyId) {
      query = query.eq('party_id', partyId);
    } else {
      query = query.eq('is_global', true);
    }
    
    const { data } = await query;
    return data || [];
  },
  
  async createNPC(partyId, createdBy, npcData) {
    const id = crypto.randomUUID();
    const { data, error } = await supabase.from('npcs').insert({
      id,
      party_id: partyId,
      created_by: createdBy,
      name: npcData.name,
      codename: npcData.codename || '',
      faction: npcData.faction || 'neutro',
      danger: npcData.danger || 'medio',
      data: npcData.data || {},
      is_global: false
    }).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Sessions
  async getSession(partyId) {
    const { data } = await supabase.from('sessions').select('*').eq('party_id', partyId).order('created_at', { ascending: false }).limit(1).single();
    return data || null;
  },
  
  async updateSession(partyId, sessionData) {
    const { error } = await supabase.from('sessions').upsert({
      party_id: partyId,
      ...sessionData,
      updated_at: new Date().toISOString()
    });
    if (error) throw new Error(error.message);
    return { success: true };
  }
};

// Helper functions
async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

function getCurrentUser() {
  return supabase.auth.getUser();
}

async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem('session');
}

if (typeof window !== 'undefined') {
  window.supabase = supabase;
  window.api = api;
  window.getSession = getSession;
  window.getCurrentUser = getCurrentUser;
  window.logout = logout;
}
