const version = "tic-1";

const cacheFiles = [
    './',
    './manifest.json',

    './css/app.css',
    './css/icons.woff2',
    './css/material.css',

    './js/app.js',
    './js/init.js',
    './js/jquery.js',
    './js/material.js',

    './images/icons/icon-72x72.png',
    './images/icons/icon-96x96.png',
    './images/icons/icon-128x128.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-384x384.png',
    './images/icons/icon-512x512.png',

    './GameType/AI/app.js',
    './GameType/AI/',

    './GameType/Online/app.js',
    './GameType/Online/',
    './GameType/Online/socket.js',

    './GameType/PvP/app.js',
    './GameType/PvP/'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(version)
        .then(cache => {
            return cache.addAll(cacheFiles);
        })
        .catch(e => {
            console.log(e);
        })
    );
});
self.addEventListener('fetch', e => {
    e.respondWith(
        caches
        .match(e.request)
        .then(r => {
            return r || fetch(e.request)
        })
    );
});
self.addEventListener('push', function (event) {
    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = '/images/icon-192x192.png';
    var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});
