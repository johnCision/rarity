//
export class Questionnaire extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('questionnaire-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ 'href', 'question', '' ] }

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

		const urlString = elem.getAttributeNS('', 'href')
		const url = new URL(urlString)

		const response = await fetch(url, { })

		if(!response.ok) {
			console.warn('questionnaire failed to load url')
			return
		}

		const questions = await response.json()

		// magic method to remove all children
		const questionElems = elem.querySelectorAll('rarity-question')
		questionElems.forEach(qE => qE.remove())

		const currentQuestion = elem.getAttributeNS('', 'question')

		questions.map(question => {

			const current = currentQuestion === question.irn

			const qElem = document.createElement('rarity-question') // no NS?
			qElem.setAttributeNS('', 'current', current)
			qElem.setAttributeNS('', 'type', question.type)
			qElem.setAttributeNS('', 'irn', question.irn)
			qElem.setAttributeNS('', 'slot', 'question')

			const textElem = document.createElement('c-text')
			textElem.setAttributeNS('', 'key', question.questionKey)

			const textNode = document.createTextNode(question.question)

			textElem.appendChild(textNode)
			qElem.appendChild(textElem)

			return qElem
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
		// console.log({ currentElems, currentQuestion, targetCurrentElem })

		if(targetCurrentElem === null) { console.warn('missing target question'); return }
		targetCurrentElem.setAttributeNS('', 'current', true)
	}
}
