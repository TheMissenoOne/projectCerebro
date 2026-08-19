/**
 * Rasteriza assets/img/pwa-icon*.svg nos PNGs que o manifest e o iOS exigem.
 * Uso: node scripts/gen-pwa-icons.js   (precisa do chromium do Playwright)
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets/img');
const JOBS = [
  { svg: 'pwa-icon.svg', size: 192, out: 'icon-192.png' },
  { svg: 'pwa-icon.svg', size: 512, out: 'icon-512.png' },
  { svg: 'pwa-icon.svg', size: 180, out: 'apple-touch-icon.png' },
  { svg: 'pwa-icon-maskable.svg', size: 512, out: 'icon-512-maskable.png' },
];

(async () => {
  const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
  );
  for (const job of JOBS) {
    const svg = fs.readFileSync(path.join(OUT, job.svg), 'utf8');
    const page = await browser.newPage({
      viewport: { width: job.size, height: job.size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<style>html,body{margin:0;padding:0;background:#080808}svg{display:block;width:${job.size}px;height:${job.size}px}</style>${svg}`
    );
    await page.screenshot({ path: path.join(OUT, job.out), omitBackground: false });
    await page.close();
    console.log('✓', job.out, job.size + 'px');
  }
  await browser.close();
})();
