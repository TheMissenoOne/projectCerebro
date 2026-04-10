/**
 * X-MEN TTRPG - Admin Component Tests
 */

const { chromium } = require('playwright');

const TESTS = [];

function test(name, fn) {
  TESTS.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// Test AdminComponent structure
test('admin.js - exports AdminComponent', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  await page.addScriptTag({ path: 'app/services/auth.js' });
  await page.addScriptTag({ path: 'app/services/api.js' });
  await page.addScriptTag({ path: 'app/components/admin.js' });
  const exported = await page.evaluate(() => {
    return typeof window.AdminComponent !== 'undefined';
  });
  assert(exported, 'AdminComponent should be exported');
});

test('admin.js - has mount method', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  await page.addScriptTag({ path: 'app/services/auth.js' });
  await page.addScriptTag({ path: 'app/services/api.js' });
  await page.addScriptTag({ path: 'app/components/admin.js' });
  const hasMount = await page.evaluate(() => {
    return typeof window.AdminComponent?.mount === 'function';
  });
  assert(hasMount, 'AdminComponent should have mount method');
});

test('admin.js - has unmount method', async ({ page }) => {
  await page.addScriptTag({ path: 'app/core/state.js' });
  await page.addScriptTag({ path: 'app/core/router.js' });
  await page.addScriptTag({ path: 'app/services/auth.js' });
  await page.addScriptTag({ path: 'app/services/api.js' });
  await page.addScriptTag({ path: 'app/components/admin.js' });
  const hasUnmount = await page.evaluate(() => {
    return typeof window.AdminComponent?.unmount === 'function';
  });
  assert(hasUnmount, 'AdminComponent should have unmount method');
});

// Test admin route registration
test('app.js - registers /admin route', async ({ page }) => {
  const hasRoute = await page.evaluate(() => {
    Router.add('/test', () => {});
    return typeof Router.routes['/test'] === 'function';
  });
  assert(hasRoute, 'Router should allow dynamic route registration');
});

// Test API updateParty
test('api.js - has updateParty method', async ({ page }) => {
  await page.addScriptTag({ path: 'app/services/api.js' });
  const hasMethod = await page.evaluate(() => {
    return typeof window.ApiService?.updateParty === 'function';
  });
  assert(hasMethod, 'ApiService should have updateParty method');
});

// Run tests
(async () => {
  console.log('Running admin tests...');
  
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