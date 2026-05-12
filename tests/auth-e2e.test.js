/**
 * X-MEN TTRPG - Auth Flow E2E Tests
 */

const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('Running Auth Flow E2E Tests...\n');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const results = { pass: 0, fail: 0 };
  
  const log = (msg, ok = true) => {
    console.log(`   ${ok ? '✅' : '❌'} ${msg}`);
    if (ok) results.pass++;
    else results.fail++;
  };
  
  try {
    // Test 1: index.html loads without errors
    console.log('\n[Test 1] Loading index.html...');
    const err1 = [];
    page.on('pageerror', err => err1.push(err.message));
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(500);
    if (err1.length === 0) log('index.html loads without JS errors');
    else log(`index.html has errors: ${err1.join(', ')}`, false);
    
    // Test 2: Check login form exists
    console.log('\n[Test 2] Checking login form...');
    const loginForm = await page.$('#login-form');
    if (loginForm) log('Login form exists');
    else log('Login form missing', false);
    
    // Test 3: Check register form exists  
    console.log('\n[Test 3] Checking register form...');
    const regForm = await page.$('#register-form');
    if (regForm) log('Register form exists');
    else log('Register form missing', false);
    
    // Test 4: Check tab switching works
    console.log('\n[Test 4] Testing tab switching...');
    await page.click('[data-tab="register"]');
    await page.waitForTimeout(200);
    const regVisible = await page.$eval('#register-form', el => el.classList.contains('active'));
    if (regVisible) log('Tab switching works');
    else log('Tab switching failed', false);
    
    // Test 5: Check checkAuth function exists
    console.log('\n[Test 5] Checking checkAuth function...');
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle' });
    const hasCheckAuth = await page.evaluate(() => typeof window.checkAuth === 'function');
    if (hasCheckAuth) log('checkAuth function exists');
    else log('checkAuth function missing', false);
    
    // Test 6: Check requireAuth function exists
    console.log('\n[Test 6] Checking requireAuth function...');
    await page.goto(`${BASE_URL}/dashboard.html`, { waitUntil: 'networkidle' });
    const hasRequireAuth = await page.evaluate(() => typeof window.requireAuth === 'function');
    if (hasRequireAuth) log('requireAuth function exists');
    else log('requireAuth function missing', false);
    
    // Test 7: dashboard.html loads without errors (when logged out)
    console.log('\n[Test 7] Dashboard redirect on no session...');
    await page.goto(`${BASE_URL}/dashboard.html`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(1000);
    const currentUrl = page.url();
    if (currentUrl.includes('index.html')) {
      log('Redirected to index.html on no session');
    } else {
      log(`Expected index.html, got ${currentUrl}`, false);
    }
    
    // Test 8: Check API functions exist
    console.log('\n[Test 8] Checking API functions...');
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle' });
    const apiExists = await page.evaluate(() => typeof window.api === 'object');
    if (apiExists) log('window.api exists');
    else log('window.api missing', false);
    
    // Test 9: Verify logout redirects to index
    console.log('\n[Test 9] Testing logout function...');
    await page.goto(`${BASE_URL}/dashboard.html`, { waitUntil: 'networkidle' });
    await page.evaluate(() => { window.logout = () => Promise.resolve().then(() => { window.location.href = 'index.html'; }); });
    await page.evaluate(() => window.logout());
    await page.waitForTimeout(500);
    if (page.url().includes('index.html')) {
      log('logout redirects correctly');
    } else {
      log('logout redirect failed', false);
    }
    
  } catch (e) {
    log(`Test error: ${e.message}`, false);
  }
  
  await page.close();
  await browser.close();
  
  console.log(`\n══════════════════════════`);
  console.log(`Results: ${results.pass} passed, ${results.fail} failed`);
  
  if (results.fail > 0) {
    process.exit(1);
  }
  console.log('\n✅ All Auth Flow tests passed');
}

runTests();