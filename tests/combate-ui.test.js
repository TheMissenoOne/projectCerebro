/**
 * combate.html — browser tests (Playwright, no network, no DB).
 * Serves the repo on an ephemeral port and replaces Supabase/auth/api with in-page stubs,
 * so the real page code runs against fixture characters and NPCs.
 * Table checks read Acao_Resultado-TabelaCompleta.csv directly.
 *
 *   node tests/combate-ui.test.js            (SHOTS=<dir> also saves screenshots)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const SHOTS = process.env.SHOTS || '';

function startServer() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
      fs.createReadStream(p).pipe(res);
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

/* ── fixtures ── */
// player sheet shape (ficha.html): stats keys without accents, poder[] + poder_grau[] + poder_burned[]
const CHARS = [
  { id: 'pc-1', player_id: 'u-1', party_id: 'party-1', name: 'Kitty Pryde', codename: 'Lince Negra',
    data: { nome: 'Kitty Pryde', codinome: 'Lince Negra',
      stats: { destreza: 6, forca: 2, corpo: 3, inteligencia: 5, vontade: 4, mente: 3, influencia: 2, aura: 3, espirito: '' },
      temas: [{ tipo: 'Mutante Versátil', poder: ['Atravessar paredes', 'Desativar eletrônicos', 'Fase em massa', ''], poder_grau: [12, 0, 20, 0], poder_burned: [false, false, true, false] }],
      temas_emergentes: { poder: ['Reflexos de bailarina'], poder_grau: [7] },
      extras: [{ poder: ['Atravessar paredes'], poder_grau: [9] }] } },
  { id: 'pc-2', player_id: 'u-1', party_id: 'party-1', name: 'Novo Personagem', codename: '', data: {} },
  { id: 'pc-3', player_id: 'u-2', party_id: 'party-1', name: 'Kurt Wagner', codename: 'Noturno', data: { stats: { destreza: 8, corpo: 5 } } }
];
// NPC shape (cerebro): accented stat keys, {texto, grau} in temas[].poder and data.tags
const NPCS = [
  { id: 'npc-mag', name: 'Erik Lehnsherr', codename: 'Magneto', data: {
    stats: { destreza: 9, 'força': 7, corpo: 12, 'inteligência': 15, vontade: 15, mente: 13, 'influência': 14, aura: 11, 'espírito': 10 },
    temas: [{ nome: 'Mestre do Magnetismo', poder: [{ texto: 'Voo Magnético', grau: 12 }, { texto: 'Magnetismo Ômega', grau: 25 }, { texto: 'Estrategista' }, { texto: 'Campo de Força', grau: 26 }], fraqueza: [{ texto: 'Arrogância', grau: 3 }] }],
    tags: [{ texto: 'Magnetismo Ômega', grau: 25 }, { texto: 'Capacete anti-telepatia', grau: 18 }] } },
  { id: 'npc-low', name: 'Pedro Alves', codename: 'Faísca', data: { stats: { destreza: 3, corpo: 3 }, temas: [{ poder: ['Faíscas'] }] } }
];

function stubScript(opts) {
  return `
window.getSupabaseClient=function(){return null;};
window.cache=null;
var ROLE=${JSON.stringify(opts.role || 'player')}, UID=${JSON.stringify(opts.uid || 'u-1')};
var _chars=${JSON.stringify(CHARS)}, _npcs=${JSON.stringify(NPCS)};
var FAIL=${!!opts.fail}, DELAY=${opts.delay ? 'true' : 'false'};
function out(v){ var p=Promise.resolve(JSON.parse(JSON.stringify(v))); if(FAIL) p=Promise.reject(new Error('boom'));
  return DELAY ? new Promise(function(r){ window.__release=function(){ r(p); }; }).then(function(x){return x;}) : p; }
window.requireAuth=function(){return Promise.resolve({session:{user:{id:UID}},profile:{role:ROLE}});};
window.getCurrentUser=function(){return Promise.resolve({id:UID,user_metadata:{role:ROLE}});};
window.logout=function(){};
window.__calls=[];
window.api=Object.assign(window.api||{},{
  getGMParty:function(){return Promise.resolve({id:'party-1'});},
  getPlayerParty:function(){return Promise.resolve({id:'party-1'});},
  listCharacters:function(uid){window.__calls.push('listCharacters:'+uid);return out(_chars.filter(function(c){return c.player_id===uid;}));},
  listPartyCharacters:function(pid){window.__calls.push('listPartyCharacters:'+pid);return out(_chars);},
  listNPCs:function(){window.__calls.push('listNPCs');return out(_npcs);},
  listAllNPCs:function(){window.__calls.push('listAllNPCs');return out(_npcs);}
});`;
}

async function openPage(browser, base, opts = {}) {
  const mobile = !!opts.mobile;
  const ctx = await browser.newContext({ viewport: opts.viewport || (mobile ? { width: 390, height: 844 } : { width: 1280, height: 860 }),
    hasTouch: mobile, isMobile: mobile, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  page.__errors = [];
  page.on('pageerror', e => page.__errors.push(e.message));
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  for (const m of ['supabase-client', 'cache-module', 'auth-module', 'pwa']) {
    await page.route(new RegExp('assets/js/' + m + '\\.js'), r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  }
  await page.route(/assets\/js\/api\.js/, r => r.fulfill({ contentType: 'text/javascript', body: stubScript(opts) }));
  // first load of the context only: later reloads (language switch) must see what the page saved
  await page.addInitScript(lang => {
    if (sessionStorage.getItem('__t')) return;
    sessionStorage.setItem('__t', '1');
    localStorage.removeItem('cerebro_combate'); sessionStorage.removeItem('cerebro_combate_sess');
    localStorage.setItem('cerebro_idioma', lang);
  }, opts.lang || 'pt-BR');
  await page.goto(base + '/combate.html', { waitUntil: 'load' });
  if (!opts.delay) await page.waitForFunction(() => !document.querySelector('#cb-state.is-loading'), null, { timeout: 8000 });
  return { ctx, page };
}

/* CSV: AV/OV rows 1–50 × cols 1–52, then EV/RV rows 1–52 × cols 1–52 */
function readCsv() {
  const L = fs.readFileSync(path.join(ROOT, 'Acao_Resultado-TabelaCompleta.csv'), 'utf8').trim().split(/\r?\n/);
  const i2 = L.findIndex(l => l.startsWith('EV/RV'));
  return { A: L.slice(1, i2).map(l => l.split(',').slice(1)), R: L.slice(i2 + 1).map(l => l.split(',').slice(1)) };
}

const pickDef = async (page, label) => { await page.fill('#ov-char-select', label); await page.dispatchEvent('#ov-char-select', 'input'); };
const forceDice = (page, seq) => page.evaluate(s => { const q = s.slice(); Math.random = () => (q.length ? q.shift() : 0.95); }, seq);
const setVals = async (page, v) => { for (const k of Object.keys(v)) await page.fill('#' + k + '-input', String(v[k])); };
const box = (page, sel) => page.$eval(sel, el => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right }; });

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
  const shot = (page, name) => SHOTS ? page.screenshot({ path: path.join(SHOTS, name) }) : null;
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

  /* ── player, desktop ── */
  let { ctx, page } = await openPage(browser, base, { role: 'player' });

  await test('player: attacker list comes from the API (my characters + party, no NPC group)', async () => {
    const groups = await page.$$eval('#av-char-select optgroup', gs => gs.map(g => [g.label, [...g.children].map(o => o.textContent)]));
    eq(groups, [['Meus personagens', ['Lince Negra', 'Novo Personagem']], ['Grupo', ['Noturno']]], 'attacker groups');
    const calls = await page.evaluate(() => window.__calls);
    assert(calls.includes('listCharacters:u-1') && calls.includes('listPartyCharacters:party-1'), 'api calls ' + calls);
    const defs = await page.$$eval('#ov-npc-list option', os => os.map(o => o.value));
    assert(defs.includes('Magneto (Erik Lehnsherr)') && defs.includes('Noturno (Kurt Wagner)'), 'defender list ' + defs);
    eq(await page.textContent('#cb-state'), '', 'state line after load');
  });

  await test('attacker + attribute and defender + attribute fill AV/EV/OV/RV with their source', async () => {
    await page.selectOption('#av-char-select', 'c:pc-1');
    await page.selectOption('#atk-src', 'attr:destreza');
    await pickDef(page, 'Magneto (Erik Lehnsherr)');
    await page.selectOption('#def-src', 'attr:corpo');
    const v = await page.evaluate(() => ['av', 'ev', 'ov', 'rv'].map(k => document.getElementById(k + '-input').value));
    eq(v, ['6', '6', '12', '12'], 'values');
    eq(await page.textContent('#av-src'), 'DESTREZA 6', 'AV source');
    eq(await page.textContent('#rv-src'), 'CORPO 12', 'RV source');
    // d = 12 − 6 = 6 → 19 (CSV row 6, column 12)
    eq(await page.textContent('#avov-result'), '19', 'target');
  });

  await test('graded tags: listed by AP desc (burned skipped, duplicates keep the highest), replace the value and label it', async () => {
    const atk = await page.$$eval('#atk-src optgroup:nth-of-type(2) option', os => os.map(o => o.textContent));
    eq(atk, ['AP 12 · Atravessar paredes', 'AP 7 · Reflexos de bailarina'], 'attacker tags');
    const def = await page.$$eval('#def-src optgroup:nth-of-type(2) option', os => os.map(o => o.textContent));
    eq(def, ['AP 26 · Campo de Força', 'AP 25 · Magnetismo Ômega', 'AP 18 · Capacete anti-telepatia', 'AP 12 · Voo Magnético'], 'defender tags');
    const espirito = await page.$eval('#atk-src option[value="attr:espirito"]', o => o.disabled);
    assert(espirito, 'empty attribute should be disabled');
    await page.selectOption('#def-src', { label: 'AP 25 · Magnetismo Ômega' });
    eq(await page.inputValue('#ov-input'), '25', 'OV from tag');
    eq(await page.inputValue('#rv-input'), '25', 'RV from tag');
    const src = await page.$eval('#ov-src', el => ({ txt: el.textContent, ap: !!el.querySelector('.ap.b-ome'), title: el.title }));
    assert(src.txt.includes('Magnetismo Ômega') && src.ap && /AP 25/.test(src.title), 'tag source label ' + JSON.stringify(src));
    eq(await page.textContent('#avov-result'), readCsv().A[5][24], 'target AV 6 vs OV 25 = CSV row 6 col 25');
  });

  await test('manual override: typing or stepping marks the value MANUAL and recomputes', async () => {
    await page.fill('#av-input', '20');
    eq(await page.textContent('#av-src'), 'MANUAL', 'AV caption');
    eq(await page.textContent('#ev-src'), 'DESTREZA 6', 'EV keeps its source');
    await page.click('#ov-input ~ .cb-st'); // OV +1 → 26
    eq(await page.inputValue('#ov-input'), '26', 'stepper');
    eq(await page.textContent('#avov-result'), readCsv().A[19][25], 'target AV 20 vs OV 26 = CSV row 20 col 26');
  });

  await test('Action Table matches the CSV in every cell (d=13 typo excepted) and the UI shows it', async () => {
    const { A } = readCsv();
    const got = await page.evaluate(() => { const o = []; for (let a = 1; a <= 50; a++) { const r = []; for (let v = 1; v <= 52; v++) { const x = actionTarget(a, v); r.push(x === 0 ? 'N' : String(x)); } o.push(r); } return o; });
    const bad = [];
    for (let a = 0; a < 50; a++) for (let o = 0; o < 52; o++) {
      if (got[a][o] === A[a][o]) continue;
      // CSV typo: rows 16-39 print 56 on the d=13 diagonal; rows 1-15 and the progression give 39
      if (o - a === 13 && A[a][o] === '56' && got[a][o] === '39') continue;
      bad.push((a + 1) + '/' + (o + 1) + ' csv=' + A[a][o] + ' page=' + got[a][o]);
    }
    eq(bad, [], 'action mismatches');
    eq(A[0][13], '39', 'row 1 has 39 on d=13');
    // UI: a handful of pairs typed into the inputs
    for (const [av, ov, want] of [[7, 7, '11'], [5, 9, '15'], [10, 20, '29'], [25, 30, '17'], [6, 1, '5'], [8, 1, 'AUTO'], [1, 52, '362'], [16, 29, '39']]) {
      await setVals(page, { av, ov });
      eq(await page.textContent('#avov-result'), want, 'target AV ' + av + ' OV ' + ov);
    }
  });

  await test('Result Table matches the CSV in every cell; edge cases beyond the table', async () => {
    const { R } = readCsv();
    const got = await page.evaluate(() => { const o = []; for (let e = 1; e <= 52; e++) { const r = []; for (let v = 1; v <= 52; v++) r.push(resultRAPs(e, v)); o.push(r); } return o; });
    const bad = [];
    for (let e = 0; e < 52; e++) for (let v = 0; v < 52; v++) { const want = R[e][v] === 'N' ? 0 : +R[e][v]; if (got[e][v] !== want) bad.push((e + 1) + '/' + (v + 1)); }
    eq(bad, [], 'result mismatches');
    const edge = await page.evaluate(() => ({
      a0: actionTarget(0, 0), a3060: actionTarget(30, 60), a99: actionTarget(99, 99), a2530: actionTarget(25, 30),
      r00: resultRAPs(0, 0), r_rvBig: resultRAPs(20, 21), r601: resultRAPs(60, 1), r6055: resultRAPs(60, 55), r5247: resultRAPs(52, 47), r9999: resultRAPs(99, 99), r5252: resultRAPs(52, 52)
    }));
    eq(edge.a0, 12, 'AV 0 vs OV 0 → OV floor 1 → d=1 → 12');
    eq(edge.a3060, 139, 'AV 30 vs OV 60 continues the diagonal (CSV d=30 = 139)');
    eq(edge.a99, 11, 'AV = OV beyond the table → 11');
    eq(edge.a2530, 17, 'graded-tag range (25 vs 30)');
    eq(edge.r00, 0, 'EV 0 → no effect');
    eq(edge.r_rvBig, 0, 'RV > EV → no effect');
    eq(edge.r601, +R[51][0] + 8, 'EV 60 RV 1 → R(52,1) + 8');
    eq(edge.r6055, edge.r5247, 'EV 60 RV 55 cancels 8 from both → R(52,47)');
    eq(edge.r9999, edge.r5252, 'EV = RV beyond the table → diagonal at 52');
  });

  await test('forced roll with doubles: re-roll chain, success, column shifts, RAPs', async () => {
    await setVals(page, { av: 7, ov: 7, ev: 10, rv: 8 });
    await forceDice(page, [0.45, 0.45, 0.25, 0.35]); // 5+5 (doubles) → 3+4 = 17
    await page.click('#cb-roll');
    eq(await page.$$eval('#cb-dice .cb-die', ds => ds.map(d => d.textContent)), ['5', '5', '3', '4'], 'dice chain');
    assert(await page.$('#cb-dice .cb-re'), 're-roll marker missing');
    assert((await page.textContent('#cb-dice')).includes('17'), 'total');
    eq(await page.getAttribute('#cb-verdict', 'data-state'), 'ok', 'state');
    eq(await page.textContent('#cb-verdict'), 'SUCESSO', 'verdict in words');
    // target 11; 17 reaches 12,13,14,15,17 → 5 shifts; RV 8 → 3; CSV EV 10 / RV 3 = 10
    const { R } = readCsv();
    eq(await page.textContent('#raps-result'), R[9][2], 'RAPs = CSV(10,3)');
    const sh = await page.textContent('#cb-shift');
    assert(sh.includes('5') && sh.includes('8 → 3'), 'shift text ' + sh);
    const fs1 = await page.$eval('#raps-result', el => parseFloat(getComputedStyle(el).fontSize));
    const others = await page.$$eval('.cb-verdict, .cb-target-n, .cb-num', els => Math.max(...els.map(e => parseFloat(getComputedStyle(e).fontSize))));
    assert(fs1 > others, 'RAPs is not the largest number (' + fs1 + ' vs ' + others + ')');
  });

  await test('result is announced in a polite live region', async () => {
    const live = await page.$eval('#cb-live', el => ({ txt: el.textContent, live: el.getAttribute('aria-live'), role: el.getAttribute('role') }));
    eq([live.live, live.role], ['polite', 'status'], 'live attrs');
    assert(/SUCESSO/.test(live.txt) && /Total 17/.test(live.txt) && /10 RAPs/.test(live.txt), 'announcement ' + live.txt);
  });

  await test('1+1 on the first roll is an automatic failure; physical dice input resolves too', async () => {
    await forceDice(page, [0.05, 0.05, 0.95, 0.95]);
    await page.click('#cb-roll');
    eq(await page.textContent('#cb-verdict'), 'FALHA AUTOMÁTICA (1+1)', 'fumble');
    eq(await page.$$eval('#cb-dice .cb-die', ds => ds.length), 2, 'no re-roll on 1+1');
    await page.fill('#cb-dice-in', '9');
    await page.click('.cb-phys-ok');
    eq([await page.textContent('#cb-verdict'), await page.textContent('#raps-result')], ['FALHA', '0'], 'physical 9 vs 11');
    await page.fill('#cb-dice-in', '15');
    await page.press('#cb-dice-in', 'Enter');
    eq(await page.textContent('#cb-verdict'), 'SUCESSO', 'physical 15 vs 11');
    assert((await page.textContent('#cb-dice')).includes('dados físicos'), 'physical label');
  });

  await test('history keeps the last resolutions (session-local) and can be cleared', async () => {
    const n = await page.$$eval('#cb-hist li', ls => ls.length);
    eq(n, 4, 'history entries');
    await page.click('#cb-hist-clear');
    eq(await page.$$eval('#cb-hist li', ls => ls.map(l => l.className)), ['cb-hist-empty'], 'cleared');
  });

  await test('a tag used in a roll is marked "used this turn" until NOVO TURNO', async () => {
    await page.selectOption('#av-char-select', 'c:pc-1');
    await page.selectOption('#atk-src', { label: 'AP 12 · Atravessar paredes' });
    eq(await page.inputValue('#av-input'), '12', 'AV from tag');
    await forceDice(page, [0.95, 0.85]);
    await page.click('#cb-roll');
    const lbl = await page.$eval('#atk-src option[value="tag:0"]', o => o.textContent);
    assert(lbl.includes('usada neste turno'), 'used marker ' + lbl);
    await page.click('#cb-newturn');
    eq(await page.$eval('#atk-src option[value="tag:0"]', o => o.textContent), 'AP 12 · Atravessar paredes', 'reset');
  });

  await test('keyboard: tabs move with arrow keys, roll works with Enter', async () => {
    await page.focus('#tabbtn-resolver');
    await page.keyboard.press('ArrowRight');
    eq(await page.evaluate(() => document.activeElement.id), 'tabbtn-tabelas', 'focus moved');
    assert(await page.isVisible('#action-table td'), 'tables rendered');
    await page.keyboard.press('ArrowLeft');
    await page.focus('#cb-roll');
    await forceDice(page, [0.15, 0.35]);
    await page.keyboard.press('Enter');
    assert((await page.textContent('#cb-dice')).includes('= 6'), 'roll via keyboard');
  });

  await test('language switch: EN labels, no raw keys, inputs kept', async () => {
    const before = await page.inputValue('#av-input');
    await Promise.all([page.waitForNavigation(), page.click('#lang-toggle-btn')]);
    await page.waitForFunction(() => !document.querySelector('#cb-state.is-loading'));
    eq(await page.textContent('#tabbtn-resolver'), 'RESOLVE', 'tab');
    assert((await page.textContent('#cb-roll')).includes('ROLL 2d10'), 'roll label');
    const raw = await page.evaluate(() => document.body.innerText.match(/combat\.[a-zA-Z]+/g));
    eq(raw, null, 'raw keys');
    eq(await page.inputValue('#av-input'), before, 'value restored after the reload');
    // the keyboard roll above spent the tag again: the marker survives the reload too (sessionStorage)
    eq(await page.$eval('#atk-src', s => s.selectedOptions[0].textContent), 'AP 12 · Atravessar paredes — used this turn', 'source + used marker restored');
    await page.click('.cb-help[aria-controls="h-ov"]');
    assert((await page.textContent('#h-ov')).startsWith('Opposing Value'), 'help in EN');
    eq(page.__errors, [], 'page errors');
  });
  await ctx.close();

  /* ── GM, desktop ── */
  ({ ctx, page } = await openPage(browser, base, { role: 'gm', uid: 'u-1' }));
  await test('GM: NPCs are attackers too (all NPCs loaded)', async () => {
    const labels = await page.$$eval('#av-char-select optgroup', gs => gs.map(g => g.label));
    eq(labels, ['Meus personagens', 'Grupo', 'NPCs'], 'groups');
    assert((await page.evaluate(() => window.__calls)).includes('listAllNPCs'), 'listAllNPCs');
    await page.selectOption('#av-char-select', 'n:npc-mag');
    await page.selectOption('#atk-src', { label: 'AP 26 · Campo de Força' });
    await pickDef(page, 'Noturno (Kurt Wagner)');
    await page.selectOption('#def-src', 'attr:destreza');
    eq(await page.evaluate(() => ['av', 'ev', 'ov', 'rv'].map(k => document.getElementById(k + '-input').value)), ['26', '26', '8', '8'], 'values');
    eq(await page.textContent('#avov-result'), 'AUTO', '26 vs 8 → N in the CSV → automatic');
    await shot(page, 'desktop.png');
  });
  await ctx.close();

  /* ── API error: manual mode still works ── */
  ({ ctx, page } = await openPage(browser, base, { role: 'player', fail: true }));
  await test('API error: error state with retry, manual four-number mode still resolves', async () => {
    assert(await page.isVisible('#cb-state.is-error #cb-retry'), 'error state');
    await setVals(page, { av: 5, ov: 5, ev: 6, rv: 4 });
    await forceDice(page, [0.95, 0.85]); // 10+9 = 19 vs 11
    await page.click('#cb-roll');
    eq(await page.textContent('#cb-verdict'), 'SUCESSO', 'manual roll');
  });
  await ctx.close();

  /* ── loading state ── */
  ({ ctx, page } = await openPage(browser, base, { role: 'player', delay: true }));
  await test('loading state is shown while the roster loads', async () => {
    await page.waitForSelector('#cb-state.is-loading', { timeout: 5000 });
    await page.evaluate(() => window.__release && window.__release());
  });
  await ctx.close();

  /* ── phone 390×844 ── */
  ({ ctx, page } = await openPage(browser, base, { role: 'player', mobile: true }));
  await test('390×844: values, target, ROLL and result on one screen; inputs 16px+; no overflow', async () => {
    await page.selectOption('#av-char-select', 'c:pc-1');
    await page.selectOption('#atk-src', 'tag:0');
    await pickDef(page, 'Magneto (Erik Lehnsherr)');
    await page.selectOption('#def-src', 'attr:corpo');
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.evaluate(() => scrollTo(0, 0));
    await shot(page, 'mobile-setup.png');
    for (const sel of ['#av-input', '#ev-input', '#ov-input', '#rv-input', '#avov-result', '#cb-roll']) {
      const b = await box(page, sel);
      assert(b.top >= 0 && b.bottom <= 844, sel + ' outside the viewport ' + JSON.stringify(b));
    }
    await forceDice(page, [0.55, 0.55, 0.25, 0.85]);
    await page.tap('#cb-roll');
    const r = await box(page, '#cb-result');
    assert(r.bottom <= 844 && (await page.evaluate(() => scrollY)) === 0, 'result needs scrolling ' + JSON.stringify(r));
    await shot(page, 'mobile-result.png');
    const small = await page.$$eval('input,select', els => els.filter(e => e.offsetParent).map(e => [e.id, parseFloat(getComputedStyle(e).fontSize)]).filter(x => x[1] < 16));
    eq(small, [], 'inputs under 16px');
    const tiny = await page.$$eval('#tab-resolver button, #tab-resolver select, #tab-resolver input', els => els.filter(e => e.offsetParent).map(e => { const r = e.getBoundingClientRect(); return [e.id || e.className, Math.round(r.width), Math.round(r.height)]; }).filter(x => x[1] < 40 || x[2] < 40));
    eq(tiny, [], 'touch targets under 40px');
    eq(await page.evaluate(() => document.documentElement.scrollWidth), 390, 'doc width');
  });

  await test('help "?" opens on tap and closes on a second tap', async () => {
    await page.tap('.cb-help[aria-controls="h-av"]');
    eq(await page.getAttribute('.cb-help[aria-controls="h-av"]', 'aria-expanded'), 'true', 'expanded');
    assert(await page.isVisible('#h-av'), 'hint visible');
    assert((await page.textContent('#h-av')).startsWith('Action Value'), 'hint text');
    await page.tap('.cb-help[aria-controls="h-av"]');
    assert(!(await page.isVisible('#h-av')), 'hint closed');
  });

  await test('tag picker lists graded tags for the phone screenshot', async () => {
    // native <select> popups are not captured by screenshots: show the picker as a listbox for the image only
    await page.evaluate(() => { const s = document.getElementById('def-src'); s.size = 8; s.style.height = 'auto'; s.style.position = 'relative'; s.style.zIndex = 5; });
    await shot(page, 'mobile-tagpick.png');
    await page.evaluate(() => { const s = document.getElementById('def-src'); s.size = 0; s.removeAttribute('style'); });
    eq(page.__errors, [], 'page errors');
  });
  await ctx.close();

  ({ ctx, page } = await openPage(browser, base, { role: 'player', mobile: true, viewport: { width: 360, height: 780 } }));
  await test('360px: no horizontal overflow (incl. tables tab)', async () => {
    eq(await page.evaluate(() => document.documentElement.scrollWidth), 360, 'resolver');
    await page.tap('#tabbtn-tabelas');
    eq(await page.evaluate(() => document.documentElement.scrollWidth), 360, 'tables');
  });
  await ctx.close();

  await browser.close(); srv.close();
  console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
  process.exit(failed ? 1 : 0);
})();

module.exports = { startServer, CHARS, NPCS };
