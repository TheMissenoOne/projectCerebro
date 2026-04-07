# Fase A: Migração para PostgreSQL (schema + JWT)

## Descrição

Migração completa do backend em memória para PostgreSQL persistente no Render. Inclui criação do schema completo, autenticação JWT com bcrypt, e reestruturação das rotas em módulos separados.

---

## Escopo

### 1. Banco de Dados (schema.sql)

- [ ] Criar tabelas: `profiles`, `parties`, `party_members`, `characters`, `npcs`, `sessions`, `wiki_pages`
- [ ] Configurar índices de performance
- [ ] Adicionar constraints e CHECKs

### 2. Backend (server/)

- [ ] Criar `server/db.js` com Pool PostgreSQL
- [ ] Criar middleware `auth.js` (verificar JWT)
- [ ] Criar middleware `requireRole.js` (gm/player)
- [ ] Reestruturar rotas em arquivos separados:
  - `routes/auth.js` — register/login com bcrypt + JWT
  - `routes/profiles.js` — get profile
  - `routes/parties.js` — CRUD parties + members
  - `routes/characters.js` — CRUD personagens
  - `routes/npcs.js` — CRUD NPCs
  - `routes/sessions.js` — sessão de party
  - `routes/players.js` — /players/:id/characters, /party

### 3. package.json

- [ ] Adicionar dependências: bcryptjs, jsonwebtoken, pg, dotenv
- [ ] Adicionar scripts: start, dev, seed, db:init

### 4. Variáveis de Ambiente

- [ ] Criar `.env.example`
- [ ] Configurar JWT_SECRET no backend

---

## Dependências

- Render PostgreSQL (criar no painel do Render)
- Arquivo `schema.sql` (já documentado em IMPLEMENTACAO.md)

---

## Tempo Estimado

4-6 horas (trabalho intermediário)

---

## Checkpoints

- [ ] Schema SQL executado no banco
- [ ] Servidor conecta ao PostgreSQL
- [ ] Registro e login gerando JWT válido
- [ ] Todas as rotas funcionando com auth

---

## Links Úteis

- Render Dashboard: https://dashboard.render.com
- Schema: [IMPLEMENTACAO.md linhas 79-188]
- Backend: [IMPLEMENTACAO.md linhas 192-256]
