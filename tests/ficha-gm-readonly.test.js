/**
 * ficha.html — GM opens another player's sheet read-only (Playwright, no network, no DB).
 * Real page code runs; Supabase/auth/api are replaced by in-page stubs that record saves.
 *
 *   node tests/ficha-gm-readonly.test.js
 *   SHOTS=/some/dir node tests/ficha-gm-readonly.test.js   # also writes screenshots
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { startServer } = require('./cerebro-ui.test.js');

const OWNER = 'player-7';
const CHAR = {
  id: 'pc-7', player_id: OWNER, name: 'Kitty Pryde', codename: 'Lince Negra',
  data: {
    nome: 'Kitty Pryde', codinome: 'Lince Negra', jogador: 'Ana', status: 'Ferida leve',
    progressao: 2,
    temas: [{ titulo: 'Fase', tipo: 'adaptabilidade', valor: 1,
      poder: ['Intangível', 'Atravessa paredes', '', '', '', '', '', '', '', ''],
      fraqueza: ['Desorientação', '', '', ''], melhorias_checked: [] }]
  }
};

function stubScript(uid) {
  return `
window.getSupabaseClient=function(){return null;};
window.cache=null;
window.__saves=[];
window.requireAuth=function(){return Promise.resolve({session:{user:{id:${JSON.stringify(uid)}}},profile:{id:${JSON.stringify(uid)},role:'gm'}});};
window.logout=function(){};
var _char=${JSON.stringify(CHAR)};
window.api=Object.assign(window.api||{},{
  getPlayerParty:function(){return Promise.resolve({id:'party-1'});},
  getGMParty:function(){return Promise.resolve({id:'party-1'});},
  loadCharacter:function(){return Promise.resolve(JSON.parse(JSON.stringify(_char)));},
  saveCharacter:function(id,d){window.__saves.push({id:id,payload:JSON.parse(JSON.stringify(d))});return Promise.resolve(Object.assign({},_char,d));}
});`;
}

async function openFicha(browser, base, uid, opts = {}) {
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 1280, height: 800 }, deviceScaleFactor: opts.dsf || 1, hasTouch: !!opts.mobile, isMobile: !!opts.mobile });
  const page = await ctx.newPage();
  page.__errors = [];
  page.on('pageerror', e => page.__errors.push(e.message));
  page.on('dialog', d => d.dismiss());
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  for (const m of ['supabase-client', 'cache-module', 'auth-module', 'pwa']) {
    await page.route(new RegExp('assets/js/' + m + '\\.js'), r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  }
  await page.route(/assets\/js\/api\.js/, r => r.fulfill({ contentType: 'text/javascript', body: stubScript(uid) }));
  await page.goto(base + '/ficha.html?id=' + CHAR.id, { waitUntil: 'load' });
  await page.waitForFunction(() => document.querySelectorAll('#temas-grid .tcard').length > 0 && document.getElementById('nome').value, null, { timeout: 8000 });
  return { ctx, page };
}

const saves = page => page.evaluate(() => window.__saves.length);

/* every mutating interaction we can reach; none of them may change state or save */
async function pokeEverything(page) {
  await page.click('.tab:nth-child(1)');
  await page.locator('#nome').pressSequentially('XX', { timeout: 1000 }).catch(() => {});
  await page.locator('#status').pressSequentially('YY', { timeout: 1000 }).catch(() => {});
  await page.locator('#stat-forca').pressSequentially('5', { timeout: 1000 }).catch(() => {});
  await page.click('.tab:nth-child(2)');
  const card = page.locator('#temas-grid .tcard').first();
  const tryClick = async sel => { const l = card.locator(sel).first(); if (await l.count()) await l.click({ timeout: 500, force: true }).catch(() => {}); };
  await card.locator('.card-title-inp').pressSequentially('ZZ', { timeout: 1000 }).catch(() => {});
  await card.locator('.tag-inp').first().pressSequentially('QQ', { timeout: 1000 }).catch(() => {});
  for (const s of ['.q-btn', '.tag-burn-btn', '.tag-gen', '.mel-row', '.add-tag-btn', '.del-card-btn']) await tryClick(s);
  await card.locator('.tipo-sel').selectOption('bastiao', { timeout: 500, force: true }).catch(() => {});
  const add = page.locator('#temas-grid .add-card-btn');
  if (await add.count()) await add.click({ timeout: 500, force: true }).catch(() => {});
  await page.click('.tab:nth-child(5)');
  await page.locator('#dots-prog .dot').nth(4).click({ timeout: 500, force: true }).catch(() => {});
  await page.locator('.evo-chk').first().click({ timeout: 500, force: true }).catch(() => {});
  await page.click('.tab:nth-child(4)');
  await page.locator('#estado-reduce-temp').click({ timeout: 500, force: true }).catch(() => {});
  await page.click('.tab:nth-child(1)');
  // the autosave triggers that do not need the inputs
  await page.evaluate(() => { window.salvarAuto && window.salvarAuto(); document.dispatchEvent(new Event('visibilitychange')); window.dispatchEvent(new Event('pagehide')); });
  await page.waitForTimeout(1300); // > 1s debounce
}

if (require.main === module) (async () => {
  const srv = await startServer();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch();
  const SHOTS = process.env.SHOTS;
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
  let passed = 0, failed = 0;
  async function test(name, fn) {
    try { await fn(); console.log('✅ ' + name); passed++; }
    catch (e) { console.log('❌ ' + name + ': ' + e.message.split('\n')[0]); failed++; }
  }
  function assert(c, m) { if (!c) throw new Error(m); }

  /* ── GM on another player's sheet ── */
  const { ctx, page } = await openFicha(browser, base, 'gm-1');

  await test('GM on another player\'s sheet: read-only bar with name + edit button', async () => {
    const bar = page.locator('#ro-bar');
    assert(await bar.isVisible(), 'no #ro-bar');
    const txt = (await bar.innerText()).toUpperCase();
    assert(/SOMENTE LEITURA/.test(txt), 'bar text: ' + txt);
    assert(/LINCE NEGRA/.test(txt), 'bar does not name the sheet: ' + txt);
    assert(/EDITAR FICHA/.test(await page.locator('#ro-btn').innerText()), 'button label');
    assert(!/CLASSIFICADO/.test(txt), 'uses Classificado');
    assert(await page.locator('#ro-bar [aria-live]').count() > 0, 'no aria-live region');
  });

  await test('read-only: inputs inert, values kept legible', async () => {
    const st = await page.evaluate(() => ({
      nome: document.getElementById('nome').readOnly,
      status: document.getElementById('status').readOnly,
      chk: [...document.querySelectorAll('.mel-chk')].every(c => c.disabled),
      sel: [...document.querySelectorAll('.tipo-sel')].every(c => c.disabled),
      btns: [...document.querySelectorAll('#temas-grid .q-btn, #temas-grid .tag-burn-btn, #temas-grid .tag-gen')].every(b => b.disabled),
      foto: document.getElementById('foto-input').disabled,
      collapse: [...document.querySelectorAll('.card-collapse-btn')].every(b => !b.disabled),
      fs: parseFloat(getComputedStyle(document.getElementById('nome')).fontSize)
    }));
    assert(st.nome && st.status, 'text fields editable');
    assert(st.chk && st.sel && st.btns && st.foto, 'controls not disabled ' + JSON.stringify(st));
    assert(st.collapse, 'collapse must stay usable');
    assert(st.fs >= 11, 'font below floor');
  });

  await test('read-only: every interaction leaves data untouched and NOTHING is saved', async () => {
    await pokeEverything(page);
    assert(await saves(page) === 0, 'save called ' + await saves(page) + 'x');
    const s = await page.evaluate(() => ({ nome: document.getElementById('nome').value, prog: D.progressao, valor: D.temas[0].valor, tipo: D.temas[0].tipo, n: D.temas.length, burned: (D.temas[0].poder_burned || []).some(Boolean) }));
    assert(s.nome === 'Kitty Pryde', 'nome changed: ' + s.nome);
    assert(s.prog === 2 && s.valor === 1 && s.tipo === 'adaptabilidade' && s.n === 4 && !s.burned, 'state mutated ' + JSON.stringify(s));
  });

  await test('read-only: tabs work and collapse is view-only (not persisted)', async () => {
    await page.click('.tab:nth-child(2)');
    assert(await page.locator('#page-temas').isVisible(), 'tab did not switch');
    const card = page.locator('#temas-grid .tcard').first();
    await card.locator('.card-collapse-btn').click();
    assert(/collapsed/.test(await card.getAttribute('class')), 'did not collapse');
    assert(await page.evaluate(() => !D.temas[0].collapsed), 'collapse written to data');
    await card.locator('.card-collapse-btn').click();
    assert(!/collapsed/.test(await card.getAttribute('class')), 'did not expand');
    await page.waitForTimeout(1200);
    assert(await saves(page) === 0, 'collapse saved');
  });

  if (SHOTS) {
    await page.click('.tab:nth-child(1)');
    await page.screenshot({ path: path.join(SHOTS, 'desktop-readonly.png') });
  }

  await test('"Editar ficha" enables editing immediately and saves', async () => {
    await page.click('.tab:nth-child(1)');
    await page.click('#ro-btn');
    const txt = (await page.locator('#ro-bar').innerText()).toUpperCase();
    assert(/VOLTAR PARA LEITURA/.test(txt), 'bar did not switch: ' + txt);
    assert(await page.evaluate(() => !document.getElementById('nome').readOnly), 'still readonly');
    await page.fill('#nome', 'Katherine Pryde');
    await page.waitForTimeout(1300);
    assert(await saves(page) >= 1, 'no save after edit');
    const last = await page.evaluate(() => window.__saves[window.__saves.length - 1].payload);
    assert(last.data.nome === 'Katherine Pryde', 'saved wrong data ' + last.data.nome);
    await page.click('.tab:nth-child(2)');
    await page.locator('#temas-grid .tcard').first().locator('.q-btn').first().click();
    assert(await page.evaluate(() => D.temas[0].valor) === 2, 'stepper inert in edit mode');
  });

  if (SHOTS) {
    await page.click('.tab:nth-child(1)');
    await page.screenshot({ path: path.join(SHOTS, 'desktop-editing.png') });
  }

  await test('"Voltar para leitura" flushes the pending edit, then blocks again', async () => {
    await page.click('.tab:nth-child(1)');
    await page.fill('#status', 'Recuperada');
    await page.click('#ro-btn'); // back to read-only before the debounce fires
    await page.waitForTimeout(300);
    const n = await saves(page);
    const last = await page.evaluate(() => window.__saves[window.__saves.length - 1].payload.data.status);
    assert(last === 'Recuperada', 'pending edit lost on switch: ' + last);
    assert(/SOMENTE LEITURA/i.test(await page.locator('#ro-bar').innerText()), 'bar not back');
    await pokeEverything(page);
    assert(await saves(page) === n, 'saved after returning to read-only');
  });

  await test('reopening the sheet starts read-only again', async () => {
    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => document.getElementById('nome').value, null, { timeout: 8000 });
    assert(await page.evaluate(() => document.getElementById('nome').readOnly), 'not read-only after reload');
  });

  await test('no page errors on the GM flow', async () => {
    assert(page.__errors.length === 0, 'errors: ' + page.__errors.join(' | '));
  });
  await ctx.close();

  /* ── owner opens own sheet ── */
  await test('owner: no bar, editable, saves as today', async () => {
    const { ctx, page } = await openFicha(browser, base, OWNER);
    assert(!(await page.locator('#ro-bar').isVisible()), 'owner sees read-only bar');
    assert(await page.evaluate(() => !document.getElementById('nome').readOnly), 'owner readonly');
    await page.fill('#nome', 'Kitty');
    await page.waitForTimeout(1300);
    assert(await saves(page) === 1, 'owner save count ' + await saves(page));
    assert(page.__errors.length === 0, 'errors: ' + page.__errors.join(' | '));
    await ctx.close();
  });

  /* ── mobile ── */
  await test('mobile 390×844: bar fits, no horizontal overflow, header not covered', async () => {
    const { ctx, page } = await openFicha(browser, base, 'gm-1', { viewport: { width: 390, height: 844 }, mobile: true, dsf: SHOTS ? 2 : 1 });
    const m = await page.evaluate(() => {
      const bar = document.getElementById('ro-bar').getBoundingClientRect();
      const hdr = document.querySelector('#header-container .header, #header-container header').getBoundingClientRect();
      const tabs = document.querySelector('.tabs').getBoundingClientRect();
      const btn = document.getElementById('ro-btn').getBoundingClientRect();
      return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, barTop: bar.top, barR: bar.right, hdrB: hdr.bottom, tabsB: tabs.bottom, btnH: btn.height, btnR: btn.right };
    });
    assert(m.sw <= m.cw, 'horizontal overflow ' + m.sw + '>' + m.cw);
    assert(m.barTop >= m.hdrB - 0.5 && m.barTop >= m.tabsB - 0.5, 'bar overlaps header/nav ' + JSON.stringify(m));
    assert(m.barR <= 390 && m.btnR <= 390, 'bar wider than viewport');
    assert(m.btnH >= 40, 'button below touch target: ' + m.btnH);
    if (SHOTS) {
      await page.screenshot({ path: path.join(SHOTS, 'mobile-readonly.png') });
      await page.click('#ro-btn');
      await page.screenshot({ path: path.join(SHOTS, 'mobile-editing.png') });
    }
    await ctx.close();
  });

  await browser.close();
  srv.close();
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})();
