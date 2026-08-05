---
type: meta
title: "Fonte de Verdade — Princípios da Campanha X-Men"
campaign_year: 2010
continuity: "Continuidade própria inspirada em Earth-616"
status: source-of-truth
version: "1.0"
last_updated: 2026-08-04
---

# Fonte de Verdade — Princípios da Campanha X-Men

> [!IMPORTANT]
> Este documento estabelece os **princípios inegociáveis** da continuidade da campanha.
> Qualquer adição ao vault deve respeitar estas regras.

---

## 1. Hierarquia de verdade

| Prioridade | Fonte | Exemplo |
|---|---|---|
| 1ª | **Este vault (campanha)** | Xavier desapareceu em 2004 |
| 2ª | **Decisões do Mestre** | "Vulcan retorna em 2012" |
| 3ª | **Cânone Marvel (Earth-616)** | Usar para enriquecer, nunca contradizer |
| 4ª | **Adaptações (filmes, desenhos)** | Apenas inspiração visual/narrativa |

**Regra de ouro:** Se o cânone contradiz o vault, o vault vence. Registre a divergência em `## Divergências do cânone`.

---

## 2. Regras obrigatórias de continuidade

### 2.1 Não substituir a campanha pelo cânone
- A cronologia da campanha (1989–2010) é fixa
- Eventos canônicos ocorrem em anos diferentes ou não ocorrem (ex: Onslaught não existe)
- Personagens podem ter origens, idades ou relações diferentes

### 2.2 Não inventar fatos ausentes
Quando a informação não está no seed ou decisões do Mestre:
- Use `fonte: pendente` no frontmatter
- Adicione seção `## Questões em aberto`
- Ou use callout `> [!QUESTION] Texto da questão`
- **Nunca** preencha lacunas com "provavelmente", "assume-se", invenção

### 2.3 Distinguir sempre o status da informação
Todo fato em notas deve ter classificação clara:

| Status | Significado | Uso |
|---|---|---|
| `estabelecido` | Confirmado pelo usuário/Mestre | Fatos do seed, decisões de mesa |
| `adaptado` | Inspirado no cânone, mas modificado | "Emma entra nos X-Men em 2009 (adaptado)" |
| `planejado` | Evento futuro agendado pelo Mestre | "Dia M ocorre em 2011 (planejado)" |
| `hipótese` | Possibilidade em aberto, não decidida | "Vulcan pode estar com os Shi'ar (hipótese)" |
| `pendente` | Informação faltando, aguardando definição | "Poderes do Maestro (pendente)" |

### 2.4 Português do Brasil obrigatório
- Todas as notas em pt-BR
- Termos técnicos: "Sala de Perigo" (não Danger Room), "Cérebro" (não Cerebro)
- Nomes de equipes: "X-Men", "Novos Mutantes", "Geração X", "Academia X"

### 2.5 Wikilinks obrigatórios
- Toda menção a personagem, equipe, local, evento, organização = `[[Wikilink]]`
- Use aliases quando necessário: `[[Krakoa|Cracoa]]`, `[[Anjo|Warren Worthington III]]`

### 2.6 Evitar dossiês duplicados
- **Penance = Monet St. Croix** (uma pessoa, alias)
- **Nicole St. Croix ≠ Claudette St. Croix** (duas pessoas)
- Versões alternativas/temporais só ganham nota separada se existirem nesta continuidade

### 2.7 Contagem dos 198 — apenas mutantes
- Não contar não-mutantes (Capitão Britânia, Fanático, Pete Wisdom humano, etc.)
- Mímica conta como mutante nesta continuidade
- Franklin Richards conta como mutante nesta continuidade
- Gaia conta como mutante alienígena
- Penance não é contada separadamente de Monet
- Página de auditoria: `[[09 - Referência/Contagem dos 198]]`

### 2.8 Status em 2010 obrigatório
Toda nota de personagem/evento deve indicar situação no ano da campanha (2010).

### 2.9 Divergências do cânone
Quando informação canônica conflitar com a campanha:
- Crie seção `## Divergências do cânone` na nota
- Descreva a versão canônica e a versão da campanha
- **Não altere** a versão da campanha

### 2.10 Personagens dos jogadores — não inventar
- Não criar poderes, origens, personalidades para PCs
- Use campos `pendente` quando dados não estiverem no seed
- Aguardar input dos jogadores/Mestre

### 2.11 Terminologia fixa
- **Cérebro** = sistema de detecção mutante (nunca "cerebral", "Cerebro")
- **Krakoa** = ilha mutante (alias `Cracoa` permitido)
- **Sala de Perigo** = treinamento (não "Danger Room")

### 2.12 Instituto = escola real
- Anos acadêmicos separados dos esquadrões
- Esquadrões = grupos de treinamento, não equipes operacionais
- Alunos da Academia X **não realizam missões reais de campo**
- Pós-graduação: avaliação → reintegração (Instituto, X-Corp, equipes periféricas, candidatos a X-Men, universidade, vida civil, suporte)

---

## 3. Estrutura geracional (resumo)

| Geração | Período | Definição |
|---|---|---|
| X-Men originais | 1989 | Primeira equipe secreta |
| Deadly Genesis | 1992 | Equipe secreta pré-Krakoa |
| 2ª formação X-Men | 1992 | Resgate de Krakoa |
| 1ª geração estudantil | 2004 | Novos Mutantes I + Geração X |
| 2ª geração estudantil | 2005–2009 | Jogadores → Novos Mutantes II |
| 3ª geração estudantil | 2009– | Academia X |
| Time Vermelho | 2010 | Promoção dos jogadores |
| Turma dos sobreviventes | Pós-Dia M | Manifestados antes do Dia M |
| Anos Vazios | Pós-Dia M | Zero nascimentos/manifestações |
| Geração Hope | Futuro | Hope + Cinco Faróis |
| Geração da Restauração | Futuro distante | Retorno gradual |

---

## 4. Validação contínua

Antes de considerar qualquer nota "pronta", verificar:
- [ ] Frontmatter completo com `fonte` correto
- [ ] Wikilinks para todas as entidades mencionadas
- [ ] Status em 2010 indicado
- [ ] Seção `## Divergências do cânone` se aplicável
- [ ] Seção `## Questões em aberto` se houver lacunas
- [ ] Sem informações inventadas
- [ ] Português do Brasil
- [ ] Terminologia correta (Cérebro, Sala de Perigo, etc.)

---

*Documento base: [[00 - Meta/Início]] | Template: [[_templates/Personagem]] | Auditoria: [[00 - Meta/Auditoria de Continuidade]]*