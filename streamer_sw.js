const cacheName = 'v1';
const cacheAssets = [
  '/',
  'index.html'
]
self.addEventListener('install', e => {
  console.log("Service Worker: Telepítve!");
 
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
    fetch(e.request)
    .then(res => {
      //másolat készítése a válaszokról.
      const resClone = res.clone();
      //Cash megnyitása
      caches
      .open(cacheName)
      .then(cache => {
        //Válaszok(response) hozzáadása a gyorsítótárhoz
        cache.put(e.request, resClone);
      });
      return res;
    }).catch(err => caches.match(e.request).then(res => res))
  );
});