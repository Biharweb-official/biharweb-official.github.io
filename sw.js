// BiharWeb Official PWA - v15 FINAL PRODUCTION RELEASE - Production Ready - Launch Ready - 2026-07-23
// Verified: Agency BiharWeb Official Founder Abinash Singh Support +91 7295979576 Independent AI Agency Madhepura Bihar 852113 - Zero Fake - Premium Black Gold PWA - GitHub Pages Ready
const VERSION = 'bw-v15-2026-07-23-final-production-ready';
const CACHE_STATIC = VERSION + '-static';
const CACHE_DYNAMIC = VERSION + '-dynamic';
const OFFLINE_URL = '/offline.html';
const STATIC_ASSETS = ['/', '/index.html', '/offline.html', '/style.css', '/script.js', '/manifest.webmanifest', '/sitemap.xml', '/robots.txt', '/privacy-policy.html', '/terms-and-conditions.html', '/disclaimer.html', '/404.html'];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => cache.addAll(STATIC_ASSETS.map(url => new Request(url, {cache: 'reload'})))).then(()=>self.skipWaiting()).catch(()=>self.skipWaiting())
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k.startsWith('bw-v') && k!==CACHE_STATIC && k!==CACHE_DYNAMIC).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (url.hostname !== location.hostname && !url.hostname.includes('fonts.gstatic.com') && !url.hostname.includes('fonts.googleapis.com')) return;
  if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(req).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_DYNAMIC).then(c=>c.put(req, clone));
        }
        return res;
      }).catch(() => caches.match(req).then(cached => cached || caches.match(OFFLINE_URL).then(off => off || caches.match('/index.html'))))
    );
    return;
  }
  if (req.url.includes('.css') || req.url.includes('.js') || url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.match(req).then(cached => {
        const fetchPromise = fetch(req).then(networkRes => {
          if (networkRes.ok) {
            const clone = networkRes.clone();
            caches.open(CACHE_STATIC).then(c=>c.put(req, clone));
          }
          return networkRes;
        }).catch(()=>cached);
        return cached || fetchPromise;
      })
    );
    return;
  }
  event.respondWith(
    fetch(req).then(res => {
      if (res.ok && req.url.startsWith('http')) {
        const clone = res.clone();
        caches.open(CACHE_DYNAMIC).then(c=>c.put(req, clone));
      }
      return res;
    }).catch(()=>caches.match(req).then(cached=>cached || caches.match(OFFLINE_URL)))
  );
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
