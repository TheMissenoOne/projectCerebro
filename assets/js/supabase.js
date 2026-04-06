const SUPABASE_URL = 'https://wlpdfrqzbpwuxyqeayjt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscGRmcnF6YnB3dXh5cWVheWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDQwODYsImV4cCI6MjA5MTA4MDA4Nn0.RkLXucAPwp0Edba7nG8pZOXrsOzjjrEbOIFwg-uyRLM';

if (typeof window !== 'undefined') {
  window.SUPABASE_URL = SUPABASE_URL;
  window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
}

var supabase;

function initSupabase() {
  if (typeof window !== 'undefined' && typeof window.supabase !== 'undefined' && !supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
}

async function getSession() {
  if (!supabase) initSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

async function getProfile(userId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

async function getProfileBySession() {
  const session = await getSession();
  if (!session) return null;
  return getProfile(session.user.id);
}

async function saveCharacter(charId, data) {
  if (!supabase) initSupabase();
  return supabase
    .from('characters')
    .upsert({ id: charId, data, updated_at: new Date().toISOString() });
}

async function loadCharacter(charId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('characters')
    .select('*')
    .eq('id', charId)
    .single();
  return data;
}

async function createCharacter(playerId, partyId = null) {
  if (!supabase) initSupabase();
  const id = crypto.randomUUID();
  const { data } = await supabase
    .from('characters')
    .insert({
      id,
      player_id: playerId,
      party_id: partyId,
      name: 'Novo Personagem',
      codename: '',
      data: {
        identidade: { nome: '', codinome: '', origen: '', idade: '' },
        atributos: { forca: 1, velocidade: 1, resistencia: 1, elastico: 1 },
        movimentos: { viraraJogo: 0, convencer: 0, rirPerigo: 0, partirabraço: 0, investigacao: 0 },
        temas: [],
        esquadrao: [],
        notas: ''
      }
    })
    .select()
    .single();
  return data;
}

async function listCharacters(playerId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('characters')
    .select('*')
    .eq('player_id', playerId)
    .order('created_at', { ascending: false });
  return data || [];
}

async function listPartyCharacters(partyId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('characters')
    .select('*')
    .eq('party_id', partyId)
    .order('name');
  return data || [];
}

async function deleteCharacter(charId) {
  if (!supabase) initSupabase();
  return supabase
    .from('characters')
    .delete()
    .eq('id', charId);
}

async function saveNPC(npcId, data) {
  if (!supabase) initSupabase();
  return supabase
    .from('npcs')
    .upsert({ id: npcId, data, updated_at: new Date().toISOString() });
}

async function loadNPC(npcId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('npcs')
    .select('*')
    .eq('id', npcId)
    .single();
  return data;
}

async function listNPCs(partyId = null, includeGlobal = true) {
  if (!supabase) initSupabase();
  let query = supabase.from('npcs').select('*');
  
  if (partyId && includeGlobal) {
    query = query.or(`party_id.eq.${partyId},is_global.eq.true`);
  } else if (partyId) {
    query = query.eq('party_id', partyId);
  } else if (includeGlobal) {
    query = query.eq('is_global', true);
  }
  
  const { data } = await query.order('name');
  return data || [];
}

async function createNPC(partyId, createdBy, npcData) {
  if (!supabase) initSupabase();
  const id = crypto.randomUUID();
  const { data } = await supabase
    .from('npcs')
    .insert({
      id,
      party_id: partyId,
      created_by: createdBy,
      name: npcData.name,
      codename: npcData.codename || '',
      faction: npcData.faction || '',
      danger: npcData.danger || 'medio',
      data: npcData.data || {},
      is_global: false
    })
    .select()
    .single();
  return data;
}

async function deleteNPC(npcId) {
  if (!supabase) initSupabase();
  return supabase
    .from('npcs')
    .delete()
    .eq('id', npcId);
}

async function getParty(partyId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('parties')
    .select('*, party_members(*, profiles(*))')
    .eq('id', partyId)
    .single();
  return data;
}

async function getPartyByCode(code) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('parties')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();
  return data;
}

async function getPartyMembers(partyId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('party_members')
    .select('*, profiles(*)')
    .eq('party_id', partyId);
  return data || [];
}

async function createParty(name, gmId) {
  if (!supabase) initSupabase();
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const { data } = await supabase
    .from('parties')
    .insert({ name, gm_id: gmId, code })
    .select()
    .single();
  return data;
}

async function joinParty(partyId, playerId) {
  if (!supabase) initSupabase();
  return supabase
    .from('party_members')
    .insert({ party_id: partyId, player_id: playerId });
}

async function leaveParty(partyId, playerId) {
  if (!supabase) initSupabase();
  return supabase
    .from('party_members')
    .delete()
    .eq('party_id', partyId)
    .eq('player_id', playerId);
}

async function getGMParty(gmId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('parties')
    .select('*')
    .eq('gm_id', gmId)
    .single();
  return data;
}

async function getPlayerParty(playerId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('party_members')
    .select('party_id, parties(*)')
    .eq('player_id', playerId)
    .single();
  return data ? data.parties : null;
}

async function updateSession(partyId, sessionData) {
  if (!supabase) initSupabase();
  return supabase
    .from('sessions')
    .upsert({
      party_id: partyId,
      ...sessionData,
      updated_at: new Date().toISOString()
    });
}

async function getSession(partyId) {
  if (!supabase) initSupabase();
  const { data } = await supabase
    .from('sessions')
    .select('*')
    .eq('party_id', partyId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  return data;
}

async function uploadPortrait(file, playerId, charId) {
  if (!supabase) initSupabase();
  const path = `${playerId}/${charId}.jpg`;
  const { error } = await supabase.storage
    .from('portraits')
    .upload(path, file, { upsert: true, contentType: file.type });
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('portraits')
    .getPublicUrl(path);
  
  await supabase
    .from('characters')
    .update({ foto_url: publicUrl })
    .eq('id', charId);
  
  return publicUrl;
}

function subscribeToPartyCharacters(partyId, callback) {
  if (!supabase) initSupabase();
  return supabase
    .channel('party-characters')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'characters',
      filter: `party_id=eq.${partyId}`
    }, callback)
    .subscribe();
}

function subscribeToSession(partyId, callback) {
  if (!supabase) initSupabase();
  return supabase
    .channel('session-updates')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'sessions',
      filter: `party_id=eq.${partyId}`
    }, callback)
    .subscribe();
}

if (typeof window !== 'undefined') {
  initSupabase();
}
