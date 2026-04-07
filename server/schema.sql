-- X-MEN TTRPG Schema PostgreSQL
-- Executar via: psql $DATABASE_URL -f schema.sql
-- Ou via Render Shell: node -e "require('./server/db').query(fs.readFileSync('schema.sql','utf8'))"

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USUÁRIOS
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  username    TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('player','gm')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- PARTIES
CREATE TABLE IF NOT EXISTS parties (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  code        TEXT UNIQUE NOT NULL,
  gm_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBROS DA PARTY
CREATE TABLE IF NOT EXISTS party_members (
  party_id    UUID NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
  player_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (party_id, player_id)
);

-- PERSONAGENS
CREATE TABLE IF NOT EXISTS characters (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  party_id    UUID REFERENCES parties(id) ON DELETE SET NULL,
  name        TEXT DEFAULT 'Novo Personagem',
  codename    TEXT DEFAULT '',
  data        JSONB NOT NULL DEFAULT '{}',
  foto_base64 TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- NPCs
CREATE TABLE IF NOT EXISTS npcs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id    UUID REFERENCES parties(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  codename    TEXT DEFAULT '',
  faction     TEXT DEFAULT 'neutro',
  danger      TEXT DEFAULT 'medio' CHECK (danger IN ('baixo','medio','alto','extremo')),
  data        JSONB NOT NULL DEFAULT '{}',
  is_global   BOOLEAN DEFAULT FALSE,
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- SESSÕES
CREATE TABLE IF NOT EXISTS sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id    UUID NOT NULL REFERENCES parties(id) ON DELETE CASCADE UNIQUE,
  title       TEXT DEFAULT '',
  notes       TEXT DEFAULT '',
  round       INT DEFAULT 0,
  encounter   JSONB DEFAULT '[]',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- WIKI PAGES
CREATE TABLE IF NOT EXISTS wiki_pages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL DEFAULT '',
  category    TEXT DEFAULT 'geral',
  order_idx   INT DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ÍNDICES DE PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_characters_player ON characters(player_id);
CREATE INDEX IF NOT EXISTS idx_characters_party ON characters(party_id);
CREATE INDEX IF NOT EXISTS idx_party_members_player ON party_members(player_id);
CREATE INDEX IF NOT EXISTS idx_npcs_global ON npcs(is_global);
CREATE INDEX IF NOT EXISTS idx_npcs_party ON npcs(party_id);
