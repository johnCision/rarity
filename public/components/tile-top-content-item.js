export class TileTopContentItem extends HTMLElement {
	constructor() {
		super()

		const template = document.getElementById('list-item-content-template')
		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	static get observedAttributes() { return [] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(_name, _oldValue, _newValue) {
		//
	}
}
