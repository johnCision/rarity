export default async function hydrate() {
	// CSS worklet

	try {
		CSS.paintWorklet.addModule('/public/worklets/test-painter.js')
	} catch (e) {
		console.warn('addModule error', e)
	}
}
