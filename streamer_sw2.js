const cacheName = 'v1';

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
  var twitch_cover = e.request.url.startsWith('https://static-cdn.jtvnw.net/twitch-event');
  if ((e.request.method !== 'GET') | (twitch_cover == true)) {
    console.log('Service Worker: Post Request és Képeket nem töltünk le!');
    return;
  }
  e.respondWith(
    fetch(e.request).catch(()=> caches.match(e.request))
  )
})