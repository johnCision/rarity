/* eslint-disable fp/no-mutation */
/* eslint-disable immutable/no-mutation */

export default async function hydrate() {
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
}
