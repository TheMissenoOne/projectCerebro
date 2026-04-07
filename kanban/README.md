# Kanban Board - X-MEN TTRPG Implementation

## Visão Geral

Este board documenta as 5 fases principais da implementação do projeto X-MEN TTRPG, seguindo a especificação completa em IMPLEMENTACAO.md.

**Stack:** Node.js + Express + PostgreSQL (Render.com)

---

## Estrutura das Colunas

| Coluna | Significado |
|--------|-------------|
| **To Do** | Fases planejadas, ainda não iniciadas |
| **Doing** | Fases em execução |
| **Done** | Fases concluídas |

---

## Como Usar

1. Cada card representa uma fase de implementação
2. Move o card para "Doing" ao iniciar o trabalho
3. Marque como "Done" ao completar todos os checkpoints
4. Use os checklists para acompanhar o progresso

---

## Progresso Geral

- [ ] Fase A: Migração para PostgreSQL (schema + JWT)
- [ ] Fase B: Ajustar `api.js` com auth header
- [ ] Fase C: Funcionalidades completas no dashboard
- [ ] Fase D: Criar `combate.html` (calculadora AV/OV)
- [ ] Fase E: Seed dos 134 NPCs

---

## Próximo Passo

Iniciar a **Fase B** (ajustar api.js com auth header) — trabalho rápido que não requer banco de dados.
