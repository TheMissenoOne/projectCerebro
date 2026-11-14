#!/usr/bin/env node
/**
 * Pipeline do rebalanceamento de grau (APs) das tags de PODER dos NPCs.
 *
 *   node scripts/gen-npc-graus.js baseline [--chunks <dir>]
 *     Reconstrói o estado pretendido da tabela npcs reexecutando (em memória)
 *     supabase/seed.sql + supabase/migrations/002..009 e grava
 *     supabase/review/npc_graus_baseline.json (+ 5 chunks round-robin em --chunks).
 *     Por NPC: temas[].poder (tags de poder) e extras (entradas de data.tags fora de todo poder
 *     e que não espelham fraqueza). O arquivo de notas cobre os dois numa lista tags única.
 *
 *   node scripts/gen-npc-graus.js build [--grades <dir|arquivo.json>] [--partial]
 *     Lê as notas (padrão supabase/review/npc_graus/*.json), valida contra o baseline e gera
 *     supabase/migrations/010_npc_tag_graus.sql + supabase/review/npc_graus_review.md.
 *     --partial: permite NPCs do baseline sem nota (só para teste do pipeline).
 *
 * Rubrica dos graus: supabase/review/npc_graus_rubric.md
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SOURCES = ['supabase/seed.sql', ...['002', '003', '004', '005', '006', '007', '008', '009']
  .map(n => fs.readdirSync(path.join(ROOT, 'supabase/migrations')).find(f => f.startsWith(n + '_')))
  .map(f => 'supabase/migrations/' + f)];
const BASELINE = path.join(ROOT, 'supabase/review/npc_graus_baseline.json');
const GRADES_DIR = path.join(ROOT, 'supabase/review/npc_graus');
const OUT_SQL = path.join(ROOT, 'supabase/migrations/010_npc_tag_graus.sql');
const OUT_MD = path.join(ROOT, 'supabase/review/npc_graus_review.md');
const DANGER = ['extremo', 'alto', 'medio', 'baixo'];
const BENCHMARKS = ['peso', 'distancia', 'area', 'velocidade', 'energia', 'informacao', 'duracao', 'resistencia', 'outro'];
const CONFIDENCE = ['alta', 'media', 'baixa'];
const norm = s => String(s).trim().toLowerCase();
const key = (name, g) => `${name}\u0000${g}`;

// ── Mini replay de SQL ──
// ponytail: entende só os formatos que os geradores deste repo emitem (INSERT VALUES/SELECT
// WHERE NOT EXISTS, UPDATE SET col = jsonb_set(...)/COALESCE/literal WHERE name = .. AND is_global = ..).
// Qualquer outra coisa que mexa em npcs.data aborta — aí estenda o avaliador.

function tokenize(sql) {
  const toks = [];
  let i = 0;
  while (i < sql.length) {
    const c = sql[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '-' && sql[i + 1] === '-') { while (i < sql.length && sql[i] !== '\n') i++; continue; }
    if (c === "'") {
      let s = '';
      i++;
      for (;;) {
        if (i >= sql.length) throw new Error('string SQL não terminada');
        if (sql[i] === "'") { if (sql[i + 1] === "'") { s += "'"; i += 2; continue; } i++; break; }
        s += sql[i++];
      }
      toks.push({ t: 'str', v: s });
      continue;
    }
    if (c === ':' && sql[i + 1] === ':') { toks.push({ t: 'p', v: '::' }); i += 2; continue; }
    if ('(),;=*'.includes(c)) { toks.push({ t: 'p', v: c }); i++; continue; }
    const m = /^[A-Za-z_][A-Za-z0-9_.]*|^\d+/.exec(sql.slice(i, i + 200));
    if (!m) throw new Error('token SQL inesperado: ' + sql.slice(i, i + 30));
    toks.push({ t: 'id', v: m[0] });
    i += m[0].length;
  }
  return toks;
}

function statements(sql) {
  const out = [[]];
  for (const tk of tokenize(sql)) {
    if (tk.t === 'p' && tk.v === ';') out.push([]);
    else out[out.length - 1].push(tk);
  }
  return out.filter(s => s.length);
}

function setPath(obj, keys, val) {
  const root = obj && typeof obj === 'object' ? structuredClone(obj) : {};
  let cur = root;
  keys.slice(0, -1).forEach(k => { if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {}; cur = cur[k]; });
  cur[keys[keys.length - 1]] = val;
  return root;
}

function Parser(toks) {
  let p = 0;
  const peek = () => toks[p];
  const isKw = (tk, v) => tk && tk.t === 'id' && tk.v.toUpperCase() === v;
  const next = () => toks[p++];
  const expect = v => { const tk = next(); if (!tk || (tk.v !== v && !isKw(tk, v))) throw new Error(`esperado ${v}, veio ${tk && tk.v}`); return tk; };
  function expr(row) {
    const tk = next();
    let val;
    if (tk.t === 'str') {
      val = tk.v;
      if (peek() && peek().v === '::') { next(); const ty = next().v.toLowerCase(); if (ty === 'jsonb' || ty === 'json') val = JSON.parse(val); }
      return val;
    }
    if (tk.t !== 'id') throw new Error('expressão inesperada: ' + tk.v);
    const u = tk.v.toUpperCase();
    if (u === 'TRUE' || u === 'FALSE') return u === 'TRUE';
    if (u === 'NULL') return null;
    if (/^\d+$/.test(tk.v)) return Number(tk.v);
    if (peek() && peek().v === '(') {
      next();
      const args = [];
      if (peek().v !== ')') for (;;) { args.push(expr(row)); if (peek().v === ',') { next(); continue; } break; }
      expect(')');
      const f = tk.v.toLowerCase();
      if (f === 'gen_random_uuid' || f === 'now') return null;
      if (f === 'coalesce') return args.find(a => a != null) ?? null;
      if (f === 'jsonb_set') return setPath(args[0], args[1].replace(/^\{|\}$/g, '').split(','), args[2]);
      throw new Error('função SQL não suportada: ' + f);
    }
    if (!row) throw new Error('coluna fora de UPDATE: ' + tk.v);
    return row[tk.v];
  }
  return { peek, next, expect, expr, isKw, rest: () => toks.slice(p), done: () => p >= toks.length };
}

// WHERE name = 'X' AND is_global = TRUE  (o NOT EXISTS dos INSERTs usa o mesmo par)
function parseWhereNameGlobal(toks) {
  const s = toks.map(t => (t.t === 'str' ? JSON.stringify(t.v) : t.v)).join(' ');
  const m = /name = ("(?:[^"\\]|\\.)*") AND is_global = (TRUE|FALSE)/i.exec(s);
  if (!m) throw new Error('WHERE não suportado: ' + s.slice(0, 120));
  return { name: JSON.parse(m[1]), is_global: m[2].toUpperCase() === 'TRUE' };
}

const TRACKED = new Set(['name', 'codename', 'faction', 'danger', 'data', 'is_global']);

function replay() {
  const rows = [];
  for (const rel of SOURCES) {
    for (const st of statements(fs.readFileSync(path.join(ROOT, rel), 'utf8'))) {
      const P = Parser(st);
      const head = st.slice(0, 3).map(t => String(t.v).toUpperCase()).join(' ');
      if (head.startsWith('INSERT INTO NPCS')) {
        P.next(); P.next(); P.next(); P.expect('(');
        const cols = [];
        while (P.peek().v !== ')') { const tk = P.next(); if (tk.v !== ',') cols.push(tk.v); }
        P.expect(')');
        const kw = P.next().v.toUpperCase();
        if (kw === 'VALUES') P.expect('(');
        else if (kw !== 'SELECT') throw new Error(`${rel}: INSERT sem VALUES/SELECT`);
        const vals = cols.map((c, i) => { if (i) P.expect(','); return P.expr(null); });
        if (kw === 'VALUES') P.expect(')');
        const row = Object.fromEntries(cols.map((c, i) => [c, vals[i]]));
        if (!P.done()) {
          P.expect('WHERE'); P.expect('NOT'); P.expect('EXISTS');
          const w = parseWhereNameGlobal(P.rest());
          if (rows.some(r => r.name === w.name && r.is_global === w.is_global)) continue;
        }
        rows.push(row);
      } else if (head.startsWith('UPDATE NPCS SET')) {
        P.next(); P.next(); P.next();
        const sets = [];
        for (;;) {
          const col = P.next().v; P.expect('=');
          const at = P.rest();
          sets.push({ col, at });
          // pula a expressão (avaliada depois, por linha)
          let depth = 0;
          while (!P.done()) {
            const tk = P.peek();
            if (tk.v === '(') depth++;
            if (tk.v === ')') depth--;
            if (depth === 0 && (tk.v === ',' || P.isKw(tk, 'WHERE'))) break;
            P.next();
          }
          if (P.peek() && P.peek().v === ',') { P.next(); continue; }
          break;
        }
        if (!sets.some(s => TRACKED.has(s.col))) continue; // ex.: foto_url (006)
        P.expect('WHERE');
        const w = parseWhereNameGlobal(P.rest());
        for (const row of rows.filter(r => r.name === w.name && r.is_global === w.is_global)) {
          const vals = sets.map(s => [s.col, Parser(s.at).expr(row)]);
          vals.forEach(([c, v]) => { if (TRACKED.has(c)) row[c] = v; });
        }
      } else if (/^(BEGIN|COMMIT|ALTER TABLE NPCS|CREATE INDEX)/.test(head)) {
        // sem efeito em npcs.data
      } else {
        throw new Error(`${rel}: statement não suportado: ${head}`);
      }
    }
  }
  return rows;
}

function baseline(chunkDir) {
  const rows = replay();
  const out = rows.map(r => {
    const d = r.data || {};
    const seen = new Set();
    const temas = (d.temas || []).map(t => ({
      nome: t.nome,
      poder: (t.poder || []).map(x => (typeof x === 'string' ? x : x && x.texto)).filter(x => {
        if (!x || !String(x).trim() || seen.has(norm(x))) return false;
        seen.add(norm(x));
        return true;
      }),
    })).filter(t => t.poder.length);
    // extras: entradas de data.tags fora de todo temas[].poder e que não espelham fraqueza.
    // Strings no formato do editor ("texto 3") perdem o sufixo numérico.
    (d.temas || []).forEach(t => (t.fraqueza || []).forEach(x => { const s = typeof x === 'string' ? x : x && x.texto; if (s) seen.add(norm(s)); }));
    const extras = [];
    for (const x of d.tags || []) {
      let s = typeof x === 'string' ? x.replace(/\s+-?\d+$/, '') : x && x.texto;
      if (!s || !String(s).trim() || seen.has(norm(s))) continue;
      seen.add(norm(s));
      extras.push(String(s).trim());
    }
    return {
      name: r.name, codename: r.codename, faction: r.faction, danger: r.danger, is_global: r.is_global,
      stats: d.stats || {}, descricao: String(d.descricao || '').replace(/\s*---\s*$/, '').slice(0, 300), temas, extras,
    };
  });
  const dup = out.filter((n, i) => out.findIndex(m => key(m.name, m.is_global) === key(n.name, n.is_global)) !== i);
  if (dup.length) throw new Error('NPCs duplicados (name+is_global): ' + dup.map(n => n.name).join(', '));
  fs.writeFileSync(BASELINE, JSON.stringify(out, null, 2) + '\n');
  const nPod = ns => ns.reduce((a, n) => a + n.temas.reduce((b, t) => b + t.poder.length, 0), 0);
  const nExt = ns => ns.reduce((a, n) => a + n.extras.length, 0);
  console.log(`baseline → ${path.relative(ROOT, BASELINE)}: ${out.length} NPCs, ${nPod(out)} tags de poder + ${nExt(out)} extras`);
  if (chunkDir) {
    const sorted = [...out].sort((a, b) => DANGER.indexOf(a.danger) - DANGER.indexOf(b.danger) || a.name.localeCompare(b.name, 'pt'));
    const chunks = [[], [], [], [], []];
    sorted.forEach((n, i) => chunks[i % 5].push(n));
    fs.mkdirSync(chunkDir, { recursive: true });
    chunks.forEach((c, i) => {
      fs.writeFileSync(path.join(chunkDir, `chunk-${i + 1}.json`), JSON.stringify(c, null, 2) + '\n');
      console.log(`  chunk-${i + 1}.json: ${c.length} NPCs, ${nPod(c)} poder + ${nExt(c)} extras`);
    });
  }
}

// ── build ──
function loadGrades(src) {
  const files = fs.statSync(src).isDirectory()
    ? fs.readdirSync(src).filter(f => f.endsWith('.json')).sort().map(f => path.join(src, f))
    : [src];
  return files.flatMap(f => JSON.parse(fs.readFileSync(f, 'utf8')).map(e => ({ ...e, _file: path.basename(f) })));
}

function validate(base, grades, partial) {
  const errs = [];
  const byKey = new Map(base.map(n => [key(n.name, n.is_global), n]));
  const seen = new Map();
  for (const g of grades) {
    const where = `${g._file}: ${g.name}`;
    const npc = byKey.get(key(g.name, g.is_global));
    if (!npc) { errs.push(`${where} (is_global=${g.is_global}): NPC desconhecido`); continue; }
    if (seen.has(npc)) { errs.push(`${where}: NPC duplicado (também em ${seen.get(npc)})`); continue; }
    seen.set(npc, g._file);
    const texts = [...npc.temas.flatMap(t => t.poder), ...npc.extras];
    const got = new Set();
    for (const t of g.tags || []) {
      const w = `${where} / "${t.texto}"`;
      if (!texts.includes(t.texto)) { errs.push(`${w}: tag desconhecida (texto deve ser idêntico ao baseline)`); continue; }
      if (got.has(t.texto)) { errs.push(`${w}: tag duplicada`); continue; }
      got.add(t.texto);
      if (t.grau !== null && !(Number.isInteger(t.grau) && t.grau >= 0 && t.grau <= 99)) errs.push(`${w}: grau deve ser inteiro 0-99 ou null (veio ${JSON.stringify(t.grau)})`);
      if (t.peak != null && !(Number.isInteger(t.peak) && t.peak >= 0 && t.peak <= 99)) errs.push(`${w}: peak deve ser inteiro 0-99 (veio ${JSON.stringify(t.peak)})`);
      if (t.grau !== null) {
        if (!BENCHMARKS.includes(t.benchmark)) errs.push(`${w}: benchmark inválido ${JSON.stringify(t.benchmark)}`);
        if (!t.feat || typeof t.feat !== 'string') errs.push(`${w}: feat vazio`);
      } else if (t.benchmark != null && !BENCHMARKS.includes(t.benchmark)) errs.push(`${w}: benchmark inválido ${JSON.stringify(t.benchmark)}`);
      if (!CONFIDENCE.includes(t.confidence)) errs.push(`${w}: confidence inválido ${JSON.stringify(t.confidence)}`);
    }
    const missing = texts.filter(x => !got.has(x));
    if (missing.length) errs.push(`${where}: faltam ${missing.length} tags: ${missing.map(x => `"${x}"`).join(', ')}`);
  }
  if (!partial) {
    const miss = base.filter(n => !seen.has(n));
    if (miss.length) errs.push(`${miss.length} NPCs do baseline sem nota: ${miss.map(n => n.name).join(', ')}`);
  }
  return { errs, graded: base.filter(n => seen.has(n)) };
}

const sqlStr = s => "'" + String(s).replace(/'/g, "''") + "'";

// O editor do cerebro.html salva data.tags como strings "texto N" (tagToStr/parseTag): uma string
// casa pelo texto inteiro OU sem o sufixo numérico; objetos casam por ->>'texto'.
const STRIP = el => `btrim(regexp_replace(${el} #>> '{}', '\\s+-?[0-9]+$', ''))`;
const tagMatch = (el, k) => `(CASE jsonb_typeof(${el})
              WHEN 'object' THEN lower(btrim(${el} ->> 'texto')) = ${k}
              WHEN 'string' THEN ${k} IN (lower(btrim(${el} #>> '{}')), lower(${STRIP(el)}))
              ELSE FALSE END)`;

// Reescreve um elemento de array de tags aplicando o grau, se casar (string → objeto, sem o sufixo).
// g.grau NULL = tag graduada null: remove o grau antigo (objeto perde a chave; string "X 3" vira {"texto":"X"}).
const tagRewrite = el => `COALESCE((
          SELECT CASE WHEN g.grau IS NULL THEN
                        CASE WHEN jsonb_typeof(${el}) = 'object' THEN ${el} - 'grau'
                             WHEN lower(btrim(${el} #>> '{}')) = lower(btrim(g.tag_texto)) THEN ${el}
                             ELSE jsonb_build_object('texto', ${STRIP(el)}) END
                      WHEN jsonb_typeof(${el}) = 'object' THEN ${el} || jsonb_build_object('grau', g.grau)
                      ELSE jsonb_build_object('texto', CASE WHEN lower(btrim(${el} #>> '{}')) = lower(btrim(g.tag_texto)) THEN ${el} #>> '{}' ELSE ${STRIP(el)} END, 'grau', g.grau) END
          FROM _g010 g
          WHERE g.npc_name = n.name AND g.is_global = n.is_global
            AND ${tagMatch(el, 'lower(btrim(g.tag_texto))')}
          LIMIT 1), ${el})`;

function genSQL(rows) {
  const values = rows.map(r => `  (${sqlStr(r.name)}, ${r.is_global ? 'TRUE' : 'FALSE'}, ${sqlStr(r.texto)}, ${r.grau ?? 'NULL'})`).join(',\n');
  return `-- ═══════════════════════════════════════════════════════════════
-- Migração 010 — grau (APs) nas tags de PODER dos NPCs
-- Gerado por: node scripts/gen-npc-graus.js build   (NÃO editar à mão)
-- Rubrica: supabase/review/npc_graus_rubric.md · Revisão: supabase/review/npc_graus_review.md
--
-- O que faz: para cada (NPC name + is_global, texto, grau) da lista abaixo, define "grau"
-- nas tags cujo texto casa (trim + case-insensitive) dentro de data->'temas'[*]->'poder'
-- e de data->'tags'. Não toca fraquezas, outras chaves, outros elementos nem a ordem.
-- Tag guardada como string "X" (ou "X 3", formato que o editor do cerebro.html grava) que
-- casar vira objeto {"texto":"X","grau":N}.
-- Linhas com grau NULL (tag graduada null): REMOVE o grau antigo (escala 1–6) da tag — objeto
-- perde a chave "grau"; string "X 3" vira {"texto":"X"}; string "X" sem sufixo fica como está.
-- Só toca tags desta lista (textos do baseline do NPC).
-- Não altera stats, danger, nomes nem textos das tags.
--
-- Como rodar: cole o arquivo inteiro no SQL Editor do Supabase e execute. Idempotente:
-- rodar de novo produz o mesmo data. O último SELECT lista linhas COM grau da lista que não
-- casaram com nenhum NPC ou tag (drift do banco de produção) — vazio = tudo aplicado.
-- (Linhas NULL que não casam não são drift: não havia grau a remover.)
--
-- Backup: a 1ª execução cria npcs_backup_010 (id, data) com o estado ANTERIOR; execuções
-- seguintes não o sobrescrevem. Rollback:
--   UPDATE npcs n SET data = b.data, updated_at = NOW() FROM npcs_backup_010 b WHERE b.id = n.id;
-- Depois de validar (ou do rollback):  DROP TABLE npcs_backup_010;
-- ═══════════════════════════════════════════════════════════════

BEGIN;

CREATE TABLE IF NOT EXISTS npcs_backup_010 AS SELECT id, data FROM npcs;
-- tabela em public: sem policies + RLS ligado = invisível para anon/authenticated via API
ALTER TABLE npcs_backup_010 ENABLE ROW LEVEL SECURITY;

DROP TABLE IF EXISTS _g010;
CREATE TEMP TABLE _g010 (npc_name text NOT NULL, is_global boolean NOT NULL, tag_texto text NOT NULL, grau int CHECK (grau BETWEEN 0 AND 99));  -- grau NULL = remover grau antigo
INSERT INTO _g010 (npc_name, is_global, tag_texto, grau) VALUES
${values};

UPDATE npcs n SET
  data = n.data
    || CASE WHEN jsonb_typeof(n.data -> 'temas') = 'array' THEN jsonb_build_object('temas', (
         SELECT COALESCE(jsonb_agg(
           CASE WHEN jsonb_typeof(t.v -> 'poder') = 'array' THEN jsonb_set(t.v, '{poder}', (
             SELECT COALESCE(jsonb_agg(${tagRewrite('p.v')} ORDER BY p.o), '[]'::jsonb)
             FROM jsonb_array_elements(t.v -> 'poder') WITH ORDINALITY p(v, o)))
           ELSE t.v END ORDER BY t.o), '[]'::jsonb)
         FROM jsonb_array_elements(n.data -> 'temas') WITH ORDINALITY t(v, o)))
       ELSE '{}'::jsonb END
    || CASE WHEN jsonb_typeof(n.data -> 'tags') = 'array' THEN jsonb_build_object('tags', (
         SELECT COALESCE(jsonb_agg(${tagRewrite('x.v')} ORDER BY x.o), '[]'::jsonb)
         FROM jsonb_array_elements(n.data -> 'tags') WITH ORDINALITY x(v, o)))
       ELSE '{}'::jsonb END,
  updated_at = NOW()
WHERE EXISTS (SELECT 1 FROM _g010 g WHERE g.npc_name = n.name AND g.is_global = n.is_global);

COMMIT;

-- Drift: linhas com grau da lista sem NPC ou sem a tag no NPC (vazio = tudo aplicado).
SELECT g.npc_name, g.tag_texto, g.grau,
       CASE WHEN NOT EXISTS (SELECT 1 FROM npcs n WHERE n.name = g.npc_name AND n.is_global = g.is_global)
            THEN 'NPC não encontrado' ELSE 'tag não encontrada' END AS motivo
FROM _g010 g
WHERE g.grau IS NOT NULL AND NOT EXISTS (
  SELECT 1 FROM npcs n
  WHERE n.name = g.npc_name AND n.is_global = g.is_global
    AND (EXISTS (
      SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(n.data -> 'tags') = 'array' THEN n.data -> 'tags' ELSE '[]'::jsonb END) e(v)
      WHERE ${tagMatch('e.v', 'lower(btrim(g.tag_texto))')})
    OR EXISTS (
      SELECT 1 FROM jsonb_array_elements(CASE WHEN jsonb_typeof(n.data -> 'temas') = 'array' THEN n.data -> 'temas' ELSE '[]'::jsonb END) t(v),
           jsonb_array_elements(CASE WHEN jsonb_typeof(t.v -> 'poder') = 'array' THEN t.v -> 'poder' ELSE '[]'::jsonb END) p(v)
      WHERE ${tagMatch('p.v', 'lower(btrim(g.tag_texto))')})))
ORDER BY 1, 2;
`;
}

const md = s => String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\n/g, ' ');

// Graus antigos que o SQL remove: tags graduadas null que, no estado reconstruído (seed + 002..009),
// são objeto com "grau" ou string "texto N". (Prod pode diferir — ver drift.)
function countOldGraus(grades) {
  const nulls = new Map(grades.map(g => [key(g.name, g.is_global), new Set(g.tags.filter(t => t.grau === null).map(t => norm(t.texto)))]));
  let n = 0;
  for (const r of replay()) {
    const ns = nulls.get(key(r.name, r.is_global));
    if (!ns || !r.data) continue;
    const els = [...(r.data.temas || []).flatMap(t => (Array.isArray(t.poder) ? t.poder : [])), ...(Array.isArray(r.data.tags) ? r.data.tags : [])];
    for (const e of els) {
      if (e && typeof e === 'object' && 'grau' in e && ns.has(norm(e.texto))) n++;
      else if (typeof e === 'string' && !ns.has(norm(e)) && ns.has(norm(e.replace(/\s+-?\d+$/, '')))) n++;
    }
  }
  return n;
}

function genReview(base, grades, removed) {
  const gBy = new Map(grades.map(g => [key(g.name, g.is_global), g]));
  const npcs = base.filter(n => gBy.has(key(n.name, n.is_global)))
    .sort((a, b) => DANGER.indexOf(a.danger) - DANGER.indexOf(b.danger) || a.name.localeCompare(b.name, 'pt'));
  const all = npcs.flatMap(n => gBy.get(key(n.name, n.is_global)).tags.map(t => ({ n, t })));
  const withG = all.filter(x => x.t.grau !== null);
  // faixas da rubrica (§3): humano · rua · Ômega · cósmico
  const BANDS = [['1–6 humano', 1, 6], ['7–15 rua', 7, 15], ['16–30 Ômega', 16, 30], ['31+ cósmico', 31, 99]];
  let o = `# Revisão — graus das tags de poder dos NPCs\n\nGerado por \`node scripts/gen-npc-graus.js build\`. Rubrica: \`supabase/review/npc_graus_rubric.md\`.\n\n`;
  o += `## Resumo\n\n- NPCs: ${npcs.length} · tags de poder: ${all.length} · com grau: ${withG.length} · null: ${all.length - withG.length}\n`;
  o += `- Graus antigos removidos (tags graduadas null que tinham grau 1–6 no estado seed+002..009): ${removed}\n`;
  o += `- Confiança: ${CONFIDENCE.map(c => `${c} ${all.filter(x => x.t.confidence === c).length}`).join(' · ')}\n\n`;
  o += `| Faixa de grau | Tags |\n|---|---:|\n` + BANDS.map(([l, lo, hi]) => `| ${l} | ${withG.filter(x => x.t.grau >= lo && x.t.grau <= hi).length} |`).join('\n') + '\n\n';
  o += `| Perigo | NPCs | Grau máx. (NPC — tag) | Mediana |\n|---|---:|---|---:|\n`;
  for (const d of DANGER) {
    const xs = withG.filter(x => x.n.danger === d).sort((a, b) => b.t.grau - a.t.grau);
    if (!xs.length) continue;
    const med = xs[Math.floor(xs.length / 2)].t.grau;
    o += `| ${d} | ${npcs.filter(n => n.danger === d).length} | ${xs[0].t.grau} (${md(xs[0].n.name)} — ${md(xs[0].t.texto)}) | ${med} |\n`;
  }
  // Rubrica §3: grau > 30 só em entrada que É a variante cósmica — esta lista deve conter só essas.
  const maxOf = n => Math.max(0, ...gBy.get(key(n.name, n.is_global)).tags.map(t => t.grau ?? 0));
  const cosmic = npcs.filter(n => maxOf(n) > 30).sort((a, b) => maxOf(b) - maxOf(a));
  o += `\n## Entradas com grau > 30 (devem ser só variantes/seres cósmicos) (${cosmic.length})\n\n`;
  o += cosmic.length ? `| NPC | Perigo | Grau máx. | Tags > 30 |\n|---|---|---:|---:|\n` + cosmic.map(n => `| ${md(n.name)} | ${n.danger} | ${maxOf(n)} | ${gBy.get(key(n.name, n.is_global)).tags.filter(t => t.grau > 30).length} |`).join('\n') + '\n' : '_nenhuma_\n';
  const low = all.filter(x => x.t.confidence === 'baixa');
  o += `\n## Confiança baixa (${low.length}), por NPC\n`;
  if (!low.length) o += '\n_nenhuma_\n';
  for (const n of npcs) {
    const ts = low.filter(x => x.n === n);
    if (!ts.length) continue;
    o += `\n**${md(n.name)}** (${n.danger}, ${ts.length})\n\n` + ts.map(({ t }) => `- ${md(t.texto)} — **${t.grau ?? '—'}**${t.peak != null ? ` (pico ${t.peak})` : ''} · ${t.benchmark ?? '—'} · ${md(t.feat)}`).join('\n') + '\n';
  }
  for (const d of DANGER) {
    const ns = npcs.filter(n => n.danger === d);
    if (!ns.length) continue;
    o += `\n## Perigo: ${d}\n`;
    for (const n of ns) {
      const g = gBy.get(key(n.name, n.is_global));
      const s = n.stats || {};
      o += `\n### ${md(n.name)}${n.codename && n.codename !== n.name ? ` (${md(n.codename)})` : ''} — ${md(n.faction)}\n\n`;
      o += `Atributos: ${Object.entries(s).map(([k, v]) => `${k} ${v}`).join(', ')}\n\n`;
      o += `| Tag | Grau | Pico | Benchmark | Feat | Conf. |\n|---|---:|---:|---|---|---|\n`;
      o += g.tags.map(t => `| ${md(t.texto)}${n.extras.includes(t.texto) ? ' _(extra)_' : ''} | ${t.grau ?? '—'} | ${t.peak ?? ''} | ${t.benchmark ?? '—'} | ${md(t.feat)} | ${t.confidence} |`).join('\n') + '\n';
    }
  }
  return o;
}

function build(src, partial) {
  const base = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
  const grades = loadGrades(src);
  const { errs, graded } = validate(base, grades, partial);
  if (errs.length) { console.error(`ERRO: ${errs.length} problemas nas notas:\n- ` + errs.join('\n- ')); process.exit(1); }
  // inclui as null: o SQL remove delas o grau antigo
  const rows = grades.flatMap(g => g.tags.map(t => ({ name: g.name, is_global: g.is_global, texto: t.texto, grau: t.grau })));
  if (!rows.some(r => r.grau !== null)) { console.error('ERRO: nenhum grau não-null para gravar'); process.exit(1); }
  fs.writeFileSync(OUT_SQL, genSQL(rows));
  const removed = countOldGraus(grades);
  fs.writeFileSync(OUT_MD, genReview(base, grades, removed));
  console.log(`build: ${graded.length}/${base.length} NPCs, ${rows.filter(r => r.grau !== null).length} graus + ${rows.filter(r => r.grau === null).length} null (${removed} graus antigos removidos) → ${path.relative(ROOT, OUT_SQL)}, ${path.relative(ROOT, OUT_MD)}${partial ? ' (PARCIAL)' : ''}`);
}

// ── main ──
if (require.main !== module) { module.exports = { replay }; return; }
const [mode, ...args] = process.argv.slice(2);
const opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
if (mode === 'baseline') baseline(opt('--chunks'));
else if (mode === 'build') build(opt('--grades') || GRADES_DIR, args.includes('--partial'));
else { console.log('Uso: node scripts/gen-npc-graus.js baseline [--chunks <dir>] | build [--grades <dir|arquivo>] [--partial]'); process.exit(mode ? 1 : 0); }
