// X-MEN TTRPG API Client - Direct Supabase (for GitHub Pages)
// Uses Supabase JavaScript client for direct database access
(function() {
  // SUPABASE CONFIG
  var SUPABASE_URL = 'https://wlpdfrqzbpwuxyqeayjt.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_YqV49fEJhRWGUxBZ7hYfRw_Aghqpp4I';

  var supabaseClient = null;

  function getSupabase() {
    if (!supabaseClient && window.supabase) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
  }

  // Expose getSupabase globally so external functions can use it
  window.getSupabaseInternal = getSupabase;
})();

// Global wrapper for getSupabase that can be called from anywhere
window.getSupabase = function() {
  return window.getSupabaseInternal();
};

// Check if user is logged in - redirect if not
function requireAuth(requiredRole) {
  var client = window.getSupabaseInternal();
  if (!client) {
    console.error('Supabase client not initialized');
    window.location.href = 'index.html';
    return Promise.resolve(null);
  }
  return client.auth.getSession().then(function(result) {
    var session = result.data.session;
    if (!session) {
      window.location.href = 'index.html';
      return null;
    }
    
    var user = session.user;
    
    // Get profile data from user metadata
    var profile = {
      id: user.id,
      email: user.email,
      username: user.user_metadata?.username || user.email.split('@')[0],
      display_name: user.user_metadata?.display_name || user.user_metadata?.username || 'User',
      role: user.user_metadata?.role || 'player'
    };

    if (requiredRole && profile.role !== requiredRole) {
      window.location.href = 'dashboard.html';
      return null;
    }

    return { session: session, profile: profile };
  });
}

// Login function
function login(email, password) {
  return window.api.login(email, password);
}

// Register function
function register(email, password, username, displayName, role) {
  return window.api.register(email, password, username, displayName, role);
}

// Logout function
function logout() {
  return window.api.logout().then(function() {
    window.location.href = 'index.html';
  });
}

// Check if user is logged in - redirect to dashboard
function checkAuth() {
  var client = window.getSupabaseInternal();
  if (!client) {
    console.warn('Supabase client not initialized');
    return;
  }
  client.auth.getSession().then(function(result) {
    if (result.data.session) {
      window.location.href = 'dashboard.html';
    }
  });
}

// Get current user
function getCurrentUser() {
  var client = window.getSupabaseInternal();
  if (!client) {
    return Promise.resolve(null);
  }
  return client.auth.getSession().then(function(result) {
    return result.data.session?.user || null;
  });
}

window.requireAuth = requireAuth;
window.login = login;
window.register = register;
window.logout = logout;
window.checkAuth = checkAuth;
window.getCurrentUser = getCurrentUser;
window.getSupabase = getSupabase;

// Theme function - works across all pages
window.setTema = function(tema) {
  var themes = ['yellow', 'red', 'green', 'purple', 'blue'];
  themes.forEach(function(t) {
    document.body.classList.remove('theme-' + t);
  });
  document.body.classList.add('theme-' + tema);
  localStorage.setItem('cerebro_tema', tema);
};