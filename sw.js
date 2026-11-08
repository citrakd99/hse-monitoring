// Service worker: cache app shell agar bisa dibuka offline.
// Naikkan VERSION setiap kali index.html berubah supaya user dapat versi baru.
const VERSION = 'hse-v1.7';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './config.js',
  './ptw.js',
  './pekerja.js',
  './darurat.js',
  './assets/logo-safran-cw.jpg',
  './assets/logo-ckd.jpg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // API Google Apps Script & foto Google Drive selalu langsung ke jaringan
  if (/script\.google(usercontent)?\.com|drive\.google\.com|googleusercontent\.com/.test(req.url)) return;
  // Halaman & config.js: network-first (supaya perubahan langsung terpakai), fallback ke cache saat offline
  if (req.mode === 'navigate' || req.url.endsWith('/config.js')) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  // Aset lain: cache-first
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return r;
  })));
});
