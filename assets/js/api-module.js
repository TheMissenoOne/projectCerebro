/**
 * X-MEN TTRPG - API Module
 * CRUD operations for parties, characters, NPCs, sessions
 */

(function() {
  const client = window.getSupabaseClient;
  const CACHE = window.cache;

  /**
   * Profile operations
   */
  window.api.getProfile = function(userId, forceRefresh) {
    var cached = !forceRefresh && CACHE.get('profile', userId);
    if (cached) return Promise.resolve(cached);

    return client().from('profiles').select('*').eq('id', userId).single()
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.set('profile', userId, result.data, 300000);
        return result.data; 
      });
  };

  /**
   * Party operations
   */
  window.api.createParty = function(name, gmId) {
    var code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return client().from('parties').insert({ name: name, gm_id: gmId, code: code }).select().single()
      .then(function(result) { if (result.error) throw result.error; return result.data; });
  };

  window.api.getGMParty = function(gmId, forceRefresh) {
    var cached = !forceRefresh && CACHE.get('gm_party', gmId);
    if (cached) return Promise.resolve(cached);

    return client().from('parties').select('*').eq('gm_id', gmId).single()
      .then(function(result) { 
        if (result.error) return null; 
        if (result.data) CACHE.set('gm_party', gmId, result.data, 300000);
        return result.data; 
      });
  };

  window.api.getPartyByCode = function(code) {
    return client().from('parties').select('*').eq('code', code.toUpperCase()).single()
      .then(function(result) { if (result.error) throw result.error; return result.data; });
  };

  window.api.joinParty = function(partyId, playerId) {
    return client().from('party_members').insert({ party_id: partyId, player_id: playerId }).select().single()
      .then(function(result) { if (result.error) throw result.error; return result.data; })
      .then(function(data) {
        CACHE.invalidate('player_party', playerId);
        return data;
      });
  };

  window.api.getPartyMembers = function(partyId, forceRefresh) {
    var cached = !forceRefresh && CACHE.get('party_members', partyId);
    if (cached) return Promise.resolve(cached);

    return client().from('party_members').select('player_id').eq('party_id', partyId)
      .then(function(result) { if (result.error) throw result.error; return result.data; })
      .then(function(members) {
        if (!members || members.length === 0) return [];
        var playerIds = members.map(function(m) { return m.player_id; });
        return client().from('profiles').select('id, username, display_name').in('id', playerIds)
          .then(function(profiles) {
            if (profiles.error) throw profiles.error;
            var mapped = members.map(function(m) {
              var profile = profiles.data.find(function(p) { return p.id === m.player_id; });
              m.username = profile?.username || 'Unknown';
              m.display_name = profile?.display_name || m.username;
              return m;
            });
            CACHE.set('party_members', partyId, mapped, 300000);
            return mapped;
          });
      });
  };

  window.api.getPlayerParty = function(playerId, forceRefresh) {
    var cached = !forceRefresh && CACHE.get('player_party', playerId);
    if (cached) return Promise.resolve(cached);

    return client().from('party_members').select('party_id').eq('player_id', playerId).limit(1)
      .then(function(result) { 
        if (result.error || !result.data || result.data.length === 0) return null; 
        return client().from('parties').select('*').eq('id', result.data[0].party_id).single()
          .then(function(p) { 
            if (p.data) CACHE.set('player_party', playerId, p.data, 300000);
            return p.data || null; 
          });
      });
  };

  window.api.getGMParty = function(gmId) {
    return client().from('parties').select('*').eq('gm_id', gmId).limit(1)
      .then(function(result) { if (result.error || !result.data || result.data.length === 0) return null; return result.data[0]; });
  };

  /**
   * Character operations
   */
window.api.createCharacter = function(playerId, partyId) {
      var insertData = { player_id: playerId, party_id: partyId || null, name: 'Novo Personagem', is_active: true };
      
      return client().from('characters').insert(insertData)
        .then(function(result) { 
          if (result.error) throw result.error; 
          CACHE.invalidatePattern('chars');
          return client().from('characters').select('id').eq('player_id', playerId).order('created_at', { ascending: false }).limit(1).single()
            .then(function(selectResult) {
              if (selectResult.error || !selectResult.data) throw selectResult.error || new Error('Could not find created character');
              return selectResult.data;
            });
        });
    };

  window.api.loadCharacter = function(charId, forceRefresh) {
    var cached = !forceRefresh && CACHE.get('char', charId);
    if (cached) return Promise.resolve(cached);

    return client().from('characters').select('*').eq('id', charId).single()
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.set('char', charId, result.data, 120000);
        return result.data; 
      });
  };

  window.api.loadPublicCharacter = function(charId) {
    return client().from('characters').select('*').eq('id', charId).single()
      .then(function(result) { if (result.error) throw result.error; return result.data; });
  };

  window.api.saveCharacter = function(charId, data) {
    var updateData = { data: data.data };
    if (data.name !== undefined) updateData.name = data.name;
    if (data.codename !== undefined) updateData.codename = data.codename;
    if (data.foto_base64 !== undefined && data.foto_base64 !== null) updateData.foto_base64 = data.foto_base64;
    
    var config = window.SUPABASE_CONFIG;
    return fetch(config.url + '/rest/v1/characters?id=eq.' + charId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.anonKey,
        'Authorization': 'Bearer ' + config.anonKey,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(updateData)
    }).then(function(res) {
      if (!res.ok) return res.text().then(function(t) { throw new Error(t); });
      CACHE.set('char', charId, Object.assign({}, updateData, { id: charId }), 120000);
      return res.json();
    });
  };

  window.api.listCharacters = function(playerId, forceRefresh) {
    var cached = !forceRefresh && CACHE.get('chars', playerId);
    if (cached) return Promise.resolve(cached);

    return client().from('characters').select('*').eq('player_id', playerId)
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.set('chars', playerId, result.data, 120000);
        return result.data; 
      });
  };

  window.api.listPartyCharacters = function(partyId, forceRefresh) {
    var cached = !forceRefresh && CACHE.get('party_chars', partyId);
    if (cached) return Promise.resolve(cached);

    return client().from('characters').select('*, profiles(display_name)').eq('party_id', partyId).order('name')
      .then(function(result) { 
        if (result.error) throw result.error; 
        var mapped = result.data.map(function(c) {
          c.player_name = c.profiles?.display_name || c.player_id; return c;
        });
        CACHE.set('party_chars', partyId, mapped, 300000);
        return mapped;
      });
  };

  window.api.listAllGMCharacters = function(gmId) {
    return client().from('parties').select('id,name')
      .eq('gm_id', gmId)
      .then(function(result) { 
        if (result.error) throw result.error; 
        return result.data; 
      })
      .then(function(parties) {
        if (!parties || parties.length === 0) return [];
        var partyIds = parties.map(function(p) { return p.id; });
        
        return client().from('characters').select('id,player_id,party_id,name,is_active')
          .in('party_id', partyIds).order('name')
          .then(function(r) { 
            if (r.error) throw r.error; 
            return r.data.map(function(c) {
              c.player_name = c.player_id ? 'Player ' + c.player_id.substring(0,8) : 'Unknown';
              c.party_name = parties.find(function(p) { return p.id === c.party_id; })?.name || 'Unknown';
              return c;
            });
          });
      });
  };

  window.api.deleteCharacter = function(charId) {
    return client().from('characters').delete().eq('id', charId)
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.invalidate('char', charId);
        CACHE.invalidatePattern('chars');
      });
  };

  /**
   * NPC operations
   */
  window.api.listNPCs = function(partyId, includeGlobal, forceRefresh) {
    var key = partyId ? 'npcs_' + partyId : 'npcs_global';
    var cached = !forceRefresh && CACHE.get('npcs', key);
    if (cached) return Promise.resolve(cached);

    var query = client().from('npcs').select('*');
    if (partyId) query = query.or('party_id.eq.' + partyId + ',is_global.eq.true');
    else if (includeGlobal !== false) query = query.eq('is_global', true);
    return query.then(function(result) { 
      if (result.error) throw result.error; 
      CACHE.set('npcs', key, result.data, 300000);
      return result.data; 
    });
  };

  window.api.listAllNPCs = function(forceRefresh) {
    var cached = !forceRefresh && CACHE.get('npcs', 'all');
    if (cached) return Promise.resolve(cached);

    return client().from('npcs').select('*')
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.set('npcs', 'all', result.data, 300000);
        return result.data; 
      });
  };

  window.api.createNPC = function(partyId, npcData) {
    return client().from('npcs').insert({ 
      party_id: partyId, 
      name: npcData.name, 
      codename: npcData.codename || '', 
      faction: npcData.faction || 'neutro', 
      danger: npcData.danger || 'medio', 
      data: npcData.data || {}, 
      is_global: npcData.is_global || false 
    }).select().single()
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.invalidatePattern('npcs');
        return result.data; 
      });
  };

  window.api.updateNPC = function(npcId, npcData) {
    return client().from('npcs').update({ 
      name: npcData.name, 
      codename: npcData.codename || '', 
      faction: npcData.faction || 'neutro', 
      danger: npcData.danger || 'medio', 
      data: npcData.data || {} 
    }).eq('id', npcId).select().single()
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.invalidatePattern('npcs');
        return result.data; 
      });
  };

  window.api.deleteNPC = function(npcId) {
    return client().from('npcs').delete().eq('id', npcId)
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.invalidatePattern('npcs');
      });
  };

  /**
   * Session operations
   */
  window.api.getSession = function(partyId, forceRefresh) {
    var cached = !forceRefresh && CACHE.get('session', partyId);
    if (cached) return Promise.resolve(cached);

    return client().from('sessions').select('*').eq('party_id', partyId).order('created_at', { ascending: false }).limit(1).single()
      .then(function(result) { 
        if (result.error) return null; 
        if (result.data) CACHE.set('session', partyId, result.data);
        return result.data; 
      });
  };

  window.api.updateSession = function(partyId, sessionData) {
    return client().from('sessions').upsert({ 
      party_id: partyId, 
      round: sessionData.round || 0, 
      notes: sessionData.notes || '', 
      encounter: sessionData.encounter || [], 
      updated_at: new Date().toISOString() 
    }).select().single()
      .then(function(result) { 
        if (result.error) throw result.error; 
        CACHE.set('session', partyId, result.data);
        return result.data; 
      });
  };

})();