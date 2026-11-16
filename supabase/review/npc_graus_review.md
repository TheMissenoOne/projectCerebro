# Revisão — graus das tags de poder dos NPCs

Gerado por `node scripts/gen-npc-graus.js build`. Rubrica: `supabase/review/npc_graus_rubric.md`.

## Resumo

- NPCs: 193 · tags de poder: 3438 · com grau: 1101 · null: 2337
- Graus antigos removidos (tags graduadas null que tinham grau 1–6 no estado de origem do baseline): 0
- Confiança: alta 2291 · media 755 · baixa 392

| Faixa de grau | Tags |
|---|---:|
| 1–6 humano | 281 |
| 7–15 rua | 567 |
| 16–30 Ômega | 243 |
| 31+ cósmico | 10 |

| Perigo | NPCs | Grau máx. (NPC — tag) | Mediana |
|---|---:|---|---:|
| extremo | 22 | 60 (Onslaught — Criou Realidade de Bolso (Era Heroes Reborn)) | 18 |
| alto | 36 | 23 (Trevor Fitzroy — Portais Dimensionais) | 11 |
| medio | 110 | 23 (Vanisher — Teletransporte Planetário Instantâneo) | 7 |
| baixo | 23 | 18 (Cypher — Poliglota Universal) | 6 |
| ? | 2 | 22 (Homem de Gelo — Criocinese Ômega) | 12 |

## Entradas com grau > 30 (devem ser só variantes/seres cósmicos) (2)

| NPC | Perigo | Grau máx. | Tags > 30 |
|---|---|---:|---:|
| Onslaught | extremo | 60 | 8 |
| Cosmo (Cão Espacial) | extremo | 51 | 2 |

## Confiança baixa (392), por NPC

**Apocalipse** (extremo, 4)

- Tecnologia Celestial — **22** · outro · nave/tecnologia Celestial: além da ciência terrestre em escala de porta-aviões (~100 kt) → 22
- Teletransporte Interestelar — **23** (pico 51) · distancia · entrada base: rotina na Terra via nave = qualquer ponto do globo 23; literal interestelar (51) em peak
- Acesso a Conhecimento Cósmico — **22** · informacao · conhecimento Celestial acumulado; muito além da ciência terrestre (faixa Ômega alta) → 22
- Apocalipse os Empodera — **16** · outro · concede/amplifica poderes (Arcanjo, etc.) a nível Ômega baixo (16) → 16

**Cable** (extremo, 8)

- Braço e Olho Biônicos TOV — **8** · peso · braço TOV vira caminhão/ergue ~6 t → 8
- Telepatia de Nível Ômega (Suprimida) — **8** (pico 23) · distancia · uso suprimido de rotina: comunicação/sondagem ~1 km → 8 (desbloqueada, peak global ~23)
- Telecinese Massiva (Suprimida) — **8** (pico 20) · peso · suprimida: rotina ~6 t (caminhão) → 8; desbloqueada ergue navios (peak ~20)
- Precognição Tática — **8** · duracao · lampejos táticos de segundos/minutos, faixa rua → 8
- Escudos Mentais Impenetráveis — **25** · outro · ladder: escudos que seguraram telepatas Ômega (Jean, Apocalipse) → 25; = Escudos Mentais Impenetráveis do Cable Liberado
- Escudos de Força Pessoais — **10** · resistencia · escudo TK aguenta artilharia leve/concreto → 10
- Interface Neural com Tecnologia — **10** · outro · tecnopatia TOV com máquinas do futuro, faixa rua → 10
- Braço Cibernético Multifuncional — **8** · peso · mesmo braço TOV: ~6 t → 8

**Cosmo (Cão Espacial)** (extremo, 3)

- Telepatia Alcance Interestelar — **51** · distancia · o texto é o feito: alcance interestelar ≥ 1 ano-luz → 51
- Escudos Psíquicos Protegem Knowhere — **11** · area · escudo psíquico cobre Knowhere (cabeça de Celestial, raio ~5 km) → 11
- Comunicação Interestelar Instantânea — **51** · distancia · o texto é o feito: comunicação interestelar ≥ 1 ano-luz → 51

**Druig (Eterno)** (extremo, 2)

- Manipulação Matéria/Energia Cósmica — **16** · energia · rajadas de energia cósmica de Eterno derrubam prédio pequeno → 16
- Rede Espionagem Milenar — **20** · informacao · rede de agentes em escala continental → 20

**Emma Frost** (extremo, 4)

- Mente Tática e Inescrupulosa — **9** · informacao · estrategista de elite (faixa rua) → 9
- Controle Mental de Multidões — **18** · informacao · controla centenas/milhares de mentes de uma vez: faixa Ômega → 18
- Transferência de Consciência — **16** · outro · troca/transfere mentes: base da faixa Ômega → 16
- Bloqueio de Poderes Mutantes — **16** · outro · desliga poderes por via telepática: pareado a alvos rua/Ômega típicos → 16

**Hope Summers (Messias Mutante)** (extremo, 9)

- Copia QUALQUER Poder Mutante Perto (Sem Limite) — **20** · outro · mimetismo pareado aos poderes copiados (mutantes rua–Ômega, rotina ~20)
- Mantém Poderes Copiados Indefinidamente — **16** · duracao · retém poderes copiados indefinidamente; faixa Ômega baixa
- Sincroniza Múltiplos Poderes Simultaneamente — **18** · outro · combina vários poderes copiados; pareado ao mimetismo (20) menos o custo
- Melhora Poderes Copiados (Versão Ômega) — **22** · outro · eleva o poder copiado acima do original Ômega (~20) → 22
- Copia Poderes Não-Mutantes (Tecnologia, Magia) — **16** · outro · copia tecnologia/magia; pareado a armas/feitiços de rua alta
- Pode Controlar/Comandar Fênix — **25** (pico 31) · outro · hospedeira temporária da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Ressuscita Mutantes Mortos (Com Fênix) — **25** (pico 31) · resistencia · hospedeira temporária da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Cura Extinção Mutante (Luzes da Esperança) — **24** · area · texto: reacende o gene X no planeta (Luzes da Esperança) → global 24
- Precognição Tática (Treinamento Psíquico) — **8** · duracao · precognição tática treinada; faixa rua

**Jean Grey** (extremo, 9)

- Telecinese Molecular — **16** · outro · reorganiza matéria em escala molecular; não excede a telecinese (16)
- Pirocinese Cósmica — **20** (pico 96) · energia · depende da Fênix: rotina arrasa quarteirão/afunda navio → 20; pico consumiu estrela D'Bari (~2e27 t → 96)
- Manipulação de Matéria em Nível Atômico — **16** · outro · mesma manipulação molecular da telecinese (16)
- Viagem Interestelar pelo Pensamento — **25** (pico 51) · distancia · Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; literal interestelar (1 ano-luz = 51) em peak
- Ressurreição Auto-Induzida — **22** · resistencia · volta da morte (acima de 'volta de quase nada' 18-22) → 22
- Criação de Vida do Nada — **25** (pico 31) · outro · Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; faixa cósmica (31) em peak
- Chamas da Ressurreição — **22** · resistencia · mesma ressurreição da tag 'Ressurreição Auto-Induzida' → 22
- Cura Planetária — **23** · area · o texto é o feito: cura em escala planetária (global) → 23
- Transmutação de Energia Infinita — **25** (pico 31) · energia · Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; "infinita" (faixa cósmica 31) em peak

**Legion (David Haller)** (extremo, 14)

- Cada Personalidade = Poder Ômega Diferente — **25** · outro · cada persona porta um poder Ômega (faixa 16–30) → 25
- Centenas de Personalidades / Poderes — **25** · outro · amplitude de poderes Ômega, mesmo nível das personas → 25
- Jemail Karami (Telepatia) — **12** · distancia · telepatia de uma persona isolada ~cidade → 12
- Jack Wayne (Telecinese) — **12** · peso · TK de persona: ergue ~100 t (avião pequeno) → 12
- Cyndi (Pirocinese) — **12** · energia · incinera bunker/prédio → 12
- Sally (Teleporte) — **12** · distancia · teleporte ~11 km (cidade) → 12
- Karma (Absorção Psíquica) — **14** · outro · pareado a mentes de rua que possui/absorve → 14
- Delphie (Precognição) — **12** · duracao · precognição de persona, faixa rua alta → 12
- Chamber (Energia) — **12** · energia · rajadas psiônicas arruínam tanque/bunker → 12
- Styx (Morte/Entropia) — **18** · outro · consome mentes/vida ao toque; pareado a Corpo de super-humanos fortes → 18
- Moira (Realidade) — **13** · area · reescreve a realidade local ~cidade → 13 (igual Reescreve Realidade Local)
- Reescreve Realidade Local (Moira Persona) — **13** · area · raio local ~11 km (cidade) → 13
- Cria/Apaga Linhas Temporais — **30** (pico 40) · outro · Legion Quest gerou a Era do Apocalipse; topo Ômega → 30
- Onipotência Local Quando Personalidade Certa — **13** · area · mesmo raio local da reescrita da realidade → 13

**Magneto** (extremo, 2)

- Manipula Hemoglobina — **14** · outro · ignora armadura; pareado ao Corpo de super-humanos de rua
- Induz AVC ou Parada Cardíaca — **14** · outro · mesmo controle do ferro no sangue → 14

**Mastermind (Jason Wyngarde)** (extremo, 2)

- Ilusões Causam Dano Físico Real (Psicossomático) — **10** · outro · dano psicossomático ignora armadura; pareado a Corpo de rua (~10)
- Recursos / Influência Global — **12** · informacao · recursos/influência via elite global; menor que carisma de Magneto (14) → 12

**Miss Sinister (Claudine Renko)** (extremo, 1)

- Rede Espionagem Global — **23** · informacao · o texto é o feito: rede global ~11.000 km → 23

**Mister Sinister** (extremo, 6)

- Poderes Psiônicos e Telepatia Limitada — **6** · distancia · telepatia limitada ~campus 180 m → 6
- Imune a Telepatia — **21** · outro · ladder: pareado à telepatia Ômega de rotina (21); a ficção não o mostra segurando Xavier/Jean no auge
- Clones de Si Mesmo — **15** · outro · mantém clones funcionais de si: escala do gênio genético → 15
- Clones de Mutantes Poderosos — **18** · outro · clones de mutantes de nível Ômega (ex.: Madelyne): pareado a 16–20 → 18
- Transferência de Consciência — **16** · outro · transfere a mente entre corpos: base Ômega → 16
- Arquivo Genético Completo — **16** · informacao · = Acesso a DNA de quase todo mutante → 16

**Moondragon (Heather Douglas)** (extremo, 3)

- Telecinese Precisa Nível Molecular — **14** · outro · precisão molecular, força TK moderada; faixa rua alta → 14
- Projeção Astral Ofensiva/Defensiva — **16** · informacao · combate astral contra telepatas fortes, piso Ômega → 16
- Disciplina Mental Absoluta — **14** · outro · resistência mental de monja titã; pareado a telepatas de rua → 14

**Nate Grey (X-Man - Suprimido / Início)** (extremo, 4)

- Escudos Psíquicos Fortes — **18** · outro · pareado a ataques telepáticos fortes (rua alta–Ômega) → 18
- Projeção Astral — **14** · informacao · projeção astral; faixa Ômega baixa/rua alta
- Visões Futuro Próximo (Segundos/Minutos) — **8** · duracao · precognição de segundos/minutos; faixa rua
- Imune a Vírus Techno-Orgânico — **18** · outro · pareado ao vírus techno-orgânico (tecnologia Apocalipse/Falange ~18)

**Nate Grey (X-Man)** (extremo, 12)

- Telecinese Molecular/Atômica (Cria/Destrói Matéria) — **20** (pico 25) · peso · rotina: telecinese em escala de navio ~25 kt → 20; pico 25
- Manipulação Realidade Local (Altera Física/Probabilidade) — **20** · outro · altera física/probabilidade localmente (faixa Ômega) → 20
- Precognição Estratégica (Vê Futuro Imediato) — **12** · duracao · precognição de combate imediata; faixa rua alta → 12
- Projeção Astral Cósmica (Corpo de Energia Psiônica) — **23** · distancia · projeção astral em alcance planetário → 23
- Viagem Dimensional / Teletransporte Interestelar — **23** (pico 51) · distancia · entrada não-variante: rotina = teleporte global 23; literal interestelar (51) em peak
- Absorve/Projeta Energia Ilimitada (Solar/Psíquica) — **21** (pico 30) · energia · rotina: rajadas que arrasam quarteirão → 21; pico montanha (30)
- Imune a Manipulação Genética (Sinistro/Apocalipse) — **20** · outro · pareado à engenharia genética de Sinistro/Apocalipse (~20) → 20
- Restaura Mentes Quebradas (Legion, etc.) — **22** · outro · pareado a mentes Ômega quebradas como Legion (~22) → 22
- Comunicação com Espíritos/Plano Astral — **16** · informacao · comunicação com plano astral; faixa Ômega → 16
- Cura Física via Telecinese Molecular — **16** · resistencia · regenera órgãos/membros via telecinese molecular (13-16) → 16
- Vê Todas Linhas Temporais Simultaneamente — **25** (pico 31) · duracao · entrada não-variante: precognição em topo de Ômega (25); "todas as linhas" (31) em peak
- Prevê Ações Inimigas Antes de Acontecerem — **12** · duracao · mesma precognição imediata → 12

**Onslaught** (extremo, 10)

- Criou Realidade de Bolso (Era Heroes Reborn) — **60** · outro · universo de bolso com Terra inteira (faixa cósmica, via poder de Franklin) → 60
- Absorve Psiques/Poderes de Vítimas (Franklin, Nate) — **40** · outro · pareado aos poderes absorvidos (Nate Grey ~30, Franklin cósmico) → 40
- Projeção Astral Ofensiva = Dano Físico Real — **18** · energia · forma astral causa dano físico em heróis de topo (faixa Ômega) → 18
- Criou Corpos Físicos de Energia Psiônica — **22** · outro · corpo psiônico aguentou Vingadores+Quarteto (nuclear tático 22–24) → 22; = Professor X (Onslaught)
- Reescreve Realidade via Psique Coletiva — **40** · outro · alteração de realidade (faixa cósmica) → 40
- Cria Realidade de Bolso (Heroes Reborn) — **60** · outro · mesmo feito de Criou Realidade de Bolso → 60
- Cria Universos de Bolso Completos — **60** · outro · mesmo feito do universo de bolso → 60
- Reescreve Leis Físicas Locais — **40** · outro · alteração de realidade local (faixa cósmica) → 40
- Ressuscita Mortos como Servos Psíquicos — **30** · outro · reanimação psíquica (topo Ômega) → 30
- Manipula Tempo/Espaço no Bolso — **40** · outro · dentro do bolso: manipulação de tempo/espaço (faixa cósmica) → 40

**Professor X** (extremo, 6)

- Mestre em Xadrez Psíquico — **8** · informacao · xadrez + leitura telepática do oponente: acima do pico humano → 8
- Rede de Contatos Global — **20** · informacao · contatos em vários países/continentes (18–21) → 20
- Projeção Astral Corpórea — **20** · informacao · projeção astral que afeta o mundo físico, alcance continental → 20
- Arquivo Mental da História Mutante — **14** · informacao · conhecimento enciclopédico (rua alta) → 14
- Edição de Memória em Massa — **22** · informacao · edita memórias de multidões: = Reescrita de Personalidade → 22
- Sugestão Póstuma em Escala Global — **23** · distancia · o texto é o feito: global → 23

**Quentin Quire (Kid Omega)** (extremo, 8)

- Processa Pensamentos Velocidade da Luz — **18** · outro · pensamento hiperacelerado; faixa Ômega
- Constrói Mentes/Realidades Mentais — **18** · informacao · constrói realidades mentais; faixa Ômega
- Hackeia Tecnologia/Cérebros Via Telepatia — **14** · informacao · hackeia tecnologia/cérebros telepaticamente; faixa rua alta
- Sobrecarga Psíquica = Dano Físico Cerebral — **16** · outro · dano cerebral ignora armadura; pareado ao Corpo de super-humanos
- Telepatia Cósmica — **25** (pico 31) · informacao · hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Telecinese Molecular — **25** (pico 31) · outro · hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Chamas Fênix — **25** (pico 31) · energia · hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak
- Ressurreição — **25** (pico 31) · resistencia · hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak

**Rachel Summers** (extremo, 7)

- Anfitrião da Força Fênix — **22** · outro · Fênix ativa amplifica telepatia/telecinese ao nível Ômega alto → 22
- Telecinese Molecular — **16** · outro · manipulação molecular; não excede a telecinese (16)
- Chamas Cósmicas da Fênix — **20** · energia · chamas da Fênix arrasam quarteirão/afundam navio → 20 (igual a Jean)
- Viagem Temporal Psíquica — **22** · duracao · envia consciências décadas no tempo (Dias de um Futuro Esquecido); faixa Ômega → 22
- Ressurreição Auto-Induzida — **22** · resistencia · volta da morte → 22 (igual a Jean)
- Precognição Cósmica (Vê Linhas Temporais) — **20** · duracao · vê linhas temporais; faixa Ômega → 20
- Rastreadora do Futuro — **23** · distancia · extra; repete o rastreio de mutantes → 23

**Sersi (Eterna)** (extremo, 3)

- Transmutação Molecular/Atômica Absoluta — **30** (pico 32) · peso · umbrella ≥ sub-técnica "Reorganiza a Matéria de uma Cidade" (30, teto não-variante); rotina demonstrada ~100 kt (22); literal cidade ~10⁸ t (32) em peak
- Cria Vida / Seres Vivos do Nada — **20** · outro · cria seres vivos por transmutação: faixa Ômega → 20
- Voo / Projeção Energia Cósmica — **16** · energia · rajada cósmica de Eterna derruba prédio pequeno (16–18) → 16

**Shadow King (Amahl Farouk)** (extremo, 11)

- Possui Corpos / Mentes Simultaneamente — **18** · outro · possuiu população inteira da Ilha Muir e vários hospedeiros; faixa Ômega → 18
- Vive no Plano Astral (Imortalidade Efetiva) — **25** · duracao · existência astral milenar, faixa Ômega alta → 25
- Alimenta-se de Emoções Negativas (Medo/Ódio) — **12** · outro · fonte de poder emocional; faixa rua alta → 12
- Corrompe Telepatas (Mesmo Ômega) — **23** · outro · pareado a telepatas Ômega (Jean/Xavier ~23) → 23
- Sobrevive à Morte do Corpo Hospedeiro — **22** · resistencia · volta de quase nada (topo 18–22) → 22
- Controla Plano Astral Inteiro — **23** · area · ladder: domínio astral tratado como alcance global → 23
- Aprisiona Almas/Mentes no Astral — **23** · outro · prendeu a mente de Xavier; pareado ~23 → 23
- Cria Pesadelos Coletivos — **20** · area · pesadelos em massa ~país → 20
- Corrompe Heróis (Tempestade, Karma, Psylocke) — **20** · outro · pareado à vontade de heróis treinados contra telepatia (~20) → 20
- Implanta Personalidades Falsas — **20** · outro · reescrita de identidade, faixa Ômega → 20
- Gatilhos Pós-Hipnóticos Ocultos — **18** · informacao · escondidos até de telepatas fortes → 18

**Thena (Eterna)** (extremo, 2)

- Manipulação Matéria Cósmica (Igual Sersi) — **22** · outro · texto: igual a Sersi → pareado à transmutação de rotina demonstrada da Sersi (~100 kt = 22); o umbrella 30 da Sersi vem do feito de cidade, que Thena não tem
- Voo / Velocidade Luz / Teleporte — **14** · velocidade · voo de Eterna além da velocidade de escape ~40.000 km/h → 14 (texto exagera; teleporte de longo alcance)

**Agent Zero** (alto, 2)

- Traje de Supressão de Poderes — **10** · outro · anulação pareada aos graus de mutantes de rua típicos (~10)
- Fator de Cura — **9** · resistencia · fator de cura: ferimentos de bala em pouco tempo (9-12) → 9

**Bishop** (alto, 2)

- Rastreamento Temporal — **14** · outro · rastreia viajantes do tempo entre eras: faixa rua alta → 14
- Conhecimento de Eventos Futuros — **10** · informacao · conhece a linha do tempo futura (desatualizável): faixa rua → 10

**Blockbuster** (alto, 1)

- Resiliência Física — **11** · resistencia · mesma durabilidade de Força e Resistência Colossais (11): aguenta tanque

**Callisto** (alto, 1)

- Tentáculos Preênseis (pós-Mojo) — **4** · peso · tentáculos preênseis seguram/erguem ~340 kg

**Ciclope** (alto, 8)

- Velocidade da Luz — **18** · outro · propriedade da rajada (impossível de esquivar pela velocidade); km/h literal da luz (~1e9 km/h → 29) não é rotina de tag: pareado à rajada → 18
- KO Morbius, Besta, Hulcinha Cinza via Ricochete — **10** · outro · é o ricochete (10); o dano em si é da rajada (18)
- Cone de Área para Multialvos — **16** · energia · cone espalha a rajada: derruba vários Sentinelas, abaixo do feixe focado (18) → 16
- Propulsão / Fastball Special com Aliados — **4** · peso · impulsiona a si ou aliado (até Colossus ~230 kg) → 4
- Treina Novos Mutantes (Hope, Novos X-Men) — **8** · informacao · mentor de treino de poderes, faixa rua (= Jean Grey: Treina Controle de Poderes 8)
- Táticas Ópticas (Cone Área, Pulso Propulsão, Perfura Adamantium, Stun) — **18** · energia · extra; mesmas táticas ópticas (perfura adamantium) → 18
- Fortaleza Mental (Caixa Preta Intransponível, Prendeu Vazio, Resistiu Apocalipse/Brood) — **20** · outro · pareado à invasão mental de Apocalipse/Ninhada (~20) → 20
- Visor de Quartzo-Rubi (Micro-Interruptores, Visor Batalha > Óculos, Blackbird Amplifica) — **18** · outro · visor contém e modula a rajada inteira; pareado à rajada → 18

**Domino** (alto, 1)

- Campo de Sorte Probabilística — **14** · outro · pareado ao que anula: tiros erram, armas travam, golpes super-humanos desviam (rua alta) → 14

**Elixir** (alto, 3)

- Biomassa Negra — **14** · outro · mata/desfaz tecido por dentro, ignora armadura; pareado a Corpo de super-humanos de rua → 14
- Controle Molecular — **16** · outro · extra; mesma biocinese → 16
- Pode Matar com Toque — **14** · outro · extra; mesma Biomassa Negra → 14

**Estrela Polar** (alto, 1)

- Velocidade Supersónica — **12** · velocidade · voo de rotina hipersônico ~Mach 10 (~12.000 km/h) → 12

**Fera** (alto, 1)

- Patas e Presas — **7** · energia · garras/presas rasgam porta de aço/parede de tijolo (7–8) → 7

**Foxx** (alto, 2)

- Provocação e Manipulação Constantes — **7** · informacao · manipulação social hábil (rua baixa) → 7
- Rede de Contatos no Submundo — **14** · informacao · rede criminosa internacional de Mística (~metrópole → país) → 14

**Gentle** (alto, 2)

- Aumento Massivo de Tamanho sob Ameaça — **14** · peso · o crescimento é o veículo da força: mesma escala da força ~400 t → 14
- Regeneração Acelerada na Forma Ampliada — **9** · resistencia · regeneração acelerada: ferimentos de bala em minutos (9-12) → 9

**Havok** (alto, 4)

- Absorção de Energia Cósmica — **12** · outro · absorve radiação cósmica ambiente como combustível; pareado a fontes de radiação fortes → 12
- Sobrecarga Destrutiva — **20** · energia · descarga total arrasa quarteirão (19–21) → 20
- Liderança Relutante — **6** · informacao · mesma liderança (pico humano) → 6
- Criação de Estrelas Artificiais — **20** · energia · esfera de plasma arrasa quarteirão (19–21) → 20

**Hellion** (alto, 1)

- Próteses Controladas por Telecinese (perdeu as mãos) — **6** · outro · controle fino telecinético que substitui mãos: pico humano de destreza → 6

**Ícone** (alto, 1)

- Armadura de Gelo Instantânea — **10** · resistencia · armadura aguenta artilharia leve → 10

**Kid Omega** (alto, 2)

- Amplifica Temporariamente Poderes Próprios sob Estresse Extremo — **22** · outro · amplificação sob estresse leva telepatia perto do pico (24) → 22
- Visão Cínica que Antecipa as Fraquezas dos Outros — **6** · informacao · leitura de fraquezas alheias no pico humano → 6

**Loa** (alto, 2)

- Desintegração por Contato — **12** · outro · abre buracos em qualquer matéria que atravessa, ignora Corpo: pareado a blindagem de tanque → 12
- Ataque que Ignora Armaduras — **12** · outro · pareado a blindagem pesada (tanque 11–12) → 12

**M (Monet St. Croix)** (alto, 3)

- Intelecto Prodigioso — **12** · informacao · domina ciências em minutos, acima do gênio humano → 12
- Resiliência Física e Mental — **8** · resistencia · resiliência pós-trauma; durabilidade de corpo à prova de balas leve → 8
- Telepatia — **10** · distancia · extra; mesma telepatia ~3 km → 10

**Morbius** (alto, 1)

- Mordida Transforma Vítimas em Vampiros — **8** · outro · contamina vítimas com vampirismo; faixa rua

**Mystique** (alto, 3)

- Imortalidade Lenta — **10** · duracao · envelhecimento muito lento (mais de um século); faixa rua → 10
- Rede de Espionagem Global — **12** · informacao · rede de espionagem com alcance global, mas social → 12
- Rede de Espionagem — **12** · informacao · extra; mesma rede de espionagem → 12

**Polaris** (alto, 1)

- Manipulação de Sangue Ferroso — **12** · outro · ignora armadura via ferro do sangue; pareado a Corpo de rua (abaixo dos 14 de Magneto) → 12

**Psylocke** (alto, 1)

- Telecinesia Precisa — **5** · peso · TK fina, move ~0,7 t → 5

**Rogue** (alto, 1)

- Sentidos Aguçados — **6** · distancia · sentidos aguçados (Ms. Marvel) percebem a ~180 m → 6

**Sabretooth** (alto, 4)

- Visão Noturna — **6** · distancia · enxerga no breu a ~180 m → 6
- Conhece Fraquezas de Mutantes — **6** · informacao · conhecimento tático de inimigos (pico humano) → 6
- Imune a Dor — **8** · outro · ignora dor que derrubaria humanos; pareado a dano de rua → 8
- Resistência a Telepatia — **10** · outro · pareado a telepatas de rua (~8–12), cede a Ômegas → 10

**Sauron** (alto, 2)

- Transformação em Pterossauro Humanóide — **7** · peso · forma de pterossauro ergue ~3 t → 7
- Pterossauro — **7** · peso · extra; = Transformação em Pterossauro → 7

**Scalphunter** (alto, 1)

- Poder Mutante — **7** · outro · extra; rótulo do armeiro instintivo → 7

**Shatterstar** (alto, 1)

- Portais Dimensionais via Espadas — **12** · distancia · portais dimensionais pelas espadas; deslocamento ~11 km

**Trevor Fitzroy** (alto, 1)

- Viagem Temporal — **20** · outro · viagem temporal entre eras, faixa Ômega → 20 (não usa coluna Tempo)

**Wolverine** (alto, 4)

- Instinto Berserker — **8** · outro · fúria berserker; faixa rua
- Décadas de Experiência — **8** · outro · experiência de décadas; mesma faixa de veterano
- Séculos de Combate — **8** · outro · séculos de combate; mesma faixa de veterano
- Resistência a Telepatia — **12** · outro · mente reforçada/implantes; pareado a telepatas de rua (~12)

**Anole** (medio, 1)

- Garras e Aderência a Superfícies — **4** · outro · escala paredes/teto e corta com garras (atleta) → 4

**Aurora** (medio, 2)

- Voo Supersônico — **12** · velocidade · voo ~Mach 10 (~12.000 km/h) → 12, igual a Estrela Polar
- Luz Cegante quando em contato com Northstar — **6** · area · clarão cegante com o gêmeo cobre ~180 m → 6

**Avalanche** (medio, 1)

- Demolidor — **16** · energia · extra; derruba estruturas → 16

**Banshee** (medio, 2)

- Desorientação em Massa — **9** · energia · mesmo grito sônico (9) aplicado a um grupo
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

**Cameron Hodge** (medio, 1)

- Imortalidade Pela Preservação da Cabeça — **16** · resistencia · cabeça preservada "virtualmente indestrutível" (16–18) → 16

**Cannonball** (medio, 2)

- Liderança Natural e Leal — **5** · informacao · extra; = liderança de campo → 5
- Liderança Natural — **5** · informacao · extra; = liderança de campo → 5

**Dazzler** (medio, 1)

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

- Perna e Mão Protéticas de Alta Tecnologia (próprias) — **5** · outro · próteses de alta tecnologia com função de pico humano
- Xamã Cheyenne — **8** · outro · extra; mesmos rituais xamânicos → 8
- Visões Espirituais — **8** · informacao · visões xamânicas; faixa rua como Reconhece ameaças místicas (8)
- Magia Tecnológica — **8** · outro · rituais xamânicos aplicados à tecnologia; faixa rua como Xamã Cheyenne (8)
- Neutralizador de Mutantes — **16** · outro · Neutralizador pareado aos poderes que anulou (Tempestade ~16)

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

**Madrox** (medio, 2)

- Criação de Duplicatas ao Impacto — **10** · outro · extra; = criação de duplicatas → 10
- Absorção de Duplicatas com Memórias e Habilidades — **10** · informacao · extra; = reintegração → 10

**Marrow** (medio, 1)

- Dois Corações — **4** · resistencia · segundo coração: sobrevive a ferimento cardíaco → 4

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

**Mesmero** (medio, 3)

- Comandos Pós-Hipnóticos Permanentes — **10** · duracao · comandos pós-hipnóticos persistentes; faixa rua → 10
- Engana Telepatas (Ilusão de Controle) — **14** · outro · pareado a telepatas de rua alta (~14)
- Rede de Agentes Hipnotizados Globais — **12** · informacao · rede de agentes hipnotizados (alcance social global, não do poder) → 12

**Mira (Pinpoint)** (medio, 3)

- Localiza Assinaturas Energéticas — **10** · distancia · detecta assinaturas a ~3 km → 10
- Nunca se Perde (literalmente) — **8** · informacao · orientação infalível (faixa rua) → 8
- Raciocínio Analítico e Frio — **5** · informacao · análise fria de humano excepcional → 5

**Mirage** (medio, 1)

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

**Radian** (medio, 3)

- Absorção de Luz Ambiente para Recarregar o Poder — **4** · outro · recarrega com luz ambiente; utilidade faixa humana
- Refração que Desvia Ataques à Distância — **7** · resistencia · refração desvia ataques à distância (balas/rajadas de rua baixa) → 7
- Constructos Sólidos de Luz de Curta Duração — **5** · resistencia · constructos de luz breves: barreira de pico humano

**Redneck** (medio, 6)

- Golpes que Derrubam Estruturas — **8** · energia · derruba parede de tijolo / pequena estrutura (7–8) → 8
- Salto de Longa Distância com as Pernas Reforçadas — **4** · distancia · salto de ~45 m → 4
- Ancoragem Física para Resistir a Empurrões — **7** · outro · resiste a empurrões até sua força (~3 t) → 7
- Presença Intimidadora pelo Tamanho — **4** · informacao · intimidação física (humano alto) → 4
- Estabilidade Total ao Segurar Posição em Combate — **7** · outro · = ancoragem → 7
- Amortece Quedas de Grande Altura — **6** · resistencia · cai de ~30 m sem dano (pico humano+) → 6

**Rictor** (medio, 2)

- Desmorona Estruturas — **12** (pico 18) · energia · rotina: derruba estrutura reforçada/bunker (11–12) → 12; pico: terremoto que derruba prédio (18)
- Táticas de Guerrilha — **7** · informacao · infiltração/guerrilha da X-Force; faixa rua baixa → 7

**Rockslide** (medio, 3)

- Cabeça como Projétil — **8** · energia · arremessa a própria cabeça de rocha: derruba parede/vira caminhão (7–8) → 8
- Desmontagem e Remontagem Telecinética — **5** · distancia · extra; mesma desmontagem, ~90 m → 5
- Sem Sistema Nervoso Convencional — **8** · outro · imune a dor/golpes nervosos; pareado a ataques de rua → 8

**Roulette** (medio, 1)

- Discos de Sorte/Azar — **9** · outro · efeitos de sorte/azar até paralisia ao toque: pareado ao Corpo/Vontade de alvos de rua → 9

**Sage** (medio, 1)

- Pode Catalisar Mutações Latentes em Outros — **12** · outro · pareado a poderes latentes de rua que desperta → 12

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

**Siryn** (medio, 1)

- Frequência Hipnótica — **7** · informacao · compulsão hipnótica pela voz em humanos próximos → 7; = mesma tag do Banshee

**Slipstream** (medio, 1)

- Portais de Energia para Teletransporte — **18** (pico 22) · distancia · portais de onda cruzam ~1.000 km de rotina (estado/país) → 18; pico intercontinental

**Stacy X** (medio, 3)

- Feromonas — **9** · informacao · feromônios ao toque dominam emoções/corpo do alvo: pareado à Vontade de alvos de rua → 9
- Presença Sexual Dominante — **6** · informacao · presença social/sedução forte (pico humano) → 6
- Camuflagem de Pele — **7** · informacao · pele reptiliana se mistura ao ambiente (camuflagem parcial) → 7

**Sunspot** (medio, 1)

- Voo em Forma Solar — **8** · velocidade · extra; mesmo voo solar → 8

**Surge** (medio, 1)

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

**Timeslip** (medio, 2)

- Precognição Limitada ao Imediato — **6** · duracao · extra; precognição do imediato → 6
- Salto Temporal — **8** · duracao · extra; mesmo salto temporal → 8

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

**Wallflower** (medio, 1)

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

**Capitão Britânia** (?, 7)

- Campo de Força Bioenergético — **15** · resistencia · campo aguenta antitanque/derrubada de avião (13–15) → 15
- Resistência Mística — **12** · outro · pareado a magia de rua (~12)
- Resistência a Ataques Energéticos — **13** · resistencia · resiste a armas de energia típicas, abaixo de imunidade (Bishop 15) → 13
- Combate Corpo a Corpo — **6** · outro · lutador treinado: pico humano → 6
- Combate Aéreo — **6** · outro · manobra de combate em voo treinada: pico humano → 6
- Cientista e Engenheiro — **8** · informacao · físico/engenheiro de nível doutorado, acima do especialista comum (faixa rua) → 8
- Conhecimento de Fenômenos Interdimensionais — **10** · informacao · conhecimento do Multiverso/Otherworld além de qualquer especialista humano (rua) → 10

**Homem de Gelo** (?, 10)

- Redução Extrema de Temperatura — **14** · energia · leva o alvo a perto do zero absoluto: arruína alvo blindado (13–15) → 14
- Congelamento Instantâneo — **12** · energia · congela veículo/alvo blindado de imediato (tanque 11–12) → 12
- Criação de Barreiras de Gelo — **12** · resistencia · paredes de gelo grossas detêm fogo de tanque (11–12) → 12
- Aprisionamento em Gelo — **12** · outro · prisão de gelo pareada à força de super-humanos de rua (~12)
- Manipulação de Água Congelada — **18** · peso · move/remodela massas de gelo existentes na escala de suas estruturas ~6 kt → 18
- Congelamento em Área — **12** · area · congela área de raio ~11 km (= Controle de Temperatura) → 12
- Controle Ambiental — **12** · area · neve/frio regional em raio ~11 km → 12
- Pode Criar Duplicatas de Gelo — **10** · outro · duplicatas de gelo animadas lutam como capangas super-humanos (faixa rua) → 10
- Consciência Distribuída pelo Gelo — **12** · distancia · percebe através do gelo que controla, escala de cidade ~11 km → 12
- Controle Fino do Poder — **12** · outro · controle fino de gelo (esculturas, nível molecular), como Controle Fino de Metais da Polaris (12)

## Perigo: extremo

### Apocalipse (En Sabah Nur) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Manipulação Molecular do Próprio Corpo | 20 |  | outro | poder-assinatura Ômega: remodela o corpo inteiro em segundos (faixa Ômega 16–30) → 20 | media |
| Tecnologia Celestial | 22 |  | outro | nave/tecnologia Celestial: além da ciência terrestre em escala de porta-aviões (~100 kt) → 22 | baixa |
| Imortalidade Real | 20 |  | duracao | 5.000+ anos sem envelhecer; faixa Ômega (não pela coluna Tempo) → 20 | media |
| Altera Próprio Corpo a Nível Atômico | 20 |  | outro | mesma capacidade de Manipulação Molecular do Próprio Corpo → 20 | media |
| Aumenta Tamanho e Massa | 14 | 18 | peso | cresce a gigante de dezenas de metros; ergue ~400 t (747) de rotina → 14; pico ~6 kt → 18 | media |
| Cria Armas do Próprio Corpo | 13 |  | energia | lâminas/canhões do corpo cortam titânio e blindagem antitanque → 13 | media |
| Regeneração Instantânea | 18 |  | resistencia | regenera quase tudo instantaneamente (faixa 18–22) → 18 | media |
| Armadura Celestial Indestrutível | 20 |  | resistencia | armadura Celestial aguenta artilharia pesada/heróis de topo (19–21) → 20 | media |
| Teletransporte Interestelar | 23 | 51 | distancia | entrada base: rotina na Terra via nave = qualquer ponto do globo 23; literal interestelar (51) em peak | baixa |
| Acesso a Conhecimento Cósmico | 22 |  | informacao | conhecimento Celestial acumulado; muito além da ciência terrestre (faixa Ômega alta) → 22 | baixa |
| Os Quatro Cavaleiros | — |  | — | servos/relacionamento, não capacidade própria | alta |
| Darwinismo Social Extremo | — |  | — | ideologia | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Primeiro Mutante Registrado da Terra | — |  | — | histórico | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Pestilência (Fome) | — |  | — | cavaleiro (servo), não capacidade própria | media |
| Guerra (Conflito) | — |  | — | cavaleiro (servo), não capacidade própria | media |
| Fome (Escassez) | — |  | — | cavaleiro (servo), não capacidade própria | media |
| Morte (Fim) | — |  | — | cavaleiro (servo), não capacidade própria | media |
| Apocalipse os Empodera | 16 |  | outro | concede/amplifica poderes (Arcanjo, etc.) a nível Ômega baixo (16) → 16 | baixa |
| Primeiro Mutante _(extra)_ | — |  | — | histórico | alta |
| Sobrevivência do Mais Forte _(extra)_ | — |  | — | ideologia | alta |
| Juiz Universal _(extra)_ | — |  | — | papel/autoimagem | alta |
| Quatro Cavaleiros _(extra)_ | — |  | — | servos/relacionamento | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Cable (Nathan Summers) — geracaox

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Guerrilheiro de Elite | 6 |  | outro | décadas de guerra no futuro: soldado no pico humano → 6 | media |
| Armamento de Alto Calibre | 10 |  | energia | rifles de plasma do futuro partem blindado leve/concreto armado → 10 | media |
| Fundador da X-Force | — |  | — | histórico | alta |
| Braço e Olho Biônicos TOV | 8 |  | peso | braço TOV vira caminhão/ergue ~6 t → 8 | baixa |
| Telepatia e Telecinesia Suprimidas | — |  | — | restrição: poderes presos contendo o vírus TOV (fraqueza disfarçada) | media |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança da X-Force | 8 |  | informacao | comanda esquadrão de elite em operações (faixa rua) → 8 | media |
| Pai Adotivo de Hope Summers | — |  | — | relacionamento | alta |
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
| Membro da X-Force / X-Corp _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Cosmo (Cão Espacial) — heroi

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Alcance Interestelar | 51 |  | distancia | o texto é o feito: alcance interestelar ≥ 1 ano-luz → 51 | baixa |
| Telecinese Precisa (Apesar de Patas) | 6 |  | peso | segura pessoas/objetos com precisão (Rocket, Star-Lord) ~1 t → 6 | media |
| Escudos Psíquicos Protegem Knowhere | 11 |  | area | escudo psíquico cobre Knowhere (cabeça de Celestial, raio ~5 km) → 11 | baixa |
| Comunicação Interestelar Instantânea | 51 |  | distancia | o texto é o feito: comunicação interestelar ≥ 1 ano-luz → 51 | baixa |
| Estratégia Avançada | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Presença Imponente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Adaptabilidade Extrema | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Protege Estação Espacial Multiversal | — |  | — | papel/função narrativa | alta |
| Ligação com Guardiões da Galáxia | — |  | — | relacionamento | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Druig (Eterno) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle Mental em Escala Planetária | 23 |  | informacao | o texto é o feito: alcance global ~11.000+ km → 23 | media |
| Imortalidade / Regeneração Quase Absoluta | 20 |  | resistencia | Eterno: reconstitui-se de quase nada (18–22) → 20 | media |
| Voo Supersônico / Espacial | 14 |  | velocidade | voa ao espaço: velocidade de escape ~40.000 km/h → 14 (supersônico de rotina 10) | media |
| Manipulação Matéria/Energia Cósmica | 16 |  | energia | rajadas de energia cósmica de Eterno derrubam prédio pequeno → 16 | baixa |
| Imune a Doenças/Venenos/Envelhecimento | 16 |  | outro | imunidade binária de Eterno, pareada a toxinas/doenças super-humanas → 16 | media |
| Estratégia Avançada | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Presença Imponente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Adaptabilidade Extrema | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Manipula Governos/Ícones Históricos | 18 |  | informacao | influência em escala de país/estado → 18 | media |
| Rede Espionagem Milenar | 20 |  | informacao | rede de agentes em escala continental → 20 | baixa |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Emma Frost (Rainha Branca) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Professora Brutal | — |  | — | papel/personalidade | alta |
| Ex-Rainha do Clube do Inferno | — |  | — | histórico | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Telepatia Ômega | 21 | 23 | distancia | ladder: rotina Ômega sem amplificador, alcance continental ~5.000 km → 21; com Cérebro global 23 (peak) | media |
| Manipulação Psicológica Refinada | 14 |  | informacao | manipuladora de elite em política/Clube do Inferno, = Carisma do Magneto → 14 | media |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Forma de Diamante | 15 |  | resistencia | diamante orgânico aguenta antitanque/titânio (13–15) → 15; pode ser rachado | media |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Lealdade Feroz aos Alunos | — |  | — | relacionamento | alta |
| Mentora Brutal e Exigente | — |  | — | papel/personalidade | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Manipulação Psíquica Sutil | 16 |  | informacao | manipulação telepática indetectável: base da faixa Ômega → 16 | media |
| Mente Tática e Inescrupulosa | 9 |  | informacao | estrategista de elite (faixa rua) → 9 | baixa |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Leitura Mental Global | 23 |  | distancia | o texto é o feito: alcance global (23–24) → 23 | media |
| Controle Mental de Multidões | 18 |  | informacao | controla centenas/milhares de mentes de uma vez: faixa Ômega → 18 | baixa |
| Escudos Psíquicos Intransponíveis | 25 |  | outro | ladder: escudos que barram Xavier/Jean (telepatas Ômega) → 25; mesma capacidade de Resistência a Telepatia Alheia | media |
| Cirurgia Mental Precisa | 18 |  | informacao | edita mente/memória com precisão: faixa Ômega → 18 | media |
| Transferência de Consciência | 16 |  | outro | troca/transfere mentes: base da faixa Ômega → 16 | baixa |
| Bloqueio de Poderes Mutantes | 16 |  | outro | desliga poderes por via telepática: pareado a alvos rua/Ômega típicos → 16 | baixa |
| Ilusões Perfeitas | 18 |  | informacao | ilusões indistinguíveis da realidade: faixa Ômega → 18 | media |
| Professora Exigente e Eficaz _(extra)_ | — |  | — | papel/personalidade | alta |
| Lealdade aos Alunos _(extra)_ | — |  | — | relacionamento | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Hope Summers (Messias Mutante) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Copia QUALQUER Poder Mutante Perto (Sem Limite) | 20 |  | outro | mimetismo pareado aos poderes copiados (mutantes rua–Ômega, rotina ~20) | baixa |
| Mantém Poderes Copiados Indefinidamente | 16 |  | duracao | retém poderes copiados indefinidamente; faixa Ômega baixa | baixa |
| Sincroniza Múltiplos Poderes Simultaneamente | 18 |  | outro | combina vários poderes copiados; pareado ao mimetismo (20) menos o custo | baixa |
| Melhora Poderes Copiados (Versão Ômega) | 22 |  | outro | eleva o poder copiado acima do original Ômega (~20) → 22 | baixa |
| Copia Poderes Não-Mutantes (Tecnologia, Magia) | 16 |  | outro | copia tecnologia/magia; pareado a armas/feitiços de rua alta | baixa |
| Atrai Força Fênix Naturalmente | — |  | — | vínculo narrativo com a Fênix | media |
| Pode Controlar/Comandar Fênix | 25 | 31 | outro | hospedeira temporária da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Ressuscita Mutantes Mortos (Com Fênix) | 25 | 31 | resistencia | hospedeira temporária da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Cura Extinção Mutante (Luzes da Esperança) | 24 |  | area | texto: reacende o gene X no planeta (Luzes da Esperança) → global 24 | baixa |
| Inspira Lealdade Fanática (Luzes) | 10 |  | informacao | lealdade fanática das Luzes; faixa rua | media |
| Estrategista Nata / Treinada por Cable | 9 |  | informacao | estrategista treinada por Cable; faixa rua | media |
| Simbolo de Esperança Unifica Facções | 12 |  | informacao | símbolo que une facções mutantes; faixa rua alta | media |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Armas Avançadas / Combate Corpo-a-Corpo | 7 |  | energia | armas avançadas/corpo-a-corpo: fuzil 5–7 → 7 | media |
| Sobrevivência Extrema / Táticas Guerrilha | 8 |  | outro | sobrevivência extrema/guerrilha; acima do pico humano | media |
| Precognição Tática (Treinamento Psíquico) | 8 |  | duracao | precognição tática treinada; faixa rua | baixa |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Jean Grey (Marvel Girl / Fênix) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia de Nível Ômega | 21 | 23 | distancia | ladder: rotina Ômega continental ~5.000 km → 21; pico global 23 | media |
| Anfitrião da Força Fênix | — |  | — | Fênix latente segundo a descrição; feitos da Fênix graduados nas tags específicas | media |
| Elo Psíquico com Scott Summers | — |  | — | relacionamento (elo psíquico com Scott) | alta |
| Telecinesia Precisa e Devastadora | 16 | 22 | peso | rotina: ergue Sentinelas/estruturas de prédio ~1.500 t → 16; pico porta-aviões (22) | media |
| Empatia Profunda | 12 |  | informacao | sente emoções em escala de cidade (~11 km) → 12 | media |
| Potencial Ômega não totalmente desbloqueado | — |  | — | latente | alta |
| Elo Psíquico com Ciclope | — |  | — | relacionamento (elo psíquico com Ciclope) | alta |
| Mentora de Jovens Mutantes | — |  | — | papel social | alta |
| Poder Latente Além da Compreensão | — |  | — | latente | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Telepatia Ômega Absoluta | 21 | 23 | distancia | mesma telepatia da tag "Telepatia de Nível Ômega" → 21; pico global 23 | media |
| Telecinese Molecular | 16 |  | outro | reorganiza matéria em escala molecular; não excede a telecinese (16) | baixa |
| Pirocinese Cósmica | 20 | 96 | energia | depende da Fênix: rotina arrasa quarteirão/afunda navio → 20; pico consumiu estrela D'Bari (~2e27 t → 96) | baixa |
| Manipulação de Matéria em Nível Atômico | 16 |  | outro | mesma manipulação molecular da telecinese (16) | baixa |
| Viagem Interestelar pelo Pensamento | 25 | 51 | distancia | Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; literal interestelar (1 ano-luz = 51) em peak | baixa |
| Ressurreição Auto-Induzida | 22 |  | resistencia | volta da morte (acima de 'volta de quase nada' 18-22) → 22 | baixa |
| Conexão com a Força Fênix | — |  | — | Fênix latente; mesma conexão de 'Anfitrião da Força Fênix' | media |
| Criação de Vida do Nada | 25 | 31 | outro | Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; faixa cósmica (31) em peak | baixa |
| Chamas da Ressurreição | 22 |  | resistencia | mesma ressurreição da tag 'Ressurreição Auto-Induzida' → 22 | baixa |
| Purificação de Mentes Corrompidas | 20 |  | informacao | limpa corrupção mental de nível Ômega (faixa 16-30) → 20 | media |
| Cura Planetária | 23 |  | area | o texto é o feito: cura em escala planetária (global) → 23 | baixa |
| Juízo Cósmico | — |  | — | temático/narrativo, sem feito mensurável | media |
| Transmutação de Energia Infinita | 25 | 31 | energia | Fênix latente: tag tocada pela Fênix em hospedeira latente = 25; "infinita" (faixa cósmica 31) em peak | baixa |
| Elo Psíquico com Scott _(extra)_ | — |  | — | relacionamento (elo com Scott) | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Legion (David Haller) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Cada Personalidade = Poder Ômega Diferente | 25 |  | outro | cada persona porta um poder Ômega (faixa 16–30) → 25 | baixa |
| Telepatia, Telecinese, Pirocinese, Realidade, Tempo | 23 |  | distancia | ladder: telepatia Ômega bruta de alcance global → 23 | media |
| Centenas de Personalidades / Poderes | 25 |  | outro | amplitude de poderes Ômega, mesmo nível das personas → 25 | baixa |
| Personalidade Dominante Controla Acesso | — |  | — | mecânica/restrição, não feito | alta |
| Jemail Karami (Telepatia) | 12 |  | distancia | telepatia de uma persona isolada ~cidade → 12 | baixa |
| Jack Wayne (Telecinese) | 12 |  | peso | TK de persona: ergue ~100 t (avião pequeno) → 12 | baixa |
| Cyndi (Pirocinese) | 12 |  | energia | incinera bunker/prédio → 12 | baixa |
| Sally (Teleporte) | 12 |  | distancia | teleporte ~11 km (cidade) → 12 | baixa |
| Karma (Absorção Psíquica) | 14 |  | outro | pareado a mentes de rua que possui/absorve → 14 | baixa |
| Delphie (Precognição) | 12 |  | duracao | precognição de persona, faixa rua alta → 12 | baixa |
| Chamber (Energia) | 12 |  | energia | rajadas psiônicas arruínam tanque/bunker → 12 | baixa |
| Styx (Morte/Entropia) | 18 |  | outro | consome mentes/vida ao toque; pareado a Corpo de super-humanos fortes → 18 | baixa |
| Moira (Realidade) | 13 |  | area | reescreve a realidade local ~cidade → 13 (igual Reescreve Realidade Local) | baixa |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Reescreve Realidade Local (Moira Persona) | 13 |  | area | raio local ~11 km (cidade) → 13 | baixa |
| Cria/Apaga Linhas Temporais | 30 | 40 | outro | Legion Quest gerou a Era do Apocalipse; topo Ômega → 30 | baixa |
| Onipotência Local Quando Personalidade Certa | 13 |  | area | mesmo raio local da reescrita da realidade → 13 | baixa |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Magneto (Erik Magnus Lehnsherr) — irmandade

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
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Sobrevivente de Auschwitz | — |  | — | histórico, não é capacidade | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Visão de Supremacia Mutante | — |  | — | ideologia | alta |
| Carisma Revolucionário | 14 |  | informacao | lidera Irmandade/Genosha (influência hemisférica) | media |
| Anti-Vilão a Anti-Herói | — |  | — | arco narrativo | alta |
| Campo de Força Magnético _(extra)_ | 19 |  | resistencia | extra; mesmo Campo de Força Magnético Pessoal | media |
| Voo Magnético _(extra)_ | 10 |  | velocidade | extra; mesmo voo de Voo por Levitação Magnética | media |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Mastermind (Jason Wyngarde) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Ilusões Perfeitas Enganam Todos Sentidos | 18 |  | informacao | ilusões multissensoriais que enganam até Ômegas (faixa Ômega) → 18 | media |
| Afeta Mentes Globalmente (Alcance Planetário) | 23 |  | distancia | o texto é o feito: alcance planetário (global) → 23 | media |
| Cria Realidades Alternativas Indistinguíveis | 18 |  | informacao | mesmo nível das ilusões perfeitas → 18 | media |
| Ilusões Causam Dano Físico Real (Psicossomático) | 10 |  | outro | dano psicossomático ignora armadura; pareado a Corpo de rua (~10) | baixa |
| Engana Telepatas Ômega (Xavier, Jean, Emma) | 23 |  | outro | ladder: enganou Jean/Xavier = rivaliza telepata Ômega → 23 | media |
| Estratégia Avançada | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Presença Imponente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Adaptabilidade Extrema | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Recursos / Influência Global | 12 |  | informacao | recursos/influência via elite global; menor que carisma de Magneto (14) → 12 | baixa |
| Acesso Tecnologia Proibida | — |  | — | equipamento vago | media |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Miss Sinister (Claudine Renko) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Genética Sinister Completa (Memórias/Habilidades) | 14 |  | informacao | herda o saber genético de Sinister: além da ciência terrestre (13–15) → 14 | media |
| Corpo Diamante Sintético (Como Sinister) | 15 |  | resistencia | forma de diamante: aguenta antitanque/titânio (13–15) → 15; = família diamante (Emma/Sinister) | media |
| Clonagem Instantânea / Corpos Reserva | 18 |  | resistencia | volta da morte em corpo reserva (18–22) → 18 | media |
| Engenharia Genética Divina | 15 |  | informacao | cria vida/poderes sob medida: além da ciência terrestre (13–15) → 15 | media |
| Imune a Telepatia (Diamante) | 21 |  | outro | ladder: pareado à rotina Ômega da Emma (21); = imunidade do Mister Sinister | media |
| Estratégia Avançada | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Presença Imponente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Adaptabilidade Extrema | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Comando Clones Mutantes Poderosos | — |  | — | servos/relacionamento | media |
| Rede Espionagem Global | 23 |  | informacao | o texto é o feito: rede global ~11.000 km → 23 | baixa |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Mister Sinister (Nathaniel Essex) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Gênio de Genética Mutante | 15 |  | informacao | maior geneticista do planeta, além da ciência terrestre (13–15) → 15 | media |
| Imortalidade e Regeneração | 16 |  | resistencia | regenera membros/órgãos e vive há séculos (13–16) → 16 | media |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Clonagem e Manipulação Genética | 15 |  | informacao | clonagem de mutantes completos, mesma escala do gênio → 15 | media |
| Poderes Psiônicos e Telepatia Limitada | 6 |  | distancia | telepatia limitada ~campus 180 m → 6 | baixa |
| Obsessão com Linhagem Summers/Grey | — |  | — | fraqueza/obsessão | alta |
| Obsessão Científica Cega à Ética | — |  | — | fraqueza | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Corpo de Diamante Sintético | 15 |  | resistencia | corpo de diamante (= Forma de Diamante da Emma) aguenta antitanque → 15 | media |
| Imune a Telepatia | 21 |  | outro | ladder: pareado à telepatia Ômega de rotina (21); a ficção não o mostra segurando Xavier/Jean no auge | baixa |
| Força Sobre-humana | 9 |  | peso | ergue ~10–13 t → 9 | media |
| Clones de Si Mesmo | 15 |  | outro | mantém clones funcionais de si: escala do gênio genético → 15 | baixa |
| Clones de Mutantes Poderosos | 18 |  | outro | clones de mutantes de nível Ômega (ex.: Madelyne): pareado a 16–20 → 18 | baixa |
| Transferência de Consciência | 16 |  | outro | transfere a mente entre corpos: base Ômega → 16 | baixa |
| Arquivo Genético Completo | 16 |  | informacao | = Acesso a DNA de quase todo mutante → 16 | baixa |
| Previu Chegada de Mutantes Ômega | — |  | — | histórico | media |
| Manipulou Linhagem Summers por Gerações | — |  | — | histórico | alta |
| Manipulador Genético _(extra)_ | 15 |  | informacao | extra; = Clonagem e Manipulação Genética | media |
| Clonagem _(extra)_ | 15 |  | informacao | extra; = Clonagem e Manipulação Genética | media |
| Marotos _(extra)_ | — |  | — | afiliação/equipe | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Moondragon (Heather Douglas) — heroi

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Nível Cósmico (Rivaliza Xavier) | 23 |  | distancia | rivaliza Xavier com Cérebro: global → 23 | media |
| Telecinese Precisa Nível Molecular | 14 |  | outro | precisão molecular, força TK moderada; faixa rua alta → 14 | baixa |
| Projeção Astral Ofensiva/Defensiva | 16 |  | informacao | combate astral contra telepatas fortes, piso Ômega → 16 | baixa |
| Controle Mental Global | 23 |  | distancia | ladder: o texto é o feito, alcance global → 23 | media |
| Imune a Telepatia/Controle Mental | 23 |  | outro | pareado à telepatia de Xavier com Cérebro ~23 → 23 | media |
| Estratégia Avançada | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Presença Imponente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Adaptabilidade Extrema | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Combate Corpo-a-Corpo Nível Mestre | 7 |  | outro | mestra marcial treinada por Titãs, acima do pico humano → 7 | media |
| Disciplina Mental Absoluta | 14 |  | outro | resistência mental de monja titã; pareado a telepatas de rua → 14 | baixa |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Nate Grey (X-Man - Suprimido / Início) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Leitura Mental Alcance Continental | 21 |  | informacao | texto: alcance continental ~5.000 km → 21 | media |
| Telecinese Levita Edifícios | 19 |  | peso | texto: levita edifícios, prédio ~6–12 kt → 18–19 → 19 | media |
| Escudos Psíquicos Fortes | 18 |  | outro | pareado a ataques telepáticos fortes (rua alta–Ômega) → 18 | baixa |
| Projeção Astral | 14 |  | informacao | projeção astral; faixa Ômega baixa/rua alta | baixa |
| Visões Futuro Próximo (Segundos/Minutos) | 8 |  | duracao | precognição de segundos/minutos; faixa rua | baixa |
| Sente Perigo Iminente | 7 |  | outro | sentido de perigo; acima do pico humano | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Potencial Ilimitado (Sem Vírus T-O) | — |  | — | potencial latente | alta |
| Imune a Vírus Techno-Orgânico | 18 |  | outro | pareado ao vírus techno-orgânico (tecnologia Apocalipse/Falange ~18) | baixa |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Táticas Guerrilha / Emboscada | 8 |  | informacao | guerrilheiro veterano da Era de Apocalipse; faixa rua | media |
| Resistência Mental a Tortura/Lavagem Cerebral | 10 |  | outro | resistência mental a tortura/lavagem; pareado a interrogatório/telepatia de rua | media |
| Conhecimento Tecnologia Apocalipse | 12 |  | informacao | conhece tecnologia de Apocalipse; faixa rua alta | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Nate Grey (X-Man) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Planetária/Cósmica (Sem Vírus T-O) | 23 | 27 | distancia | rotina: telepatia global ~20-40 mil km → 23; pico cósmico (27) | media |
| Telecinese Molecular/Atômica (Cria/Destrói Matéria) | 20 | 25 | peso | rotina: telecinese em escala de navio ~25 kt → 20; pico 25 | baixa |
| Manipulação Realidade Local (Altera Física/Probabilidade) | 20 |  | outro | altera física/probabilidade localmente (faixa Ômega) → 20 | baixa |
| Precognição Estratégica (Vê Futuro Imediato) | 12 |  | duracao | precognição de combate imediata; faixa rua alta → 12 | baixa |
| Projeção Astral Cósmica (Corpo de Energia Psiônica) | 23 |  | distancia | projeção astral em alcance planetário → 23 | baixa |
| Viagem Dimensional / Teletransporte Interestelar | 23 | 51 | distancia | entrada não-variante: rotina = teleporte global 23; literal interestelar (51) em peak | baixa |
| Absorve/Projeta Energia Ilimitada (Solar/Psíquica) | 21 | 30 | energia | rotina: rajadas que arrasam quarteirão → 21; pico montanha (30) | baixa |
| Genética Ômega Pura (Sem Vírus T-O) | — |  | — | rótulo genético, não é feito | alta |
| Potencial Igual/Supere Mãe (Jean Grey) | — |  | — | potencial latente | alta |
| Imune a Manipulação Genética (Sinistro/Apocalipse) | 20 |  | outro | pareado à engenharia genética de Sinistro/Apocalipse (~20) → 20 | baixa |
| Cura Trauma Mental/PTSD em Massa | 12 |  | informacao | cura trauma em massa (população de cidade ~11 km) → 12 | media |
| Restaura Mentes Quebradas (Legion, etc.) | 22 |  | outro | pareado a mentes Ômega quebradas como Legion (~22) → 22 | baixa |
| Comunicação com Espíritos/Plano Astral | 16 |  | informacao | comunicação com plano astral; faixa Ômega → 16 | baixa |
| Cura Física via Telecinese Molecular | 16 |  | resistencia | regenera órgãos/membros via telecinese molecular (13-16) → 16 | baixa |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Vê Todas Linhas Temporais Simultaneamente | 25 | 31 | duracao | entrada não-variante: precognição em topo de Ômega (25); "todas as linhas" (31) em peak | baixa |
| Prevê Ações Inimigas Antes de Acontecerem | 12 |  | duracao | mesma precognição imediata → 12 | baixa |
| Alerta Psíquico Global (Ameaças Cósmicas) | 23 |  | distancia | o texto é o feito: alerta global → 23 | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Onslaught — vilao

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
| Manipula Espectro Eletromagnético Total | 25 |  | energia | mesma escala do magnetismo de Magneto (25) → 25 | media |
| Move Asteroides / Inverte Polos Magnéticos | 36 |  | peso | o texto é o feito: asteroide ~1 km ~1,5 Gt → 36 | media |
| Escudo Magnético Planetário | 21 |  | area | o texto é o feito: raio da Terra ~6.400 km → 21 | alta |
| Extrai Adamantium de Wolverine | 18 |  | outro | pareado ao Esqueleto de Adamantium (16–18) → 18 | alta |
| Acesso Bilhões Mentes Simultaneamente | 23 |  | informacao | ladder: bilhões de mentes = alcance global → 23 | media |
| Reescreve Realidade via Psique Coletiva | 40 |  | outro | alteração de realidade (faixa cósmica) → 40 | baixa |
| Cria Realidade de Bolso (Heroes Reborn) | 60 |  | outro | mesmo feito de Criou Realidade de Bolso → 60 | baixa |
| Bloqueia Telepatas Nível Ômega (Xavier/Jean/Emma) | 25 |  | outro | pareado à telepatia Ômega de Xavier/Jean/Emma (~24) → 25 | media |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Cria Universos de Bolso Completos | 60 |  | outro | mesmo feito do universo de bolso → 60 | baixa |
| Reescreve Leis Físicas Locais | 40 |  | outro | alteração de realidade local (faixa cósmica) → 40 | baixa |
| Ressuscita Mortos como Servos Psíquicos | 30 |  | outro | reanimação psíquica (topo Ômega) → 30 | baixa |
| Manipula Tempo/Espaço no Bolso | 40 |  | outro | dentro do bolso: manipulação de tempo/espaço (faixa cósmica) → 40 | baixa |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Professor X (Charles Xavier) — x-men

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
| Recrutador da Primeira Geração | — |  | — | histórico/papel, não é capacidade (como Fundador do Instituto Xavier) | alta |
| Criador do Instituto Xavier | — |  | — | histórico; = Fundador do Instituto Xavier (null) | alta |
| Mentor de Líderes Mutantes | — |  | — | papel; como Criou Gerações de Mutantes / Legado Vive nos Alunos (null) | alta |
| Diplomata da Coexistência | 12 |  | informacao | mesma diplomacia de Diplomacia Mutante-Humano (12) | media |
| Líder dos X-Men _(extra)_ | — |  | — | papel | alta |
| Intelecto Genial _(extra)_ | 14 |  | informacao | gênio em genética/psicologia (construiu o Cérebro) → 14; = Intelecto Genial do Fera (mesma tag) | media |
| Diplomacia Mutante-Humano _(extra)_ | 12 |  | informacao | extra; = Diplomata da Coexistência | media |
| Idealismo Inabalável _(extra)_ | — |  | — | ideologia | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Quentin Quire (Kid Omega) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Processa Pensamentos Velocidade da Luz | 18 |  | outro | pensamento hiperacelerado; faixa Ômega | baixa |
| Leitura Mental Global Simultânea | 23 |  | informacao | ladder: o texto é o feito, leitura global → 23 | media |
| Constrói Mentes/Realidades Mentais | 18 |  | informacao | constrói realidades mentais; faixa Ômega | baixa |
| Hackeia Tecnologia/Cérebros Via Telepatia | 14 |  | informacao | hackeia tecnologia/cérebros telepaticamente; faixa rua alta | baixa |
| Sobrecarga Psíquica = Dano Físico Cerebral | 16 |  | outro | dano cerebral ignora armadura; pareado ao Corpo de super-humanos | baixa |
| Telepatia Cósmica | 25 | 31 | informacao | hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Telecinese Molecular | 25 | 31 | outro | hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Chamas Fênix | 25 | 31 | energia | hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Ressurreição | 25 | 31 | resistencia | hospedeiro temporário da Fênix: tag tocada pela Fênix = 25; faixa cósmica (31) em peak | baixa |
| Processa Informação Velocidade Super-Humana | 12 |  | informacao | processa informação sobre-humana; faixa rua alta | media |
| Poliglota Instantâneo / Baixa Conhecimento | 12 |  | informacao | baixa conhecimento/línguas telepaticamente; faixa rua alta | media |
| Estrategista Tático Imbatível (Mente) | 10 |  | informacao | estrategista; faixa rua | media |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Carisma Manipulador / Recruta Seguidores | 9 |  | informacao | carisma manipulador, recruta a Omega Gang; faixa rua | media |
| Terrorismo Psíquico / Anarquia | — |  | — | ideologia/comportamento | media |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Rachel Summers (Fênix / Marvel Girl) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Anfitrião da Força Fênix | 22 |  | outro | Fênix ativa amplifica telepatia/telecinese ao nível Ômega alto → 22 | baixa |
| Rastreadora de Mutantes | 23 |  | distancia | umbrella ≥ sub-técnica "Rastreamento Psíquico de Qualquer Mutante no Planeta" (23): rastreio global → 23 | media |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Telepatia Ômega | 21 | 23 | distancia | ladder: rotina Ômega continental ~5.000 km → 21 (igual a Jean); pico global 23 | media |
| Telecinesia Devastadora | 16 | 22 | peso | telecinese em escala de prédio pequeno ~1.500 t → 16 (igual a Jean) | media |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rastreadora Mutante Implacável | 23 |  | distancia | mesmo rastreio de Rastreadora de Mutantes → 23 | media |
| Determinação Inabalável | — |  | — | traço de personalidade | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Laço Familiar com Cable | — |  | — | relacionamento | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Telepatia Ômega (Linha Temporal Alternativa) | 21 | 23 | distancia | mesma telepatia Ômega → 21; pico global 23 | media |
| Telecinese Molecular | 16 |  | outro | manipulação molecular; não excede a telecinese (16) | baixa |
| Chamas Cósmicas da Fênix | 20 |  | energia | chamas da Fênix arrasam quarteirão/afundam navio → 20 (igual a Jean) | baixa |
| Viagem Temporal Psíquica | 22 |  | duracao | envia consciências décadas no tempo (Dias de um Futuro Esquecido); faixa Ômega → 22 | baixa |
| Ressurreição Auto-Induzida | 22 |  | resistencia | volta da morte → 22 (igual a Jean) | baixa |
| Precognição Cósmica (Vê Linhas Temporais) | 20 |  | duracao | vê linhas temporais; faixa Ômega → 20 | baixa |
| Leitura Mental Global / Interestelar | 23 | 51 | distancia | entrada não-variante: leitura global = 23 (ladder); o literal interestelar (51) vai para peak | media |
| Projeção Astral Combatente | 18 |  | informacao | combate astral contra Ômegas; faixa Ômega → 18 | media |
| Bloqueio Mental Absoluto (Resistiu Xavier/Emma) | 25 |  | outro | ladder: o texto diz que resistiu a Xavier/Emma → 25 | media |
| Comando Mental em Massa | 14 |  | area | comanda multidão/metrópole parcial (~45 km) → 14 | media |
| Link Psíquico Permanente com Cable/Mãe | — |  | — | relacionamento | alta |
| Rastreadora do Futuro _(extra)_ | 23 |  | distancia | extra; repete o rastreio de mutantes → 23 | baixa |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Sersi (Eterna) — heroi

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transmutação Molecular/Atômica Absoluta | 30 | 32 | peso | umbrella ≥ sub-técnica "Reorganiza a Matéria de uma Cidade" (30, teto não-variante); rotina demonstrada ~100 kt (22); literal cidade ~10⁸ t (32) em peak | baixa |
| Transforma Qualquer Coisa em Qualquer Coisa | 30 | 32 | peso | = Transmutação Molecular (umbrella) → 30; peak 32 | media |
| Cria Vida / Seres Vivos do Nada | 20 |  | outro | cria seres vivos por transmutação: faixa Ômega → 20 | baixa |
| Imortalidade / Regeneração Absoluta | 22 |  | resistencia | Eterna regenera de quase nada (topo 18–22) → 22 | media |
| Voo / Projeção Energia Cósmica | 16 |  | energia | rajada cósmica de Eterna derruba prédio pequeno (16–18) → 16 | baixa |
| Ilusões Perfeitas (Manipula Luz/Matéria) | 18 |  | informacao | ilusões de luz/matéria indistinguíveis: faixa Ômega → 18 | media |
| Estratégia Avançada | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Presença Imponente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Adaptabilidade Extrema | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Influência Social / Festa / Carisma Divino | 14 |  | informacao | carisma milenar, influência social de elite (= Magneto 14) → 14 | media |
| História Milenar / Conhecimento Antigo | 13 |  | informacao | milênios de conhecimento acumulado (rua alta) → 13 | media |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Shadow King (Amahl Farouk) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telepatia Nível Cósmico (Rivaliza Xavier) | 23 |  | distancia | rivaliza Xavier com Cérebro: global → 23 | media |
| Possui Corpos / Mentes Simultaneamente | 18 |  | outro | possuiu população inteira da Ilha Muir e vários hospedeiros; faixa Ômega → 18 | baixa |
| Vive no Plano Astral (Imortalidade Efetiva) | 25 |  | duracao | existência astral milenar, faixa Ômega alta → 25 | baixa |
| Alimenta-se de Emoções Negativas (Medo/Ódio) | 12 |  | outro | fonte de poder emocional; faixa rua alta → 12 | baixa |
| Cria Ilusões Perfeitas / Mundos Mentais | 22 |  | informacao | engana até Xavier; pareado a telepatas Ômega → 22 | media |
| Corrompe Telepatas (Mesmo Ômega) | 23 |  | outro | pareado a telepatas Ômega (Jean/Xavier ~23) → 23 | baixa |
| Sobrevive à Morte do Corpo Hospedeiro | 22 |  | resistencia | volta de quase nada (topo 18–22) → 22 | baixa |
| Controla Plano Astral Inteiro | 23 |  | area | ladder: domínio astral tratado como alcance global → 23 | baixa |
| Aprisiona Almas/Mentes no Astral | 23 |  | outro | prendeu a mente de Xavier; pareado ~23 → 23 | baixa |
| Manipula Sonhos Globais | 23 |  | distancia | ladder: o texto é o feito, alcance global → 23 | media |
| Cria Pesadelos Coletivos | 20 |  | area | pesadelos em massa ~país → 20 | baixa |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Corrompe Heróis (Tempestade, Karma, Psylocke) | 20 |  | outro | pareado à vontade de heróis treinados contra telepatia (~20) → 20 | baixa |
| Implanta Personalidades Falsas | 20 |  | outro | reescrita de identidade, faixa Ômega → 20 | baixa |
| Gatilhos Pós-Hipnóticos Ocultos | 18 |  | informacao | escondidos até de telepatas fortes → 18 | baixa |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Thena (Eterna) — heroi

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Determinação Inabalável | — |  | — | personalidade | alta |
| Reflexos Sobre-Humanos | 9 |  | outro | reflexos sobre-humanos de Eterna; faixa rua | media |
| Resistência Mental Superior | 10 |  | outro | resistência mental de Eterna; pareado a telepatia de rua | media |
| Estratégia Avançada | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Presença Imponente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Adaptabilidade Extrema | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação Matéria Cósmica (Igual Sersi) | 22 |  | outro | texto: igual a Sersi → pareado à transmutação de rotina demonstrada da Sersi (~100 kt = 22); o umbrella 30 da Sersi vem do feito de cidade, que Thena não tem | baixa |
| Armas Cósmicas Manifesta da Mente | 14 |  | energia | armas cósmicas mentais: cortam titânio/blindagem (13–15) | media |
| Voo / Velocidade Luz / Teleporte | 14 |  | velocidade | voo de Eterna além da velocidade de escape ~40.000 km/h → 14 (texto exagera; teleporte de longo alcance) | baixa |
| Imortalidade / Invulnerabilidade Quase Total | 18 |  | resistencia | Eterna: aguenta derrubada de prédio/regenera de quase nada (16–18) | media |
| Conhecimento Estratégico Milenar | 12 |  | informacao | estratégia acumulada em milênios; faixa rua alta | media |
| Mutante de Niveau Ômega ou Equivalente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Décadas de Experiência de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mestre Tático _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade Indomável _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Contatos e Aliados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Ameaça Nível Global _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |

## Perigo: alto

### Agent Zero (David North / Christoph Nord) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção e Liberação de Energia Cinética | 9 |  | outro | absorve tiros e explosões (granada/artilharia leve ~9) → 9 | media |
| Agente de Elite | 6 |  | informacao | extra; mesmo treino de elite → 6 | media |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Combate Corporal | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estratégia | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Traje de Supressão de Poderes | 10 |  | outro | anulação pareada aos graus de mutantes de rua típicos (~10) | baixa |
| Caçador de Mutantes Profissional | — |  | — | papel/profissão | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Fator de Cura _(extra)_ | 9 |  | resistencia | fator de cura: ferimentos de bala em pouco tempo (9-12) → 9 | baixa |
| Atirador _(extra)_ | 9 |  | distancia | extra; mesmo tiro de precisão ~1,5 km → 9 | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Bishop (Lucas Bishop) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção e Redirecionamento de Energia | 20 | 25 | outro | umbrella ≥ sub-técnica "Absorve Radiação e Energia Cósmica de Nível Extremo" (20): absorve energia cósmica pesada de rotina → 20 | media |
| Armamento Pesado | 10 |  | energia | rifles de plasma do futuro partem blindado leve (9–10) → 10 | media |
| Marcado com "M" no rosto | — |  | — | marca física/histórico | alta |
| Treinamento XSE | 6 |  | outro | treino policial/militar de elite: pico humano → 6 | media |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Absorve e Dispara Rajadas | 14 | 22 | energia | rotina: rajada redirecionada derruba tanque/avião (11–15) → 14; pico depende do absorvido (= Redireciona Energia Absorvida, antigo 14/22) | media |
| Imune a Projéteis de Energia | 15 |  | outro | pareado a armas de energia típicas (Sentinelas ~15) → 15 (= nota antiga) | media |
| Carrega Armas com Energia Absorvida | 10 |  | energia | munição carregada parte blindado leve (9–10) → 10 | media |
| Sobrecarga Causa Explosão | 15 |  | energia | descarga total derruba avião grande/navio pequeno (13–15) → 15 (= Sobrecarga Deliberada, antigo 15) | media |
| Rastreamento Temporal | 14 |  | outro | rastreia viajantes do tempo entre eras: faixa rua alta → 14 | baixa |
| Conhecimento de Eventos Futuros | 10 |  | informacao | conhece a linha do tempo futura (desatualizável): faixa rua → 10 | baixa |
| Táticas da XSE | 6 |  | informacao | tática de força policial de elite: pico humano → 6 | media |
| Marcado com M no Rosto _(extra)_ | — |  | — | marca física/histórico | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Blockbuster — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física | 11 |  | resistencia | mesma durabilidade de Força e Resistência Colossais (11): aguenta tanque | baixa |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Combate Corporal | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estratégia | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Força e Resistência Colossais | 11 |  | peso | ergue ~50 t (blindado/tanque leve) → 11 | media |
| Capanga Leal de Sinister | — |  | — | papel/relacionamento | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Callisto — morlock

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Sentidos Aguçados | 6 |  | distancia | sentidos aguçados percebem a ~180 m nos túneis | media |
| Combate Feral com Faca | 4 |  | energia | faca em combate feral: golpe de atleta | media |
| Tentáculos Preênseis (pós-Mojo) | 4 |  | peso | tentáculos preênseis seguram/erguem ~340 kg | baixa |
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
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Líder dos Túneis _(extra)_ | 6 |  | informacao | extra; mesma Liderança dos Morlocks | media |
| Caçadora _(extra)_ | — |  | — | papel/rótulo | media |
| Membro dos Morlocks _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Ciclope (Scott Summers) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força Concussiva Pura (Sem Calor) | 18 | 30 | energia | rotina: pulveriza Sentinelas/derruba prédio pequeno (16-18) → 18; pico sem visor nivela montanha (30) | media |
| Alimentado por Energia Solar | — |  | — | mecanismo do poder, não feito | alta |
| Velocidade da Luz | 18 |  | outro | propriedade da rajada (impossível de esquivar pela velocidade); km/h literal da luz (~1e9 km/h → 29) não é rotina de tag: pareado à rajada → 18 | baixa |
| Nível Edifício+ (Pulveriza Sentinelas, Nivela Montanhas) | 18 | 30 | energia | o texto é o feito: nível edifício → 18; montanhas no pico (30) | media |
| Absorve Eletricidade/Rajadas de Irmão (Havok) | 14 | 20 | outro | pareado ao plasma de rotina de Havok (Anéis 14); sobrecarga de Havok (20) em peak; espelha Havok imune a Ciclope (18) | media |
| Ricochete Preciso em Múltiplas Superfícies (8+ Quicadas) | 10 |  | outro | mesmo ricochete de 8+ quicadas (Mestre do Ricochete 10) | media |
| Acerta Alvos Através de Espelhos/Metal/Água | 10 |  | outro | mesmo ricochete (10) | media |
| Calcula Trajetórias Geométricas Instantaneamente | 10 |  | outro | mesma geometria do ricochete (10) | media |
| KO Morbius, Besta, Hulcinha Cinza via Ricochete | 10 |  | outro | é o ricochete (10); o dano em si é da rajada (18) | baixa |
| Desliga Sala de Perigo Acertando Interruptor | 9 |  | outro | tiro de precisão (Precisão Cirúrgica 9) | media |
| Feixe Fino como Cabelo / Agulha (Intensidade Total) | 9 |  | outro | mesma precisão cirúrgica (9) | media |
| Desarma Múltiplos Oponentes Antes de Atirarem | 9 |  | outro | mesma precisão (o extra Precisão Cirúrgica lista "Desarma Múltiplos" = 9) | media |
| Fura Fechadura / Corta Bolo / Abre Garrafa | 9 |  | outro | mesma precisão cirúrgica (9) | media |
| Acerta Contas-Gotas no Ar / Miçangas na Parede | 9 |  | outro | mesma precisão cirúrgica (o extra lista "Acerta Miçanga" = 9) | media |
| Perfura Lados Opostos de Tanque de Combustível | 9 |  | outro | tiro de precisão (9) | media |
| Mesmo Embriagado Mantém Precisão Perfeita | 9 |  | outro | mesma precisão (9) sob condição adversa | media |
| Rajada Perfurante de Adamantium | 18 |  | energia | perfura adamantium (virtualmente indestrutível 16–18) → 18 (= Táticas Ópticas) | media |
| Cone de Área para Multialvos | 16 |  | energia | cone espalha a rajada: derruba vários Sentinelas, abaixo do feixe focado (18) → 16 | baixa |
| Feixe Contínuo de Alto Dano | 18 |  | energia | rajada de rotina sustentada: pulveriza Sentinelas/prédio pequeno (16–18) → 18 | media |
| Pulsos Controlados (Escada na Rocha, Propulsão, Stun) | 10 |  | energia | pulsos dosados: entalha degraus na rocha/concreto (9–10) → 10 | media |
| Propulsão / Fastball Special com Aliados | 4 |  | peso | impulsiona a si ou aliado (até Colossus ~230 kg) → 4 | baixa |
| Modulação Frequência para Efeito Específico | 18 |  | outro | modulação da rajada; não excede a rajada (18), como Modulação de Feixe antigo | media |
| Gênio Tático (42+ Planos p/ Kuurth-Juggernaut) | 12 |  | informacao | mesmo gênio tático (12) | media |
| Prevê Táticas Inimigas / Usa Ambiente | 10 |  | informacao | mesma leitura de campo (Leitura Instantânea de Campo de Batalha 10) | media |
| Manobras Sincronizadas (Tempestade, Homem de Gelo, Wolverine) | 10 |  | informacao | mesmo comando de equipe (Sincroniza Ataques Combinados 10) | media |
| Liderança Inata / Primeiro X-Man | 12 |  | informacao | = Liderança Nata como Primeiro X-Man (12) | media |
| Treina Novos Mutantes (Hope, Novos X-Men) | 8 |  | informacao | mentor de treino de poderes, faixa rua (= Jean Grey: Treina Controle de Poderes 8) | baixa |
| Comandante de Campo _(extra)_ | 12 |  | informacao | extra; mesma liderança/comando → 12 | media |
| Disciplina de Aço _(extra)_ | — |  | — | traço de personalidade | alta |
| Estrategista Nato _(extra)_ | 12 |  | informacao | extra; mesmo gênio tático → 12 | media |
| Amor por Jean Grey _(extra)_ | — |  | — | relacionamento | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rajada Óptica Concussiva Pura (Sem Calor, Velocidade da Luz, Solar) _(extra)_ | 18 | 30 | energia | extra; mesma rajada óptica → 18 | media |
| Mestre do Ricochete (8+ Quicadas, Geometria Instantânea, Acerta Alvos Ocultos) _(extra)_ | 10 |  | outro | extra; mesmo ricochete → 10 | media |
| Precisão Cirúrgica (Feixe Fino como Agulha, Desarma Múltiplos, Acerta Miçanga) _(extra)_ | 9 |  | distancia | extra; mesma precisão → 9 | media |
| Táticas Ópticas (Cone Área, Pulso Propulsão, Perfura Adamantium, Stun) _(extra)_ | 18 |  | energia | extra; mesmas táticas ópticas (perfura adamantium) → 18 | baixa |
| Comandante de Campo (Gênio Tático 42+ Planos, Manobras Sincronizadas) _(extra)_ | 12 |  | informacao | extra; mesmo gênio tático → 12 | media |
| Condicionamento Pico Humano (Treino 6h/dia, Judo-Vira Colossus, Sobrevive Soco/ Raio) _(extra)_ | 6 |  | resistencia | pico humano (aguenta soco/derruba Colossus com judô) → 6 | media |
| Fortaleza Mental (Caixa Preta Intransponível, Prendeu Vazio, Resistiu Apocalipse/Brood) _(extra)_ | 20 |  | outro | pareado à invasão mental de Apocalipse/Ninhada (~20) → 20 | baixa |
| Visor de Quartzo-Rubi (Micro-Interruptores, Visor Batalha > Óculos, Blackbird Amplifica) _(extra)_ | 18 |  | outro | visor contém e modula a rajada inteira; pareado à rajada → 18 | baixa |

### Colossus (Piotr Rasputin) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transformação em Aço Orgânico Indestrutível | 18 |  | resistencia | aço orgânico aguenta Fanático/artilharia: material virtualmente indestrutível → 18 (família 18–20) | media |
| Força Colossal | 12 | 14 | peso | ergue ~100 t de rotina (classe 100) → 12; pico ~400 t | media |
| Invulnerabilidade ao Dano Físico Convencional | 13 |  | resistencia | balas, explosões, antitanque convencional (13–15) → 13 | media |
| Artista e Pintor Sensível | — |  | — | traço/hobby | alta |
| Protetor da Família Rasputin | — |  | — | relacionamento | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade à Irmã Magik | — |  | — | relacionamento | alta |
| Força Interior | — |  | — | personalidade | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Força Sobre-humana | 12 |  | peso | mesma força de Força Colossal (~100 t) → 12 | media |
| Pele de Aço Orgânico | 18 |  | resistencia | mesma forma de aço de Transformação em Aço Orgânico Indestrutível (virtualmente indestrutível) → 18 | media |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Irmão de Magik (Illyana) | — |  | — | relacionamento | alta |
| Sangue de Feiticeiros | — |  | — | herança/latente | alta |
| Conexão com Limbo | — |  | — | vínculo narrativo | media |
| Protege Inocentes | — |  | — | personalidade | alta |
| Artista e Pintor _(extra)_ | — |  | — | traço/hobby | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Domino (Neena Thurman) — geracaox

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Campo de Sorte Probabilística | 14 |  | outro | pareado ao que anula: tiros erram, armas travam, golpes super-humanos desviam (rua alta) → 14 | baixa |
| Franco-atirador de Elite | 9 |  | distancia | tiro de precisão a ~1,5–2 km → 9 | media |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Combate Corpo-a-Corpo Avançado | 6 |  | outro | luta de elite: pico humano → 6 | media |
| Mercenária Veterana | — |  | — | histórico/papel | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Coração de Mercenária | — |  | — | personalidade | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Causa Azar aos Inimigos | 14 |  | outro | mesmo campo de probabilidade (Campo de Sorte Probabilística 14) | media |
| Garante Sucesso em Ações | 14 |  | outro | mesmo campo de probabilidade (14) | media |
| Projéteis Desviam Sozinhos | 14 |  | outro | pareado a projéteis/golpes super-humanos de rua (= tag antiga 14) | media |
| Eventos Improváveis Acontecem | 14 |  | outro | mesmo campo de probabilidade (14) | media |
| Funciona Melhor sem Planejamento | — |  | — | condição/limitação de uso, não capacidade | alta |
| Confiança Absoluta em Nathan | — |  | — | relacionamento | alta |
| Ex-Membro X-Force | — |  | — | histórico | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Membro da X-Force / X-Corp _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Elixir (Josh Foley) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Biomassa Dourada | 16 | 20 | resistencia | cura de rotina: ferimentos fatais e regenera membros/órgãos (13–16) → 16; pico: traz de volta à beira da morte | media |
| Biomassa Negra | 14 |  | outro | mata/desfaz tecido por dentro, ignora armadura; pareado a Corpo de super-humanos de rua → 14 | baixa |
| Pele Dourada quando Ativo | — |  | — | traço visual | alta |
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
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Biocinese de Cura _(extra)_ | 16 |  | resistencia | extra; mesma Biomassa Dourada → 16 | media |
| Controle Molecular _(extra)_ | 16 |  | outro | extra; mesma biocinese → 16 | baixa |
| Pode Matar com Toque _(extra)_ | 14 |  | outro | extra; mesma Biomassa Negra → 14 | baixa |
| Médico dos Novos X-Men _(extra)_ | — |  | — | papel | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Estrela Polar (Jean‑Paul Beaubier) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Velocidade Supersónica | 12 |  | velocidade | voo de rotina hipersônico ~Mach 10 (~12.000 km/h) → 12 | baixa |
| Voo e Reflexos Sobre-Humanos | 12 |  | velocidade | reflexos acompanham o voo ~Mach 10 → 12 (= variante com hífen não separável, antigo 12) | media |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Gêmeo de Aurora | — |  | — | relacionamento | alta |
| Ex-membro da Alfa Flight | — |  | — | histórico/afiliação | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |

### Fera (Henry "Hank" McCoy) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intelecto Polímata | 14 |  | informacao | Cérebro, viagem no tempo, tecnologia Shi'ar: além da ciência terrestre (13–15) → 14 | media |
| Aparência Felina Azul | — |  | — | traço físico | alta |
| Médico e Cirurgião de Elite | 8 |  | informacao | mesma perícia de Cirurgião de Precisão → 8 | media |
| Agilidade Felina Sobrenatural | 8 |  | outro | acima do pico humano (faixa rua, como acrobacia do Noturno) → 8 | media |
| Força Sobre-humana | 8 |  | peso | ergue várias toneladas ~6 t → 8 | media |
| Patas e Presas | 7 |  | energia | garras/presas rasgam porta de aço/parede de tijolo (7–8) → 7 | baixa |
| Ex-Diretor da X-Force CIA | — |  | — | histórico | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Intelecto Genial | 14 |  | informacao | mesma genialidade de Intelecto Polímata → 14 | media |
| Capacidade de Adaptação Moral | — |  | — | personalidade | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Força Sobre-Humana (10 ton) | 9 |  | peso | o texto é o feito: 10 t → log2(440) ≈ 8,8 → 9 (a tag genérica Força Sobre-humana ficou 8 ≈ 6 t) | media |
| Agilidade e Reflexos Felinos | 8 |  | outro | acima do pico humano (faixa rua) → 8 (= Agilidade Felina Sobrenatural) | media |
| Sentidos Aguçados (Olfato/Audição) | 7 |  | distancia | fareja/ouve a ~380 m (menos que Wolverine) → 7 (= Sentidos de Predador antigo) | media |
| Durabilidade Aprimorada | 8 |  | resistencia | aguenta quedas de prédio e balas leves (7–8) → 8 | media |
| Garras Retráteis | 7 |  | energia | mesmas garras/presas de Patas e Presas (7) | media |
| Regeneração Acelerada | 6 |  | resistencia | cura acelerada leve (3–6) → 6 | media |
| Intelecto Nível Gênio (QI 200+) | 14 |  | informacao | mesma genialidade de Intelecto Polímata (14) | media |
| Médico dos X-Men _(extra)_ | — |  | — | papel na equipe; capacidade em Médico e Cirurgião de Elite | media |
| Consciência da Equipe _(extra)_ | — |  | — | papel social | alta |
| Moralidade Flexível _(extra)_ | — |  | — | personalidade | alta |
| Faz o que Precisa _(extra)_ | — |  | — | personalidade | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Foxx (Foxx (Mystique disfarçada)) — x-men

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
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Frenzy (Joanna Cargill) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força Sobrehumana e Pele Super-densa | 11 |  | peso | ergue ~50 t (luta com Colossus) → 11 | media |
| Ex-Acólita de Magneto | — |  | — | histórico | alta |
| Combate Corporal | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estratégia | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Extrema ao Dano | 10 |  | resistencia | imune a balas, aguenta artilharia leve → 10 | media |
| Eventual Aliada dos X-Men | — |  | — | relacionamento | alta |
| Força _(extra)_ | 11 |  | peso | extra; mesma força ~50 t → 11 | media |
| Pele Indestrutível _(extra)_ | 10 |  | resistencia | extra; mesma resistência → 10 | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Gambit (Remy LeBeau) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Carga Cinética em Qualquer Objeto | 11 |  | energia | umbrella ≥ sub-técnica "Carrega Objetos Grandes" (11): carga máxima de rotina destrói tanque/bunker → 11 | media |
| Cartas de Baralho como Projéteis Explosivos | 8 |  | energia | carta carregada: parede de tijolo (7–8) → 8 | media |
| Passado Obscuro na Guilda dos Ladrões | — |  | — | histórico | alta |
| Mestre Ladrão e Acrobata de Elite | 7 |  | outro | mestre ladrão/acrobata acima do pico humano | media |
| Cajado Bo | 4 |  | energia | bastão bo: golpe de atleta | media |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Charme Mutante | 9 |  | informacao | charme hipnótico mutante; faixa rua | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Casado com Rogue | — |  | — | relacionamento | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Cartas Explosivas de Alcance | 8 |  | energia | carta carregada arruína parede de tijolo (7–8) → 8 | media |
| Carga em Objetos Grandes | 11 |  | energia | carregar veículo/pilar: explosão destrói tanque/bunker → 11 (= Carrega Objetos Grandes antigo) | media |
| Carga Adiada (Timer) | 8 |  | energia | carga retardada com a potência das cartas (8) | media |
| Desvio de Trajetória | 7 |  | outro | cartas curvam no ar; precisão acima do pico humano → 7 | media |
| Acrobacia de Nível Olímpico | 5 |  | outro | acrobacia olímpica: pico humano → 5 | alta |
| Mestre Ladrão _(extra)_ | 7 |  | outro | extra; mesma tag de mestre ladrão | media |
| Passado Obscuro na Guilda _(extra)_ | — |  | — | histórico | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Gentle (Nezhno Abidemi) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Anéis de Plasma Cósmico | 14 | 20 | energia | rajadas de rotina destroem tanques e derrubam avião grande (13–15) → 14; pico arrasa quarteirão | media |
| Imunidade aos Poderes de Ciclope | 18 |  | outro | pareado à rajada óptica de Ciclope (rotina 18) → 18 | media |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Liderança | 6 |  | informacao | líder de equipe (X-Factor/Uncanny Avengers), pico humano → 6 | media |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Absorção de Energia Cósmica | 12 |  | outro | absorve radiação cósmica ambiente como combustível; pareado a fontes de radiação fortes → 12 | baixa |
| Descarga de Plasma Concentrada | 14 |  | energia | mesma rajada dos Anéis, concentrada: titânio/antitanque → 14 | media |
| Imune a Poderes de Ciclope | 18 |  | outro | pareado à rajada óptica de Ciclope (rotina 18) → 18 | media |
| Sobrecarga Destrutiva | 20 |  | energia | descarga total arrasa quarteirão (19–21) → 20 | baixa |
| Liderança Relutante | 6 |  | informacao | mesma liderança (pico humano) → 6 | baixa |
| Lealdade Fraterna | — |  | — | relacionamento | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Geração de Plasma Solar | 14 | 20 | energia | plasma de rotina = Anéis de Plasma (14): derruba avião grande; escala devastadora (20) em peak | media |
| Projeção de Rajadas Orbitais | 17 |  | distancia | alcance orbital ~400 km → 17 | media |
| Absorção de Radiação Estelar | 12 |  | outro | mesma absorção de Absorção de Energia Cósmica (12) | media |
| Criação de Estrelas Artificiais | 20 |  | energia | esfera de plasma arrasa quarteirão (19–21) → 20 | baixa |
| Imunidade Total a Calor/Radiação | 14 |  | resistencia | imune ao próprio plasma e radiação intensa → 14 | media |
| Voo por Propulsão de Plasma | 6 |  | velocidade | voo por propulsão ~160 km/h → 6 | media |
| Imunidade a Ciclope _(extra)_ | 18 |  | outro | pareado à rajada óptica de Ciclope (rotina 18) → 18 | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Hellion (Julian Keller) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Telecinesia de Alto Nível | 12 | 16 | peso | rotina: ergue veículos pesados até ~100 t (avião pequeno) → 12; pico: estruturas ~1.500 t | media |
| Próteses Controladas por Telecinese (perdeu as mãos) | 6 |  | outro | controle fino telecinético que substitui mãos: pico humano de destreza → 6 | baixa |
| Lealdade Profunda a Quem Chama de Amigo | — |  | — | relacionamento | alta |
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
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Telecinesia Poderosa _(extra)_ | 12 |  | peso | extra; = Telecinesia de Alto Nível → 12 | media |
| Mãos Protéticas _(extra)_ | — |  | — | traço físico; o controle está em outra tag | alta |
| Líder dos Hellions _(extra)_ | — |  | — | papel | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Ícone (Bobby Drake) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Criocinese Ômega | 22 | 28 | peso | umbrella ≥ sub-técnica: congela lago/trecho de rio ~100 kt de gelo → 22; pico mar (28) | media |
| Transformação em Ser de Gelo Puro | 18 |  | resistencia | corpo de gelo se refaz de estilhaços: mesma reconstituição de Regeneração Instantânea do Corpo de Gelo (18–22) → 18 | media |
| Armadura de Gelo Instantânea | 10 |  | resistencia | armadura aguenta artilharia leve → 10 | baixa |
| Criação de Estruturas de Gelo Complexas | 18 |  | peso | fortalezas/pontes de gelo ~6 kt → 18 | media |
| Humor Defensivo | — |  | — | traço de personalidade | alta |
| Potencial Ômega raramente utilizado | — |  | — | latente | alta |
| Exploração de Ambiente | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Intensivo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Táticas Avançadas | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Perícia em Campo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Herança de Política Africana | — |  | — | histórico | alta |
| Potencial Ômega Raramente Usado _(extra)_ | — |  | — | latente | alta |
| Herança de Serval _(extra)_ | — |  | — | histórico | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Kid Omega (Quentin Quire) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Garras de Adamantium | 16 |  | energia | garras de adamantium cortam quase tudo (16–18) → 16; = Wolverine/X-23 | media |
| Cyborg de Adamantium | 18 |  | resistencia | esqueleto de adamantium: virtualmente indestrutível → 18; = esqueleto do Wolverine | media |
| Combate Corpo-a-Corpo de Elite | 7 |  | outro | extra; mesma perícia de Ninjitsu → 7 | media |
| Combate Corporal | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estratégia | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Fator de Cura Implantado | 12 |  | resistencia | fecha ferimentos de bala em minutos (9–12) → 12 | media |
| Código de Honra Samurai | — |  | — | ideologia/personalidade | alta |
| Ninja Ciborgue _(extra)_ | — |  | — | rótulo/identidade; capacidades nas outras tags | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Loa — x-men

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
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Curiosidade Insaciável | — |  | — | personalidade | alta |
| Lealdade aos Corsários | — |  | — | relacionamento | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### M (Monet St. Croix) (M) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Pacote de Perfeição Mutante | 12 |  | peso | pacote liderado pela força ~100 t (rivaliza Colossus) → 12 | media |
| Intelecto Prodigioso | 12 |  | informacao | domina ciências em minutos, acima do gênio humano → 12 | baixa |
| Arrogância Desarmante | — |  | — | traço de personalidade | alta |
| Segredos Ligados ao Irmão Emplate | — |  | — | relacionamento/segredo | alta |
| 4 | — |  | — | texto corrompido | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental | 8 |  | resistencia | resiliência pós-trauma; durabilidade de corpo à prova de balas leve → 8 | baixa |
| Exploração de Ambiente | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Intensivo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Táticas Avançadas | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Perícia em Campo | — |  | — | filler de template repetido verbatim em 5 NPCs; não é poder (harmonização: null uniforme) | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Força Sobre-humana _(extra)_ | 12 |  | peso | extra; mesma força ~100 t → 12 | media |
| Telepatia _(extra)_ | 10 |  | distancia | extra; mesma telepatia ~3 km → 10 | baixa |
| Herdeira Bilionária _(extra)_ | — |  | — | histórico/recurso | alta |
| Voo _(extra)_ | 10 |  | velocidade | extra; mesmo voo supersônico → 10 | media |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Morbius (Dr. Michael Morbius) — midnight-sons

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Gênio em Bioquímica e Hematologia | 12 |  | informacao | Nobel de bioquímica; faixa rua alta | media |
| Voo Sobre-Humano | 5 |  | velocidade | voo/planeio ~80 km/h | media |
| Fator de Cura Acelerado | 8 |  | resistencia | cura acelerada de ferimentos graves em horas | media |
| Hipnose e Controle Mental | 7 |  | informacao | hipnose de indivíduos; faixa rua baixa | media |
| Garras e Presas Retráteis | 6 |  | energia | garras e presas: amassa carro/pico humano | media |
| Mordida Transforma Vítimas em Vampiros | 8 |  | outro | contamina vítimas com vampirismo; faixa rua | baixa |
| Soro de Sangue Irradiado (transformação temporária em humano) | — |  | — | soro de controle da condição, não é poder | media |
| Identidade Falsa (Morgan Michaels) | — |  | — | identidade/narrativa | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Mystique (Raven Darkhölme) — irmandade

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Metamorfismo Perfeito | 14 |  | informacao | metamorfismo perfeito (digitais, voz, peso) engana até aliados próximos; faixa rua alta → 14 | media |
| Espiã Veterana | 10 |  | informacao | espiã veterana com séculos de prática → 10 | media |
| Imortalidade Lenta | 10 |  | duracao | envelhecimento muito lento (mais de um século); faixa rua → 10 | baixa |
| Combate Corpo-a-Corpo Letal | 7 |  | outro | combate letal ligeiramente acima do pico humano → 7 | media |
| Pistola Escondida na Coxa | 5 |  | energia | pistola: dano de arma de fogo leve → 5 | media |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Espionagem Global | 12 |  | informacao | rede de espionagem com alcance global, mas social → 12 | baixa |
| Manipuladora Genial | 12 |  | informacao | manipuladora genial (enganou X-Men e governos) → 12 | media |
| Casada com Destiny (Irene Adler) | — |  | — | relacionamento | alta |
| Mimetiza Voz e Maneirismos | 12 |  | informacao | mimetiza voz e maneirismos; abaixo do metamorfismo completo (14) → 12 | media |
| Altera Impressões Digitais | 12 |  | informacao | altera digitais; parte do metamorfismo → 12 | media |
| Engana Sensores Biométricos | 14 |  | outro | pareado a sistemas biométricos de segurança de alto nível (~14) | media |
| Disfarça Cheiro e Feromônios | 10 |  | outro | pareado ao faro de Wolverine (~9-10) → 10 | media |
| Criou Filha Adotiva | — |  | — | relacionamento | alta |
| Manipulou Rogue por Anos | — |  | — | histórico/relacionamento | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Rede de Espionagem _(extra)_ | 12 |  | informacao | extra; mesma rede de espionagem → 12 | baixa |
| Mãe de Noturno _(extra)_ | — |  | — | relacionamento | alta |
| Lealdade a Si Mesma _(extra)_ | — |  | — | traço de personalidade | alta |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Polaris (Lorna Dane) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Magnetismo | 22 | 28 | peso | magnetismo nível Ômega comparável ao de Magneto, um pouco abaixo: navios/estruturas ~100 kt (porta-aviões) → 22; pico planetário | media |
| Campo de Força Magnético Pessoal | 17 |  | resistencia | aguenta artilharia e golpes de super-humanos pesados (abaixo dos 19 de Magneto) → 17 | media |
| Voo por Levitação Magnética | 10 |  | velocidade | extra; mesmo voo magnético → 10 | media |
| Cabelo Verde | — |  | — | traço físico | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Controle Fino de Metais | 12 |  | outro | precisão em peças pequenas/mecanismos (faixa rua alta) → 12 | media |
| Manipulação de Sangue Ferroso | 12 |  | outro | ignora armadura via ferro do sangue; pareado a Corpo de rua (abaixo dos 14 de Magneto) → 12 | baixa |
| Campo de Força Pessoal | 17 |  | resistencia | mesmo campo de Campo de Força Magnético Pessoal → 17 | media |
| Voo Magnético | 10 |  | velocidade | supersônico ~2.400 km/h, como Magneto → 10 | media |
| Tática de Campo | 5 |  | informacao | líder tática de campo (X-Factor), pico humano → 5 | media |
| Lealdade à Equipe | — |  | — | relacionamento | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Manipula Campo Magnético da Terra | 21 |  | area | o texto é o feito: raio da Terra ~6.400 km → 21 | media |
| Controla Minérios em Escala Global | 21 |  | area | o texto é o feito: escala global, raio da Terra ~6.400 km → 21 (como Escudo Magnético Global) | media |
| Gera Aurora Boreal Artificial | 8 |  | area | aurora em raio de ~760 m → 8 | media |
| Escudo Magnético Atmosférico | 18 |  | resistencia | barreira de grande escala detém rajadas pesadas (16–18) → 18 | media |
| Voo Orbital | 14 |  | velocidade | velocidade de escape ~40.000 km/h → 14 | media |
| Campo de Força Magnético _(extra)_ | 17 |  | resistencia | extra; mesmo campo de força pessoal → 17 | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Psylocke (Betsy Braddock) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Espada Psiônica | 14 |  | outro | ignora armadura e derruba mentes; pareado a defesas mentais de heróis de rua → 14 | media |
| Telepatia de Combate | 8 |  | distancia | telepatia tática de campo ~760 m → 8 | media |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Ninjitsu e Artes Marciais de Elite | 7 |  | outro | entre as melhores ninjas, acima do pico humano → 7 | media |
| Telecinesia Precisa | 5 |  | peso | TK fina, move ~0,7 t → 5 | baixa |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Determinação Fria | — |  | — | traço de personalidade | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Herdeira da Família Braddock | — |  | — | histórico | alta |
| Irmã do Capitão Britânia | — |  | — | relacionamento | alta |
| Educação de Elite | — |  | — | histórico | alta |
| Artes Marciais de Elite | 7 |  | outro | mesmas artes marciais (Ninjitsu e Artes Marciais de Elite 7) | media |
| Telepatia Focada em Combate | 8 |  | distancia | mesma telepatia de combate ~760 m (8) | media |
| Lâmina Psiônica Manifesta | 14 |  | outro | mesma Espada Psiônica (14) | media |
| Sombras e Furtividade | 8 |  | informacao | quase invisível no escuro (igual Noturno) → 8 | media |
| Ninjitsu e Artes Marciais _(extra)_ | 7 |  | outro | extra; mesmas artes marciais → 7 | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Rogue (Anna Marie) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção de Poderes e Memórias ao Toque | 20 |  | outro | absorção pareada aos graus dos alvos, inclusive Ômegas (~20) | media |
| Voo e Força Sobrehumana (Ms. Marvel permanente) | 12 |  | peso | força de Ms. Marvel ~75-100 t → 12 (voo ~Mach 1-2 abaixo disso) | media |
| Invulnerabilidade Parcial (Ms. Marvel permanente) | 13 |  | resistencia | aguenta antitanque/projéteis de canhão (13-15) → 13 | media |
| Absorve Poderes, Memórias e Personalidade | 20 |  | outro | mesma absorção ao toque (20), pareada aos graus dos alvos | media |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Força e Voo (Miss Marvel) | 12 |  | peso | mesma força/voo de Ms. Marvel → 12 | media |
| Liderança de Equipe | 8 |  | informacao | lidera equipe de X-Men → 8 | media |
| Força de Vontade Inabalável | — |  | — | traço de personalidade | alta |
| Casada com Gambit | — |  | — | relacionamento | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vôo e Força Sobre-Humana | 12 |  | peso | mesma força/voo de Ms. Marvel → 12 | media |
| Invulnerabilidade Parcial | 13 |  | resistencia | mesma invulnerabilidade parcial → 13 | media |
| Sentidos Aguçados | 6 |  | distancia | sentidos aguçados (Ms. Marvel) percebem a ~180 m → 6 | baixa |
| Força de Voo (Miss Marvel) _(extra)_ | 12 |  | peso | extra; mesma força/voo de Ms. Marvel → 12 | media |
| Força de Vontade _(extra)_ | — |  | — | traço de personalidade | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Sabretooth (Victor Creed) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fator de Cura Acelerado | 16 |  | resistencia | fator de cura no nível de Wolverine: ferimentos letais, regenera tecido (13–16) → 16; = Wolverine | media |
| Garras e Presas | 7 |  | energia | garras naturais rasgam portas de aço/tijolo (7–8) → 7 | media |
| Sentidos Aguçados | 9 |  | distancia | faro que rastreia por quilômetros (9–10) → 9 | media |
| Instinto de Matar Sem Inibições | — |  | — | personalidade | alta |
| Rival de Logan | — |  | — | relacionamento | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
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
| Caçador Sádico _(extra)_ | — |  | — | personalidade | alta |
| Rivalidade com Wolverine _(extra)_ | — |  | — | relacionamento | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Sauron (Karl Lykos) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transformação em Pterossauro Humanóide | 7 |  | peso | forma de pterossauro ergue ~3 t → 7 | baixa |
| Drenagem de Energia Vital | 12 |  | outro | drena humanos e super-humanos ignorando Corpo: pareado a Corpo de rua (tanque 11–12) → 12 | media |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Combate Corporal | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estratégia | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Voo | 6 |  | velocidade | voo planado/batido ~160 km/h → 6 | media |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Pterossauro _(extra)_ | 7 |  | peso | extra; = Transformação em Pterossauro → 7 | baixa |
| Doutor _(extra)_ | — |  | — | rótulo/profissão de Karl Lykos | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Scalphunter (John Greycrow) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Atirador de Elite | 9 |  | distancia | tiro preciso de rotina ~1,5 km → 9 | media |
| Poder Mutante | 7 |  | outro | extra; rótulo do armeiro instintivo → 7 | baixa |
| Cicatrizes Faciais | — |  | — | traço físico | alta |
| Combate Corporal | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estratégia | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Líder dos Marotos | — |  | — | papel/cargo | alta |
| Implacável | — |  | — | traço | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Shatterstar (Gaveedra-Seven) — geracaox

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Dupla Empunhadura de Espadas | 7 |  | energia | duas espadas com força sobre-humana: parede de tijolo (7–8) | media |
| Portais Dimensionais via Espadas | 12 |  | distancia | portais dimensionais pelas espadas; deslocamento ~11 km | baixa |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Velocidade e Reflexos Sobre-humanos | 8 |  | outro | reflexos acima do pico humano: esquiva de tiros | media |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Gladiador de Elite | 8 |  | outro | gladiador de elite; faixa rua | media |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Gladiador Geneticamente Engenhado | — |  | — | origem | media |
| Aprendizado Acelerado de Combate | 8 |  | informacao | aprende combate acelerado; faixa rua | media |
| Sangue de Longshot | — |  | — | origem/linhagem | alta |
| Primeiro Amor Verdadeiro | — |  | — | relacionamento | alta |
| Equilíbrio Emocional | — |  | — | personalidade | alta |
| Luta em Dupla Sincronizada | 7 |  | outro | luta em dupla com Rictor; faixa rua | media |
| Membro da X-Force / X-Corp _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |

### Strong Guy (Guido Carosella) — geracaox

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção de Energia Cinética em Força Muscular | 12 |  | peso | extra; mesma absorção convertida em força → 12 | media |
| Humor Constante | — |  | — | traço de personalidade | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Combate Corporal | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estratégia | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Força e Resistência Colossais | 12 |  | peso | extra; mesma força colossal ~100 t → 12 | media |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro da X-Force / X-Corp _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Tempestade (Ororo Munroe) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle Climático Global | 21 | 23 | area | o texto é o feito: clima em escala global, raio da Terra ~6.400 km → 21 (como Escudo Magnético Global); rotina regional ~17 | media |
| Desencadeia Raios com Precisão Cirúrgica | 14 |  | energia | raios derrubam aeronave blindada/Sentinela (13–15) → 14 | media |
| Criação de Tornados e Furacões | 17 |  | area | furacão de raio ~300 km → 17 | media |
| Voo via Correntes de Ar | 8 |  | velocidade | voo de ~400–640 km/h → 8 | media |
| Considerada Deusa por culturas africanas | — |  | — | histórico/status | alta |
| Liderança Carismática | 8 |  | informacao | extra; mesma liderança → 8 | media |
| Liderança e Realeza | 8 |  | informacao | líder dos X-Men e rainha (faixa rua) → 8 | media |
| Orgulho Africano | — |  | — | identidade | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Compaixão e Sabedoria | — |  | — | personalidade | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Furtividade Urbana | 6 |  | informacao | ladra de rua mestre, pico humano → 6 | media |
| Mestre do Disfarce | 6 |  | informacao | disfarce de pico humano → 6 | media |
| Contatos no Submundo | — |  | — | relacionamento/recurso | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Três‑em‑Uma (Stepford Cuckoos) (Celeste, Mindee, Phoebe) — x-men

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
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Trevor Fitzroy — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Portais Dimensionais | 23 |  | distancia | portais cronais para qualquer ponto do globo (trouxe Sentinelas do futuro) → 23 | media |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Combate Corporal | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estratégia | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Viagem Temporal | 20 |  | outro | viagem temporal entre eras, faixa Ômega → 20 (não usa coluna Tempo) | baixa |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Portal Temporal _(extra)_ | 23 |  | distancia | extra; mesmos portais → 23 | media |
| Ambicioso _(extra)_ | — |  | — | traço | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Wolverine (Logan) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fator de Cura Acelerado | 16 | 20 | resistencia | ferimentos letais em minutos/regenera tecido (13–16) → 16; pico: volta de quase nada | media |
| Esqueleto de Adamantium | 18 |  | resistencia | adamantium: material virtualmente indestrutível → 18 (família adamantium 18–20) | media |
| Garras de Adamantium | 16 |  | energia | garras de adamantium cortam quase tudo (virtualmente indestrutível 16–18) → 16; = X-23/Lady Deathstrike | media |
| Combatente Veterano | 8 |  | outro | veterano de um século de combate; faixa rua | media |
| Instinto Berserker | 8 |  | outro | fúria berserker; faixa rua | baixa |
| Sentidos de Predador Apex | 10 |  | distancia | sentidos de predador: faro/audição ~3 km → 10 | media |
| Código de Honra Pessoal | — |  | — | código pessoal | alta |
| Mestre em Artes Marciais | 7 |  | outro | mestre em artes marciais acima do pico humano | media |
| Lealdade Feroz aos Amigos | — |  | — | personalidade | alta |
| Décadas de Experiência | 8 |  | outro | experiência de décadas; mesma faixa de veterano | baixa |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Séculos de Combate | 8 |  | outro | séculos de combate; mesma faixa de veterano | baixa |
| Rastreador Implacável | 10 |  | distancia | faro rastreia por quilômetros ~3 km → 10 | media |
| Resistência a Telepatia | 12 |  | outro | mente reforçada/implantes; pareado a telepatas de rua (~12) | baixa |
| Conhecimento de Operações Negras | 8 |  | informacao | operações negras da Arma X; faixa rua | media |
| Samurai Interior _(extra)_ | — |  | — | traço/personalidade | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### X-23 (Laura Kinney / Wolverine) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fator de Cura Acelerado | 16 |  | resistencia | regenera membros/órgãos, mesmo tier do Wolverine → 16 | media |
| Garras de Adamantium | 16 |  | energia | garras de adamantium cortam quase tudo ('virtualmente indestrutível' 16-18) → 16 | media |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Assassina Condicionada | 8 |  | outro | assassina treinada acima do pico humano → 8 | media |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Identidade em Construção | — |  | — | arco narrativo | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Feromônio Desencadeia Fúria | — |  | — | fraqueza (gatilho) | alta |
| Perde Controle Total | — |  | — | fraqueza | alta |
| Cheiro Específico Ativa | — |  | — | fraqueza (gatilho) | alta |
| Fator de Cura Similar | 16 |  | resistencia | mesmo fator de cura → 16 | media |
| Duas Garras por Mão | — |  | — | traço anatômico; o corte está em Garras de Adamantium | media |
| Garra no Pé | — |  | — | traço anatômico; o corte está em Garras de Adamantium | media |
| Sem Adamantium no Esqueleto | — |  | — | fraqueza/ausência | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

## Perigo: medio

### Anjo (Warren Worthington III / Arcanjo) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Asas | — |  | — | traço físico; o voo está em Voo Sônico | media |
| Como Arcanjo | — |  | — | rótulo de forma; capacidades em Asas Metálicas Cortantes | media |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Bilionário Worthington Industries | — |  | — | recurso/status | alta |
| Aparência Angélica | — |  | — | traço físico | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Sangue com Propriedades Curativas Únicas | 13 |  | resistencia | sangue cura ferimentos graves/mortais de outros (13–16) → 13 | media |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Asas Metálicas Cortantes | 12 |  | energia | asas tecno-orgânicas cortam aço/blindagem (11–12) → 12 | media |
| Voo Sônico e Precisão Aérea | 9 |  | velocidade | o texto é o feito: sônico ~1.200 km/h → 9 | media |
| Bilionário Worthington _(extra)_ | — |  | — | recurso/status | alta |
| Sangue Curativo _(extra)_ | 13 |  | resistencia | extra; mesmo sangue curativo → 13 | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Anole — x-men

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
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Arclight — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Ondas de Choque Sísmicas | 11 | 16 | energia | golpe sísmico racha bunker/concreto armado → 11; pico: derrubou túneis dos Morlocks | media |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Força Aumentada pela Mutação | 9 |  | peso | ergue ~13 t → 9 | media |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Armor (Hisako Ichiki) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Exoesqueleto Psiônico Ancestral | 11 |  | resistencia | extra; mesmo exoesqueleto → 11 | media |
| Força Amplificada na Armadura | 9 |  | peso | extra; mesma força amplificada → 9 | media |
| Potencial Crescente | — |  | — | potencial/latente | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resistência ao Dano Físico Dentro da Armadura | 11 |  | resistencia | extra; mesma resistência da armadura → 11 | media |
| Conectada aos Ancestrais | — |  | — | fonte espiritual/narrativa | media |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Armadura Psíquica _(extra)_ | 11 |  | resistencia | extra; mesma armadura psíquica → 11 | media |
| Determinação _(extra)_ | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Aurora (Jeanne-Marie Beaubier) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Voo Supersônico | 12 |  | velocidade | voo ~Mach 10 (~12.000 km/h) → 12, igual a Estrela Polar | baixa |
| Luz Cegante quando em contato com Northstar | 6 |  | area | clarão cegante com o gêmeo cobre ~180 m → 6 | baixa |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Gêmea de Northstar | — |  | — | relacionamento | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Avalanche (Dominikos Petrakis) — irmandade

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Geokinese | 16 |  | energia | extra; o poder geral, teto de rotina = derrubar prédio pequeno → 16 | media |
| Mercenário Pragmático | — |  | — | personalidade | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Terremotos e Avalanches Localizados | 9 |  | area | extra; tremor localizado em raio ~1,5 km → 9 | media |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Ondas Sísmicas _(extra)_ | 10 |  | energia | extra; mesmas vibrações que racham fundações → 10 | media |
| Demolidor _(extra)_ | 16 |  | energia | extra; derruba estruturas → 16 | baixa |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Banshee (Sean Cassidy) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Grito Sonar | 9 |  | energia | extra; = grito sônico → 9 | media |
| Voo via Ondas Sonoras | 7 |  | velocidade | extra; = voo sônico → 7 | media |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Escudo Sônico Protetor | 8 |  | resistencia | parede sônica desvia balas/estilhaços (7–8) → 8 | media |
| Desorientação em Massa | 9 |  | energia | mesmo grito sônico (9) aplicado a um grupo | baixa |
| Frequência Hipnótica | 7 |  | informacao | frequência que induz transe em humanos próximos (rua baixa) → 7 | baixa |
| Ex-Agente da Interpol | — |  | — | histórico | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Fundador da Geração X | — |  | — | histórico | alta |
| Pai de Siryn | — |  | — | relacionamento | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Blindfold (Ruth Aldine) — novatos

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
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Blob (Fred Dukes) — irmandade

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Campo de Força Inercial | 15 |  | outro | extra; mesmo campo inercial → 15 | media |
| Força Colossal | 8 |  | peso | força ~6 t → 8 | media |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Pele Praticamente Invulnerável ao Dano Físico | 12 |  | resistencia | extra; mesma pele invulnerável → 12 | media |
| Nenhuma Sensibilidade à Dor Física | 6 |  | resistencia | insensível à dor: ignora ferimentos no pico humano → 6 | baixa |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Boggart — x-men

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
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Bolt (Christopher Bradley) — vilao

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
| Ex-Militar | — |  | — | histórico | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Boomer (Tabitha Smith / Boom-Boom / Meltdown) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Bombas de Plasma com Timer Psiônico | 10 |  | energia | extra; mesmas bombas de Bombas de Meltdown (rompem concreto armado) → 10 | media |
| Bombas de Meltdown | 10 |  | energia | bombas maiores rompem concreto armado → 10 | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Atitude Rebelde | — |  | — | traço de personalidade | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Caliban — morlock

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Detector de Mutantes | 11 |  | distancia | extra; mesmo detector → 11 | media |
| Mentalidade Ingênua | — |  | — | traço de personalidade | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Força Colossal Aumentada por Apocalipse | 8 |  | peso | extra; mesma força ~6 t → 8 | media |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos Morlocks _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Cameron Hodge — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Cyborg | 10 |  | resistencia | corpo robótico aguenta concreto/artilharia leve (9–10) → 10 | media |
| Líder da Falange | — |  | — | papel/afiliação | alta |
| Ex-Parceiro de Warren Worthington | — |  | — | relacionamento/histórico | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Imortalidade Pela Preservação da Cabeça | 16 |  | resistencia | cabeça preservada "virtualmente indestrutível" (16–18) → 16 | baixa |
| Anti-Mutante Radical | — |  | — | ideologia | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Cannonball (Sam Guthrie) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Propulsão Termoquímica | 9 |  | velocidade | extra; = lança-se como projétil → 9 | media |
| Invulnerabilidade em Voo | 16 |  | resistencia | extra; = invulnerável em explosão → 16 | media |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Liderança Natural e Leal | 5 |  | informacao | extra; = liderança de campo → 5 | baixa |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro de Família Numerosa de Mutantes (Guthries) | — |  | — | relacionamento | alta |
| Liderança Natural _(extra)_ | 5 |  | informacao | extra; = liderança de campo → 5 | baixa |
| Família Guthrie _(extra)_ | — |  | — | relacionamento | alta |
| Membro dos X-Men _(extra)_ | — |  | — | afiliação | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Cecilia Reyes (Dra. Cecilia Reyes) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Campo de Força Biológico Instintivo | 10 | 12 | resistencia | campo aguenta balas/explosões/artilharia leve → 10 | media |
| Médica de Trauma e Cirurgiã de Elite | 6 |  | informacao | extra; mesma perícia médica → 6 | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Doutora de Elite | 6 |  | informacao | médica de trauma de elite, pico humano → 6 | media |
| Queria Vida Normal, Não Heroína | — |  | — | traço/motivação | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Chamber (Jono Starsmore) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Plasma Psiônico Explodindo do Peito | 12 |  | energia | plasma psiônico arrebenta tanque/bunker (11–12) → 12 | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Comunicação Telepática | 4 |  | distancia | telepatia de comunicação ~45 m (substitui a fala) | media |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Explosão Psíquica _(extra)_ | 12 |  | energia | extra; mesmo plasma psiônico → 12 | media |
| Silêncio _(extra)_ | — |  | — | traço/limitação | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Dazzler (Alison Blaire) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transdução de Som em Luz | 8 |  | energia | extra; mesma transdução → 8 | media |
| Laser de Luz Concentrado | 8 |  | energia | extra; mesmo laser → 8 | media |
| Força Sonora como Disco de Ataque | 8 |  | energia | extra; disco de luz de ataque → 8 | media |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Cantora e Performer | 7 |  | informacao | extra; mesma presença de palco → 7 | media |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Força Sonora como Disco _(extra)_ | 8 |  | energia | extra; mesmo ataque sonoro/luz → 8 | baixa |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Diamond Lil (Lillian Crawley) — neutro

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Pele de Diamante Orgânico | 15 |  | resistencia | pele de diamante quase impenetrável: aguenta antitanque/explosões (13–15) → 15 | media |
| Ex-Mercenária | — |  | — | histórico | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Força e Resistência Aumentadas pelo Diamante | 6 |  | peso | ergue ~1–1,5 t → 6 | media |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Opera nos Dois Lados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### DJ — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Corpo Robótico de Alta Tecnologia | 8 |  | peso | corpo ciborgue ergue ~6 t → 8 | media |
| Engenheiro de Elite | 10 |  | informacao | construiu os ciborgues Reavers, acima do gênio humano → 10 | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Líder dos Reavers | — |  | — | papel/cargo | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Dríade (Dryad) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Comunhão e Manipulação da Flora | 5 |  | area | manipula flora num raio de ~90 m → 5 | media |
| Fala com as Plantas | 4 |  | informacao | conversa com plantas; faixa humana | media |
| Cresce Vegetação Instantânea | 5 |  | area | cresce vegetação num raio de ~90 m → 5 | media |
| Enredamento por Raízes e Cipós | 6 |  | peso | raízes/cipós prendem ~1,5 t (carro) → 6 | baixa |
| Serenidade de Floresta Antiga | — |  | — | personalidade | alta |
| Ligação Espiritual com a Natureza | — |  | — | ligação espiritual/narrativa | media |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Cuidado com os Vulneráveis | — |  | — | personalidade | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Dust (Poeira) (Sooraya Qadir) — x-men

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
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Empath (Manuel Rodrigo) — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Projeção Emocional | 9 |  | informacao | impõe emoções a vários alvos num ambiente/prédio (faixa rua) → 9 | media |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Tortura Psicológica | 9 |  | informacao | uso sádico da mesma projeção emocional → 9 | baixa |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Espectro (Specter) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intangibilidade | 12 |  | outro | atravessa paredes e evita ataques; pareado a tanque/bunker (11–12) → 12, = Loa | media |
| Invisibilidade Parcial | 8 |  | informacao | quase invisível (= camuflagem em sombras do Noturno) → 8 | media |
| Atravessa Paredes | 12 |  | outro | = Intangibilidade → 12 | media |
| Evasão e Fuga | 6 |  | outro | fuga de especialista com intangibilidade: pico humano → 6 | baixa |
| Humor Seco e Sussurrado | — |  | — | personalidade | alta |
| Observador Perspicaz | 5 |  | informacao | observação atenta (humano alto) → 5 | baixa |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Surge do Nada quando a Equipe Precisa | — |  | — | traço narrativo | media |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Espinho (Quill) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Projeta Espinhos pelo Corpo | 4 |  | energia | espinhos perfuram como flechas, golpe de atleta → 4 | media |
| Defesa e Ataque à Distância | 4 |  | distancia | disparos ~45 m → 4 | media |
| Manto Perfurante | 4 |  | outro | espinhos punem quem toca; dano de atleta → 4 | baixa |
| Cobertura de Supressão | 3 |  | area | rajada cobre raio ~24 m → 3 | baixa |
| Lealdade Extrema aos Próximos | — |  | — | traço de personalidade | alta |
| Coragem Silenciosa | — |  | — | traço de personalidade | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Anseia por Aceitação | — |  | — | traço/motivação | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Forge — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Poder Mutante de Invenção | 15 |  | informacao | extra; mesmo poder de invenção → 15 | media |
| Inventor Oficial dos X-Men | 14 |  | informacao | extra; mesma engenharia avançada → 14 | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Perna e Mão Protéticas de Alta Tecnologia (próprias) | 5 |  | outro | próteses de alta tecnologia com função de pico humano | baixa |
| Xamã Cheyenne | 8 |  | outro | extra; mesmos rituais xamânicos → 8 | baixa |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Arma que Remove Mutação | 16 |  | outro | o Neutralizador: pareado aos poderes que anulou (Tempestade ~16) → 16 | media |
| Usado contra Tempestade | — |  | — | histórico | alta |
| Arrependimento Profundo | — |  | — | emoção | alta |
| Tecnologia Proibida | — |  | — | descritivo (rótulo do Neutralizador); a capacidade está em Arma que Remove Mutação | alta |
| Visões Espirituais | 8 |  | informacao | visões xamânicas; faixa rua como Reconhece ameaças místicas (8) | baixa |
| Conexão com Adversário | — |  | — | vínculo narrativo com o Adversário | alta |
| Magia Tecnológica | 8 |  | outro | rituais xamânicos aplicados à tecnologia; faixa rua como Xamã Cheyenne (8) | baixa |
| Neutralizador de Mutantes _(extra)_ | 16 |  | outro | Neutralizador pareado aos poderes que anulou (Tempestade ~16) | baixa |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Garoto Chuva (Rain Boy) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fisiologia Aquática | 7 |  | resistencia | corpo de água deixa golpes e balas passarem (7-8) → 7 | baixa |
| Provoca Chuva Localizada | 4 |  | area | chuva localizada em raio ~45 m → 4 | media |
| Fluidez que Absorve Golpes | 7 |  | resistencia | mesma fluidez → 7 | baixa |
| Controle da Umidade | 4 |  | area | controle de umidade ao redor ~45 m → 4 | media |
| Sensibilidade Emocional Profunda | — |  | — | traço de personalidade | alta |
| Doçura Melancólica | — |  | — | traço de personalidade | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Bondade Genuína | — |  | — | traço de personalidade | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Glob Herman (Robert Herman) — novatos

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
| Poder de Penetrar Qualquer Defesa | 18 |  | outro | extra; = Arpões Energéticos (mesmo poder: ignoram invulnerabilidade, ferem Colossus em aço) → 18 | media |
| Assassino Calculista | — |  | — | personalidade/papel | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Husk (Paige Guthrie) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Esfoliação em Qualquer Material | 9 |  | resistencia | formas de aço/diamante aguentam concreto/artilharia leve → 9 | media |
| Ambição Excepcional | — |  | — | traço | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Cada Forma tem Propriedades Específicas | 9 |  | outro | mesma esfoliação → 9 | media |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Descamação _(extra)_ | 9 |  | resistencia | extra; mesma esfoliação → 9 | media |
| Família Guthrie _(extra)_ | — |  | — | relacionamento | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Indra — x-men

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
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Jubileu (Jubilation Lee) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Plasmóides Pirocinéticos | 6 |  | energia | extra; mesmos plasmoides → 6 | media |
| Potencial Ômega Latente | — |  | — | latente | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Protegida de Wolverine | — |  | — | relacionamento | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vampira (após M-Day) | — |  | — | estado/histórico; poderes não especificados | media |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vampira pós M-Day _(extra)_ | — |  | — | estado/histórico; poderes não especificados | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Karma (Xi'an Coy Manh) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Possessão Mental | 12 |  | informacao | possui e controla mentes fortes, até super-humanos (faixa rua alta) → 12 | media |
| Pode Controlar Múltiplos Alvos Simultaneamente | 10 |  | informacao | vários hospedeiros ao mesmo tempo, com custo → 10 | media |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Refugiada Vietnamita | — |  | — | histórico | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Responsabilidade pelos Irmãos Menores | — |  | — | relacionamento | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Controle Múltiplo _(extra)_ | 10 |  | informacao | extra; mesmo controle múltiplo → 10 | media |
| Responsabilidade pelos Irmãos _(extra)_ | — |  | — | relacionamento | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Kestrel (John Wraith) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Teletransporte de Curta Distância | 6 |  | distancia | curto alcance tático ~180 m → 6 | media |
| Código de Honra Próprio | — |  | — | personalidade | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento de Combate de Elite | 6 |  | outro | décadas na Arma X: combatente de pico humano → 6 | media |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Kidogo — x-men

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
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Kitty Pryde (Shadowcat / Sprite) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intangibilidade | 16 |  | outro | extra; mesma intangibilidade → 16 | media |
| Disrupção de Circuitos Eletrônicos ao Atravessar | 8 |  | outro | extra; mesma disrupção de eletrônicos → 8 | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Hacking e Programação de Elite | 10 |  | informacao | extra; mesmo hacking de elite → 10 | media |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Ninjitsu | 5 |  | outro | ninjutsu: pico humano | media |
| Lockheed | — |  | — | companheiro (NPC próprio) | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Liderança Natural | 7 |  | informacao | extra; mesma liderança → 7 | media |
| Mestra em Hacking _(extra)_ | 10 |  | informacao | extra; mesmo hacking de elite → 10 | media |
| Knight de Solano _(extra)_ | — |  | — | título/histórico | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Lady Mastermind (Regan Wyngarde) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Ilusões Realistas Indistinguíveis da Realidade | 12 |  | informacao | ilusões indistinguíveis que cobrem área urbana; faixa rua alta → 12 | media |
| Manipuladora Narcisista | — |  | — | traço de personalidade | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Filha de Jason Wyngarde | — |  | — | relacionamento | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Larry Trask — vilao

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
| Herdeiro do Programa Sentinel | — |  | — | histórico/recurso | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Leech — morlock

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Campo de Supressão de Mutantes | 22 |  | outro | anula Wolverine, Ciclope e Xavier: pareado aos poderes Ômega que anula (~20) → 22 | media |
| Presença Cativante Apesar da Aparência | 5 |  | informacao | presença social marcante (humano alto) → 5 | baixa |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Inocência Infantil | — |  | — | personalidade | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos Morlocks _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Lifeguard (Heather Cameron) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Adaptação Reativa a Ameaças | 10 |  | outro | gera asas/escamas/força conforme a ameaça; faixa rua → 10 | baixa |
| Irmã de Slipstream | — |  | — | relacionamento | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Poderes Mudam Conforme o Perigo | 10 |  | outro | mesma adaptação reativa → 10 | baixa |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Lockheed — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fogo Violeta Anti-Mágico | 7 |  | energia | fogo violeta: parede de tijolo/derrete metal leve (7–8); anula magia | media |
| Voo | 6 |  | velocidade | voo de dragão ~160 km/h | media |
| Parceiro Leal de Kitty Pryde | — |  | — | relacionamento | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Inteligência Elevadíssima Deliberadamente Escondida | 7 |  | informacao | intelecto humano oculto, agente da SWORD; faixa rua | media |
| Ex-Agente Duplo da SWORD | — |  | — | histórico | alta |
| Parece Animal de Estimação | 6 |  | informacao | passa por mascote: disfarce/subestimação; faixa humana alta | baixa |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Lorelei (Lani Ubanu) — irmandade

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Canto Hipnótico | 6 |  | area | canto hipnotiza homens ao alcance da voz ~180 m → 6 | media |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Imunidade a Ataques Baseados em Som | 9 |  | outro | pareado a ataques sonoros típicos (grito de Banshee/Siryn ~9) | baixa |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Madison Jeffries (Box) — neutro

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Tecnopatia | 9 |  | peso | remodela/controla máquinas e metal ~13 t (veículos, armadura Box) → 9 | media |
| Gênio em Engenharia | 10 |  | informacao | extra; engenharia muito acima de especialista humano → 10 | media |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Constrói Robôs e Armaduras em Minutos | 10 |  | informacao | monta robô/armadura funcional em minutos (faixa rua) → 10 | media |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Opera nos Dois Lados _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Madrox (Jamie Madrox / O Homem Múltiplo) — geracaox

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Criação de Duplicatas ao Impacto | 10 |  | outro | extra; = criação de duplicatas → 10 | baixa |
| Detetive Particular | 6 |  | informacao | extra; = investigações → 6 | media |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Absorção de Duplicatas com Memórias e Habilidades | 10 |  | informacao | extra; = reintegração → 10 | baixa |
| Cada Duplicata Desenvolve Personalidade Própria | — |  | — | fraqueza disfarçada | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro da X-Force / X-Corp _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Magma (Amara Aquilla) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle de Magma e Lava | 10 |  | energia | extra; mesmo controle de lava → 10 | media |
| Forma de Rocha Incandescente | 9 |  | resistencia | extra; mesma forma de rocha → 9 | media |
| Terremotos Localizados | 8 |  | area | extra; mesmos tremores ~760 m → 8 | media |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Nobre Romana de Nova Roma | — |  | — | histórico | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Forma de Rocha _(extra)_ | 9 |  | resistencia | extra; mesma forma de rocha → 9 | media |
| Nobre de Nova Roma _(extra)_ | — |  | — | histórico | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Magma (Alliance of Evil) (Magma (Aliança)) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Corpo de Magma Fundido | 8 |  | energia | corpo de magma derrete aço leve/parede (7–8) | media |
| Morto por Apocalipse | — |  | — | histórico/destino | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Controle de Lava | 8 |  | energia | jatos/poças de lava: derrete parede/veículo (7–8) | media |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Marrow (Sarah) — morlock

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Crescimento e Extração de Ossos como Armas | 5 |  | energia | extra; mesmas armas ósseas → 5 | media |
| Ossos como Projéteis | 5 |  | energia | extra; mesmos projéteis ósseos → 5 | media |
| Dois Corações | 4 |  | resistencia | segundo coração: sobrevive a ferimento cardíaco → 4 | baixa |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Fator de Cura Moderado | 6 |  | resistencia | extra; mesmo fator de cura moderado → 6 | media |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Ossos como Armas _(extra)_ | 5 |  | energia | extra; mesmas armas ósseas → 5 | media |
| Membro dos Morlocks _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Masque — morlock

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Reshaping Biológico ao Toque | 10 |  | outro | extra; mesmo reshaping → 10 | media |
| Líder Ocasional dos Morlocks | — |  | — | papel social | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Crueldade Sádica | — |  | — | personalidade | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos Morlocks _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Match (Ben Hammil) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Armamento Anti-Mutante Especializado | 16 |  | outro | supressores de cura pareados ao fator de cura de Wolverine/X-23 de rotina (16) → 16 | baixa |
| Inibidores de Telepatia Portáteis | 12 |  | outro | pareado a telepatas típicos de rua (~12) → 12 | baixa |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento de Combate de Elite | 5 |  | outro | combate de elite perto do pico humano → 5 | media |
| Modificações Cibernéticas Menores | 5 |  | outro | implantes leves, pico humano → 5 | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Mercury (Cessily Kincaid) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controla Mentes com Olhar/Voz | 12 |  | informacao | hipnose por olhar/voz domina vontades humanas e mutantes de rua → 12 | media |
| Comandos Pós-Hipnóticos Permanentes | 10 |  | duracao | comandos pós-hipnóticos persistentes; faixa rua → 10 | baixa |
| Afeta Multidões Simultaneamente | 8 |  | area | hipnose em massa em raio ~760 m (bairro/estádio) → 8 | media |
| Engana Telepatas (Ilusão de Controle) | 14 |  | outro | pareado a telepatas de rua alta (~14) | baixa |
| Estratégia Avançada | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Presença Imponente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Adaptabilidade Extrema | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Oculto | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança Nata | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Experiência de Séculos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Manipulação em Escala Global | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Percepção Sobre-Humana | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Mestre de Múltiplas Disciplinas | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Sobre-Humanos | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Resistência Mental Superior | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Opera nas Sombras / Agente Secreto | — |  | — | papel/modus operandi | alta |
| Rede de Agentes Hipnotizados Globais | 12 |  | informacao | rede de agentes hipnotizados (alcance social global, não do poder) → 12 | baixa |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Hipnose em Massa _(extra)_ | 8 |  | area | extra; mesma hipnose em massa ~760 m → 8 | media |
| Ilusões Auxiliares _(extra)_ | 8 |  | informacao | ilusões auxiliares que reforçam a hipnose → 8 | media |
| Manipulação de Multidões _(extra)_ | 8 |  | area | extra; mesma manipulação de multidões → 8 | media |

### Mira (Pinpoint) (Pinpoint) — x-men

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
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Mirage (Dani Moonstar / Psyche) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Manifestação de Medos e Desejos Profundos | 12 |  | informacao | extra; = projeção de medos/desejos → 12 | media |
| Arco e Flecha | 6 |  | distancia | extra; = arqueira de elite → 6 | media |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Ligação Empática com Animais | 6 |  | informacao | extra; elo empático com animais → 6 | baixa |
| Cheyenne | — |  | — | identidade cultural | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Ex-Valquíria | — |  | — | histórico; poderes não mais disponíveis | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Moça de Borracha (Rubber Maid) — x-men

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
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Náiade (Naiad) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Hidrocinese em Estado Líquido | 6 |  | area | hidrocinese num raio de ~180 m → 6 | media |
| Manipula Grandes Volumes de Água | 11 |  | peso | move grandes volumes de água ~50 t (onda/piscina) → 11 | baixa |
| Purifica ou Contamina Água | 5 |  | outro | purifica/contamina água; faixa humana alta | baixa |
| Chicotes e Escudos de Água | 6 |  | energia | chicotes de água: impacto de pico humano; escudo similar | media |
| Personalidade Fluida e Serena | — |  | — | personalidade | alta |
| Adapta-se como a Corrente | — |  | — | personalidade | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Calma que Acalma os Outros | — |  | — | traço social | media |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Noturno (Kurt Wagner) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Teletransporte via Dimensão Sombria (bamf) | 9 |  | distancia | extra; mesmo teleporte → 9 | media |
| Agilidade Acrobática Extrema | 8 |  | outro | extra; mesma acrobacia → 8 | media |
| Cada Teleporte deixa rastro de enxofre | — |  | — | fraqueza disfarçada | alta |
| Cauda Preênsil | — |  | — | traço anatômico | media |
| Visão no Escuro | 6 |  | distancia | enxerga no breu a ~180 m → 6 | baixa |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Fé Católica Profunda | — |  | — | traço/fé | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Humor como Defesa | — |  | — | traço de personalidade | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Acrobata Consumado _(extra)_ | 8 |  | outro | extra; mesma acrobacia → 8 | media |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Omerta (Paulie Provenzano) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Pele de Metal Orgânico | 12 |  | resistencia | pele metálica aguenta tiros pesados/explosões (tanque/bunker 11–12) → 12 | media |
| Ex-Família Mafiosa | — |  | — | histórico | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Força Aumentada na Forma Metálica | 7 |  | peso | ergue ~2–3 t → 7 | media |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Onyxx — x-men

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
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Persuasion (Kara Killgrave) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle Mental por Voz | 14 |  | informacao | comanda quem ouve, multidões, quase absoluto (só telepatas resistem); faixa rua alta → 14 | media |
| Tenta se Redimir | — |  | — | arco narrativo | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Filha do Purple Man | — |  | — | relacionamento | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Pixie (Megan Gwynn) — novatos

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
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Prodigy (David Alleyne) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Conhecimento de Centenas de Especialistas Retido Permanentemente | 10 |  | informacao | centenas de especialidades retidas: faixa rua → 10 | media |
| Artes Marciais e Combate de Vários Especialistas | 6 |  | outro | luta de vários mestres: pico humano → 6 | media |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Estrategista de Elite | 8 |  | informacao | estrategista acima do pico humano → 8 | media |
| Parceiro de Surge | — |  | — | relacionamento | alta |
| Memória Absoluta _(extra)_ | 9 |  | informacao | memória eidética perfeita, acima do pico humano → 9 | media |
| Gênio _(extra)_ | 9 |  | informacao | intelecto no teto humano (Inteligência alta) → 9 | media |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Pyro (St. John Allerdyce) — irmandade

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
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Manipula Fogo _(extra)_ | 9 |  | energia | extra; mesmo controle de fogo → 9 | media |
| Incendiário _(extra)_ | — |  | — | traço/rótulo | alta |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Radian (Christian Cord) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Artes Marciais de Elite | 6 |  | outro | artes marciais no pico humano → 6 | media |
| Ex-Agente Chinês | — |  | — | histórico | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Humano no Pico da Perfeição | 6 |  | outro | pico humano → 6 | media |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Rede (Network) (Network) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transmissão Telepática em Massa | 6 |  | distancia | transmite a grandes grupos em escala de campus ~180 m → 6 | media |
| Leitura de Pensamentos como Rede Social | 3 |  | distancia | leitura superficial a ~25 m (telepata iniciante) → 3 | media |
| Irreverência e Fofoca | — |  | — | personalidade | alta |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Redneck (Vincent Stewart) — novatos

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
| Líder dos Purificadores | — |  | — | papel/cargo | alta |
| Filho Mutante que Matou Esposa | — |  | — | histórico | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Rictor (Julio Richter) — geracaox

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Controle Sísmico | 12 | 18 | energia | extra; mesmo controle sísmico → 12 | media |
| Parceiro de Shatterstar | — |  | — | relacionamento | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vibrações Sísmicas Precisas | 12 |  | energia | extra; mesmas vibrações de Gera ondas sísmicas e vibrações pelo solo, dirigidas → 12 | media |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Controle Sísmico Preciso | 12 |  | energia | = Vibrações Sísmicas Precisas (12): racha fundações/bunker | media |
| Ondas de Choque Direcionadas | 10 |  | energia | abalo dirigido abre parede de concreto armado (9–10) → 10 | media |
| Detecção Sísmica | 6 |  | distancia | sente movimentos/cavidades pelo solo a ~180 m → 6 | media |
| Desmorona Estruturas | 12 | 18 | energia | rotina: derruba estrutura reforçada/bunker (11–12) → 12; pico: terremoto que derruba prédio (18) | baixa |
| Táticas de Guerrilha | 7 |  | informacao | infiltração/guerrilha da X-Force; faixa rua baixa → 7 | baixa |
| Liderança de Campo | — |  | — | equivale ao filler de template Liderança em Campo (null uniforme) | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro da X-Force / X-Corp _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Riptide — vilao

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
| Velocidade de Rotação Debilita Oponentes em Área | 4 |  | area | redemoinho/projéteis cobrem raio ~45 m → 4 | media |
| Assassino Implacável | — |  | — | traço de personalidade | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Rockslide (Santo Vaccaro) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Corpo de Rocha Silicosa | 13 |  | resistencia | extra; mesmo corpo de rocha → 13 | media |
| Força Colossal | 11 |  | peso | extra; mesma força ~50 t → 11 | media |
| Cabeça como Projétil | 8 |  | energia | arremessa a própria cabeça de rocha: derruba parede/vira caminhão (7–8) → 8 | baixa |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Desmontagem e Remontagem Telecinética | 5 |  | distancia | extra; mesma desmontagem, ~90 m → 5 | baixa |
| Sem Sistema Nervoso Convencional | 8 |  | outro | imune a dor/golpes nervosos; pareado a ataques de rua → 8 | baixa |
| Personalidade Descontraída que Subestima o Risco | — |  | — | personalidade/fraqueza | alta |
| Força Bruta _(extra)_ | 11 |  | peso | extra; mesma força ~50 t → 11 | media |
| Humor _(extra)_ | — |  | — | personalidade | alta |
| Aluno do Instituto _(extra)_ | — |  | — | afiliação | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Roulette (Jennifer Stavros) — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Discos de Sorte/Azar | 9 |  | outro | efeitos de sorte/azar até paralisia ao toque: pareado ao Corpo/Vontade de alvos de rua → 9 | baixa |
| Jogadora Compulsiva | — |  | — | personalidade/vício | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Efeitos Imprevisíveis | — |  | — | fraqueza (aleatoriedade) | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Sage (Tessa) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Mente Computador Humano | 13 |  | informacao | processamento de computador, cognição Ômega; faixa rua alta → 13 | media |
| Memória Perfeita e Absoluta | 10 |  | informacao | memória eidética total, acima do humano → 10 | media |
| Agente Dupla Infiltrada por Décadas | — |  | — | histórico | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Pode Catalisar Mutações Latentes em Outros | 12 |  | outro | pareado a poderes latentes de rua que desperta → 12 | baixa |
| Combate de Elite | 5 |  | outro | combate de elite perto do pico humano → 5 | media |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Scanner (Sarah Ryall) — geracaox

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Visão de Raio-X | 5 |  | distancia | raio-X através de paredes ~90 m | media |
| Ex-Agente do Governo | — |  | — | histórico | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Visão Térmica e Espectro Eletromagnético | 6 |  | distancia | visão térmica/espectro EM ~180 m | media |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro da X-Force / X-Corp _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Scrambler — vilao

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
| Desativa Poderes Mutantes ao Toque | 10 |  | outro | mesma anulação ao toque → 10 | baixa |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Sentinela Mark I (Unidade Autônoma de Caça) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Detector de Mutações DNA | 9 |  | distancia | sensores detectam mutantes a ~1,5 km → 9 | media |
| Foguetes e Projéteis Anti-Mutante | 11 |  | energia | foguetes que arruínam blindado/tanque (11–12) → 11 | media |
| Supressores de Mutação | 12 |  | outro | extra; pareado aos poderes de mutantes de rua típicos (~10–12) → 12 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Armadura Estrutural Reforçada | 13 |  | resistencia | casco de Sentinela aguenta antitanque (13–15) → 13 | media |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Sentinela Mk I (Unidade de Caça) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Detector de Mutação por DNA | 9 |  | distancia | varredura de mutantes a ~1,5 km → 9 | baixa |
| Foguetes de Alta Explosão | 11 |  | energia | foguetes arruínam blindado/tanque (11–12) → 11; = foguetes do Sentinela Mark I | media |
| Supressor de Poderes | 12 |  | outro | modelo antigo: pareado a mutantes de rua típicos (~12) → 12 | baixa |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Armadura Estrutural Reforçada | 13 |  | resistencia | casco de Sentinela aguenta antitanque (13–15) → 13; = Sentinela Mark I | media |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Shinobi Shaw — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intangibilidade | 12 |  | outro | atravessa matéria e ataques; pareado a ataques típicos de rua (tanque ~12) → 12 | baixa |
| Tentou Assassinar o Próprio Pai | — |  | — | histórico | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Manipulador Político | 8 |  | informacao | intriga do Clube do Inferno, faixa rua → 8 | media |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Tecnopatia _(extra)_ | — |  | — | rótulo de tema trocado (o poder é Intangibilidade); sem feito | baixa |
| Herdeiro _(extra)_ | — |  | — | histórico | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Silver Fox — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Garras Retráteis | 5 |  | energia | garras retráteis: pico humano | media |
| Ex-Amante de Wolverine | — |  | — | relacionamento | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Fator de Cura Limitado | 5 |  | resistencia | cura acelerada leve (3–6) → 5 | media |
| Assassinada por Sabretooth | — |  | — | histórico/destino | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Siryn (Theresa Cassidy) — geracaox

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Grito Sonar Destruidor | 9 |  | energia | extra; mesmo grito → 9 | media |
| Frequência Hipnótica | 7 |  | informacao | compulsão hipnótica pela voz em humanos próximos → 7; = mesma tag do Banshee | baixa |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Voo via Ondas Sonoras | 7 |  | velocidade | mesmo voo sônico ~320 km/h (Voo Sônico 7) | media |
| Escudo Sônico | 7 |  | resistencia | barreira vibratória desvia balas leves → 7 | media |
| Grito Desorientador | 9 |  | energia | mesmo grito concussivo modulado para atordoar (9) | media |
| Voo Sônico | 7 |  | velocidade | extra; mesmo voo sônico → 7 | media |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Herança Mutante Irlandesa | — |  | — | histórico | alta |
| Luto pelo Pai | — |  | — | emoção/arco | alta |
| Mentora da Nova Geração | — |  | — | papel | alta |
| Membro da X-Force / X-Corp _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Slipstream (Davis Cameron) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Portais de Energia para Teletransporte | 18 | 22 | distancia | portais de onda cruzam ~1.000 km de rotina (estado/país) → 18; pico intercontinental | baixa |
| Irmão de Lifeguard | — |  | — | relacionamento | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Pode Transportar Grupos Através dos Portais | 5 |  | peso | leva equipe de ~6–8 pessoas ~600 kg → 5 | media |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Stacy X — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Feromonas | 9 |  | informacao | feromônios ao toque dominam emoções/corpo do alvo: pareado à Vontade de alvos de rua → 9 | baixa |
| Presença Sexual Dominante | 6 |  | informacao | presença social/sedução forte (pico humano) → 6 | baixa |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Camuflagem de Pele | 7 |  | informacao | pele reptiliana se mistura ao ambiente (camuflagem parcial) → 7 | baixa |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Steven Lang — vilao

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
| Líder do Projeto Fênix | — |  | — | papel/histórico | alta |
| Mente Transferida para Corpo Sentinel | 11 |  | peso | corpo Sentinela ergue ~50 t → 11 | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Sunspot (Roberto da Costa) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção e Canalização de Energia Solar | 10 |  | energia | extra; mesma absorção/rajadas solares → 10 | media |
| Força Sobrehumana Quando Carregado | 10 |  | peso | extra; mesma força quando carregado → 10 | media |
| Voo em Forma Solar | 8 |  | velocidade | extra; mesmo voo solar → 8 | baixa |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Bilionário DaCosta | 13 |  | outro | extra; mesma fortuna DaCosta → 13 | media |
| Força Sobre-humana _(extra)_ | 10 |  | peso | extra; mesma força solar ~25 t → 10 | media |
| Membro dos X-Men _(extra)_ | — |  | — | afiliação | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Surge (Noriko Ashida) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Absorção e Liberação de Eletricidade | 7 |  | energia | extra; mesma absorção/descarga → 7 | media |
| Velocidade em Rajadas Elétricas | 8 |  | velocidade | extra; mesma velocidade ~640 km/h → 8 | baixa |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Líder dos Estudantes | 5 |  | informacao | extra; mesma liderança → 5 | media |
| Liderança dos Novos X-Men _(extra)_ | 5 |  | informacao | extra; mesma liderança → 5 | media |
| Eletricidade _(extra)_ | 7 |  | energia | extra; mesma eletricidade → 7 | media |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Tag (Brian Cruz) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Invocação de Arquétipos do Tarô | 9 |  | energia | figuras das cartas lutam e partem concreto armado (9–10) → 9 | baixa |
| Precognição Limitada via Leitura de Cartas | 5 |  | duracao | vislumbres vagos do futuro próximo: faixa humana alta → 5 | baixa |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Cada Carta tem Efeito Específico | — |  | — | mecânica/limitação, não feito | media |
| Treinada por Emma Frost | — |  | — | histórico/relacionamento | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Tattoo (Christine Cord) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Percepção Temporal Acelerada | 6 |  | outro | percepção temporal acelerada; faixa humana alta | media |
| Personagem Menor | — |  | — | filler de template repetido verbatim em 4 NPCs; não é poder (harmonização: null uniforme) | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Precognição Limitada ao Imediato | 6 |  | duracao | extra; precognição do imediato → 6 | baixa |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Salto Temporal _(extra)_ | 8 |  | duracao | extra; mesmo salto temporal → 8 | baixa |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Tower — vilao

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
| Força e Resistência Colossais em Tamanho Máximo | 11 |  | peso | força colossal no tamanho máximo ~50 t → 11 | media |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Trance (Hope Abbott) — novatos

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
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Umbra — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Viagem e Manipulação de Sombras | 9 |  | distancia | salta entre sombras ~1,5 km (igual Noturno) → 9 | media |
| Furtividade e Infiltração Absolutas | 10 |  | informacao | "absoluta": acima da camuflagem de Noturno (8) → 10 | media |
| Ataques a partir da Penumbra | 5 |  | outro | golpe surpresa vindo da sombra, pico humano → 5 | baixa |
| Camuflagem nas Trevas | 8 |  | informacao | quase invisível no escuro (igual Noturno) → 8 | media |
| Protege em Silêncio | — |  | — | traço | alta |
| Observa Mais do que Age | — |  | — | traço | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Mistério que Intriga a Equipe | — |  | — | traço narrativo | alta |
| Aluna do Instituto Xavier | — |  | — | filler de template repetido verbatim em 9 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Unus (Angelo Unuscione) — irmandade

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
| Força Aumentada Dentro do Campo | 7 |  | peso | campo amplia força/empuxo ~3 t → 7 | baixa |
| Ex-Lutador de Circo | — |  | — | histórico | alta |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Vanisher — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Teletransporte Planetário Instantâneo | 23 |  | distancia | o texto é o feito: qualquer ponto do planeta (~20.000 km) → 23 | media |
| Aliado Eventual dos X-Men | — |  | — | relacionamento | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Ladrão de Elite | 6 |  | informacao | ladrão de elite no pico humano → 6 | media |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Vertigo — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Indução de Vertigem e Desorientação Severa | 10 |  | informacao | incapacita super-humanos com desorientação (faixa rua) → 10 | media |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Poder Funciona em Área | 5 |  | area | efeito em raio de ~90 m → 5 | media |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Vic Slaughter (Vic Slaughter (Cria Vampírica)) — midnight-sons

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força e Velocidade Vampíricas Aprimoradas | 6 |  | peso | força vampírica ergue ~1,5 t (carro) → 6 | media |
| Fator de Cura Moderado | 8 |  | resistencia | "moderado": entre cura leve (3–6) e balas em minutos (9–12) → 8 | media |
| Garras e Presas | 5 |  | energia | garras/presas rasgam carne e chapa leve (pico humano) → 5 | media |
| Distorção Corporal (pode estender membros) | 1 |  | distancia | estende membros a ~6 m → 1 | baixa |
| Reflexos Aguçados | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Ex-líder dos Hardcases | — |  | — | histórico | alta |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Liderança em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Instinto de Sobrevivência _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |

### Wallflower (Laurie Collins) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Feromonas Emocionais | 10 |  | informacao | extra; mesmos feromônios → 10 | media |
| Introversão Severa | — |  | — | traço/fraqueza | alta |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Induz Medo, Amor, Agressão ou Calma em Grupos | 4 |  | area | extra; mesmo raio de grupo ~45 m → 4 | media |
| Filha de Persuasão (vilã) | — |  | — | relacionamento | alta |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Feromônios _(extra)_ | 10 |  | informacao | extra; mesmos feromônios → 10 | media |
| Invisível _(extra)_ | 8 |  | informacao | passa despercebida via feromônios, quase invisível socialmente → 8 | baixa |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Wild Child (Kyle Gibney) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Fator de Cura Acelerado | 9 |  | resistencia | cura acelerada de ferimentos graves em horas (abaixo de 'bala em minutos') | media |
| Sentidos Lupinos | 9 |  | distancia | faro lupino rastreia por ~1,5 km → 9 | media |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Garras e Dentes Afiados | 6 |  | energia | garras e dentes: pico humano | media |
| Ex-Parceiro de Sabretooth | — |  | — | relacionamento/histórico | alta |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Resiliência Física e Mental _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |

### Wind Dancer (Sofia Mantega) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transformação em Lobo ou Forma Lobisomem | 6 |  | outro | extra; mesma metamorfose lupina → 6 | media |
| Sentidos Lupinos | 9 |  | distancia | extra; mesmo faro lupino ~1,5 km → 9 | media |
| Instintos Predatórios em Forma Animal | 6 |  | outro | instintos predatórios na forma animal; faixa humana alta | media |
| Reflexos Rápidos | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Lealdade | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Habilidade Especial | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Trabalho em Equipe | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecimento Tático | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Ligação Empática com Mirage | — |  | — | relacionamento/vínculo | media |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Ligação com Mirage _(extra)_ | — |  | — | relacionamento | alta |
| Fé Escocesa _(extra)_ | — |  | — | fé | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

### Wraith (Hector Rendoza) (Hector Rendoza) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Intangibilidade | 12 |  | outro | intangibilidade de base: atravessa paredes e evita ataques até tanque/bunker → 12 (família 12) | media |
| Resiliência Física e Mental | — |  | — | filler de template (texto idêntico em vários NPCs, inclusive Ômegas/cósmicos e um cão): número fixo enganaria → null nas notas novas; graus individuais antigos (M, Thena) seguem reaproveitados | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Rápidos | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Lealdade | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Especial | — |  | — | filler de template repetido verbatim em 47 NPCs; não é poder (harmonização: null uniforme) | alta |
| Trabalho em Equipe | — |  | — | filler de template repetido verbatim em 53 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecimento Tático | — |  | — | filler de template repetido verbatim em 48 NPCs; não é poder (harmonização: null uniforme) | alta |
| Adolescente Problemático | — |  | — | traço de personalidade | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Habilidade de Luta _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Determinação Inabalável _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |

### Xenônio (Xenon) — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Emissão de Gases e Energias Espectrais | 3 |  | area | nuvem de gás/luz em raio ~25 m → 3 | media |
| Cria Ilusões Gasosas | 6 |  | informacao | ilusões visuais convincentes em gás (pico humano/rua baixa) → 6 | media |
| Brilho Luminoso Desorientador | 5 |  | informacao | clarão que cega/desorienta grupo próximo → 5 | media |
| Forma Gasosa Evasiva | 8 |  | outro | intangível em gás; pareado a ataques físicos de rua → 8 | baixa |
| Carisma Volátil e Cintilante | — |  | — | personalidade | alta |
| Criatividade Imprevisível | — |  | — | personalidade | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Surge e Some sem Aviso | 5 |  | informacao | furtividade de humano excepcional → 5 | baixa |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Movimentação Tática | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante Experiente _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |

## Perigo: baixo

### Adepto (Magneto) (Seguidor da Causa) — irmandade

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Poder Mutante de Baixo Nível | 4 |  | outro | poder genérico modesto: uso típico de atleta/humano alto → 4 | baixa |
| Disposto a Morrer pela Causa | — |  | — | ideologia | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Fanatismo Ideológico | — |  | — | ideologia | alta |
| Treinamento Básico de Combate | 3 |  | outro | treino de combate básico, humano treinado → 3 | media |
| Habilidade de Luta | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Agente HYDRA (Agente de Campo) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Armamento Avançado (tecnologia roubada) | 7 |  | energia | armas de energia/fuzis avançados arruínam tijolo → 7 | media |
| Treinamento Paramilitar Sólido | 3 |  | outro | paramilitar treinado, abaixo do pico → 3 | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Tecnologia de Supressão de Mutantes _(extra)_ | 10 |  | outro | pareado a mutantes de rua típicos que suprime (~10) → 10 | baixa |
| Opera em Células Independentes _(extra)_ | — |  | — | organização/narrativo | alta |

### Agente S.H.I.E.L.D. (Operativo de Campo) — humano

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento Tático de Elite | 5 |  | outro | treinamento tático de elite: pico humano | media |
| Armamento de Alta Tecnologia S.H.I.E.L.D. | 7 |  | energia | armamento de alta tecnologia: fuzil/arma de energia (5–7) → 7 | media |
| Humano com Acesso a Alto Escalão _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Lealdade à Organização _(extra)_ | — |  | — | lealdade | alta |

### Beef (Winston) — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força e Resistência Colossais | 8 |  | peso | força/resistência de Hellion ~6 t → 8 | media |
| Lealdade Cega | — |  | — | traço de personalidade | alta |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Inteligência Muito Limitada | — |  | — | fraqueza | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Bevatron — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Rajadas de Energia | 5 |  | energia | rajadas modestas: arromba porta/fere gravemente (5–6) → 5 | media |
| Personagem Menor | — |  | — | filler de template repetido verbatim em 4 NPCs; não é poder (harmonização: null uniforme) | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Bolivar Trask — humano

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Gênio em Robótica e Bioengenharia | 13 |  | informacao | criou as Sentinelas, robótica além da tecnologia da época (13–15) → 13 | media |
| Arrependido no Final da Vida | — |  | — | arco/personalidade | alta |
| Humano com Acesso a Alto Escalão _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Cargill — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Força Sobrehumana | 7 |  | peso | ergue ~3 t (vira carro/caminhão leve) → 7 | baixa |
| Ex-Membro da Aliança do Mal | — |  | — | histórico | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Catseye (Sharon Smith) — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Transformação em Felina Humanóide | 5 |  | outro | forma felina humanoide: agilidade de pico humano | media |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Vigilância Constante | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Garras, Agilidade e Visão Noturna | 5 |  | outro | garras/agilidade felina de pico humano; enxerga no escuro | media |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Cypher (Doug Ramsey) — novatos

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Poliglota Universal | 18 |  | informacao | extra; mesma compreensão universal → 18 | media |
| Morreu em Batalha | — |  | — | histórico | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Leitura de Intenção Corporal | 10 |  | informacao | extra; mesma leitura corporal → 10 | media |
| Melhor Amigo de Warlock | — |  | — | relacionamento | alta |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Leitura Corporal _(extra)_ | 10 |  | informacao | extra; mesma leitura corporal → 10 | media |
| Amigo de Warlock _(extra)_ | — |  | — | relacionamento | alta |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Fixer — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conserto Rápido de Máquinas | 4 |  | informacao | mecânico especialista humano, conserto rápido → 4 | media |
| Determinação Inabalável | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Flubber — x-men

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Massa Gelatinosa e Elástica | 6 |  | resistencia | corpo gelatinoso absorve impactos contundentes de pico humano → 6 | baixa |
| Maleabilidade Extrema | 5 |  | outro | estica/deforma o corpo livremente (utilidade) → 5 | baixa |
| Espreme-se por Qualquer Fresta | 6 |  | outro | passa por frestas mínimas: contorna portas/barreiras comuns → 6 | baixa |
| Entusiasmo Contagiante | — |  | — | personalidade | alta |
| Não Tem Um Osso Mau (literalmente) | — |  | — | piada/personalidade | alta |
| Aluno do Instituto Xavier | — |  | — | filler de template repetido verbatim em 10 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Graydon Creed — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Filho de Mystique e Sabretooth | — |  | — | relacionamento/histórico | alta |
| Líder dos Amigos da Humanidade | — |  | — | papel/cargo | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Orador e Manipulador Político _(extra)_ | 13 |  | informacao | campanha presidencial anti-mutante de alcance nacional (acima de Stryker 12) → 13 | media |

### Graydon Creed (FOH) (Soldado da FOH) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Humano Sem Poderes | — |  | — | ausência de poder (fraqueza) | alta |
| Armamento Leve | 5 |  | energia | armamento leve: pistola/fuzil → 5 | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Fanatismo Anti-Mutante _(extra)_ | — |  | — | ideologia | alta |

### Henry Gyrich (Henry Peter Gyrich) — humano

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Funcionário Governamental de Alto Escalão | — |  | — | cargo/papel | alta |
| Burocracia como Arma | 12 |  | informacao | burocracia federal restringe operações em escala nacional; social → 12 | baixa |
| Humano com Acesso a Alto Escalão _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Anti-Mutante Pragmático _(extra)_ | — |  | — | ideologia | alta |

### Icarus (Jay Guthrie) — novatos

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

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Supervelocidade | 7 |  | velocidade | velocista de baixo nível ~300 km/h → 7 | media |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência a Dano | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Personagem Menor | — |  | — | filler de template repetido verbatim em 4 NPCs; não é poder (harmonização: null uniforme) | alta |
| Treinamento de Combate | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Explosão Cinética _(extra)_ | 6 |  | energia | estouro cinético amassa carro (5–6) → 6 | baixa |
| Membro dos Novos Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Jetstream (Haroun ibn Sallah) — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Propulsão a Jato Biológica | 7 |  | velocidade | voo a jato ~320 km/h (abaixo de Cannonball) → 7 | media |
| Saudita | — |  | — | origem | alta |
| Intuição de Batalha | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Rival de Cannonball | — |  | — | relacionamento | alta |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Moira MacTaggert (Dra. Moira MacTaggert) — humano

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Geneticista Mutante Líder Mundial | 13 |  | informacao | geneticista líder mundial (vírus Legado, Ilha Muir); faixa rua alta | media |
| Dirige a Ilha Muir | — |  | — | papel/local | media |
| Vontade de Ferro | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Parceira Científica e Ex-Noiva de Xavier | — |  | — | relacionamento | alta |
| Mutante Secreta | 18 |  | duracao | reencarnação com memória (reinicia a linha do tempo); faixa Ômega por utilidade | baixa |
| Geneticista _(extra)_ | 13 |  | informacao | extra; mesma genética de ponta → 13 | media |
| Aliada dos X-Men _(extra)_ | — |  | — | afiliação | alta |
| Humano com Acesso a Alto Escalão _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Purificador (Soldado da Ordem dos Purificadores) — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Fanatismo Religioso | — |  | — | ideologia | alta |
| Arma de Fogo e Faca | 5 |  | energia | arma de fogo/faca: dano de arma leve → 5 | media |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Treinamento Paramilitar Básico _(extra)_ | 3 |  | outro | treino paramilitar básico (humano treinado) → 3 | media |

### Stinger — vilao

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Projéteis Bioelétricos | 4 |  | energia | ferrões bioelétricos modestos, golpe de atleta/atordoa → 4 | media |
| Personagem Menor | — |  | — | filler de template repetido verbatim em 4 NPCs; não é poder (harmonização: null uniforme) | alta |
| Conhecido no Submundo Mutante _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Timeshadow (Harriet) — clube-do-inferno

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Especialização | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Habilidade Única | — |  | — | filler de template repetido verbatim em 12 NPCs; não é poder (harmonização: null uniforme) | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Ilusões Temporais de Si Mesma | 6 |  | informacao | cópias ilusórias passadas/futuras confundem oponentes próximos (pico humano) → 6 | baixa |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Membro do Clube do Inferno _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Toad (Mortimer Toynbee) — irmandade

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Salto Sobrehumano | 4 |  | distancia | extra; mesmo salto ~45 m → 4 | media |
| Língua Preênsil Longa | 2 |  | distancia | extra; mesma língua ~10 m → 2 | media |
| Perícia em Campo | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Determinação | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Secreção Pegajosa | 2 |  | outro | gosma prende um adulto ~90 kg → 2 | baixa |
| Membro da Irmandade de Mutantes _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

### Val Cooper (Valentine Cooper) — humano

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Especialista em Relações com Mutantes | 8 |  | informacao | especialista em relações com mutantes; faixa rua | media |
| Força de Vontade Acima da Média | 4 |  | outro | vontade acima da média: resiste a pressão/intimidação; faixa humana | baixa |
| Exploração de Ambiente | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Sorte nos Momentos Críticos | — |  | — | filler de template repetido verbatim em 18 NPCs; não é poder (harmonização: null uniforme) | alta |
| Determinação | — |  | — | filler de template repetido verbatim em 29 NPCs; não é poder (harmonização: null uniforme) | alta |
| Instinto de Sobrevivência | — |  | — | filler de template repetido verbatim em 72 NPCs; não é poder (harmonização: null uniforme) | alta |
| Inteligência Política Excepcional | 9 |  | informacao | inteligência política excepcional; faixa rua | media |
| Tática e Estratégia | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Humano com Acesso a Alto Escalão _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Nível Baixo _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |

## Perigo: desconhecido

### Capitão Britânia — 

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Força Sobre-Humana _(extra)_ | 12 |  | peso | ergue ~90 t (classe 90) → log2(3.960) ≈ 12 | media |
| Resistência Sobre-Humana _(extra)_ | 12 |  | resistencia | aguenta tiro de tanque/golpes super-humanos (11–12) → 12 | media |
| Voo em Alta Velocidade _(extra)_ | 10 |  | velocidade | voo supersônico ~Mach 2 (~2.400 km/h) → 10 | media |
| Campo de Força Bioenergético _(extra)_ | 15 |  | resistencia | campo aguenta antitanque/derrubada de avião (13–15) → 15 | baixa |
| Energia de Otherworld _(extra)_ | — |  | — | fonte do poder, não capacidade (como Alimentado por Energia Solar de Ciclope) | alta |
| Campeão de Otherworld _(extra)_ | — |  | — | título | alta |
| Resistência Mística _(extra)_ | 12 |  | outro | pareado a magia de rua (~12) | baixa |
| Resistência a Ataques Energéticos _(extra)_ | 13 |  | resistencia | resiste a armas de energia típicas, abaixo de imunidade (Bishop 15) → 13 | baixa |
| Impacto Aéreo _(extra)_ | 12 |  | energia | investida em voo com força classe 90 arruína tanque (11–12) → 12 | media |
| Combate Corpo a Corpo _(extra)_ | 6 |  | outro | lutador treinado: pico humano → 6 | baixa |
| Combate Aéreo _(extra)_ | 6 |  | outro | manobra de combate em voo treinada: pico humano → 6 | baixa |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Treinamento de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Conhecimento Tático _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Liderança em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Determinação Inabalável _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto Protetor _(extra)_ | — |  | — | personalidade | alta |
| Cientista e Engenheiro _(extra)_ | 8 |  | informacao | físico/engenheiro de nível doutorado, acima do especialista comum (faixa rua) → 8 | baixa |
| Conhecimento de Fenômenos Interdimensionais _(extra)_ | 10 |  | informacao | conhecimento do Multiverso/Otherworld além de qualquer especialista humano (rua) → 10 | baixa |
| Experiência com Ameaças Místicas _(extra)_ | — |  | — | experiência/histórico (como Mutante Experiente) | alta |
| Herdeiro da Família Braddock _(extra)_ | — |  | — | histórico | alta |
| Irmão de Psylocke _(extra)_ | — |  | — | relacionamento | alta |
| Líder da Excalibur _(extra)_ | — |  | — | papel (como Líder dos X-Men de Xavier, null) | alta |
| Protetor do Reino Unido _(extra)_ | — |  | — | papel | alta |
| Ligação com Otherworld _(extra)_ | — |  | — | vínculo narrativo | alta |
| Código de Honra _(extra)_ | — |  | — | personalidade | alta |
| Dever Acima de Si Mesmo _(extra)_ | — |  | — | personalidade | alta |
| Cabeça Dura _(extra)_ | — |  | — | traço/fraqueza | alta |
| Vulnerável a Manipulação Psíquica _(extra)_ | — |  | — | fraqueza | alta |

### Homem de Gelo — 

| Tag | Grau | Pico | Benchmark | Feat | Conf. |
|---|---:|---:|---|---|---|
| Criocinese Ômega _(extra)_ | 22 | 28 | peso | rotina: congela lago/trecho de rio ~100 kt de gelo → 22 (= Ícone); pico: congela um mar (28) | media |
| Controle de Temperatura _(extra)_ | 12 |  | area | resfria área de raio ~11 km → 12 (= Ícone) | media |
| Redução Extrema de Temperatura _(extra)_ | 14 |  | energia | leva o alvo a perto do zero absoluto: arruína alvo blindado (13–15) → 14 | baixa |
| Congelamento Instantâneo _(extra)_ | 12 |  | energia | congela veículo/alvo blindado de imediato (tanque 11–12) → 12 | baixa |
| Transformação em Ser de Gelo Puro _(extra)_ | 18 |  | resistencia | corpo de gelo se refaz de estilhaços (18–22) → 18 (= Ícone) | media |
| Corpo de Gelo Regenerativo _(extra)_ | 18 |  | resistencia | mesma reconstituição do corpo de gelo (18) | media |
| Reconstrução Corporal através de Gelo _(extra)_ | 18 |  | resistencia | refaz o corpo a partir de umidade/estilhaços (18–22) → 18 | media |
| Armadura de Gelo Instantânea _(extra)_ | 10 |  | resistencia | armadura aguenta artilharia leve → 10 (= Ícone) | media |
| Criação de Estruturas de Gelo Complexas _(extra)_ | 18 |  | peso | fortalezas/pontes de gelo ~6 kt → 18 (= Ícone) | media |
| Criação de Barreiras de Gelo _(extra)_ | 12 |  | resistencia | paredes de gelo grossas detêm fogo de tanque (11–12) → 12 | baixa |
| Aprisionamento em Gelo _(extra)_ | 12 |  | outro | prisão de gelo pareada à força de super-humanos de rua (~12) | baixa |
| Projéteis de Gelo _(extra)_ | 8 |  | energia | projéteis quebram tijolo/derrubam alvo (7–8) → 8 (= Ícone) | media |
| Pontes e Rampas de Gelo _(extra)_ | 18 |  | peso | pontes de gelo ~6 kt → 18 (= Ícone: Estruturas de Gelo (Pontes, Fortalezas)) | media |
| Deslizamento sobre Gelo _(extra)_ | 6 |  | velocidade | desliza em rampa de gelo ~160 km/h → 6 (= Ícone) | media |
| Manipulação de Água Congelada _(extra)_ | 18 |  | peso | move/remodela massas de gelo existentes na escala de suas estruturas ~6 kt → 18 | baixa |
| Congelamento em Área _(extra)_ | 12 |  | area | congela área de raio ~11 km (= Controle de Temperatura) → 12 | baixa |
| Controle Ambiental _(extra)_ | 12 |  | area | neve/frio regional em raio ~11 km → 12 | baixa |
| Pode Criar Duplicatas de Gelo _(extra)_ | 10 |  | outro | duplicatas de gelo animadas lutam como capangas super-humanos (faixa rua) → 10 | baixa |
| Consciência Distribuída pelo Gelo _(extra)_ | 12 |  | distancia | percebe através do gelo que controla, escala de cidade ~11 km → 12 | baixa |
| Difícil de Matar enquanto houver umidade disponível _(extra)_ | 18 |  | resistencia | mesma reconstituição a partir de umidade (18–22) → 18 | media |
| Potencial Ômega Raramente Utilizado _(extra)_ | — |  | — | latente (rubrica §4) | alta |
| Controle Fino do Poder _(extra)_ | 12 |  | outro | controle fino de gelo (esculturas, nível molecular), como Controle Fino de Metais da Polaris (12) | baixa |
| Movimentação Tática _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Trabalho em Equipe _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Treinamento Intensivo _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Táticas Avançadas _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Instinto de Sobrevivência _(extra)_ | — |  | — | filler de template (texto idêntico em vários NPCs, independe do personagem): não é capacidade mensurável → null uniforme | alta |
| Perícia em Campo _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Veterano de Combate _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Reflexos Aguçados _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Resistência Mental Treinada _(extra)_ | — |  | — | perícia genérica de template (texto idêntico em vários NPCs, mesmo onde não se aplica); precedente dos graders antigos (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) → null uniforme | alta |
| Humor Defensivo _(extra)_ | — |  | — | personalidade | alta |
| Evita Levar o Próprio Potencial a Sério _(extra)_ | — |  | — | personalidade/fraqueza | alta |
| Lealdade aos X-Men _(extra)_ | — |  | — | relacionamento | alta |
| Membro dos X-Men _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
| Mutante de Elite _(extra)_ | — |  | — | rótulo organizacional/descritivo de template → null uniforme | alta |
