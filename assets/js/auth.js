async function requireAuth(requiredRole = null) {
  const session = JSON.parse(localStorage.getItem('session'));
  console.log('requireAuth session:', session);
  
  if (!session) {
    console.log('No session, redirecting to login');
    window.location.href = 'index.html';
    return null;
  }
  
  try {
    const profile = await api.getProfile(session.user.id);
    console.log('Profile:', profile);
    
    if (!profile) {
      console.log('No profile found, but session exists - creating default profile');
      // Profile might not exist yet, create a temporary one
      const tempProfile = {
        id: session.user.id,
        email: session.user.email,
        username: session.user.email.split('@')[0],
        display_name: session.user.email.split('@')[0],
        role: 'player'
      };
      return { session, profile: tempProfile };
    }
    
    if (requiredRole && profile.role !== requiredRole) {
      window.location.href = 'dashboard.html';
      return null;
    }
    
    return { session, profile };
  } catch (e) {
    console.error('Error in requireAuth:', e);
    // On error, still allow access with session data
    const tempProfile = {
      id: session.user.id,
      email: session.user.email,
      username: session.user.email.split('@')[0],
      display_name: session.user.email.split('@')[0],
      role: 'player'
    };
    return { session, profile: tempProfile };
  }
}

async function checkAuth() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

async function login(email, password) {
  return await api.login(email, password);
}

async function register(email, password, username, displayName, role) {
  return await api.register(email, password, username, displayName, role);
}

async function logout() {
  localStorage.removeItem('session');
  window.location.href = 'index.html';
}

function getCurrentUser() {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.user || null;
}
