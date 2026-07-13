-- ═══════════════════════════════════════════════════════════════
-- Migração 004 — Theme cards enriquecidos para TODOS os NPCs originais
-- Gerado por scripts/gen-enrich-temas.js
-- Substitui data.temas dos 133 NPCs do cerebro_rebalanceado.md
-- NÃO toca em characters. Idempotente.
-- ═══════════════════════════════════════════════════════════════

BEGIN;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Telepatia Ômega","poder":[{"texto":"Telepatia Ômega","grau":6},{"texto":"Controle Mental Profundo","grau":5},{"texto":"Mestre de Xadrez","grau":3}],"fraqueza":[]},{"nome":"Fundador dos X-Men","poder":[{"texto":"Estrategista e Líder Visionário","grau":4},{"texto":"Fundador do Instituto Xavier","grau":4},{"texto":"Paraplégico","grau":3}],"fraqueza":[]},{"nome":"Mentor e Estrategista","poder":[{"texto":"Mestre em Xadrez Psíquico","grau":4},{"texto":"Intelecto Genial","grau":4},{"texto":"Rede de Contatos Global","grau":3}],"fraqueza":[]},{"nome":"Visão de um Mundo Melhor","poder":[{"texto":"Idealismo Inabalável","grau":4},{"texto":"Diplomacia Mutante-Humano","grau":3}],"fraqueza":[]},{"nome":"Limitações","poder":[],"fraqueza":[{"texto":"Paraplégico","grau":3},{"texto":"Relutante em Usar Força Total","grau":2},{"texto":"Coração Vulnerável a Traições","grau":2},{"texto":"Segredos que Pesa na Consciência","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Telepatia Ômega","grau":6},{"texto":"Controle Mental Profundo","grau":5},{"texto":"Mestre de Xadrez","grau":3},{"texto":"Estrategista e Líder Visionário","grau":4},{"texto":"Fundador do Instituto Xavier","grau":4},{"texto":"Paraplégico","grau":3},{"texto":"Mestre em Xadrez Psíquico","grau":4},{"texto":"Intelecto Genial","grau":4},{"texto":"Rede de Contatos Global","grau":3},{"texto":"Idealismo Inabalável","grau":4},{"texto":"Diplomacia Mutante-Humano","grau":3},{"texto":"Relutante em Usar Força Total","grau":2},{"texto":"Coração Vulnerável a Traições","grau":2},{"texto":"Segredos que Pesa na Consciência","grau":2},{"texto":"Líder dos X-Men","grau":5},{"texto":"Segredos que Pesam","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Niveau Ômega ou Equivalente","grau":5},{"texto":"Décadas de Experiência de Combate","grau":4},{"texto":"Mestre Tático","grau":4},{"texto":"Vontade Indomável","grau":4},{"texto":"Rede de Contatos e Aliados","grau":3},{"texto":"Ameaça Nível Global","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Professor X' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Rajada Óptica","poder":[{"texto":"Rajada Óptica de Força Cinética","grau":5},{"texto":"Precisão Cirúrgica de Tiro","grau":4}],"fraqueza":[{"texto":"Sem Controle sem o Visor","grau":4}]},{"nome":"Comandante de Campo","poder":[{"texto":"Liderança Tática de Elite","grau":4},{"texto":"Estrategista de Campo","grau":3}],"fraqueza":[]},{"nome":"Líder dos X-Men","poder":[{"texto":"Lealdade à Equipe Acima de Tudo","grau":4},{"texto":"Disciplina de Aço","grau":4},{"texto":"Estrategista Nato","grau":3}],"fraqueza":[{"texto":"Peso da Responsabilidade","grau":2}]},{"nome":"Coração Sob a Armadura","poder":[{"texto":"Amor por Jean Grey","grau":3},{"texto":"Relação Conturbada com o Pai","grau":2}],"fraqueza":[{"texto":"Rigidez Emocional","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Rajada Óptica de Força Cinética","grau":5},{"texto":"Precisão Cirúrgica de Tiro","grau":4},{"texto":"Sem Controle sem o Visor","grau":4},{"texto":"Liderança Tática de Elite","grau":4},{"texto":"Estrategista de Campo","grau":3},{"texto":"Lealdade à Equipe Acima de Tudo","grau":4},{"texto":"Disciplina de Aço","grau":4},{"texto":"Estrategista Nato","grau":3},{"texto":"Peso da Responsabilidade","grau":2},{"texto":"Amor por Jean Grey","grau":3},{"texto":"Relação Conturbada com o Pai","grau":2},{"texto":"Rigidez Emocional","grau":2},{"texto":"Comandante de Campo","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Ciclope' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Fator de Cura e Adamantium","poder":[{"texto":"Fator de Cura Acelerado","grau":6},{"texto":"Esqueleto de Adamantium","grau":5},{"texto":"Garras de Adamantium","grau":5}],"fraqueza":[]},{"nome":"Fera Selvagem","poder":[{"texto":"Combatente Veterano","grau":4},{"texto":"Instinto Berserker","grau":3}],"fraqueza":[{"texto":"Instinto Berserker","grau":3}]},{"nome":"Samurai Interior","poder":[{"texto":"Código de Honra Pessoal","grau":4},{"texto":"Mestre em Artes Marciais","grau":3},{"texto":"Lealdade Feroz aos Amigos","grau":3}],"fraqueza":[]},{"nome":"Passado Fragmentado","poder":[{"texto":"Décadas de Experiência","grau":3}],"fraqueza":[{"texto":"Memórias Fragmentadas","grau":3},{"texto":"Raiva Incontrolável","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Fator de Cura Acelerado","grau":6},{"texto":"Esqueleto de Adamantium","grau":5},{"texto":"Garras de Adamantium","grau":5},{"texto":"Combatente Veterano","grau":4},{"texto":"Instinto Berserker","grau":3},{"texto":"Código de Honra Pessoal","grau":4},{"texto":"Mestre em Artes Marciais","grau":3},{"texto":"Lealdade Feroz aos Amigos","grau":3},{"texto":"Décadas de Experiência","grau":3},{"texto":"Memórias Fragmentadas","grau":3},{"texto":"Raiva Incontrolável","grau":2},{"texto":"Samurai Interior","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Sentidos de Predador Apex","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Wolverine' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Senhora dos Elementos","poder":[{"texto":"Controle Climático Global","grau":6},{"texto":"Desencadeia Raios com Precisão Cirúrgica","grau":5},{"texto":"Criação de Tornados e Furacões","grau":5}],"fraqueza":[]},{"nome":"Deusa do Trovão","poder":[{"texto":"Voo via Correntes de Ar","grau":4},{"texto":"Considerada Deusa por culturas africanas","grau":3}],"fraqueza":[{"texto":"Claustrofobia Severa","grau":3}]},{"nome":"Rainha de Wakanda","poder":[{"texto":"Liderança e Realeza","grau":4},{"texto":"Orgulho Africano","grau":3}],"fraqueza":[]},{"nome":"Espírito Livre","poder":[{"texto":"Compaixão e Sabedoria","grau":3}],"fraqueza":[{"texto":"Responsabilidade de Líder","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Controle Climático Global","grau":6},{"texto":"Desencadeia Raios com Precisão Cirúrgica","grau":5},{"texto":"Criação de Tornados e Furacões","grau":5},{"texto":"Voo via Correntes de Ar","grau":4},{"texto":"Considerada Deusa por culturas africanas","grau":3},{"texto":"Claustrofobia Severa","grau":3},{"texto":"Liderança e Realeza","grau":4},{"texto":"Orgulho Africano","grau":3},{"texto":"Compaixão e Sabedoria","grau":3},{"texto":"Responsabilidade de Líder","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Liderança Carismática","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Tempestade' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Anfitriã da Fênix","poder":[{"texto":"Telepatia de Nível Ômega","grau":5},{"texto":"Anfitrião da Força Fênix","grau":6},{"texto":"Elo Psíquico com Scott Summers","grau":3}],"fraqueza":[]},{"nome":"Telepatia e Telecinese Ômega","poder":[{"texto":"Telecinesia Precisa e Devastadora","grau":5},{"texto":"Empatia Profunda","grau":4}],"fraqueza":[]},{"nome":"Coração dos X-Men","poder":[{"texto":"Empatia Profunda","grau":4},{"texto":"Elo Psíquico com Ciclope","grau":4},{"texto":"Mentora de Jovens Mutantes","grau":3}],"fraqueza":[]},{"nome":"Potencial Ilimitado","poder":[{"texto":"Poder Latente Além da Compreensão","grau":4}],"fraqueza":[]},{"nome":"Fardo da Fênix","poder":[],"fraqueza":[{"texto":"Fênix Pode Consumir sua Consciência","grau":4},{"texto":"Medo do Próprio Poder","grau":3},{"texto":"Trauma de Morte e Renascimento","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Telepatia de Nível Ômega","grau":5},{"texto":"Anfitrião da Força Fênix","grau":6},{"texto":"Elo Psíquico com Scott Summers","grau":3},{"texto":"Telecinesia Precisa e Devastadora","grau":5},{"texto":"Empatia Profunda","grau":4},{"texto":"Elo Psíquico com Ciclope","grau":4},{"texto":"Mentora de Jovens Mutantes","grau":3},{"texto":"Poder Latente Além da Compreensão","grau":4},{"texto":"Fênix Pode Consumir sua Consciência","grau":4},{"texto":"Medo do Próprio Poder","grau":3},{"texto":"Trauma de Morte e Renascimento","grau":3},{"texto":"Elo Psíquico com Scott","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Niveau Ômega ou Equivalente","grau":5},{"texto":"Décadas de Experiência de Combate","grau":4},{"texto":"Mestre Tático","grau":4},{"texto":"Vontade Indomável","grau":4},{"texto":"Rede de Contatos e Aliados","grau":3},{"texto":"Ameaça Nível Global","grau":4},{"texto":"Potencial Ômega não totalmente desbloqueado","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Jean Grey' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Intelecto Genial","poder":[{"texto":"Intelecto Polímata","grau":5},{"texto":"Aparência Felina Azul","grau":3}],"fraqueza":[]},{"nome":"Fera Azul","poder":[{"texto":"Agilidade Felina Sobrenatural","grau":5},{"texto":"Força Sobre-humana","grau":4},{"texto":"Patas e Presas","grau":3}],"fraqueza":[{"texto":"Aparência Desfavorece","grau":2}]},{"nome":"Coração Gentil","poder":[{"texto":"Médico dos X-Men","grau":3},{"texto":"Consciência da Equipe","grau":3}],"fraqueza":[]},{"nome":"Linha Tênue","poder":[],"fraqueza":[{"texto":"Moralidade Flexível","grau":3},{"texto":"Faz o que Precisa, não o que é Certo","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Intelecto Polímata","grau":5},{"texto":"Aparência Felina Azul","grau":3},{"texto":"Agilidade Felina Sobrenatural","grau":5},{"texto":"Força Sobre-humana","grau":4},{"texto":"Patas e Presas","grau":3},{"texto":"Aparência Desfavorece","grau":2},{"texto":"Médico dos X-Men","grau":3},{"texto":"Consciência da Equipe","grau":3},{"texto":"Moralidade Flexível","grau":3},{"texto":"Faz o que Precisa, não o que é Certo","grau":2},{"texto":"Aparência Desfavorece Socialmente","grau":2},{"texto":"Faz o que Precisa","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Médico e Cirurgião de Elite","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Fera' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Criocinese Ômega","poder":[{"texto":"Criocinese Ômega","grau":6},{"texto":"Transformação em Ser de Gelo Puro","grau":5},{"texto":"Armadura de Gelo Instantânea","grau":4}],"fraqueza":[]},{"nome":"Poder Gelado","poder":[{"texto":"Criação de Estruturas de Gelo Complexas","grau":4},{"texto":"Humor Defensivo","grau":2}],"fraqueza":[{"texto":"Humor Defensivo","grau":2}]},{"nome":"Príncipe de Serval","poder":[{"texto":"Herança de Política Africana","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Criocinese Ômega","grau":6},{"texto":"Transformação em Ser de Gelo Puro","grau":5},{"texto":"Armadura de Gelo Instantânea","grau":4},{"texto":"Criação de Estruturas de Gelo Complexas","grau":4},{"texto":"Humor Defensivo","grau":2},{"texto":"Herança de Política Africana","grau":3},{"texto":"Potencial Ômega Raramente Usado","grau":3},{"texto":"Herança de Serval","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Potencial Ômega raramente utilizado","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Ícone' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Asas de Anjo","poder":[{"texto":"Asas","grau":4},{"texto":"Como Arcanjo","grau":4}],"fraqueza":[]},{"nome":"Bilionário Filantropo","poder":[{"texto":"Bilionário Worthington Industries","grau":4},{"texto":"Aparência Angélica","grau":3}],"fraqueza":[]},{"nome":"Sangue de Cura","poder":[{"texto":"Sangue com Propriedades Curativas Únicas","grau":4}],"fraqueza":[]},{"nome":"Anjo da Morte","poder":[],"fraqueza":[{"texto":"Trauma de Apocalipse","grau":3},{"texto":"Lado Sombrio Arcangel","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Asas","grau":4},{"texto":"Como Arcanjo","grau":4},{"texto":"Bilionário Worthington Industries","grau":4},{"texto":"Aparência Angélica","grau":3},{"texto":"Sangue com Propriedades Curativas Únicas","grau":4},{"texto":"Trauma de Apocalipse","grau":3},{"texto":"Lado Sombrio Arcangel","grau":3},{"texto":"Bilionário Worthington","grau":4},{"texto":"Sangue Curativo","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Anjo' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Aço Orgânico","poder":[{"texto":"Transformação em Aço Orgânico Indestrutível","grau":5},{"texto":"Força Colossal","grau":5},{"texto":"Invulnerabilidade ao Dano Físico Convencional","grau":5}],"fraqueza":[]},{"nome":"Artista e Guerreiro","poder":[{"texto":"Artista e Pintor Sensível","grau":3}],"fraqueza":[]},{"nome":"Protetor da Família","poder":[{"texto":"Lealdade à Irmã Magik","grau":4},{"texto":"Força Interior","grau":3}],"fraqueza":[]},{"nome":"Gigante Gentil","poder":[],"fraqueza":[{"texto":"Pesa a Perda de Seus Amigos","grau":2},{"texto":"Manso Demais para Ser Cruel","grau":1}]}]'::jsonb),
  tags = '[{"texto":"Transformação em Aço Orgânico Indestrutível","grau":5},{"texto":"Força Colossal","grau":5},{"texto":"Invulnerabilidade ao Dano Físico Convencional","grau":5},{"texto":"Artista e Pintor Sensível","grau":3},{"texto":"Lealdade à Irmã Magik","grau":4},{"texto":"Força Interior","grau":3},{"texto":"Pesa a Perda de Seus Amigos","grau":2},{"texto":"Manso Demais para Ser Cruel","grau":1},{"texto":"Artista e Pintor","grau":3},{"texto":"Protetor da Família Rasputin","grau":4},{"texto":"Perda de Amigos Pesa","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Colossus' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Teletransporte Bamf","poder":[{"texto":"Teletransporte via Dimensão Sombria (bamf)","grau":5},{"texto":"Agilidade Acrobática Extrema","grau":5}],"fraqueza":[]},{"nome":"Acrobata Sombrio","poder":[{"texto":"Cauda Preênsil","grau":3},{"texto":"Visão no Escuro","grau":3}],"fraqueza":[]},{"nome":"Fé e Devoção","poder":[{"texto":"Fé Católica Profunda","grau":4}],"fraqueza":[{"texto":"Aparência Demoníaca","grau":2}]},{"nome":"Palhaço Triste","poder":[{"texto":"Humor como Defesa","grau":3}],"fraqueza":[{"texto":"Autoestima Frágil","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Teletransporte via Dimensão Sombria (bamf)","grau":5},{"texto":"Agilidade Acrobática Extrema","grau":5},{"texto":"Cauda Preênsil","grau":3},{"texto":"Visão no Escuro","grau":3},{"texto":"Fé Católica Profunda","grau":4},{"texto":"Aparência Demoníaca","grau":2},{"texto":"Humor como Defesa","grau":3},{"texto":"Autoestima Frágil","grau":2},{"texto":"Acrobata Consumado","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Cada Teleporte deixa rastro de enxofre","grau":1}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Noturno' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Fase","poder":[{"texto":"Intangibilidade","grau":5},{"texto":"Disrupção de Circuitos Eletrônicos ao Atravessar","grau":3}],"fraqueza":[]},{"nome":"Mestra da Tecnologia","poder":[{"texto":"Hacking e Programação de Elite","grau":5}],"fraqueza":[]},{"nome":"Knight de Solano","poder":[{"texto":"Ninjitsu","grau":3},{"texto":"Lockheed","grau":4}],"fraqueza":[]},{"nome":"Coração Valente","poder":[{"texto":"Liderança Natural","grau":3}],"fraqueza":[{"texto":"Fisicamente Frágil","grau":2},{"texto":"Coração Partido por Colossus","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Intangibilidade","grau":5},{"texto":"Disrupção de Circuitos Eletrônicos ao Atravessar","grau":3},{"texto":"Hacking e Programação de Elite","grau":5},{"texto":"Ninjitsu","grau":3},{"texto":"Lockheed","grau":4},{"texto":"Liderança Natural","grau":3},{"texto":"Fisicamente Frágil","grau":2},{"texto":"Coração Partido por Colossus","grau":2},{"texto":"Mestra em Hacking","grau":4},{"texto":"Knight de Solano","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Kitty Pryde' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Absorção de Poderes","poder":[{"texto":"Absorção de Poderes e Memórias ao Toque","grau":6},{"texto":"Voo e Força Sobrehumana (Ms. Marvel permanente)","grau":4},{"texto":"Invulnerabilidade Parcial (Ms. Marvel permanente)","grau":4}],"fraqueza":[]},{"nome":"Veterana dos X-Men","poder":[{"texto":"Força de Voo (Miss Marvel)","grau":4},{"texto":"Liderança de Equipe","grau":3}],"fraqueza":[]},{"nome":"Coração do Sul","poder":[{"texto":"Força de Vontade","grau":3}],"fraqueza":[{"texto":"Toque Letal Involuntário","grau":4},{"texto":"Isolamento Emocional","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Absorção de Poderes e Memórias ao Toque","grau":6},{"texto":"Voo e Força Sobrehumana (Ms. Marvel permanente)","grau":4},{"texto":"Invulnerabilidade Parcial (Ms. Marvel permanente)","grau":4},{"texto":"Força de Voo (Miss Marvel)","grau":4},{"texto":"Liderança de Equipe","grau":3},{"texto":"Força de Vontade","grau":3},{"texto":"Toque Letal Involuntário","grau":4},{"texto":"Isolamento Emocional","grau":3},{"texto":"Múltiplas Personalidades Absorvidas","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Rogue' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Carga Cinética","poder":[{"texto":"Carga Cinética em Qualquer Objeto","grau":5},{"texto":"Cartas de Baralho como Projéteis Explosivos","grau":3}],"fraqueza":[]},{"nome":"Ladrão de Elite","poder":[{"texto":"Mestre Ladrão e Acrobata de Elite","grau":4},{"texto":"Cajado Bo","grau":3}],"fraqueza":[]},{"nome":"Cajun Irresistível","poder":[{"texto":"Charme Mutante","grau":4}],"fraqueza":[{"texto":"Lealdade Questionável","grau":2}]},{"nome":"Redenção","poder":[{"texto":"Passado Obscuro na Guilda","grau":3}],"fraqueza":[{"texto":"Desconfiança dos Outros","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Carga Cinética em Qualquer Objeto","grau":5},{"texto":"Cartas de Baralho como Projéteis Explosivos","grau":3},{"texto":"Mestre Ladrão e Acrobata de Elite","grau":4},{"texto":"Cajado Bo","grau":3},{"texto":"Charme Mutante","grau":4},{"texto":"Lealdade Questionável","grau":2},{"texto":"Passado Obscuro na Guilda","grau":3},{"texto":"Desconfiança dos Outros","grau":2},{"texto":"Mestre Ladrão","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Passado Obscuro na Guilda dos Ladrões","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Gambit' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Espada Psiônica","poder":[{"texto":"Espada Psiônica","grau":5},{"texto":"Telepatia de Combate","grau":4}],"fraqueza":[]},{"nome":"Ninja Psi","poder":[{"texto":"Ninjitsu e Artes Marciais de Elite","grau":4},{"texto":"Telecinesia Precisa","grau":3}],"fraqueza":[{"texto":"Corpo Trocado com Kwannon","grau":2}]},{"nome":"Guerreira Silenciosa","poder":[{"texto":"Determinação Fria","grau":3}],"fraqueza":[{"texto":"Passado na Mão","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Espada Psiônica","grau":5},{"texto":"Telepatia de Combate","grau":4},{"texto":"Ninjitsu e Artes Marciais de Elite","grau":4},{"texto":"Telecinesia Precisa","grau":3},{"texto":"Corpo Trocado com Kwannon","grau":2},{"texto":"Determinação Fria","grau":3},{"texto":"Passado na Mão","grau":2},{"texto":"Ninjitsu e Artes Marciais","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Psylocke' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Absorção de Energia","poder":[{"texto":"Absorção e Redirecionamento de Energia","grau":5},{"texto":"Armamento Pesado","grau":3}],"fraqueza":[]},{"nome":"XSE","poder":[{"texto":"Treinamento XSE","grau":4}],"fraqueza":[]},{"nome":"Sobrevivente do Futuro","poder":[{"texto":"Instinto de Sobrevivência","grau":4}],"fraqueza":[{"texto":"Obsessão com a Segurança","grau":2},{"texto":"Pesa o Futuro que Perdeu","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Absorção e Redirecionamento de Energia","grau":5},{"texto":"Armamento Pesado","grau":3},{"texto":"Treinamento XSE","grau":4},{"texto":"Instinto de Sobrevivência","grau":4},{"texto":"Obsessão com a Segurança","grau":2},{"texto":"Pesa o Futuro que Perdeu","grau":2},{"texto":"Marcado com M no Rosto","grau":3},{"texto":"Obsessão com Ameaças","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Marcado com \"M\" no rosto","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Bishop' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Plasmóides","poder":[{"texto":"Plasmóides Pirocinéticos","grau":3},{"texto":"Potencial Ômega Latente","grau":5}],"fraqueza":[]},{"nome":"Filha de Wolverine","poder":[{"texto":"Protegida de Wolverine","grau":3}],"fraqueza":[]},{"nome":"Geração Perdida","poder":[{"texto":"Vampira (após M-Day)","grau":3}],"fraqueza":[{"texto":"Potencial Ômega Bloqueado","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Plasmóides Pirocinéticos","grau":3},{"texto":"Potencial Ômega Latente","grau":5},{"texto":"Protegida de Wolverine","grau":3},{"texto":"Vampira (após M-Day)","grau":3},{"texto":"Potencial Ômega Bloqueado","grau":2},{"texto":"Vampira pós M-Day","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Jubileu' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Magnetismo","poder":[{"texto":"Magnetismo","grau":4},{"texto":"Campo de Força Magnético Pessoal","grau":4}],"fraqueza":[]},{"nome":"Filha de Magneto","poder":[{"texto":"Cabelo Verde","grau":2}],"fraqueza":[{"texto":"Instabilidade Mental","grau":3},{"texto":"Identidade Incerta","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Magnetismo","grau":4},{"texto":"Campo de Força Magnético Pessoal","grau":4},{"texto":"Cabelo Verde","grau":2},{"texto":"Instabilidade Mental","grau":3},{"texto":"Identidade Incerta","grau":2},{"texto":"Campo de Força Magnético","grau":4},{"texto":"Voo Magnético","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Voo por Levitação Magnética","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Polaris' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Anéis de Plasma","poder":[{"texto":"Anéis de Plasma Cósmico","grau":5},{"texto":"Imunidade aos Poderes de Ciclope","grau":3}],"fraqueza":[{"texto":"Controle Instável","grau":2}]},{"nome":"Liderança dos X-Men","poder":[{"texto":"Liderança","grau":3}],"fraqueza":[{"texto":"Síndrome do Irmão Famoso","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Anéis de Plasma Cósmico","grau":5},{"texto":"Imunidade aos Poderes de Ciclope","grau":3},{"texto":"Controle Instável","grau":2},{"texto":"Liderança","grau":3},{"texto":"Síndrome do Irmão Famoso","grau":2},{"texto":"Imunidade a Ciclope","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Havok' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Rainha do Clube do Inferno","poder":[{"texto":"Professora Brutal","grau":4},{"texto":"Ex-Rainha do Clube do Inferno","grau":3}],"fraqueza":[]},{"nome":"Telepatia Ofensiva","poder":[{"texto":"Telepatia Ômega","grau":6},{"texto":"Manipulação Psicológica Refinada","grau":5}],"fraqueza":[]},{"nome":"Forma de Diamante","poder":[{"texto":"Forma de Diamante","grau":5}],"fraqueza":[{"texto":"Sem Telepatia em Forma de Diamante","grau":3}]},{"nome":"Mentora Brutal","poder":[{"texto":"Professora Exigente e Eficaz","grau":4},{"texto":"Lealdade aos Alunos (à sua maneira)","grau":3}],"fraqueza":[]},{"nome":"Paredes que Erguer","poder":[],"fraqueza":[{"texto":"Arrogância como Escudo","grau":3},{"texto":"Passado Villão Assombra","grau":2},{"texto":"Dificuldade de Confiar","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Professora Brutal","grau":4},{"texto":"Ex-Rainha do Clube do Inferno","grau":3},{"texto":"Telepatia Ômega","grau":6},{"texto":"Manipulação Psicológica Refinada","grau":5},{"texto":"Forma de Diamante","grau":5},{"texto":"Sem Telepatia em Forma de Diamante","grau":3},{"texto":"Professora Exigente e Eficaz","grau":4},{"texto":"Lealdade aos Alunos (à sua maneira)","grau":3},{"texto":"Arrogância como Escudo","grau":3},{"texto":"Passado Villão Assombra","grau":2},{"texto":"Dificuldade de Confiar","grau":2},{"texto":"Lealdade aos Alunos","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Niveau Ômega ou Equivalente","grau":5},{"texto":"Décadas de Experiência de Combate","grau":4},{"texto":"Mestre Tático","grau":4},{"texto":"Vontade Indomável","grau":4},{"texto":"Rede de Contatos e Aliados","grau":3},{"texto":"Ameaça Nível Global","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Emma Frost' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Fênix do Amanhã","poder":[{"texto":"Anfitrião da Força Fênix","grau":6},{"texto":"Rastreadora de Mutantes","grau":4}],"fraqueza":[]},{"nome":"Telepatia e Telecinese do Futuro","poder":[{"texto":"Telepatia Ômega","grau":5},{"texto":"Telecinesia Devastadora","grau":5}],"fraqueza":[]},{"nome":"Hound Arrependida","poder":[{"texto":"Rastreadora Mutante Implacável","grau":4},{"texto":"Determinação Inabalável","grau":3}],"fraqueza":[{"texto":"Trauma de Escrava do Futuro","grau":3}]},{"nome":"Asurak","poder":[{"texto":"Laço Familiar com Cable","grau":3}],"fraqueza":[{"texto":"Poder Instável sob Estresse","grau":2},{"texto":"Isolamento por Ser do Futuro","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Anfitrião da Força Fênix","grau":6},{"texto":"Rastreadora de Mutantes","grau":4},{"texto":"Telepatia Ômega","grau":5},{"texto":"Telecinesia Devastadora","grau":5},{"texto":"Rastreadora Mutante Implacável","grau":4},{"texto":"Determinação Inabalável","grau":3},{"texto":"Trauma de Escrava do Futuro","grau":3},{"texto":"Laço Familiar com Cable","grau":3},{"texto":"Poder Instável sob Estresse","grau":2},{"texto":"Isolamento por Ser do Futuro","grau":2},{"texto":"Rastreadora do Futuro","grau":4},{"texto":"Trauma de Escrava","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Niveau Ômega ou Equivalente","grau":5},{"texto":"Décadas de Experiência de Combate","grau":4},{"texto":"Mestre Tático","grau":4},{"texto":"Vontade Indomável","grau":4},{"texto":"Rede de Contatos e Aliados","grau":3},{"texto":"Ameaça Nível Global","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Rachel Summers' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Soldado do Amanhã","poder":[{"texto":"Guerrilheiro de Elite","grau":5},{"texto":"Armamento de Alto Calibre","grau":4}],"fraqueza":[]},{"nome":"Tecno-Orgânico TOV","poder":[{"texto":"Braço e Olho Biônicos TOV","grau":4},{"texto":"Telepatia e Telecinesia Suprimidas","grau":3}],"fraqueza":[{"texto":"Vírus Techno-Orgânico","grau":4}]},{"nome":"Mestre Tático do Futuro","poder":[{"texto":"Liderança da X-Force","grau":4},{"texto":"Estrategista Pós-Apocalíptico","grau":4},{"texto":"Armamento Pesado do Futuro","grau":3}],"fraqueza":[{"texto":"Obsessão com o Futuro","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Guerrilheiro de Elite","grau":5},{"texto":"Armamento de Alto Calibre","grau":4},{"texto":"Braço e Olho Biônicos TOV","grau":4},{"texto":"Telepatia e Telecinesia Suprimidas","grau":3},{"texto":"Vírus Techno-Orgânico","grau":4},{"texto":"Liderança da X-Force","grau":4},{"texto":"Estrategista Pós-Apocalíptico","grau":4},{"texto":"Armamento Pesado do Futuro","grau":3},{"texto":"Obsessão com o Futuro","grau":2},{"texto":"Armamento Pesado","grau":3},{"texto":"Membro da X-Force / X-Corp","grau":2},{"texto":"Mutante de Niveau Ômega ou Equivalente","grau":5},{"texto":"Décadas de Experiência de Combate","grau":4},{"texto":"Mestre Tático","grau":4},{"texto":"Vontade Indomável","grau":4},{"texto":"Rede de Contatos e Aliados","grau":3},{"texto":"Ameaça Nível Global","grau":4},{"texto":"Fundador da X-Force","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Cable' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Garras de Adamantium","poder":[{"texto":"Fator de Cura Acelerado","grau":5},{"texto":"Garras de Adamantium","grau":5}],"fraqueza":[]},{"nome":"Assassina Condicionada","poder":[{"texto":"Assassina Condicionada","grau":5}],"fraqueza":[{"texto":"Gatilho de Berserk","grau":4},{"texto":"Trauma de Condicionamento","grau":3}]},{"nome":"Mais que uma Arma","poder":[{"texto":"Identidade em Construção","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Fator de Cura Acelerado","grau":5},{"texto":"Garras de Adamantium","grau":5},{"texto":"Assassina Condicionada","grau":5},{"texto":"Gatilho de Berserk","grau":4},{"texto":"Trauma de Condicionamento","grau":3},{"texto":"Identidade em Construção","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'X-23' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Sorte Improvável","poder":[{"texto":"Campo de Sorte Probabilística","grau":5},{"texto":"Mercenária Veterana","grau":4}],"fraqueza":[{"texto":"Sorte Falha no Extremo","grau":1}]},{"nome":"Mercenária de Elite","poder":[{"texto":"Franco-atirador de Elite","grau":5},{"texto":"Combate Corpo-a-Corpo Avançado","grau":3}],"fraqueza":[]},{"nome":"Lealdade à X-Force","poder":[{"texto":"Coração de Mercenária","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Campo de Sorte Probabilística","grau":5},{"texto":"Mercenária Veterana","grau":4},{"texto":"Sorte Falha no Extremo","grau":1},{"texto":"Franco-atirador de Elite","grau":5},{"texto":"Combate Corpo-a-Corpo Avançado","grau":3},{"texto":"Coração de Mercenária","grau":3},{"texto":"Membro da X-Force / X-Corp","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Domino' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Gênio Inventor","poder":[{"texto":"Poder Mutante de Invenção","grau":6},{"texto":"Inventor Oficial dos X-Men","grau":4}],"fraqueza":[]},{"nome":"Xamã Tecnológico","poder":[{"texto":"Perna e Mão Protéticas de Alta Tecnologia (próprias)","grau":3},{"texto":"Xamã Cheyenne","grau":3}],"fraqueza":[{"texto":"Criou o Neutralizador de Mutantes","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Poder Mutante de Invenção","grau":6},{"texto":"Inventor Oficial dos X-Men","grau":4},{"texto":"Perna e Mão Protéticas de Alta Tecnologia (próprias)","grau":3},{"texto":"Xamã Cheyenne","grau":3},{"texto":"Criou o Neutralizador de Mutantes","grau":2},{"texto":"Neutralizador de Mutantes","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Forge' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Luz e Som","poder":[{"texto":"Transdução de Som em Luz","grau":4},{"texto":"Laser de Luz Concentrado","grau":3},{"texto":"Força Sonora como Disco de Ataque","grau":3}],"fraqueza":[{"texto":"Precisa de Fonte Sonora","grau":2}]},{"nome":"Estrela do Pop","poder":[{"texto":"Cantora e Performer","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Transdução de Som em Luz","grau":4},{"texto":"Laser de Luz Concentrado","grau":3},{"texto":"Força Sonora como Disco de Ataque","grau":3},{"texto":"Precisa de Fonte Sonora","grau":2},{"texto":"Cantora e Performer","grau":4},{"texto":"Força Sonora como Disco","grau":3},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Dazzler' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Grito Sônico","poder":[{"texto":"Grito Sonar","grau":4},{"texto":"Voo via Ondas Sonoras","grau":4}],"fraqueza":[]},{"nome":"Veterano da Interpol","poder":[{"texto":"Frequência Hipnótica","grau":3},{"texto":"Ex-Agente da Interpol","grau":3}],"fraqueza":[]},{"nome":"Pai e Mentor","poder":[{"texto":"Fundador da Geração X","grau":3},{"texto":"Pai de Siryn","grau":2}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Grito Sonar","grau":4},{"texto":"Voo via Ondas Sonoras","grau":4},{"texto":"Frequência Hipnótica","grau":3},{"texto":"Ex-Agente da Interpol","grau":3},{"texto":"Fundador da Geração X","grau":3},{"texto":"Pai de Siryn","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Banshee' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Propulsão Termoquímica","poder":[{"texto":"Propulsão Termoquímica","grau":4},{"texto":"Invulnerabilidade em Voo","grau":4}],"fraqueza":[{"texto":"Sem Controle de Direção","grau":2}]},{"nome":"Líder dos Novos Mutantes","poder":[{"texto":"Liderança Natural e Leal","grau":3}],"fraqueza":[]},{"nome":"Família Guthrie","poder":[{"texto":"Membro de Família Numerosa de Mutantes (Guthries)","grau":2}],"fraqueza":[{"texto":"Responsabilidade pelos Irmãos","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Propulsão Termoquímica","grau":4},{"texto":"Invulnerabilidade em Voo","grau":4},{"texto":"Sem Controle de Direção","grau":2},{"texto":"Liderança Natural e Leal","grau":3},{"texto":"Membro de Família Numerosa de Mutantes (Guthries)","grau":2},{"texto":"Responsabilidade pelos Irmãos","grau":2},{"texto":"Liderança Natural","grau":3},{"texto":"Família Guthrie","grau":2},{"texto":"Membro dos X-Men","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Cannonball' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Energia Solar","poder":[{"texto":"Absorção e Canalização de Energia Solar","grau":4},{"texto":"Força Sobrehumana Quando Carregado","grau":4},{"texto":"Voo em Forma Solar","grau":3}],"fraqueza":[]},{"nome":"Bilionário Brasileiro","poder":[{"texto":"Bilionário DaCosta","grau":4}],"fraqueza":[{"texto":"Impulsivo","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Absorção e Canalização de Energia Solar","grau":4},{"texto":"Força Sobrehumana Quando Carregado","grau":4},{"texto":"Voo em Forma Solar","grau":3},{"texto":"Bilionário DaCosta","grau":4},{"texto":"Impulsivo","grau":2},{"texto":"Força Sobre-humana","grau":4},{"texto":"Membro dos X-Men","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Sunspot' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ilusão de Medos","poder":[{"texto":"Manifestação de Medos e Desejos Profundos","grau":4},{"texto":"Arco e Flecha","grau":3}],"fraqueza":[{"texto":"Perdeu Poderes pós M-Day","grau":2}]},{"nome":"Xamã Cheyenne","poder":[{"texto":"Ligação Empática com Animais","grau":3},{"texto":"Cheyenne","grau":3}],"fraqueza":[]},{"nome":"Ligação com Animais","poder":[{"texto":"Ex-Valquíria","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Manifestação de Medos e Desejos Profundos","grau":4},{"texto":"Arco e Flecha","grau":3},{"texto":"Perdeu Poderes pós M-Day","grau":2},{"texto":"Ligação Empática com Animais","grau":3},{"texto":"Cheyenne","grau":3},{"texto":"Ex-Valquíria","grau":4},{"texto":"Perda de Poderes pós M-Day","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Mirage' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Lobisomem","poder":[{"texto":"Transformação em Lobo ou Forma Lobisomem","grau":4},{"texto":"Sentidos Lupinos","grau":4},{"texto":"Instintos Predatórios em Forma Animal","grau":3}],"fraqueza":[{"texto":"Controle Reduzido em Forma Plena","grau":2}]},{"nome":"Fé Escocesa","poder":[{"texto":"Ligação Empática com Mirage","grau":3}],"fraqueza":[{"texto":"Conflito com a Igreja","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Transformação em Lobo ou Forma Lobisomem","grau":4},{"texto":"Sentidos Lupinos","grau":4},{"texto":"Instintos Predatórios em Forma Animal","grau":3},{"texto":"Controle Reduzido em Forma Plena","grau":2},{"texto":"Ligação Empática com Mirage","grau":3},{"texto":"Conflito com a Igreja","grau":2},{"texto":"Ligação com Mirage","grau":3},{"texto":"Fé Escocesa","grau":2},{"texto":"Controle Reduzido em Forma Animal","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Wolfsbane' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Possessão Mental","poder":[{"texto":"Possessão Mental","grau":5},{"texto":"Pode Controlar Múltiplos Alvos Simultaneamente","grau":3}],"fraqueza":[{"texto":"Drena Consciência em Múltiplos","grau":2}]},{"nome":"Refugiada Vietnamita","poder":[{"texto":"Refugiada Vietnamita","grau":3}],"fraqueza":[]},{"nome":"Família Primeiro","poder":[{"texto":"Responsabilidade pelos Irmãos Menores","grau":3}],"fraqueza":[{"texto":"Amputada (Perna)","grau":1}]}]'::jsonb),
  tags = '[{"texto":"Possessão Mental","grau":5},{"texto":"Pode Controlar Múltiplos Alvos Simultaneamente","grau":3},{"texto":"Drena Consciência em Múltiplos","grau":2},{"texto":"Refugiada Vietnamita","grau":3},{"texto":"Responsabilidade pelos Irmãos Menores","grau":3},{"texto":"Amputada (Perna)","grau":1},{"texto":"Controle Múltiplo","grau":3},{"texto":"Responsabilidade pelos Irmãos","grau":3},{"texto":"Amputada","grau":1},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Karma' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Magma e Lava","poder":[{"texto":"Controle de Magma e Lava","grau":4},{"texto":"Forma de Rocha Incandescente","grau":4},{"texto":"Terremotos Localizados","grau":3}],"fraqueza":[]},{"nome":"Nobre Romana","poder":[{"texto":"Nobre Romana de Nova Roma","grau":3}],"fraqueza":[{"texto":"Ingênua ao Mundo Moderno","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Controle de Magma e Lava","grau":4},{"texto":"Forma de Rocha Incandescente","grau":4},{"texto":"Terremotos Localizados","grau":3},{"texto":"Nobre Romana de Nova Roma","grau":3},{"texto":"Ingênua ao Mundo Moderno","grau":2},{"texto":"Forma de Rocha","grau":4},{"texto":"Nobre de Nova Roma","grau":3},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Magma' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Poliglota Universal","poder":[{"texto":"Poliglota Universal","grau":6}],"fraqueza":[{"texto":"Sem Poderes de Combate","grau":4}]},{"nome":"Tradutor de Linguagens","poder":[{"texto":"Leitura de Intenção Corporal","grau":4}],"fraqueza":[]},{"nome":"Amigo de Warlock","poder":[{"texto":"Melhor Amigo de Warlock","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Poliglota Universal","grau":6},{"texto":"Sem Poderes de Combate","grau":4},{"texto":"Leitura de Intenção Corporal","grau":4},{"texto":"Melhor Amigo de Warlock","grau":3},{"texto":"Leitura Corporal","grau":4},{"texto":"Amigo de Warlock","grau":3},{"texto":"Morreu em Batalha","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante de Nível Baixo","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Cypher' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Bombas de Plasma","poder":[{"texto":"Bombas de Plasma com Timer Psiônico","grau":4},{"texto":"Bombas de Meltdown","grau":4}],"fraqueza":[]},{"nome":"Atitude Rebelde","poder":[{"texto":"Atitude Rebelde","grau":2}],"fraqueza":[{"texto":"Chamariz de Problemas","grau":2},{"texto":"Impulsiva","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Bombas de Plasma com Timer Psiônico","grau":4},{"texto":"Bombas de Meltdown","grau":4},{"texto":"Atitude Rebelde","grau":2},{"texto":"Chamariz de Problemas","grau":2},{"texto":"Impulsiva","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Boomer' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Espadas Dimensional","poder":[{"texto":"Dupla Empunhadura de Espadas","grau":5},{"texto":"Portais Dimensionais via Espadas","grau":4}],"fraqueza":[]},{"nome":"Velocidade Sobre-humana","poder":[{"texto":"Velocidade e Reflexos Sobre-humanos","grau":5}],"fraqueza":[]},{"nome":"Guerreiro de Outro Mundo","poder":[{"texto":"Gladiador de Elite","grau":4}],"fraqueza":[{"texto":"Sem Conceito de Emoção Humana","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Dupla Empunhadura de Espadas","grau":5},{"texto":"Portais Dimensionais via Espadas","grau":4},{"texto":"Velocidade e Reflexos Sobre-humanos","grau":5},{"texto":"Gladiador de Elite","grau":4},{"texto":"Sem Conceito de Emoção Humana","grau":2},{"texto":"Membro da X-Force / X-Corp","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Shatterstar' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ondas Sísmicas","poder":[{"texto":"Controle Sísmico","grau":4}],"fraqueza":[{"texto":"Poder Incontrolável na Juventude","grau":2}]},{"nome":"Peso do Legado","poder":[{"texto":"Vibrações Sísmicas Precisas","grau":3}],"fraqueza":[{"texto":"Filho de Villão (Cabo)","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Controle Sísmico","grau":4},{"texto":"Poder Incontrolável na Juventude","grau":2},{"texto":"Vibrações Sísmicas Precisas","grau":3},{"texto":"Filho de Villão (Cabo)","grau":2},{"texto":"Membro da X-Force / X-Corp","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Parceiro de Shatterstar","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Rictor' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Grito Sônico","poder":[{"texto":"Grito Sonar Destruidor","grau":4},{"texto":"Frequência Hipnótica","grau":3}],"fraqueza":[]},{"nome":"Detetive Sobre-humana","poder":[{"texto":"Voo Sônico","grau":4}],"fraqueza":[{"texto":"Vício em Bebida","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Grito Sonar Destruidor","grau":4},{"texto":"Frequência Hipnótica","grau":3},{"texto":"Voo Sônico","grau":4},{"texto":"Vício em Bebida","grau":2},{"texto":"Membro da X-Force / X-Corp","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Siryn' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Múltiplas Cópias","poder":[{"texto":"Criação de Duplicatas ao Impacto","grau":5}],"fraqueza":[]},{"nome":"Detetive Particular","poder":[{"texto":"Absorção de Duplicatas com Memórias e Habilidades","grau":4}],"fraqueza":[{"texto":"Personalidades se Dividem","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Criação de Duplicatas ao Impacto","grau":5},{"texto":"Absorção de Duplicatas com Memórias e Habilidades","grau":4},{"texto":"Personalidades se Dividem","grau":2},{"texto":"Membro da X-Force / X-Corp","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Detetive Particular","grau":3},{"texto":"Cada Duplicata Desenvolve Personalidade Própria","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Madrox' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Absorção Cinética","poder":[{"texto":"Absorção de Energia Cinética em Força Muscular","grau":5}],"fraqueza":[{"texto":"Corpo Degrada com Energia Absorvida","grau":3}]},{"nome":"Alívio Cômico Tanque","poder":[{"texto":"Força e Resistência Colossais","grau":5}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Absorção de Energia Cinética em Força Muscular","grau":5},{"texto":"Corpo Degrada com Energia Absorvida","grau":3},{"texto":"Força e Resistência Colossais","grau":5},{"texto":"Membro da X-Force / X-Corp","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Humor Constante","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Strong Guy' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Campo de Força","poder":[{"texto":"Campo de Força Biológico Instintivo","grau":4}],"fraqueza":[]},{"nome":"Médica Relutante","poder":[{"texto":"Doutora de Elite","grau":4},{"texto":"Queria Vida Normal, Não Heroína","grau":3}],"fraqueza":[{"texto":"Relutância em Ser X-Men","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Campo de Força Biológico Instintivo","grau":4},{"texto":"Doutora de Elite","grau":4},{"texto":"Queria Vida Normal, Não Heroína","grau":3},{"texto":"Relutância em Ser X-Men","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Médica de Trauma e Cirurgiã de Elite","grau":5}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Cecilia Reyes' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Dragão Pequeno","poder":[{"texto":"Fogo Violeta Anti-Mágico","grau":4},{"texto":"Voo","grau":4}],"fraqueza":[]},{"nome":"Companheiro Fiel","poder":[{"texto":"Inteligência Elevadíssima Deliberadamente Escondida","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Fogo Violeta Anti-Mágico","grau":4},{"texto":"Voo","grau":4},{"texto":"Inteligência Elevadíssima Deliberadamente Escondida","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Parceiro Leal de Kitty Pryde","grau":4},{"texto":"Ex-Agente Duplo da SWORD","grau":3},{"texto":"Parece Animal de Estimação","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Lockheed' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Líder dos Morlocks","poder":[{"texto":"Sentidos Aguçados","grau":4},{"texto":"Combate Feral com Faca","grau":4}],"fraqueza":[]},{"nome":"Caçadora dos Túneis","poder":[{"texto":"Liderança dos Morlocks","grau":4}],"fraqueza":[{"texto":"Desconfia de Superfície","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Sentidos Aguçados","grau":4},{"texto":"Combate Feral com Faca","grau":4},{"texto":"Liderança dos Morlocks","grau":4},{"texto":"Desconfia de Superfície","grau":2},{"texto":"Líder dos Túneis","grau":3},{"texto":"Caçadora","grau":2},{"texto":"Desconfia da Superfície","grau":2},{"texto":"Membro dos Morlocks","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Tentáculos Preênseis (pós-Mojo)","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Callisto' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Rastreador Mutante","poder":[{"texto":"Detector de Mutantes","grau":5}],"fraqueza":[{"texto":"Subserviente","grau":2}]},{"nome":"Morlock Leal","poder":[{"texto":"Força Colossal Aumentada por Apocalipse","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Detector de Mutantes","grau":5},{"texto":"Subserviente","grau":2},{"texto":"Força Colossal Aumentada por Apocalipse","grau":4},{"texto":"Membro dos Morlocks","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Mentalidade Ingênua","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Caliban' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ossos Lancinantes","poder":[{"texto":"Crescimento e Extração de Ossos como Armas","grau":4},{"texto":"Ossos como Projéteis","grau":3}],"fraqueza":[]},{"nome":"Raiva Subterrânea","poder":[{"texto":"Fator de Cura Moderado","grau":3}],"fraqueza":[{"texto":"Instabilidade Emocional","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Crescimento e Extração de Ossos como Armas","grau":4},{"texto":"Ossos como Projéteis","grau":3},{"texto":"Fator de Cura Moderado","grau":3},{"texto":"Instabilidade Emocional","grau":2},{"texto":"Ossos como Armas","grau":4},{"texto":"Raiva","grau":2},{"texto":"Instabilidade","grau":2},{"texto":"Membro dos Morlocks","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Dois Corações","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Marrow' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Moldar Carne","poder":[{"texto":"Reshaping Biológico ao Toque","grau":5}],"fraqueza":[{"texto":"Obsessão com Beleza Distorcida","grau":2}]},{"nome":"Artista Macabro","poder":[{"texto":"Crueldade Sádica","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Reshaping Biológico ao Toque","grau":5},{"texto":"Obsessão com Beleza Distorcida","grau":2},{"texto":"Crueldade Sádica","grau":3},{"texto":"Membro dos Morlocks","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Líder Ocasional dos Morlocks","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Masque' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Campo de Neutralização","poder":[{"texto":"Campo de Supressão de Mutantes","grau":6}],"fraqueza":[]},{"nome":"Criança dos Túneis","poder":[{"texto":"Inocência Infantil","grau":3}],"fraqueza":[{"texto":"Vulnerável sem o Campo","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Campo de Supressão de Mutantes","grau":6},{"texto":"Inocência Infantil","grau":3},{"texto":"Vulnerável sem o Campo","grau":2},{"texto":"Membro dos Morlocks","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Presença Cativante Apesar da Aparência","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Leech' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Mestre do Magnetismo","poder":[{"texto":"Magnetismo Ômega","grau":6},{"texto":"Campo de Força Magnético Pessoal","grau":5},{"texto":"Voo por Levitação Magnética","grau":4}],"fraqueza":[]},{"nome":"Líder da Irmandade","poder":[{"texto":"Capacete Anti-Telepatia","grau":4},{"texto":"Gênio Científico","grau":4}],"fraqueza":[]},{"nome":"Sobrevivente do Holocausto","poder":[{"texto":"Sobrevivente de Auschwitz","grau":4}],"fraqueza":[{"texto":"Trauma do Holocausto","grau":3}]},{"nome":"Causa Mutante","poder":[{"texto":"Visão de Supremacia Mutante","grau":4},{"texto":"Carisma Revolucionário","grau":4}],"fraqueza":[{"texto":"Extremismo Cega","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Magnetismo Ômega","grau":6},{"texto":"Campo de Força Magnético Pessoal","grau":5},{"texto":"Voo por Levitação Magnética","grau":4},{"texto":"Capacete Anti-Telepatia","grau":4},{"texto":"Gênio Científico","grau":4},{"texto":"Sobrevivente de Auschwitz","grau":4},{"texto":"Trauma do Holocausto","grau":3},{"texto":"Visão de Supremacia Mutante","grau":4},{"texto":"Carisma Revolucionário","grau":4},{"texto":"Extremismo Cega","grau":3},{"texto":"Campo de Força Magnético","grau":5},{"texto":"Voo Magnético","grau":4},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante de Niveau Ômega ou Equivalente","grau":5},{"texto":"Décadas de Experiência de Combate","grau":4},{"texto":"Mestre Tático","grau":4},{"texto":"Vontade Indomável","grau":4},{"texto":"Rede de Contatos e Aliados","grau":3},{"texto":"Ameaça Nível Global","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Magneto' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Metamorfa","poder":[{"texto":"Metamorfismo Perfeito","grau":5},{"texto":"Espiã Veterana","grau":5},{"texto":"Imortalidade Lenta","grau":3}],"fraqueza":[]},{"nome":"Mestra do Disfarce","poder":[{"texto":"Combate Corpo-a-Corpo Letal","grau":3}],"fraqueza":[]},{"nome":"Agente Tripla","poder":[{"texto":"Rede de Espionagem","grau":4},{"texto":"Manipuladora Genial","grau":3}],"fraqueza":[{"texto":"Lealdade a Si Mesma","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Metamorfismo Perfeito","grau":5},{"texto":"Espiã Veterana","grau":5},{"texto":"Imortalidade Lenta","grau":3},{"texto":"Combate Corpo-a-Corpo Letal","grau":3},{"texto":"Rede de Espionagem","grau":4},{"texto":"Manipuladora Genial","grau":3},{"texto":"Lealdade a Si Mesma","grau":3},{"texto":"Mãe de Noturno","grau":2},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Pistola Escondida na Coxa","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Mystique' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Imóvel","poder":[{"texto":"Campo de Força Inercial","grau":5}],"fraqueza":[]},{"nome":"Tanque da Irmandade","poder":[{"texto":"Pele Praticamente Invulnerável ao Dano Físico","grau":5}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Campo de Força Inercial","grau":5},{"texto":"Pele Praticamente Invulnerável ao Dano Físico","grau":5},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Força Colossal","grau":4},{"texto":"Nenhuma Sensibilidade à Dor Física","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Blob' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Sapo Mutante","poder":[{"texto":"Salto Sobrehumano","grau":4},{"texto":"Língua Preênsil Longa","grau":3}],"fraqueza":[]},{"nome":"Lacaio Leal","poder":[{"texto":"Secreção Pegajosa","grau":3}],"fraqueza":[{"texto":"Subserviente","grau":1}]}]'::jsonb),
  tags = '[{"texto":"Salto Sobrehumano","grau":4},{"texto":"Língua Preênsil Longa","grau":3},{"texto":"Secreção Pegajosa","grau":3},{"texto":"Subserviente","grau":1},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante de Nível Baixo","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Toad' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Pirocinese","poder":[{"texto":"Controle de Fogo Existente","grau":5},{"texto":"Criação de Criaturas de Fogo Complexas","grau":4},{"texto":"Traje com Lança-Chamas Integrado","grau":3}],"fraqueza":[]},{"nome":"Incendiário","poder":[{"texto":"Escritor Frustrado","grau":2}],"fraqueza":[{"texto":"Fogo Sem Controle","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Controle de Fogo Existente","grau":5},{"texto":"Criação de Criaturas de Fogo Complexas","grau":4},{"texto":"Traje com Lança-Chamas Integrado","grau":3},{"texto":"Escritor Frustrado","grau":2},{"texto":"Fogo Sem Controle","grau":2},{"texto":"Manipula Fogo","grau":4},{"texto":"Incendiário","grau":3},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Pyro' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ondas Sísmicas","poder":[{"texto":"Geokinese","grau":4},{"texto":"Mercenário Pragmático","grau":2}],"fraqueza":[]},{"nome":"Demolidor","poder":[{"texto":"Terremotos e Avalanches Localizados","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Geokinese","grau":4},{"texto":"Mercenário Pragmático","grau":2},{"texto":"Terremotos e Avalanches Localizados","grau":4},{"texto":"Ondas Sísmicas","grau":4},{"texto":"Demolidor","grau":3},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Avalanche' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Campo de Força","poder":[{"texto":"Campo de Força Pessoal","grau":5}],"fraqueza":[{"texto":"Campo Tem Limite de Absorção","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Campo de Força Pessoal","grau":5},{"texto":"Campo Tem Limite de Absorção","grau":2},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Força Aumentada Dentro do Campo","grau":4},{"texto":"Ex-Lutador de Circo","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Unus' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Canto Hipnótico","poder":[{"texto":"Canto Hipnótico","grau":5}],"fraqueza":[]},{"nome":"Sereia","poder":[{"texto":"Imunidade a Ataques Baseados em Som","grau":3}],"fraqueza":[{"texto":"Vítima da Própria Aparência","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Canto Hipnótico","grau":5},{"texto":"Imunidade a Ataques Baseados em Som","grau":3},{"texto":"Vítima da Própria Aparência","grau":2},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Lorelei' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Acolyte","poder":[{"texto":"Poder Mutante de Baixo Nível","grau":2}],"fraqueza":[]},{"nome":"Fiel a Magneto","poder":[{"texto":"Fanatismo Ideológico","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Poder Mutante de Baixo Nível","grau":2},{"texto":"Fanatismo Ideológico","grau":3},{"texto":"Membro da Irmandade de Mutantes","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Disposto a Morrer pela Causa","grau":3},{"texto":"Treinamento Básico de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Adepto (Magneto)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Fera Selvagem","poder":[{"texto":"Fator de Cura Acelerado","grau":5},{"texto":"Garras e Presas","grau":4},{"texto":"Sentidos Aguçados","grau":5}],"fraqueza":[]},{"nome":"Caçador Sádico","poder":[{"texto":"Instinto de Matar Sem Inibições","grau":4}],"fraqueza":[{"texto":"Instinto Assassino","grau":3},{"texto":"Rivalidade com Wolverine","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Fator de Cura Acelerado","grau":5},{"texto":"Garras e Presas","grau":4},{"texto":"Sentidos Aguçados","grau":5},{"texto":"Instinto de Matar Sem Inibições","grau":4},{"texto":"Instinto Assassino","grau":3},{"texto":"Rivalidade com Wolverine","grau":2},{"texto":"Caçador Sádico","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Rival de Logan","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Sabretooth' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Garras de Adamantium","poder":[{"texto":"Garras de Adamantium","grau":5},{"texto":"Cyborg de Adamantium","grau":4}],"fraqueza":[]},{"nome":"Ninja Ciborgue","poder":[{"texto":"Fator de Cura Implantado","grau":4}],"fraqueza":[{"texto":"Obsessão por Wolverine","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Garras de Adamantium","grau":5},{"texto":"Cyborg de Adamantium","grau":4},{"texto":"Fator de Cura Implantado","grau":4},{"texto":"Obsessão por Wolverine","grau":2},{"texto":"Ninja Ciborgue","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Combate Corpo-a-Corpo de Elite","grau":4},{"texto":"Código de Honra Samurai","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Lady Deathstrike' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Geneticista Louco","poder":[{"texto":"Gênio de Genética Mutante","grau":6},{"texto":"Imortalidade e Regeneração","grau":5}],"fraqueza":[]},{"nome":"Mestre dos Marotos","poder":[{"texto":"Clonagem e Manipulação Genética","grau":5}],"fraqueza":[]},{"nome":"Manipulador de Linhagens","poder":[{"texto":"Poderes Psiônicos e Telepatia Limitada","grau":4},{"texto":"Obsessão com Linhagem Summers/Grey","grau":4},{"texto":"Obsessão Científica Cega à Ética","grau":3}],"fraqueza":[{"texto":"Obsessão pela Linhagem Summers","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Gênio de Genética Mutante","grau":6},{"texto":"Imortalidade e Regeneração","grau":5},{"texto":"Clonagem e Manipulação Genética","grau":5},{"texto":"Poderes Psiônicos e Telepatia Limitada","grau":4},{"texto":"Obsessão com Linhagem Summers/Grey","grau":4},{"texto":"Obsessão Científica Cega à Ética","grau":3},{"texto":"Obsessão pela Linhagem Summers","grau":3},{"texto":"Manipulador Genético","grau":5},{"texto":"Clonagem","grau":4},{"texto":"Marotos","grau":3},{"texto":"Obsessão Summers","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Niveau Ômega ou Equivalente","grau":5},{"texto":"Décadas de Experiência de Combate","grau":4},{"texto":"Mestre Tático","grau":4},{"texto":"Vontade Indomável","grau":4},{"texto":"Rede de Contatos e Aliados","grau":3},{"texto":"Ameaça Nível Global","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Mister Sinister' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Primeiro Mutante","poder":[{"texto":"Manipulação Molecular do Próprio Corpo","grau":6},{"texto":"Tecnologia Celestial","grau":6},{"texto":"Imortalidade Real","grau":5}],"fraqueza":[]},{"nome":"Sobrevivência do Mais Forte","poder":[{"texto":"Os Quatro Cavaleiros","grau":5},{"texto":"Darwinismo Social Extremo","grau":4}],"fraqueza":[]},{"nome":"Juiz Universal","poder":[{"texto":"Primeiro Mutante Registrado da Terra","grau":4}],"fraqueza":[{"texto":"Visão Distorcida de Evolução","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Manipulação Molecular do Próprio Corpo","grau":6},{"texto":"Tecnologia Celestial","grau":6},{"texto":"Imortalidade Real","grau":5},{"texto":"Os Quatro Cavaleiros","grau":5},{"texto":"Darwinismo Social Extremo","grau":4},{"texto":"Primeiro Mutante Registrado da Terra","grau":4},{"texto":"Visão Distorcida de Evolução","grau":3},{"texto":"Primeiro Mutante","grau":6},{"texto":"Sobrevivência do Mais Forte","grau":5},{"texto":"Juiz Universal","grau":4},{"texto":"Quatro Cavaleiros","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Niveau Ômega ou Equivalente","grau":5},{"texto":"Décadas de Experiência de Combate","grau":4},{"texto":"Mestre Tático","grau":4},{"texto":"Vontade Indomável","grau":4},{"texto":"Rede de Contatos e Aliados","grau":3},{"texto":"Ameaça Nível Global","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Apocalipse' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Caçador de Mutantes","poder":[{"texto":"Detector de Mutação por DNA","grau":4},{"texto":"Foguetes de Alta Explosão","grau":4}],"fraqueza":[]},{"nome":"Máquina sem Piedada","poder":[{"texto":"Armadura Estrutural Reforçada","grau":5}],"fraqueza":[{"texto":"Limitado por Programação","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Detector de Mutação por DNA","grau":4},{"texto":"Foguetes de Alta Explosão","grau":4},{"texto":"Armadura Estrutural Reforçada","grau":5},{"texto":"Limitado por Programação","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Supressor de Poderes","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Sentinela Mk I' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Caçador de Mutantes","poder":[{"texto":"Detector de Mutações DNA","grau":4},{"texto":"Foguetes e Projéteis Anti-Mutante","grau":4}],"fraqueza":[]},{"nome":"Máquina sem Piedada","poder":[{"texto":"Armadura Estrutural Reforçada","grau":5}],"fraqueza":[{"texto":"Limitado por Programação","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Detector de Mutações DNA","grau":4},{"texto":"Foguetes e Projéteis Anti-Mutante","grau":4},{"texto":"Armadura Estrutural Reforçada","grau":5},{"texto":"Limitado por Programação","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Supressores de Mutação","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Sentinela Mark I' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Humano Fanático","poder":[{"texto":"Fanatismo Religioso","grau":3}],"fraqueza":[{"texto":"Ódio Cego a Mutantes","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Fanatismo Religioso","grau":3},{"texto":"Ódio Cego a Mutantes","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Arma de Fogo e Faca","grau":2},{"texto":"Treinamento Paramilitar Básico","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Purificador' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Agente HYDRA","poder":[{"texto":"Armamento Avançado (tecnologia roubada)","grau":3}],"fraqueza":[{"texto":"Descartável","grau":1}]}]'::jsonb),
  tags = '[{"texto":"Armamento Avançado (tecnologia roubada)","grau":3},{"texto":"Descartável","grau":1},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Treinamento Paramilitar Sólido","grau":3},{"texto":"Tecnologia de Supressão de Mutantes","grau":3},{"texto":"Opera em Células Independentes","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Agente HYDRA' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Arma Humana","poder":[{"texto":"Armamento Anti-Mutante Especializado","grau":4}],"fraqueza":[{"texto":"Lavagem Cerebral","grau":2}]},{"nome":"Mercenário","poder":[{"texto":"Treinamento de Combate de Elite","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Armamento Anti-Mutante Especializado","grau":4},{"texto":"Lavagem Cerebral","grau":2},{"texto":"Treinamento de Combate de Elite","grau":4},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Inibidores de Telepatia Portáteis","grau":3},{"texto":"Modificações Cibernéticas Menores","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Mercenário Weapon X' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Geneticista de Elite","poder":[{"texto":"Geneticista Mutante Líder Mundial","grau":5}],"fraqueza":[]},{"nome":"Aliada dos X-Men","poder":[{"texto":"Parceira Científica e Ex-Noiva de Xavier","grau":4}],"fraqueza":[{"texto":"Humana","grau":1}]}]'::jsonb),
  tags = '[{"texto":"Geneticista Mutante Líder Mundial","grau":5},{"texto":"Parceira Científica e Ex-Noiva de Xavier","grau":4},{"texto":"Humana","grau":1},{"texto":"Geneticista","grau":3},{"texto":"Aliada dos X-Men","grau":3},{"texto":"Humano com Acesso a Alto Escalão","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Dirige a Ilha Muir","grau":3},{"texto":"Mutante Secreta","grau":5}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Moira MacTaggert' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Computador Humano","poder":[{"texto":"Mente Computador Humano","grau":6},{"texto":"Memória Perfeita e Absoluta","grau":5}],"fraqueza":[]},{"nome":"Agente Infiltrada","poder":[{"texto":"Pode Catalisar Mutações Latentes em Outros","grau":4}],"fraqueza":[{"texto":"Desconectada Emocionalmente","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Mente Computador Humano","grau":6},{"texto":"Memória Perfeita e Absoluta","grau":5},{"texto":"Pode Catalisar Mutações Latentes em Outros","grau":4},{"texto":"Desconectada Emocionalmente","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Agente Dupla Infiltrada por Décadas","grau":4},{"texto":"Combate de Elite","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Sage' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Explosão Psíquica","poder":[{"texto":"Plasma Psiônico Explodindo do Peito","grau":5}],"fraqueza":[{"texto":"Rosto Desfigurado pelo Poder","grau":2}]},{"nome":"Silêncio Poderoso","poder":[{"texto":"Comunicação Telepática","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Plasma Psiônico Explodindo do Peito","grau":5},{"texto":"Rosto Desfigurado pelo Poder","grau":2},{"texto":"Comunicação Telepática","grau":3},{"texto":"Explosão Psíquica","grau":4},{"texto":"Silêncio","grau":3},{"texto":"Rosto Desfigurado","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Chamber' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Descamação","poder":[{"texto":"Esfoliação em Qualquer Material","grau":4}],"fraqueza":[]},{"nome":"Família Guthrie","poder":[{"texto":"Cada Forma tem Propriedades Específicas","grau":4}],"fraqueza":[{"texto":"Sombra dos Irmãos","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Esfoliação em Qualquer Material","grau":4},{"texto":"Cada Forma tem Propriedades Específicas","grau":4},{"texto":"Sombra dos Irmãos","grau":2},{"texto":"Descamação","grau":3},{"texto":"Família Guthrie","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Ambição Excepcional","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Husk' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Penteto Perfeito","poder":[{"texto":"Pacote de Perfeição Mutante","grau":5},{"texto":"Intelecto Prodigioso","grau":4},{"texto":"Arrogância Desarmante","grau":2},{"texto":"Segredos Ligados ao Irmão Emplate","grau":2}],"fraqueza":[]},{"nome":"Herdeira Bilionária","poder":[{"texto":"4"}],"fraqueza":[{"texto":"Arrogância Refinada","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Pacote de Perfeição Mutante","grau":5},{"texto":"Intelecto Prodigioso","grau":4},{"texto":"Arrogância Desarmante","grau":2},{"texto":"Segredos Ligados ao Irmão Emplate","grau":2},{"texto":"4"},{"texto":"Arrogância Refinada","grau":3},{"texto":"Força Sobre-humana","grau":4},{"texto":"Telepatia","grau":3},{"texto":"Herdeira Bilionária","grau":4},{"texto":"Voo","grau":3},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'M (Monet St. Croix)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Armadura Psíquica","poder":[{"texto":"Exoesqueleto Psiônico Ancestral","grau":4}],"fraqueza":[]},{"nome":"Kami-Sama","poder":[{"texto":"Resistência ao Dano Físico Dentro da Armadura","grau":4}],"fraqueza":[{"texto":"Insegurança sobre o Poder","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Exoesqueleto Psiônico Ancestral","grau":4},{"texto":"Resistência ao Dano Físico Dentro da Armadura","grau":4},{"texto":"Insegurança sobre o Poder","grau":2},{"texto":"Armadura Psíquica","grau":4},{"texto":"Determinação","grau":3},{"texto":"Insegurança","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Força Amplificada na Armadura","grau":3},{"texto":"Conectada aos Ancestrais","grau":3},{"texto":"Potencial Crescente","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Armor' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Eletricidade","poder":[{"texto":"Absorção e Liberação de Eletricidade","grau":4},{"texto":"Velocidade em Rajadas Elétricas","grau":4}],"fraqueza":[{"texto":"Precisa de Luvas Amortecedoras","grau":2}]},{"nome":"Líder dos Novos X-Men","poder":[{"texto":"Líder dos Estudantes","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Absorção e Liberação de Eletricidade","grau":4},{"texto":"Velocidade em Rajadas Elétricas","grau":4},{"texto":"Precisa de Luvas Amortecedoras","grau":2},{"texto":"Líder dos Estudantes","grau":3},{"texto":"Liderança dos Novos X-Men","grau":3},{"texto":"Eletricidade","grau":4},{"texto":"Precisa de Luvas","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Surge' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Biocinese","poder":[{"texto":"Biomassa Dourada","grau":5},{"texto":"Biomassa Negra","grau":5}],"fraqueza":[]},{"nome":"Cura ou Morte","poder":[{"texto":"Potencial Nível Ômega não totalmente desbloqueado","grau":5}],"fraqueza":[{"texto":"Poder de Matar com Toque","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Biomassa Dourada","grau":5},{"texto":"Biomassa Negra","grau":5},{"texto":"Potencial Nível Ômega não totalmente desbloqueado","grau":5},{"texto":"Poder de Matar com Toque","grau":3},{"texto":"Biocinese de Cura","grau":5},{"texto":"Controle Molecular","grau":4},{"texto":"Pode Matar com Toque","grau":3},{"texto":"Médico dos Novos X-Men","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Pele Dourada quando Ativo","grau":1}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Elixir' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Telecinesia","poder":[{"texto":"Telecinesia de Alto Nível","grau":5},{"texto":"Próteses Controladas por Telecinese (perdeu as mãos)","grau":3}],"fraqueza":[]},{"nome":"Atitude de Líder","poder":[{"texto":"Arrogância de Elite","grau":3}],"fraqueza":[{"texto":"Arrogância e Impulso","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Telecinesia de Alto Nível","grau":5},{"texto":"Próteses Controladas por Telecinese (perdeu as mãos)","grau":3},{"texto":"Arrogância de Elite","grau":3},{"texto":"Arrogância e Impulso","grau":2},{"texto":"Telecinesia Poderosa","grau":5},{"texto":"Mãos Protéticas","grau":3},{"texto":"Líder dos Hellions","grau":3},{"texto":"Arrogância","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Lealdade Profunda a Quem Chama de Amigo","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Hellion' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Corpo de Rocha","poder":[{"texto":"Corpo de Rocha Silicosa","grau":5},{"texto":"Força Colossal","grau":5}],"fraqueza":[]},{"nome":"Comediante da Equipe","poder":[{"texto":"Desmontagem e Remontagem Telecinética","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Corpo de Rocha Silicosa","grau":5},{"texto":"Força Colossal","grau":5},{"texto":"Desmontagem e Remontagem Telecinética","grau":4},{"texto":"Força Bruta","grau":4},{"texto":"Humor","grau":3},{"texto":"Aluno do Instituto","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Cabeça como Projétil","grau":3},{"texto":"Sem Sistema Nervoso Convencional","grau":3},{"texto":"Personalidade Descontraída que Subestima o Risco","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Rockslide' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Memória Absoluta","poder":[{"texto":"Conhecimento de Centenas de Especialistas Retido Permanentemente","grau":5}],"fraqueza":[{"texto":"Perde Acesso ao Saber ao Dormir","grau":2}]},{"nome":"Gênio","poder":[{"texto":"Estrategista de Elite","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Conhecimento de Centenas de Especialistas Retido Permanentemente","grau":5},{"texto":"Perde Acesso ao Saber ao Dormir","grau":2},{"texto":"Estrategista de Elite","grau":4},{"texto":"Memória Absoluta","grau":4},{"texto":"Gênio","grau":3},{"texto":"Perde ao Dormir","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Artes Marciais e Combate de Vários Especialistas","grau":4},{"texto":"Parceiro de Surge","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Prodigy' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Feromônios","poder":[{"texto":"Feromonas Emocionais","grau":5}],"fraqueza":[]},{"nome":"Invisível Social","poder":[{"texto":"Induz Medo, Amor, Agressão ou Calma em Grupos","grau":4}],"fraqueza":[{"texto":"Baixa Autoestima","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Feromonas Emocionais","grau":5},{"texto":"Induz Medo, Amor, Agressão ou Calma em Grupos","grau":4},{"texto":"Baixa Autoestima","grau":2},{"texto":"Feromônios","grau":3},{"texto":"Invisível","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Introversão Severa","grau":2},{"texto":"Filha de Persuasão (vilã)","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Wallflower' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Varredura Psíquica","poder":[{"texto":"Visão de Raio-X","grau":4}],"fraqueza":[]},{"nome":"Olhos que Tudo Veem","poder":[{"texto":"Visão Térmica e Espectro Eletromagnético","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Visão de Raio-X","grau":4},{"texto":"Visão Térmica e Espectro Eletromagnético","grau":4},{"texto":"Membro da X-Force / X-Corp","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Ex-Agente do Governo","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Scanner' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Feral","poder":[{"texto":"Fator de Cura Acelerado","grau":4}],"fraqueza":[{"texto":"Instinto Animal Domina","grau":2}]},{"nome":"Weapon X","poder":[{"texto":"Garras e Dentes Afiados","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Fator de Cura Acelerado","grau":4},{"texto":"Instinto Animal Domina","grau":2},{"texto":"Garras e Dentes Afiados","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Sentidos Lupinos","grau":4},{"texto":"Ex-Parceiro de Sabretooth","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Wild Child' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Velocidade Sobre-humana","poder":[{"texto":"Voo Supersônico","grau":5},{"texto":"Luz Cegante quando em contato com Northstar","grau":4}],"fraqueza":[]},{"nome":"Dupla Personalidade","poder":[{"texto":"Gêmea de Northstar","grau":3}],"fraqueza":[{"texto":"Transtorno Dissociativo","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Voo Supersônico","grau":5},{"texto":"Luz Cegante quando em contato com Northstar","grau":4},{"texto":"Gêmea de Northstar","grau":3},{"texto":"Transtorno Dissociativo","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Aurora' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Pele de Diamante","poder":[{"texto":"Pele de Diamante Orgânico","grau":5}],"fraqueza":[]},{"nome":"Mercenária","poder":[{"texto":"Força e Resistência Aumentadas pelo Diamante","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Pele de Diamante Orgânico","grau":5},{"texto":"Força e Resistência Aumentadas pelo Diamante","grau":4},{"texto":"Opera nos Dois Lados","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Ex-Mercenária","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Diamond Lil' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Moldar Metal","poder":[{"texto":"Tecnopatia","grau":5}],"fraqueza":[]},{"nome":"Gênio Mecânico","poder":[{"texto":"Constrói Robôs e Armaduras em Minutos","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Tecnopatia","grau":5},{"texto":"Constrói Robôs e Armaduras em Minutos","grau":4},{"texto":"Opera nos Dois Lados","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Gênio em Engenharia","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Madison Jeffries' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Persuasão","poder":[{"texto":"Controle Mental por Voz","grau":5}],"fraqueza":[]},{"nome":"Voz de Controle","poder":[{"texto":"Filha do Purple Man","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Controle Mental por Voz","grau":5},{"texto":"Filha do Purple Man","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Tenta se Redimir","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Persuasion' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Cartas Místicas","poder":[{"texto":"Invocação de Arquétipos do Tarô","grau":5}],"fraqueza":[]},{"nome":"Vidente do Caos","poder":[{"texto":"Cada Carta tem Efeito Específico","grau":4}],"fraqueza":[{"texto":"Cartas São Imprevisíveis","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Invocação de Arquétipos do Tarô","grau":5},{"texto":"Cada Carta tem Efeito Específico","grau":4},{"texto":"Cartas São Imprevisíveis","grau":2},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Precognição Limitada via Leitura de Cartas","grau":3},{"texto":"Treinada por Emma Frost","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Tarot' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Gato","poder":[{"texto":"Transformação em Felina Humanóide","grau":3}],"fraqueza":[]},{"nome":"Hellion Leal","poder":[{"texto":"Garras, Agilidade e Visão Noturna","grau":3}],"fraqueza":[{"texto":"Mentalidade de Gato","grau":1}]}]'::jsonb),
  tags = '[{"texto":"Transformação em Felina Humanóide","grau":3},{"texto":"Garras, Agilidade e Visão Noturna","grau":3},{"texto":"Mentalidade de Gato","grau":1},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante de Nível Baixo","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Catseye' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Manipulação Emocional","poder":[{"texto":"Projeção Emocional","grau":5}],"fraqueza":[]},{"nome":"Bruto do Clube","poder":[{"texto":"Tortura Psicológica","grau":4}],"fraqueza":[{"texto":"Sádico","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Projeção Emocional","grau":5},{"texto":"Tortura Psicológica","grau":4},{"texto":"Sádico","grau":2},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Empath' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Propulsão a Jato","poder":[{"texto":"Propulsão a Jato Biológica","grau":3}],"fraqueza":[]},{"nome":"Hellion","poder":[{"texto":"Rival de Cannonball","grau":2}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Propulsão a Jato Biológica","grau":3},{"texto":"Rival de Cannonball","grau":2},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Saudita","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Jetstream' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Força Bruta","poder":[{"texto":"Força e Resistência Colossais","grau":4}],"fraqueza":[]},{"nome":"Hellion","poder":[{"texto":"Inteligência Muito Limitada","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Força e Resistência Colossais","grau":4},{"texto":"Inteligência Muito Limitada","grau":3},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Lealdade Cega","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Beef' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Roleta da Sorte","poder":[{"texto":"Discos de Sorte/Azar","grau":4}],"fraqueza":[]},{"nome":"Jogadora","poder":[{"texto":"Efeitos Imprevisíveis","grau":2}],"fraqueza":[{"texto":"Viciada em Risco","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Discos de Sorte/Azar","grau":4},{"texto":"Efeitos Imprevisíveis","grau":2},{"texto":"Viciada em Risco","grau":2},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Jogadora Compulsiva","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Roulette' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Sombra do Tempo","poder":[{"texto":"Ilusões Temporais de Si Mesma","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Ilusões Temporais de Si Mesma","grau":3},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante de Nível Baixo","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Timeshadow' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Partículas","poder":[{"texto":"Rajadas de Energia","grau":2}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Rajadas de Energia","grau":2},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Personagem Menor","grau":1}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Bevatron' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Tecnopatia","poder":[{"texto":"Intangibilidade","grau":4}],"fraqueza":[]},{"nome":"Herdeiro do Clube","poder":[{"texto":"Manipulador Político","grau":3}],"fraqueza":[{"texto":"À Sombra do Pai","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Intangibilidade","grau":4},{"texto":"Manipulador Político","grau":3},{"texto":"À Sombra do Pai","grau":2},{"texto":"Tecnopatia","grau":3},{"texto":"Herdeiro","grau":2},{"texto":"Sombra do Pai","grau":2},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Tentou Assassinar o Próprio Pai","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Shinobi Shaw' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Portal Temporal","poder":[{"texto":"Portais Dimensionais","grau":5}],"fraqueza":[]},{"nome":"Assassino do Tempo","poder":[{"texto":"Viagem Temporal","grau":4}],"fraqueza":[{"texto":"Ambicioso e Cruel","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Portais Dimensionais","grau":5},{"texto":"Viagem Temporal","grau":4},{"texto":"Ambicioso e Cruel","grau":2},{"texto":"Portal Temporal","grau":4},{"texto":"Ambicioso","grau":2},{"texto":"Membro do Clube do Inferno","grau":3},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Trevor Fitzroy' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Força Sobre-humana","poder":[{"texto":"Força Sobrehumana e Pele Super-densa","grau":5}],"fraqueza":[]},{"nome":"Pele Indestrutível","poder":[{"texto":"Resistência Extrema ao Dano","grau":4}],"fraqueza":[{"texto":"Raiva Incontrolável","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Força Sobrehumana e Pele Super-densa","grau":5},{"texto":"Resistência Extrema ao Dano","grau":4},{"texto":"Raiva Incontrolável","grau":2},{"texto":"Força","grau":4},{"texto":"Pele Indestrutível","grau":4},{"texto":"Raiva","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Ex-Acólita de Magneto","grau":3},{"texto":"Eventual Aliada dos X-Men","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Frenzy' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Lava","poder":[{"texto":"Corpo de Magma Fundido","grau":4}],"fraqueza":[]},{"nome":"Alliance of Evil","poder":[{"texto":"Controle de Lava","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Corpo de Magma Fundido","grau":4},{"texto":"Controle de Lava","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Morto por Apocalipse","grau":1}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Magma (Alliance of Evil)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Crescimento","poder":[{"texto":"Crescimento até 15 Metros","grau":4}],"fraqueza":[{"texto":"Instabilidade","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Crescimento até 15 Metros","grau":4},{"texto":"Instabilidade","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Força e Resistência Colossais em Tamanho Máximo","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Tower' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ferrão","poder":[{"texto":"Projéteis Bioelétricos","grau":2}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Projéteis Bioelétricos","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Personagem Menor","grau":1}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Stinger' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Acolyte","poder":[{"texto":"Força Sobrehumana","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Força Sobrehumana","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Ex-Membro da Aliança do Mal","grau":1}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Cargill' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Salto Temporal","poder":[{"texto":"Percepção Temporal Acelerada","grau":4}],"fraqueza":[{"texto":"Controle Imperfeito","grau":2}]},{"nome":"Cronometrista","poder":[{"texto":"Precognição Limitada ao Imediato","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Percepção Temporal Acelerada","grau":4},{"texto":"Controle Imperfeito","grau":2},{"texto":"Precognição Limitada ao Imediato","grau":3},{"texto":"Salto Temporal","grau":3},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Personagem Menor","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Timeslip' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Explosão Cinética","poder":[{"texto":"Supervelocidade","grau":3}],"fraqueza":[]},{"nome":"Sem Freio","poder":[{"texto":"Personagem Menor","grau":1}],"fraqueza":[{"texto":"Impulsivo Demais","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Supervelocidade","grau":3},{"texto":"Personagem Menor","grau":1},{"texto":"Impulsivo Demais","grau":2},{"texto":"Explosão Cinética","grau":3},{"texto":"Impulsivo","grau":2},{"texto":"Membro dos Novos Mutantes","grau":2},{"texto":"Mutante de Nível Baixo","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Impulse' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Fator de Cura","poder":[{"texto":"Absorção e Liberação de Energia Cinética","grau":4}],"fraqueza":[]},{"nome":"Assassino da Weapon X","poder":[{"texto":"Traje de Supressão de Poderes","grau":3}],"fraqueza":[{"texto":"Lavagem Cerebral","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Absorção e Liberação de Energia Cinética","grau":4},{"texto":"Traje de Supressão de Poderes","grau":3},{"texto":"Lavagem Cerebral","grau":2},{"texto":"Fator de Cura","grau":4},{"texto":"Atirador","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Agente de Elite","grau":4},{"texto":"Caçador de Mutantes Profissional","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Agent Zero' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Fator de Cura","poder":[{"texto":"Garras Retráteis","grau":2}],"fraqueza":[]},{"nome":"Sedutora Letal","poder":[{"texto":"Fator de Cura Limitado","grau":2}],"fraqueza":[{"texto":"Memórias Roubadas","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Garras Retráteis","grau":2},{"texto":"Fator de Cura Limitado","grau":2},{"texto":"Memórias Roubadas","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Ex-Amante de Wolverine","grau":3},{"texto":"Assassinada por Sabretooth","grau":1}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Silver Fox' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Voo","poder":[{"texto":"Teletransporte de Curta Distância","grau":3}],"fraqueza":[]},{"nome":"Agente Governamental","poder":[{"texto":"Treinamento de Combate de Elite","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Teletransporte de Curta Distância","grau":3},{"texto":"Treinamento de Combate de Elite","grau":4},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Código de Honra Próprio","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Kestrel' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Eletricidade","poder":[{"texto":"Projeção de Rajadas Elétricas","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Projeção de Rajadas Elétricas","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Ex-Militar","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Bolt' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Campo de Força Pessoal","poder":[{"texto":"Pele de Metal Orgânico","grau":4}],"fraqueza":[]},{"nome":"Lei do Silêncio","poder":[{"texto":"Força Aumentada na Forma Metálica","grau":4}],"fraqueza":[{"texto":"Passado Mafioso","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Pele de Metal Orgânico","grau":4},{"texto":"Força Aumentada na Forma Metálica","grau":4},{"texto":"Passado Mafioso","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Ex-Família Mafiosa","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Omerta' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Teleporte","poder":[{"texto":"Intangibilidade","grau":4}],"fraqueza":[]},{"nome":"Fantasma","poder":[{"texto":"Adolescente Problemático","grau":2}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Intangibilidade","grau":4},{"texto":"Adolescente Problemático","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Wraith (Hector Rendoza)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Feromônios","poder":[{"texto":"Feromonas","grau":4}],"fraqueza":[]},{"nome":"Trabalhadora do Sexo","poder":[{"texto":"Camuflagem de Pele","grau":3}],"fraqueza":[{"texto":"Subestimada Pelos Heróis","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Feromonas","grau":4},{"texto":"Camuflagem de Pele","grau":3},{"texto":"Subestimada Pelos Heróis","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Presença Sexual Dominante","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Stacy X' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Adaptação Reativa","poder":[{"texto":"Adaptação Reativa a Ameaças","grau":5}],"fraqueza":[]},{"nome":"Protetora Instintiva","poder":[{"texto":"Poderes Mudam Conforme o Perigo","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Adaptação Reativa a Ameaças","grau":5},{"texto":"Poderes Mudam Conforme o Perigo","grau":4},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Irmã de Slipstream","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Lifeguard' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Portal Dimensional","poder":[{"texto":"Portais de Energia para Teletransporte","grau":4}],"fraqueza":[]},{"nome":"Irmão de Lifeguard","poder":[{"texto":"Pode Transportar Grupos Através dos Portais","grau":3}],"fraqueza":[{"texto":"Inseguro","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Portais de Energia para Teletransporte","grau":4},{"texto":"Pode Transportar Grupos Através dos Portais","grau":3},{"texto":"Inseguro","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Irmão de Lifeguard","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Slipstream' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Lâminas Psíquicas","poder":[{"texto":"Artes Marciais de Elite","grau":5}],"fraqueza":[]},{"nome":"Ninja Chinês","poder":[{"texto":"Humano no Pico da Perfeição","grau":4}],"fraqueza":[{"texto":"Passado Criminoso","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Artes Marciais de Elite","grau":5},{"texto":"Humano no Pico da Perfeição","grau":4},{"texto":"Passado Criminoso","grau":2},{"texto":"Membro dos X-Men","grau":3},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Ex-Agente Chinês","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Red Lotus' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Gênio Técnico","poder":[{"texto":"Conserto Rápido de Máquinas","grau":2}],"fraqueza":[{"texto":"Covarde","grau":1}]}]'::jsonb),
  tags = '[{"texto":"Conserto Rápido de Máquinas","grau":2},{"texto":"Covarde","grau":1},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Nível Baixo","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Fixer' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Amigos da Humanidade","poder":[{"texto":"Humano Sem Poderes"}],"fraqueza":[{"texto":"Ódio a Mutantes","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Humano Sem Poderes"},{"texto":"Ódio a Mutantes","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Armamento Leve","grau":2},{"texto":"Fanatismo Anti-Mutante","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Graydon Creed (FOH)' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Político Anti-Mutante","poder":[{"texto":"Filho de Mystique e Sabretooth","grau":3}],"fraqueza":[{"texto":"Filho de Mística e Sabretooth","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Filho de Mystique e Sabretooth","grau":3},{"texto":"Filho de Mística e Sabretooth","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Líder dos Amigos da Humanidade","grau":4},{"texto":"Orador e Manipulador Político","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Graydon Creed' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Amigos da Humanidade","poder":[{"texto":"Cyborg","grau":4}],"fraqueza":[{"texto":"Obsessão por Ciclope","grau":2}]},{"nome":"Pescoço Robótico","poder":[{"texto":"Imortalidade Pela Preservação da Cabeça","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Cyborg","grau":4},{"texto":"Obsessão por Ciclope","grau":2},{"texto":"Imortalidade Pela Preservação da Cabeça","grau":4},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Líder da Falange","grau":3},{"texto":"Anti-Mutante Radical","grau":4},{"texto":"Ex-Parceiro de Warren Worthington","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Cameron Hodge' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ciborgue Reaver","poder":[{"texto":"Corpo Robótico de Alta Tecnologia","grau":4}],"fraqueza":[]},{"nome":"Líder dos Reavers","poder":[{"texto":"Líder dos Reavers","grau":3}],"fraqueza":[{"texto":"Ódio a Mutantes","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Corpo Robótico de Alta Tecnologia","grau":4},{"texto":"Líder dos Reavers","grau":3},{"texto":"Ódio a Mutantes","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Engenheiro de Elite","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Donald Pierce' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ilusões","poder":[{"texto":"Ilusões Realistas Indistinguíveis da Realidade","grau":5}],"fraqueza":[]},{"nome":"Mestre do Engano","poder":[{"texto":"Filha de Jason Wyngarde","grau":3}],"fraqueza":[{"texto":"Arrogância","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Ilusões Realistas Indistinguíveis da Realidade","grau":5},{"texto":"Filha de Jason Wyngarde","grau":3},{"texto":"Arrogância","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Manipuladora Narcisista","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Lady Mastermind' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Hipnose","poder":[{"texto":"Hipnose em Massa","grau":4}],"fraqueza":[]},{"nome":"Artista Hipnótico","poder":[{"texto":"Ilusões Auxiliares","grau":3}],"fraqueza":[{"texto":"Viciado em Si Mesmo","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Hipnose em Massa","grau":4},{"texto":"Ilusões Auxiliares","grau":3},{"texto":"Viciado em Si Mesmo","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Manipulação de Multidões","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Mesmero' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Teleporte","poder":[{"texto":"Teletransporte Planetário Instantâneo","grau":5}],"fraqueza":[]},{"nome":"Ladrão","poder":[{"texto":"Ladrão de Elite","grau":3}],"fraqueza":[{"texto":"Covarde","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Teletransporte Planetário Instantâneo","grau":5},{"texto":"Ladrão de Elite","grau":3},{"texto":"Covarde","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Aliado Eventual dos X-Men","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Vanisher' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Pterossauro","poder":[{"texto":"Transformação em Pterossauro Humanóide","grau":4},{"texto":"Drenagem de Energia Vital","grau":4}],"fraqueza":[]},{"nome":"Doutor Sáurio","poder":[{"texto":"Voo","grau":4}],"fraqueza":[{"texto":"Hipocrisia Ambiental","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Transformação em Pterossauro Humanóide","grau":4},{"texto":"Drenagem de Energia Vital","grau":4},{"texto":"Voo","grau":4},{"texto":"Hipocrisia Ambiental","grau":2},{"texto":"Pterossauro","grau":4},{"texto":"Doutor","grau":3},{"texto":"Hipocrisia","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Sauron' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Desorientação","poder":[{"texto":"Indução de Vertigem e Desorientação Severa","grau":4}],"fraqueza":[]},{"nome":"Maroto","poder":[{"texto":"Poder Funciona em Área","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Indução de Vertigem e Desorientação Severa","grau":4},{"texto":"Poder Funciona em Área","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Vertigo' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Atirador de Elite","poder":[{"texto":"Atirador de Elite","grau":5}],"fraqueza":[]},{"nome":"Maroto Líder","poder":[{"texto":"Líder dos Marotos","grau":3}],"fraqueza":[{"texto":"Crueldade","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Atirador de Elite","grau":5},{"texto":"Líder dos Marotos","grau":3},{"texto":"Crueldade","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Poder Mutante","grau":4},{"texto":"Implacável","grau":3},{"texto":"Cicatrizes Faciais","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Scalphunter' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ondas de Choque","poder":[{"texto":"Ondas de Choque Sísmicas","grau":4}],"fraqueza":[]},{"nome":"Maroto","poder":[{"texto":"Força Aumentada pela Mutação","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Ondas de Choque Sísmicas","grau":4},{"texto":"Força Aumentada pela Mutação","grau":4},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Arclight' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Superforça","poder":[{"texto":"Força e Resistência Colossais","grau":5}],"fraqueza":[{"texto":"Inteligência Limitada","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Força e Resistência Colossais","grau":5},{"texto":"Inteligência Limitada","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante de Elite","grau":3},{"texto":"Veterano de Combate","grau":3},{"texto":"Reflexos Aguçados","grau":2},{"texto":"Resistência Mental Treinada","grau":2},{"texto":"Capanga Leal de Sinister","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Blockbuster' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Cristal Vivo","poder":[{"texto":"Corpo de Cristal","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Corpo de Cristal","grau":4},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Prism' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Turbilhão","poder":[{"texto":"Rotação Supersônica","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Rotação Supersônica","grau":4},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Velocidade de Rotação Debilita Oponentes em Área","grau":3},{"texto":"Assassino Implacável","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Riptide' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Arpões Energéticos","poder":[{"texto":"Arpões Energéticos","grau":5}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Arpões Energéticos","grau":5},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Poder de Penetrar Qualquer Defesa","grau":4},{"texto":"Assassino Calculista","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Harpoon' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Scramble de Poderes","poder":[{"texto":"Interferência em Sistemas Elétricos e Biológicos","grau":4}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Interferência em Sistemas Elétricos e Biológicos","grau":4},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Desativa Poderes Mutantes ao Toque","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Scrambler' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Agente S.H.I.E.L.D.","poder":[{"texto":"Treinamento Tático de Elite","grau":3}],"fraqueza":[]}]'::jsonb),
  tags = '[{"texto":"Treinamento Tático de Elite","grau":3},{"texto":"Humano com Acesso a Alto Escalão","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Armamento de Alta Tecnologia S.H.I.E.L.D.","grau":3},{"texto":"Lealdade à Organização","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Agente S.H.I.E.L.D.' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Ligação Governamental","poder":[{"texto":"Especialista em Relações com Mutantes","grau":4}],"fraqueza":[]},{"nome":"Aliada Relutante","poder":[{"texto":"Inteligência Política Excepcional","grau":4}],"fraqueza":[{"texto":"Burocracia","grau":1}]}]'::jsonb),
  tags = '[{"texto":"Especialista em Relações com Mutantes","grau":4},{"texto":"Inteligência Política Excepcional","grau":4},{"texto":"Burocracia","grau":1},{"texto":"Humano com Acesso a Alto Escalão","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Força de Vontade Acima da Média","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Val Cooper' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Burocrata Anti-Mutante","poder":[{"texto":"Funcionário Governamental de Alto Escalão","grau":4}],"fraqueza":[{"texto":"Preconceito","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Funcionário Governamental de Alto Escalão","grau":4},{"texto":"Preconceito","grau":2},{"texto":"Humano com Acesso a Alto Escalão","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Burocracia como Arma","grau":4},{"texto":"Anti-Mutante Pragmático","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Henry Gyrich' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Criador das Sentinelas","poder":[{"texto":"Gênio em Robótica e Bioengenharia","grau":5}],"fraqueza":[{"texto":"Pesadelo Realizado","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Gênio em Robótica e Bioengenharia","grau":5},{"texto":"Pesadelo Realizado","grau":2},{"texto":"Humano com Acesso a Alto Escalão","grau":2},{"texto":"Mutante de Nível Baixo","grau":2},{"texto":"Arrependido no Final da Vida","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Bolivar Trask' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Criador de Sentinelas","poder":[{"texto":"Precognição","grau":4}],"fraqueza":[{"texto":"Ódio Hereditário","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Precognição","grau":4},{"texto":"Ódio Hereditário","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Herdeiro do Programa Sentinel","grau":3}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Larry Trask' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Cientista Anti-Mutante","poder":[{"texto":"Coronel do Exército","grau":3}],"fraqueza":[{"texto":"Fanático","grau":2}]}]'::jsonb),
  tags = '[{"texto":"Coronel do Exército","grau":3},{"texto":"Fanático","grau":2},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Líder do Projeto Fênix","grau":3},{"texto":"Mente Transferida para Corpo Sentinel","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Steven Lang' AND is_global = TRUE;

UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '[{"nome":"Pregador do Ódio","poder":[{"texto":"Orador Carismático","grau":5}],"fraqueza":[{"texto":"Fanático Religioso","grau":3}]}]'::jsonb),
  tags = '[{"texto":"Orador Carismático","grau":5},{"texto":"Fanático Religioso","grau":3},{"texto":"Conhecido no Submundo Mutante","grau":2},{"texto":"Mutante Experiente","grau":2},{"texto":"Treinamento de Combate","grau":2},{"texto":"Líder dos Purificadores","grau":4},{"texto":"Filho Mutante que Matou Esposa","grau":4}]'::jsonb,
  updated_at = NOW()
  WHERE name = 'Reverend William Stryker' AND is_global = TRUE;

COMMIT;

-- Resumo: 133 NPCs enriquecidos.
