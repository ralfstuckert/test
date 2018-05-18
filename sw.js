importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if (workbox) {

    workbox.core.setCacheNameDetails({
        prefix: 'cp-events',
        suffix: 'v1',
        precache: 'custom-precache-name',
        runtime: 'custom-runtime-name'
    });

    workbox.precaching.precacheAndRoute([
//        {url:'/static/js/bundle.js',revision:'1'},
        {url: 'materialize-css/materialize.min.js', revision: '1'},
        {url: 'materialize-css/materialize.min.css', revision: '1'},
        {url: 'images/agenda.jpg', revision: '1'},
        {url: 'images/contact.jpg', revision: '1'},
        {url: 'images/logo.svg', revision: '1'},
        {url: 'images/news.jpg', revision: '1'},
        {url: 'images/welcome.jpg', revision: '2'}
    ]);

    workbox.routing.registerRoute(
        new RegExp('.*/static/*/(.*)'),
        workbox.strategies.staleWhileRevalidate(),
    );


    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'googleapis',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        'agenda.json',
        workbox.strategies.networkFirst()
    )

    workbox.routing.registerRoute(
        new RegExp("./*"),
        workbox.strategies.staleWhileRevalidate()
    );

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}