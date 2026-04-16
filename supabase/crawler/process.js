/**
 * process.js — LLM-powered tag cleaner + SQL generator
 *
 * Reads raw-data/*.json, uses @huggingface/transformers (Gemma 3 4B or
 * fallback to Qwen2.5-1.5B-Instruct for CPU) to clean and format tag names,
 * then writes the final seed.sql.
 *
 * Run: node process.js [--model gemma] [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW_DIR   = join(__dirname, 'raw-data');
const OUT_DIR   = join(__dirname, 'output');
mkdirSync(OUT_DIR, { recursive: true });

// ──────────────────────────────────────────────────────────
// Model config
//
// Primary:  google/gemma-3-4b-it  (4B — needs ~4GB RAM, good quality)
// Fallback: Qwen/Qwen2.5-1.5B-Instruct (1.5B — CPU friendly, fast)
//
// The model runs locally via ONNX/WASM in transformers.js.
// First run downloads the model to ~/.cache/huggingface/
// ──────────────────────────────────────────────────────────
const MODELS = {
  gemma:  'onnx-community/gemma-3-4b-it',
  qwen:   'onnx-community/Qwen2.5-1.5B-Instruct',
  phi:    'onnx-community/Phi-3.5-mini-instruct',
};

// ──────────────────────────────────────────────────────────
// Danger level → faction colour for seed
// ──────────────────────────────────────────────────────────
const DANGER_ORDER = ['baixo', 'medio', 'alto', 'extremo'];

// ──────────────────────────────────────────────────────────
// Grade heuristic for tags
//
// Translate power magnitude keywords → MEGS tag grades (1–6)
// The LLM will refine the text; we still need numeric grades.
// ──────────────────────────────────────────────────────────
function inferGrade(text, isWeakness = false) {
  const t = text.toLowerCase();

  if (isWeakness) {
    if (t.includes('lethal') || t.includes('fatal') || t.includes('adamantium') || t.includes('complete')) return -4;
    if (t.includes('severe') || t.includes('extreme') || t.includes('total')) return -3;
    if (t.includes('limited') || t.includes('reduced') || t.includes('no control')) return -2;
    return -1;
  }

  // Positive grades
  if (t.includes('omega') || t.includes('cosmic') || t.includes('absolute') || t.includes('unlimited')) return 6;
  if (t.includes('planet') || t.includes('city') || t.includes('area-wide') || t.includes('global')) return 5;
  if (t.includes('superhuman') || t.includes('molecular') || t.includes('psionic') || t.includes('telekinesis')) return 4;
  if (t.includes('enhanced') || t.includes('master') || t.includes('expert') || t.includes('genius')) return 4;
  if (t.includes('peak') || t.includes('above') || t.includes('extraordinary')) return 3;
  if (t.includes('control') || t.includes('telepathy') || t.includes('manipulation')) return 4;
  if (t.includes('accelerated') || t.includes('rapid') || t.includes('regenerat')) return 5;
  if (t.includes('invulner') || t.includes('indestructible') || t.includes('immunity')) return 5;
  if (t.includes('blast') || t.includes('beam') || t.includes('optic') || t.includes('energy')) return 4;
  if (t.includes('flight') || t.includes('teleport') || t.includes('phasing')) return 4;
  if (t.includes('speed') || t.includes('agility') || t.includes('reflexes')) return 3;
  if (t.includes('claws') || t.includes('bone') || t.includes('adamantium')) return 5;
  if (t.includes('training') || t.includes('martial') || t.includes('acrobat')) return 3;
  if (t.includes('leader') || t.includes('strategy') || t.includes('tactician')) return 3;
  return 2; // baseline
}

// ──────────────────────────────────────────────────────────
// Build the LLM prompt for tag name cleaning
// ──────────────────────────────────────────────────────────
function buildPrompt(charName, rawItems, type) {
  const typeDesc = {
    powers:    'mutant superpowers and abilities',
    abilities: 'trained skills and non-power capabilities',
    equipment: 'equipment, weapons, and technology',
    weaknesses:'weaknesses, vulnerabilities, and limitations',
  }[type] || type;

  const itemList = rawItems.map((t, i) => `${i + 1}. ${t}`).join('\n');

  return `You are writing TTRPG character tags for ${charName} from the X-Men universe.

Convert these raw wiki descriptions of ${typeDesc} into concise, evocative TTRPG tag names.

Rules:
- Each tag must be 2–6 words, in Portuguese (Brazil)
- Tags should sound dramatic and cinematic, like "Rajada Óptica Devastadora" or "Fator de Cura Acelerado"
- Keep the meaning faithful to the original
- Output ONLY the tag names, one per line, numbered
- No explanations, no punctuation after the tag

Input (${rawItems.length} items):
${itemList}

Output (${rawItems.length} Portuguese tag names, numbered):`;
}

// ──────────────────────────────────────────────────────────
// Parse LLM output → array of cleaned tag strings
// ──────────────────────────────────────────────────────────
function parseLlmOutput(output, expectedCount) {
  const lines = output
    .split('\n')
    .map(l => l.replace(/^\d+[.)]\s*/, '').replace(/[*_]/g, '').trim())
    .filter(l => l.length > 2 && l.length < 80);

  // Pad or truncate to expected count
  const result = lines.slice(0, expectedCount);
  while (result.length < expectedCount) result.push('Habilidade Especial');
  return result;
}

// ──────────────────────────────────────────────────────────
// Fallback (no LLM): translate common English patterns to PT-BR
// ──────────────────────────────────────────────────────────
const QUICK_TRANS = [
  [/telepathy/i, 'Telepatia'],
  [/telekinesis/i, 'Telecinese'],
  [/healing factor/i, 'Fator de Cura'],
  [/adamantium/i, 'Adamantium'],
  [/optic blast/i, 'Rajada Óptica'],
  [/flight/i, 'Voo'],
  [/superhuman strength/i, 'Força Sobre-Humana'],
  [/superhuman speed/i, 'Velocidade Sobre-Humana'],
  [/superhuman agility/i, 'Agilidade Sobre-Humana'],
  [/superhuman durability/i, 'Durabilidade Sobre-Humana'],
  [/energy projection/i, 'Projeção de Energia'],
  [/magnetism/i, 'Magnetismo'],
  [/magnetic/i, 'Magnético'],
  [/ice/i, 'Gelo'],
  [/weather control/i, 'Controle Climático'],
  [/lightning/i, 'Relâmpago'],
  [/teleportation/i, 'Teletransporte'],
  [/phasing/i, 'Intangibilidade'],
  [/shape.?shift/i, 'Metamorfismo'],
  [/regenerat/i, 'Regeneração'],
  [/invulnerab/i, 'Invulnerabilidade'],
  [/claws/i, 'Garras'],
  [/invisib/i, 'Invisibilidade'],
  [/psionic/i, 'Psiônico'],
  [/precogni/i, 'Precognição'],
  [/fire/i, 'Fogo'],
  [/plasma/i, 'Plasma'],
  [/radiation/i, 'Radiação'],
  [/tactician/i, 'Tático de Elite'],
  [/leader/i, 'Líder'],
  [/genius/i, 'Intelecto Genial'],
  [/acrobat/i, 'Acrobacia'],
  [/martial art/i, 'Artes Marciais'],
  [/marksman/i, 'Atirador de Elite'],
  [/hand.to.hand/i, 'Combate Corpo a Corpo'],
  [/engineer/i, 'Engenharia'],
  [/hacker/i, 'Hacking'],
];

function quickTranslate(text) {
  let result = text;
  // Capitalise first word and limit length
  for (const [re, pt] of QUICK_TRANS) {
    if (re.test(result)) {
      result = result.replace(re, pt);
      break;
    }
  }
  // Trim to max 6 words
  const words = result.split(/\s+/).slice(0, 6);
  return words.map((w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(' ');
}

// ──────────────────────────────────────────────────────────
// SQL builder
// ──────────────────────────────────────────────────────────
function buildSQL(sheets) {
  const lines = [
    `-- Cérebro Seed — gerado automaticamente por cerebro-crawler`,
    `-- ${sheets.length} personagens · ${new Date().toISOString()}`,
    `-- Executar no SQL Editor do Supabase`,
    '',
    `-- Limpar NPCs globais antes de reinserir`,
    `DELETE FROM npcs WHERE is_global = true;`,
    '',
  ];

  for (const s of sheets) {
    const data = JSON.stringify({
      iniciativa: s.iniciativa,
      stats: s.stats,
      tags: s.tags,
      descricao: s.descricao,
    });

    // Escape single quotes for SQL
    const safeName   = s.name.replace(/'/g, "''");
    const safeCode   = s.codename.replace(/'/g, "''");
    const safeData   = data.replace(/'/g, "''");

    lines.push(`-- ${s.name}`);
    lines.push(`INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (`);
    lines.push(`  gen_random_uuid(),`);
    lines.push(`  '${safeName}',`);
    lines.push(`  '${safeCode}',`);
    lines.push(`  '${s.faction}',`);
    lines.push(`  '${s.danger}',`);
    lines.push(`  '${safeData}'::jsonb,`);
    lines.push(`  true,`);
    lines.push(`  NOW()`);
    lines.push(`);`);
    lines.push('');
  }

  return lines.join('\n');
}

// ──────────────────────────────────────────────────────────
// Main processing pipeline
// ──────────────────────────────────────────────────────────
async function processCharacter(raw, pipe, useLLM) {
  const { name, faction, danger, realName, alias, stats, powerGrid,
          rawPowers, rawAbilities, rawEquipment, rawWeaknesses, intro } = raw;

  console.log(`[process] ${name}`);

  // Build tag sets
  const tagSources = {
    powers:    rawPowers.slice(0, 8),
    abilities: rawAbilities.slice(0, 4),
    equipment: rawEquipment.slice(0, 3),
    weaknesses:rawWeaknesses.slice(0, 3),
  };

  const processedTags = {};

  for (const [type, items] of Object.entries(tagSources)) {
    if (!items.length) { processedTags[type] = []; continue; }

    if (useLLM && pipe) {
      try {
        const prompt = buildPrompt(name, items, type);
        const result = await pipe(prompt, {
          max_new_tokens: items.length * 12,
          temperature: 0.3,
          do_sample: true,
        });
        const output = result[0]?.generated_text?.split(prompt).pop() ?? '';
        processedTags[type] = parseLlmOutput(output, items.length);
        console.log(`  ✓ LLM ${type}: ${processedTags[type].slice(0,2).join(', ')}...`);
      } catch (err) {
        console.warn(`  ⚠ LLM failed for ${type}: ${err.message} — using fallback`);
        processedTags[type] = items.map(quickTranslate);
      }
    } else {
      processedTags[type] = items.map(quickTranslate);
    }
  }

  // Assemble final tags array
  const finalTags = [];

  for (const item of processedTags.powers) {
    finalTags.push({ texto: item, grau: inferGrade(item) });
  }
  for (const item of processedTags.abilities) {
    finalTags.push({ texto: item, grau: inferGrade(item) });
  }
  for (const item of processedTags.equipment) {
    finalTags.push({ texto: item, grau: inferGrade(item) });
  }
  for (const item of processedTags.weaknesses) {
    finalTags.push({ texto: item, grau: inferGrade(item, true) });
  }

  // Clamp: max 12 tags (8 positive + 4 negative)
  const positive = finalTags.filter(t => t.grau > 0).slice(0, 8);
  const negative = finalTags.filter(t => t.grau < 0).slice(0, 4);
  const tags = [...positive, ...negative];

  // Build stats: use crawled stats if available, otherwise keep existing
  const baseStats = stats?.stats ?? {
    destreza: 5, força: 4, corpo: 5,
    inteligência: 5, vontade: 5, mente: 5,
    influência: 5, aura: 5, espírito: 5,
  };

  const iniciativa = stats?.iniciativa ?? 7;

  // Description: combine power grid info + intro
  const gridDesc = Object.keys(powerGrid).length
    ? `Power grid: ${Object.entries(powerGrid).map(([k,v]) => `${k} ${v}`).join(', ')}.`
    : '';
  const descricao = [gridDesc, intro].filter(Boolean).join('\n').substring(0, 700) + '\n---';

  const codename = alias || realName || name;

  return {
    name,
    codename,
    faction,
    danger,
    iniciativa,
    stats: baseStats,
    tags,
    descricao,
    powerGrid,
  };
}

// ──────────────────────────────────────────────────────────
// CLI entry point
// ──────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const modelArg = args.find(a => a.startsWith('--model='))?.split('=')[1]
    ?? args[args.findIndex(a => a === '--model') + 1]
    ?? 'qwen';          // default to smaller model for CPU
  const dryRun  = args.includes('--dry-run');
  const noLLM   = args.includes('--no-llm');
  const charArg = args.find(a => a.startsWith('--char='))?.split('=')[1]
    ?? args[args.findIndex(a => a === '--char') + 1];

  // Load raw data
  if (!existsSync(RAW_DIR)) {
    console.error('No raw-data/ directory found. Run crawl.js first.');
    process.exit(1);
  }

  let files = readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
  if (charArg) {
    files = files.filter(f => f.toLowerCase().includes(charArg.toLowerCase()));
  }

  if (!files.length) {
    console.error('No JSON files in raw-data/. Run crawl.js first.');
    process.exit(1);
  }

  console.log(`\n📂 Processing ${files.length} character(s)`);

  // Load LLM pipeline (skip in dry-run or no-llm mode)
  let pipe = null;
  const useLLM = !dryRun && !noLLM;

  if (useLLM) {
    const modelId = MODELS[modelArg] ?? MODELS.qwen;
    console.log(`\n🤖 Loading model: ${modelId}`);
    console.log(`   (First run downloads ~1-4GB to ~/.cache/huggingface/)\n`);

    try {
      // Dynamic import to allow --no-llm to skip entirely
      const { pipeline, env } = await import('@huggingface/transformers');

      // Force CPU WASM backend (no CUDA in this environment)
      env.backends.onnx.wasm.proxy = false;

      pipe = await pipeline('text-generation', modelId, {
        dtype: 'q4',          // 4-bit quantisation — fits in CPU RAM
        device: 'cpu',
      });
      console.log('  ✓ Model loaded\n');
    } catch (err) {
      console.warn(`  ⚠ LLM load failed: ${err.message}`);
      console.warn('  Falling back to rule-based translation\n');
      pipe = null;
    }
  } else {
    console.log('\n⚡ Skipping LLM (--no-llm or --dry-run)\n');
  }

  const sheets = [];

  for (const file of files) {
    const raw = JSON.parse(readFileSync(join(RAW_DIR, file), 'utf-8'));
    try {
      const sheet = await processCharacter(raw, pipe, useLLM && !!pipe);
      sheets.push(sheet);
    } catch (err) {
      console.warn(`  ✗ ${raw.name}: ${err.message}`);
    }
  }

  // Sort by faction + danger
  sheets.sort((a, b) => {
    if (a.faction !== b.faction) return a.faction.localeCompare(b.faction);
    return DANGER_ORDER.indexOf(b.danger) - DANGER_ORDER.indexOf(a.danger);
  });

  console.log(`\n📊 Generated ${sheets.length} character sheets`);

  if (dryRun) {
    console.log('\n[dry-run] First 2 sheets:\n');
    for (const s of sheets.slice(0, 2)) {
      console.log(JSON.stringify(s, null, 2));
    }
    return;
  }

  // Write outputs
  const sqlPath  = join(OUT_DIR, 'seed-crawled.sql');
  const jsonPath = join(OUT_DIR, 'sheets.json');

  const sql = buildSQL(sheets);
  writeFileSync(sqlPath,  sql,                      'utf-8');
  writeFileSync(jsonPath, JSON.stringify(sheets, null, 2), 'utf-8');

  console.log(`\n✅ Output written:`);
  console.log(`   ${sqlPath}`);
  console.log(`   ${jsonPath}`);
  console.log(`\nTo seed your database:`);
  console.log(`   psql $DATABASE_URL -f output/seed-crawled.sql`);
  console.log(`   -- or paste into Supabase SQL Editor\n`);

  // Print stats
  const byFaction = {};
  for (const s of sheets) {
    byFaction[s.faction] = (byFaction[s.faction] || 0) + 1;
  }
  console.log('Characters by faction:');
  for (const [f, n] of Object.entries(byFaction)) {
    console.log(`  ${f.padEnd(12)} ${n}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
