const HTML5_NS = 'http://www.w3.org/1999/xhtml'

export function createStateToPager(userFaceElem) {
	return (mutations, observer) => {
		// we could loop over each via
		// 		mutations.forEach(mutation => {})
		// however, we are only interested in the lateset mutation
		// downside is the use of slice(-1) to get the last item (not intuitive)
		const [ latestMutation ] = mutations.slice(-1)
		if(latestMutation.type !== 'attributes') { return }
		const { target, attributeName, attributeNamesapce } = latestMutation

		// could omit if we already using attributeFilter
		if(attributeName !== 'state') { return }

		const state = target.getAttribute('state')
		const statePagerElem = document.getElementById('statePager') // ref to document ! ?
		statePagerElem.setAttributeNS(HTML5_NS, 'page', state)
	}
}
