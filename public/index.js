import { onContentLoaded } from './hydration_scripts/on_content_loaded.js'

//
function onContentLoadedSync() {
	// because handles are sync, create proxy into async method
	// otherwise, exception will be lost
	onContentLoaded()
		.then()
		.catch(e => console.warn('async onContentLoaded error', { e }))
}

// bind callback into document - root of application loading
if(document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onContentLoadedSync)
} else {
	onContentLoaded()
}
