/**
 * X-MEN TTRPG - Supabase Client Initialization
 * Must be loaded BEFORE auth-module.js and api-module.js
 */

(function() {
  console.log('[supabase-client.js] Initializing...');

  // Get config from config.js (loaded first)
  var config = window.SUPABASE_CONFIG;
  if (!config) {
    console.error('[supabase-client.js] SUPABASE_CONFIG not found. Load config.js first.');
    return;
  }

  /**
   * Get or create Supabase client instance
   */
  window.getSupabaseClient = (function() {
    var supabaseClient = null;

    return function() {
      if (!supabaseClient && window.supabase) {
        supabaseClient = window.supabase.createClient(config.url, config.anonKey);
        console.log('[supabase-client.js] Client created');
      }
      return supabaseClient;
    };
  })();

  // Alias for backwards compatibility
  window.getSupabaseInternal = window.getSupabaseClient;

  console.log('[supabase-client.js] Initialized, window.getSupabaseClient:', typeof window.getSupabaseClient);

})();