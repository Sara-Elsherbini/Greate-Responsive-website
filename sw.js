
var cacheName="pwaTest"
var filesToCache=[
    "/",
    "index.html/",
    "sw.js/",
    "manifest.js/",
    "./js/bootstrap.min.js/",
    "./js/jquery-3.5.1.slim.min.js/",
    "./js/popper.min.js/",
    "./imge/offline-img.png"
    
]

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }


  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('sw: writing files into cache');
        return cache.addAll(filesToCache);
      })
    )
  });


  self.addEventListener('activate', function (event) {
    console.log('sw: service worker ready and activated', event);
  });


  self.addEventListener('fetch', function(event) {
    event.respondWith(
      // test if the request is cached
      caches.match(event.request).then(function(response) {
        // 1) if response cached, it will be returned from browser cache
        // 2) if response not cached, fetch resource from network
        return response || fetch(event.request);
      }).catch(function (err) {
        // if response not cached and network not available an error is thrown => return fallback image
        return caches.match('img/offline-img.png');
      })
    )
  });
  