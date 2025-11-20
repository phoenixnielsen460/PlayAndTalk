const CACHE_NAME = 'play-and-speak-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/index.jsx',
  '/src/App.jsx',
  '/src/styles.css',
  '/public/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Network-first for API-ish requests, cache-first for others
  if (event.request.method !== 'GET') return;
  if (url.origin === location.origin && (url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.jpeg') || url.pathname.endsWith('.svg'))) {
    // runtime cache images
    event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request).then(fetchResp => {
      return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, fetchResp.clone()); return fetchResp; });
    })).catch(()=>caches.match('/icon-192.png')));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then(r => {
        return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, r.clone()); return r; });
      });
    }).catch(() => caches.match('/index.html'))
  );
});
