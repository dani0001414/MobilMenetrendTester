self.addEventListener('install', e => {
  console.log("Service Worker: Telepítve!");
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Aktiválva!');
});