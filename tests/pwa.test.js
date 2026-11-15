/**
 * X-MEN TTRPG - PWA wiring tests (node-only, sem browser)
 * Garante que manifest, service worker e as meta tags continuam presentes
 * em todas as páginas.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

// offline.html cannot load i18n.js, so it carries its own dictionary; this keeps it from drifting
test('offline page dictionary covers every app language with the same keys', function () {
  const off = read('offline.html');
  const T = vm.runInNewContext('(' + off.match(/var T = (\{[\s\S]*?\n {6}\});/)[1] + ')');
  const LANGUAGES = vm.runInNewContext('(' + read('assets/js/i18n.js').match(/const LANGUAGES = (\{[\s\S]*?\n\});/)[1] + ')');
  const KEYS = ['code', 'title', 'lead', 'ok1', 'ok2', 'no1', 'wait', 'still', 'retry', 'combat', 'doc', 'other', 'otherName', 'otherLabel'].sort();
  const langs = Object.keys(T);
  assert(JSON.stringify(langs.slice().sort()) === JSON.stringify(Object.keys(LANGUAGES).sort()),
    'offline languages ' + langs + ' != i18n.js LANGUAGES ' + Object.keys(LANGUAGES));
  langs.forEach(function (l) {
    assert(JSON.stringify(Object.keys(T[l]).sort()) === JSON.stringify(KEYS), l + ': keys drifted: ' + Object.keys(T[l]).sort());
    Object.keys(T[l]).forEach(function (k) { assert(typeof T[l][k] === 'string' && T[l][k].trim(), l + '.' + k + ' empty'); });
    assert(langs.includes(T[l].other) && T[l].other !== l, l + ': "other" must name another offline language');
  });
  (off.match(/data-k="[^"]+"/g) || []).forEach(function (a) {
    const k = a.slice(8, -1);
    assert(KEYS.includes(k), 'data-k="' + k + '" has no translation');
  });
});

test('render-blocking scripts were moved out of <head>', function () {
  ['wiki.html', 'admin.html'].forEach(function (p) {
    const s = read(p);
    const head = s.slice(0, s.indexOf('</head>'));
    assert(!/<script src=/.test(head), p + ': still loads blocking scripts in <head>');
  });
});

/* ── comportamento do sw.js num sandbox: caches e fetch falsos ─────────────── */

function loadSW(fetchImpl) {
  const stores = {};
  const open = (name) => {
    stores[name] = stores[name] || new Map();
    const m = stores[name];
    return {
      match: (req) => Promise.resolve(m.get(req.url || req)),
      put: (req, res) => { m.set(req.url || req, res); return Promise.resolve(); },
      add: () => Promise.resolve(),
    };
  };
  const caches = {
    open: (name) => Promise.resolve(open(name)),
    match: (req) => Promise.resolve(Object.values(stores).map((m) => m.get(req.url || req)).find(Boolean)),
    keys: () => Promise.resolve(Object.keys(stores)),
  };
  const listeners = {};
  const self = {
    location: { origin: 'https://app.test' },
    addEventListener: (t, fn) => { listeners[t] = fn; },
    skipWaiting() {},
    clients: { claim: () => Promise.resolve() },
  };
  vm.runInNewContext(read('sw.js'), { self, caches, fetch: fetchImpl, URL, Request: function (u) { this.url = u; }, console });
  return {
    stores,
    shell: (url, res) => open('cerebro-shell-dev').put(url, res),
    fetch(url, mode) {
      let responded = null;
      listeners.fetch({ request: { url, method: 'GET', mode: mode || 'no-cors' }, respondWith: (p) => { responded = p; } });
      return responded;
    },
  };
}

const swTests = [];
function swTest(name, fn) { swTests.push([name, fn]); }

swTest('offline: a precached asset is served even though it never hit the runtime cache', async function () {
  const sw = loadSW(() => Promise.reject(new TypeError('offline')));
  const js = { ok: true, type: 'basic', body: 'header' };
  await sw.shell('https://app.test/assets/js/header.js?v=dev', js);
  const res = await sw.fetch('https://app.test/assets/js/header.js?v=dev');
  assert(res === js, 'precached shell asset not served offline');
});

swTest('opaque CDN responses (Google Fonts CSS, supabase-js without crossorigin) are cached', async function () {
  const opaque = { ok: false, status: 0, type: 'opaque', clone() { return this; } };
  const sw = loadSW(() => Promise.resolve(opaque));
  const url = 'https://fonts.googleapis.com/css2?family=Oswald&display=swap';
  await sw.fetch(url);
  await new Promise((r) => setTimeout(r, 0));
  assert(sw.stores['cerebro-cdn-dev'] && sw.stores['cerebro-cdn-dev'].get(url) === opaque, 'opaque font CSS not cached');
});

swTest('failed same-origin responses are not cached', async function () {
  const notFound = { ok: false, status: 404, type: 'basic', clone() { return this; } };
  const sw = loadSW(() => Promise.resolve(notFound));
  await sw.fetch('https://app.test/missing.js');
  await new Promise((r) => setTimeout(r, 0));
  assert(!(sw.stores['cerebro-runtime-dev'] || new Map()).size, '404 was cached');
});

swTest('Supabase requests never reach the SW cache', async function () {
  const sw = loadSW(() => Promise.reject(new Error('should not fetch')));
  assert(sw.fetch('https://abc.supabase.co/rest/v1/characters', 'cors') === null, 'supabase request was intercepted');
});

/* ── pwa.js: primeira instalação não recarrega; atualização recarrega ─────── */

swTest('first SW claim warms the cache instead of reloading; a real update reloads', async function () {
  const handlers = {};
  const fetched = [];
  let reloads = 0;
  let drained = 0;
  const css = '/* cyrillic */\n@font-face { src: url(https://fonts.gstatic.com/c.woff2); }\n' +
    '/* latin */\n@font-face { src: url(https://fonts.gstatic.com/l.woff2) format("woff2"); }\n';
  const win = {
    addEventListener: (t, fn) => { if (t === 'load') fn(); },
    matchMedia: () => ({ matches: false }),
    navigator: {
      onLine: true,
      serviceWorker: {
        controller: null,
        register: () => new Promise(() => {}),
        addEventListener: (t, fn) => { handlers[t] = fn; },
      },
    },
  };
  win.window = win;
  vm.runInNewContext(read('assets/js/pwa.js'), Object.assign(win, {
    location: { protocol: 'https:', hostname: 'app.test', origin: 'https://app.test', reload: () => reloads++ },
    document: { readyState: 'complete', documentElement: { classList: { toggle() {} } } },
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    performance: { getEntriesByType: () => [
      { name: 'https://fonts.googleapis.com/css2?family=Oswald' },
      { name: 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2' },
      { name: 'https://app.test/icons/x.svg' },
      { name: 'https://abc.supabase.co/auth/v1/user' },
    ] },
    fetch: (u) => {
      fetched.push(u);
      const drain = (v) => () => { drained++; return Promise.resolve(v); };
      return Promise.resolve({ text: drain(css), blob: drain(null) });
    },
    console,
  }));
  handlers.controllerchange();
  await new Promise((r) => setTimeout(r, 0));
  assert(reloads === 0, 'first install reloaded the page');
  ['https://fonts.googleapis.com/css2?family=Oswald', 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
    'https://app.test/icons/x.svg', 'https://fonts.gstatic.com/l.woff2'].forEach((u) => assert(fetched.includes(u), 'not warmed: ' + u));
  assert(!fetched.some((u) => u.includes('supabase.co')), 'warm-up hit the Supabase API');
  assert(!fetched.includes('https://fonts.gstatic.com/c.woff2'), 'warm-up pulled non-latin font subsets');
  await new Promise((r) => setTimeout(r, 0));
  assert(drained === fetched.length, 'warm-up left response bodies unread (stream stays open, breaks networkidle)');
  handlers.controllerchange();
  assert(reloads === 1, 'an update did not reload the page');
});

(async function () {
  for (const [name, fn] of swTests) {
    try {
      await fn();
      console.log('✅ ' + name);
      passed++;
    } catch (e) {
      console.log('❌ ' + name + ': ' + e.message);
      failed++;
    }
  }
  console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
  process.exit(failed ? 1 : 0);
})();
