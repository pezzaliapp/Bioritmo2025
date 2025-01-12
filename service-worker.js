const CACHE_NAME = "biorhythm-cache-v2"; // Cambia il nome della cache ogni volta che aggiorni
const ASSETS = [
    "./index.html",
    "./styles.css",
    "./app.js",
    "./manifest.json",
    "./images/icon-192x192.png",
    "./images/icon-512x512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching assets...");
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log("Deleting old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
