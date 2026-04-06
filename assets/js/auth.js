async function requireAuth(requiredRole = null) {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  
  const profile = await api.getProfile(session.user.id);
  if (!profile) {
    localStorage.removeItem('session');
    window.location.href = 'index.html';
    return null;
  }
  
  if (requiredRole && profile.role !== requiredRole) {
    window.location.href = 'dashboard.html';
    return null;
  }
  
  return { session, profile };
}

async function checkAuth() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session) {
    window.location.href = 'dashboard.html';
    return true;
  }
  return false;
}

async function login(email, password) {
  const data = await api.login(email, password);
  localStorage.setItem('session', JSON.stringify(data.session));
  return data;
}

async function register(email, password, username, displayName, role) {
  const data = await api.register(email, password, username, displayName, role);
  localStorage.setItem('session', JSON.stringify(data.session));
  return data;
}

async function logout() {
  localStorage.removeItem('session');
  window.location.href = 'index.html';
}

function getCurrentUser() {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.user || null;
}
