export default async function hydrate() {
	//
	function handleAccountButton(_event) {
		console.log('account button pressed')
		window.location = 'https://localhost:8080/service/identity/login?client_id=rarity_client_id'
	}

	//
	const loginButtonElem = document.querySelector('#accountButton')
	loginButtonElem.addEventListener('click', handleAccountButton, { once: true })

}
