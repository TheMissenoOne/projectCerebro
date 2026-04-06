async function requireAuth(requiredRole = null) {
  const session = await getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  
  const profile = await getProfile(session.user.id);
  if (!profile) {
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
  const session = await getSession();
  if (session) {
    window.location.href = 'dashboard.html';
    return true;
  }
  return false;
}

async function login(email, password) {
  getSupabase();
  if (!supabase) throw new Error('Supabase não inicializado');
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  
  return data;
}

async function register(email, password, username, displayName, role) {
  getSupabase();
  if (!supabase) throw new Error('Supabase não inicializado');
  
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
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        username,
        display_name: displayName,
        role
      });
    
    if (profileError) {
      console.error('Erro ao criar perfil:', profileError);
    }
  }
  
  return data;
}

async function logout() {
  getSupabase();
  if (!supabase) {
    window.location.href = 'index.html';
    return;
  }
  const { error } = await supabase.auth.signOut();
  if (!error) {
    window.location.href = 'index.html';
  }
}

async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  
  getSupabase();
  if (!supabase) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

function onAuthStateChange(callback) {
  getSupabase();
  if (!supabase) return null;
  return supabase.auth.onAuthStateChange(callback);
}
