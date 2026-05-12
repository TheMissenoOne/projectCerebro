/**
 * X-MEN TTRPG - Ficha Component Tests (Simple Version)
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

// Test ficha.js file exists
test('ficha.js - file exists', () => {
  const exists = fs.existsSync(path.join(PROJECT_ROOT, 'app/components/ficha.js'));
  if (!exists) throw new Error('ficha.js not found');
});

// Test ficha.js exports FichaComponent
test('ficha.js - exports FichaComponent', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/ficha.js'), 'utf-8');
  if (!content.includes('export const FichaComponent')) {
    throw new Error('FichaComponent export not found');
  }
});

// Test ficha.js has mount method
test('ficha.js - has mount method', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/ficha.js'), 'utf-8');
  if (!content.includes('async mount(container')) {
    throw new Error('mount method not found');
  }
});

// Test ficha.js has unmount method
test('ficha.js - has unmount method', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/ficha.js'), 'utf-8');
  if (!content.includes('unmount()')) {
    throw new Error('unmount method not found');
  }
});

// Test ficha.js has save method
test('ficha.js - has save method', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/ficha.js'), 'utf-8');
  if (!content.includes('_save')) {
    throw new Error('_save method not found');
  }
});

// Test app.js registers /ficha/new route
test('app.js - registers /ficha/new route', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/app.js'), 'utf-8');
  if (!content.includes("/ficha/new'")) {
    throw new Error('/ficha/new route not registered');
  }
});

// Test app.js registers /ficha/:id route
test('app.js - registers /ficha/:id route', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/app.js'), 'utf-8');
  if (!content.includes("/ficha/:id'")) {
    throw new Error('/ficha/:id route not registered');
  }
});

// Test ficha CSS
test('ficha CSS - .toolbar class defined', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'assets/css/components.css'), 'utf-8');
  if (!content.includes('.toolbar')) {
    throw new Error('.toolbar CSS not found');
  }
});

// Test ficha CSS
test('ficha CSS - .ficha-content class defined', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'assets/css/components.css'), 'utf-8');
  if (!content.includes('.ficha-content')) {
    throw new Error('.ficha-content CSS not found');
  }
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed > 0 ? 1 : 0);