/* eslint-disable fp/no-mutation */
/* eslint-disable immutable/no-mutation */
import jwtDecode from '../node_modules/jwt-decode/build/jwt-decode.esm.js'


import {
	ApplicationFrame, ApplicationBar,
	Pager, Page,
	Face, Button, ButtonSet, Icon, TextInput,
	Text, TextService,
	Progress
} from './components/applejacks.js'

import { Text as RText } from './components/text.js'

import { App, Questionnaire, Question, UserAccount } from './components/components.js'

import { createAccountToFace } from './mutations/account-to-face.js'
import { createStateToPager } from './mutations/state-to-pager.js'

// import { greet } from "./pkg/hello_wasm.js";

// await greet()

//
function handleAccountButton(_event) {
	console.log('account button pressed')
	window.location = 'https://localhost:8080/service/identity/login?client_id=rarity_client_id'
}

//
function handlePrevButton(_event) {
	console.log('request prev')
}

//
function handleNextButton(event) {
	console.log('request next')
}

//
function handleResetButton(event) {
	const resetButtonElem = document.querySelector('#reset')
	resetButtonElem.setAttributeNS('', 'disabled', '')

	console.log('request reset')

}

async function displayWelcomeNotificationWithPerm(e) {
	// console.log({ e })

	if(Notification.permission === 'granted') {
		const notification = new Notification('Welcome back to Rarity')
	}	else if(Notification.permission === 'denied') {
		// awe
	} else {
		const permission = await Notification.requestPermission()

		if(permission === "granted") {
			const notification = new Notification('Welcome to Rarity')
		}
	}
}

//
async function onContentLoaded() {
	if(HTMLScriptElement.supports && HTMLScriptElement.supports('importmap')) {
		console.log('Your browser supports import maps.')
	}

	//
	const rarityBindings = [
		{ name: 'rarity-application', constructor: App },
		{ name: 'rarity-user-account', constructor: UserAccount },
		{ name: 'rarity-questionnaire', constructor: Questionnaire },
		{ name: 'rarity-question', constructor: Question },
		{ name: 'rarity-text', constructor: RText }
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
		{ name: 'c-text-input', constructor: TextInput },
		{ name: 'c-text', constructor: Text },
		{ name: 'c-text-service', constructor: TextService },
		{ name: 'c-progress', constructor: Progress }
	]

	const bindings = [ ...toolkitBindings, ...rarityBindings ]
	bindings.forEach(({ name, constructor, options }) => {
		customElements.define(name, constructor, { ...options })
	})

	//
	// chrome://serviceworker-internals/?devtools
	// const serviceWorkerRegistration = await navigator.serviceWorker.register(
	// 	'./service-worker.js',
	// 	{ type: 'module', scope: './' })

	// navigator.serviceWorker.addEventListener('message', message => {

	// })

	//
	const loginButtonElem = document.querySelector('#accountButton')
	loginButtonElem.addEventListener('click', handleAccountButton, { once: true })


	const prevButtonElem = document.querySelector('#prev')
	prevButtonElem.addEventListener('click', handlePrevButton, { once: true })

	const nextButtonElem = document.querySelector('#next')
	nextButtonElem.addEventListener('click', handleNextButton, { once: true })

	const resetButtonElem = document.querySelector('#reset')
	resetButtonElem.addEventListener('click', handleResetButton, { once: true })


	// chat
	const sendMsgElem = document.querySelector('#sendMessage')
	const inputElem = document.querySelector('#chatInput')
	const chatElem = document.querySelector('#chatForm')
	sendMsgElem.addEventListener('click', event => {
		event.preventDefault()

		//
		const text = inputElem.value

		fetch('https://localhost:8080/chat', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				message: text
			})
		})
			.then(result => {
				console.log({ result })

				if(!result.ok) {
					console.warn('post to chat failed')
					return
				}

				// clear msg
				chatElem.reset()

			})
			.catch(e => {
				// network error
				console.warn('post chat msg error', { e })
			})
	})


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
			// create an observer to map to c-user-account element avatar attribute
			//   into the c-face
			callback: accountToFace,
			element: userAccountElem,
			options: {
				attributes: true,
				attributeOldValue: false
			}
		}
	]

	const _observers = observerBindings.map(binding => {
		const observer = new MutationObserver(binding.callback)
		observer.observe(binding.element, binding.options)
		return observer
	})

	// for now we look at the search params for the jwt
	const sp = new URLSearchParams(document.location.search)
	if(sp.has('jwt')) {
		const token = sp.get('jwt')
		const decoded = jwtDecode(token)
		console.log({ decoded })
		//userAccountElem.setAttributeNS('', 'avatar', jwt.avatar)

		// fetch (/userInfo) -> Avatar etc (w/JWT)
	}


	// simple chat
	const chatDisplayElem = document.querySelector('#chatDisplay')
	const updateSource = new EventSource('https://localhost:8080/chat')
	updateSource.onerror = e => {
		console.log('es error', { e })
	}

	updateSource.onmessage = msg => {
		console.log('es message', msg)
		const text = JSON.parse(msg.data).message

		const liElem = document.createElement('li')
		const textElem = document.createTextNode(text)

		liElem.appendChild(textElem)
		chatDisplayElem.appendChild(liElem)
	}
	updateSource.onopen = () => {
		console.log('es open')
	}


	//
	window.ononline = _event => {
		console.log('Online')
		document.querySelector('html').removeAttribute('offline')
	}
	window.onoffline = _event => {
		console.log('Offline')
		document.querySelector('html').setAttribute('offline', '')
	}

}

//
function onContentLoadedSync() {
	// because handles are sync, create proxy into async method
	// otherwise, exception will be lost
	onContentLoaded()
		.then()
		.catch(e => console.warn('async onContentLoaded error', { e }))
}

// bind callback into document - root of application loading
if(document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onContentLoadedSync)
} else {
	onContentLoaded()
}
