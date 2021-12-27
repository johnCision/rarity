import jwtDecode from '../../node_modules/jwt-decode/build/jwt-decode.esm.js'

export default async function hydrate() {
	// for now we look at the search params for the jwt
	const sp = new URLSearchParams(document.location.search)
	if(sp.has('jwt')) {
		const token = sp.get('jwt')
		const decoded = jwtDecode(token)
		console.log({ decoded })
		//userAccountElem.setAttributeNS('', 'avatar', jwt.avatar)

		// fetch (/userInfo) -> Avatar etc (w/JWT)
	}
}
