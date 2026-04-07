# Fase B: API + Supabase no Backend

## Descrição

Conectar o backend Node.js ao Supabase usando o SDK oficial. O frontend faz chamadas ao servidor local que then faz operações no Supabase.

---

## Escopo

### 1. Backend (server/)

- [x] Instalar `@supabase/supabase-js` no package.json
- [x] Criar cliente Supabase em `server/index.js`
- [x] Implementar todas as rotas usando cliente Supabase:
  - [x] `/auth/register` - signup + criar profile
  - [x] `/auth/login` - signInWithPassword
  - [x] `/profiles/:id` - buscar profile
  - [x] `/parties` - CRUD parties
  - [x] `/characters` - CRUD personagens
  - [x] `/npcs` - listar NPCs
  - [x] `/sessions` - salvar sessão

### 2. Frontend (assets/js/)

- [x] `api.js` - cliente que chama servidor local
- [x] `auth.js` - funções de autenticação
- [ ] Corrigir erros de conexão

### 3. Deploy

- [x] render.yaml configurado
- [x] Deploy para Render

---

## Status: 🔄 EM ANDAMENTO

### Problema Atual

Erro: `JSON.parse: unexpected end of data` - servidor retorna resposta vazia.

### Possíveis Causas

1. Tabelas não existem no Supabase (precisa executar schema.sql)
2. Erro na conexão com Supabase
3. Rota não está sendo encontrada

### Próximos Passos

1. Verificar se schema foi executado no Supabase
2. Verificar logs do servidor no Render
3. Testar a conexão diretamente

---

## Checkpoints

- [x] Backend conecta ao Supabase
- [x] Frontend chama servidor local
- [ ] Registro funcionando
- [ ] Login funcionando
- [ ] Tabelas criadas no banco