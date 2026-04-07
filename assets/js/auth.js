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
  return data;
}

async function register(email, password, username, displayName, role) {
  const data = await api.register(email, password, username, displayName, role);
  return data;
}

async function logout() {
  // Call Supabase logout endpoint
  const session = JSON.parse(localStorage.getItem('session') || 'null');
  if (session?.access_token) {
    try {
      await fetch('https://wlpdfrqzbpwuxyqeayjt.supabase.co/auth/v1/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscGRmcnF6YnB3dXh5cWVheWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDQwODYsImV4cCI6MjA5MTA4MDA4Nn0.RkLXucAPwp0Edba7nG8pZOXrsOzjjrEbOIFwg-uyRLM',
          'Authorization': `Bearer ${session.access_token}`
        }
      });
    } catch (e) {}
  }
  localStorage.removeItem('session');
  window.location.href = 'index.html';
}

function getCurrentUser() {
  const session = JSON.parse(localStorage.getItem('session'));
  return session?.user || null;
}
