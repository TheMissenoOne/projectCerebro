/**
 * X-MEN TTRPG - E2E Tests (Page Load)
 */

const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:8080';

async function runTests() {
  console.log('Running E2E Tests...\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  
  page.on('pageerror', err => errors.push(err.message));
  
  const pages = [
    ['index.html', 'Login/Register'],
    ['dashboard.html', 'Dashboard'],
    ['ficha.html', 'Character'],
    ['admin.html', 'Admin'],
    ['cerebro.html', 'Cerebro'],
    ['wiki.html', 'Wiki'],
    ['combate.html', 'Combate']
  ];
  
  let passed = 0;
  
  for (const [path, name] of pages) {
    try {
      errors.length = 0;
      await page.goto(`${BASE_URL}/${path}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(500);
      
      if (errors.length === 0) {
        console.log(`   ✅ ${name}`);
        passed++;
      } else {
        console.log(`   ❌ ${name}: ${errors.join(', ')}`);
      }
    } catch (e) {
      console.log(`   ❌ ${name}: ${e.message}`);
    }
  }
  
  await page.close();
  await browser.close();
  
  console.log(`\n${passed}/${pages.length} pages loaded without errors`);
  
  if (passed < pages.length) {
    process.exit(1);
  }
  
  console.log('\n✅ All E2E tests passed');
}

runTests();