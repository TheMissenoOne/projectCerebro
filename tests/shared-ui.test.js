/**
 * Shared chrome + primitives (header.js, base/components/mobile.css) — browser tests
 * (Playwright, no network, no DB). Serves the repo on an ephemeral port and swaps supabase-js
 * for an in-page fake DB, so the real page code and the real api.js run against fixtures.
 *
 *   node tests/shared-ui.test.js
 */
const { chromium } = require('playwright');
const { startServer } = require('./cerebro-ui.test.js');

const THEMES = ['yellow', 'red', 'green', 'purple', 'blue'];

/* in-page fake of supabase-js v2: a GM with one party and an active encounter ({ noParty } = no party yet) */
function fakeSupabase(o) {
  return `(function(){
  var DB = {
    characters: [{ id: 'pc-1', player_id: 'u-gm', party_id: 'party-1', name: 'Kitty Pryde', codename: 'Lince Negra', is_active: true, data: { nome: 'Kitty Pryde' } }],
    npcs: [], profiles: [],
    parties: ${o.noParty ? '[]' : "[{ id: 'party-1', name: 'Turma Azul', gm_id: 'u-gm', code: 'XAV123' }]"},
    party_members: ${o.noParty ? '[]' : "[{ party_id: 'party-1', player_id: 'u-gm' }]"},
    sessions: [{ id: 's-1', party_id: 'party-1', round: 2, notes: '', encounter: ['active'], created_at: '2026-11-01' }]
  };
  var user = { id: 'u-gm', email: 'gm@xavier.test', user_metadata: { role: 'gm', username: 'professorx' } };
  var session = { user: user, access_token: 'x' };
  function q(table){
    var st = { f: [], single: false, op: 'select', p: null };
    var c = {
      select: function(){ return c; }, order: function(){ return c; }, limit: function(){ return c; }, range: function(){ return c; },
      eq: function(k,v){ st.f.push([k,v]); return c; }, in: function(k,v){ st.f.push([k,v,1]); return c; },
      or: function(){ return c; }, ilike: function(){ return c; }, neq: function(){ return c; },
      single: function(){ st.single = true; return c; }, maybeSingle: function(){ st.single = true; return c; },
      insert: function(p){ st.op = 'insert'; st.p = p; return c; }, update: function(p){ st.op = 'update'; st.p = p; return c; },
      upsert: function(p){ st.op = 'upsert'; st.p = p; return c; }, delete: function(){ st.op = 'delete'; return c; },
      then: function(res, rej){ return Promise.resolve(run()).then(res, rej); }
    };
    function hit(r){ return st.f.every(function(f){ return f[2] ? f[1].indexOf(r[f[0]]) !== -1 : String(r[f[0]]) === String(f[1]); }); }
    function run(){
      var rows = DB[table] = DB[table] || [];
      if (st.op !== 'select') return { data: st.single ? st.p : [st.p], error: null };
      var out = rows.filter(hit).map(function(r){ return JSON.parse(JSON.stringify(r)); });
      if (st.single) return out.length ? { data: out[0], error: null } : { data: null, error: { message: 'not found', code: 'PGRST116' } };
      return { data: out, error: null };
    }
    return c;
  }
  window.supabase = { createClient: function(){ return {
    from: q,
    auth: {
      getSession: function(){ return Promise.resolve({ data: { session: session }, error: null }); },
      getUser: function(){ return Promise.resolve({ data: { user: user }, error: null }); },
      onAuthStateChange: function(cb){ setTimeout(function(){ cb('INITIAL_SESSION', session); }, 20); return { data: { subscription: { unsubscribe: function(){} } } }; },
      signOut: function(){ return Promise.resolve({ error: null }); }
    }
  }; } };
})();`;
}

async function open(browser, base, url, o = {}) {
  const ctx = await browser.newContext({
    viewport: o.viewport || { width: 1280, height: 860 }, deviceScaleFactor: 1,
    hasTouch: !!o.touch, isMobile: !!o.mobile, reducedMotion: 'reduce'
  });
  const page = await ctx.newPage();
  page.__errors = [];
  page.on('pageerror', e => page.__errors.push(e.message));
  await page.addInitScript(lang => { localStorage.clear(); if (lang) localStorage.setItem('cerebro_idioma', lang); }, o.lang || null);
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: fakeSupabase(o) }));
  await page.route(/assets\/js\/pwa\.js/, r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.goto(base + '/' + url, { waitUntil: 'load' });
  await page.waitForSelector('#header-container .header');
  return { ctx, page };
}

/* WCAG contrast of an element's text against its own background (or the first opaque ancestor's) */
function contrastOf(page, sel) {
  return page.$eval(sel, el => {
    const rgb = s => (s.match(/[\d.]+/g) || []).map(Number);
    const lum = c => { const v = c.slice(0, 3).map(x => { x /= 255; return x <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }); return .2126 * v[0] + .7152 * v[1] + .0722 * v[2]; };
    let bgEl = el;
    while (bgEl && (rgb(getComputedStyle(bgEl).backgroundColor)[3] === 0)) bgEl = bgEl.parentElement;
    const cs = getComputedStyle(el);
    const fg = lum(rgb(cs.color)), bg = lum(rgb(bgEl ? getComputedStyle(bgEl).backgroundColor : 'rgb(0,0,0)'));
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight, 10) >= 700;
    return { ratio: (Math.max(fg, bg) + .05) / (Math.min(fg, bg) + .05), large: size >= 24 || (bold && size >= 18.66), size, color: cs.color };
  });
}

/* every control in the open dialog is reachable the way a user can: the dialog fits the viewport, and
   scrolling the dialog itself (page scroll is locked by body.modal-open) brings each control under the pointer */
async function assertReachable(page, dialogSel, assert, label) {
  const res = await page.$eval(dialogSel, d => {
    const r = d.getBoundingClientRect();
    if (r.top < -0.5 || r.bottom > innerHeight + 0.5) return 'dialog overflows the viewport: ' + Math.round(r.top) + '..' + Math.round(r.bottom) + ' of ' + innerHeight;
    const els = [...d.querySelectorAll('button, input, select, textarea, a[href]')].filter(e => e.getClientRects().length);
    if (!els.length) return 'no controls';
    for (const el of els) {
      const er = el.getBoundingClientRect();
      d.scrollTop += (er.top + er.height / 2) - (r.top + r.height / 2);
      const e2 = el.getBoundingClientRect();
      const hit = document.elementFromPoint(e2.left + e2.width / 2, e2.top + e2.height / 2);
      if (!hit || !(hit === el || el.contains(hit))) return 'unreachable: ' + (el.id || el.textContent.trim() || el.tagName);
    }
    return '';
  });
  assert(!res, label + ' ' + dialogSel + ': ' + res);
}

if (require.main === module) (async () => {
  const srv = await startServer();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch();
  let passed = 0, failed = 0;
  async function test(name, fn) {
    try { await fn(); console.log('✅ ' + name); passed++; }
    catch (e) { console.log('❌ ' + name + ': ' + e.message.split('\n')[0]); failed++; }
  }
  function assert(c, m) { if (!c) throw new Error(m); }

  await test('toast and toast.err text reach 4.5:1 in all 5 themes', async () => {
    const { ctx, page } = await open(browser, base, 'dashboard.html');
    const bad = [];
    for (const th of THEMES) {
      await page.evaluate(th => window.setTheme(th, true), th);
      for (const err of [false, true]) {
        await page.evaluate(err => { const el = document.getElementById('toast'); el.textContent = 'SALVO'; el.className = 'toast show' + (err ? ' err' : ''); }, err);
        const c = await contrastOf(page, '#toast');
        if (c.ratio < 4.5) bad.push(th + (err ? '.err ' : ' ') + c.ratio.toFixed(2));
      }
    }
    await ctx.close();
    assert(!bad.length, 'below 4.5:1: ' + bad.join(', '));
  });

  await test('.empty-title text contrast meets its WCAG threshold', async () => {
    const { ctx, page } = await open(browser, base, 'dashboard.html');
    await page.evaluate(() => document.querySelector('main').insertAdjacentHTML('afterbegin', '<div class="empty-state" id="__es"><div class="empty-title stencil">NENHUM NPC</div></div>'));
    const c = await contrastOf(page, '#__es .empty-title');
    await ctx.close();
    assert(c.ratio >= (c.large ? 3 : 4.5), c.ratio.toFixed(2) + ':1 at ' + c.size + 'px');
  });

  await test('compact modals fit 640×240 (and 640×180) with every control reachable by scrolling the dialog', async () => {
    for (const height of [240, 180]) {
      const vp = { viewport: { width: 640, height }, touch: true, mobile: true };
      let r = await open(browser, base, 'dashboard.html', Object.assign({ noParty: true }, vp));
      await r.page.waitForSelector('#join-party-btn:not([hidden])');
      await r.page.click('#join-party-btn');
      await r.page.waitForSelector('#join-party-modal.open');
      await r.page.$eval('#join-party-form', f => f.requestSubmit());   // empty code → inline error makes it taller
      await assertReachable(r.page, '#join-party-form', assert, '640×' + height);
      await r.ctx.close();

      r = await open(browser, base, 'admin.html?tab=encounter', vp);
      await r.page.click('[data-act="enc-toggle"]');
      await r.page.waitForSelector('#confirm-bg.open');
      await assertReachable(r.page, '#confirm-bg .modal', assert, '640×' + height);
      await r.ctx.close();
    }
  });

  await test('theme buttons are ≥44px under a coarse pointer at 1024px (28px with a mouse)', async () => {
    const size = async touch => {
      const { ctx, page } = await open(browser, base, 'dashboard.html', { viewport: { width: 1024, height: 768 }, touch });
      const s = await page.$$eval('#theme-switcher .theme-dot', ds => ds.map(d => { const r = d.getBoundingClientRect(); return Math.min(r.width, r.height); }));
      const docW = await page.evaluate(() => document.documentElement.scrollWidth);
      await ctx.close();
      return { min: Math.min(...s), n: s.length, docW };
    };
    const coarse = await size(true), fine = await size(false);
    assert(coarse.n === 5 && coarse.min >= 44, 'coarse: ' + JSON.stringify(coarse));
    assert(coarse.docW <= 1024, 'header overflows at 1024: ' + coarse.docW);
    assert(fine.min === 28, 'fine pointer changed: ' + JSON.stringify(fine));
  });

  await test('header titles and subtitles are translated in en', async () => {
    const want = {
      'dashboard.html': ['X-MEN', 'TTRPG // DASHBOARD'],
      'combate.html': ['COMBAT', 'CALCULATOR // MEGS SYSTEM'],
      'admin.html': ['X-MEN', 'GM PANEL'],
      'wiki.html': ['X-MEN', 'TTRPG // WIKI']
    };
    for (const [url, [title, sub]] of Object.entries(want)) {
      const { ctx, page } = await open(browser, base, url, { lang: 'en' });
      const got = await page.evaluate(() => [document.querySelector('#header-container .hdr-title > :first-child').textContent, document.querySelector('#header-container .hdr-sub').textContent]);
      await ctx.close();
      assert(got[0] === title && got[1] === sub, url + ': ' + JSON.stringify(got));
    }
  });

  await test('exactly one h1 on dashboard, combate, wiki and admin', async () => {
    for (const [url, ready] of [['dashboard.html', '#header-container'], ['combate.html', '#header-container'], ['wiki.html', '#wiki-content h1'], ['admin.html', '#party-name']]) {
      const { ctx, page } = await open(browser, base, url);
      await page.waitForSelector(ready);
      const h1s = await page.$$eval('h1', hs => hs.map(h => h.textContent.trim().slice(0, 30)));
      const errs = page.__errors.slice();
      await ctx.close();
      assert(h1s.length === 1, url + ': ' + JSON.stringify(h1s));
      assert(!errs.length, url + ' page errors: ' + errs.join(' | '));
    }
  });

  await browser.close();
  srv.close();
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})();
