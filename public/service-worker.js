const CACHE_VERSION = "engineering-portfolio-v1";
const SHELL_CACHE = `${CACHE_VERSION}:shell`;
const MEDIA_CACHE = `${CACHE_VERSION}:media`;
const OFFLINE_URL = "/offline.html";
const SHELL_ASSETS = [
  "/",
  "/map",
  "/pt",
  "/pt/mapa",
  OFFLINE_URL,
  "/manifest.json",
  "/favicon.png",
  "/paradoxo.png",
  "/bg0.webp",
  "/overlay.png",
  "/asset-manifest.en.json",
  "/asset-manifest.pt.json",
];

const isSameOrigin = (url) => url.origin === self.location.origin;
const isMediaRequest = (request) =>
  request.destination === "image" ||
  request.destination === "font" ||
  request.destination === "video";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![SHELL_CACHE, MEDIA_CACHE].includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL)))
    );
    return;
  }

  if (isSameOrigin(url) && (isMediaRequest(request) || url.pathname.startsWith("/static/"))) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(isMediaRequest(request) ? MEDIA_CACHE : SHELL_CACHE).then((cache) => {
            cache.put(request, copy);
          });
          return response;
        });
      })
    );
  }
});
