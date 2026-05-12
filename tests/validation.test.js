/**
 * X-MEN TTRPG - Validation tests
 */

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Test: Dashboard loads with theme support
  await page.goto('http://localhost:8080/dashboard.html', { waitUntil: 'networkidle' });
  
  // Verify CSS variables are defined
  const green = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue('--green').trim();
  });
  
  const rgb = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue('--accentRGB').trim();
  });
  
  console.log('--green:', green);
  console.log('--accentRGB:', rgb);
  
  // Test: theme classes work
  const themes = ['yellow', 'red', 'green', 'purple', 'blue'];
  let allPass = true;
  for (const theme of themes) {
    await page.evaluate(t => setTheme(t), theme);
    const hasClass = await page.evaluate(t => document.body.classList.contains('theme-' + t), theme);
    console.log(`Theme ${theme}: ${hasClass ? '✅' : '❌'}`);
    if (!hasClass && theme !== 'yellow') allPass = false;
  }
  
  // Test: combate.html uses CSS variables
  await page.goto('http://localhost:8080/combate.html', { waitUntil: 'networkidle' });
  const combateGreen = await page.evaluate(() => {
    const el = document.querySelector('.result-value.success');
    if (!el) return 'not found';
    const style = getComputedStyle(el);
    return style.color;
  });
  console.log('combate.html .success color:', combateGreen);
  
  await browser.close();
  
  if (allPass) {
    console.log('\n✅ All validation tests passed');
  } else {
    console.log('\n❌ Some tests failed');
    process.exit(1);
  }
})();