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
      cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Aktiválva!');
  //Töröljük a nemkívánt gyorsítótárakat.
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName){
            console.log('ServiceWorker: Töröli a régi gyorítótárat!');
            return caches.delete(cache);
          }
        })
      )
    })
  )
});

//Fetch event meghívása
self.addEventListener('fetch', e => {
  console.log('ServiceWorker: Fetchelés!');
  e.respondWith(
    fetch(e.request).catch(()=> caches.match(e.request))
  )
})