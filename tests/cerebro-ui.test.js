/**
 * cerebro.html — browser regression tests (Playwright, no network, no DB).
 * Serves the repo from an ephemeral port and replaces Supabase/auth/api with
 * in-page stubs, so the real page code runs against fixture NPCs.
 *
 *   node tests/cerebro-ui.test.js
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

/* ── fixtures: graus on the universal AP scale (0-99) ── */
const NPCS = [
  {
    id: 'npc-mag', name: 'Erik Lehnsherr', codename: 'Magneto', faction: 'irmandade', danger: 'extremo', is_global: true, foto_url: '',
    data: {
      iniciativa: 30,
      stats: { destreza: 9, 'força': 7, corpo: 12, 'inteligência': 15, vontade: 15, mente: 13, 'influência': 14, aura: 11, 'espírito': 10 },
      temas: [
        { nome: 'Mestre do Magnetismo', poder: [{ texto: 'Voo Magnético', grau: 12 }, { texto: 'Controle Magnético Total', grau: 30 }, { texto: 'Estrategista Veterano' }, { texto: 'Campo de Força', grau: 26 }], fraqueza: [{ texto: 'Trauma do Holocausto' }, { texto: 'Arrogância', grau: 3 }] },
        { nome: '5', poder: [{ texto: 'Sentinela Mark 2' }, { texto: 'Rede de Contatos', grau: 8 }], fraqueza: [{ texto: 'Procurado pela S.H.I.E.L.D.' }] },
        { nome: 'Irmandade', poder: ['Líder Carismático'], fraqueza: [] }
      ],
      tags: [{ texto: 'Controle Magnético Total', grau: 30 }],
      descricao: 'Sobrevivente.\nRevolucionário.',
      esquadrao: 'Irmandade'
    }
  },
  {
    id: 'npc-mid', name: 'Yuriko Oyama', codename: 'Lady Letal', faction: 'vilao', danger: 'alto', is_global: false, foto_url: '',
    data: {
      stats: { destreza: 8, 'força': 6, corpo: 7, 'inteligência': 5, vontade: 6, mente: 4, 'influência': 3, aura: 2, 'espírito': 3 },
      temas: [{ nome: 'Ciborgue', poder: [{ texto: 'Garras de Adamantium', grau: 18 }, { texto: 'Reflexos Cibernéticos', grau: 9 }], fraqueza: [{ texto: 'Vingança Cega' }] }],
      tags: [{ texto: 'Garras de Adamantium', grau: 18 }]
    }
  },
  {
    id: 'npc-low', name: 'Pedro Alves', codename: 'Faísca', faction: 'novatos', danger: 'baixo', is_global: false, foto_url: '',
    data: {
      stats: { destreza: 3, 'força': 2, corpo: 3, 'inteligência': 4, vontade: 3, mente: 2, 'influência': 2, aura: 3, 'espírito': 2 },
      temas: [{ nome: 'Estudante', poder: [{ texto: '<img src=x onerror="window.__xss=1"><b>Escudo</b> & "aspas"', grau: 4 }, { texto: 'Faíscas' }], fraqueza: [{ texto: 'Inexperiente' }] }],
      tags: [{ texto: 'Faíscas' }]
    }
  }
];
const CHARS = [{ id: 'pc-1', name: 'Jogadora Um', codename: 'Pixel', data: { stats: { destreza: 4, inteligência: 3, influência: 2 } } }];

/* in-page stubs for the Supabase-backed modules */
function stubScript(npcs, chars, opts) {
  return `
window.getSupabaseClient=function(){return null;};
window.cache=null;
window.__calls={update:[],create:[]};
window.requireAuth=function(){return Promise.resolve({session:{user:{id:'gm-1'}},profile:{role:'gm'}});};
window.logout=function(){};
var _npcs=${JSON.stringify(npcs)}, _chars=${JSON.stringify(chars)};
window.api=Object.assign(window.api||{},{
  getGMParty:function(){return Promise.resolve({id:'party-1'});},
  getPlayerParty:function(){return Promise.resolve({id:'party-1'});},
  listAllNPCs:function(){return Promise.resolve(JSON.parse(JSON.stringify(_npcs)));},
  listNPCs:function(){return Promise.resolve(JSON.parse(JSON.stringify(_npcs)));},
  listPartyCharacters:function(){return Promise.resolve(JSON.parse(JSON.stringify(_chars)));},
  updateNPC:function(id,d){window.__calls.update.push({id:id,data:JSON.parse(JSON.stringify(d))});
    ${opts && opts.failUpdate ? "return Promise.reject(new Error('boom'));" : ''}
    var n=_npcs.find(function(x){return x.id===id;});if(n){n.name=d.name;n.codename=d.codename;n.faction=d.faction;n.danger=d.danger;n.data=d.data;n.foto_url=d.foto_url;}
    return Promise.resolve(n);},
  createNPC:function(pid,d){window.__calls.create.push({pid:pid,data:d});var n=Object.assign({id:'npc-new-'+_npcs.length,is_global:!!d.is_global},d);_npcs.push(n);return Promise.resolve(n);},
  deleteNPC:function(id){_npcs=_npcs.filter(function(x){return x.id!==id;});return Promise.resolve();}
});`;
}

async function stubPage(page, opts = {}) {
  const npcs = opts.npcs || NPCS, chars = opts.chars || CHARS;
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  if (opts.fontDir) {
    await page.route(/fonts\.googleapis\.com/, r => r.fulfill({ contentType: 'text/css', body: fs.readFileSync(path.join(opts.fontDir, 'fonts.css'), 'utf8') }));
    await page.route(/fonts\.gstatic\.com/, r => {
      const f = path.join(opts.fontDir, new URL(r.request().url()).pathname.slice(1).replace(/\//g, '_'));
      return fs.existsSync(f) ? r.fulfill({ contentType: 'font/woff2', body: fs.readFileSync(f) }) : r.abort();
    });
  } else {
    await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  }
  const body = stubScript(npcs, chars, opts);
  for (const m of ['supabase-client', 'cache-module', 'auth-module', 'pwa']) {
    await page.route(new RegExp('assets/js/' + m + '\\.js'), r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  }
  await page.route(/assets\/js\/api\.js/, r => r.fulfill({ contentType: 'text/javascript', body }));
}

async function openCerebro(browser, base, opts = {}) {
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 1280, height: 860 }, deviceScaleFactor: opts.dsf || 1, hasTouch: !!opts.touch, isMobile: !!opts.mobile });
  const page = await ctx.newPage();
  page.on('pageerror', e => (page.__errors = page.__errors || []).push(e.message));
  await stubPage(page, opts);
  await page.goto(base + '/cerebro.html', { waitUntil: 'load' });
  await page.waitForFunction(() => document.querySelectorAll('#npc-list [data-id]').length > 0, null, { timeout: 8000 });
  return { ctx, page };
}

module.exports = { startServer, stubPage, openCerebro, NPCS, CHARS };

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

  const { ctx, page } = await openCerebro(browser, base);

  await test('status leaves "carregando" after load and toolbar has no duplicate buttons', async () => {
    const st = await page.textContent('#save-ind');
    assert(!/CARREGANDO|LOADING/i.test(st), 'status still says ' + st);
    const labels = await page.$$eval('#toolbar-container .tbtn', bs => bs.map(b => b.textContent.trim()));
    eq(labels.length, new Set(labels).size, 'duplicate toolbar buttons ' + labels.join('|'));
  });

  await test('detail shows stored iniciativa and top-3 AP powers in the combat strip', async () => {
    await page.click('#npc-list [data-id="npc-mag"]');
    eq((await page.textContent('#npc-detail .cs-ini .cs-v')).trim(), '30', 'initiative');
    const top = await page.$$eval('#npc-detail .cs-pow .ap-n', els => els.map(e => e.textContent.trim()));
    eq(top, ['30', '26', '12'], 'top powers');
  });

  await test('tema named "5" gets a fallback title; ungraded weakness renders no AP marker', async () => {
    const titles = await page.$$eval('#npc-detail .ntc-title', els => els.map(e => e.textContent.trim()));
    assert(titles.includes('TEMA 02'), 'titles were ' + titles.join('|'));
    assert(!titles.includes('5'), 'bare number title rendered');
    const marks = await page.$$eval('#npc-detail .ntc-frq .ntag', els => els.map(e => !!e.querySelector('.ap')));
    eq(marks, [false, true, false], 'weakness AP markers');
    const order = await page.$$eval('#npc-detail .npc-tema-card:first-child .ntc-pod .ntag .ap-n', els => els.map(e => e.textContent));
    eq(order, ['30', '26', '12'], 'power tags sorted by AP desc');
  });

  await test('edit → save sends all 9 stats and graus as {texto,grau} (bugs 1 and 8)', async () => {
    await page.click('#npc-detail [data-act="edit"]');
    const vals = await page.$$eval('#modal-npc .stat-num', els => els.map(e => e.value));
    eq(vals, ['9', '7', '12', '15', '15', '13', '14', '11', '10'], 'edit modal stats');
    await page.click('#btn-salvar-npc');
    await page.waitForFunction(() => window.__calls.update.length === 1);
    const d = await page.evaluate(() => window.__calls.update[0].data.data);
    eq(d.stats, NPCS[0].data.stats, 'stats payload');
    eq(d.iniciativa, 30, 'stored initiative');
    const pod = d.temas[0].poder;
    assert(pod.some(t => t.texto === 'Controle Magnético Total' && t.grau === 30), 'grau 30 lost: ' + JSON.stringify(pod));
    assert(pod.some(t => t.texto === 'Estrategista Veterano' && !('grau' in t)), 'ungraded tag gained a grau');
    eq(d.temas[1].poder[0], { texto: 'Sentinela Mark 2' }, '"Sentinela Mark 2" misparsed');
    eq(d.temas[1].nome, '5', 'tema name data changed');
    eq(d.descricao, 'Sobrevivente.\nRevolucionário.', 'description');
    await page.waitForSelector('#toast.show', { timeout: 2000 });
  });

  await test('editor adds tags with grau 30 and keeps "Sentinela Mark 2" text intact', async () => {
    await page.click('#npc-detail [data-act="edit"]');
    await page.fill('#tema-0-poder-inp', 'Pulso Eletromagnético');
    await page.fill('#tema-0-poder-grau', '30');
    await page.press('#tema-0-poder-inp', 'Enter');
    await page.fill('#tema-0-poder-inp', 'Sentinela Mark 2');
    await page.fill('#tema-0-poder-grau', '');
    await page.press('#tema-0-poder-inp', 'Enter');
    await page.fill('#tema-0-poder-grau', '150');
    await page.fill('#tema-0-poder-inp', 'Clamp');
    await page.press('#tema-0-poder-inp', 'Enter');
    await page.click('#btn-salvar-npc');
    await page.waitForFunction(() => window.__calls.update.length === 2);
    const pod = await page.evaluate(() => window.__calls.update[1].data.data.temas[0].poder);
    assert(pod.some(t => t.texto === 'Pulso Eletromagnético' && t.grau === 30), JSON.stringify(pod));
    assert(pod.some(t => t.texto === 'Sentinela Mark 2' && !('grau' in t)), JSON.stringify(pod));
    assert(pod.some(t => t.texto === 'Clamp' && t.grau === 99), 'grau not clamped to 99');
  });

  await test('save failure surfaces an error toast and keeps the modal open', async () => {
    const { ctx: c2, page: p2 } = await openCerebro(browser, base, { failUpdate: true });
    await p2.click('#npc-list [data-id="npc-mid"]');
    await p2.click('#npc-detail [data-act="edit"]');
    await p2.click('#btn-salvar-npc');
    await p2.waitForSelector('#toast.show');
    assert(/ERRO/i.test(await p2.textContent('#toast')), 'toast: ' + await p2.textContent('#toast'));
    assert(await p2.isVisible('#modal-npc'), 'modal closed on failure');
    await c2.close();
  });

  await test('HTML in tag text is escaped, not executed', async () => {
    await page.click('#npc-list [data-id="npc-low"]');
    const html = await page.innerHTML('#npc-detail');
    assert(!/<b>Escudo/.test(html), 'raw <b> injected');
    assert((await page.textContent('#npc-detail')).includes('<b>Escudo</b> & "aspas"'), 'text not shown literally');
    eq(await page.evaluate(() => window.__xss), undefined, 'onerror executed');
  });

  await test('search matches tema names and power-tag text; tag filter ignores grau', async () => {
    await page.fill('#search-inp', 'magnético');
    await page.waitForTimeout(250);
    eq(await page.$$eval('#npc-list [data-id]', e => e.map(x => x.dataset.id)), ['npc-mag'], 'power search');
    await page.fill('#search-inp', 'ciborgue');
    await page.waitForTimeout(250);
    eq(await page.$$eval('#npc-list [data-id]', e => e.map(x => x.dataset.id)), ['npc-mid'], 'tema search');
    await page.fill('#search-inp', '');
    await page.waitForTimeout(250);
    const tags = await page.$$eval('#tag-pills .tag-pill', e => e.map(x => x.dataset.tag));
    assert(tags.includes('Garras de Adamantium') && !tags.some(t => /\d$/.test(t) && t !== 'Sentinela Mark 2'), 'tag pills: ' + tags.join('|'));
  });

  await test('reload keeps merged party members (bug 7)', async () => {
    assert(await page.$('#npc-list [data-id="pc-1"]'), 'party member missing at load');
    await page.evaluate(() => recarregarDB());
    await page.waitForTimeout(100);
    assert(await page.$('#npc-list [data-id="pc-1"]'), 'party member dropped on reload');
  });

  await test('Esc closes the edit modal and restores focus', async () => {
    await page.click('#npc-list [data-id="npc-mid"]');
    await page.focus('#npc-detail [data-act="edit"]');
    await page.keyboard.press('Enter');
    assert(await page.isVisible('#modal-npc'), 'modal not open');
    await page.keyboard.press('Escape');
    assert(!(await page.isVisible('#modal-npc')), 'Esc did not close');
    eq(await page.evaluate(() => document.activeElement && document.activeElement.dataset.act), 'edit', 'focus not restored');
  });

  await test('no page errors on desktop', async () => { eq(page.__errors || [], [], 'page errors'); });
  await ctx.close();

  for (const w of [360, 390]) {
    await test(`mobile ${w}px: list first, detail with back, no horizontal overflow`, async () => {
      const { ctx: m, page: p } = await openCerebro(browser, base, { viewport: { width: w, height: 800 }, touch: true, mobile: true });
      const over = () => p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      assert(await p.isVisible('#npc-list [data-id="npc-mag"]'), 'list not visible by default');
      eq(await over(), 0, 'list overflow');
      const h = await p.$eval('#npc-list [data-id="npc-mag"]', e => e.getBoundingClientRect().height);
      assert(h >= 44, 'row height ' + h);
      await p.click('#npc-list [data-id="npc-mag"]');
      assert(await p.isVisible('#mob-back'), 'no back control');
      eq(await over(), 0, 'detail overflow');
      const strip = await p.$eval('#npc-detail .combat-strip', e => e.getBoundingClientRect().bottom);
      assert(strip <= 800, 'combat strip below the fold: ' + strip);
      await p.click('#npc-detail [data-act="edit"]');
      eq(await over(), 0, 'edit modal overflow');
      const fs16 = await p.$eval('#f-nome', e => parseFloat(getComputedStyle(e).fontSize));
      assert(fs16 >= 16, 'input font ' + fs16);
      await p.keyboard.press('Escape');
      await p.click('#mob-back');
      await p.waitForSelector('#npc-list [data-id="npc-mag"]', { state: 'visible', timeout: 2000 });
      eq(p.__errors || [], [], 'page errors');
      await m.close();
    });
  }

  await browser.close();
  srv.close();
  console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
  process.exit(failed ? 1 : 0);
})();
