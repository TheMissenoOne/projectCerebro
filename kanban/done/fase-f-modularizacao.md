# Fase F: Modularização do Repositório

## Objetivo
Modularizar o repositório monolítico em estruturas limpas e separadas:
- CSS compartilhado vs inline
- JS modularizado
- Server com services layer
- Config centralizada

---

## Tarefas

### Configuração Centralizada (Fase 1)

- [x] 1.1 - Criar `server/config.js` com variáveis de ambiente
- [x] 1.2 - Refatorar `server/db.js` para usar config
- [x] 1.3 - Refatorar `server/middleware/auth.js` para usar config
- [x] 1.4 - Refatorar `server/routes/auth.js` para usar config
- [x] 1.5 - Refatorar `server/index.js` para usar config
- [x] 1.6 - Criar `.env.example` para documentação
- [x] 1.7 - Criar `assets/js/config.js` para credentials cliente

### Client JS Modularizado (Fase 2)

- [x] 2.1 - Extrair auth logic de `api.js` → `auth-module.js`
- [x] 2.2 - Criar `supabase-client.js` para inicialização
- [x] 2.3 - Manter CRUD operations em `api-module.js`
- [x] 2.4 - Criar `globals.js` para mapear window.* functions
- [x] 2.5 - Atualizar todos HTMLs para usar novos JS modules

### CSS Extraído (Fase 3)

- [x] 3.1 - Consolidar base.css com CSS vars (já existente)
- [x] 3.2 - Criar `assets/css/auth.css` (auth page styles)
- [x] 3.3 - Criar `assets/css/dashboard.css` (dashboard page)
- [x] 3.4 - Criar `assets/css/combate.css` (combat calculator)
- [x] 3.5 - Criar `assets/css/wiki.css` (wiki page)
- [x] 3.6 - Criar `assets/css/admin.css` (admin page)
- [x] 3.7 - Aplicar external CSS em todos os HTMLs

### Server Services Layer (Fase 4)

- [ ] 4.1 - Criar `server/services/auth.js`
- [ ] 4.2 - Criar `server/services/characters.js`
- [ ] 4.3 - Criar `server/services/parties.js`
- [ ] 4.4 - Criar `server/services/npcs.js`
- [ ] 4.5 - Refatorar routes para usar services

### Limpeza e Decisões (Fase 5)

- [ ] 5.1 - Decidir: `xmen-ficha.html` vs `ficha.html` (duplicatas)
- [ ] 5.2 - Decidir: `npcs.html` vs `cerebro.html` (duplicatas)
- [ ] 5.3 - Remover código morto
- [ ] 5.4 - Testar todos os fluxos

---

## Métricas de Sucesso

| Antes | Depois |
|-------|--------|
| 8 arquivos HTML com 7000+ linhas inline CSS | HTMLs com ~150-300 linhas |
| ~30 globals `window.*` | ~10 principais |
| Credenciais hardcoded | Via `config.js` |
| Routes com lógica inline | Routes thin + services |

---

## Notes

- Hardcoded Supabase key parece ser anon key (seguro expor em client)
- xmen-ficha.html (1646 linhas) parece versão antiga de ficha.html
- npcs.html e cerebro.html compartilham ~90% mesmo código