// X-MEN TTRPG API Client
var api = (function() {
  function getOrigin() {
    return window.location.origin;
  }
  
  async function request(url, options) {
    var session = JSON.parse(localStorage.getItem('session') || '{}');
    console.log('Request:', (options.method || 'GET'), url);
    console.log('Session:', session);
    
    var config = {
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    };
    
    if (session && session.access_token) {
      config.headers['Authorization'] = 'Bearer ' + session.access_token;
    }
    
    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
      console.log('Body:', config.body);
    }
    
    var response = await fetch(url, config);
    console.log('Response status:', response.status);
    
    var data;
    var text = await response.text();
    console.log('Response text:', text.substring(0, 500));
    
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      data = { error: text || 'Invalid response' };
    }
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed: ' + response.status);
    }
    
    return data;
  }

  return {
    getOrigin: getOrigin,
    request: request,
    
    register: function(email, password, username, displayName, role) {
      console.log('API: calling register...');
      return request(getOrigin() + '/auth/register', {
        method: 'POST',
        body: { email: email, password: password, username: username, displayName: displayName, role: role }
      }).then(function(data) {
        console.log('API: register response:', data);
        if (data.session) {
          localStorage.setItem('session', JSON.stringify(data.session));
          console.log('API: session saved');
        }
        return data;
      });
    },

    login: function(email, password) {
      console.log('API: calling login...');
      return request(getOrigin() + '/auth/login', {
        method: 'POST',
        body: { email: email, password: password }
      }).then(function(data) {
        console.log('API: login response:', data);
        if (data.session) {
          localStorage.setItem('session', JSON.stringify(data.session));
          console.log('API: session saved');
        }
        return data;
      });
    },

    getProfile: function(userId) {
      return request(getOrigin() + '/profiles/' + userId);
    },

    createParty: function(name, gmId) {
      return request(getOrigin() + '/parties', {
        method: 'POST',
        body: { name: name, gm_id: gmId }
      });
    },

    getGMParty: function(gmId) {
      return request(getOrigin() + '/parties/gm/' + gmId);
    },

    getPartyByCode: function(code) {
      return request(getOrigin() + '/parties/code/' + code);
    },

    joinParty: function(partyId, playerId) {
      return request(getOrigin() + '/parties/' + partyId + '/members', {
        method: 'POST',
        body: { player_id: playerId }
      });
    },

    getPartyMembers: function(partyId) {
      return request(getOrigin() + '/parties/' + partyId + '/members');
    },

    getPlayerParty: function(playerId) {
      return request(getOrigin() + '/players/' + playerId + '/party');
    },

    createCharacter: function(playerId, partyId) {
      return request(getOrigin() + '/characters', {
        method: 'POST',
        body: { player_id: playerId, party_id: partyId }
      });
    },

    loadCharacter: function(charId) {
      return request(getOrigin() + '/characters/' + charId);
    },

    loadPublicCharacter: function(charId) {
      return request(getOrigin() + '/characters/' + charId + '/public');
    },

    saveCharacter: function(charId, data) {
      return request(getOrigin() + '/characters/' + charId, {
        method: 'PUT',
        body: { data: data }
      });
    },

    listCharacters: function(playerId) {
      return request(getOrigin() + '/players/' + playerId + '/characters');
    },

    listPartyCharacters: function(partyId) {
      return request(getOrigin() + '/parties/' + partyId + '/characters');
    },

    deleteCharacter: function(charId) {
      return request(getOrigin() + '/characters/' + charId, { method: 'DELETE' });
    },

    listNPCs: function(partyId, includeGlobal) {
      var url = getOrigin() + '/npcs?';
      if (partyId) url += 'partyId=' + partyId + '&';
      if (includeGlobal) url += 'includeGlobal=true';
      return request(url);
    },

    createNPC: function(partyId, createdBy, npcData) {
      return request(getOrigin() + '/npcs', {
        method: 'POST',
        body: { party_id: partyId, created_by: createdBy, ...npcData }
      });
    },

    getSession: function(partyId) {
      return request(getOrigin() + '/parties/' + partyId + '/session');
    },

    updateSession: function(partyId, sessionData) {
      return request(getOrigin() + '/parties/' + partyId + '/session', {
        method: 'POST',
        body: sessionData
      });
    }
  };
})();

async function getSession() {
  return JSON.parse(localStorage.getItem('session'));
}

function getCurrentUser() {
  var session = JSON.parse(localStorage.getItem('session'));
  return session ? session.user : null;
}

async function logout() {
  localStorage.removeItem('session');
  window.location.href = 'index.html';
}

window.api = api;
window.getSession = getSession;
window.getCurrentUser = getCurrentUser;
window.logout = logout;