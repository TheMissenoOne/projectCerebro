# Fase E: Seed dos 134 NPCs

## Descrição

Popular o banco de dados com os 134 NPCs do arquivo cerebro_rebalanceado.md. Inclui parsing do markdown, inserção no PostgreSQL, e validação.

---

## Escopo

### 1. Preparar script de seed

- [ ] Criar `scripts/seed-npcs.js`
- [ ] Implementar parser do arquivo markdown
- [ ] Converter dados para formato JSONB do PostgreSQL

### 2. Executar seed

- [ ] Conectar ao banco PostgreSQL
- [ ] Limpar NPCs globais existentes
- [ ] Inserir 134 NPCs
- [ ] Validar contagem

### 3. Documentação

- [ ] Adicionar script ao package.json: `"seed": "node scripts/seed-npcs.js"`
- [ ] Adicionar instrução de como executar

---

## Dependências

- [ ] Fase A (banco PostgreSQL configurado)
- [ ] Arquivo `cerebro_rebalanceado.md` presente na raiz do projeto

---

## Tempo Estimado

1-2 horas (trabalho médio)

---

## Checkpoints

- [ ] Script de seed criado
- [ ] Parser funcionando para formato markdown
- [ ] 134 NPCs inseridos no banco
- [ ] `npm run seed` executando com sucesso
- [ ] NPCs visíveis via `GET /npcs` (sem partyId)

---

## Formato do Parser

```javascript
// cerebro_rebalanceado.md estruturado como:
// ## NOME
// **Codinome:** ...
// **Facção:** ...
// **Perigo:** ...
// **Atributos:** ...
// **Descrição:** ...

function parseNPCs(markdown) {
  // Parse por blocos starting with ## ou ###
  // Extrair nome, codinome, faction, danger
  // Parse dos atributos (stats) para objeto JSON
  // Retornar array de objetos NPC
}

async function seed() {
  const markdown = fs.readFileSync('./cerebro_rebalanceado.md', 'utf-8');
  const npcs = parseNPCs(markdown);
  
  for (const npc of npcs) {
    await db.query(
      `INSERT INTO npcs (name, codename, faction, danger, data, is_global)
       VALUES ($1, $2, $3, $4, $5, true)`,
      [npc.name, npc.codename, npc.faction, npc.danger, npc.data]
    );
  }
}
```

---

## NPCs de Referência (seedados no backend atual)

O backend em memória já tem 4 NPCs de exemplo:
- Professor X (X-Men, extremo)
- Ciclope (X-Men, alto)
- Wolverine (X-Men, alto)
- Magneto (Irmandade, extremo)

Estes serviram de teste e serão substituídos pelos 134 do seed.

---

## Executar Seed

```bash
# No Render Shell ou local
npm run seed
```
