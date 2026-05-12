/**
 * Cerebro MediaWiki API Crawler
 * 
 * Usage:
 *   node crawler-api.js
 * 
 * Uses MediaWiki API to get wikitext, extracts power grid.
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { writeFileSync, mkdirSync } = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'raw-data');
try { mkdirSync(OUT_DIR, { recursive: true }); } catch(e) {}

const BASE_URL = 'https://marvel.fandom.com/index.php?title=Category:Characters&from=';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const API_URL = 'https://marvel.fandom.com/api.php';

async function fetchWikitext(title) {
  const url = `${API_URL}?action=parse&page=${encodeURIComponent(title)}&prop=wikitext&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.parse?.wikitext?.['*'] || '';
}

function extractPowerGridFromWikitext(wikitext) {
  const g = {};
  const patterns = [
    [/\| Intelligence\s*=\s*(\d)/i, 'intelligence'],
    [/\| Strength\s*=\s*(\d)/i, 'strength'],
    [/\| Speed\s*=\s*(\d)/i, 'speed'],
    [/\| Durability\s*=\s*(\d)/i, 'durability'],
    [/\| Energy\s*=\s*(\d)/i, 'energy'],
    [/\| Fighting\s*=\s*(\d)/i, 'fighting'],
    [/\| Agility\s*=\s*(\d)/i, 'agility']
  ];
  
  patterns.forEach(([re, key]) => {
    const m = wikitext.match(re);
    if (m) g[key] = parseInt(m[1]);
  });
  
  return g;
}

function extractField(wikitext, field) {
  const re = new RegExp(`\\|\\s*${field}\\s*=\\s*([^\\n|]+)`, 'i');
  const m = wikitext.match(re);
  return m ? m[1].trim().substring(0, 100) : '';
}

async function crawlWithAPI() {
  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  const collected = [];
  
  for (const letter of ALPHABET) {
    console.log(`\n📂 Letter: ${letter}`);
    
    try {
      await page.goto(BASE_URL + letter, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000));
      
      const links = await page.evaluate(() => {
        const result = [];
        document.querySelectorAll('.category-page__member-link').forEach(link => {
          if (link.querySelector('img')) return;
          const text = link.textContent || '';
          const href = link.href || '';
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
          // Get wikitext via API
          const wikitext = await fetchWikitext(char.name + ' (Earth-616)');
          
          const data = {
            name: char.name,
            url: char.url,
            faction: 'unknown',
            danger: 'medio',
            realName: extractField(wikitext, 'RealName'),
            alias: extractField(wikitext, 'CurrentAlias'),
            powerGrid: extractPowerGridFromWikitext(wikitext),
            rawPowers: [],
            timestamp: new Date().toISOString()
          };
          
          collected.push(data);
          
          const filename = char.name.replace(/[^a-z0-9]/gi, '_') + '.json';
          writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2));
          
          console.log(`       ✅ Grid: ${JSON.stringify(data.powerGrid)}`);
          
        } catch (e) {
          console.log(`       ❌ Error: ${e.message}`);
        }
        
        await new Promise(r => setTimeout(r, 800));
      }
      
    } catch (e) {
      console.log(`   ❌ Error loading ${letter}: ${e.message}`);
    }
  }
  
  await browser.close();
  
  writeFileSync(path.join(OUT_DIR, 'cerebro_crawl_combined.json'), JSON.stringify(collected, null, 2));
  
  console.log(`\n🎉 Done! Collected ${collected.length} characters`);
}

crawlWithAPI().catch(console.error);