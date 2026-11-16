-- Migração 010 — grau (APs) nas tags de PODER dos NPCs · gerado por node scripts/gen-npc-graus.js build (NÃO editar)
-- Parte 4 de 4 — rode todas as partes, uma por vez, no SQL Editor (qualquer ordem; idempotente).
-- Detalhes: supabase/migrations/010_npc_tag_graus.sql (mesmo SQL, só com os NPCs desta parte). Último SELECT = drift desta parte.
-- Backup: a 1ª parte executada cria npcs_backup_010 (estado ANTERIOR); as outras não o sobrescrevem. Rollback:
--   UPDATE npcs n SET data = b.data, updated_at = NOW() FROM npcs_backup_010 b WHERE b.id = n.id;
-- Depois de validar (ou do rollback):  DROP TABLE npcs_backup_010;

BEGIN;

CREATE TABLE IF NOT EXISTS npcs_backup_010 AS SELECT id, data FROM npcs;
-- tabela em public: sem policies + RLS ligado = invisível para anon/authenticated via API
ALTER TABLE npcs_backup_010 ENABLE ROW LEVEL SECURITY;

DROP TABLE IF EXISTS _g010;
CREATE TEMP TABLE _g010 (npc_name text NOT NULL, is_global boolean NOT NULL, tag_texto text NOT NULL, grau int CHECK (grau BETWEEN 0 AND 99));  -- grau NULL = remover grau antigo
INSERT INTO _g010 (npc_name, is_global, tag_texto, grau) VALUES
  ('Wither', TRUE, 'Toque que Apodrece Carne e Matéria Vegetal', 9),
  ('Wither', TRUE, 'Desidratação Instantânea ao Contato', 9),
  ('Wither', TRUE, 'Controle sobre a Velocidade da Decomposição', 5),
  ('Wither', TRUE, 'Sente a Vitalidade de Seres Próximos', 3),
  ('Wither', TRUE, 'Pode Direcionar o Apodrecimento a Distância Curta', 1),
  ('Wither', TRUE, 'Mão Reduzida a Osso Imune ao Próprio Poder', NULL),
  ('Wither', TRUE, 'Golpes Físicos com a Mão Óssea', 3),
  ('Wither', TRUE, 'Resistência a Dor na Extremidade Afetada', 3),
  ('Wither', TRUE, 'Presença Intimidadora em Combate', 4),
  ('Wither', TRUE, 'Precisão Cirúrgica no Toque', 5),
  ('Wither', TRUE, 'Treinamento Rigoroso da Academia Hellfire', 5),
  ('Wither', TRUE, 'Disciplina de Combate Silenciosa', 5),
  ('Wither', TRUE, 'Escolheu o Caminho do Bem por Conta Própria', NULL),
  ('Wither', TRUE, 'Lealdade Cautelosa aos Novos Colegas', NULL),
  ('Wither', TRUE, 'Instinto de Sobrevivência Aguçado', NULL),
  ('Wolf Cub', TRUE, 'Transformação em Forma Lupina Bípede', 5),
  ('Wolf Cub', TRUE, 'Garras e Presas Afiadas', 5),
  ('Wolf Cub', TRUE, 'Força e Velocidade Ampliadas na Forma Animal', 5),
  ('Wolf Cub', TRUE, 'Sentidos Aguçados de Olfato e Audição', 8),
  ('Wolf Cub', TRUE, 'Pelagem que Resiste a Cortes Superficiais', 3),
  ('Wolf Cub', TRUE, 'Salto Poderoso das Patas Traseiras', 2),
  ('Wolf Cub', TRUE, 'Uivo que Coordena Aliados a Distância', 9),
  ('Wolf Cub', TRUE, 'Rastreamento por Cheiro a Longa Distância', 10),
  ('Wolf Cub', TRUE, 'Visão Noturna Aprimorada', 6),
  ('Wolf Cub', TRUE, 'Reflexos de Predador em Combate', 5),
  ('Wolf Cub', TRUE, 'Mordida com Força de Esmagamento', 5),
  ('Wolf Cub', TRUE, 'Lealdade Instintiva a Quem Considera Matilha', NULL),
  ('Wolf Cub', TRUE, 'Energia Física Incansável', 5),
  ('Wolf Cub', TRUE, 'Determinação Bruta para Proteger os Amigos', NULL),
  ('Wolf Cub', TRUE, 'Protetor Fiel dos Mais Fracos', NULL),
  ('Wolfsbane', TRUE, 'Transformação em Lobo ou Forma Lobisomem', 6),
  ('Wolfsbane', TRUE, 'Sentidos Lupinos', 9),
  ('Wolfsbane', TRUE, 'Instintos Predatórios em Forma Animal', 6),
  ('Wolfsbane', TRUE, 'Reflexos Rápidos', NULL),
  ('Wolfsbane', TRUE, 'Lealdade', NULL),
  ('Wolfsbane', TRUE, 'Habilidade Especial', NULL),
  ('Wolfsbane', TRUE, 'Trabalho em Equipe', NULL),
  ('Wolfsbane', TRUE, 'Instinto de Sobrevivência', NULL),
  ('Wolfsbane', TRUE, 'Conhecimento Tático', NULL),
  ('Wolfsbane', TRUE, 'Ligação Empática com Mirage', NULL),
  ('Wolfsbane', TRUE, 'Resistência a Dano', NULL),
  ('Wolfsbane', TRUE, 'Movimentação Tática', NULL),
  ('Wolfsbane', TRUE, 'Ligação com Mirage', NULL),
  ('Wolfsbane', TRUE, 'Fé Escocesa', NULL),
  ('Wolfsbane', TRUE, 'Membro dos Novos Mutantes', NULL),
  ('Wolfsbane', TRUE, 'Mutante Experiente', NULL),
  ('Wolfsbane', TRUE, 'Treinamento de Combate', NULL),
  ('Wolverine', TRUE, 'Fator de Cura Acelerado', 16),
  ('Wolverine', TRUE, 'Esqueleto de Adamantium', 18),
  ('Wolverine', TRUE, 'Garras de Adamantium', 16),
  ('Wolverine', TRUE, 'Combatente Veterano', 8),
  ('Wolverine', TRUE, 'Instinto Berserker', 8),
  ('Wolverine', TRUE, 'Sentidos de Predador Apex', 10),
  ('Wolverine', TRUE, 'Código de Honra Pessoal', NULL),
  ('Wolverine', TRUE, 'Mestre em Artes Marciais', 7),
  ('Wolverine', TRUE, 'Lealdade Feroz aos Amigos', NULL),
  ('Wolverine', TRUE, 'Décadas de Experiência', 8),
  ('Wolverine', TRUE, 'Perícia em Campo', NULL),
  ('Wolverine', TRUE, 'Habilidade de Luta', NULL),
  ('Wolverine', TRUE, 'Séculos de Combate', 8),
  ('Wolverine', TRUE, 'Rastreador Implacável', 10),
  ('Wolverine', TRUE, 'Resistência a Telepatia', 12),
  ('Wolverine', TRUE, 'Conhecimento de Operações Negras', 8),
  ('Wolverine', TRUE, 'Samurai Interior', NULL),
  ('Wolverine', TRUE, 'Membro dos X-Men', NULL),
  ('Wolverine', TRUE, 'Mutante de Elite', NULL),
  ('Wolverine', TRUE, 'Veterano de Combate', NULL),
  ('Wolverine', TRUE, 'Reflexos Aguçados', NULL),
  ('Wolverine', TRUE, 'Resistência Mental Treinada', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Intangibilidade', 12),
  ('Wraith (Hector Rendoza)', TRUE, 'Resiliência Física e Mental', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Perícia em Campo', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Reflexos Rápidos', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Lealdade', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Habilidade Especial', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Trabalho em Equipe', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Instinto de Sobrevivência', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Conhecimento Tático', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Adolescente Problemático', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Membro dos X-Men', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Mutante Experiente', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Treinamento de Combate', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Habilidade de Luta', NULL),
  ('Wraith (Hector Rendoza)', TRUE, 'Determinação Inabalável', NULL),
  ('X-23', TRUE, 'Fator de Cura Acelerado', 16),
  ('X-23', TRUE, 'Garras de Adamantium', 16),
  ('X-23', TRUE, 'Instinto de Sobrevivência', NULL),
  ('X-23', TRUE, 'Assassina Condicionada', 8),
  ('X-23', TRUE, 'Habilidade de Luta', NULL),
  ('X-23', TRUE, 'Reflexos Aguçados', NULL),
  ('X-23', TRUE, 'Identidade em Construção', NULL),
  ('X-23', TRUE, 'Treinamento de Combate', NULL),
  ('X-23', TRUE, 'Resiliência Física e Mental', NULL),
  ('X-23', TRUE, 'Feromônio Desencadeia Fúria', NULL),
  ('X-23', TRUE, 'Perde Controle Total', NULL),
  ('X-23', TRUE, 'Cheiro Específico Ativa', NULL),
  ('X-23', TRUE, 'Fator de Cura Similar', 16),
  ('X-23', TRUE, 'Duas Garras por Mão', NULL),
  ('X-23', TRUE, 'Garra no Pé', NULL),
  ('X-23', TRUE, 'Sem Adamantium no Esqueleto', NULL),
  ('X-23', TRUE, 'Membro dos X-Men', NULL),
  ('X-23', TRUE, 'Mutante de Elite', NULL),
  ('X-23', TRUE, 'Veterano de Combate', NULL),
  ('X-23', TRUE, 'Resistência Mental Treinada', NULL),
  ('Xenônio', TRUE, 'Emissão de Gases e Energias Espectrais', 3),
  ('Xenônio', TRUE, 'Cria Ilusões Gasosas', 6),
  ('Xenônio', TRUE, 'Brilho Luminoso Desorientador', 5),
  ('Xenônio', TRUE, 'Forma Gasosa Evasiva', 8),
  ('Xenônio', TRUE, 'Carisma Volátil e Cintilante', NULL),
  ('Xenônio', TRUE, 'Criatividade Imprevisível', NULL),
  ('Xenônio', TRUE, 'Vigilância Constante', NULL),
  ('Xenônio', TRUE, 'Surge e Some sem Aviso', 5),
  ('Xenônio', TRUE, 'Aluno do Instituto Xavier', NULL),
  ('Xenônio', TRUE, 'Movimentação Tática', NULL),
  ('Xenônio', TRUE, 'Intuição de Batalha', NULL),
  ('Xenônio', TRUE, 'Resistência a Dano', NULL),
  ('Xenônio', TRUE, 'Membro dos X-Men', NULL),
  ('Xenônio', TRUE, 'Mutante Experiente', NULL),
  ('Xenônio', TRUE, 'Treinamento de Combate', NULL);

UPDATE npcs n SET
  data = n.data
    || CASE WHEN jsonb_typeof(n.data -> 'temas') = 'array' THEN jsonb_build_object('temas', (
         SELECT COALESCE(jsonb_agg(
           CASE WHEN jsonb_typeof(t.v -> 'poder') = 'array' THEN jsonb_set(t.v, '{poder}', (
             SELECT COALESCE(jsonb_agg(COALESCE((
          SELECT CASE WHEN g.grau IS NULL THEN
                        CASE WHEN jsonb_typeof(p.v) = 'object' THEN p.v - 'grau'
                             WHEN lower(btrim(p.v #>> '{}')) = lower(btrim(g.tag_texto)) THEN p.v
                             ELSE jsonb_build_object('texto', btrim(regexp_replace(btrim(p.v #>> '{}'), '\s+-?[0-9]+$', ''))) END
                      WHEN jsonb_typeof(p.v) = 'object' THEN p.v || jsonb_build_object('grau', g.grau)
                      ELSE jsonb_build_object('texto', CASE WHEN lower(btrim(p.v #>> '{}')) = lower(btrim(g.tag_texto)) THEN p.v #>> '{}' ELSE btrim(regexp_replace(btrim(p.v #>> '{}'), '\s+-?[0-9]+$', '')) END, 'grau', g.grau) END
          FROM _g010 g
          WHERE g.npc_name = n.name AND g.is_global = n.is_global
            AND (CASE jsonb_typeof(p.v)
              WHEN 'object' THEN lower(btrim(p.v ->> 'texto')) = lower(btrim(g.tag_texto))
              WHEN 'string' THEN lower(btrim(g.tag_texto)) IN (lower(btrim(p.v #>> '{}')), lower(btrim(regexp_replace(btrim(p.v #>> '{}'), '\s+-?[0-9]+$', ''))))
              ELSE FALSE END)
          LIMIT 1), p.v) ORDER BY p.o), '[]'::jsonb)
             FROM jsonb_array_elements(t.v -> 'poder') WITH ORDINALITY p(v, o)))
           ELSE t.v END ORDER BY t.o), '[]'::jsonb)
         FROM jsonb_array_elements(n.data -> 'temas') WITH ORDINALITY t(v, o)))
       ELSE '{}'::jsonb END
    || CASE WHEN jsonb_typeof(n.data -> 'tags') = 'array' THEN jsonb_build_object('tags', (
         SELECT COALESCE(jsonb_agg(COALESCE((
          SELECT CASE WHEN g.grau IS NULL THEN
                        CASE WHEN jsonb_typeof(x.v) = 'object' THEN x.v - 'grau'
                             WHEN lower(btrim(x.v #>> '{}')) = lower(btrim(g.tag_texto)) THEN x.v
                             ELSE jsonb_build_object('texto', btrim(regexp_replace(btrim(x.v #>> '{}'), '\s+-?[0-9]+$', ''))) END
                      WHEN jsonb_typeof(x.v) = 'object' THEN x.v || jsonb_build_object('grau', g.grau)
                      ELSE jsonb_build_object('texto', CASE WHEN lower(btrim(x.v #>> '{}')) = lower(btrim(g.tag_texto)) THEN x.v #>> '{}' ELSE btrim(regexp_replace(btrim(x.v #>> '{}'), '\s+-?[0-9]+$', '')) END, 'grau', g.grau) END
          FROM _g010 g
          WHERE g.npc_name = n.name AND g.is_global = n.is_global
            AND (CASE jsonb_typeof(x.v)
              WHEN 'object' THEN lower(btrim(x.v ->> 'texto')) = lower(btrim(g.tag_texto))
              WHEN 'string' THEN lower(btrim(g.tag_texto)) IN (lower(btrim(x.v #>> '{}')), lower(btrim(regexp_replace(btrim(x.v #>> '{}'), '\s+-?[0-9]+$', ''))))
              ELSE FALSE END)
          LIMIT 1), x.v) ORDER BY x.o), '[]'::jsonb)
         FROM jsonb_array_elements(n.data -> 'tags') WITH ORDINALITY x(v, o)))
       ELSE '{}'::jsonb END,
  updated_at = NOW()
WHERE EXISTS (SELECT 1 FROM _g010 g WHERE g.npc_name = n.name AND g.is_global = n.is_global);

COMMIT;

-- Drift: linhas com grau da lista sem NPC ou sem a tag no NPC (vazio = tudo aplicado).
SELECT g.npc_name, g.tag_texto, g.grau,
       CASE WHEN NOT EXISTS (SELECT 1 FROM npcs n WHERE n.name = g.npc_name AND n.is_global = g.is_global)
            THEN 'NPC não encontrado' ELSE 'tag não encontrada' END AS motivo
FROM _g010 g
WHERE g.grau IS NOT NULL AND NOT EXISTS (
  SELECT 1 FROM npcs n
  WHERE n.name = g.npc_name AND n.is_global = g.is_global
    AND (EXISTS (
      SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(n.data -> 'tags') = 'array' THEN n.data -> 'tags' ELSE '[]'::jsonb END) e(v)
      WHERE (CASE jsonb_typeof(e.v)
              WHEN 'object' THEN lower(btrim(e.v ->> 'texto')) = lower(btrim(g.tag_texto))
              WHEN 'string' THEN lower(btrim(g.tag_texto)) IN (lower(btrim(e.v #>> '{}')), lower(btrim(regexp_replace(btrim(e.v #>> '{}'), '\s+-?[0-9]+$', ''))))
              ELSE FALSE END))
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(n.data -> 'temas') = 'array' THEN n.data -> 'temas' ELSE '[]'::jsonb END) t(v),
           jsonb_array_elements(CASE WHEN jsonb_typeof(t.v -> 'poder') = 'array' THEN t.v -> 'poder' ELSE '[]'::jsonb END) p(v)
      WHERE (CASE jsonb_typeof(p.v)
              WHEN 'object' THEN lower(btrim(p.v ->> 'texto')) = lower(btrim(g.tag_texto))
              WHEN 'string' THEN lower(btrim(g.tag_texto)) IN (lower(btrim(p.v #>> '{}')), lower(btrim(regexp_replace(btrim(p.v #>> '{}'), '\s+-?[0-9]+$', ''))))
              ELSE FALSE END))))
ORDER BY 1, 2;
