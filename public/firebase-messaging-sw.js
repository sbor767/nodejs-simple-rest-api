importScripts('https://www.gstatic.com/firebasejs/4.12.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.12.0/firebase-messaging.js')

/*
self.addEventListener('install', function() {
  console.log('Install!')
})

self.addEventListener('activate', function() {
  console.log('Activate!')
})

self.addEventListener('fetch', function(event) {
  // console.log('Fetch!', event.request)
})
*/

// @TODO Exclude Id from git!
firebase.initializeApp({
  'messagingSenderId': '645376026703'
})

console.log(firebase.messaging())
