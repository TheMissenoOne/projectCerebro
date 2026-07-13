-- ═══════════════════════════════════════════════════════════════
-- Migração 008 — Atribuição de esquadras (data.esquadrao) para NPCs existentes
-- Não toca nos 19 NPCs novos da migração 007 (já nascem com esquadrao definido).
-- ═══════════════════════════════════════════════════════════════

BEGIN;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Advocates"'::jsonb), updated_at = NOW()
  WHERE name = 'Rogue' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Advocates"'::jsonb), updated_at = NOW()
  WHERE name = 'Boggart' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Advocates"'::jsonb), updated_at = NOW()
  WHERE name = 'Náiade' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Advocates"'::jsonb), updated_at = NOW()
  WHERE name = 'Mira (Pinpoint)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Advocates"'::jsonb), updated_at = NOW()
  WHERE name = 'Trovão' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Advocates"'::jsonb), updated_at = NOW()
  WHERE name = 'Umbra' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Advocates"'::jsonb), updated_at = NOW()
  WHERE name = 'Xenônio' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Alpha Squadron"'::jsonb), updated_at = NOW()
  WHERE name = 'Karma' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Alpha Squadron"'::jsonb), updated_at = NOW()
  WHERE name = 'Estrela Polar' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Alpha Squadron"'::jsonb), updated_at = NOW()
  WHERE name = 'Anole' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Alpha Squadron"'::jsonb), updated_at = NOW()
  WHERE name = 'Indra' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Alpha Squadron"'::jsonb), updated_at = NOW()
  WHERE name = 'Kidogo' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Alpha Squadron"'::jsonb), updated_at = NOW()
  WHERE name = 'Loa' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Alpha Squadron"'::jsonb), updated_at = NOW()
  WHERE name = 'Rede (Network)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Alpha Squadron"'::jsonb), updated_at = NOW()
  WHERE name = 'Moça de Borracha' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Chevaliers"'::jsonb), updated_at = NOW()
  WHERE name = 'Gambit' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Chevaliers"'::jsonb), updated_at = NOW()
  WHERE name = 'Bling!' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Chevaliers"'::jsonb), updated_at = NOW()
  WHERE name = 'Flubber' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Chevaliers"'::jsonb), updated_at = NOW()
  WHERE name = 'Foxx' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Chevaliers"'::jsonb), updated_at = NOW()
  WHERE name = 'Onyxx' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Chevaliers"'::jsonb), updated_at = NOW()
  WHERE name = 'Garoto Chuva' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Corsairs"'::jsonb), updated_at = NOW()
  WHERE name = 'Ciclope' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Corsairs"'::jsonb), updated_at = NOW()
  WHERE name = 'Dríade' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Corsairs"'::jsonb), updated_at = NOW()
  WHERE name = 'Espinho' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Corsairs"'::jsonb), updated_at = NOW()
  WHERE name = 'Espectro' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Corsairs"'::jsonb), updated_at = NOW()
  WHERE name = 'Três‑em‑Uma (Stepford Cuckoos)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Excelsiors"'::jsonb), updated_at = NOW()
  WHERE name = 'Ícone' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Excelsiors"'::jsonb), updated_at = NOW()
  WHERE name = 'Cannonball' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Excelsiors"'::jsonb), updated_at = NOW()
  WHERE name = 'Sunspot' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Excelsiors"'::jsonb), updated_at = NOW()
  WHERE name = 'Husk' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Exemplars"'::jsonb), updated_at = NOW()
  WHERE name = 'Fera' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Exemplars"'::jsonb), updated_at = NOW()
  WHERE name = 'Anjo' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Exemplars"'::jsonb), updated_at = NOW()
  WHERE name = 'M (Monet St. Croix)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Exemplars"'::jsonb), updated_at = NOW()
  WHERE name = 'Cypher' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Exemplars"'::jsonb), updated_at = NOW()
  WHERE name = 'Boomer' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Hellions"'::jsonb), updated_at = NOW()
  WHERE name = 'Emma Frost' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Hellions"'::jsonb), updated_at = NOW()
  WHERE name = 'Hellion' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Hellions"'::jsonb), updated_at = NOW()
  WHERE name = 'Rockslide' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"New Mutants"'::jsonb), updated_at = NOW()
  WHERE name = 'Mirage' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"New Mutants"'::jsonb), updated_at = NOW()
  WHERE name = 'Elixir' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"New Mutants"'::jsonb), updated_at = NOW()
  WHERE name = 'Prodigy' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"New Mutants"'::jsonb), updated_at = NOW()
  WHERE name = 'Surge' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"New Mutants"'::jsonb), updated_at = NOW()
  WHERE name = 'Wallflower' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Paragons"'::jsonb), updated_at = NOW()
  WHERE name = 'Magma' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Paragons"'::jsonb), updated_at = NOW()
  WHERE name = 'Wolfsbane' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Paragons"'::jsonb), updated_at = NOW()
  WHERE name = 'Dust (Poeira)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Paladins"'::jsonb), updated_at = NOW()
  WHERE name = 'Kitty Pryde' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Paladins"'::jsonb), updated_at = NOW()
  WHERE name = 'Armor' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Storm''s Squad"'::jsonb), updated_at = NOW()
  WHERE name = 'Tempestade' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Storm''s Squad"'::jsonb), updated_at = NOW()
  WHERE name = 'Chamber' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Storm''s Squad"'::jsonb), updated_at = NOW()
  WHERE name = 'Timeslip' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(data, '{esquadrao}', '"Storm''s Squad"'::jsonb), updated_at = NOW()
  WHERE name = 'Impulse' AND is_global = TRUE;

COMMIT;
