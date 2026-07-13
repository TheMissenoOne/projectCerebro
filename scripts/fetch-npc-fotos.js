/* ═══════════════════════════════════════════════════════════════
   fetch-npc-fotos.js
   Busca imagens de perfil dos NPCs na Marvel Fandom Wiki (API MediaWiki)
   e gera script SQL UPDATE para popular foto_url.

   Uso:  node scripts/fetch-npc-fotos.js
   Saída: supabase/migrations/006_npc_fotos_populate.sql
   ═══════════════════════════════════════════════════════════════ */
const https = require('https');
const fs = require('fs');

const API = 'https://marvel.fandom.com/api.php';
const OUT = __dirname+'/../supabase/migrations/006_npc_fotos_populate.sql';

/* ═══ Mapa: nome no banco → título para buscar na wiki ═══ */
// Usar codinomes em inglês (o que a Marvel wiki reconhece).
// Nomes portugueses mapeados para o equivalente inglês.
const NPC_MAP = [
  /* ── X-Men ── */
  ['Professor X',          'Professor X'],
  ['Jean Grey',            'Jean Grey'],
  ['Emma Frost',           'Emma Frost'],
  ['Rachel Summers',       'Rachel Summers'],
  ['Cable',                'Cable'],
  ['Ciclope',              'Cyclops'],
  ['Wolverine',            'Wolverine'],
  ['Tempestade',           'Storm'],
  ['Fera',                 'Beast'],
  ['Ícone',                'Colossus'],           // Ícone = codinome br do Colossus
  ['Anjo',                 'Angel'],
  ['Colossus',             'Colossus'],
  ['Noturno',              'Nightcrawler'],
  ['Kitty Pryde',          'Shadowcat'],
  ['Rogue',                'Rogue'],
  ['Gambit',               'Gambit'],
  ['Psylocke',             'Psylocke'],
  ['Bishop',               'Bishop'],
  ['Jubileu',              'Jubilee'],
  ['Polaris',              'Polaris'],
  ['Havok',                'Havok'],
  ['X-23',                 'X-23'],
  ['Forge',                'Forge'],
  ['Dazzler',              'Dazzler'],
  ['Banshee',              'Banshee'],
  ['Cecilia Reyes',        'Cecilia Reyes'],
  ['Lockheed',             'Lockheed'],
  ['Sage',                 'Sage'],
  ['Omerta',               'Omerta'],
  ['Wraith (Hector Rendoza)', 'Wraith'],
  ['Stacy X',              'Stacy X'],
  ['Lifeguard',            'Lifeguard'],
  ['Slipstream',           'Slipstream'],
  ['Red Lotus',            'Red Lotus'],

  /* ── X-Force / X-Factor ── */
  ['Domino',               'Domino'],
  ['Shatterstar',          'Shatterstar'],
  ['Rictor',               'Rictor'],
  ['Siryn',                'Siryn'],
  ['Madrox',               'Madrox'],
  ['Strong Guy',           'Strong Guy'],
  ['Scanner',              'Scanner'],

  /* ── Novos Mutantes ── */
  ['Cannonball',           'Cannonball'],
  ['Sunspot',              'Sunspot'],
  ['Mirage',               'Mirage'],
  ['Wolfsbane',            'Wolfsbane'],
  ['Karma',                'Karma'],
  ['Magma',                'Magma'],
  ['Cypher',               'Cypher'],
  ['Boomer',               'Boomer'],

  /* ── Generation X ── */
  ['Chamber',              'Chamber'],
  ['Husk',                 'Husk'],
  ['M (Monet St. Croix)',  'M'],
  ['Armor',                'Armor'],
  ['Synch',                'Synch'],
  ['Skin',                 'Skin'],
  ['Penance',              'Penance'],
  ['Gaia',                 'Gaia'],
  ['Blink',                'Blink'],
  ['Maggott',              'Maggott'],
  ['Marrow',               'Marrow'],
  ['Mister M',             'Mister M'],
  ['Nekra',                'Nekra'],
  ['Darkstar',             'Darkstar'],

  /* ── Novos X-Men (Academia) ── */
  ['Surge',                'Surge'],
  ['Elixir',               'Elixir'],
  ['Hellion',              'Hellion'],
  ['Rockslide',            'Rockslide'],
  ['Prodigy',              'Prodigy'],
  ['Wallflower',           'Wallflower'],
  ['Timeslip',             'Timeslip'],
  ['Impulse',              'Impulse'],
  ['Mercury',              'Mercury'],
  ['Dust',                 'Dust'],
  ['Wither',               'Wither'],
  ['Match',                'Match'],
  ['Icarus',               'Icarus'],
  ['Loa',                  'Loa'],
  ['Anole',                'Anole'],
  ['Gentle',               'Gentle'],
  ['Indra',                'Indra'],

  /* ── Morlocks ── */
  ['Callisto',             'Callisto'],
  ['Caliban',              'Caliban'],
  ['Masque',               'Masque'],
  ['Leech',                'Leech'],
  ['Sunder',               'Sunder'],
  ['Plague',               'Plague'],
  ['Skids',                'Skids'],
  ['Beautiful Dreamer',    'Beautiful Dreamer'],
  ['Erg',                  'Erg'],
  ['Bliss',                'Bliss'],
  ['Tarot',                'Tarot'],
  ['Catseye',              'Catseye'],
  ['Empath',               'Empath'],
  ['Scrambler',            'Scrambler'],

  /* ── Irmandade / Vilões ── */
  ['Magneto',              'Magneto'],
  ['Mystique',             'Mystique'],
  ['Blob',                 'Blob'],
  ['Toad',                 'Toad'],
  ['Pyro',                 'Pyro'],
  ['Avalanche',            'Avalanche'],
  ['Unus',                 'Unus'],
  ['Lorelei',              'Lorelei'],
  ['Adepto (Magneto)',     'Adept'],
  ['Sabretooth',           'Sabretooth'],
  ['Lady Deathstrike',     'Lady Deathstrike'],
  ['Mister Sinister',      'Mister Sinister'],
  ['Apocalipse',           'Apocalypse'],
  ['Sentinela Mk I',       'Sentinel'],
  ['Sentinela Mark I',     'Sentinel'],
  ['Wild Child',           'Wild Child'],
  ['Aurora',               'Aurora'],
  ['Persuasion',           'Persuasion'],
  ['Frenzy',               'Frenzy'],
  ['Tower',                'Tower'],
  ['Stinger',              'Stinger'],
  ['Cargill',              'Cargill'],
  ['Bolt',                 'Bolt'],
  ['Fixer',                'Fixer'],
  ['Cameron Hodge',        'Cameron Hodge'],
  ['Donald Pierce',        'Donald Pierce'],
  ['Lady Mastermind',      'Lady Mastermind'],
  ['Mesmero',              'Mesmero'],
  ['Vanisher',             'Vanisher'],
  ['Sauron',               'Sauron'],
  ['Vertigo',              'Vertigo'],
  ['Scalphunter',          'Scalphunter'],
  ['Arclight',             'Arclight'],
  ['Blockbuster',          'Blockbuster'],
  ['Prism',                'Prism'],
  ['Riptide',              'Riptide'],
  ['Harpoon',              'Harpoon'],

  /* ── Marauders ── */
  ['Marauder (Blockbuster)','Blockbuster'],
  ['Marauder (Arclight)',  'Arclight'],
  ['Marauder (Prism)',     'Prism'],
  ['Marauder (Riptide)',   'Riptide'],
  ['Marauder (Harpoon)',   'Harpoon'],
  ['Marauder (Scalphunter)','Scalphunter'],
  ['Marauder (Sabretooth)','Sabretooth'],
  ['Marauder (Vertigo)',   'Vertigo'],

  /* ── Humanos / Anti-mutantes ── */
  ['Purificador',          'Purifiers'],
  ['Agente HYDRA',         'Hydra'],
  ['Mercenário Weapon X',  'Weapon X'],
  ['Agent Zero',           'Agent Zero'],
  ['Silver Fox',           'Silver Fox'],
  ['Kestrel',              'Kestrel'],
  ['Graydon Creed (FOH)',  'Graydon Creed'],
  ['Graydon Creed',        'Graydon Creed'],
  ['Larry Trask',          'Larry Trask'],
  ['Steven Lang',          'Steven Lang'],
  ['Reverend William Stryker', 'William Stryker'],
  ['Moira MacTaggert',     'Moira MacTaggert'],
  ['Agente S.H.I.E.L.D.',  'S.H.I.E.L.D.'],
  ['Val Cooper',           'Val Cooper'],
  ['Henry Gyrich',         'Henry Gyrich'],
  ['Bolivar Trask',        'Bolivar Trask'],

  /* ── Weapon X / Projeto ── */
  ['Diamond Lil',          'Diamond Lil'],
  ['Madison Jeffries',     'Madison Jeffries'],

  /* ── Hellfire Club ── */
  ['Shinobi Shaw',         'Shinobi Shaw'],
  ['Trevor Fitzroy',       'Trevor Fitzroy'],
  ['Bevatron',             'Bevatron'],
  ['Jetstream',            'Jetstream'],
  ['Beef',                 'Beef'],
  ['Roulette',             'Roulette'],
  ['Timeshadow',           'Timeshadow'],

  /* ── Alliance of Evil ── */
  ['Magma (Alliance of Evil)', 'Magma'],

  /* ── Adicionais ── */
  ['Fatale',               'Fatale'],
  ['Random',               'Random'],
  ['Siena Blaze',          'Siena Blaze'],
  ['Mammomax',             'Mammomax'],
  ['Locus',                'Locus'],
  ['Spyke',                'Spyke'],
];

/* ═══ Helpers ═══ */
function fetchJSON(url) {
  return new Promise((res, rej) => {
    https.get(url, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => {
        try { res(JSON.parse(d)); } catch (e) { rej(e); }
      });
    }).on('error', rej);
  });
}

function escSQL(s) { return s.replace(/'/g, "''"); }

async function getImageUrl(pageTitle) {
  const url = `${API}?action=query&prop=pageimages&titles=${encodeURIComponent(pageTitle)}&format=json&pithumbsize=300`;
  try {
    const data = await fetchJSON(url);
    const pages = data.query && data.query.pages;
    if (!pages) return null;
    for (const id in pages) {
      if (id === '-1') continue;
      const p = pages[id];
      if (p.thumbnail && p.thumbnail.source) {
        // Rewrite to bigger size
        let src = p.thumbnail.source;
        src = src.replace(/scale-to-width-down\/\d+/, 'scale-to-width-down/600');
        return src;
      }
    }
  } catch (e) {}
  return null;
}

/* ═══ Main ═══ */
(async () => {
  const updates = [];

  for (let i = 0; i < NPC_MAP.length; i++) {
    const [nome, busca] = NPC_MAP[i];
    process.stdout.write(`[${i+1}/${NPC_MAP.length}] ${nome} → ${busca}... `);
    const url = await getImageUrl(busca);
    if (url) {
      updates.push(`UPDATE npcs SET foto_url = '${escSQL(url)}' WHERE name ILIKE '${escSQL(nome)}';`);
      console.log('OK');
    } else {
      console.log('NOT FOUND');
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 400));
  }

  const lines = [
    '-- ═══════════════════════════════════════════════════════════════',
    '-- Migração 006 — Popula foto_url para todos os NPCs',
    '-- Gerado por scripts/fetch-npc-fotos.js',
    '-- ═══════════════════════════════════════════════════════════════',
    '',
    ...updates,
    '',
    '-- ═══ Fim ═══',
  ];

  fs.writeFileSync(OUT, lines.join('\n') + '\n');
  console.log(`\n✓ Salvo: ${OUT} (${updates.length} NPCs com foto)`);
})();
