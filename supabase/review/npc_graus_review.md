# Revisão — graus das tags de poder dos NPCs

Gerado por `node scripts/gen-npc-graus.js build`. Rubrica: `supabase/review/npc_graus_rubric.md`.

## Resumo

- NPCs: 204 · tags de poder: 2808 · com grau: 1785 · null: 1023
- Graus antigos removidos (tags graduadas null que tinham grau 1–6 no estado seed+002..009): 212
- Confiança: alta 958 · media 1162 · baixa 688

| Faixa de grau | Tags |
|---|---:|
| 1–6 humano | 356 |
| 7–15 rua | 840 |
| 16–30 Ômega | 515 |
| 31+ cósmico | 74 |

| Perigo | NPCs | Grau máx. (NPC — tag) | Mediana |
|---|---:|---|---:|
| extremo | 29 | 96 (Jean Grey (Dark Phoenix) — Consome Estrelas/Sistemas Solares) | 20 |
| alto | 41 | 25 (Emma Frost (Base - Rainha Branca) — Escudos Psíquicos Intransponíveis (Bloqueia Xavier/Jean)) | 12 |
| medio | 111 | 23 (Cable (Suprimido) — Dispositivo Teletransporte Temporal) | 8 |
| baixo | 23 | 18 (Cypher — Compreende qualquer idioma falado, escrito ou codificado) | 6 |

## Entradas com grau > 30 (devem ser só variantes/seres cósmicos) (8)

| NPC | Perigo | Grau máx. | Tags > 30 |
|---|---|---:|---:|
| Jean Grey (Dark Phoenix) | extremo | 96 | 16 |
| Jean Grey (White Phoenix of the Crown) | extremo | 95 | 9 |
| Rachel Summers (Fênix Force - Avatar Completo) | extremo | 78 | 9 |
| Cosmo (Cão Espacial) | extremo | 68 | 4 |
| Emma Frost (Phoenix Five / Anfitriã Fênix) | extremo | 68 | 9 |
| Onslaught | extremo | 60 | 13 |
| Professor X (Onslaught) | extremo | 60 | 8 |
| Apocalipse (Com Tecnologia Celestial Completa) | extremo | 53 | 6 |

## Confiança baixa (688), por NPC

**Apocalipse** (extremo, 7)

- Tecnologia Celestial — **22** · outro · nave/tecnologia Celestial: além da ciência terrestre em escala de porta-aviões (~100 kt) → 22
- Absorve Energia de Ataques Para Regenerar — **16** · outro · pareado a rajadas de mutantes de rua/Ômega baixo (~13–18) → 16
- Teletransporte Interestelar — **23** (pico 51) · distancia · entrada base: rotina na Terra via nave = qualquer ponto do globo 23; literal interestelar (51) em peak
- Acesso a Conhecimento Cósmico — **22** · informacao · conhecimento Celestial acumulado; muito além da ciência terrestre (faixa Ômega alta) → 22
- Apocalipse os Empodera — **16** · outro · concede/amplifica poderes (Arcanjo, etc.) a nível Ômega baixo (16) → 16
- Cavaleiros Recebem Armamento e Poderes Amplificados — **16** · outro · mesma capacidade de Apocalipse os Empodera → 16
- Vínculo Psíquico de Controle Sobre os Cavaleiros — **20** · distancia · controla os cavaleiros a distância continental (~3.000 km) → 20

**Apocalipse (Com Tecnologia Celestial Completa)** (extremo, 16)

- Invulnerabilidade Quase Absoluta — **40** · resistencia · variante cósmica: aguenta devastação regional/continental (31–45) → 40
- Projeção Energia Cósmica (Olhos/Mãos) — **28** (pico 35) · energia · variante cósmica: arrasa distrito/cidade (25–30) → 28; pico região ~35
- Interface Direta com Nave Celestial — **31** · outro · comanda nave Celestial: pareado à faixa cósmica (31+) → 31
- Módulos de Combate Reconfiguráveis (Lâminas/Canhões) — **22** · energia · canhões celestiais derrubam arranha-céu (22–24) → 22; abaixo da projeção cósmica
- Escudo Anti-Energia Cósmica (Resiste Golpes de Entidades Cósmicas) — **40** · outro · pareado a golpes de entidades cósmicas (faixa 31–45) → 40, = Invulnerabilidade
- Transmuta Matéria em Escala Maciça — **30** · peso · transmuta massa de montanha pequena ~24 Mt → 30
- Cria Vida/Seres Artificiais — **25** · outro · cria seres vivos artificiais: faixa Ômega alta → 25
- Adaptação Instantânea a Qualquer Ameaça — **30** · outro · pareado às ameaças Ômega/cósmicas que enfrenta (topo 16–30) → 30
- Absorve Poderes/Energia de Inimigos — **30** · outro · pareado aos alvos Ômega que absorve (16–30) → 30
- História/Mapa do Universo Conhecido — **35** · informacao · conhecimento de escala cósmica (31+) → 35
- Conhece Fraquezas de Quase Todos Seres — **30** · informacao · conhecimento estratégico cósmico → 30
- Guerra: Conflito/Violência Amplificada — **20** · informacao · influência social em escala país/continente (18–21) → 20
- Fome: Escassez/Colapso Recursos — **20** · area · colapso de recursos em escala de país (2.800 km) → 20
- Morte: Fim/Entropia Personificada — **25** · energia · entropia/morte em massa: distrito → cidade (25–30) → 25
- Apocalipse os Empodera com Tech Celestial — **25** · outro · concede poderes de nível Ômega aos Cavaleiros (16–30) → 25
- Exércitos Tecnorgânicos Infinitos — **25** · outro · exércitos ilimitados: faixa Ômega alta → 25

**Cable** (extremo, 8)

- Braço e Olho Biônicos TOV — **8** · peso · braço TOV vira caminhão/ergue ~6 t → 8
- Telepatia de Nível Ômega (Suprimida) — **8** (pico 23) · distancia · uso suprimido de rotina: comunicação/sondagem ~1 km → 8 (desbloqueada, peak global ~23)
- Telecinese Massiva (Suprimida) — **8** (pico 20) · peso · suprimida: rotina ~6 t (caminhão) → 8; desbloqueada ergue navios (peak ~20)
- Precognição Tática — **8** · duracao · lampejos táticos de segundos/minutos, faixa rua → 8
- Escudos Mentais Impenetráveis — **25** · outro · ladder: escudos que seguraram telepatas Ômega (Jean, Apocalipse) → 25; = Escudos Mentais Impenetráveis do Cable Liberado
- Escudos de Força Pessoais — **10** · resistencia · escudo TK aguenta artilharia leve/concreto → 10
- Interface Neural com Tecnologia — **10** · outro · tecnopatia TOV com máquinas do futuro, faixa rua → 10
- Braço Cibernético Multifuncional — **8** · peso · mesmo braço TOV: ~6 t → 8

**Cable (Liberado - Sem Vírus)** (extremo, 12)

- Manipulação Molecular Precisa — **18** · outro · manipulação molecular de precisão; faixa Ômega, abaixo da força bruta → 18
- Controle Simultâneo de Múltiplos Alvos em Combate — **16** · outro · controle simultâneo de vários alvos; faixa Ômega baixa
- Precognição Perfeita (Táticas) — **16** · duracao · precognição tática perfeita; faixa Ômega
- Reescrita Personalidade Massa — **18** · informacao · reescreve personalidades em massa; faixa Ômega
- Projeção Astral Ofensiva/Defensiva — **16** · informacao · projeção astral com combate; faixa Ômega
- Escudos Mentais Impenetráveis (Bloqueia Invasões Cósmicas) — **25** · outro · pareado a invasões telepáticas Ômega/cósmicas (~24) → 25
- Cirurgia Mental de Precisão Absoluta — **18** · informacao · cirurgia mental de precisão; faixa Ômega
- Ilusões Telepáticas Perfeitas em Múltiplos Sentidos — **18** · informacao · ilusões perfeitas multissensoriais; faixa Ômega
- Bloqueio de Poderes Mutantes em Massa — **18** · outro · pareado aos graus típicos dos mutantes anulados (rua–Ômega ~15–18) → 18
- Vê Todos Futuros Possíveis Simultaneamente — **20** · duracao · vê todos os futuros; faixa Ômega alta
- Escolhe Caminho Vitorioso Garantido — **20** · duracao · escolhe o futuro vitorioso; mesma faixa da visão de futuros
- Imune a Manipulação Genética (Sinistro/Apocalipse) — **20** · outro · pareado à manipulação genética de Sinistro/Apocalipse (~20)

**Cosmo (Cão Espacial)** (extremo, 6)

- Telepatia Alcance Interestelar — **51** · distancia · o texto é o feito: alcance interestelar ≥ 1 ano-luz → 51
- Escudos Psíquicos Protegem Knowhere — **11** · area · escudo psíquico cobre Knowhere (cabeça de Celestial, raio ~5 km) → 11
- Comunicação Interestelar Instantânea — **51** · distancia · o texto é o feito: comunicação interestelar ≥ 1 ano-luz → 51
- Detecta Ameaças Psíquicas em Toda a Galáxia — **68** · distancia · o texto é o feito: galáxia ~100 mil anos-luz (51 + 17) → 68
- Coordena as Defesas de Knowhere Simultaneamente pela Mente — **11** · informacao · coordena defesas em toda Knowhere (raio ~5 km) → 11
- Faro Psíquico: Rastreia Presenças a Anos-Luz de Distância — **53** · distancia · o texto é o feito: rastreia a alguns anos-luz (~4 al) → 53

**Druig (Eterno)** (extremo, 3)

- Manipulação Matéria/Energia Cósmica — **16** · energia · rajadas de energia cósmica de Eterno derrubam prédio pequeno → 16
- Comanda Exércitos de Seguidores Hipnotizados por Séculos — **18** · informacao · exércitos sob controle em escala de país → 18
- Rede Espionagem Milenar — **20** · informacao · rede de agentes em escala continental → 20

**Emma Frost** (extremo, 4)

- Mente Tática e Inescrupulosa — **9** · informacao · estrategista de elite (faixa rua) → 9
- Controle Mental de Multidões — **18** · informacao · controla centenas/milhares de mentes de uma vez: faixa Ômega → 18
- Transferência de Consciência — **16** · outro · troca/transfere mentes: base da faixa Ômega → 16
- Bloqueio de Poderes Mutantes — **16** · outro · desliga poderes por via telepática: pareado a alvos rua/Ômega típicos → 16

**Emma Frost (Phoenix Five / Anfitriã Fênix)** (extremo, 9)

- Pirocinese Cósmica (Queima no Espaço) — **35** · energia · fogo Fênix arrasa região (escala regional 31–45) → 35
- Ressurreição / Cura Total — **30** · resistencia · acima do auge de Wolverine (18–22): volta da morte → 30
- Imortalidade Enquanto Fênix Habitar — **30** · duracao · imortalidade cósmica enquanto hospedeira, faixa por resistência → 30
- Forma Diamante + Telepatia Simultânea (Fênix Ignora Limite) — **40** · resistencia · mesma Forma Diamante Fênix (ver Invulnerabilidade Absoluta) → 40
- Amplificação Cósmica de Poderes de Toda a Equipe (Phoenix Five) — **31** · outro · pareado ao piso cósmico dos demais hospedeiros Fênix → 31
- Barreira Psíquica Estelar Contra Invasões Mentais — **35** · outro · variante cósmica: barreira em escala estelar (sistema interno ~10¹¹ m) → 35; = barreira estelar da Rachel (Avatar)
- Invulnerabilidade Absoluta (Até Thor/Martelo) — **40** · resistencia · aguenta golpes de Thor/Mjolnir (região/montanhas massivas 31–45) → 40
- Força Ilimitada (Classe 100+) — **14** · peso · Classe 100+: ≥100 t = 12; "+" com Fênix → 14
- Telepatia Funciona Nesta Forma (Fênix) — **68** · outro · mesma capacidade da Telepatia Cósmica (galáxia) → 68

**Hope Summers (Messias Mutante)** (extremo, 13)

- Copia QUALQUER Poder Mutante Perto (Sem Limite) — **20** · outro · mimetismo pareado aos poderes copiados (mutantes rua–Ômega, rotina ~20)
- Mantém Poderes Copiados Indefinidamente — **16** · duracao · retém poderes copiados indefinidamente; faixa Ômega baixa
- Sincroniza Múltiplos Poderes Simultaneamente — **18** · outro · combina vários poderes copiados; pareado ao mimetismo (20) menos o custo
- Melhora Poderes Copiados (Versão Ômega) — **22** · outro · eleva o poder copiado acima do original Ômega (~20) → 22
- Copia Poderes Não-Mutantes (Tecnologia, Magia) — **16** · outro · copia tecnologia/magia; pareado a armas/feitiços de rua alta
- Absorve Habilidades ao Tocar como Rogue — **20** · outro · mimetismo por toque pareado ao de Rogue (rotina 20) → 20
- Copia Telepatia/Telecinese de Mutantes Ômega Próximos — **20** · outro · pareado à telepatia/TK Ômega copiada (~20)
- Adapta o Poder Copiado à Situação de Combate Instantaneamente — **14** · outro · adaptação tática do poder; faixa rua alta
- Combina Poderes de Vários Mutantes ao Mesmo Tempo — **18** · outro · mesma capacidade de sincronizar vários poderes → 18
- Pode Controlar/Comandar Fênix — **25** (pico 31) · outro · hospedeira temporária da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Ressuscita Mutantes Mortos (Com Fênix) — **25** (pico 31) · resistencia · hospedeira temporária da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Cura Extinção Mutante (Luzes da Esperança) — **24** · area · texto: reacende o gene X no planeta (Luzes da Esperança) → global 24
- Precognição Tática (Treinamento Psíquico) — **8** · duracao · precognição tática treinada; faixa rua

**Jean Grey** (extremo, 15)

- Telecinese Molecular — **16** · outro · reorganiza matéria em escala molecular; não excede a telecinese (16)
- Pirocinese Cósmica — **20** (pico 96) · energia · depende da Fênix: rotina arrasa quarteirão/afunda navio → 20; pico consumiu estrela D'Bari (~2e27 t → 96)
- Manipulação de Matéria em Nível Atômico — **16** · outro · mesma manipulação molecular da telecinese (16)
- Viagem Interestelar pelo Pensamento — **25** (pico 51) · distancia · Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; literal interestelar (1 ano-luz = 51) em peak
- Ressurreição Auto-Induzida — **22** · resistencia · volta da morte (acima de 'volta de quase nada' 18-22) → 22
- Criação de Vida do Nada — **25** (pico 31) · outro · Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; faixa cósmica (31) em peak
- Percepção Cósmica (Sente Vida em Escala Galáctica) — **25** (pico 68) · distancia · Fênix latente: rotina limitada a 25 (hospedeira latente); literal galáctico (~100 mil anos-luz = 68) em peak
- Amplificação Extrema de Todos os Próprios Poderes — **24** · outro · eleva telepatia/telecinese ao pico (telepatia global 24) → 24
- Chamas da Ressurreição — **22** · resistencia · mesma ressurreição da tag 'Ressurreição Auto-Induzida' → 22
- Cura Planetária — **23** · area · o texto é o feito: cura em escala planetária (global) → 23
- Transmutação de Energia Infinita — **25** (pico 31) · energia · Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; "infinita" (faixa cósmica 31) em peak
- Renascimento Cíclico (Ovo Cósmico) — **22** · resistencia · mesma ressurreição (ciclo da Fênix) → 22
- Transferência de Vitalidade a Terceiros — **14** · resistencia · transfere vitalidade e cura ferimentos graves de terceiros (13-16) → 14
- Comunhão com Todas Formas de Vida — **23** · informacao · ladder: comunhão mental com toda vida do planeta = alcance global → 23
- Erradicação de Doenças em Escala Populacional — **13** · area · erradica doenças de uma população (cidade ~11-20 km) → 13

**Jean Grey (Dark Phoenix)** (extremo, 12)

- Telepatia Oniversal (Todas Mentes) — **86** · informacao · variante cósmica: alcance universal (raio do universo observável ~46 bi anos-luz = 51+35) → 86; = escala universal da White Phoenix
- Manipulação Matéria/Energia Absoluta — **80** · energia · reorganiza matéria em escala planetária ou maior (70+) → 80
- Imortalidade Verdadeira (Ressuscita Infinitas) — **50** · duracao · ressurreição ilimitada da Força Fênix; faixa cósmica (não pela coluna Tempo) → 50
- Devora Energia Vital de Planetas Inteiros — **78** · energia · esgota a vida de um planeta inteiro (~massa Terra) → 78
- Resiste Ataques Combinados de Titãs Cósmicos (Vigia, Galactus) — **85** · resistencia · pareado a ataques de Galactus/Vigia (destruidores de planeta 70–90) → 85
- Queima no Vácuo/Espaço — **40** · outro · fogo Fênix sem oxigênio; propriedade cósmica (faixa 31+) → 40
- Apaga Memória/Existência — **40** · informacao · apaga existência de alvos (faixa cósmica) → 40
- Não Pode Ser Apagada Convencionalmente — **50** · resistencia · mesma faixa da ressurreição Fênix → 50
- Consome Almas Além do Corpo Físico — **40** · outro · ataque espiritual cósmico (faixa 31+) → 40
- Propaga-se Através do Vácuo Sem Combustível — **51** · distancia · chamas viajam entre estrelas ~1 ano-luz → 51
- Imune a Extinção Convencional (Água, Frio Absoluto, Anti-Matéria) — **40** · outro · pareado a antimatéria/frio absoluto (faixa cósmica) → 40
- Ignição Instantânea em Escala Planetária — **55** · energia · incendeia a biosfera de um planeta (devastação planetária 46–60) → 55

**Jean Grey (White Phoenix of the Crown)** (extremo, 9)

- Mestra do Multiverso (Todas Linhas Temporais) — **95** · outro · variante cósmica: escala multiversal, acima do universo observável (~86) → 95
- Restaura Realidades Apagadas — **86** · area · realidade inteira: raio do universo observável ~46 bi anos-luz → 51+35 = 86
- Julgamento Cósmico Final — **75** · energia · julga/destrói mundos: destrói planeta (70+) → 75
- Onisciência Verdadeira (Passado/Presente/Futuro) — **86** · informacao · alcance universal (~86)
- Cria/Apaga Linhas Temporais — **95** · outro · escala multiversal, = Mestra do Multiverso → 95
- Transcende Morte/Morte Permanente Impossível — **90** · duracao · imortalidade absoluta de entidade cósmica: faixa cósmica máxima → 90
- Cura/Restaura Universos Inteiros Corrompidos — **86** · area · o texto é o feito: universo inteiro (~86)
- Onipresença Dentro do Espectro Fênix — **86** · distancia · presença em escala universal (~86)
- Impõe Equilíbrio Cósmico Vida-Morte-Renascimento — **86** · outro · regula o ciclo cósmico em escala universal (~86)

**Legion (David Haller)** (extremo, 26)

- Cada Personalidade = Poder Ômega Diferente — **25** · outro · cada persona porta um poder Ômega (faixa 16–30) → 25
- Centenas de Personalidades / Poderes — **25** · outro · amplitude de poderes Ômega, mesmo nível das personas → 25
- Personalidades Podem se Manifestar Fisicamente — **16** · outro · personas tomam corpo físico (piso Ômega) → 16
- Fusão de Personalidades Cria Poderes Híbridos Únicos — **25** · outro · combina poderes Ômega das personas → 25
- Acesso Consciente a Décadas de Memórias Alheias — **12** · informacao · arquivo de memórias de centenas de mentes, faixa rua alta → 12
- Capaz de Apagar ou Absorver Personalidades Rivais — **24** · outro · pareado a psiques como o Rei das Sombras (~23) → 24
- Legion Prime: Fusão de Todas as Personalidades em Uma — **30** · outro · todos os poderes unificados, topo da faixa Ômega → 30
- Jemail Karami (Telepatia) — **12** · distancia · telepatia de uma persona isolada ~cidade → 12
- Jack Wayne (Telecinese) — **12** · peso · TK de persona: ergue ~100 t (avião pequeno) → 12
- Cyndi (Pirocinese) — **12** · energia · incinera bunker/prédio → 12
- Sally (Teleporte) — **12** · distancia · teleporte ~11 km (cidade) → 12
- Karma (Absorção Psíquica) — **14** · outro · pareado a mentes de rua que possui/absorve → 14
- Delphie (Precognição) — **12** · duracao · precognição de persona, faixa rua alta → 12
- Chamber (Energia) — **12** · energia · rajadas psiônicas arruínam tanque/bunker → 12
- Styx (Morte/Entropia) — **18** · outro · consome mentes/vida ao toque; pareado a Corpo de super-humanos fortes → 18
- Moira (Realidade) — **13** · area · reescreve a realidade local ~cidade → 13 (igual Reescreve Realidade Local)
- Rebel (Manipulação de Tecnologia) — **12** · outro · tecnopatia de persona, faixa rua alta → 12
- Reescreve Realidade Local (Moira Persona) — **13** · area · raio local ~11 km (cidade) → 13
- Cria/Apaga Linhas Temporais — **30** (pico 40) · outro · Legion Quest gerou a Era do Apocalipse; topo Ômega → 30
- Onipotência Local Quando Personalidade Certa — **13** · area · mesmo raio local da reescrita da realidade → 13
- Cria Realidades de Bolso Habitadas por Bilhões — **24** · area · realidade do tamanho de um mundo habitado → global 24
- Apaga a Existência do Pai da Linha do Tempo — **30** · outro · reescrita temporal (mesma de Cria/Apaga Linhas Temporais) → 30
- Reescreve a História Pessoal de Aliados Inteiros — **20** · outro · reescrita de identidade em grupo, faixa Ômega → 20
- Rivaliza Entidades Cósmicas em Escala Planetária — **30** (pico 31) · outro · entrada base (não Legion Prime): teto planetário 30; piso cósmico (31) em peak
- Manipula Probabilidade e Causalidade — **20** · outro · manipulação de causalidade, faixa Ômega → 20
- Controla Múltiplas Linhas Temporais Simultaneamente — **30** · outro · mesmo nível da reescrita temporal → 30

**Magneto** (extremo, 5)

- Manipula Hemoglobina — **14** · outro · ignora armadura; pareado ao Corpo de super-humanos de rua
- Induz AVC ou Parada Cardíaca — **14** · outro · mesmo controle do ferro no sangue → 14
- Extrai o Ferro do Sangue de um Inimigo à Distância — **14** · outro · mesmo controle do ferro no sangue, à distância → 14
- Desativa ou Reprograma Qualquer Tecnologia Eletromagnética — **16** · outro · pareado à tecnologia de Sentinelas/S.H.I.E.L.D. (16–18); abaixo do PEM de satélites
- Manipula o Espectro de Luz e Rádio Além do Metal Puro — **14** · outro · espectro EM além do metal; secundário ao magnetismo, faixa rua alta

**Mastermind (Jason Wyngarde)** (extremo, 4)

- Ilusões Causam Dano Físico Real (Psicossomático) — **10** · outro · dano psicossomático ignora armadura; pareado a Corpo de rua (~10)
- Sustenta Ilusões por Meses Sem Detecção — **16** · duracao · ilusão sustentada por meses sem detecção; faixa Ômega → 16
- Recursos / Influência Global — **12** · informacao · recursos/influência via elite global; menor que carisma de Magneto (14) → 12
- Influência Política e Financeira Através do Clube — **12** · informacao · influência política/financeira via Clube do Inferno → 12

**Miss Sinister (Claudine Renko)** (extremo, 3)

- Prevê Mutações Genéticas Antes de Ocorrerem — **14** · informacao · previsão genética além da ciência comum (13–15) → 14
- Rede Espionagem Global — **23** · informacao · o texto é o feito: rede global ~11.000 km → 23
- Manipula Lealdade dos Clones Através de Programação Genética — **12** · informacao · lealdade programada nos clones (faixa rua) → 12

**Mister Sinister** (extremo, 13)

- Poderes Psiônicos e Telepatia Limitada — **6** · distancia · telepatia limitada ~campus 180 m → 6
- Imune a Telepatia — **21** · outro · ladder: pareado à telepatia Ômega de rotina (21); a ficção não o mostra segurando Xavier/Jean no auge
- Clones de Si Mesmo — **15** · outro · mantém clones funcionais de si: escala do gênio genético → 15
- Clones de Mutantes Poderosos — **18** · outro · clones de mutantes de nível Ômega (ex.: Madelyne): pareado a 16–20 → 18
- Transferência de Consciência — **16** · outro · transfere a mente entre corpos: base Ômega → 16
- Backup Corporal Sempre Pronto (Nunca Morre Permanentemente) — **22** · resistencia · volta de quase nada / da morte (topo de 18–22) → 22
- Manipulação Genética Instantânea de Terceiros — **16** · outro · reescreve corpo do alvo ignorando Corpo: pareado a alvos rua/Ômega → 16
- Cria Exército de Marauders sob Controle Total — **14** · outro · Marauders são super-humanos de rua (10–14) → 14
- Acesso a DNA de Praticamente Todo Mutante Catalogado — **16** · informacao · banco genético de quase todos os mutantes, recurso de gênio → 16
- Reconstrói Corpo a Partir de Amostra Genética Mínima — **22** · resistencia · volta de quase nada (18–22) → 22
- Implanta Gatilhos Genéticos Latentes em Vítimas — **16** · outro · pareado ao Corpo das vítimas (rua/Ômega) → 16
- Sobrevive à Destruição Total do Corpo Físico — **22** · resistencia · volta de quase nada (18–22) → 22
- Arquivo Genético Completo — **16** · informacao · = Acesso a DNA de quase todo mutante → 16

**Moondragon (Heather Douglas)** (extremo, 8)

- Telecinese Precisa Nível Molecular — **14** · outro · precisão molecular, força TK moderada; faixa rua alta → 14
- Projeção Astral Ofensiva/Defensiva — **16** · informacao · combate astral contra telepatas fortes, piso Ômega → 16
- Pode Apagar ou Reescrever Personalidades Inteiras — **20** · outro · reescrita total de mente, faixa Ômega → 20
- Amplifica os Poderes Psíquicos de Aliados — **16** · outro · amplificação psíquica, piso Ômega → 16
- Combate Psíquico Capaz de Incapacitar Cosmicamente Poderosos — **25** (pico 31) · outro · entrada não-variante: rotina = vence/segura telepatas Ômega (25, teto de escudos da ladder); derrubar seres cósmicos (31) vai para peak
- Sonda o Plano Astral em Busca de Ameaças — **23** · distancia · varredura astral de alcance global → 23
- Cura Traumas Mentais Profundos com Precisão Cirúrgica — **14** · informacao · cura psíquica fina, faixa rua alta → 14
- Disciplina Mental Absoluta — **14** · outro · resistência mental de monja titã; pareado a telepatas de rua → 14

**Nate Grey (X-Man - Suprimido / Início)** (extremo, 4)

- Escudos Psíquicos Fortes — **18** · outro · pareado a ataques telepáticos fortes (rua alta–Ômega) → 18
- Projeção Astral — **14** · informacao · projeção astral; faixa Ômega baixa/rua alta
- Visões Futuro Próximo (Segundos/Minutos) — **8** · duracao · precognição de segundos/minutos; faixa rua
- Imune a Vírus Techno-Orgânico — **18** · outro · pareado ao vírus techno-orgânico (tecnologia Apocalipse/Falange ~18)

**Nate Grey (X-Man)** (extremo, 14)

- Telecinese Molecular/Atômica (Cria/Destrói Matéria) — **20** (pico 25) · peso · rotina: telecinese em escala de navio ~25 kt → 20; pico 25
- Manipulação Realidade Local (Altera Física/Probabilidade) — **20** · outro · altera física/probabilidade localmente (faixa Ômega) → 20
- Precognição Estratégica (Vê Futuro Imediato) — **12** · duracao · precognição de combate imediata; faixa rua alta → 12
- Projeção Astral Cósmica (Corpo de Energia Psiônica) — **23** · distancia · projeção astral em alcance planetário → 23
- Viagem Dimensional / Teletransporte Interestelar — **23** (pico 51) · distancia · entrada não-variante: rotina = teleporte global 23; literal interestelar (51) em peak
- Absorve/Projeta Energia Ilimitada (Solar/Psíquica) — **21** (pico 30) · energia · rotina: rajadas que arrasam quarteirão → 21; pico montanha (30)
- Cria Vida/Matéria do Nada (Manipulação Molecular Total) — **25** (pico 31) · outro · entrada não-variante: rotina = pico da TK molecular (25); criação de vida/matéria cósmica (31) em peak
- Cura Física e Mental Instantânea (Própria e Alheia) — **18** · resistencia · cura instantânea de ferimentos graves/mente (acima de regenerar órgãos 13-16) → 18
- Imune a Manipulação Genética (Sinistro/Apocalipse) — **20** · outro · pareado à engenharia genética de Sinistro/Apocalipse (~20) → 20
- Restaura Mentes Quebradas (Legion, etc.) — **22** · outro · pareado a mentes Ômega quebradas como Legion (~22) → 22
- Comunicação com Espíritos/Plano Astral — **16** · informacao · comunicação com plano astral; faixa Ômega → 16
- Cura Física via Telecinese Molecular — **16** · resistencia · regenera órgãos/membros via telecinese molecular (13-16) → 16
- Vê Todas Linhas Temporais Simultaneamente — **25** (pico 31) · duracao · entrada não-variante: precognição em topo de Ômega (25); "todas as linhas" (31) em peak
- Prevê Ações Inimigas Antes de Acontecerem — **12** · duracao · mesma precognição imediata → 12

**Onslaught** (extremo, 17)

- Criou Realidade de Bolso (Era Heroes Reborn) — **60** · outro · universo de bolso com Terra inteira (faixa cósmica, via poder de Franklin) → 60
- Absorve Psiques/Poderes de Vítimas (Franklin, Nate) — **40** · outro · pareado aos poderes absorvidos (Nate Grey ~30, Franklin cósmico) → 40
- Projeção Astral Ofensiva = Dano Físico Real — **18** · energia · forma astral causa dano físico em heróis de topo (faixa Ômega) → 18
- Criou Corpos Físicos de Energia Psiônica — **22** · outro · corpo psiônico aguentou Vingadores+Quarteto (nuclear tático 22–24) → 22; = Professor X (Onslaught)
- Poder Suficiente para Desafiar Vingadores e X-Men Combinados — **30** · outro · pareado a Vingadores + X-Men combinados (topo Ômega) → 30
- Manipula Correntes Elétricas via Eletromagnetismo — **16** · energia · redes elétricas de cidade; sobrecarga derruba prédio pequeno → 16
- Reescreve Realidade via Psique Coletiva — **40** · outro · alteração de realidade (faixa cósmica) → 40
- Cria Realidade de Bolso (Heroes Reborn) — **60** · outro · mesmo feito de Criou Realidade de Bolso → 60
- Cria Universos de Bolso Completos — **60** · outro · mesmo feito do universo de bolso → 60
- Reescreve Leis Físicas Locais — **40** · outro · alteração de realidade local (faixa cósmica) → 40
- Ressuscita Mortos como Servos Psíquicos — **30** · outro · reanimação psíquica (topo Ômega) → 30
- Manipula Tempo/Espaço no Bolso — **40** · outro · dentro do bolso: manipulação de tempo/espaço (faixa cósmica) → 40
- Substitui a Realidade Prime pela Sua Própria — **60** · outro · mesma escala do universo de bolso → 60
- Controla o Fluxo Causal Dentro do Bolso — **40** · outro · causalidade no bolso (faixa cósmica) → 40
- Fabrica Exércitos e Cidades Inteiras à Vontade — **31** · peso · cidade inteira ~50 Mt de matéria → 31
- Impõe Suas Regras como Leis Físicas Absolutas — **40** · outro · mesma faixa de Reescreve Leis Físicas → 40
- Mantém a Ilusão Estável por Meses (Heroes Reborn) — **40** · duracao · sustenta ilusão em escala de universo de bolso (faixa cósmica, não pela coluna Tempo) → 40

**Professor X** (extremo, 6)

- Mestre em Xadrez Psíquico — **8** · informacao · xadrez + leitura telepática do oponente: acima do pico humano → 8
- Rede de Contatos Global — **20** · informacao · contatos em vários países/continentes (18–21) → 20
- Projeção Astral Corpórea — **20** · informacao · projeção astral que afeta o mundo físico, alcance continental → 20
- Arquivo Mental da História Mutante — **14** · informacao · conhecimento enciclopédico (rua alta) → 14
- Edição de Memória em Massa — **22** · informacao · edita memórias de multidões: = Reescrita de Personalidade → 22
- Sugestão Póstuma em Escala Global — **23** · distancia · o texto é o feito: global → 23

**Professor X (Onslaught)** (extremo, 19)

- Criou Realidade de Bolso (Heroes Reborn) — **60** · outro · variante cósmica: universo de bolso com Terra inteira (poder de Franklin) → 60; = Onslaught
- Absorve Poderes/Psiques de Vítimas — **40** · outro · pareado aos poderes absorvidos (Nate ~30, Franklin cósmico) → 40; = Onslaught
- Projeção Astral Ofensiva = Dano Físico — **18** · energia · forma astral fere heróis de topo (faixa Ômega) → 18; = Onslaught
- Cria Corpos Físicos de Energia Psiônica Pura — **22** · resistencia · corpo psiônico aguentou Vingadores+Quarteto juntos (nuclear tático 22–24) → 22
- Manipula Matéria em Nível Molecular via Telecinese — **25** · outro · TK molecular em escala de Magneto → 25
- Manipula Espectro Eletromagnético Total — **25** · outro · espectro EM inteiro, nível do magnetismo de Magneto → 25
- Move Asteroides / Polos Magnéticos — **36** · peso · o texto é o feito: asteroide ~1 km ~1,5 Gt → 36; = Onslaught
- Cria Armaduras Magnéticas Reativas — **20** · resistencia · acima do campo do Magneto (19): artilharia pesada → 20
- Manipula Campos Eletromagnéticos de Tecnologia Inimiga — **20** · outro · desliga/sequestra tecnologia (Sentinelas), faixa Ômega → 20
- Extrai Ferro do Sangue (Ofensiva Letal) — **16** · outro · Magneto = 14 (ignora armadura); variante mais forte → 16
- Cria Universos de Bolso (Era Onslaught) — **60** · outro · mesmo feito do Heroes Reborn → 60; = Onslaught
- Reescreve Física Local — **40** · outro · alteração de realidade local (faixa cósmica) → 40; = Onslaught "Reescreve Leis Físicas Locais"
- Ressuscita Mortos como Servos — **30** · outro · reanimação psíquica (topo Ômega) → 30; = Onslaught
- Manipula Tempo Dentro do Bolso Dimensional — **40** · duracao · manipulação de tempo no bolso (faixa cósmica) → 40; = Onslaught
- Aprisiona Inimigos em Realidades Alternativas — **25** · outro · pareado a Vingadores/Quarteto aprisionados (~20–25) → 25
- Controla Leis da Física a Vontade — **40** · outro · mesma faixa de Reescreve Física Local → 40; = Onslaught "Impõe Suas Regras como Leis Físicas"
- Fabrica Exércitos de Sentinelas Customizadas — **18** · peso · centenas de Sentinelas ~10–20 t cada ≈ 6 kt → 18
- Distorce Percepção de Tempo dos Prisioneiros — **20** · informacao · ilusão temporal sobre heróis, faixa Ômega → 20
- Fecha e Abre Portais para o Bolso Dimensional — **40** · outro · portais para o bolso, mesmo nível da manipulação do bolso → 40

**Quentin Quire (Kid Omega)** (extremo, 12)

- Processa Pensamentos Velocidade da Luz — **18** · outro · pensamento hiperacelerado; faixa Ômega
- Constrói Mentes/Realidades Mentais — **18** · informacao · constrói realidades mentais; faixa Ômega
- Hackeia Tecnologia/Cérebros Via Telepatia — **14** · informacao · hackeia tecnologia/cérebros telepaticamente; faixa rua alta
- Sobrecarga Psíquica = Dano Físico Cerebral — **16** · outro · dano cerebral ignora armadura; pareado ao Corpo de super-humanos
- Controle Mental em Massa Instantâneo (Multidões) — **14** · informacao · controle de multidões em escala de cidade/metrópole → 13–14
- Cria Ilusões Telepáticas Indistinguíveis da Realidade — **18** · informacao · ilusões indistinguíveis; faixa Ômega
- Bloqueia/Resiste Invasão de Outros Telepatas Ômega — **25** · outro · ladder: o texto diz que barra telepatas Ômega → 25
- Acessa e Copia Memórias/Conhecimento Instantaneamente — **14** · informacao · copia memórias/conhecimento instantâneo; faixa rua alta
- Telepatia Cósmica — **25** (pico 31) · informacao · hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Telecinese Molecular — **25** (pico 31) · outro · hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Chamas Fênix — **25** (pico 31) · energia · hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Ressurreição — **25** (pico 31) · resistencia · hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak

**Rachel Summers** (extremo, 10)

- Anfitrião da Força Fênix — **22** · outro · Fênix ativa amplifica telepatia/telecinese ao nível Ômega alto → 22
- Telecinese Molecular — **16** · outro · manipulação molecular; não excede a telecinese (16)
- Chamas Cósmicas da Fênix — **20** · energia · chamas da Fênix arrasam quarteirão/afundam navio → 20 (igual a Jean)
- Viagem Temporal Psíquica — **22** · duracao · envia consciências décadas no tempo (Dias de um Futuro Esquecido); faixa Ômega → 22
- Ressurreição Auto-Induzida — **22** · resistencia · volta da morte → 22 (igual a Jean)
- Precognição Cósmica (Vê Linhas Temporais) — **20** · duracao · vê linhas temporais; faixa Ômega → 20
- Amplifica Poderes de Toda Equipe ao Redor — **14** · outro · amplifica poderes da equipe próxima; faixa rua alta → 14
- Manipula Fluxo Temporal em Escala Planetária — **23** · area · o texto é o feito: escala planetária (global) → 23
- Devastação em Massa Quando Descontrolada — **25** · energia · descontrolada arrasa distrito (25-30) → 25
- Rastreadora do Futuro — **23** · distancia · extra; repete o rastreio de mutantes → 23

**Rachel Summers (Fênix Force - Avatar Completo)** (extremo, 9)

- Telecinese Molecular/Atômica — **40** (pico 78) · peso · avatar Fênix: TK em escala de montanhas/continente (~10¹¹ t) → 40; pico planetário
- Chamas Fênix Queimam no Vácuo/Tempo — **50** · energia · fogo Fênix cósmico (devastação planetária baixa 46–60) → 50
- Viagem Temporal / Realidades Psíquica — **40** · outro · viagem entre épocas/realidades (faixa cósmica) → 40
- Ressurreição Infinita — **50** · duracao · mesma ressurreição Fênix de Jean → 50
- Precognição Cósmica (Todas Linhas Temporais) — **40** · duracao · precognição multilinha (faixa cósmica, não pela coluna Tempo) → 40
- Manipulação Realidade Local — **40** · outro · alteração de realidade local (faixa cósmica) → 40
- Amplificação Cósmica de Todo o Time ao Redor — **30** · outro · amplifica aliados a topo Ômega → 30
- Barreira Psíquica Impenetrável em Escala Estelar — **35** · area · variante cósmica: barreira em escala de sistema estelar interno (~10¹¹ m) → 35; = barreira estelar da Emma (Phoenix Five)
- Devastação de Sistemas Estelares Quando Descontrolada — **78** (pico 96) · energia · controlada: planeta (~78); descontrolada: sistema estelar → pico 96

**Sersi (Eterna)** (extremo, 7)

- Transmutação Molecular/Atômica Absoluta — **30** (pico 32) · peso · umbrella ≥ sub-técnica "Reorganiza a Matéria de uma Cidade" (30, teto não-variante); rotina demonstrada ~100 kt (22); literal cidade ~10⁸ t (32) em peak
- Cria Vida / Seres Vivos do Nada — **20** · outro · cria seres vivos por transmutação: faixa Ômega → 20
- Voo / Projeção Energia Cósmica — **16** · energia · rajada cósmica de Eterna derruba prédio pequeno (16–18) → 16
- Transmuta Pessoas em Estátuas de Ouro ou Pedra — **18** · outro · ignora Corpo: pareado a super-humanos rua/Ômega → 18
- Reorganiza a Matéria de uma Cidade Inteira — **30** (pico 32) · peso · Eterna, entrada não-variante: teto planetário 30; literal matéria de uma cidade ~10⁸ t (32) em peak
- Desintegra Matéria à Vontade — **18** · energia · desintegra até prédio pequeno inteiro (16–18) → 18
- Absorve e Redistribui Energia Cósmica em Escala Massiva — **22** · outro · pareado a ataques cósmicos/Ômega altos → 22

**Shadow King (Amahl Farouk)** (extremo, 25)

- Possui Corpos / Mentes Simultaneamente — **18** · outro · possuiu população inteira da Ilha Muir e vários hospedeiros; faixa Ômega → 18
- Vive no Plano Astral (Imortalidade Efetiva) — **25** · duracao · existência astral milenar, faixa Ômega alta → 25
- Alimenta-se de Emoções Negativas (Medo/Ódio) — **12** · outro · fonte de poder emocional; faixa rua alta → 12
- Corrompe Telepatas (Mesmo Ômega) — **23** · outro · pareado a telepatas Ômega (Jean/Xavier ~23) → 23
- Sobrevive à Morte do Corpo Hospedeiro — **22** · resistencia · volta de quase nada (topo 18–22) → 22
- Manipula Multiversos Através do Astral — **25** (pico 35) · outro · entrada não-variante: rotina limitada ao topo da faixa telepática (25); alcance multiversal literal (35) vai para peak
- Assimila Consciências de Vítimas Permanentemente — **20** · outro · absorção permanente de mentes, faixa Ômega → 20
- Controla Plano Astral Inteiro — **23** · area · ladder: domínio astral tratado como alcance global → 23
- Aprisiona Almas/Mentes no Astral — **23** · outro · prendeu a mente de Xavier; pareado ~23 → 23
- Cria Pesadelos Coletivos — **20** · area · pesadelos em massa ~país → 20
- Constrói Reinos Inteiros Dentro do Astral — **20** · area · reino astral de escala país/continente → 20
- Corrompe Viajantes Astrais à Vontade — **23** · outro · pareado a Xavier/Psylocke no astral ~23 → 23
- Bloqueia Retorno de Mentes ao Corpo Físico — **23** · outro · prende a mente de Xavier; pareado ~23 → 23
- Sente Qualquer Presença Psíquica no Astral — **23** · distancia · ladder: detecção astral de alcance global → 23
- Drena Energia Vital Através do Astral — **16** · energia · drena hospedeiros até a morte; faixa Ômega baixa → 16
- Manifesta Formas Físicas Terríveis no Astral — **18** · informacao · manifestações astrais aterrorizantes, faixa Ômega → 18
- Corrompe Heróis (Tempestade, Karma, Psylocke) — **20** · outro · pareado à vontade de heróis treinados contra telepatia (~20) → 20
- Implanta Personalidades Falsas — **20** · outro · reescrita de identidade, faixa Ômega → 20
- Gatilhos Pós-Hipnóticos Ocultos — **18** · informacao · escondidos até de telepatas fortes → 18
- Manipula Percepção de Realidade das Vítimas — **20** · informacao · ilusão sustentada sobre heróis, faixa Ômega → 20
- Cria Personas Alternativas Permanentes nos Hospedeiros — **20** · outro · igual Implanta Personalidades Falsas → 20
- Controla Emoções e Impulsos das Vítimas — **18** · informacao · controle emocional profundo, faixa Ômega → 18
- Espalha Corrupção Psíquica em Cadeia — **14** · area · contágio de mente em mente na Ilha Muir/região ~45 km → 14
- Resiste a Exorcismo Psíquico Convencional — **22** · outro · pareado a telepatas Ômega que tentaram expulsá-lo (~22–23) → 22
- Reconstrói Identidade da Vítima do Zero — **20** · outro · reescrita total de identidade → 20

**Thena (Eterna)** (extremo, 3)

- Manipulação Matéria Cósmica (Igual Sersi) — **22** · outro · texto: igual a Sersi → pareado à transmutação de rotina demonstrada da Sersi (~100 kt = 22); o umbrella 30 da Sersi vem do feito de cidade, que Thena não tem
- Voo / Velocidade Luz / Teleporte — **14** · velocidade · voo de Eterna além da velocidade de escape ~40.000 km/h → 14 (texto exagera; teleporte de longo alcance)
- Sente e Rastreia Fontes de Energia Cósmica a Grandes Distâncias — **18** · distancia · rastreia energia cósmica a grandes distâncias ~700–1.400 km → 18

**Agent Zero** (alto, 2)

- Traje de Supressão de Poderes — **10** · outro · anulação pareada aos graus de mutantes de rua típicos (~10)
- Fator de Cura — **9** · resistencia · fator de cura: ferimentos de bala em pouco tempo (9-12) → 9

**Apocalipse (Base - Mutante Antigo)** (alto, 2)

- Manipulação Molecular Limitada (Próprio Corpo) — **12** · outro · remodela o próprio corpo de forma limitada (faixa rua) → 12
- Cria Cavaleiros (Empodera Servos) — **12** · outro · empodera servos sem tecnologia Celestial (faixa rua) → 12

**Bishop** (alto, 7)

- Carrega Armas Convencionais com Energia Absorvida — **10** · energia · munição carregada parte blindado leve → 10
- Sobrecarga Deliberada Gera Explosão de Área — **15** · energia · descarga total derruba avião grande / navio pequeno (13–15) → 15
- Redistribui Energia Absorvida para Fortalecer o Próprio Corpo — **9** · peso · força ampliada ergue ~13 t → 9
- Absorve Radiação e Energia Cósmica de Nível Extremo — **20** · outro · o texto afirma nível extremo: pareado a energia cósmica pesada → 20
- Detecta Fontes de Energia à Distância Antes do Impacto — **6** · distancia · percebe fontes de energia a ~180 m → 6
- Rastreamento Temporal — **14** · outro · rastreia viajantes do tempo entre eras: faixa rua alta → 14
- Conhecimento de Eventos Futuros — **10** · informacao · conhece a linha do tempo futura (desatualizável): faixa rua → 10

**Callisto** (alto, 2)

- Avalia a Força de um Oponente Antes do Combate Começar — **6** · informacao · avalia a força do oponente pelo radar; faixa humana alta
- Tentáculos Preênseis (pós-Mojo) — **4** · peso · tentáculos preênseis seguram/erguem ~340 kg

**Ciclope** (alto, 4)

- Modulação de Feixe para Efeitos Táticos (Cone, Propulsão, Perfuração de Adamantium) — **18** · energia · perfura adamantium (virtualmente indestrutível 16-18); não excede a rajada → 18
- Táticas Ópticas (Cone Área, Pulso Propulsão, Perfura Adamantium, Stun) — **18** · energia · extra; mesmas táticas ópticas (perfura adamantium) → 18
- Fortaleza Mental (Caixa Preta Intransponível, Prendeu Vazio, Resistiu Apocalipse/Brood) — **20** · outro · pareado à invasão mental de Apocalipse/Ninhada (~20) → 20
- Visor de Quartzo-Rubi (Micro-Interruptores, Visor Batalha > Óculos, Blackbird Amplifica) — **18** · outro · visor contém e modula a rajada inteira; pareado à rajada → 18

**Domino** (alto, 3)

- Campo de Sorte Probabilística — **14** · outro · pareado ao que anula: tiros erram, armas travam, golpes super-humanos desviam (rua alta) → 14
- Distorce a Probabilidade ao Seu Redor em Favor Próprio — **14** · outro · = Campo de Sorte Probabilística → 14
- Projéteis e Golpes Inimigos Desviam Sozinhos por "Coincidência" — **14** · outro · pareado a projéteis/golpes super-humanos de rua → 14

**Elixir** (alto, 10)

- Biomassa Negra — **14** · outro · mata/desfaz tecido por dentro, ignora armadura; pareado a Corpo de super-humanos de rua → 14
- Reescreve a Biologia de Terceiros ao Toque — **16** · outro · biocinese plena, não acima da cura → 16
- Concede ou Remove Habilidades Físicas Temporariamente — **14** · outro · altera fisiologia de alvos de rua → 14
- Desintegra Tecidos Vivos por Dentro Instantaneamente — **14** · outro · mesma Biomassa Negra → 14
- Neutraliza Venenos, Doenças e Mutações Hostis — **14** · outro · pareado a doenças/mutações de rua (vírus, toxinas) → 14
- Acelera ou Reverte o Envelhecimento Celular — **14** · outro · biocinese celular, faixa rua alta → 14
- Sente a Estrutura Biológica de Qualquer Ser Vivo ao Redor — **4** · distancia · percepção biológica ~prédio 45 m → 4
- Reanima Tecido Morto por Curto Período — **16** · resistencia · no teto da cura (não a supera) → 16
- Controle Molecular — **16** · outro · extra; mesma biocinese → 16
- Pode Matar com Toque — **14** · outro · extra; mesma Biomassa Negra → 14

**Emma Frost (Base - Rainha Branca)** (alto, 7)

- Bloqueio de Poderes Mutantes Alheios — **16** · outro · desliga poderes por via telepática → 16; = Bloqueio de Poderes da Emma Frost
- Transferência de Consciência para Outro Corpo — **16** · outro · troca de corpo/consciência; faixa Ômega baixa
- Não Necessita Oxigênio/Comida/Água — **10** · duracao · dispensa ar/comida na forma diamante; faixa rua
- Reflete Ataques Psíquicos/Telecinéticos — **18** · outro · forma diamante é imune a telepatia; pareado a telepatas fortes ~18
- Transformação Instantânea Sob Ameaça (Reflexo) — **8** · outro · transformação reflexa instantânea; faixa rua
- Recursos Bilionários / Corporações Globais — **12** · outro · recursos bilionários/corporações globais; faixa rua alta
- Tecnologia Proibida / Armas Avançadas — **10** · energia · armas avançadas do Clube do Inferno; artilharia leve

**Estrela Polar** (alto, 2)

- Velocidade Supersónica — **12** · velocidade · voo de rotina hipersônico ~Mach 10 (~12.000 km/h) → 12
- Voo e Reflexos Sobre‑Humanos — **12** · velocidade · reflexos acompanham o próprio voo ~Mach 10 → 12

**Fera** (alto, 3)

- Patas e Presas — **7** · energia · garras/presas rasgam porta de aço/parede de tijolo (7–8) → 7
- Garras Retráteis e Presas Afiadas em Combate Corpo a Corpo — **7** · energia · mesmas garras/presas de Patas e Presas → 7
- Resistência a Fadiga em Combates Prolongados — **6** · resistencia · luta horas sem cansar (pico humano) → 6

**Foxx** (alto, 2)

- Provocação e Manipulação Constantes — **7** · informacao · manipulação social hábil (rua baixa) → 7
- Rede de Contatos no Submundo — **14** · informacao · rede criminosa internacional de Mística (~metrópole → país) → 14

**Gentle** (alto, 2)

- Aumento Massivo de Tamanho sob Ameaça — **14** · peso · o crescimento é o veículo da força: mesma escala da força ~400 t → 14
- Regeneração Acelerada na Forma Ampliada — **9** · resistencia · regeneração acelerada: ferimentos de bala em minutos (9-12) → 9

**Havok** (alto, 7)

- Absorção de Energia Cósmica — **12** · outro · absorve radiação cósmica ambiente como combustível; pareado a fontes de radiação fortes → 12
- Sobrecarga Destrutiva — **20** · energia · descarga total arrasa quarteirão (19–21) → 20
- Liderança Relutante — **6** · informacao · mesma liderança (pico humano) → 6
- Projeção de Rajadas Orbitais de Longo Alcance — **17** · distancia · o texto é o feito: alcance orbital ~400 km → 17
- Absorção de Radiação Estelar Como Fonte de Poder — **12** · outro · mesma absorção de Absorção de Energia Cósmica → 12
- Criação de Estrelas Artificiais em Miniatura — **20** · energia · esfera de plasma que arrasa quarteirão (19–21) → 20
- Voo Sustentado por Propulsão de Plasma — **6** · velocidade · voo por propulsão ~160 km/h → 6

**Hellion** (alto, 6)

- Próteses Controladas por Telecinese (perdeu as mãos) — **6** · outro · controle fino telecinético que substitui mãos: pico humano de destreza → 6
- Controle Simultâneo de Dezenas de Objetos em Combate — **10** · outro · dezenas de objetos ao mesmo tempo: faixa rua → 10
- Constrói Próteses e Ferramentas Telecinéticas Complexas — **6** · outro · = controle fino das próteses → 6
- Corta e Perfura com Lâminas de Força Pura — **10** · energia · lâminas cortam blindado leve (9–10) → 10
- Amplifica Potência Quando Motivado pela Raiva — **14** (pico 16) · outro · sob raiva a telecinesia chega ao topo da rotina (~400 t) → 14; pico 16
- Manipulação de Precisão Fina Apesar da Falta das Mãos — **6** · outro · = controle fino das próteses → 6

**Ícone** (alto, 5)

- Armadura de Gelo Instantânea — **10** · resistencia · armadura aguenta artilharia leve → 10
- Armadura de Gelo Reativa Sob Ameaça — **10** · resistencia · mesma armadura de gelo → 10
- Projéteis e Lâminas de Gelo Sob Demanda — **8** · energia · projéteis quebram tijolo/derrubam alvo → 8
- Congelamento de Massas de Água em Escala de Rio ou Lago — **22** · peso · o texto é o feito: superfície de lago/trecho de rio ~100 kt de gelo → 22
- Manipulação de Umidade do Ar para Gerar Gelo do Nada — **12** · area · puxa umidade de raio ~11 km → 12

**Jean Grey (Base)** (alto, 5)

- Telecinese Fina (Nível Molecular) — **16** · outro · telecinese molecular; faixa Ômega baixa
- Bloqueio de Poderes Mutantes Alheios — **16** · outro · desliga poderes por via telepática → 16; = mesma tag da Emma Frost (Base)
- Comunicação Instantânea Sem Fala — **18** · distancia · elo psíquico com Ciclope funciona em escala de país/estado ~1.000 km
- Sente Localização/Estado Físico — **18** · distancia · mesmo elo psíquico → 18
- Compartilha Sentidos/Memórias — **18** · distancia · mesmo elo psíquico → 18

**Kid Omega** (alto, 2)

- Amplifica Temporariamente Poderes Próprios sob Estresse Extremo — **22** · outro · amplificação sob estresse leva telepatia perto do pico (24) → 22
- Visão Cínica que Antecipa as Fraquezas dos Outros — **6** · informacao · leitura de fraquezas alheias no pico humano → 6

**Lady Deathstrike** (alto, 1)

- Corpo Reconstruído Repetidamente Após Quase-Morte — **15** · resistencia · volta de quase-morte via reconstrução cibernética → 15

**Loa** (alto, 2)

- Desintegração por Contato — **12** · outro · abre buracos em qualquer matéria que atravessa, ignora Corpo: pareado a blindagem de tanque → 12
- Ataque que Ignora Armaduras — **12** · outro · pareado a blindagem pesada (tanque 11–12) → 12

**M (Monet St. Croix)** (alto, 9)

- Intelecto Prodigioso — **12** · informacao · domina ciências em minutos, acima do gênio humano → 12
- Resiliência Física e Mental — **8** · resistencia · resiliência pós-trauma; durabilidade de corpo à prova de balas leve → 8
- Telepatia de Alcance Considerável — **10** · distancia · alcance ~3 km → 10
- Inteligência Sobre-Humana — Domina Ciências em Minutos — **12** · informacao · aprende ciência em minutos, faixa rua alta → 12
- Resistência que Ignora Fadiga em Combate Prolongado — **8** · duracao · luta horas sem fadiga, faixa rua → 8
- Audição e Visão Aguçadas Além do Espectro Humano — **8** · distancia · distingue detalhes a ~760 m → 8
- Domina Múltiplos Idiomas e Disciplinas Quase Instantaneamente — **10** · informacao · aprendizado instantâneo, faixa rua → 10
- Combina Força, Voo e Telepatia em Combate Simultâneo — **12** · outro · mesmo pacote, regido pela força ~100 t → 12
- Telepatia — **10** · distancia · extra; mesma telepatia ~3 km → 10

**Morbius** (alto, 1)

- Mordida Transforma Vítimas em Vampiros — **8** · outro · contamina vítimas com vampirismo; faixa rua

**Mystique** (alto, 7)

- Imortalidade Lenta — **10** · duracao · envelhecimento muito lento (mais de um século); faixa rua → 10
- Rede de Espionagem Global — **12** · informacao · rede de espionagem com alcance global, mas social → 12
- Muda de Forma em Frações de Segundo em Pleno Combate — **8** · outro · troca de forma instantânea em combate; acima do pico humano → 8
- Copia Assinatura Genética o Suficiente para Enganar Exames Superficiais — **10** · outro · pareado a exames genéticos superficiais (~10)
- Mantém um Disfarce Perfeito por Anos sem Ser Detectada — **12** · duracao · disfarce por anos sem detecção; faixa rua → 12
- Transforma Roupas e Acessórios Junto com o Próprio Corpo — **8** · outro · inclui roupas/acessórios no metamorfismo → 8
- Rede de Espionagem — **12** · informacao · extra; mesma rede de espionagem → 12

**Polaris** (alto, 5)

- Manipulação de Sangue Ferroso — **12** · outro · ignora armadura via ferro do sangue; pareado a Corpo de rua (abaixo dos 14 de Magneto) → 12
- Gera Aurora Boreal Artificial ao Redor de Si — **8** · area · aurora em raio de ~760 m ao redor → 8
- Manipulação de Sangue Ferroso em Alvos Vivos — **12** · outro · mesma técnica de Manipulação de Sangue Ferroso → 12
- Inverte a Polaridade Magnética de Objetos em Área — **8** · area · raio de ~760 m → 8
- Detecta Depósitos de Metal em Escala Geológica — **14** · distancia · sente jazidas a dezenas de km (~45 km) → 14

**Professor X (Base - Cadeira de Rodas)** (alto, 11)

- Projeção Astral Física/Ofensiva — **20** · informacao · = Projeção Astral Corpórea do Professor X → 20
- Apaga Rastros da Própria Presença Mental — **20** · outro · pareado à detecção por telepatas Ômega (~20) → 20
- Planos de Contingência 42+ (Kuurth) — **12** · informacao · planejamento estratégico de alto nível → 12
- Manipula Eventos Globais Sutilmente — **20** · informacao · influência em escala país/continente → 20
- Alcance Interestelar/Interdimensional — **23** (pico 51) · distancia · entrada base: rotina com Cérebro = global 23 (ladder); o literal interestelar (1 ano-luz = 51) vai para peak
- Bloqueio Mental Planetário Total — **23** · distancia · bloqueio telepático global → 23
- Localiza Qualquer Mente no Universo — **23** (pico 51) · distancia · entrada base: texto hiperbólico; rotina com Cérebro = global 23 (ladder); literal interestelar 51 em peak
- Amplificação de Poder Psíquico Múltiplas Vezes — **23** · outro · leva a telepatia de ~20 a escala global ~23
- Integração com Satélites e Redes de Vigilância — **23** · distancia · cobertura global via satélites → 23
- Simulação de Cenários de Batalha em Tempo Real — **12** · informacao · simulação tática computacional de alto nível → 12
- Acesso a Bancos de Dados Mutantes Catalogados — **14** · informacao · banco de dados mutante abrangente → 14

**Psylocke** (alto, 4)

- Telecinesia Precisa — **5** · peso · TK fina, move ~0,7 t → 5
- Corta Vínculos Psíquicos e Mágicos com a Lâmina — **14** · outro · pareado a vínculos psíquicos de rua; não supera a lâmina → 14
- Precognição de Combate por Frações de Segundo — **9** · velocidade · antecipa golpes/disparos ~Mach 1 → 9
- Bloqueia Ataques Psíquicos com a Própria Lâmina — **14** · outro · pareado a ataques telepáticos de rua; igual à lâmina → 14

**Rachel Summers (Base - Sem Fênix)** (alto, 11)

- Link Psíquico com Família (Cable, Jean, Scott) — **18** · distancia · elo psíquico com a família em escala de país ~1.000 km
- Bloqueio de Telepatia Alheia (Resiste Invasões) — **20** · outro · pareado a invasões de telepatas fortes (~20); abaixo do escudo intransponível
- Rastreamento Mental de Mutantes Conhecidos — **21** · distancia · rastreia mutantes conhecidos em escala continental ~5.000 km
- Precisão Molecular (Cirurgia/Desarme) — **16** · outro · telecinese molecular; faixa Ômega baixa
- Manipulação de Matéria a Curta Distância (Nível Molecular) — **16** · outro · manipulação molecular a curta distância; faixa Ômega baixa
- Desarma Armas/Tecnologia à Distância — **12** · distancia · desarma armas a ~11 km (linha de visão longa)
- Controle Fino o Suficiente para Cirurgia sem Bisturi — **16** · outro · mesmo controle molecular → 16
- Visões Espontâneas de Eventos Futuros — **10** · duracao · visões espontâneas do futuro; faixa rua
- Vislumbres de Linhas Temporais Alternativas — **12** · duracao · vê linhas temporais alternativas; faixa rua alta
- Marcas Hound Permitem Rastrear Qualquer Mutante — **23** · distancia · marcas de Hound rastreiam qualquer mutante no planeta → global 23
- Imune a Maioria Controle Mental — **16** · outro · pareado a controle mental de telepatas comuns (~16)

**Rogue** (alto, 5)

- Absorção Ocorre em Segundos, Sem Necessidade de Consentimento — **20** · outro · mesma absorção (velocidade do efeito) → 20
- Retém Poderes Absorvidos Permanentemente com Contato Prolongado — **20** · outro · mesma absorção (retenção permanente) → 20
- Acessa Conhecimento e Habilidades Técnicas da Vítima — **20** · outro · mesma absorção aplicada a conhecimento/perícias → 20
- Absorve Poderes Mutantes, Sobre-Humanos e Até Cósmicos — **20** (pico 31) · outro · entrada base: mimetismo de rotina = 20 (= demais tags de absorção); absorver seres cósmicos (31) em peak
- Sentidos Aguçados — **6** · distancia · sentidos aguçados (Ms. Marvel) percebem a ~180 m → 6

**Sabretooth** (alto, 5)

- Visão Noturna — **6** · distancia · enxerga no breu a ~180 m → 6
- Conhece Fraquezas de Mutantes — **6** · informacao · conhecimento tático de inimigos (pico humano) → 6
- Imune a Dor — **8** · outro · ignora dor que derrubaria humanos; pareado a dano de rua → 8
- Resistência a Telepatia — **10** · outro · pareado a telepatas de rua (~8–12), cede a Ômegas → 10
- Envelhecimento Drasticamente Retardado — Ativo há Mais de um Século — **10** · duracao · longevidade de século+ (faixa rua, não pela coluna Tempo) → 10

**Sauron** (alto, 12)

- Transformação em Pterossauro Humanóide — **7** · peso · forma de pterossauro ergue ~3 t → 7
- Agilidade de Predador Aéreo em Voo — **6** · outro · manobra aérea de predador: pico humano/ave → 6
- Garras e Bico Cortantes em Mergulho — **7** · energia · mergulho com garras rasga chapa/tijolo (7–8) → 7
- Visão de Caçador Localiza Presas a Distância — **9** · distancia · visão de ave de rapina ~1,5 km → 9
- Converte a Energia Roubada em Força e Massa Muscular — **8** · peso · força ampliada ~6 t → 8
- Vítimas Ficam Comatosas ou Envelhecidas pela Drenagem Prolongada — **12** · outro · efeito da mesma drenagem → 12
- Drena Também Energia Psíquica e Mutante de Alvos Poderosos — **14** · outro · pareado a mutantes poderosos de rua alta → 14
- Drenagem Letal se Sustentada Além do Limite da Vítima — **12** · outro · = Drenagem de Energia Vital → 12
- Voo Sustentado por Energia Roubada Alcança Grandes Altitudes — **11** · distancia · teto de voo ~5 km → 11
- Sentidos Detectam Energia Vital de Presas à Distância — **8** · distancia · sente presas a ~760 m → 8
- Cada Drenagem Bem-Sucedida Acelera Reflexos e Cura Ferimentos — **6** · resistencia · cura acelerada leve após drenar (3–6) → 6
- Pterossauro — **7** · peso · extra; = Transformação em Pterossauro → 7

**Scalphunter** (alto, 3)

- Nunca Fica Sem Munição ou Arma em Combate — **7** · outro · mesmo armeiro instintivo → 7
- Adapta Arsenal a Qualquer Situação de Tiro — **7** · outro · mesmo armeiro instintivo → 7
- Poder Mutante — **7** · outro · extra; rótulo do armeiro instintivo → 7

**Shatterstar** (alto, 3)

- Portais Dimensionais via Espadas — **12** · distancia · portais dimensionais pelas espadas; deslocamento ~11 km
- Corta Quase Qualquer Material Conhecido — **12** · energia · lâminas de Mojoworld cortam bunker/blindagem (11–12)
- Abre Portais Dimensionais no Fio das Espadas em Pleno Duelo — **12** · distancia · mesmos portais dimensionais → 12

**Trevor Fitzroy** (alto, 3)

- Viagem Temporal — **20** · outro · viagem temporal entre eras, faixa Ômega → 20 (não usa coluna Tempo)
- Drena Energia Vital e Envelhece Vítimas ao Toque — **10** · outro · mata humanos ao toque; pareado a Corpo de rua → 10
- Viaja no Tempo Através dos Próprios Portais — **20** · outro · mesma viagem temporal → 20

**Wolverine** (alto, 5)

- Instinto Berserker — **8** · outro · fúria berserker; faixa rua
- Décadas de Experiência — **8** · outro · experiência de décadas; mesma faixa de veterano
- Séculos de Combate — **8** · outro · séculos de combate; mesma faixa de veterano
- Resistência a Telepatia — **12** · outro · mente reforçada/implantes; pareado a telepatas de rua (~12)
- Longevidade Extrema (Envelhecimento Drasticamente Retardado) — **10** · duracao · envelhecimento retardado (séculos); faixa rua

**X-23** (alto, 1)

- Envelhecimento Retardado pelo Fator de Cura — **6** · duracao · envelhecimento retardado; faixa humana alta → 6

**Anole** (medio, 1)

- Garras e Aderência a Superfícies — **4** · outro · escala paredes/teto e corta com garras (atleta) → 4

**Aurora** (medio, 2)

- Voo Supersônico — **12** · velocidade · voo ~Mach 10 (~12.000 km/h) → 12, igual a Estrela Polar
- Luz Cegante quando em contato com Northstar — **6** · area · clarão cegante com o gêmeo cobre ~180 m → 6

**Avalanche** (medio, 1)

- Demolidor — **16** · energia · extra; derruba estruturas → 16

**Banshee** (medio, 6)

- Usa ondas sonoras para defesa de área — **8** · resistencia · parede sônica desvia balas/estilhaços (7–8) → 8
- Cria barreiras vibratórias de proteção — **8** · resistencia · = defesa sônica de área → 8
- Percebe vibrações e ecos no ambiente — **6** · distancia · sonar a ~180 m → 6
- Investigação internacional e liderança de jovens mutantes — **6** · informacao · ex-Interpol: investigador de elite, pico humano → 6
- Experiência de comando em crises — **5** · informacao · comando treinado em crise (humano experiente) → 5
- Frequência Hipnótica — **7** · informacao · frequência que induz transe em humanos próximos (rua baixa) → 7

**Blindfold** (medio, 10)

- Nascida Sem Olhos e Ainda Assim Percebe Tudo — **4** · distancia · percepção do entorno sem olhos ~45 m → 4
- Precognição de Eventos Trágicos — **14** · duracao · prevê mortes e catástrofes futuras com precisão; faixa rua alta → 14
- Sente Presenças Sobrenaturais e Espíritos — **6** · distancia · percebe presenças ~campus 180 m → 6
- Interpretação de Sinais e Presságios — **10** · informacao · leitura de presságios, faixa rua → 10
- Percepção Além dos Cinco Sentidos — **8** · informacao · sexto sentido, faixa rua → 8
- Sente o Fio do Destino de Quem Está por Perto — **10** · informacao · lê destino de quem está perto, faixa rua → 10
- Detecta Mentiras pela Vibração da Voz — **6** · informacao · detector de mentiras humano no pico → 6
- Avisa Perigos Antes que Aconteçam — **14** · duracao · mesma precognição → 14
- Sente a Morte se Aproximando de Alguém — **14** · duracao · mesma precognição → 14
- Guia os Aliados por Instruções Enigmáticas Precisas — **12** · informacao · orientação precognitiva de equipe, não supera a precognição → 12

**Bling!** (medio, 1)

- Presença de Estrela — **5** · informacao · carisma de estrela; faixa humana alta

**Blob** (medio, 1)

- Nenhuma Sensibilidade à Dor Física — **6** · resistencia · insensível à dor: ignora ferimentos no pico humano → 6

**Boomer** (medio, 1)

- Usa o próprio impulso explosivo para acrobacias e fuga — **5** · velocidade · impulso explosivo ~80 km/h → 5

**Cable (Suprimido)** (medio, 4)

- Metade do Corpo Cibernético — **8** · resistencia · metade do corpo techno-orgânico: aguenta balas/vira caminhão (7–8)
- Interface Tecnológica Universal — **10** · informacao · interface com qualquer tecnologia pelo T-O; faixa rua
- Link Psíquico com Hope — **12** · distancia · elo psíquico com Hope em escala de cidade ~11 km
- Dispositivo Teletransporte Temporal — **23** · distancia · bodyslide/teletransporte temporal alcança qualquer ponto do globo → 23

**Caliban** (medio, 1)

- Conhece túneis, refúgios e rotas de fuga subterrâneas — **4** · informacao · conhecimento local de túneis Morlock → 4

**Cameron Hodge** (medio, 1)

- Imortalidade Pela Preservação da Cabeça — **16** · resistencia · cabeça preservada "virtualmente indestrutível" (16–18) → 16

**Cannonball** (medio, 5)

- Coordena jovens mutantes sob pressão — **5** · informacao · liderança de campo treinada → 5
- Toma decisões de resgate rapidamente — **5** · informacao · decisão tática rápida (humano treinado) → 5
- Mantém a equipe unida em crise — **5** · informacao · liderança social de campo → 5
- Liderança Natural — **5** · informacao · extra; = liderança de campo → 5
- Liderança Natural e Leal — **5** · informacao · extra; = liderança de campo → 5

**Dazzler** (medio, 2)

- Transforma uma apresentação em distração ou sinalização tática — **5** · informacao · performance como distração/sinal → 5
- Força Sonora como Disco — **8** · energia · extra; mesmo ataque sonoro/luz → 8

**DJ** (medio, 8)

- Amplificação de Frequências Ofensivas — **6** · energia · = manipulação sônica → 6
- Criação de Barreiras Sonoras — **6** · resistencia · barreira para golpes/pedaços de pico humano → 6
- Controle de Volume e Tom à Vontade — **3** · outro · controle fino de som, utilidade menor → 3
- Scratches que Distorcem a Realidade Sonora Local — **5** · informacao · ilusão auditiva local → 5
- Batidas que Desorientam Inimigos — **6** · outro · desorienta humanos/atletas próximos → 6
- Mixagem de Efeitos em Tempo Real — **4** · outro · combina efeitos sônicos na hora → 4
- Amplificadores Portáteis Improvisados — **4** · outro · equipamento que reforça o alcance sônico (~45 m) → 4
- Loop de Batidas para Sustentar Efeitos — **4** · outro · mantém efeito sem esforço por uma cena → 4

**Dríade** (medio, 1)

- Enredamento por Raízes e Cipós — **6** · peso · raízes/cipós prendem ~1,5 t (carro) → 6

**Empath** (medio, 1)

- Tortura Psicológica — **9** · informacao · uso sádico da mesma projeção emocional → 9

**Espectro** (medio, 2)

- Evasão e Fuga — **6** · outro · fuga de especialista com intangibilidade: pico humano → 6
- Observador Perspicaz — **5** · informacao · observação atenta (humano alto) → 5

**Espinho** (medio, 2)

- Manto Perfurante — **4** · outro · espinhos punem quem toca; dano de atleta → 4
- Cobertura de Supressão — **3** · area · rajada cobre raio ~24 m → 3

**Forge** (medio, 5)

- Usa conhecimento espiritual Cheyenne em rituais e proteção — **8** · outro · rituais xamânicos de proteção; faixa rua
- Reconhece ameaças místicas além da tecnologia — **8** · informacao · percebe ameaças místicas; faixa rua
- Xamã Cheyenne — **8** · outro · extra; mesmos rituais xamânicos → 8
- Neutralizador de Mutantes — **16** · outro · Neutralizador pareado aos poderes que anulou (Tempestade ~16)
- Perna e Mão Protéticas de Alta Tecnologia (próprias) — **5** · outro · próteses de alta tecnologia com função de pico humano

**Garoto Chuva** (medio, 2)

- Fisiologia Aquática — **7** · resistencia · corpo de água deixa golpes e balas passarem (7-8) → 7
- Fluidez que Absorve Golpes — **7** · resistencia · mesma fluidez → 7

**Glob Herman** (medio, 4)

- Corpo Ceroso e Translúcido Extremamente Maleável — **5** · outro · deforma o corpo de cera para passar/esquivar (pico humano) → 5
- Flutua Levemente ao Se Tornar Mais Leve com o Calor — **1** · velocidade · flutuação lenta, poucos km/h → 1
- Rajadas de Fogo Ainda Instáveis — **5** · energia · instável mas usado: rajada de fogo ~ arromba porta → 5
- Aquecimento Corporal Controlado — **3** · outro · aquece o corpo para amolecer/flutuar (humano) → 3

**Harpoon** (medio, 1)

- Arpões Energéticos — **18** · outro · ignoram invulnerabilidade, ferem Colossus em aço: pareado ao Corpo de aço do Colossus (18) → 18

**Indra** (medio, 1)

- Ancoragem Inabalável — **7** · peso · se ancora contra empuxo de ~3–6 t → 7

**Karma** (medio, 2)

- Controla o Corpo Possuído com Precisão Motora Total — **10** · outro · usa perícia/corpo do hospedeiro com precisão total (faixa rua) → 10
- Imune a Contra-Possessão — **12** · outro · pareado a possessores/telepatas de rua alta (~12) → 12

**Kidogo** (medio, 4)

- Alteração de Tamanho (formiga a gigante) — **10** · outro · de formiga a gigante ~20 m; faixa rua → 10
- Força Proporcional ao Tamanho — **11** · peso · gigante ~20 m ergue ~50 t → 11
- Resistência Colossal quando Grande — **10** · resistencia · gigante aguenta artilharia leve → 10
- Furtividade quando Minúsculo — **10** · informacao · tamanho de formiga, quase indetectável → 10

**Larry Trask** (medio, 1)

- Precognição — **8** · duracao · visões do futuro próximo de mutantes, distorcidas (faixa rua, não pela coluna Tempo) → 8

**Leech** (medio, 1)

- Presença Cativante Apesar da Aparência — **5** · informacao · presença social marcante (humano alto) → 5

**Lifeguard** (medio, 2)

- Adaptação Reativa a Ameaças — **10** · outro · gera asas/escamas/força conforme a ameaça; faixa rua → 10
- Poderes Mudam Conforme o Perigo — **10** · outro · mesma adaptação reativa → 10

**Lockheed** (medio, 1)

- Parece Animal de Estimação — **6** · informacao · passa por mascote: disfarce/subestimação; faixa humana alta

**Lorelei** (medio, 1)

- Imunidade a Ataques Baseados em Som — **9** · outro · pareado a ataques sonoros típicos (grito de Banshee/Siryn ~9)

**Madrox** (medio, 8)

- Absorve impacto para criar duplicatas de si mesmo — **10** · outro · dezenas a centenas de cópias por impacto: faixa rua → 10
- Envia duplicatas para tarefas simultâneas e perigosas — **10** · outro · = criação de duplicatas → 10
- Reintegra memórias e habilidades aprendidas por uma duplicata — **10** · informacao · absorve perícias/memórias de muitas cópias → 10
- Distribui duplicatas para vigilância, entrevistas e busca de pistas — **12** · distancia · cópias cobrem uma cidade inteira ~11 km → 12
- Monta conclusões cruzando experiências de várias cópias — **7** · informacao · dedução com dados de várias cópias, acima do pico humano → 7
- Adapta planos quando uma cópia descobre informação nova — **5** · informacao · adaptação tática de humano treinado → 5
- Criação de Duplicatas ao Impacto — **10** · outro · extra; = criação de duplicatas → 10
- Absorção de Duplicatas com Memórias e Habilidades — **10** · informacao · extra; = reintegração → 10

**Marrow** (medio, 1)

- Dois Corações — **4** · resistencia · segundo coração: sobrevive a ferimento cardíaco → 4

**Masque** (medio, 1)

- Usa a transformação para intimidação e controle social — **6** · informacao · intimidação/controle dos Morlocks (pico humano) → 6

**Match** (medio, 7)

- Resistência Total a Calor e Fogo — **10** · outro · "total": pareado a ataques de fogo de rua (Pyro ~10) → 10
- Controle de Intensidade da Chama — **5** · outro · controle fino da chama (utilidade) → 5
- Escudo de Chamas Defensivo — **6** · resistencia · escudo detém golpes/projéteis de pico humano → 6
- Manobras Aéreas Agressivas em Combate — **5** · outro · manobra aérea ágil (humano alto) → 5
- Aterrissagens Explosivas Controladas — **6** · energia · impacto flamejante amassa carro (5–6) → 6
- Trilhas de Fumaça para Cobertura — **3** · area · cortina de fumaça raio ~25 m → 3
- Explosões de Curto Alcance ao Pousar — **6** · energia · = aterrissagem explosiva → 6

**Mercenário Weapon X** (medio, 2)

- Armamento Anti-Mutante Especializado — **16** · outro · supressores de cura pareados ao fator de cura de Wolverine/X-23 de rotina (16) → 16
- Inibidores de Telepatia Portáteis — **12** · outro · pareado a telepatas típicos de rua (~12) → 12

**Mesmero** (medio, 6)

- Comandos Pós-Hipnóticos Permanentes — **10** · duracao · comandos pós-hipnóticos persistentes; faixa rua → 10
- Engana Telepatas (Ilusão de Controle) — **14** · outro · pareado a telepatas de rua alta (~14)
- Resistente a Scanners Psíquicos Convencionais — **12** · outro · pareado a scanners psíquicos convencionais (~12)
- Mantém Controle à Distância Após Contato Visual Inicial — **12** · distancia · mantém controle à distância de cidade (~11 km) → 12
- Rede de Agentes Hipnotizados Globais — **12** · informacao · rede de agentes hipnotizados (alcance social global, não do poder) → 12
- Chantageia Autoridades com Segredos Extraídos por Hipnose — **10** · informacao · chantagem com segredos extraídos → 10

**Mira (Pinpoint)** (medio, 3)

- Localiza Assinaturas Energéticas — **10** · distancia · detecta assinaturas a ~3 km → 10
- Nunca se Perde (literalmente) — **8** · informacao · orientação infalível (faixa rua) → 8
- Raciocínio Analítico e Frio — **5** · informacao · análise fria de humano excepcional → 5

**Mirage** (medio, 5)

- Percebe a carga emocional que guia uma ilusão — **8** · informacao · leitura empática de emoções (rua) → 8
- Comunica-se empaticamente com animais próximos — **4** · distancia · elo com animais próximos ~45 m → 4
- Encontra rastros e perigos com auxílio de animais — **8** · distancia · animais batedores ampliam percepção a ~760 m → 8
- Acalma criaturas assustadas ou hostis — **6** · informacao · acalma animais selvagens (pico humano+) → 6
- Ligação Empática com Animais — **6** · informacao · extra; elo empático com animais → 6

**Moça de Borracha** (medio, 2)

- Elasticidade e Maleabilidade Total — **8** · outro · elasticidade total, faixa rua → 8
- Molda-se a Qualquer Forma — **8** · outro · mesma elasticidade → 8

**Náiade** (medio, 2)

- Manipula Grandes Volumes de Água — **11** · peso · move grandes volumes de água ~50 t (onda/piscina) → 11
- Purifica ou Contamina Água — **5** · outro · purifica/contamina água; faixa humana alta

**Noturno** (medio, 1)

- Visão no Escuro — **6** · distancia · enxerga no breu a ~180 m → 6

**Onyxx** (medio, 1)

- Condicionamento Bruto — **6** · resistencia · vigor físico de pico humano → 6

**Pixie** (medio, 1)

- Controle Fino sobre a Concentração do Pó — **6** · outro · dosa a concentração do pó; faixa humana alta

**Preview** (medio, 4)

- Visões Fragmentadas de Segundos no Futuro — **6** · duracao · visões de segundos à frente; faixa humana alta → 6
- Compartilha Visões por Contato com Aliados — **6** · informacao · compartilha visões por contato → 6
- Reconhece Padrões de Ameaça Repetidos — **5** · informacao · reconhece padrões de ameaça (pico humano) → 5
- Instinto Aguçado para Ler Intenções — **5** · informacao · lê intenções no pico humano → 5

**Prodigy** (medio, 3)

- Combina competências de colegas para resolver problemas de campo — **8** · informacao · soma perícias de vários colegas → 8
- Estuda padrões, pessoas e missões com disciplina metódica — **6** · informacao · análise metódica: pico humano → 6
- Experiência de liderança entre os Jovens X-Men — **5** · informacao · liderança estudantil treinada → 5

**Radian** (medio, 3)

- Absorção de Luz Ambiente para Recarregar o Poder — **4** · outro · recarrega com luz ambiente; utilidade faixa humana
- Refração que Desvia Ataques à Distância — **7** · resistencia · refração desvia ataques à distância (balas/rajadas de rua baixa) → 7
- Constructos Sólidos de Luz de Curta Duração — **5** · resistencia · constructos de luz breves: barreira de pico humano

**Rede (Network)** (medio, 1)

- Empatia Crescente — **3** · informacao · empatia em desenvolvimento (humano) → 3

**Redneck** (medio, 6)

- Golpes que Derrubam Estruturas — **8** · energia · derruba parede de tijolo / pequena estrutura (7–8) → 8
- Salto de Longa Distância com as Pernas Reforçadas — **4** · distancia · salto de ~45 m → 4
- Ancoragem Física para Resistir a Empurrões — **7** · outro · resiste a empurrões até sua força (~3 t) → 7
- Presença Intimidadora pelo Tamanho — **4** · informacao · intimidação física (humano alto) → 4
- Estabilidade Total ao Segurar Posição em Combate — **7** · outro · = ancoragem → 7
- Amortece Quedas de Grande Altura — **6** · resistencia · cai de ~30 m sem dano (pico humano+) → 6

**Rockslide** (medio, 4)

- Desmonta membros para escapar, atacar de ângulos incomuns ou atravessar obstáculos — **5** · distancia · controla partes soltas a ~90 m → 5
- Desmontagem e Remontagem Telecinética — **5** · distancia · extra; mesma desmontagem, ~90 m → 5
- Cabeça como Projétil — **8** · energia · arremessa a própria cabeça de rocha: derruba parede/vira caminhão (7–8) → 8
- Sem Sistema Nervoso Convencional — **8** · outro · imune a dor/golpes nervosos; pareado a ataques de rua → 8

**Roulette** (medio, 1)

- Discos de Sorte/Azar — **9** · outro · efeitos de sorte/azar até paralisia ao toque: pareado ao Corpo/Vontade de alvos de rua → 9

**Sage** (medio, 2)

- Pode Catalisar Mutações Latentes em Outros — **12** · outro · pareado a poderes latentes de rua que desperta → 12
- Invade Qualquer Sistema Computacional Sem Ferramentas — **12** · informacao · hackeia sistemas sem equipamento, faixa rua alta → 12

**Scrambler** (medio, 2)

- Interferência em Sistemas Elétricos e Biológicos — **10** · outro · anulação ao toque pareada a mutantes de rua típicos e eletrônicos (~10)
- Desativa Poderes Mutantes ao Toque — **10** · outro · mesma anulação ao toque → 10

**Sentinela Mark I** (medio, 1)

- Supressores de Mutação — **12** · outro · extra; pareado aos poderes de mutantes de rua típicos (~10–12) → 12

**Sentinela Mk I** (medio, 2)

- Detector de Mutação por DNA — **9** · distancia · varredura de mutantes a ~1,5 km → 9
- Supressor de Poderes — **12** · outro · modelo antigo: pareado a mutantes de rua típicos (~12) → 12

**Shinobi Shaw** (medio, 2)

- Intangibilidade — **12** · outro · atravessa matéria e ataques; pareado a ataques típicos de rua (tanque ~12) → 12
- Tecnopatia — **—** · — · rótulo de tema trocado (o poder é Intangibilidade); sem feito

**Siryn** (medio, 2)

- Ergue barreiras vibratórias de curta duração — **7** · resistencia · barreira vibratória desvia balas leves → 7
- Frequência Hipnótica — **7** · informacao · compulsão hipnótica pela voz em humanos próximos → 7; = mesma tag do Banshee

**Slipstream** (medio, 1)

- Portais de Energia para Teletransporte — **18** (pico 22) · distancia · portais de onda cruzam ~1.000 km de rotina (estado/país) → 18; pico intercontinental

**Stacy X** (medio, 3)

- Feromonas — **9** · informacao · feromônios ao toque dominam emoções/corpo do alvo: pareado à Vontade de alvos de rua → 9
- Camuflagem de Pele — **7** · informacao · pele reptiliana se mistura ao ambiente (camuflagem parcial) → 7
- Presença Sexual Dominante — **6** · informacao · presença social/sedução forte (pico humano) → 6

**Sunspot** (medio, 2)

- Voa usando energia absorvida — **8** · velocidade · voo carregado ~640 km/h
- Voo em Forma Solar — **8** · velocidade · extra; mesmo voo solar → 8

**Surge** (medio, 2)

- Usa impulsos elétricos para velocidade e reflexos breves — **8** · velocidade · rajadas de velocidade ~640 km/h → 8
- Velocidade em Rajadas Elétricas — **8** · velocidade · extra; mesma velocidade ~640 km/h → 8

**Tag** (medio, 4)

- Cópia Temporária de Poderes por Toque — **10** · outro · pareado aos poderes copiados, tipicamente colegas de rua (~8–12) → 10
- Absorção de Habilidades e Talentos Alheios — **10** · outro · mesma cópia por toque → 10
- Retém Cópia por Minutos Após o Contato — **4** · duracao · janela de poucos minutos (faixa humana, não pela coluna Tempo) → 4
- Combina Múltiplas Cópias em Sequência — **10** · outro · encadeia cópias; teto = cópia de rotina → 10

**Tarot** (medio, 2)

- Invocação de Arquétipos do Tarô — **9** · energia · figuras das cartas lutam e partem concreto armado (9–10) → 9
- Precognição Limitada via Leitura de Cartas — **5** · duracao · vislumbres vagos do futuro próximo: faixa humana alta → 5

**Tattoo** (medio, 10)

- Tatuagens na Própria Pele Ganham Vida ao Se Soltarem — **6** · outro · criaturas de tinta com força de fera/pico humano → 6
- Criaturas de Tinta que Obedecem seus Comandos — **6** · outro · mesmas criaturas → 6
- Múltiplas Tatuagens Ativas Simultaneamente — **6** · outro · mesmas criaturas em grupo → 6
- Redesenha Novas Tatuagens sob a Pele em Minutos — **6** · outro · repõe criaturas, mesmo poder → 6
- Controla a Textura e Cor das Criaturas de Tinta — **5** · informacao · disfarce/adaptação das criaturas, faixa humana alta → 5
- Sente Tudo que Suas Criaturas Percebem — **6** · distancia · elo sensorial ~180 m → 6
- Coordenação Tática entre as Criaturas — **5** · informacao · coordenação de enxame, faixa humana alta → 5
- Reforma as Tatuagens Após Serem Destruídas — **6** · resistencia · criaturas voltam após destruídas → 6
- Formação de Enxame para Emboscadas — **4** · area · enxame cobre ~45 m → 4
- Camuflagem das Criaturas contra Superfícies Escuras — **6** · informacao · camuflagem no escuro, abaixo de Noturno (8) → 6

**Timeslip** (medio, 5)

- Salta no tempo em curtas janelas e retorna com informação útil — **8** · duracao · saltos temporais curtos com retorno; faixa rua baixa
- Enxerga consequências próximas antes de agir — **6** · duracao · vê consequências próximas; faixa humana alta
- Evita um perigo imediato reposicionando-se no fluxo temporal — **8** · outro · sai do fluxo temporal para evitar perigo imediato; pareado a ataques de rua
- Salto Temporal — **8** · duracao · extra; mesmo salto temporal → 8
- Precognição Limitada ao Imediato — **6** · duracao · extra; precognição do imediato → 6

**Tower** (medio, 1)

- Crescimento até 15 Metros — **11** · peso · gigante de 15 m: força ~50 t → 11 (a altura em si = 2)

**Trance** (medio, 6)

- Invisibilidade e Intangibilidade na Forma Astral — **10** · outro · intocável/invisível exceto a psíquicos; pareado a ataques físicos de rua → 10
- Retorno Instantâneo ao Corpo em Emergências — **6** · outro · volta instantânea do alcance astral (~180 m) → 6
- Atravessa Paredes e Barreiras Físicas na Forma Astral — **10** · outro · mesma intangibilidade astral → 10
- Sente Perigo se Aproximar do Corpo Físico — **6** · distancia · sente o corpo dentro do alcance astral ~180 m → 6
- Resistência ao Medo em Ambientes Sobrenaturais — **6** · outro · pareado a medo sobrenatural de nível humano alto → 6
- Empatia Silenciosa que Acalma — **3** · informacao · acalma colegas (empatia humana alta) → 3

**Trovão** (medio, 3)

- Ondas de Choque Sônicas pela Voz — **12** (pico 16) · energia · rotina parte tanque/bunker (11–12) → 12; a descrição diz "derrubar edifícios" (prédio pequeno 16)
- Gera Trovões e Vibrações — **10** · energia · trovão/vibração parte concreto armado (9–10) → 10
- Ataque em Área Ensurdecedor — **5** · area · ensurdece num raio de ~90 m → 5

**Umbra** (medio, 1)

- Ataques a partir da Penumbra — **5** · outro · golpe surpresa vindo da sombra, pico humano → 5

**Unus** (medio, 1)

- Força Aumentada Dentro do Campo — **7** · peso · campo amplia força/empuxo ~3 t → 7

**Vic Slaughter** (medio, 1)

- Distorção Corporal (pode estender membros) — **1** · distancia · estende membros a ~6 m → 1

**Wallflower** (medio, 2)

- Percebe reações sociais e usa discrição para evitar conflito — **5** · informacao · leitura social, faixa humana alta → 5
- Invisível — **8** · informacao · passa despercebida via feromônios, quase invisível socialmente → 8

**Wind Dancer** (medio, 3)

- Criação de Redemoinhos Defensivos — **6** · resistencia · redemoinho desvia detritos e projéteis leves → 6
- Sente Mudanças Climáticas Iminentes — **9** · distancia · sente frentes climáticas a ~1,5 km → 9
- Habilidade para Unir o Grupo — **4** · informacao · une o grupo; social humano treinado → 4

**Wing** (medio, 6)

- Voo Instável mas Funcional — **4** · velocidade · voo instável ~40 km/h → 4
- Casulo Protetor Improvisado com as Asas — **3** · resistencia · asas frágeis seguram golpe humano forte → 3
- Camuflagem Parcial ao Dobrar as Asas — **3** · informacao · esconde as asas (humano) → 3
- Salto Impulsionado pelas Asas em Emergências — **3** · distancia · salto assistido ~25 m → 3
- Percepção Sensorial Ampliada nas Antenas em Formação — **3** · distancia · antenas ainda em formação, já usadas: ~25 m → 3
- Resistência a Toxinas Ambientais — **4** · outro · pareado a poluentes/toxinas comuns → 4

**Wither** (medio, 11)

- Toque que Apodrece Carne e Matéria Vegetal — **9** · outro · apodrece tecido vivo ignorando Corpo orgânico (árvores, humanos, super-humanos de carne): pareado a Corpo de rua → 9
- Desidratação Instantânea ao Contato — **9** · outro · = toque que apodrece → 9
- Controle sobre a Velocidade da Decomposição — **5** · outro · dosa a decomposição (utilidade) → 5
- Sente a Vitalidade de Seres Próximos — **3** · distancia · sente vida a ~25 m → 3
- Pode Direcionar o Apodrecimento a Distância Curta — **1** · distancia · apodrece a ~6 m → 1
- Golpes Físicos com a Mão Óssea — **3** · energia · golpe humano treinado → 3
- Resistência a Dor na Extremidade Afetada — **3** · resistencia · tolerância à dor localizada (humano alto) → 3
- Presença Intimidadora em Combate — **4** · informacao · intimidação (humano alto) → 4
- Precisão Cirúrgica no Toque — **5** · outro · toque preciso (pico humano baixo) → 5
- Treinamento Rigoroso da Academia Hellfire — **5** · outro · treino de combate rigoroso → 5
- Disciplina de Combate Silenciosa — **5** · outro · combate furtivo disciplinado → 5

**Wolf Cub** (medio, 3)

- Uivo que Coordena Aliados a Distância — **9** · distancia · uivo audível ~1,5 km → 9
- Visão Noturna Aprimorada — **6** · distancia · enxerga no escuro ~180 m (igual Noturno) → 6
- Energia Física Incansável — **5** · duracao · fôlego de atleta extremo, faixa humana alta → 5

**Wolfsbane** (medio, 1)

- Protege aliados com lealdade feroz e leitura instintiva de perigo — **6** · outro · leitura instintiva de perigo ao proteger aliados; faixa humana alta

**Xenônio** (medio, 2)

- Forma Gasosa Evasiva — **8** · outro · intangível em gás; pareado a ataques físicos de rua → 8
- Surge e Some sem Aviso — **5** · informacao · furtividade de humano excepcional → 5

**Adepto (Magneto)** (baixo, 1)

- Poder Mutante de Baixo Nível — **4** · outro · poder genérico modesto: uso típico de atleta/humano alto → 4

**Agente HYDRA** (baixo, 1)

- Tecnologia de Supressão de Mutantes — **10** · outro · pareado a mutantes de rua típicos que suprime (~10) → 10

**Cargill** (baixo, 1)

- Força Sobrehumana — **7** · peso · ergue ~3 t (vira carro/caminhão leve) → 7

**Flubber** (baixo, 3)

- Massa Gelatinosa e Elástica — **6** · resistencia · corpo gelatinoso absorve impactos contundentes de pico humano → 6
- Maleabilidade Extrema — **5** · outro · estica/deforma o corpo livremente (utilidade) → 5
- Espreme-se por Qualquer Fresta — **6** · outro · passa por frestas mínimas: contorna portas/barreiras comuns → 6

**Henry Gyrich** (baixo, 1)

- Burocracia como Arma — **12** · informacao · burocracia federal restringe operações em escala nacional; social → 12

**Impulse** (baixo, 1)

- Explosão Cinética — **6** · energia · estouro cinético amassa carro (5–6) → 6

**Moira MacTaggert** (baixo, 1)

- Mutante Secreta — **18** · duracao · reencarnação com memória (reinicia a linha do tempo); faixa Ômega por utilidade

**Timeshadow** (baixo, 1)

- Ilusões Temporais de Si Mesma — **6** · informacao · cópias ilusórias passadas/futuras confundem oponentes próximos (pico humano) → 6

**Toad** (baixo, 1)

- Secreção Pegajosa — **2** · outro · gosma prende um adulto ~90 kg → 2

**Val Cooper** (baixo, 1)

- Força de Vontade Acima da Média — **4** · outro · vontade acima da média: resiste a pressão/intimidação; faixa humana

## Perigo: extremo

### Apocalipse (En Sabah Nur) — vilao

Atributos: destreza 6, força 15, corpo 15, inteligência 12, vontade 14, mente 11, influência 10, aura 12, espírito 13

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Manipulação Molecular do Próprio Corpo | 20 |  | outro | poder-assinatura Ômega: remodela o corpo inteiro em segundos (faixa Ômega 16–30) → 20 | media |
| Tecnologia Celestial | 22 |  | outro | nave/tecnologia Celestial: além da ciência terrestre em escala de porta-aviões (~100 kt) → 22 | baixa |
| Imortalidade Real | 20 |  | duracao | 5.000+ anos sem envelhecer; faixa Ômega (não pela coluna Tempo) → 20 | media |
| Altera Próprio Corpo a Nível Atômico | 20 |  | outro | mesma capacidade de Manipulação Molecular do Próprio Corpo → 20 | media |
| Aumenta Tamanho e Massa | 14 | 18 | peso | cresce a gigante de dezenas de metros; ergue ~400 t (747) de rotina → 14; pico ~6 kt → 18 | media |
| Cria Armas do Próprio Corpo | 13 |  | energia | lâminas/canhões do corpo cortam titânio e blindagem antitanque → 13 | media |
| Regeneração Instantânea | 18 |  | resistencia | regenera quase tudo instantaneamente (faixa 18–22) → 18 | media |
| Camuflagem/Disfarce Total (Muda Aparência à Vontade) | 12 |  | informacao | metamorfose perfeita de aparência; engana inspeção comum (faixa rua alta) → 12 | media |
| Fortalece Estruturas Ósseas e Musculares Sob Impacto | 18 |  | resistencia | endurece sob impacto: "virtualmente indestrutível" (16–18) → 18 | media |
| Adapta Fisiologia a Qualquer Ambiente Hostil | 16 |  | resistencia | sobrevive vácuo, fundo do mar, radiação → 16 | media |
| Absorve Energia de Ataques Para Regenerar | 16 |  | outro | pareado a rajadas de mutantes de rua/Ômega baixo (~13–18) → 16 | baixa |
| Estica/Deforma Membros para Alcance e Ataque | 4 |  | distancia | estica braços ~30–45 m → 4 | media |
| Cria Órgãos Redundantes (Sobrevive a Ferimentos Letais) | 16 |  | resistencia | sobrevive a ferimentos letais com órgãos de reserva (13–16) → 16 | media |
| Armadura Celestial Indestrutível | 20 |  | resistencia | armadura Celestial aguenta artilharia pesada/heróis de topo (19–21) → 20 | media |
| Teletransporte Interestelar | 23 | 51 | distancia | entrada base: rotina na Terra via nave = qualquer ponto do globo 23; literal interestelar (51) em peak | baixa |
| Acesso a Conhecimento Cósmico | 22 |  | informacao | conhecimento Celestial acumulado; muito além da ciência terrestre (faixa Ômega alta) → 22 | baixa |
| Os Quatro Cavaleiros | — |  | — | servos/relacionamento, não capacidade própria | alta |
| Darwinismo Social Extremo | — |  | — | ideologia | alta |
| Primeiro Mutante Registrado da Terra | — |  | — | histórico | alta |
| Pestilência (Fome) | — |  | — | cavaleiro (servo), não capacidade própria | media |
| Guerra (Conflito) | — |  | — | cavaleiro (servo), não capacidade própria | media |
| Fome (Escassez) | — |  | — | cavaleiro (servo), não capacidade própria | media |
| Morte (Fim) | — |  | — | cavaleiro (servo), não capacidade própria | media |
| Apocalipse os Empodera | 16 |  | outro | concede/amplifica poderes (Arcanjo, etc.) a nível Ômega baixo (16) → 16 | baixa |
| Escolhe Cavaleiros Baseado em Trauma/Potencial Oculto | — |  | — | critério narrativo de recrutamento | media |
| Cavaleiros Recebem Armamento e Poderes Amplificados | 16 |  | outro | mesma capacidade de Apocalipse os Empodera → 16 | baixa |
| Substitui Cavaleiro Caído Instantaneamente | — |  | — | narrativo/estrutura da organização | media |
| Coordena os Quatro em Táticas de Conquista Global | 14 |  | informacao | estrategista milenar de conquista hemisférica (faixa rua alta) → 14 | media |
| Vínculo Psíquico de Controle Sobre os Cavaleiros | 20 |  | distancia | controla os cavaleiros a distância continental (~3.000 km) → 20 | baixa |
| Primeiro Mutante _(extra)_ | — |  | — | histórico | alta |
| Sobrevivência do Mais Forte _(extra)_ | — |  | — | ideologia | alta |
| Juiz Universal _(extra)_ | — |  | — | papel/autoimagem | alta |
| Quatro Cavaleiros _(extra)_ | — |  | — | servos/relacionamento | alta |

### Apocalipse (Com Tecnologia Celestial Completa) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Invulnerabilidade Quase Absoluta | 40 |  | resistencia | variante cósmica: aguenta devastação regional/continental (31–45) → 40 | baixa |
| Força Classe 100+ (Move Montanhas/Placas Tectônicas) | 43 | 70 | peso | o texto é o feito: move montanha massiva ~1,6×10¹¹ t (Everest) → 43; placa tectônica ~10¹⁹ t → ~70 | media |
| Teletransporte Interestelar Instantâneo | 53 |  | distancia | estrela mais próxima ~4,2 anos-luz: 51 + log2(4,2) → 53 | media |
| Projeção Energia Cósmica (Olhos/Mãos) | 28 | 35 | energia | variante cósmica: arrasa distrito/cidade (25–30) → 28; pico região ~35 | baixa |
| Campo de Força Planetário | 21 |  | area | o texto é o feito: raio da Terra ~6.400 km → 21 (= Escudo Global do Magneto) | media |
| Voo Velocidade da Luz | 29 |  | velocidade | c ≈ 1,08×10⁹ km/h ÷ 2,5 → log2(4,3×10⁸) ≈ 28,7 → 29 | media |
| Interface Direta com Nave Celestial | 31 |  | outro | comanda nave Celestial: pareado à faixa cósmica (31+) → 31 | baixa |
| Auto-Reparo Instantâneo da Armadura | 22 |  | resistencia | regenera de quase nada instantaneamente (topo de 18–22) → 22 | media |
| Módulos de Combate Reconfiguráveis (Lâminas/Canhões) | 22 |  | energia | canhões celestiais derrubam arranha-céu (22–24) → 22; abaixo da projeção cósmica | baixa |
| Escudo Anti-Energia Cósmica (Resiste Golpes de Entidades Cósmicas) | 40 |  | outro | pareado a golpes de entidades cósmicas (faixa 31–45) → 40, = Invulnerabilidade | baixa |
| Transmuta Matéria em Escala Maciça | 30 |  | peso | transmuta massa de montanha pequena ~24 Mt → 30 | baixa |
| Cria Vida/Seres Artificiais | 25 |  | outro | cria seres vivos artificiais: faixa Ômega alta → 25 | baixa |
| Reescreve DNA Global (Vírus Meta) | 21 |  | area | o texto é o feito: alcance planetário, raio da Terra 6.400 km → 21 | media |
| Adaptação Instantânea a Qualquer Ameaça | 30 |  | outro | pareado às ameaças Ômega/cósmicas que enfrenta (topo 16–30) → 30 | baixa |
| Absorve Poderes/Energia de Inimigos | 30 |  | outro | pareado aos alvos Ômega que absorve (16–30) → 30 | baixa |
| Tecnologia Milhões Anos Avançada | 30 |  | informacao | muito além da ciência terrestre (13–15); tecnologia Celestial → faixa cósmica 30 | media |
| Engenharia Genética Divina | 28 |  | informacao | engenharia genética de nível Celestial, muito acima de Sinister (15) → 28 | media |
| História/Mapa do Universo Conhecido | 35 |  | informacao | conhecimento de escala cósmica (31+) → 35 | baixa |
| Conhece Fraquezas de Quase Todos Seres | 30 |  | informacao | conhecimento estratégico cósmico → 30 | baixa |
| Pestilência: Doenças/Pragas Globais | 21 |  | area | o texto é o feito: pragas globais, raio da Terra → 21 | media |
| Guerra: Conflito/Violência Amplificada | 20 |  | informacao | influência social em escala país/continente (18–21) → 20 | baixa |
| Fome: Escassez/Colapso Recursos | 20 |  | area | colapso de recursos em escala de país (2.800 km) → 20 | baixa |
| Morte: Fim/Entropia Personificada | 25 |  | energia | entropia/morte em massa: distrito → cidade (25–30) → 25 | baixa |
| Apocalipse os Empodera com Tech Celestial | 25 |  | outro | concede poderes de nível Ômega aos Cavaleiros (16–30) → 25 | baixa |
| Reescreve Biosfera Planetária | 21 |  | area | o texto é o feito: biosfera inteira, raio da Terra → 21 | media |
| Exércitos Tecnorgânicos Infinitos | 25 |  | outro | exércitos ilimitados: faixa Ômega alta → 25 | baixa |
| Domina Civilizações Inteiras em Dias | 24 |  | informacao | domínio social em escala global (23–24) → 24 | media |
| Subjugou Deuses/Eternos/Deviantes | — |  | — | histórico (feito passado), não capacidade de rotina | media |

### Cable (Nathan Summers) — geracaox

Atributos: destreza 8, força 10, corpo 10, inteligência 10, vontade 11, mente 10, influência 7, aura 8, espírito 10

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Guerrilheiro de Elite | 6 |  | outro | décadas de guerra no futuro: soldado no pico humano → 6 | media |
| Armamento de Alto Calibre | 10 |  | energia | rifles de plasma do futuro partem blindado leve/concreto armado → 10 | media |
| Braço e Olho Biônicos TOV | 8 |  | peso | braço TOV vira caminhão/ergue ~6 t → 8 | baixa |
| Telepatia e Telecinesia Suprimidas | — |  | — | restrição: poderes presos contendo o vírus TOV (fraqueza disfarçada) | media |
| Pai Adotivo de Hope Summers | — |  | — | relacionamento | alta |
| Liderança da X-Force | 8 |  | informacao | comanda esquadrão de elite em operações (faixa rua) → 8 | media |
| Estrategista Pós-Apocalíptico | 10 |  | informacao | planeja guerras inteiras no futuro, acima do pico humano → 10 | media |
| Telepatia de Nível Ômega (Suprimida) | 8 | 23 | distancia | uso suprimido de rotina: comunicação/sondagem ~1 km → 8 (desbloqueada, peak global ~23) | baixa |
| Telecinese Massiva (Suprimida) | 8 | 20 | peso | suprimida: rotina ~6 t (caminhão) → 8; desbloqueada ergue navios (peak ~20) | baixa |
| Precognição Tática | 8 |  | duracao | lampejos táticos de segundos/minutos, faixa rua → 8 | baixa |
| Link Psíquico com Hope | 12 |  | distancia | elo psíquico com Hope em escala de cidade ~11 km → 12; = Cable (Suprimido) | media |
| Escudos Mentais Impenetráveis | 25 |  | outro | ladder: escudos que seguraram telepatas Ômega (Jean, Apocalipse) → 25; = Escudos Mentais Impenetráveis do Cable Liberado | baixa |
| Armas de Energia Avançada | 11 |  | energia | armas de energia do futuro arruínam tanque → 11 | media |
| Teletransporte Temporal | 23 |  | distancia | bodyslide leva-o a qualquer ponto do globo (e através do tempo) → global 23 | media |
| Escudos de Força Pessoais | 10 |  | resistencia | escudo TK aguenta artilharia leve/concreto → 10 | baixa |
| Interface Neural com Tecnologia | 10 |  | outro | tecnopatia TOV com máquinas do futuro, faixa rua → 10 | baixa |
| Braço Cibernético Multifuncional | 8 |  | peso | mesmo braço TOV: ~6 t → 8 | baixa |
| Protetor da Messias Mutante | — |  | — | papel narrativo | alta |
| Treinamento de Sobrevivência Extremo | 6 |  | outro | sobrevive em terra devastada, pico humano → 6 | media |
| Conexão Genética Única | — |  | — | histórico/genética, sem feito | alta |
| Sacrifício Pelo Futuro | — |  | — | traço/arco narrativo | alta |
| Armamento Pesado _(extra)_ | 10 |  | energia | extra; mesmo armamento de alto calibre → 10 | media |
| Vírus Techno-Orgânico _(extra)_ | — |  | — | condição/fraqueza (vírus TOV) | alta |
| Fundador da X-Force _(extra)_ | — |  | — | histórico | alta |

### Cable (Liberado - Sem Vírus) — x-men

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Levita Ilhas/Montanhas/Cidades | 30 |  | peso | texto é o feito: ergue montanha pequena/cidade ~24 Mt → 30 | media |
| Desmonta Sentinelas Nível Atômico | 18 |  | energia | desmonta Sentinela (virtualmente indestrutível, 16–18) → 18 | media |
| Escudo Planetário | 21 |  | area | texto é o feito: escudo no raio da Terra ~6.400 km → 21 | media |
| Manipulação Molecular Precisa | 18 |  | outro | manipulação molecular de precisão; faixa Ômega, abaixo da força bruta → 18 | baixa |
| Voo Orbital/Espacial | 14 |  | velocidade | voo espacial: velocidade de escape ~40.000 km/h → 14 | media |
| Reconstrução Corporal Completa | 20 |  | resistencia | reconstrói o corpo do quase nada (18–22) → 20 | media |
| Campos de Força Reativos Multicamada | 21 |  | resistencia | campos multicamada aguentam artilharia pesada/arrasa-quarteirão (19–21) → 21 | media |
| Rajadas Telecinéticas Devastadoras | 20 |  | energia | rajada TK de rotina arrasa quarteirão (19–21) → 20 | media |
| Controle Simultâneo de Múltiplos Alvos em Combate | 16 |  | outro | controle simultâneo de vários alvos; faixa Ômega baixa | baixa |
| Desintegração de Matéria a Nível Subatômico | 20 |  | energia | desintegra alvo do porte de Sentinela/prédio pequeno → 20 (mesma escala das rajadas) | media |
| Comando Mental Global | 23 |  | informacao | ladder: o texto é o feito, comando mental global → 23 | media |
| Precognição Perfeita (Táticas) | 16 |  | duracao | precognição tática perfeita; faixa Ômega | baixa |
| Ligação Todos Mutantes (Rede Psíquica) | 23 |  | informacao | ladder: rede psíquica com todos os mutantes do planeta = global → 23 | media |
| Reescrita Personalidade Massa | 18 |  | informacao | reescreve personalidades em massa; faixa Ômega | baixa |
| Projeção Astral Ofensiva/Defensiva | 16 |  | informacao | projeção astral com combate; faixa Ômega | baixa |
| Leitura Mental em Escala Planetária | 23 |  | informacao | ladder: o texto é o feito, leitura planetária = global → 23 | media |
| Escudos Mentais Impenetráveis (Bloqueia Invasões Cósmicas) | 25 |  | outro | pareado a invasões telepáticas Ômega/cósmicas (~24) → 25 | baixa |
| Cirurgia Mental de Precisão Absoluta | 18 |  | informacao | cirurgia mental de precisão; faixa Ômega | baixa |
| Ilusões Telepáticas Perfeitas em Múltiplos Sentidos | 18 |  | informacao | ilusões perfeitas multissensoriais; faixa Ômega | baixa |
| Bloqueio de Poderes Mutantes em Massa | 18 |  | outro | pareado aos graus típicos dos mutantes anulados (rua–Ômega ~15–18) → 18 | baixa |
| Vê Todos Futuros Possíveis Simultaneamente | 20 |  | duracao | vê todos os futuros; faixa Ômega alta | baixa |
| Escolhe Caminho Vitorioso Garantido | 20 |  | duracao | escolhe o futuro vitorioso; mesma faixa da visão de futuros | baixa |
| Antecipa Traições/Emboscadas | 12 |  | duracao | antecipa emboscadas/traições; faixa rua alta | media |
| Genética Ômega Pura (Jean Grey + Cyclops) | — |  | — | origem genética, não é capacidade | alta |
| Potencial Igual/Supere Mãe/Pai | — |  | — | potencial/latente | alta |
| Imune a Manipulação Genética (Sinistro/Apocalipse) | 20 |  | outro | pareado à manipulação genética de Sinistro/Apocalipse (~20) | baixa |

### Cosmo (Cão Espacial) — heroi

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Alcance Interestelar | 51 |  | distancia | o texto é o feito: alcance interestelar ≥ 1 ano-luz → 51 | baixa |
| Telecinese Precisa (Apesar de Patas) | 6 |  | peso | segura pessoas/objetos com precisão (Rocket, Star-Lord) ~1 t → 6 | media |
| Escudos Psíquicos Protegem Knowhere | 11 |  | area | escudo psíquico cobre Knowhere (cabeça de Celestial, raio ~5 km) → 11 | baixa |
| Comunicação Interestelar Instantânea | 51 |  | distancia | o texto é o feito: comunicação interestelar ≥ 1 ano-luz → 51 | baixa |
| Detecta Ameaças Psíquicas em Toda a Galáxia | 68 |  | distancia | o texto é o feito: galáxia ~100 mil anos-luz (51 + 17) → 68 | baixa |
| Imune a Controle Mental e Manipulação Telepática | 22 |  | outro | pareado à telepatia Ômega típica (~21-23) → 22 | media |
| Sente Emoções e Intenções de Qualquer Ser Vivo Próximo | 6 |  | informacao | empatia em alcance próximo (campus ~180 m) → 6 | media |
| Cria Constructos Telecinéticos de Contenção | 6 |  | resistencia | contém alvos com constructos; não excede a telecinese (~1 t) → 6 | media |
| Coordena as Defesas de Knowhere Simultaneamente pela Mente | 11 |  | informacao | coordena defesas em toda Knowhere (raio ~5 km) → 11 | baixa |
| Faro Psíquico: Rastreia Presenças a Anos-Luz de Distância | 53 |  | distancia | o texto é o feito: rastreia a alguns anos-luz (~4 al) → 53 | baixa |
| Protege Estação Espacial Multiversal | — |  | — | papel/função narrativa | alta |
| Ligação com Guardiões da Galáxia | — |  | — | relacionamento | alta |

### Druig (Eterno) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle Mental em Escala Planetária | 23 |  | informacao | o texto é o feito: alcance global ~11.000+ km → 23 | media |
| Imortalidade / Regeneração Quase Absoluta | 20 |  | resistencia | Eterno: reconstitui-se de quase nada (18–22) → 20 | media |
| Voo Supersônico / Espacial | 14 |  | velocidade | voa ao espaço: velocidade de escape ~40.000 km/h → 14 (supersônico de rotina 10) | media |
| Manipulação Matéria/Energia Cósmica | 16 |  | energia | rajadas de energia cósmica de Eterno derrubam prédio pequeno → 16 | baixa |
| Imune a Doenças/Venenos/Envelhecimento | 16 |  | outro | imunidade binária de Eterno, pareada a toxinas/doenças super-humanas → 16 | media |
| Escraviza Civilizações Inteiras com Controle Mental Duradouro | 20 |  | informacao | domina populações de país/continente (~3.000 km) → 20 | media |
| Controla Múltiplos Alvos Simultaneamente à Distância | 12 |  | informacao | vários alvos em escala de cidade ~11 km → 12 | media |
| Implanta Lealdade e Memórias Falsas Permanentes | 16 |  | informacao | reescrita mental permanente (faixa Ômega baixa) → 16 | media |
| Imune a Controle Mental de Outros Eternos e Telepatas | 21 |  | outro | ladder: pareado a Eternos/telepatas Ômega de rotina (21) | media |
| Comanda Exércitos de Seguidores Hipnotizados por Séculos | 18 |  | informacao | exércitos sob controle em escala de país → 18 | baixa |
| Apaga e Reescreve Memórias das Vítimas | 16 |  | informacao | mesma faixa de Implanta Memórias Falsas → 16 | media |
| Manipula Governos/Ícones Históricos | 18 |  | informacao | influência em escala de país/estado → 18 | media |
| Rede Espionagem Milenar | 20 |  | informacao | rede de agentes em escala continental → 20 | baixa |

### Emma Frost (Rainha Branca) — x-men

Atributos: destreza 6, força 5, corpo 5, inteligência 11, vontade 11, mente 13, influência 11, aura 12

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Professora Brutal | — |  | — | papel/personalidade | alta |
| Ex-Rainha do Clube do Inferno | — |  | — | histórico | alta |
| Telepatia Ômega | 21 | 23 | distancia | ladder: rotina Ômega sem amplificador, alcance continental ~5.000 km → 21; com Cérebro global 23 (peak) | media |
| Manipulação Psicológica Refinada | 14 |  | informacao | manipuladora de elite em política/Clube do Inferno, = Carisma do Magneto → 14 | media |
| Forma de Diamante | 15 |  | resistencia | diamante orgânico aguenta antitanque/titânio (13–15) → 15; pode ser rachado | media |
| Lealdade Feroz aos Alunos | — |  | — | relacionamento | alta |
| Mentora Brutal e Exigente | — |  | — | papel/personalidade | alta |
| Manipulação Psíquica Sutil | 16 |  | informacao | manipulação telepática indetectável: base da faixa Ômega → 16 | media |
| Mente Tática e Inescrupulosa | 9 |  | informacao | estrategista de elite (faixa rua) → 9 | baixa |
| Leitura Mental Global | 23 |  | distancia | o texto é o feito: alcance global (23–24) → 23 | media |
| Controle Mental de Multidões | 18 |  | informacao | controla centenas/milhares de mentes de uma vez: faixa Ômega → 18 | baixa |
| Escudos Psíquicos Intransponíveis | 25 |  | outro | ladder: escudos que barram Xavier/Jean (telepatas Ômega) → 25; mesma capacidade de Resistência a Telepatia Alheia | media |
| Cirurgia Mental Precisa | 18 |  | informacao | edita mente/memória com precisão: faixa Ômega → 18 | media |
| Transferência de Consciência | 16 |  | outro | troca/transfere mentes: base da faixa Ômega → 16 | baixa |
| Bloqueio de Poderes Mutantes | 16 |  | outro | desliga poderes por via telepática: pareado a alvos rua/Ômega típicos → 16 | baixa |
| Ilusões Perfeitas | 18 |  | informacao | ilusões indistinguíveis da realidade: faixa Ômega → 18 | media |
| Projeção Astral de Combate | 18 |  | informacao | combate no plano astral, mesma escala das ilusões → 18 | media |
| Detecção de Mentiras Absoluta | 18 |  | informacao | pareado a qualquer mentiroso sem escudo → 18 | media |
| Resistência a Telepatia Alheia (Bloqueia Xavier/Jean) | 25 |  | outro | ladder: o texto diz que bloqueia Xavier/Jean → 25 | media |
| Professora Exigente e Eficaz _(extra)_ | — |  | — | papel/personalidade | alta |
| Lealdade aos Alunos _(extra)_ | — |  | — | relacionamento | alta |

### Emma Frost (Phoenix Five / Anfitriã Fênix) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Cósmica (Galáxia Inteira) | 68 |  | distancia | o texto é o feito: galáxia ~100 mil anos-luz (1 a-l = 51; ×10⁵ ≈ +17) → 68 | media |
| Telecinese Planetária (Move Continentes) | 65 |  | peso | o texto é o feito: placa continental ~7×10¹⁷ t → log2 ≈ 65 | media |
| Pirocinese Cósmica (Queima no Espaço) | 35 |  | energia | fogo Fênix arrasa região (escala regional 31–45) → 35 | baixa |
| Ressurreição / Cura Total | 30 |  | resistencia | acima do auge de Wolverine (18–22): volta da morte → 30 | baixa |
| Teletransporte Interestelar Instantâneo | 53 |  | distancia | estrelas próximas ~4 anos-luz → 53 | media |
| Imortalidade Enquanto Fênix Habitar | 30 |  | duracao | imortalidade cósmica enquanto hospedeira, faixa por resistência → 30 | baixa |
| Forma Diamante + Telepatia Simultânea (Fênix Ignora Limite) | 40 |  | resistencia | mesma Forma Diamante Fênix (ver Invulnerabilidade Absoluta) → 40 | baixa |
| Amplificação Cósmica de Poderes de Toda a Equipe (Phoenix Five) | 31 |  | outro | pareado ao piso cósmico dos demais hospedeiros Fênix → 31 | baixa |
| Barreira Psíquica Estelar Contra Invasões Mentais | 35 |  | outro | variante cósmica: barreira em escala estelar (sistema interno ~10¹¹ m) → 35; = barreira estelar da Rachel (Avatar) | baixa |
| Devastação em Massa Quando Fênix Descontrolada | — |  | — | efeito de descontrole: risco/fraqueza disfarçada | media |
| Invulnerabilidade Absoluta (Até Thor/Martelo) | 40 |  | resistencia | aguenta golpes de Thor/Mjolnir (região/montanhas massivas 31–45) → 40 | baixa |
| Força Ilimitada (Classe 100+) | 14 |  | peso | Classe 100+: ≥100 t = 12; "+" com Fênix → 14 | baixa |
| Telepatia Funciona Nesta Forma (Fênix) | 68 |  | outro | mesma capacidade da Telepatia Cósmica (galáxia) → 68 | baixa |

### Hope Summers (Messias Mutante) — x-men

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Copia QUALQUER Poder Mutante Perto (Sem Limite) | 20 |  | outro | mimetismo pareado aos poderes copiados (mutantes rua–Ômega, rotina ~20) | baixa |
| Mantém Poderes Copiados Indefinidamente | 16 |  | duracao | retém poderes copiados indefinidamente; faixa Ômega baixa | baixa |
| Sincroniza Múltiplos Poderes Simultaneamente | 18 |  | outro | combina vários poderes copiados; pareado ao mimetismo (20) menos o custo | baixa |
| Melhora Poderes Copiados (Versão Ômega) | 22 |  | outro | eleva o poder copiado acima do original Ômega (~20) → 22 | baixa |
| Copia Poderes Não-Mutantes (Tecnologia, Magia) | 16 |  | outro | copia tecnologia/magia; pareado a armas/feitiços de rua alta | baixa |
| Manifesta Fator de Cura e Garras de Wolverine | 16 |  | resistencia | fator de cura do Wolverine: regenera membros/órgãos (13–16) → 16 | media |
| Absorve Habilidades ao Tocar como Rogue | 20 |  | outro | mimetismo por toque pareado ao de Rogue (rotina 20) → 20 | baixa |
| Replica Rajadas Óticas de Ciclope com Controle Total | 18 |  | energia | pareado à rajada óptica de Ciclope (rotina 18, pico 30) → 18 | media |
| Copia Telepatia/Telecinese de Mutantes Ômega Próximos | 20 |  | outro | pareado à telepatia/TK Ômega copiada (~20) | baixa |
| Adapta o Poder Copiado à Situação de Combate Instantaneamente | 14 |  | outro | adaptação tática do poder; faixa rua alta | baixa |
| Combina Poderes de Vários Mutantes ao Mesmo Tempo | 18 |  | outro | mesma capacidade de sincronizar vários poderes → 18 | baixa |
| Atrai Força Fênix Naturalmente | — |  | — | vínculo narrativo com a Fênix | media |
| Pode Controlar/Comandar Fênix | 25 | 31 | outro | hospedeira temporária da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Ressuscita Mutantes Mortos (Com Fênix) | 25 | 31 | resistencia | hospedeira temporária da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Cura Extinção Mutante (Luzes da Esperança) | 24 |  | area | texto: reacende o gene X no planeta (Luzes da Esperança) → global 24 | baixa |
| Inspira Lealdade Fanática (Luzes) | 10 |  | informacao | lealdade fanática das Luzes; faixa rua | media |
| Estrategista Nata / Treinada por Cable | 9 |  | informacao | estrategista treinada por Cable; faixa rua | media |
| Simbolo de Esperança Unifica Facções | 12 |  | informacao | símbolo que une facções mutantes; faixa rua alta | media |
| Armas Avançadas / Combate Corpo-a-Corpo | 7 |  | energia | armas avançadas/corpo-a-corpo: fuzil 5–7 → 7 | media |
| Sobrevivência Extrema / Táticas Guerrilha | 8 |  | outro | sobrevivência extrema/guerrilha; acima do pico humano | media |
| Precognição Tática (Treinamento Psíquico) | 8 |  | duracao | precognição tática treinada; faixa rua | baixa |

### Jean Grey (Marvel Girl / Fênix) — x-men

Atributos: destreza 6, força 5, corpo 5, inteligência 9, vontade 9, mente 12, influência 8, aura 11, espírito 11

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia de Nível Ômega | 21 | 23 | distancia | ladder: rotina Ômega continental ~5.000 km → 21; pico global 23 | media |
| Anfitrião da Força Fênix | — |  | — | Fênix latente segundo a descrição; feitos da Fênix graduados nas tags específicas | media |
| Elo Psíquico com Scott Summers | — |  | — | relacionamento (elo psíquico com Scott) | alta |
| Telecinesia Precisa e Devastadora | 16 | 22 | peso | rotina: ergue Sentinelas/estruturas de prédio ~1.500 t → 16; pico porta-aviões (22) | media |
| Empatia Profunda | 12 |  | informacao | sente emoções em escala de cidade (~11 km) → 12 | media |
| Elo Psíquico com Ciclope | — |  | — | relacionamento (elo psíquico com Ciclope) | alta |
| Mentora de Jovens Mutantes | — |  | — | papel social | alta |
| Poder Latente Além da Compreensão | — |  | — | latente | alta |
| Telepatia Ômega Absoluta | 21 | 23 | distancia | mesma telepatia da tag "Telepatia de Nível Ômega" → 21; pico global 23 | media |
| Telecinese Molecular | 16 |  | outro | reorganiza matéria em escala molecular; não excede a telecinese (16) | baixa |
| Pirocinese Cósmica | 20 | 96 | energia | depende da Fênix: rotina arrasa quarteirão/afunda navio → 20; pico consumiu estrela D'Bari (~2e27 t → 96) | baixa |
| Manipulação de Matéria em Nível Atômico | 16 |  | outro | mesma manipulação molecular da telecinese (16) | baixa |
| Viagem Interestelar pelo Pensamento | 25 | 51 | distancia | Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; literal interestelar (1 ano-luz = 51) em peak | baixa |
| Ressurreição Auto-Induzida | 22 |  | resistencia | volta da morte (acima de 'volta de quase nada' 18-22) → 22 | baixa |
| Conexão com a Força Fênix | — |  | — | Fênix latente; mesma conexão de 'Anfitrião da Força Fênix' | media |
| Criação de Vida do Nada | 25 | 31 | outro | Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; faixa cósmica (31) em peak | baixa |
| Percepção Cósmica (Sente Vida em Escala Galáctica) | 25 | 68 | distancia | Fênix latente: rotina limitada a 25 (hospedeira latente); literal galáctico (~100 mil anos-luz = 68) em peak | baixa |
| Amplificação Extrema de Todos os Próprios Poderes | 24 |  | outro | eleva telepatia/telecinese ao pico (telepatia global 24) → 24 | baixa |
| Chamas da Ressurreição | 22 |  | resistencia | mesma ressurreição da tag 'Ressurreição Auto-Induzida' → 22 | baixa |
| Purificação de Mentes Corrompidas | 20 |  | informacao | limpa corrupção mental de nível Ômega (faixa 16-30) → 20 | media |
| Cura Planetária | 23 |  | area | o texto é o feito: cura em escala planetária (global) → 23 | baixa |
| Juízo Cósmico | — |  | — | temático/narrativo, sem feito mensurável | media |
| Transmutação de Energia Infinita | 25 | 31 | energia | Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; "infinita" (faixa cósmica 31) em peak | baixa |
| Renascimento Cíclico (Ovo Cósmico) | 22 |  | resistencia | mesma ressurreição (ciclo da Fênix) → 22 | baixa |
| Transferência de Vitalidade a Terceiros | 14 |  | resistencia | transfere vitalidade e cura ferimentos graves de terceiros (13-16) → 14 | baixa |
| Manifestação Física da Força Vital Universal | — |  | — | rótulo temático da Fênix, sem feito mensurável | media |
| Comunhão com Todas Formas de Vida | 23 |  | informacao | ladder: comunhão mental com toda vida do planeta = alcance global → 23 | baixa |
| Erradicação de Doenças em Escala Populacional | 13 |  | area | erradica doenças de uma população (cidade ~11-20 km) → 13 | baixa |
| Elo Psíquico com Scott _(extra)_ | — |  | — | relacionamento (elo com Scott) | alta |
| Potencial Ômega não totalmente desbloqueado _(extra)_ | — |  | — | latente | alta |

### Jean Grey (Dark Phoenix) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Consome Estrelas/Sistemas Solares | 96 |  | peso | variante cósmica: consome estrela (D'Bari) ~2×10²⁷ t → 96 | media |
| Destrói Civilizações Inteiras (D'bari) | 78 |  | energia | aniquila planeta habitado (massa ~ Terra 6×10²¹ t) → 78 | media |
| Telepatia Oniversal (Todas Mentes) | 86 |  | informacao | variante cósmica: alcance universal (raio do universo observável ~46 bi anos-luz = 51+35) → 86; = escala universal da White Phoenix | baixa |
| Telecinese Destroi Planetas | 78 |  | peso | o texto é o feito: planeta ~6×10²¹ t → 78 | media |
| Manipulação Matéria/Energia Absoluta | 80 |  | energia | reorganiza matéria em escala planetária ou maior (70+) → 80 | baixa |
| Imortalidade Verdadeira (Ressuscita Infinitas) | 50 |  | duracao | ressurreição ilimitada da Força Fênix; faixa cósmica (não pela coluna Tempo) → 50 | baixa |
| Devora Energia Vital de Planetas Inteiros | 78 |  | energia | esgota a vida de um planeta inteiro (~massa Terra) → 78 | baixa |
| Cria Buracos Negros / Colapsa Estrelas à Vontade | 96 |  | energia | colapsa estrela ~2×10²⁷ t → 96 | media |
| Resiste Ataques Combinados de Titãs Cósmicos (Vigia, Galactus) | 85 |  | resistencia | pareado a ataques de Galactus/Vigia (destruidores de planeta 70–90) → 85 | baixa |
| Reescreve Memórias de Civilizações Inteiras | 23 |  | informacao | ladder: população de um planeta inteiro = alcance mental global → 23 | media |
| Queima no Vácuo/Espaço | 40 |  | outro | fogo Fênix sem oxigênio; propriedade cósmica (faixa 31+) → 40 | baixa |
| Apaga Memória/Existência | 40 |  | informacao | apaga existência de alvos (faixa cósmica) → 40 | baixa |
| Queima Telepatia Alheia | 30 |  | outro | pareado à telepatia Ômega de Xavier/Emma (~23–24), com folga → 30 | media |
| Não Pode Ser Apagada Convencionalmente | 50 |  | resistencia | mesma faixa da ressurreição Fênix → 50 | baixa |
| Fogo Psíquico Perfura Qualquer Escudo Mental | 30 |  | outro | pareado a escudos mentais Ômega (~24) → 30 | media |
| Marca a Vítima Permanentemente (Cicatriz Fênix) | — |  | — | efeito narrativo/marca, não capacidade mensurável | media |
| Consome Almas Além do Corpo Físico | 40 |  | outro | ataque espiritual cósmico (faixa 31+) → 40 | baixa |
| Propaga-se Através do Vácuo Sem Combustível | 51 |  | distancia | chamas viajam entre estrelas ~1 ano-luz → 51 | baixa |
| Imune a Extinção Convencional (Água, Frio Absoluto, Anti-Matéria) | 40 |  | outro | pareado a antimatéria/frio absoluto (faixa cósmica) → 40 | baixa |
| Ignição Instantânea em Escala Planetária | 55 |  | energia | incendeia a biosfera de um planeta (devastação planetária 46–60) → 55 | baixa |

### Jean Grey (White Phoenix of the Crown) — x-men

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Mestra do Multiverso (Todas Linhas Temporais) | 95 |  | outro | variante cósmica: escala multiversal, acima do universo observável (~86) → 95 | baixa |
| Restaura Realidades Apagadas | 86 |  | area | realidade inteira: raio do universo observável ~46 bi anos-luz → 51+35 = 86 | baixa |
| Julgamento Cósmico Final | 75 |  | energia | julga/destrói mundos: destrói planeta (70+) → 75 | baixa |
| Onisciência Verdadeira (Passado/Presente/Futuro) | 86 |  | informacao | alcance universal (~86) | baixa |
| Cria/Apaga Linhas Temporais | 95 |  | outro | escala multiversal, = Mestra do Multiverso → 95 | baixa |
| Transcende Morte/Morte Permanente Impossível | 90 |  | duracao | imortalidade absoluta de entidade cósmica: faixa cósmica máxima → 90 | baixa |
| Comunhão Direta com a Força Fênix Primordial | — |  | — | vínculo/fonte do poder, sem feito próprio | media |
| Cura/Restaura Universos Inteiros Corrompidos | 86 |  | area | o texto é o feito: universo inteiro (~86) | baixa |
| Onipresença Dentro do Espectro Fênix | 86 |  | distancia | presença em escala universal (~86) | baixa |
| Impõe Equilíbrio Cósmico Vida-Morte-Renascimento | 86 |  | outro | regula o ciclo cósmico em escala universal (~86) | baixa |

### Legion (David Haller) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Cada Personalidade = Poder Ômega Diferente | 25 |  | outro | cada persona porta um poder Ômega (faixa 16–30) → 25 | baixa |
| Telepatia, Telecinese, Pirocinese, Realidade, Tempo | 23 |  | distancia | ladder: telepatia Ômega bruta de alcance global → 23 | media |
| Centenas de Personalidades / Poderes | 25 |  | outro | amplitude de poderes Ômega, mesmo nível das personas → 25 | baixa |
| Personalidade Dominante Controla Acesso | — |  | — | mecânica/restrição, não feito | alta |
| Personalidades Podem se Manifestar Fisicamente | 16 |  | outro | personas tomam corpo físico (piso Ômega) → 16 | baixa |
| Fusão de Personalidades Cria Poderes Híbridos Únicos | 25 |  | outro | combina poderes Ômega das personas → 25 | baixa |
| Cada Crise Emocional Gera Nova Personalidade | — |  | — | instabilidade (fraqueza disfarçada) | alta |
| Acesso Consciente a Décadas de Memórias Alheias | 12 |  | informacao | arquivo de memórias de centenas de mentes, faixa rua alta → 12 | baixa |
| Capaz de Apagar ou Absorver Personalidades Rivais | 24 |  | outro | pareado a psiques como o Rei das Sombras (~23) → 24 | baixa |
| Legion Prime: Fusão de Todas as Personalidades em Uma | 30 |  | outro | todos os poderes unificados, topo da faixa Ômega → 30 | baixa |
| Jemail Karami (Telepatia) | 12 |  | distancia | telepatia de uma persona isolada ~cidade → 12 | baixa |
| Jack Wayne (Telecinese) | 12 |  | peso | TK de persona: ergue ~100 t (avião pequeno) → 12 | baixa |
| Cyndi (Pirocinese) | 12 |  | energia | incinera bunker/prédio → 12 | baixa |
| Sally (Teleporte) | 12 |  | distancia | teleporte ~11 km (cidade) → 12 | baixa |
| Karma (Absorção Psíquica) | 14 |  | outro | pareado a mentes de rua que possui/absorve → 14 | baixa |
| Delphie (Precognição) | 12 |  | duracao | precognição de persona, faixa rua alta → 12 | baixa |
| Chamber (Energia) | 12 |  | energia | rajadas psiônicas arruínam tanque/bunker → 12 | baixa |
| Styx (Morte/Entropia) | 18 |  | outro | consome mentes/vida ao toque; pareado a Corpo de super-humanos fortes → 18 | baixa |
| Moira (Realidade) | 13 |  | area | reescreve a realidade local ~cidade → 13 (igual Reescreve Realidade Local) | baixa |
| Rebel (Manipulação de Tecnologia) | 12 |  | outro | tecnopatia de persona, faixa rua alta → 12 | baixa |
| Reescreve Realidade Local (Moira Persona) | 13 |  | area | raio local ~11 km (cidade) → 13 | baixa |
| Cria/Apaga Linhas Temporais | 30 | 40 | outro | Legion Quest gerou a Era do Apocalipse; topo Ômega → 30 | baixa |
| Onipotência Local Quando Personalidade Certa | 13 |  | area | mesmo raio local da reescrita da realidade → 13 | baixa |
| Fundiu a Terra com Sua Própria Mente (Age of X) | 24 |  | area | o texto é o feito: escala global → 24 | media |
| Cria Realidades de Bolso Habitadas por Bilhões | 24 |  | area | realidade do tamanho de um mundo habitado → global 24 | baixa |
| Apaga a Existência do Pai da Linha do Tempo | 30 |  | outro | reescrita temporal (mesma de Cria/Apaga Linhas Temporais) → 30 | baixa |
| Reescreve a História Pessoal de Aliados Inteiros | 20 |  | outro | reescrita de identidade em grupo, faixa Ômega → 20 | baixa |
| Rivaliza Entidades Cósmicas em Escala Planetária | 30 | 31 | outro | entrada base (não Legion Prime): teto planetário 30; piso cósmico (31) em peak | baixa |
| Manipula Probabilidade e Causalidade | 20 |  | outro | manipulação de causalidade, faixa Ômega → 20 | baixa |
| Controla Múltiplas Linhas Temporais Simultaneamente | 30 |  | outro | mesmo nível da reescrita temporal → 30 | baixa |

### Magneto (Erik Magnus Lehnsherr) — irmandade

Atributos: destreza 5, força 5, corpo 6, inteligência 12, vontade 14, mente 11, influência 11, aura 12, espírito 11

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Magnetismo Ômega | 25 | 30 | peso | rotina: aço em escala de ponte/estádio ~400–900 kt → 24–25; pico: polos magnéticos da Terra | media |
| Campo de Força Magnético Pessoal | 19 |  | resistencia | aguenta barragem de Sentinelas/artilharia pesada (19–21) | media |
| Voo por Levitação Magnética | 10 |  | velocidade | supersônico de rotina ~2.400 km/h | media |
| Manipula Hemoglobina | 14 |  | outro | ignora armadura; pareado ao Corpo de super-humanos de rua | baixa |
| Induz AVC ou Parada Cardíaca | 14 |  | outro | mesmo controle do ferro no sangue → 14 | baixa |
| Extrai Adamantium do Esqueleto | 18 |  | outro | pareado ao Esqueleto de Adamantium (16–18) | media |
| Escudo Magnético Global | 21 |  | area | texto é o feito: raio da Terra ~6.400 km | media |
| Voo Orbital por Levitação | 14 |  | velocidade | velocidade de escape ~40.000 km/h | media |
| Bloqueia Telepatia com Capacete | 25 |  | outro | ladder: capacete barra Xavier/Jean (telepatas Ômega, Cérebro 23) → 25 | media |
| Capacete Anti-Telepatia | 25 |  | outro | ladder: capacete barra Xavier/Jean (telepatas Ômega, Cérebro 23) → 25 | media |
| Gênio Científico | 14 |  | informacao | construiu o Asteroide M (além da ciência terrestre) | media |
| Sobrevivente de Auschwitz | — |  | — | histórico, não é capacidade | alta |
| Visão de Supremacia Mutante | — |  | — | ideologia | alta |
| Carisma Revolucionário | 14 |  | informacao | lidera Irmandade/Genosha (influência hemisférica) | media |
| Anti-Vilão a Anti-Herói | — |  | — | arco narrativo | alta |
| Manipula o Campo Magnético Inteiro do Planeta | 23 | 30 | area | texto: campo magnético do planeta → escala global ~11.000–20.000 km → 23; pico inverter polos | media |
| Arranca Estruturas de Metal de Cidades Inteiras do Chão | 25 |  | peso | Golden Gate ~800 mil t → 25 | media |
| Cria Tempestades Magnéticas em Escala Continental | 21 |  | area | texto: tempestade continental, raio ~5.000 km → 21 | media |
| Voo Orbital Sustentado por Levitação Magnética | 14 |  | velocidade | mesmo voo orbital: escape ~40.000 km/h | media |
| Extrai o Ferro do Sangue de um Inimigo à Distância | 14 |  | outro | mesmo controle do ferro no sangue, à distância → 14 | baixa |
| Desativa ou Reprograma Qualquer Tecnologia Eletromagnética | 16 |  | outro | pareado à tecnologia de Sentinelas/S.H.I.E.L.D. (16–18); abaixo do PEM de satélites | baixa |
| Gera Pulso Eletromagnético Capaz de Cegar Satélites | 17 |  | distancia | órbita baixa ~400 km | media |
| Desvia e Reflete Qualquer Projétil Metálico Instintivamente | 12 |  | velocidade | desvia projéteis até míssil ~10.000 km/h → 12 | media |
| Manipula o Espectro de Luz e Rádio Além do Metal Puro | 14 |  | outro | espectro EM além do metal; secundário ao magnetismo, faixa rua alta | baixa |
| Constrói Fortalezas e Armaduras de Metal Reformado em Segundos | 17 |  | peso | fortaleza de aço ~3.000 t | media |
| Campo de Força Magnético _(extra)_ | 19 |  | resistencia | extra; mesmo Campo de Força Magnético Pessoal | media |
| Voo Magnético _(extra)_ | 10 |  | velocidade | extra; mesmo voo de Voo por Levitação Magnética | media |

### Mastermind (Jason Wyngarde) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Ilusões Perfeitas Enganam Todos Sentidos | 18 |  | informacao | ilusões multissensoriais que enganam até Ômegas (faixa Ômega) → 18 | media |
| Afeta Mentes Globalmente (Alcance Planetário) | 23 |  | distancia | o texto é o feito: alcance planetário (global) → 23 | media |
| Cria Realidades Alternativas Indistinguíveis | 18 |  | informacao | mesmo nível das ilusões perfeitas → 18 | media |
| Ilusões Causam Dano Físico Real (Psicossomático) | 10 |  | outro | dano psicossomático ignora armadura; pareado a Corpo de rua (~10) | baixa |
| Engana Telepatas Ômega (Xavier, Jean, Emma) | 23 |  | outro | ladder: enganou Jean/Xavier = rivaliza telepata Ômega → 23 | media |
| Manipula Memórias de Longo Prazo (Persona Fingida em Jean) | 16 |  | informacao | implantou persona falsa em Jean por longo prazo (faixa Ômega) → 16 | media |
| Sustenta Ilusões por Meses Sem Detecção | 16 |  | duracao | ilusão sustentada por meses sem detecção; faixa Ômega → 16 | baixa |
| Cria Ilusões Compartilhadas Entre Múltiplos Alvos | 8 |  | area | ilusão compartilhada por salão/multidão (Clube do Inferno, raio ~500-700 m) → 8 | media |
| Reescreve a Percepção de Identidade da Vítima | 16 |  | informacao | reescreve identidade da vítima (caso Jean/Fênix) → 16 | media |
| Ilusões Resistem a Contra-Sondagem Telepática | 23 |  | outro | ladder: resiste à sondagem de Xavier/Jean = rivaliza telepata Ômega → 23 | media |
| Recursos / Influência Global | 12 |  | informacao | recursos/influência via elite global; menor que carisma de Magneto (14) → 12 | baixa |
| Acesso Tecnologia Proibida | — |  | — | equipamento vago | media |
| Influência Política e Financeira Através do Clube | 12 |  | informacao | influência política/financeira via Clube do Inferno → 12 | baixa |

### Miss Sinister (Claudine Renko) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Genética Sinister Completa (Memórias/Habilidades) | 14 |  | informacao | herda o saber genético de Sinister: além da ciência terrestre (13–15) → 14 | media |
| Corpo Diamante Sintético (Como Sinister) | 15 |  | resistencia | forma de diamante: aguenta antitanque/titânio (13–15) → 15; = família diamante (Emma/Sinister) | media |
| Clonagem Instantânea / Corpos Reserva | 18 |  | resistencia | volta da morte em corpo reserva (18–22) → 18 | media |
| Engenharia Genética Divina | 15 |  | informacao | cria vida/poderes sob medida: além da ciência terrestre (13–15) → 15 | media |
| Imune a Telepatia (Diamante) | 21 |  | outro | ladder: pareado à rotina Ômega da Emma (21); = imunidade do Mister Sinister | media |
| Manipula DNA Mutante para Criar Híbridos de Poder | 15 |  | informacao | mesma faixa de Engenharia Genética Divina → 15 | media |
| Regeneração Celular Acelerada | 12 |  | resistencia | fecha ferimentos de bala em minutos (9–12) → 12 | media |
| Força e Resistência Sobre-Humanas (Forma Diamante) | 9 |  | peso | ergue ~13 t (ônibus/caminhão pesado) → 9 | media |
| Acesso Total às Pesquisas e Laboratórios de Sinister | — |  | — | recurso/acesso, sem efeito mensurável | media |
| Prevê Mutações Genéticas Antes de Ocorrerem | 14 |  | informacao | previsão genética além da ciência comum (13–15) → 14 | baixa |
| Comando Clones Mutantes Poderosos | — |  | — | servos/relacionamento | media |
| Rede Espionagem Global | 23 |  | informacao | o texto é o feito: rede global ~11.000 km → 23 | baixa |
| Manipula Lealdade dos Clones Através de Programação Genética | 12 |  | informacao | lealdade programada nos clones (faixa rua) → 12 | baixa |

### Mister Sinister (Nathaniel Essex) — vilao

Atributos: destreza 6, força 8, corpo 8, inteligência 15, vontade 12, mente 11, influência 8, aura 9, espírito 10

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Gênio de Genética Mutante | 15 |  | informacao | maior geneticista do planeta, além da ciência terrestre (13–15) → 15 | media |
| Imortalidade e Regeneração | 16 |  | resistencia | regenera membros/órgãos e vive há séculos (13–16) → 16 | media |
| Clonagem e Manipulação Genética | 15 |  | informacao | clonagem de mutantes completos, mesma escala do gênio → 15 | media |
| Poderes Psiônicos e Telepatia Limitada | 6 |  | distancia | telepatia limitada ~campus 180 m → 6 | baixa |
| Obsessão com Linhagem Summers/Grey | — |  | — | fraqueza/obsessão | alta |
| Obsessão Científica Cega à Ética | — |  | — | fraqueza | alta |
| Corpo de Diamante Sintético | 15 |  | resistencia | corpo de diamante (= Forma de Diamante da Emma) aguenta antitanque → 15 | media |
| Imune a Telepatia | 21 |  | outro | ladder: pareado à telepatia Ômega de rotina (21); a ficção não o mostra segurando Xavier/Jean no auge | baixa |
| Força Sobre-humana | 9 |  | peso | ergue ~10–13 t → 9 | media |
| Clones de Si Mesmo | 15 |  | outro | mantém clones funcionais de si: escala do gênio genético → 15 | baixa |
| Clones de Mutantes Poderosos | 18 |  | outro | clones de mutantes de nível Ômega (ex.: Madelyne): pareado a 16–20 → 18 | baixa |
| Transferência de Consciência | 16 |  | outro | transfere a mente entre corpos: base Ômega → 16 | baixa |
| Backup Corporal Sempre Pronto (Nunca Morre Permanentemente) | 22 |  | resistencia | volta de quase nada / da morte (topo de 18–22) → 22 | baixa |
| Manipulação Genética Instantânea de Terceiros | 16 |  | outro | reescreve corpo do alvo ignorando Corpo: pareado a alvos rua/Ômega → 16 | baixa |
| Cria Exército de Marauders sob Controle Total | 14 |  | outro | Marauders são super-humanos de rua (10–14) → 14 | baixa |
| Acesso a DNA de Praticamente Todo Mutante Catalogado | 16 |  | informacao | banco genético de quase todos os mutantes, recurso de gênio → 16 | baixa |
| Reconstrói Corpo a Partir de Amostra Genética Mínima | 22 |  | resistencia | volta de quase nada (18–22) → 22 | baixa |
| Implanta Gatilhos Genéticos Latentes em Vítimas | 16 |  | outro | pareado ao Corpo das vítimas (rua/Ômega) → 16 | baixa |
| Sobrevive à Destruição Total do Corpo Físico | 22 |  | resistencia | volta de quase nada (18–22) → 22 | baixa |
| Arquivo Genético Completo | 16 |  | informacao | = Acesso a DNA de quase todo mutante → 16 | baixa |
| Previu Chegada de Mutantes Ômega | — |  | — | histórico | media |
| Manipulou Linhagem Summers por Gerações | — |  | — | histórico | alta |
| Manipulador Genético _(extra)_ | 15 |  | informacao | extra; = Clonagem e Manipulação Genética | media |
| Clonagem _(extra)_ | 15 |  | informacao | extra; = Clonagem e Manipulação Genética | media |
| Marotos _(extra)_ | — |  | — | afiliação/equipe | alta |

### Moondragon (Heather Douglas) — heroi

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Nível Cósmico (Rivaliza Xavier) | 23 |  | distancia | rivaliza Xavier com Cérebro: global → 23 | media |
| Telecinese Precisa Nível Molecular | 14 |  | outro | precisão molecular, força TK moderada; faixa rua alta → 14 | baixa |
| Projeção Astral Ofensiva/Defensiva | 16 |  | informacao | combate astral contra telepatas fortes, piso Ômega → 16 | baixa |
| Controle Mental Global | 23 |  | distancia | ladder: o texto é o feito, alcance global → 23 | media |
| Imune a Telepatia/Controle Mental | 23 |  | outro | pareado à telepatia de Xavier com Cérebro ~23 → 23 | media |
| Pode Apagar ou Reescrever Personalidades Inteiras | 20 |  | outro | reescrita total de mente, faixa Ômega → 20 | baixa |
| Amplifica os Poderes Psíquicos de Aliados | 16 |  | outro | amplificação psíquica, piso Ômega → 16 | baixa |
| Vasculha Mentes de Civilizações Alienígenas Inteiras | 23 |  | distancia | ladder: população de um planeta inteiro = alcance global → 23 | media |
| Combate Psíquico Capaz de Incapacitar Cosmicamente Poderosos | 25 | 31 | outro | entrada não-variante: rotina = vence/segura telepatas Ômega (25, teto de escudos da ladder); derrubar seres cósmicos (31) vai para peak | baixa |
| Sonda o Plano Astral em Busca de Ameaças | 23 |  | distancia | varredura astral de alcance global → 23 | baixa |
| Cura Traumas Mentais Profundos com Precisão Cirúrgica | 14 |  | informacao | cura psíquica fina, faixa rua alta → 14 | baixa |
| Combate Corpo-a-Corpo Nível Mestre | 7 |  | outro | mestra marcial treinada por Titãs, acima do pico humano → 7 | media |
| Disciplina Mental Absoluta | 14 |  | outro | resistência mental de monja titã; pareado a telepatas de rua → 14 | baixa |

### Nate Grey (X-Man - Suprimido / Início) — x-men

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Leitura Mental Alcance Continental | 21 |  | informacao | texto: alcance continental ~5.000 km → 21 | media |
| Telecinese Levita Edifícios | 19 |  | peso | texto: levita edifícios, prédio ~6–12 kt → 18–19 → 19 | media |
| Escudos Psíquicos Fortes | 18 |  | outro | pareado a ataques telepáticos fortes (rua alta–Ômega) → 18 | baixa |
| Projeção Astral | 14 |  | informacao | projeção astral; faixa Ômega baixa/rua alta | baixa |
| Visões Futuro Próximo (Segundos/Minutos) | 8 |  | duracao | precognição de segundos/minutos; faixa rua | baixa |
| Sente Perigo Iminente | 7 |  | outro | sentido de perigo; acima do pico humano | media |
| Potencial Ilimitado (Sem Vírus T-O) | — |  | — | potencial latente | alta |
| Imune a Vírus Techno-Orgânico | 18 |  | outro | pareado ao vírus techno-orgânico (tecnologia Apocalipse/Falange ~18) | baixa |
| Táticas Guerrilha / Emboscada | 8 |  | informacao | guerrilheiro veterano da Era de Apocalipse; faixa rua | media |
| Resistência Mental a Tortura/Lavagem Cerebral | 10 |  | outro | resistência mental a tortura/lavagem; pareado a interrogatório/telepatia de rua | media |
| Conhecimento Tecnologia Apocalipse | 12 |  | informacao | conhece tecnologia de Apocalipse; faixa rua alta | media |

### Nate Grey (X-Man) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Planetária/Cósmica (Sem Vírus T-O) | 23 | 27 | distancia | rotina: telepatia global ~20-40 mil km → 23; pico cósmico (27) | media |
| Telecinese Molecular/Atômica (Cria/Destrói Matéria) | 20 | 25 | peso | rotina: telecinese em escala de navio ~25 kt → 20; pico 25 | baixa |
| Manipulação Realidade Local (Altera Física/Probabilidade) | 20 |  | outro | altera física/probabilidade localmente (faixa Ômega) → 20 | baixa |
| Precognição Estratégica (Vê Futuro Imediato) | 12 |  | duracao | precognição de combate imediata; faixa rua alta → 12 | baixa |
| Projeção Astral Cósmica (Corpo de Energia Psiônica) | 23 |  | distancia | projeção astral em alcance planetário → 23 | baixa |
| Viagem Dimensional / Teletransporte Interestelar | 23 | 51 | distancia | entrada não-variante: rotina = teleporte global 23; literal interestelar (51) em peak | baixa |
| Absorve/Projeta Energia Ilimitada (Solar/Psíquica) | 21 | 30 | energia | rotina: rajadas que arrasam quarteirão → 21; pico montanha (30) | baixa |
| Cria Vida/Matéria do Nada (Manipulação Molecular Total) | 25 | 31 | outro | entrada não-variante: rotina = pico da TK molecular (25); criação de vida/matéria cósmica (31) em peak | baixa |
| Bloqueia/Anula Poderes Psíquicos Alheios (Mesmo Ômega) | 25 |  | outro | ladder: o texto diz que barra até telepatas Ômega → 25 | media |
| Cura Física e Mental Instantânea (Própria e Alheia) | 18 |  | resistencia | cura instantânea de ferimentos graves/mente (acima de regenerar órgãos 13-16) → 18 | baixa |
| Genética Ômega Pura (Sem Vírus T-O) | — |  | — | rótulo genético, não é feito | alta |
| Potencial Igual/Supere Mãe (Jean Grey) | — |  | — | potencial latente | alta |
| Imune a Manipulação Genética (Sinistro/Apocalipse) | 20 |  | outro | pareado à engenharia genética de Sinistro/Apocalipse (~20) → 20 | baixa |
| Cura Trauma Mental/PTSD em Massa | 12 |  | informacao | cura trauma em massa (população de cidade ~11 km) → 12 | media |
| Restaura Mentes Quebradas (Legion, etc.) | 22 |  | outro | pareado a mentes Ômega quebradas como Legion (~22) → 22 | baixa |
| Comunicação com Espíritos/Plano Astral | 16 |  | informacao | comunicação com plano astral; faixa Ômega → 16 | baixa |
| Cura Física via Telecinese Molecular | 16 |  | resistencia | regenera órgãos/membros via telecinese molecular (13-16) → 16 | baixa |
| Vê Todas Linhas Temporais Simultaneamente | 25 | 31 | duracao | entrada não-variante: precognição em topo de Ômega (25); "todas as linhas" (31) em peak | baixa |
| Prevê Ações Inimigas Antes de Acontecerem | 12 |  | duracao | mesma precognição imediata → 12 | baixa |
| Alerta Psíquico Global (Ameaças Cósmicas) | 23 |  | distancia | o texto é o feito: alerta global → 23 | media |

### Onslaught — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia + Telecinese + Magnetismo Nível Cósmico | 30 | 36 | peso | variante: magnetismo/TK acima do Magneto (25) → topo Ômega 30; pico asteroide (36); = Professor X (Onslaught) | media |
| Criou Realidade de Bolso (Era Heroes Reborn) | 60 |  | outro | universo de bolso com Terra inteira (faixa cósmica, via poder de Franklin) → 60 | baixa |
| Controle Mental Planetário SEM Cerebro | 23 |  | informacao | ladder: alcance global sem amplificador → 23 | media |
| Absorve Psiques/Poderes de Vítimas (Franklin, Nate) | 40 |  | outro | pareado aos poderes absorvidos (Nate Grey ~30, Franklin cósmico) → 40 | baixa |
| Projeção Astral Ofensiva = Dano Físico Real | 18 |  | energia | forma astral causa dano físico em heróis de topo (faixa Ômega) → 18 | baixa |
| Reprogramou Sentinelas Globalmente em Segundos | 23 |  | distancia | alcance global ~11.000+ km → 23 | media |
| Imune a Telepatia Externa (Mente Híbrida) | 25 |  | outro | pareado à telepatia de Xavier/Jean (~24) → 25 | media |
| Criou Corpos Físicos de Energia Psiônica | 22 |  | outro | corpo psiônico aguentou Vingadores+Quarteto (nuclear tático 22–24) → 22; = Professor X (Onslaught) | baixa |
| Absorveu a Força Vital de Franklin Richards e Nate Grey | — |  | — | histórico; capacidade em Absorve Psiques/Poderes | media |
| Poder Suficiente para Desafiar Vingadores e X-Men Combinados | 30 |  | outro | pareado a Vingadores + X-Men combinados (topo Ômega) → 30 | baixa |
| Manipula Espectro Eletromagnético Total | 25 |  | energia | mesma escala do magnetismo de Magneto (25) → 25 | media |
| Move Asteroides / Inverte Polos Magnéticos | 36 |  | peso | o texto é o feito: asteroide ~1 km ~1,5 Gt → 36 | media |
| Escudo Magnético Planetário | 21 |  | area | o texto é o feito: raio da Terra ~6.400 km → 21 | alta |
| Extrai Adamantium de Wolverine | 18 |  | outro | pareado ao Esqueleto de Adamantium (16–18) → 18 | alta |
| Cria Constructos Magnéticos Ofensivos | 18 |  | peso | constructos de aço ~6 kt → 18 | media |
| Detecta e Rastreia Qualquer Metal na Terra | 23 |  | distancia | alcance global → 23 | media |
| Voo Magnético Supersônico | 10 |  | velocidade | supersônico ~2.400 km/h → 10 | media |
| Anula Armas e Tecnologia Metálica Inimiga | 20 |  | outro | pareado a armamento militar até Sentinelas (~12–19) → 20 | media |
| Manipula Correntes Elétricas via Eletromagnetismo | 16 |  | energia | redes elétricas de cidade; sobrecarga derruba prédio pequeno → 16 | baixa |
| Inverte Polos Magnéticos do Planeta | 30 |  | outro | o texto é o feito: pareado ao pico planetário de Magneto (30) → 30 | media |
| Acesso Bilhões Mentes Simultaneamente | 23 |  | informacao | ladder: bilhões de mentes = alcance global → 23 | media |
| Reescreve Realidade via Psique Coletiva | 40 |  | outro | alteração de realidade (faixa cósmica) → 40 | baixa |
| Cria Realidade de Bolso (Heroes Reborn) | 60 |  | outro | mesmo feito de Criou Realidade de Bolso → 60 | baixa |
| Bloqueia Telepatas Nível Ômega (Xavier/Jean/Emma) | 25 |  | outro | pareado à telepatia Ômega de Xavier/Jean/Emma (~24) → 25 | media |
| Controla Emoções Coletivas da Humanidade | 23 |  | informacao | ladder: humanidade inteira = alcance global → 23 | media |
| Apaga e Reescreve Memórias em Massa | 23 |  | informacao | populações inteiras, escala global → 23 | media |
| Detecta Qualquer Mutante ou Metaumano no Planeta | 23 |  | distancia | o texto é o feito: global → 23 | alta |
| Projeta Ilusões Psíquicas Indistinguíveis da Realidade | 24 |  | informacao | ilusões perfeitas em heróis de topo (faixa Ômega alta) → 24 | media |
| Fragmenta e Aprisiona Mentes no Plano Astral | 25 |  | informacao | prende mentes Ômega no plano astral → 25 | media |
| Resiste a Ataques Combinados de Múltiplos Telepatas Ômega | 26 |  | outro | pareado a vários telepatas Ômega somados (>24) → 26 | media |
| Cria Universos de Bolso Completos | 60 |  | outro | mesmo feito do universo de bolso → 60 | baixa |
| Reescreve Leis Físicas Locais | 40 |  | outro | alteração de realidade local (faixa cósmica) → 40 | baixa |
| Ressuscita Mortos como Servos Psíquicos | 30 |  | outro | reanimação psíquica (topo Ômega) → 30 | baixa |
| Manipula Tempo/Espaço no Bolso | 40 |  | outro | dentro do bolso: manipulação de tempo/espaço (faixa cósmica) → 40 | baixa |
| Substitui a Realidade Prime pela Sua Própria | 60 |  | outro | mesma escala do universo de bolso → 60 | baixa |
| Aprisiona Heróis Inteiros em Falsas Memórias | 25 |  | informacao | mesma faixa de Fragmenta e Aprisiona Mentes → 25 | media |
| Controla o Fluxo Causal Dentro do Bolso | 40 |  | outro | causalidade no bolso (faixa cósmica) → 40 | baixa |
| Fabrica Exércitos e Cidades Inteiras à Vontade | 31 |  | peso | cidade inteira ~50 Mt de matéria → 31 | baixa |
| Impõe Suas Regras como Leis Físicas Absolutas | 40 |  | outro | mesma faixa de Reescreve Leis Físicas → 40 | baixa |
| Mantém a Ilusão Estável por Meses (Heroes Reborn) | 40 |  | duracao | sustenta ilusão em escala de universo de bolso (faixa cósmica, não pela coluna Tempo) → 40 | baixa |

### Professor X (Charles Xavier) — x-men

Atributos: destreza 2, força 2, corpo 2, inteligência 12, vontade 12, mente 15, influência 10, aura 9, espírito 10

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Ômega | 21 | 23 | distancia | ladder: rotina Ômega sem Cérebro, alcance continental ~5.600 km → 21; com Cérebro global 23 (peak) | media |
| Controle Mental Profundo | 22 |  | informacao | domina mentes de Ômegas/multidões: faixa Ômega alta → 22 | media |
| Mestre de Xadrez | 6 |  | informacao | grão-mestre de xadrez: pico humano → 6 | media |
| Estrategista e Líder Visionário | 12 |  | informacao | estrategista/líder de alcance internacional (rua alta) → 12 | media |
| Fundador do Instituto Xavier | — |  | — | histórico | alta |
| Paraplégico | — |  | — | fraqueza física | alta |
| Mestre em Xadrez Psíquico | 8 |  | informacao | xadrez + leitura telepática do oponente: acima do pico humano → 8 | baixa |
| Sacrifica a Ética pelo Bem Maior | — |  | — | ideologia/falha | alta |
| Rede de Contatos Global | 20 |  | informacao | contatos em vários países/continentes (18–21) → 20 | baixa |
| Criou Gerações de Mutantes | — |  | — | histórico | alta |
| Legado Vive nos Alunos | — |  | — | legado narrativo | alta |
| Perdoa Falhas dos Alunos Repetidamente | — |  | — | personalidade | alta |
| Telepatia de Alcance Global | 23 |  | distancia | o texto é o feito: global (23–24) → 23 | media |
| Acesso Simultâneo a Bilhões de Mentes | 23 |  | distancia | bilhões de mentes = alcance global → 23 | media |
| Rastreamento Mutante Planetário | 23 |  | distancia | o texto é o feito: planeta inteiro → 23 | media |
| Bloqueio Mental Absoluto | 25 |  | outro | ladder: escudo que barra telepatas Ômega (Jean/Xavier com Cérebro 23) → 25 | media |
| Projeção Astral Corpórea | 20 |  | informacao | projeção astral que afeta o mundo físico, alcance continental → 20 | baixa |
| Reescrita de Personalidade | 22 |  | informacao | reescreve mentes inteiras: = Controle Mental Profundo → 22 | media |
| Comunicação Instantânea com X-Men | 21 |  | distancia | elo com a equipe em escala continental ~5.600 km → 21 | media |
| Arquivo Mental da História Mutante | 14 |  | informacao | conhecimento enciclopédico (rua alta) → 14 | baixa |
| Download de Conhecimento/Habilidades | 18 |  | informacao | transfere conhecimento/perícias entre mentes: faixa Ômega → 18 | media |
| Edição de Memória em Massa | 22 |  | informacao | edita memórias de multidões: = Reescrita de Personalidade → 22 | baixa |
| Sugestão Póstuma em Escala Global | 23 |  | distancia | o texto é o feito: global → 23 | baixa |
| Arquiteto do Sonho Mutante | — |  | — | ideologia/papel | alta |
| Recrutador da Primeira Geração de X-Men | — |  | — | histórico | alta |
| Criador do Instituto Xavier para Jovens Superdotados | — |  | — | histórico | alta |
| Mentor de Gerações de Líderes Mutantes | — |  | — | papel/histórico | alta |
| Diplomata da Coexistência Mutante-Humana | 12 |  | informacao | diplomacia em escala internacional (rua alta) → 12 | media |
| Criador da Sala de Perigo para Treinamento Tático | — |  | — | histórico | alta |
| Fundou Múltiplas Gerações de Equipes Mutantes | — |  | — | histórico | alta |
| Visionário do Sonho de Krakoa | — |  | — | ideologia | alta |
| Financia o Instituto com Fortuna Pessoal | — |  | — | recurso/histórico | alta |
| Reconhecido como Líder Espiritual da Mutação | — |  | — | reputação | alta |
| Líder dos X-Men _(extra)_ | — |  | — | papel | alta |
| Intelecto Genial _(extra)_ | 14 |  | informacao | gênio em genética/psicologia (construiu o Cérebro) → 14; = Intelecto Genial do Fera (mesma tag) | media |
| Diplomacia Mutante-Humano _(extra)_ | 12 |  | informacao | extra; = Diplomata da Coexistência | media |
| Idealismo Inabalável _(extra)_ | — |  | — | ideologia | alta |

### Professor X (Onslaught) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia + Telecinese + Magnetismo Nível Cósmico | 30 | 36 | peso | variante: magnetismo/TK acima do Magneto (25) → topo Ômega 30; pico asteroide (36); = Onslaught | media |
| Criou Realidade de Bolso (Heroes Reborn) | 60 |  | outro | variante cósmica: universo de bolso com Terra inteira (poder de Franklin) → 60; = Onslaught | baixa |
| Controle Mental Planetário SEM Cerebro | 23 |  | distancia | ladder: o texto é o feito, alcance global sem amplificador → 23 (degrau global da telepatia) | media |
| Absorve Poderes/Psiques de Vítimas | 40 |  | outro | pareado aos poderes absorvidos (Nate ~30, Franklin cósmico) → 40; = Onslaught | baixa |
| Projeção Astral Ofensiva = Dano Físico | 18 |  | energia | forma astral fere heróis de topo (faixa Ômega) → 18; = Onslaught | baixa |
| Sentinelas Reprogramadas Globalmente | 23 |  | distancia | o texto é o feito: frota global, raio da Terra/meia volta → 23; = Onslaught "Reprogramou Sentinelas Globalmente" | media |
| Imune a Telepatia Externa | 25 |  | outro | pareado à telepatia de Xavier/Jean com Cérebro ~23–24 → 25 | media |
| Cria Corpos Físicos de Energia Psiônica Pura | 22 |  | resistencia | corpo psiônico aguentou Vingadores+Quarteto juntos (nuclear tático 22–24) → 22 | baixa |
| Manipula Matéria em Nível Molecular via Telecinese | 25 |  | outro | TK molecular em escala de Magneto → 25 | baixa |
| Resistência Física Sobre-Humana | 22 |  | resistencia | aguenta Hulk/Thor em conjunto, escala nuclear tática → 22 | media |
| Manipula Espectro Eletromagnético Total | 25 |  | outro | espectro EM inteiro, nível do magnetismo de Magneto → 25 | baixa |
| Move Asteroides / Polos Magnéticos | 36 |  | peso | o texto é o feito: asteroide ~1 km ~1,5 Gt → 36; = Onslaught | baixa |
| Escudo Magnético Planetário | 21 |  | area | o texto é o feito: raio da Terra ~6.400 km → 21 | media |
| Inverte Polaridade Magnética da Terra | 30 |  | outro | o texto é o feito: igual ao peak do Magneto (polos) → 30 | media |
| Cria Armaduras Magnéticas Reativas | 20 |  | resistencia | acima do campo do Magneto (19): artilharia pesada → 20 | baixa |
| Detecta Metal em Escala Planetária | 23 |  | distancia | o texto é o feito: alcance global → 23 | media |
| Voo Sustentado por Campos Magnéticos | 10 |  | velocidade | igual ao voo do Magneto: supersônico ~2.400 km/h → 10 | media |
| Desvia Projéteis e Ataques Metálicos | 19 |  | resistencia | igual ao campo do Magneto: barragem de Sentinelas/artilharia → 19 | media |
| Manipula Campos Eletromagnéticos de Tecnologia Inimiga | 20 |  | outro | desliga/sequestra tecnologia (Sentinelas), faixa Ômega → 20 | baixa |
| Extrai Ferro do Sangue (Ofensiva Letal) | 16 |  | outro | Magneto = 14 (ignora armadura); variante mais forte → 16 | baixa |
| Cria Universos de Bolso (Era Onslaught) | 60 |  | outro | mesmo feito do Heroes Reborn → 60; = Onslaught | baixa |
| Reescreve Física Local | 40 |  | outro | alteração de realidade local (faixa cósmica) → 40; = Onslaught "Reescreve Leis Físicas Locais" | baixa |
| Ressuscita Mortos como Servos | 30 |  | outro | reanimação psíquica (topo Ômega) → 30; = Onslaught | baixa |
| Manipula Tempo Dentro do Bolso Dimensional | 40 |  | duracao | manipulação de tempo no bolso (faixa cósmica) → 40; = Onslaught | baixa |
| Aprisiona Inimigos em Realidades Alternativas | 25 |  | outro | pareado a Vingadores/Quarteto aprisionados (~20–25) → 25 | baixa |
| Cria Réplicas de Locais e Cidades Inteiras | 13 |  | area | réplica de cidade (Nova York) ~11 km → 13 | media |
| Controla Leis da Física a Vontade | 40 |  | outro | mesma faixa de Reescreve Física Local → 40; = Onslaught "Impõe Suas Regras como Leis Físicas" | baixa |
| Fabrica Exércitos de Sentinelas Customizadas | 18 |  | peso | centenas de Sentinelas ~10–20 t cada ≈ 6 kt → 18 | baixa |
| Distorce Percepção de Tempo dos Prisioneiros | 20 |  | informacao | ilusão temporal sobre heróis, faixa Ômega → 20 | baixa |
| Fecha e Abre Portais para o Bolso Dimensional | 40 |  | outro | portais para o bolso, mesmo nível da manipulação do bolso → 40 | baixa |

### Quentin Quire (Kid Omega) — x-men

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Processa Pensamentos Velocidade da Luz | 18 |  | outro | pensamento hiperacelerado; faixa Ômega | baixa |
| Leitura Mental Global Simultânea | 23 |  | informacao | ladder: o texto é o feito, leitura global → 23 | media |
| Constrói Mentes/Realidades Mentais | 18 |  | informacao | constrói realidades mentais; faixa Ômega | baixa |
| Hackeia Tecnologia/Cérebros Via Telepatia | 14 |  | informacao | hackeia tecnologia/cérebros telepaticamente; faixa rua alta | baixa |
| Sobrecarga Psíquica = Dano Físico Cerebral | 16 |  | outro | dano cerebral ignora armadura; pareado ao Corpo de super-humanos | baixa |
| Controle Mental em Massa Instantâneo (Multidões) | 14 |  | informacao | controle de multidões em escala de cidade/metrópole → 13–14 | baixa |
| Cria Ilusões Telepáticas Indistinguíveis da Realidade | 18 |  | informacao | ilusões indistinguíveis; faixa Ômega | baixa |
| Bloqueia/Resiste Invasão de Outros Telepatas Ômega | 25 |  | outro | ladder: o texto diz que barra telepatas Ômega → 25 | baixa |
| Acessa e Copia Memórias/Conhecimento Instantaneamente | 14 |  | informacao | copia memórias/conhecimento instantâneo; faixa rua alta | baixa |
| Projeção Astral de Combate em Escala de Cidade | 13 |  | informacao | texto: projeção em escala de cidade → 12–13 | media |
| Telepatia Cósmica | 25 | 31 | informacao | hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Telecinese Molecular | 25 | 31 | outro | hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Chamas Fênix | 25 | 31 | energia | hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Ressurreição | 25 | 31 | resistencia | hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Processa Informação Velocidade Super-Humana | 12 |  | informacao | processa informação sobre-humana; faixa rua alta | media |
| Poliglota Instantâneo / Baixa Conhecimento | 12 |  | informacao | baixa conhecimento/línguas telepaticamente; faixa rua alta | media |
| Estrategista Tático Imbatível (Mente) | 10 |  | informacao | estrategista; faixa rua | media |
| Carisma Manipulador / Recruta Seguidores | 9 |  | informacao | carisma manipulador, recruta a Omega Gang; faixa rua | media |
| Terrorismo Psíquico / Anarquia | — |  | — | ideologia/comportamento | media |

### Rachel Summers (Fênix / Marvel Girl) — x-men

Atributos: destreza 6, força 5, corpo 5, inteligência 9, vontade 9, mente 12, influência 8, aura 11, espírito 11

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Anfitrião da Força Fênix | 22 |  | outro | Fênix ativa amplifica telepatia/telecinese ao nível Ômega alto → 22 | baixa |
| Rastreadora de Mutantes | 23 |  | distancia | umbrella ≥ sub-técnica "Rastreamento Psíquico de Qualquer Mutante no Planeta" (23): rastreio global → 23 | media |
| Telepatia Ômega | 21 | 23 | distancia | ladder: rotina Ômega continental ~5.000 km → 21 (igual a Jean); pico global 23 | media |
| Telecinesia Devastadora | 16 | 22 | peso | telecinese em escala de prédio pequeno ~1.500 t → 16 (igual a Jean) | media |
| Rastreadora Mutante Implacável | 23 |  | distancia | mesmo rastreio de Rastreadora de Mutantes → 23 | media |
| Determinação Inabalável | — |  | — | traço de personalidade | alta |
| Laço Familiar com Cable | — |  | — | relacionamento | alta |
| Telepatia Ômega (Linha Temporal Alternativa) | 21 | 23 | distancia | mesma telepatia Ômega → 21; pico global 23 | media |
| Telecinese Molecular | 16 |  | outro | manipulação molecular; não excede a telecinese (16) | baixa |
| Chamas Cósmicas da Fênix | 20 |  | energia | chamas da Fênix arrasam quarteirão/afundam navio → 20 (igual a Jean) | baixa |
| Viagem Temporal Psíquica | 22 |  | duracao | envia consciências décadas no tempo (Dias de um Futuro Esquecido); faixa Ômega → 22 | baixa |
| Ressurreição Auto-Induzida | 22 |  | resistencia | volta da morte → 22 (igual a Jean) | baixa |
| Precognição Cósmica (Vê Linhas Temporais) | 20 |  | duracao | vê linhas temporais; faixa Ômega → 20 | baixa |
| Amplifica Poderes de Toda Equipe ao Redor | 14 |  | outro | amplifica poderes da equipe próxima; faixa rua alta → 14 | baixa |
| Barreira Psíquica Cósmica Contra Invasões Mentais | 25 |  | outro | ladder: barreira que segura Xavier/Emma (telepatas Ômega) → 25 | media |
| Manipula Fluxo Temporal em Escala Planetária | 23 |  | area | o texto é o feito: escala planetária (global) → 23 | baixa |
| Devastação em Massa Quando Descontrolada | 25 |  | energia | descontrolada arrasa distrito (25-30) → 25 | baixa |
| Leitura Mental Global / Interestelar | 23 | 51 | distancia | entrada não-variante: leitura global = 23 (ladder); o literal interestelar (51) vai para peak | media |
| Projeção Astral Combatente | 18 |  | informacao | combate astral contra Ômegas; faixa Ômega → 18 | media |
| Bloqueio Mental Absoluto (Resistiu Xavier/Emma) | 25 |  | outro | ladder: o texto diz que resistiu a Xavier/Emma → 25 | media |
| Comando Mental em Massa | 14 |  | area | comanda multidão/metrópole parcial (~45 km) → 14 | media |
| Link Psíquico Permanente com Cable/Mãe | — |  | — | relacionamento | alta |
| Telecinese Sincronizada com Telepatia (Ataques Combinados) | 16 |  | outro | combina telecinese e telepatia; não excede a telecinese (16) | media |
| Cirurgia Mental de Precisão (Remove Bloqueios/Traumas) | 16 |  | informacao | cirurgia mental de precisão em traumas profundos; faixa Ômega → 16 | media |
| Escudos Psíquicos Intransponíveis | 25 |  | outro | ladder: mesmos escudos da barreira; seguram telepatas Ômega → 25 | media |
| Rastreamento Psíquico de Qualquer Mutante no Planeta | 23 |  | distancia | o texto é o feito: qualquer mutante no planeta (global) → 23 | media |
| Ilusões Telepáticas Perfeitas em Múltiplos Sentidos | 18 |  | informacao | ilusões perfeitas multissensoriais: faixa Ômega → 18; = mesma tag do Cable (Liberado) e Ilusões Perfeitas da Emma | media |
| Rastreadora do Futuro _(extra)_ | 23 |  | distancia | extra; repete o rastreio de mutantes → 23 | baixa |

### Rachel Summers (Fênix Force - Avatar Completo) — x-men

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Cósmica (Galáxia) | 68 |  | informacao | o texto é o feito: galáxia ~100.000 anos-luz → 68 | media |
| Telecinese Molecular/Atômica | 40 | 78 | peso | avatar Fênix: TK em escala de montanhas/continente (~10¹¹ t) → 40; pico planetário | baixa |
| Chamas Fênix Queimam no Vácuo/Tempo | 50 |  | energia | fogo Fênix cósmico (devastação planetária baixa 46–60) → 50 | baixa |
| Viagem Temporal / Realidades Psíquica | 40 |  | outro | viagem entre épocas/realidades (faixa cósmica) → 40 | baixa |
| Ressurreição Infinita | 50 |  | duracao | mesma ressurreição Fênix de Jean → 50 | baixa |
| Precognição Cósmica (Todas Linhas Temporais) | 40 |  | duracao | precognição multilinha (faixa cósmica, não pela coluna Tempo) → 40 | baixa |
| Manipulação Realidade Local | 40 |  | outro | alteração de realidade local (faixa cósmica) → 40 | baixa |
| Amplificação Cósmica de Todo o Time ao Redor | 30 |  | outro | amplifica aliados a topo Ômega → 30 | baixa |
| Barreira Psíquica Impenetrável em Escala Estelar | 35 |  | area | variante cósmica: barreira em escala de sistema estelar interno (~10¹¹ m) → 35; = barreira estelar da Emma (Phoenix Five) | baixa |
| Devastação de Sistemas Estelares Quando Descontrolada | 78 | 96 | energia | controlada: planeta (~78); descontrolada: sistema estelar → pico 96 | baixa |

### Sersi (Eterna) — heroi

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transmutação Molecular/Atômica Absoluta | 30 | 32 | peso | umbrella ≥ sub-técnica "Reorganiza a Matéria de uma Cidade" (30, teto não-variante); rotina demonstrada ~100 kt (22); literal cidade ~10⁸ t (32) em peak | baixa |
| Transforma Qualquer Coisa em Qualquer Coisa | 30 | 32 | peso | = Transmutação Molecular (umbrella) → 30; peak 32 | media |
| Cria Vida / Seres Vivos do Nada | 20 |  | outro | cria seres vivos por transmutação: faixa Ômega → 20 | baixa |
| Imortalidade / Regeneração Absoluta | 22 |  | resistencia | Eterna regenera de quase nada (topo 18–22) → 22 | media |
| Voo / Projeção Energia Cósmica | 16 |  | energia | rajada cósmica de Eterna derruba prédio pequeno (16–18) → 16 | baixa |
| Ilusões Perfeitas (Manipula Luz/Matéria) | 18 |  | informacao | ilusões de luz/matéria indistinguíveis: faixa Ômega → 18 | media |
| Transmuta Pessoas em Estátuas de Ouro ou Pedra | 18 |  | outro | ignora Corpo: pareado a super-humanos rua/Ômega → 18 | baixa |
| Reorganiza a Matéria de uma Cidade Inteira | 30 | 32 | peso | Eterna, entrada não-variante: teto planetário 30; literal matéria de uma cidade ~10⁸ t (32) em peak | baixa |
| Desintegra Matéria à Vontade | 18 |  | energia | desintegra até prédio pequeno inteiro (16–18) → 18 | baixa |
| Absorve e Redistribui Energia Cósmica em Escala Massiva | 22 |  | outro | pareado a ataques cósmicos/Ômega altos → 22 | baixa |
| Influência Social / Festa / Carisma Divino | 14 |  | informacao | carisma milenar, influência social de elite (= Magneto 14) → 14 | media |
| História Milenar / Conhecimento Antigo | 13 |  | informacao | milênios de conhecimento acumulado (rua alta) → 13 | media |

### Shadow King (Amahl Farouk) — vilao

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Nível Cósmico (Rivaliza Xavier) | 23 |  | distancia | rivaliza Xavier com Cérebro: global → 23 | media |
| Possui Corpos / Mentes Simultaneamente | 18 |  | outro | possuiu população inteira da Ilha Muir e vários hospedeiros; faixa Ômega → 18 | baixa |
| Vive no Plano Astral (Imortalidade Efetiva) | 25 |  | duracao | existência astral milenar, faixa Ômega alta → 25 | baixa |
| Alimenta-se de Emoções Negativas (Medo/Ódio) | 12 |  | outro | fonte de poder emocional; faixa rua alta → 12 | baixa |
| Cria Ilusões Perfeitas / Mundos Mentais | 22 |  | informacao | engana até Xavier; pareado a telepatas Ômega → 22 | media |
| Corrompe Telepatas (Mesmo Ômega) | 23 |  | outro | pareado a telepatas Ômega (Jean/Xavier ~23) → 23 | baixa |
| Sobrevive à Morte do Corpo Hospedeiro | 22 |  | resistencia | volta de quase nada (topo 18–22) → 22 | baixa |
| Manipula Multiversos Através do Astral | 25 | 35 | outro | entrada não-variante: rotina limitada ao topo da faixa telepática (25); alcance multiversal literal (35) vai para peak | baixa |
| Rivaliza Diretamente o Poder Telepático de Xavier | 23 |  | outro | pareado a Xavier com Cérebro ~23 → 23 | media |
| Assimila Consciências de Vítimas Permanentemente | 20 |  | outro | absorção permanente de mentes, faixa Ômega → 20 | baixa |
| Controla Plano Astral Inteiro | 23 |  | area | ladder: domínio astral tratado como alcance global → 23 | baixa |
| Aprisiona Almas/Mentes no Astral | 23 |  | outro | prendeu a mente de Xavier; pareado ~23 → 23 | baixa |
| Manipula Sonhos Globais | 23 |  | distancia | ladder: o texto é o feito, alcance global → 23 | media |
| Cria Pesadelos Coletivos | 20 |  | area | pesadelos em massa ~país → 20 | baixa |
| Constrói Reinos Inteiros Dentro do Astral | 20 |  | area | reino astral de escala país/continente → 20 | baixa |
| Corrompe Viajantes Astrais à Vontade | 23 |  | outro | pareado a Xavier/Psylocke no astral ~23 → 23 | baixa |
| Bloqueia Retorno de Mentes ao Corpo Físico | 23 |  | outro | prende a mente de Xavier; pareado ~23 → 23 | baixa |
| Sente Qualquer Presença Psíquica no Astral | 23 |  | distancia | ladder: detecção astral de alcance global → 23 | baixa |
| Drena Energia Vital Através do Astral | 16 |  | energia | drena hospedeiros até a morte; faixa Ômega baixa → 16 | baixa |
| Manifesta Formas Físicas Terríveis no Astral | 18 |  | informacao | manifestações astrais aterrorizantes, faixa Ômega → 18 | baixa |
| Corrompe Heróis (Tempestade, Karma, Psylocke) | 20 |  | outro | pareado à vontade de heróis treinados contra telepatia (~20) → 20 | baixa |
| Implanta Personalidades Falsas | 20 |  | outro | reescrita de identidade, faixa Ômega → 20 | baixa |
| Gatilhos Pós-Hipnóticos Ocultos | 18 |  | informacao | escondidos até de telepatas fortes → 18 | baixa |
| Manipula Percepção de Realidade das Vítimas | 20 |  | informacao | ilusão sustentada sobre heróis, faixa Ômega → 20 | baixa |
| Cria Personas Alternativas Permanentes nos Hospedeiros | 20 |  | outro | igual Implanta Personalidades Falsas → 20 | baixa |
| Controla Emoções e Impulsos das Vítimas | 18 |  | informacao | controle emocional profundo, faixa Ômega → 18 | baixa |
| Espalha Corrupção Psíquica em Cadeia | 14 |  | area | contágio de mente em mente na Ilha Muir/região ~45 km → 14 | baixa |
| Domina Mentes Coletivas de Comunidades Inteiras | 13 |  | area | cidade/comunidade inteira ~11 km → 13 | media |
| Resiste a Exorcismo Psíquico Convencional | 22 |  | outro | pareado a telepatas Ômega que tentaram expulsá-lo (~22–23) → 22 | baixa |
| Reconstrói Identidade da Vítima do Zero | 20 |  | outro | reescrita total de identidade → 20 | baixa |

### Thena (Eterna) — heroi

Atributos: destreza 8, força 8, corpo 8, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Determinação Inabalável | — |  | — | personalidade | alta |
| Reflexos Sobre-Humanos | 9 |  | outro | reflexos sobre-humanos de Eterna; faixa rua | media |
| Resistência Mental Superior | 10 |  | outro | resistência mental de Eterna; pareado a telepatia de rua | media |
| Manipulação Matéria Cósmica (Igual Sersi) | 22 |  | outro | texto: igual a Sersi → pareado à transmutação de rotina demonstrada da Sersi (~100 kt = 22); o umbrella 30 da Sersi vem do feito de cidade, que Thena não tem | baixa |
| Armas Cósmicas Manifesta da Mente | 14 |  | energia | armas cósmicas mentais: cortam titânio/blindagem (13–15) | media |
| Voo / Velocidade Luz / Teleporte | 14 |  | velocidade | voo de Eterna além da velocidade de escape ~40.000 km/h → 14 (texto exagera; teleporte de longo alcance) | baixa |
| Imortalidade / Invulnerabilidade Quase Total | 18 |  | resistencia | Eterna: aguenta derrubada de prédio/regenera de quase nada (16–18) | media |
| Conhecimento Estratégico Milenar | 12 |  | informacao | estratégia acumulada em milênios; faixa rua alta | media |
| Forja Armas de Energia Cósmica em Segundos (Espadas, Lanças, Escudos) | 14 |  | energia | mesmas armas cósmicas forjadas em segundos → 14 | media |
| Domina Incontáveis Estilos de Combate Acumulados em Milênios | 10 |  | outro | milênios de estilos de combate; faixa rua | media |
| Rajadas de Energia Cósmica Devastadoras | 16 |  | energia | rajadas cósmicas: derrubam prédio pequeno (16–18) → 16 | media |
| Resistência Extrema a Dano Físico e Energia | 16 |  | resistencia | resiste a dano físico/energia de nível 'virtualmente indestrutível' baixo → 16 | media |
| Sente e Rastreia Fontes de Energia Cósmica a Grandes Distâncias | 18 |  | distancia | rastreia energia cósmica a grandes distâncias ~700–1.400 km → 18 | baixa |

## Perigo: alto

### Agent Zero (David North / Christoph Nord) — vilao

Atributos: destreza 10, força 5, corpo 6, inteligência 7, vontade 8, mente 7, influência 6, aura 6, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção e Liberação de Energia Cinética | 9 |  | outro | absorve tiros e explosões (granada/artilharia leve ~9) → 9 | media |
| Traje de Supressão de Poderes | 10 |  | outro | anulação pareada aos graus de mutantes de rua típicos (~10) | baixa |
| Absorve Energia Cinética de Impactos, Tiros e Explosões | 9 |  | resistencia | mesma absorção: tiros/explosões → 9 | media |
| Libera a Energia Absorvida em Rajadas Explosivas Concentradas | 8 |  | energia | libera o absorvido: derruba parede de tijolo/vira carro → 8 (≤ absorção) | media |
| Precisão de Atirador Nível CIA em Qualquer Distância | 9 |  | distancia | tiro de precisão a ~1-1,5 km → 9 | media |
| Treinamento de Elite em Operações Secretas e Infiltração | 6 |  | informacao | operações secretas no pico humano → 6 | media |
| Rede de Contatos entre Mercenários e Agências de Inteligência | — |  | — | rede de contatos (relacionamento) | alta |
| Frieza Profissional sem Motivação Ideológica | — |  | — | personalidade | alta |
| Fator de Cura _(extra)_ | 9 |  | resistencia | fator de cura: ferimentos de bala em pouco tempo (9-12) → 9 | baixa |
| Atirador _(extra)_ | 9 |  | distancia | extra; mesmo tiro de precisão ~1,5 km → 9 | media |
| Agente de Elite _(extra)_ | 6 |  | informacao | extra; mesmo treino de elite → 6 | media |
| Caçador de Mutantes Profissional _(extra)_ | — |  | — | papel/profissão | alta |

### Apocalipse (Base - Mutante Antigo) — vilao

Atributos: destreza 7, força 7, corpo 7, inteligência 6, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Imortalidade Biológica (Viveu 5000+ Anos) | 20 |  | duracao | 5.000+ anos sem envelhecer; mesma imortalidade do Apocalipse (faixa Ômega, não pela coluna Tempo) → 20 | media |
| Força Sobre-Humana Base (Classe 50+) | 11 |  | peso | o texto é o feito: classe 50 = ~50 t → 11 | alta |
| Invulnerabilidade a Doenças/Envelhecimento | 14 |  | outro | imunidade a doenças/idade, pareada a toxinas super-humanas → 14 | media |
| Inteligência Acumulada Milênios | 12 |  | informacao | milênios de saber acumulado (faixa rua alta) → 12 | media |
| Manipulação Molecular Limitada (Próprio Corpo) | 12 |  | outro | remodela o próprio corpo de forma limitada (faixa rua) → 12 | baixa |
| Testa Mutantes/Humanos em Combate | — |  | — | comportamento/ideologia | alta |
| Cria Cavaleiros (Empodera Servos) | 12 |  | outro | empodera servos sem tecnologia Celestial (faixa rua) → 12 | baixa |
| Destrói Fraco para Fortalecer Forte | — |  | — | ideologia | alta |

### Bishop (Lucas Bishop) — x-men

Atributos: destreza 7, força 8, corpo 8, inteligência 7, vontade 8, mente 7, influência 6, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção e Redirecionamento de Energia | 20 | 25 | outro | umbrella ≥ sub-técnica "Absorve Radiação e Energia Cósmica de Nível Extremo" (20): absorve energia cósmica pesada de rotina → 20 | media |
| Armamento Pesado | 10 |  | energia | rifles de plasma do futuro partem blindado leve (9–10) → 10 | media |
| Treinamento XSE | 6 |  | outro | treino policial/militar de elite: pico humano → 6 | media |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Absorve Qualquer Forma de Energia (Cinética, Térmica, Elétrica, Cósmica) | 20 |  | outro | umbrella ≥ sub-técnica "Absorve Radiação e Energia Cósmica de Nível Extremo" (20): absorve energia cósmica pesada de rotina → 20 | media |
| Redireciona Energia Absorvida em Rajadas Devastadoras | 14 | 22 | energia | rotina: rajada derruba tanque/avião (11–15) → 14; pico depende do que absorveu | media |
| Imune a Danos de Projéteis e Armas de Energia | 15 |  | outro | pareado a armas de energia típicas (Sentinelas ~15) → 15 | media |
| Carrega Armas Convencionais com Energia Absorvida | 10 |  | energia | munição carregada parte blindado leve → 10 | baixa |
| Sobrecarga Deliberada Gera Explosão de Área | 15 |  | energia | descarga total derruba avião grande / navio pequeno (13–15) → 15 | baixa |
| Absorve Ataques de Múltiplas Fontes Simultaneamente | 20 |  | outro | umbrella ≥ sub-técnica "Absorve Radiação e Energia Cósmica de Nível Extremo" (20): absorve energia cósmica pesada de rotina → 20 | media |
| Redistribui Energia Absorvida para Fortalecer o Próprio Corpo | 9 |  | peso | força ampliada ergue ~13 t → 9 | baixa |
| Absorve Radiação e Energia Cósmica de Nível Extremo | 20 |  | outro | o texto afirma nível extremo: pareado a energia cósmica pesada → 20 | baixa |
| Canaliza Energia Absorvida Através do Próprio Corpo Sem Dano | 20 |  | outro | umbrella ≥ sub-técnica "Absorve Radiação e Energia Cósmica de Nível Extremo" (20): absorve energia cósmica pesada de rotina → 20 | media |
| Detecta Fontes de Energia à Distância Antes do Impacto | 6 |  | distancia | percebe fontes de energia a ~180 m → 6 | baixa |
| Rastreamento Temporal | 14 |  | outro | rastreia viajantes do tempo entre eras: faixa rua alta → 14 | baixa |
| Conhecimento de Eventos Futuros | 10 |  | informacao | conhece a linha do tempo futura (desatualizável): faixa rua → 10 | baixa |
| Táticas da XSE | 6 |  | informacao | tática de força policial de elite: pico humano → 6 | media |
| Marcado com M no Rosto _(extra)_ | — |  | — | marca física/histórico | alta |
| Marcado com "M" no rosto _(extra)_ | — |  | — | marca física/histórico | alta |

### Blockbuster — vilao

Atributos: destreza 3, força 12, corpo 13, inteligência 2, vontade 4, mente 2, influência 2, aura 3, espírito 3

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força Bruta Destrói Paredes e Veículos com Socos | 9 |  | energia | soco arruína concreto armado/veículos → 9 | media |
| Resistência a Impactos Que Quebrariam Ossos Normais | 10 |  | resistencia | aguenta Colossus/artilharia leve → 10 | media |
| Golpes de Área Derrubam Múltiplos Oponentes de Uma Vez | 8 |  | energia | varre grupo; impacto vira caminhão → 8 | media |
| Lealdade Cega aos Marotos de Mister Sinister | — |  | — | lealdade/relacionamento | alta |
| Força e Resistência Colossais | 11 |  | peso | ergue ~50 t (blindado/tanque leve) → 11 | media |
| Capanga Leal de Sinister _(extra)_ | — |  | — | papel/relacionamento | alta |

### Callisto — morlock

Atributos: destreza 11, força 7, corpo 8, inteligência 7, vontade 9, mente 7, influência 8, aura 7, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Sentidos Aguçados | 6 |  | distancia | sentidos aguçados percebem a ~180 m nos túneis | media |
| Combate Feral com Faca | 4 |  | energia | faca em combate feral: golpe de atleta | media |
| Combate Corporal | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Estratégia | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Vontade de Ferro | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Exploração de Ambiente | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Intensivo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Táticas Avançadas | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Perícia em Campo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Liderança dos Morlocks | 6 |  | informacao | lidera os Morlocks por respeito; faixa humana alta | media |
| Sente a Presença e a Natureza de Poderes Mutantes Próximos | 6 |  | distancia | radar sente mutantes a ~180 m | media |
| Rastreia Qualquer Um pelas Galerias no Escuro Total | 8 |  | distancia | rastreia pelas galerias no breu ~760 m | media |
| Avalia a Força de um Oponente Antes do Combate Começar | 6 |  | informacao | avalia a força do oponente pelo radar; faixa humana alta | baixa |
| Líder dos Túneis _(extra)_ | 6 |  | informacao | extra; mesma Liderança dos Morlocks | media |
| Caçadora _(extra)_ | — |  | — | papel/rótulo | media |
| Tentáculos Preênseis (pós-Mojo) _(extra)_ | 4 |  | peso | tentáculos preênseis seguram/erguem ~340 kg | baixa |

### Ciclope (Scott Summers) — x-men

Atributos: destreza 9, força 5, corpo 6, inteligência 8, vontade 10, mente 8, influência 8, aura 7, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força Concussiva Pura (Sem Calor) | 18 | 30 | energia | rotina: pulveriza Sentinelas/derruba prédio pequeno (16-18) → 18; pico sem visor nivela montanha (30) | media |
| Alimentado por Energia Solar | — |  | — | mecanismo do poder, não feito | alta |
| Nível Edifício+ (Pulveriza Sentinelas, Nivela Montanhas) | 18 | 30 | energia | o texto é o feito: nível edifício → 18; montanhas no pico (30) | media |
| Ricochete Calculado em Múltiplas Superfícies (8+ Quicadas) | 10 |  | outro | geometria de 8+ quicadas; acima do pico humano (faixa rua) → 10 | media |
| Precisão Cirúrgica (Feixe Fino como Agulha a Longa Distância) | 9 |  | distancia | feixe fino preciso a longa distância ~1,5 km → 9 | media |
| Modulação de Feixe para Efeitos Táticos (Cone, Propulsão, Perfuração de Adamantium) | 18 |  | energia | perfura adamantium (virtualmente indestrutível 16-18); não excede a rajada → 18 | baixa |
| Gênio Tático (42+ Planos de Contingência, ex: Kuurth-Juggernaut) | 12 |  | informacao | gênio tático de elite (planos contra Juggernaut-Kuurth); faixa rua alta → 12 | media |
| Liderança Nata como Primeiro X-Man | 12 |  | informacao | lidera X-Men/Utopia (nação mutante) → 12 | media |
| Leitura Instantânea de Campo de Batalha | 10 |  | informacao | leitura de campo instantânea; acima do pico humano → 10 | media |
| Sincroniza Ataques Combinados de Toda a Equipe | 10 |  | informacao | coordena ataques de equipe → 10 | media |
| Adapta Estratégia em Tempo Real Contra Ameaças Cósmicas | 12 |  | informacao | mesmo gênio tático contra ameaças cósmicas → 12 | media |
| Forja e Treina Novas Gerações de X-Men | — |  | — | papel social (mentor) | alta |
| Mantém Comando sob Pressão Extrema e Perdas em Combate | — |  | — | traço de personalidade (compostura) | media |
| Domínio de Estratégia Contra Equipes Superpoderosas (Vingadores, Liga) | 12 |  | informacao | mesmo gênio tático contra equipes superpoderosas → 12 | media |
| Conhecimento Enciclopédico das Capacidades de Aliados e Inimigos | 10 |  | informacao | memória tática enciclopédica → 10 | media |
| Autoridade Tática Reconhecida por Veteranos e Rivais | — |  | — | reputação | alta |
| Comandante de Campo _(extra)_ | 12 |  | informacao | extra; mesma liderança/comando → 12 | media |
| Disciplina de Aço _(extra)_ | — |  | — | traço de personalidade | alta |
| Estrategista Nato _(extra)_ | 12 |  | informacao | extra; mesmo gênio tático → 12 | media |
| Amor por Jean Grey _(extra)_ | — |  | — | relacionamento | alta |
| Rajada Óptica Concussiva Pura (Sem Calor, Velocidade da Luz, Solar) _(extra)_ | 18 | 30 | energia | extra; mesma rajada óptica → 18 | media |
| Mestre do Ricochete (8+ Quicadas, Geometria Instantânea, Acerta Alvos Ocultos) _(extra)_ | 10 |  | outro | extra; mesmo ricochete → 10 | media |
| Precisão Cirúrgica (Feixe Fino como Agulha, Desarma Múltiplos, Acerta Miçanga) _(extra)_ | 9 |  | distancia | extra; mesma precisão → 9 | media |
| Táticas Ópticas (Cone Área, Pulso Propulsão, Perfura Adamantium, Stun) _(extra)_ | 18 |  | energia | extra; mesmas táticas ópticas (perfura adamantium) → 18 | baixa |
| Comandante de Campo (Gênio Tático 42+ Planos, Manobras Sincronizadas) _(extra)_ | 12 |  | informacao | extra; mesmo gênio tático → 12 | media |
| Condicionamento Pico Humano (Treino 6h/dia, Judo-Vira Colossus, Sobrevive Soco/ Raio) _(extra)_ | 6 |  | resistencia | pico humano (aguenta soco/derruba Colossus com judô) → 6 | media |
| Fortaleza Mental (Caixa Preta Intransponível, Prendeu Vazio, Resistiu Apocalipse/Brood) _(extra)_ | 20 |  | outro | pareado à invasão mental de Apocalipse/Ninhada (~20) → 20 | baixa |
| Visor de Quartzo-Rubi (Micro-Interruptores, Visor Batalha > Óculos, Blackbird Amplifica) _(extra)_ | 18 |  | outro | visor contém e modula a rajada inteira; pareado à rajada → 18 | baixa |

### Colossus (Piotr Rasputin) — x-men

Atributos: destreza 6, força 14, corpo 13, inteligência 5, vontade 7, mente 6, influência 6, aura 6, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transformação em Aço Orgânico Indestrutível | 18 |  | resistencia | aço orgânico aguenta Fanático/artilharia: material virtualmente indestrutível → 18 (família 18–20) | media |
| Força Colossal | 12 | 14 | peso | ergue ~100 t de rotina (classe 100) → 12; pico ~400 t | media |
| Invulnerabilidade ao Dano Físico Convencional | 13 |  | resistencia | balas, explosões, antitanque convencional (13–15) → 13 | media |
| Artista e Pintor Sensível | — |  | — | traço/hobby | alta |
| Lealdade à Irmã Magik | — |  | — | relacionamento | alta |
| Força Interior | — |  | — | personalidade | alta |
| Força Sobre-humana | 12 |  | peso | mesma força de Força Colossal (~100 t) → 12 | media |
| Pele de Aço Orgânico | 16 |  | resistencia | mesma forma de aço de Transformação em Aço Orgânico → 16 | media |
| Irmão de Magik (Illyana) | — |  | — | relacionamento | alta |
| Sangue de Feiticeiros | — |  | — | herança/latente | alta |
| Conexão com Limbo | — |  | — | vínculo narrativo | media |
| Protege Inocentes | — |  | — | personalidade | alta |
| Pele de Aço Orgânico Virtualmente Indestrutível | 18 |  | resistencia | o texto é o feito: virtualmente indestrutível → 18 | media |
| Força Sobre-Humana Capaz de Erguer Dezenas de Toneladas | 11 |  | peso | o texto é o feito: dezenas de toneladas ~50 t → 11 | alta |
| Invulnerabilidade a Balas, Explosões e Impactos Diretos | 13 |  | resistencia | balas e explosões até antitanque (13–15) → 13 | media |
| Resistência Total a Temperaturas Extremas em Forma Metálica | 12 |  | resistencia | aguenta fogo intenso/frio extremo em aço → 12 | media |
| Golpes Capazes de Rachar Concreto Reforçado e Metal | 10 |  | energia | o texto é o feito: concreto armado (9–10) → 10 | alta |
| Sobrevive a Quedas de Grandes Alturas Sem Dano | 12 |  | resistencia | queda em velocidade terminal sem dano (impacto ~ tanque/bunker) → 12 | media |
| Transformação Reflexa Instantânea Sob Ameaça | 10 |  | velocidade | transforma-se antes do tiro chegar: projétil ~2.400 km/h → 10 | media |
| Resistência a Corrosão, Veneno e Doenças em Forma Metálica | 12 |  | outro | imunidade em forma de aço, pareada a toxinas/corrosivos fortes → 12 | media |
| Amplificação de Impacto em Golpes de Combate Corpo a Corpo | 12 |  | energia | socos em aço com ~100 t de força arruínam tanque (11–12) → 12 | media |
| Suporta Pressões Extremas (Vácuo do Espaço, Profundezas Oceânicas) | 14 |  | resistencia | vácuo e fundo do oceano em forma de aço → 14 | media |
| Artista e Pintor _(extra)_ | — |  | — | traço/hobby | alta |
| Protetor da Família Rasputin _(extra)_ | — |  | — | relacionamento | alta |

### Domino (Neena Thurman) — geracaox

Atributos: destreza 10, força 6, corpo 7, inteligência 8, vontade 8, mente 7, influência 7, aura 9, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Campo de Sorte Probabilística | 14 |  | outro | pareado ao que anula: tiros erram, armas travam, golpes super-humanos desviam (rua alta) → 14 | baixa |
| Franco-atirador de Elite | 9 |  | distancia | tiro de precisão a ~1,5–2 km → 9 | media |
| Combate Corpo-a-Corpo Avançado | 6 |  | outro | luta de elite: pico humano → 6 | media |
| Mercenária Veterana | — |  | — | histórico/papel | alta |
| Coração de Mercenária | — |  | — | personalidade | alta |
| Distorce a Probabilidade ao Seu Redor em Favor Próprio | 14 |  | outro | = Campo de Sorte Probabilística → 14 | baixa |
| Projéteis e Golpes Inimigos Desviam Sozinhos por "Coincidência" | 14 |  | outro | pareado a projéteis/golpes super-humanos de rua → 14 | baixa |
| Funciona Melhor Sob Instinto — Falha Quando Ela Tenta Planejar | — |  | — | fraqueza/limitação | alta |
| Confiança Absoluta em Nathan | — |  | — | relacionamento | alta |
| Ex-Membro X-Force | — |  | — | histórico | alta |

### Elixir (Josh Foley) — novatos

Atributos: destreza 5, força 4, corpo 5, inteligência 7, vontade 7, mente 9, influência 6, aura 9, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Biomassa Dourada | 16 | 20 | resistencia | cura de rotina: ferimentos fatais e regenera membros/órgãos (13–16) → 16; pico: traz de volta à beira da morte | media |
| Biomassa Negra | 14 |  | outro | mata/desfaz tecido por dentro, ignora armadura; pareado a Corpo de super-humanos de rua → 14 | baixa |
| Combate Corporal | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Estratégia | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Vontade de Ferro | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Exploração de Ambiente | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Intensivo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Táticas Avançadas | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Perícia em Campo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Potencial Nível Ômega não totalmente desbloqueado | — |  | — | latente | alta |
| Cura Ferimentos Fatais com um Toque | 16 |  | resistencia | mesma Biomassa Dourada → 16 | media |
| Regenera Membros e Órgãos Perdidos | 16 |  | resistencia | regenera membros/órgãos (13–16) → 16 | media |
| Reescreve a Biologia de Terceiros ao Toque | 16 |  | outro | biocinese plena, não acima da cura → 16 | baixa |
| Concede ou Remove Habilidades Físicas Temporariamente | 14 |  | outro | altera fisiologia de alvos de rua → 14 | baixa |
| Desintegra Tecidos Vivos por Dentro Instantaneamente | 14 |  | outro | mesma Biomassa Negra → 14 | baixa |
| Neutraliza Venenos, Doenças e Mutações Hostis | 14 |  | outro | pareado a doenças/mutações de rua (vírus, toxinas) → 14 | baixa |
| Acelera ou Reverte o Envelhecimento Celular | 14 |  | outro | biocinese celular, faixa rua alta → 14 | baixa |
| Sente a Estrutura Biológica de Qualquer Ser Vivo ao Redor | 4 |  | distancia | percepção biológica ~prédio 45 m → 4 | baixa |
| Reanima Tecido Morto por Curto Período | 16 |  | resistencia | no teto da cura (não a supera) → 16 | baixa |
| Potencial Latente Comparável aos Maiores Mutantes Ômega | — |  | — | latente | alta |
| Biocinese de Cura _(extra)_ | 16 |  | resistencia | extra; mesma Biomassa Dourada → 16 | media |
| Controle Molecular _(extra)_ | 16 |  | outro | extra; mesma biocinese → 16 | baixa |
| Pode Matar com Toque _(extra)_ | 14 |  | outro | extra; mesma Biomassa Negra → 14 | baixa |
| Médico dos Novos X-Men _(extra)_ | — |  | — | papel | alta |
| Pele Dourada quando Ativo _(extra)_ | — |  | — | traço visual | alta |

### Emma Frost (Base - Rainha Branca) — x-men

Atributos: destreza 7, força 7, corpo 7, inteligência 6, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Leitura Mental Alcance Continental | 21 |  | informacao | texto: alcance continental ~5.000 km → 21 | media |
| Controle Mental Preciso (Indivíduos/Grupos) | 16 |  | informacao | controle telepático indetectável de indivíduos/grupos → 16; = Manipulação Psíquica Sutil da Emma Frost | media |
| Escudos Psíquicos Intransponíveis (Bloqueia Xavier/Jean) | 25 |  | outro | ladder: o texto diz que bloqueia Xavier/Jean → 25; = escudos da Emma Frost | media |
| Cirurgia Mental / Edição Memória | 18 |  | informacao | edita mente/memória com precisão: faixa Ômega → 18; = Cirurgia Mental da Emma Frost | media |
| Ilusões Telepáticas Perfeitas (Todos Sentidos) | 18 |  | informacao | ilusões indistinguíveis da realidade: faixa Ômega → 18; = Ilusões Perfeitas da Emma Frost | media |
| Projeção Astral Combatente | 18 |  | informacao | combate no plano astral → 18; = Projeção Astral de Combate da Emma Frost | media |
| Bloqueio de Poderes Mutantes Alheios | 16 |  | outro | desliga poderes por via telepática → 16; = Bloqueio de Poderes da Emma Frost | baixa |
| Transferência de Consciência para Outro Corpo | 16 |  | outro | troca de corpo/consciência; faixa Ômega baixa | baixa |
| Detecção de Mentiras / Leitura de Intenções Absoluta | 18 |  | informacao | pareado a qualquer mentiroso sem escudo → 18; = Detecção de Mentiras da Emma Frost | media |
| Comando Mental Simultâneo de Múltiplos Alvos | 18 |  | informacao | controla muitas mentes de uma vez → 18; = Controle Mental de Multidões da Emma Frost | media |
| Invulnerabilidade Física Quase Total | 15 |  | resistencia | forma de diamante aguenta antitanque/titânio → 15; = Forma de Diamante da Emma Frost | media |
| Força Sobre-Humana (Classe 10-25) | 10 |  | peso | classe 10–25 t → 25 t = 10 | media |
| Não Necessita Oxigênio/Comida/Água | 10 |  | duracao | dispensa ar/comida na forma diamante; faixa rua | baixa |
| Imune a Veneno/Temperatura Extrema | 12 |  | resistencia | imune a veneno e extremos térmicos; faixa rua alta | media |
| Reflete Ataques Psíquicos/Telecinéticos | 18 |  | outro | forma diamante é imune a telepatia; pareado a telepatas fortes ~18 | baixa |
| Resistente a Armas Convencionais/Balas | 10 |  | resistencia | balas e armas convencionais/artilharia leve (9–10) | media |
| Transformação Instantânea Sob Ameaça (Reflexo) | 8 |  | outro | transformação reflexa instantânea; faixa rua | baixa |
| Pele Corta Como Lâmina em Combate Corpo a Corpo | 8 |  | energia | arestas cortam como lâmina; parede de tijolo (7–8) | media |
| Sobrevive a Quedas de Grande Altura Sem Dano | 10 |  | resistencia | queda de grande altura sem dano; faixa da forma diamante | media |
| Amplifica Força de Impacto em Golpes Físicos | 10 |  | energia | golpe com força classe 25 t → 10 | media |
| Recursos Bilionários / Corporações Globais | 12 |  | outro | recursos bilionários/corporações globais; faixa rua alta | baixa |
| Rede de Espiões/Assassinos (Hellions) | 10 |  | informacao | rede de espiões/assassinos (Hellions); faixa rua | media |
| Influência Política/Mídia Mundial | 14 |  | informacao | influência política/mídia mundial; como Carisma de Magneto | media |
| Tecnologia Proibida / Armas Avançadas | 10 |  | energia | armas avançadas do Clube do Inferno; artilharia leve | baixa |
| Lealdade Feroz aos Alunos (Novos Mutantes/Geração X) | — |  | — | relacionamento | alta |
| Treina Controle Psíquico / Ética | 8 |  | informacao | ensina controle psíquico; faixa rua | media |
| Tática de Campo Brutal e Eficiente | 8 |  | informacao | tática de campo; faixa rua | media |
| Psicologia Reversa / Manipulação Pedagógica | 9 |  | informacao | manipulação pedagógica; faixa rua | media |

### Estrela Polar (Jean‑Paul Beaubier) — x-men

Atributos: destreza 10, força 5, corpo 6, inteligência 7, vontade 8, mente 7, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Velocidade Supersónica | 12 |  | velocidade | voo de rotina hipersônico ~Mach 10 (~12.000 km/h) → 12 | baixa |
| Voo e Reflexos Sobre‑Humanos | 12 |  | velocidade | reflexos acompanham o próprio voo ~Mach 10 → 12 | baixa |
| Gêmeo de Aurora | — |  | — | relacionamento | alta |
| Ex‑membro da Alfa Flight | — |  | — | histórico | alta |

### Fera (Henry "Hank" McCoy) — x-men

Atributos: destreza 12, força 9, corpo 8, inteligência 12, vontade 8, mente 10, influência 8, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intelecto Polímata | 14 |  | informacao | Cérebro, viagem no tempo, tecnologia Shi'ar: além da ciência terrestre (13–15) → 14 | media |
| Aparência Felina Azul | — |  | — | traço físico | alta |
| Agilidade Felina Sobrenatural | 8 |  | outro | acima do pico humano (faixa rua, como acrobacia do Noturno) → 8 | media |
| Força Sobre-humana | 8 |  | peso | ergue várias toneladas ~6 t → 8 | media |
| Patas e Presas | 7 |  | energia | garras/presas rasgam porta de aço/parede de tijolo (7–8) → 7 | baixa |
| Ex-Diretor da X-Force CIA | — |  | — | histórico | alta |
| Intelecto Genial | 14 |  | informacao | mesma genialidade de Intelecto Polímata → 14 | media |
| Capacidade de Adaptação Moral | — |  | — | personalidade | alta |
| Força Sobre-Humana Capaz de Erguer Múltiplas Toneladas | 8 |  | peso | o texto é o feito: várias toneladas ~6 t → 8 | alta |
| Agilidade e Reflexos Felinos Além do Limite Humano | 8 |  | outro | acima do pico humano (faixa rua) → 8 | media |
| Sentidos de Predador (Olfato, Audição, Visão Noturna) | 7 |  | distancia | fareja/ouve a ~380 m (menos que Wolverine) → 7 | media |
| Garras Retráteis e Presas Afiadas em Combate Corpo a Corpo | 7 |  | energia | mesmas garras/presas de Patas e Presas → 7 | baixa |
| Durabilidade Aprimorada Contra Impactos e Quedas | 8 |  | resistencia | aguenta quedas de prédios e balas de baixo calibre (7–8) → 8 | media |
| Regeneração Acelerada de Ferimentos | 6 |  | resistencia | cura acelerada leve (3–6) → 6 | media |
| Salto Vertical e Escalada Sobre-Humanos | 3 |  | distancia | saltos de ~20 m → 3 | media |
| Equilíbrio e Controle Corporal Acrobático Extremo | 8 |  | outro | acrobacia acima do pico humano (como Noturno) → 8 | media |
| Fisiologia Adaptada a Múltiplas Mutações Sucessivas | — |  | — | traço/histórico de mutações | media |
| Resistência a Fadiga em Combates Prolongados | 6 |  | resistencia | luta horas sem cansar (pico humano) → 6 | baixa |
| Domínio Simultâneo de Bioquímica, Genética, Física e Medicina | 14 |  | informacao | polímata de nível além da ciência terrestre → 14 | media |
| Criador de Curas Revolucionárias (Cura Parcial da Peste Legado) | 14 |  | informacao | cura parcial de praga mutante única (13–15) → 14 | media |
| Engenharia Reversa de Tecnologia Alienígena e Mutante | 14 |  | informacao | decifra tecnologia Shi'ar/Kree (13–15) → 14 | media |
| Pesquisa de Ponta em Viagem no Tempo e Multiversos | 15 |  | informacao | trouxe os X-Men originais do passado: topo de 13–15 → 15 | media |
| Cirurgião de Precisão em Situações de Emergência | 8 |  | informacao | cirurgião de elite acima do pico humano → 8 | media |
| Desenvolve Soros e Antídotos Sob Pressão Extrema | 12 |  | informacao | antídotos para agentes super-humanos sob prazo (rua alta) → 12 | media |
| Descobertas Científicas Reconhecidas Mundialmente | — |  | — | reputação, não capacidade | media |
| Cataloga e Analisa Novas Mutações em Tempo Recorde | 10 |  | informacao | análise genética muito acima de especialistas humanos → 10 | media |
| Constrói e Modifica Equipamentos Científicos Avançados (Cerebro, Blackbird) | 14 |  | informacao | Cérebro/Blackbird: além da ciência terrestre (13–15) → 14 | media |
| Raciocínio Analítico Acelerado sob Combate | 9 |  | informacao | análise tática instantânea acima do humano (rua) → 9 | media |
| Médico dos X-Men _(extra)_ | — |  | — | papel na equipe; capacidade em Médico e Cirurgião de Elite | media |
| Consciência da Equipe _(extra)_ | — |  | — | papel social | alta |
| Moralidade Flexível _(extra)_ | — |  | — | personalidade | alta |
| Faz o que Precisa _(extra)_ | — |  | — | personalidade | alta |
| Médico e Cirurgião de Elite _(extra)_ | 8 |  | informacao | mesma perícia de Cirurgião de Precisão → 8 | media |

### Foxx (Foxx (Mystique disfarçada)) — x-men

Atributos: destreza 10, força 6, corpo 7, inteligência 9, vontade 10, mente 9, influência 10, aura 10, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Metamorfismo Perfeito (Mística) | 15 |  | informacao | mimetismo físico perfeito, engana tudo menos telepatia/sentidos super-humanos (rua alta) → 15 | media |
| Imita Voz, Rosto e Impressões Digitais | 15 |  | informacao | = Metamorfismo Perfeito → 15 | media |
| Disfarce Indetectável | 15 |  | informacao | = Metamorfismo Perfeito → 15 | media |
| Mímica de Aparência e Gênero | 15 |  | informacao | = Metamorfismo Perfeito → 15 | media |
| Regeneração Lenta | 5 |  | resistencia | cura acelerada leve, retarda envelhecimento (3–6) → 5 | media |
| Espionagem e Sedução de Elite | 8 |  | informacao | espiã de elite, acima do pico humano por séculos de prática → 8 | media |
| Provocação e Manipulação Constantes | 7 |  | informacao | manipulação social hábil (rua baixa) → 7 | baixa |
| Leitura Fria de Pessoas | 6 |  | informacao | leitura fria de especialista: pico humano → 6 | media |
| Rede de Contatos no Submundo | 14 |  | informacao | rede criminosa internacional de Mística (~metrópole → país) → 14 | baixa |
| Séculos de Experiência em Combate | 8 |  | outro | veterano centenário, acima do pico humano (faixa rua) → 8; = mesma tag do Sabretooth | media |
| Marcialista e Assassina Letal | 6 |  | outro | artes marciais de elite: pico humano → 6 | media |
| Sabotagem e Infiltração | 7 |  | informacao | infiltração de elite somada ao metamorfismo → 7 | media |
| Nervos de Aço | — |  | — | traço de personalidade | alta |
| Testa os Limites de Gambit | — |  | — | relacionamento/arco | alta |
| Infiltrada entre os Alunos | — |  | — | situação narrativa | alta |

### Frenzy (Joanna Cargill) — vilao

Atributos: destreza 6, força 11, corpo 11, inteligência 5, vontade 8, mente 6, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força Sobrehumana e Pele Super-densa | 11 |  | peso | ergue ~50 t (luta com Colossus) → 11 | media |
| Resistência Extrema ao Dano | 10 |  | resistencia | imune a balas, aguenta artilharia leve → 10 | media |
| Treinamento de Combate de Elite sob Magneto | 5 |  | outro | combate treinado perto do pico humano → 5 | media |
| Instinto de Brutamontes na Linha de Frente | — |  | — | traço de personalidade | alta |
| Disciplina Militar Forjada em Múltiplas Facções | — |  | — | traço/histórico | alta |
| Já Serviu como Cavaleiro Fome, Poderes Temporariamente Amplificados por Apocalipse | — |  | — | histórico | alta |
| Força _(extra)_ | 11 |  | peso | extra; mesma força ~50 t → 11 | media |
| Pele Indestrutível _(extra)_ | 10 |  | resistencia | extra; mesma resistência → 10 | media |
| Ex-Acólita de Magneto _(extra)_ | — |  | — | histórico | alta |
| Eventual Aliada dos X-Men _(extra)_ | — |  | — | relacionamento | alta |

### Gambit (Remy LeBeau) — x-men

Atributos: destreza 11, força 5, corpo 6, inteligência 7, vontade 8, mente 7, influência 10, aura 11, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Carga Cinética em Qualquer Objeto | 11 |  | energia | umbrella ≥ sub-técnica "Carrega Objetos Grandes" (11): carga máxima de rotina destrói tanque/bunker → 11 | media |
| Cartas de Baralho como Projéteis Explosivos | 8 |  | energia | carta carregada: parede de tijolo (7–8) → 8 | media |
| Mestre Ladrão e Acrobata de Elite | 7 |  | outro | mestre ladrão/acrobata acima do pico humano | media |
| Cajado Bo | 4 |  | energia | bastão bo: golpe de atleta | media |
| Charme Mutante | 9 |  | informacao | charme hipnótico mutante; faixa rua | media |
| Casado com Rogue | — |  | — | relacionamento | alta |
| Carrega Qualquer Objeto com Energia Cinética Explosiva ao Toque | 11 |  | energia | umbrella ≥ sub-técnica "Carrega Objetos Grandes" (11): carga máxima de rotina destrói tanque/bunker → 11 | media |
| Cartas de Baralho como Projéteis Explosivos de Precisão | 8 |  | energia | mesma carta explosiva → 8 | media |
| Controla a Intensidade da Carga (do Estalo à Detonação) | 11 |  | energia | umbrella ≥ sub-técnica "Carrega Objetos Grandes" (11): carga máxima de rotina destrói tanque/bunker → 11 | media |
| Carrega Objetos Grandes (Pilares, Veículos, Paredes Inteiras) | 11 |  | energia | carregar veículo/pilar: explosão destrói tanque/bunker (11–12) → 11 | media |
| Carga Adiada com Detonação Cronometrada | 8 |  | energia | carga retardada com mesma potência das cartas | media |
| Desvio de Trajetória em Pleno Voo (Cartas Curvam no Ar) | 7 |  | outro | cartas curvam no ar; precisão acima do pico humano | media |
| Arremesso Simultâneo de Múltiplas Cartas Carregadas | 8 |  | energia | várias cartas carregadas; mesma potência | media |
| Cajado Bo Extensível como Arma de Combate Próximo | 4 |  | energia | bastão bo: golpe de atleta | media |
| Acrobacia de Nível Olímpico em Combate e Fuga | 5 |  | outro | acrobacia olímpica: pico humano | media |
| Precisão de Arremesso Letal a Longa Distância | 6 |  | distancia | arremesso letal a ~180 m | media |
| Mestre Ladrão _(extra)_ | 7 |  | outro | extra; mesma tag de mestre ladrão | media |
| Passado Obscuro na Guilda _(extra)_ | — |  | — | histórico | alta |
| Passado Obscuro na Guilda dos Ladrões _(extra)_ | — |  | — | histórico | alta |

### Gentle (Nezhno Abidemi) — novatos

Atributos: destreza 6, força 9, corpo 9, inteligência 5, vontade 9, mente 5, influência 6, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Aumento Massivo de Tamanho sob Ameaça | 14 |  | peso | o crescimento é o veículo da força: mesma escala da força ~400 t → 14 | baixa |
| Força Sobre-humana Quase Ilimitada Quando Ativado | 14 | 18 | peso | força 'quase ilimitada' acima da classe 100: ~400 t → 14; pico ~6 kt (18) | media |
| Resistência a Dano Amplificada na Forma Grande | 13 |  | resistencia | aguenta antitanque/titânio na forma grande (13-15) → 13 | media |
| Potencial de Poder Ainda Não Totalmente Medido | — |  | — | potencial latente | alta |
| Regeneração Acelerada na Forma Ampliada | 9 |  | resistencia | regeneração acelerada: ferimentos de bala em minutos (9-12) → 9 | baixa |
| Supressão Consciente do Próprio Poder na Maior Parte do Tempo | — |  | — | autocontrole/traço, não feito | alta |
| Disciplina Mental para Não Se Transformar por Raiva | — |  | — | traço de personalidade | alta |
| Ativação Somente em Perigo Real | — |  | — | restrição de ativação | alta |
| Calma Treinada sob Provocação | — |  | — | traço de personalidade | alta |
| Respiração Controlada Como Técnica de Foco | — |  | — | técnica de foco, não feito | alta |
| Pacifismo Genuíno Apesar do Codinome Irônico | — |  | — | ideologia | alta |
| Voz Calma que Acalma Situações Tensas | — |  | — | traço de personalidade | alta |
| Cuidado Extremo ao Manusear Objetos e Pessoas Frágeis | — |  | — | traço de personalidade | alta |
| Proteção Instintiva dos Mais Fracos | — |  | — | traço de personalidade | alta |
| Humildade Apesar do Poder Colossal | — |  | — | traço de personalidade | alta |
| Origem Humilde nas Estepes do Cazaquistão | — |  | — | histórico | alta |
| Resiliência Forjada por uma Infância Difícil | — |  | — | histórico/traço | alta |
| Devoção à Nova Família na Esquadra de Tempestade | — |  | — | relacionamento | alta |
| Respeito Silencioso pelos Mentores | — |  | — | relacionamento | alta |
| Fluente em Russo, Cazaque e Inglês | 3 |  | informacao | trilíngue: perícia humana comum → 3 | media |

### Havok (Alex Summers) — x-men

Atributos: destreza 7, força 5, corpo 6, inteligência 7, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Anéis de Plasma Cósmico | 14 | 20 | energia | rajadas de rotina destroem tanques e derrubam avião grande (13–15) → 14; pico arrasa quarteirão | media |
| Imunidade aos Poderes de Ciclope | 18 |  | outro | pareado à rajada óptica de Ciclope (rotina 18) → 18 | media |
| Liderança | 6 |  | informacao | líder de equipe (X-Factor/Uncanny Avengers), pico humano → 6 | media |
| Absorção de Energia Cósmica | 12 |  | outro | absorve radiação cósmica ambiente como combustível; pareado a fontes de radiação fortes → 12 | baixa |
| Descarga de Plasma Concentrada | 14 |  | energia | mesma rajada dos Anéis, concentrada: titânio/antitanque → 14 | media |
| Imune a Poderes de Ciclope | 18 |  | outro | pareado à rajada óptica de Ciclope (rotina 18) → 18 | media |
| Sobrecarga Destrutiva | 20 |  | energia | descarga total arrasa quarteirão (19–21) → 20 | baixa |
| Liderança Relutante | 6 |  | informacao | mesma liderança (pico humano) → 6 | baixa |
| Lealdade Fraterna | — |  | — | relacionamento | alta |
| Geração de Plasma Solar em Escala Devastadora | 20 |  | energia | o texto é o feito: devastação de quarteirão (19–21) → 20 | media |
| Projeção de Rajadas Orbitais de Longo Alcance | 17 |  | distancia | o texto é o feito: alcance orbital ~400 km → 17 | baixa |
| Absorção de Radiação Estelar Como Fonte de Poder | 12 |  | outro | mesma absorção de Absorção de Energia Cósmica → 12 | baixa |
| Criação de Estrelas Artificiais em Miniatura | 20 |  | energia | esfera de plasma que arrasa quarteirão (19–21) → 20 | baixa |
| Imunidade Total a Calor e Radiação Extremos | 14 |  | resistencia | imune ao próprio plasma e radiação intensa → 14 | media |
| Voo Sustentado por Propulsão de Plasma | 6 |  | velocidade | voo por propulsão ~160 km/h → 6 | baixa |
| Controle de Área com Anéis Concêntricos de Energia Cósmica | 6 |  | area | anéis em raio de quarteirão ~150 m → 6 | media |
| Rajadas Capazes de Perfurar Blindagem de Nível Militar | 12 |  | energia | o texto é o feito: perfura tanque (11–12) → 12 | alta |
| Modulação de Intensidade Entre Aviso e Aniquilação Total | 14 |  | outro | teto da modulação = rajada de rotina → 14 | media |
| Imune à Rajada Óptica de Ciclope (Física de Plasma Inversa) | 18 |  | outro | pareado à rajada óptica de Ciclope (rotina 18) → 18 | media |
| Imunidade a Ciclope _(extra)_ | 18 |  | outro | pareado à rajada óptica de Ciclope (rotina 18) → 18 | media |

### Hellion (Julian Keller) — novatos

Atributos: destreza 7, força 5, corpo 6, inteligência 8, vontade 9, mente 10, influência 8, aura 9, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telecinesia de Alto Nível | 12 | 16 | peso | rotina: ergue veículos pesados até ~100 t (avião pequeno) → 12; pico: estruturas ~1.500 t | media |
| Próteses Controladas por Telecinese (perdeu as mãos) | 6 |  | outro | controle fino telecinético que substitui mãos: pico humano de destreza → 6 | baixa |
| Combate Corporal | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Estratégia | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Vontade de Ferro | — |  | — | filler de template repetido verbatim em 3 NPCs; não é poder (harmonização: null uniforme) | alta |
| Exploração de Ambiente | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Intensivo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Táticas Avançadas | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Perícia em Campo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Arrogância de Elite | — |  | — | fraqueza/personalidade | alta |
| Ergue e Arremessa Veículos e Estruturas Inteiras | 14 |  | peso | o texto é o feito: estrutura inteira ~400 t → 14 | media |
| Escudos Telecinéticos Reativos Contra Múltiplos Ataques | 11 |  | resistencia | aguenta fogo de tanque (11–12) → 11 | media |
| Voo Sustentado por Propulsão Telecinética | 8 |  | velocidade | voo rápido ~500–640 km/h → 8 | media |
| Rajadas de Força Concentrada em Curto Alcance | 9 |  | energia | rajada parte concreto armado (9–10) → 9 | media |
| Controle Simultâneo de Dezenas de Objetos em Combate | 10 |  | outro | dezenas de objetos ao mesmo tempo: faixa rua → 10 | baixa |
| Constrói Próteses e Ferramentas Telecinéticas Complexas | 6 |  | outro | = controle fino das próteses → 6 | baixa |
| Corta e Perfura com Lâminas de Força Pura | 10 |  | energia | lâminas cortam blindado leve (9–10) → 10 | baixa |
| Amplifica Potência Quando Motivado pela Raiva | 14 | 16 | outro | sob raiva a telecinesia chega ao topo da rotina (~400 t) → 14; pico 16 | baixa |
| Manipulação de Precisão Fina Apesar da Falta das Mãos | 6 |  | outro | = controle fino das próteses → 6 | baixa |
| Potencial Bruto Comparável a Telecinéticos Ômega Estabelecidos | — |  | — | potencial latente, não feito de rotina | alta |
| Telecinesia Poderosa _(extra)_ | 12 |  | peso | extra; = Telecinesia de Alto Nível → 12 | media |
| Mãos Protéticas _(extra)_ | — |  | — | traço físico; o controle está em outra tag | alta |
| Líder dos Hellions _(extra)_ | — |  | — | papel | alta |
| Lealdade Profunda a Quem Chama de Amigo _(extra)_ | — |  | — | relacionamento | alta |

### Ícone (Bobby Drake) — x-men

Atributos: destreza 7, força 5, corpo 5, inteligência 7, vontade 7, mente 7, influência 6, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Criocinese Ômega | 22 | 28 | peso | umbrella ≥ sub-técnica: congela lago/trecho de rio ~100 kt de gelo → 22; pico mar (28) | media |
| Transformação em Ser de Gelo Puro | 16 |  | resistencia | corpo de gelo se refaz de estilhaços (13–16) → 16 | media |
| Armadura de Gelo Instantânea | 10 |  | resistencia | armadura aguenta artilharia leve → 10 | baixa |
| Criação de Estruturas de Gelo Complexas | 18 |  | peso | fortalezas/pontes de gelo ~6 kt → 18 | media |
| Humor Defensivo | — |  | — | traço de personalidade | alta |
| Exploração de Ambiente | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Intensivo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Táticas Avançadas | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Perícia em Campo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Herança de Política Africana | — |  | — | histórico | alta |
| Transformação Completa em Gelo Vivo (Reconstituição Total do Corpo) | 18 |  | resistencia | refaz o corpo a partir de vapor/umidade (18–22) → 18 | media |
| Controle Total de Temperatura em Área Ampla | 12 |  | area | resfria raio ~11 km → 12 | media |
| Criação Instantânea de Estruturas de Gelo Complexas (Pontes, Fortalezas) | 18 |  | peso | mesmas estruturas ~6 kt → 18 | media |
| Armadura de Gelo Reativa Sob Ameaça | 10 |  | resistencia | mesma armadura de gelo → 10 | baixa |
| Regeneração Instantânea do Corpo de Gelo ao Ser Estilhaçado | 18 |  | resistencia | mesma reconstituição a partir de estilhaços (18–22) → 18 | media |
| Locomoção por Rampa de Gelo Auto-Gerada em Alta Velocidade | 6 |  | velocidade | desliza ~160 km/h → 6 | media |
| Projéteis e Lâminas de Gelo Sob Demanda | 8 |  | energia | projéteis quebram tijolo/derrubam alvo → 8 | baixa |
| Congelamento de Massas de Água em Escala de Rio ou Lago | 22 |  | peso | o texto é o feito: superfície de lago/trecho de rio ~100 kt de gelo → 22 | baixa |
| Resistência Total a Dano Físico e Frio Extremo em Forma de Gelo | 12 |  | resistencia | forma de gelo aguenta tanque/bunker e frio absoluto → 12 | media |
| Manipulação de Umidade do Ar para Gerar Gelo do Nada | 12 |  | area | puxa umidade de raio ~11 km → 12 | baixa |
| Potencial Latente Comparável aos Mutantes Ômega Mais Poderosos | — |  | — | latente | alta |
| Potencial Ômega Raramente Usado _(extra)_ | — |  | — | latente | alta |
| Herança de Serval _(extra)_ | — |  | — | histórico | alta |
| Potencial Ômega raramente utilizado _(extra)_ | — |  | — | latente | alta |

### Jean Grey (Base) — x-men

Atributos: destreza 7, força 7, corpo 7, inteligência 6, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Leitura Mental Alcance Global | 23 |  | informacao | texto: alcance global → 23 | media |
| Controle Mental Preciso | 16 |  | informacao | controle mental preciso de indivíduos/grupos → 16; = mesma tag da Emma Frost (Base) | media |
| Telecinese Fina (Nível Molecular) | 16 |  | outro | telecinese molecular; faixa Ômega baixa | baixa |
| Escudos Telecinéticos Intransponíveis | 18 |  | resistencia | escudos TK aguentam derrubada de prédio (16–18) | media |
| Voo Supersônico | 10 |  | velocidade | supersônico ~2.400 km/h | media |
| Rajadas Telecinéticas Devastadoras | 16 |  | energia | rajadas TK: derrubam prédio pequeno (16–18) | media |
| Ilusões Telepáticas Perfeitas | 18 |  | informacao | ilusões indistinguíveis da realidade: faixa Ômega → 18; = Emma/Rachel/Cable | media |
| Projeção Astral Ofensiva e Exploratória | 18 |  | informacao | projeção astral de combate: faixa Ômega → 18; = Emma/Rachel | media |
| Bloqueio de Poderes Mutantes Alheios | 16 |  | outro | desliga poderes por via telepática → 16; = mesma tag da Emma Frost (Base) | baixa |
| Comando Mental Simultâneo de Múltiplos Alvos | 18 |  | informacao | controla muitas mentes de uma vez → 18; = mesma tag da Emma Frost (Base) | media |
| Cura Trauma Mental/PTSD | 12 |  | informacao | cura trauma mental; faixa rua alta | media |
| Sente Emoções de Continentes | 21 |  | informacao | texto: emoções de continentes ~5.000 km → 21 | media |
| Projeção Empática (Calma/Fúria) | 12 |  | informacao | projeção empática; faixa rua alta | media |
| Diagnóstico Médico via Telepatia | 8 |  | informacao | diagnóstico médico telepático; faixa rua | media |
| Comunicação Instantânea Sem Fala | 18 |  | distancia | elo psíquico com Ciclope funciona em escala de país/estado ~1.000 km | baixa |
| Sente Localização/Estado Físico | 18 |  | distancia | mesmo elo psíquico → 18 | baixa |
| Compartilha Sentidos/Memórias | 18 |  | distancia | mesmo elo psíquico → 18 | baixa |
| Treina Controle de Poderes | 8 |  | informacao | treina controle de poderes; faixa rua | media |
| Liderança Tática de Campo | 8 |  | informacao | liderança tática; faixa rua | media |
| Psicologia Mutante Avançada | 9 |  | informacao | psicologia mutante avançada; faixa rua | media |

### Kid Omega (Quentin Quire) — novatos

Atributos: destreza 5, força 3, corpo 4, inteligência 10, vontade 8, mente 10, influência 7, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia de Potência Assustadoramente Alta para a Idade | 18 | 23 | distancia | rotina: telepatia em escala de estado ~1.000 km → 18 (abaixo da rotina Ômega 21); pico com Kick = global 23 | media |
| Telecinese Capaz de Erguer Estruturas Inteiras | 17 |  | peso | o texto é o feito: ergue estrutura inteira (prédio pequeno ~3 kt) → 17 | media |
| Leitura e Manipulação de Múltiplas Mentes ao Mesmo Tempo | 12 |  | informacao | manipula várias mentes ao mesmo tempo (Motim; escala de cidade) → 12 | media |
| Projeção de Ilusões Psíquicas Convincentes | 14 |  | informacao | ilusões psíquicas convincentes; faixa rua alta → 14 | media |
| Ataques Psíquicos que Paralisam Oponentes | 14 |  | outro | paralisa oponentes; pareado à Vontade de mutantes de rua alta (~14) | media |
| Barreira Telepática Pessoal Constante | 16 |  | outro | barreira pareada a telepatas de nível médio-alto (~16); caiu para as Cucos | media |
| Conhecimento Íntimo de Drogas que Amplificam Mutação | 5 |  | informacao | conhecimento especializado de farmacologia mutante (perito humano) → 5 | media |
| Capacidade de Induzir Estados Alterados em Outros Telepaticamente | 12 |  | informacao | induz estados alterados telepaticamente → 12 | media |
| Resistência Aumentada a Intrusão Psíquica Alheia | 16 |  | outro | mesma resistência da barreira telepática → 16 | media |
| Amplifica Temporariamente Poderes Próprios sob Estresse Extremo | 22 |  | outro | amplificação sob estresse leva telepatia perto do pico (24) → 22 | baixa |
| Detecta Presenças Psíquicas a Grande Distância | 18 |  | distancia | detecção psíquica no mesmo alcance da telepatia ~1.000 km → 18 | media |
| Inteligência Analítica Muito Acima da Média | 9 |  | informacao | intelecto muito acima da média (Inteligência 10) → 9 | media |
| Retórica Afiada que Manipula e Convence | 7 |  | informacao | retórica acima do pico humano → 7 | media |
| Visão Cínica que Antecipa as Fraquezas dos Outros | 6 |  | informacao | leitura de fraquezas alheias no pico humano → 6 | baixa |
| Carisma Sombrio que Atrai Seguidores | 7 |  | informacao | atrai seguidores (Omega Gang/Motim) → 7 | media |
| Domina Debate e Argumentação Filosófica | 7 |  | informacao | domínio de debate → 7 | media |
| Encontra Padrões Ocultos em Sistemas Complexos | 9 |  | informacao | mesmo intelecto analítico → 9 | media |
| Sobreviveu à Derrota Pelas Cuckoos e Voltou Transformado | — |  | — | histórico | alta |
| Memória Detalhada de Cada Aliado e Inimigo do Motim | — |  | — | memória de relações, narrativo | media |
| Reputação Temida entre Alunos e Professores | — |  | — | reputação | alta |
| Rede de Contatos entre Ex-Membros da Omega Gang | — |  | — | rede de contatos (relacionamento) | alta |

### Lady Deathstrike (Yuriko Oyama) — vilao

Atributos: destreza 10, força 8, corpo 9, inteligência 7, vontade 10, mente 7, influência 6, aura 7, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Garras de Adamantium | 16 |  | energia | garras de adamantium cortam quase tudo (16–18) → 16; = Wolverine/X-23 | media |
| Cyborg de Adamantium | 18 |  | resistencia | esqueleto de adamantium: virtualmente indestrutível → 18; = esqueleto do Wolverine | media |
| Fator de Cura Implantado | 12 |  | resistencia | fecha ferimentos de bala em minutos (9–12) → 12 | media |
| Ninjitsu e Combate Corpo-a-Corpo de Elite | 7 |  | outro | artes marciais de elite com implantes, acima do pico humano → 7 | media |
| Código de Honra Samurai | — |  | — | ideologia/personalidade | alta |
| Vontade de Ferro Forjada em Décadas de Luta | — |  | — | personalidade | alta |
| Garras Retráteis nos Dez Dedos Cortam Quase Tudo | 16 |  | energia | mesmas garras de adamantium → 16 | media |
| Esqueleto e Órgãos Parcialmente Revestidos de Adamantium | 16 |  | resistencia | revestimento só parcial (órgãos expostos): um degrau abaixo do esqueleto completo (18) → 16 | media |
| Fator de Cura Cibernético Rejeita Ferimentos Letais | 13 |  | resistencia | sobrevive e regenera ferimentos letais (13–16) → 13 | media |
| Regenera Membros Perdidos em Combate | 14 |  | resistencia | regenera membros (13–16) → 14 | media |
| Força e Resistência Sobre-Humanas pelo Revestimento Metálico | 7 |  | peso | ergue ~2–3 t → 7 | media |
| Reflexos de Ninja Amplificados por Implantes | 8 |  | outro | reflexos acima do pico humano (faixa rua) → 8 | media |
| Sobrevive a Ferimentos que Matariam Qualquer Humano | 12 |  | resistencia | ferimentos letais curados em minutos (9–12) → 12 | media |
| Corpo Reconstruído Repetidamente Após Quase-Morte | 15 |  | resistencia | volta de quase-morte via reconstrução cibernética → 15 | baixa |
| Garras Perfuram Blindagem e Metal Comum | 12 |  | energia | o texto é o feito: blindagem militar/tanque (11–12) → 12 | alta |
| Precisão Cirúrgica em Ataques Vitais | 7 |  | outro | precisão marcial acima do pico humano → 7 | media |
| Ninja Ciborgue _(extra)_ | — |  | — | rótulo/identidade; capacidades nas outras tags | media |
| Combate Corpo-a-Corpo de Elite _(extra)_ | 7 |  | outro | extra; mesma perícia de Ninjitsu → 7 | media |

### Loa — x-men

Atributos: destreza 8, força 4, corpo 5, inteligência 7, vontade 8, mente 7, influência 7, aura 9, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fase Através da Matéria Sólida | 12 |  | outro | atravessa concreto/aço; pareado ao que atravessa e aos ataques que evita (tanque/bunker 11–12) → 12 | media |
| Desintegração por Contato | 12 |  | outro | abre buracos em qualquer matéria que atravessa, ignora Corpo: pareado a blindagem de tanque → 12 | baixa |
| Rastros de Decomposição | — |  | — | efeito colateral descritivo, não capacidade | media |
| Intangibilidade Defensiva | 12 |  | outro | = Fase Através da Matéria → 12 | media |
| Ataque que Ignora Armaduras | 12 |  | outro | pareado a blindagem pesada (tanque 11–12) → 12 | baixa |
| Espírito Livre e Praiano | — |  | — | personalidade | alta |
| Misticismo das Ilhas | — |  | — | cultura/personalidade | alta |
| Otimismo Contagiante | — |  | — | personalidade | alta |
| Sobreviveu à Mordida de um Vampiro | — |  | — | histórico | alta |
| Amizade com Anole e Match | — |  | — | relacionamento | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |
| Curiosidade Insaciável | — |  | — | personalidade | alta |
| Lealdade aos Corsários | — |  | — | relacionamento | alta |

### M (Monet St. Croix) (M) — novatos

Atributos: destreza 9, força 9, corpo 9, inteligência 11, vontade 9, mente 10, influência 9, aura 10, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Pacote de Perfeição Mutante | 12 |  | peso | pacote liderado pela força ~100 t (rivaliza Colossus) → 12 | media |
| Intelecto Prodigioso | 12 |  | informacao | domina ciências em minutos, acima do gênio humano → 12 | baixa |
| Arrogância Desarmante | — |  | — | traço de personalidade | alta |
| Segredos Ligados ao Irmão Emplate | — |  | — | relacionamento/segredo | alta |
| 4 | — |  | — | texto corrompido | alta |
| Exploração de Ambiente | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Intensivo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Táticas Avançadas | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Perícia em Campo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Resiliência Física e Mental | 8 |  | resistencia | resiliência pós-trauma; durabilidade de corpo à prova de balas leve → 8 | baixa |
| Voo Supersônico Sustentado | 10 |  | velocidade | supersônico ~2.400 km/h → 10 | media |
| Força Sobre-Humana Rivaliza os Colossos da Equipe | 12 |  | peso | Colossus ~100 t → 12 | media |
| Invulnerabilidade a Impactos, Fogo e Balas | 10 |  | resistencia | balas/fogo/artilharia leve → 10 | media |
| Telepatia de Alcance Considerável | 10 |  | distancia | alcance ~3 km → 10 | baixa |
| Inteligência Sobre-Humana — Domina Ciências em Minutos | 12 |  | informacao | aprende ciência em minutos, faixa rua alta → 12 | baixa |
| Velocidade e Reflexos Muito Acima do Pico Humano | 7 |  | velocidade | corre ~320 km/h → 7 | media |
| Resistência que Ignora Fadiga em Combate Prolongado | 8 |  | duracao | luta horas sem fadiga, faixa rua → 8 | baixa |
| Audição e Visão Aguçadas Além do Espectro Humano | 8 |  | distancia | distingue detalhes a ~760 m → 8 | baixa |
| Domina Múltiplos Idiomas e Disciplinas Quase Instantaneamente | 10 |  | informacao | aprendizado instantâneo, faixa rua → 10 | baixa |
| Combina Força, Voo e Telepatia em Combate Simultâneo | 12 |  | outro | mesmo pacote, regido pela força ~100 t → 12 | baixa |
| Força Sobre-humana _(extra)_ | 12 |  | peso | extra; mesma força ~100 t → 12 | media |
| Telepatia _(extra)_ | 10 |  | distancia | extra; mesma telepatia ~3 km → 10 | baixa |
| Herdeira Bilionária _(extra)_ | — |  | — | histórico/recurso | alta |
| Voo _(extra)_ | 10 |  | velocidade | extra; mesmo voo supersônico → 10 | media |

### Morbius (Dr. Michael Morbius) — midnight-sons

Atributos: destreza 13, força 7, corpo 8, inteligência 9, vontade 8, mente 7, influência 6, aura 7, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Voo Sobre-humano | 5 |  | velocidade | voo/planeio ~80 km/h | media |
| Garras e Presas Retráteis | 6 |  | energia | garras e presas: amassa carro/pico humano | media |
| Fator de Cura Acelerado | 8 |  | resistencia | cura acelerada de ferimentos graves em horas | media |
| Hipnose e Controle Mental | 7 |  | informacao | hipnose de indivíduos; faixa rua baixa | media |
| Mordida Transforma Vítimas em Vampiros | 8 |  | outro | contamina vítimas com vampirismo; faixa rua | baixa |
| Gênio em Bioquímica e Hematologia | 12 |  | informacao | Nobel de bioquímica; faixa rua alta | media |
| Soro de Sangue Irradiado (transformação temporária em humano) | — |  | — | soro de controle da condição, não é poder | media |
| Identidade Falsa (Morgan Michaels) | — |  | — | identidade/narrativa | alta |

### Mystique (Raven Darkhölme) — irmandade

Atributos: destreza 11, força 6, corpo 7, inteligência 10, vontade 10, mente 9, influência 11, aura 10, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Metamorfismo Perfeito | 14 |  | informacao | metamorfismo perfeito (digitais, voz, peso) engana até aliados próximos; faixa rua alta → 14 | media |
| Espiã Veterana | 10 |  | informacao | espiã veterana com séculos de prática → 10 | media |
| Imortalidade Lenta | 10 |  | duracao | envelhecimento muito lento (mais de um século); faixa rua → 10 | baixa |
| Combate Corpo-a-Corpo Letal | 7 |  | outro | combate letal ligeiramente acima do pico humano → 7 | media |
| Rede de Espionagem Global | 12 |  | informacao | rede de espionagem com alcance global, mas social → 12 | baixa |
| Manipuladora Genial | 12 |  | informacao | manipuladora genial (enganou X-Men e governos) → 12 | media |
| Casada com Destiny (Irene Adler) | — |  | — | relacionamento | alta |
| Mimetiza Voz e Maneirismos com Perfeição | 12 |  | informacao | mimetiza voz e maneirismos; abaixo do metamorfismo completo → 12 | media |
| Altera Impressões Digitais | 12 |  | informacao | altera digitais; parte do metamorfismo → 12 | media |
| Engana Sensores Biométricos | 14 |  | outro | pareado a sistemas biométricos de segurança de alto nível (~14) | media |
| Disfarça Cheiro e Feromônios | 10 |  | outro | pareado ao faro de Wolverine (~9-10) → 10 | media |
| Replica a Estrutura Facial e Corporal de Qualquer Pessoa Já Vista | 14 |  | informacao | mesmo metamorfismo perfeito → 14 | media |
| Infiltrou os Mais Altos Escalões de Governos por Décadas | 14 |  | informacao | infiltrou governos por décadas → 14 | media |
| Muda de Forma em Frações de Segundo em Pleno Combate | 8 |  | outro | troca de forma instantânea em combate; acima do pico humano → 8 | baixa |
| Copia Assinatura Genética o Suficiente para Enganar Exames Superficiais | 10 |  | outro | pareado a exames genéticos superficiais (~10) | baixa |
| Mantém um Disfarce Perfeito por Anos sem Ser Detectada | 12 |  | duracao | disfarce por anos sem detecção; faixa rua → 12 | baixa |
| Transforma Roupas e Acessórios Junto com o Próprio Corpo | 8 |  | outro | inclui roupas/acessórios no metamorfismo → 8 | baixa |
| Criou Filha Adotiva | — |  | — | relacionamento | alta |
| Manipulou Rogue por Anos | — |  | — | histórico/relacionamento | alta |
| Rede de Espionagem _(extra)_ | 12 |  | informacao | extra; mesma rede de espionagem → 12 | baixa |
| Mãe de Noturno _(extra)_ | — |  | — | relacionamento | alta |
| Lealdade a Si Mesma _(extra)_ | — |  | — | traço de personalidade | alta |
| Pistola Escondida na Coxa _(extra)_ | 5 |  | energia | pistola: dano de arma de fogo leve → 5 | media |

### Polaris (Lorna Dane) — x-men

Atributos: destreza 6, força 5, corpo 6, inteligência 7, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Magnetismo | 22 | 28 | peso | magnetismo nível Ômega comparável ao de Magneto, um pouco abaixo: navios/estruturas ~100 kt (porta-aviões) → 22; pico planetário | media |
| Campo de Força Magnético Pessoal | 17 |  | resistencia | aguenta artilharia e golpes de super-humanos pesados (abaixo dos 19 de Magneto) → 17 | media |
| Cabelo Verde | — |  | — | traço físico | alta |
| Controle Fino de Metais | 12 |  | outro | precisão em peças pequenas/mecanismos (faixa rua alta) → 12 | media |
| Manipulação de Sangue Ferroso | 12 |  | outro | ignora armadura via ferro do sangue; pareado a Corpo de rua (abaixo dos 14 de Magneto) → 12 | baixa |
| Campo de Força Pessoal | 17 |  | resistencia | mesmo campo de Campo de Força Magnético Pessoal → 17 | media |
| Voo Magnético | 10 |  | velocidade | supersônico ~2.400 km/h, como Magneto → 10 | media |
| Tática de Campo | 5 |  | informacao | líder tática de campo (X-Factor), pico humano → 5 | media |
| Lealdade à Equipe | — |  | — | relacionamento | alta |
| Manipula o Campo Magnético da Terra em Escala Planetária | 21 |  | area | o texto é o feito: raio da Terra ~6.400 km → 21 | media |
| Controla Minérios e Metais em Escala Continental | 21 |  | area | o texto é o feito: raio continental ~5.600 km → 21 | media |
| Gera Aurora Boreal Artificial ao Redor de Si | 8 |  | area | aurora em raio de ~760 m ao redor → 8 | baixa |
| Escudo Magnético Atmosférico Contra Ataques de Energia | 18 |  | resistencia | barreira de grande escala detém rajadas de energia pesadas (16–18) → 18 | media |
| Voo Orbital Sustentado por Manipulação Magnética | 14 |  | velocidade | velocidade de escape ~40.000 km/h, como o voo orbital de Magneto → 14 | media |
| Manipulação de Sangue Ferroso em Alvos Vivos | 12 |  | outro | mesma técnica de Manipulação de Sangue Ferroso → 12 | baixa |
| Desvia Mísseis e Projéteis Metálicos a Longa Distância | 11 |  | distancia | desvia mísseis a ~5 km → 11 | media |
| Inverte a Polaridade Magnética de Objetos em Área | 8 |  | area | raio de ~760 m → 8 | baixa |
| Detecta Depósitos de Metal em Escala Geológica | 14 |  | distancia | sente jazidas a dezenas de km (~45 km) → 14 | baixa |
| Suspende Estruturas Metálicas Massivas no Ar | 20 |  | peso | suspende navio/estrutura de ~25–50 kt → 20 | media |
| Campo de Força Magnético _(extra)_ | 17 |  | resistencia | extra; mesmo campo de força pessoal → 17 | media |
| Voo por Levitação Magnética _(extra)_ | 10 |  | velocidade | extra; mesmo voo magnético → 10 | media |

### Professor X (Base - Cadeira de Rodas) — x-men

Atributos: destreza 7, força 7, corpo 7, inteligência 6, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Alcance Global Sem Cerebro | 23 |  | distancia | o texto é o feito: global sem amplificador (23–24) → 23 | media |
| Congela Mentes Inteiras Instantaneamente | 20 |  | informacao | paralisa todas as mentes ao redor: faixa Ômega → 20 | media |
| Edita Memórias/Personalidades | 22 |  | informacao | = Reescrita de Personalidade do Professor X → 22 | media |
| Projeção Astral Física/Ofensiva | 20 |  | informacao | = Projeção Astral Corpórea do Professor X → 20 | baixa |
| Comunicação Telepática Instantânea X-Men | 21 |  | distancia | elo com a equipe em escala continental → 21 | media |
| Escudos Psíquicos Intransponíveis | 25 |  | outro | ladder: escudo que barra telepatas Ômega (Jean/Xavier com Cérebro 23) → 25; = Bloqueio Mental Absoluto do Professor X | media |
| Rastreia Mutantes em Qualquer Lugar | 23 |  | distancia | qualquer lugar do planeta → 23 | media |
| Leitura Mental Instantânea em Qualquer Distância | 23 |  | distancia | qualquer distância na Terra → 23 | media |
| Implanta Memórias Falsas Indetectáveis | 22 |  | informacao | = Edita Memórias → 22 | media |
| Apaga Rastros da Própria Presença Mental | 20 |  | outro | pareado à detecção por telepatas Ômega (~20) → 20 | baixa |
| Prevê Movimentos Inimigos (Mentes) | 16 |  | informacao | antecipa ações lendo intenções: base Ômega → 16 | media |
| Planos de Contingência 42+ (Kuurth) | 12 |  | informacao | planejamento estratégico de alto nível → 12 | baixa |
| Manipula Eventos Globais Sutilmente | 20 |  | informacao | influência em escala país/continente → 20 | baixa |
| Alcance Interestelar/Interdimensional | 23 | 51 | distancia | entrada base: rotina com Cérebro = global 23 (ladder); o literal interestelar (1 ano-luz = 51) vai para peak | baixa |
| Bloqueio Mental Planetário Total | 23 |  | distancia | bloqueio telepático global → 23 | baixa |
| Localiza Qualquer Mente no Universo | 23 | 51 | distancia | entrada base: texto hiperbólico; rotina com Cérebro = global 23 (ladder); literal interestelar 51 em peak | baixa |
| Rastreamento de DNA Mutante em Escala Global | 23 |  | distancia | o texto é o feito: global → 23 | media |
| Amplificação de Poder Psíquico Múltiplas Vezes | 23 |  | outro | leva a telepatia de ~20 a escala global ~23 | baixa |
| Integração com Satélites e Redes de Vigilância | 23 |  | distancia | cobertura global via satélites → 23 | baixa |
| Simulação de Cenários de Batalha em Tempo Real | 12 |  | informacao | simulação tática computacional de alto nível → 12 | baixa |
| Acesso a Bancos de Dados Mutantes Catalogados | 14 |  | informacao | banco de dados mutante abrangente → 14 | baixa |
| Interface Neural Direta com o Operador | — |  | — | mecanismo de interface, sem feito próprio | media |
| Detecção de Mutações Emergentes ao Nascimento | 23 |  | distancia | detecta novos mutantes no mundo todo → 23 | media |

### Psylocke (Betsy Braddock) — x-men

Atributos: destreza 10, força 6, corpo 6, inteligência 8, vontade 9, mente 11, influência 8, aura 9, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Espada Psiônica | 14 |  | outro | ignora armadura e derruba mentes; pareado a defesas mentais de heróis de rua → 14 | media |
| Telepatia de Combate | 8 |  | distancia | telepatia tática de campo ~760 m → 8 | media |
| Ninjitsu e Artes Marciais de Elite | 7 |  | outro | entre as melhores ninjas, acima do pico humano → 7 | media |
| Telecinesia Precisa | 5 |  | peso | TK fina, move ~0,7 t → 5 | baixa |
| Determinação Fria | — |  | — | traço de personalidade | alta |
| Herdeira da Família Braddock | — |  | — | histórico | alta |
| Irmã do Capitão Britânia | — |  | — | relacionamento | alta |
| Educação de Elite | — |  | — | histórico | alta |
| Artes Marciais de Elite Multi-Estilo | 7 |  | outro | mesmas artes marciais → 7 | media |
| Telepatia Focada em Combate Cirúrgico | 8 |  | distancia | mesma telepatia de combate → 8 | media |
| Lâmina Psiônica Manifesta da Própria Mente | 14 |  | outro | mesma Espada Psiônica → 14 | media |
| Corta Vínculos Psíquicos e Mágicos com a Lâmina | 14 |  | outro | pareado a vínculos psíquicos de rua; não supera a lâmina → 14 | baixa |
| Sombras e Furtividade de Nível Ninja | 8 |  | informacao | quase invisível no escuro (igual Noturno) → 8 | media |
| Precognição de Combate por Frações de Segundo | 9 |  | velocidade | antecipa golpes/disparos ~Mach 1 → 9 | baixa |
| Katana Física como Extensão da Lâmina Mental | 6 |  | energia | katana corta porta/carro → 6 | media |
| Projeta a Lâmina Psiônica à Distância | 4 |  | distancia | arremessa a lâmina ~45 m → 4 | media |
| Reflexos Aprimorados por Treinamento da Mão | 7 |  | outro | reflexos acima do pico humano → 7 | media |
| Bloqueia Ataques Psíquicos com a Própria Lâmina | 14 |  | outro | pareado a ataques telepáticos de rua; igual à lâmina → 14 | baixa |
| Ninjitsu e Artes Marciais _(extra)_ | 7 |  | outro | extra; mesmas artes marciais → 7 | media |

### Rachel Summers (Base - Sem Fênix) — x-men

Atributos: destreza 7, força 7, corpo 7, inteligência 6, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Leitura Mental Alcance Global | 23 |  | informacao | texto: alcance global → 23 | media |
| Escudos Psíquicos Intransponíveis | 25 |  | outro | ladder: escudos intransponíveis que seguram telepatas Ômega (Xavier/Jean) → 25; = escudos da Rachel Summers | media |
| Projeção Astral | 18 |  | informacao | combate astral contra Ômegas → 18; = Projeção Astral Combatente da Rachel Summers (poder não amplificado) | media |
| Ilusões Telepáticas | 18 |  | informacao | ilusões multissensoriais: faixa Ômega → 18; = ilusões da Rachel Summers/Emma/Cable | media |
| Comando Mental Limitado | 10 |  | informacao | comando mental limitado; faixa rua | media |
| Link Psíquico com Família (Cable, Jean, Scott) | 18 |  | distancia | elo psíquico com a família em escala de país ~1.000 km | baixa |
| Cirurgia Mental de Precisão (Remove Traumas) | 16 |  | informacao | cirurgia mental de precisão em traumas profundos → 16; = Rachel Summers | media |
| Bloqueio de Telepatia Alheia (Resiste Invasões) | 20 |  | outro | pareado a invasões de telepatas fortes (~20); abaixo do escudo intransponível | baixa |
| Rastreamento Mental de Mutantes Conhecidos | 21 |  | distancia | rastreia mutantes conhecidos em escala continental ~5.000 km | baixa |
| Comunicação Telepática em Grupo (Equipe Inteira) | 12 |  | distancia | rede telepática da equipe em escala de cidade ~11 km | media |
| Levita Construções Pesadas | 18 |  | peso | levita construção pesada/prédio pequeno ~6 kt → 18 | media |
| Escudos Telecinéticos Intransponíveis | 18 |  | resistencia | escudos TK aguentam derrubada de prédio (16–18) | media |
| Rajadas Telecinéticas Devastadoras | 16 |  | energia | rajadas TK derrubam prédio pequeno (16–18) | media |
| Voo Supersônico | 10 |  | velocidade | supersônico ~2.400 km/h | media |
| Precisão Molecular (Cirurgia/Desarme) | 16 |  | outro | telecinese molecular; faixa Ômega baixa | baixa |
| Campos de Força Telecinéticos Reativos | 18 |  | resistencia | mesmos escudos TK, reativos → 18 | media |
| Manipulação de Matéria a Curta Distância (Nível Molecular) | 16 |  | outro | manipulação molecular a curta distância; faixa Ômega baixa | baixa |
| Desarma Armas/Tecnologia à Distância | 12 |  | distancia | desarma armas a ~11 km (linha de visão longa) | baixa |
| Voo em Formação com Escudo Protetor para Aliados | 16 |  | resistencia | escudo estendido a aliados em voo; um pouco abaixo do escudo pessoal | media |
| Controle Fino o Suficiente para Cirurgia sem Bisturi | 16 |  | outro | mesmo controle molecular → 16 | baixa |
| Visões Espontâneas de Eventos Futuros | 10 |  | duracao | visões espontâneas do futuro; faixa rua | baixa |
| Sente Perigo Iminente (Sentido Aranha Psíquico) | 7 |  | outro | sentido de perigo; acima do pico humano | media |
| Vislumbres de Linhas Temporais Alternativas | 12 |  | duracao | vê linhas temporais alternativas; faixa rua alta | baixa |
| Marcas Hound Permitem Rastrear Qualquer Mutante | 23 |  | distancia | marcas de Hound rastreiam qualquer mutante no planeta → global 23 | baixa |
| Sentidos Aguçados (Olfato/Audição/Visão) | 7 |  | distancia | sentidos aguçados de Hound ~380 m | media |
| Imune a Maioria Controle Mental | 16 |  | outro | pareado a controle mental de telepatas comuns (~16) | baixa |
| Liderança Tática | 8 |  | informacao | liderança tática; faixa rua | media |
| Combate Corpo-a-Corpo Treinado | 4 |  | energia | corpo-a-corpo treinado: golpe de atleta | media |
| Experiência Multiversal (Cross-Time Caper) | — |  | — | histórico/experiência | media |

### Rogue (Anna Marie) — x-men

Atributos: destreza 8, força 9, corpo 9, inteligência 6, vontade 9, mente 7, influência 8, aura 10, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção de Poderes e Memórias ao Toque | 20 |  | outro | absorção pareada aos graus dos alvos, inclusive Ômegas (~20) | media |
| Voo e Força Sobrehumana (Ms. Marvel permanente) | 12 |  | peso | força de Ms. Marvel ~75-100 t → 12 (voo ~Mach 1-2 abaixo disso) | media |
| Invulnerabilidade Parcial (Ms. Marvel permanente) | 13 |  | resistencia | aguenta antitanque/projéteis de canhão (13-15) → 13 | media |
| Absorve Poderes, Memórias e Personalidade ao Simples Contato | 20 |  | outro | mesma absorção ao toque → 20 | media |
| Absorção Ocorre em Segundos, Sem Necessidade de Consentimento | 20 |  | outro | mesma absorção (velocidade do efeito) → 20 | baixa |
| Retém Poderes Absorvidos Permanentemente com Contato Prolongado | 20 |  | outro | mesma absorção (retenção permanente) → 20 | baixa |
| Absorve Força Vital, Deixando a Vítima em Coma | 20 |  | outro | mesma absorção aplicada à força vital → 20 | media |
| Absorve Múltiplos Alvos em Sequência Rápida | 20 |  | outro | mesma absorção em sequência → 20 | media |
| Acessa Conhecimento e Habilidades Técnicas da Vítima | 20 |  | outro | mesma absorção aplicada a conhecimento/perícias → 20 | baixa |
| Absorve Poderes Mutantes, Sobre-Humanos e Até Cósmicos | 20 | 31 | outro | entrada base: mimetismo de rotina = 20 (= demais tags de absorção); absorver seres cósmicos (31) em peak | baixa |
| Vozes e Memórias das Vítimas Ecoam Permanentemente na Mente | — |  | — | fraqueza disfarçada (vozes na mente) | alta |
| Controle Parcial Aprendido para Limitar Duração do Contato | — |  | — | controle/limitação, não feito | alta |
| Absorve Através de Roupas Finas ou Contato Acidental Breve | — |  | — | fraqueza disfarçada (contato acidental) | media |
| Força e Voo (Miss Marvel) | 12 |  | peso | mesma força/voo de Ms. Marvel → 12 | media |
| Liderança de Equipe | 8 |  | informacao | lidera equipe de X-Men → 8 | media |
| Força de Vontade Inabalável | — |  | — | traço de personalidade | alta |
| Casada com Gambit | — |  | — | relacionamento | alta |
| Vôo e Força Sobre-Humana | 12 |  | peso | mesma força/voo de Ms. Marvel → 12 | media |
| Invulnerabilidade Parcial | 13 |  | resistencia | mesma invulnerabilidade parcial → 13 | media |
| Sentidos Aguçados | 6 |  | distancia | sentidos aguçados (Ms. Marvel) percebem a ~180 m → 6 | baixa |
| Força de Voo (Miss Marvel) _(extra)_ | 12 |  | peso | extra; mesma força/voo de Ms. Marvel → 12 | media |
| Força de Vontade _(extra)_ | — |  | — | traço de personalidade | alta |

### Sabretooth (Victor Creed) — vilao

Atributos: destreza 9, força 9, corpo 10, inteligência 6, vontade 9, mente 5, influência 5, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fator de Cura Acelerado | 16 |  | resistencia | fator de cura no nível de Wolverine: ferimentos letais, regenera tecido (13–16) → 16; = Wolverine | media |
| Garras e Presas | 7 |  | energia | garras naturais rasgam portas de aço/tijolo (7–8) → 7 | media |
| Sentidos Aguçados | 9 |  | distancia | faro que rastreia por quilômetros (9–10) → 9 | media |
| Instinto de Matar Sem Inibições | — |  | — | personalidade | alta |
| Sentidos Aguçados (Olfato/Audição) | 9 |  | distancia | mesmos sentidos: faro/audição por ~1,5 km → 9 | media |
| Rastreamento Perfeito | 10 |  | distancia | segue rastro por vários km, mesmo dias depois (9–10) → 10 | media |
| Visão Noturna | 6 |  | distancia | enxerga no breu a ~180 m → 6 | baixa |
| Força Bruta Devastadora | 7 |  | peso | ergue ~2–3 t → 7 | media |
| Garras e Presas Retráteis | 7 |  | energia | mesmas garras/presas → 7 | media |
| Séculos de Experiência em Combate | 8 |  | outro | veterano centenário, acima do pico humano (faixa rua) → 8 | media |
| Conhece Fraquezas de Mutantes | 6 |  | informacao | conhecimento tático de inimigos (pico humano) → 6 | baixa |
| Imune a Dor | 8 |  | outro | ignora dor que derrubaria humanos; pareado a dano de rua → 8 | baixa |
| Táticas de Emboscada | 7 |  | informacao | caçador/emboscador acima do pico humano → 7 | media |
| Condicionamento Mental | — |  | — | condicionamento Arma X (vulnerabilidade/histórico) | media |
| Memórias Implantadas | — |  | — | histórico/fraqueza | alta |
| Gatilhos de Berserk | — |  | — | fraqueza | alta |
| Resistência a Telepatia | 10 |  | outro | pareado a telepatas de rua (~8–12), cede a Ômegas → 10 | baixa |
| Regenera Ferimentos Letais em Segundos | 16 |  | resistencia | o texto é o feito: ferimento letal em segundos → 16; = Wolverine | media |
| Sobrevive a Perfurações no Coração e Ferimentos que Matariam Qualquer Um | 15 |  | resistencia | mesma cura de ferimentos letais → 15 | media |
| Imune à Maioria dos Venenos, Toxinas e Doenças | 12 |  | outro | pareado a venenos/doenças fortes → 12 | media |
| Envelhecimento Drasticamente Retardado — Ativo há Mais de um Século | 10 |  | duracao | longevidade de século+ (faixa rua, não pela coluna Tempo) → 10 | baixa |
| Sentidos de Predador Apex Rastreiam Presas a Quilômetros | 10 |  | distancia | o texto é o feito: quilômetros (~3 km) → 10 | media |
| Garras e Presas Retráteis Regeneram Mesmo se Arrancadas | 13 |  | resistencia | regenera partes arrancadas (13–16) → 13 | media |
| Cicatrização Ignora Fogo, Ácido e Radiação | 16 |  | resistencia | cura queimaduras/ácido/radiação graves → 16; = Wolverine (mesma tag) | media |
| Regeneração Sustenta Combate Contra Múltiplos Oponentes sem Fadiga | 16 |  | resistencia | regeneração contínua sob ataque → 16; = Wolverine/X-23 | media |
| Cura Mesmo sob Ataque Contínuo de Adamantium | 16 |  | resistencia | pareado às garras de adamantium (16) → 16; mesma faixa do fator de cura | media |
| Instinto Predatório Aguça Reflexos Além do Limite Humano | 8 |  | outro | reflexos acima do pico humano (faixa rua) → 8 | media |
| Caçador Sádico _(extra)_ | — |  | — | personalidade | alta |
| Rivalidade com Wolverine _(extra)_ | — |  | — | relacionamento | alta |
| Rival de Logan _(extra)_ | — |  | — | relacionamento | alta |

### Sauron (Karl Lykos) — vilao

Atributos: destreza 7, força 9, corpo 8, inteligência 6, vontade 6, mente 6, influência 5, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transformação em Pterossauro Humanóide | 7 |  | peso | forma de pterossauro ergue ~3 t → 7 | baixa |
| Drenagem de Energia Vital | 12 |  | outro | drena humanos e super-humanos ignorando Corpo: pareado a Corpo de rua (tanque 11–12) → 12 | media |
| Voo | 6 |  | velocidade | voo planado/batido ~160 km/h → 6 | media |
| Agilidade de Predador Aéreo em Voo | 6 |  | outro | manobra aérea de predador: pico humano/ave → 6 | baixa |
| Garras e Bico Cortantes em Mergulho | 7 |  | energia | mergulho com garras rasga chapa/tijolo (7–8) → 7 | baixa |
| Visão de Caçador Localiza Presas a Distância | 9 |  | distancia | visão de ave de rapina ~1,5 km → 9 | baixa |
| Drena Força Vital ao Toque, Enfraquecendo a Vítima | 12 |  | outro | = Drenagem de Energia Vital → 12 | media |
| Converte a Energia Roubada em Força e Massa Muscular | 8 |  | peso | força ampliada ~6 t → 8 | baixa |
| Sustenta e Prolonga a Transformação em Pterossauro Drenando Continuamente | — |  | — | dependência/mecânica, não feito | media |
| Vítimas Ficam Comatosas ou Envelhecidas pela Drenagem Prolongada | 12 |  | outro | efeito da mesma drenagem → 12 | baixa |
| Drena Também Energia Psíquica e Mutante de Alvos Poderosos | 14 |  | outro | pareado a mutantes poderosos de rua alta → 14 | baixa |
| Drenagem Letal se Sustentada Além do Limite da Vítima | 12 |  | outro | = Drenagem de Energia Vital → 12 | baixa |
| Voo Sustentado por Energia Roubada Alcança Grandes Altitudes | 11 |  | distancia | teto de voo ~5 km → 11 | baixa |
| Sentidos Detectam Energia Vital de Presas à Distância | 8 |  | distancia | sente presas a ~760 m → 8 | baixa |
| Cada Drenagem Bem-Sucedida Acelera Reflexos e Cura Ferimentos | 6 |  | resistencia | cura acelerada leve após drenar (3–6) → 6 | baixa |
| Fome pela Energia Vital Suprime a Consciência de Karl Lykos | — |  | — | fraqueza | alta |
| Pterossauro _(extra)_ | 7 |  | peso | extra; = Transformação em Pterossauro → 7 | baixa |
| Doutor _(extra)_ | — |  | — | rótulo/profissão de Karl Lykos | media |

### Scalphunter (John Greycrow) — vilao

Atributos: destreza 8, força 5, corpo 6, inteligência 6, vontade 7, mente 6, influência 5, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Atirador de Elite | 9 |  | distancia | tiro preciso de rotina ~1,5 km → 9 | media |
| Líder dos Marotos | — |  | — | papel/cargo | alta |
| Cria e Modifica Armas Instintivamente com a Mente | 7 |  | energia | monta armas de sucata: fuzis/explosivos arruínam tijolo → 7 | media |
| Nunca Fica Sem Munição ou Arma em Combate | 7 |  | outro | mesmo armeiro instintivo → 7 | baixa |
| Adapta Arsenal a Qualquer Situação de Tiro | 7 |  | outro | mesmo armeiro instintivo → 7 | baixa |
| Reputação de Frieza Implacável desde o Massacre dos Morlocks | — |  | — | reputação/histórico | alta |
| Poder Mutante _(extra)_ | 7 |  | outro | extra; rótulo do armeiro instintivo → 7 | baixa |
| Implacável _(extra)_ | — |  | — | traço | alta |
| Cicatrizes Faciais _(extra)_ | — |  | — | traço físico | alta |

### Shatterstar (Gaveedra-Seven) — geracaox

Atributos: destreza 12, força 8, corpo 8, inteligência 7, vontade 8, mente 7, influência 5, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Dupla Empunhadura de Espadas | 7 |  | energia | duas espadas com força sobre-humana: parede de tijolo (7–8) | media |
| Portais Dimensionais via Espadas | 12 |  | distancia | portais dimensionais pelas espadas; deslocamento ~11 km | baixa |
| Velocidade e Reflexos Sobre-humanos | 8 |  | outro | reflexos acima do pico humano: esquiva de tiros | media |
| Gladiador de Elite | 8 |  | outro | gladiador de elite; faixa rua | media |
| Gladiador Geneticamente Engenhado | — |  | — | origem | media |
| Aprendizado Acelerado de Combate | 8 |  | informacao | aprende combate acelerado; faixa rua | media |
| Sangue de Longshot | — |  | — | origem/linhagem | alta |
| Primeiro Amor Verdadeiro | — |  | — | relacionamento | alta |
| Equilíbrio Emocional | — |  | — | personalidade | alta |
| Luta em Dupla Sincronizada | 7 |  | outro | luta em dupla com Rictor; faixa rua | media |
| Combos com Duas Lâminas Simultâneas Sem Erro | 7 |  | energia | combos de duas lâminas; mesma potência das espadas | media |
| Corta Quase Qualquer Material Conhecido | 12 |  | energia | lâminas de Mojoworld cortam bunker/blindagem (11–12) | baixa |
| Reflexos Calibrados Geneticamente para Combate de Arena | 8 |  | outro | mesmos reflexos de arena → 8 | media |
| Lê e Antecipa Padrões de Ataque em Tempo Real | 8 |  | informacao | lê padrões de ataque; faixa rua | media |
| Abre Portais Dimensionais no Fio das Espadas em Pleno Duelo | 12 |  | distancia | mesmos portais dimensionais → 12 | baixa |
| Combate Simultâneo Contra Múltiplos Oponentes Sem Perder Ritmo | 8 |  | outro | combate contra vários; faixa rua | media |
| Precisão Cirúrgica Mesmo em Velocidade Máxima | 8 |  | outro | precisão em velocidade máxima; faixa rua | media |
| Décadas de Combos Catalogados na Memória de Gladiador | 7 |  | informacao | memória de combos; faixa rua | media |
| Rivaliza Espadachins Lendários em Duelo Direto | 8 |  | outro | rivaliza espadachins lendários; faixa rua | media |
| Adapta Estilo de Luta a Qualquer Adversário em Segundos | 8 |  | outro | adapta estilo em segundos; faixa rua | media |

### Strong Guy (Guido Carosella) — geracaox

Atributos: destreza 6, força 13, corpo 14, inteligência 5, vontade 7, mente 6, influência 7, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Converte impacto recebido em massa e força sobre-humanas | 12 | 14 | peso | rotina: força carregada ~100 t → 12; pico com muita absorção ~400 t (14) | media |
| Protege aliados absorvendo golpes que os derrubariam | 13 |  | resistencia | absorve golpes de super-fortes que derrubariam aliados (13-15) → 13 | media |
| Descarrega força acumulada em golpes e arremessos | 12 |  | energia | descarga arruína tanque (11-12) → 12 | media |
| Experiência como linha de frente e escudo da equipe | — |  | — | experiência/papel | alta |
| Usa humor para manter a equipe coesa sob pressão | — |  | — | traço de personalidade | alta |
| Sabe quando recuar para não transformar força em imprudência | — |  | — | traço de personalidade | alta |
| Tecladista profissional e performer acostumado a multidões | — |  | — | profissão/histórico | alta |
| Mantém contatos e logística de estrada para a equipe | — |  | — | logística/relacionamento | alta |
| Transforma presença pública em distração quando necessário | — |  | — | truque social narrativo | media |
| Absorção de Energia Cinética em Força Muscular _(extra)_ | 12 |  | peso | extra; mesma absorção convertida em força → 12 | media |
| Força e Resistência Colossais _(extra)_ | 12 |  | peso | extra; mesma força colossal ~100 t → 12 | media |
| Humor Constante _(extra)_ | — |  | — | traço de personalidade | alta |

### Tempestade (Ororo Munroe) — x-men

Atributos: destreza 7, força 4, corpo 5, inteligência 7, vontade 9, mente 8, influência 10, aura 12, espírito 10

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle Climático Global | 21 | 23 | area | o texto é o feito: clima em escala global, raio da Terra ~6.400 km → 21 (como Escudo Magnético Global); rotina regional ~17 | media |
| Desencadeia Raios com Precisão Cirúrgica | 14 |  | energia | raios derrubam aeronave blindada/Sentinela (13–15) → 14 | media |
| Criação de Tornados e Furacões | 17 |  | area | furacão de raio ~300 km → 17 | media |
| Voo via Correntes de Ar | 8 |  | velocidade | voo de ~400–640 km/h → 8 | media |
| Considerada Deusa por culturas africanas | — |  | — | histórico/status | alta |
| Liderança e Realeza | 8 |  | informacao | líder dos X-Men e rainha (faixa rua) → 8 | media |
| Orgulho Africano | — |  | — | identidade | alta |
| Compaixão e Sabedoria | — |  | — | personalidade | alta |
| Furtividade Urbana | 6 |  | informacao | ladra de rua mestre, pico humano → 6 | media |
| Mestre do Disfarce | 6 |  | informacao | disfarce de pico humano → 6 | media |
| Contatos no Submundo | — |  | — | relacionamento/recurso | alta |
| Geração de Furacões de Categoria Máxima sob Comando | 17 |  | area | furacão categoria 5, raio ~300 km → 17 | media |
| Relâmpagos de Precisão Cirúrgica em Escala de Batalha | 14 |  | energia | mesmos raios de Desencadeia Raios → 14 | media |
| Criação Instantânea de Múltiplos Tornados | 11 |  | area | campo de tornados em raio ~5 km → 11 | media |
| Manipulação de Pressão Atmosférica em Área Continental | 20 |  | area | o texto é o feito: raio continental ~3.000 km → 20 | media |
| Voo Sustentado por Controle Direto das Correntes de Vento | 8 |  | velocidade | mesmo voo de Voo via Correntes de Ar → 8 | media |
| Percepção Climática — Sente Mudanças Atmosféricas a Quilômetros | 10 |  | distancia | o texto é o feito: quilômetros (~3 km) → 10 | media |
| Controle de Temperatura Regional (Nevascas, Secas Induzidas) | 16 |  | area | regional, raio ~180 km → 16 | media |
| Neblina Instantânea Capaz de Ocultar Exércitos Inteiros | 11 |  | area | cobre campo de batalha de raio ~5 km → 11 | media |
| Dispersão Forçada de Sistemas Climáticos Hostis | 17 |  | area | desfaz furacão de raio ~300 km → 17 | media |
| Descargas Elétricas Capazes de Derrubar Aeronaves Blindadas | 14 |  | energia | o texto é o feito: aeronave blindada (13–15) → 14 | alta |
| Alteração de Padrões Climáticos em Escala Global Quando Desencadeada por Completo | 21 | 23 | area | o texto é o feito: global ~6.400 km de raio → 21; pico 23 | media |
| Liderança Carismática _(extra)_ | 8 |  | informacao | extra; mesma liderança → 8 | media |

### Três‑em‑Uma (Stepford Cuckoos) (Celeste, Mindee, Phoebe) — x-men

Atributos: destreza 6, força 4, corpo 5, inteligência 9, vontade 9, mente 12, influência 8, aura 10, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Mente de Colmeia Telepática | 16 |  | informacao | elo telepático total entre as três, base da faixa Ômega → 16 | media |
| Telepatia de Nível Ômega em Conjunto | 21 |  | distancia | ladder: unidas = telepatia Ômega de rotina, continental ~5.000 km → 21 (= rotina da Emma) | media |
| Ilusões e Ataques Psíquicos | 16 |  | informacao | ilusões/ataques coordenados: base Ômega → 16 | media |
| Controle Mental Coordenado | 16 |  | informacao | controle mental conjunto: base Ômega → 16 | media |
| Leitura Simultânea de Muitas Mentes | 16 |  | informacao | lê dezenas/centenas de mentes de uma vez → 16 | media |
| Forma de Diamante (como Emma) | 15 |  | resistencia | = Forma de Diamante da Emma → 15 | media |
| Elegância Fria e Calculista | — |  | — | personalidade | alta |
| Filhas/Clones de Emma Frost | — |  | — | relacionamento/origem | alta |
| Completam as Frases umas das Outras | — |  | — | traço | alta |
| Falam como uma Só Voz | — |  | — | traço | alta |
| Alunas de Elite do Instituto | — |  | — | papel | alta |
| Confiança Intelectual Imensa | — |  | — | personalidade | alta |

### Trevor Fitzroy — clube-do-inferno

Atributos: destreza 6, força 5, corpo 6, inteligência 7, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Portais Dimensionais | 23 |  | distancia | portais cronais para qualquer ponto do globo (trouxe Sentinelas do futuro) → 23 | media |
| Viagem Temporal | 20 |  | outro | viagem temporal entre eras, faixa Ômega → 20 (não usa coluna Tempo) | baixa |
| Drena Energia Vital e Envelhece Vítimas ao Toque | 10 |  | outro | mata humanos ao toque; pareado a Corpo de rua → 10 | baixa |
| Abre Portais Dimensionais Instantâneos com a Energia Roubada | 23 |  | distancia | mesmos portais → 23 | media |
| Viaja no Tempo Através dos Próprios Portais | 20 |  | outro | mesma viagem temporal → 20 | baixa |
| Ambição Impiedosa ao Assumir o Comando dos Hellions | — |  | — | traço/histórico | alta |
| Portal Temporal _(extra)_ | 23 |  | distancia | extra; mesmos portais → 23 | media |
| Ambicioso _(extra)_ | — |  | — | traço | alta |

### Wolverine (Logan) — x-men

Atributos: destreza 8, força 7, corpo 12, inteligência 5, vontade 9, mente 6, influência 5, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fator de Cura Acelerado | 16 | 20 | resistencia | ferimentos letais em minutos/regenera tecido (13–16) → 16; pico: volta de quase nada | media |
| Esqueleto de Adamantium | 18 |  | resistencia | adamantium: material virtualmente indestrutível → 18 (família adamantium 18–20) | media |
| Garras de Adamantium | 16 |  | energia | garras de adamantium cortam quase tudo (virtualmente indestrutível 16–18) → 16; = X-23/Lady Deathstrike | media |
| Combatente Veterano | 8 |  | outro | veterano de um século de combate; faixa rua | media |
| Instinto Berserker | 8 |  | outro | fúria berserker; faixa rua | baixa |
| Código de Honra Pessoal | — |  | — | código pessoal | alta |
| Mestre em Artes Marciais | 7 |  | outro | mestre em artes marciais acima do pico humano | media |
| Lealdade Feroz aos Amigos | — |  | — | personalidade | alta |
| Décadas de Experiência | 8 |  | outro | experiência de décadas; mesma faixa de veterano | baixa |
| Séculos de Combate | 8 |  | outro | séculos de combate; mesma faixa de veterano | baixa |
| Rastreador Implacável | 10 |  | distancia | faro rastreia por quilômetros ~3 km → 10 | media |
| Resistência a Telepatia | 12 |  | outro | mente reforçada/implantes; pareado a telepatas de rua (~12) | baixa |
| Conhecimento de Operações Negras | 8 |  | informacao | operações negras da Arma X; faixa rua | media |
| Regeneração Instantânea de Ferimentos Letais | 16 |  | resistencia | mesma regeneração de ferimentos letais → 16 | media |
| Sobrevive a Decapitação e Regenera o Corpo Inteiro | 20 |  | resistencia | texto é o feito: regenera o corpo inteiro (18–22) → 20 | media |
| Imune a Praticamente Todo Veneno e Doença | 14 |  | resistencia | imune a quase todo veneno/doença; faixa rua alta | media |
| Esqueleto de Adamantium Inquebrável | 18 |  | resistencia | mesmo esqueleto de adamantium → 18 | media |
| Garras Retráteis de Adamantium Cortam Quase Qualquer Material | 16 |  | energia | mesmas garras de adamantium → 16 | media |
| Regeneração Sustentada Mesmo sob Ataque Contínuo | 16 |  | resistencia | regeneração sob ataque contínuo → 16 | media |
| Cicatrização Ignora Fogo, Ácido e Radiação | 16 |  | resistencia | cura ignora fogo/ácido/radiação → 16 | media |
| Longevidade Extrema (Envelhecimento Drasticamente Retardado) | 10 |  | duracao | envelhecimento retardado (séculos); faixa rua | baixa |
| Sobrevive a Explosões e Quedas Fatais para Humanos Comuns | 12 |  | resistencia | sobrevive a explosões de tanque/bunker (11–12) | media |
| Fator de Cura Neutraliza a Maioria de Drogas e Sedativos | 10 |  | resistencia | metaboliza drogas/sedativos; faixa rua | media |
| Samurai Interior _(extra)_ | — |  | — | traço/personalidade | media |
| Sentidos de Predador Apex _(extra)_ | 10 |  | distancia | sentidos de predador: faro/audição ~3 km → 10 | media |

### X-23 (Laura Kinney / Wolverine) — x-men

Atributos: destreza 10, força 7, corpo 9, inteligência 7, vontade 10, mente 8, influência 5, aura 8, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fator de Cura Acelerado | 16 |  | resistencia | regenera membros/órgãos, mesmo tier do Wolverine → 16 | media |
| Garras de Adamantium | 16 |  | energia | garras de adamantium cortam quase tudo ('virtualmente indestrutível' 16-18) → 16 | media |
| Assassina Condicionada | 8 |  | outro | assassina treinada acima do pico humano → 8 | media |
| Identidade em Construção | — |  | — | arco narrativo | alta |
| Feromônio Desencadeia Fúria | — |  | — | fraqueza (gatilho) | alta |
| Perde Controle Total | — |  | — | fraqueza | alta |
| Cheiro Específico Ativa | — |  | — | fraqueza (gatilho) | alta |
| Fator de Cura Similar | 16 |  | resistencia | mesmo fator de cura → 16 | media |
| Duas Garras por Mão | — |  | — | traço anatômico; o corte está em Garras de Adamantium | media |
| Garra no Pé | — |  | — | traço anatômico; o corte está em Garras de Adamantium | media |
| Sem Adamantium no Esqueleto | — |  | — | fraqueza/ausência | alta |
| Regeneração Instantânea de Órgãos e Ossos Fraturados | 16 |  | resistencia | regenera órgãos e ossos; mesmo fator → 16 | media |
| Garras Retráteis Duplas em Cada Mão, Mais Uma no Pé | — |  | — | traço anatômico; o corte está em Garras de Adamantium | media |
| Cicatrização Neutraliza Quase Todo Veneno e Sedativo | 10 |  | outro | pareado a venenos e sedativos comuns (~10) | media |
| Sobrevive a Ferimentos Letais para Qualquer Humano | 14 |  | resistencia | mesmo fator de cura (sobrevive ferimentos letais) → 14 | media |
| Corte Cirúrgico Preciso — Nenhum Movimento Desperdiçado | 8 |  | outro | precisão de corte acima do pico humano → 8 | media |
| Controle Consciente Sobre o Instinto Assassino, ao Contrário de Logan | — |  | — | traço de personalidade/controle | alta |
| Envelhecimento Retardado pelo Fator de Cura | 6 |  | duracao | envelhecimento retardado; faixa humana alta → 6 | baixa |
| Regeneração Sustenta Combate Prolongado sem Fadigar | 16 |  | resistencia | regeneração contínua sob ataque → 16; = Wolverine/Sabretooth | media |
| Cicatrização Rápida Mesmo de Membros Decepados | 16 |  | resistencia | regenera membros decepados → 16; mesmo fator | media |
| Sentidos Apurados Rastreiam Alvos por Cheiro e Som | 10 |  | distancia | faro/audição rastreiam por quilômetros (~3 km) → 10 | media |

## Perigo: medio

### Anjo (Warren Worthington III / Arcanjo) — x-men

Atributos: destreza 9, força 5, corpo 6, inteligência 6, vontade 6, mente 6, influência 10, aura 9, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Asas | — |  | — | traço físico; o voo está em Voo Sônico | media |
| Como Arcanjo | — |  | — | rótulo de forma; capacidades em Asas Metálicas Cortantes | media |
| Bilionário Worthington Industries | — |  | — | recurso/status | alta |
| Aparência Angélica | — |  | — | traço físico | alta |
| Sangue com Propriedades Curativas Únicas | 13 |  | resistencia | sangue cura ferimentos graves/mortais de outros (13–16) → 13 | media |
| Asas Metálicas Cortantes | 12 |  | energia | asas tecno-orgânicas cortam aço/blindagem (11–12) → 12 | media |
| Voo Sônico e Precisão Aérea | 9 |  | velocidade | o texto é o feito: sônico ~1.200 km/h → 9 | media |
| Bilionário Worthington _(extra)_ | — |  | — | recurso/status | alta |
| Sangue Curativo _(extra)_ | 13 |  | resistencia | extra; mesmo sangue curativo → 13 | media |

### Anole — x-men

Atributos: destreza 9, força 6, corpo 6, inteligência 6, vontade 8, mente 6, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Camuflagem Cromática | 7 |  | informacao | pele muda de cor com o ambiente, camuflagem parcial (rua baixa) → 7 | media |
| Língua Preênsil Extensível | 1 |  | distancia | agarra a ~6 m → 1 | media |
| Garras e Aderência a Superfícies | 4 |  | outro | escala paredes/teto e corta com garras (atleta) → 4 | baixa |
| Regeneração de Membros | 13 |  | resistencia | regenera membros perdidos (13–16) → 13 | media |
| Agilidade Réptil | 6 |  | outro | agilidade no pico humano → 6 | media |
| Assumidamente Gay e Confiante | — |  | — | identidade/personalidade | alta |
| Sarcasmo como Escudo | — |  | — | personalidade | alta |
| Ídolo dos Alunos Marginalizados | — |  | — | reputação | alta |
| Melhor Amigo de Rockslide | — |  | — | relacionamento | alta |
| Lealdade Feroz à Equipe | — |  | — | relacionamento | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |

### Arclight — vilao

Atributos: destreza 5, força 8, corpo 7, inteligência 4, vontade 5, mente 4, influência 4, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Ondas de Choque Sísmicas | 11 | 16 | energia | golpe sísmico racha bunker/concreto armado → 11; pico: derrubou túneis dos Morlocks | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Força Aumentada pela Mutação | 9 |  | peso | ergue ~13 t → 9 | media |

### Armor (Hisako Ichiki) — novatos

Atributos: destreza 7, força 5, corpo 5, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Projeta uma armadura psíquica gigante que absorve impactos | 11 |  | resistencia | armadura psíquica absorve impactos até tanque/bunker (11–12) → 11 | media |
| Amplia força e alcance físico através da forma astral | 9 |  | peso | força amplificada ergue ~13 t (ônibus pesado/vagão) → 9 | media |
| Usa a armadura para proteger aliados e bloquear passagens | 11 |  | resistencia | mesma armadura protege aliados/bloqueia passagens → 11 | media |
| Disciplina e coragem para agir mesmo com medo | — |  | — | personalidade | alta |
| Experiência de equipe com os Jovens X-Men | — |  | — | histórico | alta |
| Lidera pela proteção, não pela força bruta | — |  | — | estilo de liderança | media |
| Armadura Psíquica _(extra)_ | 11 |  | resistencia | extra; mesma armadura psíquica → 11 | media |
| Determinação _(extra)_ | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Exoesqueleto Psiônico Ancestral _(extra)_ | 11 |  | resistencia | extra; mesmo exoesqueleto → 11 | media |
| Resistência ao Dano Físico Dentro da Armadura _(extra)_ | 11 |  | resistencia | extra; mesma resistência da armadura → 11 | media |
| Força Amplificada na Armadura _(extra)_ | 9 |  | peso | extra; mesma força amplificada → 9 | media |
| Conectada aos Ancestrais _(extra)_ | — |  | — | fonte espiritual/narrativa | media |
| Potencial Crescente _(extra)_ | — |  | — | potencial/latente | alta |

### Aurora (Jeanne-Marie Beaubier) — vilao

Atributos: destreza 10, força 5, corpo 6, inteligência 7, vontade 6, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Voo Supersônico | 12 |  | velocidade | voo ~Mach 10 (~12.000 km/h) → 12, igual a Estrela Polar | baixa |
| Luz Cegante quando em contato com Northstar | 6 |  | area | clarão cegante com o gêmeo cobre ~180 m → 6 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Gêmea de Northstar | — |  | — | relacionamento | alta |

### Avalanche (Dominikos Petrakis) — irmandade

Atributos: destreza 6, força 5, corpo 6, inteligência 5, vontade 7, mente 6, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Gera vibrações que racham chão, paredes e fundações | 10 |  | energia | racha concreto armado/fundações (9–10) → 10 | media |
| Concentra tremores para desequilibrar grupos ou abrir rotas | 5 |  | area | tremor focado em raio ~90 m → 5 | media |
| Derruba estruturas sem precisar tocar diretamente nelas | 16 |  | energia | derruba prédio pequeno inteiro (16–18) → 16 | media |
| Ex-agente da Irmandade acostumado a sabotagem e demolição | — |  | — | histórico | alta |
| Conhece combate urbano e como transformar terreno em vantagem | 4 |  | informacao | tática urbana treinada (humano) → 4 | media |
| Pragmatismo o ajuda a recuar quando uma causa está perdida | — |  | — | personalidade | alta |
| Ondas Sísmicas _(extra)_ | 10 |  | energia | extra; mesmas vibrações que racham fundações → 10 | media |
| Demolidor _(extra)_ | 16 |  | energia | extra; derruba estruturas → 16 | baixa |
| Geokinese _(extra)_ | 16 |  | energia | extra; o poder geral, teto de rotina = derrubar prédio pequeno → 16 | media |
| Terremotos e Avalanches Localizados _(extra)_ | 9 |  | area | extra; tremor localizado em raio ~1,5 km → 9 | media |
| Mercenário Pragmático _(extra)_ | — |  | — | personalidade | alta |

### Banshee (Sean Cassidy) — x-men

Atributos: destreza 6, força 4, corpo 5, inteligência 7, vontade 7, mente 7, influência 7, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Emite grito sônico capaz de derrubar e desorientar | 9 |  | energia | grito estilhaça aço e concreto armado (9–10) → 9 | media |
| Modula frequência para concussão, ruptura ou confusão | 9 |  | energia | mesmo grito sônico modulado → 9 | media |
| Usa ondas sonoras para defesa de área | 8 |  | resistencia | parede sônica desvia balas/estilhaços (7–8) → 8 | baixa |
| Voa surfando as próprias ondas sonoras | 7 |  | velocidade | voo ~320 km/h → 7 | media |
| Cria barreiras vibratórias de proteção | 8 |  | resistencia | = defesa sônica de área → 8 | baixa |
| Percebe vibrações e ecos no ambiente | 6 |  | distancia | sonar a ~180 m → 6 | baixa |
| Investigação internacional e liderança de jovens mutantes | 6 |  | informacao | ex-Interpol: investigador de elite, pico humano → 6 | baixa |
| Experiência de comando em crises | 5 |  | informacao | comando treinado em crise (humano experiente) → 5 | baixa |
| Atua como mentor e pai de Siryn | — |  | — | relacionamento/papel | alta |
| Frequência Hipnótica _(extra)_ | 7 |  | informacao | frequência que induz transe em humanos próximos (rua baixa) → 7 | baixa |
| Ex-Agente da Interpol _(extra)_ | — |  | — | histórico | alta |
| Fundador da Geração X _(extra)_ | — |  | — | histórico | alta |
| Pai de Siryn _(extra)_ | — |  | — | relacionamento | alta |
| Grito Sonar _(extra)_ | 9 |  | energia | extra; = grito sônico → 9 | media |
| Voo via Ondas Sonoras _(extra)_ | 7 |  | velocidade | extra; = voo sônico → 7 | media |

### Blindfold (Ruth Aldine) — novatos

Atributos: destreza 4, força 3, corpo 4, inteligência 7, vontade 7, mente 9, influência 5, aura 6, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Nascida Sem Olhos e Ainda Assim Percebe Tudo | 4 |  | distancia | percepção do entorno sem olhos ~45 m → 4 | baixa |
| Precognição de Eventos Trágicos | 14 |  | duracao | prevê mortes e catástrofes futuras com precisão; faixa rua alta → 14 | baixa |
| Sente Presenças Sobrenaturais e Espíritos | 6 |  | distancia | percebe presenças ~campus 180 m → 6 | baixa |
| Interpretação de Sinais e Presságios | 10 |  | informacao | leitura de presságios, faixa rua → 10 | baixa |
| Percepção Além dos Cinco Sentidos | 8 |  | informacao | sexto sentido, faixa rua → 8 | baixa |
| Sente o Fio do Destino de Quem Está por Perto | 10 |  | informacao | lê destino de quem está perto, faixa rua → 10 | baixa |
| Detecta Mentiras pela Vibração da Voz | 6 |  | informacao | detector de mentiras humano no pico → 6 | baixa |
| Fala em Enigmas que Revelam Verdades Ocultas | — |  | — | traço de fala | alta |
| Avisa Perigos Antes que Aconteçam | 14 |  | duracao | mesma precognição → 14 | baixa |
| Sente a Morte se Aproximando de Alguém | 14 |  | duracao | mesma precognição → 14 | baixa |
| Guia os Aliados por Instruções Enigmáticas Precisas | 12 |  | informacao | orientação precognitiva de equipe, não supera a precognição → 12 | baixa |
| Calma Perturbadora Diante do Caos | — |  | — | traço de personalidade | alta |
| Sabedoria que Assusta e Acalma ao Mesmo Tempo | — |  | — | traço de personalidade | alta |
| Gentileza Genuína sob a Aura Sombria | — |  | — | traço de personalidade | alta |
| Aceitação Tranquila do Próprio Dom | — |  | — | traço de personalidade | alta |

### Bling! — x-men

Atributos: destreza 7, força 6, corpo 8, inteligência 6, vontade 8, mente 6, influência 8, aura 9, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Esqueleto de Diamante Semi-Orgânico | 9 |  | resistencia | esqueleto/pele de diamante: aguenta balas e concreto (9–10) → 9 | media |
| Arremessa Projéteis de Diamante | 6 |  | energia | fragmentos de diamante arremessados: impacto de pico humano/arromba porta | media |
| Resistência Excepcional a Dano | 9 |  | resistencia | mesma resistência do diamante → 9 | media |
| Corte Afiado no Combate | 6 |  | energia | cortes de diamante em combate; mesma faixa dos projéteis | media |
| Autoconfiança Deslumbrante | — |  | — | personalidade | alta |
| Assumidamente Lésbica e Estilosa | — |  | — | identidade | alta |
| Presença de Estrela | 5 |  | informacao | carisma de estrela; faixa humana alta | baixa |
| Herança de Família Musical | — |  | — | histórico familiar | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |

### Blob (Fred Dukes) — irmandade

Atributos: destreza 3, força 12, corpo 16, inteligência 3, vontade 6, mente 3, influência 2, aura 3, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Ancora o próprio corpo ao solo e resiste a força, impacto e empurrões | 15 |  | outro | ancoragem inercial pareada à força do Hulk ('nem Hulk o move', ~14-16) → 15 | media |
| Pele e gordura absorvem golpes e prendem adversários que o atacam | 12 |  | resistencia | pele/gordura absorvem balas, canhões, mísseis (11-12) → 12 | media |
| Usa peso e volume para bloquear corredores e derrubar estruturas | 8 |  | energia | peso e massa derrubam parede/estrutura leve → 8 | media |
| Experiência como brutamontes da Irmandade em combate de equipe | — |  | — | experiência | alta |
| Resistência psicológica para suportar humilhação e rejeição | — |  | — | traço psicológico | alta |
| Conhece o valor tático de segurar a linha de frente | — |  | — | conhecimento tático vago | media |
| Campo de Força Inercial _(extra)_ | 15 |  | outro | extra; mesmo campo inercial → 15 | media |
| Pele Praticamente Invulnerável ao Dano Físico _(extra)_ | 12 |  | resistencia | extra; mesma pele invulnerável → 12 | media |
| Força Colossal _(extra)_ | 8 |  | peso | força ~6 t → 8 | media |
| Nenhuma Sensibilidade à Dor Física _(extra)_ | 6 |  | resistencia | insensível à dor: ignora ferimentos no pico humano → 6 | baixa |

### Boggart — x-men

Atributos: destreza 6, força 4, corpo 5, inteligência 6, vontade 7, mente 7, influência 5, aura 8, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Metamorfose Aterrorizante | 9 |  | informacao | muda de forma para assustar; engana/aterroriza grupos (faixa rua) → 9 | media |
| Assume a Forma do Medo do Alvo | 10 |  | informacao | lê o medo do alvo e o encarna (faixa rua) → 10 | media |
| Intimidação Psicológica | 8 |  | informacao | intimidação sobrenatural acima do humano → 8 | media |
| Aparência Naturalmente Sinistra | — |  | — | traço físico | alta |
| Humor Negro e Brincalhão | — |  | — | personalidade | alta |
| Leal aos Amigos Ferozmente | — |  | — | relacionamento | alta |
| Alívio Cômico da Equipe | — |  | — | papel social | alta |
| Coração Gentil sob a Máscara | — |  | — | personalidade | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |

### Bolt (Christopher Bradley) — vilao

Atributos: destreza 7, força 5, corpo 6, inteligência 5, vontade 6, mente 5, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Projeção de Rajadas Elétricas | 7 |  | energia | rajada derruba gente e danifica parede de tijolo/veículo (7–8) → 7 | media |
| Ex-Militar _(extra)_ | — |  | — | histórico | alta |

### Boomer (Tabitha Smith / Boom-Boom / Meltdown) — novatos

Atributos: destreza 7, força 4, corpo 5, inteligência 6, vontade 7, mente 7, influência 7, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Cria esferas de energia plasmática que explodem ao impacto | 8 | 10 | energia | bombas derrubam parede de tijolo/viram carro → 8 | media |
| Regula força e ricochete para abrir passagem ou afastar inimigos | 8 |  | energia | mesmas bombas → 8 | media |
| Usa o próprio impulso explosivo para acrobacias e fuga | 5 |  | velocidade | impulso explosivo ~80 km/h → 5 | baixa |
| Sobrevivente independente que improvisa sob pressão | — |  | — | traço | alta |
| Experiência com X-Force e equipes mutantes jovens | — |  | — | histórico | alta |
| Humor irreverente que desarma tensão social | — |  | — | traço de personalidade | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Atitude Rebelde | — |  | — | traço de personalidade | alta |
| Bombas de Plasma com Timer Psiônico _(extra)_ | 8 |  | energia | extra; mesmas bombas → 8 | media |
| Bombas de Meltdown _(extra)_ | 10 |  | energia | bombas maiores rompem concreto armado → 10 | media |

### Cable (Suprimido) — x-men

Atributos: destreza 6, força 6, corpo 6, inteligência 5, vontade 6, mente 6, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Metade do Corpo Cibernético | 8 |  | resistencia | metade do corpo techno-orgânico: aguenta balas/vira caminhão (7–8) | baixa |
| Força Sobre-Humana (Braço Cibernético) | 8 |  | peso | braço T-O ergue ~6 t (caminhão) → 8 | media |
| Interface Tecnológica Universal | 10 |  | informacao | interface com qualquer tecnologia pelo T-O; faixa rua | baixa |
| Regeneração Tecnorgânica | 9 |  | resistencia | regeneração tecnorgânica de ferimentos graves; abaixo de 'bala em minutos' | media |
| Leitura Mental Curto Alcance | 4 |  | distancia | telepatia mínima ~45 m | media |
| Escudos Mentais Básicos | 8 |  | outro | escudos mentais básicos pareados a telepatia de rua baixa (~8) | media |
| Levita Objetos Pequenos | 2 |  | peso | levita objetos pequenos ≤ ~90 kg | media |
| Link Psíquico com Hope | 12 |  | distancia | elo psíquico com Hope em escala de cidade ~11 km | baixa |
| Rifle de Plasma do Futuro | 10 |  | energia | rifle de plasma: concreto armado/blindado leve (9–10) | media |
| Dispositivo Teletransporte Temporal | 23 |  | distancia | bodyslide/teletransporte temporal alcança qualquer ponto do globo → 23 | baixa |
| Escudos de Força Portáteis | 9 |  | resistencia | escudo de força portátil: artilharia leve/concreto (9–10) → 9 | media |
| Braço Cibernético: Ferramentas/Armas | 8 |  | energia | ferramentas/armas embutidas no braço: parede/caminhão (7–8) | media |
| Visor Tático: Raio-X, Termal, Rastreamento | 8 |  | distancia | visor com raio-X/termal/rastreamento ~760 m | media |
| Conhece História Futura (Eventos Chave) | 10 |  | informacao | conhece eventos-chave do futuro; faixa rua | media |
| Táticas de Guerra Assimétrica | 9 |  | informacao | guerra assimétrica; faixa rua | media |
| Liderança X-Force / Pergaminhos | 8 |  | informacao | liderança da X-Force; faixa rua | media |
| Especialista Contra-Apocalipse | 10 |  | informacao | especialista contra Apocalipse; faixa rua | media |
| Décadas de Experiência em Guerrilha do Futuro | 8 |  | outro | décadas de guerrilha; faixa rua | media |
| Mestre em Todo Armamento Existente | 7 |  | energia | domina qualquer arma: fuzil/armas pesadas portáteis (5–7) → 7 | media |
| Planejamento de Operações Multi-Fase | 9 |  | informacao | planejamento multifase; faixa rua | media |
| Instrutor de Combate para Recrutas da X-Force | 8 |  | informacao | instrutor de combate; faixa rua | media |
| Sobrevivencialismo Extremo em Terreno Hostil | 8 |  | outro | sobrevivencialismo em terreno hostil; faixa rua | media |
| Leitura Tática Instantânea de Campo de Batalha | 9 |  | informacao | leitura tática instantânea; faixa rua | media |
| Treinamento Sobrevivência Extremo | 8 |  | outro | mesmo sobrevivencialismo extremo → 8 | media |
| Conexão Genética/Psíquica Única | — |  | — | vínculo genético/relacionamento | alta |
| Sacrifício Total Pela Filha | — |  | — | motivação | alta |

### Caliban — morlock

Atributos: destreza 5, força 10, corpo 9, inteligência 4, vontade 6, mente 4, influência 4, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Sente e localiza assinaturas mutantes a grande distância | 11 |  | distancia | detecção mutante em raio de km (~3-5 km) → 11 | media |
| Distingue a presença e a força geral de mutantes próximos | 6 |  | distancia | avalia força de mutantes próximos (~180 m) → 6 | media |
| Usa sentidos ampliados para seguir alvos em terreno difícil | 9 |  | distancia | rastreia alvos por sentidos ampliados ~1,5 km → 9 | media |
| Conhece túneis, refúgios e rotas de fuga subterrâneas | 4 |  | informacao | conhecimento local de túneis Morlock → 4 | baixa |
| Força e resistência físicas acima do humano | 8 |  | peso | força pós-Apocalipse ~6 t → 8 | media |
| Lealdade profunda a quem lhe oferece pertencimento | — |  | — | traço de personalidade | alta |
| Detector de Mutantes _(extra)_ | 11 |  | distancia | extra; mesmo detector → 11 | media |
| Força Colossal Aumentada por Apocalipse _(extra)_ | 8 |  | peso | extra; mesma força ~6 t → 8 | media |
| Mentalidade Ingênua _(extra)_ | — |  | — | traço de personalidade | alta |

### Cameron Hodge — vilao

Atributos: destreza 5, força 7, corpo 7, inteligência 7, vontade 8, mente 7, influência 6, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Cyborg | 10 |  | resistencia | corpo robótico aguenta concreto/artilharia leve (9–10) → 10 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Imortalidade Pela Preservação da Cabeça | 16 |  | resistencia | cabeça preservada "virtualmente indestrutível" (16–18) → 16 | baixa |
| Líder da Falange _(extra)_ | — |  | — | papel/afiliação | alta |
| Anti-Mutante Radical _(extra)_ | — |  | — | ideologia | alta |
| Ex-Parceiro de Warren Worthington _(extra)_ | — |  | — | relacionamento/histórico | alta |

### Cannonball (Sam Guthrie) — novatos

Atributos: destreza 7, força 6, corpo 7, inteligência 6, vontade 8, mente 7, influência 7, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Lança-se em alta velocidade como um projétil humano | 9 | 11 | velocidade | rotina ~Mach 1 (1.200 km/h) → 9; pico ~Mach 4 | media |
| Fica praticamente invulnerável enquanto está em explosão | 16 |  | resistencia | "praticamente invulnerável" em explosão: virtualmente indestrutível (16–18) → 16 | media |
| Usa impacto e impulso para romper defesas ou resgatar aliados | 11 |  | energia | investida atravessa tanque/bunker (11–12) → 11 | media |
| Coordena jovens mutantes sob pressão | 5 |  | informacao | liderança de campo treinada → 5 | baixa |
| Toma decisões de resgate rapidamente | 5 |  | informacao | decisão tática rápida (humano treinado) → 5 | baixa |
| Mantém a equipe unida em crise | 5 |  | informacao | liderança social de campo → 5 | baixa |
| Invulnerabilidade em Voo _(extra)_ | 16 |  | resistencia | extra; = invulnerável em explosão → 16 | media |
| Liderança Natural _(extra)_ | 5 |  | informacao | extra; = liderança de campo → 5 | baixa |
| Família Guthrie _(extra)_ | — |  | — | relacionamento | alta |
| Membro dos X-Men _(extra)_ | — |  | — | afiliação | alta |
| Propulsão Termoquímica _(extra)_ | 9 |  | velocidade | extra; = lança-se como projétil → 9 | media |
| Liderança Natural e Leal _(extra)_ | 5 |  | informacao | extra; = liderança de campo → 5 | baixa |
| Membro de Família Numerosa de Mutantes (Guthries) _(extra)_ | — |  | — | relacionamento | alta |

### Cecilia Reyes (Dra. Cecilia Reyes) — x-men

Atributos: destreza 5, força 3, corpo 4, inteligência 11, vontade 8, mente 9, influência 7, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Campo de Força Biológico Instintivo | 10 | 12 | resistencia | campo aguenta balas/explosões/artilharia leve → 10 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Doutora de Elite | 6 |  | informacao | médica de trauma de elite, pico humano → 6 | media |
| Queria Vida Normal, Não Heroína | — |  | — | traço/motivação | alta |
| Médica de Trauma e Cirurgiã de Elite _(extra)_ | 6 |  | informacao | extra; mesma perícia médica → 6 | media |

### Chamber (Jono Starsmore) — novatos

Atributos: destreza 7, força 4, corpo 4, inteligência 7, vontade 8, mente 9, influência 6, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Plasma Psiônico Explodindo do Peito | 12 |  | energia | plasma psiônico arrebenta tanque/bunker (11–12) → 12 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Comunicação Telepática | 4 |  | distancia | telepatia de comunicação ~45 m (substitui a fala) | media |
| Explosão Psíquica _(extra)_ | 12 |  | energia | extra; mesmo plasma psiônico → 12 | media |
| Silêncio _(extra)_ | — |  | — | traço/limitação | alta |

### Dazzler (Alison Blaire) — x-men

Atributos: destreza 7, força 4, corpo 5, inteligência 6, vontade 7, mente 7, influência 9, aura 10, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Converte som ambiente em energia luminosa | 8 | 16 | energia | rotina: rajadas derrubam parede/viram carro → 8; pico em show lotado ~16 | media |
| Projeta clarões, lasers e padrões de luz sólidos | 8 |  | energia | mesmos lasers/clarões → 8 | media |
| Modula cor e intensidade para desorientar ou cegar | 6 |  | area | cega/desorienta em raio de ~180 m → 6 | media |
| Cantora experiente que usa palco e carisma para mobilizar pessoas | 7 |  | informacao | estrela pop mobiliza multidões; acima do pico humano → 7 | media |
| Lê a energia de uma plateia e mantém presença sob pressão | 5 |  | informacao | leitura de plateia no pico humano → 5 | media |
| Transforma uma apresentação em distração ou sinalização tática | 5 |  | informacao | performance como distração/sinal → 5 | baixa |
| Improvisa com fontes sonoras, iluminação e o terreno urbano | — |  | — | improviso vago, sem feito | media |
| Experiência ao lado dos X-Men em evacuações e crises | — |  | — | experiência | alta |
| Controla a intensidade para evitar ferir civis e aliados | — |  | — | controle, não feito | alta |
| Laser de Luz Concentrado _(extra)_ | 8 |  | energia | extra; mesmo laser → 8 | media |
| Cantora e Performer _(extra)_ | 7 |  | informacao | extra; mesma presença de palco → 7 | media |
| Força Sonora como Disco _(extra)_ | 8 |  | energia | extra; mesmo ataque sonoro/luz → 8 | baixa |
| Transdução de Som em Luz _(extra)_ | 8 |  | energia | extra; mesma transdução → 8 | media |
| Força Sonora como Disco de Ataque _(extra)_ | 8 |  | energia | extra; disco de luz de ataque → 8 | media |

### Diamond Lil (Lillian Crawley) — neutro

Atributos: destreza 4, força 7, corpo 8, inteligência 5, vontade 6, mente 5, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Pele de Diamante Orgânico | 15 |  | resistencia | pele de diamante quase impenetrável: aguenta antitanque/explosões (13–15) → 15 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Força e Resistência Aumentadas pelo Diamante | 6 |  | peso | ergue ~1–1,5 t → 6 | media |
| Ex-Mercenária _(extra)_ | — |  | — | histórico | alta |

### DJ — novatos

Atributos: destreza 7, força 4, corpo 5, inteligência 6, vontade 6, mente 6, influência 7, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Manipulação Sônica através de Música | 6 |  | energia | batida derruba adultos e racha vidro/metal fino (amassa carro 5–6) → 6 | media |
| Ondas de Choque Rítmicas | 6 |  | energia | = manipulação sônica → 6 | media |
| Amplificação de Frequências Ofensivas | 6 |  | energia | = manipulação sônica → 6 | baixa |
| Criação de Barreiras Sonoras | 6 |  | resistencia | barreira para golpes/pedaços de pico humano → 6 | baixa |
| Controle de Volume e Tom à Vontade | 3 |  | outro | controle fino de som, utilidade menor → 3 | baixa |
| Ressonância que Racha Vidro e Metal Fino | 5 |  | energia | o texto é o feito: vidro e chapa fina (amassa carro) → 5 | media |
| Scratches que Distorcem a Realidade Sonora Local | 5 |  | informacao | ilusão auditiva local → 5 | baixa |
| Batidas que Desorientam Inimigos | 6 |  | outro | desorienta humanos/atletas próximos → 6 | baixa |
| Mixagem de Efeitos em Tempo Real | 4 |  | outro | combina efeitos sônicos na hora → 4 | baixa |
| Amplificadores Portáteis Improvisados | 4 |  | outro | equipamento que reforça o alcance sônico (~45 m) → 4 | baixa |
| Loop de Batidas para Sustentar Efeitos | 4 |  | outro | mantém efeito sem esforço por uma cena → 4 | baixa |
| Carisma de Palco Inegável | 5 |  | informacao | carisma de artista talentoso → 5 | media |
| Energia que Contagia a Plateia | — |  | — | personalidade | media |
| Competitividade Saudável nas Batalhas de Som | — |  | — | personalidade | alta |
| Talento Musical Reconhecido no Instituto | 5 |  | informacao | músico talentoso (perícia humana alta) → 5 | media |

### Donald Pierce — vilao

Atributos: destreza 6, força 8, corpo 8, inteligência 7, vontade 7, mente 6, influência 7, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Corpo Robótico de Alta Tecnologia | 8 |  | peso | corpo ciborgue ergue ~6 t → 8 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Líder dos Reavers | — |  | — | papel/cargo | alta |
| Engenheiro de Elite _(extra)_ | 10 |  | informacao | construiu os ciborgues Reavers, acima do gênio humano → 10 | media |

### Dríade (Dryad) — x-men

Atributos: destreza 6, força 5, corpo 6, inteligência 7, vontade 8, mente 7, influência 7, aura 8, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Comunhão e Manipulação da Flora | 5 |  | area | manipula flora num raio de ~90 m → 5 | media |
| Fala com as Plantas | 4 |  | informacao | conversa com plantas; faixa humana | media |
| Cresce Vegetação Instantânea | 5 |  | area | cresce vegetação num raio de ~90 m → 5 | media |
| Enredamento por Raízes e Cipós | 6 |  | peso | raízes/cipós prendem ~1,5 t (carro) → 6 | baixa |
| Serenidade de Floresta Antiga | — |  | — | personalidade | alta |
| Ligação Espiritual com a Natureza | — |  | — | ligação espiritual/narrativa | media |
| Cuidado com os Vulneráveis | — |  | — | personalidade | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |

### Dust (Poeira) (Sooraya Qadir) — x-men

Atributos: destreza 7, força 4, corpo 5, inteligência 7, vontade 9, mente 7, influência 6, aura 8, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transforma-se em Nuvem de Areia Abrasiva | 10 |  | outro | forma de areia ignora golpes/tiros; pareado a ataques físicos de rua (~10) | media |
| Controle de Partículas Finas | 6 |  | area | controla partículas/tempestade de areia ~180 m → 6 | media |
| Esfola Inimigos como Lixa | 7 |  | energia | abrasão esfola carne e desgasta veículos → 7 | media |
| Forma Intangível Evasiva | 10 |  | outro | mesma intangibilidade de areia → 10 | media |
| Muçulmana Devota (usa niqab) | — |  | — | fé/traço | alta |
| Determinação Silenciosa | — |  | — | traço de personalidade | alta |
| Modéstia de Princípio | — |  | — | traço de personalidade | alta |
| Refugiada do Afeganistão | — |  | — | histórico | alta |
| Amizade Leal com Mercúrio | — |  | — | relacionamento | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |

### Empath (Manuel Rodrigo) — clube-do-inferno

Atributos: destreza 5, força 3, corpo 4, inteligência 6, vontade 6, mente 7, influência 11, aura 10, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Projeção Emocional | 9 |  | informacao | impõe emoções a vários alvos num ambiente/prédio (faixa rua) → 9 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Tortura Psicológica | 9 |  | informacao | uso sádico da mesma projeção emocional → 9 | baixa |

### Espectro (Specter) — x-men

Atributos: destreza 8, força 3, corpo 4, inteligência 7, vontade 7, mente 8, influência 4, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intangibilidade | 12 |  | outro | atravessa paredes e evita ataques; pareado a tanque/bunker (11–12) → 12, = Loa | media |
| Invisibilidade Parcial | 8 |  | informacao | quase invisível (= camuflagem em sombras do Noturno) → 8 | media |
| Atravessa Paredes | 12 |  | outro | = Intangibilidade → 12 | media |
| Evasão e Fuga | 6 |  | outro | fuga de especialista com intangibilidade: pico humano → 6 | baixa |
| Humor Seco e Sussurrado | — |  | — | personalidade | alta |
| Observador Perspicaz | 5 |  | informacao | observação atenta (humano alto) → 5 | baixa |
| Surge do Nada quando a Equipe Precisa | — |  | — | traço narrativo | media |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |

### Espinho (Quill) — x-men

Atributos: destreza 7, força 4, corpo 5, inteligência 6, vontade 6, mente 6, influência 4, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Projeta Espinhos pelo Corpo | 4 |  | energia | espinhos perfuram como flechas, golpe de atleta → 4 | media |
| Defesa e Ataque à Distância | 4 |  | distancia | disparos ~45 m → 4 | media |
| Manto Perfurante | 4 |  | outro | espinhos punem quem toca; dano de atleta → 4 | baixa |
| Cobertura de Supressão | 3 |  | area | rajada cobre raio ~24 m → 3 | baixa |
| Lealdade Extrema aos Próximos | — |  | — | traço de personalidade | alta |
| Coragem Silenciosa | — |  | — | traço de personalidade | alta |
| Anseia por Aceitação | — |  | — | traço/motivação | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |

### Forge — x-men

Atributos: destreza 7, força 5, corpo 6, inteligência 13, vontade 7, mente 8, influência 6, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intui como criar dispositivos para um problema específico | 15 |  | informacao | poder mutante de invenção: 'além da ciência terrestre' (13–15) → 15 | media |
| Projeta armamento, próteses e sensores avançados | 14 |  | informacao | projeta armas/próteses/sensores avançados; faixa rua alta | media |
| Adapta sucata e tecnologia alienígena em campo | 14 |  | informacao | adapta tecnologia alienígena em campo; faixa rua alta | media |
| Usa conhecimento espiritual Cheyenne em rituais e proteção | 8 |  | outro | rituais xamânicos de proteção; faixa rua | baixa |
| Reconhece ameaças místicas além da tecnologia | 8 |  | informacao | percebe ameaças místicas; faixa rua | baixa |
| Combina ciência e tradição quando necessário | — |  | — | abordagem/estilo | media |
| Conhece os riscos éticos de tecnologia anti-mutante | — |  | — | consciência ética | alta |
| Inventor Oficial dos X-Men _(extra)_ | 14 |  | informacao | extra; mesma engenharia avançada → 14 | media |
| Xamã Cheyenne _(extra)_ | 8 |  | outro | extra; mesmos rituais xamânicos → 8 | baixa |
| Neutralizador de Mutantes _(extra)_ | 16 |  | outro | Neutralizador pareado aos poderes que anulou (Tempestade ~16) | baixa |
| Poder Mutante de Invenção _(extra)_ | 15 |  | informacao | extra; mesmo poder de invenção → 15 | media |
| Perna e Mão Protéticas de Alta Tecnologia (próprias) _(extra)_ | 5 |  | outro | próteses de alta tecnologia com função de pico humano | baixa |

### Garoto Chuva (Rain Boy) — x-men

Atributos: destreza 6, força 3, corpo 4, inteligência 6, vontade 5, mente 6, influência 5, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fisiologia Aquática | 7 |  | resistencia | corpo de água deixa golpes e balas passarem (7-8) → 7 | baixa |
| Provoca Chuva Localizada | 4 |  | area | chuva localizada em raio ~45 m → 4 | media |
| Fluidez que Absorve Golpes | 7 |  | resistencia | mesma fluidez → 7 | baixa |
| Controle da Umidade | 4 |  | area | controle de umidade ao redor ~45 m → 4 | media |
| Sensibilidade Emocional Profunda | — |  | — | traço de personalidade | alta |
| Doçura Melancólica | — |  | — | traço de personalidade | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Bondade Genuína | — |  | — | traço de personalidade | alta |

### Glob Herman (Robert Herman) — novatos

Atributos: destreza 4, força 6, corpo 8, inteligência 4, vontade 5, mente 4, influência 4, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Corpo Ceroso e Translúcido Extremamente Maleável | 5 |  | outro | deforma o corpo de cera para passar/esquivar (pico humano) → 5 | baixa |
| Resistência a Cortes e Perfurações | 7 |  | resistencia | lâminas e balas de baixo calibre (7–8) → 7 | media |
| Absorve Impactos como Massa de Cera | 7 |  | resistencia | absorve golpes de nível arromba-parede (7–8) → 7 | media |
| Regeneração Lenta de Ferimentos na Cera | 3 |  | resistencia | cura acelerada leve (3–6) → 3 | media |
| Flutua Levemente ao Se Tornar Mais Leve com o Calor | 1 |  | velocidade | flutuação lenta, poucos km/h → 1 | baixa |
| Amortece Quedas com a Própria Massa Cerosa | 5 |  | resistencia | quedas de alguns andares sem dano → 5 | media |
| Manipulação de Fogo Adquirida Após o Dia-M | 6 |  | energia | chamas que incendeiam/arruínam carro → 6 | media |
| Combustão Parcial do Próprio Corpo Ceroso | 5 |  | energia | corpo em chamas causa queimaduras graves (pico humano) → 5 | media |
| Rajadas de Fogo Ainda Instáveis | 5 |  | energia | instável mas usado: rajada de fogo ~ arromba porta → 5 | baixa |
| Chamas Cicatrizam Feridas Cerosas Superficiais | 3 |  | resistencia | cura superficial leve → 3 | media |
| Aquecimento Corporal Controlado | 3 |  | outro | aquece o corpo para amolecer/flutuar (humano) → 3 | baixa |
| Experiência de Rua da Antiga Omega Gang | 3 |  | informacao | malandragem de rua (humano) → 3 | media |
| Lealdade Reconquistada Após Pagar pelos Erros | — |  | — | relacionamento/arco | alta |
| Humildade Forjada na Prisão | — |  | — | personalidade | alta |
| Trabalho Duro para Reconstruir a Reputação | — |  | — | personalidade/arco | alta |

### Harpoon — vilao

Atributos: destreza 6, força 6, corpo 6, inteligência 4, vontade 5, mente 4, influência 4, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Arpões Energéticos | 18 |  | outro | ignoram invulnerabilidade, ferem Colossus em aço: pareado ao Corpo de aço do Colossus (18) → 18 | baixa |
| Poder de Penetrar Qualquer Defesa _(extra)_ | 15 |  | outro | extra; = Arpões Energéticos → 15 | media |
| Assassino Calculista _(extra)_ | — |  | — | personalidade/papel | alta |

### Husk (Paige Guthrie) — novatos

Atributos: destreza 7, força 6, corpo 7, inteligência 9, vontade 8, mente 8, influência 7, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Esfoliação em Qualquer Material | 9 |  | resistencia | formas de aço/diamante aguentam concreto/artilharia leve → 9 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Cada Forma tem Propriedades Específicas | 9 |  | outro | mesma esfoliação → 9 | media |
| Descamação _(extra)_ | 9 |  | resistencia | extra; mesma esfoliação → 9 | media |
| Família Guthrie _(extra)_ | — |  | — | relacionamento | alta |
| Ambição Excepcional _(extra)_ | — |  | — | traço | alta |

### Indra — x-men

Atributos: destreza 5, força 7, corpo 8, inteligência 7, vontade 9, mente 7, influência 6, aura 7, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Armadura Retrátil de Placas | 8 |  | resistencia | placas de armadura: balas/parede de tijolo (7–8) | media |
| Escudos Corporais Defensivos | 8 |  | resistencia | mesma armadura usada como escudo → 8 | media |
| Resistência a Impactos | 8 |  | resistencia | mesma armadura contra impactos → 8 | media |
| Ancoragem Inabalável | 7 |  | peso | se ancora contra empuxo de ~3–6 t → 7 | baixa |
| Fé Hindu-Jainista Devota | — |  | — | fé | alta |
| Pacifismo de Princípio | — |  | — | ideologia | alta |
| Educação Rígida da Família | — |  | — | histórico | alta |
| Senso de Dever | — |  | — | personalidade | alta |
| Cortesia e Diplomacia | — |  | — | traço social | media |
| Adolescente Mutante (14-16) | — |  | — | idade/condição | alta |

### Jubileu (Jubilation Lee) — x-men

Atributos: destreza 7, força 3, corpo 4, inteligência 6, vontade 7, mente 7, influência 7, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Cria explosões coloridas de energia pirotécnica | 6 |  | energia | plasmoides amassam carro/derrubam porta → 6 | media |
| Usa luz e som para cegar ou desorientar alvos | 4 |  | area | clarão/estouro desorienta em ~45 m → 4 | media |
| Controla a intensidade para ataque ou distração | 6 |  | energia | mesmos plasmoides com intensidade controlada → 6 | media |
| Mantém moral e trabalho em equipe em crises | — |  | — | traço social | alta |
| Treinamento prático de campo com os X-Men | — |  | — | experiência | alta |
| Improvisa sob pressão | — |  | — | traço | alta |
| Relação de confiança construída com Logan | — |  | — | relacionamento | alta |
| Potencial Ômega Latente _(extra)_ | — |  | — | latente | alta |
| Protegida de Wolverine _(extra)_ | — |  | — | relacionamento | alta |
| Vampira pós M-Day _(extra)_ | — |  | — | estado/histórico; poderes não especificados | media |
| Plasmóides Pirocinéticos _(extra)_ | 6 |  | energia | extra; mesmos plasmoides → 6 | media |
| Vampira (após M-Day) _(extra)_ | — |  | — | estado/histórico; poderes não especificados | media |

### Karma (Xi'an Coy Manh) — novatos

Atributos: destreza 5, força 3, corpo 4, inteligência 8, vontade 8, mente 10, influência 7, aura 8, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Possessão Mental | 12 |  | informacao | possui e controla mentes fortes, até super-humanos (faixa rua alta) → 12 | media |
| Pode Controlar Múltiplos Alvos Simultaneamente | 10 |  | informacao | vários hospedeiros ao mesmo tempo, com custo → 10 | media |
| Refugiada Vietnamita | — |  | — | histórico | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Responsabilidade pelos Irmãos Menores | — |  | — | relacionamento | alta |
| Possui Qualquer Ser Vivo por Contato Visual | 12 |  | informacao | mesma possessão, por linha de visão → 12 | media |
| Controla o Corpo Possuído com Precisão Motora Total | 10 |  | outro | usa perícia/corpo do hospedeiro com precisão total (faixa rua) → 10 | baixa |
| Salta de Hospedeiro em Hospedeiro em Cadeia | 6 |  | distancia | salta por linha de visão ~180 m → 6 | media |
| Retém Sentidos e Memórias do Hospedeiro Enquanto Possui | 8 |  | informacao | acessa memórias do hospedeiro (faixa rua) → 8 | media |
| Projeção Astral Deixa o Corpo Vazio Vulnerável | — |  | — | fraqueza disfarçada | alta |
| Divide a Consciência entre Vários Corpos Possuídos | 10 |  | informacao | mesma capacidade de Controlar Múltiplos Alvos → 10 | media |
| Imune a Contra-Possessão | 12 |  | outro | pareado a possessores/telepatas de rua alta (~12) → 12 | baixa |
| Sente Mentes Próximas para Escolher Alvos | 4 |  | distancia | percebe mentes em ~45 m (prédio) → 4 | media |
| Possui Não-Humanos e Criaturas Alienígenas | 12 |  | outro | mesma possessão estendida a não-humanos → 12 | media |
| Usa Corpos Possuídos como Escudos Humanos Involuntários | — |  | — | uso tático; capacidade em Possessão Mental | media |
| Controle Múltiplo _(extra)_ | 10 |  | informacao | extra; mesmo controle múltiplo → 10 | media |
| Responsabilidade pelos Irmãos _(extra)_ | — |  | — | relacionamento | alta |

### Kestrel (John Wraith) — vilao

Atributos: destreza 8, força 5, corpo 6, inteligência 6, vontade 7, mente 6, influência 6, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Teletransporte de Curta Distância | 6 |  | distancia | curto alcance tático ~180 m → 6 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento de Combate de Elite | 6 |  | outro | décadas na Arma X: combatente de pico humano → 6 | media |
| Código de Honra Próprio _(extra)_ | — |  | — | personalidade | alta |

### Kidogo — x-men

Atributos: destreza 7, força 10, corpo 10, inteligência 6, vontade 7, mente 6, influência 6, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Alteração de Tamanho (formiga a gigante) | 10 |  | outro | de formiga a gigante ~20 m; faixa rua → 10 | baixa |
| Força Proporcional ao Tamanho | 11 |  | peso | gigante ~20 m ergue ~50 t → 11 | baixa |
| Resistência Colossal quando Grande | 10 |  | resistencia | gigante aguenta artilharia leve → 10 | baixa |
| Furtividade quando Minúsculo | 10 |  | informacao | tamanho de formiga, quase indetectável → 10 | baixa |
| Humildade Genuína | — |  | — | traço de personalidade | alta |
| Humor Contagiante | — |  | — | traço de personalidade | alta |
| Faz Todos se Sentirem Bem | — |  | — | traço social | alta |
| Orgulho da Origem Suaíli | — |  | — | histórico | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |

### Kitty Pryde (Shadowcat / Sprite) — x-men

Atributos: destreza 8, força 3, corpo 4, inteligência 10, vontade 9, mente 9, influência 7, aura 8, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Atravessa matéria sólida sem ser atingida | 16 |  | outro | intangibilidade pareada ao que ignora: balas, Sentinelas, até campos de força (16–18) → 16 | media |
| Leva pessoas e objetos em fase consigo | 6 |  | peso | leva pessoas/objetos em fase, até um carro ~1,5 t → 6 (pico: a bala gigante do Breakworld) | media |
| Interrompe eletrônicos ao atravessá-los | 8 |  | outro | frita eletrônicos ao atravessá-los; pareado a tecnologia comum/de rua | media |
| Invade sistemas e entende tecnologia avançada | 10 |  | informacao | invade sistemas e domina tecnologia avançada; faixa rua | media |
| Pilota e repara equipamento dos X-Men | 8 |  | informacao | pilota/repara o Pássaro Negro; faixa rua | media |
| Usa planejamento técnico em campo | 7 |  | informacao | planejamento técnico; faixa rua | media |
| Coordena equipes sob pressão | 7 |  | informacao | coordena equipes sob pressão; faixa rua | media |
| Prioriza resgate de civis e colegas | — |  | — | prioridade/valores | alta |
| Mantém coragem diante de ameaças maiores | — |  | — | personalidade | alta |
| Mestra em Hacking _(extra)_ | 10 |  | informacao | extra; mesmo hacking de elite → 10 | media |
| Knight de Solano _(extra)_ | — |  | — | título/histórico | media |
| Liderança Natural _(extra)_ | 7 |  | informacao | extra; mesma liderança → 7 | media |
| Intangibilidade _(extra)_ | 16 |  | outro | extra; mesma intangibilidade → 16 | media |
| Disrupção de Circuitos Eletrônicos ao Atravessar _(extra)_ | 8 |  | outro | extra; mesma disrupção de eletrônicos → 8 | media |
| Hacking e Programação de Elite _(extra)_ | 10 |  | informacao | extra; mesmo hacking de elite → 10 | media |
| Ninjitsu _(extra)_ | 5 |  | outro | ninjutsu: pico humano | media |
| Lockheed _(extra)_ | — |  | — | companheiro (NPC próprio) | alta |

### Lady Mastermind (Regan Wyngarde) — vilao

Atributos: destreza 5, força 3, corpo 4, inteligência 7, vontade 7, mente 9, influência 9, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Ilusões Realistas Indistinguíveis da Realidade | 12 |  | informacao | ilusões indistinguíveis que cobrem área urbana; faixa rua alta → 12 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Filha de Jason Wyngarde | — |  | — | relacionamento | alta |
| Manipuladora Narcisista _(extra)_ | — |  | — | traço de personalidade | alta |

### Larry Trask — vilao

Atributos: destreza 4, força 3, corpo 4, inteligência 8, vontade 7, mente 7, influência 6, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Precognição | 8 |  | duracao | visões do futuro próximo de mutantes, distorcidas (faixa rua, não pela coluna Tempo) → 8 | baixa |
| Herdeiro do Programa Sentinel _(extra)_ | — |  | — | histórico/recurso | alta |

### Leech — morlock

Atributos: destreza 4, força 2, corpo 3, inteligência 5, vontade 6, mente 7, influência 5, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Campo de Supressão de Mutantes | 22 |  | outro | anula Wolverine, Ciclope e Xavier: pareado aos poderes Ômega que anula (~20) → 22 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Inocência Infantil | — |  | — | personalidade | alta |
| Presença Cativante Apesar da Aparência _(extra)_ | 5 |  | informacao | presença social marcante (humano alto) → 5 | baixa |

### Lifeguard (Heather Cameron) — x-men

Atributos: destreza 8, força 5, corpo 6, inteligência 6, vontade 7, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Adaptação Reativa a Ameaças | 10 |  | outro | gera asas/escamas/força conforme a ameaça; faixa rua → 10 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Poderes Mudam Conforme o Perigo | 10 |  | outro | mesma adaptação reativa → 10 | baixa |
| Irmã de Slipstream _(extra)_ | — |  | — | relacionamento | alta |

### Lockheed — x-men

Atributos: destreza 9, força 5, corpo 6, inteligência 8, vontade 8, mente 7, influência 5, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fogo Violeta Anti-Mágico | 7 |  | energia | fogo violeta: parede de tijolo/derrete metal leve (7–8); anula magia | media |
| Voo | 6 |  | velocidade | voo de dragão ~160 km/h | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Inteligência Elevadíssima Deliberadamente Escondida | 7 |  | informacao | intelecto humano oculto, agente da SWORD; faixa rua | media |
| Parceiro Leal de Kitty Pryde _(extra)_ | — |  | — | relacionamento | alta |
| Ex-Agente Duplo da SWORD _(extra)_ | — |  | — | histórico | alta |
| Parece Animal de Estimação _(extra)_ | 6 |  | informacao | passa por mascote: disfarce/subestimação; faixa humana alta | baixa |

### Lorelei (Lani Ubanu) — irmandade

Atributos: destreza 6, força 4, corpo 5, inteligência 5, vontade 6, mente 7, influência 10, aura 9, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Canto Hipnótico | 6 |  | area | canto hipnotiza homens ao alcance da voz ~180 m → 6 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Imunidade a Ataques Baseados em Som | 9 |  | outro | pareado a ataques sonoros típicos (grito de Banshee/Siryn ~9) | baixa |

### Madison Jeffries (Box) — neutro

Atributos: destreza 5, força 4, corpo 5, inteligência 8, vontade 7, mente 8, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Tecnopatia | 9 |  | peso | remodela/controla máquinas e metal ~13 t (veículos, armadura Box) → 9 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Constrói Robôs e Armaduras em Minutos | 10 |  | informacao | monta robô/armadura funcional em minutos (faixa rua) → 10 | media |
| Gênio em Engenharia _(extra)_ | 10 |  | informacao | extra; engenharia muito acima de especialista humano → 10 | media |

### Madrox (Jamie Madrox / O Homem Múltiplo) — geracaox

Atributos: destreza 6, força 4, corpo 5, inteligência 8, vontade 7, mente 8, influência 7, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorve impacto para criar duplicatas de si mesmo | 10 |  | outro | dezenas a centenas de cópias por impacto: faixa rua → 10 | baixa |
| Envia duplicatas para tarefas simultâneas e perigosas | 10 |  | outro | = criação de duplicatas → 10 | baixa |
| Reintegra memórias e habilidades aprendidas por uma duplicata | 10 |  | informacao | absorve perícias/memórias de muitas cópias → 10 | baixa |
| Conduz investigações de desaparecimentos e casos mutantes | 6 |  | informacao | detetive de elite: pico humano → 6 | media |
| Distribui duplicatas para vigilância, entrevistas e busca de pistas | 12 |  | distancia | cópias cobrem uma cidade inteira ~11 km → 12 | baixa |
| Monta conclusões cruzando experiências de várias cópias | 7 |  | informacao | dedução com dados de várias cópias, acima do pico humano → 7 | baixa |
| Conhece a responsabilidade de trazer duplicatas de volta em segurança | — |  | — | traço/ética | alta |
| Coopera com a X-Factor como multiplicador de equipe | — |  | — | afiliação/papel | alta |
| Adapta planos quando uma cópia descobre informação nova | 5 |  | informacao | adaptação tática de humano treinado → 5 | baixa |
| Criação de Duplicatas ao Impacto _(extra)_ | 10 |  | outro | extra; = criação de duplicatas → 10 | baixa |
| Absorção de Duplicatas com Memórias e Habilidades _(extra)_ | 10 |  | informacao | extra; = reintegração → 10 | baixa |
| Detetive Particular _(extra)_ | 6 |  | informacao | extra; = investigações → 6 | media |
| Cada Duplicata Desenvolve Personalidade Própria _(extra)_ | — |  | — | fraqueza disfarçada | alta |

### Magma (Amara Aquilla) — novatos

Atributos: destreza 6, força 6, corpo 6, inteligência 7, vontade 7, mente 7, influência 7, aura 9, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transforma o corpo em rocha incandescente | 9 |  | resistencia | forma de rocha aguenta concreto/balas → 9 | media |
| Controla lava e calor em escala local | 10 |  | energia | lava derrete blindado leve → 10 | media |
| Abre fissuras e molda terreno vulcânico | 8 | 17 | area | fissuras/tremor em raio ~760 m → 8; pico: ergueu vulcões | media |
| Conhece política e etiqueta de Nova Roma | — |  | — | histórico/conhecimento cultural | alta |
| Defende seu povo com firmeza | — |  | — | traço | alta |
| Aprende a navegar o mundo moderno com os X-Men | — |  | — | arco narrativo | alta |
| Forma de Rocha _(extra)_ | 9 |  | resistencia | extra; mesma forma de rocha → 9 | media |
| Nobre de Nova Roma _(extra)_ | — |  | — | histórico | alta |
| Controle de Magma e Lava _(extra)_ | 10 |  | energia | extra; mesmo controle de lava → 10 | media |
| Forma de Rocha Incandescente _(extra)_ | 9 |  | resistencia | extra; mesma forma de rocha → 9 | media |
| Terremotos Localizados _(extra)_ | 8 |  | area | extra; mesmos tremores ~760 m → 8 | media |
| Nobre Romana de Nova Roma _(extra)_ | — |  | — | histórico | alta |

### Magma (Alliance of Evil) (Magma (Aliança)) — vilao

Atributos: destreza 5, força 7, corpo 7, inteligência 4, vontade 5, mente 4, influência 4, aura 6, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Corpo de Magma Fundido | 8 |  | energia | corpo de magma derrete aço leve/parede (7–8) | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Controle de Lava | 8 |  | energia | jatos/poças de lava: derrete parede/veículo (7–8) | media |
| Morto por Apocalipse _(extra)_ | — |  | — | histórico/destino | alta |

### Marrow (Sarah) — morlock

Atributos: destreza 8, força 6, corpo 7, inteligência 5, vontade 8, mente 6, influência 4, aura 6, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Projeta, molda e arranca o próprio osso para criar lâminas e projéteis | 5 |  | energia | lâminas/projéteis de osso: ferimento grave em humano, pico humano → 5 | media |
| Cura-se rapidamente após produzir armas ósseas | 6 |  | resistencia | cura acelerada leve-moderada (3-6) → 6 | media |
| Estrutura óssea reforçada sustenta combate corpo a corpo brutal | 6 |  | resistencia | ossos reforçados aguentam combate no pico humano → 6 | media |
| Sobreviveu aos massacres e à política violenta dos túneis | — |  | — | histórico | alta |
| Aprende a proteger aliados sem abandonar sua ferocidade | — |  | — | arco/traço | alta |
| Experiência com X-Men lhe dá alternativas à violência | — |  | — | experiência | alta |
| Ossos como Armas _(extra)_ | 5 |  | energia | extra; mesmas armas ósseas → 5 | media |
| Crescimento e Extração de Ossos como Armas _(extra)_ | 5 |  | energia | extra; mesmas armas ósseas → 5 | media |
| Ossos como Projéteis _(extra)_ | 5 |  | energia | extra; mesmos projéteis ósseos → 5 | media |
| Fator de Cura Moderado _(extra)_ | 6 |  | resistencia | extra; mesmo fator de cura moderado → 6 | media |
| Dois Corações _(extra)_ | 4 |  | resistencia | segundo coração: sobrevive a ferimento cardíaco → 4 | baixa |

### Masque — morlock

Atributos: destreza 5, força 3, corpo 4, inteligência 7, vontade 8, mente 7, influência 6, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Remodela pele, carne e traços físicos de outras pessoas por contato | 10 |  | outro | reescultura corpo/rosto de qualquer um ao toque; pareado a Corpo de rua (sem resistência física) → 10 | media |
| Pode desfigurar, restaurar ou alterar identidades de modo preciso | 10 |  | outro | mesmo reshaping → 10 | media |
| Usa a transformação para intimidação e controle social | 6 |  | informacao | intimidação/controle dos Morlocks (pico humano) → 6 | baixa |
| Compreende a sobrevivência clandestina dos túneis | 4 |  | informacao | conhecimento dos túneis (humano experiente) → 4 | media |
| Cria disfarces e mudanças corporais úteis a aliados | 10 |  | informacao | disfarce físico real, indetectável por inspeção comum → 10 | media |
| Persuasão teatral e presença perturbadora desestabilizam rivais | 5 |  | informacao | presença/persuasão humana alta → 5 | media |
| Reshaping Biológico ao Toque _(extra)_ | 10 |  | outro | extra; mesmo reshaping → 10 | media |
| Crueldade Sádica _(extra)_ | — |  | — | personalidade | alta |
| Líder Ocasional dos Morlocks _(extra)_ | — |  | — | papel social | alta |

### Match (Ben Hammil) — novatos

Atributos: destreza 7, força 5, corpo 6, inteligência 5, vontade 6, mente 5, influência 6, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Combustão Corporal Sem Autodano | 7 |  | energia | corpo em chamas queima/derrete parede de tijolo e veículo leve (7–8) → 7 | media |
| Voo por Propulsão de Fogo | 6 |  | velocidade | voo ~160 km/h → 6 | media |
| Rajadas de Fogo Concentradas | 8 |  | energia | rajada destrói parede de tijolo / incendeia caminhão (7–8) → 8 | media |
| Resistência Total a Calor e Fogo | 10 |  | outro | "total": pareado a ataques de fogo de rua (Pyro ~10) → 10 | baixa |
| Controle de Intensidade da Chama | 5 |  | outro | controle fino da chama (utilidade) → 5 | baixa |
| Escudo de Chamas Defensivo | 6 |  | resistencia | escudo detém golpes/projéteis de pico humano → 6 | baixa |
| Manobras Aéreas Agressivas em Combate | 5 |  | outro | manobra aérea ágil (humano alto) → 5 | baixa |
| Aterrissagens Explosivas Controladas | 6 |  | energia | impacto flamejante amassa carro (5–6) → 6 | baixa |
| Trilhas de Fumaça para Cobertura | 3 |  | area | cortina de fumaça raio ~25 m → 3 | baixa |
| Acender Objetos à Distância Curta | 2 |  | distancia | ignição a ~12 m → 2 | media |
| Explosões de Curto Alcance ao Pousar | 6 |  | energia | = aterrissagem explosiva → 6 | baixa |
| Confiança Inabalável em Combate | — |  | — | personalidade | alta |
| Espírito Competitivo entre os Paragons | — |  | — | personalidade | alta |
| Liderança pelo Exemplo | — |  | — | estilo/personalidade | media |
| Energia Positiva que Motiva a Equipe | — |  | — | personalidade | alta |

### Mercenário Weapon X (Operativo do Programa) — vilao

Atributos: destreza 7, força 6, corpo 7, inteligência 6, vontade 7, mente 5, influência 4, aura 4, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Armamento Anti-Mutante Especializado | 16 |  | outro | supressores de cura pareados ao fator de cura de Wolverine/X-23 de rotina (16) → 16 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento de Combate de Elite | 5 |  | outro | combate de elite perto do pico humano → 5 | media |
| Inibidores de Telepatia Portáteis _(extra)_ | 12 |  | outro | pareado a telepatas típicos de rua (~12) → 12 | baixa |
| Modificações Cibernéticas Menores _(extra)_ | 5 |  | outro | implantes leves, pico humano → 5 | media |

### Mercury (Cessily Kincaid) — novatos

Atributos: destreza 7, força 4, corpo 6, inteligência 6, vontade 6, mente 6, influência 5, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Metamorfose de Metal Líquido | 7 |  | outro | metamorfose de metal líquido; faixa rua baixa | media |
| Membros Elásticos e Extensíveis | 3 |  | distancia | membros esticam ~24 m | media |
| Regeneração Física Instantânea | 10 |  | resistencia | fecha cortes/tiros instantaneamente (abaixo de 'bala em minutos' com mais ferimentos) → 10 | media |
| Resistência a Impacto e Perfuração | 8 |  | resistencia | aguenta balas e impactos (7–8) | media |
| Fusão e Reforma após Fragmentação | 12 |  | resistencia | se reconstitui após ser fragmentada → 12 | media |
| Formas de Lâmina e Escudo Improvisadas | 5 |  | energia | lâminas/escudos improvisados: pico humano | media |
| Alongamento para Alcance Estendido | 3 |  | distancia | mesmo alongamento ~24 m | media |
| Achatamento e Passagem por Frestas | 6 |  | outro | escoa por frestas; utilidade de infiltração faixa humana alta | media |
| Reflexos Metálicos Aprimorados | 5 |  | outro | reflexos aprimorados: pico humano | media |
| Superfície Cortante sob Comando | 5 |  | energia | superfície cortante: pico humano | media |
| Sociável apesar da Aparência | — |  | — | personalidade | alta |
| Lealdade Feroz aos Hellions | — |  | — | relacionamento | alta |
| Senso de Humor Autodepreciativo | — |  | — | personalidade | alta |
| Empatia por Outros Considerados Estranhos | — |  | — | personalidade | alta |
| Coragem para se Expor em Público | — |  | — | personalidade | alta |

### Mesmero — vilao

Atributos: destreza 5, força 3, corpo 4, inteligência 7, vontade 7, mente 9, influência 10, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controla Mentes com Olhar/Voz | 12 |  | informacao | hipnose por olhar/voz domina vontades humanas e mutantes de rua → 12 | media |
| Comandos Pós-Hipnóticos Permanentes | 10 |  | duracao | comandos pós-hipnóticos persistentes; faixa rua → 10 | baixa |
| Afeta Multidões Simultaneamente | 8 |  | area | hipnose em massa em raio ~760 m (bairro/estádio) → 8 | media |
| Engana Telepatas (Ilusão de Controle) | 14 |  | outro | pareado a telepatas de rua alta (~14) | baixa |
| Controla Múltiplos Alvos Sem Perder Foco | 10 |  | informacao | controla vários alvos sem perder foco → 10 | media |
| Apaga Memórias das Vítimas Após o Controle | 10 |  | informacao | apaga memórias pós-controle → 10 | media |
| Reprogramação Total de Personalidade em Casos Extremos | 12 |  | informacao | reprograma personalidade (casos extremos) → 12 | media |
| Resistente a Scanners Psíquicos Convencionais | 12 |  | outro | pareado a scanners psíquicos convencionais (~12) | baixa |
| Controla Mutantes de Vontade Moderada | 10 |  | outro | pareado à Vontade de mutantes de rua (~10) | media |
| Mantém Controle à Distância Após Contato Visual Inicial | 12 |  | distancia | mantém controle à distância de cidade (~11 km) → 12 | baixa |
| Opera nas Sombras / Agente Secreto | — |  | — | papel/modus operandi | alta |
| Rede de Agentes Hipnotizados Globais | 12 |  | informacao | rede de agentes hipnotizados (alcance social global, não do poder) → 12 | baixa |
| Chantageia Autoridades com Segredos Extraídos por Hipnose | 10 |  | informacao | chantagem com segredos extraídos → 10 | baixa |
| Hipnose em Massa _(extra)_ | 8 |  | area | extra; mesma hipnose em massa ~760 m → 8 | media |
| Ilusões Auxiliares _(extra)_ | 8 |  | informacao | ilusões auxiliares que reforçam a hipnose → 8 | media |
| Manipulação de Multidões _(extra)_ | 8 |  | area | extra; mesma manipulação de multidões → 8 | media |

### Mira (Pinpoint) (Pinpoint) — x-men

Atributos: destreza 8, força 3, corpo 4, inteligência 9, vontade 7, mente 8, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Localiza Assinaturas Energéticas | 10 |  | distancia | detecta assinaturas a ~3 km → 10 | baixa |
| Identifica Pontos Fracos | 8 |  | informacao | vê vulnerabilidades estruturais/corporais (faixa rua) → 8 | media |
| Nunca se Perde (literalmente) | 8 |  | informacao | orientação infalível (faixa rua) → 8 | baixa |
| Percepção Tática Aguçada | 6 |  | informacao | percepção tática de pico humano → 6 | media |
| Raciocínio Analítico e Frio | 5 |  | informacao | análise fria de humano excepcional → 5 | baixa |
| Memória Espacial Perfeita | 7 |  | informacao | memória espacial perfeita, acima do humano → 7 | media |
| Estrategista de Reconhecimento | 6 |  | informacao | reconhecimento de pico humano → 6 | media |
| Indispensável em Missões | — |  | — | papel/reputação | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |

### Mirage (Dani Moonstar / Psyche) — novatos

Atributos: destreza 7, força 4, corpo 5, inteligência 8, vontade 9, mente 9, influência 7, aura 9, espírito 10

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Projeta o maior medo ou desejo de um alvo como ilusão convincente | 12 |  | informacao | ilusões psíquicas tiradas da mente do alvo, afetam super-humanos (rua alta) → 12 | media |
| Usa visões para interromper ataques ou abrir diálogo | 12 |  | informacao | = projeção de medos/desejos → 12 | media |
| Percebe a carga emocional que guia uma ilusão | 8 |  | informacao | leitura empática de emoções (rua) → 8 | baixa |
| Comunica-se empaticamente com animais próximos | 4 |  | distancia | elo com animais próximos ~45 m → 4 | baixa |
| Encontra rastros e perigos com auxílio de animais | 8 |  | distancia | animais batedores ampliam percepção a ~760 m → 8 | baixa |
| Acalma criaturas assustadas ou hostis | 6 |  | informacao | acalma animais selvagens (pico humano+) → 6 | baixa |
| Reconhece presságios de morte e conduz espíritos quando seu vínculo está ativo | — |  | — | poder de Valquíria condicional/indisponível (latente) | media |
| Combatente treinada com arco, flecha e tática de campo | 6 |  | distancia | arqueira de elite, tiro útil a ~180 m → 6 | media |
| Mentora firme dos Novos Mutantes | — |  | — | papel | alta |
| Arco e Flecha _(extra)_ | 6 |  | distancia | extra; = arqueira de elite → 6 | media |
| Ex-Valquíria _(extra)_ | — |  | — | histórico; poderes não mais disponíveis | alta |
| Manifestação de Medos e Desejos Profundos _(extra)_ | 12 |  | informacao | extra; = projeção de medos/desejos → 12 | media |
| Ligação Empática com Animais _(extra)_ | 6 |  | informacao | extra; elo empático com animais → 6 | baixa |
| Cheyenne _(extra)_ | — |  | — | identidade cultural | alta |

### Moça de Borracha (Rubber Maid) — x-men

Atributos: destreza 8, força 4, corpo 7, inteligência 6, vontade 7, mente 6, influência 7, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Elasticidade e Maleabilidade Total | 8 |  | outro | elasticidade total, faixa rua → 8 | baixa |
| Amortece Impactos | 8 |  | resistencia | corpo elástico absorve balas/impacto de caminhão → 8 | media |
| Estica-se a Grandes Distâncias | 5 |  | distancia | estica ~90 m → 5 | media |
| Molda-se a Qualquer Forma | 8 |  | outro | mesma elasticidade → 8 | baixa |
| Humor Físico e Palhaçadas | — |  | — | traço de personalidade | alta |
| Otimismo Inabalável | — |  | — | traço de personalidade | alta |
| Usa o Riso como Armadura | — |  | — | traço de personalidade | alta |
| Adapta-se a Qualquer Situação | — |  | — | traço | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |

### Náiade (Naiad) — x-men

Atributos: destreza 7, força 4, corpo 5, inteligência 7, vontade 6, mente 7, influência 6, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Hidrocinese em Estado Líquido | 6 |  | area | hidrocinese num raio de ~180 m → 6 | media |
| Manipula Grandes Volumes de Água | 11 |  | peso | move grandes volumes de água ~50 t (onda/piscina) → 11 | baixa |
| Purifica ou Contamina Água | 5 |  | outro | purifica/contamina água; faixa humana alta | baixa |
| Chicotes e Escudos de Água | 6 |  | energia | chicotes de água: impacto de pico humano; escudo similar | media |
| Personalidade Fluida e Serena | — |  | — | personalidade | alta |
| Adapta-se como a Corrente | — |  | — | personalidade | alta |
| Calma que Acalma os Outros | — |  | — | traço social | media |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |

### Noturno (Kurt Wagner) — x-men

Atributos: destreza 12, força 5, corpo 5, inteligência 7, vontade 9, mente 8, influência 7, aura 8, espírito 10

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Teletransporta-se em saltos curtos com fumaça e enxofre | 9 | 11 | distancia | saltos de rotina ~1,5 km com linha de visão → 9 (pico ~5 km = 11) | media |
| Transporta aliados ao custo de maior risco e desorientação | 4 |  | peso | leva 2-3 pessoas ~340 kg → 4 | media |
| Evita ataques reposicionando-se instantaneamente | 10 |  | velocidade | some antes do tiro: projétil ~2.400 km/h → 10 | media |
| Acrobacia aérea e equilíbrio sobre-humanos | 8 |  | outro | acima do pico humano (faixa rua) → 8 | media |
| Escala superfícies e luta em três dimensões | 8 |  | outro | escalada/luta 3D no mesmo nível da acrobacia → 8 | media |
| Camuflagem natural em sombras | 8 |  | informacao | quase invisível no escuro → 8 | media |
| Serve como conselheiro espiritual e mediador | — |  | — | papel social | alta |
| Acrobata Consumado _(extra)_ | 8 |  | outro | extra; mesma acrobacia → 8 | media |
| Fé Católica Profunda _(extra)_ | — |  | — | traço/fé | alta |
| Humor como Defesa _(extra)_ | — |  | — | traço de personalidade | alta |
| Teletransporte via Dimensão Sombria (bamf) _(extra)_ | 9 |  | distancia | extra; mesmo teleporte → 9 | media |
| Agilidade Acrobática Extrema _(extra)_ | 8 |  | outro | extra; mesma acrobacia → 8 | media |
| Cauda Preênsil _(extra)_ | — |  | — | traço anatômico | media |
| Visão no Escuro _(extra)_ | 6 |  | distancia | enxerga no breu a ~180 m → 6 | baixa |
| Cada Teleporte deixa rastro de enxofre _(extra)_ | — |  | — | fraqueza disfarçada | alta |

### Omerta (Paulie Provenzano) — x-men

Atributos: destreza 5, força 7, corpo 8, inteligência 4, vontade 7, mente 5, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Pele de Metal Orgânico | 12 |  | resistencia | pele metálica aguenta tiros pesados/explosões (tanque/bunker 11–12) → 12 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Força Aumentada na Forma Metálica | 7 |  | peso | ergue ~2–3 t → 7 | media |
| Ex-Família Mafiosa _(extra)_ | — |  | — | histórico | alta |

### Onyxx — x-men

Atributos: destreza 5, força 10, corpo 11, inteligência 5, vontade 7, mente 5, influência 6, aura 6, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Corpo de Pedra Sólida | 9 |  | resistencia | pele de granito aguenta balas e artilharia leve (9–10) → 9 | media |
| Superforça e Resistência | 10 |  | peso | ergue ~25 t → 10 | media |
| Muralha Viva em Combate | 9 |  | resistencia | = Corpo de Pedra → 9 | media |
| Investida Devastadora | 9 |  | energia | investida parte concreto armado (9–10) → 9 | media |
| Jeito Rapper e Fanfarrão | — |  | — | personalidade | alta |
| Protetor Secreto dos Mais Fracos | — |  | — | personalidade | alta |
| Presença Divertida | — |  | — | personalidade | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Condicionamento Bruto | 6 |  | resistencia | vigor físico de pico humano → 6 | baixa |

### Persuasion (Kara Killgrave) — vilao

Atributos: destreza 4, força 3, corpo 4, inteligência 6, vontade 7, mente 8, influência 11, aura 10, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle Mental por Voz | 14 |  | informacao | comanda quem ouve, multidões, quase absoluto (só telepatas resistem); faixa rua alta → 14 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Filha do Purple Man | — |  | — | relacionamento | alta |
| Tenta se Redimir _(extra)_ | — |  | — | arco narrativo | alta |

### Pixie (Megan Gwynn) — novatos

Atributos: destreza 7, força 3, corpo 4, inteligência 6, vontade 6, mente 6, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Pó Alucinógeno que Induz Ilusões de Medo | 8 |  | informacao | pó induz alucinações de medo paralisantes; faixa rua | media |
| Nuvem de Pó que Confunde os Sentidos | 7 |  | informacao | nuvem confunde os sentidos de um grupo; faixa rua baixa | media |
| Asas de Inseto para Voo Ágil | 5 |  | velocidade | voo ágil ~80 km/h | media |
| Controle Fino sobre a Concentração do Pó | 6 |  | outro | dosa a concentração do pó; faixa humana alta | baixa |
| Ilusões Ajustadas ao Maior Medo do Alvo | 8 |  | informacao | mesmas ilusões, ajustadas ao medo do alvo → 8 | media |
| Rastro de Brilho que Revela Trajeto | — |  | — | rastro que a denuncia; fraqueza disfarçada | media |
| Manobras Aéreas Rápidas e Erráticas | 5 |  | outro | manobras aéreas erráticas: esquiva de ave veloz | media |
| Esquiva em Alta Velocidade | 6 |  | outro | esquiva em alta velocidade; faixa humana alta | media |
| Pousos Precisos em Espaços Apertados | 4 |  | outro | pousos precisos; faixa humana | media |
| Perseguição Aérea Persistente | 5 |  | velocidade | perseguição aérea ~80 km/h | media |
| Sentidos Aguçados para Detectar Movimento | 5 |  | distancia | detecta movimento a ~90 m | media |
| Energia Inesgotável e Entusiasmo | — |  | — | personalidade | alta |
| Curiosidade que a Leva a Explorar Riscos | — |  | — | personalidade | alta |
| Lealdade Inabalável aos Amigos | — |  | — | personalidade | alta |
| Bom Humor Mesmo sob Pressão | — |  | — | personalidade | alta |

### Preview — novatos

Atributos: destreza 6, força 4, corpo 5, inteligência 6, vontade 5, mente 8, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Flashes Precognitivos ao Toque | 7 |  | informacao | flashes precognitivos ao toque; acima do pico humano (faixa rua) → 7 | media |
| Percepção de Perigo Iminente por Proximidade | 4 |  | distancia | sente perigo próximo em escala de prédio (~45 m) → 4 | media |
| Visões Fragmentadas de Segundos no Futuro | 6 |  | duracao | visões de segundos à frente; faixa humana alta → 6 | baixa |
| Alerta Instintivo Antes de Ataques | 7 |  | outro | alerta antes do ataque (sentido de perigo) → 7 | media |
| Compartilha Visões por Contato com Aliados | 6 |  | informacao | compartilha visões por contato → 6 | baixa |
| Reconhece o Instante Exato de Perigo Máximo | 7 |  | informacao | mesmo sentido de perigo (instante crítico) → 7 | media |
| Visões se Intensificam em Ambientes de Alto Risco | — |  | — | modificador situacional, não feito | media |
| Processa Múltiplos Futuros Possíveis Rapidamente | 7 |  | informacao | processa futuros possíveis; mesma precognição → 7 | media |
| Reconhece Padrões de Ameaça Repetidos | 5 |  | informacao | reconhece padrões de ameaça (pico humano) → 5 | baixa |
| Instinto Aguçado para Ler Intenções | 5 |  | informacao | lê intenções no pico humano → 5 | baixa |
| Filtra Ruído Mental de Ambientes Cheios | — |  | — | controle do próprio poder, não feito | media |
| Observadora e Cautelosa por Natureza | — |  | — | traço de personalidade | alta |
| Empática com o Sofrimento Alheio | — |  | — | traço de personalidade | alta |
| Busca Proteger os Colegas Avisando Riscos | — |  | — | traço de personalidade | alta |
| Vontade de Ajudar Apesar do Medo | — |  | — | traço de personalidade | alta |

### Prism — vilao

Atributos: destreza 4, força 5, corpo 7, inteligência 3, vontade 4, mente 3, influência 3, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Corpo de Cristal | 10 |  | outro | reflete lasers/rajadas de energia; pareado a rajadas de rua (~10) → 10 | media |

### Prodigy (David Alleyne) — novatos

Atributos: destreza 7, força 4, corpo 5, inteligência 12, vontade 9, mente 11, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Assimila temporariamente conhecimento e técnica de pessoas próximas | 9 |  | informacao | copia perícias de qualquer especialista próximo: perícia de elite multiplicada (rua) → 9 | media |
| Replica treinamento de luta, línguas e especialidades com rapidez | 8 |  | informacao | domina perícias copiadas acima do pico humano → 8 | media |
| Combina competências de colegas para resolver problemas de campo | 8 |  | informacao | soma perícias de vários colegas → 8 | baixa |
| Estuda padrões, pessoas e missões com disciplina metódica | 6 |  | informacao | análise metódica: pico humano → 6 | baixa |
| Experiência de liderança entre os Jovens X-Men | 5 |  | informacao | liderança estudantil treinada → 5 | baixa |
| Transforma insegurança intelectual em preparação | — |  | — | personalidade | alta |
| Memória Absoluta _(extra)_ | 9 |  | informacao | memória eidética perfeita, acima do pico humano → 9 | media |
| Gênio _(extra)_ | 9 |  | informacao | intelecto no teto humano (Inteligência alta) → 9 | media |
| Conhecimento de Centenas de Especialistas Retido Permanentemente _(extra)_ | 10 |  | informacao | centenas de especialidades retidas: faixa rua → 10 | media |
| Estrategista de Elite _(extra)_ | 8 |  | informacao | estrategista acima do pico humano → 8 | media |
| Artes Marciais e Combate de Vários Especialistas _(extra)_ | 6 |  | outro | luta de vários mestres: pico humano → 6 | media |
| Parceiro de Surge _(extra)_ | — |  | — | relacionamento | alta |

### Pyro (St. John Allerdyce) — irmandade

Atributos: destreza 7, força 4, corpo 5, inteligência 7, vontade 7, mente 7, influência 6, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle de Fogo Existente | 9 |  | energia | molda incêndio de prédio contra alvos, arruína concreto → 9 | media |
| Criação de Criaturas de Fogo Complexas | 9 |  | outro | mesmo controle de fogo → 9 | media |
| Traje com Lança-Chamas Integrado | 5 |  | energia | lança-chamas ~30 m, incendeia/amassa porta → 5 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Escritor Frustrado | — |  | — | traço/histórico | alta |
| Manipula Fogo _(extra)_ | 9 |  | energia | extra; mesmo controle de fogo → 9 | media |
| Incendiário _(extra)_ | — |  | — | traço/rótulo | alta |

### Radian (Christian Cord) — novatos

Atributos: destreza 6, força 4, corpo 5, inteligência 6, vontade 5, mente 5, influência 5, aura 6, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Projeção de Feixes de Luz Concentrada | 7 |  | energia | feixes de luz: parede de tijolo (7–8) → 7 | media |
| Absorção de Luz Ambiente para Recarregar o Poder | 4 |  | outro | recarrega com luz ambiente; utilidade faixa humana | baixa |
| Criação de Clarões Cegantes | 4 |  | area | clarão cega num raio de ~45 m | media |
| Camuflagem por Manipulação de Reflexos Luminosos | 6 |  | informacao | camuflagem por reflexo de luz; faixa humana alta | media |
| Voo por Propulsão de Luz | 6 |  | velocidade | voo por propulsão de luz ~160 km/h | media |
| Refração que Desvia Ataques à Distância | 7 |  | resistencia | refração desvia ataques à distância (balas/rajadas de rua baixa) → 7 | baixa |
| Constructos Sólidos de Luz de Curta Duração | 5 |  | resistencia | constructos de luz breves: barreira de pico humano | baixa |
| Sinalização a Longa Distância com Luz | 10 |  | distancia | sinal luminoso visível a ~3 km → 10 | media |
| Precisão em Feixes de Combate | 6 |  | outro | precisão de feixe; faixa humana alta | media |
| Feixe Cortante de Alta Precisão | 8 |  | energia | feixe cortante concentrado: corta metal/parede (7–8) → 8 | media |
| Ilumina Áreas Escuras Instantaneamente | 4 |  | area | ilumina raio de ~45 m | media |
| Disciplina Adquirida Durante o Tempo na Prisão | — |  | — | histórico/traço | alta |
| Determinação para Provar que Mudou | — |  | — | motivação | alta |
| Cautela Estratégica Aprendida da Pior Forma | — |  | — | personalidade | alta |
| Trabalha em Dobro para Recuperar a Confiança dos Outros | — |  | — | motivação | alta |

### Red Lotus — x-men

Atributos: destreza 10, força 5, corpo 6, inteligência 6, vontade 7, mente 6, influência 6, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Artes Marciais de Elite | 6 |  | outro | artes marciais no pico humano → 6 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Humano no Pico da Perfeição | 6 |  | outro | pico humano → 6 | media |
| Ex-Agente Chinês _(extra)_ | — |  | — | histórico | alta |

### Rede (Network) (Network) — x-men

Atributos: destreza 5, força 3, corpo 4, inteligência 8, vontade 7, mente 9, influência 8, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transmissão de Pensamentos em Massa | 6 |  | distancia | transmite a grandes grupos em escala de campus ~180 m → 6 | media |
| Leitura Telepática de Superfície | 3 |  | distancia | leitura superficial em ~25 m (telepata iniciante) → 3 | media |
| Contato Mental à Distância | 6 |  | distancia | contato mental em escala de campus ~180 m → 6 | media |
| Trata Telepatia como Rede Social | — |  | — | estilo/personalidade | alta |
| Antenada em Fofocas e Notícias | — |  | — | personalidade | alta |
| Popular entre os Alunos | — |  | — | status social | alta |
| Coordena a Equipe em Combate | 5 |  | informacao | elo telepático de coordenação (pico humano) → 5 | media |
| Empatia Crescente | 3 |  | informacao | empatia em desenvolvimento (humano) → 3 | baixa |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |

### Redneck (Vincent Stewart) — novatos

Atributos: destreza 5, força 9, corpo 8, inteligência 3, vontade 5, mente 3, influência 3, aura 5, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força Sobre-humana Capaz de Arrancar Concreto | 7 |  | peso | arranca blocos de concreto/ergue ~3 t → 7 | media |
| Resistência Física Elevada a Impactos | 7 |  | resistencia | aguenta balas de baixo calibre / impactos de caminhão (7–8) → 7 | media |
| Golpes que Derrubam Estruturas | 8 |  | energia | derruba parede de tijolo / pequena estrutura (7–8) → 8 | baixa |
| Salto de Longa Distância com as Pernas Reforçadas | 4 |  | distancia | salto de ~45 m → 4 | baixa |
| Aguenta Golpes que Derrubariam um Adulto Comum | 5 |  | resistencia | aguenta acima do humano comum (pico humano) → 5 | media |
| Levanta Objetos Vários Vezes Maiores que o Próprio Corpo | 7 |  | peso | = força sobre-humana ~3 t → 7 | media |
| Ancoragem Física para Resistir a Empurrões | 7 |  | outro | resiste a empurrões até sua força (~3 t) → 7 | baixa |
| Presença Intimidadora pelo Tamanho | 4 |  | informacao | intimidação física (humano alto) → 4 | baixa |
| Braço de Ferro em Disputas de Força | 7 |  | peso | = força sobre-humana → 7 | media |
| Estabilidade Total ao Segurar Posição em Combate | 7 |  | outro | = ancoragem → 7 | baixa |
| Amortece Quedas de Grande Altura | 6 |  | resistencia | cai de ~30 m sem dano (pico humano+) → 6 | baixa |
| Lealdade Cega a Quem Lhe Dá Ordens Claras | — |  | — | personalidade/fraqueza | alta |
| Simplicidade que o Torna Fácil de Manipular por Bons ou Maus | — |  | — | fraqueza | alta |
| Coragem Bruta sem Hesitação | — |  | — | personalidade | alta |
| Protetor Fiel de Quem Considera Aliado | — |  | — | relacionamento | alta |

### Reverend William Stryker (William Stryker) — vilao

Atributos: destreza 5, força 4, corpo 5, inteligência 7, vontade 9, mente 7, influência 9, aura 6, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Orador Carismático | 12 |  | informacao | cruzada televisionada converte multidões (escala cidade) → 12 | media |
| Líder dos Purificadores _(extra)_ | — |  | — | papel/cargo | alta |
| Filho Mutante que Matou Esposa _(extra)_ | — |  | — | histórico | alta |

### Rictor (Julio Richter) — geracaox

Atributos: destreza 7, força 5, corpo 6, inteligência 6, vontade 7, mente 7, influência 7, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Gera ondas sísmicas e vibrações pelo solo | 12 | 18 | energia | tremor localizado racha fundações/bunker (11–12) → 12; pico: terremoto que derruba prédio | media |
| Localiza movimentos e cavidades pela leitura de tremores | 6 |  | distancia | sente movimentos/cavidades pelo solo a ~180 m | media |
| Direciona abalos para abrir passagem ou derrubar cobertura | 10 |  | energia | abalo dirigido abre parede de concreto/derruba cobertura (9–10) | media |
| Experiência em infiltração e missões de guerrilha | 7 |  | informacao | infiltração/guerrilha da X-Force; faixa rua baixa | media |
| Age bem em equipes pequenas e sob pressão | — |  | — | traço social | media |
| Mantém disciplina de campo mesmo em terreno hostil | — |  | — | disciplina/personalidade | media |
| Confiança e coordenação construídas em combate ao lado de Shatterstar | — |  | — | relacionamento | alta |
| Motivação para proteger a família que escolheu | — |  | — | motivação | alta |
| Capacidade de se abrir emocionalmente após anos de isolamento | — |  | — | personalidade | alta |
| Controle Sísmico _(extra)_ | 12 | 18 | energia | extra; mesmo controle sísmico → 12 | media |
| Vibrações Sísmicas Precisas _(extra)_ | 10 |  | energia | extra; mesmas vibrações dirigidas → 10 | media |
| Parceiro de Shatterstar _(extra)_ | — |  | — | relacionamento | alta |

### Riptide — vilao

Atributos: destreza 8, força 4, corpo 5, inteligência 4, vontade 4, mente 4, influência 3, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Rotação Supersônica | 9 |  | velocidade | rotação supersônica ~Mach 1 (1.200 km/h) → 9 | media |
| Velocidade de Rotação Debilita Oponentes em Área _(extra)_ | 4 |  | area | redemoinho/projéteis cobrem raio ~45 m → 4 | media |
| Assassino Implacável _(extra)_ | — |  | — | traço de personalidade | alta |

### Rockslide (Santo Vaccaro) — novatos

Atributos: destreza 5, força 13, corpo 15, inteligência 5, vontade 7, mente 6, influência 6, aura 6, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Corpo rochoso suporta golpes e pode se recompor com pedra disponível | 13 |  | resistencia | invulnerável a dano convencional e se reconstrói: antitanque (13–15) → 13 | media |
| Desmonta membros para escapar, atacar de ângulos incomuns ou atravessar obstáculos | 5 |  | distancia | controla partes soltas a ~90 m → 5 | baixa |
| Força e massa tornam-no uma linha de frente eficaz | 11 |  | peso | ergue dezenas de toneladas ~50 t → 11 | media |
| Lealdade imediata e coragem para defender os amigos | — |  | — | personalidade | alta |
| Humor extravagante baixa a tensão da equipe | — |  | — | personalidade | alta |
| Aprende a pertencer apesar de parecer um monstro | — |  | — | arco pessoal | alta |
| Força Bruta _(extra)_ | 11 |  | peso | extra; mesma força ~50 t → 11 | media |
| Humor _(extra)_ | — |  | — | personalidade | alta |
| Aluno do Instituto _(extra)_ | — |  | — | afiliação | alta |
| Corpo de Rocha Silicosa _(extra)_ | 13 |  | resistencia | extra; mesmo corpo de rocha → 13 | media |
| Força Colossal _(extra)_ | 11 |  | peso | extra; mesma força ~50 t → 11 | media |
| Desmontagem e Remontagem Telecinética _(extra)_ | 5 |  | distancia | extra; mesma desmontagem, ~90 m → 5 | baixa |
| Cabeça como Projétil _(extra)_ | 8 |  | energia | arremessa a própria cabeça de rocha: derruba parede/vira caminhão (7–8) → 8 | baixa |
| Sem Sistema Nervoso Convencional _(extra)_ | 8 |  | outro | imune a dor/golpes nervosos; pareado a ataques de rua → 8 | baixa |
| Personalidade Descontraída que Subestima o Risco _(extra)_ | — |  | — | personalidade/fraqueza | alta |

### Roulette (Jennifer Stavros) — clube-do-inferno

Atributos: destreza 6, força 3, corpo 4, inteligência 6, vontade 6, mente 7, influência 7, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Discos de Sorte/Azar | 9 |  | outro | efeitos de sorte/azar até paralisia ao toque: pareado ao Corpo/Vontade de alvos de rua → 9 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Efeitos Imprevisíveis | — |  | — | fraqueza (aleatoriedade) | alta |
| Jogadora Compulsiva _(extra)_ | — |  | — | personalidade/vício | alta |

### Sage (Tessa) — x-men

Atributos: destreza 8, força 5, corpo 6, inteligência 14, vontade 10, mente 12, influência 7, aura 8, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Mente Computador Humano | 13 |  | informacao | processamento de computador, cognição Ômega; faixa rua alta → 13 | media |
| Memória Perfeita e Absoluta | 10 |  | informacao | memória eidética total, acima do humano → 10 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Pode Catalisar Mutações Latentes em Outros | 12 |  | outro | pareado a poderes latentes de rua que desperta → 12 | baixa |
| Calcula Probabilidades de Batalha em Tempo Real | 13 |  | informacao | mesma mente computador → 13 | media |
| Invade Qualquer Sistema Computacional Sem Ferramentas | 12 |  | informacao | hackeia sistemas sem equipamento, faixa rua alta → 12 | baixa |
| Recall Perfeito de Cada Missão e Rosto Já Visto | 10 |  | informacao | mesma memória perfeita → 10 | media |
| Agente Dupla Infiltrada por Décadas _(extra)_ | — |  | — | histórico | alta |
| Combate de Elite _(extra)_ | 5 |  | outro | combate de elite perto do pico humano → 5 | media |

### Scanner (Sarah Ryall) — geracaox

Atributos: destreza 5, força 3, corpo 4, inteligência 7, vontade 8, mente 9, influência 6, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Visão de Raio-X | 5 |  | distancia | raio-X através de paredes ~90 m | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Visão Térmica e Espectro Eletromagnético | 6 |  | distancia | visão térmica/espectro EM ~180 m | media |
| Ex-Agente do Governo _(extra)_ | — |  | — | histórico | alta |

### Scrambler — vilao

Atributos: destreza 4, força 3, corpo 4, inteligência 4, vontade 4, mente 5, influência 4, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Interferência em Sistemas Elétricos e Biológicos | 10 |  | outro | anulação ao toque pareada a mutantes de rua típicos e eletrônicos (~10) | baixa |
| Desativa Poderes Mutantes ao Toque _(extra)_ | 10 |  | outro | mesma anulação ao toque → 10 | baixa |

### Sentinela Mark I (Unidade Autônoma de Caça) — vilao

Atributos: destreza 5, força 12, corpo 13, inteligência 4, mente 3

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Detector de Mutações DNA | 9 |  | distancia | sensores detectam mutantes a ~1,5 km → 9 | media |
| Foguetes e Projéteis Anti-Mutante | 11 |  | energia | foguetes que arruínam blindado/tanque (11–12) → 11 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Armadura Estrutural Reforçada | 13 |  | resistencia | casco de Sentinela aguenta antitanque (13–15) → 13 | media |
| Supressores de Mutação _(extra)_ | 12 |  | outro | extra; pareado aos poderes de mutantes de rua típicos (~10–12) → 12 | baixa |

### Sentinela Mk I (Unidade de Caça) — vilao

Atributos: destreza 5, força 11, corpo 12, inteligência 4, mente 3

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Detector de Mutação por DNA | 9 |  | distancia | varredura de mutantes a ~1,5 km → 9 | baixa |
| Foguetes de Alta Explosão | 11 |  | energia | foguetes arruínam blindado/tanque (11–12) → 11; = foguetes do Sentinela Mark I | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Armadura Estrutural Reforçada | 13 |  | resistencia | casco de Sentinela aguenta antitanque (13–15) → 13; = Sentinela Mark I | media |
| Supressor de Poderes _(extra)_ | 12 |  | outro | modelo antigo: pareado a mutantes de rua típicos (~12) → 12 | baixa |

### Shinobi Shaw — clube-do-inferno

Atributos: destreza 6, força 5, corpo 6, inteligência 7, vontade 7, mente 7, influência 8, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intangibilidade | 12 |  | outro | atravessa matéria e ataques; pareado a ataques típicos de rua (tanque ~12) → 12 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Manipulador Político | 8 |  | informacao | intriga do Clube do Inferno, faixa rua → 8 | media |
| Tecnopatia _(extra)_ | — |  | — | rótulo de tema trocado (o poder é Intangibilidade); sem feito | baixa |
| Herdeiro _(extra)_ | — |  | — | histórico | alta |
| Tentou Assassinar o Próprio Pai _(extra)_ | — |  | — | histórico | alta |

### Silver Fox — vilao

Atributos: destreza 7, força 4, corpo 5, inteligência 5, vontade 6, mente 5, influência 5, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Garras Retráteis | 5 |  | energia | garras retráteis: pico humano | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Fator de Cura Limitado | 5 |  | resistencia | cura acelerada leve (3–6) → 5 | media |
| Ex-Amante de Wolverine _(extra)_ | — |  | — | relacionamento | alta |
| Assassinada por Sabretooth _(extra)_ | — |  | — | histórico/destino | alta |

### Siryn (Theresa Cassidy) — geracaox

Atributos: destreza 7, força 4, corpo 5, inteligência 7, vontade 8, mente 8, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Emite gritos concussivos que derrubam e desorientam alvos | 9 |  | energia | grito concussivo arruína concreto/estilhaça aço leve (9-10) → 9 (igual a Banshee) | media |
| Modula frequência para romper objetos ou atordoar sem matar | 9 |  | energia | mesmo grito modulado → 9 | media |
| Usa eco e vibração para perceber o espaço ao redor | 6 |  | distancia | sonar por eco ~180 m → 6 | media |
| Voa usando suas próprias ondas sonoras como propulsão | 7 |  | velocidade | voo sônico ~320 km/h → 7 | media |
| Ergue barreiras vibratórias de curta duração | 7 |  | resistencia | barreira vibratória desvia balas leves → 7 | baixa |
| Reposiciona aliados com rajadas controladas | 3 |  | peso | empurra/reposiciona aliado ~180 kg → 3 | media |
| Treinamento investigativo e experiência policial | 5 |  | informacao | detetive da X-Factor Investigations (perita humana) → 5 | media |
| Lidera em crises sem abandonar civis | — |  | — | traço de personalidade | alta |
| Reconhece os limites e o legado do pai sem imitá-lo cegamente | — |  | — | traço/arco | alta |
| Grito Sonar Destruidor _(extra)_ | 9 |  | energia | extra; mesmo grito → 9 | media |
| Frequência Hipnótica _(extra)_ | 7 |  | informacao | compulsão hipnótica pela voz em humanos próximos → 7; = mesma tag do Banshee | baixa |
| Voo Sônico _(extra)_ | 7 |  | velocidade | extra; mesmo voo sônico → 7 | media |

### Slipstream (Davis Cameron) — x-men

Atributos: destreza 6, força 4, corpo 5, inteligência 5, vontade 6, mente 6, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Portais de Energia para Teletransporte | 18 | 22 | distancia | portais de onda cruzam ~1.000 km de rotina (estado/país) → 18; pico intercontinental | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Pode Transportar Grupos Através dos Portais | 5 |  | peso | leva equipe de ~6–8 pessoas ~600 kg → 5 | media |
| Irmão de Lifeguard _(extra)_ | — |  | — | relacionamento | alta |

### Stacy X — x-men

Atributos: destreza 7, força 4, corpo 5, inteligência 5, vontade 6, mente 6, influência 8, aura 9, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Feromonas | 9 |  | informacao | feromônios ao toque dominam emoções/corpo do alvo: pareado à Vontade de alvos de rua → 9 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Camuflagem de Pele | 7 |  | informacao | pele reptiliana se mistura ao ambiente (camuflagem parcial) → 7 | baixa |
| Presença Sexual Dominante _(extra)_ | 6 |  | informacao | presença social/sedução forte (pico humano) → 6 | baixa |

### Steven Lang — vilao

Atributos: destreza 5, força 5, corpo 5, inteligência 7, vontade 7, mente 6, influência 6, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Coronel do Exército | — |  | — | cargo/histórico | alta |
| Líder do Projeto Fênix _(extra)_ | — |  | — | papel/histórico | alta |
| Mente Transferida para Corpo Sentinel _(extra)_ | 11 |  | peso | corpo Sentinela ergue ~50 t → 11 | media |

### Sunspot (Roberto da Costa) — novatos

Atributos: destreza 7, força 8, corpo 7, inteligência 7, vontade 7, mente 7, influência 9, aura 8, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorve luz solar para força e resistência sobre-humanas | 10 |  | peso | força solar ergue ~25 t (classe 25) → 10 | media |
| Projeta energia solar em rajadas | 10 |  | energia | rajadas solares: concreto armado/blindado leve (9–10) | media |
| Voa usando energia absorvida | 8 |  | velocidade | voo carregado ~640 km/h | baixa |
| Recursos empresariais e contatos internacionais | 13 |  | outro | fortuna e rede global: comprou a IMA/HIDRA; faixa rua alta | media |
| Experiência como líder dos Novos Mutantes e Vingadores | 8 |  | informacao | líder dos Novos Mutantes/Vingadores; faixa rua | media |
| Carisma competitivo em negociações | 9 |  | informacao | carisma de negociador bilionário; faixa rua | media |
| Força Sobre-humana _(extra)_ | 10 |  | peso | extra; mesma força solar ~25 t → 10 | media |
| Bilionário DaCosta _(extra)_ | 13 |  | outro | extra; mesma fortuna DaCosta → 13 | media |
| Membro dos X-Men _(extra)_ | — |  | — | afiliação | alta |
| Absorção e Canalização de Energia Solar _(extra)_ | 10 |  | energia | extra; mesma absorção/rajadas solares → 10 | media |
| Força Sobrehumana Quando Carregado _(extra)_ | 10 |  | peso | extra; mesma força quando carregado → 10 | media |
| Voo em Forma Solar _(extra)_ | 8 |  | velocidade | extra; mesmo voo solar → 8 | baixa |

### Surge (Noriko Ashida) — novatos

Atributos: destreza 9, força 5, corpo 5, inteligência 6, vontade 8, mente 7, influência 6, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorve eletricidade e a descarrega em rajadas incapacitantes | 7 |  | energia | rajadas elétricas derrubam humanos/fritam veículos → 7 | media |
| Canaliza energia pelos braceletes para evitar sobrecarga | — |  | — | controle via equipamento/limitação | alta |
| Usa impulsos elétricos para velocidade e reflexos breves | 8 |  | velocidade | rajadas de velocidade ~640 km/h → 8 | baixa |
| Toma decisões rápidas para proteger alunos mais jovens | — |  | — | traço de personalidade | alta |
| Coordena poderes diversos em campo | 5 |  | informacao | coordena alunos em campo (pico humano) → 5 | media |
| Persistência construída após sobreviver sozinha em Tóquio | — |  | — | histórico | alta |
| Liderança dos Novos X-Men _(extra)_ | 5 |  | informacao | extra; mesma liderança → 5 | media |
| Eletricidade _(extra)_ | 7 |  | energia | extra; mesma eletricidade → 7 | media |
| Absorção e Liberação de Eletricidade _(extra)_ | 7 |  | energia | extra; mesma absorção/descarga → 7 | media |
| Velocidade em Rajadas Elétricas _(extra)_ | 8 |  | velocidade | extra; mesma velocidade ~640 km/h → 8 | baixa |
| Líder dos Estudantes _(extra)_ | 5 |  | informacao | extra; mesma liderança → 5 | media |

### Tag (Brian Cruz) — novatos

Atributos: destreza 6, força 4, corpo 5, inteligência 6, vontade 6, mente 7, influência 6, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Cópia Temporária de Poderes por Toque | 10 |  | outro | pareado aos poderes copiados, tipicamente colegas de rua (~8–12) → 10 | baixa |
| Absorção de Habilidades e Talentos Alheios | 10 |  | outro | mesma cópia por toque → 10 | baixa |
| Retém Cópia por Minutos Após o Contato | 4 |  | duracao | janela de poucos minutos (faixa humana, não pela coluna Tempo) → 4 | baixa |
| Combina Múltiplas Cópias em Sequência | 10 |  | outro | encadeia cópias; teto = cópia de rotina → 10 | baixa |
| Aprendizado Instantâneo de Técnicas de Combate | 7 |  | outro | copia artes marciais de especialistas, acima do pico humano → 7 | media |
| Adaptação Tática Rápida em Combate | 5 |  | informacao | adaptação tática de humano excepcional → 5 | media |
| Leitura de Padrões de Luta do Alvo | 6 |  | informacao | lê estilos de luta (pico humano) → 6 | media |
| Versatilidade Contra Ameaças Variadas | — |  | — | descrição genérica; capacidade na cópia | media |
| Memória Muscular Emprestada | 7 |  | outro | mesma cópia de técnicas físicas → 7 | media |
| Improviso sob Pressão | — |  | — | personalidade | media |
| Perceptivo e Estratégico | 5 |  | informacao | percepção/estratégia de humano excepcional → 5 | media |
| Popular entre os Hellions | — |  | — | status social | alta |
| Curiosidade Insaciável sobre Poderes Alheios | — |  | — | personalidade | alta |
| Charme Descontraído | — |  | — | personalidade | alta |
| Vontade de Provar seu Valor | — |  | — | personalidade | alta |

### Tarot (Marie-Ange Colbert) — clube-do-inferno

Atributos: destreza 5, força 3, corpo 4, inteligência 7, vontade 8, mente 9, influência 7, aura 8, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Invocação de Arquétipos do Tarô | 9 |  | energia | figuras das cartas lutam e partem concreto armado (9–10) → 9 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Cada Carta tem Efeito Específico | — |  | — | mecânica/limitação, não feito | media |
| Precognição Limitada via Leitura de Cartas _(extra)_ | 5 |  | duracao | vislumbres vagos do futuro próximo: faixa humana alta → 5 | baixa |
| Treinada por Emma Frost _(extra)_ | — |  | — | histórico/relacionamento | alta |

### Tattoo (Christine Cord) — novatos

Atributos: destreza 6, força 4, corpo 5, inteligência 5, vontade 5, mente 5, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Tatuagens na Própria Pele Ganham Vida ao Se Soltarem | 6 |  | outro | criaturas de tinta com força de fera/pico humano → 6 | baixa |
| Criaturas de Tinta que Obedecem seus Comandos | 6 |  | outro | mesmas criaturas → 6 | baixa |
| Múltiplas Tatuagens Ativas Simultaneamente | 6 |  | outro | mesmas criaturas em grupo → 6 | baixa |
| Redesenha Novas Tatuagens sob a Pele em Minutos | 6 |  | outro | repõe criaturas, mesmo poder → 6 | baixa |
| Controla a Textura e Cor das Criaturas de Tinta | 5 |  | informacao | disfarce/adaptação das criaturas, faixa humana alta → 5 | baixa |
| Sente Tudo que Suas Criaturas Percebem | 6 |  | distancia | elo sensorial ~180 m → 6 | baixa |
| Criaturas Animadas com Formas Variadas (aves, feras, lâminas) | 5 |  | energia | ataque de fera/lâmina, pico humano → 5 | media |
| Coordenação Tática entre as Criaturas | 5 |  | informacao | coordenação de enxame, faixa humana alta → 5 | baixa |
| Reforma as Tatuagens Após Serem Destruídas | 6 |  | resistencia | criaturas voltam após destruídas → 6 | baixa |
| Formação de Enxame para Emboscadas | 4 |  | area | enxame cobre ~45 m → 4 | baixa |
| Camuflagem das Criaturas contra Superfícies Escuras | 6 |  | informacao | camuflagem no escuro, abaixo de Noturno (8) → 6 | baixa |
| Vínculo Próximo com o Irmão Radian | — |  | — | relacionamento | alta |
| Lealdade Feroz à Família Cord | — |  | — | traço/relacionamento | alta |
| Confiança Construída aos Poucos com os Novos Colegas | — |  | — | arco narrativo | alta |
| Determinação de Reconstruir sua Reputação junto com o Irmão | — |  | — | arco narrativo | alta |

### Timeslip — novatos

Atributos: destreza 5, força 3, corpo 4, inteligência 6, vontade 6, mente 8, influência 5, aura 6, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Salta no tempo em curtas janelas e retorna com informação útil | 8 |  | duracao | saltos temporais curtos com retorno; faixa rua baixa | baixa |
| Enxerga consequências próximas antes de agir | 6 |  | duracao | vê consequências próximas; faixa humana alta | baixa |
| Evita um perigo imediato reposicionando-se no fluxo temporal | 8 |  | outro | sai do fluxo temporal para evitar perigo imediato; pareado a ataques de rua | baixa |
| Observa padrões e cronologias que outros ignoram | 6 |  | informacao | lê padrões e cronologias; faixa humana alta | media |
| Age com cautela diante de paradoxos e consequências | — |  | — | personalidade | alta |
| Mantém foco em proteger a equipe, não em explorar futuros | — |  | — | motivação | alta |
| Salto Temporal _(extra)_ | 8 |  | duracao | extra; mesmo salto temporal → 8 | baixa |
| Percepção Temporal Acelerada _(extra)_ | 6 |  | outro | percepção temporal acelerada; faixa humana alta | media |
| Precognição Limitada ao Imediato _(extra)_ | 6 |  | duracao | extra; precognição do imediato → 6 | baixa |
| Personagem Menor _(extra)_ | — |  | — | filler de template repetido verbatim em 4 NPCs; não é poder (harmonização: null uniforme) | alta |

### Tower — vilao

Atributos: destreza 3, força 12, corpo 12, inteligência 3, vontade 4, mente 3, influência 3, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Crescimento até 15 Metros | 11 |  | peso | gigante de 15 m: força ~50 t → 11 (a altura em si = 2) | baixa |
| Força e Resistência Colossais em Tamanho Máximo _(extra)_ | 11 |  | peso | força colossal no tamanho máximo ~50 t → 11 | media |

### Trance (Hope Abbott) — novatos

Atributos: destreza 5, força 3, corpo 4, inteligência 6, vontade 7, mente 8, influência 5, aura 6, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Separação Voluntária do Espírito e do Corpo | 6 |  | distancia | projeção astral de rotina em escala de campus ~180 m → 6 | media |
| Voo Astral Ilimitado em Curto Alcance | 6 |  | distancia | curto alcance: campus ~180 m → 6 | media |
| Invisibilidade e Intangibilidade na Forma Astral | 10 |  | outro | intocável/invisível exceto a psíquicos; pareado a ataques físicos de rua → 10 | baixa |
| Observação Remota sem Ser Detectada | 9 |  | informacao | observa a ~1,5 km sem ser notada → 9 | media |
| Retorno Instantâneo ao Corpo em Emergências | 6 |  | outro | volta instantânea do alcance astral (~180 m) → 6 | baixa |
| Atravessa Paredes e Barreiras Físicas na Forma Astral | 10 |  | outro | mesma intangibilidade astral → 10 | baixa |
| Sente Perigo se Aproximar do Corpo Físico | 6 |  | distancia | sente o corpo dentro do alcance astral ~180 m → 6 | baixa |
| Percepção de Energias Espirituais ao Redor | 4 |  | distancia | percebe energias num raio de prédio ~45 m → 4 | media |
| Comunicação Telepática Limitada em Forma Astral | 3 |  | distancia | comunicação limitada a ~25 m → 3 | media |
| Resistência ao Medo em Ambientes Sobrenaturais | 6 |  | outro | pareado a medo sobrenatural de nível humano alto → 6 | baixa |
| Explora Locais Distantes sem Se Mover | 10 |  | informacao | explora locais a ~3 km → 10 | media |
| Serena e Observadora | — |  | — | personalidade | alta |
| Sabedoria Além da Idade | — |  | — | personalidade | alta |
| Conforto que Oferece aos Colegas Perturbados | — |  | — | papel social | alta |
| Empatia Silenciosa que Acalma | 3 |  | informacao | acalma colegas (empatia humana alta) → 3 | baixa |

### Trovão — x-men

Atributos: destreza 6, força 5, corpo 6, inteligência 5, vontade 8, mente 6, influência 7, aura 8, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Ondas de Choque Sônicas pela Voz | 12 | 16 | energia | rotina parte tanque/bunker (11–12) → 12; a descrição diz "derrubar edifícios" (prédio pequeno 16) | baixa |
| Gera Trovões e Vibrações | 10 |  | energia | trovão/vibração parte concreto armado (9–10) → 10 | baixa |
| Ataque em Área Ensurdecedor | 5 |  | area | ensurdece num raio de ~90 m → 5 | baixa |
| Espírito Brasileiro Contagiante | — |  | — | personalidade | alta |
| Paixão pelo Futebol e Samba | — |  | — | personalidade | alta |
| Energia que Anima a Equipe | — |  | — | personalidade | alta |
| Generosidade Calorosa | — |  | — | personalidade | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |

### Umbra — x-men

Atributos: destreza 8, força 4, corpo 5, inteligência 7, vontade 8, mente 7, influência 4, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Viagem e Manipulação de Sombras | 9 |  | distancia | salta entre sombras ~1,5 km (igual Noturno) → 9 | media |
| Furtividade e Infiltração Absolutas | 10 |  | informacao | "absoluta": acima da camuflagem de Noturno (8) → 10 | media |
| Ataques a partir da Penumbra | 5 |  | outro | golpe surpresa vindo da sombra, pico humano → 5 | baixa |
| Camuflagem nas Trevas | 8 |  | informacao | quase invisível no escuro (igual Noturno) → 8 | media |
| Protege em Silêncio | — |  | — | traço | alta |
| Observa Mais do que Age | — |  | — | traço | alta |
| Mistério que Intriga a Equipe | — |  | — | traço narrativo | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |

### Unus (Angelo Unuscione) — irmandade

Atributos: destreza 4, força 6, corpo 8, inteligência 4, vontade 5, mente 4, influência 4, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Básico | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Campo de Força Pessoal | 14 |  | resistencia | campo de força repele quase todo dano físico até antitanque (13–15) | media |
| Força Aumentada Dentro do Campo _(extra)_ | 7 |  | peso | campo amplia força/empuxo ~3 t → 7 | baixa |
| Ex-Lutador de Circo _(extra)_ | — |  | — | histórico | alta |

### Vanisher — vilao

Atributos: destreza 6, força 3, corpo 4, inteligência 5, vontade 5, mente 5, influência 4, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Teletransporte Planetário Instantâneo | 23 |  | distancia | o texto é o feito: qualquer ponto do planeta (~20.000 km) → 23 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Ladrão de Elite | 6 |  | informacao | ladrão de elite no pico humano → 6 | media |
| Aliado Eventual dos X-Men _(extra)_ | — |  | — | relacionamento | alta |

### Vertigo — vilao

Atributos: destreza 5, força 3, corpo 4, inteligência 5, vontade 5, mente 6, influência 7, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Indução de Vertigem e Desorientação Severa | 10 |  | informacao | incapacita super-humanos com desorientação (faixa rua) → 10 | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Poder Funciona em Área | 5 |  | area | efeito em raio de ~90 m → 5 | media |

### Vic Slaughter (Vic Slaughter (Cria Vampírica)) — midnight-sons

Atributos: destreza 7, força 7, corpo 7, inteligência 5, vontade 6, mente 5, influência 4, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força e Velocidade Vampíricas Aprimoradas | 6 |  | peso | força vampírica ergue ~1,5 t (carro) → 6 | media |
| Fator de Cura Moderado | 8 |  | resistencia | "moderado": entre cura leve (3–6) e balas em minutos (9–12) → 8 | media |
| Garras e Presas | 5 |  | energia | garras/presas rasgam carne e chapa leve (pico humano) → 5 | media |
| Distorção Corporal (pode estender membros) | 1 |  | distancia | estende membros a ~6 m → 1 | baixa |
| Lealdade Forçada a Morbius | — |  | — | relacionamento/fraqueza | alta |
| Ex-líder dos Hardcases | — |  | — | histórico | alta |

### Wallflower (Laurie Collins) — novatos

Atributos: destreza 4, força 3, corpo 4, inteligência 7, vontade 6, mente 8, influência 10, aura 11, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Emite feromônios que induzem emoções específicas em quem os respira | 10 |  | informacao | feromônios de potência Ômega, difíceis de resistir; faixa rua → 10 | media |
| Pode acalmar, atrair ou agravar medo e hostilidade em um grupo | 4 |  | area | afeta grupo em raio ~45 m → 4 | media |
| Percebe reações sociais e usa discrição para evitar conflito | 5 |  | informacao | leitura social, faixa humana alta → 5 | baixa |
| Empatia genuína com outros alunos marginalizados | — |  | — | traço de personalidade | alta |
| Feromônios _(extra)_ | 10 |  | informacao | extra; mesmos feromônios → 10 | media |
| Invisível _(extra)_ | 8 |  | informacao | passa despercebida via feromônios, quase invisível socialmente → 8 | baixa |
| Feromonas Emocionais _(extra)_ | 10 |  | informacao | extra; mesmos feromônios → 10 | media |
| Induz Medo, Amor, Agressão ou Calma em Grupos _(extra)_ | 4 |  | area | extra; mesmo raio de grupo ~45 m → 4 | media |
| Introversão Severa _(extra)_ | — |  | — | traço/fraqueza | alta |
| Filha de Persuasão (vilã) _(extra)_ | — |  | — | relacionamento | alta |

### Wild Child (Kyle Gibney) — vilao

Atributos: destreza 9, força 6, corpo 7, inteligência 4, vontade 5, mente 4, influência 3, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fator de Cura Acelerado | 9 |  | resistencia | cura acelerada de ferimentos graves em horas (abaixo de 'bala em minutos') | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Garras e Dentes Afiados | 6 |  | energia | garras e dentes: pico humano | media |
| Sentidos Lupinos _(extra)_ | 9 |  | distancia | faro lupino rastreia por ~1,5 km → 9 | media |
| Ex-Parceiro de Sabretooth _(extra)_ | — |  | — | relacionamento/histórico | alta |

### Wind Dancer (Sofia Mantega) — novatos

Atributos: destreza 7, força 4, corpo 5, inteligência 6, vontade 6, mente 6, influência 6, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle de Correntes de Ar | 5 |  | area | controla correntes de ar em raio ~90 m → 5 | media |
| Rajadas de Vento Ofensivas | 5 |  | energia | rajada derruba pessoas/empurra carro (pico humano) → 5 | media |
| Voo Limitado por Sustentação Aérea | 5 |  | velocidade | voo limitado ~80 km/h → 5 | media |
| Criação de Redemoinhos Defensivos | 6 |  | resistencia | redemoinho desvia detritos e projéteis leves → 6 | baixa |
| Amortecimento de Quedas com Ar | 3 |  | peso | amortece queda de 1-2 pessoas ~180 kg → 3 | media |
| Sente Mudanças Climáticas Iminentes | 9 |  | distancia | sente frentes climáticas a ~1,5 km → 9 | baixa |
| Precisão em Direcionar Ventos | 5 |  | outro | precisão no mesmo nível do controle de ar → 5 | media |
| Dispersão de Gases e Fumaça | 5 |  | area | dispersa gás/fumaça em ~90 m → 5 | media |
| Empurrões Teleguiados a Distância | 5 |  | distancia | empurrões guiados a ~90 m → 5 | media |
| Guia Detritos e Objetos Levados pelo Vento | 4 |  | peso | guia detritos/objetos ~340 kg → 4 | media |
| Calorosa e Sociável com Todos | — |  | — | traço de personalidade | alta |
| Otimismo Contagiante | — |  | — | traço de personalidade | alta |
| Habilidade para Unir o Grupo | 4 |  | informacao | une o grupo; social humano treinado → 4 | baixa |
| Saudade Constante de Casa | — |  | — | traço emocional | alta |
| Fluente em Português e Inglês | 3 |  | informacao | bilíngue: perícia humana comum → 3 | media |

### Wing (Pedro Nunez) — novatos

Atributos: destreza 6, força 4, corpo 5, inteligência 5, vontade 5, mente 5, influência 4, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Par de Asas Insetoides Cresce das Costas | — |  | — | traço físico; o voo está em outra tag | alta |
| Voo Instável mas Funcional | 4 |  | velocidade | voo instável ~40 km/h → 4 | baixa |
| Reflexos Rápidos ao Voar em Curtas Distâncias | 4 |  | outro | reflexos de atleta em voo curto → 4 | media |
| Casulo Protetor Improvisado com as Asas | 3 |  | resistencia | asas frágeis seguram golpe humano forte → 3 | baixa |
| Camuflagem Parcial ao Dobrar as Asas | 3 |  | informacao | esconde as asas (humano) → 3 | baixa |
| Salto Impulsionado pelas Asas em Emergências | 3 |  | distancia | salto assistido ~25 m → 3 | baixa |
| Sente Mudanças Físicas Contínuas no Próprio Corpo | — |  | — | narrativo/mutação em curso | alta |
| Adaptação Gradual ao Novo Corpo | — |  | — | arco pessoal | alta |
| Instinto de Sobrevivência Aguçado | — |  | — | traço/personalidade | media |
| Percepção Sensorial Ampliada nas Antenas em Formação | 3 |  | distancia | antenas ainda em formação, já usadas: ~25 m → 3 | baixa |
| Resistência a Toxinas Ambientais | 4 |  | outro | pareado a poluentes/toxinas comuns → 4 | baixa |
| Discrição Natural que Passa Despercebida | 3 |  | informacao | discrição humana → 3 | media |
| Lealdade Silenciosa aos Paladins | — |  | — | relacionamento | alta |
| Vontade de Provar Que Vale a Pena Confiar Nele | — |  | — | personalidade | alta |
| Talento para Desenho Técnico e Mecânica | 3 |  | informacao | talento técnico humano → 3 | media |

### Wither (Kevin Ford) — novatos

Atributos: destreza 6, força 5, corpo 6, inteligência 5, vontade 7, mente 6, influência 4, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Toque que Apodrece Carne e Matéria Vegetal | 9 |  | outro | apodrece tecido vivo ignorando Corpo orgânico (árvores, humanos, super-humanos de carne): pareado a Corpo de rua → 9 | baixa |
| Desidratação Instantânea ao Contato | 9 |  | outro | = toque que apodrece → 9 | baixa |
| Controle sobre a Velocidade da Decomposição | 5 |  | outro | dosa a decomposição (utilidade) → 5 | baixa |
| Sente a Vitalidade de Seres Próximos | 3 |  | distancia | sente vida a ~25 m → 3 | baixa |
| Pode Direcionar o Apodrecimento a Distância Curta | 1 |  | distancia | apodrece a ~6 m → 1 | baixa |
| Mão Reduzida a Osso Imune ao Próprio Poder | — |  | — | traço físico | alta |
| Golpes Físicos com a Mão Óssea | 3 |  | energia | golpe humano treinado → 3 | baixa |
| Resistência a Dor na Extremidade Afetada | 3 |  | resistencia | tolerância à dor localizada (humano alto) → 3 | baixa |
| Presença Intimidadora em Combate | 4 |  | informacao | intimidação (humano alto) → 4 | baixa |
| Precisão Cirúrgica no Toque | 5 |  | outro | toque preciso (pico humano baixo) → 5 | baixa |
| Treinamento Rigoroso da Academia Hellfire | 5 |  | outro | treino de combate rigoroso → 5 | baixa |
| Disciplina de Combate Silenciosa | 5 |  | outro | combate furtivo disciplinado → 5 | baixa |
| Escolheu o Caminho do Bem por Conta Própria | — |  | — | arco/ideologia | alta |
| Lealdade Cautelosa aos Novos Colegas | — |  | — | relacionamento | alta |
| Instinto de Sobrevivência Aguçado | — |  | — | traço genérico, não capacidade mensurável | alta |

### Wolf Cub (Nicholas Gleason) — novatos

Atributos: destreza 7, força 6, corpo 6, inteligência 4, vontade 5, mente 4, influência 4, aura 6, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transformação em Forma Lupina Bípede | 5 |  | peso | forma lupina ergue ~0,7 t → 5 | media |
| Garras e Presas Afiadas | 5 |  | energia | garras rasgam porta/lataria → 5 | media |
| Força e Velocidade Ampliadas na Forma Animal | 5 |  | peso | ~0,7 t (velocidade ~60 km/h) → 5 | media |
| Sentidos Aguçados de Olfato e Audição | 8 |  | distancia | ouve/fareja a ~760 m → 8 | media |
| Pelagem que Resiste a Cortes Superficiais | 3 |  | resistencia | resiste a cortes leves, abaixo do pico humano → 3 | media |
| Salto Poderoso das Patas Traseiras | 2 |  | distancia | salto ~12 m → 2 | media |
| Uivo que Coordena Aliados a Distância | 9 |  | distancia | uivo audível ~1,5 km → 9 | baixa |
| Rastreamento por Cheiro a Longa Distância | 10 |  | distancia | faro rastreia por quilômetros (~3 km) → 10 | media |
| Visão Noturna Aprimorada | 6 |  | distancia | enxerga no escuro ~180 m (igual Noturno) → 6 | baixa |
| Reflexos de Predador em Combate | 5 |  | outro | reflexos de fera, pico humano → 5 | media |
| Mordida com Força de Esmagamento | 5 |  | energia | mordida esmaga como pico humano/amassa lataria → 5 | media |
| Lealdade Instintiva a Quem Considera Matilha | — |  | — | traço | alta |
| Energia Física Incansável | 5 |  | duracao | fôlego de atleta extremo, faixa humana alta → 5 | baixa |
| Determinação Bruta para Proteger os Amigos | — |  | — | traço | alta |
| Protetor Fiel dos Mais Fracos | — |  | — | traço | alta |

### Wolfsbane (Rahne Sinclair) — novatos

Atributos: destreza 9, força 7, corpo 7, inteligência 5, vontade 7, mente 6, influência 5, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Alterna entre formas humana, lupina e híbrida | 6 |  | outro | troca entre formas humana/lupina/híbrida; ganho físico acima do pico humano | media |
| Ganha sentidos, velocidade e resistência de lobo | 5 |  | velocidade | corrida de lobo ~80 km/h → 5 | media |
| Rastreia pessoas por cheiro e se move em terreno selvagem | 9 |  | distancia | rastreia pelo cheiro por ~1,5 km → 9 | media |
| Protege aliados com lealdade feroz e leitura instintiva de perigo | 6 |  | outro | leitura instintiva de perigo ao proteger aliados; faixa humana alta | baixa |
| Trabalha bem em resgates e reconhecimento de campo | 5 |  | informacao | resgate/reconhecimento de campo; faixa humana alta | media |
| Reconhece estados emocionais por cheiro e comportamento | 5 |  | informacao | lê emoções pelo cheiro; faixa humana alta | media |
| Disciplina religiosa que sustenta sua compaixão | — |  | — | fé/personalidade | alta |
| Resistência construída por anos entre os Novos Mutantes e X-Factor | — |  | — | histórico | alta |
| Consegue escolher misericórdia mesmo após violência e perda | — |  | — | personalidade | alta |
| Sentidos Lupinos _(extra)_ | 9 |  | distancia | extra; mesmo faro lupino ~1,5 km → 9 | media |
| Ligação com Mirage _(extra)_ | — |  | — | relacionamento | alta |
| Fé Escocesa _(extra)_ | — |  | — | fé | alta |
| Transformação em Lobo ou Forma Lobisomem _(extra)_ | 6 |  | outro | extra; mesma metamorfose lupina → 6 | media |
| Instintos Predatórios em Forma Animal _(extra)_ | 6 |  | outro | instintos predatórios na forma animal; faixa humana alta | media |
| Ligação Empática com Mirage _(extra)_ | — |  | — | relacionamento/vínculo | media |

### Wraith (Hector Rendoza) (Hector Rendoza) — x-men

Atributos: destreza 6, força 4, corpo 5, inteligência 6, vontade 6, mente 7, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intangibilidade | 12 |  | outro | intangibilidade de base: atravessa paredes e evita ataques até tanque/bunker → 12 (família 12) | media |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Adolescente Problemático | — |  | — | traço de personalidade | alta |

### Xenônio (Xenon) — x-men

Atributos: destreza 6, força 3, corpo 4, inteligência 8, vontade 6, mente 7, influência 5, aura 7, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Emissão de Gases e Energias Espectrais | 3 |  | area | nuvem de gás/luz em raio ~25 m → 3 | media |
| Cria Ilusões Gasosas | 6 |  | informacao | ilusões visuais convincentes em gás (pico humano/rua baixa) → 6 | media |
| Brilho Luminoso Desorientador | 5 |  | informacao | clarão que cega/desorienta grupo próximo → 5 | media |
| Forma Gasosa Evasiva | 8 |  | outro | intangível em gás; pareado a ataques físicos de rua → 8 | baixa |
| Carisma Volátil e Cintilante | — |  | — | personalidade | alta |
| Criatividade Imprevisível | — |  | — | personalidade | alta |
| Surge e Some sem Aviso | 5 |  | informacao | furtividade de humano excepcional → 5 | baixa |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |

## Perigo: baixo

### Adepto (Magneto) (Seguidor da Causa) — irmandade

Atributos: destreza 4, força 4, corpo 5, inteligência 5, vontade 7, mente 5, influência 4, aura 5, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Poder Mutante de Baixo Nível | 4 |  | outro | poder genérico modesto: uso típico de atleta/humano alto → 4 | baixa |
| Fanatismo Ideológico | — |  | — | ideologia | alta |
| Disposto a Morrer pela Causa _(extra)_ | — |  | — | ideologia | alta |
| Treinamento Básico de Combate _(extra)_ | 3 |  | outro | treino de combate básico, humano treinado → 3 | media |

### Agente HYDRA (Agente de Campo) — vilao

Atributos: destreza 5, força 4, corpo 5, inteligência 5, vontade 6, mente 5, influência 4, aura 4, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Armamento Avançado (tecnologia roubada) | 7 |  | energia | armas de energia/fuzis avançados arruínam tijolo → 7 | media |
| Treinamento Paramilitar Sólido _(extra)_ | 3 |  | outro | paramilitar treinado, abaixo do pico → 3 | media |
| Tecnologia de Supressão de Mutantes _(extra)_ | 10 |  | outro | pareado a mutantes de rua típicos que suprime (~10) → 10 | baixa |
| Opera em Células Independentes _(extra)_ | — |  | — | organização/narrativo | alta |

### Agente S.H.I.E.L.D. (Operativo de Campo) — humano

Atributos: destreza 6, força 4, corpo 5, inteligência 5, vontade 6, mente 5, influência 4, aura 4, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Tático de Elite | 5 |  | outro | treinamento tático de elite: pico humano | media |
| Armamento de Alta Tecnologia S.H.I.E.L.D. _(extra)_ | 7 |  | energia | armamento de alta tecnologia: fuzil/arma de energia (5–7) → 7 | media |
| Lealdade à Organização _(extra)_ | — |  | — | lealdade | alta |

### Beef (Winston) — clube-do-inferno

Atributos: destreza 3, força 10, corpo 10, inteligência 2, vontade 3, mente 2, influência 2, aura 3, espírito 3

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força e Resistência Colossais | 8 |  | peso | força/resistência de Hellion ~6 t → 8 | media |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Inteligência Muito Limitada | — |  | — | fraqueza | alta |
| Lealdade Cega _(extra)_ | — |  | — | traço de personalidade | alta |

### Bevatron — clube-do-inferno

Atributos: destreza 4, força 5, corpo 5, inteligência 4, vontade 4, mente 4, influência 3, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Rajadas de Energia | 5 |  | energia | rajadas modestas: arromba porta/fere gravemente (5–6) → 5 | media |
| Personagem Menor _(extra)_ | — |  | — | filler de template repetido verbatim em 4 NPCs; não é poder (harmonização: null uniforme) | alta |

### Bolivar Trask — humano

Atributos: destreza 3, força 3, corpo 4, inteligência 9, vontade 7, mente 8, influência 6, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Gênio em Robótica e Bioengenharia | 13 |  | informacao | criou as Sentinelas, robótica além da tecnologia da época (13–15) → 13 | media |
| Arrependido no Final da Vida _(extra)_ | — |  | — | arco/personalidade | alta |

### Cargill — vilao

Atributos: destreza 4, força 8, corpo 8, inteligência 3, vontade 4, mente 3, influência 3, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Força Sobrehumana | 7 |  | peso | ergue ~3 t (vira carro/caminhão leve) → 7 | baixa |
| Ex-Membro da Aliança do Mal _(extra)_ | — |  | — | histórico | alta |

### Catseye (Sharon Smith) — clube-do-inferno

Atributos: destreza 8, força 4, corpo 5, inteligência 5, vontade 5, mente 5, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transformação em Felina Humanóide | 5 |  | outro | forma felina humanoide: agilidade de pico humano | media |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Garras, Agilidade e Visão Noturna | 5 |  | outro | garras/agilidade felina de pico humano; enxerga no escuro | media |

### Cypher (Doug Ramsey) — novatos

Atributos: destreza 4, força 3, corpo 3, inteligência 11, vontade 7, mente 10, influência 7, aura 7, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Compreende qualquer idioma falado, escrito ou codificado | 18 |  | informacao | compreende qualquer idioma/código instantaneamente (inclui Krakoano); faixa Ômega → 18 | media |
| Lê linguagem corporal e padrões de comunicação | 10 |  | informacao | leitura corporal antecipa ataques; faixa rua → 10 | media |
| Traduz interfaces, códigos e culturas desconhecidas | 16 |  | informacao | traduz interfaces/culturas desconhecidas; parte da linguagem → 16 | media |
| Comunica-se com sistemas vivos e linguagens não humanas | 18 |  | informacao | fala com sistemas vivos (Krakoa, Warlock) → 18 | media |
| Decifra tecnologia alienígena e dados complexos | 16 |  | informacao | decifra tecnologia alienígena → 16 | media |
| Encontra soluções por interpretação de padrões | 14 |  | informacao | soluções por padrões; faixa rua alta → 14 | media |
| Leitura Corporal _(extra)_ | 10 |  | informacao | extra; mesma leitura corporal → 10 | media |
| Amigo de Warlock _(extra)_ | — |  | — | relacionamento | alta |
| Poliglota Universal _(extra)_ | 18 |  | informacao | extra; mesma compreensão universal → 18 | media |
| Leitura de Intenção Corporal _(extra)_ | 10 |  | informacao | extra; mesma leitura corporal → 10 | media |
| Melhor Amigo de Warlock _(extra)_ | — |  | — | relacionamento | alta |
| Morreu em Batalha _(extra)_ | — |  | — | histórico | alta |

### Fixer — vilao

Atributos: destreza 4, força 3, corpo 4, inteligência 5, vontade 4, mente 4, influência 3, aura 3, espírito 3

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conserto Rápido de Máquinas | 4 |  | informacao | mecânico especialista humano, conserto rápido → 4 | media |

### Flubber — x-men

Atributos: destreza 4, força 3, corpo 5, inteligência 4, vontade 6, mente 4, influência 6, aura 6, espírito 7

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Massa Gelatinosa e Elástica | 6 |  | resistencia | corpo gelatinoso absorve impactos contundentes de pico humano → 6 | baixa |
| Maleabilidade Extrema | 5 |  | outro | estica/deforma o corpo livremente (utilidade) → 5 | baixa |
| Espreme-se por Qualquer Fresta | 6 |  | outro | passa por frestas mínimas: contorna portas/barreiras comuns → 6 | baixa |
| Entusiasmo Contagiante | — |  | — | personalidade | alta |
| Não Tem Um Osso Mau (literalmente) | — |  | — | piada/personalidade | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |

### Graydon Creed — vilao

Atributos: destreza 4, força 3, corpo 4, inteligência 5, vontade 6, mente 5, influência 6, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Filho de Mystique e Sabretooth | — |  | — | relacionamento/histórico | alta |
| Líder dos Amigos da Humanidade _(extra)_ | — |  | — | papel/cargo | alta |
| Orador e Manipulador Político _(extra)_ | 13 |  | informacao | campanha presidencial anti-mutante de alcance nacional (acima de Stryker 12) → 13 | media |

### Graydon Creed (FOH) (Soldado da FOH) — vilao

Atributos: destreza 4, força 3, corpo 4, inteligência 3, vontade 5, mente 3, influência 3, aura 3, espírito 3

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Humano Sem Poderes | — |  | — | ausência de poder (fraqueza) | alta |
| Armamento Leve _(extra)_ | 5 |  | energia | armamento leve: pistola/fuzil → 5 | media |
| Fanatismo Anti-Mutante _(extra)_ | — |  | — | ideologia | alta |

### Henry Gyrich (Henry Peter Gyrich) — humano

Atributos: destreza 3, força 3, corpo 4, inteligência 7, vontade 8, mente 7, influência 7, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Funcionário Governamental de Alto Escalão | — |  | — | cargo/papel | alta |
| Burocracia como Arma _(extra)_ | 12 |  | informacao | burocracia federal restringe operações em escala nacional; social → 12 | baixa |
| Anti-Mutante Pragmático _(extra)_ | — |  | — | ideologia | alta |

### Icarus (Jay Guthrie) — novatos

Atributos: destreza 6, força 4, corpo 5, inteligência 5, vontade 5, mente 5, influência 5, aura 6, espírito 6

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Grandes Asas Emplumadas | — |  | — | traço físico; o voo está na outra tag | alta |
| Voo Ágil e Sustentado | 5 | 6 | velocidade | ave de rapina ~80 km/h → 5 (pico 6) | media |
| Visão Aguçada em Altitude | 8 |  | distancia | distingue uma pessoa a ~760 m → 8 | media |
| Manobras Aéreas Evasivas | 5 |  | outro | esquiva de ave veloz (faixa humana alta) → 5 | media |
| Membro da Família Guthrie (irmão de Cannonball e Husk) | — |  | — | relacionamento | alta |
| Instinto Protetor com Colegas Mais Novos | — |  | — | personalidade | alta |
| Gentileza Incomum para um Herói em Formação | — |  | — | personalidade | alta |
| Determinação Silenciosa | — |  | — | personalidade | alta |

### Impulse — novatos

Atributos: destreza 8, força 3, corpo 4, inteligência 4, vontade 4, mente 4, influência 4, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Supervelocidade | 7 |  | velocidade | velocista de baixo nível ~300 km/h → 7 | media |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Personagem Menor | — |  | — | filler de template repetido verbatim em 4 NPCs; não é poder (harmonização: null uniforme) | alta |
| Explosão Cinética _(extra)_ | 6 |  | energia | estouro cinético amassa carro (5–6) → 6 | baixa |

### Jetstream (Haroun ibn Sallah) — clube-do-inferno

Atributos: destreza 6, força 4, corpo 5, inteligência 5, vontade 5, mente 5, influência 5, aura 6, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Propulsão a Jato Biológica | 7 |  | velocidade | voo a jato ~320 km/h (abaixo de Cannonball) → 7 | media |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Rival de Cannonball | — |  | — | relacionamento | alta |
| Saudita _(extra)_ | — |  | — | origem | alta |

### Moira MacTaggert (Dra. Moira MacTaggert) — humano

Atributos: destreza 3, força 2, corpo 3, inteligência 13, vontade 9, mente 11, influência 9, aura 8, espírito 9

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Geneticista Mutante Líder Mundial | 13 |  | informacao | geneticista líder mundial (vírus Legado, Ilha Muir); faixa rua alta | media |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Parceira Científica e Ex-Noiva de Xavier | — |  | — | relacionamento | alta |
| Geneticista _(extra)_ | 13 |  | informacao | extra; mesma genética de ponta → 13 | media |
| Aliada dos X-Men _(extra)_ | — |  | — | afiliação | alta |
| Dirige a Ilha Muir _(extra)_ | — |  | — | papel/local | media |
| Mutante Secreta _(extra)_ | 18 |  | duracao | reencarnação com memória (reinicia a linha do tempo); faixa Ômega por utilidade | baixa |

### Purificador (Soldado da Ordem dos Purificadores) — vilao

Atributos: destreza 4, força 3, corpo 4, inteligência 3, vontade 6, mente 3, influência 2, aura 2, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Fanatismo Religioso | — |  | — | ideologia | alta |
| Arma de Fogo e Faca _(extra)_ | 5 |  | energia | arma de fogo/faca: dano de arma leve → 5 | media |
| Treinamento Paramilitar Básico _(extra)_ | 3 |  | outro | treino paramilitar básico (humano treinado) → 3 | media |

### Stinger — vilao

Atributos: destreza 7, força 3, corpo 4, inteligência 4, vontade 4, mente 4, influência 4, aura 4, espírito 4

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Projéteis Bioelétricos | 4 |  | energia | ferrões bioelétricos modestos, golpe de atleta/atordoa → 4 | media |
| Personagem Menor _(extra)_ | — |  | — | filler de template repetido verbatim em 4 NPCs; não é poder (harmonização: null uniforme) | alta |

### Timeshadow (Harriet) — clube-do-inferno

Atributos: destreza 5, força 3, corpo 4, inteligência 5, vontade 5, mente 6, influência 4, aura 5, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Ilusões Temporais de Si Mesma | 6 |  | informacao | cópias ilusórias passadas/futuras confundem oponentes próximos (pico humano) → 6 | baixa |

### Toad (Mortimer Toynbee) — irmandade

Atributos: destreza 8, força 5, corpo 5, inteligência 6, vontade 5, mente 5, influência 3, aura 4, espírito 5

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Salta grandes distâncias com pernas sobre-humanas | 4 |  | distancia | saltos ~45 m → 4 | media |
| Língua preênsil prende, puxa objetos e desarma oponentes | 2 |  | distancia | língua alcança ~10 m → 2 | media |
| Escala paredes e usa agilidade irregular para fugir | 4 |  | outro | agilidade de atleta extremo em paredes → 4 | media |
| Sobreviveu como espião, lacaio e membro recorrente da Irmandade | — |  | — | histórico | alta |
| Improvisa truques sujos e rotas de fuga quando superado | — |  | — | traço | alta |
| Lealdade pode virar coragem real quando alguém lhe dá respeito | — |  | — | traço/arco | alta |
| Salto Sobrehumano _(extra)_ | 4 |  | distancia | extra; mesmo salto ~45 m → 4 | media |
| Língua Preênsil Longa _(extra)_ | 2 |  | distancia | extra; mesma língua ~10 m → 2 | media |
| Secreção Pegajosa _(extra)_ | 2 |  | outro | gosma prende um adulto ~90 kg → 2 | baixa |

### Val Cooper (Valentine Cooper) — humano

Atributos: destreza 5, força 3, corpo 4, inteligência 8, vontade 9, mente 8, influência 8, aura 7, espírito 8

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Especialista em Relações com Mutantes | 8 |  | informacao | especialista em relações com mutantes; faixa rua | media |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Inteligência Política Excepcional | 9 |  | informacao | inteligência política excepcional; faixa rua | media |
| Força de Vontade Acima da Média _(extra)_ | 4 |  | outro | vontade acima da média: resiste a pressão/intimidação; faixa humana | baixa |
