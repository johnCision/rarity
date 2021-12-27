export default async function hydrate() {
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
