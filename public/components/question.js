//
export class Question extends HTMLElement {
	constructor() {
		super()

		const templateTemplate = document.getElementById('question-template-template')
		const template = document.getElementById('question-template')

		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))

		const instance = templateTemplate.content.cloneNode(true)
		this.appendChild(instance)
	}

	static get observedAttributes() { return [ ] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(_name, _oldValue, _newValue) {
	}
}
