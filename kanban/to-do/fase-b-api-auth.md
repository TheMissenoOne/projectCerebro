# Fase B: Ajustar api.js com auth header

## Descrição

Corrigir o cliente API para enviar o token JWT em todas as requisições. O backend com JWT requer que o cliente envie o header `Authorization: Bearer <token>`.

---

## Escopo

### 1. Modificar api.js

- [ ] Adicionar função `getAuthHeader()` para ler token do localStorage
- [ ] Modificar método `request()` para incluir o header de autorização
- [ ] Corrigir bug de sintaxe (backtick incorreto) no método `loadPublicCharacter()`

### 2. Verificar compat.js

- [ ] Garantir que todas as funções usam api.js corretamente
- [ ] Remover referências antigas ao Supabase (se houver)

### 3. Testar fluxo completo

- [ ] Login gerando token salvo no localStorage
- [ ] Requests subsequentes enviando token
- [ ] Recebendo 401 em requests sem token válido

---

## Dependências

- [ ] Fase A (JWT_SECRET configurado) — pode ser feito antes da migração completa usando o backend em memória

---

## Tempo Estimado

30 minutos (trabalho rápido)

---

## Checkpoints

- [ ] `getAuthHeader()` retornando header correto
- [ ] Todas as requests incluindo Authorization
- [ ] Login persistindo token no localStorage

---

## Código de Referência

```javascript
// api.js - adicionar no topo
function getAuthHeader() {
  const session = JSON.parse(localStorage.getItem('session') || 'null');
  return session?.token ? { 'Authorization': `Bearer ${session.token}` } : {};
}

// Modificar request()
async request(endpoint, options = {}) {
  const session = JSON.parse(localStorage.getItem('session') || 'null');
  const url = API_URL + endpoint;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(session?.token ? { 'Authorization': `Bearer ${session.token}` } : {})
    },
    ...options
  };
  // ...
}
```
