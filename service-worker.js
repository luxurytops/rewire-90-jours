"use strict";

const CACHE_PREFIX = "rewire-90-";
const STATIC_CACHE = `${CACHE_PREFIX}static-v16`;
const DATA_CACHE = `${CACHE_PREFIX}data-v1`;

const APP_SHELL = [
  "./",
  "./index.html",
  "./portfolio-v1/",
  "./portfolio-v1/index.html",
  "./portfolio/",
  "./portfolio/index.html",
  "./portfolio/style.css",
  "./css/styles.css?v=16",
  "./js/app.js?v=16",
  "./manifest.webmanifest",
  "./assets/images/hero-rewire.webp",
  "./assets/images/mohamed-boumrah-about.webp",
  "./assets/images/affiche-masterclass-rewire.webp",
  "./assets/images/flyer-rewire-2026.jpeg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-192.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/favicon-32.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL)),
      caches.open(DATA_CACHE).then((cache) => cache.add("./data/data.json"))
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX))
          .filter((cacheName) => ![STATIC_CACHE, DATA_CACHE].includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirstData(request) {
  const cache = await caches.open(DATA_CACHE);

  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;
    throw error;
  }
}

async function networkFirstPage(request) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedPage = await cache.match(request);
    if (cachedPage) return cachedPage;
    return new Response('<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page indisponible hors connexion</title><h1>Cette page n’est pas disponible hors connexion</h1><p>Reconnectez-vous pour ouvrir cette adresse.</p></html>', {
      status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;
  return fetch(request);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const dataUrl = new URL("./data/data.json", self.registration.scope);

  if (requestUrl.href === dataUrl.href) {
    event.respondWith(networkFirstData(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});
