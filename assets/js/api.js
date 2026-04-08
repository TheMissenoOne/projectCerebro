// X-MEN TTRPG API Client - Direct Supabase (for GitHub Pages)
(function() {
  console.log('[api.js] Starting...');
  
  var SUPABASE_URL = 'https://wlpdfrqzbpwuxyqeayjt.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_YqV49fEJhRWGUxBZ7hYfRw_Aghqpp4I';

  var supabaseClient = null;

  function getSupabase() {
    if (!supabaseClient && window.supabase) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
  }

  window.getSupabaseInternal = getSupabase;

  window.api = {
    register: function(email, password, username, displayName, role) {
      return getSupabase().auth.signUp({
        email: email,
        password: password,
        options: {
          data: { username: username, display_name: displayName, role: role || 'player' }
        }
      }).then(function(result) {
        if (result.error) throw result.error;
        return { user: result.data.user, session: result.data.session };
      });
    },

    login: function(email, password) {
      return getSupabase().auth.signInWithPassword({
        email: email,
        password: password
      }).then(function(result) {
        if (result.error) throw result.error;
        return { user: result.data.user, session: result.data.session };
      });
    },

    logout: function() {
      return getSupabase().auth.signOut();
    },

    getProfile: function(userId) {
      return getSupabase().from('profiles').select('*').eq('id', userId).single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    createParty: function(name, gmId) {
      var code = Math.random().toString(36).substring(2, 8).toUpperCase();
      return getSupabase().from('parties').insert({ name: name, gm_id: gmId, code: code }).select().single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    getGMParty: function(gmId) {
      return getSupabase().from('parties').select('*').eq('gm_id', gmId).single()
        .then(function(result) { if (result.error) return null; return result.data; });
    },

    getPartyByCode: function(code) {
      return getSupabase().from('parties').select('*').eq('code', code.toUpperCase()).single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    joinParty: function(partyId, playerId) {
      return getSupabase().from('party_members').insert({ party_id: partyId, player_id: playerId }).select().single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    getPartyMembers: function(partyId) {
      return getSupabase().from('party_members').select('*, profiles(id, username, display_name)').eq('party_id', partyId)
        .then(function(result) { if (result.error) throw result.error; return result.data.map(function(m) {
          m.username = m.profiles?.username || 'Unknown';
          m.display_name = m.profiles?.display_name || m.username;
          return m;
        });});
    },

    getPlayerParty: function(playerId) {
      return getSupabase().from('party_members').select('party_id, parties(*)').eq('player_id', playerId).single()
        .then(function(result) { if (result.error) return null; return result.data.parties; });
    },

    createCharacter: function(playerId, partyId) {
      return getSupabase().from('characters').insert({ player_id: playerId, party_id: partyId || null, name: 'Novo Personagem', is_active: true }).select().single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    loadCharacter: function(charId) {
      return getSupabase().from('characters').select('*').eq('id', charId).single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    loadPublicCharacter: function(charId) {
      return getSupabase().from('characters').select('*').eq('id', charId).single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    saveCharacter: function(charId, data) {
      var updateData = { data: data.data };
      if (data.name !== undefined) updateData.name = data.name;
      if (data.codename !== undefined) updateData.codename = data.codename;
      if (data.foto_base64 !== undefined && data.foto_base64 !== null) updateData.foto_base64 = data.foto_base64;
      return fetch(SUPABASE_URL + '/rest/v1/characters?id=eq.' + charId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(updateData)
      }).then(function(res) {
        if (!res.ok) return res.text().then(function(t) { throw new Error(t); });
        return res.json();
      });
    },

    listCharacters: function(playerId) {
      return getSupabase().from('characters').select('*').eq('player_id', playerId)
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    listPartyCharacters: function(partyId) {
      return getSupabase().from('characters').select('*, profiles(display_name)').eq('party_id', partyId).order('name')
        .then(function(result) { if (result.error) throw result.error; return result.data.map(function(c) {
          c.player_name = c.profiles?.display_name || c.player_id; return c;
        });});
    },

    deleteCharacter: function(charId) {
      return getSupabase().from('characters').delete().eq('id', charId)
        .then(function(result) { if (result.error) throw result.error; });
    },

    listNPCs: function(partyId, includeGlobal) {
      var query = getSupabase().from('npcs').select('*');
      if (partyId) query = query.or('party_id.eq.' + partyId + ',is_global.eq.true');
      else if (includeGlobal !== false) query = query.eq('is_global', true);
      return query.then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    createNPC: function(partyId, npcData) {
      return getSupabase().from('npcs').insert({ party_id: partyId, name: npcData.name, codename: npcData.codename || '', faction: npcData.faction || 'neutro', danger: npcData.danger || 'medio', data: npcData.data || {}, is_global: npcData.is_global || false }).select().single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    updateNPC: function(npcId, npcData) {
      return getSupabase().from('npcs').update({ name: npcData.name, codename: npcData.codename || '', faction: npcData.faction || 'neutro', danger: npcData.danger || 'medio', data: npcData.data || {} }).eq('id', npcId).select().single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    deleteNPC: function(npcId) {
      return getSupabase().from('npcs').delete().eq('id', npcId)
        .then(function(result) { if (result.error) throw result.error; });
    },

    getSession: function(partyId) {
      return getSupabase().from('sessions').select('*').eq('party_id', partyId).order('created_at', { ascending: false }).limit(1).single()
        .then(function(result) { if (result.error) return null; return result.data; });
    },

    updateSession: function(partyId, sessionData) {
      return getSupabase().from('sessions').upsert({ party_id: partyId, round: sessionData.round || 0, notes: sessionData.notes || '', encounter: sessionData.encounter || [], updated_at: new Date().toISOString() }).select().single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    getCurrentUser: function() {
      return getSupabase().auth.getSession().then(function(result) { return result.data.session?.user || null; });
    }
  };

  console.log('[api.js] window.api defined:', typeof window.api);
})();

window.getSupabase = function() { return window.getSupabaseInternal(); };

function requireAuth(requiredRole) {
  var client = window.getSupabaseInternal();
  if (!client) { window.location.href = 'index.html'; return Promise.resolve(null); }
  return client.auth.getSession().then(function(result) {
    var session = result.data.session;
    if (!session) { window.location.href = 'index.html'; return null; }
    var user = session.user;
    var profile = { id: user.id, email: user.email, username: user.user_metadata?.username || user.email.split('@')[0], display_name: user.user_metadata?.display_name || user.user_metadata?.username || 'User', role: user.user_metadata?.role || 'player' };
    if (requiredRole && profile.role !== requiredRole) { window.location.href = 'dashboard.html'; return null; }
    return { session: session, profile: profile };
  });
}

function login(email, password) { return window.api.login(email, password); }
function register(email, password, username, displayName, role) { return window.api.register(email, password, username, displayName, role); }
function logout() { return window.api.logout().then(function() { window.location.href = 'index.html'; }); }

function checkAuth() {
  var client = window.getSupabaseInternal();
  if (!client) { console.warn('Supabase client not initialized'); return; }
  client.auth.getSession().then(function(result) { if (result.data.session) window.location.href = 'dashboard.html'; });
}

function getCurrentUser() {
  var client = window.getSupabaseInternal();
  if (!client) return Promise.resolve(null);
  return client.auth.getSession().then(function(result) { return result.data.session?.user || null; });
}

window.requireAuth = requireAuth;
window.requireGM = function() { return requireAuth('gm'); };
window.login = login;
window.register = register;
window.logout = logout;
window.checkAuth = checkAuth;
window.getCurrentUser = getCurrentUser;
window.getSupabase = getSupabase;

window.setTema = function(tema) {
  var themes = ['yellow', 'red', 'green', 'purple', 'blue'];
  themes.forEach(function(t) { document.body.classList.remove('theme-' + t); });
  document.body.classList.add('theme-' + tema);
  localStorage.setItem('cerebro_tema', tema);
};

window.createParty = function(n, id) { return window.api.createParty(n, id); };
window.getGMParty = function(id) { return window.api.getGMParty(id); };
window.getPartyByCode = function(c) { return window.api.getPartyByCode(c); };
window.joinParty = function(pid, uid) { return window.api.joinParty(pid, uid); };
window.getPartyMembers = function(pid) { return window.api.getPartyMembers(pid); };
window.getPlayerParty = function(uid) { return window.api.getPlayerParty(uid); };
window.createCharacter = function(uid, pid) { return window.api.createCharacter(uid, pid); };
window.listCharacters = function(uid) { return window.api.listCharacters(uid); };
window.listPartyCharacters = function(pid) { return window.api.listPartyCharacters(pid); };
window.getProfile = function(id) { return window.api.getProfile(id); };
window.listNPCs = function(pid, g) { return window.api.listNPCs(pid, g); };
window.createNPC = function(pid, d) { return window.api.createNPC(pid, d); };
window.updateNPC = function(id, d) { return window.api.updateNPC(id, d); };
window.deleteNPC = function(id) { return window.api.deleteNPC(id); };
window.updateSession = function(pid, d) { return window.api.updateSession(pid, d); };
window.saveCharacter = function(id, data) { return window.api.saveCharacter(id, data); };
window.loadCharacter = function(id) { return window.api.loadCharacter(id); };
window.loadPublicCharacter = function(id) { return window.api.loadPublicCharacter(id); };

console.log('[api.js] All functions initialized, window.api:', typeof window.api);