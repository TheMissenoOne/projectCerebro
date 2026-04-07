// X-MEN TTRPG API Client
(function() {
  var API_ORIGIN = window.location.origin;
  
  function getOrigin() {
    return API_ORIGIN;
  }
  
  function getSession() {
    try {
      var session = localStorage.getItem('session');
      return session ? JSON.parse(session) : null;
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
      
      if (session && session.access_token) {
        headers['Authorization'] = 'Bearer ' + session.access_token;
      }
      
      var config = {
        method: options.method || 'GET',
        headers: headers
      };
      
      if (options.body) {
        config.body = JSON.stringify(options.body);
      }
      
      return fetch(url, config).then(function(response) {
        return response.text().then(function(text) {
          var data;
          try {
            data = text ? JSON.parse(text) : {};
          } catch(e) {
            data = { error: text };
          }
          
          if (!response.ok) {
            throw new Error(data.error || 'Request failed');
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
    
    createNPC: function(partyId, createdBy, npcData) {
      return this.request(getOrigin() + '/npcs', {
        method: 'POST',
        body: {
          party_id: partyId,
          created_by: createdBy,
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
    }
  };
})();

function checkAuth() {
  var session;
  try {
    session = localStorage.getItem('session');
    session = session ? JSON.parse(session) : null;
  } catch(e) {
    session = null;
  }
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

function getCurrentUser() {
  try {
    var session = localStorage.getItem('session');
    session = session ? JSON.parse(session) : null;
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
