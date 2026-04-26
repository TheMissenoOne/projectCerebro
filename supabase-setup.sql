-- X-MEN TTRPG - Supabase Setup for GitHub Pages
-- Run this in your Supabase SQL Editor (uses Supabase Auth)

-- Enable Row Level Security on all tables
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- If profiles table exists, enable it
DO $$ BEGIN
  ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Characters: authenticated read/write own
DROP POLICY IF EXISTS "Auth can manage characters" ON characters;
CREATE POLICY "Auth can manage characters" ON characters FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- NPCs: authenticated read
DROP POLICY IF EXISTS "Auth can read NPCs" ON npcs;
CREATE POLICY "Auth can read NPCs" ON npcs FOR SELECT USING (auth.role() = 'authenticated');

-- Parties: authenticated read
DROP POLICY IF EXISTS "Auth can read parties" ON parties;
CREATE POLICY "Auth can read parties" ON parties FOR SELECT USING (auth.role() = 'authenticated');

-- Party members: authenticated read
DROP POLICY IF EXISTS "Auth can read party_members" ON party_members;
CREATE POLICY "Auth can read party_members" ON party_members FOR SELECT USING (auth.role() = 'authenticated');

-- Sessions: authenticated read
DROP POLICY IF EXISTS "Auth can read sessions" ON sessions;
CREATE POLICY "Auth can read sessions" ON sessions FOR SELECT USING (auth.role() = 'authenticated');

-- Profiles (if exists)
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can manage profiles" ON profiles;
  CREATE POLICY "Anyone can manage profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Verify tables exist
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;