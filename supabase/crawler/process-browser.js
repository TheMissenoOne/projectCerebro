/**
 * process-browser.js — Process browser-crawled JSON
 * 
 * Usage:
 *   node process-browser.js <input.json> [--no-llm]
 * 
 * Input: JSON from browser crawler (cerebroCrawl.downloadAll())
 * Output: seed-crawled.sql + sheets.json in output/
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, 'output');
mkdirSync(OUT_DIR, { recursive: true });

const POWER_GRID_MAP = {
  intelligence: 'inteligência',
  strength: 'força',
  durability: 'corpo',
  speed: 'destreza',
  energy: 'influência',
  fighting: 'espírito',
  agility: 'destreza'
};

function wikiToMegs(wikiValue) {
  const map = { 1: 2, 2: 4, 3: 6, 4: 8, 5: 10, 6: 13, 7: 17 };
  return map[wikiValue] || 0;
}

function inferGrade(text) {
  const t = text.toLowerCase();
  if (t.includes('omega') || t.includes('cosmic')) return 6;
  if (t.includes('high') || t.includes('master')) return 5;
  if (t.includes('super') || t.includes('expert')) return 4;
  if (t.includes('enhanced') || t.includes('skilled')) return 3;
  if (t.includes('average') || t.includes('moderate')) return 2;
  return 1;
}

function quickTranslate(text) {
  const translations = {
    'healing factor': 'Fator de Cura',
    'adamantium': 'Adamantium',
    'claws': 'Garras',
    'senses': 'Sentidos Aprimorados',
    'regeneration': 'Regeneração',
    'flight': 'Voo',
    'telepathy': 'Telepatia',
    'telekinesis': 'Telecinese',
    'energy projection': 'Projeção de Energia',
    'super strength': 'Super-Força',
    'durability': 'Durabilidade',
    'speed': 'Velocidade',
    'agility': 'Agilidade',
    'fighting': 'Combate'
  };
  
  const lower = text.toLowerCase();
  for (const [eng, pt] of Object.entries(translations)) {
    if (lower.includes(eng)) return pt;
  }
  return text.split(' ').slice(0, 3).join(' ');
}

function processCharacter(raw) {
  const { name, faction, danger, powerGrid, rawPowers, realName, alias } = raw;
  
  const stats = {};
  const tags = [];
  
  // Convert power grid to stats
  for (const [wiki, value] of Object.entries(powerGrid || {})) {
    const megs = wikiToMegs(value);
    const statName = POWER_GRID_MAP[wiki] || wiki;
    if (!stats[statName] || megs > stats[statName]) {
      stats[statName] = megs;
    }
  }
  
  // Add stats as tags
  for (const [stat, value] of Object.entries(stats)) {
    if (value > 0) {
      tags.push({ texto: stat, grau: Math.ceil(value / 4) });
    }
  }
  
  // Convert powers to tags
  (rawPowers || []).slice(0, 8).forEach(p => {
    tags.push({
      texto: quickTranslate(p),
      grau: inferGrade(p)
    });
  });
  
  // Build data JSON
  const data = {
    iniciativa: 0,
    stats: stats,
    tags: tags,
    descricao: realName || alias 
      ? `${name} (${realName || alias}) - Faction: ${faction || 'unknown'}` 
      : `${name} - Faction: ${faction || 'unknown'}`,
    powerGrid: powerGrid
  };
  
  return {
    name: name,
    codename: realName || alias || name,
    faction: faction || 'unknown',
    danger: danger || 'medio',
    data: data
  };
}

async function main() {
  const args = process.argv.slice(2);
  const inputFile = args.find(a => !a.startsWith('--')) || 'cerebro_crawl.json';
  
  console.log(`📂 Reading: ${inputFile}`);
  
  if (!existsSync(inputFile)) {
    console.error(`❌ File not found: ${inputFile}`);
    process.exit(1);
  }
  
  const raw = JSON.parse(readFileSync(inputFile, 'utf-8'));
  const characters = Array.isArray(raw) ? raw : [raw];
  
  console.log(`📋 Processing ${characters.length} characters...`);
  
  const processed = characters.map(processCharacter);
  
  // Write SQL
  const lines = ['-- Browser-crawled NPCs', ''];
  processed.forEach(c => {
    const safeName = c.name.replace(/'/g, "''");
    const safeCode = c.codename.replace(/'/g, "''");
    const data = JSON.stringify(c.data).replace(/'/g, "''");
    
    lines.push(`-- ${c.name}`);
    lines.push(`INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (`);
    lines.push(`  gen_random_uuid(),`);
    lines.push(`  '${safeName}',`);
    lines.push(`  '${safeCode}',`);
    lines.push(`  '${c.faction}',`);
    lines.push(`  '${c.danger}',`);
    lines.push(`  '${data}'::jsonb,`);
    lines.push(`  true,`);
    lines.push(`  NOW()`);
    lines.push(`);`);
    lines.push('');
  });
  
  writeFileSync(join(OUT_DIR, 'seed-crawled.sql'), lines.join('\n'));
  console.log(`✅ Wrote: output/seed-crawled.sql`);
  
  // Write sheets.json
  const sheets = processed.map(c => ({
    nome: c.name,
    codename: c.codename,
    faction: c.faction,
    danger: c.danger,
    stats: c.data.stats,
    tags: c.data.tags
  }));
  
  writeFileSync(join(OUT_DIR, 'sheets.json'), JSON.stringify(sheets, null, 2));
  console.log(`✅ Wrote: output/sheets.json`);
  
  console.log(`\n🎉 Done! ${processed.length} NPCs processed`);
  console.log(`   Next: psql $DATABASE_URL -f output/seed-crawled.sql`);
}

main();