const CACHE_NAME = "digital-card-cache";
const urlsToCache = ["/user.html"];

// Install event to precache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event for dynamic caching
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return; // Skip non-GET requests
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Serve from cache if available
      }

      return fetch(event.request).then((fetchResponse) => {
        if (
          !fetchResponse || 
          fetchResponse.status !== 200 || 
          fetchResponse.type !== "basic"
        ) {
          return fetchResponse; // Skip non-cacheable responses
        }

        // Cache the dynamic URL
        const responseToCache = fetchResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache); // Cache the exact request URL
        });

        return fetchResponse;
      });
    }).catch(() => {
      return caches.match("/users.html"); // Offline fallback
    })
  );
});
