/**
 * Auth pages (index.html, reset-password.html, offline.html) — browser regression tests.
 * Playwright, no network, no DB: serves the repo on an ephemeral port and replaces supabase-js
 * with an in-page fake whose answers depend on the typed email/password, so the real page code,
 * auth-module.js and i18n.js run end to end.
 *
 *   node tests/auth-ui.test.js
 *
 * Fake outcomes — login: password "wrong" → invalid_credentials, email unconfirmed@… → email_not_confirmed,
 * offline@… → network error, slow@… → waits for window.__release(). signup: taken@… → user_already_exists,
 * ghost@… → user without identities, password "weakpw1" → weak_password, rate@… → 429. update: "samepass1" → same_password.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { startServer } = require('./cerebro-ui.test.js');

function fakeSupabase(opts) {
  return `
(function(){
  var user = { id: 'u-1', email: 'gm@xavier.test', user_metadata: { role: 'player' } };
  var session = ${opts.session ? '{ user: user, access_token: "x" }' : 'null'};
  window.__auth = [];
  var hold = function(v){ return new Promise(function(r){ window.__release = function(){ r(v); }; }); };
  var E = function(o){ return Promise.resolve({ data: { user: null, session: null }, error: Object.assign({ name: 'AuthApiError' }, o) }); };
  var client = {
    from: function(){ throw new Error('no db on auth pages'); },
    auth: {
      getSession: function(){ return Promise.resolve({ data: { session: session }, error: null }); },
      onAuthStateChange: function(cb){ setTimeout(function(){ cb(${opts.recovery ? "'PASSWORD_RECOVERY'" : "'INITIAL_SESSION'"}, session); }, 50); return { data: { subscription: { unsubscribe: function(){} } } }; },
      signInWithPassword: function(c){ window.__auth.push({ op: 'login', email: c.email });
        if (c.password === 'wrong') return E({ message: 'Invalid login credentials', status: 400, code: 'invalid_credentials' });
        if (/^unconfirmed@/.test(c.email)) return E({ message: 'Email not confirmed', status: 400, code: 'email_not_confirmed' });
        if (/^offline@/.test(c.email)) return E({ name: 'AuthRetryableFetchError', message: 'Failed to fetch', status: 0 });
        var ok = { data: { user: user, session: { user: user } }, error: null };
        session = ok.data.session;
        return /^slow@/.test(c.email) ? hold(ok) : Promise.resolve(ok); },
      signUp: function(c){ window.__auth.push({ op: 'signup', email: c.email, data: c.options.data });
        if (/^taken@/.test(c.email)) return E({ message: 'User already registered', status: 422, code: 'user_already_exists' });
        if (/^rate@/.test(c.email)) return E({ message: 'email rate limit exceeded', status: 429, code: 'over_email_send_rate_limit' });
        if (c.password === 'weakpw1') return E({ name: 'AuthWeakPasswordError', message: 'Password is known to be weak and easy to guess', status: 422, code: 'weak_password' });
        if (/^ghost@/.test(c.email)) return Promise.resolve({ data: { user: Object.assign({}, user, { identities: [] }), session: null }, error: null });
        return Promise.resolve({ data: { user: Object.assign({}, user, { identities: [{}] }), session: null }, error: null }); },
      resetPasswordForEmail: function(e, o){ window.__auth.push({ op: 'reset', email: e, redirectTo: o && o.redirectTo });
        return /^rate@/.test(e) ? E({ message: 'For security purposes, you can only request this after 42 seconds.', status: 429 }) : Promise.resolve({ data: {}, error: null }); },
      updateUser: function(p){ window.__auth.push({ op: 'update' });
        if (p.password === 'samepass1') return E({ message: 'New password should be different from the old password.', status: 422, code: 'same_password' });
        return Promise.resolve({ data: { user: user }, error: null }); },
      signOut: function(){ return Promise.resolve({ error: null }); }
    }
  };
  window.supabase = { createClient: function(){ return client; } };
})();`;
}

/* opts: session, recovery, mobile, viewport, lang, fontDir, reducedMotion, hash */
async function openAuth(browser, base, url, opts = {}) {
  const mobile = !!opts.mobile;
  const ctx = await browser.newContext({
    viewport: opts.viewport || (mobile ? { width: 390, height: 844 } : { width: 1280, height: 860 }),
    deviceScaleFactor: 1, hasTouch: mobile, isMobile: mobile, reducedMotion: opts.reducedMotion || 'reduce'
  });
  const page = await ctx.newPage();
  page.__errors = [];
  page.on('pageerror', e => page.__errors.push(e.message));
  if (opts.lang) await page.addInitScript(l => { if (!sessionStorage.getItem('__langSet')) { localStorage.setItem('cerebro_idioma', l); sessionStorage.setItem('__langSet', '1'); } }, opts.lang);
  await page.route(/cdn\.jsdelivr\.net/, r => r.fulfill({ contentType: 'text/javascript', body: fakeSupabase(opts) }));
  await page.route(/assets\/js\/pwa\.js/, r => r.fulfill({ contentType: 'text/javascript', body: '' }));
  await page.route(/dashboard\.html/, r => r.fulfill({ contentType: 'text/html', body: '<!doctype html><title>dash</title><h1>dashboard</h1>' }));
  if (opts.fontDir) {
    await page.route(/fonts\.googleapis\.com/, r => r.fulfill({ contentType: 'text/css', body: fs.readFileSync(path.join(opts.fontDir, 'fonts.css'), 'utf8') }));
    await page.route(/fonts\.gstatic\.com/, r => {
      const f = path.join(opts.fontDir, new URL(r.request().url()).pathname.slice(1).replace(/\//g, '_'));
      return fs.existsSync(f) ? r.fulfill({ contentType: 'font/woff2', body: fs.readFileSync(f) }) : r.abort();
    });
  } else {
    await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  }
  await page.goto(base + '/' + url, { waitUntil: 'load' });
  await page.waitForTimeout(opts.wait || 300);
  return { ctx, page };
}

module.exports = { openAuth, fakeSupabase };

if (require.main === module) (async () => {
  const srv = await startServer();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await chromium.launch();
  let passed = 0, failed = 0;
  async function test(name, fn) {
    try { await fn(); console.log('✅ ' + name); passed++; }
    catch (e) { console.log('❌ ' + name + ': ' + e.message.split('\n')[0]); failed++; }
  }
  function assert(c, m) { if (!c) throw new Error(m); }
  const eq = (a, b, m) => assert(JSON.stringify(a) === JSON.stringify(b), m + ' — got ' + JSON.stringify(a) + ', want ' + JSON.stringify(b));
  const visible = (page, sel) => page.$eval(sel, el => !!(el.offsetWidth || el.offsetHeight) && getComputedStyle(el).display !== 'none');
  const banner = page => page.evaluate(() => {
    const e = document.getElementById('auth-error'), s = document.getElementById('auth-status');
    return { error: e.hidden ? null : e.textContent, success: s.hidden ? null : s.textContent, errRole: e.getAttribute('role'), okRole: s.getAttribute('role'), okLive: s.getAttribute('aria-live') };
  });
  async function login(page, email, password) {
    await page.fill('#login-email', email);
    await page.fill('#login-password', password);
    await page.click('#login-form [type=submit]');
    await page.waitForTimeout(150);
  }
  async function signup(page, email, password) {
    await page.click('[data-tab="register"]');
    await page.fill('#reg-email', email);
    await page.fill('#reg-password', password);
    await page.fill('#reg-username', 'kitty');
    await page.fill('#reg-displayName', 'Kitty Pryde');
    await page.click('#reg-submit');
    await page.waitForTimeout(150);
  }

  /* ── error mapping (auth-module.js) ── */
  await test('authErrorKey maps Supabase errors by code, status and legacy message', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    const got = await page.evaluate(() => [
      { code: 'invalid_credentials', message: 'x' }, { message: 'Invalid login credentials' },
      { code: 'email_not_confirmed' }, { message: 'Email not confirmed' },
      { code: 'user_already_exists' }, { message: 'User already registered' }, { code: 'email_exists' },
      { code: 'weak_password' }, { message: 'Password should be at least 6 characters.' },
      { code: 'same_password', message: 'New password should be different from the old password.' },
      { status: 429, message: 'email rate limit exceeded' }, { message: 'For security purposes, you can only request this after 30 seconds.' },
      { name: 'AuthRetryableFetchError', message: 'Failed to fetch', status: 0 }, { message: 'NetworkError when attempting to fetch resource.' },
      { name: 'AuthSessionMissingError', message: 'Auth session missing!' }, { code: 'otp_expired', message: 'Email link is invalid or has expired' },
      { message: 'Unable to validate email address: invalid format' },
      { message: 'Database error saving new user' }, null
    ].map(window.authErrorKey));
    eq(got, ['auth.err.credentials', 'auth.err.credentials', 'auth.err.unconfirmed', 'auth.err.unconfirmed',
      'auth.err.exists', 'auth.err.exists', 'auth.err.exists', 'auth.err.weak', 'auth.err.weak', 'auth.err.samePassword',
      'auth.err.rate', 'auth.err.rate', 'auth.err.network', 'auth.err.network', 'auth.err.expired', 'auth.err.expired',
      'auth.err.email', 'auth.err.generic', 'auth.err.generic'], 'mapping');
    const keys = await page.evaluate(() => {
      const pt = Object.keys(I18N['pt-BR']).filter(k => k.startsWith('auth.')), en = Object.keys(I18N.en).filter(k => k.startsWith('auth.'));
      return { pt: pt.length, missingEn: pt.filter(k => !(k in I18N.en)), missingPt: en.filter(k => !(k in I18N['pt-BR'])) };
    });
    eq([keys.missingEn, keys.missingPt], [[], []], 'auth.* keys exist in both languages');
    assert(page.__errors.length === 0, 'page errors: ' + page.__errors.join(' | '));
    await ctx.close();
  });

  /* ── wiring: labels, autocomplete, i18n ── */
  await test('index: every input has a linked label, the right autocomplete/type, and no raw keys', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    const fields = await page.$$eval('input:not([type=hidden])', els => els.map(e => ({ id: e.id, label: !!(e.labels && e.labels[0] && e.labels[0].textContent.trim()), ac: e.autocomplete, type: e.type })));
    fields.forEach(f => assert(f.label, f.id + ' has no linked label'));
    const ac = Object.fromEntries(fields.map(f => [f.id, f.ac + '/' + f.type]));
    eq(ac, { 'login-email': 'username/email', 'login-password': 'current-password/password', 'recover-email': 'email/email',
      'reg-email': 'email/email', 'reg-password': 'new-password/password', 'reg-username': 'nickname/text', 'reg-displayName': 'name/text' }, 'autocomplete');
    const txt = await page.evaluate(() => document.body.innerText);
    assert(!/\bauth\.[a-z]/.test(txt), 'raw i18n key visible');
    eq(await page.textContent('#tab-login'), 'Entrar', 'pt-BR tab');
    eq(await page.evaluate(() => document.documentElement.lang), 'pt-BR', 'html lang');
    assert(!/Classificado/i.test(txt), 'uses "Classificado"');
    await ctx.close();
  });

  /* ── login outcomes ── */
  await test('login: wrong password → translated error in the alert box, focus back on the password', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    await login(page, 'gm@xavier.test', 'wrong');
    const b = await banner(page);
    eq(b.error, 'Email ou senha incorretos.', 'error text');
    eq([b.success, b.errRole], [null, 'alert'], 'error presentation');
    assert(!/Invalid login/.test(await page.evaluate(() => document.body.innerText)), 'raw supabase text shown');
    eq(await page.evaluate(() => document.activeElement.id), 'login-password', 'focus');
    eq(await page.$eval('#login-form [type=submit]', b => [b.disabled, b.getAttribute('aria-busy'), b.textContent]), [false, null, 'Acessar'], 'button restored');
    eq(await page.inputValue('#login-email'), 'gm@xavier.test', 'email kept');
    await ctx.close();
  });

  await test('login: unconfirmed email and network failure get their own messages', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    await login(page, 'unconfirmed@xavier.test', 'secret12');
    assert(/não confirmado/.test((await banner(page)).error), 'unconfirmed: ' + (await banner(page)).error);
    await login(page, 'offline@xavier.test', 'secret12');
    assert(/Sem conexão/.test((await banner(page)).error), 'network: ' + (await banner(page)).error);
    await ctx.close();
  });

  await test('login: busy state blocks double submit, Enter submits, success redirects', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    await page.fill('#login-email', 'slow@xavier.test');
    await page.fill('#login-password', 'secret12');
    await page.press('#login-password', 'Enter');
    await page.waitForTimeout(80);
    eq(await page.$eval('#login-form [type=submit]', b => [b.disabled, b.getAttribute('aria-busy'), b.textContent]), [true, 'true', 'Verificando…'], 'busy button');
    await page.press('#login-password', 'Enter');
    await page.$eval('#login-form', f => f.requestSubmit());
    eq(await page.evaluate(() => window.__auth.filter(a => a.op === 'login').length), 1, 'login calls while busy');
    await Promise.all([page.waitForURL(/dashboard\.html/, { timeout: 4000 }), page.evaluate(() => window.__release())]);
    await ctx.close();
  });

  /* ── inline validation ── */
  await test('validation: silent until interaction, then under the field; submit focuses the first invalid field', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    await page.focus('#login-email');
    await page.press('#login-email', 'Tab');
    eq(await page.$eval('#login-email-err', e => e.classList.contains('show')), false, 'error shown on untouched blur');
    await page.fill('#login-email', 'abc');
    await page.press('#login-email', 'Tab');
    eq(await page.$eval('#login-email-err', e => [e.classList.contains('show'), e.textContent]), [true, 'Digite um email válido'], 'email error after typing');
    eq(await page.getAttribute('#login-email', 'aria-invalid'), 'true', 'aria-invalid');
    await page.fill('#login-email', 'abc@x.io');
    eq(await page.$eval('#login-email-err', e => e.classList.contains('show')), false, 'error clears live once fixed');
    await page.fill('#login-email', '');
    await page.click('#login-form [type=submit]');
    eq(await page.evaluate(() => document.activeElement.id), 'login-email', 'first invalid focused');
    eq(await page.evaluate(() => window.__auth.length), 0, 'no auth call with invalid form');
    await page.click('[data-tab="register"]');
    await page.fill('#reg-email', 'new@xavier.test');
    await page.click('#reg-submit');
    eq(await page.evaluate(() => document.activeElement.id), 'reg-password', 'register: first invalid is password');
    eq(await page.textContent('#reg-password-err'), 'Campo obrigatório', 'required message');
    await page.fill('#reg-password', 'abcdef');
    eq(await page.$eval('#reg-password-hint', h => [h.textContent, h.classList.contains('is-ok')]), ['✓ Tamanho ok', true], 'live password hint');
    await ctx.close();
  });

  await test('password toggle shows/hides and relabels; mode switch keeps the typed email and moves focus', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    await page.fill('#login-password', 'secret12');
    await page.click('#login-form .pw-toggle');
    eq(await page.$eval('#login-password', i => i.type), 'text', 'shown');
    eq(await page.$eval('#login-form .pw-toggle', b => [b.textContent, b.getAttribute('aria-label')]), ['Ocultar', 'Ocultar senha'], 'relabelled');
    await page.click('#login-form .pw-toggle');
    eq(await page.$eval('#login-password', i => i.type), 'password', 'hidden again');
    await page.fill('#login-email', 'kitty@xavier.test');
    await page.click('#forgot-password-link');
    eq(await page.inputValue('#recover-email'), 'kitty@xavier.test', 'email → forgot');
    assert(await visible(page, '#recover-title'), 'forgot header visible');
    assert(!(await visible(page, '.auth-tabs')), 'tabs hidden in forgot mode');
    assert(page.url().endsWith('#forgot'), 'hash ' + page.url());
    await page.click('#back-to-login-link');
    await page.click('[data-tab="register"]');
    eq(await page.inputValue('#reg-email'), 'kitty@xavier.test', 'email → register');
    eq(await page.evaluate(() => document.activeElement.id), 'reg-password', 'focus on first empty field');
    eq(await page.$eval('[data-tab="register"]', t => [t.getAttribute('aria-selected'), t.tabIndex]), ['true', 0], 'aria tab state');
    await page.focus('[data-tab="register"]');
    await page.keyboard.press('ArrowLeft');
    eq(await page.$eval('#login-form', f => f.classList.contains('active')), true, 'arrow keys switch tabs');
    await ctx.close();
  });

  await test('validation: a spaces-only password stays valid when "Mostrar" flips the input to type=text', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    await page.fill('#login-email', 'gm@xavier.test');
    await page.fill('#login-password', '   ');
    const problem = () => page.evaluate(() => [authUI.problem(document.getElementById('login-password')), document.getElementById('login-password').type]);
    eq(await problem(), ['', 'password'], 'hidden');
    await page.click('#login-form .pw-toggle');
    eq(await problem(), ['', 'text'], 'shown');
    await page.fill('#login-email', '   ');
    eq(await page.evaluate(() => authUI.problem(document.getElementById('login-email'))), 'auth.val.required', 'non-password fields are still trimmed');
    await page.fill('#login-email', 'gm@xavier.test');
    await page.press('#login-password', 'Tab');
    eq(await page.$eval('#login-password-err', e => e.classList.contains('show')), false, 'no "required" error');
    await Promise.all([page.waitForURL(/dashboard\.html/, { timeout: 4000 }), page.click('#login-form [type=submit]')]);
    await ctx.close();
  });

  await test('index: inherited-property hashes (#constructor, #toString, #__proto__) fall back to login', async () => {
    for (const h of ['constructor', 'toString', '__proto__', 'hasOwnProperty']) {
      const { ctx, page } = await openAuth(browser, base, 'index.html#' + h);
      eq(await page.$$eval('.auth-form.active, form.active', fs => fs.map(f => f.id)), ['login-form'], '#' + h + ' active form');
      eq(page.__errors, [], '#' + h + ' page errors');
      eq(await page.$$eval('.auth-container', e => e.length), 1, '.auth-container marker (tests/spa-e2e.test.js)');
      await ctx.close();
    }
  });

  /* ── signup outcomes ── */
  await test('signup: existing user and weak password land under their fields, translated', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    await signup(page, 'taken@xavier.test', 'secret12');
    eq(await page.$eval('#reg-email-err', e => [e.classList.contains('show'), e.textContent]), [true, 'Já existe uma conta com este email. Entre ou recupere a senha.'], 'exists');
    eq(await page.evaluate(() => document.activeElement.id), 'reg-email', 'focus email');
    eq((await banner(page)).error, null, 'no generic banner');
    await page.fill('#reg-email', 'ghost@xavier.test');
    await page.click('#reg-submit');
    await page.waitForTimeout(150);
    eq(await page.$eval('#reg-email-err', e => e.classList.contains('show')), true, 'exists (obfuscated identities:[])');
    await page.fill('#reg-email', 'new@xavier.test');
    await page.fill('#reg-password', 'weakpw1');
    await page.click('#reg-submit');
    await page.waitForTimeout(150);
    assert(/Senha fraca/.test(await page.textContent('#reg-password-err')), 'weak: ' + await page.textContent('#reg-password-err'));
    await page.fill('#reg-email', 'rate@xavier.test');
    await page.fill('#reg-password', 'secret12');
    await page.click('#reg-submit');
    await page.waitForTimeout(150);
    assert(/Muitas tentativas/.test((await banner(page)).error || ''), 'rate limited banner');
    eq(await page.$eval('#reg-submit', b => b.disabled), false, 'button restored');
    await ctx.close();
  });

  await test('signup ok (email confirmation) → success box, back on login with the email filled', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    await signup(page, 'kitty@xavier.test', 'secret12');
    const b = await banner(page);
    assert(b.success && b.success.includes('kitty@xavier.test') && /Conta criada/.test(b.success), 'success: ' + b.success);
    eq([b.error, b.okRole, b.okLive], [null, 'status', 'polite'], 'success presentation');
    eq(await page.$eval('#auth-status', e => getComputedStyle(e).color), 'rgb(91, 200, 91)', 'success is green, not red');
    eq(await page.$eval('#login-form', f => f.classList.contains('active')), true, 'login mode');
    eq(await page.inputValue('#login-email'), 'kitty@xavier.test', 'email carried');
    eq(await page.evaluate(() => window.__auth[0].data), { username: 'kitty', display_name: 'Kitty Pryde', role: 'player' }, 'same signUp payload');
    await ctx.close();
  });

  await test('forgot password ok → success box (not the red one), same redirectTo', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html#forgot');
    assert(await visible(page, '#recover-form'), '#forgot deep link opens recovery');
    await page.fill('#recover-email', 'kitty@xavier.test');
    await page.click('#recover-form [type=submit]');
    await page.waitForTimeout(150);
    const b = await banner(page);
    assert(b.success && /link de recuperação/.test(b.success), 'success: ' + b.success);
    eq(b.error, null, 'error box hidden');
    const call = await page.evaluate(() => window.__auth[0]);
    assert(call.redirectTo.endsWith('/reset-password.html'), 'redirectTo ' + call.redirectTo);
    await page.fill('#recover-email', 'rate@xavier.test');
    await page.click('#recover-form [type=submit]');
    await page.waitForTimeout(150);
    assert(/Muitas tentativas/.test((await banner(page)).error || ''), 'rate limit on recovery');
    eq((await banner(page)).success, null, 'success cleared on new attempt');
    await ctx.close();
  });

  /* ── language ── */
  await test('language toggle before login: switches to en, keeps the typed email, translates errors', async () => {
    const { ctx, page } = await openAuth(browser, base, 'index.html');
    eq(await page.$eval('#auth-lang', b => [b.textContent, b.getAttribute('aria-label')]), ['EN', 'Mudar idioma para English'], 'toggle label');
    await page.fill('#login-email', 'kitty@xavier.test');
    await Promise.all([page.waitForNavigation(), page.click('#auth-lang')]);
    await page.waitForTimeout(300);
    eq(await page.evaluate(() => [document.documentElement.lang, document.getElementById('tab-login').textContent, document.getElementById('auth-lang').textContent]), ['en', 'Sign in', 'PT-BR'], 'en UI');
    eq(await page.inputValue('#login-email'), 'kitty@xavier.test', 'email survives the reload');
    await page.fill('#login-password', 'wrong');
    await page.click('#login-form [type=submit]');
    await page.waitForTimeout(150);
    eq((await banner(page)).error, 'Incorrect email or password.', 'en error');
    assert(!/\bauth\.[a-z]/.test(await page.evaluate(() => document.body.innerText)), 'raw key in en');
    await ctx.close();
  });

  /* ── reset-password ── */
  await test('reset (valid link): form appears, mismatch shown inline, same password mapped, success → dashboard', async () => {
    const { ctx, page } = await openAuth(browser, base, 'reset-password.html', { session: true, recovery: true, wait: 700 });
    assert(await visible(page, '#reset-form'), 'form visible');
    eq(await page.inputValue('#reset-username'), 'gm@xavier.test', 'hidden username for password managers');
    const ac = await page.$$eval('#reset-form .form-input', els => els.map(e => [e.autocomplete, !!e.labels[0]]));
    eq(ac, [['new-password', true], ['new-password', true]], 'autocomplete + labels');
    await page.fill('#reset-password', 'secret12');
    await page.fill('#reset-password-confirm', 'secret13');
    await page.press('#reset-password-confirm', 'Tab');
    eq(await page.textContent('#reset-password-confirm-err'), 'As senhas não conferem', 'mismatch');
    await page.fill('#reset-password-confirm', 'secret12');
    eq(await page.$eval('#reset-password-confirm-hint', h => h.textContent), '✓ As senhas conferem', 'match hint');
    eq(await page.$eval('#reset-password-confirm-err', e => e.classList.contains('show')), false, 'mismatch cleared');
    await page.fill('#reset-password', 'samepass1');
    await page.fill('#reset-password-confirm', 'samepass1');
    await page.click('#reset-submit');
    await page.waitForTimeout(150);
    assert(/diferente da atual/.test(await page.textContent('#reset-password-err')), 'same password: ' + await page.textContent('#reset-password-err'));
    await page.fill('#reset-password', 'brandnew1');
    await page.fill('#reset-password-confirm', 'brandnew1');
    await page.click('#reset-submit');
    await page.waitForTimeout(150);
    assert(await visible(page, '[data-panel="done"]'), 'done panel');
    eq(await page.$eval('[data-panel="done"] a', a => a.getAttribute('href')), 'dashboard.html', 'continue link');
    await page.waitForURL(/dashboard\.html/, { timeout: 4000 });
    await ctx.close();
  });

  await test('reset (expired link): error hash → invalid state at once, with a new-link action', async () => {
    const { ctx, page } = await openAuth(browser, base, 'reset-password.html#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired');
    assert(await visible(page, '[data-panel="invalid"]'), 'invalid panel');
    assert(!(await visible(page, '[data-panel="form"]').catch(() => false)), 'form hidden');
    eq(await page.$eval('[data-panel="invalid"] .btn-primary', a => a.getAttribute('href')), 'index.html#forgot', 'request new link');
    await ctx.close();
  });

  await test('reset (no session): validating state, then invalid after the timeout', async () => {
    const { ctx, page } = await openAuth(browser, base, 'reset-password.html', { wait: 100 });
    assert(await visible(page, '[data-panel="validating"]'), 'validating shown first');
    await page.waitForSelector('[data-panel="invalid"]:not([hidden])', { timeout: 6000 });
    eq(await page.evaluate(() => document.activeElement.id), 'reset-title', 'focus moves to the card title');
    await ctx.close();
  });

  /* ── offline ── */
  await test('offline: readable, ≥44px actions, retry explains when still offline, en toggle', async () => {
    const { ctx, page } = await openAuth(browser, base, 'offline.html', { mobile: true });
    const m = await page.evaluate(() => [...document.querySelectorAll('.btn')].map(b => [b.getBoundingClientRect().height, parseFloat(getComputedStyle(b).fontSize)]));
    m.forEach(([h, f]) => { assert(h >= 44, 'button height ' + h); assert(f >= 12, 'button font ' + f); });
    eq(await page.$eval('.off-lead', p => parseFloat(getComputedStyle(p).fontSize)), 15, 'body copy size');
    await ctx.setOffline(true);
    await page.click('#off-retry');
    assert(/AINDA SEM SINAL/.test(await page.textContent('#off-st')), 'still-offline message');
    await page.click('#off-lang');
    eq(await page.evaluate(() => [document.documentElement.lang, document.getElementById('off-title').textContent, localStorage.getItem('cerebro_idioma')]), ['en', 'No signal', 'en'], 'en');
    await ctx.close();
  });

  /* ── mobile layout ── */
  await test('mobile 390/360: no horizontal overflow, 16px inputs, ≥44px controls on every auth screen', async () => {
    const screens = [['index.html', {}, null], ['index.html', {}, '[data-tab="register"]'], ['index.html#forgot', {}, null],
      ['reset-password.html', { session: true, recovery: true, wait: 700 }, null], ['offline.html', {}, null]];
    for (const w of [390, 360]) for (const [url, o, click] of screens) {
      const { ctx, page } = await openAuth(browser, base, url, Object.assign({ mobile: true, viewport: { width: w, height: 800 } }, o));
      if (click) await page.click(click);
      const r = await page.evaluate(() => {
        const vis = el => el.offsetWidth > 0 && el.offsetHeight > 0;
        return {
          docW: document.documentElement.scrollWidth, vw: innerWidth,
          small: [...document.querySelectorAll('input:not([type=hidden]),select,textarea')].filter(vis).filter(e => parseFloat(getComputedStyle(e).fontSize) < 16).map(e => e.id),
          tiny: [...document.querySelectorAll('button,a[href],input:not([type=hidden])')].filter(vis).filter(e => e.getBoundingClientRect().height < 44).map(e => e.id || e.className),
          fonts: [...document.querySelectorAll('body *')].filter(vis).filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim())).filter(e => parseFloat(getComputedStyle(e).fontSize) < 12).map(e => e.className || e.tagName)
        };
      });
      const tag = url + (click ? ' (register)' : '') + ' @' + w;
      eq(r.docW, r.vw, tag + ' overflow');
      eq(r.small, [], tag + ' inputs < 16px');
      eq(r.tiny, [], tag + ' targets < 44px');
      eq(r.fonts, [], tag + ' text < 12px');
      assert(page.__errors.length === 0, tag + ' page errors: ' + page.__errors.join(' | '));
      await ctx.close();
    }
  });

  await browser.close();
  srv.close();
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
})();
