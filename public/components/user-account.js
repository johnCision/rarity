//
export class UserAccount extends HTMLElement {
	constructor() {
		super()
	}

	static get observedAttributes() { return ['name', 'avatar'] }

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(_name, _oldValue, _newValue) {
		//
	}

}
