const ATTRIBUTE_HREF = 'href'
const ATTRIBUTE_STATE = 'state'

//
export class App extends HTMLElement {

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

		if(links === undefined) { throw new Error('undefined links response') }

		// if (actions.login) { }
		// if (actions.logout) { }
		// if (actions.start) { }
		// if (actions.back) { }
		// if (actions.validate) { }
		const questionnaireLink = links.find(link => link.rel === 'questionnaire')
		const settingsLink = links.find(link => link.rel === 'settings')
		const welcomeLink = links.find(link => link.rel === 'welcome')
		const dashboardLink = links.find(link => link.rel === 'dashboard')
		const communitySearchLink = links.find(link => link.rel === 'communitySearch')

		const state = questionnaireLink ? 'questionnaire' :
			settingsLink ? 'settings' :
				welcomeLink ? 'welcome_user' :
					dashboardLink ? 'dashboard' :
						communitySearchLink ? 'communityHome' :
							'unknown'

		if(state === 'questionnaire') {
			const questionnaireIrl = questionnaireLink.irl

			const questionnaireElem = appElem.querySelector('#questionnaire')
			questionnaireElem.setAttributeNS('', 'href', questionnaireIrl)
		}

		//
		appElem.setAttributeNS('', 'state', state)
	}

	static async updateState(_appElem) {
		// odd
		// console.warn('who updated my state? likely me')
	}
}
