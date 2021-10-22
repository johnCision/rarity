//
export class Questionnaire extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('questionnaire-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ 'href', 'question', 'complete' ] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, _oldValue, _newValue) {
		if(name === 'href') { Questionnaire.handleHref(this); return }
		if(name === 'question') { return }
		if(name === 'complete') { return }
		throw new Error('unknown attribute change')
	}

	static async handleHref(elem) {
		// questionnaire href update
		// fetch question set
		// create question

		// console.log('handler href from questionnaire')

		const templateElem = elem.querySelector('*[slot=template]')
		const { content } = templateElem

		const urlString = elem.getAttributeNS('', 'href')
		const _url = new URL(urlString)

		// const response = await fetch(url, { })

		// if(!response.ok) {
		// 	console.warn('questionnaire failed to load url')
		// 	return
		// }

		// const json = await response.json()
		const questions = [
			{
				urn: 'urn:question/🍕',
				type: 'pill',
				question: 'what toppings would you like on your pizza?',

				pillLookupIrn: 'irn:spike/ux/workflow/questions/pillMatch?question=urn:question/🍕',
				validateIrn: 'irn:spike/ux/workflow/question/validate?question=urn:question/🍕'
			},
			{
				type: 'choice',
				question: 'what size of a pie shall we cook for you?',
				choices: [
					{ name: 'single slice' },
					{ name: 'normal pie' },
					{ name: 'party size' }
				]
			},
			{
				question: 'ABC'
			}
		]

		// magic method to remove all children
		const formElem = elem.shadowRoot.querySelector('#questionForm')
		formElem.childNodes.forEach(c => c.remove())

		questions.map(question => {
			const instanceFragment = content.cloneNode(true)
			//const instance = instanceFragment.firstElementChild

			const innerElem = document.createElementNS('', 'span')
			const shadowRoot = innerElem.attachShadow({ mode: 'open' })
			shadowRoot.appendChild(instanceFragment)

			// innerElem.slot = 'questionText'
			// innerElem.innerText = question.question
			// instance.appendChild(innerElem)

			return innerElem
		}).forEach(question => {
			formElem.appendChild(question)
		})
	}
}
