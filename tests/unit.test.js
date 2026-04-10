/**
 * X-MEN TTRPG - Unit Tests
 * Tests for core JavaScript modules
 */

const { chromium } = require('playwright');

const TESTS = [];

function test(name, fn) {
  TESTS.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

// Test themes.js
test('themes.js - getCurrentTheme returns default yellow', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.removeItem('cerebro_tema');
  });
  const theme = await page.evaluate(() => getCurrentTheme());
  assertEqual(theme, 'yellow');
});

test('themes.js - setTheme saves to localStorage', async ({ page }) => {
  await page.evaluate(() => {
    setTheme('red');
  });
  const theme = await page.evaluate(() => getCurrentTheme());
  assertEqual(theme, 'red');
});

test('themes.js - THEMES object has all themes', async ({ page }) => {
  const themes = await page.evaluate(() => THEMES);
  assertEqual(Object.keys(themes).length, 5);
  assert(themes.yellow, 'yellow theme missing');
  assert(themes.red, 'red theme missing');
  assert(themes.green, 'green theme missing');
  assert(themes.purple, 'purple theme missing');
  assert(themes.blue, 'blue theme missing');
});

// Test music.js (load the script first)
test('music.js - constants defined', async ({ page }) => {
  // Load music.js script
  await page.addScriptTag({ path: 'assets/js/music.js' });
  const hasKey = await page.evaluate(() => {
    return typeof MUSIC_KEY !== 'undefined' && typeof MUTE_KEY !== 'undefined';
  });
  assert(hasKey, 'MUSIC_KEY or MUTE_KEY not defined');
});

test('music.js - audio path is local', async ({ page }) => {
  // Load music.js script
  await page.addScriptTag({ path: 'assets/js/music.js' });
  const path = await page.evaluate(() => XMEN97_THEME);
  assert(path.includes('/assets/audio/'), 'Audio should be served locally');
});

// Test CSS variables
test('CSS - --green variable defined', async ({ page }) => {
  const green = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--green').trim();
  });
  assert(green.length > 0, '--green CSS variable not defined');
});

test('CSS - --accentRGB variable defined', async ({ page }) => {
  const rgb = await page.evaluate(() => {
    return getComputedStyle(document.documentElement).getPropertyValue('--accentRGB').trim();
  });
  assert(rgb.length > 0, '--accentRGB CSS variable not defined');
});

// Run tests
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Load test page
  await page.goto('http://localhost:8080/dashboard.html', { waitUntil: 'networkidle' });
  
  // Inject test globals
  await page.addScriptTag({ path: 'assets/js/themes.js' });
  
  console.log('Running unit tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  for (const { name, fn } of TESTS) {
    try {
      await fn({ page });
      console.log(`✅ ${name}`);
      passed++;
    } catch (e) {
      console.log(`❌ ${name}: ${e.message}`);
      failed++;
    }
  }
  
  console.log(`\n${passed}/${passed + failed} tests passed`);
  
  await browser.close();
  process.exit(failed > 0 ? 1 : 0);
})();