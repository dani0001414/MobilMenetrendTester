const cacheName = 'v1';
const cacheAssets = [
  'index.html',
]
self.addEventListener('install', e => {
  console.log("Service Worker: Telepítve!");
  e.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log("Service Worker: Gyorsítótárazás");
      cache.addAll(chacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Aktiválva!');
});