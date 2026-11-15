/**
 * X-MEN TTRPG - Authentication Module
 * Login, registration, and session management
 */

(function() {
  const client = window.getSupabaseClient;

  /**
   * Register new user
   */
  window.api = window.api || {};
  
  window.api.register = function(email, password, username, displayName, role) {
    return client().auth.signUp({
      email: email,
      password: password,
      options: {
        data: { username: username, display_name: displayName, role: role || 'player' }
      }
    }).then(function(result) {
      if (result.error) throw result.error;
      return { user: result.data.user, session: result.data.session };
    });
  };

  /**
   * Login with email and password
   */
  window.api.login = function(email, password) {
    return client().auth.signInWithPassword({
      email: email,
      password: password
    }).then(function(result) {
      if (result.error) throw result.error;
      
      // Return user data directly - use Supabase Auth
      var user = result.data.user;
      user.user_metadata = user.user_metadata || {};
      return { user: user, session: result.data.session };
    });
  };

  /**
   * Request password reset email
   */
  window.api.requestPasswordReset = function(email) {
    var base = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
    return client().auth.resetPasswordForEmail(email, {
      redirectTo: base + 'reset-password.html'
    }).then(function(result) {
      if (result.error) throw result.error;
      return result.data;
    });
  };

  /**
   * Update password (used after recovery flow)
   */
  window.api.updatePassword = function(newPassword) {
    return client().auth.updateUser({ password: newPassword }).then(function(result) {
      if (result.error) throw result.error;
      return result.data.user;
    });
  };

  /**
   * Logout current user
   */
  window.api.logout = function() {
    return client().auth.signOut();
  };

  /**
   * Get current user session
   */
  window.api.getCurrentUser = function() {
    return client().auth.getSession().then(function(result) {
      return result.data.session?.user || null;
    });
  };

  /**
   * Require authentication and check role
   */
  window.requireAuth = function(requiredRole) {
    var client = window.getSupabaseClient();
    if (!client) {
      window.location.href = 'index.html';
      return Promise.resolve(null);
    }
    return client.auth.getSession().then(function(result) {
      var session = result.data.session;
      if (!session) {
        window.location.href = 'index.html';
        return null;
      }
      var user = session.user;
      console.log('[requireAuth] User from session:', user.id, user.email);
      console.log('[requireAuth] User metadata role:', user.user_metadata?.role);
      
      // Use Supabase Auth user data directly - no profiles table needed
      var profile = {
        id: user.id,
        email: user.email,
        username: user.user_metadata?.username || user.email.split('@')[0],
        display_name: user.user_metadata?.display_name || user.user_metadata?.username || 'User',
        role: user.user_metadata?.role || 'player'
      };
      
      console.log('[requireAuth] Final profile role:', profile.role);
      
      if (requiredRole && profile.role !== requiredRole) {
        window.location.href = 'dashboard.html';
        return null;
      }
      return { session: session, profile: profile };
    });
  };

  /**
   * Require GM role
   */
  window.requireGM = function() {
    return window.requireAuth('gm');
  };

  /**
   * Check if user is already authenticated, redirect if so
   */
  window.checkAuth = function() {
    var client = window.getSupabaseClient();
    if (!client) {
      console.warn('Supabase client not initialized');
      return;
    }
    client.auth.getSession().then(function(result) {
      if (result.data.session) window.location.href = 'dashboard.html';
    });
  };

  /**
   * Global function wrappers for inline HTML handlers
   */
  window.login = function(email, password) {
    return window.api.login(email, password);
  };

  window.register = function(email, password, username, displayName, role) {
    return window.api.register(email, password, username, displayName, role);
  };

  window.logout = function() {
    return window.api.logout().then(function() {
      window.location.href = 'index.html';
    });
  };

  /**
   * Map a Supabase auth error (code / status / message, any auth-js v2 version) to an i18n key.
   * Order matters: "Email link is invalid or has expired" must hit expired, not email.
   */
  window.authErrorKey = function(err) {
    err = err || {};
    var code = String(err.code || err.error_code || '');
    var msg = String(err.message || err.msg || err.error_description || '').toLowerCase();
    if (navigator.onLine === false || err.name === 'AuthRetryableFetchError' ||
        /failed to fetch|networkerror|load failed|network request failed/.test(msg)) return 'auth.err.network';
    if (code === 'invalid_credentials' || /invalid login credentials/.test(msg)) return 'auth.err.credentials';
    if (code === 'email_not_confirmed' || /email not confirmed/.test(msg)) return 'auth.err.unconfirmed';
    if (code === 'user_already_exists' || code === 'email_exists' || /already (been )?registered|already exists/.test(msg)) return 'auth.err.exists';
    if (code === 'same_password' || /should be different/.test(msg)) return 'auth.err.samePassword';
    if (code === 'weak_password' || /password should|password is too weak|weak password/.test(msg)) return 'auth.err.weak';
    if (err.status === 429 || /rate_limit/.test(code) || /rate limit|security purposes|too many/.test(msg)) return 'auth.err.rate';
    if (err.name === 'AuthSessionMissingError' || /otp_expired|flow_state|bad_jwt|session_not_found/.test(code) ||
        /session missing|expired|invalid.*(token|jwt|link)/.test(msg)) return 'auth.err.expired';
    if (code === 'email_address_invalid' || /invalid.*email|email.*invalid|unable to validate email/.test(msg)) return 'auth.err.email';
    return 'auth.err.generic';
  };

  /**
   * Shared UI for the standalone auth pages (index.html, reset-password.html).
   * Field contract: <input id="x"> + optional #x-err (.form-error), #x-hint (.form-hint data-ok="key"), #x-caps.
   * ponytail: lives here because both auth pages already load this file; split out if a third consumer appears.
   */
  var $ = function(id) { return document.getElementById(id); };
  var ui = window.authUI = {};

  /* form-level banner: success → #auth-status (role=status), error → #auth-error (role=alert); no args clears */
  ui.say = function(kind, text) {
    [['error', $('auth-error')], ['success', $('auth-status')]].forEach(function(p) {
      if (!p[1]) return;
      var on = p[0] === kind && !!text;
      p[1].textContent = on ? text : '';
      p[1].hidden = !on;
    });
  };

  /* returns the i18n key of the first problem, '' when fine */
  ui.problem = function(inp) {
    var v = inp.value;
    // passwords are never trimmed; keyed on autocomplete (current-/new-password) because the show/hide toggle flips `type`
    var isPw = /(^|\s)(current|new)-password$/.test(inp.getAttribute('autocomplete') || '');
    if (inp.required && !(isPw ? v : v.trim())) return 'auth.val.required';
    if (inp.type === 'email' && inp.validity.typeMismatch) return 'auth.val.email';
    if (inp.minLength > 0 && v.length < inp.minLength) return 'auth.val.passwordShort';
    if (inp.dataset.match && v !== $(inp.dataset.match).value) return 'auth.val.mismatch';
    return '';
  };

  ui.fieldError = function(inp, key) {
    var el = $(inp.id + '-err');
    if (el) { el.textContent = key ? t(key) : ''; el.classList.toggle('show', !!key); }
    inp.classList.toggle('validate-error', !!key);
    if (key) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid');
  };

  function hint(inp) {
    var h = $(inp.id + '-hint');
    if (!h || !h.dataset.ok) return;
    var ok = !!inp.value && !ui.problem(inp);
    h.textContent = ok ? t(h.dataset.ok) : (h.dataset.i18n ? t(h.dataset.i18n) : '');
    h.classList.toggle('is-ok', ok);
  }
  function check(inp) { ui.fieldError(inp, ui.problem(inp)); hint(inp); }
  function fields(form) { return Array.prototype.filter.call(form.querySelectorAll('.form-input'), function(i) { return !i.disabled && i.offsetParent !== null; }); }

  /* errors appear only after the user typed in a field (on blur) or tried to submit; once shown they update live */
  ui.wire = function(form) {
    form.noValidate = true;
    form.querySelectorAll('.form-input').forEach(function(inp) {
      inp.addEventListener('input', function() {
        inp.dataset.dirty = '1';
        if (inp.getAttribute('aria-invalid')) check(inp); else hint(inp);
        var dep = form.querySelector('[data-match="' + inp.id + '"]');
        if (dep && dep.dataset.dirty) check(dep);
      });
      inp.addEventListener('blur', function() { if (inp.dataset.dirty) check(inp); });
    });
  };

  /* validates every visible field; returns the first invalid one (or null) */
  ui.validate = function(form) {
    var first = null;
    fields(form).forEach(function(inp) { inp.dataset.dirty = '1'; check(inp); if (!first && inp.getAttribute('aria-invalid')) first = inp; });
    return first;
  };

  /* busy state: disabled + aria-busy + "…ing" label; returns restore() */
  ui.busy = function(btn) {
    var idle = btn.textContent;
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    if (btn.dataset.busy) btn.textContent = t(btn.dataset.busy);
    return function() { btn.disabled = false; btn.removeAttribute('aria-busy'); btn.textContent = idle; };
  };

  /* submit = validate → busy → run(); run resolves true to stay busy (redirecting) */
  ui.onSubmit = function(form, run) {
    ui.wire(form);
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      if (btn.disabled) return;
      ui.say();
      var bad = ui.validate(form);
      if (bad) { bad.focus(); return; }
      var restore = ui.busy(btn);
      Promise.resolve().then(run).then(function(stay) { if (stay !== true) restore(); }, function(err) { restore(); console.warn('[auth]', err); ui.say('error', t('auth.err.generic')); });
    });
  };

  /* show/hide toggles (.pw-toggle[aria-controls]) + caps-lock hint (#<input>-caps) */
  ui.wirePasswords = function(root) {
    root.querySelectorAll('.pw-toggle').forEach(function(b) {
      var inp = $(b.getAttribute('aria-controls'));
      b.addEventListener('click', function() {
        var show = inp.type === 'password';
        inp.type = show ? 'text' : 'password';
        b.firstElementChild.textContent = t(show ? 'auth.pw.hide' : 'auth.pw.show');
        b.setAttribute('aria-label', t(show ? 'auth.pw.hideLabel' : 'auth.pw.showLabel'));
      });
    });
    root.querySelectorAll('input[type="password"]').forEach(function(inp) {
      var caps = $(inp.id + '-caps');
      if (!caps) return;
      var upd = function(e) { if (e.getModifierState) caps.hidden = !e.getModifierState('CapsLock'); };
      inp.addEventListener('keydown', upd);
      inp.addEventListener('keyup', upd);
      inp.addEventListener('blur', function() { caps.hidden = true; });
    });
  };

  /* pre-login language toggle; before() runs right before the reload */
  ui.lang = function(btn, before) {
    var next = getCurrentLanguage() === 'en' ? 'pt-BR' : 'en';
    btn.textContent = (window.LANGUAGES[next] || {}).name || next;
    btn.lang = next;
    btn.setAttribute('aria-label', t('auth.langLabel'));
    btn.addEventListener('click', function() { if (before) before(); setLanguage(next); });
  };

})();