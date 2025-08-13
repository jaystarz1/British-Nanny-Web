// Service Worker for The British Nanny website
// Implements efficient caching strategies for GitHub Pages

const CACHE_NAME = 'british-nanny-v1.0.0';
const RUNTIME_CACHE = 'runtime-cache-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/potty-training-book.html',
  '/assets/css/style.css?v=1.0.0',
  '/assets/css/daycare.css?v=1.0.0',
  '/assets/css/book.css?v=1.0.0',
  '/assets/js/common.js?v=1.0.0',
  '/assets/js/daycare.js?v=1.0.0'
];

// Cache strategies by file type
const CACHE_STRATEGIES = {
  // Images: Cache for 1 year
  image: {
    cacheName: 'images-cache-v1',
    maxAge: 365 * 24 * 60 * 60, // 1 year in seconds
    maxEntries: 100
  },
  // CSS/JS: Cache for 1 month
  static: {
    cacheName: 'static-cache-v1',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    maxEntries: 50
  },
  // HTML: Cache for 1 hour
  document: {
    cacheName: 'document-cache-v1',
    maxAge: 60 * 60, // 1 hour in seconds
    maxEntries: 10
  }
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && 
                   cacheName !== RUNTIME_CACHE &&
                   !Object.values(CACHE_STRATEGIES).some(s => s.cacheName === cacheName);
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) return;
  
  // Determine cache strategy based on file type
  let strategy;
  if (request.destination === 'image' || /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)) {
    strategy = CACHE_STRATEGIES.image;
  } else if (/\.(css|js)$/i.test(url.pathname)) {
    strategy = CACHE_STRATEGIES.static;
  } else if (request.destination === 'document' || /\.html$/i.test(url.pathname) || url.pathname === '/') {
    strategy = CACHE_STRATEGIES.document;
  }
  
  if (strategy) {
    event.respondWith(
      caches.open(strategy.cacheName).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            // Check if cached response is still valid
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date') || 0);
            const now = new Date();
            const age = (now - cachedDate) / 1000; // age in seconds
            
            if (age < strategy.maxAge) {
              // Return cached response if still valid
              return cachedResponse;
            }
          }
          
          // Fetch from network and update cache
          return fetch(request).then((networkResponse) => {
            // Clone the response before caching
            const responseToCache = networkResponse.clone();
            
            // Add cache date header
            const headers = new Headers(responseToCache.headers);
            headers.set('sw-cache-date', new Date().toISOString());
            
            const modifiedResponse = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: headers
            });
            
            // Update cache
            cache.put(request, modifiedResponse);
            
            return networkResponse;
          }).catch(() => {
            // If network fails, return cached response (if any)
            return cachedResponse || new Response('Offline', { status: 503 });
          });
        });
      })
    );
  }
});

// Message event - handle cache updates
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});