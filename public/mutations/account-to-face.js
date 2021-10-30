const HTML5_NS = 'http://www.w3.org/1999/xhtml'

export function createAccountToFace(userFaceElem) {
	return (mutations, _observer) => {
		const [ latestMutation ] = mutations.slice(-1) // yuck slick magic number
		if(latestMutation?.type !== 'attributes') { return }
		const { target, attributeName, _attributeNamespace } = latestMutation

		if(attributeName !== 'avatar') { return }

		const avatar = target.getAttributeNS(_attributeNamespace, attributeName)
		userFaceElem.setAttribute('avatar', avatar)
	}
}
