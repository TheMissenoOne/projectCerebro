// X-MEN TTRPG Auth
// Simplified: reads profile from session.user (returned by backend on login/register)
// No extra GET /profiles/:id round-trip needed

function requireAuth(requiredRole) {
  var session;
  try {
    var s = localStorage.getItem('session');
    session = s ? JSON.parse(s) : null;
  } catch(e) {
    session = null;
  }
  
  if (!session || !session.user) {
    window.location.href = 'index.html';
    return Promise.resolve(null);
  }
  
  // Profile is included in session.user by the backend
  var user = session.user;
  var profile = user.profile || {
    id: user.id,
    email: user.email,
    username: user.username || user.email.split('@')[0],
    display_name: user.display_name || user.username || 'User',
    role: user.role || 'player'
  };
  
  if (requiredRole && profile.role !== requiredRole) {
    window.location.href = 'dashboard.html';
    return Promise.resolve(null);
  }
  
  return Promise.resolve({ session: session, profile: profile });
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
