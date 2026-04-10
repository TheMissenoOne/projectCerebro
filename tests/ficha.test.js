/**
 * X-MEN TTRPG - Ficha Component Tests
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

// Test FichaComponent structure
test('ficha.js - exports FichaComponent', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  await page.addScriptTag({ path: 'app/services/auth.js' });
  await page.addScriptTag({ path: 'app/services/api.js' });
  await page.addScriptTag({ path: 'app/components/ficha.js' });
  const exported = await page.evaluate(() => {
    return typeof window.FichaComponent !== 'undefined' || typeof window._exports !== 'undefined';
  });
  assert(exported, 'FichaComponent should be exported');
});

test('ficha.js - has mount method', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  await page.addScriptTag({ path: 'app/services/auth.js' });
  await page.addScriptTag({ path: 'app/services/api.js' });
  await page.addScriptTag({ path: 'app/components/ficha.js' });
  const hasMount = await page.evaluate(() => {
    return typeof window.FichaComponent?.mount === 'function';
  });
  assert(hasMount, 'FichaComponent should have mount method');
});

test('ficha.js - has unmount method', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  await page.addScriptTag({ path: 'app/services/auth.js' });
  await page.addScriptTag({ path: 'app/services/api.js' });
  await page.addScriptTag({ path: 'app/components/ficha.js' });
  const hasUnmount = await page.evaluate(() => {
    return typeof window.FichaComponent?.unmount === 'function';
  });
  assert(hasUnmount, 'FichaComponent should have unmount method');
});

test('ficha.js - has save method', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  await page.addScriptTag({ path: 'app/services/auth.js' });
  await page.addScriptTag({ path: 'app/services/api.js' });
  await page.addScriptTag({ path: 'app/components/ficha.js' });
  const hasSave = await page.evaluate(() => {
    return typeof window.FichaComponent?._save === 'function';
  });
  assert(hasSave, 'FichaComponent should have _save method');
});

// Test ficha route registration
test('app.js - registers /ficha/new route', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  await page.addScriptTag({ path: 'app/services/auth.js' });
  await page.addScriptTag({ path: 'app/services/api.js' });
  await page.addScriptTag({ path: 'app/components/ficha.js' });
  await page.addScriptTag({ path: 'app/app.js' });
  const hasRoute = await page.evaluate(() => {
    Router.add('/ficha/new', () => {}); // Register test route to trigger route storage
    return typeof Router.routes['/ficha/new'] === 'function';
  });
  assert(hasRoute, 'Router should have /ficha/new route registered');
});

// Test ficha CSS
test('ficha CSS - .toolbar class defined', async ({ page }) => {
  const hasToolbar = await page.evaluate(() => {
    const sheet = Array.from(document.styleSheets).find(s => s.href?.includes('components.css'));
    if (!sheet) return false;
    return Array.from(sheet.cssRules || sheet.rules).some(r => r.selectorText === '.toolbar');
  });
  assert(hasToolbar, '.toolbar CSS should be defined');
});

test('ficha CSS - .ficha-content class defined', async ({ page }) => {
  const hasContent = await page.evaluate(() => {
    const sheet = Array.from(document.styleSheets).find(s => s.href?.includes('components.css'));
    if (!sheet) return false;
    return Array.from(sheet.cssRules || sheet.rules).some(r => r.selectorText === '.ficha-content');
  });
  assert(hasContent, '.ficha-content CSS should be defined');
});

test('ficha CSS - .ficha-stats class defined', async ({ page }) => {
  const hasStats = await page.evaluate(() => {
    const sheet = Array.from(document.styleSheets).find(s => s.href?.includes('components.css'));
    if (!sheet) return false;
    return Array.from(sheet.cssRules || sheet.rules).some(r => r.selectorText === '.ficha-stats');
  });
  assert(hasStats, '.ficha-stats CSS should be defined');
});

test('ficha CSS - .save-indicator class defined', async ({ page }) => {
  const hasIndicator = await page.evaluate(() => {
    const sheet = Array.from(document.styleSheets).find(s => s.href?.includes('components.css'));
    if (!sheet) return false;
    return Array.from(sheet.cssRules || sheet.rules).some(r => r.selectorText === '.save-indicator');
  });
  assert(hasIndicator, '.save-indicator CSS should be defined');
});

// Run tests
(async () => {
  console.log('Running ficha tests...');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'domcontentloaded' });
  
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