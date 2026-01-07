/* eslint-disable no-restricted-globals */
// VALTREX Service Worker - PWA Support
const CACHE_VERSION = 'valtrex-v4';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const MAX_DYNAMIC_ITEMS = 50;

// Assets to precache
const STATIC_ASSETS = [
  '/manifest.json',
  '/favicon.ico'
];

// Install event - precache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Precaching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
              console.log('[SW] Removing old cache:', key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - cache strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip Firebase/external APIs
  if (url.origin.includes('firebase') || url.origin.includes('googleapis')) {
    return;
  }

  // Network-first for navigation/documents with timeout to avoid long waits
  if (request.destination === 'document') {
    event.respondWith(
      Promise.race([
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put('/index.html', clone);
            });
          }
          return networkResponse;
        }),
        new Promise((resolve) =>
          setTimeout(() => {
            caches.match('/index.html').then(resolve);
          }, 3000) // 3 second timeout - use cache if network is slow
        )
      ]).catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              
              // Cache static assets (JS, CSS, images)
              if (
                request.url.includes('/static/') ||
                request.url.match(/\.(js|css|png|jpg|jpeg|svg|gif|woff2?)$/)
              ) {
                caches.open(DYNAMIC_CACHE).then((cache) => {
                  cache.put(request, responseClone);
                  // Limit cache size
                  limitCacheSize(DYNAMIC_CACHE, MAX_DYNAMIC_ITEMS);
                });
              }
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Utility: limit cache size
function limitCacheSize(cacheName, maxItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(cacheName, maxItems));
      }
    });
  });
}

// Message handler for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
