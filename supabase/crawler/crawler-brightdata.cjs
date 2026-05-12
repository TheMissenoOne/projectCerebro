/**
 * Cerebro Bright Data Scraper
 * 
 * Uses Bright Data Scraping Browser to bypass CloudFlare and scrape Marvel wikis.
 * 
 * Setup:
 * 1. Sign up at https://brightdata.com
 * 2. Create Scraping Browser zone
 * 3. Copy credentials (username:password)
 * 4. Set environment variables or update below
 * 
 * Run: node crawler-brightdata.cjs
 */

const puppeteer = require('puppeteer-core');
const Turndown = require('turndown');
const { writeFileSync, mkdirSync } = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'raw-data');
try { mkdirSync(OUT_DIR, { recursive: true }); } catch(e) {}

const turndownService = new Turndown();

// YOUR BRIGHT DATA CREDENTIALS - Replace with your own
const AUTH = process.env.BRIGHT_DATA_AUTH || 'brd-customer-YOUR_ACCOUNT-zone-YOUR_ZONE:YOUR_PASSWORD';
const SBR_WS_ENDPOINT = `wss://${AUTH.replace(':', '%3A')}@brd.superproxy.io:9222`;

const BASE_URL = 'https://marvel.fandom.com';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function sanitizeFilename(url) {
  return url.replace(/https?:\/\//, '').replace(/\W/g, '_').substring(0, 100) + '_' + Date.now() + '.html';
}

function extractPowerGridFromHTML(html) {
  const g = {};
  
  // Try to find power grid in the rendered HTML
  // Look for data-source attributes or table cells with stats
  const patterns = [
    [/data-source="Intelligence"[^>]*>(\d+)/i, 'intelligence'],
    [/data-source="Strength"[^>]*>(\d+)/i, 'strength'],
    [/data-source="Speed"[^>]*>(\d+)/i, 'speed'],
    [/data-source="Durability"[^>]*>(\d+)/i, 'durability'],
    [/data-source="Energy"[^>]*>(\d+)/i, 'energy'],
    [/data-source="Fighting"[^>]*>(\d+)/i, 'fighting'],
    [/data-source="Agility"[^>]*>(\d+)/i, 'agility'],
  ];
  
  patterns.forEach(([re, key]) => {
    const m = html.match(re);
    if (m) g[key] = parseInt(m[1]);
  });
  
  return g;
}

function extractRealName(html) {
  const m = html.match(/data-source="RealName"[^>]*>([^<]+)/i);
  return m ? m[1].trim() : '';
}

function extractAlias(html) {
  const m = html.match(/data-source="CurrentAlias"[^>]*>([^<]+)/i);
  return m ? m[1].trim() : '';
}

async function scrapePage(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
  
  // Wait for page to render
  try {
    await page.waitForSelector('.page-header__title, h1#firstHeading', { timeout: 30000 });
  } catch (e) {
    console.log('   ⚠️ Page loaded but key elements not found');
  }
  
  // Get full HTML
  const html = await page.content();
  const title = await page.title();
  
  // Get name from URL or title
  const name = title.replace(' | Marvel Fandom', '').replace(' (Earth-616)', '').trim();
  
  const data = {
    name: name,
    url: url,
    faction: 'unknown',
    danger: 'medio',
    realName: extractRealName(html),
    alias: extractAlias(html),
    powerGrid: extractPowerGridFromHTML(html),
    rawPowers: [],
    timestamp: new Date().toISOString()
  };
  
  // Convert to Markdown
  const markdown = turndownService.turndown(html);
  
  return { data, html, markdown };
}

async function crawlWithBrightData() {
  console.log('🔗 Connecting to Bright Data Scraping Browser...');
  
  let browser;
  try {
    browser = await puppeteer.connect({ browserWSEndpoint: SBR_WS_ENDPOINT });
    console.log('✅ Connected to remote browser');
  } catch (e) {
    console.error('❌ Failed to connect:', e.message);
    console.log('Make sure Bright Data credentials are set correctly.');
    process.exit(1);
  }
  
  const page = await browser.newPage();
  
  const collected = [];
  
  for (const letter of ALPHABET) {
    console.log(`\n📂 Letter: ${letter}`);
    
    try {
      // Get category page
      await page.goto(`${BASE_URL}/wiki/Category:Characters?from=${letter}`, { 
        waitUntil: 'domcontentloaded', 
        timeout: 60000 
      });
      
      await page.waitForSelector('.category-page__member-link', { timeout: 30000 });
      
      // Get Earth-616 links
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
          const { data, html, markdown } = await scrapePage(page, char.url);
          data.name = char.name;
          
          collected.push(data);
          
          // Save individual files
          const filename = char.name.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
          writeFileSync(path.join(OUT_DIR, filename + '.json'), JSON.stringify(data, null, 2));
          writeFileSync(path.join(OUT_DIR, filename + '.html'), html);
          writeFileSync(path.join(OUT_DIR, filename + '.md'), markdown);
          
          console.log(`       ✅ Grid: ${Object.keys(data.powerGrid).length > 0 ? JSON.stringify(data.powerGrid) : 'NO DATA'}`);
          
        } catch (e) {
          console.log(`       ❌ Error: ${e.message}`);
        }
        
        // Rate limiting
        await new Promise(r => setTimeout(r, 2000));
      }
      
    } catch (e) {
      console.log(`   ❌ Error loading ${letter}: ${e.message}`);
    }
  }
  
  await browser.disconnect();
  
  // Save combined
  writeFileSync(path.join(OUT_DIR, 'cerebro_crawl_combined.json'), JSON.stringify(collected, null, 2));
  
  console.log(`\n🎉 Done! Collected ${collected.length} characters`);
  console.log(`   Saved to: ${OUT_DIR}/`);
}

crawlWithBrightData().catch(console.error);