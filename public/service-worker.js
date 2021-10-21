/* eslint-disable import/unambiguous */
// 'install' 'activate'

self.addEventListener('install', _event => {
	console.log('install')

	self.skipWaiting()
})

self.addEventListener('activate', _event => {
	console.log('activate')

	self.clients.claim()
})

self.addEventListener('fetch', event => {
	// console.log('fetch', event.request)

	// could one inject a module loader here

	event.respondWith(fetch(event.request))
})

self.addEventListener('push', _event => {
	//
})
