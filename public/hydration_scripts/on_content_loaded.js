/* eslint-disable import/max-dependencies */
// import hydrateChatRecv from './chat_recv.js'
// import hydrateChatSend from './chat_send.js'
// import hydrateCSSPaint from './css_paint_workers.js'
import hydrateCustomElem from './custom_elements.js'
// import hydrateImportMap from './import_map_check.js'
import hydrateJWT from './jwt_token.js'
// import hydrateLogin from './login_event.js'
// import hydrateNotify from './notifications.js'
import hydrateObservers from './observers.js'
import hydrateOnline from './online_mode_attr.js'
// import hydratePizza from './pizza_form_events.js'
// import hydrateServiceWorker from './service_worker.js'

// eslint-disable-next-line require-await
export async function onContentLoaded() {
	return await Promise.all([
		// hydrateChatRecv,
		// hydrateChatSend,
		// hydrateCSSPaint,
		hydrateCustomElem(),
		// hydrateImportMap,
		hydrateJWT(),
		// hydrateLogin,
		// hydrateNotify,
		hydrateObservers(),
		hydrateOnline(),
		// hydratePizza,
		// hydrateServiceWorker
	])
}
