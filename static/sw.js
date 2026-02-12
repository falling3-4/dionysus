importScripts("/scram/scramjet.all.js");

let scramjet;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

async function initScramjet() {
    if (!scramjet) {
        const { ScramjetServiceWorker } = $scramjetLoadWorker();
        scramjet = new ScramjetServiceWorker();
        await scramjet.loadConfig(); 
    }
    return scramjet;
}

self.addEventListener("fetch", (event) => {
    event.respondWith((async () => {
        const sj = await initScramjet();

        if (sj.route(event)) {
            return sj.fetch(event);
        }

        return fetch(event.request);
    })());
});