const CACHE_NAME = 'phong-thuy-v57-tabs-fix';
const ASSETS = [
  './','./index.html','./la-ban-cao-cap.html','./style.css','./home-upgrade.css',
  './app.js','./home-upgrade.js','./hero-lakinh.svg','./backup.js',
  './manifest.json','./icon-192.png','./icon-512.png'
];
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const isShell = url.pathname.endsWith('/') || url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') || url.pathname.endsWith('sw.js');
  if (e.request.method !== 'GET') return;
  if (isShell) {
    e.respondWith(
      fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then((c) => c || fetch(e.request)));
});
