/**
 * X-MEN TTRPG - SPA Unit Tests
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

function assertDeepEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// Test state.js
test('state.js - AppState initialization', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  const inited = await page.evaluate(() => {
    AppState.init();
    return AppState.get('theme');
  });
  assertEqual(inited, 'yellow', 'Theme should default to yellow');
});

test('state.js - setTheme updates state', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  const updated = await page.evaluate(() => {
    AppState.init();
    AppState.setTheme('red');
    return AppState.get('theme');
  });
  assertEqual(updated, 'red', 'Theme should be red');
});

test('state.js - subscribe receives updates', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  const received = await page.evaluate(() => {
    return new Promise((resolve) => {
      AppState.init();
      const unsub = AppState.subscribe('theme', (val) => {
        resolve(val);
      });
      AppState.setTheme('green');
    });
  });
  assertEqual(received, 'green', 'Subscription should receive green');
});

// Test router.js  
test('router.js - Router has add method', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  const hasAdd = await page.evaluate(() => {
    return typeof Router.add === 'function';
  });
  assert(hasAdd, 'Router.add should be a function');
});

test('router.js - Router has navigate method', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  const hasNavigate = await page.evaluate(() => {
    return typeof Router.navigate === 'function';
  });
  assert(hasNavigate, 'Router.navigate should be a function');
});

// Test existing themes.js
test('themes.js - getCurrentTheme returns default yellow', async ({ page }) => {
  await page.evaluate(() => {
    localStorage.removeItem('cerebro_tema');
  });
  const theme = await page.evaluate(() => getCurrentTheme());
  assertEqual(theme, 'yellow');
});

test('themes.js - setTheme saves to localStorage', async ({ page }) => {
  await page.evaluate(() => {
    setTheme('blue');
  });
  const saved = await page.evaluate(() => localStorage.getItem('cerebro_tema'));
  assertEqual(saved, 'blue');
});

test('themes.js - THEMES object has all themes', async ({ page }) => {
  const hasAll = await page.evaluate(() => {
    return Object.keys(THEMES).length === 5 &&
      THEMES.yellow && THEMES.red && THEMES.green && THEMES.purple && THEMES.blue;
  });
  assert(hasAll, 'THEMES should have all 5 themes');
});

// Test CSS variables
test('CSS - --green variable defined', async ({ page }) => {
  const green = await page.evaluate(() => {
    return getComputedStyle(document.body).getPropertyValue('--green').trim();
  });
  assert(green !== '', '--green should be defined');
});

test('CSS - --accentRGB variable defined', async ({ page }) => {
  const rgb = await page.evaluate(() => {
    return getComputedStyle(document.body).getPropertyValue('--accentRGB').trim();
  });
  assert(rgb !== '', '--accentRGB should be defined');
});

// Run tests
(async () => {
  console.log('Running SPA unit tests...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let passed = 0;
  let failed = 0;
  
  for (const { name, fn } of TESTS) {
    try {
      await fn({ page });
      console.log('✅ ' + name);
      passed++;
    } catch (e) {
      console.log('❌ ' + name + ': ' + e.message);
      failed++;
    }
  }
  
  await browser.close();
  
  console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
  process.exit(failed > 0 ? 1 : 0);
})();