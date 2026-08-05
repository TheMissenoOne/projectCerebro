---
type: meta
title: "Auditoria de Continuidade — Checklist de Validação"
campaign_year: 2010
status: reference
version: "1.0"
last_updated: 2026-08-04
---

# Auditoria de Continuidade — Checklist de Validação

> [!IMPORTANT]
> Use esta página para validar o vault antes de considerar qualquer etapa "pronta".
> Marque `[x]` quando confirmado. Itens `[ ]` indicam pendências.

---

## 1. Validações do Seed (regras inegociáveis)

### 1.1 Cronologia e eventos-chave
- [ ] Kitty Pryde aparece pela primeira vez durante a Saga da Fênix Negra (1994)
- [ ] Kitty é sequestrada pelo Clube do Inferno (1994)
- [ ] Dias de um Futuro Esquecido ocorre em **1996** (não 1981)
- [ ] **Onslaught não existe** nesta continuidade
- [ ] Geração X é treinada na **Academia de Massachusetts** (não Ilha Muir)
- [ ] Emma Frost e Banshee idealizam a Geração X após se encontrarem na **Ilha Muir**
- [ ] **Jubileu NÃO integra** o time de 1992 (muito jovem)
- [ ] **Penance = Monet St. Croix** (uma pessoa, não duas)
- [ ] Jogadores = **Novos Mutantes II** → promovidos a **Time Vermelho** em 2010
- [ ] **Academia X = terceira geração** estudantil (2009+)
- [ ] **Estrela Polar está no Time Dourado** (2010)
- [ ] **Kiden Nixon e Leech** = próxima geração pós-Dia M (confirmados)
- [ ] Contagem de trabalho: **167 nomeados + 31 não nomeados = 198**
- [ ] **Não-mutantes NÃO entram** na contagem (Capitão Britânia, Fanático, etc.)
- [ ] **Nenhum aluno da Academia X realiza missões reais** de campo

### 1.2 Estrutura geracional
- [ ] X-Men originais: 1989 (Ciclope, Fera, Jean, Homem de Gelo, Anjo)
- [ ] Deadly Genesis: 1992 (Vulcan, Darwin, Petra, Sway) — fracasso
- [ ] 2ª formação X-Men: 1992 (Tempestade, Wolverine, Colossus, Noturno, Gambit, Psylocke, Vampira)
- [ ] 1ª geração estudantil: 2004 (Novos Mutantes I + Geração X = 17 total)
- [ ] 2ª geração estudantil: 2005–2009 (Jogadores → Novos Mutantes II)
- [ ] 3ª geração estudantil: 2009+ (Academia X = 30 estudantes)
- [ ] Time Vermelho: 2010 (promoção dos jogadores)
- [ ] Turma dos sobreviventes: Pós-Dia M (manifestados antes)
- [ ] Anos Vazios: Pós-Dia M (zero nascimentos/manifestações)
- [ ] Geração Hope: Futuro (Hope + 5 Faróis)
- [ ] Geração da Restauração: Futuro distante

### 1.3 Personagens e identidades
- [ ] Penance = Monet (alias, não dossiê separado)
- [ ] Nicole St. Croix ≠ Claudette St. Croix (duas pessoas)
- [ ] Mímica = mutante (contar nos 198)
- [ ] Franklin Richards = mutante (contar nos 198)
- [ ] Gaia = mutante alienígena (contar nos 198)
- [ ] Capitão Britânia = NÃO mutante (excluir dos 198)
- [ ] Fanático = NÃO mutante (excluir dos 198)
- [ ] Pete Wisdom = humano (excluir dos 198, exceto se mutante na campanha)

### 1.4 Terminologia
- [ ] **Cérebro** usado consistentemente (nunca "cerebral", "Cerebro")
- [ ] **Sala de Perigo** usado (não "Danger Room")
- [ ] **Krakoa** indexada com alias `Cracoa`
- [ ] Português do Brasil em todas as notas

---

## 2. Validações estruturais do vault

### 2.1 Diretórios e arquivos obrigatórios
- [ ] `00 - Meta/` — Início, Fonte de Verdade, Convenções, Auditoria, Questões
- [ ] `01 - Linha do Tempo/` — Mestra + 1989 a 2010 + Futuro Planejado
- [ ] `02 - Personagens/` — subpastas por categoria
- [ ] `03 - Equipes e Organizações/` — todos os grupos listados no seed
- [ ] `04 - Instituto Xavier/` — estrutura completa
- [ ] `05 - Locais/` — todos os locais listados
- [ ] `06 - Eventos e Sagas/` — todos os eventos listados
- [ ] `07 - Mistérios e Tramas/` — todas as tramas listadas
- [ ] `08 - Sessões/` — estrutura de sessões
- [ ] `09 - Referência/` — Glossário, Relações, Índices, Contagem dos 198
- [ ] `_templates/` — Personagem, Equipe, Organização, Local, Evento, Ano, Sessão

### 2.2 Dossiês prioritários (mínimo)
- [ ] Ciclope
- [ ] Kitty Pryde
- [ ] Emma Frost
- [ ] Xavier
- [ ] Magneto
- [ ] Jean Grey
- [ ] Madelyne Pryor
- [ ] Vulcan
- [ ] Darwin
- [ ] Tempestade
- [ ] Cable
- [ ] Rei das Sombras
- [ ] Cassandra Nova
- [ ] Integrantes do Time Vermelho (8)
- [ ] Kiden Nixon
- [ ] Leech

---

## 3. Validações de conteúdo por nota

### 3.1 Todas as notas de personagem
- [ ] Frontmatter completo com `type: personagem`
- [ ] `fonte:` preenchido (estabelecido/adaptado/planejado/pendente)
- [ ] `status_2010:` preenchido
- [ ] `status_poder:` preenchido
- [ ] Wikilinks para todas as entidades mencionadas
- [ ] Seção `## Situação em 2010` presente
- [ ] Seção `## Divergências do cânone` se aplicável
- [ ] Seção `## Questões em aberto` se houver lacunas
- [ ] Sem informações inventadas (powers, origem, personalidade de PCs)
- [ ] Português do Brasil

### 3.2 Todas as notas de evento
- [ ] Frontmatter completo com `type: evento`
- [ ] `fonte:` preenchido
- [ ] `status:` preenchido (ocorrido/em_andamento/planejado)
- [ ] `escala:` preenchida
- [ ] Wikilinks para participantes, locais, organizações
- [ ] Seção `## Consequências` presente
- [ ] Seção `## Divergências do cânone` se aplicável

### 3.3 Todas as notas de equipe/organização
- [ ] Frontmatter completo com `type: equipe` ou `organizacao`
- [ ] `status_2010:` preenchido
- [ ] Wikilinks para membros, base, líder
- [ ] Composição em 2010 clara

---

## 4. Validações de cross-referência

### 4.1 Wikilinks bidirecionais
- [ ] Personagem → Equipe: membro lista equipe, equipe lista membro
- [ ] Personagem → Local: personagem lista local_2010, local lista pessoal
- [ ] Evento → Participantes: evento lista participantes, participantes referenciam evento
- [ ] Equipe → Base: equipe lista base, base lista equipe

### 4.2 Contagem dos 198
- [ ] Página `[[09 - Referência/Contagem dos 198]]` existe
- [ ] Conta pessoas únicas (sem duplicatas)
- [ ] Exclui Capitão Britânia, Fanático
- [ ] Trata Penance = Monet
- [ ] Nicole e Claudette separadas
- [ ] Inclui Mímica, Franklin Richards, Gaia
- [ ] Mantém 31 não nomeados
- [ ] Sinaliza duplicidades

### 4.3 MOCs (Maps of Content)
- [ ] `[[MOC - Linha do Tempo]]`
- [ ] `[[MOC - X-Men]]`
- [ ] `[[MOC - Instituto Xavier]]`
- [ ] `[[MOC - Academia X]]`
- [ ] `[[MOC - Sobreviventes do Dia M]]`
- [ ] `[[MOC - Morlocks]]`
- [ ] `[[MOC - Genosha]]`
- [ ] `[[MOC - Mistérios]]`
- [ ] `[[MOC - Futuro Planejado]]`
- [ ] `[[MOC - Personagens dos Jogadores]]`
- [ ] Cada MOC tem: resumo, links principais, status, perguntas abertas, relações com sessões, eventos anterior/posterior

---

## 5. Validações de sessões (se houver jogadas)

### 5.1 Estrutura
- [ ] `[[08 - Sessões/Índice de Sessões]]` existe
- [ ] Sessões jogadas em `Sessões Jogadas/`
- [ ] Próximas sessões em `Próximas Sessões/`
- [ ] NPCs por sessão indexados
- [ ] Consequências registradas

### 5.2 Conteúdo
- [ ] Cada sessão tem frontmatter completo
- [ ] NPCs aparecidos ligados aos dossiês
- [ ] Consequências narrativas e mecânicas claras
- [ ] Ganchos para próxima sessão

---

## 6. Relatório de auditoria

> [!NOTE]
> Preencha após cada validação completa.

**Data da auditoria:** YYYY-MM-DD  
**Auditor:** Nome  
**Versão do vault:** X.Y  

### Itens conformes
- 

### Itens não conformes (ação requerida)
- 

### Questões em aberto descobertas
- 

### Próxima auditoria agendada
YYYY-MM-DD

---

*Base: [[00 - Meta/Fonte de Verdade]] | Convenções: [[00 - Meta/Convenções do Vault]] | Questões: [[00 - Meta/Questões em Aberto]]*