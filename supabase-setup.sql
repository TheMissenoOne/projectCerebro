-- X-MEN TTRPG - Supabase Setup for GitHub Pages
-- Run this in your Supabase SQL Editor

-- Disable RLS completely (for dev)
ALTER TABLE IF EXISTS characters DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS npcs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS parties DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS party_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS profiles DISABLE ROW LEVEL SECURITY;

-- Verify
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('characters', 'npcs', 'parties', 'party_members', 'sessions', 'profiles');