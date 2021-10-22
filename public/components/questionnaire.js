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
		if(name === 'question') { Questionnaire.handleQuestion(this); return }
		if(name === 'complete') { return }
		throw new Error('unknown attribute change')
	}

	static async handleHref(elem) {
		// questionnaire href update
		// fetch question set
		// create question

		// console.log('handler href from questionnaire')

		// const templateElem = elem.querySelector('*[slot=template]')
		// const { content } = templateElem

		// const urlString = elem.getAttributeNS('', 'href')
		// const _url = new URL(urlString)

		// const response = await fetch(url, { })

		// if(!response.ok) {
		// 	console.warn('questionnaire failed to load url')
		// 	return
		// }

		// const json = await response.json()
		const questions = [
			{
				irn: 'urn:question/🍕',
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
				irn: 'urn:question/comments',
				type: 'text',
				question: 'comment for the driver?',
				maxLength: 100
			}
		]

		// magic method to remove all children
		// const formElem = elem.shadowRoot.querySelector('#questionForm')
		// formElem.childNodes.forEach(c => c.remove())

		const currentQuestion = elem.getAttributeNS('', 'question')

		questions.map(question => {

			const current = currentQuestion === question.urn

			const qElem = document.createElement('rarity-question') // no NS?
			qElem.adoptedStyleSheets = document.adoptedStyleSheets
			qElem.setAttributeNS('', 'current', current)
			qElem.setAttributeNS('', 'irn', question.irn)
			qElem.setAttributeNS('', 'type', question.type)
			qElem.setAttributeNS('', 'slot', 'question')

			// if(question.type === 'text')

			qElem.innerText = question.question

			return qElem

			// const instanceFragment = content.cloneNode(true)

			// const questionElem = document.createElementNS('', 'div')

			// const shadowRoot = questionElem.attachShadow({ mode: 'open' })
			// shadowRoot.appendChild(instanceFragment)

			// const textElem = document.createTextNode(question.question)
			// questionElem.appendChild(textElem)
			// innerElem.slot = 'questionText'
			// innerElem.innerText = question.question
			// instance.appendChild(innerElem)
			// return questionElem
		}).forEach(question => {
			elem.appendChild(question)
		})
	}

	static async handleQuestion(elem) {
		const currentElems = elem.querySelectorAll('*[current=true]')
		currentElems.forEach(curElem => curElem.setAttributeNS('', 'current', false))
		currentElems.forEach(curElem => curElem.removeAttributeNS('', 'current'))

		const currentQuestion = elem.getAttributeNS('', 'question')

		const targetCurrentElem = elem.querySelector('[irn="' + currentQuestion + '"]')
		console.log({ currentElems, currentQuestion, targetCurrentElem })

		if(targetCurrentElem === null) { console.warn('missing target question'); return }
		targetCurrentElem.setAttributeNS('', 'current', true)
	}
}
