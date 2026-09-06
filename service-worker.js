"use strict";

const CACHE_PREFIX = "rewire-90-";
const STATIC_CACHE = `${CACHE_PREFIX}static-v17`;
const DATA_CACHE = `${CACHE_PREFIX}data-v1`;

const APP_SHELL = [
  "./portfolio/preuves/images/P01.png",
  "./portfolio/preuves/images/P02.png",
  "./portfolio/preuves/images/P03.png",
  "./portfolio/preuves/images/P04.png",
  "./portfolio/preuves/images/P05.png",
  "./portfolio/preuves/images/P06.png",
  "./portfolio/preuves/images/P07.png",
  "./portfolio/preuves/images/P08.png",
  "./portfolio/preuves/images/P09.png",
  "./portfolio/preuves/images/P10.png",
  "./portfolio/preuves/index.html",
  "./portfolio/preuves/P01-source.html",
  "./portfolio/preuves/P01.html",
  "./portfolio/preuves/P02-source.html",
  "./portfolio/preuves/P02.html",
  "./portfolio/preuves/P03-source.html",
  "./portfolio/preuves/P03.html",
  "./portfolio/preuves/P04-source.html",
  "./portfolio/preuves/P04.html",
  "./portfolio/preuves/P05-source.html",
  "./portfolio/preuves/P05.html",
  "./portfolio/preuves/P06-source.html",
  "./portfolio/preuves/P06.html",
  "./portfolio/preuves/P07-source.html",
  "./portfolio/preuves/P07.html",
  "./portfolio/preuves/P08-source.html",
  "./portfolio/preuves/P08.html",
  "./portfolio/preuves/P09-source.html",
  "./portfolio/preuves/P09.html",
  "./portfolio/preuves/P10-source.html",
  "./portfolio/preuves/P10.html",
  "./portfolio/preuves/provenance.json",
  "./portfolio/preuves/README.md",
  "./portfolio/preuves/sources/P01/resultat-objectif-clair.md",
  "./portfolio/preuves/sources/P02/resultat-prompt-simple-v1.md",
  "./portfolio/preuves/sources/P02/resultat-prompt-structure-v1.md",
  "./portfolio/preuves/sources/P03/resultat-controle-reponse-ia.md",
  "./portfolio/preuves/sources/P04/resultat-01-note-cadrage-courte.md",
  "./portfolio/preuves/sources/P04/resultat-02-correction-note-cadrage.md",
  "./portfolio/preuves/sources/P04/resultat-02-fiche-projet-v1.md",
  "./portfolio/preuves/sources/P04/resultat-03-correction-fiche-projet.md",
  "./portfolio/preuves/sources/P05/resultat-03-comparaison-messages.md",
  "./portfolio/preuves/sources/P05/resultat-04-correction-expliquee-et-preuve.md",
  "./portfolio/preuves/sources/P05/resultat-06-preuve-portfolio.md",
  "./portfolio/preuves/sources/P06/preuve-18-mini-site-v1.md",
  "./portfolio/preuves/sources/P07/data.json",
  "./portfolio/preuves/sources/P07/preuve-19-json-pwa.md",
  "./portfolio/preuves/sources/P08/audit-browser-results.json",
  "./portfolio/preuves/sources/P08/publication-verification-2026-09-06.json",
  "./portfolio/preuves/sources/P08/VALIDATION-PWA.md",
  "./portfolio/preuves/sources/P09/06-preuve-seance-24.md",
  "./portfolio/preuves/style.css",
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
