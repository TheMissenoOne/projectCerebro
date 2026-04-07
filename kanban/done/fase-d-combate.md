# Fase D: Criar combate.html (calculadora AV/OV)

## Descrição

Criar nova página com calculadora de combate baseada no sistema MEGS. Inclui três calculadoras: AV/OV (sucesso da ação), EV/RV (cálculo de dano), e tabela completa de referência.

---

## Escopo

### 1. Calculadora AV/OV

- [ ] Inputs para AV (Action Value) e OV (Opposing Value)
- [ ] Cálculo do alvo usando tabela MEGS
- [ ] Display do resultado (número necessário nos dados)
- [ ] Validação (0 = impossível)

### 2. Calculadora EV/RV

- [ ] Inputs para EV (Effect Value) e RV (Resistance Value)
- [ ] Selector para modo de dano:
  - Temporário (desaparece após cena)
  - Persistente (desaparece após combate)
  - Permanente (dano permanente)
- [ ] Cálculo dos RAPs (Result Action Points)
- [ ] Display do resultado

### 3. Tabela Completa

- [ ] Tabela AV/OV completa (1-52)
- [ ] Tabela EV/RV temporários
- [ ] Tabela EV/RV persistentes
- [ ] Tabela EV/RV permanentes
- [ ] Layout com scroll horizontal

### 4. Integração com fichas

- [ ] Dropdown para selecionar personagem
- [ ] Carregar atributos do personagem selecionado
- [ ] Dropdown para selecionar NPC
- [ ] Carregar atributos do NPC selecionado

### 5. Layout e styling

- [ ] Header X-MEN padrão
- [ ] Toolbar com links de navegação
- [ ] Tabs para切换 entre calculadoras
- [ ] Design consistente com outras páginas

---

## Dependências

- [ ] Fase A (characters e NPCs carregando do banco)
- [ ] Fase C (fichas e parties funcionando)

---

## Tempo Estimado

2-3 horas (trabalho médio)

---

## Checkpoints

- [ ] Calculadora AV/OV retornando resultados corretos
- [ ] Calculadora EV/RV funcionando nos 3 modos
- [ ] Tabelas completas visíveis com scroll
- [ ] Integração com personagens carregando atributos
- [ ] Integração com NPCs carregando atributos

---

## Dados das Tabelas

```javascript
// AV/OV Table (1-15 shown, rest scrollable)
// Extrair do documento 10 dos uploads (formato TSV)

const AVOV_TABLE = [
  // AV=1: OV de 1 a 25
  [11,12,13,14,15,17,19,21,23,26,29,32,35,39,43,47,51,56,61,66,71,77,83,89,95],
  // ... (continuar para AV 2-52)
];

// EV/RV Tables (3 modos)
// Formato: EVRV_TABLE[ev-1][rv-1] = RAPs
// 0 = sem efeito
```

---

## Arquivos

- `combate.html` — criar do zero
- `assets/css/base.css` — reuse
- `assets/css/components.css` — reuse
