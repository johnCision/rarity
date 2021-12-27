/* eslint-disable require-await */
export default async function hydrate() {
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
}
