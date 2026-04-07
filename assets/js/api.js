// X-MEN TTRPG API Client
(function() {
  var API_ORIGIN = window.location.origin;
  
  function getOrigin() {
    return API_ORIGIN;
  }
  
  function getSession() {
    try {
      var s = localStorage.getItem('session');
      return s ? JSON.parse(s) : null;
    } catch(e) {
      return null;
    }
  }
  
  function setSession(session) {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session));
    } else {
      localStorage.removeItem('session');
    }
  }
  
  window.api = {
    getOrigin: getOrigin,
    
    request: function(url, options) {
      var session = getSession();
      var headers = {
        'Content-Type': 'application/json'
      };
      
      // Fix: use session.token (not access_token) per IMPLEMENTACAO.md spec
      if (session && session.token) {
        headers['Authorization'] = 'Bearer ' + session.token;
      }
      
      var config = {
        method: (options && options.method) || 'GET',
        headers: headers
      };
      
      if (options && options.body) {
        config.body = JSON.stringify(options.body);
      }
      
      return fetch(url, config).then(function(response) {
        return response.text().then(function(text) {
          var data;
          try {
            data = text ? JSON.parse(text) : {};
          } catch(e) {
            // Clear error when server returns non-JSON (HTML error pages)
            var msg = text.substring(0, 200);
            throw new Error('Server returned non-JSON response (' + response.status + '): ' + msg);
          }
          
          if (!response.ok) {
            throw new Error(data.error || 'Request failed (' + response.status + ')');
          }
          
          return data;
        });
      });
    },
    
    register: function(email, password, username, displayName, role) {
      var self = this;
      return this.request(getOrigin() + '/auth/register', {
        method: 'POST',
        body: {
          email: email,
          password: password,
          username: username,
          displayName: displayName,
          role: role || 'player'
        }
      }).then(function(data) {
        if (data.session) {
          setSession(data.session);
        }
        return data;
      });
    },
    
    login: function(email, password) {
      return this.request(getOrigin() + '/auth/login', {
        method: 'POST',
        body: {
          email: email,
          password: password
        }
      }).then(function(data) {
        if (data.session) {
          setSession(data.session);
        }
        return data;
      });
    },
    
    getProfile: function(userId) {
      return this.request(getOrigin() + '/profiles/' + userId);
    },
    
    createParty: function(name, gmId) {
      return this.request(getOrigin() + '/parties', {
        method: 'POST',
        body: { name: name, gm_id: gmId }
      });
    },
    
    getGMParty: function(gmId) {
      return this.request(getOrigin() + '/parties/gm/' + gmId);
    },
    
    getPartyByCode: function(code) {
      return this.request(getOrigin() + '/parties/code/' + code);
    },
    
    joinParty: function(partyId, playerId) {
      return this.request(getOrigin() + '/parties/' + partyId + '/members', {
        method: 'POST',
        body: { player_id: playerId }
      });
    },
    
    getPartyMembers: function(partyId) {
      return this.request(getOrigin() + '/parties/' + partyId + '/members');
    },
    
    getPlayerParty: function(playerId) {
      return this.request(getOrigin() + '/players/' + playerId + '/party');
    },
    
    createCharacter: function(playerId, partyId) {
      return this.request(getOrigin() + '/characters', {
        method: 'POST',
        body: { player_id: playerId, party_id: partyId || null }
      });
    },
    
    loadCharacter: function(charId) {
      return this.request(getOrigin() + '/characters/' + charId);
    },
    
    loadPublicCharacter: function(charId) {
      return this.request(getOrigin() + '/characters/' + charId + '/public');
    },
    
    saveCharacter: function(charId, data) {
      return this.request(getOrigin() + '/characters/' + charId, {
        method: 'PUT',
        body: { data: data }
      });
    },
    
    listCharacters: function(playerId) {
      return this.request(getOrigin() + '/players/' + playerId + '/characters');
    },
    
    listPartyCharacters: function(partyId) {
      return this.request(getOrigin() + '/parties/' + partyId + '/characters');
    },
    
    deleteCharacter: function(charId) {
      return this.request(getOrigin() + '/characters/' + charId, { method: 'DELETE' });
    },
    
    listNPCs: function(partyId, includeGlobal) {
      var url = getOrigin() + '/npcs?';
      if (partyId) url += 'partyId=' + partyId + '&';
      if (includeGlobal !== false) url += 'includeGlobal=true';
      return this.request(url);
    },
    
    createNPC: function(partyId, npcData) {
      return this.request(getOrigin() + '/npcs', {
        method: 'POST',
        body: {
          party_id: partyId,
          name: npcData.name,
          codename: npcData.codename || '',
          faction: npcData.faction || 'neutro',
          danger: npcData.danger || 'medio',
          data: npcData.data || {}
        }
      });
    },
    
    getSession: function(partyId) {
      return this.request(getOrigin() + '/parties/' + partyId + '/session');
    },
    
    updateSession: function(partyId, sessionData) {
      return this.request(getOrigin() + '/parties/' + partyId + '/session', {
        method: 'POST',
        body: sessionData
      });
    },
    
    updateNPC: function(npcId, npcData) {
      return this.request(getOrigin() + '/npcs/' + npcId, {
        method: 'PUT',
        body: {
          name: npcData.name,
          codename: npcData.codename || '',
          faction: npcData.faction || 'neutro',
          danger: npcData.danger || 'medio',
          data: npcData.data || {}
        }
      });
    },
    
    deleteNPC: function(npcId) {
      return this.request(getOrigin() + '/npcs/' + npcId, { method: 'DELETE' });
    }
  };
  
  // Global aliases so dashboard.html can call bare function names
  window.createParty = window.api.createParty;
  window.getGMParty = window.api.getGMParty;
  window.getPartyByCode = window.api.getPartyByCode;
  window.joinParty = window.api.joinParty;
  window.getPartyMembers = window.api.getPartyMembers;
  window.getPlayerParty = window.api.getPlayerParty;
  window.createCharacter = window.api.createCharacter;
  window.listCharacters = window.api.listCharacters;
  window.listPartyCharacters = window.api.listPartyCharacters;
  window.getProfile = window.api.getProfile;
  window.listNPCs = window.api.listNPCs;
  window.createNPC = window.api.createNPC;
  window.updateNPC = window.api.updateNPC;
  window.deleteNPC = window.api.deleteNPC;
  window.updateSession = window.api.updateSession;
})();

function checkAuth() {
  var session;
  try {
    var s = localStorage.getItem('session');
    session = s ? JSON.parse(s) : null;
  } catch(e) {
    session = null;
  }
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

function getCurrentUser() {
  try {
    var s = localStorage.getItem('session');
    var session = s ? JSON.parse(s) : null;
    return session ? session.user : null;
  } catch(e) {
    return null;
  }
}

function logout() {
  localStorage.removeItem('session');
  window.location.href = 'index.html';
}

window.checkAuth = checkAuth;
window.getCurrentUser = getCurrentUser;
window.logout = logout;
