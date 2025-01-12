// Durante l'installazione, il Service Worker mette in cache i file necessari
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open('biorhythm-cache').then((cache) => {
      console.log('[Service Worker] Caching app shell and content');
      return cache.addAll([
        './',
        './index.html',
        './app.js',
        // Se hai altri file (CSS, immagini, ecc.), aggiungili qui
      ]);
    })
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  // Se devi gestire la cancellazione di vecchie cache, fallo qui
});

// Intercetta le richieste e serve i file dalla cache se disponibili
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching...', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Ritorna la risposta dalla cache se presente, altrimenti effettua un fetch
      return response || fetch(event.request);
    })
  );
});
