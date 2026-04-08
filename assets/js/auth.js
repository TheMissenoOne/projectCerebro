// X-MEN TTRPG Auth
// requireAuth: reads session, re-fetches profile from server for fresh role,
// then redirects based on role requirements.

async function requireAuth(requiredRole) {
  var session;
  try {
    var s = localStorage.getItem('session');
    session = s ? JSON.parse(s) : null;
  } catch(e) {
    session = null;
  }

  if (!session || !session.user) {
    window.location.href = 'index.html';
    return null;
  }

  // Always fetch fresh profile so role is never stale from a cached session
  var profile = null;
  try {
    var resp = await fetch(window.location.origin + '/profiles/' + session.user.id, {
      headers: { 'Authorization': 'Bearer ' + session.token }
    });
    if (resp.ok) {
      profile = await resp.json();
      // Update cached session if role changed
      if (profile.role !== session.user.role) {
        session.user.role = profile.role;
        session.user.profile = profile;
        localStorage.setItem('session', JSON.stringify(session));
      }
    }
  } catch(e) {}

  // Fall back to cached session data if server unreachable
  if (!profile) {
    var user = session.user;
    profile = user.profile || {
      id: user.id,
      email: user.email,
      username: user.username || (user.email ? user.email.split('@')[0] : 'user'),
      display_name: user.display_name || user.username || 'User',
      role: user.role || 'player'
    };
  }

  if (requiredRole && profile.role !== requiredRole) {
    window.location.href = 'dashboard.html';
    return null;
  }

  return { session: session, profile: profile };
}

function login(email, password) {
  return window.api.login(email, password);
}

function register(email, password, username, displayName, role) {
  return window.api.register(email, password, username, displayName, role);
}

window.requireAuth = requireAuth;
window.login = login;
window.register = register;
