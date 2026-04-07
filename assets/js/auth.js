async function requireAuth(requiredRole) {
  var session = JSON.parse(localStorage.getItem('session'));
  console.log('requireAuth session:', session);
  
  if (!session) {
    console.log('No session, redirecting to login');
    window.location.href = 'index.html';
    return null;
  }
  
  try {
    var profile = await api.getProfile(session.user.id);
    console.log('Profile:', profile);
    
    if (!profile) {
      console.log('No profile found, but session exists - creating default profile');
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
    console.error('Error in requireAuth:', e);
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

async function checkAuth() {
  var session = JSON.parse(localStorage.getItem('session'));
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

function login(email, password) {
  return api.login(email, password);
}

function register(email, password, username, displayName, role) {
  return api.register(email, password, username, displayName, role);
}

async function logout() {
  localStorage.removeItem('session');
  window.location.href = 'index.html';
}

function getCurrentUser() {
  var session = JSON.parse(localStorage.getItem('session'));
  return session ? session.user : null;
}
}
