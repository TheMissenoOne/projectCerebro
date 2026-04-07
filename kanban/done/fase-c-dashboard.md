# Fase C: Funcionalidades completas no dashboard

## Descrição

Implementar todas as funcionalidades do dashboard: listar personagens, criar fichas, criar parties (GM), entrar em parties (jogador), e integrar com a API completa.

---

## Escopo

### 1. Listar personagens do jogador

- [x] `api.listCharacters(userId)` no dashboard
- [x] Exibir cards de personagens com nome, codinome
- [x] Link para `ficha.html?id=XXX`

### 2. Criar nova ficha

- [x] Botão "Nova Ficha" chamando `api.createCharacter(userId, partyId)`
- [x] Redirecionar para ficha após criação
- [ ] Suporte a `?new=true` na ficha

### 3. Criar party (GM)

- [x] Botão criar party no dashboard (apenas GMs)
- [x] `api.createParty(name, userId)`
- [x] Exibir código da party para compartilhar

### 4. Entrar em party (Jogador)

- [x] Input para código da party
- [x] `api.getPartyByCode(code)` + `api.joinParty(partyId, userId)`
- [x] Feedback de sucesso/erro

### 5. Exibir party atual

- [x] Mostrar nome da party e código
- [x] Listar membros da party
- [x] Link para admin.html (se GM)

### 6. Integrações adicionais

- [x] Link para wiki.html no toolbar
- [x] Link para cerebro.html no toolbar
- [ ] Link para `combate.html` no toolbar
- [ ] Polling para atualizar dados (a cada 15s)

---

## Dependências

- [x] Fase A (rotas de parties e characters funcionando)
- [x] Fase B (auth header enviando token)

---

## Tempo Estimado

2-3 horas (trabalho médio)

---

## Checkpoints

- [x] Usuário logado vê suas fichas
- [x] Pode criar nova ficha
- [x] GM consegue criar party e ver código
- [x] Jogador consegue entrar em party via código
- [x] Dashboard mostra dados da party atual
- [ ] Polling atualizando dados automaticamente
- [ ] Link para combate.html

---

## Arquivos Envolvidos

- `dashboard.html` — ajustar JS
- `assets/js/api.js` — métodos de parties
- `assets/js/auth.js` — funções de auth

---

## Status: 🔄 EM ANDAMENTO

### Pendente

1. Adicionar link para `combate.html` no toolbar
2. Implementar polling para atualizar dados (a cada 15s)
3. Testar criação de personagem com party
4. Testar fluxo completo de criação/entrada em party
