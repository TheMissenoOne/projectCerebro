-- ═══════════════════════════════════════════════════════════════
-- Migração 005 — Adiciona foto_url à tabela npcs
-- Permite mostrar imagens de perfil dos NPCs no Cérebro/Dashboard
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE npcs ADD COLUMN IF NOT EXISTS foto_url TEXT;
CREATE INDEX IF NOT EXISTS idx_npcs_foto ON npcs(foto_url) WHERE foto_url IS NOT NULL;
