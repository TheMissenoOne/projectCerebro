const supabase = window.supabase;

async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

async function getProfile(userId) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return data;
}

async function getProfileBySession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
  return data;
}

async function saveCharacter(charId, data) {
  const { error } = await supabase.from('characters').upsert({ id: charId, data, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  return { success: true };
}

async function loadCharacter(charId) {
  const { data } = await supabase.from('characters').select('*').eq('id', charId).single();
  return data;
}

async function loadPublicCharacter(charId) {
  try {
    const { data } = await supabase.from('characters').select('id, name, codename, data').eq('id', charId).single();
    if (data) return data;
    throw new Error('Not found');
  } catch (e) {
    const localData = localStorage.getItem(`char_${charId}`);
    if (localData) return JSON.parse(localData);
    throw e;
  }
}

async function createCharacter(playerId, partyId) {
  const id = crypto.randomUUID();
  const { data, error } = await supabase.from('characters').insert({
    id, player_id: playerId, party_id: partyId, name: 'Novo Personagem', data: {}
  }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

async function listCharacters(playerId) {
  const { data } = await supabase.from('characters').select('*').eq('player_id', playerId).order('created_at', { ascending: false });
  return data || [];
}

async function listPartyCharacters(partyId) {
  const { data } = await supabase.from('characters').select('*').eq('party_id', partyId).order('name');
  return data || [];
}

async function deleteCharacter(charId) {
  const { error } = await supabase.from('characters').delete().eq('id', charId);
  if (error) throw new Error(error.message);
  return { success: true };
}

async function listNPCs(partyId, includeGlobal) {
  let query = supabase.from('npcs').select('*').order('name');
  if (partyId && includeGlobal) {
    query = query.or(`party_id.eq.${partyId},is_global.eq.true`);
  } else if (partyId) {
    query = query.eq('party_id', partyId);
  } else {
    query = query.eq('is_global', true);
  }
  const { data } = await query;
  return data || [];
}

async function createNPC(partyId, createdBy, npcData) {
  const id = crypto.randomUUID();
  const { data, error } = await supabase.from('npcs').insert({
    id, party_id: partyId, created_by: createdBy,
    name: npcData.name, codename: npcData.codename || '',
    faction: npcData.faction || 'neutro', danger: npcData.danger || 'medio',
    data: npcData.data || {}, is_global: false
  }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

async function getPartyByCode(code) {
  const { data } = await supabase.from('parties').select('*').eq('code', code.toUpperCase()).single();
  return data;
}

async function getPartyMembers(partyId) {
  const { data } = await supabase.from('party_members').select('*, profiles(*)').eq('party_id', partyId);
  return data || [];
}

async function createParty(name, gmId) {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const { data, error } = await supabase.from('parties').insert({ name, gm_id: gmId, code }).select().single();
  if (error) throw new Error(error.message);
  return data;
}

async function joinParty(partyId, playerId) {
  const { error } = await supabase.from('party_members').insert({ party_id: partyId, player_id: playerId });
  if (error) throw new Error(error.message);
  return { success: true };
}

async function getGMParty(gmId) {
  const { data } = await supabase.from('parties').select('*').eq('gm_id', gmId).single();
  return data;
}

async function getPlayerParty(playerId) {
  const { data } = await supabase.from('party_members').select('*, parties(*)').eq('player_id', playerId).single();
  return data?.parties || null;
}

async function getSession(partyId) {
  const { data } = await supabase.from('sessions').select('*').eq('party_id', partyId).order('created_at', { ascending: false }).limit(1).single();
  return data || null;
}

async function updateSession(partyId, sessionData) {
  const { error } = await supabase.from('sessions').upsert({ party_id: partyId, ...sessionData, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
  return { success: true };
}

function subscribeToPartyCharacters(partyId, callback) {
  return supabase.channel('party-characters').on('postgres_changes', {
    event: '*', schema: 'public', table: 'characters', filter: `party_id=eq.${partyId}`
  }, callback).subscribe();
}

function subscribeToSession(partyId, callback) {
  return supabase.channel('session-updates').on('postgres_changes', {
    event: '*', schema: 'public', table: 'sessions', filter: `party_id=eq.${partyId}`
  }, callback).subscribe();
}

if (typeof window !== 'undefined') {
  window.getSession = getSession;
  window.getProfile = getProfile;
  window.getProfileBySession = getProfileBySession;
  window.saveCharacter = saveCharacter;
  window.loadCharacter = loadCharacter;
  window.loadPublicCharacter = loadPublicCharacter;
  window.createCharacter = createCharacter;
  window.listCharacters = listCharacters;
  window.listPartyCharacters = listPartyCharacters;
  window.deleteCharacter = deleteCharacter;
  window.listNPCs = listNPCs;
  window.createNPC = createNPC;
  window.getPartyByCode = getPartyByCode;
  window.getPartyMembers = getPartyMembers;
  window.createParty = createParty;
  window.joinParty = joinParty;
  window.getGMParty = getGMParty;
  window.getPlayerParty = getPlayerParty;
  window.getSession = getSession;
  window.updateSession = updateSession;
  window.subscribeToPartyCharacters = subscribeToPartyCharacters;
  window.subscribeToSession = subscribeToSession;
}
