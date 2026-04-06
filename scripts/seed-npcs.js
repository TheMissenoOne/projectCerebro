const fs = require('fs');
const path = require('path');

const MARKDOWN_FILE = path.join(__dirname, '..', 'cerebro_rebalanceado.md');
const OUTPUT_FILE = path.join(__dirname, '..', 'supabase', 'seed.sql');

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
  let sql = '-- Seed dos 134 NPCs do Cérebro\n';
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

function main() {
  console.log('Parsing NPCs from markdown...');
  
  const markdown = fs.readFileSync(MARKDOWN_FILE, 'utf-8');
  const npcs = parseNPCs(markdown);
  
  console.log(`Found ${npcs.length} NPCs`);
  
  const sql = generateSQL(npcs);
  fs.writeFileSync(OUTPUT_FILE, sql, 'utf-8');
  
  console.log(`Generated SQL saved to ${OUTPUT_FILE}`);
}

main();
