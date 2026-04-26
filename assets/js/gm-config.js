// GM whitelist - users with these emails will be treated as Game Masters
// Injected at build time via {{VITE_GM_WHITELIST}}
(function() {
  var whitelist = '{{VITE_GM_WHITELIST}}'.split(',').filter(Boolean);
  window.GM_WHITELIST = whitelist;
  console.log('[gm-config.js] GM whitelist loaded:', whitelist);
})();