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
  
  window.api.getProfile = window.api.getProfile || function() {};
  window.api.getGMParty = window.api.getGMParty || function() {};
  window.api.getPlayerParty = window.api.getPlayerParty || function() {};
  window.api.getPartyMembers = window.api.getPartyMembers || function() {};
  window.api.joinParty = window.api.joinParty || function() {};
  window.api.createCharacter = window.api.createCharacter || function() {};
  window.api.loadCharacter = window.api.loadCharacter || function() {};
  window.api.saveCharacter = window.api.saveCharacter || function() {};
  window.api.listCharacters = window.api.listCharacters || function() {};
  window.api.listPartyCharacters = window.api.listPartyCharacters || function() {};
  window.api.listNPCs = window.api.listNPCs || function() {};
  
  console.log('[api-module.js] Bridge initialized - using window.api');
})();