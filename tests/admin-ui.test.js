/**
 * admin.html (GM panel) — browser regression tests (Playwright, no network, no DB).
 * Runs the REAL page code and the REAL assets/js/api.js against an in-page fake supabase-js
 * that mimics PostgREST upsert semantics (merge on the conflict key, only the sent columns change).
 *
 *   node tests/admin-ui.test.js
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { startServer } = require('./cerebro-ui.test.js');

const P1 = '7f1c2d3e-0000-4000-8000-00000000a001'; // player ids are uuids in prod: they must never be shown
const P2 = '7f1c2d3e-0000-4000-8000-00000000a002';
const CHARS = [
  { id: 'c1111111-1111-4111-8111-111111111111', player_id: P1, party_id: 'party-1', name: 'Kitty Pryde', codename: 'Lince Negra',
    data: { jogador: 'Ana', membros: [{ nome: 'Colossus', apoio: 3, antagonismo: 1 }, { nome: 'c2222222-2222-4222-8222-222222222222', apoio: 2 }] } },
  { id: 'c2222222-2222-4222-8222-222222222222', player_id: P2, party_id: 'party-1', name: null, codename: null,
    data: { nome: 'Kurt Wagner', codinome: 'Noturno', membros: [{ nome: 'ffffffff-0000-4000-8000-000000000000', antagonismo: 2 }] } },
  { id: 'c3333333-3333-4333-8333-333333333333', player_id: P1, party_id: 'party-1', name: 'Novo Personagem', codename: '', data: {} }
];
const SESSION = { id: 's-1', party_id: 'party-1', notes: 'Sessão 4: Sentinelas em Genosha.', encounter: ['active'], round: 4, created_at: '2026-11-01' };

function fakeSupabase(o) {
  return `(function(){
  var DB = { characters: ${JSON.stringify(o.emptyChars ? [] : CHARS)},
    parties: ${JSON.stringify(o.noParty ? [] : [{ id: 'party-1', name: 'Turma Azul', gm_id: 'u-gm', code: 'XAV123' }])},
    sessions: ${JSON.stringify(o.noSession ? [] : [SESSION])} };
  window.__db = DB; window.__writes = []; window.__fail = ${JSON.stringify(o.fail || {})}; window.__hold = null;
  var user = { id: 'u-gm', email: 'gm@x.test', user_metadata: { role: ${JSON.stringify(o.role || 'gm')} } };
  function q(table){
    var st = { op: 'select', f: [], single: false };
    var c = {
      select: function(){ return c; }, order: function(){ return c; }, limit: function(){ return c; }, range: function(){ return c; },
      eq: function(k,v){ st.f.push(function(r){ return String(r[k]) === String(v); }); return c; },
      in: function(k,v){ st.f.push(function(r){ return v.indexOf(r[k]) !== -1; }); return c; },
      or: function(){ return c; }, single: function(){ st.single = true; return c; },
      upsert: function(row, opt){ st.op = 'upsert'; st.row = row; st.opt = opt || {}; return c; },
      update: function(p){ st.op = 'update'; st.row = p; return c; }, delete: function(){ st.op = 'delete'; return c; },
      then: function(res, rej){
        var go = function(){ return run(); };
        var p = (st.op === 'upsert' && window.__hold) ? new Promise(function(r){ window.__release = function(){ r(); }; }).then(go) : Promise.resolve().then(go);
        // __holdRead: a sessions read snapshots the row when issued but answers only on __releaseRead() (slow network read);
        // several held reads are released oldest first. __readsOpen/__readsMax: concurrent session reads.
        var sRead = st.op === 'select' && table === 'sessions';
        if (sRead && window.__holdRead) {
          var snap = run(), q = window.__readQ = window.__readQ || [];
          p = new Promise(function(r){ q.push(function(){ r(snap); }); });
          window.__releaseRead = function(){ var f = q.shift(); if (f) f(); };
        }
        if (sRead) {
          window.__readsOpen = (window.__readsOpen || 0) + 1;
          window.__readsMax = Math.max(window.__readsMax || 0, window.__readsOpen);
          p = p.then(function(v){ window.__readsOpen--; return v; });
        }
        return p.then(res, rej);
      }
    };
    function run(){
      var f = window.__fail[table + ':' + st.op] || (st.op === 'select' && window.__fail[table]);
      if (st.op !== 'select') window.__writes.push({ table: table, op: st.op, row: JSON.parse(JSON.stringify(st.row || null)), opt: st.opt });
      if (f) return { data: null, error: { message: 'Failed to fetch' } };
      var rows = DB[table];
      var hit = function(r){ return st.f.every(function(fn){ return fn(r); }); };
      if (st.op === 'delete') { DB[table] = rows.filter(function(r){ return !hit(r); }); return { data: null, error: null }; }
      if (st.op === 'upsert') { // PostgREST: conflict target = onConflict or the PK; merge only sent columns
        var key = st.opt.onConflict || 'id';
        var r = rows.filter(function(x){ return st.row[key] !== undefined && x[key] === st.row[key]; })[0];
        if (!r && rows.some(function(x){ return x.party_id === st.row.party_id; })) return { data: null, error: { code: '23505', message: 'duplicate key' } };
        if (!r) { r = { id: 's-new', round: 0, encounter: [], notes: null }; rows.push(r); }
        Object.keys(st.row).forEach(function(k){ r[k] = st.row[k]; });
        return { data: JSON.parse(JSON.stringify(r)), error: null };
      }
      var out = rows.filter(hit).map(function(r){ return JSON.parse(JSON.stringify(r)); });
      if (st.single) return out.length ? { data: out[0], error: null } : { data: null, error: { code: 'PGRST116', message: 'no rows' } };
      return { data: out, error: null };
    }
    return c;
  }
  var session = { user: user, access_token: 'x' };
  window.supabase = { createClient: function(){ return { from: q, auth: {
    getSession: function(){ return Promise.resolve({ data: { session: session }, error: null }); },
    getUser: function(){ return Promise.resolve({ data: { user: user }, error: null }); },
    onAuthStateChange: function(){ return { data: { subscription: { unsubscribe: function(){} } } }; },
    signOut: function(){ return Promise.resolve({ error: null }); } } }; } };
})();`;
}

async function openAdmin(browser, base, o = {}) {
  const mobile = !!o.mobile;
  // SHOTS: pixel-stable screenshots (no one-shot animations); FONT_DIR: optional local copy of the Google fonts
  const ctx = await browser.newContext({ viewport: o.viewport || (mobile ? { width: 390, height: 844 } : { width: 1280, height: 860 }), hasTouch: mobile, isMobile: mobile, reducedMotion: process.env.SHOTS ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  page.__errors = []; page.__dialogs = [];
  page.on('pageerror', e => page.__errors.push(e.message));
  page.on('dialog', d => { page.__dialogs.push(d.type() + ':' + d.message()); d.dismiss().catch(() => {}); });
  await page.addInitScript(([lang, enc]) => {
    if (!sessionStorage.getItem('__seeded')) {
      sessionStorage.setItem('__seeded', '1');
      localStorage.clear();
      if (lang) localStorage.setItem('cerebro_idioma', lang);
      if (enc) localStorage.setItem('cerebro_enc_v6', JSON.stringify(enc));
    }
  }, [o.lang || null, o.enc || null]);
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: fakeSupabase(o) }));
  await page.route(/assets\/js\/pwa\.js/, r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  const FD = process.env.FONT_DIR;
  if (FD) {
    await page.route(/fonts\.googleapis\.com/, r => r.fulfill({ contentType: 'text/css', body: fs.readFileSync(path.join(FD, 'fonts.css'), 'utf8') }));
    await page.route(/fonts\.gstatic\.com/, r => {
      const f = path.join(FD, new URL(r.request().url()).pathname.slice(1).replace(/\//g, '_'));
      return fs.existsSync(f) ? r.fulfill({ contentType: 'font/woff2', body: fs.readFileSync(f) }) : r.abort();
    });
  } else await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.goto(base + '/admin.html' + (o.query || ''), { waitUntil: 'load' });
  await page.waitForFunction(() => {
    const g = document.getElementById('admin-gate');
    return (g && !g.hidden && !g.querySelector('.is-loading')) || (document.getElementById('sync-status') || {}).textContent && !/CARREGANDO|LOADING/.test(document.getElementById('sync-status').textContent);
  }, null, { timeout: 8000 });
  return { ctx, page };
}

module.exports = { openAdmin, CHARS, SESSION };

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
  const SHOTS = process.env.SHOTS; // optional screenshot dir
  const shot = async (p, n) => { if (SHOTS) await p.screenshot({ path: path.join(SHOTS, n + '.png'), fullPage: false }); };
  const visibleText = p => p.evaluate(() => {
    const bits = [document.body.innerText];
    document.querySelectorAll('[aria-label],[title],[placeholder],[alt]').forEach(e => ['aria-label', 'title', 'placeholder', 'alt'].forEach(a => e.hasAttribute(a) && bits.push(e.getAttribute(a))));
    return bits.join('\n');
  });
  const sessionWrites = p => p.evaluate(() => window.__writes.filter(w => w.table === 'sessions'));
  const tabs = ['party', 'encounter', 'notes', 'members', 'points'];
  const showTab = (p, k) => p.click('#tabbtn-' + k);

  /* ── notes never touch the encounter (data-loss bug), end to end through the real api.js ── */
  await test('typing notes saves only notes: encounter + round untouched (payload and stored row)', async () => {
    const { ctx, page } = await openAdmin(browser, base, { query: '?tab=notes' });
    eq(await page.inputValue('#session-notes'), SESSION.notes, 'notes loaded');
    await page.fill('#session-notes', 'Sentinelas atacam a escola.');
    await page.waitForFunction(() => /SALVO/i.test(document.getElementById('notes-status').textContent), null, { timeout: 4000 });
    const w = await sessionWrites(page);
    eq(w.length, 1, 'one debounced upsert');
    assert(!('encounter' in w[0].row) && !('round' in w[0].row), 'payload clobbers encounter/round: ' + JSON.stringify(w[0].row));
    eq(w[0].row.notes, 'Sentinelas atacam a escola.', 'notes payload');
    eq(w[0].opt.onConflict, 'party_id', 'upsert conflict target');
    const row = await page.evaluate(() => window.__db.sessions[0]);
    eq([row.encounter, row.round], [['active'], 4], 'stored encounter/round');
    eq(await page.evaluate(() => window.__db.sessions.length), 1, 'session rows');
    await shot(page, 'notes-desktop');
    eq(page.__errors, [], 'page errors');
    await ctx.close();
  });

  await test('save status: pending → saving → "Salvo às HH:MM"; failure shows error + retry, retry saves', async () => {
    const { ctx, page } = await openAdmin(browser, base, { query: '?tab=notes' });
    const st = () => page.textContent('#notes-status');
    await page.evaluate(() => { window.__hold = true; });
    await page.type('#session-notes', ' x');
    assert(/não salvas/i.test(await st()), 'pending text: ' + await st());
    await page.waitForFunction(() => /SALVANDO/i.test(document.getElementById('notes-status').textContent), null, { timeout: 3000 });
    eq(await page.getAttribute('#notes-status', 'role'), 'status', 'status is a live region');
    await page.evaluate(() => { window.__hold = false; window.__release(); });
    await page.waitForFunction(() => /SALVO ÀS \d\d:\d\d/i.test(document.getElementById('notes-status').textContent), null, { timeout: 3000 });
    await page.evaluate(() => { window.__fail['sessions:upsert'] = true; });
    await page.type('#session-notes', 'y');
    await page.waitForSelector('#notes-retry:not([hidden])', { timeout: 3000 });
    assert(/erro/i.test(await st()), 'error text: ' + await st());
    await page.evaluate(() => { window.__fail = {}; });
    await page.click('#notes-retry');
    await page.waitForFunction(() => /SALVO/i.test(document.getElementById('notes-status').textContent), null, { timeout: 3000 });
    assert((await page.evaluate(() => window.__db.sessions[0].notes)).endsWith(' xy'), 'retry did not store the text');
    assert(await page.isHidden('#notes-retry'), 'retry still shown');
    await ctx.close();
  });

  await test('pending notes are flushed on pagehide and blur; leaving warns only while unsaved', async () => {
    const { ctx, page } = await openAdmin(browser, base, { query: '?tab=notes' });
    const unloadBlocked = () => page.evaluate(() => { const e = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(e); return e.defaultPrevented; });
    eq(await unloadBlocked(), false, 'warns with nothing pending');
    await page.type('#session-notes', '!');
    await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
    const w = await sessionWrites(page); // immediately: no 1s debounce wait
    eq(w.length, 1, 'pagehide did not flush');
    assert(w[0].row.notes.endsWith('!'), 'flushed text');
    await page.waitForFunction(() => /SALVO/i.test(document.getElementById('notes-status').textContent));
    eq(await unloadBlocked(), false, 'warns after a confirmed save');
    await page.type('#session-notes', '?');
    await page.click('#tabbtn-party'); // blur + tab switch flush
    eq((await sessionWrites(page)).length, 2, 'blur/tab switch did not flush');
    await page.evaluate(() => { window.__fail['sessions:upsert'] = true; });
    await page.click('#tabbtn-notes');
    await page.type('#session-notes', '#');
    await page.evaluate(() => document.getElementById('session-notes').blur());
    await page.waitForSelector('#notes-retry:not([hidden])');
    eq(await unloadBlocked(), true, 'no warning while a save failed');
    await ctx.close();
  });

  await test('refresh while notes are saving: a slow read cannot put the old notes back', async () => {
    const { ctx, page } = await openAdmin(browser, base, { query: '?tab=notes' });
    await page.evaluate(() => { window.__hold = true; window.__holdRead = true; });
    await page.fill('#session-notes', 'Notas novas.');
    await page.click('#refresh-btn'); // blur starts the save, the click starts the reload
    await page.waitForFunction(() => /SALVANDO/i.test(document.getElementById('notes-status').textContent), null, { timeout: 3000 });
    await page.evaluate(() => { window.__hold = false; window.__release(); });
    await page.waitForFunction(() => window.__releaseRead, null, { timeout: 3000 });
    await page.evaluate(() => { window.__holdRead = false; window.__releaseRead(); });
    await page.waitForFunction(() => !document.getElementById('session-notes').disabled && /SALVO/i.test(document.getElementById('notes-status').textContent), null, { timeout: 3000 });
    await page.waitForTimeout(1300); // past the autosave debounce: nothing stale gets written back
    eq(await page.inputValue('#session-notes'), 'Notas novas.', 'textarea keeps the new notes');
    eq(await page.evaluate(() => window.__db.sessions[0].notes), 'Notas novas.', 'stored row');
    eq((await sessionWrites(page)).map(w => w.row.notes), ['Notas novas.'], 'session writes');
    eq(page.__errors, [], 'page errors');
    await ctx.close();
  });

  await test('overlapping refreshes (double click + another reload path) during a save: one read at a time, no stale notes', async () => {
    const { ctx, page } = await openAdmin(browser, base, { query: '?tab=notes' });
    await page.evaluate(() => { // a second reload path (like the error-state retry buttons), outside the toolbar
      const b = document.createElement('button'); b.id = 'reload-2'; b.dataset.act = 'reload'; document.body.appendChild(b);
      window.__readsMax = 0; window.__hold = true; window.__holdRead = true;
    });
    await page.fill('#session-notes', 'Notas novas.');
    await page.click('#refresh-btn'); // blur starts the (held) save, the click starts refresh A
    await page.waitForFunction(() => /SALVANDO/i.test(document.getElementById('notes-status').textContent), null, { timeout: 3000 });
    await page.waitForFunction(() => document.querySelector('#party-body tbody'), null, { timeout: 3000 }); // chars done, session still waiting
    eq(await page.isDisabled('#refresh-btn'), true, 'Refresh enabled while the session part of the refresh is still running');
    await page.click('#refresh-btn', { force: true }); // double click
    await page.click('#reload-2', { force: true }); // refresh B from another path
    await page.evaluate(() => { window.__hold = false; window.__release(); });
    await page.waitForFunction(() => window.__releaseRead, null, { timeout: 3000 });
    await page.waitForTimeout(100); // let any second read get issued
    await page.evaluate(() => window.__releaseRead()); // oldest read answers first
    await page.waitForFunction(() => !document.getElementById('session-notes').disabled, null, { timeout: 3000 });
    eq(await page.inputValue('#session-notes'), 'Notas novas.', 'first read');
    await page.fill('#session-notes', 'Notas 2.'); // GM keeps typing: this save lands after any second snapshot
    await page.waitForFunction(() => /SALVO/i.test(document.getElementById('notes-status').textContent) && window.__db.sessions[0].notes === 'Notas 2.', null, { timeout: 4000 });
    await page.evaluate(() => { window.__holdRead = false; window.__releaseRead(); }); // a stale second snapshot (if any) answers now
    await page.waitForTimeout(1300); // past the autosave debounce
    eq(await page.inputValue('#session-notes'), 'Notas 2.', 'textarea keeps the newest notes');
    assert(/SALVO/i.test(await page.textContent('#notes-status')), 'status: ' + await page.textContent('#notes-status'));
    eq(await page.evaluate(() => window.__db.sessions[0].notes), 'Notas 2.', 'stored row');
    eq((await sessionWrites(page)).map(w => w.row.notes), ['Notas novas.', 'Notas 2.'], 'session writes');
    eq(await page.evaluate(() => window.__readsMax), 1, 'concurrent session reads');
    eq(await page.isDisabled('#refresh-btn'), false, 'Refresh usable again');
    eq(page.__errors, [], 'page errors');
    await ctx.close();
  });

  /* ── confirmation dialog replaces confirm() ── */
  await test('ending the encounter asks in a dialog (cancel focused, Esc cancels) and writes only the encounter', async () => {
    const { ctx, page } = await openAdmin(browser, base, { query: '?tab=encounter' });
    assert(/ATIVO/i.test(await page.textContent('#enc-body .badge')), 'active badge');
    assert(await page.isVisible('#tab-enc-dot'), 'tab marker for active encounter');
    await page.click('[data-act="enc-toggle"]');
    await page.waitForSelector('#confirm-bg.open');
    eq(await page.evaluate(() => document.activeElement.id), 'confirm-cancel', 'default focus');
    eq(await page.getAttribute('#confirm-bg .modal', 'role'), 'alertdialog', 'dialog role');
    assert(await page.$eval('#confirm-ok', b => b.classList.contains('btn-danger')), 'destructive button not styled as danger');
    eq((await page.textContent('#confirm-ok')).trim(), 'Encerrar Encontro', 'specific verb');
    await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
    eq(await page.evaluate(() => document.activeElement.id), 'confirm-cancel', 'focus escaped the dialog');
    await page.keyboard.press('Escape');
    assert(!(await page.isVisible('#confirm-bg')), 'Esc did not close');
    eq(await page.evaluate(() => document.activeElement.dataset.act), 'enc-toggle', 'focus not returned to trigger');
    await page.keyboard.press('Enter'); // reopen, then Enter on the default (cancel) button
    await page.waitForSelector('#confirm-bg.open');
    await page.keyboard.press('Enter');
    eq((await sessionWrites(page)).length, 0, 'cancel wrote to the session');
    await page.click('[data-act="enc-toggle"]');
    await shot(page, 'confirm-desktop');
    await page.click('#confirm-ok');
    await page.waitForSelector('#toast.show');
    const w = await sessionWrites(page);
    eq(w.length, 1, 'one write');
    assert(!('notes' in w[0].row), 'encounter save sends notes: ' + JSON.stringify(w[0].row));
    eq(await page.evaluate(() => [window.__db.sessions[0].encounter, window.__db.sessions[0].notes]), [[], SESSION.notes], 'stored row');
    assert(/INATIVO/i.test(await page.textContent('#enc-body .badge')), 'badge not updated');
    eq(page.__dialogs, [], 'native dialogs used');
    await ctx.close();
  });

  /* ── names, never ids ── */
  await test('no raw player/character ids on any tab; players labelled by sheet name or "Jogador N"', async () => {
    const { ctx, page } = await openAdmin(browser, base, { enc: { rodada: 2, participantes: [{ id: 'npc-mag', nome: 'Magneto', condicoes: ['atordoado'] }] } });
    const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
    for (const k of tabs) {
      await showTab(page, k);
      const txt = await visibleText(page);
      assert(!UUID.test(txt), k + ': uuid shown: ' + (txt.match(UUID) || [])[0]);
      assert(!/u-gm|undefined|null|admin\.[a-z]/i.test(txt), k + ': raw value/key shown');
      await shot(page, 'admin-' + k + '-desktop');
    }
    await showTab(page, 'party');
    eq(await page.$$eval('#party-body .r-player', e => e.map(x => x.textContent)), ['Ana', 'Ana', 'Jogador 2'], 'player column');
    await showTab(page, 'members');
    eq(await page.$$eval('#members-list .dossier-title', e => e.map(x => x.textContent)), ['Ana', 'Noturno'], 'member headers');
    await showTab(page, 'points');
    eq(await page.$$eval('#points-list .pts-m-nome', e => e.map(x => x.textContent)), ['Colossus', 'Noturno', 'Personagem removido'], 'points members');
    await showTab(page, 'encounter');
    assert(/Magneto/.test(await page.textContent('#enc-local-body')) && /RODADA 2/.test(await page.textContent('#enc-local-meta')), 'cerebro encounter summary');
    eq(page.__errors, [], 'page errors');
    await ctx.close();
  });

  /* ── tabs: deep link, history, keyboard ── */
  await test('tab deep link, Back/Forward, arrow keys, remembered tab', async () => {
    const { ctx, page } = await openAdmin(browser, base, { query: '?tab=points' });
    const sel = () => page.$eval('[role="tab"][aria-selected="true"]', e => e.id);
    eq(await sel(), 'tabbtn-points', 'deep link');
    assert(await page.isVisible('#tab-points') && await page.isHidden('#tab-party'), 'panel visibility');
    eq(await page.getAttribute('#tab-points', 'aria-labelledby'), 'tabbtn-points', 'panel labelled');
    await showTab(page, 'members');
    assert(page.url().endsWith('?tab=members'), 'url ' + page.url());
    await page.goBack();
    await page.waitForFunction(() => document.querySelector('#tabbtn-points').getAttribute('aria-selected') === 'true');
    assert(await page.isVisible('#tab-points'), 'Back did not restore points');
    await page.goForward();
    await page.waitForFunction(() => document.querySelector('#tabbtn-members').getAttribute('aria-selected') === 'true');
    await page.focus('#tabbtn-members');
    await page.keyboard.press('ArrowDown');
    eq(await sel(), 'tabbtn-points', 'ArrowDown');
    eq(await page.evaluate(() => document.activeElement.id), 'tabbtn-points', 'focus follows');
    await page.keyboard.press('Home');
    eq(await sel(), 'tabbtn-party', 'Home');
    eq(await page.$$eval('[role="tab"]', e => e.map(x => x.tabIndex)), [0, -1, -1, -1, -1], 'roving tabindex');
    await page.keyboard.press('End');
    eq(await sel(), 'tabbtn-points', 'End');
    await page.goto(base + '/admin.html', { waitUntil: 'load' }); // no ?tab=: last tab comes back and the URL says so
    await page.waitForFunction(() => location.search === '?tab=points' && !document.getElementById('tab-points').hidden, null, { timeout: 5000 });
    await ctx.close();
  });

  /* ── access ── */
  await test('non-GM gets a clear "acesso restrito" state with a way back (no blank page, no data)', async () => {
    const { ctx, page } = await openAdmin(browser, base, { role: 'player' });
    assert(page.url().includes('admin.html'), 'redirected away: ' + page.url());
    eq((await page.textContent('#admin-gate h1')).trim(), 'Acesso restrito', 'title');
    eq(await page.getAttribute('#admin-gate a.btn-primary', 'href'), 'dashboard.html', 'way back');
    assert(await page.isHidden('#admin-tabs') && await page.isHidden('#admin-app'), 'panel visible to a player');
    eq(await page.evaluate(() => document.activeElement.tagName), 'H1', 'state not focused');
    await ctx.close();
  });

  await test('GM without a party gets a next step and retry', async () => {
    const { ctx, page } = await openAdmin(browser, base, { noParty: true });
    eq((await page.textContent('#admin-gate h1')).trim(), 'Nenhuma party', 'title');
    assert(await page.isVisible('#admin-gate [data-act="party-retry"]'), 'retry');
    await ctx.close();
  });

  /* ── per-tab states ── */
  await test('empty party: every character tab shows the empty state with the access code action', async () => {
    const { ctx, page } = await openAdmin(browser, base, { emptyChars: true });
    for (const k of ['party', 'members', 'points']) {
      await showTab(page, k);
      const panel = '#tab-' + k;
      assert(await page.isVisible(panel + ' .empty-state'), k + ': no empty state');
      assert(/XAV123/.test(await page.textContent(panel + ' .empty-state')), k + ': code missing');
      assert(await page.isVisible(panel + ' .empty-state [data-act="copy-code"]'), k + ': no next action');
    }
    await ctx.close();
  });

  await test('load failures: characters and session show error + retry; notes stay read-only until loaded', async () => {
    const { ctx, page } = await openAdmin(browser, base, { fail: { characters: true, sessions: true } });
    for (const k of ['party', 'members', 'points']) {
      await showTab(page, k);
      assert(await page.isVisible('#tab-' + k + ' .state-msg.is-error [data-act="reload"]'), k + ': no error+retry');
    }
    await showTab(page, 'encounter');
    assert(await page.isVisible('#enc-body .state-msg.is-error'), 'encounter: no error');
    await showTab(page, 'notes');
    assert(await page.isVisible('#notes-load .state-msg.is-error'), 'notes: no error');
    assert(await page.isDisabled('#session-notes'), 'notes editable without loaded data');
    assert(/falha/i.test(await page.textContent('#sync-status')), 'sync line: ' + await page.textContent('#sync-status'));
    await page.evaluate(() => { window.__fail = {}; });
    await page.click('#notes-load [data-act="reload"]');
    await page.waitForFunction(() => !document.getElementById('session-notes').disabled);
    eq(await page.inputValue('#session-notes'), SESSION.notes, 'notes after retry');
    await showTab(page, 'party');
    eq(await page.$$eval('#party-body tbody tr', r => r.length), 3, 'rows after retry');
    assert(/ATUALIZADO ÀS \d\d:\d\d/i.test(await page.textContent('#sync-status')), 'last-loaded time');
    eq(await sessionWrites(page), [], 'a failed load wrote to the session');
    await ctx.close();
  });

  /* ── mobile ── */
  for (const w of [390, 360]) {
    await test(`mobile ${w}px: no overflow on any tab, stacked tables, 16px notes, dialog fits`, async () => {
      const { ctx, page } = await openAdmin(browser, base, { mobile: true, viewport: { width: w, height: 844 } });
      const over = () => page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      for (const k of tabs) {
        await showTab(page, k);
        eq(await over(), 0, k + ' overflow');
        const small = await page.evaluate(() => [...document.querySelectorAll('#admin-main *, #admin-tabs *')].filter(e => e.offsetParent && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 12).map(e => e.textContent.trim().slice(0, 16)));
        eq(small, [], k + ' text under 12px');
        const tiny = await page.evaluate(() => [...document.querySelectorAll('#admin-main button, #admin-main a[href], #admin-tabs a')].filter(e => e.offsetParent).filter(e => Math.round(e.getBoundingClientRect().height) < 40).map(e => e.textContent.trim().slice(0, 16)));
        eq(tiny, [], k + ' targets under 40px');
        if (w === 390 && SHOTS) await page.screenshot({ path: path.join(SHOTS, 'admin-' + k + '-mobile.png'), fullPage: true });
      }
      await showTab(page, 'party');
      eq(await page.$eval('#party-body tbody tr', e => getComputedStyle(e).display), 'block', 'roster rows not stacked');
      await showTab(page, 'points');
      eq(await page.$eval('#points-list .pts-table td', e => getComputedStyle(e).display), 'flex', 'points rows not stacked');
      await showTab(page, 'notes');
      assert(await page.$eval('#session-notes', e => parseFloat(getComputedStyle(e).fontSize)) >= 16, 'notes font < 16px');
      eq(await page.$eval('.notes-acts', e => getComputedStyle(e).position), 'sticky', 'notes status not sticky');
      await showTab(page, 'encounter');
      await page.click('[data-act="enc-toggle"]');
      await page.waitForSelector('#confirm-bg.open');
      await page.waitForTimeout(300); // open animation
      eq(await over(), 0, 'dialog overflow');
      const box = await page.$eval('#confirm-bg .modal', e => e.getBoundingClientRect().bottom);
      assert(box <= 844 + 1, 'dialog off screen');
      if (w === 390 && SHOTS) await page.screenshot({ path: path.join(SHOTS, 'confirm-mobile.png') });
      await page.keyboard.press('Escape');
      eq(page.__errors, [], 'page errors');
      await ctx.close();
    });
  }

  /* ── language ── */
  await test('language switch reloads into English with no raw keys and the tab kept', async () => {
    const { ctx, page } = await openAdmin(browser, base, { query: '?tab=notes' });
    await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), page.click('#lang-toggle-btn')]);
    await page.waitForFunction(() => !document.getElementById('session-notes').disabled, null, { timeout: 8000 });
    eq((await page.textContent('#tabbtn-notes')).replace(/^\d+/, '').trim(), 'Session Notes', 'tab label');
    eq((await page.textContent('#notes-status')).trim(), 'Saves on its own while you type.', 'notes hint');
    assert(await page.isVisible('#tab-notes'), 'tab lost on reload');
    for (const k of tabs) {
      await showTab(page, k);
      const txt = (await visibleText(page)).replace(/Novo Personagem/g, ''); // fixture data, not UI
      const pt = txt.match(/\b(Atualizar|Personagem|Jogador|Encontro|Salvo|Carregando|Excluir|Nenhum)\b/);
      assert(!pt, k + ': pt-BR left in English UI: ' + (pt && pt[0]));
      assert(!/undefined|\badmin\.[a-z]/i.test(txt), k + ': raw key');
    }
    await page.evaluate(() => localStorage.removeItem('cerebro_idioma'));
    eq(page.__errors, [], 'page errors');
    await ctx.close();
  });

  /* ── restricted state on a phone ── */
  await test('restricted state on mobile fits and offers the way back', async () => {
    const { ctx, page } = await openAdmin(browser, base, { role: 'player', mobile: true });
    eq(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0, 'overflow');
    assert(await page.isVisible('#admin-gate a.btn-primary'), 'no way back');
    if (SHOTS) { await page.waitForTimeout(600); await page.screenshot({ path: path.join(SHOTS, 'restricted-mobile.png') }); }
    await ctx.close();
  });

  await browser.close();
  srv.close();
  console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
  process.exit(failed ? 1 : 0);
})();
