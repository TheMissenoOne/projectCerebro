/**
 * Cerebro Browser Crawler
 * 
 * USAGE:
 * 1. Open Marvel wiki character page: https://marvel.fandom.com/wiki/Character_Name
 * 2. Run this in browser console (F12 → Console)
 * 3. Script extracts power grid, stats, powers, downloads JSON
 * 4. Repeat for all characters
 * 5. Final command downloads ALL collected data as combined JSON
 * 
 * To install as bookmarklet:
 * - Create bookmark, paste minified code in URL field
 * - Click bookmark on each character page
 */

(function() {
  const CACHE_KEY = 'cerebro_crawl_data';
  const DONE_KEY = 'cerebro_crawl_done';
  
  // Helper: extract power grid from page
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
      // Try infobox first
      const cell = document.querySelector(`.infobox .pi-data-value:contains("${label}")`) 
                || document.querySelector(`[data-source="${label}"]`);
      if (cell) {
        const num = cell.textContent.match(/\d+/);
        if (num) grid[key] = parseInt(num[0]);
      }
    });
    
    return grid;
  }
  
  // Helper: extract stats table
  function extractStats() {
    const stats = {};
    const statMap = {
      'Intelligence': 'inteligência',
      'Strength': 'força',
      'Durability': 'corpo',
      'Speed': 'destreza',
      'Energy': 'influência',
      'Fighting': 'espírito'
    };
    
    document.querySelectorAll('.powergrid-table tr').forEach(row => {
      const label = row.querySelector('td:first-child')?.textContent?.trim();
      const value = row.querySelector('td:last-child')?.textContent?.trim();
      if (label && value && statMap[label]) {
        stats[statMap[label]] = parseInt(value) || 0;
      }
    });
    
    return stats;
  }
  
  // Helper: extract powers list
  function extractPowers() {
    const powers = [];
    const section = document.querySelector('#Powers') || document.querySelector('h2:contains("Powers")');
    if (section) {
      let container = section.nextElementSibling;
      while (container && !container.querySelector('h2')) {
        container.querySelectorAll('li').forEach(li => {
          const text = li.textContent.trim();
          if (text && text.length < 150) powers.push(text);
        });
        container = container.nextElementSibling;
      }
    }
    return powers;
  }
  
  // Helper: extract real name
  function extractRealName() {
    const el = document.querySelector('[data-source="RealName"]') 
            || document.querySelector('.infobox td:contains("Real name")');
    return el ? el.textContent.trim() : '';
  }
  
  // Helper: extract current alias
  function extractAlias() {
    const el = document.querySelector('[data-source="CurrentAlias"]');
    return el ? el.textContent.trim() : '';
  }
  
  // Main: extract and save current page
  function crawlCurrentPage() {
    const title = document.title.replace(' | Marvel Fandom', '').trim();
    const wiki = window.location.pathname.split('/').pop().replace(/_/g, ' ');
    
    const data = {
      name: title,
      wiki: wiki,
      faction: 'unknown',
      danger: 'medio',
      realName: extractRealName(),
      alias: extractAlias(),
      powerGrid: extractPowerGrid(),
      stats: extractStats(),
      rawPowers: extractPowers(),
      timestamp: new Date().toISOString()
    };
    
    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
    existing.push(data);
    localStorage.setItem(CACHE_KEY, JSON.stringify(existing));
    
    console.log(`✅ Saved: ${title}`);
    console.log(`   Power Grid: ${JSON.stringify(data.powerGrid)}`);
    console.log(`   Total collected: ${existing.length}`);
    
    return data;
  }
  
  // Download single file
  function downloadSingle() {
    const data = crawlCurrentPage();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/[^a-z0-9]/gi, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Download all collected
  function downloadAll() {
    const all = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
    if (all.length === 0) {
      console.log('⚠ No data collected. Visit pages and run crawlPage() first.');
      return;
    }
    
    const blob = new Blob([JSON.stringify(all, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cerebro_crawl_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    console.log(`📦 Downloaded ${all.length} characters`);
  }
  
  // List collected
  function listCollected() {
    const all = JSON.parse(localStorage.getItem(CACHE_KEY) || '[]');
    console.log(`📋 Collected (${all.length}):`);
    all.forEach((c, i) => console.log(`  ${i+1}. ${c.name} - Grid: ${JSON.stringify(c.powerGrid)}`));
  }
  
  // Clear data
  function clearData() {
    localStorage.removeItem(CACHE_KEY);
    console.log('🗑️ Data cleared');
  }
  
  // Export functions to global
  window.cerebroCrawl = {
    page: crawlCurrentPage,
    download: downloadSingle,
    downloadAll: downloadAll,
    list: listCollected,
    clear: clearData,
    help: () => console.log(`
🎮 CEREBRO CRAWLER COMMANDS:

  cerebroCrawl.page()      → Extract current page, save to storage
  cerebroCrawl.download()  → Download current page as JSON file
  cerebroCrawl.downloadAll() → Download ALL collected data
  cerebroCrawl.list()      → List all collected characters
  cerebroCrawl.clear()     → Clear collected data

📋 WORKFLOW:
  1. Open https://marvel.fandom.com/wiki/Wolverine
  2. Run: cerebroCrawl.page()
  3. Repeat for each character
  4. Run: cerebroCrawl.downloadAll() to get combined file

🔧 Then run: node process.js --no-llm
`)
  };
  
  // Auto-run help
  console.log(`
🎮 CEREBRO CRAWLER LOADED
  Run cerebroCrawl.help() for commands
`);
})();