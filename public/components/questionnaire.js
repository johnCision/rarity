import { Question } from './question.js'

//
export class Questionnaire extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('questionnaire-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))


		// shadowRoot.querySelector('#questionForm').addEventListener('invalid', event => {
		// 	console.log('invalid?', event)
		// })
	}

	static get observedAttributes() { return [ 'href', 'question', 'submit', 'next' ] }

	attributeChangedCallback(name, _oldValue, _newValue) {
		if(name === 'href') { Questionnaire.handleHref(this); return }
		if(name === 'question') { Questionnaire.handleQuestion(this); return }
		if(name === 'submit') { Questionnaire.handleSubmit(this); return }
		if(name === 'complete') { return }
		throw new Error('unknown attribute change')
	}

	static async handleHref(elem) {
		const urlString = elem.getAttributeNS('', 'href')
		const url = new URL(urlString)

		const response = await fetch(url, { })

		if(!response.ok) {
			console.warn('questionnaire failed to load url')
			return
		}

		const questions = await response.json()

		// magic method to remove all children
		// though this uses the tag name installed
		// this could be switch to childNode forEach is instance of Question
		const questionElems = elem.querySelectorAll('rarity-question')
		questionElems.forEach(qE => qE.remove())

		//const currentQuestion = elem.getAttributeNS('', 'question')
		const [ currentQuestion ] = questions.map(q => q.irn)

		questions.map(question => {

			const current = currentQuestion === question.irn

			//const qElem = document.createElement('rarity-question') // no NS?
			const qElem = new Question()
			qElem.setAttributeNS('', 'current', current)
			qElem.setAttributeNS('', 'type', question.type)
			qElem.setAttributeNS('', 'irn', question.irn)
			qElem.setAttributeNS('', 'name', question.irn)
			//qElem.setAttributeNS('', '', question.validationIrl)
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
		// currentElems.forEach(curElem => curElem.setAttributeNS('', 'current', false))
		currentElems.forEach(curElem => curElem.removeAttributeNS('', 'current'))

		const currentQuestion = elem.getAttributeNS('', 'question')
		if(currentQuestion === '') {
			console.log('no question set')
			return
		}

		const targetCurrentElem = elem.querySelector('[irn="' + currentQuestion + '"]')
		// console.log({ currentElems, currentQuestion, targetCurrentElem })

		if(targetCurrentElem === null) { console.warn('missing target question', currentQuestion); return }
		targetCurrentElem.setAttributeNS('', 'current', true)
	}

	static async handleSubmit(elem) {

		const value = elem.getAttributeNS('', 'submit')
		if(value === null) { return }

		console.log('submit request triggered')


		// our reply back to the request
		elem.removeAttributeNS('', 'submit')
	}

	// --------------------

	submit() {
		console.log('questionnaire submit')

		// const formElem = this.shadowRoot.querySelector('#questionForm')

		// console.log(formElem.elements)

		// const cv = formElem.checkValidity()

		// const rv = formElem.reportValidity()


		//console.log({ cv, rv })
	}


}
