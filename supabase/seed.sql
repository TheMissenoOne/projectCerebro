-- Seed dos 134 NPCs do Cérebro
-- Executar no SQL Editor do Supabase

-- Professor X
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Professor X',
  'Charles Xavier',
  'x-men',
  'extremo',
  '{"iniciativa":0,"stats":{"destreza":2,"força":2,"corpo":2,"inteligência":12,"vontade":12,"mente":15,"influência":10,"aura":9,"espírito":10},"tags":[{"texto":"Telepatia Ômega","grau":6},{"texto":"Controle Mental Profundo","grau":5},{"texto":"Estrategista e Líder Visionário","grau":4},{"texto":"Fundador do Instituto Xavier","grau":4},{"texto":"Mestre de Xadrez","grau":3},{"texto":"Paraplégico","grau":3},{"texto":"Relutante em usar força total","grau":2}],"descricao":"Charles Francis Xavier, o mutante telepático mais poderoso do mundo. Mente 15 supera qualquer humano — percebe e influencia consciências num raio de quilômetros. Fundou o Instituto Xavier e os X-Men com a visão de coexistência pacífica. Paraplégico após confronto com o alienígena Lucifer.\n---"}'::jsonb,
  true,
  NOW()
);

-- Ciclope
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Ciclope',
  'Scott Summers',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":9,"força":5,"corpo":6,"inteligência":8,"vontade":10,"mente":8,"influência":8,"aura":7,"espírito":9},"tags":[{"texto":"Rajada Óptica de Força Cinética","grau":5},{"texto":"Liderança Tática de Elite","grau":4},{"texto":"Precisão Cirúrgica de Tiro","grau":4},{"texto":"Disciplina de Aço","grau":4},{"texto":"Estrategista de Campo","grau":3},{"texto":"Sem controle dos olhos sem o visor","grau":4},{"texto":"Peso da Responsabilidade","grau":2}],"descricao":"O primeiro estudante de Xavier e líder de campo dos X-Men. DEX 9 e STR/BOD no pico humano — fisicamente é a elite do humano possível. Vontade 10 supera o limite humano, forjada em anos de responsabilidade. A rajada óptica (grau 5) é devastadora. Sem o visor é uma ameaça incontrolável.\n---"}'::jsonb,
  true,
  NOW()
);

-- Wolverine
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Wolverine',
  'Logan',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":8,"força":7,"corpo":12,"inteligência":5,"vontade":9,"mente":6,"influência":5,"aura":7,"espírito":8},"tags":[{"texto":"Fator de Cura Acelerado","grau":6},{"texto":"Esqueleto de Adamantium","grau":5},{"texto":"Garras de Adamantium","grau":5},{"texto":"Sentidos de Predador Apex","grau":4},{"texto":"Combatente Veterano","grau":4},{"texto":"Instinto Berserker","grau":3},{"texto":"Memórias Fragmentadas","grau":2}],"descricao":"BOD 12 reflete o adamantium no esqueleto — impossível de matar permanentemente. STR 7 é sobrehumano. O fator de cura grau 6 indica regeneração de ferimentos letais em minutos. Mais de um século de combate. A bússola moral rígida por baixo da brutalidade.\n---"}'::jsonb,
  true,
  NOW()
);

-- Tempestade
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Tempestade',
  'Ororo Munroe',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":7,"vontade":9,"mente":8,"influência":10,"aura":12,"espírito":10},"tags":[{"texto":"Controle Climático Global","grau":6},{"texto":"Desencadeia Raios com Precisão Cirúrgica","grau":5},{"texto":"Criação de Tornados e Furacões","grau":5},{"texto":"Voo via Correntes de Ar","grau":4},{"texto":"Liderança Carismática","grau":4},{"texto":"Considerada Deusa por culturas africanas","grau":3},{"texto":"Claustrofobia Severa","grau":3}],"descricao":"AUR 12 no teto humano. Controle climático grau 6 opera em escala global. A claustrofobia (-3) é fraqueza severa explorada por inimigos. Descendente de sacerdotisas com olhos brancos. Ororo cresceu nas ruas do Cairo antes de Xavier.\n---"}'::jsonb,
  true,
  NOW()
);

-- Jean Grey
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Jean Grey',
  'Marvel Girl / Fênix',
  'x-men',
  'extremo',
  '{"iniciativa":0,"stats":{"destreza":6,"força":5,"corpo":5,"inteligência":9,"vontade":9,"mente":12,"influência":8,"aura":11,"espírito":11},"tags":[{"texto":"Telepatia de Nível Ômega","grau":5},{"texto":"Telecinesia Precisa e Devastadora","grau":5},{"texto":"Anfitrião da Força Fênix","grau":6},{"texto":"Empatia Profunda","grau":4},{"texto":"Potencial Ômega não totalmente desbloqueado","grau":4},{"texto":"Elo Psíquico com Scott Summers","grau":3},{"texto":"Força Fênix pode consumir o self","grau":3}],"descricao":"Mente 12 no teto absoluto. AUR 11 reflete presença psíquica extraordinária. A tag da Força Fênix grau 6 é latente — quando desperta, é catastrófica. A fraqueza -3 indica que o poder pode voltar-se contra ela. Coração emocional dos X-Men.\n---"}'::jsonb,
  true,
  NOW()
);

-- Fera
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Fera',
  'Henry "Hank" McCoy',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":12,"força":9,"corpo":8,"inteligência":12,"vontade":8,"mente":10,"influência":8,"aura":7,"espírito":8},"tags":[{"texto":"Agilidade Felina Sobrenatural","grau":5},{"texto":"Intelecto Polímata","grau":5},{"texto":"Força Sobre","grau":4},{"texto":"Patas e Presas","grau":3},{"texto":"Aparência Felina Azul","grau":3},{"texto":"Médico e Cirurgião de Elite","grau":4},{"texto":"Aparência desfavorece situações sociais","grau":2}],"descricao":"DEX 12 e INT 12 — ambos no teto absoluto do pico humano. Reflete criatura que empurra simultaneamente os limites físicos e intelectuais. A segunda mutação deu aparência felina. Ex-Vingador. Cita Shakespeare durante lutas.\n---"}'::jsonb,
  true,
  NOW()
);

-- Ícone
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Ícone',
  'Bobby Drake',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":7,"força":5,"corpo":5,"inteligência":7,"vontade":7,"mente":7,"influência":6,"aura":8,"espírito":7},"tags":[{"texto":"Criocinese Ômega","grau":6},{"texto":"Transformação em Ser de Gelo Puro","grau":5},{"texto":"Armadura de Gelo Instantânea","grau":4},{"texto":"Criação de Estruturas de Gelo Complexas","grau":4},{"texto":"Humor Defensivo","grau":2},{"texto":"Potencial Ômega raramente utilizado","grau":3}],"descricao":"Mutante de nível Ômega que raramente usa o potencial completo (tag -2 explica o gap). Pode transformar o corpo inteiro em gelo cristalino puro. A criocinese grau 6 inclui controle de temperatura ambiente, criação de pontes de gelo, aprisionamento de oponentes inteiros. Usa humor para evitar responsabilidade.\n---"}'::jsonb,
  true,
  NOW()
);

-- Anjo
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Anjo',
  'Warren Worthington III / Arcanjo',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":9,"força":5,"corpo":6,"inteligência":6,"vontade":6,"mente":6,"influência":10,"aura":9,"espírito":7},"tags":[{"texto":"Asas","grau":4},{"texto":"Sangue com Propriedades Curativas Únicas","grau":4},{"texto":"Bilionário Worthington Industries","grau":4},{"texto":"Como Arcanjo","grau":4},{"texto":"Aparência Angélica","grau":3},{"texto":"Trauma de Apocalipse","grau":2}],"descricao":"INF 10 e AUR 9 refletem aparência angelical, status social e fortuna. DEX 9 e STR/BOD no pico humano para combate aéreo. Como Arcanjo, as asas metálicas disparam dardos de adamantium (tag grau 4 adicional). Financia operações dos X-Men com a fortuna Worthington.\n---"}'::jsonb,
  true,
  NOW()
);

-- Colossus
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Colossus',
  'Piotr Rasputin',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":6,"força":14,"corpo":13,"inteligência":5,"vontade":7,"mente":6,"influência":6,"aura":6,"espírito":9},"tags":[{"texto":"Transformação em Aço Orgânico Indestrutível","grau":5},{"texto":"Força Colossal","grau":5},{"texto":"Invulnerabilidade ao Dano Físico Convencional","grau":5},{"texto":"Artista e Pintor Sensível","grau":3},{"texto":"Protetor da Família Rasputin","grau":4},{"texto":"Espírito Gentil","grau":1}],"descricao":"STR 14 e BOD 13 — claramente sobrehumano. Em aço orgânico, invulnerável a dano físico convencional (grau 5). Iniciativa baixa (5) reflete o peso da forma metálica. ESP 9 — alma profunda e código de honra. O contraste entre aparência brutal e sensibilidade artística define o personagem.\n---"}'::jsonb,
  true,
  NOW()
);

-- Noturno
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Noturno',
  'Kurt Wagner',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":12,"força":5,"corpo":5,"inteligência":7,"vontade":9,"mente":8,"influência":7,"aura":8,"espírito":10},"tags":[{"texto":"Teletransporte via Dimensão Sombria (bamf)","grau":5},{"texto":"Agilidade Acrobática Extrema","grau":5},{"texto":"Cauda Preênsil","grau":3},{"texto":"Visão no Escuro","grau":3},{"texto":"Fé Católica Profunda","grau":4},{"texto":"Aparência Demoníaca","grau":2},{"texto":"Cada Teleporte deixa rastro de enxofre","grau":1}],"descricao":"DEX 12 no limite absoluto do humano. Iniciativa 11 é a mais alta dos X-Men. Teleporte grau 5 — instantâneo mas atravessa dimensão sombria. ESP 10 — paradoxo entre aparência de demônio e fé genuína. Filho biológico de Mystique, sem saber.\n---"}'::jsonb,
  true,
  NOW()
);

-- Kitty Pryde
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Kitty Pryde',
  'Shadowcat / Sprite',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":8,"força":3,"corpo":4,"inteligência":10,"vontade":9,"mente":9,"influência":7,"aura":8,"espírito":9},"tags":[{"texto":"Intangibilidade","grau":5},{"texto":"Disrupção de Circuitos Eletrônicos ao Atravessar","grau":3},{"texto":"Hacking e Programação de Elite","grau":5},{"texto":"Ninjitsu","grau":3},{"texto":"Lockheed","grau":4},{"texto":"Fisicamente Frágil","grau":3}],"descricao":"INT 10 próxima ao pico humano. Intangibilidade grau 5 — atravessa qualquer matéria, incluindo campos de força. BOD 4 é fraqueza real (-3 quando tangível). A disrupção de eletrônicos ao atravessar pode ser tática ou problemática. Entrou no Instituto aos 13 anos como prodígio.\n---"}'::jsonb,
  true,
  NOW()
);

-- Rogue
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Rogue',
  'Anna Marie',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":8,"força":9,"corpo":9,"inteligência":6,"vontade":9,"mente":7,"influência":8,"aura":10,"espírito":8},"tags":[{"texto":"Absorção de Poderes e Memórias ao Toque","grau":6},{"texto":"Voo e Força Sobrehumana (Ms. Marvel permanente)","grau":4},{"texto":"Invulnerabilidade Parcial (Ms. Marvel permanente)","grau":4},{"texto":"Toque Letal Involuntário","grau":4},{"texto":"Isolamento Emocional Permanente","grau":4},{"texto":"Múltiplas Personalidades Absorvidas","grau":3}],"descricao":"STR 9 e BOD 9 vêm dos poderes absorvidos permanentemente de Ms. Marvel. O toque grau 6 absorve tudo — memórias, personalidade, poderes. As três tags negativas (-4, -4, -3) representam o custo emocional devastador. Passou anos na Irmandade antes de pedir ajuda a Xavier.\n---"}'::jsonb,
  true,
  NOW()
);

-- Gambit
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Gambit',
  'Remy LeBeau',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":11,"força":5,"corpo":6,"inteligência":7,"vontade":8,"mente":7,"influência":10,"aura":11,"espírito":8},"tags":[{"texto":"Carga Cinética em Qualquer Objeto","grau":5},{"texto":"Mestre Ladrão e Acrobata de Elite","grau":4},{"texto":"Charme Mutante","grau":4},{"texto":"Cajado Bo","grau":3},{"texto":"Cartas de Baralho como Projéteis Explosivos","grau":3},{"texto":"Passado Obscuro na Guilda dos Ladrões","grau":3},{"texto":"Lealdade Questionável","grau":2}],"descricao":"DEX 11 e AUR 11 — mestre ladrão e sedutor com charme de nível quase mutante. Carga cinética grau 5 — qualquer objeto vira explosivo com timing perfeito. INF 10 com carisma desarmante que esconde o passado de escolhas moralmente duvidosas.\n---"}'::jsonb,
  true,
  NOW()
);

-- Psylocke
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Psylocke',
  'Betsy Braddock',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":10,"força":6,"corpo":6,"inteligência":8,"vontade":9,"mente":11,"influência":8,"aura":9,"espírito":9},"tags":[{"texto":"Espada Psiônica","grau":5},{"texto":"Telepatia de Combate","grau":4},{"texto":"Ninjitsu e Artes Marciais de Elite","grau":4},{"texto":"Telecinesia Precisa","grau":3},{"texto":"Corpo Trocado com Kwannon","grau":2},{"texto":"Ex","grau":1}],"descricao":"DEX 10 no pico humano absoluto — ninja de elite. MEN 11 próxima ao teto. A Espada Psiônica grau 5 age diretamente na mente, ignorando armaduras físicas. A tag de identidade fragmentada (-2) reflete décadas de trauma pela troca de corpo. Irmã de Brian Braddock (Captain Britain).\n---"}'::jsonb,
  true,
  NOW()
);

-- Bishop
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Bishop',
  'Lucas Bishop',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":7,"força":8,"corpo":8,"inteligência":7,"vontade":8,"mente":7,"influência":6,"aura":7,"espírito":8},"tags":[{"texto":"Absorção e Redirecionamento de Energia","grau":5},{"texto":"Armamento Pesado","grau":3},{"texto":"Treinamento XSE","grau":4},{"texto":"Marcado com \"M\" no rosto","grau":3},{"texto":"Obsessão com Ameaças ao Futuro","grau":2}],"descricao":"STR 8 e BOD 8 sobrehumanos para um policial — refletem treinamento e fisicalidade do futuro. Absorção grau 5 inclui qualquer forma de energia. A marca \"M\" no rosto é símbolo de campo de concentração de mutantes do futuro. A obsessão (-2) com Cable quase destruiu sua aliança com os X-Men.\n---"}'::jsonb,
  true,
  NOW()
);

-- Jubileu
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Jubileu',
  'Jubilation Lee',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":3,"corpo":4,"inteligência":6,"vontade":7,"mente":7,"influência":7,"aura":8,"espírito":7},"tags":[{"texto":"Plasmóides Pirocinéticos","grau":3},{"texto":"Potencial Ômega Latente","grau":5},{"texto":"Protegida de Wolverine","grau":3},{"texto":"Vampira (após M","grau":3},{"texto":"Potencial Ômega bloqueado por autoestima","grau":2}],"descricao":"Os fogos de artifício de plasma (grau 3) são o que ela usa normalmente — mas o potencial Ômega latente (grau 5) raramente aparece. A tag negativa -2 explica o gap. BOD 4 — fisicamente frágil sem os poderes. Após M-Day tornou-se vampira com poderes distintos. Mãe adotiva de Shogo.\n---"}'::jsonb,
  true,
  NOW()
);

-- Polaris
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Polaris',
  'Lorna Dane',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":6,"força":5,"corpo":6,"inteligência":7,"vontade":7,"mente":7,"influência":6,"aura":7,"espírito":7},"tags":[{"texto":"Magnetismo","grau":4},{"texto":"Campo de Força Magnético Pessoal","grau":4},{"texto":"Voo por Levitação Magnética","grau":3},{"texto":"Cabelo Verde","grau":2},{"texto":"Instabilidade Mental","grau":3},{"texto":"Identidade incerta como filha de Magneto","grau":2}],"descricao":"Poderes magnéticos comparáveis ao pai mas ainda em desenvolvimento (grau 4 vs grau 6 de Magneto). A instabilidade mental (-3) é histórica — foi possuída por entidades externas múltiplas vezes. A incerteza de identidade (-2) reflete décadas sem saber sua origem real. Líder ocasional do X-Factor.\n---"}'::jsonb,
  true,
  NOW()
);

-- Havok
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Havok',
  'Alex Summers',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":7,"força":5,"corpo":6,"inteligência":7,"vontade":7,"mente":7,"influência":6,"aura":7,"espírito":7},"tags":[{"texto":"Anéis de Plasma Cósmico","grau":5},{"texto":"Imunidade aos Poderes de Ciclope","grau":3},{"texto":"Liderança","grau":3},{"texto":"Síndrome do Irmão Famoso","grau":2},{"texto":"Controle Instável sob Estresse","grau":2}],"descricao":"Os anéis de plasma cósmico grau 5 são explosivos em área — difíceis de controlar com precisão. A imunidade aos poderes de Scott (grau 3) é única e misteriosa. As duas tags negativas (-2 cada) refletem a psicologia de Alex: sempre à sombra de Scott, às vezes impulsivo demais para se provar independente.\n---"}'::jsonb,
  true,
  NOW()
);

-- Emma Frost
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Emma Frost',
  'Rainha Branca',
  'x-men',
  'extremo',
  '{"iniciativa":0,"stats":{"destreza":6,"força":5,"corpo":5,"inteligência":11,"vontade":11,"mente":13,"influência":11,"aura":12},"tags":[{"texto":"Telepatia Ômega","grau":6},{"texto":"Forma de Diamante","grau":5},{"texto":"Manipulação Psicológica Refinada","grau":5},{"texto":"Professora Brutal","grau":4},{"texto":"Ex","grau":3},{"texto":"Sem Telepatia em Forma de Diamante","grau":3},{"texto":"Arrogância como escudo emocional","grau":1}],"descricao":"MEN 13 supera todos os humanos. AUR 12 no teto. Forma de diamante: invulnerável mas perde toda a telepatia (-3 — um ponto cego estratégico real). INT 11 e INF 11 refletem décadas de manipulação política. Após a morte de seus alunos Generation X, mudou de lado.\n---"}'::jsonb,
  true,
  NOW()
);

-- Rachel Summers
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Rachel Summers',
  'Fênix / Marvel Girl',
  'x-men',
  'extremo',
  '{"iniciativa":0,"stats":{"destreza":6,"força":5,"corpo":5,"inteligência":9,"vontade":9,"mente":12,"influência":8,"aura":11,"espírito":11},"tags":[{"texto":"Telepatia Ômega","grau":5},{"texto":"Telecinesia Devastadora","grau":5},{"texto":"Anfitrião da Força Fênix","grau":6},{"texto":"Rastreadora de Mutantes","grau":4},{"texto":"Trauma do Futuro Distópico","grau":3},{"texto":"Marcada como Hound","grau":2}],"descricao":"MEN 12 no teto. AUR 11 e ESP 11 refletem conexão cósmica via Fênix. O trauma grau -3 é debilitante — flashbacks de ser escravizada como caçadora de mutantes. A tag hound (-2) é o condicionamento que pode ser reativado por estressores específicos. Filha de Scott e Jean de linha temporal alternativa.\n---"}'::jsonb,
  true,
  NOW()
);

-- Cable
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Cable',
  'Nathan Summers',
  'geracaox',
  'extremo',
  '{"iniciativa":0,"stats":{"destreza":8,"força":10,"corpo":10,"inteligência":10,"vontade":11,"mente":10,"influência":7,"aura":8,"espírito":10},"tags":[{"texto":"Braço e Olho Biônicos TOV","grau":4},{"texto":"Telepatia e Telecinesia Suprimidas","grau":3},{"texto":"Guerrilheiro de Elite","grau":5},{"texto":"Armamento de Alto Calibre","grau":4},{"texto":"Fundador da X","grau":3},{"texto":"Vírus Techno","grau":4},{"texto":"Obsessão com o Futuro","grau":2}],"descricao":"STR 10 e BOD 10 sobrehumanos — produto de décadas de guerra no futuro + implantes TOV. VON 11 supera o pico humano. A tag -4 do vírus é a restrição central: a maior parte dos poderes psíquicos vai para conter a progressão do TOV. Filho de Ciclope enviado ao futuro como bebê.\n---"}'::jsonb,
  true,
  NOW()
);

-- X-23
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'X-23',
  'Laura Kinney / Wolverine',
  'x-men',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":10,"força":7,"corpo":9,"inteligência":7,"vontade":10,"mente":8,"influência":5,"aura":8,"espírito":9},"tags":[{"texto":"Fator de Cura Acelerado","grau":5},{"texto":"Garras de Adamantium","grau":5},{"texto":"Assassina Condicionada","grau":5},{"texto":"Gatilho de Berserk por Produto Químico","grau":4},{"texto":"Trauma de Condicionamento","grau":3},{"texto":"Identidade em Construção","grau":3}],"descricao":"DEX 10 e VON 10 no pico humano absoluto — treinamento intensivo desde criança. STR 7 sobrehumano. BOD 9 similar a Wolverine sem o adamantium no esqueleto. O gatilho berserk (-4) é a vulnerabilidade mais perigosa — ativa com produto químico específico e ela ataca tudo ao redor. Lentamente descobrindo humanidade.\n---"}'::jsonb,
  true,
  NOW()
);

-- Domino
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Domino',
  'Neena Thurman',
  'geracaox',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":10,"força":6,"corpo":7,"inteligência":8,"vontade":8,"mente":7,"influência":7,"aura":9,"espírito":8},"tags":[{"texto":"Campo de Sorte Probabilística","grau":5},{"texto":"Franco","grau":5},{"texto":"Combate Corpo","grau":3},{"texto":"Mercenária Veterana","grau":4},{"texto":"Sorte não funciona em situações imprevisíveis extremas","grau":1}],"descricao":"DEX 10 no pico humano. A sorte probabilística grau 5 não é magia — é mutação ativa que distorce a realidade ao redor. Quando precisa que a arma do inimigo trave, ela trava. STR 6 e BOD 7 ligeiramente acima do pico — corporal de elite. Parceira de longa data de Cable.\n---"}'::jsonb,
  true,
  NOW()
);

-- Forge
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Forge',
  'Forge',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":5,"corpo":6,"inteligência":13,"vontade":7,"mente":8,"influência":6,"aura":7,"espírito":8},"tags":[{"texto":"Poder Mutante de Invenção","grau":6},{"texto":"Perna e Mão Protéticas de Alta Tecnologia (próprias)","grau":3},{"texto":"Inventor Oficial dos X","grau":4},{"texto":"Xamã Cheyenne","grau":3},{"texto":"Criou o Neutralizador de Mutantes","grau":2},{"texto":"Veterano do Vietnã","grau":1}],"descricao":"INT 13 ligeiramente acima do pico humano — o poder mutante de invenção eleva também sua cognição técnica. A capacidade de criar qualquer dispositivo grau 6 é de categoria Ômega. A tag -2 do Neutralizador reflete culpa real: a arma que criou foi usada contra mutantes. Próteses da própria criação.\n---"}'::jsonb,
  true,
  NOW()
);

-- Dazzler
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Dazzler',
  'Alison Blaire',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":6,"vontade":7,"mente":7,"influência":9,"aura":10,"espírito":8},"tags":[{"texto":"Transdução de Som em Luz","grau":4},{"texto":"Laser de Luz Concentrado","grau":3},{"texto":"Força Sonora como Disco de Ataque","grau":3},{"texto":"Cantora e Performer","grau":4},{"texto":"Precisa de Fonte Sonora para o poder máximo","grau":2}],"descricao":"AUR 10 e INF 9 — carisma de estrela pop que se converte em arma. A transdução grau 4 aumenta com o volume ambiente — em show lotado ela é devastadoramente mais poderosa. A dependência de som (-2) é limitação tática real. Ex-disco queen que tentou manter vida normal. Usa patins no combate.\n---"}'::jsonb,
  true,
  NOW()
);

-- Banshee
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Banshee',
  'Sean Cassidy',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":4,"corpo":5,"inteligência":7,"vontade":7,"mente":7,"influência":7,"aura":8,"espírito":7},"tags":[{"texto":"Grito Sonar","grau":4},{"texto":"Voo via Ondas Sonoras","grau":4},{"texto":"Frequência Hipnótica","grau":3},{"texto":"Ex","grau":3},{"texto":"Fundador da Geração X","grau":3},{"texto":"Pai de Siryn","grau":2}],"descricao":"Grito sonar grau 4 — pode destruir aço e atordoar oponentes em área. A frequência hipnótica (grau 3) é menos conhecida mas real. Ex-agente da Interpol e do Clube do Inferno (coagido). Fundou a Geração X com Emma Frost. Pai de Theresa Cassidy (Siryn).\n---"}'::jsonb,
  true,
  NOW()
);

-- Cannonball
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Cannonball',
  'Sam Guthrie',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":6,"corpo":7,"inteligência":6,"vontade":8,"mente":7,"influência":7,"aura":7,"espírito":8},"tags":[{"texto":"Propulsão Termoquímica","grau":4},{"texto":"Invulnerabilidade em Voo","grau":4},{"texto":"Liderança Natural e Leal","grau":3},{"texto":"Membro de Família Numerosa de Mutantes (Guthries)","grau":2},{"texto":"Sem controle da direção em alta velocidade","grau":2}],"descricao":"A propulsão grau 4 torna Sam um projétil físico devastador. A invulnerabilidade em voo grau 4 — enquanto se move, é praticamente imbatível. Mas a falta de controle de direção (-2) em velocidade máxima é vulnerabilidade tática real. Minerador do Kentucky que se tornou líder natural dos Novos Mutantes.\n---"}'::jsonb,
  true,
  NOW()
);

-- Sunspot
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Sunspot',
  'Roberto da Costa',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":8,"corpo":7,"inteligência":7,"vontade":7,"mente":7,"influência":9,"aura":8,"espírito":7},"tags":[{"texto":"Absorção e Canalização de Energia Solar","grau":4},{"texto":"Força Sobrehumana Quando Carregado","grau":4},{"texto":"Voo em Forma Solar","grau":3},{"texto":"Bilionário DaCosta","grau":4},{"texto":"Impulsivo","grau":2}],"descricao":"STR 8 sobrehumano quando carregado de energia solar. INF 9 — charme carismático de bilionário. A impulsividade (-2) é vulnerabilidade tática: corre para a briga sem plano. Usou a fortuna DaCosta para comprar a HYDRA e desmantelá-la por dentro — talvez sua façanha mais impressionante.\n---"}'::jsonb,
  true,
  NOW()
);

-- Mirage
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Mirage',
  'Dani Moonstar / Psyche',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":8,"vontade":9,"mente":9,"influência":7,"aura":9,"espírito":10},"tags":[{"texto":"Manifestação de Medos e Desejos Profundos","grau":4},{"texto":"Arco e Flecha","grau":3},{"texto":"Ex","grau":4},{"texto":"Ligação Empática com Animais","grau":3},{"texto":"Cheyenne","grau":3},{"texto":"Perda de Poderes (pós","grau":2}],"descricao":"VON 9, MEN 9, ESP 10 — refletem profundidade espiritual e força psíquica. A manifestação de medos grau 4 parece arma, mas também cria conexões emocionais intensas. A ex-Valquíria grau 4 — poderes reais concedidos por Hela, não mais disponíveis. A perda de poderes (-2) representa crise de identidade em curso.\n---"}'::jsonb,
  true,
  NOW()
);

-- Wolfsbane
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Wolfsbane',
  'Rahne Sinclair',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":9,"força":7,"corpo":7,"inteligência":5,"vontade":7,"mente":6,"influência":5,"aura":7,"espírito":8},"tags":[{"texto":"Transformação em Lobo ou Forma Lobisomem","grau":4},{"texto":"Sentidos Lupinos","grau":4},{"texto":"Instintos Predatórios em Forma Animal","grau":3},{"texto":"Ligação Empática com Mirage","grau":3},{"texto":"Fé Escocesa","grau":2},{"texto":"Controle reduzido em forma animal plena","grau":2}],"descricao":"DEX 9 e STR/BOD 7 — claramente sobrehumanos em forma lobisomem. A fé presbiteriana repressiva (-2) cria conflito constante com a mutação. O controle reduzido (-2) em forma de lobo plena é vulnerabilidade tática real. Criada por padre que via a mutação como maldição.\n---"}'::jsonb,
  true,
  NOW()
);

-- Karma
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Karma',
  'Xi''an Coy Manh',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":8,"vontade":8,"mente":10,"influência":7,"aura":8,"espírito":9},"tags":[{"texto":"Possessão Mental","grau":5},{"texto":"Pode Controlar Múltiplos Alvos Simultaneamente","grau":3},{"texto":"Refugiada Vietnamita","grau":3},{"texto":"Responsabilidade pelos Irmãos Menores","grau":3},{"texto":"Amputada (perna)","grau":1},{"texto":"Múltipla Possessão Drena a Consciência","grau":2}],"descricao":"MEN 10 reflete poder psiônico real. A possessão grau 5 — entra na consciência de outros e os controla como fantoches, pode controlar múltiplos (grau 3). A amputação (-1) é limitação física real. O dreno mental (-2) ao controlar múltiplos alvos representa o risco de se perder nas outras mentes.\n---"}'::jsonb,
  true,
  NOW()
);

-- Magma
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Magma',
  'Amara Aquilla',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":6,"corpo":6,"inteligência":7,"vontade":7,"mente":7,"influência":7,"aura":9,"espírito":8},"tags":[{"texto":"Controle de Magma e Lava","grau":4},{"texto":"Forma de Rocha Incandescente","grau":4},{"texto":"Terremotos Localizados","grau":3},{"texto":"Nobre Romana de Nova Roma","grau":3},{"texto":"Ingênua ao Mundo Moderno","grau":2}],"descricao":"AUR 9 reflete presença natural de nobre romana. A forma incandescente grau 4 protege e ataca simultaneamente. Os terremotos (grau 3) são precisos mas imprevisíveis. A ingenuidade cultural (-2) é vulnerabilidade real — cresceu em colônia romana oculta na América do Sul sem contato com o mundo moderno.\n---"}'::jsonb,
  true,
  NOW()
);

-- Cypher
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Cypher',
  'Doug Ramsey',
  'novatos',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":3,"inteligência":11,"vontade":7,"mente":10,"influência":7,"aura":7,"espírito":7},"tags":[{"texto":"Poliglota Universal","grau":6},{"texto":"Leitura de Intenção Corporal","grau":4},{"texto":"Melhor Amigo de Warlock","grau":3},{"texto":"Morreu em Batalha","grau":2},{"texto":"Sem Poderes de Combate Físico","grau":4}],"descricao":"INT 11 próxima ao teto. O poder de linguagem grau 6 é de categoria Ômega — entende e fala qualquer idioma instantaneamente, incluindo computadores e padrões alienígenas. A leitura de linguagem corporal grau 4 torna-o difícil de surpreender em combate. BOD 3 e a tag -4 refletem vulnerabilidade física total. Sua habilidade, em mãos certas, muda conflitos inteiros.\n---"}'::jsonb,
  true,
  NOW()
);

-- Boomer
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Boomer',
  'Tabitha Smith / Boom-Boom / Meltdown',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":6,"vontade":7,"mente":7,"influência":7,"aura":8,"espírito":7},"tags":[{"texto":"Bombas de Plasma com Timer Psiônico","grau":4},{"texto":"Bombas de Meltdown","grau":4},{"texto":"Atitude Rebelde","grau":2},{"texto":"Chamariz para Problemas","grau":2},{"texto":"Impulsiva","grau":2}],"descricao":"As bombas de plasma grau 4 explodem em qualquer tempo determinado mentalmente — tática versátil. As bombas de Meltdown (grau 4) são maiores mas menos controladas. As tags negativas (-2 cada) refletem o padrão de vida de Tabitha: fugiu de pai abusivo, nunca aprendeu a planejar. O humor mascara trauma sério.\n---"}'::jsonb,
  true,
  NOW()
);

-- Shatterstar
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Shatterstar',
  'Gaveedra-Seven',
  'geracaox',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":12,"força":8,"corpo":8,"inteligência":7,"vontade":8,"mente":7,"influência":5,"aura":7,"espírito":8},"tags":[{"texto":"Dupla Empunhadura de Espadas","grau":5},{"texto":"Velocidade e Reflexos Sobre","grau":5},{"texto":"Portais Dimensionais via Espadas","grau":4},{"texto":"Gladiador de Elite","grau":4},{"texto":"Sem Conceito de Emoção Humana","grau":2}],"descricao":"DEX 12 e STR/BOD 8 sobrehumanos — criado geneticamente para combate de arena. Iniciativa 11 reflete reflexos extraordinários. Os portais dimensionais (grau 4) com as espadas são poder subestimado. A tag -2 reflete que conceitos como amor, amizade e livre-arbítrio foram aprendidos tardiamente com Rictor e a X-Force.\n---"}'::jsonb,
  true,
  NOW()
);

-- Rictor
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Rictor',
  'Julio Richter',
  'geracaox',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":5,"corpo":6,"inteligência":6,"vontade":7,"mente":7,"influência":7,"aura":7,"espírito":7},"tags":[{"texto":"Controle Sísmico","grau":4},{"texto":"Vibrações Sísmicas Precisas","grau":3},{"texto":"Parceiro de Shatterstar","grau":3},{"texto":"Perda dos Poderes no M","grau":3},{"texto":"Passado Familiar Ligado a Tráfico de Armas","grau":1}],"descricao":"O controle sísmico grau 4 vai de tremores localizados a terremotos em escala real. A perda de poderes no M-Day (-3) foi devastadora — a identidade de Rictor estava completamente ligada à mutação. Recuperou os poderes depois, mas o trauma permanece. Mexicano com passado de família no tráfico de armas.\n---"}'::jsonb,
  true,
  NOW()
);

-- Siryn
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Siryn',
  'Theresa Cassidy',
  'geracaox',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":7,"vontade":8,"mente":8,"influência":7,"aura":8,"espírito":8},"tags":[{"texto":"Grito Sonar Destruidor","grau":4},{"texto":"Frequência Hipnótica","grau":3},{"texto":"Voo Sônico","grau":4},{"texto":"Alcoolismo","grau":2},{"texto":"Ligação com Deadpool","grau":1}],"descricao":"Herdou o grito sonar do pai Sean (Banshee) — grau 4, igual ao do pai. A frequência hipnótica (grau 3) pode compelir obediência temporária. O alcoolismo (-2) superado, mas a vulnerabilidade é real em momentos de crise. Trabalhou como detetive na X-Factor Investigations. Deadpool desenvolveu apego estranho por ela.\n---"}'::jsonb,
  true,
  NOW()
);

-- Madrox
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Madrox',
  'Jamie Madrox / O Homem Múltiplo',
  'geracaox',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":4,"corpo":5,"inteligência":8,"vontade":7,"mente":8,"influência":7,"aura":7,"espírito":7},"tags":[{"texto":"Criação de Duplicatas ao Impacto","grau":5},{"texto":"Absorção de Duplicatas com Memórias e Habilidades","grau":4},{"texto":"Detetive Particular","grau":3},{"texto":"Cada Duplicata Desenvolve Personalidade Própria","grau":3},{"texto":"Instabilidade de Identidade","grau":3}],"descricao":"A criação de duplicatas grau 5 é ilimitada — pode criar um exército de si mesmo. A absorção grau 4 é a metade mais poderosa: reintegra duplicatas ganhando suas memórias e habilidades aprendidas separadas. A instabilidade de identidade (-3) é profunda: depois de décadas criando duplicatas com personalidades distintas, Jamie não sabe mais quem é o \"original\".\n---"}'::jsonb,
  true,
  NOW()
);

-- Strong Guy
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Strong Guy',
  'Guido Carosella',
  'geracaox',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":6,"força":13,"corpo":14,"inteligência":5,"vontade":7,"mente":6,"influência":7,"aura":7,"espírito":7},"tags":[{"texto":"Absorção de Energia Cinética em Força Muscular","grau":5},{"texto":"Força e Resistência Colossais","grau":5},{"texto":"Humor Constante","grau":3},{"texto":"Problemas Cardíacos","grau":3},{"texto":"Aparência Hipertrofiada","grau":1}],"descricao":"STR 13 e BOD 14 — entre os mais fortes da Marvel. O absorção grau 5 significa que quanto mais o batem, mais forte ele fica — tática de esgotar antes de enfrentar. Os problemas cardíacos (-3) são a consequência real de décadas de absorção — pode morrer de ataque cardíaco em combate intenso. Ex-guarda de Lila Cheney.\n---"}'::jsonb,
  true,
  NOW()
);

-- Cecilia Reyes
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Cecilia Reyes',
  'Dra. Cecilia Reyes',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":11,"vontade":8,"mente":9,"influência":7,"aura":7,"espírito":8},"tags":[{"texto":"Campo de Força Biológico Instintivo","grau":4},{"texto":"Médica de Trauma e Cirurgiã de Elite","grau":5},{"texto":"O Campo Ativa em Cirurgias","grau":2},{"texto":"Rejeita Fortemente a Identidade de Heroína","grau":2}],"descricao":"INT 11 — médica de elite. O campo de força grau 4 ativa instintivamente — sem controle consciente. A tag -2 do campo em cirurgias explica porque nunca pôde ser cirurgiã comum: o campo interfere nas operações. A rejeição de heroísmo (-2) é real — Cecilia é médica primeiro, X-Man por necessidade. Inestimável como médica de campo.\n---"}'::jsonb,
  true,
  NOW()
);

-- Lockheed
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Lockheed',
  'Lockheed',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":9,"força":5,"corpo":6,"inteligência":8,"vontade":8,"mente":7,"influência":5,"aura":8,"espírito":8},"tags":[{"texto":"Fogo Violeta Anti","grau":4},{"texto":"Voo","grau":4},{"texto":"Inteligência Elevadíssima Deliberadamente Escondida","grau":4},{"texto":"Parceiro Leal de Kitty Pryde","grau":4},{"texto":"Ex","grau":3},{"texto":"Parece Animal de Estimação","grau":3}],"descricao":"INT 8 — não é instinto animal, é inteligência real que ele esconde. O fogo violeta grau 4 com propriedades anti-mágicas é raro e estrategicamente valioso. A tag de subestimação (grau 3) é vantagem tática: ninguém leva o dragão a sério até ser tarde. Trabalhou secretamente como agente da SWORD sem o conhecimento de Kitty.\n---"}'::jsonb,
  true,
  NOW()
);

-- Callisto
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Callisto',
  'Callisto',
  'morlock',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":11,"força":7,"corpo":8,"inteligência":7,"vontade":9,"mente":7,"influência":8,"aura":7,"espírito":9},"tags":[{"texto":"Sentidos Aguçados","grau":4},{"texto":"Combate Feral com Faca","grau":4},{"texto":"Liderança dos Morlocks","grau":4},{"texto":"Tentáculos Preênseis (pós","grau":3},{"texto":"Eye Patch","grau":1}],"descricao":"DEX 11 ligeiramente acima do pico humano — reflexos mutantes. O radar subterrâneo grau 4 é perfeito no ambiente das galerias. A liderança grau 4 baseada em respeito conquistado por força real. Derrotada por Tempestade em duelo singular — voltou mais forte e com mais respeito pelos X-Men.\n---"}'::jsonb,
  true,
  NOW()
);

-- Caliban
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Caliban',
  'Caliban',
  'morlock',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":10,"corpo":9,"inteligência":4,"vontade":6,"mente":4,"influência":4,"aura":7,"espírito":6},"tags":[{"texto":"Detector de Mutantes","grau":5},{"texto":"Força Colossal Aumentada por Apocalipse","grau":4},{"texto":"Mentalidade Ingênua","grau":3},{"texto":"Aparência Albina Grotesca","grau":2}],"descricao":"O detector de mutantes grau 5 é estrategicamente valioso — raio de km. STR 10 e BOD 9 sobrehumanos após modificação por Apocalipse. INT 4 e MEN 4 bem abaixo da média — Caliban é emocionalmente simples. A aparência (-2) garante que humanos e mutantes de superfície o rejeitam reflexivamente.\n---"}'::jsonb,
  true,
  NOW()
);

-- Marrow
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Marrow',
  'Sarah',
  'morlock',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":8,"força":6,"corpo":7,"inteligência":5,"vontade":8,"mente":6,"influência":4,"aura":6,"espírito":7},"tags":[{"texto":"Crescimento e Extração de Ossos como Armas","grau":4},{"texto":"Ossos como Projéteis","grau":3},{"texto":"Fator de Cura Moderado","grau":3},{"texto":"Dois Corações","grau":3},{"texto":"Raiva Crônica","grau":3},{"texto":"Impulsividade","grau":2}],"descricao":"Os ossos grau 4 crescem continuamente — podem ser extraídos e usados como facas, lanças, projéteis. O fator de cura grau 3 é moderado, não como Logan. Os dois corações (grau 3) garantem sobrevivência extra. A raiva crônica (-3) é o custo emocional do Massacre dos Morlocks — a dor constante e o genocídio a tornaram violenta.\n---"}'::jsonb,
  true,
  NOW()
);

-- Masque
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Masque',
  'Masque',
  'morlock',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":7,"vontade":8,"mente":7,"influência":6,"aura":7,"espírito":6},"tags":[{"texto":"Reshaping Biológico ao Toque","grau":5},{"texto":"Crueldade Sádica","grau":3},{"texto":"Líder Ocasional dos Morlocks","grau":3},{"texto":"Físicamente Fraco","grau":2}],"descricao":"O reshaping grau 5 é poder assustador: pode reformar rostos e corpos de qualquer pessoa ao toque. Usa isso com sadismo para desfigurar inimigos e manter Morlocks \"adequados\". STR 3 e BOD 4 — Masque é fisicamente fraco, depende de proteção do grupo. Moralmente um dos Morlocks mais desprezíveis.\n---"}'::jsonb,
  true,
  NOW()
);

-- Leech
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Leech',
  'Leech',
  'morlock',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":4,"força":2,"corpo":3,"inteligência":5,"vontade":6,"mente":7,"influência":5,"aura":8,"espírito":7},"tags":[{"texto":"Campo de Supressão de Mutantes","grau":6},{"texto":"Inocência Infantil","grau":3},{"texto":"Presença Cativante Apesar da Aparência","grau":3},{"texto":"Não Controla o Raio do Campo","grau":2},{"texto":"Criança Frágil","grau":3}],"descricao":"O campo de supressão grau 6 é de categoria Ômega estratégica — desativa Wolverine, cega Ciclope, silencia Xavier. STR 2 e BOD 3 — criança completamente frágil. A tag -2 de controle do raio é perigosa: afeta aliados também. AUR 8 reflete presença estranhamente cativante apesar da aparência incomum.\n---"}'::jsonb,
  true,
  NOW()
);

-- Magneto
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Magneto',
  'Erik Magnus Lehnsherr',
  'irmandade',
  'extremo',
  '{"iniciativa":0,"stats":{"destreza":5,"força":5,"corpo":6,"inteligência":12,"vontade":14,"mente":11,"influência":11,"aura":12,"espírito":11},"tags":[{"texto":"Magnetismo Ômega","grau":6},{"texto":"Campo de Força Magnético Pessoal","grau":5},{"texto":"Voo por Levitação Magnética","grau":4},{"texto":"Capacete Anti","grau":4},{"texto":"Gênio Científico","grau":4},{"texto":"Sobrevivente de Auschwitz","grau":4},{"texto":"Convicção Obsessiva","grau":2}],"descricao":"VON 14 e AUR 12 acima ou no teto humano — forjados no holocausto e em décadas de liderança. INT 12 no pico absoluto. O magnetismo grau 6 opera em escala planetária — pode controlar o campo eletromagnético da Terra. A convicção (-2) é o ponto cego: a ideologia pode nublar o julgamento em momentos críticos.\n---"}'::jsonb,
  true,
  NOW()
);

-- Mystique
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Mystique',
  'Raven Darkhölme',
  'irmandade',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":11,"força":6,"corpo":7,"inteligência":10,"vontade":10,"mente":9,"influência":11,"aura":10,"espírito":9},"tags":[{"texto":"Metamorfismo Perfeito","grau":5},{"texto":"Espiã Veterana","grau":5},{"texto":"Combate Corpo","grau":3},{"texto":"Imortalidade Lenta","grau":3},{"texto":"Pistola Escondida na Coxa","grau":2},{"texto":"Sem Lealdade Real Além de Si Mesma","grau":2}],"descricao":"DEX 11 e INF 11 ligeiramente acima do pico — séculos de treinamento e prática. O metamorfismo grau 5 é perfeito: impressões digitais, voz, peso. O sem lealdade (-2) é o maior risco ao usar Mystique como aliada. Mãe biológica de Kurt Wagner (Noturno) e mãe adotiva de Rogue. Traição é sua natureza.\n---"}'::jsonb,
  true,
  NOW()
);

-- Blob
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Blob',
  'Fred Dukes',
  'irmandade',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":3,"força":12,"corpo":16,"inteligência":3,"vontade":6,"mente":3,"influência":2,"aura":3,"espírito":5},"tags":[{"texto":"Campo de Força Inercial","grau":5},{"texto":"Pele Praticamente Invulnerável ao Dano Físico","grau":5},{"texto":"Força Colossal","grau":4},{"texto":"Nenhuma Sensibilidade à Dor Física","grau":3},{"texto":"Inteligência Limitada","grau":3}],"descricao":"BOD 16 é o mais alto da Irmandade. STR 12 colossal. INT 3 e MEN 3 bem abaixo da média humana — a tag -3 de inteligência é fraqueza tática real: inimigos inteligentes o envolvem com facilidade. O campo inercial grau 5 — nem Hulk o move quando ele não quer. Ex-artista de circo que se juntou à Irmandade por falta de opções.\n---"}'::jsonb,
  true,
  NOW()
);

-- Toad
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Toad',
  'Mortimer Toynbee',
  'irmandade',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":8,"força":5,"corpo":5,"inteligência":6,"vontade":5,"mente":5,"influência":3,"aura":4,"espírito":5},"tags":[{"texto":"Salto Sobrehumano","grau":4},{"texto":"Língua Preênsil Longa","grau":3},{"texto":"Secreção Pegajosa","grau":3},{"texto":"Autoestima Destruída","grau":3},{"texto":"Subserviência a Figuras de Autoridade","grau":2}],"descricao":"DEX 8 e STR/BOD 5 no pico humano para os físicos. O salto grau 4 é claramente sobrehumano. As tags negativas (-3 e -2) refletem décadas de abuso — de humanos e do próprio Magneto. Fisicamente capaz, psicologicamente quebrado. Perigoso apenas em grupo ou com contexto favorável.\n---"}'::jsonb,
  true,
  NOW()
);

-- Pyro
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Pyro',
  'St. John Allerdyce',
  'irmandade',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":7,"vontade":7,"mente":7,"influência":6,"aura":8,"espírito":7},"tags":[{"texto":"Controle de Fogo Existente","grau":5},{"texto":"Criação de Criaturas de Fogo Complexas","grau":4},{"texto":"Traje com Lança","grau":3},{"texto":"Escritor Frustrado","grau":2},{"texto":"Não Cria Fogo","grau":2},{"texto":"Esclerose Múltipla Terminal","grau":3}],"descricao":"O controle de fogo grau 5 mas não o cria (-2). AUR 8 reflete carisma criativo e humor sarcástico. A esclerose múltipla (-3) é progressiva e terminal — mina capacidade de combate. Australiano que entrou para a Irmandade por falta de opções. Morreu defendendo o senador Kelly — ato final de redenção.\n---"}'::jsonb,
  true,
  NOW()
);

-- Avalanche
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Avalanche',
  'Dominikos Petrakis',
  'irmandade',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":5,"corpo":6,"inteligência":5,"vontade":7,"mente":6,"influência":5,"aura":6,"espírito":6},"tags":[{"texto":"Geokinese","grau":4},{"texto":"Terremotos e Avalanches Localizados","grau":4},{"texto":"Mercenário Pragmático","grau":2},{"texto":"Sem Ideologia Forte","grau":2}],"descricao":"A geokinese grau 4 faz qualquer material inorgânico vibrar e desfazer — terremotos, colapsos de edifícios, avalanches. Grego de origem, sem convicção ideológica forte (-2): juntou-se à Irmandade pelo dinheiro. A tag de mercenário pragmático (grau 2) pode ser vantagem para quem quer negociar.\n---"}'::jsonb,
  true,
  NOW()
);

-- Unus
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Unus',
  'Angelo Unuscione',
  'irmandade',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":4,"força":6,"corpo":8,"inteligência":4,"vontade":5,"mente":4,"influência":4,"aura":5,"espírito":5},"tags":[{"texto":"Campo de Força Pessoal","grau":5},{"texto":"Força Aumentada Dentro do Campo","grau":4},{"texto":"Vulnerável a Ataques de Energia Pura","grau":2},{"texto":"Ex","grau":2}],"descricao":"O campo de força grau 5 torna Unus virtualmente invulnerável a dano físico. STR 6 e BOD 8 acima do pico humano — campo e fisicalidade combinados. A vulnerabilidade a ataques de energia (-2) é o ponto cego que os X-Men aprenderam a explorar. Ex-artista de circo recrutado por Magneto.\n---"}'::jsonb,
  true,
  NOW()
);

-- Lorelei
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Lorelei',
  'Lani Ubanu',
  'irmandade',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":4,"corpo":5,"inteligência":5,"vontade":6,"mente":7,"influência":10,"aura":9,"espírito":7},"tags":[{"texto":"Canto Hipnótico","grau":5},{"texto":"Imunidade a Ataques Baseados em Som","grau":3},{"texto":"Poder Afeta Somente Homens","grau":2}],"descricao":"INF 10 e AUR 9 — charme e presença amplificados pelo canto hipnótico grau 5. A limitação de gênero (-2) é vulnerabilidade tática significativa: equipes femininas ou mistas quebram o poder. Ex-membro da Irmandade que tenta vida normal — seu poder sempre atrai problemas.\n---"}'::jsonb,
  true,
  NOW()
);

-- Adepto (Magneto)
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Adepto (Magneto)',
  'Seguidor da Causa',
  'irmandade',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":4,"força":4,"corpo":5,"inteligência":5,"vontade":7,"mente":5,"influência":4,"aura":5,"espírito":6},"tags":[{"texto":"Poder Mutante de Baixo Nível","grau":2},{"texto":"Fanatismo Ideológico","grau":3},{"texto":"Disposto a Morrer pela Causa","grau":3},{"texto":"Treinamento Básico de Combate","grau":2},{"texto":"Sem Julgamento Individual","grau":2}],"descricao":"Humano acima da média em Vontade (7) — o fanatismo compensa a falta de poder. Os poderes mutantes são grau 2 — modestos, variados. As tags de fanatismo grau 3 representam disposição real para sacrifício. A tag -2 de julgamento cego é perigosa: executa ordens sem avaliar consequências.\n---"}'::jsonb,
  true,
  NOW()
);

-- Sabretooth
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Sabretooth',
  'Victor Creed',
  'vilao',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":9,"força":9,"corpo":10,"inteligência":6,"vontade":9,"mente":5,"influência":5,"aura":8,"espírito":7},"tags":[{"texto":"Fator de Cura Acelerado","grau":5},{"texto":"Garras e Presas","grau":4},{"texto":"Sentidos Aguçados","grau":5},{"texto":"Instinto de Matar Sem Inibições","grau":4},{"texto":"Rival de Logan","grau":3},{"texto":"Sem Código Moral","grau":1}],"descricao":"STR 9 e BOD 10 sobrehumanos — mesmo conjunto de Logan mas sem adamantium. O fator de cura grau 5 cura ferimentos graves em minutos. AUR 8 reflete presença de predador puro. Usado como mercenário pela CIA, HYDRA e qualquer um que pague. A ausência de código moral (-1) é característica, não fraqueza.\n---"}'::jsonb,
  true,
  NOW()
);

-- Lady Deathstrike
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Lady Deathstrike',
  'Yuriko Oyama',
  'vilao',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":10,"força":8,"corpo":9,"inteligência":7,"vontade":10,"mente":7,"influência":6,"aura":7,"espírito":9},"tags":[{"texto":"Garras de Adamantium","grau":5},{"texto":"Cyborg de Adamantium","grau":4},{"texto":"Fator de Cura Implantado","grau":4},{"texto":"Combate Corpo","grau":4},{"texto":"Código de Honra Samurai","grau":4},{"texto":"Obsessão com Wolverine","grau":2}],"descricao":"DEX 10 no pico absoluto humano — ninja de elite. STR 8 e BOD 9 sobrehumanos pelo revestimento de adamantium. VON 10 acima do pico — vontade de aço forjada por código samurai. As garras grau 5 rivalizam com Logan. A obsessão (-2) representa o ponto cego tático: pode ser manipulada através de Wolverine.\n---"}'::jsonb,
  true,
  NOW()
);

-- Mister Sinister
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Mister Sinister',
  'Nathaniel Essex',
  'vilao',
  'extremo',
  '{"iniciativa":0,"stats":{"destreza":6,"força":8,"corpo":8,"inteligência":15,"vontade":12,"mente":11,"influência":8,"aura":9,"espírito":10},"tags":[{"texto":"Gênio de Genética Mutante","grau":6},{"texto":"Clonagem e Manipulação Genética","grau":5},{"texto":"Imortalidade e Regeneração","grau":5},{"texto":"Poderes Psiônicos e Telepatia Limitada","grau":4},{"texto":"Obsessão com Linhagem Summers/Grey","grau":4},{"texto":"Obsessão Científica Cega à Ética","grau":3}],"descricao":"INT 15 — maior geneticista do planeta por margem enorme. VON 12 no limite humano. STR 8 e BOD 8 sobrehumanos por modificação de Apocalipse. O grau 6 em genética representa conhecimento que transcende séculos. A obsessão científica (-3) é o calcanhar de Aquiles: pode ser manipulado colocando descobertas científicas à frente de prudência.\n---"}'::jsonb,
  true,
  NOW()
);

-- Apocalipse
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Apocalipse',
  'En Sabah Nur',
  'vilao',
  'extremo',
  '{"iniciativa":0,"stats":{"destreza":6,"força":15,"corpo":15,"inteligência":12,"vontade":14,"mente":11,"influência":10,"aura":12,"espírito":13},"tags":[{"texto":"Manipulação Molecular do Próprio Corpo","grau":6},{"texto":"Tecnologia Celestial","grau":6},{"texto":"Imortalidade Real","grau":5},{"texto":"Os Quatro Cavaleiros","grau":5},{"texto":"Darwinismo Social Extremo","grau":4},{"texto":"Primeiro Mutante Registrado da Terra","grau":4},{"texto":"Subestima Oponentes por Arrogância Milenar","grau":1}],"descricao":"Atributos massivamente acima do pico humano — tecnologia Celestial de 5000 anos transcende qualquer categoria. STR 15 e BOD 15 colossal. VON 14 supera o pico humano. AUR 12 e ESP 13 refletem presença de ser quase divino. Os dois graus 6 refletem poder de categoria cósmica. O único defeito (-1) é a arrogância milenar que às vezes subestima oponentes.\n---"}'::jsonb,
  true,
  NOW()
);

-- Sentinela Mk I
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Sentinela Mk I',
  'Unidade de Caça',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":11,"corpo":12,"inteligência":4,"mente":3},"tags":[{"texto":"Detector de Mutação por DNA","grau":4},{"texto":"Foguetes de Alta Explosão","grau":4},{"texto":"Armadura Estrutural Reforçada","grau":5},{"texto":"Supressor de Poderes","grau":3},{"texto":"Sem Criatividade","grau":3},{"texto":"Robô","grau":2}],"descricao":"STR 11 e BOD 12 colossal. VON 0, AUR 0, INF 0 — literalmente nenhuma personalidade. INT 4 e MEN 3 — processamento básico. As tags negativas (-3 e -2) são fraquezas táticas reais: combatentes experientes aprendem os padrões e os exploram. Modelos mais antigos são mais previsíveis; Mk VI+ são ameaças existenciais.\n---"}'::jsonb,
  true,
  NOW()
);

-- Sentinela Mark I
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Sentinela Mark I',
  'Unidade Autônoma de Caça',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":12,"corpo":13,"inteligência":4,"mente":3},"tags":[{"texto":"Detector de Mutações DNA","grau":4},{"texto":"Foguetes e Projéteis Anti","grau":4},{"texto":"Armadura Estrutural Reforçada","grau":5},{"texto":"Supressores de Mutação","grau":3},{"texto":"Sem Criatividade","grau":3},{"texto":"Sem Emoção ou Adaptação","grau":2}],"descricao":"Versão melhorada com STR 12 e BOD 13. Mesmas fraquezas táticas: protocolos previsíveis. Robôs caça-mutante criados por Bolivar Trask. Perigosos em massa, vulneráveis a oponentes que entendem seus padrões.\n---"}'::jsonb,
  true,
  NOW()
);

-- Purificador
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Purificador',
  'Soldado da Ordem dos Purificadores',
  'vilao',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":4,"inteligência":3,"vontade":6,"mente":3,"influência":2,"aura":2,"espírito":5},"tags":[{"texto":"Fanatismo Religioso","grau":3},{"texto":"Arma de Fogo e Faca","grau":2},{"texto":"Treinamento Paramilitar Básico","grau":2},{"texto":"Coragem Irracional por Fé","grau":1},{"texto":"Sem Treinamento Contra Poderes Mutantes","grau":2}],"descricao":"Humano típico com DEX 4, STR 3, BOD 4 próximos da linha de base. VON 6 acima da média — o fanatismo compensa. ESP 5 levemente acima pelo fervor. Tags de baixo grau (2-3). A tag -2 de despreparo contra mutantes é a fraqueza fatal em qualquer confronto real.\n---"}'::jsonb,
  true,
  NOW()
);

-- Agente HYDRA
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Agente HYDRA',
  'Agente de Campo',
  'vilao',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":5,"força":4,"corpo":5,"inteligência":5,"vontade":6,"mente":5,"influência":4,"aura":4,"espírito":5},"tags":[{"texto":"Armamento Avançado (tecnologia roubada)","grau":3},{"texto":"Treinamento Paramilitar Sólido","grau":3},{"texto":"Tecnologia de Supressão de Mutantes","grau":3},{"texto":"Opera em Células Independentes","grau":2},{"texto":"Obediência Hierárquica","grau":1}],"descricao":"Atributos acima do humano médio mas abaixo do pico — treinamento sólido. Tags de grau médio (2-3). A obediência hierárquica (-1) limita adaptação. Perigosos em números. Frequentemente empregam equipamento anti-mutante quando a missão envolve alvos mutantes.\n---"}'::jsonb,
  true,
  NOW()
);

-- Mercenário Weapon X
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Mercenário Weapon X',
  'Operativo do Programa',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":6,"corpo":7,"inteligência":6,"vontade":7,"mente":5,"influência":4,"aura":4,"espírito":5},"tags":[{"texto":"Armamento Anti","grau":4},{"texto":"Treinamento de Combate de Elite","grau":4},{"texto":"Inibidores de Telepatia Portáteis","grau":3},{"texto":"Modificações Cibernéticas Menores","grau":2},{"texto":"Motivado por Pagamento","grau":2}],"descricao":"Atributos físicos acima do pico humano — modificações do programa. Os supressores de fator de cura (grau 4) são particularmente perigosos contra Wolverine e X-23. A falta de lealdade (-2) representa risco: pode ser comprado ou intimidado. Mercenários profissionais, não fanáticos.\n---"}'::jsonb,
  true,
  NOW()
);

-- Moira MacTaggert
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Moira MacTaggert',
  'Dra. Moira MacTaggert',
  'humano',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":3,"força":2,"corpo":3,"inteligência":13,"vontade":9,"mente":11,"influência":9,"aura":8,"espírito":9},"tags":[{"texto":"Geneticista Mutante Líder Mundial","grau":5},{"texto":"Parceira Científica e Ex","grau":4},{"texto":"Dirige a Ilha Muir","grau":3},{"texto":"Mutante Secreta","grau":5},{"texto":"Mãe de Proteus","grau":2}],"descricao":"INT 13 ligeiramente acima do pico — o poder mutante eleva a cognição. Geneticista mais importante aliada dos X-Men. A tag mutante secreta (grau 5) é revelação recente (Hickman) — poder de reencarnação que ela usou para reiniciar linhas temporais. A tragédia de Proteus (-2) é peso emocional constante.\n---"}'::jsonb,
  true,
  NOW()
);

-- Sage
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Sage',
  'Tessa',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":8,"força":5,"corpo":6,"inteligência":14,"vontade":10,"mente":12,"influência":7,"aura":8,"espírito":9},"tags":[{"texto":"Mente Computador Humano","grau":6},{"texto":"Memória Perfeita e Absoluta","grau":5},{"texto":"Pode Catalisar Mutações Latentes em Outros","grau":4},{"texto":"Agente Dupla Infiltrada por Décadas","grau":4},{"texto":"Combate de Elite","grau":3},{"texto":"Décadas de Isolamento Emocional como Agente","grau":2}],"descricao":"INT 14 e MEN 12 — a mente computador grau 6 é de categoria Ômega cognitiva. VON 10 acima do pico humano. DEX 8 no limite humano para combate de elite. Recrutada por Xavier antes dos X-Men existirem — passou décadas como agente dupla no Clube do Inferno. O isolamento (-2) é o custo de décadas vivendo como outra pessoa.\n---"}'::jsonb,
  true,
  NOW()
);

-- Chamber
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Chamber',
  'Jono Starsmore',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":4,"inteligência":7,"vontade":8,"mente":9,"influência":6,"aura":8,"espírito":8},"tags":[{"texto":"Plasma Psiônico Explodindo do Peito","grau":5},{"texto":"Comunicação Telepática","grau":3},{"texto":"Sem Boca ou Tórax","grau":4},{"texto":"Medo do Próprio Poder","grau":2}],"descricao":"O plasma psiônico grau 5 é devastador mas raramente usado pela tag -2 de medo. A tag -4 de ausência de boca e tórax é limitação física fundamental: não come, não respira convencionalmente, comunica-se só por telepatia. MEN 9 e ESP 8 refletem profundidade interior de alguém que vive inteiramente no mundo das ideias. Inglês melancólico com humor seco.\n---"}'::jsonb,
  true,
  NOW()
);

-- Husk
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Husk',
  'Paige Guthrie',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":6,"corpo":7,"inteligência":9,"vontade":8,"mente":8,"influência":7,"aura":7,"espírito":8},"tags":[{"texto":"Esfoliação em Qualquer Material","grau":4},{"texto":"Cada Forma tem Propriedades Específicas","grau":4},{"texto":"Ambição Excepcional","grau":3},{"texto":"Cada Forma tem Duração Limitada","grau":2}],"descricao":"A esfoliação grau 4 cobre uma gama enorme: metal (STR aumentada), gelo (resistência ao calor), gás (intangível). Cada forma tem propriedades específicas (grau 4). A duração limitada (-2) é a restrição central — ela precisa trocar de forma periodicamente. Irmã mais nova de Sam (Cannonball), igualmente determinada. Kentucky farm girl.\n---"}'::jsonb,
  true,
  NOW()
);

-- M (Monet St. Croix)
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'M (Monet St. Croix)',
  'M',
  'novatos',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":9,"força":9,"corpo":9,"inteligência":11,"vontade":9,"mente":10,"influência":9,"aura":10,"espírito":9},"tags":[{"texto":"Pacote de Perfeição Mutante","grau":5},{"texto":"Intelecto Prodigioso","grau":4},{"texto":"Arrogância Desarmante","grau":2},{"texto":"Segredos Ligados ao Irmão Emplate","grau":2}],"descricao":"Múltiplos atributos acima do pico humano (STR 9, BOD 9). O pacote de perfeição grau 5 inclui força, velocidade, voo, telepatia e invulnerabilidade simultâneos. A arrogância (-2) afasta aliados. Os segredos de Emplate (-2) são vulnerabilidade explorada por inimigos que conhecem sua família.\n---"}'::jsonb,
  true,
  NOW()
);

-- Armor
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Armor',
  'Hisako Ichiki',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":5,"corpo":5,"inteligência":7,"vontade":8,"mente":8,"influência":7,"aura":8,"espírito":8},"tags":[{"texto":"Exoesqueleto Psiônico Ancestral","grau":4},{"texto":"Resistência ao Dano Físico Dentro da Armadura","grau":4},{"texto":"Força Amplificada na Armadura","grau":3},{"texto":"Conectada aos Ancestrais","grau":3},{"texto":"Potencial Crescente","grau":3}],"descricao":"O exoesqueleto grau 4 cresce quanto mais ela precisa de proteção — feedback emocional. Dentro da armadura, resistência e força são amplificadas. A conexão ancestral (grau 3) é a fonte espiritual: os espíritos da família fornecem o poder. Estudante do Instituto que virou X-Man rapidamente sob o olho de Wolverine.\n---"}'::jsonb,
  true,
  NOW()
);

-- Surge
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Surge',
  'Noriko Ashida',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":9,"força":5,"corpo":5,"inteligência":6,"vontade":8,"mente":7,"influência":6,"aura":7,"espírito":7},"tags":[{"texto":"Absorção e Liberação de Eletricidade","grau":4},{"texto":"Velocidade em Rajadas Elétricas","grau":4},{"texto":"Líder dos Estudantes","grau":3},{"texto":"Luvas Especiais para Controle","grau":3}],"descricao":"DEX 9 próxima ao pico humano — velocidade explosiva. Iniciativa 10 reflete a velocidade. A absorção de eletricidade e velocidade grau 4 são combinadas. As luvas (-3) são vulnerabilidade crítica: sem elas o poder é incontrolável e afeta aliados. Fugiu do Japão sem controle; encontrou estabilidade no Instituto.\n---"}'::jsonb,
  true,
  NOW()
);

-- Elixir
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Elixir',
  'Josh Foley',
  'novatos',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":5,"força":4,"corpo":5,"inteligência":7,"vontade":7,"mente":9,"influência":6,"aura":9,"espírito":9},"tags":[{"texto":"Biomassa Dourada","grau":5},{"texto":"Biomassa Negra","grau":5},{"texto":"Potencial Nível Ômega não totalmente desbloqueado","grau":5},{"texto":"Trauma do Uso Destrutivo","grau":3},{"texto":"Pele Dourada quando Ativo","grau":1}],"descricao":"A dualidade dourado/negro (ambos grau 5) é devastadora: cura milagres ou mata por dentro. AUR 9 e ESP 9 refletem profundidade moral — ele sente o peso de cada uso destrutivo. A culpa (-3) é profunda: usou o poder negro para salvar alguém e nunca se perdoou. Ex-membro dos Revers (anti-mutante).\n---"}'::jsonb,
  true,
  NOW()
);

-- Hellion
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Hellion',
  'Julian Keller',
  'novatos',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":7,"força":5,"corpo":6,"inteligência":8,"vontade":9,"mente":10,"influência":8,"aura":9,"espírito":8},"tags":[{"texto":"Telecinesia de Alto Nível","grau":5},{"texto":"Próteses Controladas por Telecinese (perdeu as mãos)","grau":3},{"texto":"Arrogância de Elite","grau":3},{"texto":"Lealdade Profunda a Quem Chama de Amigo","grau":3},{"texto":"Potencial Ômega bloqueado por arrogância","grau":2}],"descricao":"MEN 10 e VON 9 refletem força mental. A telecinesia grau 5 é Ômega latente — raramente desbloqueado por arrogância (-2). Perdeu as mãos numa batalha e usa telecinese para controlar próteses (grau 3 — habilidade refinada da necessidade). Família rica da Califórnia, chegou ao Instituto convicto de sua superioridade.\n---"}'::jsonb,
  true,
  NOW()
);

-- Rockslide
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Rockslide',
  'Santo Vaccaro',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":13,"corpo":15,"inteligência":5,"vontade":7,"mente":6,"influência":6,"aura":6,"espírito":7},"tags":[{"texto":"Corpo de Rocha Silicosa","grau":5},{"texto":"Força Colossal","grau":5},{"texto":"Desmontagem e Remontagem Telecinética","grau":4},{"texto":"Cabeça como Projétil","grau":3},{"texto":"Sem Sistema Nervoso Convencional","grau":3},{"texto":"Personalidade Descontraída que Subestima o Risco","grau":2}],"descricao":"STR 13 e BOD 15 — entre os mais fortes dos estudantes. O corpo de rocha grau 5 é invulnerável a dano físico convencional. A desmontagem grau 4 — pode separar partes do corpo e recontrolá-las telecineticamente. A iniciativa baixa (5) reflete o peso da forma. Personalidade surpreendentemente leve e humorística.\n---"}'::jsonb,
  true,
  NOW()
);

-- Prodigy
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Prodigy',
  'David Alleyne',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":12,"vontade":9,"mente":11,"influência":7,"aura":8,"espírito":8},"tags":[{"texto":"Conhecimento de Centenas de Especialistas Retido Permanentemente","grau":5},{"texto":"Estrategista de Elite","grau":4},{"texto":"Artes Marciais e Combate de Vários Especialistas","grau":4},{"texto":"Parceiro de Surge","grau":3},{"texto":"Perdeu o Poder Mutante no M","grau":2}],"descricao":"INT 12 no teto e MEN 11 muito próxima — o conhecimento acumulado de centenas de especialistas. O poder original absorvia temporariamente; a Mente Coletiva reteve tudo permanentemente. As artes marciais grau 4 vêm de instrutores absorvidos. A perda do poder mutante (-2) representa crise de identidade: quem é ele sem a mutação?\n---"}'::jsonb,
  true,
  NOW()
);

-- Wallflower
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Wallflower',
  'Laurie Collins',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":4,"inteligência":7,"vontade":6,"mente":8,"influência":10,"aura":11,"espírito":8},"tags":[{"texto":"Feromonas Emocionais","grau":5},{"texto":"Induz Medo, Amor, Agressão ou Calma em Grupos","grau":4},{"texto":"Poder Difícil de Controlar","grau":3},{"texto":"Introversão Severa","grau":2},{"texto":"Filha de Persuasão (vilã)","grau":2}],"descricao":"INF 10 e AUR 11 — feromonas de nível Ômega. A dificuldade de controle (-3) é o problema central: o poder ativa passivamente e afeta todos ao redor, inclusive aliados. BOD 4 — fisicamente frágil. Foi assassinada por atirador dos Purificadores durante o conflito com Stryker. Amor com Bobby Drake (Ícone).\n---"}'::jsonb,
  true,
  NOW()
);

-- Scanner
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Scanner',
  'Sarah Ryall',
  'geracaox',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":7,"vontade":8,"mente":9,"influência":6,"aura":7,"espírito":8},"tags":[{"texto":"Visão de Raio","grau":4},{"texto":"Visão Térmica e Espectro Eletromagnético","grau":4},{"texto":"Ex","grau":3},{"texto":"Desconfiança de Autoridades","grau":1}],"descricao":"MEN 9 reflete percepção aguçada. Visão de raio-X grau 4 e espectro EM grau 4 — reconhecimento e localização excepcionais. A desconfiança de autoridades (-1) reflete trauma de experimentos governamentais. Trabalhou para o governo antes de se juntar ao X-Factor.\n---"}'::jsonb,
  true,
  NOW()
);

-- Wild Child
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Wild Child',
  'Kyle Gibney',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":9,"força":6,"corpo":7,"inteligência":4,"vontade":5,"mente":4,"influência":3,"aura":5,"espírito":5},"tags":[{"texto":"Fator de Cura Acelerado","grau":4},{"texto":"Garras e Dentes Afiados","grau":3},{"texto":"Sentidos Lupinos","grau":4},{"texto":"Instabilidade Mental Severa","grau":4},{"texto":"Ex","grau":2}],"descricao":"DEX 9 e BOD 7 sobrehumanos. O fator de cura grau 4 e os sentidos lupinos grau 4 — produto do Programa Arma X. A instabilidade mental (-4) é o elemento mais perigoso: pode perder o controle e atacar aliados. INT 4 e MEN 4 bem abaixo da média — a sanidade é frágil.\n---"}'::jsonb,
  true,
  NOW()
);

-- Aurora
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Aurora',
  'Jeanne-Marie Beaubier',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":10,"força":5,"corpo":6,"inteligência":7,"vontade":6,"mente":7,"influência":6,"aura":7,"espírito":7},"tags":[{"texto":"Voo Supersônico","grau":5},{"texto":"Luz Cegante quando em contato com Northstar","grau":4},{"texto":"Gêmea de Northstar","grau":3},{"texto":"Transtorno Dissociativo de Identidade","grau":4},{"texto":"Vontade Reduzida pelo TDI","grau":2}],"descricao":"DEX 10 no pico absoluto — velocidade supersônica. O TDI (-4) é a maior vulnerabilidade: alternância entre personalidades tímida e extrovertida, cada uma com objetivos distintos. VON 6 abaixo do normal humano — reflexo de como o TDI mina a força de vontade unificada. Irmã gêmea de Northstar.\n---"}'::jsonb,
  true,
  NOW()
);

-- Diamond Lil
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Diamond Lil',
  'Lillian Crawley',
  'neutro',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":4,"força":7,"corpo":8,"inteligência":5,"vontade":6,"mente":5,"influência":5,"aura":6,"espírito":6},"tags":[{"texto":"Pele de Diamante Orgânico","grau":5},{"texto":"Força e Resistência Aumentadas pelo Diamante","grau":4},{"texto":"Ex","grau":3},{"texto":"Diamante impede exames médicos normais","grau":1}],"descricao":"STR 7 e BOD 8 acima do pico humano — diamond skin aumenta fisicalidade. O diamante grau 5 é proteção massiva. A tag -1 de exames médicos representa limitação real: a pele de diamante impede cirurgias convencionais. Ex-mercenária que encontrou redenção na Alpha Flight. Ex-amante de Sasquatch.\n---"}'::jsonb,
  true,
  NOW()
);

-- Madison Jeffries
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Madison Jeffries',
  'Box',
  'neutro',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":4,"corpo":5,"inteligência":8,"vontade":7,"mente":8,"influência":5,"aura":6,"espírito":6},"tags":[{"texto":"Tecnopatia","grau":5},{"texto":"Constrói Robôs e Armaduras em Minutos","grau":4},{"texto":"Gênio em Engenharia","grau":4},{"texto":"Irmão de Lionel (cérebro numa jarra)","grau":1}],"descricao":"INT 8 e MEN 8 — gênio técnico. A tecnopatia grau 5 permite controlar qualquer máquina mentalmente — desmontando e remontando instantaneamente. A construção de armaduras grau 4 torna-o perigoso mesmo sem combate direto. Membro estável da Alpha Flight.\n---"}'::jsonb,
  true,
  NOW()
);

-- Persuasion
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Persuasion',
  'Kara Killgrave',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":4,"inteligência":6,"vontade":7,"mente":8,"influência":11,"aura":10,"espírito":7},"tags":[{"texto":"Controle Mental por Voz","grau":5},{"texto":"Filha do Purple Man","grau":3},{"texto":"Tenta se Redimir","grau":3},{"texto":"Telepatas são Imunes ao Poder","grau":2},{"texto":"Recaídas sob Estresse","grau":2}],"descricao":"INF 11 e AUR 10 — a voz como arma de controle absoluto grau 5. A imunidade de telepatas (-2) é fraqueza estratégica significativa. As recaídas (-2) refletem o peso da herança: em momentos de estresse usa o poder involuntariamente. Diferente do pai, tenta genuinamente usar o poder para o bem.\n---"}'::jsonb,
  true,
  NOW()
);

-- Tarot
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Tarot',
  'Marie-Ange Colbert',
  'clube-do-inferno',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":7,"vontade":8,"mente":9,"influência":7,"aura":8,"espírito":9},"tags":[{"texto":"Invocação de Arquétipos do Tarô","grau":5},{"texto":"Cada Carta tem Efeito Específico","grau":4},{"texto":"Precognição Limitada via Leitura de Cartas","grau":3},{"texto":"Treinada por Emma Frost","grau":3},{"texto":"Fisicamente Frágil","grau":2}],"descricao":"MEN 9 e ESP 9 refletem conexão psiônica com os arquétipos. A invocação grau 5 — as cartas manifestam efeitos reais. A precognição (grau 3) é limitada mas real. A fragilidade física (-2) — sem as cartas ela não combate. Ex-membro dos Hellions do Clube do Inferno, treinada por Emma Frost.\n---"}'::jsonb,
  true,
  NOW()
);

-- Catseye
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Catseye',
  'Sharon Smith',
  'clube-do-inferno',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":8,"força":4,"corpo":5,"inteligência":5,"vontade":5,"mente":5,"influência":5,"aura":6,"espírito":6},"tags":[{"texto":"Transformação em Felina Humanóide","grau":3},{"texto":"Garras, Agilidade e Visão Noturna","grau":3},{"texto":"Ingênua e Carente","grau":2}],"descricao":"DEX 8 no teto humano — reflexos felinos. A transformação grau 3 dá garras e agilidade, não força sobrehumana. A ingenuidade (-2) é a maior vulnerabilidade — Emma Frost a recrutou exatamente porque é facilmente influenciável. Busca aceitação acima de tudo.\n---"}'::jsonb,
  true,
  NOW()
);

-- Empath
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Empath',
  'Manuel Rodrigo',
  'clube-do-inferno',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":6,"vontade":6,"mente":7,"influência":11,"aura":10,"espírito":6},"tags":[{"texto":"Projeção Emocional","grau":5},{"texto":"Tortura Psicológica","grau":4},{"texto":"Narcisismo e Sadismo","grau":2},{"texto":"Perdeu os Poderes no M","grau":2}],"descricao":"INF 11 e AUR 10 — projeção emocional grau 5 injetando qualquer sentimento diretamente. O sadismo (-2) é ao mesmo tempo traço de personalidade e vulnerabilidade — toma decisões imprudentes para prolongar o sofrimento alheio. A perda de poderes (-2) destruiu sua identidade. Ex-líder dos Hellions do Clube do Inferno.\n---"}'::jsonb,
  true,
  NOW()
);

-- Jetstream
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Jetstream',
  'Haroun ibn Sallah',
  'clube-do-inferno',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":6,"força":4,"corpo":5,"inteligência":5,"vontade":5,"mente":5,"influência":5,"aura":6,"espírito":5},"tags":[{"texto":"Propulsão a Jato Biológica","grau":3},{"texto":"Rival de Cannonball","grau":2},{"texto":"Saudita","grau":2}],"descricao":"Atributos próximos ao pico humano. A propulsão a jato grau 3 é menos potente que a de Cannonball — Haroun voa mas não tem a invulnerabilidade em movimento de Sam. Ex-membro dos Hellions, morreu em combate. Saudita, treinamento distinto do padrão americano.\n---"}'::jsonb,
  true,
  NOW()
);

-- Beef
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Beef',
  'Winston',
  'clube-do-inferno',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":3,"força":10,"corpo":10,"inteligência":2,"vontade":3,"mente":2,"influência":2,"aura":3,"espírito":3},"tags":[{"texto":"Força e Resistência Colossais","grau":4},{"texto":"Inteligência Muito Limitada","grau":3},{"texto":"Lealdade Cega","grau":2}],"descricao":"STR 10 e BOD 10 acima do pico mas INT 2 e MEN 2 muito abaixo da média. A força grau 4 é impressionante para um membro menor dos Hellions. A inteligência (-3) é fraqueza fatal em qualquer confronto que exija adaptação. Capanga leal — executa ordens sem questionar.\n---"}'::jsonb,
  true,
  NOW()
);

-- Roulette
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Roulette',
  'Jennifer Stavros',
  'clube-do-inferno',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":3,"corpo":4,"inteligência":6,"vontade":6,"mente":7,"influência":7,"aura":7,"espírito":6},"tags":[{"texto":"Discos de Sorte/Azar","grau":4},{"texto":"Efeitos Imprevisíveis","grau":2},{"texto":"Jogadora Compulsiva","grau":2}],"descricao":"Os discos de sorte/azar grau 4 — ao tocar um alvo, causam efeitos aleatórios desde boa sorte até paralisia. A imprevisibilidade (-2) é a fraqueza inerente: o próprio poder é aleatório. A compulsão por risco (grau 2) reforça o estilo de vida. Ex-membro dos Hellions.\n---"}'::jsonb,
  true,
  NOW()
);

-- Timeshadow
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Timeshadow',
  'Harriet',
  'clube-do-inferno',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":5,"vontade":5,"mente":6,"influência":4,"aura":5,"espírito":5},"tags":[{"texto":"Ilusões Temporais de Si Mesma","grau":3},{"texto":"Pouco Treinada","grau":2}],"descricao":"A criação de ilusões temporais grau 3 — confunde inimigos com versões passadas e futuras de si mesma. Atributos próximos ao humano médio. Pouco treinada (-2) — nunca atingiu o potencial real. Desapareceu após o M-Day.\n---"}'::jsonb,
  true,
  NOW()
);

-- Bevatron
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Bevatron',
  'Bevatron',
  'clube-do-inferno',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":4,"força":5,"corpo":5,"inteligência":4,"vontade":4,"mente":4,"influência":3,"aura":4,"espírito":4},"tags":[{"texto":"Rajadas de Energia","grau":2},{"texto":"Personagem Menor","grau":1}],"descricao":"Atributos próximos ao humano médio. Rajadas de energia grau 2 — modestas. Membro menor dos Hellions, morreu em um dos primeiros confrontos. Pouco desenvolvimento antes da morte.\n---"}'::jsonb,
  true,
  NOW()
);

-- Shinobi Shaw
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Shinobi Shaw',
  'Shinobi Shaw',
  'clube-do-inferno',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":5,"corpo":6,"inteligência":7,"vontade":7,"mente":7,"influência":8,"aura":8,"espírito":7},"tags":[{"texto":"Intangibilidade","grau":4},{"texto":"Manipulador Político","grau":3},{"texto":"Tentou Assassinar o Próprio Pai","grau":3},{"texto":"Instabilidade","grau":2}],"descricao":"A intangibilidade grau 4 permite atravessar qualquer matéria. INF 8 e AUR 8 — manipulador político treinado desde criança no Clube do Inferno. A tentativa de parricídio (grau 3 como traço de personalidade) define sua ambição extrema. A instabilidade (-2) — tende a agir por impulso, o que corrói sua posição.\n---"}'::jsonb,
  true,
  NOW()
);

-- Trevor Fitzroy
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Trevor Fitzroy',
  'Trevor Fitzroy',
  'clube-do-inferno',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":6,"força":5,"corpo":6,"inteligência":7,"vontade":7,"mente":7,"influência":6,"aura":7,"espírito":7},"tags":[{"texto":"Portais Dimensionais","grau":5},{"texto":"Viagem Temporal","grau":4},{"texto":"Sadismo","grau":2},{"texto":"Dependência de Energia Vital para o Poder","grau":3}],"descricao":"Os portais grau 5 e viagem temporal grau 4 são poderosos — mas requerem energia vital de vítimas (-3 como restrição e fraqueza moral). O sadismo (-2) representa tanto traço de personalidade quanto vulnerabilidade: fica preso em situações onde matar prejudica mais do que ajuda. Responsável pelo massacre dos Hellions originais.\n---"}'::jsonb,
  true,
  NOW()
);

-- Frenzy
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Frenzy',
  'Joanna Cargill',
  'vilao',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":6,"força":11,"corpo":11,"inteligência":5,"vontade":8,"mente":6,"influência":6,"aura":7,"espírito":7},"tags":[{"texto":"Força Sobrehumana e Pele Super","grau":5},{"texto":"Resistência Extrema ao Dano","grau":4},{"texto":"Ex","grau":3},{"texto":"Eventual Aliada dos X","grau":2}],"descricao":"STR 11 e BOD 11 — força colossal e pele super-densa grau 5. VON 8 — determinação real. Serviu como acólita de Magneto e depois como membro da Aliança do Mal. A lealdade mutável (grau 2) representa o arco de Frenzy: eventualmente aliou-se aos X-Men. Uma das mais poderosas fisicamente da categoria.\n---"}'::jsonb,
  true,
  NOW()
);

-- Magma (Alliance of Evil)
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Magma (Alliance of Evil)',
  'Magma (Aliança)',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":7,"corpo":7,"inteligência":4,"vontade":5,"mente":4,"influência":4,"aura":6,"espírito":5},"tags":[{"texto":"Corpo de Magma Fundido","grau":4},{"texto":"Controle de Lava","grau":3},{"texto":"Morto por Apocalipse","grau":1}],"descricao":"STR 7 e BOD 7 ligeiramente acima do pico — corpo de magma dá resistência e força extras. O corpo de magma grau 4 é defesa e ataque simultaneamente. Vilão de segunda linha, membro da Aliança do Mal. Morreu quando Apocalipse eliminou a equipe.\n---"}'::jsonb,
  true,
  NOW()
);

-- Tower
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Tower',
  'Tower',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":3,"força":12,"corpo":12,"inteligência":3,"vontade":4,"mente":3,"influência":3,"aura":4,"espírito":4},"tags":[{"texto":"Crescimento até 15 Metros","grau":4},{"texto":"Força e Resistência Colossais em Tamanho Máximo","grau":4},{"texto":"Inteligência Limitada","grau":2}],"descricao":"Em tamanho máximo STR 12 e BOD 12 colossal. DEX 3 — lento demais para perseguir alvos ágeis. A inteligência limitada (-2) é fraqueza fundamental: uma criança com poderes de teletransporte pode frustrar Tower indefinidamente. Capanga de Apocalipse na Aliança do Mal.\n---"}'::jsonb,
  true,
  NOW()
);

-- Stinger
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Stinger',
  'Stinger',
  'vilao',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":7,"força":3,"corpo":4,"inteligência":4,"vontade":4,"mente":4,"influência":4,"aura":4,"espírito":4},"tags":[{"texto":"Projéteis Bioelétricos","grau":2},{"texto":"Personagem Menor","grau":1}],"descricao":"DEX 7 próxima ao teto humano. Os ferrões bioelétricos grau 2 são modestos. Vilã de segunda linha da Aliança do Mal. Morreu em combate — curto histórico.\n---"}'::jsonb,
  true,
  NOW()
);

-- Cargill
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Cargill',
  'Cargill',
  'vilao',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":4,"força":8,"corpo":8,"inteligência":3,"vontade":4,"mente":3,"influência":3,"aura":4,"espírito":4},"tags":[{"texto":"Força Sobrehumana","grau":3},{"texto":"Ex","grau":1}],"descricao":"STR 8 e BOD 8 acima do pico — força sobre-humana grau 3. INT 3 e MEN 3 abaixo da média. Capanga de força bruta da Aliança do Mal. Pouco se sabe sobre ele além da função.\n---"}'::jsonb,
  true,
  NOW()
);

-- Timeslip
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Timeslip',
  'Timeslip',
  'novatos',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":6,"vontade":6,"mente":8,"influência":5,"aura":6,"espírito":7},"tags":[{"texto":"Percepção Temporal Acelerada","grau":4},{"texto":"Precognição Limitada ao Imediato","grau":3},{"texto":"Personagem Menor","grau":2}],"descricao":"MEN 8 reflete percepção temporal aguçada. A percepção grau 4 dá vantagem tática real em combate — vê ações antes de ocorrerem. A precognição (grau 3) é limitada ao imediato. Membra de equipe alternativa de Novos Mutantes. Potencial maior do que foi explorado.\n---"}'::jsonb,
  true,
  NOW()
);

-- Impulse
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Impulse',
  'Impulse',
  'novatos',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":8,"força":3,"corpo":4,"inteligência":4,"vontade":4,"mente":4,"influência":4,"aura":4,"espírito":4},"tags":[{"texto":"Supervelocidade","grau":3},{"texto":"Personagem Menor","grau":1}],"descricao":"DEX 8 no limite humano. Supervelocidade grau 3 é útil mas não impressionante. Velocista mutante de baixo nível. Membro de equipe alternativa de Novos Mutantes com pouco desenvolvimento.\n---"}'::jsonb,
  true,
  NOW()
);

-- Agent Zero
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Agent Zero',
  'David North / Christoph Nord',
  'vilao',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":10,"força":5,"corpo":6,"inteligência":7,"vontade":8,"mente":7,"influência":6,"aura":6,"espírito":7},"tags":[{"texto":"Absorção e Liberação de Energia Cinética","grau":4},{"texto":"Traje de Supressão de Poderes","grau":3},{"texto":"Agente de Elite","grau":4},{"texto":"Caçador de Mutantes Profissional","grau":3}],"descricao":"DEX 10 no pico absoluto — combatente de elite. STR/BOD no pico humano. A absorção cinética grau 4 e o traje de supressão grau 3 fazem dele ameaça a mutantes. Agente profissional de elite sem motivação fanática — apenas trabalho. Alemão de origem.\n---"}'::jsonb,
  true,
  NOW()
);

-- Silver Fox
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Silver Fox',
  'Silver Fox',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":5,"vontade":6,"mente":5,"influência":5,"aura":5,"espírito":5},"tags":[{"texto":"Garras Retráteis","grau":2},{"texto":"Fator de Cura Limitado","grau":2},{"texto":"Ex","grau":3},{"texto":"Assassinada por Sabretooth","grau":1}],"descricao":"Atributos próximos ao pico humano. Garras e fator de cura grau 2 — versão limitada dos poderes de Logan. A ligação emocional com Wolverine (grau 3) é o aspecto mais estrategicamente relevante. Foi assassinada por Sabretooth. Status ressuscitado em alguns contextos.\n---"}'::jsonb,
  true,
  NOW()
);

-- Kestrel
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Kestrel',
  'John Wraith',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":8,"força":5,"corpo":6,"inteligência":6,"vontade":7,"mente":6,"influência":6,"aura":6,"espírito":6},"tags":[{"texto":"Teletransporte de Curta Distância","grau":3},{"texto":"Treinamento de Combate de Elite","grau":4},{"texto":"Código de Honra Próprio","grau":2}],"descricao":"DEX 8 e STR/BOD no pico humano — combatente de elite. O teletransporte grau 3 é de curta distância — tático, não estratégico. O treinamento grau 4 reflete décadas no Programa Arma X. O código de honra (grau 2) distingue Kestrel de simples mercenário. Africano-americano que trabalhou com Wolverine.\n---"}'::jsonb,
  true,
  NOW()
);

-- Bolt
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Bolt',
  'Christopher Bradley',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":5,"corpo":6,"inteligência":5,"vontade":6,"mente":5,"influência":5,"aura":6,"espírito":6},"tags":[{"texto":"Projeção de Rajadas Elétricas","grau":3},{"texto":"Ex","grau":3}],"descricao":"Atributos no pico humano. Rajadas elétricas grau 3 — poder funcional mas não impressionante. Ex-militar antes do Programa Arma X. Parceiro de Silver Fox. Perfil de agente competente sem poderes de destaque.\n---"}'::jsonb,
  true,
  NOW()
);

-- Omerta
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Omerta',
  'Paulie Provenzano',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":7,"corpo":8,"inteligência":4,"vontade":7,"mente":5,"influência":5,"aura":6,"espírito":6},"tags":[{"texto":"Pele de Metal Orgânico","grau":4},{"texto":"Força Aumentada na Forma Metálica","grau":4},{"texto":"Ex","grau":3},{"texto":"Perdeu os Poderes no M","grau":2}],"descricao":"STR 7 e BOD 8 acima do pico — metal orgânico. A pele metálica grau 4 e a força grau 4 fazem dele adversário sério. A origem mafiosa (grau 3) é tanto background quanto conjunto de contatos e instintos criminais. Perdeu os poderes no M-Day (-2). Ex-X-Man por período breve.\n---"}'::jsonb,
  true,
  NOW()
);

-- Wraith (Hector Rendoza)
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Wraith (Hector Rendoza)',
  'Hector Rendoza',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":4,"corpo":5,"inteligência":6,"vontade":6,"mente":7,"influência":5,"aura":6,"espírito":6},"tags":[{"texto":"Intangibilidade","grau":4},{"texto":"Adolescente Problemático","grau":2},{"texto":"Perdeu os Poderes no M","grau":2}],"descricao":"A intangibilidade grau 4 — atravessa qualquer matéria sólida. Atributos próximos ao pico humano. O perfil de adolescente problemático (grau 2) cria friccão constante. Perdeu os poderes no M-Day (-2). Ex-membro dos X-Men por curto período.\n---"}'::jsonb,
  true,
  NOW()
);

-- Stacy X
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Stacy X',
  'Stacy X',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":7,"força":4,"corpo":5,"inteligência":5,"vontade":6,"mente":6,"influência":8,"aura":9,"espírito":7},"tags":[{"texto":"Feromonas","grau":4},{"texto":"Camuflagem de Pele","grau":3},{"texto":"Presença Sexual Dominante","grau":3},{"texto":"Perdeu os Poderes no M","grau":2}],"descricao":"INF 8 e AUR 9 — feromonas com presença dominante. Os feromonas grau 4 ao toque e a camuflagem grau 3 fazem dela adversária versátil. A presença estratégica (grau 3) — usa a sexualidade como ferramenta tática deliberada. Perdeu os poderes no M-Day (-2). Ex-X-Man recrutada por Wolverine.\n---"}'::jsonb,
  true,
  NOW()
);

-- Lifeguard
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Lifeguard',
  'Heather Cameron',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":8,"força":5,"corpo":6,"inteligência":6,"vontade":7,"mente":7,"influência":6,"aura":7,"espírito":7},"tags":[{"texto":"Adaptação Reativa a Ameaças","grau":5},{"texto":"Poderes Mudam Conforme o Perigo","grau":4},{"texto":"Irmã de Slipstream","grau":2}],"descricao":"DEX 8 e STR/BOD no pico humano. A adaptação reativa grau 5 é poder único — seu corpo desenvolve automaticamente o poder necessário para a ameaça presente. Asas para voar, escamas para resistir, força para levantar. O aspecto \"sempre o certo\" (grau 4) torna-a difícil de surpreender taticamente. Ex-membro dos X-Treme X-Men.\n---"}'::jsonb,
  true,
  NOW()
);

-- Slipstream
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Slipstream',
  'Davis Cameron',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":4,"corpo":5,"inteligência":5,"vontade":6,"mente":6,"influência":5,"aura":6,"espírito":6},"tags":[{"texto":"Portais de Energia para Teletransporte","grau":4},{"texto":"Pode Transportar Grupos Através dos Portais","grau":3},{"texto":"Irmão de Lifeguard","grau":2}],"descricao":"O teletransporte por portais grau 4 é versátil e pode transportar grupos (grau 3) — valioso como extração e mobilidade tática. Atributos próximos ao pico humano. Irmão de Lifeguard (Heather Cameron). Ex-membro dos X-Treme X-Men. Surfista — estilo descontraído que contrasta com a seriedade dos X-Men.\n---"}'::jsonb,
  true,
  NOW()
);

-- Red Lotus
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Red Lotus',
  'Red Lotus',
  'x-men',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":10,"força":5,"corpo":6,"inteligência":6,"vontade":7,"mente":6,"influência":6,"aura":6,"espírito":6},"tags":[{"texto":"Artes Marciais de Elite","grau":5},{"texto":"Humano no Pico da Perfeição","grau":4},{"texto":"Ex","grau":3},{"texto":"Sem Poderes Mutantes","grau":2}],"descricao":"DEX 10 no pico absoluto humano e STR/BOD no limite — reflete treinamento de décadas. Iniciativa 9 de combatente de elite. As artes marciais grau 5 representam o máximo possível sem mutação. A ausência de poderes mutantes (-2) é vulnerabilidade real contra oponentes sobrehumanos. Ex-agente do governo chinês, aliado dos X-Men.\n---"}'::jsonb,
  true,
  NOW()
);

-- Fixer
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Fixer',
  'Fixer',
  'vilao',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":4,"inteligência":5,"vontade":4,"mente":4,"influência":3,"aura":3,"espírito":3},"tags":[{"texto":"Conserto Rápido de Máquinas","grau":2},{"texto":"Sem Poderes Mutantes","grau":2}],"descricao":"Humano sem poderes, próximo ao baseline (2-4 em tudo). Especialista em consertar máquinas rapidamente — grau 2, habilidade técnica mas não mutante. Não é combatente (-2). Função de suporte e manutenção.\n---"}'::jsonb,
  true,
  NOW()
);

-- Graydon Creed (FOH)
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Graydon Creed (FOH)',
  'Soldado da FOH',
  'vilao',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":4,"inteligência":3,"vontade":5,"mente":3,"influência":3,"aura":3,"espírito":3},"tags":[{"texto":"Humano Sem Poderes","grau":0},{"texto":"Armamento Leve","grau":2},{"texto":"Fanatismo Anti","grau":3},{"texto":"Sem Treinamento Formal Contra Mutantes","grau":2}],"descricao":"Humano típico próximo ao baseline. Soldado da FOH (Friends of Humanity) — fanático sem poderes. O fanatismo grau 3 representa coragem irracional e disposição para morrer. A falta de treinamento específico (-2) é vulnerabilidade fatal contra qualquer mutante de combate.\n---"}'::jsonb,
  true,
  NOW()
);

-- Graydon Creed
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Graydon Creed',
  'Graydon Creed',
  'vilao',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":4,"inteligência":5,"vontade":6,"mente":5,"influência":6,"aura":5,"espírito":5},"tags":[{"texto":"Filho de Mystique e Sabretooth","grau":3},{"texto":"Líder dos Amigos da Humanidade","grau":4},{"texto":"Orador e Manipulador Político","grau":3},{"texto":"Humano Sem Poderes","grau":1}],"descricao":"Atributos acima do baseline em INF e VON — político habilidoso. Filho de dois mutantes que se tornou o maior anti-mutante. O papel de líder político (grau 4) representa perigo real — não de combate, mas de política pública. O ódio pelos pais motiva toda a ideologia. Assassinado após ascensão política.\n---"}'::jsonb,
  true,
  NOW()
);

-- Cameron Hodge
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Cameron Hodge',
  'Cameron Hodge',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":7,"corpo":7,"inteligência":7,"vontade":8,"mente":7,"influência":6,"aura":5,"espírito":5},"tags":[{"texto":"Cyborg","grau":4},{"texto":"Imortalidade Pela Preservação da Cabeça","grau":4},{"texto":"Líder da Falange","grau":3},{"texto":"Anti","grau":4},{"texto":"Ex","grau":3}],"descricao":"STR 7 e BOD 7 — corpo robótico. A imortalidade grau 4 — a cabeça preservada é virtualmente indestrutível. O ódio anti-mutante (grau 4) é mais intenso que qualquer humano normal — transcende o corpo e a razão. A traição de Warren Worthington (grau 3 de background) define toda a persona.\n---"}'::jsonb,
  true,
  NOW()
);

-- Donald Pierce
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Donald Pierce',
  'Donald Pierce',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":8,"corpo":8,"inteligência":7,"vontade":7,"mente":6,"influência":7,"aura":6,"espírito":6},"tags":[{"texto":"Corpo Robótico de Alta Tecnologia","grau":4},{"texto":"Líder dos Reavers","grau":3},{"texto":"Engenheiro de Elite","grau":4},{"texto":"Anti","grau":1}],"descricao":"STR 8 e BOD 8 — corpo robótico de combate. O corpo robótico grau 4 e o papel de engenheiro grau 4 fazem dele ameaça dupla: combate e criação de outros caçadores. O paradoxo (-1) — cyborg que odeia mutantes, sendo ele mesmo uma aberração tecnológica equivalente. Ex-membro do Clube do Inferno.\n---"}'::jsonb,
  true,
  NOW()
);

-- Lady Mastermind
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Lady Mastermind',
  'Regan Wyngarde',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":7,"vontade":7,"mente":9,"influência":9,"aura":8,"espírito":7},"tags":[{"texto":"Ilusões Realistas Indistinguíveis da Realidade","grau":5},{"texto":"Filha de Jason Wyngarde","grau":3},{"texto":"Manipuladora Narcisista","grau":3},{"texto":"Vingança como Motivação Principal","grau":2}],"descricao":"MEN 9 e INF 9 — ilusões grau 5 indistinguíveis da realidade. Narcisismo e vingança (-2 de previsibilidade) — pode ser manipulada provocando sua vaidade ou seu ódio pelos X-Men. Ex-membro da Irmandade. Busca vingança pela morte do pai Mastermind.\n---"}'::jsonb,
  true,
  NOW()
);

-- Mesmero
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Mesmero',
  'Mesmero',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":7,"vontade":7,"mente":9,"influência":10,"aura":8,"espírito":7},"tags":[{"texto":"Hipnose em Massa","grau":4},{"texto":"Ilusões Auxiliares","grau":3},{"texto":"Manipulação de Multidões","grau":4},{"texto":"Físicamente Fraco","grau":2}],"descricao":"MEN 9 e INF 10 — hipnose grau 4 em massa é poder político de escala real. As ilusões auxiliares (grau 3) reforçam o efeito. A fragilidade física (-2) — se a hipnose falhar ou for quebrada, é vulnerável. Um dos primeiros vilões dos X-Men, frequentemente subestimado por ser hipnotizador \"básico\".\n---"}'::jsonb,
  true,
  NOW()
);

-- Vanisher
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Vanisher',
  'Vanisher',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":3,"corpo":4,"inteligência":5,"vontade":5,"mente":5,"influência":4,"aura":5,"espírito":5},"tags":[{"texto":"Teletransporte Planetário Instantâneo","grau":5},{"texto":"Ladrão de Elite","grau":3},{"texto":"Covarde Absoluto","grau":3},{"texto":"Aliado Eventual dos X","grau":2}],"descricao":"O teletransporte grau 5 — qualquer lugar do planeta instantaneamente — é de categoria excepcional. Mas a covardia (-3) neutraliza metade do potencial: Vanisher sempre usa o poder para fugir, nunca para atacar. A covardia como motivação principal o torna previsível e negociável. Ladrão de elite, foi membro da Irmandade.\n---"}'::jsonb,
  true,
  NOW()
);

-- Sauron
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Sauron',
  'Karl Lykos',
  'vilao',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":7,"força":9,"corpo":8,"inteligência":6,"vontade":6,"mente":6,"influência":5,"aura":7,"espírito":6},"tags":[{"texto":"Transformação em Pterossauro Humanóide","grau":4},{"texto":"Drenagem de Energia Vital","grau":4},{"texto":"Voo","grau":4},{"texto":"Necessita Drenar Energia para se Manter na Forma","grau":3},{"texto":"Karl Lykos (médico) tenta resistir à forma","grau":2}],"descricao":"STR 9 e BOD 8 sobrehumanos em forma de Sauron. A drenagem de energia vital grau 4 é devastadora e alimenta a transformação. A dependência de drenagem (-3) é o problema central: precisa drenar constantemente. O conflito interno de Karl Lykos (-2) — o médico resiste à forma monstruosa, criando hesitação em momentos críticos.\n---"}'::jsonb,
  true,
  NOW()
);

-- Vertigo
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Vertigo',
  'Vertigo',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":5,"vontade":5,"mente":6,"influência":7,"aura":7,"espírito":6},"tags":[{"texto":"Indução de Vertigem e Desorientação Severa","grau":4},{"texto":"Poder Funciona em Área","grau":3},{"texto":"Fisicamente Frágil","grau":2}],"descricao":"INF 7 e AUR 7 — a vertigem se manifesta como presença quase magnética. A indução grau 4 é debilitante — torna oponentes incapazes de lutar. O efeito em área (grau 3) multiplica a eficácia. A fragilidade física (-2) — se alguém atravessar a névoa de desorientação e alcançá-la fisicamente, ela cai. Membra dos Marotos e da Irmandade.\n---"}'::jsonb,
  true,
  NOW()
);

-- Scalphunter
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Scalphunter',
  'John Greycrow',
  'vilao',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":8,"força":5,"corpo":6,"inteligência":6,"vontade":7,"mente":6,"influência":5,"aura":5,"espírito":5},"tags":[{"texto":"Atirador de Elite","grau":5},{"texto":"Líder dos Marotos","grau":3},{"texto":"Poder Mutante","grau":4},{"texto":"Implacável","grau":3},{"texto":"Cicatrizes Faciais","grau":2}],"descricao":"DEX 8 e STR/BOD no pico humano. O atirador grau 5 é o centro — entre os melhores do planeta. O poder mutante grau 4 de criar e modificar armas é complementar: nunca fica sem munição ou arma. Líder dos Marotos, esquadrão de assassinos de Mister Sinister. Participou do Massacre dos Morlocks.\n---"}'::jsonb,
  true,
  NOW()
);

-- Arclight
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Arclight',
  'Arclight',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":8,"corpo":7,"inteligência":4,"vontade":5,"mente":4,"influência":4,"aura":5,"espírito":5},"tags":[{"texto":"Ondas de Choque Sísmicas","grau":4},{"texto":"Força Aumentada pela Mutação","grau":4},{"texto":"Sádica","grau":2}],"descricao":"STR 8 e BOD 7 acima do pico — força aumentada pela mutação. As ondas de choque grau 4 causam terremotos localizados com cada golpe. O sadismo (-2) é tanto traço de personalidade quanto vulnerabilidade: prolonga combates quando poderia encerrar, dando oportunidade ao oponente. Membro dos Marotos, participou do Massacre dos Morlocks.\n---"}'::jsonb,
  true,
  NOW()
);

-- Blockbuster
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Blockbuster',
  'Blockbuster',
  'vilao',
  'alto',
  '{"iniciativa":0,"stats":{"destreza":3,"força":12,"corpo":13,"inteligência":2,"vontade":4,"mente":2,"influência":2,"aura":3,"espírito":3},"tags":[{"texto":"Força e Resistência Colossais","grau":5},{"texto":"Inteligência Muito Limitada","grau":4},{"texto":"Capanga Leal de Sinister","grau":2}],"descricao":"STR 12 e BOD 13 colossal. INT 2 e MEN 2 muito abaixo da média — a inteligência (-4) é fraqueza fatal. Qualquer oponente com mobilidade e estratégia básica frustra Blockbuster indefinidamente. Inicia combates diretos que nunca deveria. Serviu como capanga nos Marotos de Mister Sinister.\n---"}'::jsonb,
  true,
  NOW()
);

-- Prism
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Prism',
  'Prism',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":4,"força":5,"corpo":7,"inteligência":3,"vontade":4,"mente":3,"influência":3,"aura":4,"espírito":4},"tags":[{"texto":"Corpo de Cristal","grau":4},{"texto":"Vulnerável a Impacto Físico","grau":3}],"descricao":"BOD 7 acima do pico — corpo de cristal oferece resistência. O reflexo de energia grau 4 — lasers e ataques energéticos ricocheteiam. Mas a vulnerabilidade a impacto físico (-3) é enorme: golpes físicos o quebram em fragmentos. Estratégia simples: bater nele com socos, não com raios. Ex-membro dos Marotos.\n---"}'::jsonb,
  true,
  NOW()
);

-- Riptide
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Riptide',
  'Riptide',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":8,"força":4,"corpo":5,"inteligência":4,"vontade":4,"mente":4,"influência":3,"aura":4,"espírito":4},"tags":[{"texto":"Rotação Supersônica","grau":4},{"texto":"Velocidade de Rotação Debilita Oponentes em Área","grau":3},{"texto":"Assassino Implacável","grau":3},{"texto":"Tontura após Rotação Prolongada","grau":1}],"descricao":"DEX 8 próxima ao pico humano. A rotação supersônica grau 4 gera projéteis e desorientação em área. O papel de assassino implacável (grau 3) — não hesita, não negocia. A tontura após rotação prolongada (-1) é vulnerabilidade menor mas explorada por oponentes pacientes. Participou do Massacre dos Morlocks.\n---"}'::jsonb,
  true,
  NOW()
);

-- Harpoon
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Harpoon',
  'Harpoon',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":6,"força":6,"corpo":6,"inteligência":4,"vontade":5,"mente":4,"influência":4,"aura":4,"espírito":4},"tags":[{"texto":"Arpões Energéticos","grau":5},{"texto":"Poder de Penetrar Qualquer Defesa","grau":4},{"texto":"Assassino Calculista","grau":3}],"descricao":"Atributos no pico humano para combate físico. Os arpões energéticos grau 5 são excepcionalmente perigosos: ignoram invulnerabilidade física — podem ferir Colossus em forma de aço. A penetração de defesa grau 4 confirma o alcance. Participou do Massacre dos Morlocks, matando dezenas de Morlocks com defesas físicas.\n---"}'::jsonb,
  true,
  NOW()
);

-- Scrambler
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Scrambler',
  'Scrambler',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":4,"inteligência":4,"vontade":4,"mente":5,"influência":4,"aura":4,"espírito":4},"tags":[{"texto":"Interferência em Sistemas Elétricos e Biológicos","grau":4},{"texto":"Desativa Poderes Mutantes ao Toque","grau":4},{"texto":"Fisicamente Fraco","grau":2}],"descricao":"Atributos próximos ao baseline. A interferência grau 4 é estrategicamente valioso: desativa eletrônicos e também poderes mutantes ao toque. O problema (-2) é que precisa alcançar o alvo fisicamente — BOD 4 com DEX 4 significa que qualquer oponente móvel pode evitá-lo. Membro dos Marotos.\n---"}'::jsonb,
  true,
  NOW()
);

-- Agente S.H.I.E.L.D.
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Agente S.H.I.E.L.D.',
  'Operativo de Campo',
  'humano',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":6,"força":4,"corpo":5,"inteligência":5,"vontade":6,"mente":5,"influência":4,"aura":4,"espírito":5},"tags":[{"texto":"Treinamento Tático de Elite","grau":3},{"texto":"Armamento de Alta Tecnologia S.H.I.E.L.D.","grau":3},{"texto":"Lealdade à Organização","grau":3},{"texto":"Sem Poderes Mutantes","grau":2}],"descricao":"Atributos acima da média humana mas abaixo do pico — treinamento de elite. DEX 6 e VON 6. Tags de grau médio (3). A falta de poderes mutantes (-2) é vulnerabilidade real contra X-Men ou vilões de escala similar. Aliados ou inimigos dependendo da missão e da política vigente.\n---"}'::jsonb,
  true,
  NOW()
);

-- Val Cooper
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Val Cooper',
  'Valentine Cooper',
  'humano',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":5,"força":3,"corpo":4,"inteligência":8,"vontade":9,"mente":8,"influência":8,"aura":7,"espírito":8},"tags":[{"texto":"Especialista em Relações com Mutantes","grau":4},{"texto":"Inteligência Política Excepcional","grau":4},{"texto":"Força de Vontade Acima da Média","grau":3},{"texto":"Sem Poderes","grau":1}],"descricao":"INT 8, VON 9, MEN 8, INF 8 — todos acima do humano médio, refletindo talento político real. A especialização em mutantes (grau 4) e a inteligência política (grau 4) fazem dela aliada ou inimiga influente sem poderes físicos. A dependência de posição política (-1) significa que sem o cargo ela perde muito leverage.\n---"}'::jsonb,
  true,
  NOW()
);

-- Henry Gyrich
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Henry Gyrich',
  'Henry Peter Gyrich',
  'humano',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":3,"força":3,"corpo":4,"inteligência":7,"vontade":8,"mente":7,"influência":7,"aura":6,"espírito":6},"tags":[{"texto":"Funcionário Governamental de Alto Escalão","grau":4},{"texto":"Burocracia como Arma","grau":4},{"texto":"Anti","grau":3},{"texto":"Sem Poderes","grau":2}],"descricao":"INT 7 e VON 8 — testa o limite superior do humano comum. A burocracia como arma grau 4 — pode criar legislação anti-mutante e restringir operações dos X-Men com uma canetada. Anti-mutante pragmático (grau 3): não quer exterminar, quer controlar. Sem poderes (-2) — completamente irrelevante em combate físico. Parceiro histórico de Bolivar Trask.\n---"}'::jsonb,
  true,
  NOW()
);

-- Bolivar Trask
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Bolivar Trask',
  'Bolivar Trask',
  'humano',
  'baixo',
  '{"iniciativa":0,"stats":{"destreza":3,"força":3,"corpo":4,"inteligência":9,"vontade":7,"mente":8,"influência":6,"aura":5,"espírito":5},"tags":[{"texto":"Gênio em Robótica e Bioengenharia","grau":5},{"texto":"Criador das Sentinelas","grau":4},{"texto":"Arrependido no Final da Vida","grau":3},{"texto":"Filho Mutante","grau":2}],"descricao":"INT 9 próxima ao pico humano — gênio real em robótica. A criação das Sentinelas (grau -4) é o maior fardo: criou algo que saiu do controle e continua causando dano. O arrependimento (grau 3) é genuíno — morreu tentando parar suas próprias criações. A culpa do filho mutante (-2) alimentou décadas de trabalho anti-mutante.\n---"}'::jsonb,
  true,
  NOW()
);

-- Larry Trask
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Larry Trask',
  'Larry Trask',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":4,"força":3,"corpo":4,"inteligência":8,"vontade":7,"mente":7,"influência":6,"aura":5,"espírito":5},"tags":[{"texto":"Precognição","grau":4},{"texto":"Herdeiro do Programa Sentinel","grau":3},{"texto":"Paranoia Alimentada por Visões","grau":3}],"descricao":"INT 8 próxima ao pico humano. A precognição grau 4 é poder mutante real — mas a paranoia alimentada pelas visões (-3) distorce o julgamento. Vê o futuro mas interpreta tudo através da lente do ódio. Filho de Bolivar, continuou o programa Sentinel. A ironia — mutante que caça mutantes.\n---"}'::jsonb,
  true,
  NOW()
);

-- Steven Lang
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Steven Lang',
  'Steven Lang',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":5,"corpo":5,"inteligência":7,"vontade":7,"mente":6,"influência":6,"aura":5,"espírito":5},"tags":[{"texto":"Coronel do Exército","grau":3},{"texto":"Líder do Projeto Fênix","grau":3},{"texto":"Mente Transferida para Corpo Sentinel","grau":4},{"texto":"Obsessão com Jean Grey","grau":2}],"descricao":"Atributos no teto humano. A transferência de mente para corpo Sentinel (grau 4) torna-o ameaça física inesperada. A obsessão com Jean Grey (-2) é vulnerabilidade tátic — pode ser manipulado através dela. Coronel americano que liderou o Projeto Fênix para capturar Jean.\n---"}'::jsonb,
  true,
  NOW()
);

-- Reverend William Stryker
INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (
  gen_random_uuid(),
  'Reverend William Stryker',
  'William Stryker',
  'vilao',
  'medio',
  '{"iniciativa":0,"stats":{"destreza":5,"força":4,"corpo":5,"inteligência":7,"vontade":9,"mente":7,"influência":9,"aura":6,"espírito":8},"tags":[{"texto":"Orador Carismático","grau":5},{"texto":"Líder dos Purificadores","grau":4},{"texto":"Filho Mutante que Matou Esposa","grau":4},{"texto":"Sem Poderes","grau":1}],"descricao":"VON 9, INF 9, ESP 8 — todos acima do limite humano em aspectos relacionados à fé e liderança. O orador carismático grau 5 é poder real — converte multidões ao anti-mutantismo. O filho mutante (grau 4 de background) é a origem do ódio: matou o próprio filho e a esposa morreu no trauma. Perigoso através dos outros (-1) — sem seguidores, é apenas um padre.\n---"}'::jsonb,
  true,
  NOW()
);

