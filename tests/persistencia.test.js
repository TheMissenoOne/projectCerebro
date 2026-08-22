/**
 * X-MEN TTRPG - Persistência da ficha
 *
 * Cobre o bug em que a aba Esquadrão parecia salvar mas nada chegava ao banco:
 * fichas antigas traziam `membros` com menos entradas do que a tabela desenha,
 * o handler estourava em D.membros[i].nome e o indicador seguia dizendo SALVO.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ficha = fs.readFileSync(path.join(ROOT, 'ficha.html'), 'utf8');
const i18n = fs.readFileSync(path.join(ROOT, 'assets/js/i18n.js'), 'utf8');

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

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

test('dados carregados são normalizados antes de a UI escrever neles', function () {
  assert(ficha.includes('function normalizarDados('), 'normalizarDados missing');
  assert(/normalizarDados\(D\);\s*\n\s*fichaCarregada=true;/.test(ficha), 'load path does not normalize');
  assert(ficha.includes('while(d.membros.length<MAX_MEMBROS)'), 'membros not padded to the rendered row count');
  assert(ficha.includes('while(d.temas.length<4)'), 'temas not padded');
  assert(ficha.includes('while(d.extras.length<4)'), 'extras not padded');
  assert(ficha.includes('while(d.evolucao.length<PROG_MAX)'), 'evolucao not padded');
});

test('linhas de membro nunca escrevem em um índice inexistente', function () {
  assert(ficha.includes('function membroEm('), 'membroEm helper missing');
  assert(!/D\.membros\[\+e\.target\.dataset\.i\]\./.test(ficha), 'still writes straight into D.membros[i]');
  assert((ficha.match(/membroEm\(\+e\.target\.dataset\.i\)/g) || []).length === 3,
    'all three member inputs must go through membroEm');
});

test('mesclar clona arrays em vez de apontar para o objeto em cache', function () {
  assert(ficha.includes('r[k]=Array.isArray(src[k])?clone(src[k]):src[k];'),
    'mesclar still aliases arrays into the cached object');
});

test('o indicador só diz SALVO depois de uma gravação confirmada', function () {
  assert(ficha.includes("setInd('',t('ficha.loaded'))"), 'idle state after load still claims saved');
  assert(ficha.includes("setInd('pendente',t('ficha.unsaved'))"), 'no pending state');
  assert(ficha.includes("setInd('salvo',t('ficha.savedAt')"), 'saved state has no timestamp');
  assert(!/setTimeout\(\(\)=>setInd\('',t\('ficha\.saved'\)\),1800\)/.test(ficha),
    'saved state still decays back into a generic SALVO');
  ["'ficha.unsaved'", "'ficha.savedAt'", "'ficha.loaded'", "'ficha.errorLoad'", "'ficha.errorUnexpected'"].forEach(function (k) {
    assert((i18n.match(new RegExp(k.replace('.', '\\.'), 'g')) || []).length >= 2, 'missing pt/en for ' + k);
  });
});

test('alterações pendentes são gravadas antes de a página sumir', function () {
  assert(/visibilitychange[\s\S]{0,120}salvarAgora\(\)/.test(ficha), 'no flush when the app is backgrounded');
  assert(/pagehide[\s\S]{0,80}salvarAgora\(\)/.test(ficha), 'no flush on pagehide');
  assert(/beforeunload[\s\S]{0,140}e\.preventDefault\(\)/.test(ficha), 'no guard against leaving with unsaved work');
  assert(/function trocarAba\(id,el\)\{\s*\n\s*if\(saveSujo\)salvarAgora\(\);/.test(ficha),
    'switching tabs does not flush pending work');
});

test('falha de gravação continua pendente, limpa o cache e tenta de novo', function () {
  assert(/saveSujo=true; \/\* continua pendente/.test(ficha), 'failed save is not kept dirty');
  assert(ficha.includes("window.cache.invalidate('char',charId)"),
    'failed save leaves the optimistic cache in place');
  assert(/saveTimer=setTimeout\(salvarAgora,Math\.min\(30000,5000\*saveTentativa\)\)/.test(ficha),
    'no backoff retry after a failed save');
});

test('ficha que não carregou não pode ser sobrescrita', function () {
  assert(ficha.includes('let fichaCarregada=false;'), 'load guard missing');
  assert(/if\(!fichaCarregada\)\{setInd\('erro',t\('ficha\.errorLoad'\)\);return;\}/.test(ficha),
    'a failed load can still overwrite the row with defaults');
});

test('a gravação envia um retrato congelado dos dados', function () {
  assert(ficha.includes('const snapshot=clone(D);'), 'save still sends a shallow copy of live state');
  assert(!ficha.includes('Object.assign({},D,{foto:\'\'})'), 'shallow copy still mutates D.estado');
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed ? 1 : 0);
