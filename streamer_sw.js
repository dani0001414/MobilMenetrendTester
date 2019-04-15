var CACHE = 'cache-and-update';

// On install, cache some resources.
self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.');

  // Ask the service worker to keep installing until the returning promise
  // resolves.
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function (evt) {
  var twitch_cover = evt.request.url.startsWith('https://static-cdn.jtvnw.net/twitch-event');
  //We dont want the post request and the twitch covers.
  if ((evt.request.method !== 'GET') | (twitch_cover == true)) {
    console.log('Service Worker: Post Request és Képeket nem töltünk le!');
    return;
  }

  //console.log('The service worker is serving the asset.');
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  evt.waitUntil(update(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.


// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      console.log('return');
      return matching || Promise.reject('no-match');
    }).catch(err => fetch(request).then(res => {
      const resClone = request.clone();
      //Cash megnyitása
        caches.open(CACHE).then(cache => {
        //Válaszok(response) hozzáadása a gyorsítótárhoz
        cache.put(request, resClone);
      });
      return res;
    }));
  });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}