async function requireAuth(requiredRole) {
  var session;
  try {
    session = localStorage.getItem('session');
    session = session ? JSON.parse(session) : null;
  } catch(e) {
    session = null;
  }
  
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  
  try {
    var profile = await window.api.getProfile(session.user.id);
    
    if (!profile) {
      var tempProfile = {
        id: session.user.id,
        email: session.user.email,
        username: session.user.email.split('@')[0],
        display_name: session.user.email.split('@')[0],
        role: 'player'
      };
      return { session: session, profile: tempProfile };
    }
    
    if (requiredRole && profile.role !== requiredRole) {
      window.location.href = 'dashboard.html';
      return null;
    }
    
    return { session: session, profile: profile };
  } catch (e) {
    var tempProfile = {
      id: session.user.id,
      email: session.user.email,
      username: session.user.email.split('@')[0],
      display_name: session.user.email.split('@')[0],
      role: 'player'
    };
    return { session: session, profile: tempProfile };
  }
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
