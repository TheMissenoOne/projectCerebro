/**
 * X-MEN TTRPG - Simple Admin Component Test
 */

// Simpler test - check file content directly
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

// Test admin.js file exists
test('admin.js - file exists', () => {
  const exists = fs.existsSync(path.join(PROJECT_ROOT, 'app/components/admin.js'));
  if (!exists) throw new Error('admin.js not found');
});

// Test admin.js exports AdminComponent
test('admin.js - exports AdminComponent', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/admin.js'), 'utf-8');
  if (!content.includes('const AdminComponent')) {
    throw new Error('AdminComponent not found');
  }
});

// Test admin.js has mount method
test('admin.js - has mount method', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/admin.js'), 'utf-8');
  if (!content.includes('mount(container')) {
    throw new Error('mount method not found');
  }
});

// Test admin.js has unmount method
test('admin.js - has unmount method', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/components/admin.js'), 'utf-8');
  if (!content.includes('unmount()')) {
    throw new Error('unmount method not found');
  }
});

// Test admin route in app.js
test('app.js - registers /admin route', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/app.js'), 'utf-8');
  if (!content.includes("/admin'")) {
    throw new Error('/admin route not registered');
  }
});

// Test API has updateParty
test('api.js - has updateParty method', () => {
  const content = fs.readFileSync(path.join(PROJECT_ROOT, 'app/services/api.js'), 'utf-8');
  if (!content.includes('updateParty')) {
    throw new Error('updateParty not found');
  }
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed > 0 ? 1 : 0);