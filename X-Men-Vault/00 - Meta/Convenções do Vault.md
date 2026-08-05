---
type: meta
title: "Convenções do Vault — Templates e Padrões"
campaign_year: 2010
status: reference
version: "1.0"
last_updated: 2026-08-04
---

# Convenções do Vault — Templates e Padrões

> [!NOTE]
> Referência técnica para formatação consistente de todas as notas.

---

## 1. Template de Personagem

### 1.1 Frontmatter obrigatório

```yaml
---
type: personagem
nome: "Nome completo"
aliases: ["Apelido", "Codinome"]
nome_civil: "Nome civil"
mutante: true
origem: canonico | original | adaptado
status_2010: ativo | estudante | desaparecido | preso | refugiado | civil | morto | desconhecido
status_poder: ativo | despoderado | recuperado | nao_aplicavel
idade_2010: 0
idade_estimada: true
ano_nascimento_estimado: 1990
primeira_aparicao_campanha: "Ano ou evento"
geracao: "Nome da geração"
equipe_2010: ["Time Azul", "Academia X"]
afiliacoes: ["X-Men", "Instituto Xavier"]
local_2010: "Mansão Xavier"
mentor: "[[Nome do Mentor]]"
alunos: ["[[Aluno 1]]", "[[Aluno 2]]"]
familia: ["[[Familiar 1]]"]
poderes: ["Poder 1", "Poder 2"]
nivel_ameaca: baixo | medio | alto | critico | desconhecido
segredo: false
fonte: estabelecido | adaptado | planejado | pendente
tags: ["x-men", "estudante", "time-vermelho"]
---
```

### 1.2 Seções obrigatórias (ordem fixa)

```markdown
# Nome do Personagem

## Resumo
Descrição de 2-3 linhas: quem é, papel na campanha, status em 2010.

## Aparência
Descrição física, traje, características distintivas.

## Personalidade
Traços, valores, motivações, conflitos internos.

## Poderes
Lista detalhada com limitações conhecidas.

## Limitações
Fraquezas, custos, riscos, contraindicações.

## Treinamento e competências
Habilidades não-mutantes: combate, idiomas, academia, liderança, etc.

## Histórico na campanha
Cronologia resumida dos eventos vividos pelo personagem.

## Situação em 2010
Onde está, o que faz, relações atuais, pendências.

## Relações
- **Aliados:** [[Personagem]] — descrição
- **Rivais/Inimigos:** [[Personagem]] — descrição
- **Família:** [[Personagem]] — descrição
- **Mentores/Alunos:** [[Personagem]] — descrição

## Segredos e informações restritas
> [!SECRET]
> Informação sensível. Acesso restrito.

## Ganchos narrativos
- Gancho 1
- Gancho 2

## Divergências do cânone
> [!NOTE] Divergência
> **Cânone:** Descrição da versão editorial.
> **Campanha:** Descrição da versão da campanha.

## Questões em aberto
> [!QUESTION]
> Pergunta sem resposta definida.

> [!QUESTION]
> Outra pergunta pendente.
```

---

## 2. Template de Evento

### 2.1 Frontmatter obrigatório

```yaml
---
type: evento
nome: "Nome do Evento"
inicio: "YYYY-MM-DD" | "Ano"
fim: "YYYY-MM-DD" | "Ano" | "em_andamento"
status: ocorrido | em_andamento | planejado
escala: pessoal | institucional | nacional | global | cosmica | temporal
locais: ["[[Local 1]]", "[[Local 2]]"]
participantes: ["[[Personagem 1]]", "[[Personagem 2]]"]
organizacoes: ["[[Equipe 1]]", "[[Organização 2]]"]
consequencias: ["Consequência 1", "Consequência 2"]
fonte: estabelecido | adaptado | planejado
tags: ["saga", "genosha", "sentinelas"]
---
```

### 2.2 Seções obrigatórias

```markdown
# Nome do Evento

## Resumo
Descrição de 2-3 linhas.

## Contexto
Situação anterior, tensões, gatilhos.

## Desenvolvimento
Cronologia dos fatos principais.

## Participantes-chave
- [[Personagem]] — papel
- [[Equipe]] — papel

## Consequências imediatas
- Mudança 1
- Mudança 2

## Consequências de longo prazo
- Impacto 1
- Impacto 2

## Divergências do cânone
> [!NOTE] Divergência
> **Cânone:** Versão editorial.
> **Campanha:** Versão da campanha.

## Questões em aberto
> [!QUESTION]
> Pergunta pendente.
```

---

## 3. Template de Equipe

### 3.1 Frontmatter obrigatório

```yaml
---
type: equipe
nome: "Nome da Equipe"
fundacao: "YYYY" | "Evento"
dissolucao: "YYYY" | "Evento" | "ativa"
status_2010: ativa | inativa | dissolvida | reorganizando
lider: "[[Nome do Líder]]"
membros: ["[[Membro 1]]", "[[Membro 2]]"]
base: "[[Local]]"
funcao: "Descrição da função (operações, treinamento, investigação, etc.)"
geracao: "Geração X | Novos Mutantes II | Academia X | etc."
fonte: estabelecido | adaptado | planejado
tags: ["x-men", "time-vermelho", "operacional"]
---
```

### 3.2 Seções obrigatórias

```markdown
# Nome da Equipe

## Resumo
Descrição breve: propósito, composição, status em 2010.

## História
Formação, evolução, marcos.

## Composição em 2010
| Membro | Função | Status |
|---|---|---|
| [[Membro 1]] | Líder | Ativo |
| [[Membro 2]] | Combatente | Ativo |

## Base de operações
[[Local]] — descrição.

## Missões e operações notáveis
- Missão 1 (ano) — resultado
- Missão 2 (ano) — resultado

## Relações com outras equipes
- **Aliadas:** [[Equipe]] — contexto
- **Rivais:** [[Equipe]] — contexto
- **Subordinadas/Parceiras:** [[Equipe]] — contexto

## Questões em aberto
> [!QUESTION]
> Pergunta pendente.
```

---

## 4. Template de Local

### 4.1 Frontmatter

```yaml
---
type: local
nome: "Nome do Local"
tipo: mansao | base | cidade | ilha | instalacao | planeta | dimensao
status_2010: ativo | abandonado | destruido | ocupado | desconhecido
localizacao: "Descrição geográfica"
controlado_por: ["[[Organização 1]]", "[[Personagem 2]]"]
acesso: restrito | publico | secreto | condicional
fonte: estabelecido | adaptado | planejado
tags: ["instituto", "mansao", "nova-york"]
---
```

### 4.2 Seções

```markdown
# Nome do Local

## Resumo
O que é, onde fica, importância na campanha.

## Descrição física
Estrutura, layout, áreas notáveis.

## História na campanha
Eventos marcantes ocorridos no local.

## Áreas de interesse
- **Área 1:** Descrição
- **Área 2:** Descrição

## Pessoal fixo em 2010
- [[Personagem]] — função

## Segurança e acesso
Protocolos, defesas, restrições.

## Questões em aberto
> [!QUESTION]
> Pergunta pendente.
```

---

## 5. Template de Organização

### 5.1 Frontmatter

```yaml
---
type: organizacao
nome: "Nome da Organização"
fundacao: "YYYY"
status_2010: ativa | inativa | dissolvida | clandestina
lider: "[[Nome]]"
ideologia: "Descrição breve"
base: "[[Local]]"
membros_notaveis: ["[[Membro 1]]", "[[Membro 2]]"]
recursos: ["Recurso 1", "Recurso 2"]
fonte: estabelecido | adaptado | planejado
tags: ["antagonista", "purificadores", "governo"]
---
```

### 5.2 Seções

```markdown
# Nome da Organização

## Resumo
Propósito, escala, ameaça.

## Estrutura e hierarquia
Liderança, células, cadeia de comando.

## História na campanha
Origem, evolução, marcos.

## Objetivos em 2010
- Objetivo 1
- Objetivo 2

## Recursos e capacidades
Tecnologia, pessoal, influência, financiamento.

## Relações
- **Aliados:** [[Organização]] — contexto
- **Inimigos:** [[Equipe]] — contexto
- **Infiltrados/Informantes:** [[Personagem]] — contexto

## Questões em aberto
> [!QUESTION]
> Pergunta pendente.
```

---

## 6. Template de Ano (Linha do Tempo)

### 6.1 Frontmatter

```yaml
---
type: ano
ano: 1992
status: ocorrido
campanha: "X-Men"
tags: ["krakoa", "deadly-genesis", "segunda-formacao"]
---
```

### 6.2 Estrutura

```markdown
# 1992 — Título Resumido

## Resumo do ano
Visão geral de 2-3 parágrafos.

## Eventos principais
### Evento 1 — [[Nome do Evento]]
Descrição, data, consequências.

### Evento 2 — [[Nome do Evento]]
...

## Personagens introduzidos
- [[Personagem]] — contexto

## Mudanças de status
- [[Personagem]]: mudança (ex: "entra para os X-Men")

## Questões em aberto
> [!QUESTION]
> Pergunta sobre este ano.
```

---

## 7. Template de Sessão

### 7.1 Frontmatter

```yaml
---
type: sessao
numero: 1
data: "YYYY-MM-DD"
status: jogada | planejada | cancelada
mestre: "Nome"
jogadores: ["Jogador 1", "Jogador 2"]
personagens_jogadores: ["[[PC 1]]", "[[PC 2]]"]
npcs_aparecidos: ["[[NPC 1]]", "[[NPC 2]]"]
locais: ["[[Local 1]]", "[[Local 2]]"]
eventos_gerados: ["[[Evento 1]]"]
consequencias: ["Consequência 1"]
xp_ganho: 0
tags: ["sessao", "time-vermelho", "treinamento"]
---
```

### 7.2 Estrutura

```markdown
# Sessão 01 — Título

## Resumo
2-3 parágrafos do que aconteceu.

## Preparação
Ganchos, rumores, situação inicial.

## Desenvolvimento
### Cena 1 — [[Local]]
Participantes: [[PC 1]], [[NPC 1]]
O que aconteceu.

### Cena 2 — [[Local]]
...

## Consequências mecânicas
- XP: X
- Ferimentos: [[Personagem]] — descrição
- Recursos gastos/ganhos

## Consequências narrativas
- Mudança 1
- Mudança 2

## Ganchos para próxima sessão
- Gancho 1
- Gancho 2

## Notas do Mestre
Observações privadas.
```

---

## 8. Convenções de nomenclatura

### 8.1 Arquivos
- `Nome do Personagem.md` — sem prefixos numéricos
- `X-Men - Time Azul.md` — hífen entre nome e designação
- `2010.md` — apenas ano para linha do tempo
- `Instituto Xavier.md` — nome próprio

### 8.2 Wikilinks
- Sempre `[[Nome Exato do Arquivo]]`
- Aliases: `[[Krakoa|Cracoa]]`, `[[Anjo|Warren Worthington III]]`
- Seções: `[[Arquivo#Seção]]`

### 8.3 Tags (frontmatter)
- Minúsculas, kebab-case: `x-men`, `time-vermelho`, `academia-x`
- Categorias: `personagem`, `evento`, `equipe`, `local`, `organizacao`, `sessao`
- Temas: `genosha`, `sentinelas`, `fenix`, `dia-m`, `krakoa`

---

## 9. Callouts padrão

| Tipo | Uso |
|---|---|
| `> [!IMPORTANT]` | Regra crítica, aviso vital |
| `> [!NOTE]` | Informação complementar |
| `> [!QUESTION]` | Lacuna de informação (não inventar) |
| `> [!SECRET]` | Informação restrita (apenas Mestre) |
| `> [!WARNING]` | Perigo, armadilha, consequência grave |
| `> [!EXAMPLE]` | Exemplo de aplicação |

---

## 10. Metadados de status (resumo)

### Personagem — `status_2010`
- `ativo` — Em atividade (X-Men, equipe, independente)
- `estudante` — Matriculado na Academia X ou similar
- `desaparecido` — Paradeiro desconhecido
- `preso` — Detido/encarcerado
- `refugiado` — Abrigado no Instituto ou aliado
- `civil` — Vida civil, sem atuação heroica
- `morto` — Confirmado falecido
- `desconhecido` — Status incerto

### Personagem — `status_poder`
- `ativo` — Poderes funcionais
- `despoderado` — Perdeu poderes (Dia M, etc.)
- `recuperado` — Recuperou após perda
- `nao_aplicavel` — Não-mutante ou sem poderes

### Evento — `status`
- `ocorrido` — Completo no passado
- `em_andamento` — Acontecendo agora (2010)
- `planejado` — Futuro agendado pelo Mestre

### Equipe — `status_2010`
- `ativa` — Operando normalmente
- `inativa` — Existe mas não opera
- `dissolvida` — Encerrada oficialmente
- `reorganizando` — Em transição

---

*Base: [[00 - Meta/Fonte de Verdade]] | Início: [[00 - Meta/Início]] | Templates: [[_templates/]]*