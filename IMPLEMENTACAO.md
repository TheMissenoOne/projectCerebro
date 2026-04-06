# XMEN-TTRPG — PLANO DE IMPLEMENTAÇÃO
> Documento de referência para agente de código (OpenCode/Claude Code)
> Stack: Vanilla HTML/CSS/JS + Supabase · GitHub Pages

---

## VISÃO GERAL

Aplicação web multi-página que combina:
- **Fichas de jogadores** (City of Mist system, X-Men campaign)
- **Cérebro** (banco de dados de NPCs com 134 entradas)
- **Sistema de grupos** (GM cria party, jogadores se juntam)
- **Wiki** (regras do sistema)
- **Auth** (cadastro/login com perfis de jogador e GM)

**Princípio de design:** Estética Tom Muller / House of X — preto, vermelho `#E8001C`, fontes Bebas Neue + Oswald + Share Tech Mono. Toda a lógica de UI já existe nos arquivos `xmen-ficha.html` e `npcs.html` — reutilizar CSS/JS desses arquivos ao máximo.

---

## STACK DEFINITIVO

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Frontend | HTML/CSS/JS (vanilla, multi-arquivo) | Compatível com GitHub Pages, sem build step |
| Auth + DB + API | **Supabase** (free tier) | PostgreSQL + Auth + Realtime + Storage gratuitos |
| Hosting frontend | **GitHub Pages** | Gratuito, CI via push |
| Hosting backend | Supabase (BaaS) | Sem servidor próprio necessário |

**Supabase free tier inclui:** 500MB DB, 1GB storage, 50k usuários auth, 500k edge function invocations, realtime ilimitado.

---

## ESTRUTURA DE ARQUIVOS

```
xmen-ttrpg/
├── index.html              # Landing / login / cadastro
├── dashboard.html          # Painel do jogador (lista fichas, party info)
├── ficha.html              # Ficha de personagem (versão online)
├── cerebro.html            # NPC database (apenas GM)
├── wiki.html               # Wiki do sistema
├── wiki/
│   ├── movimentos.html
│   ├── temas.html
│   ├── tags.html
│   ├── progressao.html
│   └── combate.html
├── admin.html              # Painel do GM (gerenciar party, sessões)
├── assets/
│   ├── css/
│   │   ├── base.css        # Variáveis, reset, tipografia, scanlines
│   │   ├── header.css      # Header + toolbar + tabs
│   │   └── components.css  # Cards, fields, dots, triangles, panels
│   ├── js/
│   │   ├── supabase.js     # Cliente Supabase + funções de auth
│   │   ├── auth.js         # Login, logout, register, session guard
│   │   ├── ficha.js        # Toda a lógica da ficha (portado de xmen-ficha.html)
│   │   ├── cerebro.js      # Toda a lógica do cérebro (portado de npcs.html)
│   │   ├── party.js        # Criar/entrar em grupo, convites
│   │   └── wiki.js         # Navegação da wiki
│   └── img/
│       └── x-logo.svg
├── supabase/
│   ├── schema.sql          # Schema completo do banco
│   ├── rls.sql             # Row Level Security policies
│   └── seed.sql            # Seed dos 134 NPCs do Cérebro
└── README.md
```

---

## BANCO DE DADOS (Supabase / PostgreSQL)

### Tabelas

```sql
-- PERFIS DE USUÁRIO
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role        TEXT DEFAULT 'player' CHECK (role IN ('player', 'gm')),
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- GROUPS / PARTIES
CREATE TABLE parties (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  code        TEXT UNIQUE NOT NULL,   -- código de 6 chars para entrar
  gm_id       UUID NOT NULL REFERENCES profiles(id),
  session_notes TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBROS DA PARTY
CREATE TABLE party_members (
  party_id    UUID REFERENCES parties(id) ON DELETE CASCADE,
  player_id   UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at   TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (party_id, player_id)
);

-- FICHAS DE PERSONAGEM
CREATE TABLE characters (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  party_id      UUID REFERENCES parties(id) ON DELETE SET NULL,
  name          TEXT,
  codename      TEXT,
  data          JSONB NOT NULL DEFAULT '{}',  -- todo o JSON da ficha
  foto_url      TEXT,                          -- URL no Supabase Storage
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- NPCs / CÉREBRO
CREATE TABLE npcs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id      UUID REFERENCES parties(id) ON DELETE CASCADE, -- NULL = global
  name          TEXT NOT NULL,
  codename      TEXT,
  faction       TEXT,
  danger        TEXT CHECK (danger IN ('baixo','medio','alto','extremo')),
  data          JSONB NOT NULL DEFAULT '{}',  -- atributos, tags, descrição
  is_global     BOOLEAN DEFAULT FALSE,        -- TRUE = seed, visível a todos
  created_by    UUID REFERENCES profiles(id),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- SESSÕES (log de encontros)
CREATE TABLE sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id    UUID NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
  title       TEXT,
  notes       TEXT,
  round       INT DEFAULT 0,
  encounter   JSONB DEFAULT '[]',  -- NPCs ativos no encontro atual
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- WIKI PAGES
CREATE TABLE wiki_pages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,  -- Markdown
  category    TEXT,
  order_idx   INT DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
-- profiles: usuário vê e edita apenas o próprio perfil
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile" ON profiles
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "read all profiles" ON profiles
  FOR SELECT USING (true);

-- characters: dono edita, GM da party lê todos da party
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own characters" ON characters
  USING (auth.uid() = player_id);
CREATE POLICY "gm reads party characters" ON characters
  FOR SELECT USING (
    party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
  );

-- npcs: GM da party edita, membros leem
ALTER TABLE npcs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "global npcs readable" ON npcs
  FOR SELECT USING (is_global = true);
CREATE POLICY "gm manages party npcs" ON npcs
  USING (
    party_id IN (SELECT id FROM parties WHERE gm_id = auth.uid())
  );
CREATE POLICY "party members read npcs" ON npcs
  FOR SELECT USING (
    party_id IN (
      SELECT party_id FROM party_members WHERE player_id = auth.uid()
    )
  );

-- parties: GM edita, membros leem
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gm manages party" ON parties
  USING (gm_id = auth.uid());
CREATE POLICY "members read party" ON parties
  FOR SELECT USING (
    id IN (SELECT party_id FROM party_members WHERE player_id = auth.uid())
    OR gm_id = auth.uid()
  );

-- wiki: todos leem, apenas admin escreve (via service role)
ALTER TABLE wiki_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wiki public read" ON wiki_pages FOR SELECT USING (true);
```

---

## PÁGINAS E FLUXOS

### `index.html` — Landing / Auth
- Estado 1: usuário não logado → formulário de login/cadastro
- Estado 2: logado → redireciona para `dashboard.html`
- Formulários: Email + senha (Supabase Auth)
- Ao criar conta: preencher `username` e `display_name`
- Salvar `role` escolhido no cadastro: **Jogador** ou **Mestre**
- Estética: tela preta, logo X-Men centralizado, código de acesso (`XAVIER INSTITUTE — ACESSO RESTRITO`)

### `dashboard.html` — Painel do Jogador
**Para Jogadores:**
- Lista das próprias fichas (cards clicáveis → `ficha.html?id=UUID`)
- Botão "Nova Ficha"
- Seção party: exibe party atual ou form para `Criar Party` / `Entrar com Código`
- Indicador de sessão ativa (GM ativou encontro)

**Para GM:**
- Mesmas fichas próprias
- Botão "Gerenciar Party" → `admin.html`
- Lista de personagens dos jogadores da party
- Acesso rápido ao Cérebro

### `ficha.html` — Ficha de Personagem
- Recebe `?id=UUID` ou `?new=true` na query string
- Carrega dados de `characters` via Supabase
- **Modo offline:** se offline, usa localStorage como cache
- Auto-save: debounce 600ms → `UPDATE characters SET data = $1, updated_at = NOW()`
- Upload de foto: Supabase Storage bucket `portraits`, path `{player_id}/{character_id}.jpg`
- Reutiliza TODO o CSS/JS de `xmen-ficha.html` — apenas substitui o camada de persistência
- Import/export .md mantido

### `cerebro.html` — NPC Database (GM only)
- Redireciona para dashboard se usuário não for GM
- Reutiliza TODO o CSS/JS de `npcs.html`
- Filtros: fração, nível de perigo, busca por nome
- NPCs globais (seed dos 134) + NPCs custom da party
- Modo Encontro: seleciona NPCs para sessão ativa
- CRUD completo para NPCs da party

### `admin.html` — Painel do GM
- Visualizar fichas de todos os jogadores (read-only)
- Gerenciar membros da party
- Notas de sessão (campo de texto salvo na tabela `sessions`)
- Tracker de rodada (round counter)
- Ativar/desativar encontro
- Gerar/regenerar código de convite

### `wiki.html` — Wiki do Sistema
- Sidebar com categorias (Noções Básicas, Movimentos, Temas, Tags, Progressão)
- Conteúdo em Markdown renderizado no cliente via `marked.js` (CDN)
- Páginas carregadas da tabela `wiki_pages` ou de arquivos `.md` estáticos
- **Fase 1:** conteúdo estático em arquivos HTML
- **Fase 2:** admin pode editar via Supabase Studio

---

## SUPABASE CLIENT — `assets/js/supabase.js`

```javascript
// Importar via CDN no HTML:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'sua_anon_key_publica';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helpers
async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

async function getProfile(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
}

async function saveCharacter(charId, data) {
  return supabase
    .from('characters')
    .upsert({ id: charId, data, updated_at: new Date().toISOString() });
}

async function loadCharacter(charId) {
  const { data } = await supabase
    .from('characters')
    .select('*')
    .eq('id', charId)
    .single();
  return data;
}
```

---

## AUTH FLOW — `assets/js/auth.js`

```javascript
// Proteção de páginas: adicionar no topo de toda página protegida
async function requireAuth(requiredRole = null) {
  const session = await getSession();
  if (!session) {
    window.location.href = '/index.html';
    return null;
  }
  const profile = await getProfile(session.user.id);
  if (requiredRole && profile.role !== requiredRole) {
    window.location.href = '/dashboard.html';
    return null;
  }
  return { session, profile };
}

// Uso: no topo de cerebro.html e admin.html
// const { session, profile } = await requireAuth('gm');
```

---

## SISTEMA DE PARTY

### Criar Party (GM)
```javascript
async function criarParty(nome, gmId) {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const { data } = await supabase
    .from('parties')
    .insert({ name: nome, gm_id: gmId, code })
    .select()
    .single();
  return data; // data.code é o código de convite
}
```

### Entrar na Party (Jogador)
```javascript
async function entrarParty(codigo, playerId) {
  const { data: party } = await supabase
    .from('parties')
    .select('id')
    .eq('code', codigo.toUpperCase())
    .single();
  if (!party) throw new Error('Código inválido');
  
  await supabase
    .from('party_members')
    .insert({ party_id: party.id, player_id: playerId });
  
  return party;
}
```

---

## REALTIME (Supabase Realtime)

Habilitar para atualizações ao vivo durante sessão:

```javascript
// GM vê atualizações de fichas em tempo real
supabase
  .channel('party-characters')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'characters',
    filter: `party_id=eq.${partyId}`
  }, payload => {
    atualizarFichaNoUI(payload.new);
  })
  .subscribe();

// Jogadores veem encontro ativado pelo GM
supabase
  .channel('session-updates')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'sessions',
    filter: `party_id=eq.${partyId}`
  }, payload => {
    if (payload.new.encounter.length > 0) mostrarAlertaEncontro();
  })
  .subscribe();
```

---

## SEED DOS NPCs — `supabase/seed.sql`

O arquivo `cerebro_rebalanceado.md` contém 134 NPCs em formato Markdown estruturado. Criar script Node.js para parsear e inserir:

```javascript
// scripts/seed-npcs.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Parser para o formato do cerebro_rebalanceado.md:
// Separar por "# NPC: " → extrair nome, codinome, fração, perigo, atributos, tags, descrição
// Inserir como is_global = true, party_id = null

function parseNPCs(markdown) {
  const blocks = markdown.split(/^# NPC: /m).slice(1);
  return blocks.map(block => {
    const lines = block.split('\n');
    const name = lines[0].trim();
    // ... parser completo dos campos
    return { name, codename, faction, danger, data: { stats, tags, descricao } };
  });
}
```

**Atenção:** os NPCs globais (is_global=true) são visíveis a todos. NPCs criados pelo GM de uma party ficam restritos à party.

---

## UPLOAD DE FOTO (Supabase Storage)

```javascript
async function uploadFoto(file, playerId, charId) {
  const path = `${playerId}/${charId}.jpg`;
  const { error } = await supabase.storage
    .from('portraits')
    .upload(path, file, { upsert: true, contentType: file.type });
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('portraits')
    .getPublicUrl(path);
  
  // Atualizar foto_url na tabela characters
  await supabase
    .from('characters')
    .update({ foto_url: publicUrl })
    .eq('id', charId);
  
  return publicUrl;
}
```

Criar bucket `portraits` no Supabase Storage com política de leitura pública.

---

## PERSISTÊNCIA HÍBRIDA (Online + Offline)

A ficha deve funcionar mesmo offline:

```javascript
// Hierarquia de save:
// 1. Supabase (primário quando online)
// 2. localStorage (cache/fallback quando offline)

async function salvarFicha(charId, data) {
  // Sempre salva local primeiro (rápido)
  localStorage.setItem(`char_${charId}`, JSON.stringify(data));
  
  // Tenta salvar no Supabase
  try {
    await saveCharacter(charId, data);
  } catch (e) {
    // Marca como pendente de sync
    const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
    if (!pending.includes(charId)) {
      pending.push(charId);
      localStorage.setItem('pending_sync', JSON.stringify(pending));
    }
  }
}

// Sync quando reconecta
window.addEventListener('online', async () => {
  const pending = JSON.parse(localStorage.getItem('pending_sync') || '[]');
  for (const charId of pending) {
    const data = JSON.parse(localStorage.getItem(`char_${charId}`));
    if (data) await saveCharacter(charId, data);
  }
  localStorage.removeItem('pending_sync');
});
```

---

## WIKI — ESTRUTURA DE CONTEÚDO

Páginas a criar (conteúdo a ser fornecido pelo usuário):

```
wiki/movimentos.html        — Virar o Jogo, Convencer, Rir na Cara do Perigo,
                              Partir pro Abraço, Ir com Tudo, Investigar,
                              Agir na Encolha, Correr o Risco
wiki/temas.html             — Tipos de Tema (Mutação vs Humanidade),
                              Como criar temas, Mistério/Identidade
wiki/tags.html              — Tags de Poder, Tags de Fraqueza, Queimar Tags,
                              Tags de História, Graus 1-6
wiki/progressao.html        — Atenção, Dissipação, Momentos de Evolução,
                              Virar Avatar, Cair no Sono
wiki/combate.html           — Iniciativa, Condições, Dano, Recuperação
wiki/galera.html            — Tema de Galera, Relacionamentos, Apoio/Antagonismo
wiki/npcs.html              — Como usar o Cérebro, Níveis de Perigo, Frações
```

Cada página wiki usa o mesmo layout base (header + sidebar + content area).

---

## CONFIGURAÇÃO DO SUPABASE

### Passos de setup:

1. Criar projeto em `supabase.com` (free tier)
2. Executar `supabase/schema.sql` no SQL Editor
3. Executar `supabase/rls.sql`
4. Criar Storage bucket `portraits` (public)
5. Habilitar Realtime para tabelas `characters` e `sessions`
6. Copiar `SUPABASE_URL` e `SUPABASE_ANON_KEY` para `assets/js/supabase.js`
7. Executar `node scripts/seed-npcs.js` para importar os 134 NPCs
8. No Supabase Auth settings: habilitar Email auth, desabilitar confirm email (opcional para dev)

### Variáveis de ambiente:
Como é frontend puro (sem servidor), as chaves ficam no JS client-side.
A `anon key` é segura para expor — o RLS controla o acesso.
**Nunca** colocar a `service_role key` no frontend.

---

## DEPLOY — GitHub Pages

### `_config.yml` (se usar Jekyll) ou simplesmente:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

Como é HTML/CSS/JS puro, não precisa de build step. GitHub Pages serve diretamente.

---

## ORDEM DE IMPLEMENTAÇÃO

### Fase 1 — Base e Auth (prioridade máxima)
- [ ] `index.html` com login/cadastro via Supabase Auth
- [ ] `assets/js/supabase.js` com cliente e helpers
- [ ] `assets/js/auth.js` com `requireAuth()`
- [ ] Criação das tabelas e RLS no Supabase
- [ ] `dashboard.html` básico (lista fichas, criar/entrar em party)

### Fase 2 — Ficha Online
- [ ] Portar `xmen-ficha.html` para `ficha.html` com persistência Supabase
- [ ] Upload de foto via Supabase Storage
- [ ] Sync híbrido localStorage + Supabase
- [ ] Import/export .md mantido

### Fase 3 — Cérebro Online
- [ ] Script de seed dos 134 NPCs (`scripts/seed-npcs.js`)
- [ ] Portar `npcs.html` para `cerebro.html` com leitura do Supabase
- [ ] GM pode criar NPCs custom para a party
- [ ] Filtros e busca funcionando com dados do banco

### Fase 4 — Sistema de Party
- [ ] `admin.html` para o GM
- [ ] Realtime: GM vê fichas atualizarem em tempo real
- [ ] Modo Encontro: GM seleciona NPCs, jogadores veem notificação
- [ ] Tracker de rodada compartilhado

### Fase 5 — Wiki
- [ ] `wiki.html` com estrutura de navegação
- [ ] Páginas de conteúdo (aguardando regras do usuário)
- [ ] Markdown renderer via `marked.js`

### Fase 6 — Polimento
- [ ] PWA (Service Worker + manifest.json) para uso offline
- [ ] Notificações push opcionais
- [ ] Página de perfil do usuário
- [ ] Avatares no Supabase Storage

---

## COMPONENTES CSS COMPARTILHADOS

Extrair para `assets/css/base.css` as variáveis e componentes que já existem em ambos os HTMLs:

```css
/* Variáveis idênticas em xmen-ficha.html e npcs.html — unificar */
:root {
  --red: #E8001C; --red2: #a8000f; --red3: #5a0008;
  --black: #080808; --dark: #101010; --p1: #161616;
  --p2: #1e1e1e; --p3: #242424;
  --b1: #282828; --b2: #3c3c3c; --b3: #505050;
  --white: #f0f0f0; --text: #c8c8c8; --muted: #888; --muted2: #555;
  --mono: 'Share Tech Mono', monospace;
  --disp: 'Bebas Neue', sans-serif;
  --cond: 'Oswald', sans-serif;
  --body: 'Barlow Condensed', sans-serif;
}
```

O `npcs.html` usa `--accent` como variável de cor com temas alternativos.
Na versão consolidada, manter `--red` como padrão e preservar os temas do Cérebro
como opção de UI (seletor de tema salvo no perfil do usuário).

---

## NOTAS PARA O AGENTE DE CÓDIGO

1. **Não reescrever o que já funciona:** `xmen-ficha.html` e `npcs.html` têm UI completa. A tarefa é modularizar e conectar ao Supabase, não redesenhar.

2. **JavaScript vanilla:** sem frameworks. O Supabase SDK é carregado via CDN. Usar `async/await` consistentemente.

3. **IDs de personagem:** usar UUID v4 via `crypto.randomUUID()` (nativo no browser moderno).

4. **Formato do campo `data` (JSONB):** o objeto salvo é exatamente o `D` do `salvarAuto()` já existente na ficha. Nenhuma transformação necessária.

5. **Formato do campo `data` de NPC:** `{ iniciativa, stats: {...}, tags: [{texto, grau}], descricao }`.

6. **Código de convite:** 6 caracteres alfanuméricos uppercase. Colisões são improváveis mas tratar o erro único do Supabase.

7. **RLS é a camada de segurança:** não precisa implementar verificações adicionais no frontend. Se o Supabase retorna erro de permissão, mostrar mensagem adequada.

8. **Foto:** compressar no frontend antes do upload. Usar `canvas.toDataURL` ou a lib `browser-image-compression` via CDN para limitar a ~500KB.

9. **O cérebro é somente-leitura para jogadores:** os 134 NPCs do seed são globais. Apenas o GM pode adicionar/editar NPCs da party.

10. **Wiki fase 1:** conteúdo hardcoded em HTML. O usuário ainda vai fornecer as regras exatas. Criar a estrutura de navegação agora, deixar placeholder de conteúdo.

---

## ARQUIVOS DE REFERÊNCIA DISPONÍVEIS

| Arquivo | O que contém |
|---|---|
| `npcs.html` | UI completa do Cérebro com todos os 134 NPCs hardcoded, filtros, modo encontro, tema amarelo (padrão) com temas alternativos |
| `xmen-ficha.html` | UI completa da ficha de personagem com 3 abas, cards de tema, cards de esquadrão, import/export .md, foto, estética vermelha |
| `cerebro_rebalanceado.md` | Dados canônicos dos 134 NPCs em Markdown — fonte para o seed SQL |

---

*Última atualização: Fase 1 — aguardando regras completas para Wiki*
