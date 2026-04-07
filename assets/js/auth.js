async function requireAuth(requiredRole = null) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
  if (!profile) {
    await supabase.auth.signOut();
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
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = 'dashboard.html';
  }
}

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

async function register(email, password, username, displayName, role) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, display_name: displayName, role: role || 'player' }
    }
  });
  if (error) throw new Error(error.message);
  
  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      email,
      username,
      display_name: displayName,
      role: role || 'player'
    });
  }
  
  return data;
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

function getCurrentUser() {
  return supabase.auth.getUser();
}
