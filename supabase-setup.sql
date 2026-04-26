-- X-MEN TTRPG - Supabase Setup for GitHub Pages
-- Run this in your Supabase SQL Editor (uses Supabase Auth)

-- Enable Row Level Security on all tables
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Characters: public read, owner writes
DROP POLICY IF EXISTS "Public read characters" ON characters;
CREATE POLICY "Public read characters" ON characters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Owner can manage own characters" ON characters;
CREATE POLICY "Owner can manage own characters" ON characters FOR ALL USING (auth.uid() = player_id) WITH CHECK (auth.uid() = player_id);

-- NPCs: public read, authenticated users manage
DROP POLICY IF EXISTS "Public read NPCs" ON npcs;
CREATE POLICY "Public read NPCs" ON npcs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Auth can manage NPCs" ON npcs;
CREATE POLICY "Auth can manage NPCs" ON npcs FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Parties: public read, GM manages
DROP POLICY IF EXISTS "Public read parties" ON parties;
CREATE POLICY "Public read parties" ON parties FOR SELECT USING (true);

DROP POLICY IF EXISTS "GM can manage party" ON parties;
CREATE POLICY "GM can manage party" ON parties FOR ALL USING (auth.uid() = gm_id) WITH CHECK (auth.uid() = gm_id);

-- Party members: authenticated can join
DROP POLICY IF EXISTS "Auth can view party_members" ON party_members;
CREATE POLICY "Auth can view party_members" ON party_members FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Auth can join party" ON party_members;
CREATE POLICY "Auth can join party" ON party_members FOR INSERT WITH CHECK (auth.uid() = player_id);

-- Sessions: authenticated can view, GM manages
DROP POLICY IF EXISTS "Auth can view sessions" ON sessions;
CREATE POLICY "Auth can view sessions" ON sessions FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "GM can manage session" ON sessions;
CREATE POLICY "GM can manage session" ON sessions FOR ALL USING (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id)) WITH CHECK (auth.uid() IN (SELECT gm_id FROM parties WHERE id = party_id));

-- Profiles: owner manages
DROP POLICY IF EXISTS "Public read profiles" ON profiles;
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Owner can manage profile" ON profiles;
CREATE POLICY "Owner can manage profile" ON profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('characters', 'npcs', 'parties', 'party_members', 'sessions', 'profiles');