const CACHE_NAME = 'phong-thuy-v48-backup-seo-security';
const ASSETS = [
  './',
  './index.html',
  './la-ban-cao-cap.html',
  './phong-thuy-nha-nang-cao.html',
  './bat-trach.js',
  './ngay-xay-dung.js',
  './huyen-khong.js',
  './hoa-giai-sat-khi.js',
  './style.css',
  './app.js',
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
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
