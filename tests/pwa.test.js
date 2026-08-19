/**
 * X-MEN TTRPG - PWA wiring tests (node-only, sem browser)
 * Garante que manifest, service worker e as meta tags continuam presentes
 * em todas as páginas.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGES = ['index.html', 'dashboard.html', 'ficha.html', 'cerebro.html', 'wiki.html', 'combate.html', 'admin.html'];

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✅ ' + name);
    passed++;
  } catch (e) {
    console.log('❌ ' + name + ': ' + e.message);
    failed++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

test('manifest exists and is valid JSON with the required fields', function () {
  const m = JSON.parse(read('manifest.webmanifest'));
  assert(m.name && m.short_name, 'name/short_name missing');
  assert(m.start_url && m.scope, 'start_url/scope missing');
  assert(m.display === 'standalone', 'display is not standalone');
  assert(m.icons.some((i) => i.sizes === '192x192'), '192px icon missing');
  assert(m.icons.some((i) => i.sizes === '512x512'), '512px icon missing');
  assert(m.icons.some((i) => (i.purpose || '').includes('maskable')), 'maskable icon missing');
  m.icons.forEach((i) => assert(fs.existsSync(path.join(ROOT, i.src)), 'icon file missing: ' + i.src));
  (m.shortcuts || []).forEach((s) =>
    assert(fs.existsSync(path.join(ROOT, s.url.replace('./', '').split('?')[0])), 'shortcut target missing: ' + s.url)
  );
});

test('service worker precaches every file it lists', function () {
  const sw = read('sw.js');
  assert(sw.includes("const BUILD_QUERY = '?v=dev'"), 'build placeholder missing — deploy cannot version the caches');
  const shell = sw.slice(sw.indexOf('const SHELL = ['), sw.indexOf('];', sw.indexOf('const SHELL = [')));
  const urls = [...shell.matchAll(/'([^']+)'/g)].map((m) => m[1]).filter((u) => u !== './' && !u.startsWith('?'));
  urls.forEach((u) => assert(fs.existsSync(path.join(ROOT, u)), 'precached file does not exist: ' + u));
  assert(urls.length > 20, 'shell looks too small: ' + urls.length);
});

test('service worker never caches Supabase responses', function () {
  const sw = read('sw.js');
  assert(sw.includes('isApiRequest'), 'api bypass missing');
  assert(sw.includes("hostname.endsWith('.supabase.co')"), 'supabase host not excluded');
  assert(sw.includes("request.method !== 'GET'"), 'non-GET requests are not skipped');
});

test('deploy rewrites the build placeholder inside sw.js', function () {
  const wf = read('.github/workflows/deploy.yml');
  assert(/sed -i "s\|\?v=dev\|\?v=\$\{SHA_SHORT\}\|g" sw\.js/.test(wf), 'deploy does not cache-bust sw.js');
});

test('every page wires up the PWA', function () {
  PAGES.forEach(function (p) {
    const s = read(p);
    assert(s.includes('rel="manifest"'), p + ': manifest link missing');
    assert(s.includes('name="theme-color"'), p + ': theme-color missing');
    assert(s.includes('rel="apple-touch-icon"'), p + ': apple-touch-icon missing');
    assert(s.includes('apple-mobile-web-app-capable'), p + ': iOS standalone meta missing');
    assert(s.includes('assets/js/pwa.js'), p + ': pwa.js not loaded');
    assert(s.includes('viewport-fit=cover'), p + ': viewport-fit=cover missing (safe areas)');
  });
});

test('offline fallback page exists and is self-contained', function () {
  const off = read('offline.html');
  assert(off.includes('assets/css/base.css'), 'offline page has no styling');
  assert(!/<script src=/.test(off), 'offline page must not depend on external scripts');
  assert(read('sw.js').includes("OFFLINE_URL = 'offline.html'"), 'sw does not use offline.html');
});

test('render-blocking scripts were moved out of <head>', function () {
  ['wiki.html', 'admin.html'].forEach(function (p) {
    const s = read(p);
    const head = s.slice(0, s.indexOf('</head>'));
    assert(!/<script src=/.test(head), p + ': still loads blocking scripts in <head>');
  });
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed ? 1 : 0);
