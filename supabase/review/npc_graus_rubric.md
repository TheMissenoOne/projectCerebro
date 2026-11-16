# Rubrica — grau (APs) das tags de poder dos NPCs

Para os avaliadores que preenchem `supabase/review/npc_graus/chunk-N.json` a partir dos chunks do
baseline (`supabase/review/npc_graus_baseline.json`). Pipeline: `scripts/gen-npc-graus.js`.

## 1. Decisões (fechadas)

- **Só tags de PODER** (`temas[].poder` + `extras`, ver abaixo) recebem grau. Fraquezas nunca. Tags narrativas, de
  histórico, relacionamento, personalidade ou ideologia → `null`, salvo se descrevem capacidade
  mensurável (ex.: "Gênio Científico" sim, "Sobrevivente de Auschwitz" não).
- **Grau = AP lido da tabela universal** a partir do que o poder **faz de forma rotineira**
  nesta campanha (massa movida, alcance, área, velocidade, dano, alcance de informação).
  NÃO é esticar linearmente o 1–6 antigo. NÃO tem teto por nível de perigo nem pelos atributos.
- Grau do feito vale **mesmo se ≤ atributo** que governaria a ação (registre assim mesmo).
- Regra de jogo (`temas.json:34`, "[Grau em tags]"): o grau de uma tag **substitui** AV/EV e/ou
  OV/RV. Ou seja: grau 20 = a ação acontece na escala de 20 APs.
- Atributos, perigo, estrutura de temas e textos das tags **não mudam**.
- Inteiro **1–99** (o validador aceita 0–99, mas não use 0): o editor do Cérebro descarta grau 0 (`cerebro.html:680`, `:717`),
  então 0 = sem grau na prática. Capacidade abaixo de 1 AP → `1` ou `null`.
- **`extras`** (no chunk, separado de `temas`): entradas de `data.tags` que não estão em nenhum
  `temas[].poder` nem espelham fraqueza. Grade com as mesmas regras: poder real ("Teletransporte
  via Dimensão Sombria (bamf)", "Visão no Escuro") ganha grau; narrativo/traço/fraqueza
  disfarçada ("Fé Católica Profunda", "Cada Teleporte deixa rastro de enxofre") → `null`.
  Se o extra repete uma tag de poder com outras palavras ("Voo Magnético" ≈ "Voo por Levitação
  Magnética"), use o mesmo grau.

### Calibragem (leia antes de começar)

O usuário considera que muitos mutantes estão **subavaliados** ("8 seria muito pouco para o
Magneto"). Portanto:
- Feito rotineiro entre dois valores de AP → **pegue o maior**.
- Poder-assinatura de mutante nível Ômega raramente fica **abaixo de 20**.
- **Não ancore** nos graus antigos 1–6 nem nos atributos do NPC: leia o feito na tabela.
- Feitos planetários/excepcionais vão em `peak`, não em `grau` (salvo NPC que é a própria variante cósmica).
- Referência: o magnetismo do Magneto é **25 de rotina** (aço em escala de ponte/estádio,
  ~400–900 kt → 24–25), com os feitos planetários em `peak`.

## 2. Tabela universal de APs

Fonte de verdade: **regra log2** implícita na "Tabela Unificada" da wiki
(`assets/js/wiki-pages.js:313-390`; exemplos por coluna em `:915-982` distância/velocidade,
`:984-1050` massa, `:1053-1122` tempo, `:1124+` energia):

> **Valor(AP) = Valor(0) × 2^AP** → **AP = round(log2(quantidade / Valor(0)))**
> Valor(0): distância **3 m** · massa **~22,7 kg** · velocidade **2,5 km/h** (3 m por turno de 4 s)
> · tempo **4 s** · energia **1 kJ**. Atalho: **+10 AP = ×1.000**.

Confere com a âncora do usuário: **8 AP ≈ 6 t** (`wiki-pages.js:345`) e "8 é muito pouco para o Magneto".

| AP | Massa | Distância / raio | Velocidade | Tempo | Âncoras X-Men |
|---:|---|---|---|---|---|
| 0 | 23 kg | 3 m (sala) | 2,5 km/h | 4 s | criança pequena |
| 2 | 90 kg | 12 m | 10 km/h | 15 s | humano adulto; humano comum |
| 4 | 340 kg | 45 m (prédio) | 40 km/h | 1 min | atleta olímpico; corrida máx. humana |
| 5–6 | 0,7–1,5 t | 90–180 m (quarteirão) | 80–160 km/h | 2–4 min | **pico humano** (REGRAS:44); **carro** 1,5 t = 6 |
| 8 | 6 t | 760 m | 640 km/h | 15 min (cena) | caminhão/ônibus; dobra ferro (REGRAS:45) |
| 9 | 13 t | 1,5 km | 1.200 km/h (Mach 1) | 30 min | |
| 10–11 | 25–50 t | 3–5 km | 2.400–4.800 km/h | 1–2 h | blindado leve; **tanque** ~60 t ≈ 11 |
| 12 | 100 t | 11 km (cidade pequena) | 10.000 km/h (míssil) | 4 h | avião pequeno; baleia azul ~150 t ≈ 13 |
| 14 | 400 t | 45 km (metrópole) | 40.000 km/h (escape) | 15 h | Boeing 747 ≈ 14 |
| 16–17 | 1,5–3 kt | 180–360 km | órbita baixa ~28.000 km/h ≈ 13,5 | 2–4 dias | ISS/LEO ~400 km = **17** (distância) |
| 18–19 | 6–12 kt | 700–1.400 km (estado) | | 1–2 sem | **submarino nuclear** ~8–19 kt ≈ 18–20; prédio pequeno |
| 20–21 | 25–50 kt | 2.800–5.600 km (país/continente) | | 1–2 meses | destróier/navio médio; raio de continente ≈ 20–21 |
| 22–24 | 100–400 kt | 11.000–44.000 km (**global**) | | 4 m–1 ano | porta-aviões ~100 kt = 22; arranha-céu ~365 kt ≈ 24; raio da Terra 6.400 km = 21, meia volta = 23 |
| 25 | 800 kt | 88.000 km | | | ponte Golden Gate ≈ 25 |
| 27 | 3 Mt | 384.000 km (**Lua**) | | | (a wiki põe Terra–Lua em 28 — erro; é 27) |
| 30 | 24 Mt | 3 milhões km | | | montanha pequena |
| 35–40 | 0,8–25 Gt | sistema solar interno → limite | | | |
| 43 | ~1,6×10¹¹ t | 25 bilhões km | | | **ergue o Everest** (REGRAS:56) |
| 51 | | 1 ano-luz | | | interestelar |
| 60–70+ | escala planetária → planeta | galáctico | | | **Terra** ~6×10²¹ t ≈ 78 |

**Área/volume:** não há coluna — use o AP do **raio** na coluna Distância.

### Dano / energia — use o que é destruído, não joules

Os joules da wiki (`wiki-pages.js:1124+`) subestimam: a Hiroshima (63 TJ) daria AP 36, enquanto
a coluna Corpo do sistema põe "resiste a ataque nuclear" em 22–24 (`REGRAS:51`). Para dano, use o
**alvo arruinado** (massa na coluna Massa) e os descritores de Corpo/Força do REGRAS (`:41-53`),
que batem com a coluna Massa:

| AP | Destrói (dano) / aguenta (resistência) |
|---:|---|
| 1–4 | soco humano → golpe de atleta |
| 5–6 | pico humano; amassa carro; arromba porta |
| 7–8 | parede de tijolo, balas de baixo calibre; vira caminhão |
| 9–10 | concreto armado, artilharia leve; parte blindado leve |
| 11–12 | **tanque**, bunker |
| 13–15 | titânio/antitanque; derruba avião grande, navio pequeno |
| 16–18 | "virtualmente indestrutível"; derruba prédio pequeno inteiro |
| 19–21 | artilharia pesada; arrasa quarteirão; afunda navio médio |
| 22–24 | ataque nuclear tático; derruba arranha-céu |
| 25–30 | distrito → cidade; montanha pequena |
| 31–45 | região → continente; montanhas massivas (Everest 43) |
| 46–60 | crosta, asteroide, devastação planetária |
| 70+ | destrói planeta |

### Discordâncias encontradas (não corrigir as fontes; só não propagar)

- `sistema_hibrido_v3.md:617-636` (§18.3/18.4) põe **montanhas em 16–22** e "devastação de
  quarteirão" em 9–13. Pela regra log2, 16–22 = 1,5–100 kt (prédio → porta-aviões); montanha
  ≥ 30. §18.1 (tempo) e §18.2 (distância) batem.
- `REGRAS_CRIACAO_PERSONAGEM.md:68-73` (coluna Mente) põe telepatia de 1 km em 11–12, 10 km em
  13–15, continental 16–18, global 19–21. Pela tabela universal: 1 km ≈ 8–9, 10 km ≈ 12,
  continental ≈ 20–21, global ≈ 23–24. **Use a tabela universal.**
- Wiki massa AP 29–33 não dobram certo (10/13/26/52/100 Mt; o correto é 12/24/49/97/195 Mt);
  "trem de carga" em 22 (um trem real tem ~10–20 kt ≈ 19–20); Terra–Lua em 28 (≈ 27).
- REGRAS Força (`:42-56`) bate com a regra (7–8 = 3–6 t; 16–18 = 1,6–6,4 kt; Everest 43).

## 3. Regras por benchmark

| benchmark | como achar o grau |
|---|---|
| `peso` | maior massa movida/erguida/arremessada **rotineiramente** → coluna Massa |
| `distancia` | alcance útil (teleporte, rajada, detecção, comunicação) → coluna Distância |
| `area` | raio do efeito → coluna Distância |
| `velocidade` | km/h de rotina → AP = log2(km/h ÷ 2,5) |
| `energia` | dano: o que arruína (tabela de dano acima) |
| `resistencia` | o que aguenta (tabela de dano/Corpo); cura e fator de cura também |
| `informacao` | mental, ilusão, furtividade, social, conhecimento (ver §4) |
| `duracao` | tags cujo ponto é tempo (imortalidade, precognição) — grau por faixa, **nunca** o valor da coluna Tempo |
| `outro` | relativo/binário (ver §4) ou nada acima serve; diga no `feat` a que foi pareado |

**Rotina vs pico:** `grau` = feito **rotineiro** demonstrado. Registre o **pico** no `feat` e,
se quiser, em `peak` (informativo, aparece na revisão, não vai para o SQL). Exceção: formas
cósmicas/variantes (Fênix Negra, Onslaught, Apocalipse com tecnologia Celestial…) ficam no nível
delas **só quando a entrada do NPC é essa variante**. Se o texto da tag É o feito ("Escudo
Magnético Global"), grade o feito que o texto afirma.

**Faixas** (para o que não tem coluna física): **1–6 humano · 7–15 rua · 16–30 Ômega · 31+ cósmico**.

## 4. Casos especiais

- **Mental / ilusão / furtividade / social / conhecimento:** se o alcance é o ponto (telepatia,
  rastreamento), use Distância: sala 0–1 · prédio 4 · campus 6 · cidade 12–13 · estado/país
  18–20 · continente 21 · **global 23–24** · órbita baixa 17 · Lua 27 · interplanetário 30–40 ·
  interestelar 51+. Senão, julgue pela faixa. `benchmark: informacao`, `confidence` no máximo `media`.
- **Relativo/binário** (capacete de Magneto vs telepatia, intangibilidade, anulação de poder,
  absorção/mimetismo, "imune a X"): pareie com o que se opõe — o capacete ≥ telepatia de Xavier;
  anulação ≥ graus típicos dos alvos que ela anula na ficção. `benchmark: outro`; diga no `feat`
  a que foi pareado ("pareado à Telepatia Ômega de Xavier ~23 → 24").
- **Cura / durabilidade:** `resistencia`. Durabilidade pela tabela de dano. Cura pela gravidade
  do que regenera: cura acelerada leve 3–6 · ferimentos de bala em minutos 9–12 · regenera
  membros/órgãos 13–16 · volta de quase nada (Wolverine no auge) 18–22.
- **Duração** (imortalidade, janela de regeneração lenta, horizonte de precognição): NÃO converta
  pelo Tempo (dá números absurdos em combate). Grade como resistência/utilidade pela faixa;
  `resistencia`/`outro`/`duracao`, `confidence` `baixa` ou `media`.
- **Sensoriais:** alcance de detecção (Distância). Faro que rastreia por quilômetros ≈ 9–10.
- **Equipamento/tecnologia:** grade o que o item faz com as mesmas tabelas (rifle de plasma do
  Cable = dano; armadura = resistência). Equipamento genérico/vago ("Arsenal S.H.I.E.L.D.") →
  grau do uso típico (fuzil ≈ 5–7) ou `null` se não dá para dizer o que faz.
- **Gênio / perícia:** só se a tag descreve capacidade (inventar, curar, pilotar, lutar). Use
  REGRAS Inteligência/Destreza (`:41-53`) como faixa. Ex.: "além da ciência terrestre" = 13–15.
- **Rótulo "Ômega":** a palavra não dá grau. Grade o feito; poderes-assinatura de Ômegas
  costumam cair em 16–30.
- **Latente / bloqueado / instável** ("Potencial Ômega Latente", "poder ainda não despertado")
  → `null`. Instável mas usado em cena → grau do uso real com `confidence: baixa`.
- **Texto de fraqueza dentro de `poder`** ("Paraplégico", "Poderes em Declínio") ou texto
  corrompido (ex.: tag `"4"` de M (Monet St. Croix)) → `null`, `feat` explica.
- **Mesma capacidade em duas tags** (duas tags de capacete, voo repetido) → mesmo grau.
- **`null`** = a tag fica sem grau no banco: o SQL remove qualquer grau antigo (escala 1–6) dela, para não ser lido como AP. Use para tudo que não é
  capacidade mensurável. Não é "não sei": incerteza = grau + `confidence: baixa`.

## 5. Arquivo de notas (formato exato)

Um arquivo por chunk: `supabase/review/npc_graus/chunk-N.json`. Por NPC, **uma lista `tags`
única** cobrindo **todas** as tags de `temas[].poder` **e** todos os `extras` do chunk, com `texto`
**idêntico** ao baseline (copie, não redigite). O build recusa NPC com qualquer uma faltando.

```json
[
  {
    "name": "Magneto",
    "is_global": true,
    "tags": [
      { "texto": "Magnetismo Ômega", "grau": 25, "peak": 30, "benchmark": "peso",
        "feat": "rotina: aço em escala de ponte/estádio ~400–900 mil t → 24–25; pico: polos magnéticos da Terra",
        "confidence": "media" },
      { "texto": "Voo Magnético", "grau": 10, "benchmark": "velocidade",
        "feat": "extra; mesmo voo de Voo por Levitação Magnética", "confidence": "media" },
      { "texto": "Sobrevivente de Auschwitz", "grau": null, "benchmark": null,
        "feat": "histórico, não é capacidade", "confidence": "alta" }
    ]
  }
]
```

- `grau`: inteiro 1–99 ou `null`. `peak`: inteiro opcional.
- `benchmark`: `peso | distancia | area | velocidade | energia | informacao | duracao | resistencia | outro` (`null` permitido se `grau` null).
- `feat`: curto, pt-BR, com o número e a conta ("ergue submarino nuclear ~8.000 t → 18"). Obrigatório se `grau` não-null.
- `confidence`: `alta | media | baixa`.
- Validar: `node scripts/gen-npc-graus.js build --partial` (lê todo `supabase/review/npc_graus/`;
  erro lista tag faltante, conflito entre arquivos, grau inválido; notas de NPC/tag fora do baseline
  são descartadas com aviso). Depois `git checkout` dos outputs se só estava testando.
- **Rodada prod** (baseline = export de produção, `baseline --from-csv`): `todo --out <dir>` gera
  `chunk-N.json` só com as tags ainda sem nota. Por NPC, contexto em `temas` (poder + fraqueza),
  `extras` e `notas_existentes` (já graduadas — use como referência de consistência, não repita).
  Preencha **só** `tags[]` (`grau`, `benchmark`, `feat`, `confidence`, `peak` opcional; não mude
  `texto`) e salve como `supabase/review/npc_graus/prod-N.json` (mesmo N). O build junta com as
  notas reaproveitadas por NPC (name+is_global) e texto (trim + case-insensitive).

## 6. Exemplos trabalhados

### Magneto (extremo) — atributos ~5–14
| Tag | Grau | Bench. | Feat |
|---|---:|---|---|
| Magnetismo Ômega | 25 | peso | rotina: aço em escala de ponte/estádio ~400–900 kt → 24–25 → 25 (pico: inverte polos da Terra, `peak` 30) |
| Campo de Força Magnético Pessoal | 19 | resistencia | aguenta barragem de Sentinelas / artilharia pesada (19–21) |
| Voo por Levitação Magnética | 10 | velocidade | supersônico de rotina ~2.400 km/h |
| Voo Orbital por Levitação | 14 | velocidade | velocidade de escape ~40.000 km/h |
| Escudo Magnético Global | 21 | area | o texto é o feito: raio da Terra ~6.400 km |
| Gera Pulso Eletromagnético Capaz de Cegar Satélites | 17 | distancia | órbita baixa ~400 km |
| Constrói Fortalezas … em Segundos | 17 | peso | fortaleza de aço ~3.000 t |
| Arranca Estruturas de Metal de Cidades Inteiras | 25 | peso | Golden Gate ~800 mil t |
| Capacete Anti-Telepatia | 24 | outro | pareado à telepatia de Xavier com Cérebro (~23) |
| Extrai Adamantium do Esqueleto | 18 | outro | pareado ao Esqueleto de Adamantium (16–18) |
| Manipula Hemoglobina | 14 | outro | ignora armadura; pareado a Corpo de super-humanos de rua — `baixa` |
| Gênio Científico | 14 | informacao | construiu o Asteroide M ("além da ciência terrestre") |
| Carisma Revolucionário | 14 | informacao | lidera Irmandade/Genosha (influência hemisférica) |
| Sobrevivente de Auschwitz · Visão de Supremacia · Anti-Vilão a Anti-Herói | null | — | histórico/ideologia/arco |
| _extras:_ Campo de Força Magnético · Voo Magnético | 19 · 10 | — | repetem as tags de poder equivalentes |

Note: o 6 antigo vira 25 — e 25 é peso de verdade (~800 kt), não "nível máximo".

### Noturno (médio) — Destreza 12
| Tag | Grau | Bench. | Feat |
|---|---:|---|---|
| Teletransporta-se em saltos curtos… | 9 | distancia | saltos de rotina ~1,5 km com linha de visão (pico ~5 km = 11) |
| Transporta aliados… | 4 | peso | leva 2–3 pessoas ~340 kg |
| Evita ataques reposicionando-se… | 10 | velocidade | some antes do tiro: projétil ~2.400 km/h |
| Acrobacia aérea e equilíbrio sobre-humanos | 8 | outro | acima do pico humano (faixa rua) — mantém 8 mesmo com Destreza 12 |
| Camuflagem natural em sombras | 8 | informacao | quase invisível no escuro |
| Serve como conselheiro espiritual… | null | — | papel social |
| _extra:_ Teletransporte via Dimensão Sombria (bamf) | 9 | distancia | mesmo teleporte |
| _extra:_ Visão no Escuro | 6 | distancia | enxerga no breu a ~180 m — `baixa` |
| _extras:_ Fé Católica Profunda · Humor como Defesa · Cada Teleporte deixa rastro de enxofre | null | — | traço / fraqueza disfarçada |

### Icarus (baixo, aluno) — atributos 4–6
| Tag | Grau | Bench. | Feat |
|---|---:|---|---|
| Voo Ágil e Sustentado | 5 | velocidade | ave de rapina ~80 km/h (pico 6) |
| Visão Aguçada em Altitude | 8 | distancia | distingue uma pessoa a ~760 m |
| Manobras Aéreas Evasivas | 5 | outro | esquiva de ave veloz (faixa humana alta) |
| Grandes Asas Emplumadas | null | — | traço físico; o voo está na outra tag |
| Membro da Família Guthrie · Instinto Protetor · Gentileza · Determinação | null | — | relacionamento/personalidade |

Aluno de perigo baixo com grau 8 numa tag é correto: não há teto por perigo.

## 7. Rodada prod — filler de template (decisão fechada)

~1.400 das 1.551 tags sem nota da rodada prod são textos de template repetidos verbatim em 6+ NPCs,
presentes independentemente do personagem (o Cosmo, um cão, tem "Mestre de Múltiplas Disciplinas").
Política: **um valor por texto (todos null), aplicado mecanicamente em todo NPC** (casamento trim + case-insensitive),
seguindo o precedente dos graders antigos. Tags NPC-específicas continuam graduadas uma a uma.

| Texto | Grau | Motivo |
|---|---:|---|
| Membro dos X-Men · Membro dos Novos Mutantes · Membro do Clube do Inferno · Membro da Irmandade de Mutantes · Membro da X-Force / X-Corp · Membro dos Morlocks · Humano com Acesso a Alto Escalão · Opera nos Dois Lados | null | afiliação/rótulo organizacional |
| Conhecido no Submundo Mutante · Mutante Experiente · Mutante de Elite · Mutante de Nível Baixo · Mutante de Niveau Ômega ou Equivalente · Rede de Contatos e Aliados · Ameaça Nível Global | null | rótulo descritivo; "Ômega"/"Elite" não dá grau (§4) |
| Instinto de Sobrevivência · Trabalho em Equipe · Habilidade Especial · Lealdade · Determinação · Determinação Inabalável · Vontade de Ferro · Sorte nos Momentos Críticos · Conhecimento Tático · Exploração de Ambiente · Treinamento Intensivo · Táticas Avançadas · Combate Corporal · Estratégia | null | template; já null uniforme nos chunks antigos |
| Estratégia Avançada · Presença Imponente · Adaptabilidade Extrema · Conhecimento Oculto · Liderança Nata · Experiência de Séculos · Manipulação em Escala Global · Percepção Sobre-Humana · Mestre de Múltiplas Disciplinas | null | bloco de template dos NPCs "cósmicos/mentais" (Cosmo, Mastermind, Eternos…): não descreve feito do personagem |
| Treinamento de Combate · Reflexos Aguçados · Reflexos Rápidos · Perícia em Campo · Veterano de Combate · Resistência Mental Treinada · Liderança em Campo · Vigilância Constante · Movimentação Tática · Intuição de Batalha · Tática e Estratégia · Resistência a Dano · Habilidade de Luta · Décadas de Experiência de Combate · Mestre Tático · Vontade Indomável | null | perícia genérica de template, aparece até onde não se aplica; um número fixo mentiria para metade dos NPCs; precedente antigo (Reflexos Rápidos, Perícia em Campo, Combate Corporal = null) |
| Resiliência Física e Mental · Reflexos Sobre-Humanos · Resistência Mental Superior | null | template que cai até em Onslaught, Legion, Shadow King, Nate Grey, Cosmo (cão) e Mastermind: um 8/9/10 fixo engana. Null nas notas novas; os graus individuais antigos desses textos (M 8; Thena 9/10) continuam reaproveitados |

Variante de filler dentro de um tema próprio segue o filler equivalente ("Liderança de Campo" do Rictor = null,
como "Liderança em Campo"), salvo quando espelha uma capacidade real já graduada do NPC ("Resiliência Física" do
Blockbuster = 11, a mesma durabilidade de Força e Resistência Colossais).
