import { App } from './components/application.js'
import { UserAccount } from './components/user-account.js'
import { Questionnaire } from './components/questionnaire.js'

import { ApplicationFrame } from '/node_modules/@johncision/applejacks/src/application-frame.js'
import { ApplicationBar } from '/node_modules/@johncision/applejacks/src/application-bar.js'
import { Face } from '/node_modules/@johncision/applejacks/src/face.js'
import { Pager } from '/node_modules/@johncision/applejacks/src/pager.js'
import { Page } from '/node_modules/@johncision/applejacks/src/page.js'
import { Button } from '/node_modules/@johncision/applejacks/src/button.js'
import { ButtonSet } from '/node_modules/@johncision/applejacks/src/button-set.js'
import { Icon } from '/node_modules/@johncision/applejacks/src/icon.js'
import { Label } from '/node_modules/@johncision/applejacks/src/label.js'

import { createAccountToFace } from './mutations/account-to-face.js'
import { createStateToPager } from './mutations/state-to-pager.js'

function handleAccountButton(event) {
	console.log('account button pressed')
	window.location = 'https://localhost:8080/service/identity/login?client_id=rarity_client_id'
}

//
function onContentLoadedSync() {
	// because handles are sync, create proxy into async method
	// otherwize, exception will be lost
	onContentLoaded()
		.then()
		.catch(e => console.warn('async onContentLoaded error', { e }))
}
async function onContentLoaded() {
	//
	const rarityBindings = [
		{ name: 'rarity-application', constructor: App },
		{ name: 'rarity-user-account', constructor: UserAccount },
		{ name: 'rarity-questionnaire', constructor: Questionnaire }
	]

	const toolkitBindings = [
		{ name: 'c-application-frame', constructor: ApplicationFrame },
		{ name: 'c-application-bar', constructor: ApplicationBar },
		{ name: 'c-face', constructor: Face },
		{ name: 'c-pager', constructor: Pager },
		{ name: 'c-page', constructor: Page },
		{ name: 'c-button', constructor: Button },
		{ name: 'c-button-set', constructor: ButtonSet },
		{ name: 'c-icon', constructor: Icon },
		{ name: 'c-label', constructor: Label }
	]

	const bindings = [ ...toolkitBindings, ...rarityBindings ]
	bindings.forEach(({ name, constructor }) => {
		customElements.define(name, constructor)
	})



	//
	// chrome://serviceworker-internals/?devtools
	// const serviceWorkerRegistration = await navigator.serviceWorker.register(
	// 	'./service-worker.js',
	// 	{ type: 'module', scope: './' })

	// navigator.serviceWorker.addEventListener('message', message => {

	// })

	//
	// const updateSource = new EventSource('/es/rarity-updates')
	// updateSource.onmessage = msg => {
	// 	console.log('update service sais', { msg })
	// }

	//
	// if(Notification.permission === 'granted') {
	// 	const notification = new Notification('Hi there!')
	// }
	// else if(Notification.permission === 'denied') {
	// 	// awe
	// }
	// else {
	// 	const permission = await Notification.requestPermission()
	// 	if(permission === "granted") {
	// 		const notification = new Notification('Thanks!')
	// 	}
	// }

	//
	// const url = new URL(window.location.href)
	// const sp = new URLSearchParams(url.search)
	// if(sp.has('code')) {
	// 	const token = await fake_auth_token_proxy(sp.get('code'))

	// 	console.warn({ token })

	// 	const apps = document.querySelectorAll('c-application')
	// 	apps.forEach((value, key) => {
	// 		value.setAttributeNS(HTML5_NS, 'github-token', token)
	// 	})
	// }

	//
	const loginButtonElem = document.querySelector('#accountButton')
	loginButtonElem.addEventListener('click', handleAccountButton, { once: true })

	// another way
	//
	const applicationElem = document.querySelector('rarity-application')
	const userFaceElem = document.querySelector('#userFace')
	const userAccountElem = document.querySelector('rarity-user-account')

	const stateToPager = createStateToPager()
	const accountToFace = createAccountToFace(userFaceElem)

	const observerBindings = [
		{
			// create and observer to map c-application state into the main c-pager
			callback: stateToPager,
			element: applicationElem,
			options: {
				attributes: true,
				attributeFilter: ['state']
			}
		},
		{
			// creaete an observer to map to c-user-account elemnts avatar attribute
			//   into the c-face
			callback: accountToFace,
			element: userAccountElem,
			options: {
				attributes: true,
				attributeOldValue: false
			}
		}
	]

	const observers = observerBindings.map(binding => {
		const observer = new MutationObserver(binding.callback)
		observer.observe(binding.element, binding.options )
		return observer
	})
}

// bind callback into document - root of application loading
if(document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onContentLoadedSync)
}
else {
	onContentLoaded()
}
