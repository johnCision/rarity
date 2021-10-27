const ATTRIBUTE_HREF = 'href'
const ATTRIBUTE_STATE = 'state'

//
export class App extends HTMLElement {
	constructor() {
		super()
	}

	static get observedAttributes() {
		return [ ATTRIBUTE_HREF, ATTRIBUTE_STATE ]
	}

	connectedCallback() { } // appended into a document
	disconnectedCallback() { }
	adoptedCallback() { }
	attributeChangedCallback(name, _oldValue, _newValue) {
		const future =
			name === ATTRIBUTE_HREF ? App.updateHref(this) :
				name === ATTRIBUTE_STATE ? App.updateState(this) :
					Promise.reject(new Error('unknown attribute:' + name))

		future
			.then()
			.catch(e => console.warn('future error', e))
	}

	static async updateHref(appElem) {
		const url = appElem.getAttribute(ATTRIBUTE_HREF)

		const response = await fetch(url).catch(e => {
			// failed to fetch
			// network error
			appElem.setAttributeNS('', 'state', 'loadError')
			throw e
		})

		// todo response ok?
		const result = await response.json()

		// check status code and throw error
		// check result is json or throw error

		// apply result to state
		const { name, _state, links } = result

		// if (actions.login) { }
		// if (actions.logout) { }
		// if (actions.start) { }
		// if (actions.back) { }
		// if (actions.validate) { }
		const questionnaireLink = links.find(link => link.rel === 'questionnaire')
		const state = questionnaireLink ? 'questionnaire' : 'welcome_user'
		const questionnaireIrl = questionnaireLink.irn

		const questionnaireElem = appElem.querySelector('#questionnaire')
		questionnaireElem.setAttributeNS('', 'href', questionnaireIrl)

		// support for interaction with known child nodes
		// for any user account child nodes, update the current user name
		const userElem = appElem.querySelector('rarity-user-account')
		// result.actions.login
		if(name && userElem) { userElem.setAttribute('NAME', name) }


		//
		appElem.setAttributeNS('', 'state', state)
	}

	static async updateState(_appElem) {
		// odd
		// console.warn('who updated my state? likely me')
	}
}
