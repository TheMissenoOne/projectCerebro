const fs = require('fs');
const path = require('path');
const https = require('https');

const MARKDOWN_FILE = path.join(__dirname, '..', 'cerebro_rebalanceado.md');
const OUTPUT_FILE = path.join(__dirname, '..', 'supabase', 'seed.sql');
const DB_URL = process.env.SUPABASE_URL || '';
const DB_TOKEN = process.env.SUPABASE_SERVICE_KEY || '';

function parseNPCs(markdown) {
  const blocks = markdown.split(/^# NPC: /m).slice(1);
  
  return blocks.map(block => {
    const lines = block.trim().split('\n');
    const name = lines[0].trim();
    
    let codename = '';
    let faction = '';
    let danger = '';
    let iniciativa = 0;
    const stats = {};
    const tags = [];
    let descricao = '';
    
    let inTags = false;
    let inStats = false;
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('**Codinome:**')) {
        codename = line.replace('**Codinome:**', '').trim();
      } else if (line.startsWith('**Fração:**')) {
        faction = line.replace('**Fração:**', '').trim().toLowerCase().replace(' ', '_');
      } else if (line.startsWith('**Perigo:**')) {
        danger = line.replace('**Perigo:**', '').trim().toLowerCase();
      } else if (line.startsWith('| Iniciativa |')) {
        inStats = true;
      } else if (inStats && line.startsWith('|') && !line.includes('---')) {
        const parts = line.split('|').filter(p => p.trim());
        if (parts[0].trim() === 'Iniciativa') {
          iniciativa = parseInt(parts[1].trim()) || 0;
        } else if (parts.length >= 2) {
          const statName = parts[0].trim().toLowerCase();
          const statVal = parseInt(parts[1].trim()) || 0;
          if (statName && statVal) {
            stats[statName] = statVal;
          }
        }
      } else if (line.startsWith('## Tags')) {
        inTags = true;
        inStats = false;
      } else if (line.startsWith('## Descrição')) {
        inTags = false;
      } else if (inTags && line.startsWith('- ')) {
        const tagText = line.substring(2).trim();
        let grau = 0;
        let texto = tagText;
        
        const grauMatch = tagText.match(/(\d+)$/);
        if (grauMatch) {
          grau = parseInt(grauMatch[1]);
          texto = tagText.replace(/\s*-\s*\d+$/, '').replace(/\s*(\d+)$/, '').trim();
        }
        
        if (tagText.includes('—') || tagText.includes('-')) {
          const parts = tagText.split(/[—,-]/);
          texto = parts[0].trim();
        }
        
        tags.push({ texto, grau });
      } else if (!inTags && !inStats && line.startsWith('|') && !line.includes('---')) {
      } else if (line.length > 0 && !line.startsWith('#') && !line.startsWith('|') && !line.startsWith('**')) {
        descricao += line + '\n';
      }
    }
    
    return {
      name,
      codename,
      faction,
      danger,
      data: {
        iniciativa,
        stats,
        tags,
        descricao: descricao.trim()
      }
    };
  });
}

function generateSQL(npcs) {
  let sql = '-- Seed dos NPCs do Cérebro\n';
  sql += '-- Executar no SQL Editor do Supabase\n\n';
  
  npcs.forEach(npc => {
    const faction = npc.faction || 'neutro';
    const danger = npc.danger || 'medio';
    
    sql += `-- ${npc.name}\n`;
    sql += `INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at) VALUES (\n`;
    sql += `  gen_random_uuid(),\n`;
    sql += `  '${npc.name.replace(/'/g, "''")}',\n`;
    sql += `  '${npc.codename.replace(/'/g, "''")}',\n`;
    sql += `  '${faction}',\n`;
    sql += `  '${danger}',\n`;
    sql += `  '${JSON.stringify(npc.data).replace(/'/g, "''")}'::jsonb,\n`;
    sql += `  true,\n`;
    sql += `  NOW()\n`;
    sql += `);\n\n`;
  });
  
  return sql;
}

async function insertNPC(npc) {
  if (!DB_URL || !DB_TOKEN) {
    console.log('No DB_URL/TOKEN configured, skipping insert');
    return;
  }
  
  const body = JSON.stringify({
    name: npc.name,
    codename: npc.codename || '',
    faction: npc.faction || 'neutro',
    danger: npc.danger || 'medio',
    data: npc.data,
    is_global: true
  });
  
  return new Promise((resolve, reject) => {
    const url = new URL(`${DB_URL}/rest/v1/npcs`);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': DB_TOKEN,
        'Authorization': `Bearer ${DB_TOKEN}`,
        'Prefer': 'return=minimal'
      }
    };
    
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`Insert failed: ${res.statusCode} ${data}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Parsing NPCs from markdown...');
  
  const markdown = fs.readFileSync(MARKDOWN_FILE, 'utf-8');
  const npcs = parseNPCs(markdown);
  
  console.log(`Found ${npcs.length} NPCs`);
  
  if (process.argv.includes('--sql-only')) {
    const sql = generateSQL(npcs);
    fs.writeFileSync(OUTPUT_FILE, sql, 'utf-8');
    console.log(`Generated SQL saved to ${OUTPUT_FILE}`);
    return;
  }
  
  if (DB_URL && DB_TOKEN) {
    console.log('Inserting NPCs directly to database...');
    let count = 0;
    for (const npc of npcs) {
      try {
        await insertNPC(npc);
        count++;
        process.stdout.write(`\rInserted ${count}/${npcs.length} NPCs`);
      } catch (e) {
        console.error(`\nError inserting ${npc.name}: ${e.message}`);
      }
    }
    console.log(`\nDone! ${count} NPCs inserted.`);
  } else {
    console.log('Set SUPABASE_URL and SUPABASE_SERVICE_KEY to insert directly.');
    const sql = generateSQL(npcs);
    fs.writeFileSync(OUTPUT_FILE, sql, 'utf-8');
    console.log(`Generated SQL saved to ${OUTPUT_FILE}`);
  }
}

main();
