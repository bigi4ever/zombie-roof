// The drawing app moved to https://bigi4ever.github.io/sketch-to-photo/.
// This replaces the old service worker: it deletes the old cache (only v1; the new app uses v2 on the same origin)
// and unregisters itself, so the old address just forwards to the new one.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.delete('sketch-to-photo-v1')
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then(clients => clients.forEach(c => c.navigate(c.url)))
  );
});
