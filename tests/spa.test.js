/**
 * X-MEN TTRPG - File-based Routing Tests
 * Verifies all pages exist and use correct relative paths for GitHub Pages
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const TESTS = [];
let passed = 0;
let failed = 0;

function test(name, fn) {
  TESTS.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// All pages must exist
const PAGES = ['index.html', 'dashboard.html', 'ficha.html', 'admin.html',
               'cerebro.html', 'wiki.html', 'combate.html', 'npcs.html'];

PAGES.forEach(function(page) {
  test('file exists: ' + page, function() {
    assert(fs.existsSync(path.join(ROOT, page)), page + ' missing');
  });
});

// index.html must be login page (not SPA shell)
test('index.html - has login form', function() {
  var content = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert(content.includes('login-form'), 'login form missing');
  assert(content.includes('register-form'), 'register form missing');
  assert(!content.includes('<div id="app">'), 'SPA shell still present');
});

// index.html must not use SPA redirect hack
test('index.html - no SPA 404 hack', function() {
  var content = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert(!content.includes('l.search[1]'), 'SPA 404 hack still present');
});

// No absolute /assets/ paths in any HTML file (breaks GitHub Pages subpath)
PAGES.forEach(function(page) {
  test(page + ' - no absolute /assets/ paths', function() {
    var content = fs.readFileSync(path.join(ROOT, page), 'utf8');
    var matches = content.match(/(?:href|src)="\/assets\//g);
    assert(!matches, 'absolute /assets/ path found: ' + (matches || []).join(', '));
  });
});

// Navigation links use .html extension (file-based)
test('dashboard.html - links use .html', function() {
  var content = fs.readFileSync(path.join(ROOT, 'dashboard.html'), 'utf8');
  assert(content.includes('ficha.html'), 'ficha link not .html');
  assert(content.includes('cerebro.html'), 'cerebro link not .html');
});

// .nojekyll exists
test('.nojekyll exists', function() {
  assert(fs.existsSync(path.join(ROOT, '.nojekyll')), '.nojekyll missing');
});

// Auth module redirects to index.html (not /index.html)
test('auth-module.js - redirects use relative paths', function() {
  var content = fs.readFileSync(path.join(ROOT, 'assets/js/auth-module.js'), 'utf8');
  var absMatches = content.match(/location\.href\s*=\s*'\/[a-z]/g);
  assert(!absMatches, 'absolute redirect found: ' + (absMatches || []).join(', '));
});

// Run
console.log('Running file-based routing tests...');
TESTS.forEach(function(t) {
  try {
    t.fn();
    console.log('✅ ' + t.name);
    passed++;
  } catch (e) {
    console.log('❌ ' + t.name + ': ' + e.message);
    failed++;
  }
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed > 0 ? 1 : 0);
