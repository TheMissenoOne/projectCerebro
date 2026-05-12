/**
 * crawl.js — Marvel Fandom Wiki crawler for Earth-616 characters
 *
 * Fetches power grid, stats, powers, abilities, and paraphernalia
 * from https://marvel.fandom.com/wiki/<CharacterName>
 *
 * Output: raw-data/<name>.json  (one file per character)
 *
 * Run: node crawl.js [--char "Wolverine"] [--limit 10] [--delay 1200]
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR   = join(__dirname, 'raw-data');
mkdirSync(OUT_DIR, { recursive: true });

// ──────────────────────────────────────────────────────────
// Character list — English wiki names (Earth-616 versions)
// Mapped from your seed's PT-BR names
// ──────────────────────────────────────────────────────────
const CHARACTERS = [
  // X-Men core
  { name: 'Professor X',     wiki: 'Professor_X',          faction: 'x-men',       danger: 'extremo' },
  { name: 'Cyclops',         wiki: 'Cyclops_(Scott_Summers)', faction: 'x-men',    danger: 'alto'    },
  { name: 'Wolverine',       wiki: 'Wolverine',             faction: 'x-men',       danger: 'alto'    },
  { name: 'Storm',           wiki: 'Storm_(Ororo_Munroe)',  faction: 'x-men',       danger: 'alto'    },
  { name: 'Jean Grey',       wiki: 'Jean_Grey',             faction: 'x-men',       danger: 'extremo' },
  { name: 'Beast',           wiki: 'Beast_(Henry_McCoy)',   faction: 'x-men',       danger: 'alto'    },
  { name: 'Iceman',          wiki: 'Iceman_(Robert_Drake)', faction: 'x-men',       danger: 'alto'    },
  { name: 'Angel',           wiki: 'Angel_(Warren_Worthington_III)', faction: 'x-men', danger: 'medio' },
  { name: 'Colossus',        wiki: 'Colossus_(Piotr_Rasputin)', faction: 'x-men',  danger: 'alto'    },
  { name: 'Nightcrawler',    wiki: 'Nightcrawler_(Kurt_Wagner)', faction: 'x-men', danger: 'medio'   },
  { name: 'Rogue',           wiki: 'Rogue_(Anna_Marie)',    faction: 'x-men',       danger: 'alto'    },
  { name: 'Gambit',          wiki: 'Gambit_(Remy_LeBeau)',  faction: 'x-men',       danger: 'medio'   },
  { name: 'Psylocke',        wiki: 'Psylocke',              faction: 'x-men',       danger: 'alto'    },
  { name: 'Havok',           wiki: 'Havok_(Alex_Summers)',  faction: 'x-men',       danger: 'alto'    },
  { name: 'Polaris',         wiki: 'Polaris_(Lorna_Dane)',  faction: 'x-men',       danger: 'alto'    },
  { name: 'Banshee',         wiki: 'Banshee_(Sean_Cassidy)', faction: 'x-men',     danger: 'medio'   },
  { name: 'Sunfire',         wiki: 'Sunfire_(Shiro_Yoshida)', faction: 'x-men',    danger: 'alto'    },
  { name: 'Thunderbird',     wiki: 'Thunderbird_(James_Proudstar)', faction: 'x-men', danger: 'medio' },
  { name: 'Forge',           wiki: 'Forge_(comics)',        faction: 'x-men',       danger: 'medio'   },
  { name: 'Longshot',        wiki: 'Longshot',              faction: 'x-men',       danger: 'medio'   },
  { name: 'Dazzler',         wiki: 'Dazzler_(Alison_Blaire)', faction: 'x-men',   danger: 'medio'   },
  { name: 'Jubilee',         wiki: 'Jubilee_(Jubilation_Lee)', faction: 'novatos', danger: 'baixo'   },
  { name: 'Husk',            wiki: 'Husk_(Paige_Guthrie)', faction: 'novatos',     danger: 'medio'   },
  { name: 'M',               wiki: 'M_(Monet_St._Croix)',  faction: 'novatos',     danger: 'alto'    },
  { name: 'Cannonball',      wiki: 'Cannonball_(Samuel_Guthrie)', faction: 'novatos', danger: 'medio' },
  { name: 'Sunspot',         wiki: 'Sunspot_(Roberto_da_Costa)', faction: 'novatos', danger: 'medio' },
  { name: 'Wolfsbane',       wiki: 'Wolfsbane_(Rahne_Sinclair)', faction: 'novatos', danger: 'medio' },
  { name: 'Mirage',          wiki: 'Mirage_(Danielle_Moonstar)', faction: 'novatos', danger: 'medio' },
  { name: 'Warlock',         wiki: 'Warlock_(New_Mutants)',  faction: 'novatos',   danger: 'medio'   },
  { name: 'Chamber',         wiki: 'Chamber_(Jonothon_Starsmore)', faction: 'novatos', danger: 'medio' },
  { name: 'Skin',            wiki: 'Skin_(comics)',          faction: 'novatos',   danger: 'baixo'   },
  { name: 'Synch',           wiki: 'Synch_(comics)',         faction: 'novatos',   danger: 'medio'   },
  { name: 'Cable',           wiki: 'Cable_(Nathan_Summers)', faction: 'geracaox',  danger: 'extremo' },
  { name: 'X-23',            wiki: 'X-23',                  faction: 'geracaox',   danger: 'alto'    },
  { name: 'Domino',          wiki: 'Domino_(Neena_Thurman)', faction: 'geracaox',  danger: 'medio'   },
  { name: 'Deadpool',        wiki: 'Deadpool_(Wade_Wilson)', faction: 'geracaox',  danger: 'alto'    },
  { name: 'Warpath',         wiki: 'Warpath_(James_Proudstar)', faction: 'geracaox', danger: 'alto'  },
  { name: 'Archangel',       wiki: 'Angel_(Warren_Worthington_III)', faction: 'geracaox', danger: 'alto' },
  { name: 'Wolverine (X-Force)', wiki: 'Wolverine', faction: 'geracaox',           danger: 'alto'    },
  // Morlocks
  { name: 'Callisto',        wiki: 'Callisto_(comics)',      faction: 'morlock',    danger: 'medio'   },
  { name: 'Caliban',         wiki: 'Caliban_(comics)',       faction: 'morlock',    danger: 'medio'   },
  { name: 'Marrow',          wiki: 'Marrow_(comics)',        faction: 'morlock',    danger: 'medio'   },
  { name: 'Masque',          wiki: 'Masque_(comics)',        faction: 'morlock',    danger: 'medio'   },
  { name: 'Leech',           wiki: 'Leech_(comics)',         faction: 'morlock',    danger: 'baixo'   },
  { name: 'Artie',           wiki: 'Artie_Maddicks',        faction: 'morlock',    danger: 'baixo'   },
  // Brotherhood / Villains
  { name: 'Magneto',         wiki: 'Magneto_(Max_Eisenhardt)', faction: 'irmandade', danger: 'extremo' },
  { name: 'Mystique',        wiki: 'Mystique_(Raven_Darkhölme)', faction: 'irmandade', danger: 'alto' },
  { name: 'Sabretooth',      wiki: 'Sabretooth_(Victor_Creed)', faction: 'irmandade', danger: 'alto'  },
  { name: 'Juggernaut',      wiki: 'Juggernaut_(Cain_Marko)', faction: 'vilao',    danger: 'extremo' },
  { name: 'Apocalypse',      wiki: 'Apocalypse_(En_Sabah_Nur)', faction: 'vilao', danger: 'extremo'  },
  { name: 'Mister Sinister', wiki: 'Mister_Sinister',       faction: 'vilao',      danger: 'extremo' },
  { name: 'Onslaught',       wiki: 'Onslaught_(comics)',     faction: 'vilao',      danger: 'extremo' },
  { name: 'Bastion',         wiki: 'Bastion_(comics)',       faction: 'vilao',      danger: 'extremo' },
  { name: 'Stryfe',          wiki: 'Stryfe',                 faction: 'vilao',      danger: 'extremo' },
  { name: 'Omega Red',       wiki: 'Omega_Red',              faction: 'vilao',      danger: 'alto'    },
  { name: 'Lady Deathstrike', wiki: 'Lady_Deathstrike',     faction: 'vilao',      danger: 'alto'    },
  { name: 'Spiral',          wiki: 'Spiral_(Marvel_Comics)', faction: 'vilao',     danger: 'alto'    },
  { name: 'Pyro',            wiki: 'Pyro_(St._John_Allerdyce)', faction: 'irmandade', danger: 'medio' },
  { name: 'Avalanche',       wiki: 'Avalanche_(comics)',     faction: 'irmandade',  danger: 'medio'   },
  { name: 'Blob',            wiki: 'Blob_(Fred_Dukes)',      faction: 'irmandade',  danger: 'medio'   },
  { name: 'Toad',            wiki: 'Toad_(Marvel_Comics)',   faction: 'irmandade',  danger: 'baixo'   },
  { name: 'Quicksilver',     wiki: 'Quicksilver_(Pietro_Maximoff)', faction: 'irmandade', danger: 'alto' },
  { name: 'Scarlet Witch',   wiki: 'Scarlet_Witch_(Wanda_Maximoff)', faction: 'neutro', danger: 'extremo' },
  { name: 'Emma Frost',      wiki: 'Emma_Frost',             faction: 'x-men',      danger: 'alto'    },
  { name: 'Bishop',          wiki: 'Bishop_(Lucas_Bishop)',  faction: 'x-men',      danger: 'alto'    },
  { name: 'Cecilia Reyes',   wiki: 'Cecilia_Reyes',         faction: 'x-men',      danger: 'medio'   },
  { name: 'Maggott',         wiki: 'Maggott',                faction: 'x-men',      danger: 'medio'   },
  { name: 'Thunderbird II',  wiki: 'Thunderbird_(Neal_Shaara)', faction: 'x-men',   danger: 'medio'   },
  { name: 'Sage',            wiki: 'Sage_(comics)',          faction: 'x-men',      danger: 'medio'   },
  { name: 'Mimic',           wiki: 'Mimic_(Calvin_Rankin)',  faction: 'neutro',     danger: 'medio'   },
  { name: 'Daken',           wiki: 'Daken',                  faction: 'vilao',      danger: 'alto'    },
  { name: 'Elixir',         wiki: 'Elixir_(comics)',         faction: 'novatos',    danger: 'alto'    },
  { name: 'Hellion',         wiki: 'Hellion_(Julian_Keller)', faction: 'novatos',  danger: 'medio'   },
  { name: 'Mercury',         wiki: 'Mercury_(Cessily_Kincaid)', faction: 'novatos', danger: 'medio'  },
  { name: 'Surge',           wiki: 'Surge_(Noriko_Ashida)', faction: 'novatos',     danger: 'medio'   },
  { name: 'Prodigy',         wiki: 'Prodigy_(David_Alleyne)', faction: 'novatos',  danger: 'medio'   },
  // Sentinels / Human foes
  { name: 'Bastion',         wiki: 'Bastion_(comics)',       faction: 'vilao',      danger: 'extremo' },
  { name: 'Bolivar Trask',   wiki: 'Bolivar_Trask',         faction: 'humano',     danger: 'medio'   },
  { name: 'William Stryker', wiki: 'William_Stryker',       faction: 'humano',     danger: 'medio'   },
  { name: 'Henry Peter Gyrich', wiki: 'Henry_Peter_Gyrich', faction: 'humano',    danger: 'baixo'   },
  // Allies / Neutral
  { name: 'Lilandra',        wiki: 'Lilandra_Neramani',     faction: 'neutro',     danger: 'medio'   },
  { name: 'Moira MacTaggert', wiki: 'Moira_MacTaggert',    faction: 'humano',     danger: 'baixo'   },
  { name: 'Nick Fury',       wiki: 'Nick_Fury',             faction: 'humano',     danger: 'medio'   },
  { name: 'Madelyne Pryor',  wiki: 'Madelyne_Pryor',       faction: 'vilao',      danger: 'alto'    },
  { name: 'Rachel Summers',  wiki: 'Rachel_Summers',        faction: 'x-men',      danger: 'extremo' },
  { name: 'Longshot',        wiki: 'Longshot',              faction: 'x-men',      danger: 'medio'   },
  { name: 'Strong Guy',      wiki: 'Strong_Guy',            faction: 'geracaox',   danger: 'alto'    },
  { name: 'Multiple Man',    wiki: 'Multiple_Man',          faction: 'geracaox',   danger: 'medio'   },
  { name: 'Siryn',           wiki: 'Siryn_(comics)',        faction: 'geracaox',   danger: 'medio'   },
  { name: 'Random',          wiki: 'Random_(comics)',       faction: 'neutro',     danger: 'baixo'   },
];

// ──────────────────────────────────────────────────────────
// Power grid → MEGS stat mapping
//
// Marvel wiki uses 1–7 scale across 7 categories.
// MEGS uses attribute scale where ~6 is peak human, ~12 is major hero.
//
// Conversion table (wiki → MEGS):
//   wiki 1 → MEGS 2  (well below peak, impaired)
//   wiki 2 → MEGS 4  (below peak human)
//   wiki 3 → MEGS 6  (peak human)
//   wiki 4 → MEGS 8  (enhanced, low superhuman)
//   wiki 5 → MEGS 10 (solid superhuman)
//   wiki 6 → MEGS 13 (high superhuman)
//   wiki 7 → MEGS 17 (cosmic/absolute)
//
// The 9 MEGS stats map from the wiki's 7:
//   Strength      → força, corpo    (BOD gets +1 from durability/stamina)
//   Agility       → destreza
//   Durability    → corpo           (averaged with strength for corpo)
//   Intelligence  → inteligência, vontade (VOL gets -1 from pure INT)
//   Speed         → destreza modifier (high speed bumps DEX)
//   Fighting      → destreza modifier
//   Energy        → influência, aura (split)
// ──────────────────────────────────────────────────────────
const WIKI_TO_MEGS = [0, 2, 4, 6, 8, 10, 13, 17];

function wikiToMegs(wikiVal) {
  const v = parseInt(wikiVal) || 1;
  return WIKI_TO_MEGS[Math.min(Math.max(v, 1), 7)];
}

function deriveStats(grid) {
  const s = grid.strength   || 2;
  const a = grid.agility    || 2;
  const d = grid.durability || 2;
  const i = grid.intelligence || 2;
  const e = grid.energy     || 1;
  const spd = grid.speed    || 2;
  const f = grid.fighting   || 2;

  // Destreza: best of agility or fighting, boosted by speed tier
  const dexBase = Math.max(a, f);
  const dexBoost = spd >= 5 ? 1 : 0;
  const destreza = wikiToMegs(dexBase) + dexBoost;

  // Força: direct from strength
  const forca = wikiToMegs(s);

  // Corpo: average of strength + durability (rounded up), +1 for high durability
  const corpWiki = Math.ceil((s + d) / 2);
  const corpo = wikiToMegs(corpWiki) + (d >= 6 ? 1 : 0);

  // Inteligência: direct
  const inteligencia = wikiToMegs(i);

  // Vontade: intelligence - 1 tier (mental endurance ≠ raw IQ, min 2)
  const vontade = Math.max(wikiToMegs(Math.max(i - 1, 1)), 4);

  // Mente: average of intelligence and fighting for combat awareness
  const mente = wikiToMegs(Math.round((i + f) / 2));

  // Influência: for mutants with energy projection, use energy as influência proxy
  // otherwise set to 5 (baseline human social)
  const influencia = e >= 3 ? wikiToMegs(e - 1) : 5;

  // Aura: energy projection quality / presence
  const aura = e >= 2 ? wikiToMegs(e) : 4;

  // Espírito: derived from durability + fighting spirit (fighting used as proxy)
  const espirito = wikiToMegs(Math.round((d + f) / 2));

  // Iniciativa: speed-based
  const initMap = [0, 3, 5, 7, 9, 11, 13, 15];
  const iniciativa = initMap[Math.min(Math.max(spd, 1), 7)];

  return {
    iniciativa,
    stats: {
      destreza,
      força: forca,
      corpo,
      inteligência: inteligencia,
      vontade,
      mente,
      influência: influencia,
      aura,
      espírito: espirito
    }
  };
}

// ──────────────────────────────────────────────────────────
// Fetch a wiki page via the MediaWiki API (returns raw wikitext)
// ──────────────────────────────────────────────────────────
async function fetchWikiPage(wikiName) {
  const url = `https://marvel.fandom.com/api.php?` +
    `action=query&titles=${encodeURIComponent(wikiName)}&` +
    `prop=revisions&rvprop=content&format=json&rvslots=main`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'CerebroBot/1.0 (X-Men TTRPG seed builder; educational)',
      'Accept': 'application/json'
    }
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} for ${wikiName}`);
  const json = await res.json();
  const pages = json.query?.pages || {};
  const page  = Object.values(pages)[0];
  if (!page || page.missing !== undefined) return null;
  return page.revisions?.[0]?.slots?.main?.['*'] ?? null;
}

// ──────────────────────────────────────────────────────────
// Parse wikitext: extract power grid, powers section, abilities
// ──────────────────────────────────────────────────────────
function extractPowerGrid(wikitext) {
  const grid = {};

  // Power grid infobox uses: | PowerGridLink# = and | PowerGridNum# =
  // OR the simpler  | strength = N  pattern inside {{Marvel Database/Character}}
  const patterns = [
    { key: 'intelligence', re: /\|\s*Intelligence\s*=\s*(\d)/i },
    { key: 'strength',     re: /\|\s*Strength\s*=\s*(\d)/i     },
    { key: 'speed',        re: /\|\s*Speed\s*=\s*(\d)/i         },
    { key: 'durability',   re: /\|\s*Durability\s*=\s*(\d)/i   },
    { key: 'energy',       re: /\|\s*EnergyProjection\s*=\s*(\d)/i },
    { key: 'fighting',     re: /\|\s*Fighting\s*=\s*(\d)/i     },
    { key: 'agility',      re: /\|\s*Agility\s*=\s*(\d)/i      },
  ];

  for (const { key, re } of patterns) {
    const m = wikitext.match(re);
    if (m) grid[key] = parseInt(m[1]);
  }

  return grid;
}

function extractSection(wikitext, sectionName) {
  // Match == SectionName == or === SectionName ===
  const re = new RegExp(
    `={2,3}\\s*${sectionName}\\s*={2,3}([\\s\\S]*?)(?:={2,3}[^=]|$)`,
    'i'
  );
  const m = wikitext.match(re);
  return m ? m[1].trim() : '';
}

function cleanWikiText(raw) {
  return raw
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')  // [[Link|Text]] → Text
    .replace(/\[\[([^\]]+)\]\]/g, '$1')              // [[Link]] → Link
    .replace(/{{[^}]+}}/g, '')                        // Remove templates
    .replace(/'{2,3}/g, '')                            // Remove bold/italic
    .replace(/<!--[\s\S]*?-->/g, '')                   // Remove comments
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')        // Remove refs
    .replace(/<[^>]+>/g, '')                           // Strip HTML
    .replace(/\n{3,}/g, '\n\n')                        // Normalise newlines
    .trim();
}

function extractListItems(section) {
  // Extract * bullet items, clean them up
  const items = [];
  const lines = section.split('\n');
  for (const line of lines) {
    const trimmed = line.replace(/^[*#:]+\s*/, '').trim();
    if (trimmed.length > 4 && trimmed.length < 200) {
      items.push(cleanWikiText(trimmed));
    }
  }
  return items.filter(Boolean);
}

function extractRealName(wikitext) {
  const m = wikitext.match(/\|\s*RealName\s*=\s*([^\n|]+)/i);
  return m ? cleanWikiText(m[1]).trim() : '';
}

function extractAlias(wikitext) {
  const m = wikitext.match(/\|\s*CurrentAlias\s*=\s*([^\n|]+)/i);
  return m ? cleanWikiText(m[1]).trim() : '';
}

// ──────────────────────────────────────────────────────────
// Main crawl function for a single character
// ──────────────────────────────────────────────────────────
async function crawlCharacter(charDef) {
  const { name, wiki, faction, danger } = charDef;

  console.log(`[crawl] ${name} → ${wiki}`);

  let wikitext;
  try {
    wikitext = await fetchWikiPage(wiki);
  } catch (err) {
    console.warn(`  ✗ fetch failed: ${err.message}`);
    return null;
  }

  if (!wikitext) {
    console.warn(`  ✗ page not found`);
    return null;
  }

  const grid = extractPowerGrid(wikitext);
  const hasGrid = Object.keys(grid).length >= 3;

  if (!hasGrid) {
    console.warn(`  ⚠ power grid incomplete (${Object.keys(grid).join(', ')})`);
  }

  const stats = hasGrid ? deriveStats(grid) : null;

  // Extract text sections
  const powersSection     = extractSection(wikitext, 'Powers');
  const abilitiesSection  = extractSection(wikitext, 'Abilities');
  const paraphSection     = extractSection(wikitext, 'Paraphernalia');
  const equipSection      = extractSection(wikitext, 'Equipment');
  const weaponsSection    = extractSection(wikitext, 'Weapons');
  const strengthsSection  = extractSection(wikitext, 'Strength level');
  const weaknessSection   = extractSection(wikitext, 'Weaknesses');

  // Raw bullet item lists
  const powers     = extractListItems(powersSection);
  const abilities  = extractListItems(abilitiesSection);
  const equipment  = [
    ...extractListItems(paraphSection),
    ...extractListItems(equipSection),
    ...extractListItems(weaponsSection),
  ];
  const weaknesses = extractListItems(weaknessSection);

  // Also grab the first 3 paragraphs of the intro for description
  const intro = cleanWikiText(
    wikitext.split(/={2,}/)[0] || ''
  ).split('\n\n').slice(0, 3).join('\n\n').substring(0, 800);

  const realName = extractRealName(wikitext);
  const alias    = extractAlias(wikitext);

  const rawData = {
    name,
    wiki,
    faction,
    danger,
    realName,
    alias,
    powerGrid: grid,
    stats,         // will be null if grid was incomplete
    rawPowers:    powers.slice(0, 20),
    rawAbilities: abilities.slice(0, 10),
    rawEquipment: equipment.slice(0, 8),
    rawWeaknesses: weaknesses.slice(0, 5),
    intro: intro.substring(0, 600),
  };

  const outPath = join(OUT_DIR, `${wiki.replace(/[^a-zA-Z0-9_-]/g, '_')}.json`);
  writeFileSync(outPath, JSON.stringify(rawData, null, 2), 'utf-8');
  console.log(`  ✓ saved (grid: ${JSON.stringify(grid)}, powers: ${powers.length})`);

  return rawData;
}

// ──────────────────────────────────────────────────────────
// CLI runner
// ──────────────────────────────────────────────────────────
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const args = process.argv.slice(2);
  const charFlag  = args.findIndex(a => a === '--char');
  const limitFlag = args.findIndex(a => a === '--limit');
  const delayFlag = args.findIndex(a => a === '--delay');

  const singleChar = charFlag >= 0 ? args[charFlag + 1] : null;
  const limit      = limitFlag >= 0 ? parseInt(args[limitFlag + 1]) : CHARACTERS.length;
  const delay      = delayFlag >= 0 ? parseInt(args[delayFlag + 1]) : 1200; // ms between requests

  let targets = singleChar
    ? CHARACTERS.filter(c => c.name.toLowerCase().includes(singleChar.toLowerCase()))
    : CHARACTERS.slice(0, limit);

  // Deduplicate by wiki name (some entries share a wiki page)
  const seen = new Set();
  targets = targets.filter(c => {
    if (seen.has(c.wiki)) return false;
    seen.add(c.wiki);
    return true;
  });

  console.log(`\n🕷  Crawling ${targets.length} characters (delay: ${delay}ms)\n`);

  const results = [];
  for (let i = 0; i < targets.length; i++) {
    const char = targets[i];

    // Skip if already cached
    const outPath = join(OUT_DIR, `${char.wiki.replace(/[^a-zA-Z0-9_-]/g, '_')}.json`);
    if (existsSync(outPath)) {
      console.log(`[skip] ${char.name} (cached)`);
      results.push(JSON.parse(readFileSync(outPath, 'utf-8')));
      continue;
    }

    const result = await crawlCharacter(char);
    if (result) results.push(result);

    if (i < targets.length - 1) await sleep(delay);
  }

  console.log(`\n✅ Done. ${results.length} characters saved to raw-data/\n`);
  console.log('Next step: node process.js');
}

main().catch(console.error);
