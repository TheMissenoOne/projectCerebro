// Wiki AV/OV · EV/RV tables — one column per AP (1–52), exactly like combate.html.
// ponytail: actionTarget / RES / resultRAPs are a verbatim copy of combate.html (source of truth:
// Acao_Resultado-TabelaCompleta.csv). No shared file because a new asset would also need a sw.js
// precache entry; if the tables change, edit combate.html and re-copy this block.
// The CSV has one typo on the d = 13 diagonal (rows 16–39 say 56); the progression gives 39.

function actionTarget(av, ov) {
  const d = Math.max(1, ov) - av;                 // OV/RV floor 1 (Sistema Híbrido §3.2)
  if (d <= -7) return 0;
  if (d < 0) return [10, 9, 8, 7, 5, 3][-d - 1];
  let v = 11;
  for (let i = 1; i <= d; i++) v += Math.floor((i - 1) / 4) + 1;
  return v;
}

// RESULT TABLE (EV/RV, "Efeitos temporários"): RES[ev-1][rv-1]; RV > EV = N (no effect).
const RES = [
  [1],
  [2,1],
  [4,3,1],
  [6,4,3,1],
  [8,5,4,3,2],
  [9,7,5,4,3,2],
  [11,8,7,5,4,3,2],
  [12,9,8,6,5,4,3,2],
  [14,11,9,8,7,5,4,3,2],
  [16,12,10,9,8,7,5,4,3,2],
  [17,14,12,10,9,8,7,6,4,3,2],
  [19,15,13,11,10,9,8,7,6,5,4,2],
  [21,16,14,13,11,10,9,8,7,6,5,4,3],
  [22,18,16,14,13,11,10,9,8,7,6,5,4,3],
  [24,19,17,15,14,13,11,10,9,8,7,6,5,4,3],
  [25,20,18,16,15,14,13,11,10,9,8,7,6,5,4,3],
  [27,22,19,18,16,15,14,13,12,10,9,8,7,6,5,4,3],
  [29,23,21,19,18,16,15,14,13,12,11,9,8,7,6,5,4,3],
  [30,25,22,20,19,17,16,15,14,13,12,11,10,9,8,6,5,4,3],
  [32,26,23,21,20,19,17,16,15,14,13,12,11,10,9,8,7,6,5,3],
  [34,27,25,23,21,20,19,17,16,15,14,13,12,11,10,9,8,7,6,5,4],
  [35,29,26,24,22,21,20,19,17,16,15,14,13,12,11,10,9,8,7,6,5,4],
  [37,30,27,25,24,22,21,20,19,18,16,15,14,13,12,11,10,9,8,7,6,5,4],
  [38,31,28,26,25,23,22,21,20,19,18,16,15,14,13,12,11,10,9,8,7,6,5,4],
  [40,33,30,28,26,25,23,22,21,20,19,18,17,16,14,13,12,11,10,9,8,7,6,5,4],
  [42,34,31,29,27,26,25,23,22,21,20,19,18,17,16,15,14,12,11,10,9,8,7,6,5,4],
  [43,36,32,30,29,27,26,25,23,22,21,20,19,18,17,16,15,14,13,12,11,9,8,7,6,5,4],
  [45,37,34,31,30,28,27,26,25,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,4],
  [47,38,35,33,31,30,28,27,26,25,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5],
  [48,40,36,34,32,31,29,28,27,26,25,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5],
  [50,41,38,35,33,32,31,29,28,27,26,25,24,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5],
  [51,42,39,36,35,33,32,30,29,28,27,26,25,24,23,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5],
  [53,44,40,38,36,34,33,32,30,29,28,27,26,25,24,23,22,21,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5],
  [55,45,41,39,37,36,34,33,32,30,29,28,27,26,25,24,23,22,21,20,19,18,16,15,14,13,12,11,10,9,8,7,6,5],
  [56,47,43,40,38,37,35,34,33,32,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,12,11,10,9,8,7,6,5],
  [58,48,44,41,40,38,37,35,34,33,32,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,5],
  [60,49,45,43,41,39,38,36,35,34,33,32,31,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6],
  [61,51,47,44,42,40,39,38,36,35,34,33,32,31,30,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6],
  [63,52,48,45,43,42,40,39,38,36,35,34,33,32,31,30,29,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6],
  [64,53,49,46,44,43,41,40,39,37,36,35,34,33,32,31,30,29,28,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6],
  [66,55,50,48,46,44,43,41,40,39,37,36,35,34,33,32,31,30,29,28,27,26,25,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6],
  [68,56,52,49,47,45,44,42,41,40,39,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6],
  [69,58,53,50,48,46,45,44,42,41,40,39,38,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,14,13,12,11,10,9,8,7,6],
  [71,59,54,51,49,48,46,45,43,42,41,40,39,38,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,6],
  [73,60,56,53,51,49,47,46,45,43,42,41,40,39,38,37,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7],
  [74,62,57,54,52,50,49,47,46,45,43,42,41,40,39,38,37,36,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7],
  [76,63,58,55,53,51,50,48,47,46,45,43,42,41,40,39,38,37,36,35,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7],
  [77,64,59,56,54,52,51,49,48,47,46,44,43,42,41,40,39,38,37,36,35,34,33,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7],
  [79,66,61,58,56,54,52,51,49,48,47,46,45,43,42,41,40,39,38,37,36,35,34,33,32,31,30,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7],
  [81,67,62,59,57,55,53,52,51,49,48,47,46,45,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7],
  [82,69,63,60,58,56,55,53,52,50,49,48,47,46,45,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,17,16,15,14,13,12,11,10,9,8,7],
  [84,70,65,61,59,57,56,54,53,52,50,49,48,47,46,45,44,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,7]
];
const RES_MAX = RES.length;                       // 52
// Beyond 52 (MEGS rule already in this page's legend: "C — a +5 row cancels a +5 column",
// and "+1 RAP per AP of EV above the table"): subtract the same amount from EV and RV until
// EV fits; whatever EV still exceeds goes straight onto the RAPs.
function resultRAPs(ev, rv) {
  rv = Math.max(1, rv);
  if (!(ev >= rv)) return 0;
  if (ev > RES_MAX) { const c = Math.min(ev - RES_MAX, rv - 1); ev -= c; rv -= c; }
  if (ev > RES_MAX) return RES[RES_MAX - 1][rv - 1] + (ev - RES_MAX);
  return RES[ev - 1][rv - 1];
}

let activeType = 'avov';

function setActiveType(type) {
  activeType = type === 'evrv' ? 'evrv' : 'avov';
  document.querySelectorAll('.ar-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === activeType);
    btn.setAttribute('aria-pressed', String(btn.dataset.type === activeType));
  });
}

function buildActionTable(type) {
  const N = RES_MAX;
  const avov = type === 'avov';
  let html = '<thead><tr><th scope="col">' + (avov ? 'AV\\OV' : 'EV\\RV') + '</th>';
  for (let c = 1; c <= N; c++) html += '<th scope="col">' + c + '</th>';
  html += '</tr></thead><tbody>';
  for (let r = 1; r <= N; r++) {
    html += '<tr><th scope="row">' + r + '</th>';
    for (let c = 1; c <= N; c++) {
      const v = avov ? actionTarget(r, c) : (c > r ? 0 : resultRAPs(r, c));
      html += v === 0 ? '<td class="na">N</td>' : '<td' + (c === r ? ' class="diag"' : '') + '>' + v + '</td>';
    }
    html += '</tr>';
  }
  return html + '</tbody>';
}

function renderActionTable() {
  const table = document.getElementById('action-table');
  if (!table) return;
  const type = document.querySelector('.ar-type-btn.active')?.dataset.type || activeType;
  setActiveType(type);
  table.innerHTML = buildActionTable(activeType);
  if (window.WikiApp) window.WikiApp.decorateTable(table);
}

function showARTableType(type) {
  setActiveType(type);
  renderActionTable();
}

window.renderActionTable = renderActionTable;
window.showARTableType = showARTableType;

/* ════════════════════════════════════════════════════════════════════
   WIKI APP — in-place navigation, search, table of contents, tables.
   URL scheme (unchanged): wiki.html (intro) · wiki.html?p=<page> · #<heading-id> deep links.
   Legacy wiki.html#<page> and in-content <a data-page> links keep working.
   ════════════════════════════════════════════════════════════════════ */
window.WikiApp = (function () {
  // sidebar order = prev/next order. [page, i18n label]
  const NAV = [
    ['wiki.rules', [['index', 'wiki.intro'], ['sistema_hibrido', 'wiki.hybrid'], ['temas', 'wiki.themes'], ['tags', 'wiki.tags'], ['combate', 'wiki.combat'],
      ['tipos_acao', 'wiki.actions'], ['modificadores', 'wiki.modifiers'], ['acao_resultado', 'wiki.avov'], ['aps_referencia', 'wiki.aps']]],
    ['wiki.details', [['acoes', 'wiki.pgAcoes'], ['condicoes', 'wiki.pgCondicoes'], ['efeitos', 'wiki.pgEfeitos'], ['acoesautomaticas', 'wiki.pgAutomaticas'],
      ['exemplo_resolucao', 'wiki.pgExemplo'], ['principios', 'wiki.pgPrincipios'], ['objetos', 'wiki.pgObjetos'], ['criacao', 'wiki.pgCriacao']]],
    ['wiki.apTables', [['aps_distancia', 'wiki.pgApsDist'], ['aps_mass', 'wiki.pgApsMass'], ['aps_tempo', 'wiki.pgApsTime'], ['aps_energia', 'wiki.pgApsEnergy']]],
    ['wiki.characters', [['galera', 'wiki.crewTheme'], ['npcs', 'wiki.npcs']]],
    ['wiki.ops', [['relatorios', 'wiki.reports'], ['timeline', 'wiki.pgTimeline']]]
  ];
  // old/broken keys that still circulate in links
  const ALIAS = { aps_massa: 'aps_mass', sistema_acao: 'tipos_acao', acao: 'acoes', exemplo: 'exemplo_resolucao' };
  // searchable blocks; render-time decoration never adds or removes these tags inside the article
  const SEL = 'h1,h2,h3,h4,p,li,tr,blockquote,summary';
  const LAST_KEY = 'cerebro_wiki_last';
  const mqMobile = window.matchMedia('(max-width: 768px)');
  const mqWide = window.matchMedia('(min-width: 1200px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let pages = {}, order = [], label = {}, section = {};
  let current, article, sidebar, input, results, statusEl, sheetTrigger;

  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (key, vars) => t(key).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const slug = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'secao';
  const instant = { behavior: 'instant' };

  function urlFor(page, hash) {
    return (page === 'index' ? 'wiki.html' : 'wiki.html?p=' + encodeURIComponent(page)) + (hash ? '#' + encodeURIComponent(hash) : '');
  }

  function parseLoc(href) {
    const url = new URL(href, location.href);
    let page = url.searchParams.get('p');
    let hash = decodeURIComponent(url.hash.slice(1));
    if (!page && hash && (pages[hash] || ALIAS[hash])) { page = hash; hash = ''; }
    page = ALIAS[page] || page || 'index';
    return { page, hash };
  }

  /* same ids at index time and at render time: document order + dedupe */
  function assignIds(root) {
    const seen = {};
    root.querySelectorAll('h2,h3,h4').forEach(h => {
      let id = slug(h.textContent);
      if (seen[id]) id += '-' + (++seen[id]); else seen[id] = 1;
      h.id = id;
    });
  }

  /* ── temas page: rendered from temas.json (precached) ── */
  let temasP = null;
  function loadTemas() {
    if (!temasP) {
      temasP = fetch('temas.json').then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }).then(d => d.temas || []);
      temasP.catch(() => { temasP = null; });
    }
    return temasP;
  }

  function renderTemasHTML(temas) {
    const byType = { 'Mutação': [], 'Humanidade': [], 'Adicional': [] };
    temas.forEach(th => { if (byType[th.tipo]) byType[th.tipo].push(th); });
    const typeLabels = { 'Mutação': 'Temas de Mutação', 'Humanidade': 'Temas de Humanidade', 'Adicional': 'Temas Adicionais' };
    const typeDesc = {
      'Mutação': 'Representam os poderes e a natureza mutante. As perguntas guiam a criação das tags de poder e fraqueza.',
      'Humanidade': 'Representam background humano, identidade e relações do personagem.',
      'Adicional': 'Recursos, aliados e locais como temas de suporte.'
    };
    let html = '';
    for (const [tipo, themes] of Object.entries(byType)) {
      if (!themes.length) continue;
      html += `<h2>${typeLabels[tipo]}</h2><p>${typeDesc[tipo]}</p>`;
      for (const th of themes) {
        const pqs = th.perguntas_poder || [];
        const fqs = th.perguntas_fraqueza || [];
        html += `<details class="tema-details"><summary class="tema-summary"><span class="tema-tipo">${tipo}</span><span class="tema-nome">${th.nome}</span></summary><div class="tema-body">${th.descricao ? `<p class="tema-desc">${th.descricao}</p>` : ''}<div class="tema-q-label">Tags de Poder (${pqs.length})</div><ol class="tema-questions poder-q">${pqs.map(q => `<li>${q}</li>`).join('')}</ol><div class="tema-q-label fraq">Tags de Fraqueza (${fqs.length})</div><ol class="tema-questions fraq-q">${fqs.map(q => `<li>${q}</li>`).join('')}</ol></div></details>`;
      }
    }
    return html;
  }

  async function injectTemas(root) {
    const box = root.querySelector('#temas-dynamic');
    if (!box) return;
    try { box.innerHTML = renderTemasHTML(await loadTemas()); }
    catch (e) { box.innerHTML = `<div class="state-msg is-error">${esc(t('wiki.temasError'))}</div>`; }
  }

  /* ── render-time decoration (generic: no per-page edits to the rules HTML) ── */
  const CALLOUT = /^(Atenção|Limite|Alerta|Importante)\b/;
  function decorate(root) {
    root.querySelectorAll('style').forEach(s => s.remove());
    // inline styles in the content strings use sub-floor font sizes and red accents; wiki.css owns the look
    root.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
    const h1 = root.querySelector('h1');
    if (h1) { h1.id = 'wiki-h1'; h1.tabIndex = -1; h1.classList.add('stencil', 'wiki-h1'); }
    assignIds(root);
    root.querySelectorAll('p').forEach(p => {
      const first = p.firstElementChild;
      const lead = p.firstChild;
      if (first && lead === first && first.tagName === 'STRONG') {
        if (CALLOUT.test(first.textContent)) p.classList.add('callout');
        else if (/^(Exemplo|Fórmula)\b/.test(first.textContent)) p.classList.add('callout', 'callout--note');
      }
      if (p.children.length === 1 && p.firstElementChild.tagName === 'CODE' && p.textContent.trim() === p.firstElementChild.textContent.trim()) p.classList.add('formula');
    });
    root.querySelectorAll('.relatorio-header').forEach(hd => {
      hd.setAttribute('role', 'button');
      hd.tabIndex = 0;
      hd.setAttribute('aria-expanded', String(hd.parentElement.classList.contains('expanded')));
    });
    root.querySelectorAll('table').forEach(decorateTable);
  }

  function nearestHeading(el) {
    const all = article ? Array.from(article.querySelectorAll('h1,h2,h3,h4')) : [];
    let best = null;
    all.forEach(h => { if (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) best = h; });
    return best ? best.textContent.trim() : '';
  }

  function decorateTable(table) {
    if (!table.tHead && !table.tBodies.length) return;
    let scroller = table.parentElement;
    if (!scroller.classList.contains('table-container')) {
      scroller = document.createElement('div');
      scroller.className = 'table-container';
      table.parentNode.insertBefore(scroller, table);
      scroller.appendChild(table);
    }
    let outer = scroller.parentElement;
    if (!outer.classList.contains('tbl')) {
      outer = document.createElement('div');
      outer.className = 'tbl';
      scroller.parentNode.insertBefore(outer, scroller);
      outer.appendChild(scroller);
      const hint = document.createElement('div');
      hint.className = 'tbl-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.textContent = '↔ ' + t('wiki.scrollHint');
      outer.insertBefore(hint, scroller);
      scroller.addEventListener('scroll', () => edges(outer, scroller), { passive: true });
    }
    scroller.classList.add('tbl-scroll', 'scroll-thin');
    scroller.tabIndex = 0;
    scroller.setAttribute('role', 'region');
    const cap = nearestHeading(table) || (table.id === 'action-table' ? 'AV/OV · EV/RV' : '');
    if (cap) {
      scroller.setAttribute('aria-label', cap);
      if (!table.caption) { const c = table.createCaption(); c.className = 'sr-only'; c.textContent = cap; }
    }
    if (table.tHead) Array.from(table.tHead.querySelectorAll('th')).forEach(th => th.setAttribute('scope', 'col'));
    const rows = Array.from(table.tBodies).flatMap(b => Array.from(b.rows));
    const spans = table.querySelector('[rowspan],[colspan]');
    if (!spans && rows.length) {
      rows.forEach(tr => {
        const c = tr.cells[0];
        if (c && c.tagName === 'TD') {
          const th = document.createElement('th');
          th.innerHTML = c.innerHTML;
          tr.replaceChild(th, c);
        }
        if (tr.cells[0]) tr.cells[0].setAttribute('scope', 'row');
      });
      table.classList.add('has-rowh');
    }
    const head0 = table.tHead && table.tHead.rows[0] && table.tHead.rows[0].cells[0];
    const isAp = head0 && head0.textContent.trim() === 'APs';
    if (isAp || table.id === 'action-table') table.classList.add('tbl-num');
    if (isAp && !outer.previousElementSibling?.classList.contains('ap-jump')) apJump(table, outer, scroller);
    requestAnimationFrame(() => fit(outer, scroller));
  }

  /* wide tables scroll inside their own box (sticky header + first column); narrow ones stick to the page */
  function fit(outer, scroller) {
    outer.classList.remove('fits');
    const wide = scroller.scrollWidth > scroller.clientWidth + 1;
    outer.classList.toggle('fits', !wide);
    outer.classList.toggle('is-wide', wide);
    edges(outer, scroller);
  }
  function edges(outer, sc) {
    outer.classList.toggle('not-start', sc.scrollLeft > 2);
    outer.classList.toggle('at-end', sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 2);
  }

  /* AP tables: jump to one AP and read the whole row at once */
  let apSeq = 0;
  function apJump(table, outer, scroller) {
    const rows = Array.from(table.tBodies[0].rows);
    const aps = rows.map(r => parseInt(r.cells[0].textContent, 10));
    const id = 'ap-jump-' + (++apSeq);
    const box = document.createElement('div');
    box.className = 'ap-jump';
    box.innerHTML = `<label class="ap-jump-k" for="${id}">${esc(t('wiki.jumpAp'))}</label>` +
      `<input class="form-input ap-jump-input" id="${id}" type="number" inputmode="numeric" step="1" min="${Math.min(...aps)}" max="${Math.max(...aps)}" placeholder="${esc(t('wiki.jumpApPh'))}" aria-describedby="${id}-out">` +
      `<output class="ap-readout" id="${id}-out" for="${id}" aria-live="polite"></output>`;
    outer.parentNode.insertBefore(box, outer);
    const inp = box.querySelector('input');
    const out = box.querySelector('output');
    const heads = Array.from(table.tHead.rows[0].cells).map(c => c.textContent.trim());
    function pick() {
      const n = parseInt(inp.value, 10);
      rows.forEach(r => r.classList.remove('is-picked'));
      if (isNaN(n)) { out.innerHTML = ''; return; }
      let i = aps.indexOf(n);
      if (i < 0) { i = 0; aps.forEach((a, k) => { if (a <= n) i = k; }); }
      const row = rows[i];
      row.classList.add('is-picked');
      scroller.scrollTop = row.offsetTop - (table.tHead ? table.tHead.offsetHeight : 0);
      const exact = aps[i] === n;
      out.innerHTML = `<span class="ap-ro-ap">AP ${esc(row.cells[0].textContent.trim())}</span>` +
        (exact ? '' : `<span class="ap-ro-near">${esc(t('wiki.apNearest'))}</span>`) +
        Array.from(row.cells).slice(1).map((c, k) => `<span class="ap-ro-cell"><span class="ap-ro-k">${esc(heads[k + 1] || '')}</span><span class="ap-ro-v">${esc(c.textContent.trim())}</span></span>`).join('');
    }
    inp.addEventListener('input', pick);
    inp.addEventListener('keydown', e => { if (e.key === 'Escape' && inp.value) { e.stopPropagation(); inp.value = ''; pick(); } });
  }

  /* ── page chrome: nav, toc, pager, kicker ── */
  function buildNav() {
    $('wiki-nav').innerHTML = NAV.map(([sec, items]) =>
      `<div class="wiki-nav-section"><div class="wiki-nav-title">${esc(t(sec))}</div><ul class="wiki-nav-list">` +
      items.filter(([p]) => pages[p]).map(([p]) => `<li><a class="wiki-nav-link" href="${urlFor(p)}" data-page="${p}">${esc(label[p])}</a></li>`).join('') +
      '</ul></div>').join('');
  }

  function markNav() {
    document.querySelectorAll('.wiki-nav-link').forEach(a => {
      if (a.dataset.page === current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    $('wiki-dock-cur').textContent = current ? label[current] : t('wiki.notFoundTitle');
  }

  function buildToc() {
    let hs = Array.from(article.querySelectorAll('h2'));
    if (hs.length < 2) hs = Array.from(article.querySelectorAll('h3'));
    const wrap = $('wiki-toc-wrap');
    wrap.hidden = hs.length < 3;
    $('wiki-toc-list').innerHTML = hs.map(h => `<li><a href="#${h.id}">${esc(h.textContent.trim())}</a></li>`).join('');
    $('wiki-toc-n').textContent = hs.length;
    $('wiki-toc').open = mqWide.matches;
  }

  function buildPager() {
    const i = order.indexOf(current);
    const link = (p, rel) => p ? `<a class="wiki-pager-${rel}" href="${urlFor(p)}" data-page="${p}" rel="${rel}"><span class="wiki-pager-k">${rel === 'prev' ? '← ' + esc(t('wiki.prev')) : esc(t('wiki.next')) + ' →'}</span><span class="wiki-pager-v">${esc(label[p])}</span></a>` : '<span></span>';
    $('wiki-pager').innerHTML = i < 0 ? '' : link(order[i - 1], 'prev') + link(order[i + 1], 'next');
    const k = $('wiki-kicker');
    k.textContent = current ? t(section[current]) : '404';
    if (i >= 0) k.dataset.idx = String(i + 1).padStart(2, '0') + '/' + order.length; else delete k.dataset.idx;
  }

  function notFoundHTML(page) {
    return `<div class="empty-state wiki-404"><h1 class="empty-title">${esc(t('wiki.notFoundTitle'))}</h1>` +
      `<p class="empty-sub">${esc(fmt('wiki.notFoundSub', { p: page }))}</p>` +
      `<div class="wiki-404-acts"><button type="button" class="btn btn-primary" data-wiki-search="${esc(page.replace(/[_-]+/g, ' '))}">${esc(t('wiki.searchBtn'))}</button>` +
      `<a class="btn" href="wiki.html" data-page="index">${esc(t('wiki.intro'))}</a></div></div>`;
  }

  /* ── render one page in place ── */
  let renderSeq = 0;
  async function render(page) {
    const seq = ++renderSeq;
    const known = Object.prototype.hasOwnProperty.call(pages, page);
    current = known ? page : null;
    article.innerHTML = known ? pages[page] : notFoundHTML(page);
    if (page === 'temas') await injectTemas(article);
    if (seq !== renderSeq) return false; // a newer navigation won
    if (page === 'acao_resultado' && typeof renderActionTable === 'function') renderActionTable();
    decorate(article);
    buildToc();
    buildPager();
    markNav();
    $('wiki-resume').hidden = true;
    document.title = 'X-MEN TTRPG // WIKI' + (known ? ' — ' + label[page] : '');
    if (!reduced.matches) { article.classList.remove('page-fade'); void article.offsetWidth; article.classList.add('page-fade'); }
    if (known) saveLast(page, 0);
    document.dispatchEvent(new CustomEvent('wiki:page', { detail: { page } }));
    return true;
  }

  function saveLast(page, y) {
    try { localStorage.setItem(LAST_KEY, JSON.stringify({ p: page, y: Math.round(y) })); } catch (e) { /* private mode */ }
  }
  function readLast() {
    try { return JSON.parse(localStorage.getItem(LAST_KEY) || 'null'); } catch (e) { return null; }
  }

  function reveal(el) {
    for (let d = el.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true;
    const card = el.closest('.relatorio-card');
    if (card && !card.classList.contains('expanded')) {
      card.classList.add('expanded');
      card.querySelector('.relatorio-header')?.setAttribute('aria-expanded', 'true');
    }
  }

  function flash(el) {
    el.classList.remove('wiki-hit');
    void el.offsetWidth;
    el.classList.add('wiki-hit');
    setTimeout(() => el.classList.remove('wiki-hit'), 2600);
  }

  function focusEl(el) {
    if (!el.hasAttribute('tabindex')) el.tabIndex = -1;
    el.focus({ preventScroll: true });
  }

  function landOn(opts) {
    let target = null;
    if (opts.ord != null) target = article.querySelectorAll(SEL)[opts.ord] || null;
    else if (opts.hash) target = document.getElementById(opts.hash);
    if (target) {
      reveal(target);
      target.scrollIntoView(Object.assign({ block: opts.ord != null ? 'center' : 'start' }, instant));
      if (opts.ord != null) flash(target);
      if (opts.focus) focusEl(target);
      return;
    }
    window.scrollTo(Object.assign({ top: opts.y || 0 }, instant));
    if (opts.focus) { const h = $('wiki-h1') || article.querySelector('h1'); if (h) focusEl(h); }
  }

  function rememberScroll() {
    if (history.state && history.state.wiki) history.replaceState(Object.assign({}, history.state, { y: window.scrollY }), '');
    if (current) saveLast(current, window.scrollY);
  }

  /* opts: hash, ord, y, replace, focus */
  async function go(page, opts = {}) {
    page = ALIAS[page] || page;
    closeSheet(false);
    hideResults();
    rememberScroll();
    history[opts.replace ? 'replaceState' : 'pushState']({ wiki: 1, page, y: 0 }, '', urlFor(page, opts.hash));
    if (await render(page)) landOn(Object.assign({ focus: true }, opts));
  }

  function jumpTo(hash) {
    const el = document.getElementById(hash);
    if (!el) return;
    rememberScroll();
    history.pushState({ wiki: 1, page: current, y: 0 }, '', urlFor(current || 'index', hash));
    reveal(el);
    el.scrollIntoView({ block: 'start', behavior: reduced.matches ? 'instant' : 'smooth' });
    focusEl(el);
  }

  /* ── mobile sheet ── */
  function sheetOpen() { return sidebar.classList.contains('is-open'); }
  function openSheet(mode) {
    if (!mqMobile.matches) { if (mode === 'search') input.focus(); return; }
    sheetTrigger = document.activeElement;
    sidebar.classList.add('is-open');
    sidebar.setAttribute('role', 'dialog');
    sidebar.setAttribute('aria-modal', 'true');
    $('wiki-scrim').hidden = false;
    document.body.classList.add('wiki-sheet-open');
    $('wiki-dock-pages').setAttribute('aria-expanded', 'true');
    if (mode === 'search') input.focus();
    else {
      const cur = sidebar.querySelector('.wiki-nav-link[aria-current]');
      (cur || input).focus({ preventScroll: true });
      if (cur) cur.scrollIntoView({ block: 'center' });
    }
  }
  function closeSheet(restore = true) {
    if (!sheetOpen()) return;
    sidebar.classList.remove('is-open');
    sidebar.removeAttribute('role');
    sidebar.removeAttribute('aria-modal');
    $('wiki-scrim').hidden = true;
    document.body.classList.remove('wiki-sheet-open');
    $('wiki-dock-pages').setAttribute('aria-expanded', 'false');
    if (restore && sheetTrigger && sheetTrigger.focus) sheetTrigger.focus();
  }

  /* ── search: lazy index over every page (+ temas.json), accent/case-insensitive ── */
  let indexP = null;
  function mapNorm(text) {
    let n = ''; const map = [];
    for (let i = 0; i < text.length; i++) { const c = norm(text[i]); for (let k = 0; k < c.length; k++) { n += c[k]; map.push(i); } }
    map.push(text.length);
    return { n, map };
  }
  // terms match at a word start ("autom" finds "automática", "acao" does not match inside "duração")
  function wordAt(n, tm, from = 0) {
    let i = n.indexOf(tm, from);
    while (i > 0 && /[a-z0-9]/.test(n[i - 1])) i = n.indexOf(tm, i + 1);
    return i;
  }
  function ownText(el) {
    if (el.tagName === 'TR') return Array.from(el.cells).map(c => c.textContent.trim()).filter(Boolean).join(' · ');
    let s = '';
    el.childNodes.forEach(n => {
      if (n.nodeType === 3) s += n.nodeValue;
      else if (n.nodeType === 1 && !n.matches(SEL) && !n.matches('ul,ol,table,details')) s += ownText(n);
      else if (n.nodeType === 1 && n.matches('br')) s += ' ';
    });
    return s;
  }
  function ensureIndex() {
    if (!indexP) {
      indexP = loadTemas().catch(() => null).then(temas => {
        const parser = new DOMParser();
        const out = [];
        Object.keys(pages).forEach(page => {
          const doc = parser.parseFromString('<!DOCTYPE html><body>' + pages[page] + '</body>', 'text/html');
          const body = doc.body;
          if (page === 'temas' && temas) { const box = body.querySelector('#temas-dynamic'); if (box) box.innerHTML = renderTemasHTML(temas); }
          assignIds(body);
          let head = { text: '', id: '' };
          body.querySelectorAll(SEL).forEach((el, ord) => {
            const tag = el.tagName;
            if (/^H[1-4]$/.test(tag)) head = { text: el.textContent.trim(), id: tag === 'H1' ? '' : el.id };
            if (tag === 'TR' && el.parentElement.tagName === 'THEAD') return;
            const text = ownText(el).replace(/\s+/g, ' ').trim();
            if (!text) return;
            const m = mapNorm(text);
            out.push({ page, ord, tag, text, n: m.n, map: m.map, h: head.text, hid: head.id, nh: norm(head.text) });
          });
        });
        return out;
      });
    }
    return indexP;
  }

  function snippet(e, terms) {
    const first = Math.min(...terms.map(tm => { const i = wordAt(e.n, tm); return i < 0 ? Infinity : i; }));
    const o = isFinite(first) ? e.map[first] : 0;
    let a = Math.max(0, o - 48), b = Math.min(e.text.length, a + 150);
    if (a > 0) { const sp = e.text.indexOf(' ', a); if (sp > -1 && sp < o) a = sp + 1; }
    // marks: every term occurrence inside [a, b)
    const marks = [];
    terms.forEach(tm => {
      let i = wordAt(e.n, tm);
      while (i > -1) {
        const s = e.map[i], f = e.map[i + tm.length];
        if (s >= a && f <= b) marks.push([s, f]);
        i = wordAt(e.n, tm, i + tm.length);
      }
    });
    marks.sort((x, y) => x[0] - y[0]);
    let html = a > 0 ? '…' : '', pos = a;
    marks.forEach(([s, f]) => { if (s < pos) return; html += esc(e.text.slice(pos, s)) + '<mark>' + esc(e.text.slice(s, f)) + '</mark>'; pos = f; });
    html += esc(e.text.slice(pos, b)) + (b < e.text.length ? '…' : '');
    return html;
  }

  function score(e, terms, phrase) {
    let s = 0;
    for (const tm of terms) {
      const i = wordAt(e.n, tm);
      if (i > -1) s += /[a-z0-9]/.test(e.n[i + tm.length] || ' ') ? 2 : 3; // whole word beats prefix
      if (wordAt(e.nh, tm) > -1) s += 2;
    }
    if (terms.length > 1 && e.n.includes(phrase)) s += 4;
    if (e.tag === 'H1') s += 6; else if (/^H[2-4]$/.test(e.tag)) s += 4;
    return s;
  }

  let activeOpt = -1, lastQ = '';
  async function runSearch() {
    const q = input.value.trim();
    lastQ = q;
    sidebar.classList.toggle('has-query', !!q);
    if (!q) { hideResults(); statusEl.textContent = ''; return; }
    const idx = await ensureIndex();
    if (q !== input.value.trim()) return; // typed on
    const phrase = norm(q).replace(/\s+/g, ' ');
    const terms = phrase.split(' ').filter(Boolean);
    const groups = {};
    idx.forEach(e => {
      const hay = e.n + ' ' + e.nh;
      if (!terms.every(tm => wordAt(hay, tm) > -1)) return;
      if (!terms.some(tm => wordAt(e.n, tm) > -1)) return; // heading-only matches show once, via the heading itself
      (groups[e.page] = groups[e.page] || []).push({ e, s: score(e, terms, phrase) });
    });
    const list = Object.entries(groups).map(([page, hits]) => {
      hits.sort((x, y) => y.s - x.s || x.e.ord - y.e.ord);
      return { page, hits, best: hits[0].s, total: hits.length };
    }).sort((x, y) => y.best - x.best || order.indexOf(x.page) - order.indexOf(y.page));
    const total = list.reduce((n, g) => n + g.total, 0);
    let html = '', k = 0;
    list.slice(0, 12).forEach((g, gi) => {
      html += `<div class="wr-group" role="group" aria-labelledby="wr-g${gi}"><div class="wr-page" id="wr-g${gi}"><span>${esc(label[g.page] || g.page)}</span><span class="wr-n">${g.total}</span></div>`;
      g.hits.slice(0, 5).forEach(({ e }) => {
        const head = e.h && e.tag !== 'H1' && e.text !== e.h ? `<span class="wr-h">${esc(e.h)}</span>` : '';
        html += `<a class="wr-opt" role="option" id="wr-o${k++}" tabindex="-1" aria-selected="false" href="${urlFor(e.page, e.hid)}" data-page="${e.page}" data-ord="${e.ord}">${head}<span class="wr-snip">${snippet(e, terms)}</span></a>`;
      });
      html += '</div>';
    });
    if (!list.length) html = `<p class="wr-empty">${esc(fmt('wiki.noResults', { q }))}</p>`;
    const msg = list.length ? fmt('wiki.resultsCount', { n: total, p: list.length }) : fmt('wiki.noResults', { q });
    results.innerHTML = (list.length ? `<div class="wr-count" aria-hidden="true">${esc(msg)}</div>` : '') + html;
    statusEl.textContent = msg;
    activeOpt = -1;
    input.removeAttribute('aria-activedescendant');
    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  function hideResults() {
    if (!results) return;
    results.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    activeOpt = -1;
  }

  function moveActive(d) {
    const opts = results.querySelectorAll('.wr-opt');
    if (!opts.length) return;
    if (results.hidden) results.hidden = false;
    activeOpt = (activeOpt + d + opts.length) % opts.length;
    opts.forEach((o, i) => o.setAttribute('aria-selected', String(i === activeOpt)));
    input.setAttribute('aria-activedescendant', opts[activeOpt].id);
    opts[activeOpt].scrollIntoView({ block: 'nearest' });
  }

  function openOpt(a) {
    go(a.dataset.page, { ord: +a.dataset.ord, hash: parseLoc(a.href).hash });
  }

  function isTyping(el) {
    return el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  }

  let timer = null;
  function bindSearch() {
    input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(runSearch, 90); });
    input.addEventListener('focus', () => { ensureIndex(); if (input.value.trim() && results.innerHTML) { results.hidden = false; input.setAttribute('aria-expanded', 'true'); } });
    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(timer);
        const done = input.value.trim() === lastQ ? Promise.resolve() : runSearch();
        done.then(() => {
          const opts = results.querySelectorAll('.wr-opt');
          const a = opts[activeOpt] || opts[0];
          if (a) openOpt(a);
        });
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (input.value) { input.value = ''; runSearch(); }
        else if (sheetOpen()) closeSheet();
        else input.blur();
      }
    });
    // desktop popover: close when focus/pointer leaves the search box
    document.addEventListener('pointerdown', e => { if (!mqMobile.matches && !$('wiki-search').contains(e.target)) hideResults(); });
    $('wiki-search').addEventListener('focusout', e => { if (!mqMobile.matches && e.relatedTarget && !$('wiki-search').contains(e.relatedTarget)) hideResults(); });
    document.addEventListener('keydown', e => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !isTyping(e.target)) {
        e.preventDefault();
        openSheet('search');
        input.focus();
        input.select();
      }
    });
  }

  /* ── wiring ── */
  function bindNav() {
    document.addEventListener('click', e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const srch = e.target.closest('[data-wiki-search]');
      if (srch) { input.value = srch.dataset.wikiSearch; openSheet('search'); input.focus(); runSearch(); return; }
      const a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      if (a.classList.contains('wr-opt')) { e.preventDefault(); openOpt(a); return; }
      if (a.hasAttribute('data-top')) { e.preventDefault(); toTop(); return; }
      if (a.dataset.page) { e.preventDefault(); go(a.dataset.page); return; }
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/(^|\/)wiki\.html$/.test(url.pathname)) return;
      e.preventDefault();
      const dest = parseLoc(url.href);
      if (dest.page === current && dest.hash) jumpTo(dest.hash);
      else go(dest.page, { hash: dest.hash });
    });
    // mission reports: header is a div with an inline toggle; give it keyboard + state
    document.addEventListener('click', e => {
      const hd = e.target.closest('.relatorio-header');
      if (hd) hd.setAttribute('aria-expanded', String(hd.parentElement.classList.contains('expanded')));
    });
    document.addEventListener('keydown', e => {
      const hd = e.target.closest && e.target.closest('.relatorio-header');
      if (hd && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); hd.click(); }
    });
    // tap a row to keep your place (the AV/OV table has its own cross highlight)
    document.addEventListener('click', e => {
      const tr = e.target.closest('.wiki-content tbody tr');
      if (!tr || tr.closest('#action-table')) return;
      const was = tr.classList.contains('is-picked');
      tr.parentElement.querySelectorAll('.is-picked').forEach(r => r.classList.remove('is-picked'));
      if (!was) tr.classList.add('is-picked');
    });
    window.addEventListener('popstate', async e => {
      const st = e.state || {};
      const dest = parseLoc(location.href);
      closeSheet(false);
      hideResults();
      if (dest.page !== current || !article.childElementCount) { if (!(await render(dest.page))) return; }
      if (st.y != null && st.wiki) landOn({ y: st.y, focus: true });
      else landOn({ hash: dest.hash, focus: true });
    });
    let st = null;
    window.addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(rememberScroll, 150); }, { passive: true });
    window.addEventListener('pagehide', rememberScroll);
    let rt = null;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { document.querySelectorAll('.tbl').forEach(o => fit(o, o.querySelector('.tbl-scroll'))); }, 120);
    });
    mqMobile.addEventListener('change', () => { closeSheet(false); hideResults(); });
    mqWide.addEventListener('change', () => { $('wiki-toc').open = mqWide.matches; });

    $('wiki-dock-pages').addEventListener('click', () => (sheetOpen() ? closeSheet() : openSheet('pages')));
    $('wiki-dock-search').addEventListener('click', () => openSheet('search'));
    $('wiki-dock-top').addEventListener('click', toTop);
    $('wiki-sheet-close').addEventListener('click', () => closeSheet());
    $('wiki-scrim').addEventListener('click', () => closeSheet());
    sidebar.addEventListener('keydown', e => {
      if (!sheetOpen()) return;
      if (e.key === 'Escape') { e.preventDefault(); closeSheet(); return; }
      if (e.key !== 'Tab') return;
      const f = Array.from(sidebar.querySelectorAll('a[href],button,input')).filter(x => x.offsetParent !== null && !x.closest('[hidden]'));
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
  }

  function toTop() {
    window.scrollTo({ top: 0, behavior: reduced.matches ? 'instant' : 'smooth' });
    const h = $('wiki-h1');
    if (h) focusEl(h);
  }

  function showResume() {
    const last = readLast();
    if (!last || !last.p || last.p === 'index' || !pages[last.p]) return;
    const box = $('wiki-resume');
    box.innerHTML = `<a class="btn btn-sm wiki-resume-link" href="${urlFor(last.p)}" data-resume><span class="wiki-resume-k">${esc(t('wiki.resume'))}</span> ${esc(label[last.p])} →</a>`;
    box.hidden = false;
    box.querySelector('a').addEventListener('click', e => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      e.stopPropagation();
      go(last.p, { y: last.y || 0 });
    });
  }

  async function init() {
    pages = window.wikiPages || {};
    NAV.forEach(([sec, items]) => items.forEach(([p, key]) => {
      if (!pages[p]) return;
      order.push(p); label[p] = t(key); section[p] = sec;
    }));
    article = $('wiki-content');
    sidebar = $('wiki-sidebar');
    input = $('wiki-q');
    results = $('wiki-results');
    statusEl = $('wiki-search-status');
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    buildNav();
    bindNav();
    bindSearch();
    const dest = parseLoc(location.href);
    const st = history.state;
    history.replaceState({ wiki: 1, page: dest.page, y: st && st.wiki ? st.y : 0 }, '', location.href);
    if (!(await render(dest.page))) return;
    if (dest.hash) landOn({ hash: dest.hash });
    else if (st && st.wiki && st.y) landOn({ y: st.y });
    if (dest.page === 'index' && !location.search && !location.hash) showResume();
  }

  return { init, decorateTable, go, ensureIndex, parseLoc };
})();
