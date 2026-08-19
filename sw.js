/**
 * X-MEN TTRPG — Service Worker
 *
 * Estratégias:
 *  - navegação (documentos)  → network-first, cai no cache e depois em offline.html
 *  - estático mesma origem   → stale-while-revalidate
 *  - CDN de fonte/lib        → cache-first com revalidação em background
 *  - Supabase e demais APIs  → sempre rede (nunca cacheia dado de sessão/jogo)
 *
 * A versão dos caches vem do BUILD_QUERY, reescrito pelo deploy.
 */

/* ponytail: mesmo placeholder "?v=dev" do HTML — o deploy reescreve os dois para o
   SHA do commit, o que versiona os caches e alinha as URLs do precache às que as
   páginas realmente pedem. */
const BUILD_QUERY = '?v=dev';
const CACHE_VERSION = BUILD_QUERY.slice(3);
const SHELL_CACHE = 'cerebro-shell-' + CACHE_VERSION;
const RUNTIME_CACHE = 'cerebro-runtime-' + CACHE_VERSION;
const CDN_CACHE = 'cerebro-cdn-' + CACHE_VERSION;
const OFFLINE_URL = 'offline.html';

/* Casca da aplicação: o suficiente para abrir qualquer página sem rede. */
const SHELL = [
  './',
  'index.html',
  'dashboard.html',
  'ficha.html',
  'cerebro.html',
  'wiki.html',
  'combate.html',
  'admin.html',
  OFFLINE_URL,
  'manifest.webmanifest',
  'temas.json',
  'momentosDeEvolucao.json',
  'assets/css/base.css' + BUILD_QUERY,
  'assets/css/components.css' + BUILD_QUERY,
  'assets/css/mobile.css' + BUILD_QUERY,
  'assets/css/auth.css' + BUILD_QUERY,
  'assets/css/admin.css' + BUILD_QUERY,
  'assets/css/dashboard.css' + BUILD_QUERY,
  'assets/css/combate.css' + BUILD_QUERY,
  'assets/css/wiki.css' + BUILD_QUERY,
  'assets/js/config.js' + BUILD_QUERY,
  'assets/js/i18n.js' + BUILD_QUERY,
  'assets/js/supabase-client.js' + BUILD_QUERY,
  'assets/js/cache-module.js' + BUILD_QUERY,
  'assets/js/auth-module.js' + BUILD_QUERY,
  'assets/js/api.js' + BUILD_QUERY,
  'assets/js/globals.js' + BUILD_QUERY,
  'assets/js/estado-module.js' + BUILD_QUERY,
  'assets/js/themes.js' + BUILD_QUERY,
  'assets/js/header.js' + BUILD_QUERY,
  'assets/js/pwa.js' + BUILD_QUERY,
  'assets/js/wiki.js' + BUILD_QUERY,
  'assets/js/wiki-pages.js' + BUILD_QUERY,
  'assets/img/icon-192.png',
  'assets/img/icon-512.png',
  'assets/img/pwa-icon.svg',
];

const CDN_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

/* Hosts cujas respostas nunca podem ser servidas do cache (sessão, dados de jogo). */
function isApiRequest(url) {
  return url.hostname.endsWith('.supabase.co') || url.pathname.startsWith('/rest/v1/');
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      /* addAll aborta tudo se um item falhar — cacheia um a um e ignora o que faltar */
      Promise.all(
        SHELL.map((url) =>
          cache
            .add(new Request(url, { cache: 'reload' }))
            .catch((e) => console.warn('[sw] precache falhou:', url, e.message))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const keep = [SHELL_CACHE, RUNTIME_CACHE, CDN_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function staleWhileRevalidate(request, cacheName) {
  return caches.open(cacheName).then((cache) =>
    cache.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok && response.type !== 'opaque') cache.put(request, response.clone());
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (isApiRequest(url)) return; /* sempre rede */

  /* Documentos: rede primeiro para nunca servir HTML velho depois de um deploy. */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          /* guarda sem a query: ficha.html?id=... não pode multiplicar entradas */
          const copy = response.clone();
          const key = url.origin + url.pathname;
          if (response.ok) caches.open(SHELL_CACHE).then((cache) => cache.put(key, copy));
          return response;
        })
        .catch(() =>
          caches
            .match(request, { ignoreSearch: true })
            .then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, CDN_CACHE));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});
