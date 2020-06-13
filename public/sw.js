const CACHE_PREFIX = `big-trip-cache`;
const CACHE_VER = `v1`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;
const urlToCache = [
  `/`,
  `/index.html`,
  `/bundle.js`,
  `/css/style.css`,
  `/img/icons/check-in.png`,
  `/img/icons/drive.png`,
  `/img/icons/flight.png`,
  `/img/icons/restaurant.png`,
  `/img/icons/ship.png`,
  `/img/icons/sightseeing.png`,
  `/img/icons/taxi.png`,
  `/img/icons/train.png`,
  `/img/icons/transport.png`,
  `/img/header-bg.png`,
  `/img/header-bg@2x.png`,
  `/img/logo.png`,
  `/img/icons/bus.png`,
];

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(urlToCache);
        })
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
      caches.keys()
        .then(
            (keys) => Promise.all(
                keys.map(
                    (key) => {
                      if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                        return caches.delete(key);
                      }
                      return null;
                    })
                  .filter((key) => key !== null)
            )
        )
  );
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      caches.match(evt.request)
        .then((cacheResponse) => {
          if (cacheResponse) {
            return cacheResponse;
          }
          return fetch(evt.request)
            .then((response) => response);
        })
  );
});
