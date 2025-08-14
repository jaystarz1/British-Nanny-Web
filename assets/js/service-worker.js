// Service Worker for The British Nanny website
// Implements aggressive caching for optimal performance on GitHub Pages

const CACHE_VERSION = 'v1.6.2';
const CACHE_NAME = `british-nanny-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

// Cache duration in seconds
const CACHE_DURATIONS = {
  images: 365 * 24 * 60 * 60,    // 1 year
  fonts: 365 * 24 * 60 * 60,      // 1 year
  styles: 30 * 24 * 60 * 60,      // 30 days
  scripts: 30 * 24 * 60 * 60,     // 30 days
  html: 60 * 60,                  // 1 hour
  api: 5 * 60                     // 5 minutes
};

// Assets to precache on install - Updated versions
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/potty-training-book.html',
  '/assets/css/style.min.css?v=1.6.1',
  '/assets/css/daycare.min.css?v=1.6.1',
  '/assets/css/book.min.css?v=1.6.1',
  '/assets/js/measurements.min.js?v=1.6.0',
  '/assets/js/common.min.js?v=1.6.0',
  '/assets/js/daycare.min.js?v=1.6.0',
  '/assets/js/book.min.js?v=1.6.0',
  // Preload critical images
  '/assets/images/daycare-gallery/optimized/gallery-1-mobile.webp',
  '/assets/images/daycare-gallery/optimized/gallery-2-mobile.webp',
  '/assets/images/daycare-gallery/optimized/gallery-3-mobile.webp'
];

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Precaching assets');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Immediately activate
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('british-nanny-') && name !== CACHE_NAME)
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests (except Google Fonts)
  if (url.origin !== self.location.origin && 
      !url.hostname.includes('fonts.googleapis.com') && 
      !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }
  
  // Determine cache strategy based on file type
  let cacheStrategy = getCacheStrategy(url.pathname);
  
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        const cachedTime = cachedResponse.headers.get('sw-cache-time');
        if (cachedTime) {
          const age = (Date.now() - parseInt(cachedTime)) / 1000;
          const maxAge = getMaxAge(url.pathname);
          
          // Return cached if still fresh
          if (age < maxAge) {
            // For images and fonts, update in background but return cached immediately
            if (getCacheStrategy(url.pathname) === 'images' || getCacheStrategy(url.pathname) === 'fonts') {
              fetch(request).then((response) => {
                if (response && response.status === 200) {
                  caches.open(RUNTIME_CACHE).then((cache) => {
                    cache.put(request, response.clone());
                  });
                }
              }).catch(() => {});
            }
            return cachedResponse;
          }
        } else {
          // No cache time header, but we have a cached response
          // For static assets, return it and update in background
          const strategy = getCacheStrategy(url.pathname);
          if (strategy === 'images' || strategy === 'fonts' || strategy === 'styles' || strategy === 'scripts') {
            fetch(request).then((response) => {
              if (response && response.status === 200) {
                caches.open(RUNTIME_CACHE).then((cache) => {
                  const headers = new Headers(response.headers);
                  headers.append('sw-cache-time', Date.now().toString());
                  const modifiedResponse = new Response(response.body, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: headers
                  });
                  cache.put(request, modifiedResponse);
                });
              }
            }).catch(() => {});
            return cachedResponse;
          }
        }
      }
      
      // Fetch fresh and cache
      return fetch(request).then((response) => {
        // Only cache successful responses
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        
        // Clone the response
        const responseToCache = response.clone();
        
        // Add cache timestamp
        caches.open(RUNTIME_CACHE).then((cache) => {
          const headers = new Headers(responseToCache.headers);
          headers.append('sw-cache-time', Date.now().toString());
          
          const modifiedResponse = new Response(responseToCache.body, {
            status: responseToCache.status,
            statusText: responseToCache.statusText,
            headers: headers
          });
          
          cache.put(request, modifiedResponse);
        });
        
        return response;
      }).catch(() => {
        // If offline and we have a cached version, return it
        return cachedResponse || new Response('Offline', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});

// Helper function to determine cache strategy
function getCacheStrategy(pathname) {
  // Images
  if (/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(pathname)) {
    return 'images';
  }
  
  // Fonts
  if (/\.(woff|woff2|ttf|otf|eot)$/i.test(pathname)) {
    return 'fonts';
  }
  
  // Styles
  if (/\.css$/i.test(pathname)) {
    return 'styles';
  }
  
  // Scripts
  if (/\.js$/i.test(pathname)) {
    return 'scripts';
  }
  
  // HTML
  if (/\.html$/i.test(pathname) || pathname === '/' || pathname === '') {
    return 'html';
  }
  
  // Default
  return 'api';
}

// Helper function to get max age for cache type
function getMaxAge(pathname) {
  const strategy = getCacheStrategy(pathname);
  return CACHE_DURATIONS[strategy] || CACHE_DURATIONS.api;
}

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
      })
    );
  }
});