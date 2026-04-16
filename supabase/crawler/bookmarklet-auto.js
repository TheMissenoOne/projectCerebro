/**
 * Cerebro Auto-Crawler - Alpha version
 * 
 * USAGE: Paste this entire script into browser console on:
 *   https://marvel.fandom.com/wiki/Category:Characters
 * 
 * It will:
 * 1. Go through A-Z pages
 * 2. Filter for Earth-616 only
 * 3. Auto-visit each character page and extract data
 * 4. Store in localStorage
 * 
 * Commands:
 *   cerebroAuto.start()     → Start crawling (or resume)
 *   cerebroAuto.download()  → Download all collected data
 *   cerebroAuto.status()     → Show progress
 *   cerebroAuto.clear()      → Clear data
 */

(function() {
  const CACHE_KEY = 'cerebro_crawl_data';
  const STATE_KEY = 'cerebro_crawl_state';
  const DONE_KEY = 'cerebro_crawl_done';
  
  // Alphabet pages
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const BASE_URL = 'https://marvel.fandom.com/index.php?title=Category:Characters&from=';
  
  function getState() {
    return JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
  }
  
  function saveState(state) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }
  
  function getData() {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
  }
  
  function saveData(data) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  }
  
  // Extract Earth-616 links from current category page
  function getEarth616Links() {
    const links = [];
    const allLinks = document.querySelectorAll('.category-page__member-link, .category-page__members a');
    
    allLinks.forEach(link => {
      const text = link.textContent || '';
      const href = link.href || '';
      
      // Match Earth-616 pattern
      if (text.includes('(Earth-616)') || href.includes('(Earth-616)')) {
        links.push({
          name: text.replace('(Earth-616)', '').trim(),
          url: href
        });
      }
    });
    
    return links;
  }
  
  // Extract power grid from character page
  function extractPowerGrid() {
    const grid = {};
    const patterns = [
      ['Intelligence', 'intelligence'],
      ['Strength', 'strength'],
      ['Speed', 'speed'],
      ['Durability', 'durability'],
      ['Energy', 'energy'],
      ['Fighting', 'fighting'],
      ['Agility', 'agility']
    ];
    
    patterns.forEach(([label, key]) => {
      // Try data-source attribute
      const cell = document.querySelector(`[data-source="${label}"]`);
      if (cell) {
        const num = cell.textContent.match(/\d+/);
        if (num) grid[key] = parseInt(num[0]);
      }
    });
    
    return grid;
  }
  
  // Extract real name
  function extractRealName() {
    const el = document.querySelector('[data-source="RealName"]');
    return el ? el.textContent.trim() : '';
  }
  
  // Extract current alias
  function extractAlias() {
    const el = document.querySelector('[data-source="CurrentAlias"]');
    return el ? el.textContent.trim() : '';
  }
  
  // Extract powers section
  function extractPowers() {
    const powers = [];
    const headings = document.querySelectorAll('h2, h3');
    
    headings.forEach(h => {
      if (h.textContent.includes('Powers')) {
        let next = h.nextElementSibling;
        while (next && !next.tagName?.match(/^H[23]$/)) {
          next.querySelectorAll('li').forEach(li => {
            const text = li.textContent.trim();
            if (text && text.length < 150) powers.push(text);
          });
          next = next.nextElementSibling;
        }
      }
    });
    
    return powers.slice(0, 10);
  }
  
  // Extract single character data
  function crawlCurrentPage() {
    const title = document.title.replace(' | Marvel Fandom', '').replace(' (Earth-616)', '').trim();
    const url = window.location.href;
    
    const data = {
      name: title,
      url: url,
      faction: 'unknown',
      danger: 'medio',
      realName: extractRealName(),
      alias: extractAlias(),
      powerGrid: extractPowerGrid(),
      rawPowers: extractPowers(),
      timestamp: new Date().toISOString()
    };
    
    return data;
  }
  
  // Process single character
  async function processCharacter(char) {
    console.log(`📡 Visiting: ${char.name}`);
    
    window.location.href = char.url;
    await new Promise(r => setTimeout(r, 2000)); // Wait for page load
    
    const data = crawlCurrentPage();
    data.name = char.name; // Use clean name
    
    const existing = getData();
    existing.push(data);
    saveData(existing);
    
    console.log(`✅ Saved: ${data.name}, Grid: ${JSON.stringify(data.powerGrid)}`);
    
    return data;
  }
  
  // Main crawl loop
  async function startCrawl(letterIndex = 0, charIndex = 0) {
    if (letterIndex >= ALPHABET.length) {
      console.log('🎉 ALL DONE! Run cerebroAuto.download() to get data.');
      return;
    }
    
    const letter = ALPHABET[letterIndex];
    console.log(`\n=== Letter: ${letter} ===`);
    
    // Navigate to letter page
    window.location.href = BASE_URL + letter;
    await new Promise(r => setTimeout(r, 2500));
    
    // Get Earth-616 links
    const links = getEarth616Links();
    console.log(`Found ${links.length} Earth-616 characters`);
    
    if (links.length === 0) {
      // No characters, move to next letter
      return startCrawl(letterIndex + 1, 0);
    }
    
    // Process from current charIndex
    for (let i = charIndex; i < links.length; i++) {
      try {
        await processCharacter(links[i]);
        await new Promise(r => setTimeout(r, 1500)); // Rate limit
      } catch (e) {
        console.error(`Error: ${e.message}`);
      }
      
      // Save progress
      saveState({
        letterIndex,
        charIndex: i + 1,
        total: getData().length
      });
    }
    
    // Next letter
    startCrawl(letterIndex + 1, 0);
  }
  
  // Commands
  window.cerebroAuto = {
    start: () => {
      const state = getState();
      if (state.letterIndex !== undefined) {
        console.log(`Resuming from letter ${ALPHABET[state.letterIndex]}, character ${state.charIndex}`);
        startCrawl(state.letterIndex, state.charIndex);
      } else {
        console.log('Starting fresh crawl...');
        startCrawl(0, 0);
      }
    },
    
    startLetter: (letter) => {
      const idx = ALPHABET.indexOf(letter.toUpperCase());
      if (idx >= 0) startCrawl(idx, 0);
      else console.error(`Invalid letter: ${letter}`);
    },
    
    download: () => {
      const all = getData();
      if (all.length === 0) {
        console.log('⚠ No data. Run cerebroAuto.start() first.');
        return;
      }
      
      const blob = new Blob([JSON.stringify(all, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cerebro_crawl_${all.length}_chars.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      console.log(`📦 Downloaded ${all.length} characters`);
    },
    
    status: () => {
      const state = getState();
      const all = getData();
      console.log(`Collected: ${all.length} characters`);
      if (state.letterIndex !== undefined) {
        console.log(`Progress: Letter ${ALPHABET[state.letterIndex]}, char ${state.charIndex}`);
      }
    },
    
    list: () => {
      const all = getData();
      all.forEach((c, i) => console.log(`${i+1}. ${c.name}`));
    },
    
    clear: () => {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(STATE_KEY);
      console.log('🗑️ Data cleared');
    }
  };
  
  console.log(`
🎮 CEREBRO AUTO-CRAWLER LOADED
  
  cerebroAuto.start()       → Start/resume crawl A→Z
  cerebroAuto.startLetter('X') → Start from specific letter
  cerebroAuto.download()    → Download collected data
  cerebroAuto.status()       → Show progress
  cerebroAuto.list()        → List all collected
  cerebroAuto.clear()       → Clear all data
  `);
})();