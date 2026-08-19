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

const sandbox = {
  document: { addEventListener: function () {} },
  window: {},
  module: { exports: {} },
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

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed > 0 ? 1 : 0);
