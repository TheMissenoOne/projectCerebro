# Fase C: Funcionalidades completas no dashboard

## Descrição

Implementar todas as funcionalidades do dashboard: listar personagens, criar fichas, criar parties (GM), entrar em parties (jogador), e integrar com a API completa.

---

## Escopo

### 1. Listar personagens do jogador

- [ ] `api.listCharacters(userId)` no dashboard
- [ ] Exibir cards de personagens com nome, codinome
- [ ] Link para `ficha.html?id=XXX`

### 2. Criar nova ficha

- [ ] Botão "Nova Ficha" chamando `api.createCharacter(userId, partyId)`
- [ ] Redirecionar para ficha após criação
- [ ] Suporte a `?new=true` na ficha

### 3. Criar party (GM)

- [ ] Botão criar party no dashboard (apenas GMs)
- [ ] `api.createParty(name, userId)`
- [ ] Exibir código da party para compartilhar

### 4. Entrar em party (Jogador)

- [ ] Input para código da party
- [ ] `api.getPartyByCode(code)` + `api.joinParty(partyId, userId)`
- [ ] Feedback de sucesso/erro

### 5. Exibir party atual

- [ ] Mostrar nome da party e código
- [ ] Listar membros da party
- [ ] Link para admin.html (se GM)

### 6. Integrações adicionales

- [ ] Link para `combate.html` no toolbar
- [ ] Polling para atualizar dados (a cada 15s)
- [ ] Logout funcionando

---

## Dependências

- [ ] Fase A (rotas de parties e characters funcionando)
- [ ] Fase B (auth header enviando token)

---

## Tempo Estimado

2-3 horas (trabalho médio)

---

## Checkpoints

- [ ] Usuário logado vê suas fichas
- [ ] Pode criar nova ficha
- [ ] GM consegue criar party e ver código
- [ ] Jogador consegue entrar em party via código
- [ ] Dashboard mostra dados da party atual
- [ ] Polling atualizando dados automaticamente

---

## Arquivos Envolvidos

- `dashboard.html` — ajustar JS
- `assets/js/api.js` — métodos de parties
- `assets/js/auth.js` — funções de auth
