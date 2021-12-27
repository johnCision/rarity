export default async function hydrate() {
	if(HTMLScriptElement.supports && HTMLScriptElement.supports('importmap')) {
		console.log('Your browser supports import maps.')
	}
}
