const CACHE_NAME = "dynamic-user-cache-v3";

// Install event: initialize the cache
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Cache opened");
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches if needed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: handle dynamic user-specific caching
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // Check if the URL is a user-specific manifest or resource
  if (requestUrl.pathname.match(/^\/[^/]+$/)) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Check Cache-Control headers
          const cacheControl = networkResponse.headers.get("Cache-Control");
          if (
            cacheControl &&
            (cacheControl.includes("no-cache") || cacheControl.includes("must-revalidate"))
          ) {
            // Do not cache if headers specify no-cache or must-revalidate
            return networkResponse;
          }

          // Cache the response if allowed (no "no-store")
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // If network fails, attempt to serve from cache
          return caches.match(event.request);
        })
    );
  }
});
