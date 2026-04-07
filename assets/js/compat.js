// Compatibility layer - maps old Supabase functions to new API
const api = window.api;

async function getSession() {
  const session = JSON.parse(localStorage.getItem('session'));
  return session;
}

async function getProfile(userId) {
  return api.getProfile(userId);
}

async function getProfileBySession() {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session) return null;
  return api.getProfile(session.user.id);
}

async function saveCharacter(charId, data) {
  return api.saveCharacter(charId, data);
}

async function loadCharacter(charId) {
  return api.loadCharacter(charId);
}

async function loadPublicCharacter(charId) {
  try {
    const char = await api.loadCharacter(charId);
    if (char) {
      return { id: char.id, name: char.name, codename: char.codename, data: char.data };
    }
    throw new Error('Not found');
  } catch (e) {
    const localData = localStorage.getItem(`char_${charId}`);
    if (localData) {
      return JSON.parse(localData);
    }
    throw e;
  }
}

async function createCharacter(playerId, partyId) {
  return api.createCharacter(playerId, partyId);
}

async function listCharacters(playerId) {
  return api.listCharacters(playerId);
}

async function listPartyCharacters(partyId) {
  return api.listPartyCharacters(partyId);
}

async function deleteCharacter(charId) {
  return api.deleteCharacter(charId);
}

async function listNPCs(partyId, includeGlobal) {
  return api.listNPCs(partyId, includeGlobal);
}

async function createNPC(partyId, createdBy, npcData) {
  return api.createNPC(partyId, createdBy, npcData);
}

async function getParty(partyId) {
  const parties = await api.getParty(partyId);
  return parties;
}

async function getPartyByCode(code) {
  return api.getPartyByCode(code);
}

async function getPartyMembers(partyId) {
  return api.getPartyMembers(partyId);
}

async function createParty(name, gmId) {
  return api.createParty(name, gmId);
}

async function joinParty(partyId, playerId) {
  return api.joinParty(partyId, playerId);
}

async function getGMParty(gmId) {
  return api.getGMParty(gmId);
}

async function getPlayerParty(playerId) {
  return api.getPlayerParty(playerId);
}

async function getSession(partyId) {
  return api.getSession(partyId);
}

async function updateSession(partyId, sessionData) {
  return api.updateSession(partyId, sessionData);
}

function subscribeToPartyCharacters(partyId, callback) {
  return { unsubscribe: () => {} };
}

function subscribeToSession(partyId, callback) {
  return { unsubscribe: () => {} };
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
  window.getParty = getParty;
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
