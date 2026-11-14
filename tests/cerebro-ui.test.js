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
    var apply=function(){var n=_npcs.find(function(x){return x.id===id;});if(n){n.name=d.name;n.codename=d.codename;n.faction=d.faction;n.danger=d.danger;n.data=d.data;n.foto_url=d.foto_url;}return n;};
    ${opts && opts.delayUpdate ? 'return new Promise(function(r){window.__releaseUpdate=function(){r(apply());};});' : 'return Promise.resolve(apply());'}},
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

  await test('MD import over a themed NPC updates grau in temas and tags (review #1)', async () => {
    const { ctx: c, page: p } = await openCerebro(browser, base);
    await p.click('#npc-list [data-id="npc-mag"]');
    await p.evaluate(() => {
      document.getElementById('import-text').value = '# NPC: Erik Lehnsherr\n**Fração:** irmandade\n**Perigo:** extremo\n\n## Tags\n- controle magnético total  (AP 35)\n- Voo Magnético\n- Tag Nova (AP 5)\n\n## Descrição\nx\n';
      return importarMarkdown();
    });
    const d = await p.evaluate(() => window.__calls.update[0].data.data);
    eq(d.temas.length, 3, 'temas dropped');
    const pod = d.temas[0].poder;
    eq(pod.find(x => x.texto === 'Controle Magnético Total'), { texto: 'Controle Magnético Total', grau: 35 }, 'tema grau not updated');
    eq(pod.find(x => x.texto === 'Voo Magnético'), { texto: 'Voo Magnético' }, 'ungraded import did not clear tema grau');
    eq(pod.find(x => x.texto === 'Campo de Força'), { texto: 'Campo de Força', grau: 26 }, 'tag absent from MD changed');
    assert(d.tags.some(x => x.texto.toLowerCase() === 'controle magnético total' && x.grau === 35), 'tags lost new grau: ' + JSON.stringify(d.tags));
    assert(d.tags.some(x => x.texto === 'Tag Nova' && x.grau === 5), 'unmatched tag not kept in tags');
    assert(!d.temas.some(tm => [...tm.poder, ...tm.fraqueza].some(x => x.texto === 'Tag Nova')), 'unmatched tag leaked into temas');
    await p.waitForFunction(() => document.querySelector('#npc-detail .cs-pow .ap-n'));
    eq((await p.textContent('#npc-detail .cs-pow .ap-n')).trim(), '35', 'detail still shows old AP');
    eq(p.__errors || [], [], 'page errors');
    await c.close();
  });

  await test('deleting the shown NPC resets the detail to the empty state (review #2)', async () => {
    const { ctx: c, page: p } = await openCerebro(browser, base);
    p.on('dialog', dl => dl.accept());
    await p.click('#npc-list [data-id="npc-mid"]');
    await p.click('#npc-detail [data-act="del"]');
    await p.waitForFunction(() => !document.querySelector('#npc-list [data-id="npc-mid"]'));
    assert(await p.$('#npc-detail .empty-state'), 'detail not reset: ' + (await p.textContent('#npc-detail')).slice(0, 80));
    assert(!(await p.$('#npc-detail [data-act]')), 'stale action buttons remain');
    await c.close();
    const { ctx: m, page: q } = await openCerebro(browser, base, { viewport: { width: 390, height: 800 }, touch: true, mobile: true });
    q.on('dialog', dl => dl.accept());
    await q.click('#npc-list [data-id="npc-mid"]');
    await q.click('#npc-detail [data-act="del"]');
    await q.waitForSelector('#npc-list [data-id="npc-low"]', { state: 'visible', timeout: 3000 });
    assert(!(await q.evaluate(() => document.body.classList.contains('mob-detail'))), 'mobile stayed on detail');
    await m.close();
  });

  await test('a pending save never closes or relabels a form opened afterwards (review #3)', async () => {
    const { ctx: c, page: p } = await openCerebro(browser, base, { delayUpdate: true });
    await p.click('#npc-list [data-id="npc-mid"]');
    await p.click('#npc-detail [data-act="edit"]');
    await p.click('#btn-salvar-npc');
    await p.waitForFunction(() => typeof window.__releaseUpdate === 'function');
    assert(await p.$eval('#btn-salvar-npc', b => b.disabled), 'save button not disabled while saving');
    assert(/SALVANDO/i.test(await p.textContent('#btn-salvar-npc')), 'no saving label: ' + await p.textContent('#btn-salvar-npc'));
    await p.keyboard.press('Escape');
    await p.click('#npc-list [data-id="npc-low"]');
    await p.click('#npc-detail [data-act="edit"]');
    assert(!(await p.$eval('#btn-salvar-npc', b => b.disabled)), 'second form inherits disabled save');
    await p.fill('#f-nome', 'Rascunho');
    await p.evaluate(() => window.__releaseUpdate());
    await p.waitForSelector('#toast.show');
    await p.waitForTimeout(150);
    assert(await p.isVisible('#modal-npc'), 'second form was closed by the first save');
    eq(await p.inputValue('#f-nome'), 'Rascunho', 'draft lost');
    eq(await p.evaluate(() => editingId), 'npc-low', 'editingId changed');
    eq(await p.$eval('#npc-list .npc-row.active', r => r.dataset.id), 'npc-low', 'selection hijacked by the old save');
    await c.close();
  });

  await test('collapsed encounter panel holds no focusable controls (review #4)', async () => {
    const { ctx: c, page: p } = await openCerebro(browser, base);
    const tabFromRound = async () => { await p.focus('.enc-round-btn:last-of-type'); await p.keyboard.press('Tab'); return p.evaluate(() => !!document.activeElement.closest('#enc-body')); };
    eq(await p.$eval('#enc-toggle', b => b.getAttribute('aria-expanded')), 'false', 'starts collapsed');
    assert(await p.$eval('#enc-body', b => b.inert), 'collapsed body not inert');
    eq(await tabFromRound(), false, 'Tab entered collapsed encounter body');
    await p.click('#enc-toggle');
    assert(!(await p.$eval('#enc-body', b => b.inert)), 'open body still inert');
    eq(await tabFromRound(), true, 'Tab skips open encounter body');
    await p.click('#enc-toggle');
    eq(await tabFromRound(), false, 'Tab entered re-collapsed body');
    /* other collapsibles: collapsed region has no rendered focusable descendant */
    const noFocusable = sel => p.$eval(sel, el => [...el.querySelectorAll('button,input,select,textarea,a[href]')].every(x => x.offsetParent === null || x.closest('[inert]')));
    eq(await p.$eval('#filter-toggle', b => b.getAttribute('aria-expanded')), 'false', 'filters start closed');
    assert(await noFocusable('#filter-body'), 'closed filter panel has focusable controls');
    await p.click('#npc-list [data-id="npc-mag"]');
    await p.click('#npc-detail .npc-tema-card .ntc-hd');
    assert(await noFocusable('#npc-detail .npc-tema-card.collapsed .ntc-body'), 'collapsed tema card has focusable controls');
    await c.close();
  });

  /* NPC with temas whose data.tags also holds tags outside every tema ("loose"), plus a mirrored weakness */
  const NOTURNO = {
    id: 'npc-nc', name: 'Kurt Wagner', codename: 'Noturno', faction: 'x-men', danger: 'alto', is_global: false, foto_url: '',
    data: {
      stats: { destreza: 10, 'força': 4, corpo: 5, 'inteligência': 5, vontade: 6, mente: 5, 'influência': 4, aura: 5, 'espírito': 7 },
      temas: [{ nome: 'Acrobata', poder: [{ texto: 'Acrobacia Sobre-humana', grau: 6 }, { texto: 'Cauda Preênsil' }], fraqueza: [{ texto: 'Aparência Demoníaca' }] }],
      tags: [{ texto: 'Acrobacia Sobre-humana', grau: 6 }, { texto: ' aparência demoníaca ' }, { texto: 'Teletransporte via Dimensão Sombria (bamf)', grau: 9 }, { texto: 'Visão no Escuro' }]
    }
  };
  const LOOSE_A = 'Teletransporte via Dimensão Sombria (bamf)', LOOSE_B = 'Visão no Escuro';
  const looseCard = p => p.$$eval('#npc-detail .npc-tema-card.loose .ntag', els => els.map(e => [e.querySelector('.ntag-t').textContent, e.querySelector('.ap-n') ? e.querySelector('.ap-n').textContent : null]));
  const keyOf = s => s.trim().toLowerCase();

  await test('loose tags (in data.tags, outside every tema) are shown, ranked and searchable (follow-up 2)', async () => {
    const { ctx: c, page: p } = await openCerebro(browser, base, { npcs: [...NPCS, NOTURNO] });
    await p.click('#npc-list [data-id="npc-nc"]');
    eq(await looseCard(p), [[LOOSE_A, '9'], [LOOSE_B, null]], 'loose card');
    assert(/TAGS AVULSAS/.test(await p.textContent('#npc-detail .npc-tema-card.loose .ntc-title')), 'loose card title');
    eq(await p.$$eval('#npc-detail .cs-pow .cs-pow-t', e => e.map(x => x.textContent)), [LOOSE_A, 'Acrobacia Sobre-humana', 'Cauda Preênsil'], 'top powers: graded loose ranks first');
    eq(await p.evaluate(n => powersOf(NPC_DB.find(x => x.id === 'npc-nc')).map(x => x.texto), LOOSE_B), [ 'Acrobacia Sobre-humana', 'Cauda Preênsil', LOOSE_A], 'strip candidates: only graded loose tags count');
    eq(await p.$$eval('#npc-detail .npc-tema-card:not(.loose) .ntag-t', e => e.map(x => x.textContent)).then(a => a.filter(x => keyOf(x) === 'aparência demoníaca').length), 1, 'mirrored weakness duplicated');
    await p.fill('#search-inp', 'visão no escuro'); await p.waitForTimeout(250);
    eq(await p.$$eval('#npc-list [data-id]', e => e.map(x => x.dataset.id)), ['npc-nc'], 'search misses loose tag');
    await p.fill('#search-inp', ''); await p.waitForTimeout(250);
    assert(await p.$(`#tag-pills [data-tag="${LOOSE_B}"]`), 'tag filter misses loose tag');
    await c.close();
    /* NPC without temas: flat fallback only, no loose card */
    const { ctx: c2, page: p2 } = await openCerebro(browser, base, { npcs: [{ ...NOTURNO, id: 'npc-flat', data: { ...NOTURNO.data, temas: [] } }] });
    await p2.click('#npc-list [data-id="npc-flat"]');
    eq(await p2.$$eval('#npc-detail .npc-tema-card', e => e.length), 0, 'no-tema NPC rendered cards');
    eq(await p2.$$eval('#npc-detail .tags-wrap .ntag', e => e.length), 4, 'no-tema fallback list');
    await c2.close();
  });

  await test('editor round-trips, edits and deletes loose tags without dropping or duplicating (follow-up 1+3)', async () => {
    const { ctx: c, page: p } = await openCerebro(browser, base, { npcs: [...NPCS, NOTURNO] });
    await p.click('#npc-list [data-id="npc-nc"]');
    await p.click('#npc-detail [data-act="edit"]');
    eq(await p.$$eval('#avulsas-edit-list [data-tipo="avulsa"][data-f="texto"]', e => e.map(x => x.value)), [LOOSE_A, LOOSE_B], 'loose section in editor');
    await p.click('#btn-salvar-npc');
    await p.waitForFunction(() => window.__calls.update.length === 1);
    let tags = await p.evaluate(() => window.__calls.update[0].data.data.tags);
    eq(tags.find(x => x.texto === LOOSE_A), { texto: LOOSE_A, grau: 9 }, 'graded loose tag lost on no-op save');
    eq(tags.find(x => x.texto === LOOSE_B), { texto: LOOSE_B }, 'ungraded loose tag lost on no-op save');
    eq(tags.length, new Set(tags.map(x => keyOf(x.texto))).size, 'duplicate tags ' + JSON.stringify(tags));
    assert(tags.some(x => x.texto === 'Cauda Preênsil') && tags.some(x => x.texto === 'Aparência Demoníaca'), 'themed tags missing');
    await p.waitForFunction(() => !document.querySelector('#modal-npc.open'));
    eq(await looseCard(p), [[LOOSE_A, '9'], [LOOSE_B, null]], 'loose card after save');
    await p.click('#npc-detail [data-act="edit"]');
    await p.fill('#avulsas-edit-list [data-tipo="avulsa"][data-j="0"][data-f="grau"]', '14');
    await p.click('#avulsas-edit-list [data-act="tag-del"][data-j="1"]');
    await p.fill('#tema-0-avulsa-inp', 'Fé Inabalável');
    await p.fill('#tema-0-avulsa-grau', '3');
    await p.press('#tema-0-avulsa-inp', 'Enter');
    await p.click('#btn-salvar-npc');
    await p.waitForFunction(() => window.__calls.update.length === 2);
    tags = await p.evaluate(() => window.__calls.update[1].data.data.tags);
    eq(tags.find(x => x.texto === LOOSE_A), { texto: LOOSE_A, grau: 14 }, 'loose AP edit');
    assert(!tags.some(x => x.texto === LOOSE_B), 'deleted loose tag still saved');
    eq(tags.find(x => x.texto === 'Fé Inabalável'), { texto: 'Fé Inabalável', grau: 3 }, 'added loose tag');
    const temas = await p.evaluate(() => window.__calls.update[1].data.data.temas);
    assert(!temas.some(tm => [...tm.poder, ...tm.fraqueza].some(x => x.texto === LOOSE_A || x.texto === 'Fé Inabalável')), 'loose tags leaked into temas');
    eq(p.__errors || [], [], 'page errors');
    await c.close();
  });

  await test('MD import: unmatched tag lands in the loose card and the payload (follow-up 4)', async () => {
    const { ctx: c, page: p } = await openCerebro(browser, base);
    await p.click('#npc-list [data-id="npc-mid"]');
    await p.evaluate(() => {
      document.getElementById('import-text').value = '# NPC: Yuriko Oyama\n**Fração:** vilao\n**Perigo:** alto\n\n## Tags\n- Garras de Adamantium (AP 18)\n- Fator de Cura Parcial (AP 7)\n\n## Descrição\nx\n';
      return importarMarkdown();
    });
    const d = await p.evaluate(() => window.__calls.update[0].data.data);
    eq(d.tags.find(x => x.texto === 'Fator de Cura Parcial'), { texto: 'Fator de Cura Parcial', grau: 7 }, 'unmatched tag not in payload');
    assert(d.tags.some(x => x.texto === 'Reflexos Cibernéticos'), 'themed tag absent from MD dropped from tags');
    await p.waitForSelector('#npc-detail .npc-tema-card.loose');
    eq(await looseCard(p), [['Fator de Cura Parcial', '7']], 'imported loose tag not visible');
    await c.close();
  });

  await test('English: switching language re-renders the shown NPC in English, no raw keys (review #5)', async () => {
    const { ctx: c, page: p } = await openCerebro(browser, base);
    await p.click('#npc-list [data-id="npc-mag"]');
    await Promise.all([p.waitForNavigation({ waitUntil: 'load' }), p.click('#lang-toggle-btn')]);
    await p.waitForFunction(() => document.querySelector('#npc-detail .combat-strip'), null, { timeout: 8000 });
    const txt = s => p.$eval(s, e => e.textContent.trim());
    eq(await txt('#npc-detail .cs-code'), '// COMBAT PROFILE', 'combat profile');
    eq(await txt('#npc-detail .cs-def-lbl'), 'DEFENSES', 'defenses');
    const secs = await p.$$eval('#npc-detail .sec-label', e => e.map(x => x.textContent.trim()));
    eq(secs, ['Attributes', 'Themes', 'Dossier'], 'section headings');
    eq(await txt('#npc-detail .amx-g'), 'Physical', 'attr group');
    eq(await txt('#npc-detail [data-act="enc-add"]'), '+ ADD TO ENCOUNTER', 'encounter action');
    eq(await txt('#npc-detail [data-act="edit"]'), 'EDIT', 'edit button');
    assert((await p.$eval('#npc-detail .cs-pow .ap', e => e.getAttribute('aria-label'))).includes('Omega'), 'AP band not English');
    eq(await txt('#mob-back'), 'LIST', 'mobile back');
    eq(await txt('#perigo-pills [data-perigo="baixo"]'), 'LOW', 'danger pill');
    eq(await p.$eval('#left-panel', e => e.getAttribute('aria-label')), 'NPC list', 'panel aria-label');
    assert(!/CARREGANDO|LOADING/.test(await txt('#save-ind')), 'status clobbered');
    const leaks = await p.evaluate(() => {
      const bits = [document.body.innerText];
      document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(e => ['aria-label', 'title', 'placeholder'].forEach(a => e.hasAttribute(a) && bits.push(e.getAttribute(a))));
      return bits.join('\n').split('\n').filter(l => /undefined|\b(cerebro|common|danger|faction|ficha|wiki)\.[a-zA-Z]/.test(l));
    });
    eq(leaks, [], 'raw keys / undefined rendered');
    await p.click('#npc-detail [data-act="edit"]');
    eq(await txt('#modal-npc-title'), 'EDIT NPC', 'modal title');
    eq(await txt('#modal-npc .stat-lbl-sm'), 'Dexterity', 'stat label');
    await p.keyboard.press('Escape');
    if (process.env.SHOT) await p.screenshot({ path: process.env.SHOT, fullPage: false });
    eq(p.__errors || [], [], 'page errors');
    await p.evaluate(() => localStorage.removeItem('cerebro_idioma'));
    await c.close();
  });

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
