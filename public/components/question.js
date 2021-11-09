//
export class Question extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('question-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))

		this.internals_ = this.attachInternals()

		this.addEventListener('invalid', event => {
			console.log('invalid?', event)
		})
	}

	static formAssociated = true
	static get observedAttributes() { return [ 'type', 'disabled' ] }

	formAssociatedCallback(form) {
		console.log('forAssociatedCallback', form)
	}

	formDisabledCallback(disabled) {
		console.log('formDisabledCallback', disabled)
	}

	formResetCallback() {
		console.log('formResetCallback')
		// this.internals_.setFormValue('')
	}

	formStateRestoreCallback(state, mode) {
		console.log('formStateRestoreCallback', state, mode)
	}

	get form() {
		console.log('get form')
		return this.internals_.form
	}

	get value() {
		console.log('get value')
		return 42
	}

	set value(v) {
		console.log('set value', v)
	}


	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, _oldValue, newValue) {
		// console.log({ name, newValue })

		if(name !== 'type') { return }

		this.childNodes.forEach(c => c.remove())

		if(newValue === 'text') {
			const templateTemplate = document.getElementById('question-text-template-template')
			const instance = templateTemplate.content.cloneNode(true)
			this.appendChild(instance)
			//console.log({ templateTemplate })
		}	else if(newValue === 'pill') {
			//
			const templateTemplate = document.getElementById('question-pill-template-template')
			const instance = templateTemplate.content.cloneNode(true)
			this.appendChild(instance)

		}

	}

	get validity() { console.log('validity'); return this.internals_.validity }
	get validationMessage() { console.log('validationMessage'); return this.internals_.validationMessage }
	get willValidate() { console.log('willValidate'); return this.internals_.willValidate }

	checkValidity() { console.log('checkValidity'); return this.internals_.checkValidity() }
	reportValidity() { console.log('reportValidity'); return this.internals_.reportValidity() }
}
