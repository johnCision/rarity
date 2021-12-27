import {
	ApplicationFrame, ApplicationBar,
	Pager, Page,
	Face, Button, ButtonSet, Icon, TextInput,
	Text, TextService,
	Progress
} from '../components/applejacks.js'

import { Text as RText } from '../components/text.js'

import {
	App, UserAccount,
	Questionnaire, Question,
	TileSurface, TileSimpleTitle,
	TileMultiLineTitle, TileTopContentItem
} from '../components/components.js'

export default async function hydrate() {
	//
	const rarityBindings = [
		{ name: 'rarity-application', constructor: App },
		{ name: 'rarity-user-account', constructor: UserAccount },
		{ name: 'rarity-questionnaire', constructor: Questionnaire },
		{ name: 'rarity-question', constructor: Question },
		{ name: 'rarity-text', constructor: RText },

		{ name: 'first-time-tile-surface', constructor: TileSurface },
		{ name: 'first-time-tile-simple-title', constructor: TileSimpleTitle },
		{ name: 'first-time-tile-multi-line-title', constructor: TileMultiLineTitle },
		{ name: 'first-time-top-content-item', constructor: TileTopContentItem }
	]

	const toolkitBindings = [
		{ name: 'c-application-frame', constructor: ApplicationFrame, templateId: 'application-frame-template' },
		{ name: 'c-application-bar', constructor: ApplicationBar, templateId: 'application-bar-template' },
		{ name: 'c-face', constructor: Face, templateId: 'face-template' },
		{ name: 'c-pager', constructor: Pager },
		{ name: 'c-page', constructor: Page },
		{ name: 'c-button', constructor: Button, templateId: 'button-template' },
		{ name: 'c-button-set', constructor: ButtonSet, templateId: 'button-set-template' },
		{ name: 'c-icon', constructor: Icon, templateId: 'icon-template' },
		{ name: 'c-text-input', constructor: TextInput },
		{ name: 'c-text', constructor: Text },
		{ name: 'c-text-service', constructor: TextService },
		{ name: 'c-progress', constructor: Progress }
	]

	const bindings = [ ...toolkitBindings, ...rarityBindings ]
	bindings.forEach(({ name, constructor, options, templateId }) => {
		constructor.template = document.getElementById(templateId)
		customElements.define(name, constructor, { ...options })
	})
}
