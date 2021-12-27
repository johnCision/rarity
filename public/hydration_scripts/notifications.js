async function displayWelcomeNotificationWithPerm(e) {
	// console.log({ e })

	if(Notification.permission === 'granted') {
		const notification = new Notification('Welcome back to Rarity')
	}	else if(Notification.permission === 'denied') {
		// awe
	} else {
		const permission = await Notification.requestPermission()

		if(permission === "granted") {
			const notification = new Notification('Welcome to Rarity')
		}
	}
}

export default async function hydrate() {
	//
}
