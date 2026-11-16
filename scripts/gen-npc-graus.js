#!/usr/bin/env node
/**
 * Pipeline do rebalanceamento de grau (APs) das tags de PODER dos NPCs.
 *
 *   node scripts/gen-npc-graus.js baseline --from-csv [<dir|arquivo.csv>...] [--out <arquivo>] [--chunks <dir>]
 *     Fonte de verdade = produção. Lê exports CSV (padrão: todos os .csv de supabase/review/npcs_prod_export/;
 *     colunas id,name,is_global,temas,tags [+ opcionais danger,codename,faction,stats,descricao]) e grava
 *     supabase/review/npc_graus_baseline.json. Sem coluna danger/codename/faction: vem do replay abaixo
 *     quando name+is_global casa, senão null. Novo export = soltar outro .csv no diretório e rodar de novo.
 *
 *   node scripts/gen-npc-graus.js baseline [--out <arquivo>] [--chunks <dir>]
 *     Legado: reconstrói a tabela npcs reexecutando (em memória) supabase/seed.sql + migrations/002..009
 *     (padrão --out supabase/review/npc_graus_baseline_seed.json; prod difere disto).
 *     Por NPC: temas[].poder (tags de poder; fraqueza só como contexto), extras (entradas de data.tags fora
 *     de todo poder e que não espelham fraqueza) e graus_antigos. O arquivo de notas cobre poder+extras numa lista tags única.
 *     --chunks: 5 chunks round-robin p/ avaliadores.
 *
 *   node scripts/gen-npc-graus.js build [--grades <dir|arquivo.json>] [--baseline <arquivo>] [--partial]
 *     Lê as notas (padrão supabase/review/npc_graus/*.json), junta por NPC (name+is_global) e tag
 *     (trim + case-insensitive, como o SQL), descarta com aviso notas fora do baseline, valida e gera
 *     supabase/migrations/010_npc_tag_graus.sql + supabase/review/npc_graus_review.md
 *     + partes p/ o SQL Editor em supabase/review/npc_graus_parts/010_npc_tag_graus_partN.sql.
 *     --partial: permite NPCs/tags do baseline sem nota (só para teste do pipeline).
 *
 *   node scripts/gen-npc-graus.js todo --out <dir> [--grades <dir>] [--baseline <arquivo>] [--size 275]
 *     Resumo de reaproveitamento + <dir>/chunk-N.json só com as tags sem nota (~size tags por chunk).
 *     Preenchido, chunk-N.json vai para <grades>/prod-N.json (N continua após o maior prod-N existente).
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
// replay do repo (seed + 002..009): referência/legado — prod difere, por isso fora do arquivo acima
const BASELINE_SEED = path.join(ROOT, 'supabase/review/npc_graus_baseline_seed.json');
const PROD_CSV = path.join(ROOT, 'supabase/review/npcs_prod_export');
const GRADES_DIR = path.join(ROOT, 'supabase/review/npc_graus');
const OUT_SQL = path.join(ROOT, 'supabase/migrations/010_npc_tag_graus.sql');
const OUT_MD = path.join(ROOT, 'supabase/review/npc_graus_review.md');
// fora de migrations/: o Supabase CLI recusaria 4 arquivos com a mesma versão 010
const PARTS_DIR = path.join(ROOT, 'supabase/review/npc_graus_parts');
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

// Linha {name, is_global, danger, codename, faction, data} → entrada do baseline.
function toBaseline(r) {
  const d = r.data || {};
  const txt = x => (typeof x === 'string' ? x : x && x.texto);
  const seen = new Set();
  const temas = (d.temas || []).map(t => ({
    nome: t.nome,
    poder: (t.poder || []).map(txt).filter(x => {
      if (!x || !String(x).trim() || seen.has(norm(x))) return false;
      seen.add(norm(x));
      return true;
    }),
    // só contexto p/ o avaliador (build ignora); fraquezas nunca recebem grau
    fraqueza: (t.fraqueza || []).map(txt).filter(x => x && String(x).trim()),
  })).filter(t => t.poder.length || t.fraqueza.length);
  // extras: entradas de data.tags fora de todo temas[].poder e que não espelham fraqueza.
  // Strings no formato do editor ("texto 3") perdem o sufixo numérico.
  temas.forEach(t => t.fraqueza.forEach(s => seen.add(norm(s))));
  const extras = [];
  for (const x of d.tags || []) {
    let s = typeof x === 'string' ? x.trim().replace(/\s+-?\d+$/, '') : x && x.texto;
    if (!s || !String(s).trim() || seen.has(norm(s))) continue;
    seen.add(norm(s));
    extras.push(String(s).trim());
  }
  // um texto (normalizado) por elemento de poder/tags que já tem grau antigo: objeto com "grau" ou string "texto N"
  const grausAntigos = [...(d.temas || []).flatMap(t => (Array.isArray(t.poder) ? t.poder : [])), ...(Array.isArray(d.tags) ? d.tags : [])]
    .map(e => (e && typeof e === 'object' && 'grau' in e ? norm(e.texto)
      : typeof e === 'string' && /\s-?\d+$/.test(e.trim()) ? norm(e.trim().replace(/\s+-?\d+$/, '')) : null))
    .filter(Boolean);
  return {
    name: r.name, codename: r.codename ?? null, faction: r.faction ?? null, danger: r.danger ?? null, is_global: r.is_global,
    stats: d.stats || {}, descricao: String(d.descricao || '').replace(/\s*---\s*$/, '').slice(0, 300), temas, extras,
    graus_antigos: grausAntigos,
  };
}

// CSV RFC 4180 (aspas, "" escapado, quebras de linha dentro de campo) → objetos pelo cabeçalho.
function parseCSV(text) {
  const rows = [];
  let row = [], f = '', q = false;
  text = text.replace(/^﻿/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c !== '"') f += c;
      else if (text[i + 1] === '"') { f += '"'; i++; } else q = false;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(f); rows.push(row); row = []; f = '';
    } else f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  const [head, ...body] = rows.filter(r => r.length > 1 || r[0] !== '');
  return body.map(r => Object.fromEntries(head.map((h, i) => [h.trim(), r[i]])));
}

// Exports de produção (CSV: id,name,is_global,temas,tags [+ opcionais danger,codename,faction,stats,descricao]).
// temas/tags/stats = JSON de data->'temas'/'tags'/'stats'. Sem coluna danger/codename/faction: vem do
// replay seed+002..009 quando name+is_global casa, senão null.
function csvRows(srcs) {
  const files = srcs.flatMap(s => (fs.statSync(s).isDirectory()
    ? fs.readdirSync(s).filter(f => f.endsWith('.csv')).sort().map(f => path.join(s, f)) : [s]));
  if (!files.length) throw new Error('nenhum CSV em ' + srcs.join(', '));
  const repo = new Map(replay().map(r => [key(r.name, r.is_global), r]));
  const J = v => (v == null || v === '' ? null : JSON.parse(v));
  const rows = files.flatMap(f => parseCSV(fs.readFileSync(f, 'utf8')).map(c => {
    const is_global = /^(true|t|1)$/i.test(String(c.is_global).trim());
    const old = repo.get(key(c.name, is_global)) || {};
    const pick = col => (c[col] != null && c[col] !== '' ? c[col] : old[col] ?? null);
    return {
      id: c.id, name: c.name, is_global, danger: pick('danger'), codename: pick('codename'), faction: pick('faction'),
      data: { temas: J(c.temas) || [], tags: J(c.tags) || [], stats: J(c.stats) || {}, descricao: c.descricao || '' },
    };
  }));
  const ids = rows.map(r => r.id).filter(Boolean);
  const dupId = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dupId.length) throw new Error('ids repetidos entre CSVs: ' + [...new Set(dupId)].join(', '));
  console.log(`CSV: ${files.map(f => path.relative(ROOT, f)).join(', ')} → ${rows.length} NPCs (${rows.filter(r => !repo.has(key(r.name, r.is_global))).length} sem par no seed+migrações → danger null)`);
  return rows;
}

function baseline(chunkDir, csvSrcs, outFile) {
  const out = (csvSrcs ? csvRows(csvSrcs) : replay()).map(toBaseline);
  const dup = out.filter((n, i) => out.findIndex(m => key(m.name, m.is_global) === key(n.name, n.is_global)) !== i);
  if (dup.length) throw new Error('NPCs duplicados (name+is_global): ' + dup.map(n => n.name).join(', '));
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n');
  const nPod = ns => ns.reduce((a, n) => a + n.temas.reduce((b, t) => b + t.poder.length, 0), 0);
  const nExt = ns => ns.reduce((a, n) => a + n.extras.length, 0);
  console.log(`baseline → ${path.relative(ROOT, outFile)}: ${out.length} NPCs, ${nPod(out)} tags de poder + ${nExt(out)} extras`);
  if (chunkDir) {
    const sorted = [...out].sort(byDanger);
    const chunks = [[], [], [], [], []];
    sorted.forEach((n, i) => chunks[i % 5].push(n));
    fs.mkdirSync(chunkDir, { recursive: true });
    chunks.forEach((c, i) => {
      fs.writeFileSync(path.join(chunkDir, `chunk-${i + 1}.json`), JSON.stringify(c, null, 2) + '\n');
      console.log(`  chunk-${i + 1}.json: ${c.length} NPCs, ${nPod(c)} poder + ${nExt(c)} extras`);
    });
  }
}

// perigo desconhecido (NPC só em prod, sem coluna danger) vai por último
const dIdx = d => (DANGER.includes(d) ? DANGER.indexOf(d) : DANGER.length);
const byDanger = (a, b) => dIdx(a.danger) - dIdx(b.danger) || a.name.localeCompare(b.name, 'pt');

// ── build ──
function loadGrades(src) {
  const files = fs.statSync(src).isDirectory()
    ? fs.readdirSync(src).filter(f => f.endsWith('.json')).sort().map(f => path.join(src, f))
    : [src];
  return files.flatMap(f => JSON.parse(fs.readFileSync(f, 'utf8')).map(e => ({ ...e, _file: path.basename(f) })));
}

function checkTag(t, w) {
  const errs = [];
  if (t.grau !== null && !(Number.isInteger(t.grau) && t.grau >= 0 && t.grau <= 99)) errs.push(`${w}: grau deve ser inteiro 0-99 ou null (veio ${JSON.stringify(t.grau)})`);
  if (t.peak != null && !(Number.isInteger(t.peak) && t.peak >= 0 && t.peak <= 99)) errs.push(`${w}: peak deve ser inteiro 0-99 (veio ${JSON.stringify(t.peak)})`);
  if (t.grau !== null) {
    if (!BENCHMARKS.includes(t.benchmark)) errs.push(`${w}: benchmark inválido ${JSON.stringify(t.benchmark)}`);
    if (!t.feat || typeof t.feat !== 'string') errs.push(`${w}: feat vazio`);
  } else if (t.benchmark != null && !BENCHMARKS.includes(t.benchmark)) errs.push(`${w}: benchmark inválido ${JSON.stringify(t.benchmark)}`);
  if (!CONFIDENCE.includes(t.confidence)) errs.push(`${w}: confidence inválido ${JSON.stringify(t.confidence)}`);
  return errs;
}

// Junta as notas de todos os arquivos por NPC (name+is_global exato) e tag (trim + case-insensitive,
// o mesmo casamento do SQL); o texto passa a ser o do baseline. Notas de NPC/tag fora do baseline
// (ex.: textos antigos que prod não tem) são descartadas e só contadas. Mesma tag em dois arquivos:
// ok se grau/peak iguais, senão erro.
function mergeGrades(base, grades) {
  const errs = [];
  const npcs = new Map(base.map(n => [key(n.name, n.is_global), { n, texts: new Map([...n.temas.flatMap(t => t.poder), ...n.extras].map(x => [norm(x), x])), got: new Map() }]));
  const dropped = { npcs: new Map(), tags: [] };
  for (const g of grades) {
    const e = npcs.get(key(g.name, g.is_global));
    if (!e) { dropped.npcs.set(key(g.name, g.is_global), `${g.name} (${g._file})`); continue; }
    for (const t of g.tags || []) {
      const w = `${g._file}: ${g.name} / "${t.texto}"`;
      const texto = e.texts.get(norm(t.texto));
      if (!texto) { dropped.tags.push(w); continue; }
      const prev = e.got.get(texto);
      if (prev) {
        if (prev.grau !== t.grau || (prev.peak ?? null) !== (t.peak ?? null)) errs.push(`${w}: conflita com ${prev._file} (grau ${prev.grau} vs ${t.grau})`);
        continue;
      }
      errs.push(...checkTag(t, w));
      e.got.set(texto, { ...t, texto, _file: g._file });
    }
  }
  return { errs, npcs, dropped };
}

function validate(base, grades, partial) {
  const { errs, npcs, dropped } = mergeGrades(base, grades);
  const graded = [];
  let nMissing = 0;
  for (const { n, texts, got } of npcs.values()) {
    if (!got.size) { if (!partial) errs.push(`${n.name}: NPC do baseline sem nota`); continue; }
    const missing = [...texts.values()].filter(x => !got.has(x));
    nMissing += missing.length;
    if (missing.length && !partial) errs.push(`${n.name}: faltam ${missing.length} tags: ${missing.map(x => `"${x}"`).join(', ')}`);
    graded.push({ name: n.name, is_global: n.is_global, tags: [...texts.values()].filter(x => got.has(x)).map(x => { const { _file, ...t } = got.get(x); return t; }) });
  }
  if (dropped.npcs.size || dropped.tags.length) console.warn(`aviso: descartadas notas fora do baseline — ${dropped.npcs.size} NPCs, ${dropped.tags.length} tags`);
  if (partial && nMissing) console.warn(`aviso (parcial): ${nMissing} tags sem nota em NPCs já graduados`);
  return { errs, graded };
}

const sqlStr = s => "'" + String(s).replace(/'/g, "''") + "'";

// O editor do cerebro.html salva data.tags como strings "texto N" (tagToStr/parseTag): uma string
// casa pelo texto inteiro OU sem o sufixo numérico; objetos casam por ->>'texto'.
// btrim antes do regex: "X 3 " (espaço no fim) também perde o sufixo.
const STRIP = el => `btrim(regexp_replace(btrim(${el} #>> '{}'), '\\s+-?[0-9]+$', ''))`;
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

// SQL Editor do Supabase trunca colagens em ~100k caracteres: além do arquivo completo (psql/CLI),
// emite partes autocontidas ≤ PART_MAX caracteres, cortadas só em fronteira de NPC.
const PART_MAX = 70000;
const chars = s => [...s].length; // code points (= wc -m), não bytes nem UTF-16

function genSQL(rows) {
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
-- ATENÇÃO: o SQL Editor trunca colagens em ~100k caracteres — lá use supabase/review/npc_graus_parts/010_npc_tag_graus_partN.sql.
-- rodar de novo produz o mesmo data. O último SELECT lista linhas COM grau da lista que não
-- casaram com nenhum NPC ou tag (drift do banco de produção) — vazio = tudo aplicado.
-- (Linhas NULL que não casam não são drift: não havia grau a remover.)
--
-- Backup: a 1ª execução cria npcs_backup_010 (id, data) com o estado ANTERIOR; execuções
-- seguintes não o sobrescrevem. Rollback:
--   UPDATE npcs n SET data = b.data, updated_at = NOW() FROM npcs_backup_010 b WHERE b.id = n.id;
-- Depois de validar (ou do rollback):  DROP TABLE npcs_backup_010;
-- ═══════════════════════════════════════════════════════════════

${genBody(rows)}`;
}

function genPartSQL(rows, n, m) {
  return `-- Migração 010 — grau (APs) nas tags de PODER dos NPCs · gerado por node scripts/gen-npc-graus.js build (NÃO editar)
-- Parte ${n} de ${m} — rode todas as partes, uma por vez, no SQL Editor (qualquer ordem; idempotente).
-- Detalhes: supabase/migrations/010_npc_tag_graus.sql (mesmo SQL, só com os NPCs desta parte). Último SELECT = drift desta parte.
-- Backup: a 1ª parte executada cria npcs_backup_010 (estado ANTERIOR); as outras não o sobrescrevem. Rollback:
--   UPDATE npcs n SET data = b.data, updated_at = NOW() FROM npcs_backup_010 b WHERE b.id = n.id;
-- Depois de validar (ou do rollback):  DROP TABLE npcs_backup_010;

${genBody(rows)}`;
}

// Agrupa por NPC (name+is_global, ordem de 1ª aparição) e enche cada parte até PART_MAX.
function splitParts(rows) {
  const groups = new Map();
  rows.forEach(r => { const k = key(r.name, r.is_global); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(r); });
  const parts = [[]];
  for (const g of groups.values()) {
    const cur = parts[parts.length - 1];
    if (cur.length && chars(genPartSQL([...cur, ...g], 99, 99)) > PART_MAX) parts.push([...g]);
    else cur.push(...g);
  }
  const big = parts.find(p => chars(genPartSQL(p, 99, 99)) > PART_MAX);
  if (big) throw new Error(`NPC ${big[0].name} sozinho passa de ${PART_MAX} caracteres`);
  return parts;
}

function genBody(rows) {
  const values = rows.map(r => `  (${sqlStr(r.name)}, ${r.is_global ? 'TRUE' : 'FALSE'}, ${sqlStr(r.texto)}, ${r.grau ?? 'NULL'})`).join(',\n');
  return `BEGIN;

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

// Graus antigos que o SQL remove: tags graduadas null cujo elemento, no estado de origem do baseline
// (export de prod ou seed+002..009), é objeto com "grau" ou string "texto N" (baseline.graus_antigos).
function countOldGraus(base, grades) {
  const old = new Map(base.map(n => [key(n.name, n.is_global), n.graus_antigos || []]));
  return grades.reduce((a, g) => a + g.tags.filter(t => t.grau === null)
    .reduce((b, t) => b + old.get(key(g.name, g.is_global)).filter(x => x === norm(t.texto)).length, 0), 0);
}

function genReview(base, grades, removed) {
  const gBy = new Map(grades.map(g => [key(g.name, g.is_global), g]));
  const npcs = base.filter(n => gBy.has(key(n.name, n.is_global)))
    .sort(byDanger);
  const all = npcs.flatMap(n => gBy.get(key(n.name, n.is_global)).tags.map(t => ({ n, t })));
  const withG = all.filter(x => x.t.grau !== null);
  // faixas da rubrica (§3): humano · rua · Ômega · cósmico
  const BANDS = [['1–6 humano', 1, 6], ['7–15 rua', 7, 15], ['16–30 Ômega', 16, 30], ['31+ cósmico', 31, 99]];
  let o = `# Revisão — graus das tags de poder dos NPCs\n\nGerado por \`node scripts/gen-npc-graus.js build\`. Rubrica: \`supabase/review/npc_graus_rubric.md\`.\n\n`;
  o += `## Resumo\n\n- NPCs: ${npcs.length} · tags de poder: ${all.length} · com grau: ${withG.length} · null: ${all.length - withG.length}\n`;
  o += `- Graus antigos removidos (tags graduadas null que tinham grau 1–6 no estado de origem do baseline): ${removed}\n`;
  o += `- Confiança: ${CONFIDENCE.map(c => `${c} ${all.filter(x => x.t.confidence === c).length}`).join(' · ')}\n\n`;
  o += `| Faixa de grau | Tags |\n|---|---:|\n` + BANDS.map(([l, lo, hi]) => `| ${l} | ${withG.filter(x => x.t.grau >= lo && x.t.grau <= hi).length} |`).join('\n') + '\n\n';
  o += `| Perigo | NPCs | Grau máx. (NPC — tag) | Mediana |\n|---|---:|---|---:|\n`;
  for (const d of [...DANGER, null]) {
    const xs = withG.filter(x => (d ? x.n.danger === d : !DANGER.includes(x.n.danger))).sort((a, b) => b.t.grau - a.t.grau);
    if (!xs.length) continue;
    const med = xs[Math.floor(xs.length / 2)].t.grau;
    o += `| ${d ?? '?'} | ${npcs.filter(n => (d ? n.danger === d : !DANGER.includes(n.danger))).length} | ${xs[0].t.grau} (${md(xs[0].n.name)} — ${md(xs[0].t.texto)}) | ${med} |\n`;
  }
  // Rubrica §3: grau > 30 só em entrada que É a variante cósmica — esta lista deve conter só essas.
  const maxOf = n => Math.max(0, ...gBy.get(key(n.name, n.is_global)).tags.map(t => t.grau ?? 0));
  const cosmic = npcs.filter(n => maxOf(n) > 30).sort((a, b) => maxOf(b) - maxOf(a));
  o += `\n## Entradas com grau > 30 (devem ser só variantes/seres cósmicos) (${cosmic.length})\n\n`;
  o += cosmic.length ? `| NPC | Perigo | Grau máx. | Tags > 30 |\n|---|---|---:|---:|\n` + cosmic.map(n => `| ${md(n.name)} | ${n.danger ?? '?'} | ${maxOf(n)} | ${gBy.get(key(n.name, n.is_global)).tags.filter(t => t.grau > 30).length} |`).join('\n') + '\n' : '_nenhuma_\n';
  const low = all.filter(x => x.t.confidence === 'baixa');
  o += `\n## Confiança baixa (${low.length}), por NPC\n`;
  if (!low.length) o += '\n_nenhuma_\n';
  for (const n of npcs) {
    const ts = low.filter(x => x.n === n);
    if (!ts.length) continue;
    o += `\n**${md(n.name)}** (${n.danger ?? '?'}, ${ts.length})\n\n` + ts.map(({ t }) => `- ${md(t.texto)} — **${t.grau ?? '—'}**${t.peak != null ? ` (pico ${t.peak})` : ''} · ${t.benchmark ?? '—'} · ${md(t.feat)}`).join('\n') + '\n';
  }
  for (const d of [...DANGER, null]) {
    const ns = npcs.filter(n => (d ? n.danger === d : !DANGER.includes(n.danger)));
    if (!ns.length) continue;
    o += `\n## Perigo: ${d ?? 'desconhecido'}\n`;
    for (const n of ns) {
      const g = gBy.get(key(n.name, n.is_global));
      const s = n.stats || {};
      o += `\n### ${md(n.name)}${n.codename && n.codename !== n.name ? ` (${md(n.codename)})` : ''} — ${md(n.faction)}\n\n`;
      if (Object.keys(s).length) o += `Atributos: ${Object.entries(s).map(([k, v]) => `${k} ${v}`).join(', ')}\n\n`;
      o += `| Tag | Grau | Pico | Benchmark | Feat | Conf. |\n|---|---:|---:|---|---|---|\n`;
      o += g.tags.map(t => `| ${md(t.texto)}${n.extras.includes(t.texto) ? ' _(extra)_' : ''} | ${t.grau ?? '—'} | ${t.peak ?? ''} | ${t.benchmark ?? '—'} | ${md(t.feat)} | ${t.confidence} |`).join('\n') + '\n';
    }
  }
  return o;
}

function build(src, partial, baseFile) {
  const base = JSON.parse(fs.readFileSync(baseFile, 'utf8'));
  const { errs, graded } = validate(base, loadGrades(src), partial);
  if (errs.length) { console.error(`ERRO: ${errs.length} problemas nas notas:\n- ` + errs.join('\n- ')); process.exit(1); }
  // inclui as null: o SQL remove delas o grau antigo
  const rows = graded.flatMap(g => g.tags.map(t => ({ name: g.name, is_global: g.is_global, texto: t.texto, grau: t.grau })));
  if (!rows.some(r => r.grau !== null)) { console.error('ERRO: nenhum grau não-null para gravar'); process.exit(1); }
  fs.writeFileSync(OUT_SQL, genSQL(rows));
  fs.mkdirSync(PARTS_DIR, { recursive: true });
  fs.readdirSync(PARTS_DIR).filter(f => /^010_npc_tag_graus_part\d+\.sql$/.test(f)).forEach(f => fs.unlinkSync(path.join(PARTS_DIR, f)));
  const parts = splitParts(rows);
  parts.forEach((p, i) => {
    const sql = genPartSQL(p, i + 1, parts.length);
    fs.writeFileSync(path.join(PARTS_DIR, `010_npc_tag_graus_part${i + 1}.sql`), sql);
    console.log(`  parte ${i + 1}/${parts.length} (${path.relative(ROOT, PARTS_DIR)}): ${p.length} linhas, ${chars(sql)} caracteres`);
  });
  const removed = countOldGraus(base, graded);
  fs.writeFileSync(OUT_MD, genReview(base, graded, removed));
  console.log(`build: ${graded.length}/${base.length} NPCs, ${rows.filter(r => r.grau !== null).length} graus + ${rows.filter(r => r.grau === null).length} null (${removed} graus antigos removidos) → ${path.relative(ROOT, OUT_SQL)}, ${path.relative(ROOT, OUT_MD)}${partial ? ' (PARCIAL)' : ''}`);
}

// ── todo ──
// Lista as tags do baseline ainda sem nota (mesmo casamento do build) em chunks de ~size tags,
// NPC inteiro num chunk só, com o contexto do NPC e as notas já reaproveitadas. Numeração segue
// depois do maior prod-N.json existente em --grades: o avaliador salva todo/chunk-N.json preenchido
// como <grades>/prod-N.json.
function todo(src, baseFile, outDir, size) {
  const base = JSON.parse(fs.readFileSync(baseFile, 'utf8'));
  const grades = loadGrades(src);
  const { errs, npcs, dropped } = mergeGrades(base, grades);
  if (errs.length) { console.error(`ERRO: ${errs.length} problemas nas notas:\n- ` + errs.join('\n- ')); process.exit(1); }
  const items = [];
  let total = 0, reused = 0;
  for (const { n, texts, got } of [...npcs.values()].sort((a, b) => byDanger(a.n, b.n))) {
    const missing = [...texts.values()].filter(x => !got.has(x));
    total += texts.size; reused += texts.size - missing.length;
    if (!missing.length) continue;
    items.push({
      name: n.name, is_global: n.is_global, codename: n.codename, faction: n.faction, danger: n.danger,
      stats: n.stats, descricao: n.descricao,
      temas: n.temas, extras: n.extras,
      // já graduadas (reaproveitadas): só referência p/ manter a consistência — NÃO repetir em tags
      notas_existentes: [...got.values()].map(({ _file, ...t }) => t),
      tags: missing.map(texto => ({ texto, grau: null, benchmark: null, feat: '', confidence: null })),
    });
  }
  const nMiss = total - reused;
  const nChunks = nMiss ? Math.max(1, Math.round(nMiss / size)) : 0;
  const chunks = Array.from({ length: nChunks }, () => []);
  let acc = 0;
  for (const it of items) { chunks[Math.min(nChunks - 1, Math.floor(acc / (nMiss / nChunks)))].push(it); acc += it.tags.length; }
  const start = 1 + Math.max(0, ...(fs.statSync(src).isDirectory() ? fs.readdirSync(src) : [])
    .map(f => /^prod-(\d+)\.json$/.exec(f)).filter(Boolean).map(m => Number(m[1])));
  fs.mkdirSync(outDir, { recursive: true });
  fs.readdirSync(outDir).filter(f => /^chunk-\d+\.json$/.test(f)).forEach(f => fs.unlinkSync(path.join(outDir, f)));
  const partly = items.filter(it => it.notas_existentes.length).length;
  console.log(`todo: ${base.length} NPCs · ${total} tags graduáveis (poder + extras) · reaproveitadas ${reused} · faltam ${nMiss} em ${items.length} NPCs (${partly} parciais, ${items.length - partly} sem nenhuma nota)`);
  console.log(`  notas descartadas (fora do baseline): ${dropped.npcs.size} NPCs, ${dropped.tags.length} tags`);
  chunks.forEach((c, i) => {
    const f = path.join(outDir, `chunk-${start + i}.json`);
    fs.writeFileSync(f, JSON.stringify(c, null, 2) + '\n');
    console.log(`  ${f}: ${c.length} NPCs, ${c.reduce((a, it) => a + it.tags.length, 0)} tags → salvar preenchido como ${path.relative(ROOT, path.join(fs.statSync(src).isDirectory() ? src : path.dirname(src), `prod-${start + i}.json`))}`);
  });
  const none = items.filter(it => !it.notas_existentes.length).map(it => it.name);
  if (none.length) console.log(`  NPCs sem nenhuma nota reaproveitável (${none.length}): ${none.join('; ')}`);
  if (dropped.npcs.size) console.log(`  NPCs das notas ausentes do baseline (${dropped.npcs.size}): ${[...dropped.npcs.values()].join('; ')}`);
}

// ── main ──
if (require.main !== module) { module.exports = { replay, parseCSV }; return; }
const [mode, ...args] = process.argv.slice(2);
const opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
// --from-csv aceita vários caminhos (arquivos ou diretórios) até a próxima flag
const optList = n => { const i = args.indexOf(n); if (i < 0) return undefined; const j = args.findIndex((a, k) => k > i && a.startsWith('--')); return args.slice(i + 1, j < 0 ? undefined : j); };
const baseOpt = () => (opt('--baseline') ? path.resolve(opt('--baseline')) : BASELINE);
if (mode === 'baseline') {
  const csv = optList('--from-csv');
  if (csv && !csv.length) csv.push(PROD_CSV);
  // o baseline commitado vem dos exports de prod; o replay seed+002..009 só sobrescreve com --out explícito
  baseline(opt('--chunks'), csv, opt('--out') ? path.resolve(opt('--out')) : csv ? BASELINE : BASELINE_SEED);
} else if (mode === 'build') build(opt('--grades') || GRADES_DIR, args.includes('--partial'), baseOpt());
else if (mode === 'todo') {
  if (!opt('--out')) { console.error('todo precisa de --out <dir>'); process.exit(1); }
  todo(opt('--grades') || GRADES_DIR, baseOpt(), path.resolve(opt('--out')), Number(opt('--size') || 275));
} else { console.log('Uso: node scripts/gen-npc-graus.js baseline [--from-csv <dir|arquivo.csv>...] [--out <arquivo>] [--chunks <dir>] | build [--grades <dir|arquivo>] [--baseline <arquivo>] [--partial] | todo --out <dir> [--grades <dir>] [--baseline <arquivo>] [--size 275]'); process.exit(mode ? 1 : 0); }
