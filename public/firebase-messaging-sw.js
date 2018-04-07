importScripts('https://www.gstatic.com/firebasejs/4.12.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.12.0/firebase-messaging.js')

// @TODO Exclude Id from git!
firebase.initializeApp({
  messagingSenderId: '645376026703'
})

const VERSION = 'v1'
const CACHE_NAME = {
  css: `css-${VERSION}`,
  js: `js-${VERSION}`
}

self.addEventListener('install', event => {
  event.waitUntil(
    // Promise goes here (All promises are resolved).
    caches.open(CACHE_NAME)
      .then(cache => {
        // Create cache.
        fetch('asset-manifest.json')
          .then(response => {
            if (response.ok) {
              response.json().then(manifest => {
                const urls = object.keys(manifest).map(key => manifest[key])
                // Add urls for the our index and icon.
                urls.push('/')
                urls.push('/assets/icon.png')
                // Add to cache.
                cache.addAll(urls)
              })
            }
          })
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key)
      }))
    })
  )
})

console.log(firebase.messaging())
