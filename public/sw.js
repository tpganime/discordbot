// ==========================================
// 🚀 FUSIONHUB MOBILE FULL-WEBSITE PWA CACHE WORKER
// ==========================================

const CACHE_NAME = 'fusionhub-mobile-v3';

// Core routes and assets to cache immediately on mobile
const PRECACHE_URLS = [
  '/',
  '/commands',
  '/status',
  '/updates',
  '/terms',
  '/privacy',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
  'https://i.ibb.co/vC79Nthr/Whats-App-Image-2026-03-23-at-6-49-47-PM.jpg'
];

// Install: Pre-cache full application shell and critical routes
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching mobile website bundle...');
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[ServiceWorker] Pre-cache partial fail, continuing...', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache version:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy:
// 1. API routes (/api/): Network-First with Cache Fallback (for real-time live ping/shards)
// 2. Static Assets & Pages: Stale-While-Revalidate for instant 0ms mobile loads
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension schemes
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Live API Endpoints: Network first, fallback to cached offline stats
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // App Shell & Static Assets: Stale-While-Revalidate (Instant cached render + background refresh)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch((err) => {
          // If offline and request is HTML navigation, return cached home page
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          throw err;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
