async function loadDashboards(ulElem) {
	const result = await fetch('/public/mock_api/dashboards.json', {
		method: 'GET',
		mode: 'cors'
	})

	if(!result.ok) {
		console.warn('fetch not ok')
		return
	}

	const body = await result.json()

	const { dashboards } = body

	const existingLis = ulElem.querySelectorAll('li')
	existingLis.forEach(child => child.remove())

	dashboards.forEach(item => {
		const liElem = document.createElement('li')
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

async function loadSearches(ulElem) {
	const result = await fetch('/public/mock_api/searches.json', {
		method: 'GET',
		mode: 'cors'
	})

	if(!result.ok) {
		console.warn('fetch not ok')
		return
	}

	const body = await result.json()

	const { searches } = body

	const existingLis = ulElem.querySelectorAll('li')
	existingLis.forEach(child => child.remove())

	searches.forEach(item => {
		const liElem = document.createElement('li')
		const titleElem = document.createElement('span')
		const modDateElem = document.createElement('span')
		const searchCountElem = document.createElement('span')

		titleElem.appendChild(document.createTextNode(item.name))
		modDateElem.appendChild(document.createTextNode(item.lastModified))
		searchCountElem.appendChild(document.createTextNode(item.dashboardCount))

		liElem.appendChild(titleElem)
		liElem.appendChild(modDateElem)
		liElem.appendChild(searchCountElem)

		ulElem.appendChild(liElem)
	})
}

async function loadTopContent(ulElem) {
	const result = await fetch('/public/mock_api/top-content.json', {
		method: 'GET',
		mode: 'cors'
	})

	if(!result.ok) {
		console.warn('fetch not ok')
		return
	}

	const body = await result.json()

	const { content } = body

	const existingLis = ulElem.querySelectorAll('first-time-top-content-item')
	existingLis.forEach(child => child.remove())

	content.forEach(item => {
		const liElem = document.createElement('first-time-top-content-item')

		// liElem.setAttribute('author', item.author)
		// liElem.setAttribute('company', item.company)

		liElem.appendChild(document.createTextNode(item.author))



		ulElem.appendChild(liElem)
	})
}


export function createFirstTimeOnActive(
	firstTimePageElem,
	dashboardUlElem,
	searchUlElem,
	topContentUlElem) {

	return async (mutations, _observer) => {
		const [ latestMutation ] = mutations.slice(-1)
		if(latestMutation?.type !== 'attributes') { return }
		const { attributeName, attributeNamespace } = latestMutation

		if(attributeName !== 'active') { return }

		const active = firstTimePageElem.getAttributeNS(attributeNamespace, attributeName)

		if(active !== 'true') {
			return
		}

		await Promise.all([
			loadDashboards(dashboardUlElem),
			loadSearches(searchUlElem),
			loadTopContent(topContentUlElem)
		])
	}
}
