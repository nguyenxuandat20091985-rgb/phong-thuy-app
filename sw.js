const CACHE_NAME = 'phong-thuy-v53-lakinh-diacritics';
const ASSETS = [
  './',
  './index.html',
  './la-ban-cao-cap.html',
  './style.css',
  './home-upgrade.css',
  './app.js',
  './home-upgrade.js',
  './hero-lakinh.svg',
  './backup.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
