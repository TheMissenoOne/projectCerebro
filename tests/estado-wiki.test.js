const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ficha = fs.readFileSync(path.join(ROOT, 'ficha.html'), 'utf8');
const wikiHtml = fs.readFileSync(path.join(ROOT, 'wiki.html'), 'utf8');
const wikiPages = fs.readFileSync(path.join(ROOT, 'assets/js/wiki-pages.js'), 'utf8');
const wikiJs = fs.readFileSync(path.join(ROOT, 'assets/js/wiki.js'), 'utf8');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✅ ' + name);
    passed++;
  } catch (error) {
    console.log('❌ ' + name + ': ' + error.message);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

test('ficha keeps the Estado tab', function() {
  assert(ficha.includes("data-i18n=\"ficha.tab4\""), 'Estado tab button missing');
  assert(ficha.includes('id="page-estado"'), 'Estado page missing');
  assert(ficha.includes('id="estado-condition-kind-toggle"'), 'Condition/effect toggle button missing');
  assert(ficha.includes('id="estado-pass-unit"'), 'Time unit selector missing');
  assert(!ficha.includes('id="estado-pass-turn"'), 'Duplicate turn pass button still present');
  assert(ficha.includes('tabela de referência de APs'), 'Reference-based AP note missing');
  assert(!ficha.includes('1 AP = 8 segundos'), 'Wrong fixed AP conversion still present');
  assert(!ficha.includes('id="estado-condition-kind"'), 'Old condition/effect select still present');
});

test('ficha restores the Progressão tab', function() {
  assert(ficha.includes('data-i18n="ficha.tab5"'), 'Progressão tab button missing');
  assert(ficha.includes('id="page-progressao"'), 'Progressão page missing');
  assert(ficha.includes('progressao-area'), 'Progressão marker missing');
  assert(ficha.includes('function buildDots('), 'Progressão dots wiring missing');
  assert(ficha.includes('id="evolucao-grid"'), 'Evolution moments grid missing');
  assert(ficha.includes("fetch('momentosDeEvolucao.json')"), 'momentosDeEvolucao.json no longer loaded');
  assert(!ficha.includes('delete D.progressao'), 'Progressão still stripped on load');
  assert(!ficha.includes('delete dataParaSalvar.progressao'), 'Progressão still stripped on save');
});

test('estado panels are collapsible and ordered for mobile', function() {
  const css = fs.readFileSync(path.join(ROOT, 'assets/css/components.css'), 'utf8');
  const estado = fs.readFileSync(path.join(ROOT, 'assets/js/estado-module.js'), 'utf8');

  ['lista', 'tempo', 'add', 'tags', 'manobras'].forEach(function(key) {
    assert(ficha.includes('data-panel="' + key + '"'), 'panel missing: ' + key);
    assert(ficha.includes('id="estado-body-' + key + '"'), 'panel body missing: ' + key);
  });
  assert((ficha.match(/estado-panel-head/g) || []).length === 5, 'every estado panel needs a header button');

  // em mesa: lista e tempo abertos, o resto colapsado
  assert((ficha.match(/aria-expanded="false"/g) || []).length === 3, 'exactly three estado panels start collapsed');
  assert(ficha.includes('class="estado-panel collapsed" data-panel="add"'), 'add panel should start collapsed');
  assert(ficha.includes('class="estado-panel collapsed" data-panel="tags"'), 'tags panel should start collapsed');
  assert(ficha.includes('class="estado-panel collapsed" data-panel="manobras"'), 'manobras panel should start collapsed');
  assert(ficha.includes('class="estado-panel estado-panel-wide" data-panel="lista"'), 'conditions panel should start open');

  // dois painéis não podem mais se chamar "CONDIÇÕES & EFEITOS"
  assert(ficha.includes('Adicionar Condição / Efeito'), 'add panel was not renamed');

  assert(css.includes('.estado-panel.collapsed .estado-panel-body{display:none;}'), 'collapse rule missing');
  assert(/\.estado-panel\[data-panel="lista"\]\{order:1;\}/.test(css), 'mobile ordering missing');
  assert(css.includes('.estado-input,.estado-select,.estado-kind-btn,.estado-field{min-height:44px'), '44px touch targets missing');
  assert(css.includes('.estado-mini-btn{min-height:40px'), 'mini buttons still below the touch-target floor');

  // formulários em duas colunas: nome|grau, duração|tipo, botão inteiro
  assert(/\.estado-add-row\{display:grid;grid-template-columns:1fr minmax\(0,132px\)/.test(css), 'add row is not a two-column grid');
  assert(/\.estado-time-row\{display:grid;grid-template-columns:1fr minmax\(0,132px\)/.test(css), 'time row is not a two-column grid');
  assert(css.includes('.estado-add-row .tbtn{grid-column:1 / -1;}'), 'submit button should span both columns');
  assert(ficha.indexOf('id="estado-condition-duration"') < ficha.indexOf('id="estado-condition-kind-toggle"'),
    'duration select must come before the kind toggle');
  assert(estado.includes('estado-kind-opt'), 'kind toggle is not a segmented control');
  assert(ficha.includes('class="estado-field-label" for="estado-condition-degree"'), 'degree field lost its inline label');
  assert(ficha.includes('class="estado-field-label" for="estado-pass-value"'), 'time field lost its inline label');

  assert(estado.includes('function bindPanels('), 'panel toggle wiring missing');
  assert(estado.includes("window.matchMedia('(max-width:900px)')"), 'toggle must be a no-op on desktop');
  assert(estado.includes('cerebro_estado_panels'), 'panel state is not persisted');
});

test('wiki removes Progressão and Manifestação pages', function() {
  assert(!wikiHtml.includes('data-page="progressao"'), 'Progressão nav link still present');
  assert(!wikiPages.includes('progressao:'), 'Progressão wiki page still present');
  assert(!wikiPages.includes('manifestacao:'), 'Manifestação wiki page still present');
  assert(!wikiPages.includes('Ações de Manifestação'), 'Manifestação copy still present');
});

test('wiki action panel uses reference APs and hides RAPs in Ação', function() {
  assert(wikiHtml.includes('refApValue('), 'reference AP helper missing');
  assert(wikiHtml.includes('Sem RAPs nesta aba.'), 'Ação tab still shows RAPs');
});

test('wiki tables use range labels instead of step columns', function() {
  assert(wikiJs.includes("const RANGES = ['1-2'"), 'range labels missing');
  assert(wikiJs.includes("return `\\n        <thead><tr><th>${type === 'avov' ? 'AV\\\\OV' : 'EV\\\\RV'}</th>`") || wikiJs.includes("AV\\\\OV"), 'table renderer not using range-based headers');
  assert(!wikiJs.includes('cols = 52;'), 'table renderer still exposes step-based columns');
});

test('state module is isolated for future render logic', function() {
  const estadoPath = path.join(ROOT, 'assets/js/estado-module.js');
  assert(fs.existsSync(estadoPath), 'estado-module.js missing');
  const estado = fs.readFileSync(estadoPath, 'utf8');
  assert(estado.includes('window.EstadoModule'), 'EstadoModule export missing');
  assert(estado.includes('function init(') || estado.includes('const init ='), 'init entrypoint missing');
  assert(estado.includes('function render(') || estado.includes('const render ='), 'render entrypoint missing');
  assert(estado.includes('soma dos graus das condições'), 'Threshold legend not tied to condition sum');
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed ? 1 : 0);
