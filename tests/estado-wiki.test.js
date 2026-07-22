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

test('ficha adds the Estado tab and removes Progressão UI', function() {
  assert(ficha.includes("data-i18n=\"ficha.tab4\""), 'Estado tab button missing');
  assert(ficha.includes('id="page-estado"'), 'Estado page missing');
  assert(ficha.includes('id="estado-condition-kind-toggle"'), 'Condition/effect toggle button missing');
  assert(ficha.includes('id="estado-pass-unit"'), 'Time unit selector missing');
  assert(!ficha.includes('id="estado-pass-turn"'), 'Duplicate turn pass button still present');
  assert(!ficha.includes('id="estado-condition-kind"'), 'Old condition/effect select still present');
  assert(!ficha.includes('progressao-area'), 'Progressão UI still present');
  assert(!ficha.includes('buildDots('), 'Progressão dots wiring still present');
  assert(!ficha.includes('evolucao-grid'), 'Progressão evolution grid still present');
});

test('wiki removes Progressão and Manifestação pages', function() {
  assert(!wikiHtml.includes('data-page="progressao"'), 'Progressão nav link still present');
  assert(!wikiPages.includes('progressao:'), 'Progressão wiki page still present');
  assert(!wikiPages.includes('manifestacao:'), 'Manifestação wiki page still present');
  assert(!wikiPages.includes('Ações de Manifestação'), 'Manifestação copy still present');
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
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed ? 1 : 0);
