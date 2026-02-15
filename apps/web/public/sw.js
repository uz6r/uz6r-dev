if (!self.define) {
    let e,
        s = {};
    const n = (n, t) => (
        (n = new URL(n + ".js", t).href),
        s[n] ||
            new Promise((s) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    ((e.src = n), (e.onload = s), document.head.appendChild(e));
                } else ((e = n), importScripts(n), s());
            }).then(() => {
                let e = s[n];
                if (!e) throw new Error(`Module ${n} didn’t register its module`);
                return e;
            })
    );
    self.define = (t, c) => {
        const a = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (s[a]) return;
        let i = {};
        const d = (e) => n(e, a),
            r = { module: { uri: a }, exports: i, require: d };
        s[a] = Promise.all(t.map((e) => r[e] || d(e))).then((e) => (c(...e), i));
    };
}
define(["./workbox-5194662c"], function (e) {
    "use strict";
    (importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                {
                    url: "/_next/static/NQFDERuEuZTYjRVW6I27o/_buildManifest.js",
                    revision: "f42a10df35b32cd449eaab5ff1a92f07",
                },
                {
                    url: "/_next/static/NQFDERuEuZTYjRVW6I27o/_ssgManifest.js",
                    revision: "b6652df95db52feb4daf4eca35380933",
                },
                {
                    url: "/_next/static/chunks/23-a74bbdd5de03c7a7.js",
                    revision: "a74bbdd5de03c7a7",
                },
                {
                    url: "/_next/static/chunks/498-4ddfee62544b7197.js",
                    revision: "4ddfee62544b7197",
                },
                {
                    url: "/_next/static/chunks/522-4071d6630d0f101a.js",
                    revision: "4071d6630d0f101a",
                },
                {
                    url: "/_next/static/chunks/574-ae67b927ac5360fb.js",
                    revision: "ae67b927ac5360fb",
                },
                {
                    url: "/_next/static/chunks/784-7067361c6af894fb.js",
                    revision: "7067361c6af894fb",
                },
                {
                    url: "/_next/static/chunks/855-43bccdc32bc610f3.js",
                    revision: "43bccdc32bc610f3",
                },
                {
                    url: "/_next/static/chunks/910-f1a503bc8dd2d6fe.js",
                    revision: "f1a503bc8dd2d6fe",
                },
                {
                    url: "/_next/static/chunks/933-f0b38c538acc8013.js",
                    revision: "f0b38c538acc8013",
                },
                {
                    url: "/_next/static/chunks/app/_global-error/page-27bfd8952d51fb7e.js",
                    revision: "27bfd8952d51fb7e",
                },
                {
                    url: "/_next/static/chunks/app/_not-found/page-efde8c98790fc32d.js",
                    revision: "efde8c98790fc32d",
                },
                {
                    url: "/_next/static/chunks/app/about/page-ecc06c3d0d53ce7a.js",
                    revision: "ecc06c3d0d53ce7a",
                },
                {
                    url: "/_next/static/chunks/app/blog/page-ecc06c3d0d53ce7a.js",
                    revision: "ecc06c3d0d53ce7a",
                },
                {
                    url: "/_next/static/chunks/app/contact/page-d959d190ac588106.js",
                    revision: "d959d190ac588106",
                },
                {
                    url: "/_next/static/chunks/app/layout-63b4dcf3354a60dc.js",
                    revision: "63b4dcf3354a60dc",
                },
                {
                    url: "/_next/static/chunks/app/page-4f696a993862607d.js",
                    revision: "4f696a993862607d",
                },
                {
                    url: "/_next/static/chunks/app/projects/page-439fd84cdbd2e775.js",
                    revision: "439fd84cdbd2e775",
                },
                {
                    url: "/_next/static/chunks/c0289db2-ff7fae5e2b54cdef.js",
                    revision: "ff7fae5e2b54cdef",
                },
                {
                    url: "/_next/static/chunks/framework-5175d09af90cced5.js",
                    revision: "5175d09af90cced5",
                },
                {
                    url: "/_next/static/chunks/main-212b8e14752c7634.js",
                    revision: "212b8e14752c7634",
                },
                {
                    url: "/_next/static/chunks/main-app-57504bf6ce3a932e.js",
                    revision: "57504bf6ce3a932e",
                },
                {
                    url: "/_next/static/chunks/next/dist/client/components/builtin/app-error-27bfd8952d51fb7e.js",
                    revision: "27bfd8952d51fb7e",
                },
                {
                    url: "/_next/static/chunks/next/dist/client/components/builtin/forbidden-27bfd8952d51fb7e.js",
                    revision: "27bfd8952d51fb7e",
                },
                {
                    url: "/_next/static/chunks/next/dist/client/components/builtin/global-error-4e9f11096957f8bd.js",
                    revision: "4e9f11096957f8bd",
                },
                {
                    url: "/_next/static/chunks/next/dist/client/components/builtin/not-found-27bfd8952d51fb7e.js",
                    revision: "27bfd8952d51fb7e",
                },
                {
                    url: "/_next/static/chunks/next/dist/client/components/builtin/unauthorized-27bfd8952d51fb7e.js",
                    revision: "27bfd8952d51fb7e",
                },
                {
                    url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
                    revision: "846118c33b2c0e922d7b3a7676f81f6f",
                },
                {
                    url: "/_next/static/chunks/webpack-dc4ae4ed5bd3fdea.js",
                    revision: "dc4ae4ed5bd3fdea",
                },
                { url: "/_next/static/css/9ad8b954a49032c3.css", revision: "9ad8b954a49032c3" },
                { url: "/icon.svg", revision: "3108d76bd3524cc46c3f4b80196a790b" },
                { url: "/manifest.json", revision: "7cc8d69497dc6b392a40d2229f373417" },
                { url: "/theme-init.js", revision: "9f704a68a6b71035811176961f776abc" },
            ],
            { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({ response: e }) =>
                            e && "opaqueredirect" === e.type
                                ? new Response(e.body, {
                                      status: 200,
                                      statusText: "OK",
                                      headers: e.headers,
                                  })
                                : e,
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/static.+\.js$/i,
            new e.CacheFirst({
                cacheName: "next-static-js-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp4|webm)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ sameOrigin: e, url: { pathname: s } }) =>
                !(!e || s.startsWith("/api/auth/callback") || !s.startsWith("/api/")),
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ request: e, url: { pathname: s }, sameOrigin: n }) =>
                "1" === e.headers.get("RSC") &&
                "1" === e.headers.get("Next-Router-Prefetch") &&
                n &&
                !s.startsWith("/api/"),
            new e.NetworkFirst({
                cacheName: "pages-rsc-prefetch",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ request: e, url: { pathname: s }, sameOrigin: n }) =>
                "1" === e.headers.get("RSC") && n && !s.startsWith("/api/"),
            new e.NetworkFirst({
                cacheName: "pages-rsc",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith("/api/"),
            new e.NetworkFirst({
                cacheName: "pages",
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ sameOrigin: e }) => !e,
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
            }),
            "GET"
        ));
});
