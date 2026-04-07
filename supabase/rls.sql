-- XMEN TTRPG - Desabilitar RLS (backend cuida da auth)
-- Como usamos JWT próprio (não Supabase Auth), auth.uid() retorna null.
-- O backend já valida tokens e permissões, então RLS não é necessário.

ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE parties DISABLE ROW LEVEL SECURITY;
ALTER TABLE party_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE characters DISABLE ROW LEVEL SECURITY;
ALTER TABLE npcs DISABLE ROW LEVEL SECURITY;
ALTER TABLE sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE wiki_pages DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "profiles_select_all" ON profiles;
DROP POLICY IF EXISTS "profiles_insert" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "parties_gm_manage" ON parties;
DROP POLICY IF EXISTS "party_members_select" ON party_members;
DROP POLICY IF EXISTS "party_members_insert" ON party_members;
DROP POLICY IF EXISTS "party_members_delete" ON party_members;
DROP POLICY IF EXISTS "characters_select" ON characters;
DROP POLICY IF EXISTS "characters_insert" ON characters;
DROP POLICY IF EXISTS "characters_update" ON characters;
DROP POLICY IF EXISTS "characters_delete" ON characters;
DROP POLICY IF EXISTS "npcs_global_read" ON npcs;
DROP POLICY IF EXISTS "npcs_party_read" ON npcs;
DROP POLICY IF EXISTS "npcs_gm_manage" ON npcs;
DROP POLICY IF EXISTS "npcs_insert_global" ON npcs;
DROP POLICY IF EXISTS "sessions_select" ON sessions;
DROP POLICY IF EXISTS "sessions_gm_manage" ON sessions;
DROP POLICY IF EXISTS "wiki_public_read" ON wiki_pages;
