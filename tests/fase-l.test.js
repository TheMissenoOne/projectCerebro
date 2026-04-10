/**
 * X-MEN TTRPG - All Components Tests
 */

const fs = require('fs');
const path = require('path');

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

// Wiki tests
test('wiki.js - file exists', () => {
  const exists = fs.existsSync(path.join(PROJECT_ROOT, 'app/components/wiki.js'));
  if (!exists) throw new Error('wiki.js not found');
});

test('wiki.js - exports WikiComponent', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/wiki.js'), 'utf-8');
  if (!content.includes('const WikiComponent')) {
    throw new Error('WikiComponent not found');
  }
});

test('wiki.js - has mount/unmount', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/wiki.js'), 'utf-8');
  if (!content.includes('mount(') || !content.includes('unmount()')) {
    throw new Error('mount/unmount not found');
  }
});

// Cerebro tests
test('cerebro.js - file exists', () => {
  const exists = fs.existsSync(path.join(PROJECT_ROOT, 'app/components/cerebro.js'));
  if (!exists) throw new Error('cerebro.js not found');
});

test('cerebro.js - exports CerebroComponent', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/cerebro.js'), 'utf-8');
  if (!content.includes('const CerebroComponent')) {
    throw new Error('CerebroComponent not found');
  }
});

// Combate tests
test('combate.js - file exists', () => {
  const exists = fs.existsSync(path.join(PROJECT_ROOT, 'app/components/combate.js'));
  if (!exists) throw new Error('combate.js not found');
});

test('combate.js - exports CombateComponent', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/combate.js'), 'utf-8');
  if (!content.includes('const CombateComponent')) {
    throw new Error('CombateComponent not found');
  }
});

test('combate.js - has calculate method', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/combate.js'), 'utf-8');
  if (!content.includes('_calculate')) {
    throw new Error('_calculate not found');
  }
});

// Route registration tests
test('app.js - registers /wiki route', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/app.js'), 'utf-8');
  if (!content.includes("'/wiki'")) {
    throw new Error('/wiki route not registered');
  }
});

test('app.js - registers /cerebro route', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/app.js'), 'utf-8');
  if (!content.includes("'/cerebro'")) {
    throw new Error('/cerebro route not registered');
  }
});

test('app.js - registers /combate route', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/app.js'), 'utf-8');
  if (!content.includes("'/combate'")) {
    throw new Error('/combate route not registered');
  }
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed > 0 ? 1 : 0);