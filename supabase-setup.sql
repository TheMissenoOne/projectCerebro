-- X-MEN TTRPG - Supabase Setup for GitHub Pages
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security on all tables
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Characters: public read, owner write
DROP POLICY IF EXISTS "Public read characters" ON characters;
CREATE POLICY "Public read characters" ON characters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Owner can manage own characters" ON characters;
CREATE POLICY "Owner can manage own characters" ON characters FOR ALL
  USING (auth.uid() = player_id)
  WITH CHECK (auth.uid() = player_id);

-- NPCs: public read, GM manage
DROP POLICY IF EXISTS "Public read NPCs" ON npcs;
CREATE POLICY "Public read NPCs" ON npcs FOR SELECT USING (true);

DROP POLICY IF EXISTS "GM can manage NPCs" ON npcs;
CREATE POLICY "GM can manage NPCs" ON npcs FOR ALL
  USING (auth.uid() IN (SELECT gm_id FROM parties WHERE id = npcs.party_id))
  WITH CHECK (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id));

-- Parties: owner only, members can view
DROP POLICY IF EXISTS "Party members can view party" ON parties;
CREATE POLICY "Party members can view party" ON parties FOR SELECT USING (
  auth.uid() = gm_id OR
  auth.uid() IN (SELECT player_id FROM party_members WHERE party_id = id)
);

DROP POLICY IF EXISTS "Owner can manage party" ON parties;
CREATE POLICY "Owner can manage party" ON parties FOR ALL
  USING (auth.uid() = gm_id)
  WITH CHECK (auth.uid() = gm_id);

-- Party members: can view own membership, GM can manage, members can leave
DROP POLICY IF EXISTS "Party members can view" ON party_members;
CREATE POLICY "Party members can view" ON party_members FOR SELECT USING (auth.uid() = player_id OR auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id));

DROP POLICY IF EXISTS "Party members can join" ON party_members;
CREATE POLICY "Party members can join" ON party_members FOR INSERT WITH CHECK (auth.uid() = player_id);

DROP POLICY IF EXISTS "Party members can leave" ON party_members;
CREATE POLICY "Party members can leave" ON party_members FOR DELETE USING (
  auth.uid() = player_id OR
  auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id)
);

-- Sessions: GM and party members can view, GM manages
DROP POLICY IF EXISTS "Party members can view sessions" ON sessions;
CREATE POLICY "Party members can view sessions" ON sessions FOR SELECT USING (
  auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id) OR
  auth.uid() IN (SELECT player_id FROM party_members WHERE party_id = sessions.party_id)
);

DROP POLICY IF EXISTS "GM can manage session" ON sessions;
CREATE POLICY "GM can manage session" ON sessions FOR ALL
  USING (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id))
  WITH CHECK (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id));

-- Profiles: public read, owner write
DROP POLICY IF EXISTS "Public read profiles" ON profiles;
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Owner can manage profile" ON profiles;
CREATE POLICY "Owner can manage profile" ON profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('characters', 'npcs', 'parties', 'party_members', 'sessions', 'profiles');