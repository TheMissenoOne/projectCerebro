/**
 * X-MEN TTRPG - Theme card unit tests
 * Runs the main inline <script> from ficha.html in a sandboxed VM (no browser)
 * and exercises the pure helpers it exports via `module.exports` (node-only, no-op in browser).
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PROJECT_ROOT = path.join(__dirname, '..');

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

// Extract the largest inline <script>...</script> block (the app logic one) from ficha.html
const html = fs.readFileSync(path.join(PROJECT_ROOT, 'ficha.html'), 'utf-8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (scripts.length === 0) throw new Error('No inline <script> blocks found in ficha.html');
const mainScript = scripts.reduce((a, b) => (a.length >= b.length ? a : b));

const noop = function () {};
const sandbox = {
  document: { addEventListener: noop },
  window: { addEventListener: noop, matchMedia: function () { return { matches: false }; } },
  localStorage: { getItem: noop, setItem: noop, removeItem: noop },
  module: { exports: {} },
  t: function (k) { return k; },
  console,
};
vm.createContext(sandbox);
vm.runInContext(mainScript, sandbox, { filename: 'ficha.html-inline-script.js' });

const { deriveBlurb } = sandbox.module.exports;

test('deriveBlurb is exported', () => {
  if (typeof deriveBlurb !== 'function') throw new Error('deriveBlurb not exported');
});

test('theme wizard is fully removed from ficha.html', () => {
  if (/wizard/i.test(html)) throw new Error('wizard leftovers in ficha.html');
  if (!html.includes('lista.push(novoCard())')) throw new Error('+ button no longer creates an empty card');
});

test('additional themes are parsed from temas.json tipo="Adicional"', () => {
  if (!html.includes("else if(t.tipo==='Adicional')T_ADICIONAL.push({v,l});")) {
    throw new Error('T_ADICIONAL not populated from d.temas');
  }
});

test('deriveBlurb - returns only the first sentence', () => {
  const r = deriveBlurb('Uma frase curta. Outra frase que não deve aparecer.');
  if (r !== 'Uma frase curta.') throw new Error('got: ' + JSON.stringify(r));
});

test('deriveBlurb - truncates long single-sentence text to ~90 chars with ellipsis', () => {
  const long = 'a'.repeat(150);
  const r = deriveBlurb(long);
  if (r.length > 91) throw new Error('too long: ' + r.length);
  if (!r.endsWith('…')) throw new Error('missing ellipsis: ' + JSON.stringify(r));
});

test('deriveBlurb - empty/undefined input returns empty string', () => {
  if (deriveBlurb('') !== '') throw new Error('expected empty string for ""');
  if (deriveBlurb(undefined) !== '') throw new Error('expected empty string for undefined');
});

// ── Grau em tags (APs) + tag genérica ──────────────────────────────
const X = sandbox.module.exports;
const temas = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'temas.json'), 'utf-8')).temas;

test('temas.json - every theme has a 4th melhoria ending in [Grau em tags]', () => {
  const bad = temas.filter(t => !Array.isArray(t.melhorias) || t.melhorias.length < 4 || !/\[Grau em tags\]\s*$/.test(t.melhorias[3]));
  if (bad.length) throw new Error('missing on: ' + bad.map(t => t.nome).join(', '));
});

test('parseMelhoria - splits name, text and trailing marker', () => {
  const p = X.parseMelhoria('Potencial Ômega: Texto: com dois pontos. [Grau em tags]');
  if (p.nome !== 'Potencial Ômega' || p.texto !== 'Texto: com dois pontos.' || p.marcador !== 'Grau em tags') throw new Error(JSON.stringify(p));
  const q = X.parseMelhoria('Sem nome nem marcador');
  if (q.nome !== '' || q.texto !== 'Sem nome nem marcador' || q.marcador !== '') throw new Error(JSON.stringify(q));
});

test('grauDesbloqueado - detects [Grau em tags] by marker, not by index', () => {
  const lista = ['A: x [Grau em tags]', 'B: y [Especial]'];
  if (!X.grauDesbloqueado({ melhorias_checked: [true, false] }, lista)) throw new Error('checked grau melhoria not detected');
  if (X.grauDesbloqueado({ melhorias_checked: [false, true] }, lista)) throw new Error('other melhoria unlocked grau');
  if (X.grauDesbloqueado({}, lista)) throw new Error('missing melhorias_checked unlocked grau');
});

test('custoFator - 3 for specific tags, 4 for generic', () => {
  if (X.custoFator(false) !== 3 || X.custoFator(true) !== 4) throw new Error('wrong factor cost');
});

test('grauDe - clamps to an integer >= 0, missing/garbage -> 0', () => {
  const c = { poder_grau: [3, -2, 'abc', null, '5', 1e9] };
  const got = [0, 1, 2, 3, 4, 5, 6].map(i => X.grauDe(c, i));
  if (JSON.stringify(got) !== JSON.stringify([3, 0, 0, 0, 5, 99, 0])) throw new Error(JSON.stringify(got));
});

test('novoCard - has index-aligned poder_grau (0) and poder_generica (false)', () => {
  const c = X.novoCard();
  if (c.poder_grau.length !== c.poder.length || c.poder_generica.length !== c.poder.length) throw new Error('not aligned');
  if (c.poder_grau.some(v => v !== 0) || c.poder_generica.some(v => v !== false)) throw new Error('bad defaults');
});

test('normalizarCard - old card without grau arrays loads with 0/false, aligned to poder[]', () => {
  const old = { tipo: 'adaptabilidade', poder: ['A', null, 'C'].concat(Array(9).fill('')), fraqueza: ['X'] };
  X.normalizarCard(old);
  if (old.poder_grau.length !== 12 || old.poder_generica.length !== 12) throw new Error('length ' + old.poder_grau.length);
  if (old.poder_grau.some(v => v !== 0) || old.poder_generica.some(v => v !== false)) throw new Error('bad defaults');
  if (old.poder[1] !== '') throw new Error('null hole not normalised');
  if (old.fraqueza.length !== 4) throw new Error('fraqueza not padded');
});

test('normalizarCard - keeps existing grau/generica values', () => {
  const c = X.normalizarCard({ poder: Array(10).fill('t'), poder_grau: [2, 0, 7], poder_generica: [false, true, 'yes'] });
  if (c.poder_grau[0] !== 2 || c.poder_grau[2] !== 7 || c.poder_generica[1] !== true || c.poder_generica[2] !== false) throw new Error(JSON.stringify(c));
});

test('normalizarDados - normalises temas, extras and temas_emergentes', () => {
  const d = X.normalizarDados({ temas: [{ poder: ['A'] }], extras: [{}], temas_emergentes: { poder: [] } });
  [d.temas[0], d.extras[0], d.temas_emergentes].forEach((c, k) => {
    if (!Array.isArray(c.poder_grau) || c.poder_grau.length < 10) throw new Error('card ' + k + ' not normalised');
  });
});

test('visibleTagIndices - filled tags (stable original indexes) + first empty slot', () => {
  const arr = ['', 'B', '', 'D', '', ''];
  const got = X.visibleTagIndices(arr, 6);
  if (JSON.stringify(got) !== JSON.stringify([1, 3, 0])) throw new Error(JSON.stringify(got));
  if (JSON.stringify(X.visibleTagIndices(['a', 'b'], 2)) !== '[0,1]') throw new Error('full list should have no empty slot');
});

test('cardResumo - counts filled tags and keeps tracker value', () => {
  const r = X.cardResumo({ titulo: ' Pele ', poder: ['a', '', ' ', 'b'], fraqueza: ['x'], valor: -2 });
  if (r.titulo !== 'Pele' || r.poder !== 2 || r.fraqueza !== 1 || r.valor !== -2) throw new Error(JSON.stringify(r));
});

test('pdfCard - [GEN] always; " · AP n" only when [Grau em tags] is checked and grau > 0', () => {
  X.MELHORIAS.adaptabilidade = ['A: x [Tag cruzada]', 'B: y [Condição temporária]', 'C: z [Especial]', 'Potencial Ômega: w [Grau em tags]'];
  const c = X.novoCard();
  c.tipo = 'adaptabilidade';
  c.poder[0] = ''; c.poder[1] = 'Voo'; c.poder[2] = 'Força';
  c.poder_grau[1] = 3; c.poder_generica[1] = true; c.poder_grau[2] = 0;
  const locked = X.pdfCard(c);
  if (!locked.includes('Voo [GEN]') || /AP 3/.test(locked)) throw new Error('locked card: ' + locked);
  if (c.poder_grau[1] !== 3) throw new Error('grau was zeroed while locked');
  c.melhorias_checked = [false, false, false, true];
  const h = X.pdfCard(c);
  if (!h.includes('Voo [GEN] · AP 3')) throw new Error('graded tag missing marks: ' + h);
  if (/Força[^<]*(AP|GEN)/.test(h)) throw new Error('ungraded tag got marks');
});

test('ficha.html - AP control hidden (no space) unless the card is unlocked; GEN lives inside the tag field', () => {
  if (!/\.tcard:not\(\.omega\) \.tag-ap\{display:none;\}/.test(html)) throw new Error('AP control not display:none outside .omega');
  if (/\.tag-ap\{[^}]*opacity:/.test(html)) throw new Error('old dimmed-when-locked styling left');
  if (!html.includes("field.appendChild(gen)")) throw new Error('GEN not appended inside the tag field');
  if (!/\.poder-tags \.tag-inp\{padding-right:/.test(html)) throw new Error('no right padding reserved for GEN');
});

test('ficha.html - type change and initial build share renderCardSections (no inline melhoria styles)', () => {
  if ((html.match(/renderCardSections\(body,card,editable\)/g) || []).length < 2) throw new Error('renderCardSections not shared');
  if (/style\.cssText/.test(html)) throw new Error('inline style.cssText left in card rendering');
});

test('ficha.html - title font loaded in preload, stylesheet and noscript links', () => {
  if ((html.match(/family=Saira\+Stencil\+One/g) || []).length !== 3) throw new Error('Saira Stencil One not in all 3 font links');
  if (!/prefers-reduced-motion:reduce/.test(html)) throw new Error('no reduced-motion guard');
});

test('i18n - new ficha keys exist in pt-BR and en', () => {
  const i18n = fs.readFileSync(path.join(PROJECT_ROOT, 'assets/js/i18n.js'), 'utf-8');
  ['tagGen', 'tagSpecific', 'apGrau', 'factorCost', 'minimizeCard', 'expandCard', 'addPowerTag', 'addWeakTag', 'sumPower', 'sumWeak', 'stampMutacao', 'stampHumanidade', 'stampAdicional', 'omegaOn'].forEach(k => {
    const n = (i18n.match(new RegExp("'ficha\\." + k + "'", 'g')) || []).length;
    if (n < 2) throw new Error('ficha.' + k + ' found ' + n + 'x');
  });
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed > 0 ? 1 : 0);
