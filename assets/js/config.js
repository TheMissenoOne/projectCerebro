/**
 * X-MEN TTRPG - Client Configuration
 * Supabase client initialization and configuration
 */

window.SUPABASE_CONFIG = {
  url: 'https://wlpdfrqzbpwuxyqeayjt.supabase.co',
  anonKey: 'sb_publishable_YqV49fEJhRWGUxBZ7hYfRw_Aghqpp4I'
};

/**
 * Get or initialize Supabase client
 */
window.getSupabaseClient = (function() {
  let supabaseClient = null;
  
  return function() {
    if (!supabaseClient && window.supabase) {
      supabaseClient = window.supabase.createClient(
        window.SUPABASE_CONFIG.url,
        window.SUPABASE_CONFIG.anonKey
      );
    }
    return supabaseClient;
  };
})();
