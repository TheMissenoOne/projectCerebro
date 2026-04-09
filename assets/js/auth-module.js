/**
 * X-MEN TTRPG - Authentication Module
 * Login, registration, and session management
 */

(function() {
  const client = window.getSupabaseClient;

  /**
   * Register new user
   */
  window.api = window.api || {};
  
  window.api.register = function(email, password, username, displayName, role) {
    return client().auth.signUp({
      email: email,
      password: password,
      options: {
        data: { username: username, display_name: displayName, role: role || 'player' }
      }
    }).then(function(result) {
      if (result.error) throw result.error;
      return { user: result.data.user, session: result.data.session };
    });
  };

  /**
   * Login with email and password
   */
  window.api.login = function(email, password) {
    return client().auth.signInWithPassword({
      email: email,
      password: password
    }).then(function(result) {
      if (result.error) throw result.error;
      
      // After login, fetch the profile to get the correct role and update user metadata
      return client().from('profiles').select('role').eq('email', email.toLowerCase()).single()
        .then(function(profileResult) {
          if (profileResult.data) {
            // Update user metadata with correct role
            return client().auth.updateUser({
              data: { role: profileResult.data.role }
            }).then(function() {
              return { user: result.data.user, session: result.data.session };
            });
          }
          return { user: result.data.user, session: result.data.session };
        });
    });
  };

  /**
   * Logout current user
   */
  window.api.logout = function() {
    return client().auth.signOut();
  };

  /**
   * Get current user session
   */
  window.api.getCurrentUser = function() {
    return client().auth.getSession().then(function(result) {
      return result.data.session?.user || null;
    });
  };

  /**
   * Require authentication and check role
   */
  window.requireAuth = function(requiredRole) {
    var client = window.getSupabaseClient();
    if (!client) {
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
      console.log('[requireAuth] User from session:', user.id, user.email);
      console.log('[requireAuth] User metadata role:', user.user_metadata?.role);
      
      // Fetch profile from database to get the correct role
      return client.from('profiles').select('id, email, username, display_name, role').eq('id', user.id).single()
        .then(function(profileResult) {
          console.log('[requireAuth] Profile query result:', profileResult.status, profileResult.data);
          
          var profile;
          if (profileResult.data) {
            profile = profileResult.data;
          } else {
            console.log('[requireAuth] Profile query failed, using metadata role:', user.user_metadata?.role);
            profile = {
              id: user.id,
              email: user.email,
              username: user.user_metadata?.username || user.email.split('@')[0],
              display_name: user.user_metadata?.display_name || user.user_metadata?.username || 'User',
              role: user.user_metadata?.role || 'player'
            };
          }
          
          console.log('[requireAuth] Final profile role:', profile.role);
          
          if (requiredRole && profile.role !== requiredRole) {
            window.location.href = 'dashboard.html';
            return null;
          }
          return { session: session, profile: profile };
        })
        .catch(function(err) {
          console.log('[requireAuth] Profile query error, using metadata:', err.message);
          var profile = {
            id: user.id,
            email: user.email,
            username: user.user_metadata?.username || user.email.split('@')[0],
            display_name: user.user_metadata?.display_name || user.user_metadata?.username || 'User',
            role: user.user_metadata?.role || 'player'
          };
          console.log('[requireAuth] Final profile role (fallback):', profile.role);
          
          if (requiredRole && profile.role !== requiredRole) {
            window.location.href = 'dashboard.html';
            return null;
          }
          return { session: session, profile: profile };
        });
    });
  };

  /**
   * Require GM role
   */
  window.requireGM = function() {
    return window.requireAuth('gm');
  };

  /**
   * Check if user is already authenticated, redirect if so
   */
  window.checkAuth = function() {
    var client = window.getSupabaseClient();
    if (!client) {
      console.warn('Supabase client not initialized');
      return;
    }
    client.auth.getSession().then(function(result) {
      if (result.data.session) window.location.href = 'dashboard.html';
    });
  };

  /**
   * Global function wrappers for inline HTML handlers
   */
  window.login = function(email, password) {
    return window.api.login(email, password);
  };

  window.register = function(email, password, username, displayName, role) {
    return window.api.register(email, password, username, displayName, role);
  };

  window.logout = function() {
    return window.api.logout().then(function() {
      window.location.href = 'index.html';
    });
  };

})();