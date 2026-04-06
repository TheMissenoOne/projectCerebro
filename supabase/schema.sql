-- XMEN TTRPG - Schema do Banco de Dados Supabase

-- PERFIS DE USUÁRIO
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'player' CHECK (role IN ('player', 'gm')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GROUPS / PARTIES
CREATE TABLE parties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  gm_id UUID NOT NULL REFERENCES profiles(id),
  session_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBROS DA PARTY
CREATE TABLE party_members (
  party_id UUID REFERENCES parties(id) ON DELETE CASCADE,
  player_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (party_id, player_id)
);

-- FICHAS DE PERSONAGEM
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  party_id UUID REFERENCES parties(id) ON DELETE SET NULL,
  name TEXT,
  codename TEXT,
  data JSONB NOT NULL DEFAULT '{}',
  foto_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NPCs / CÉREBRO
CREATE TABLE npcs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id UUID REFERENCES parties(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  codename TEXT,
  faction TEXT,
  danger TEXT CHECK (danger IN ('baixo','medio','alto','extremo')),
  data JSONB NOT NULL DEFAULT '{}',
  is_global BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SESSÕES (log de encontros)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id UUID NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
  title TEXT,
  notes TEXT,
  round INT DEFAULT 0,
  encounter JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WIKI PAGES
CREATE TABLE wiki_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  order_idx INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ÍNDICES
CREATE INDEX idx_characters_player ON characters(player_id);
CREATE INDEX idx_characters_party ON characters(party_id);
CREATE INDEX idx_npcs_party ON npcs(party_id);
CREATE INDEX idx_npcs_global ON npcs(is_global);
CREATE INDEX idx_party_members_player ON party_members(player_id);
CREATE INDEX idx_sessions_party ON sessions(party_id);
CREATE INDEX idx_wiki_category ON wiki_pages(category);
