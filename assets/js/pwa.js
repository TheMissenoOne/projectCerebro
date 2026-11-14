/**
 * X-MEN TTRPG — Módulo PWA
 * Registra o service worker, avisa quando há versão nova e expõe o botão de instalar.
 */

(function () {
  var deferredPrompt = null;
  var INSTALL_DISMISSED = 'cerebro_pwa_dismissed';

  function notify(msg) {
    if (typeof window.showToast === 'function') return window.showToast(msg);
    if (typeof window.toast === 'function') return window.toast(msg);
    console.log('[pwa]', msg);
  }

  /* ── barra de instalação ──────────────────────────────────────── */

  function buildInstallBar() {
    if (document.getElementById('pwa-install-bar')) return;
    var bar = document.createElement('div');
    bar.id = 'pwa-install-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Instalar aplicativo');
    bar.innerHTML =
      '<span class="pwa-bar-txt">// INSTALAR O CÉREBRO COMO APP</span>' +
      '<button type="button" class="pwa-bar-btn" id="pwa-install-yes">INSTALAR</button>' +
      '<button type="button" class="pwa-bar-close" id="pwa-install-no" aria-label="Dispensar">✕</button>';
    document.body.appendChild(bar);

    document.getElementById('pwa-install-yes').addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choice) {
        if (choice.outcome !== 'accepted') localStorage.setItem(INSTALL_DISMISSED, '1');
        deferredPrompt = null;
        bar.remove();
      });
    });
    document.getElementById('pwa-install-no').addEventListener('click', function () {
      localStorage.setItem(INSTALL_DISMISSED, '1');
      bar.remove();
    });
    requestAnimationFrame(function () {
      bar.classList.add('show');
    });
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    window.pwaCanInstall = true;
    if (localStorage.getItem(INSTALL_DISMISSED) === '1') return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildInstallBar);
    } else {
      buildInstallBar();
    }
  });

  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    window.pwaCanInstall = false;
    var bar = document.getElementById('pwa-install-bar');
    if (bar) bar.remove();
    localStorage.removeItem(INSTALL_DISMISSED);
    notify('Cérebro instalado.');
  });

  /* Permite disparar a instalação a partir de um botão próprio da UI. */
  window.pwaInstall = function () {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      return true;
    }
    notify('Use o menu do navegador → "Adicionar à tela de início".');
    return false;
  };

  window.pwaIsStandalone = function () {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  };

  /* ── service worker ───────────────────────────────────────────── */

  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;

  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('sw.js')
      .then(function (reg) {
        reg.addEventListener('updatefound', function () {
          var sw = reg.installing;
          if (!sw) return;
          sw.addEventListener('statechange', function () {
            /* só é atualização se já havia um SW controlando a página */
            if (sw.state === 'installed' && navigator.serviceWorker.controller) {
              notify('Nova versão disponível — recarregando…');
              sw.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
      })
      .catch(function (e) {
        console.warn('[pwa] registro do service worker falhou:', e);
      });

    /* Primeira instalação: clients.claim() também dispara controllerchange, mas não é
       atualização — recarregar ali apagava o que o usuário já tinha digitado. Em vez
       disso, repassa pelo SW o que a página carregou antes de ser controlada. */
    var hadController = !!navigator.serviceWorker.controller;
    var reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!hadController) {
        hadController = true;
        warmCache();
        return;
      }
      if (reloading) return;
      reloading = true;
      location.reload();
    });
  });

  /* Refaz, já controlado pelo SW, os pedidos da 1ª visita (CSS do Google Fonts,
     supabase-js, assets fora do precache) para que a próxima abertura funcione offline.
     Modo cors (as três CDNs mandam ACAO:*): o @font-face pede woff2 em cors e não
     aceita resposta opaca. */
  function warmCache() {
    var cdn = /^https:\/\/(fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net)\//;
    var noop = function () {};
    performance.getEntriesByType('resource').forEach(function (e) {
      if (e.name.indexOf(location.origin + '/') !== 0 && !cdn.test(e.name)) return;
      var req = fetch(e.name);
      if (e.name.indexOf('https://fonts.googleapis.com/') !== 0) {
        /* lê o corpo: um fetch largado fica com o stream do SW aberto até o GC */
        req.then(function (r) { return r.blob(); }).catch(noop);
        return;
      }
      /* woff2 pedidos por um CSS sem crossorigin (opaco) não aparecem no Resource
         Timing — tira as URLs do próprio CSS.
         ponytail: só o subset latin (cobre pt-BR); outros scripts caem na fonte de
         sistema offline. */
      req
        .then(function (r) { return r.text(); })
        .then(function (css) {
          (css.match(/\/\* latin \*\/[^}]*/g) || []).forEach(function (block) {
            var m = block.match(/url\(([^)]+)\)/);
            if (m) fetch(m[1]).then(function (r) { return r.blob(); }).catch(noop);
          });
        })
        .catch(noop);
    });
  }

  /* ── estado da rede ───────────────────────────────────────────── */

  function paintOffline() {
    document.documentElement.classList.toggle('is-offline', !navigator.onLine);
  }
  window.addEventListener('online', function () {
    paintOffline();
    notify('Conexão restaurada.');
  });
  window.addEventListener('offline', function () {
    paintOffline();
    notify('Sem conexão — trabalhando offline.');
  });
  paintOffline();
})();
