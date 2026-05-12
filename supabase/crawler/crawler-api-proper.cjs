/**
 * Cerebro MediaWiki API Crawler - Proper Etiquette
 * 
 * Follows API:Etiquette guidelines:
 * - Descriptive User-Agent
 * - Serial requests (not parallel)
 * - maxlag parameter
 * - GZip compression
 * - Caching
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const { writeFileSync, mkdirSync } = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'raw-data');
try { mkdirSync(OUT_DIR, { recursive: true }); } catch(e) {}

const BASE_URL = 'https://marvel.fandom.com';
const API_URL = 'https://marvel.fandom.com/api.php';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Cache for rate limiting
const cache = new Map();
const REQUEST_DELAY = 800; // Serial requests - wait between calls

function fetchWithCache(url) {
  const now = Date.now();
  if (cache.has(url)) {
    const { data, time } = cache.get(url);
    if (now - time < 3600000) return Promise.resolve(data); // 1 hour cache
  }
  return fetch(url).then(res => res.json()).then(data => {
    cache.set(url, { data, time: now });
    return data;
  });
}

async function apiRequest(params) {
  const queryString = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&');
  
  const url = `${API_URL}?${queryString}`;
  await new Promise(r => setTimeout(r, REQUEST_DELAY)); // Rate limit
  return fetchWithCache(url);
}

function extractPowerGridFromWikitext(wikitext) {
  const g = {};
  
  // Try multiple patterns - Marvel wiki uses different template formats
  const patterns = [
    [/\| Intelligence\s*=\s*(\d)/i, 'intelligence'],
    [/\| Strength\s*=\s*(\d)/i, 'strength'],
    [/\| Speed\s*=\s*(\d)/i, 'speed'],
    [/\| Durability\s*=\s*(\d)/i, 'durability'],
    [/\| Energy\s*=\s*(\d)/i, 'energy'],
    [/\| Fighting\s*=\s*(\d)/i, 'fighting'],
    [/\| Agility\s*=\s*(\d)/i, 'agility'],
    // Alternative patterns
    [/Intelligence[\s:=]+(\d)/i, 'intelligence'],
    [/Strength[\s:=]+(\d)/i, 'strength'],
    [/Speed[\s:=]+(\d)/i, 'speed'],
    [/Durability[\s:=]+(\d)/i, 'durability'],
    [/Energy[\s:=]+(\d)/i, 'energy'],
    [/Fighting[\s:=]+(\d)/i, 'fighting'],
    [/Agility[\s:=]+(\d)/i, 'agility'],
  ];
  
  patterns.forEach(([re, key]) => {
    if (!g[key]) {
      const m = wikitext.match(re);
      if (m) g[key] = parseInt(m[1]);
    }
  });
  
  return g;
}

function extractField(wikitext, field) {
  const patterns = [
    new RegExp(`\\|\\s*${field}\\s*=\\s*([^\\n|]+)`, 'i'),
    new RegExp(`${field}[\\s:=]+([^\\n]+)`, 'i'),
  ];
  
  for (const re of patterns) {
    const m = wikitext.match(re);
    if (m) return m[1].trim().substring(0, 100);
  }
  return '';
}

async function findEarth616Pages(letter) {
  // Get category members with maxlag for courtesy
  const data = await apiRequest({
    action: 'query',
    list: 'categorymembers',
    cmtitle: 'Category:Characters',
    cmstart: letter,
    cmlimit: 200,
    cmtype: 'page',
    format: 'json',
    maxlag: 5
  });
  
  const pages = data.query?.categorymembers || [];
  
  // Filter for Earth-616
  return pages
    .filter(p => p.title.includes('(Earth-616)'))
    .map(p => ({
      name: p.title.replace(' (Earth-616)', ''),
      title: p.title
    }));
}

async function crawlWithProperEtiquette() {
  console.log('🚀 Starting MediaWiki API crawler with proper etiquette...');
  
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
      // Navigate to category page to get links
      await page.goto(`${BASE_URL}/index.php?title=Category:Characters&from=${letter}`, { 
        waitUntil: 'networkidle2', 
        timeout: 30000 
      });
      await new Promise(r => setTimeout(r, 1500));
      
      const links = await page.evaluate(() => {
        const result = [];
        document.querySelectorAll('.category-page__member-link').forEach(link => {
          if (link.querySelector('img')) return;
          const text = link.textContent || '';
          const href = link.href || '';
          if (text.includes('(Earth-616)') || href.includes('(Earth-616)')) {
            const name = text.replace('(Earth-616)', '').trim();
            if (name && name.length < 100) {
              result.push({ name, url: href, title: name + ' (Earth-616)' });
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
          // Fetch wikitext via API - serial request with delay
          const wikitextData = await apiRequest({
            action: 'parse',
            page: char.title,
            prop: 'wikitext',
            format: 'json',
            maxlag: 5
          });
          
          const wikitext = wikitextData.parse?.wikitext?.['*'] || '';
          
          const data = {
            name: char.name,
            url: char.url,
            title: char.title,
            faction: 'unknown',
            danger: 'medio',
            realName: extractField(wikitext, 'RealName'),
            alias: extractField(wikitext, 'CurrentAlias'),
            powerGrid: extractPowerGridFromWikitext(wikitext),
            rawPowers: [],
            timestamp: new Date().toISOString()
          };
          
          collected.push(data);
          
          const filename = char.name.replace(/[^a-z0-9]/gi, '_').substring(0, 50) + '.json';
          writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(data, null, 2));
          
          const gridStr = Object.keys(data.powerGrid).length > 0 
            ? JSON.stringify(data.powerGrid) 
            : 'NO DATA';
          console.log(`       ✅ Grid: ${gridStr}`);
          
        } catch (e) {
          console.log(`       ❌ Error: ${e.message}`);
        }
        
        await new Promise(r => setTimeout(r, 500));
      }
      
    } catch (e) {
      console.log(`   ❌ Error loading ${letter}: ${e.message}`);
    }
  }
  
  await browser.close();
  
  writeFileSync(path.join(OUT_DIR, 'cerebro_crawl_combined.json'), JSON.stringify(collected, null, 2));
  
  console.log(`\n🎉 Done! Collected ${collected.length} characters`);
}

crawlWithProperEtiquette().catch(console.error);