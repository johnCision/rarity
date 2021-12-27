import { createAccountToFace } from '../mutations/account-to-face.js'
import { createStateToPager } from '../mutations/state-to-pager.js'
import { createFirstTimeOnActive } from '../mutations/first-time-on-active.js'


export default async function hydrate() {
	// another way
	//
	const applicationElem = document.querySelector('rarity-application')
	const userFaceElem = document.querySelector('#userFace')
	const userAccountElem = document.querySelector('rarity-user-account')
	const ftPageElem = document.querySelector('c-page#firstTime')
	const ftMyDashboardElem = document.querySelector('#myDashboards')
	const ftSearchElem = document.querySelector('#mySearches')
	const ftTopContentElem = document.querySelector('#topContent')

	const stateToPager = createStateToPager()
	const accountToFace = createAccountToFace(userFaceElem)
	const firstTimeActive = createFirstTimeOnActive(
		ftPageElem,
		ftMyDashboardElem,
		ftSearchElem,
		ftTopContentElem)

	const observerBindings = [
		{
			// create and observer to map c-application state into the main c-pager
			callback: stateToPager,
			element: applicationElem,
			options: {
				attributes: true,
				attributeFilter: ['state']
			}
		},
		{
			// create an observer to map to c-user-account element avatar attribute
			//   into the c-face
			callback: accountToFace,
			element: userAccountElem,
			options: {
				attributes: true,
				attributeOldValue: false
			}
		},
		{
			callback: firstTimeActive,
			element: ftPageElem,
			options: {
				attributes: true,
				attributeFilter: ['active']
			}
		}
	]

	const _observers = observerBindings.map(binding => {
		const observer = new MutationObserver(binding.callback)
		observer.observe(binding.element, binding.options)
		return observer
	})
}
