async function requireAuth(requiredRole = null) {
  const session = await getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  
  const profile = await getProfile(session.user.id);
  if (requiredRole && profile && profile.role !== requiredRole) {
    window.location.href = 'dashboard.html';
    return null;
  }
  
  return { session, profile };
}

async function checkAuth() {
  const session = await getSession();
  if (session) {
    window.location.href = 'dashboard.html';
    return true;
  }
  return false;
}

async function login(email, password) {
  if (!supabase) initSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  
  return data;
}

async function register(email, password, username, displayName, role) {
  if (!supabase) initSupabase();
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        display_name: displayName,
        role
      }
    }
  });
  
  if (error) throw error;
  
  if (data.user) {
    await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        username,
        display_name: displayName,
        role
      });
  }
  
  return data;
}

async function logout() {
  if (!supabase) initSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  window.location.href = 'index.html';
}

async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

function onAuthStateChange(callback) {
  if (!supabase) initSupabase();
  return supabase.auth.onAuthStateChange(callback);
}
