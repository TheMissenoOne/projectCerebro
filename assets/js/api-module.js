/**
 * X-MEN TTRPG - API Module Bridge
 * Legacy compatibility: re-exports from api.js
 * This file is deprecated - use api.js instead
 */

(function() {
  if (!window.api) {
    console.warn('[api-module.js] window.api not found. Ensure api.js loads before api-module.js');
    return;
  }
  
  const stubMethod = (name) => () => {
    console.warn('[api-module.js] ' + name + ' not implemented in api.js');
    return Promise.reject(new Error(name + ' not implemented'));
  };

  const methods = [
    'getProfile', 'getGMParty', 'getPlayerParty', 'getPartyMembers',
    'joinParty', 'createCharacter', 'loadCharacter', 'saveCharacter',
    'listCharacters', 'listPartyCharacters', 'listNPCs'
  ];

  methods.forEach(m => {
    window.api[m] = window.api[m] || stubMethod(m);
  });
  
  console.log('[api-module.js] Bridge initialized - using window.api');
})();