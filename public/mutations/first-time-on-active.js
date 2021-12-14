async function loadDashboards(ulElem) {
	const result = await fetch('/public/mock_api/dashboards.json', {
		method: 'GET',
		mode: 'cors'
	})

	const body = await result.json()

	const { dashboards } = body

	const existingLis = ulElem.querySelectorAll('li')
	existingLis.forEach(child => child.remove())

	dashboards.forEach(item => {
		const liElem = document.createElement('LI')
		const titleElem = document.createElement('span')
		const modDateElem = document.createElement('span')
		const searchCountElem = document.createElement('span')

		titleElem.appendChild(document.createTextNode(item.name))
		modDateElem.appendChild(document.createTextNode(item.lastModified))
		searchCountElem.appendChild(document.createTextNode(item.searchCount))

		liElem.appendChild(titleElem)
		liElem.appendChild(modDateElem)
		liElem.appendChild(searchCountElem)

		ulElem.appendChild(liElem)
	})
}

async function loadSearches() {
	console.log('searches ...')

}


export function createFirstTimeOnActive(firstTimePageElem, ulElem) {
	return async (mutations, _observer) => {
		const [ latestMutation ] = mutations.slice(-1) // yuck slick magic number
		if(latestMutation?.type !== 'attributes') { return }
		const { attributeName, _attributeNamespace } = latestMutation

		if(attributeName !== 'active') { return }

		const active = firstTimePageElem.getAttribute('active')

		if(active !== 'true') {
			return
		}

		await Promise.all([
			loadDashboards(ulElem),
			loadSearches()
		])
	}
}
