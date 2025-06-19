
// Service Worker for Level One Radiology
const CACHE_NAME = 'level-one-radiology-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other static assets as needed
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Service Worker: Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Handle different resource types with appropriate strategies
  if (url.pathname.includes('/api/')) {
    // Network first for API calls
    event.respondWith(networkFirst(request));
  } else if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    // Cache first for images
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.includes('/viewer/')) {
    // Network first for DICOM viewer (dynamic content)
    event.respondWith(networkFirst(request));
  } else {
    // Stale while revalidate for other resources
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Caching strategies
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache', error);
    return caches.match(request);
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Both cache and network failed', error);
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Handle background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'dicom-preload') {
    event.waitUntil(preloadDicomImages());
  }
});

async function preloadDicomImages() {
  // Implementation for preloading DICOM images in background
  console.log('Background sync: Preloading DICOM images');
}
