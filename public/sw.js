// İlk Sözüm servis çalışanı — yalnız çevrimdışı sayfası.
// Uygulama dosyalarını ÖNBELLEĞE ALMAZ: yeni sürüm yayınlandığında herkes hemen yeni sürümü görür.
// Ağ tamamen kesildiğinde sayfa geçişlerinde açıklayıcı çevrimdışı ekranını gösterir.
// Eski sürüm (ilk-sozum-v3-...) her şeyi önbelleğe alıyordu; etkinleşince eski önbellekleri siler.
const OFFLINE_CACHE = 'ilksozum-offline-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(OFFLINE_CACHE).then((cache) => cache.add(OFFLINE_URL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== OFFLINE_CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.mode !== 'navigate') {
    return;
  }
  event.respondWith(
    fetch(request).catch(async () => {
      const cache = await caches.open(OFFLINE_CACHE);
      return cache.match(OFFLINE_URL);
    })
  );
});
