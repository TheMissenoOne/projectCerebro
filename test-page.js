const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  
  const testPage = async (name, url) => {
    const page = await browser.newPage();
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(`${name}: ${err.message}`));
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(e => pageErrors.push(`${name}: ${e.message}`));
    await page.close();
    return pageErrors;
  };
  
  console.log('Testing all pages...\n');
  
  const pages = [
    ['index.html', 'http://localhost:8080/index.html'],
    ['dashboard.html', 'http://localhost:8080/dashboard.html'],
    ['ficha.html', 'http://localhost:8080/ficha.html'],
    ['admin.html', 'http://localhost:8080/admin.html'],
    ['cerebro.html', 'http://localhost:8080/cerebro.html'],
    ['wiki.html', 'http://localhost:8080/wiki.html'],
    ['combate.html', 'http://localhost:8080/combate.html']
  ];
  
  for (const [name, url] of pages) {
    const pageErrors = await testPage(name, url);
    if (pageErrors.length === 0) {
      console.log(`✅ ${name}`);
    } else {
      console.log(`❌ ${name}: ${pageErrors.join(', ')}`);
      errors.push(...pageErrors);
    }
  }
  
  console.log('\n' + (errors.length === 0 ? '✅ All pages loaded without errors!' : '❌ Some errors found:'));
  errors.forEach(e => console.log('  -', e));
  
  await browser.close();
})();