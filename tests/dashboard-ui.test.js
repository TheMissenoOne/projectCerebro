/**
 * dashboard.html — browser tests (Playwright, no network, no DB).
 * Serves the repo on an ephemeral port and swaps supabase-js for an in-page fake DB,
 * so the real page code AND the real api.js run against fixtures.
 *
 *   node tests/dashboard-ui.test.js
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { startServer } = require('./cerebro-ui.test.js');

const GM = { id: 'u-gm', email: 'gm@xavier.test', user_metadata: { role: 'gm', username: 'professorx', display_name: 'Charles' } };
const PLAYER = { id: 'u-p2', email: 'kurt@xavier.test', user_metadata: { role: 'player', username: 'kurt', display_name: 'Kurt' } };
const PARTY = { id: 'party-1', name: 'Turma Azul', gm_id: 'u-gm', code: 'XAV123' };

const KITTY = { id: 'pc-1', player_id: 'u-gm', party_id: 'party-1', name: 'Kitty Pryde', codename: 'Lince Negra', is_active: true,
  data: { nome: 'Kitty Pryde', codinome: 'Lince Negra', mutacao_ficha: 'Intangibilidade', temas: [{ nome: 'Fase' }, { nome: '' }, { nome: '' }] } };
const BLANK = { id: 'pc-2', player_id: 'u-gm', party_id: 'party-1', name: 'Novo Personagem', codename: '', is_active: true, data: {} };
const KURT = { id: 'pc-3', player_id: 'u-p2', party_id: 'party-1', name: 'Kurt Wagner', codename: 'Noturno', is_active: true, data: { temas: [{ nome: 'Teleporte' }, { nome: 'Circo' }] } };
const SIX = ['Scott Summers|Ciclope', 'Jean Grey|Fênix', 'Ororo Munroe|Tempestade', 'Hank McCoy|Fera', 'Bobby Drake|Homem de Gelo', 'Warren Worthington|Anjo']
  .map((s, i) => ({ id: 'six-' + i, player_id: 'u-p2', party_id: 'party-1', name: s.split('|')[0], codename: s.split('|')[1], is_active: true, data: { temas: [{ nome: 'A' }] } }));

/* in-page fake of supabase-js v2 (only what api.js uses) */
function fakeSupabase(o) {
  return `
(function(){
  var DB = ${JSON.stringify(o.db)};
  var user = ${JSON.stringify(o.user)};
  window.__inserts = [];
  window.__failChars = ${!!o.failChars};
  window.__holdCreate = ${!!o.holdCreate};
  window.__failMembers = ${!!o.failMembers};
  var session = { user: user, access_token: 'x' };
  function q(table){
    var st = { filters: [], single: false, op: 'select', payload: null };
    var chain = {
      select: function(){ return chain; }, order: function(){ return chain; }, limit: function(){ return chain; }, range: function(){ return chain; },
      eq: function(k,v){ st.filters.push([k,v]); return chain; }, in: function(k,v){ st.filters.push([k,v,'in']); return chain; },
      or: function(){ return chain; },
      single: function(){ st.single = true; return chain; },
      insert: function(p){ st.op='insert'; st.payload=p; return chain; }, update: function(p){ st.op='update'; st.payload=p; return chain; },
      delete: function(){ st.op='delete'; return chain; },
      then: function(res, rej){ return run().then(res, rej); }
    };
    function match(r){ return st.filters.every(function(f){ return f[2]==='in' ? f[1].indexOf(r[f[0]])!==-1 : String(r[f[0]])===String(f[1]); }); }
    function run(){
      var rows = DB[table] = DB[table] || [];
      if (table === 'characters' && st.op === 'select' && window.__failChars) return Promise.resolve({ data: null, error: { message: 'boom' } });
      if (table === 'party_members' && st.op === 'select' && window.__failMembers) return Promise.resolve({ data: null, error: { message: 'boom' } });
      if (st.op === 'insert') {
        window.__inserts.push({ table: table, payload: st.payload });
        if (table === 'party_members' && rows.some(function(r){ return r.party_id === st.payload.party_id && r.player_id === st.payload.player_id; }))
          return Promise.resolve({ data: null, error: { message: 'duplicate key', code: '23505' } });
        var n = Object.assign({ id: table + '-' + window.__inserts.length }, st.payload); rows.push(n);
        var out = { data: st.single ? n : [n], error: null };
        if (table === 'characters' && window.__holdCreate) return new Promise(function(r){ window.__releaseCreate = function(){ r(out); }; });
        return Promise.resolve(out);
      }
      var res = rows.filter(match).map(function(r){ return JSON.parse(JSON.stringify(r)); });
      if (st.single) return Promise.resolve(res.length ? { data: res[0], error: null } : { data: null, error: { message: 'not found', code: 'PGRST116' } });
      return Promise.resolve({ data: res, error: null });
    }
    return chain;
  }
  window.supabase = { createClient: function(){ return {
    from: q,
    auth: {
      getSession: function(){ return Promise.resolve({ data: { session: session }, error: null }); },
      onAuthStateChange: function(){ return { data: { subscription: { unsubscribe: function(){} } } }; },
      signOut: function(){ return Promise.resolve({ error: null }); }
    }
  }; } };
})();`;
}

function scenario(o = {}) {
  const user = o.user || GM;
  const chars = o.chars || [KITTY, BLANK, KURT];
  const withParty = o.party !== false;
  return {
    user, failChars: o.failChars, holdCreate: o.holdCreate, failMembers: o.failMembers,
    db: {
      characters: chars,
      parties: o.noParties ? [] : [PARTY],
      party_members: withParty ? [{ party_id: 'party-1', player_id: 'u-gm' }, { party_id: 'party-1', player_id: 'u-p2' }].filter(m => !o.members || o.members.includes(m.player_id)) : [],
      sessions: []
    }
  };
}

async function openDash(browser, base, o = {}) {
  const mobile = !!o.mobile;
  const ctx = await browser.newContext({
    viewport: o.viewport || (mobile ? { width: 390, height: 844 } : { width: 1280, height: 860 }),
    deviceScaleFactor: 1, hasTouch: mobile, isMobile: mobile, reducedMotion: o.reducedMotion || 'reduce'
  });
  const page = await ctx.newPage();
  page.__errors = [];
  page.on('pageerror', e => page.__errors.push(e.message));
  const sc = scenario(o);
  await page.addInitScript(([lang, recent]) => {
    if (sessionStorage.getItem('__init')) return;   // only on the first load: reloads keep what the page wrote
    sessionStorage.setItem('__init', '1');
    localStorage.clear();
    if (lang) localStorage.setItem('cerebro_idioma', lang);
    if (recent) localStorage.setItem('cerebro_recent_chars', JSON.stringify(recent));
  }, [o.lang || null, o.recent || null]);
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: fakeSupabase(sc) }));
  await page.route(/assets\/js\/pwa\.js/, r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  if (o.fontDir) {
    await page.route(/fonts\.googleapis\.com/, r => r.fulfill({ contentType: 'text/css', body: fs.readFileSync(path.join(o.fontDir, 'fonts.css'), 'utf8') }));
    await page.route(/fonts\.gstatic\.com/, r => {
      const f = path.join(o.fontDir, new URL(r.request().url()).pathname.slice(1).replace(/\//g, '_'));
      return fs.existsSync(f) ? r.fulfill({ contentType: 'font/woff2', body: fs.readFileSync(f) }) : r.abort();
    });
  } else {
    await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  }
  await page.goto(base + '/dashboard.html', { waitUntil: 'load' });
  await page.waitForFunction(() => !document.querySelector('#chars-list[aria-busy="true"]') && !document.querySelector('#party-state .is-loading'), null, { timeout: 8000 });
  if (o.fontDir) await page.evaluate(() => document.fonts.ready);
  return { ctx, page };
}

module.exports = { openDash, GM, PLAYER, KITTY, BLANK, KURT, SIX };

/* ── tests ── */
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
  const eq = (a, b, m) => assert(JSON.stringify(a) === JSON.stringify(b), m + ' — got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b));
  const txt = (p, s) => p.$eval(s, e => e.textContent.trim());
  const overflow = p => p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

  await test('GM desktop: name, role, access code, member names, single logout, GM entry', async () => {
    const { ctx, page } = await openDash(browser, base);
    eq(await txt(page, '#user-name'), 'Charles', 'user name');
    assert(/^BEM-VINDO,/i.test(await txt(page, '.dash-greeting')), 'greeting keeps its text');
    eq(await txt(page, '#party-code'), 'XAV123', 'access code');
    assert(await page.isVisible('#party-code'), 'code not visible');
    const members = await page.$$eval('#party-members .member-name', els => els.map(e => e.textContent.trim()));
    eq(members, ['Charles', 'Kurt Wagner'], 'member labels');
    const all = await page.$eval('#party-members', e => e.textContent);
    assert(!/\bMembro\b|u-gm|u-p2/.test(all), 'raw member label/id: ' + all);
    const logouts = await page.$$eval('button, a', els => els.filter(e => /sair|logout/i.test(e.textContent) && e.offsetParent !== null).length);
    eq(logouts, 1, 'visible logout controls');
    assert(await page.isVisible('#gm-panel-link'), 'GM panel link hidden for GM');
    eq(page.__errors, [], 'page errors');
    await ctx.close();
  });

  await test('copy code: one tap → clipboard + toast + button feedback', async () => {
    const { ctx, page } = await openDash(browser, base);
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: base });
    await page.click('#party-code-btn');
    await page.waitForSelector('#toast.show', { timeout: 2000 });
    assert(/XAV123/.test(await txt(page, '#toast')), 'toast text');
    assert(!(await page.$eval('#toast', e => e.classList.contains('err'))), 'toast is an error');
    eq(await txt(page, '#copy-lbl'), 'Copiado', 'button label');
    eq(await page.evaluate(() => navigator.clipboard.readText()), 'XAV123', 'clipboard');
    const c = await page.$eval('#toast', e => [getComputedStyle(e).color, getComputedStyle(e).backgroundColor]);
    eq(c[0], 'rgb(8, 8, 8)', 'toast text is dark on accent');
    await ctx.close();
  });

  await test('card is a keyboard link to the right sheet; last opened comes first as "continue"', async () => {
    const { ctx, page } = await openDash(browser, base);
    const cards = await page.$$eval('#chars-list a.char-card', els => els.map(e => [e.dataset.id, e.getAttribute('href'), e.tabIndex]));
    eq(cards.map(c => c[0]), ['pc-1', 'pc-2'], 'own characters only, API order');
    eq(cards[1][1], 'ficha.html?id=pc-2', 'href');
    assert(cards.every(c => c[2] === 0), 'cards not in tab order');
    await page.focus('#chars-list a.char-card[data-id="pc-2"]');
    await Promise.all([page.waitForURL(/ficha\.html\?id=pc-2$/, { timeout: 5000 }), page.keyboard.press('Enter')]);
    await page.goto(base + '/dashboard.html');
    await page.waitForSelector('#chars-list a.char-card');
    const first = await page.$eval('#chars-list a.char-card', e => [e.dataset.id, e.classList.contains('is-last'), e.textContent]);
    eq(first[0], 'pc-2', 'last opened first');
    assert(first[1] && /Continuar/i.test(first[2]), 'continue affordance');
    await ctx.close();
  });

  await test('390×844 with 6 sheets: ≥3 cards fully above the fold, cards ≥44px, no overflow', async () => {
    const { ctx, page } = await openDash(browser, base, { mobile: true, user: PLAYER, chars: SIX });
    const rects = await page.$$eval('#chars-list a.char-card', els => els.map(e => e.getBoundingClientRect()).map(r => [r.top, r.bottom, r.height]));
    eq(rects.length, 6, 'cards');
    const above = rects.filter(r => r[1] <= 844).length;
    assert(above >= 3, 'only ' + above + ' cards above the fold');
    assert(rects.every(r => r[2] >= 44), 'card height ' + rects.map(r => r[2]));
    eq(await overflow(page), 0, 'horizontal overflow');
    await ctx.close();
  });

  await test('new sheet: busy state, fires once, then opens the created sheet', async () => {
    const { ctx, page } = await openDash(browser, base, { holdCreate: true });
    await page.click('#new-char-btn');
    eq(await page.$eval('#new-char-btn', e => [e.disabled, e.getAttribute('aria-busy'), e.textContent.trim()]), [true, 'true', 'Criando…'], 'busy button');
    await page.evaluate(() => { document.getElementById('new-char-btn').click(); document.querySelector('#toolbar-container a[href*="new=true"]').click(); });
    await page.waitForTimeout(150);
    eq(await page.evaluate(() => window.__inserts.filter(i => i.table === 'characters').length), 1, 'character inserts');
    eq(await page.evaluate(() => window.__inserts[0].payload.party_id), 'party-1', 'same party rule as ficha');
    await Promise.all([page.waitForURL(/ficha\.html\?id=characters-1$/, { timeout: 5000 }), page.evaluate(() => window.__releaseCreate())]);
    eq(await page.evaluate(() => JSON.parse(localStorage.getItem('cerebro_recent_chars'))[0]), 'characters-1', 'new sheet remembered');
    await ctx.close();
  });

  await test('new sheet: failed party lookup creates nothing, shows the error; retry re-checks the party, then creates once with it', async () => {
    const { ctx, page } = await openDash(browser, base, { user: PLAYER, failMembers: true, holdCreate: true });
    assert(await page.isVisible('#party-state .state-msg.is-error'), 'party load error shown');
    await page.click('#new-char-btn');
    await page.waitForSelector('#create-state .state-msg.is-error', { timeout: 3000 });
    eq(await page.evaluate(() => window.__inserts.filter(i => i.table === 'characters').length), 0, 'no insert while membership is unknown');
    assert(/nenhuma ficha foi criada/.test(await txt(page, '#create-state')), 'translated error: ' + await txt(page, '#create-state'));
    eq(await page.getAttribute('#create-state .state-msg', 'role'), 'alert', 'announced');
    eq(await page.evaluate(() => document.activeElement.closest('#create-state') !== null), true, 'focus on retry');
    eq(await page.$eval('#new-char-btn', e => [e.disabled, e.getAttribute('aria-busy')]), [false, null], 'create button restored');
    await page.evaluate(() => { window.__failMembers = false; });
    await page.click('#create-state button');
    await page.waitForFunction(() => window.__releaseCreate, null, { timeout: 3000 });
    await page.waitForTimeout(100);
    const ins = await page.evaluate(() => window.__inserts.filter(i => i.table === 'characters').map(i => i.payload.party_id));
    eq(ins, ['party-1'], 'exactly one insert, carrying the party id');
    eq(await page.$$eval('#create-state .is-error', e => e.length), 0, 'error cleared on retry');
    eq(page.__errors, [], 'page errors');
    await Promise.all([page.waitForURL(/ficha\.html\?id=characters-1$/, { timeout: 5000 }), page.evaluate(() => window.__releaseCreate())]);
    await ctx.close();
  });

  await test('player with no sheets and no party: empty state with create; join validates and joins', async () => {
    const { ctx, page } = await openDash(browser, base, { user: PLAYER, chars: [], party: false });
    assert(await page.isVisible('.empty-state #new-char-btn'), 'empty state create button');
    eq(await page.$$eval('#chars-list a.char-card', e => e.length), 0, 'no cards');
    assert(await page.isVisible('#party-none'), 'no-party state');
    assert(!(await page.isVisible('#gm-panel-link')), 'GM entry shown to a player');
    await page.click('#join-party-btn');
    assert(await page.evaluate(() => document.activeElement.id === 'party-code-input'), 'focus in code input');
    await page.fill('#party-code-input', 'ab');
    await page.click('#confirm-join-party');
    assert(/6/.test(await txt(page, '#party-code-err')), 'invalid code error');
    await page.fill('#party-code-input', 'zzz999');
    await page.click('#confirm-join-party');
    await page.waitForFunction(() => /ENCONTRADA/i.test(document.getElementById('party-code-err').textContent));
    await page.fill('#party-code-input', 'xav123');
    await page.click('#confirm-join-party');
    await page.waitForSelector('#party-info:not([hidden])', { timeout: 3000 });
    eq(await txt(page, '#party-code'), 'XAV123', 'joined party code');
    assert(!(await page.isVisible('#join-party-modal')), 'modal closed');
    assert(await page.evaluate(() => document.activeElement.id === 'join-party-btn' || document.activeElement === document.body), 'focus returned');
    await page.waitForFunction(() => document.querySelectorAll('#party-members .member').length === 2);
    const names = await page.$$eval('#party-members .member-name', els => els.map(e => e.textContent.trim()));
    eq(names, ['Mestre da party', 'Kurt'], 'members after join (GM without sheets, me)');
    eq(page.__errors, [], 'page errors');
    await ctx.close();
  });

  await test('GM creates a party (not a party_members row) and sees it with its code', async () => {
    const { ctx, page } = await openDash(browser, base, { party: false, noParties: true, chars: [KITTY] });
    await page.click('#create-party-btn');
    await page.click('#confirm-create-party');
    assert(await page.isVisible('#party-name-err'), 'empty name error');
    await page.keyboard.press('Escape');
    assert(!(await page.isVisible('#create-party-modal')), 'Esc closes');
    await page.click('#create-party-btn');
    await page.fill('#party-name-input', 'Novos Mutantes');
    await page.keyboard.press('Enter');
    await page.waitForSelector('#party-info:not([hidden])', { timeout: 3000 });
    eq(await txt(page, '#party-name'), 'Novos Mutantes', 'party name');
    assert(/^[A-Z0-9]{6}$/.test(await txt(page, '#party-code')), 'code shown');
    await ctx.close();
    // on the next visit the party comes from getGMParty (the GM has no party_members row)
    const r = await openDash(browser, base, { members: ['u-p2'] });
    eq(await txt(r.page, '#party-code'), 'XAV123', 'GM-run party shown without membership row');
    const names = await r.page.$$eval('#party-members .member-name', els => els.map(e => e.textContent.trim()));
    eq(names, ['Charles', 'Kurt Wagner'], 'GM listed even without a membership row');
    await r.ctx.close();
  });

  await test('load error: error state with retry that recovers', async () => {
    const { ctx, page } = await openDash(browser, base, { failChars: true });
    assert(await page.isVisible('#chars-state .state-msg.is-error'), 'error state');
    assert(/carregar/i.test(await txt(page, '#chars-state')), 'error text');
    await page.evaluate(() => { window.__failChars = false; });
    await page.click('#chars-state button');
    await page.waitForSelector('#chars-list a.char-card', { timeout: 3000 });
    eq(await page.$$eval('#chars-state .is-error', e => e.length), 0, 'error cleared');
    await ctx.close();
  });

  await test('language: en renders translated, switching from pt-BR reloads in en, no raw keys', async () => {
    const { ctx, page } = await openDash(browser, base);
    await Promise.all([page.waitForEvent('load'), page.click('#lang-toggle-btn')]);
    await page.waitForSelector('#chars-list a.char-card');
    await page.waitForFunction(() => !document.querySelector('#party-state .is-loading'));
    eq(await txt(page, '#chars-title'), 'Characters', 'section title');
    assert(/^Welcome,/i.test(await txt(page, '.dash-greeting')), 'greeting');
    eq(await txt(page, '#user-name'), 'Charles', 'name kept after translation');
    const body = await page.evaluate(() => document.body.innerText);
    assert(!/\bdash\.[a-zA-Z]/.test(body), 'raw key in page');
    assert(/members/i.test(await txt(page, '#party-meta')), 'meta in en');
    await ctx.close();
  });

  for (const w of [360, 390]) {
    await test(`no horizontal overflow at ${w}px (6 sheets, party, join modal)`, async () => {
      const { ctx, page } = await openDash(browser, base, { mobile: true, viewport: { width: w, height: 780 }, user: PLAYER, chars: [KITTY, KURT].concat(SIX) });
      eq(await overflow(page), 0, 'page overflow');
      const sizes = await page.$$eval('#chars-list .char-name, #party-members .member-name, .party-code-val', els => els.map(e => parseFloat(getComputedStyle(e).fontSize)));
      assert(sizes.length > 8 && sizes.every(s => s >= 12), 'small text ' + sizes);
      await page.evaluate(() => document.getElementById('join-party-btn').click());
      eq(await overflow(page), 0, 'modal overflow');
      await ctx.close();
    });
  }

  await browser.close();
  srv.close();
  console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
  process.exit(failed ? 1 : 0);
})();
