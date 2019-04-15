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
          if (cache !== cacheName) {
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
  console.log('ServiceWorker: Fetcheljük a ' + e.request.url);
  var twitch_cover = e.request.url.startsWith('https://static-cdn.jtvnw.net/twitch-event');
  if ((e.request.method !== 'GET') | (twitch_cover == true)) {
    console.log('Service Worker: Post Request és Képeket nem töltünk le!');
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cachedRes => {
      return cachedRes;

    }).catch(err => fetch(e.request).then(res => res))
  );
});
