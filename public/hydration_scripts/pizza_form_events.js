export default async function hydrate() {

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
	const prevButtonElem = document.querySelector('#prev')
	prevButtonElem.addEventListener('click', handlePrevButton, { once: true })

	const nextButtonElem = document.querySelector('#next')
	nextButtonElem.addEventListener('click', handleNextButton, { once: true })

	const resetButtonElem = document.querySelector('#reset')
	resetButtonElem.addEventListener('click', handleResetButton, { once: true })
}
