/**
 * X-MEN TTRPG - Global API Exports
 * Maps all module functions to window for global access
 * Load order: config.js → supabase-client.js → auth-module.js → api-module.js → globals.js
 */

(function() {
  // Auth functions
  window.login = window.api.login;
  window.register = window.api.register;
  window.logout = window.api.logout;
  window.checkAuth = window.checkAuth;
  window.getCurrentUser = window.api.getCurrentUser;
  window.requireAuth = window.requireAuth;
  window.requireGM = window.requireGM;

  // Party functions
  window.createParty = window.api.createParty;
  window.getGMParty = window.api.getGMParty;
  window.getPartyByCode = window.api.getPartyByCode;
  window.joinParty = window.api.joinParty;
  window.getPartyMembers = window.api.getPartyMembers;
  window.getPlayerParty = window.api.getPlayerParty;

  // Character functions
  window.createCharacter = window.api.createCharacter;
  window.loadCharacter = window.api.loadCharacter;
  window.loadPublicCharacter = window.api.loadPublicCharacter;
  window.saveCharacter = window.api.saveCharacter;
  window.listCharacters = window.api.listCharacters;
  window.listPartyCharacters = window.api.listPartyCharacters;
  window.getProfile = window.api.getProfile;
  window.deleteCharacter = window.api.deleteCharacter;

  // NPC functions
  window.listNPCs = window.api.listNPCs;
  window.createNPC = window.api.createNPC;
  window.updateNPC = window.api.updateNPC;
  window.deleteNPC = window.api.deleteNPC;

  // Session functions
  window.updateSession = window.api.updateSession;

  // Supabase client
  window.getSupabase = window.getSupabaseClient;

  // Theme functions (from themes.js)
  if (window.THEMES) {
    window.setTema = function(tema) {
      var themes = ['yellow', 'red', 'green', 'purple', 'blue'];
      themes.forEach(function(t) { document.body.classList.remove('theme-' + t); });
      document.body.classList.add('theme-' + tema);
      localStorage.setItem('cerebro_tema', tema);
    };
  }

})();