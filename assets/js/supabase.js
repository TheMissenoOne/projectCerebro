const SUPABASE_URL = 'https://wlpdfrqzbpwuxyqeayjt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscGRmcnF6YnB3dXh5cWVheWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDQwODYsImV4cCI6MjA5MTA4MDA4Nn0.RkLXucAPwp0Edba7nG8pZOXrsOzjjrEbOIFwg-uyRLM';

var supabase = null;

function initSupabase() {
  if (supabase) return supabase;
  
  var createClient = window.supabase?.createClient || window.supabase?.default?.createClient;
  console.log('Looking for createClient:', typeof createClient);
  
  if (typeof createClient === 'function') {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Client created:', !!supabase);
  } else {
    console.log('Available supabase keys:', Object.keys(window.supabase || {}));
  }
  return supabase;
}

if (typeof window !== 'undefined') {
  window.initSupabase = initSupabase;
}

async function getSession() {
  initSupabase();
  if (!supabase) return null;
  try {
    var result = await supabase.auth.getSession();
    return result.data.session;
  } catch (e) {
    console.error('getSession error:', e);
    return null;
  }
}

async function getSession() {
  initSupabase();
  if (!supabase) return null;
  try {
    var result = await supabase.auth.getSession();
    return result.data.session;
  } catch (e) {
    console.error('getSession error:', e);
    return null;
  }
}

async function getProfile(userId) {
  initSupabase();
  var result = await supabase.from('profiles').select('*').eq('id', userId).single();
  return result.data;
}

async function getProfileBySession() {
  var session = await getSession();
  if (!session) return null;
  return getProfile(session.user.id);
}

async function saveCharacter(charId, data) {
  initSupabase();
  return supabase.from('characters').upsert({
    id: charId,
    data: data,
    updated_at: new Date().toISOString()
  });
}

async function loadCharacter(charId) {
  initSupabase();
  var result = await supabase.from('characters').select('*').eq('id', charId).single();
  return result.data;
}

async function createCharacter(playerId, partyId) {
  initSupabase();
  var id = crypto.randomUUID();
  var result = await supabase.from('characters').insert({
    id: id,
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
  }).select().single();
  return result.data;
}

async function listCharacters(playerId) {
  initSupabase();
  var result = await supabase.from('characters').select('*').eq('player_id', playerId).order('created_at', { ascending: false });
  return result.data || [];
}

async function listPartyCharacters(partyId) {
  initSupabase();
  var result = await supabase.from('characters').select('*').eq('party_id', partyId).order('name');
  return result.data || [];
}

async function deleteCharacter(charId) {
  initSupabase();
  return supabase.from('characters').delete().eq('id', charId);
}

async function saveNPC(npcId, data) {
  initSupabase();
  return supabase.from('npcs').upsert({ id: npcId, data: data, updated_at: new Date().toISOString() });
}

async function loadNPC(npcId) {
  initSupabase();
  var result = await supabase.from('npcs').select('*').eq('id', npcId).single();
  return result.data;
}

async function listNPCs(partyId, includeGlobal) {
  initSupabase();
  var query = supabase.from('npcs').select('*');
  if (partyId && includeGlobal) {
    query = query.or('party_id.eq.' + partyId + ',is_global.eq.true');
  } else if (partyId) {
    query = query.eq('party_id', partyId);
  } else if (includeGlobal) {
    query = query.eq('is_global', true);
  }
  var result = await query.order('name');
  return result.data || [];
}

async function createNPC(partyId, createdBy, npcData) {
  initSupabase();
  var id = crypto.randomUUID();
  var result = await supabase.from('npcs').insert({
    id: id,
    party_id: partyId,
    created_by: createdBy,
    name: npcData.name,
    codename: npcData.codename || '',
    faction: npcData.faction || '',
    danger: npcData.danger || 'medio',
    data: npcData.data || {},
    is_global: false
  }).select().single();
  return result.data;
}

async function deleteNPC(npcId) {
  initSupabase();
  return supabase.from('npcs').delete().eq('id', npcId);
}

async function getParty(partyId) {
  initSupabase();
  var result = await supabase.from('parties').select('*, party_members(*, profiles(*))').eq('id', partyId).single();
  return result.data;
}

async function getPartyByCode(code) {
  initSupabase();
  var result = await supabase.from('parties').select('*').eq('code', code.toUpperCase()).single();
  return result.data;
}

async function getPartyMembers(partyId) {
  initSupabase();
  var result = await supabase.from('party_members').select('*, profiles(*)').eq('party_id', partyId);
  return result.data || [];
}

async function createParty(name, gmId) {
  initSupabase();
  var code = Math.random().toString(36).substring(2, 8).toUpperCase();
  var result = await supabase.from('parties').insert({ name: name, gm_id: gmId, code: code }).select().single();
  return result.data;
}

async function joinParty(partyId, playerId) {
  initSupabase();
  return supabase.from('party_members').insert({ party_id: partyId, player_id: playerId });
}

async function leaveParty(partyId, playerId) {
  initSupabase();
  return supabase.from('party_members').delete().eq('party_id', partyId).eq('player_id', playerId);
}

async function getGMParty(gmId) {
  initSupabase();
  var result = await supabase.from('parties').select('*').eq('gm_id', gmId).single();
  return result.data;
}

async function getPlayerParty(playerId) {
  initSupabase();
  var result = await supabase.from('party_members').select('party_id, parties(*)').eq('player_id', playerId).single();
  return result.data ? result.data.parties : null;
}

async function updateSession(partyId, sessionData) {
  initSupabase();
  return supabase.from('sessions').upsert({
    party_id: partyId,
    title: sessionData.title,
    notes: sessionData.notes,
    round: sessionData.round,
    encounter: sessionData.encounter,
    updated_at: new Date().toISOString()
  });
}

async function getSessionByParty(partyId) {
  initSupabase();
  var result = await supabase.from('sessions').select('*').eq('party_id', partyId).order('created_at', { ascending: false }).limit(1).single();
  return result.data;
}

async function uploadPortrait(file, playerId, charId) {
  initSupabase();
  var path = playerId + '/' + charId + '.jpg';
  var uploadResult = await supabase.storage.from('portraits').upload(path, file, { upsert: true, contentType: file.type });
  if (uploadResult.error) throw uploadResult.error;
  var publicUrl = supabase.storage.from('portraits').getPublicUrl(path).data.publicUrl;
  await supabase.from('characters').update({ foto_url: publicUrl }).eq('id', charId);
  return publicUrl;
}

function subscribeToPartyCharacters(partyId, callback) {
  initSupabase();
  return supabase.channel('party-characters').on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'characters',
    filter: 'party_id=eq.' + partyId
  }, callback).subscribe();
}

function subscribeToSession(partyId, callback) {
  initSupabase();
  return supabase.channel('session-updates').on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'sessions',
    filter: 'party_id=eq.' + partyId
  }, callback).subscribe();
}
