// X-MEN TTRPG API Client - Direct Supabase (for GitHub Pages)
(function() {
  console.log('[api.js] Starting...');
  
  // Load GM whitelist from global
  var GM_WHITELIST = (typeof window.GM_WHITELIST !== 'undefined') ? window.GM_WHITELIST : [];
  
  var supabaseClient = null;

  function getSupabase() {
    if (!supabaseClient && window.supabase && window.SUPABASE_CONFIG) {
      supabaseClient = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
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
        // Check if user is in GM whitelist
        if (GM_WHITELIST.indexOf(email.toLowerCase()) !== -1) {
          result.data.user.user_metadata = result.data.user.user_metadata || {};
          result.data.user.user_metadata.role = 'gm';
          result.data.user.user_metadata.username = 'GM';
          result.data.user.user_metadata.display_name = 'GM';
        }
        // Fetch role from profiles table
        return getSupabase().from('profiles').select('role,username,display_name').eq('id', result.data.user.id).single().then(function(profResult) {
          var user = result.data.user;
          if (profResult.data) {
            user.user_metadata = user.user_metadata || {};
            user.user_metadata.role = profResult.data.role || 'player';
            user.user_metadata.username = profResult.data.username || user.user_metadata.username;
            user.user_metadata.display_name = profResult.data.display_name || user.user_metadata.display_name;
          }
          return { user: user, session: result.data.session };
        }).catch(function() {
          return { user: result.data.user, session: result.data.session };
        });
      });
    },

    logout: function() {
      return getSupabase().auth.signOut();
    },

    getProfile: function(userId, forceRefresh) {
      var cache = window.cache;
      if (!forceRefresh && cache) {
        var cached = cache.get('profile', userId);
        if (cached) return Promise.resolve(cached);
      }
      return getSupabase().from('profiles').select('*').eq('id', userId).single()
        .then(function(result) { 
          if (result.error) throw result.error; 
          if (cache) cache.set('profile', userId, result.data, 300000);
          return result.data; 
        });
    },

    createParty: function(name, gmId) {
      var code = Math.random().toString(36).substring(2, 8).toUpperCase();
      return getSupabase().from('parties').insert({ name: name, gm_id: gmId, code: code }).select().single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    getGMParty: function(gmId, forceRefresh) {
      var cache = window.cache;
      if (!forceRefresh && cache) {
        var cached = cache.get('gm_party', gmId);
        if (cached) return Promise.resolve(cached);
      }
      return getSupabase().from('parties').select('*').eq('gm_id', gmId).single()
        .then(function(result) { 
          if (result.error) return null; 
          if (cache && result.data) cache.set('gm_party', gmId, result.data, 300000);
          return result.data; 
        });
    },

    getPartyByCode: function(code) {
      return getSupabase().from('parties').select('*').eq('code', code.toUpperCase()).single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    joinParty: function(partyId, playerId) {
      var cache = window.cache;
      return getSupabase().from('party_members').insert({ party_id: partyId, player_id: playerId }).select().single()
        .then(function(result) { 
          if (result.error) throw result.error; 
          if (cache) cache.invalidate('player_party', playerId);
          return result.data; 
        });
    },

    getPartyMembers: function(partyId, forceRefresh) {
      var cache = window.cache;
      if (!forceRefresh && cache) {
        var cached = cache.get('party_members', partyId);
        if (cached) return Promise.resolve(cached);
      }
      return getSupabase().from('party_members').select('player_id').eq('party_id', partyId)
        .then(function(result) { if (result.error) throw result.error; return result.data || []; })
        .then(function(members) {
          if (!members || members.length === 0) return [];
          var playerIds = members.map(function(m) { return m.player_id; });
          return getSupabase().from('profiles').select('id, username, display_name').in('id', playerIds)
            .then(function(profiles) {
              if (profiles.error) throw profiles.error;
              var mapped = members.map(function(m) {
                var profile = profiles.data ? profiles.data.find(function(p) { return p.id === m.player_id; }) : null;
                m.username = profile?.username || 'Unknown';
                m.display_name = profile?.display_name || m.username;
                return m;
              });
              if (cache) cache.set('party_members', partyId, mapped, 300000);
              return mapped;
            });
        });
    },

    getPlayerParty: function(playerId, forceRefresh) {
      var cache = window.cache;
      if (!forceRefresh && cache) {
        var cached = cache.get('player_party', playerId);
        if (cached) return Promise.resolve(cached);
      }
      return getSupabase().from('party_members').select('party_id').eq('player_id', playerId).limit(1)
        .then(function(result) { 
          if (result.error || !result.data || result.data.length === 0) return null; 
          return getSupabase().from('parties').select('*').eq('id', result.data[0].party_id).single()
            .then(function(p) { 
              if (cache && p.data) cache.set('player_party', playerId, p.data, 300000);
              return p.data || null; 
            });
        });
    },

    createCharacter: function(playerId, partyId) {
      var cache = window.cache;
      return getSupabase().from('characters').insert({ player_id: playerId, party_id: partyId || null, name: 'Novo Personagem', is_active: true }).select().single()
        .then(function(result) { 
          if (result.error) throw result.error; 
          if (cache) cache.invalidatePattern('chars');
          return result.data; 
        });
    },

    loadCharacter: function(charId, forceRefresh) {
      var cache = window.cache;
      if (!forceRefresh && cache) {
        var cached = cache.get('char', charId);
        if (cached) return Promise.resolve(cached);
      }
      return getSupabase().from('characters').select('*').eq('id', charId).single()
        .then(function(result) { 
          if (result.error) throw result.error; 
          result.data.nome = result.data.nome || result.data.name || null;
          if (cache) cache.set('char', charId, result.data, 120000);
          return result.data; 
        });
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
      return getSupabase().from('characters').update(updateData).eq('id', charId).select().single()
        .then(function(result) { 
          if (result.error) throw result.error;
          if (window.cache) window.cache.set('char', charId, result.data, 120000);
          return result.data; 
        });
    },

    listCharacters: function(playerId, forceRefresh) {
      var cache = window.cache;
      if (!forceRefresh && cache) {
        var cached = cache.get('chars', playerId);
        if (cached) return Promise.resolve(cached);
      }
      return getSupabase().from('characters').select('*').eq('player_id', playerId)
        .then(function(result) { 
          if (result.error) throw result.error; 
          if (cache) cache.set('chars', playerId, result.data, 120000);
          return result.data; 
        });
    },

    listPartyCharacters: function(partyId, forceRefresh) {
      var cache = window.cache;
      if (!forceRefresh && cache) {
        var cached = cache.get('party_chars', partyId);
        if (cached) return Promise.resolve(cached);
      }
      return getSupabase().from('characters').select('*, player_id').eq('party_id', partyId).order('name')
        .then(function(result) { 
          if (result.error) throw result.error;
          var chars = result.data;
          if (!chars || chars.length === 0) return [];
          var playerIds = chars.map(function(c) { return c.player_id; });
          return getSupabase().from('profiles').select('id, display_name').in('id', playerIds)
            .then(function(profiles) {
              var profileMap = {};
              if (profiles.data) profiles.data.forEach(function(p) { profileMap[p.id] = p.display_name; });
              var mapped = chars.map(function(c) {
                c.player_name = profileMap[c.player_id] || c.player_id;
                return c;
              });
              if (cache) cache.set('party_chars', partyId, mapped, 300000);
              return mapped;
            });
        });
    },

    deleteCharacter: function(charId) {
      return getSupabase().from('characters').delete().eq('id', charId)
        .then(function(result) { if (result.error) throw result.error; });
    },

    listAllGMCharacters: function(gmId, forceRefresh) {
      var cache = window.cache;
      var key = 'gm_chars_' + gmId;
      if (!forceRefresh && cache) {
        var cached = cache.get('gm_chars', key);
        if (cached) return Promise.resolve(cached);
      }
      return getSupabase().from('parties').select('id, name').eq('gm_id', gmId)
        .then(function(result) { 
          if (result.error) throw result.error;
          var partyIds = result.data.map(function(p) { return p.id; });
          var partyNames = {};
          result.data.forEach(function(p) { partyNames[p.id] = p.name; });
          if (partyIds.length === 0) return [];
          return getSupabase().from('characters').select('*, player_id')
            .in('party_id', partyIds)
            .then(function(r) { 
              if (r.error) throw r.error;
              var chars = r.data;
              if (!chars || chars.length === 0) return [];
              var playerIds = chars.map(function(c) { return c.player_id; });
              console.log('[listAllGMCharacters] playerIds:', playerIds);
              return getSupabase().from('profiles').select('id, display_name').in('id', playerIds)
                .then(function(profiles) {
                  if (profiles.error) console.error('[listAllGMCharacters] profiles error:', profiles.error);
                  console.log('[listAllGMCharacters] profiles:', profiles);
                  var profileMap = {};
                  if (profiles.data) profiles.data.forEach(function(p) { profileMap[p.id] = p.display_name; });
                  console.log('[listAllGMCharacters] profileMap:', profileMap);
                  var mapped = chars.map(function(c) {
                    c.player_name = profileMap[c.player_id] || c.player_id;
                    c.party_name = partyNames[c.party_id] || null;
                    return c;
                  });
                  if (cache) cache.set('gm_chars', key, mapped, 300000);
                  return mapped;
                });
            });
        })
        .catch(function(err) {
          console.error('[listAllGMCharacters error]', err);
          return [];
        });
    },

    listNPCs: function(partyId, includeGlobal, forceRefresh) {
      var cache = window.cache;
      var key = partyId ? 'npcs_' + partyId : 'npcs_global';
      if (!forceRefresh && cache) {
        var cached = cache.get('npcs', key);
        if (cached) return Promise.resolve(cached);
      }
      var query = getSupabase().from('npcs').select('*');
      if (partyId) query = query.or('party_id.eq.' + partyId + ',is_global.eq.true');
      else if (includeGlobal !== false) query = query.eq('is_global', true);
      return query.then(function(result) { 
        if (result.error) throw result.error; 
        if (cache) cache.set('npcs', key, result.data, 300000);
        return result.data; 
      });
    },
    listAllNPCs: function() {
      return getSupabase().from('npcs').select('*')
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    createNPC: function(partyId, npcData) {
      return getSupabase().from('npcs').insert({ party_id: partyId, name: npcData.name, codename: npcData.codename || '', faction: npcData.faction || 'neutro', danger: npcData.danger || 'medio', data: npcData.data || {}, is_global: npcData.is_global || false }).select().single()
        .then(function(result) { if (result.error) throw result.error; return result.data; });
    },

    updateNPC: function(npcId, npcData) {
      return getSupabase().from('npcs').update({ 
        name: npcData.name, 
        codename: npcData.codename || '', 
        faction: npcData.faction || 'neutro', 
        danger: npcData.danger || 'medio', 
        iniciativa: npcData.iniciativa || 0,
        atributos: npcData.atributos || {},
        tags: npcData.tags || [],
        descricao: npcData.descricao || ''
      }).eq('id', npcId).select().single()
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
    // Check if user is in GM whitelist
    if (typeof GM_WHITELIST !== 'undefined' && GM_WHITELIST.indexOf(user.email.toLowerCase()) !== -1) {
      var profile = { id: user.id, email: user.email, username: 'GM', display_name: 'GM', role: 'gm' };
      return { session: session, profile: profile };
    }
    // Try to get role from profiles table first
    return client.from('profiles').select('role').eq('id', user.id).single().then(function(profResult) {
      var role = (profResult.data && profResult.data.role) || user.user_metadata?.role || 'player';
      var profile = { id: user.id, email: user.email, username: user.user_metadata?.username || user.email.split('@')[0], display_name: user.user_metadata?.display_name || user.user_metadata?.username || 'User', role: role };
      if (requiredRole && profile.role !== requiredRole) { window.location.href = 'dashboard.html'; return null; }
      return { session: session, profile: profile };
    }).catch(function() {
      // Fallback if profiles table doesn't exist
      var profile = { id: user.id, email: user.email, username: user.user_metadata?.username || user.email.split('@')[0], display_name: user.user_metadata?.display_name || user.user_metadata?.username || 'User', role: user.user_metadata?.role || 'player' };
      if (requiredRole && profile.role !== requiredRole) { window.location.href = 'dashboard.html'; return null; }
      return { session: session, profile: profile };
    });
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