export function createAccountToFace(userFaceElem) {
	return (mutations, observer) => {
		const [ latestMutation ] = mutations.slice(-1) // yuck slick magic number
		if(latestMutation?.type !== 'attributes') { return }
		const { target, attributeName, attributeNamesapce } = latestMutation

		if(attributeName !== 'avatar') { return }

		const avatar = target.getAttributeNS(attributeNamesapce, attributeName)
		userFaceElem.setAttributeNS(HTML5_NS, 'avatar', avatar)
	}
}

