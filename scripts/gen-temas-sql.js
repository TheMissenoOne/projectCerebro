#!/usr/bin/env node
/**
 * Gera a migração de "theme cards" para os NPCs do Cérebro.
 *  - NPCs existentes (cerebro_rebalanceado.md): UPDATE adicionando data.temas.
 *    Fraquezas são detectadas pelo grau negativo do markdown rebalanceado.
 *  - NPCs novos (Morbius.md): INSERT com theme cards feitos à mão (SPEC abaixo).
 * Saída: supabase/migrations/002_npc_temas.sql
 * NÃO toca na tabela `characters`.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const EXISTING_MD = path.join(ROOT, 'cerebro_rebalanceado.md');
const NEW_MD = process.argv[2] || path.join(ROOT, 'Morbius.md');
const OUT = path.join(ROOT, 'supabase', 'migrations', '002_npc_temas.sql');

const STAT_KEY = {
  'Destreza': 'destreza', 'Força': 'força', 'Corpo': 'corpo',
  'Inteligência': 'inteligência', 'Vontade': 'vontade', 'Mente': 'mente',
  'Influência': 'influência', 'Aura': 'aura', 'Espírito': 'espírito'
};

const sq = s => String(s == null ? '' : s).replace(/'/g, "''");
const jb = obj => "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";

// ── parsing ────────────────────────────────────────────────
function splitBlocks(md) {
  return md.split(/^#{1,3} NPC:\s*/m).slice(1).map(b => {
    const lines = b.split('\n');
    const npc = { name: lines[0].trim(), codename: '', faction: '', danger: '',
      iniciativa: 0, stats: {}, tagLines: [], descricao: '' };
    let inStats = false, inTags = false, inDesc = false;
    for (let i = 1; i < lines.length; i++) {
      const l = lines[i].trim();
      if (l.startsWith('**Codinome:**')) npc.codename = l.replace('**Codinome:**', '').trim();
      else if (l.startsWith('**Fração:**')) npc.faction = l.replace('**Fração:**', '').trim().toLowerCase();
      else if (l.startsWith('**Perigo:**')) npc.danger = l.replace('**Perigo:**', '').trim().toLowerCase();
      else if (l.startsWith('## Tags')) { inTags = true; inStats = false; inDesc = false; }
      else if (l.startsWith('## Descrição')) { inDesc = true; inTags = false; inStats = false; }
      else if (l.startsWith('## ') || l.startsWith('# ')) { inTags = false; inStats = false; inDesc = false; }
      else if (l.startsWith('|')) {
        inStats = true;
        const cells = l.split('|').map(c => c.trim()).filter(Boolean);
        if (cells.length >= 2) {
          if (cells[0] === 'Iniciativa') npc.iniciativa = parseInt(cells[1]) || 0;
          else if (STAT_KEY[cells[0]]) npc.stats[STAT_KEY[cells[0]]] = parseInt(cells[1]) || 0;
        }
      } else if (inTags && l.startsWith('- ')) npc.tagLines.push(l.slice(2).trim());
      else if (inDesc && l && !l.startsWith('#') && !l.startsWith('|') && !l.startsWith('*(') && !/^-{3,}$/.test(l)) npc.descricao += (npc.descricao ? '\n' : '') + l;
    }
    return npc;
  });
}

// tag do markdown rebalanceado: "Texto — descrição N" (N pode ser negativo = fraqueza)
function parseSignedTag(line) {
  let s = line.trim();
  const m = s.match(/(-?\d+)\s*$/);
  let grau = 0;
  if (m) { grau = parseInt(m[1], 10); s = s.slice(0, m.index).trim(); }
  const emd = s.indexOf('—');
  if (emd >= 0) s = s.slice(0, emd).trim();
  return { texto: s, grau };
}
// tag do markdown novo: "Texto N" (grau sempre positivo; fraqueza definida na SPEC)
function parsePosTag(line) {
  let s = line.trim();
  const m = s.match(/(\d+)\s*$/);
  let grau = 0;
  if (m) { grau = parseInt(m[1], 10); s = s.slice(0, m.index).trim(); }
  return { texto: s, grau };
}

// ── NPCs existentes → temas (poder = grau>=0, fraqueza = grau<0) ──
function temasFromSigned(tagLines) {
  const tags = tagLines.map(parseSignedTag);
  const pods = tags.filter(t => t.grau >= 0).map(t => ({ texto: t.texto, grau: t.grau || undefined }));
  const frqs = tags.filter(t => t.grau < 0).map(t => ({ texto: t.texto, grau: Math.abs(t.grau) }));
  const cards = [];
  if (pods.length) {
    const top = [...tags.filter(t => t.grau >= 0)].sort((a, b) => b.grau - a.grau)[0];
    cards.push({ nome: top ? top.texto : 'Poderes', poder: pods.map(clean), fraqueza: [] });
  }
  if (frqs.length) cards.push({ nome: 'Vulnerabilidades', poder: [], fraqueza: frqs.map(clean) });
  return cards;
}
const clean = o => { const r = { texto: o.texto }; if (o.grau) r.grau = o.grau; return r; };

// ── SPEC dos NPCs novos: agrupamento temático feito à mão (índices das tags) ──
// Cada card: { nome, pod:[índices], frq:[índices] }
const SPEC = {
  'Morbius': [
    { nome: 'Vampiro Vivo', pod: [0, 1, 2, 3, 5] },
    { nome: 'Gênio Bioquímico', pod: [4, 6, 7] },
    { nome: 'Herança Lilin', frq: [8, 9, 10, 11] }
  ],
  'Vic Slaughter': [
    { nome: 'Cria Vampírica', pod: [0, 1, 2, 3] },
    { nome: 'Mercenário Preso', pod: [4, 5], frq: [6, 7, 8] }
  ],
  'Estrela Polar': [
    { nome: 'Velocista Supersónico', pod: [0, 1] },
    { nome: 'Herança da Alfa Flight', pod: [2, 3], frq: [4] }
  ],
  'Boggart': [
    { nome: 'Pesadelo Vivo', pod: [0, 1] },
    { nome: 'Coração Leal', pod: [2, 3], frq: [4] }
  ],
  'Náiade': [
    { nome: 'Senhora das Águas', pod: [0, 1, 4] },
    { nome: 'Temperamento de Maré', pod: [2], frq: [3] }
  ],
  'Mira (Pinpoint)': [
    { nome: 'Precisão Absoluta', pod: [0, 1, 4] },
    { nome: 'Mente Metódica', pod: [2], frq: [3] }
  ],
  'Trovão': [
    { nome: 'Voz de Trovão', pod: [0, 1] },
    { nome: 'Alma Incandescente', pod: [3], frq: [2, 4] }
  ],
  'Umbra': [
    { nome: 'Andarilha das Sombras', pod: [0, 1] },
    { nome: 'Guardiã Silenciosa', pod: [3], frq: [2, 4] }
  ],
  'Xenônio': [
    { nome: 'Gás Nobre', pod: [0, 1, 4] },
    { nome: 'Inconstância', frq: [2, 3] }
  ],
  'Anole': [
    { nome: 'Lagarto Ágil', pod: [0, 1] },
    { nome: 'Confiança de Aço', pod: [2, 3, 4] }
  ],
  'Indra': [
    { nome: 'Escudo Vivo', pod: [0, 1] },
    { nome: 'Não-Violência', pod: [2, 3], frq: [4] }
  ],
  'Kidogo': [
    { nome: 'Gigante e Formiga', pod: [0, 1] },
    { nome: 'Humildade Colossal', pod: [2, 3], frq: [4] }
  ],
  'Loa': [
    { nome: 'Toque Dissipador', pod: [0, 1] },
    { nome: 'Onda Havaiana', pod: [2, 3], frq: [4] }
  ],
  'Rede (Network)': [
    { nome: 'Rede Telepática', pod: [0, 1] },
    { nome: 'Fofoca Digital', pod: [2], frq: [3, 4] }
  ],
  'Moça de Borracha': [
    { nome: 'Corpo Elástico', pod: [0, 1] },
    { nome: 'Otimismo Resiliente', pod: [2, 4], frq: [3] }
  ],
  'Bling!': [
    { nome: 'Pele de Diamante', pod: [0, 1] },
    { nome: 'Brilho Próprio', pod: [2, 3, 4] }
  ],
  'Flubber': [
    { nome: 'Geleia Viva', pod: [0, 1] },
    { nome: 'Alma Boba', pod: [2, 4], frq: [3] }
  ],
  'Foxx': [
    { nome: 'Mística Infiltrada', pod: [0, 1] },
    { nome: 'Agente Duplo', pod: [2], frq: [3, 4] }
  ],
  'Onyxx': [
    { nome: 'Tanque de Granito', pod: [0, 1] },
    { nome: 'Coração de Ouro', pod: [2, 3], frq: [4] }
  ],
  'Garoto Chuva': [
    { nome: 'Corpo de Água', pod: [0, 1] },
    { nome: 'Céu Nublado', frq: [2, 3, 4] }
  ],
  'Dríade': [
    { nome: 'Voz da Floresta', pod: [0, 1, 4] },
    { nome: 'Raiz Profunda', pod: [2], frq: [3] }
  ],
  'Espinho': [
    { nome: 'Chuva de Espinhos', pod: [0, 1] },
    { nome: 'Casca Defensiva', pod: [4], frq: [2, 3] }
  ],
  'Espectro': [
    { nome: 'Fantasma Andante', pod: [0, 1] },
    { nome: 'Alma Distante', pod: [3], frq: [2, 4] }
  ],
  'Três‑em‑Uma (Stepford Cuckoos)': [
    { nome: 'Mente de Colmeia', pod: [0, 1, 3] },
    { nome: 'Trio Frágil', pod: [2], frq: [4] }
  ],
  'Dust (Poeira)': [
    { nome: 'Tempestade de Areia', pod: [0, 1] },
    { nome: 'Fé e Reserva', pod: [2, 3], frq: [4] }
  ]
};
// NPCs no arquivo novo que já existem no banco (não inserir de novo):
const SKIP_NEW = new Set(['Lupina (Wolfsbane)']);

function temasFromSpec(name, tags) {
  const spec = SPEC[name];
  if (!spec) return null;
  return spec.map(card => ({
    nome: card.nome,
    poder: (card.pod || []).map(i => clean(tags[i])),
    fraqueza: (card.frq || []).map(i => clean(tags[i]))
  }));
}

// ── build ──────────────────────────────────────────────────
const existing = splitBlocks(fs.readFileSync(EXISTING_MD, 'utf8'));
const news = splitBlocks(fs.readFileSync(NEW_MD, 'utf8'));

let sql = `-- ═══════════════════════════════════════════════════════════════\n`;
sql += `-- Migração: Theme Cards para NPCs do Cérebro\n`;
sql += `-- Gerado por scripts/gen-temas-sql.js — NÃO toca na tabela characters.\n`;
sql += `-- 1) Atualiza os ${existing.length} NPCs existentes (adiciona data.temas)\n`;
sql += `-- 2) Insere os NPCs novos do markdown com theme cards feitos à mão\n`;
sql += `-- ═══════════════════════════════════════════════════════════════\n\nBEGIN;\n\n`;

sql += `-- ─── 1. NPCs existentes → theme cards ───\n`;
let updated = 0;
for (const npc of existing) {
  const temas = temasFromSigned(npc.tagLines);
  if (!temas.length) continue;
  sql += `UPDATE npcs SET data = jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', ${jb(temas)}), updated_at = NOW()\n`;
  sql += `  WHERE name = '${sq(npc.name)}' AND is_global = TRUE;\n`;
  updated++;
}

sql += `\n-- ─── 2. NPCs novos (${NEW_MD.split('/').pop()}) ───\n`;
let inserted = 0, skipped = [];
for (const npc of news) {
  if (SKIP_NEW.has(npc.name)) { skipped.push(npc.name); continue; }
  const tags = npc.tagLines.map(parsePosTag);
  const temas = temasFromSpec(npc.name, tags);
  if (!temas) { skipped.push(npc.name + ' (sem SPEC)'); continue; }
  const flatTags = tags.map(clean);
  const data = { iniciativa: npc.iniciativa || 0, stats: npc.stats, temas, tags: flatTags };
  if (npc.descricao) data.descricao = npc.descricao;
  const danger = ['baixo', 'medio', 'alto', 'extremo'].includes(npc.danger) ? npc.danger : 'medio';
  sql += `INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at)\n`;
  sql += `  SELECT gen_random_uuid(), '${sq(npc.name)}', '${sq(npc.codename)}', '${sq(npc.faction)}', '${danger}', ${jb(data)}, TRUE, NOW()\n`;
  sql += `  WHERE NOT EXISTS (SELECT 1 FROM npcs WHERE name = '${sq(npc.name)}' AND is_global = TRUE);\n`;
  inserted++;
}

sql += `\nCOMMIT;\n`;
sql += `\n-- Resumo: ${updated} UPDATE, ${inserted} INSERT.`;
if (skipped.length) sql += ` Ignorados: ${skipped.join(', ')}.`;
sql += `\n`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, sql);
console.log(`OK → ${OUT}`);
console.log(`  ${updated} UPDATE (existentes), ${inserted} INSERT (novos)`);
if (skipped.length) console.log(`  Ignorados: ${skipped.join(', ')}`);
