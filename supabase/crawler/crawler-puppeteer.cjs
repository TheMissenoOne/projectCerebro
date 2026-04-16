const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { writeFileSync, mkdirSync } = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'raw-data');
try { mkdirSync(OUT_DIR, { recursive: true }); } catch(e) {}

const BASE_URL = 'https://marvel.fandom.com/index.php?title=Category:Characters&from=';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DELAY = 2000;

async function crawlWithPuppeteer() {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const collected = [];
  
  for (const letter of ALPHABET) {
    console.log(`\n📂 Letter: ${letter}`);
    
    try {
      await page.goto(BASE_URL + letter, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, DELAY));
      
      const title = await page.title();
      if (title.includes('Cloudflare') || title.includes('Um momento')) {
        console.log('⚠️ CloudFlare - waiting 10s...');
        await new Promise(r => setTimeout(r, 10000));
      }
      
      const links = await page.evaluate(() => {
        const result = [];
        document.querySelectorAll('.category-page__member-link').forEach(link => {
          const text = link.textContent || '';
          const href = link.href || '';
          // Skip if contains image (thumbnail link)
          if (link.querySelector('img')) return;
          if (text.includes('(Earth-616)') || href.includes('(Earth-616)')) {
            const name = text.replace('(Earth-616)', '').trim();
            if (name && name.length < 100) {
              result.push({ name, url: href });
            }
          }
        });
        return result;
      });
      
      console.log(`   Found ${links.length} Earth-616 characters`);
      
      if (links.length === 0) continue;
      
      for (let i = 0; i < links.length; i++) {
        const char = links[i];
        console.log(`   [${i+1}/${links.length}] ${char.name}`);
        
        try {
          await page.goto(char.url, { waitUntil: 'networkidle2', timeout: 30000 });
          await new Promise(r => setTimeout(r, 2000));
          
          const data = await page.evaluate(() => {
            const extractPowerGrid = () => {
              const g = {};
              const keys = ['intelligence','strength','speed','durability','energy','fighting','agility'];
              
              // Look for power grid table - try multiple approaches
              const tables = document.querySelectorAll('table');
              tables.forEach(table => {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                  const cells = row.querySelectorAll('td, th');
                  if (cells.length >= 2) {
                    const label = cells[0].textContent.trim();
                    const value = cells[1].textContent.trim();
                    const idx = keys.findIndex(k => label.toLowerCase().includes(k));
                    if (idx >= 0) {
                      const num = value.match(/\d+/);
                      if (num) g[keys[idx]] = parseInt(num[0]);
                    }
                  }
                });
              });
              
              // Also try data-source attributes
              const dataSources = ['Intelligence','Strength','Speed','Durability','Energy','Fighting','Agility'];
              dataSources.forEach((label, idx) => {
                const el = document.querySelector(`[data-source="${label}"]`);
                if (el && !g[keys[idx]]) {
                  const num = el.textContent.match(/\d+/);
                  if (num) g[keys[idx]] = parseInt(num[0]);
                }
              });
              
              return g;
            };
            
            const extractField = (source) => {
              const el = document.querySelector(`[data-source="${source}"]`);
              return el ? el.textContent.trim() : '';
            };
            
            const title = document.title.replace(' | Marvel Fandom', '').replace(' (Earth-616)', '').trim();
            
            return {
              name: title,
              url: window.location.href,
              faction: 'unknown',
              danger: 'medio',
              realName: extractField('RealName'),
              alias: extractField('CurrentAlias'),
              powerGrid: extractPowerGrid(),
              rawPowers: [],
              timestamp: new Date().toISOString()
            };
          });
          
          data.name = char.name;
          collected.push(data);
          
          const filename = char.name.replace(/[^a-z0-9]/gi, '_') + '.json';
          writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2));
          
          console.log(`       ✅ Grid: ${JSON.stringify(data.powerGrid)}`);
          
        } catch (e) {
          console.log(`       ❌ Error: ${e.message}`);
        }
        
        await new Promise(r => setTimeout(r, 1000));
      }
      
    } catch (e) {
      console.log(`   ❌ Error loading ${letter}: ${e.message}`);
    }
  }
  
  await browser.close();
  
  writeFileSync(path.join(OUT_DIR, 'cerebro_crawl_combined.json'), JSON.stringify(collected, null, 2));
  
  console.log(`\n🎉 Done! Collected ${collected.length} characters`);
  console.log(`   Saved to: ${OUT_DIR}/`);
}

crawlWithPuppeteer().catch(console.error);