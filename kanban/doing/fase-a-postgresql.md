# Fase A: Migração para PostgreSQL (schema + JWT)

## Descrição

Migração completa do backend em memória para PostgreSQL persistente no Render. Inclui criação do schema completo, autenticação JWT com bcrypt, e reestruturação das rotas em módulos separados.

---

## Escopo

### 1. Banco de Dados (schema.sql)

- [x] Criar tabelas: `profiles`, `parties`, `party_members`, `characters`, `npcs`, `sessions`, `wiki_pages`
- [x] Configurar índices de performance
- [x] Adicionar constraints e CHECKs

### 2. Backend (server/)

- [x] Criar `server/db.js` com Pool PostgreSQL
- [x] Criar middleware `auth.js` (verificar JWT)
- [x] Criar middleware `requireRole.js` (gm/player)
- [x] Reestruturar rotas em arquivos separados:
  - [x] `routes/auth.js` — register/login com bcrypt + JWT
  - [x] `routes/profiles.js` — get profile
  - [x] `routes/parties.js` — CRUD parties + members
  - [x] `routes/characters.js` — CRUD personagens
  - [x] `routes/npcs.js` — CRUD NPCs
  - [x] `routes/sessions.js` — sessão de party
  - [x] `routes/players.js` — /players/:id/characters, /party

### 3. package.json

- [x] Adicionar dependências: bcryptjs, jsonwebtoken, pg, dotenv
- [x] Adicionar scripts: start, dev, seed

### 4. Variáveis de Ambiente

- [x] Criar `.env.example`
- [x] Configurar JWT_SECRET no backend

---

## Status: ✅ CONCLUÍDO ( código criado )

### Próximo Passo: Deploy e Execução do Schema

```bash
# 1. Fazer deploy via render.yaml (cria banco + web service)
# 2. Após deploy, executar schema no Render Shell:

node -e "
const db = require('./server/db');
const fs = require('fs');
const sql = fs.readFileSync('./server/schema.sql', 'utf8');
db.query(sql).then(() => { console.log('Schema OK'); process.exit(0); }).catch(e => { console.error(e); process.exit(1); });
"
```
