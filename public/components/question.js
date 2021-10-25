//
export class Question extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('question-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [ 'type' ] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, _oldValue, newValue) {
		// console.log({ name, newValue })

		if(name !== 'type') { return }

		this.childNodes.forEach(c => c.remove())

		if(newValue === 'text') {
			const templateTemplate = document.getElementById('question-template-template')
			const instance = templateTemplate.content.cloneNode(true)
			this.appendChild(instance)
			//console.log({ templateTemplate })
		}

	}
}
