/**
 * wiki.html — browser regression tests (Playwright, no network, no DB).
 * Serves the repo from an ephemeral port; Supabase/auth/api are stubbed out
 * (the wiki content is local), so the real wiki code runs end to end.
 *
 *   node tests/wiki-ui.test.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };

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

async function open(browser, base, url, opts = {}) {
  const mobile = !!opts.mobile;
  const ctx = await browser.newContext({
    viewport: opts.viewport || (mobile ? { width: 390, height: 844 } : { width: 1280, height: 860 }),
    deviceScaleFactor: 1, hasTouch: mobile, isMobile: mobile, reducedMotion: 'reduce'
  });
  const page = await ctx.newPage();
  page.__errors = [];
  page.on('pageerror', e => page.__errors.push(e.message));
  if (opts.lang) await page.addInitScript(l => localStorage.setItem('cerebro_idioma', l), opts.lang);
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  for (const m of ['supabase-client', 'cache-module', 'auth-module', 'pwa']) {
    await page.route(new RegExp('assets/js/' + m + '\\.js'), r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  }
  await page.route(/assets\/js\/api\.js/, r => r.fulfill({ contentType: 'text/javascript', body: 'window.api = {}; window.logout = function () {};' }));
  await page.goto(base + '/' + url, { waitUntil: 'load' });
  await page.waitForFunction(() => document.querySelector('#wiki-content h1'), null, { timeout: 8000 });
  return { ctx, page };
}

const h1 = page => page.evaluate(() => document.querySelector('#wiki-content h1').textContent.trim());
const qp = page => page.evaluate(() => new URL(location.href).searchParams.get('p'));

let passed = 0, failed = 0;
async function test(name, fn) {
  try { await fn(); console.log('✅ ' + name); passed++; }
  catch (e) { console.log('❌ ' + name + ': ' + (e && e.message ? e.message.split('\n')[0] : e)); failed++; }
}
function assert(c, m) { if (!c) throw new Error(m); }

if (require.main === module) (async () => {
  const srv = await startServer();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch();
  const keys = await (async () => { const { ctx, page } = await open(browser, base, 'wiki.html'); const k = await page.evaluate(() => Object.keys(window.wikiPages)); await ctx.close(); return k; })();

  await test('every wiki page renders in place without errors, with exactly one h1 in the article', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html');
    for (const k of keys) {
      await page.evaluate(k => WikiApp.go(k), k);
      await page.waitForFunction(k => new URL(location.href).searchParams.get('p') === (k === 'index' ? null : k) && document.querySelector('#wiki-content h1'), k);
      const n = await page.evaluate(() => document.querySelectorAll('#wiki-content h1').length);
      assert(n === 1, k + ': ' + n + ' h1 in the article');
    }
    assert(page.__errors.length === 0, 'page errors: ' + page.__errors.join(' | '));
    await ctx.close();
  });

  await test('search: accentless query finds an accented rule, Enter opens it in place and highlights the match', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html');
    await page.evaluate(() => { window.__noReload = 1; });
    await page.keyboard.press('/');
    assert(await page.evaluate(() => document.activeElement.id === 'wiki-q'), '"/" does not focus the search');
    await page.keyboard.type('acoes automaticas reacao');
    await page.waitForSelector('#wiki-results:not([hidden]) .wr-opt');
    const first = await page.evaluate(() => ({ page: document.querySelector('.wr-opt').dataset.page, txt: document.querySelector('.wr-opt').textContent, live: document.getElementById('wiki-search-status').textContent }));
    assert(/Automáticas|Reaç/.test(first.txt), 'first result does not show the accented term: ' + first.txt);
    assert(/\d/.test(first.live), 'result count not announced');
    await page.keyboard.press('ArrowDown');
    assert(await page.evaluate(() => document.getElementById('wiki-q').getAttribute('aria-activedescendant') === 'wr-o0'), 'ArrowDown does not move the active option');
    await page.keyboard.press('Enter');
    await page.waitForFunction(p => new URL(location.href).searchParams.get('p') === p, first.page);
    assert(await page.evaluate(() => window.__noReload === 1), 'opening a result reloaded the page');
    const hit = await page.evaluate(() => { const el = document.querySelector('.wiki-hit'); if (!el) return null; const r = el.getBoundingClientRect(); return { txt: el.textContent, inView: r.top >= 0 && r.bottom <= innerHeight, focused: document.activeElement === el }; });
    assert(hit, 'match not highlighted');
    assert(/autom[aá]tica/i.test(hit.txt) || /rea[cç]/i.test(hit.txt), 'highlighted block does not contain the term: ' + hit.txt.slice(0, 80));
    assert(hit.inView, 'highlighted block not scrolled into view');
    assert(hit.focused, 'focus not moved to the match');
    // Esc clears
    await page.focus('#wiki-q');
    await page.fill('#wiki-q', 'tsar');
    await page.waitForSelector('#wiki-results:not([hidden]) .wr-opt');
    await page.keyboard.press('Escape');
    assert(await page.evaluate(() => document.getElementById('wiki-q').value === '' && document.getElementById('wiki-results').hidden), 'Esc does not clear the search');
    assert(page.__errors.length === 0, page.__errors.join(' | '));
    await ctx.close();
  });

  await test('search reaches table cells (AP table) and temas.json content', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html');
    await page.fill('#wiki-q', '350.000 km');
    await page.waitForSelector('#wiki-results:not([hidden]) .wr-opt');
    assert(await page.evaluate(() => [...document.querySelectorAll('.wr-opt')].some(a => a.dataset.page === 'aps_referencia')), 'AP table row not found');
    await page.fill('#wiki-q', 'telepatia');
    await page.waitForFunction(() => /telepatia/i.test(document.getElementById('wiki-results').textContent));
    await ctx.close();
  });

  await test('in-place navigation: URL changes without reload, focus on the heading, back/forward restore page + scroll', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html?p=sistema_hibrido');
    await page.evaluate(() => { window.__noReload = 1; });
    await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'instant' }));
    await page.waitForTimeout(250);
    const y0 = await page.evaluate(() => window.scrollY);
    assert(y0 > 1000, 'page too short to test scroll restore: ' + y0);
    await page.click('.wiki-nav-link[data-page="combate"]');
    await page.waitForFunction(() => new URL(location.href).searchParams.get('p') === 'combate');
    assert((await h1(page)) === 'Combate', 'wrong page after click');
    assert(await page.evaluate(() => document.activeElement && document.activeElement.id === 'wiki-h1'), 'focus not on the page heading');
    assert(await page.evaluate(() => document.querySelector('.wiki-nav-link[aria-current="page"]').dataset.page === 'combate'), 'sidebar does not mark the current page');
    assert(await page.evaluate(() => window.scrollY) === 0, 'new page not at the top');
    await page.goBack();
    await page.waitForFunction(() => new URL(location.href).searchParams.get('p') === 'sistema_hibrido');
    await page.waitForTimeout(150);
    const y1 = await page.evaluate(() => window.scrollY);
    assert(Math.abs(y1 - y0) < 4, 'scroll not restored on back: ' + y0 + ' → ' + y1);
    await page.goForward();
    await page.waitForFunction(() => new URL(location.href).searchParams.get('p') === 'combate');
    assert((await h1(page)) === 'Combate', 'forward did not restore the page');
    // prev/next links at the end
    const next = await page.evaluate(() => document.querySelector('.wiki-pager-next').dataset.page);
    await page.click('.wiki-pager-next');
    await page.waitForFunction(p => new URL(location.href).searchParams.get('p') === p, next);
    // in-content legacy link (<a href="#acao" data-page="acoes">) on the intro page
    await page.click('.wiki-nav-link[data-page="index"]');
    await page.waitForFunction(() => !new URL(location.href).searchParams.get('p'));
    await page.click('#wiki-content a[data-page="acoes"]');
    await page.waitForFunction(() => new URL(location.href).searchParams.get('p') === 'acoes');
    assert(await page.evaluate(() => window.__noReload === 1), 'navigation reloaded the page');
    assert(page.__errors.length === 0, page.__errors.join(' | '));
    await ctx.close();
  });

  await test('existing deep-link formats open the right page (query, legacy hash, alias, heading anchor, unknown)', async () => {
    const cases = [
      ['wiki.html', 'Bem-vindo à Wiki X-MEN TTRPG'],
      ['wiki.html?p=acao_resultado', 'Tabela AV/OV · EV/RV'],
      ['wiki.html?p=aps_referencia', 'APs de Referência'],
      ['wiki.html#modificadores', 'Modificadores de Criação'],
      ['wiki.html?p=aps_massa', 'APs de Referência — Massa']
    ];
    for (const [url, title] of cases) {
      const { ctx, page } = await open(browser, base, url);
      assert((await h1(page)) === title, url + ' → ' + (await h1(page)));
      await ctx.close();
    }
    // heading anchor
    const { ctx, page } = await open(browser, base, 'wiki.html?p=tipos_acao');
    const id = await page.evaluate(() => document.querySelectorAll('#wiki-content h2')[4].id);
    await ctx.close();
    const b = await open(browser, base, 'wiki.html?p=tipos_acao#' + id);
    await b.page.waitForTimeout(150);
    const top = await b.page.evaluate(id => document.getElementById(id).getBoundingClientRect().top, id);
    assert(top >= 0 && top < 80, 'heading anchor not scrolled to: top=' + top);
    await b.ctx.close();
    // unknown page → helpful not-found with search
    const c = await open(browser, base, 'wiki.html?p=pagina_inexistente');
    assert(/não encontrada/i.test(await h1(c.page)), 'no not-found state');
    await c.page.click('[data-wiki-search]');
    assert(await c.page.evaluate(() => document.activeElement.id === 'wiki-q' && document.getElementById('wiki-q').value.includes('inexistente')), 'not-found search button does not prefill the search');
    await c.ctx.close();
  });

  await test('AP table on a phone: sticky header + first column, cells ≥12px, "jump to AP" lands on the row, no page overflow at 360', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html?p=aps_referencia', { mobile: true, viewport: { width: 360, height: 780 } });
    const info = await page.evaluate(() => {
      const t = document.querySelector('#wiki-content table');
      const cs = el => getComputedStyle(el);
      return {
        headPos: cs(t.tHead.rows[0].cells[1]).position, cornerPos: cs(t.tHead.rows[0].cells[0]).position,
        colPos: cs(t.tBodies[0].rows[5].cells[0]).position, scope: t.tBodies[0].rows[5].cells[0].getAttribute('scope'),
        minFont: Math.min(...[...t.querySelectorAll('td,th')].map(c => parseFloat(cs(c).fontSize))),
        docW: document.documentElement.scrollWidth, wide: t.closest('.tbl').classList.contains('is-wide')
      };
    });
    assert(info.headPos === 'sticky' && info.cornerPos === 'sticky', 'header row not sticky');
    assert(info.colPos === 'sticky' && info.scope === 'row', 'first column not a sticky row header');
    assert(info.minFont >= 12, 'cell font below 12px: ' + info.minFont);
    assert(info.docW === 360, 'page overflows at 360: ' + info.docW);
    assert(info.wide, 'wide AP table has no scroll affordance');
    // header stays put while the table scrolls
    const stick = await page.evaluate(() => {
      const sc = document.querySelector('.tbl-scroll'); sc.scrollTop = 600; sc.scrollLeft = 120;
      const th = sc.querySelector('thead th:nth-child(2)'), rh = sc.querySelector('tbody tr:nth-child(20) th');
      return { head: Math.round(th.getBoundingClientRect().top - sc.getBoundingClientRect().top), col: Math.round(rh.getBoundingClientRect().left - sc.getBoundingClientRect().left) };
    });
    assert(stick.head <= 1 && stick.col <= 1, 'sticky cells moved: ' + JSON.stringify(stick));
    await page.fill('.ap-jump-input', '27');
    const jump = await page.evaluate(() => {
      const r = document.querySelector('#wiki-content tr.is-picked'); const sc = r.closest('.tbl-scroll');
      const top = r.getBoundingClientRect().top - sc.getBoundingClientRect().top, head = sc.querySelector('thead').offsetHeight;
      return { ap: r.cells[0].textContent.trim(), visible: top >= head - 2 && top < sc.clientHeight, out: document.querySelector('.ap-readout').textContent };
    });
    assert(jump.ap === '27', 'jumped to AP ' + jump.ap);
    assert(jump.visible, 'AP row not visible under the sticky header');
    assert(jump.out.includes('350.000 km') && jump.out.includes('8 anos'), 'readout missing the row values: ' + jump.out);
    await page.fill('.ap-jump-input', '52');
    assert(await page.evaluate(() => document.querySelector('#wiki-content tr.is-picked').cells[0].textContent.trim()) === '50', 'missing AP does not fall back to the nearest lower row');
    // corrected Massa data: keeps doubling after AP 28
    const massa = await page.evaluate(() => [29, 30, 33, 34].map(n => [...document.querySelectorAll('#wiki-content tbody tr')].find(r => r.cells[0].textContent.trim() === String(n)).cells[3].textContent));
    assert(massa.join('|') === '~12 milhões t|~25 milhões t|~200 milhões t|~400 milhões t', 'Massa column: ' + massa.join('|'));
    // no page-level overflow on any page at 360
    for (const k of keys) {
      await page.evaluate(k => WikiApp.go(k), k);
      await page.waitForTimeout(30);
      const w = await page.evaluate(() => document.documentElement.scrollWidth);
      assert(w === 360, k + ' overflows at 360: ' + w);
    }
    assert(page.__errors.length === 0, page.__errors.join(' | '));
    await ctx.close();
  });

  await test('AV/OV and EV/RV tables match Acao_Resultado-TabelaCompleta.csv and combate.html (sampled cells)', async () => {
    const lines = fs.readFileSync(path.join(ROOT, 'Acao_Resultado-TabelaCompleta.csv'), 'utf8').trim().split(/\r?\n/).map(l => l.split(','));
    const resAt = lines.findIndex(l => /^EV\/RV/.test(l[0]));
    const csv = { avov: lines.slice(1, resAt), evrv: lines.slice(resAt + 1, resAt + 53) };
    assert(csv.avov.length === 50 && csv.evrv.length === 52, 'unexpected CSV shape');
    // combate.html's functions, evaluated on their own
    const src = fs.readFileSync(path.join(ROOT, 'combate.html'), 'utf8');
    const block = src.slice(src.indexOf('function actionTarget(av, ov) {'), src.indexOf('// Column shifts (MEGS)'));
    const comb = new Function(block + '; return { actionTarget, resultRAPs };')();
    const sample = [];
    for (let r = 1; r <= 52; r += 3) for (let c = 1; c <= 52; c += 2) sample.push([r, c]);
    sample.push([1, 1], [52, 52], [10, 3], [20, 13], [8, 1], [52, 1], [1, 52]);
    const { ctx, page } = await open(browser, base, 'wiki.html?p=acao_resultado');
    for (const type of ['avov', 'evrv']) {
      await page.click(`.ar-type-btn[data-type="${type}"]`);
      const cells = await page.evaluate(s => s.map(([r, c]) => document.querySelector('#action-table').tBodies[0].rows[r - 1].cells[c].textContent.trim()), sample);
      const bad = [];
      sample.forEach(([r, c], i) => {
        const row = csv[type][r - 1];
        const v0 = type === 'avov' ? comb.actionTarget(r, c) : (c > r ? 0 : comb.resultRAPs(r, c));
        const want = row ? row[c] : (v0 === 0 ? 'N' : String(v0)); // the CSV action table stops at AV 50
        const typo = type === 'avov' && c - r === 13 && r >= 16 && r <= 39 && want === '56'; // CSV typo, progression gives 39
        const expect = typo ? '39' : want;
        const combTxt = v0 === 0 ? 'N' : String(v0);
        if (cells[i] !== expect || combTxt !== cells[i]) bad.push(`${type} ${r}/${c}: wiki ${cells[i]} csv ${want} combate ${combTxt}`);
      });
      assert(!bad.length, bad.slice(0, 5).join('; '));
    }
    assert(await page.evaluate(() => document.querySelector('#action-table thead').rows[0].cells.length) === 53, 'table is not one column per AP (1–52)');
    await ctx.close();
  });

  await test('mobile: dock opens the page sheet (focus trapped, Esc closes), picking a page closes it and focuses the h1', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html', { mobile: true });
    assert(await page.isVisible('#wiki-dock-pages'), 'dock not visible');
    assert(!(await page.isVisible('.wiki-nav-link[data-page="tags"]')), 'page list visible before opening');
    await page.click('#wiki-dock-pages');
    await page.waitForSelector('.wiki-sidebar.is-open');
    assert(await page.evaluate(() => document.getElementById('wiki-sidebar').getAttribute('aria-modal') === 'true' && document.activeElement.closest('#wiki-sidebar') !== null), 'sheet is not a focused dialog');
    await page.keyboard.press('Escape');
    assert(await page.evaluate(() => !document.querySelector('.wiki-sidebar.is-open') && document.activeElement.id === 'wiki-dock-pages'), 'Esc does not close the sheet / restore focus');
    await page.click('#wiki-dock-pages');
    await page.waitForSelector('.wiki-sidebar.is-open');
    await page.click('.wiki-nav-link[data-page="tags"]');
    await page.waitForFunction(() => new URL(location.href).searchParams.get('p') === 'tags');
    assert(await page.evaluate(() => !document.querySelector('.wiki-sidebar.is-open') && document.activeElement.id === 'wiki-h1'), 'sheet not closed / heading not focused');
    assert(await page.evaluate(() => document.getElementById('wiki-dock-cur').textContent) === 'Tags', 'dock does not show the current page');
    // search from the dock
    await page.click('#wiki-dock-search');
    assert(await page.evaluate(() => document.activeElement.id === 'wiki-q'), 'dock search does not focus the input');
    await page.keyboard.type('condicao');
    await page.waitForSelector('#wiki-results:not([hidden]) .wr-opt');
    assert(!(await page.isVisible('#wiki-nav')), 'page list still shown under the results');
    await page.click('.wr-opt');
    await page.waitForFunction(() => !document.querySelector('.wiki-sidebar.is-open') && document.querySelector('.wiki-hit'));
    assert(page.__errors.length === 0, page.__errors.join(' | '));
    await ctx.close();
  });

  await test('search ordinals match the rendered page on every page (generated AV/OV rows, AP tables, temas, reports)', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html');
    const idx = await page.evaluate(() => WikiApp.ensureIndex().then(i => i.map(e => [e.page, e.ord, e.text])));
    const bad = [];
    for (const k of keys) {
      await page.evaluate(k => WikiApp.go(k), k);
      await page.waitForFunction(k => new URL(location.href).searchParams.get('p') === (k === 'index' ? null : k) && document.querySelector('#wiki-content h1'), k);
      const mine = idx.filter(e => e[0] === k);
      const got = await page.evaluate(ords => { const b = WikiApp.blocks(document.getElementById('wiki-content')); return ords.map(o => b[o] ? WikiApp.ownText(b[o]).replace(/\s+/g, ' ').trim() : null); }, mine.map(e => e[1]));
      mine.forEach((e, i) => { if (got[i] !== e[2]) bad.push(k + '#' + e[1] + ': index "' + e[2].slice(0, 40) + '" vs page "' + String(got[i]).slice(0, 40) + '"'); });
    }
    assert(!bad.length, bad.length + ' misaligned: ' + bad.slice(0, 3).join(' | '));
    // the reported case: the legend item, not the first generated table row
    await page.fill('#wiki-q', 'sucesso automatico');
    await page.waitForSelector('#wiki-results:not([hidden]) .wr-opt[data-page="acao_resultado"]');
    await page.click('.wr-opt[data-page="acao_resultado"]');
    await page.waitForSelector('.wiki-hit');
    const hit = await page.evaluate(() => { const el = document.querySelector('.wiki-hit'); return el.tagName + ' ' + el.textContent; });
    assert(/^LI .*sucesso automático/.test(hit), 'landed on: ' + hit.slice(0, 60));
    await ctx.close();
  });

  await test('desktop: search results stay above the sticky table headers', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html?p=aps_referencia');
    await page.fill('#wiki-q', 'a');
    await page.waitForSelector('#wiki-results:not([hidden]) .wr-opt');
    const hit = await page.evaluate(() => {
      const th = document.querySelector('#wiki-content thead th:nth-child(2)'), r = document.getElementById('wiki-results').getBoundingClientRect();
      window.scrollBy(0, th.getBoundingClientRect().top - (r.top + 60));
      const b = th.getBoundingClientRect(), x = b.left + 5, y = b.top + 5;
      if (!(x > r.left && x < r.right && y > r.top && y < r.bottom)) return 'header not under the popover';
      return document.elementFromPoint(x, y).closest('#wiki-results') ? 'results' : document.elementFromPoint(x, y).tagName;
    });
    assert(hit === 'results', 'covered by: ' + hit);
    await ctx.close();
  });

  await test('bare wiki.html offers "continue at" the last page read, and the intro never overwrites it', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html?p=tags');
    await page.goto(base + '/wiki.html', { waitUntil: 'load' });
    await page.waitForSelector('#wiki-content h1');
    assert(await page.isVisible('#wiki-resume .wiki-resume-link'), 'no resume link');
    assert((await page.textContent('#wiki-resume')).includes('Tags'), 'resume points elsewhere: ' + await page.textContent('#wiki-resume'));
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(250);
    assert(JSON.parse(await page.evaluate(() => localStorage.getItem('cerebro_wiki_last'))).p === 'tags', 'intro overwrote the record');
    await page.click('#wiki-resume a');
    await page.waitForFunction(() => new URL(location.href).searchParams.get('p') === 'tags');
    await ctx.close();
  });

  await test('Enter during a cold index load (temas.json in flight) still opens the first result', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html');
    let release;
    const held = new Promise(r => { release = r; });
    await page.route(/temas\.json/, async r => { await held; r.continue(); });
    await page.focus('#wiki-q');
    await page.keyboard.type('telepatia');
    await page.waitForTimeout(250); // debounce fired: the search is waiting on temas.json
    await page.keyboard.press('Enter');
    release();
    await page.waitForFunction(() => new URL(location.href).searchParams.get('p'), null, { timeout: 5000 });
    await page.waitForSelector('.wiki-hit');
    await ctx.close();
  });

  await test('mobile: after picking a search result, PAGES shows the page list again', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html', { mobile: true });
    await page.click('#wiki-dock-search');
    await page.keyboard.type('condicao');
    await page.waitForSelector('#wiki-results:not([hidden]) .wr-opt');
    await page.click('.wr-opt');
    await page.waitForFunction(() => !document.querySelector('.wiki-sidebar.is-open') && document.querySelector('.wiki-hit'));
    await page.click('#wiki-dock-pages');
    await page.waitForSelector('.wiki-sidebar.is-open');
    assert(await page.isVisible('.wiki-nav-link[data-page="tags"]'), 'page list hidden in the PAGES sheet');
    // the search dock brings the (still typed) results back in place of the list
    await page.click('#wiki-sheet-close');
    await page.click('#wiki-dock-search');
    await page.waitForSelector('#wiki-results:not([hidden]) .wr-opt');
    assert(!(await page.isVisible('#wiki-nav')), 'page list shown under the results');
    await ctx.close();
  });

  await test('AV/OV table: tapping a cell cross-highlights and opens the AP panel; leaving the page clears it', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html?p=acao_resultado');
    await page.click('#action-table tbody tr:nth-child(5) td:nth-child(6)');
    assert(await page.evaluate(() => !!document.getElementById('ar-display') && document.querySelectorAll('#action-table .is-cross').length === 1), 'no cross highlight / AP panel');
    await page.click('.ar-type-btn[data-type="evrv"]');
    assert(await page.evaluate(() => document.querySelector('.ar-type-btn[data-type="evrv"]').getAttribute('aria-pressed') === 'true' && document.querySelector('#action-table').classList.contains('has-rowh')), 'EV/RV switch lost its state or sticky column');
    await page.click('.wiki-nav-link[data-page="tags"]');
    await page.waitForFunction(() => new URL(location.href).searchParams.get('p') === 'tags');
    assert(await page.evaluate(() => !document.getElementById('ar-display')), 'AP panel survived navigation');
    await ctx.close();
  });

  await test('language switch keeps the page; UI chrome translated, rules content stays Portuguese', async () => {
    const { ctx, page } = await open(browser, base, 'wiki.html?p=combate');
    await page.click('#lang-toggle-btn');
    await page.waitForLoadState('load');
    await page.waitForFunction(() => document.documentElement.lang === 'en' && document.querySelector('#wiki-content h1'));
    assert((await qp(page)) === 'combate' && (await h1(page)) === 'Combate', 'page lost on language switch');
    const en = await page.evaluate(() => ({ ph: document.getElementById('wiki-q').placeholder, nav: document.querySelector('.wiki-nav-link[data-page="index"]').textContent, sec: document.querySelector('.wiki-nav-title').textContent, lang: document.getElementById('wiki-content').lang, raw: /\bwiki\.[a-zA-Z]+/.test(document.body.innerText) }));
    assert(en.ph === 'Search the rules…' && en.nav === 'Introduction' && en.sec === 'Rules', 'chrome not translated: ' + JSON.stringify(en));
    assert(en.lang === 'pt-BR', 'article not marked as Portuguese');
    assert(!en.raw, 'raw i18n key visible');
    await ctx.close();
  });

  await browser.close();
  srv.close();
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})();

module.exports = { startServer, open };
