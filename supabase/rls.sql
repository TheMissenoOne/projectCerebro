-- XMEN TTRPG - Row Level Security Policies

-- Ativar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wiki_pages ENABLE ROW LEVEL SECURITY;

-- PROFILES: usuário vê e edita apenas o próprio perfil
CREATE POLICY "profiles_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- PARTIES: GM edita, membros leem
CREATE POLICY "parties_gm_manage" ON parties FOR ALL USING (
  gm_id = auth.uid()
);

-- PARTY MEMBERS: membros leem, GM gerencia
CREATE POLICY "party_members_select" ON party_members FOR SELECT USING (
  party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
  OR player_id = auth.uid()
);
CREATE POLICY "party_members_insert" ON party_members FOR INSERT WITH CHECK (
  party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
  OR player_id = auth.uid()
);
CREATE POLICY "party_members_delete" ON party_members FOR DELETE USING (
  party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
);

-- CHARACTERS: dono edita, GM da party lê todos
CREATE POLICY "characters_select" ON characters FOR SELECT USING (
  player_id = auth.uid()
  OR party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
  OR party_id IN (SELECT party_id FROM party_members WHERE player_id = auth.uid())
);
CREATE POLICY "characters_insert" ON characters FOR INSERT WITH CHECK (auth.uid() = player_id);
CREATE POLICY "characters_update" ON characters FOR UPDATE USING (auth.uid() = player_id);
CREATE POLICY "characters_delete" ON characters FOR DELETE USING (auth.uid() = player_id);

-- NPCs: NPCs globais visíveis a todos, GM da party gerencia os específicos
CREATE POLICY "npcs_global_read" ON npcs FOR SELECT USING (is_global = true);
CREATE POLICY "npcs_party_read" ON npcs FOR SELECT USING (
  party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
  OR party_id IN (SELECT party_id FROM party_members WHERE player_id = auth.uid())
  OR party_id IS NULL
);
CREATE POLICY "npcs_gm_manage" ON npcs FOR ALL USING (
  party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
);
CREATE POLICY "npcs_insert_global" ON npcs FOR INSERT WITH CHECK (
  is_global = true OR party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
);

-- SESSIONS: GM gerencia, membros leem
CREATE POLICY "sessions_select" ON sessions FOR SELECT USING (
  party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
  OR party_id IN (SELECT party_id FROM party_members WHERE player_id = auth.uid())
);
CREATE POLICY "sessions_gm_manage" ON sessions FOR ALL USING (
  party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
);

-- WIKI: todos leem
CREATE POLICY "wiki_public_read" ON wiki_pages FOR SELECT USING (true);
