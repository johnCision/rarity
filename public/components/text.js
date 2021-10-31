const ATTR_KEY = 'key'
const ATTR_LANG = 'lang'

const DEFAULT_LANG = 'ar'
const SEPERATOR = '-'

const KEY_SET_SEPERATOR = '_'
const KEY_SET = {
	prev: { },
	next: {},

	tags: {
		en: 'Item Attribute',
		en_us: 'Tags',
		en_gb: 'Hangers',
		ar: 'العلامات'
	},
	groups: { en: 'Item Sets', en_us: 'Groups', en_gb: 'Masher', ar: 'مجموعات' },
	profile: { en: 'Personal User Profile', ar: 'الملف الشخصي' }
}

//
export class Text extends HTMLElement {
	constructor() {
		super()

		const shadowRoot = this.attachShadow({ mode: 'open' })
	}
	static get observedAttributes() { return [ ATTR_KEY, ATTR_LANG ] }
	attributeChangedCallback(_name, _oldValue, _newValue) {

		const key = this.getAttribute(ATTR_KEY)

		const regionalHyphenLang = this.getAttribute(ATTR_LANG) ?? DEFAULT_LANG
		const regionalLang = regionalHyphenLang.replace(SEPERATOR, KEY_SET_SEPERATOR).toLowerCase()

		const { lang } = Text.splitLang(regionalHyphenLang)

		const keyData = KEY_SET[key]
		if(keyData === undefined) {
			console.warn('missing Text key', key)
			return
		}

		const text = keyData[regionalLang] ?? keyData[lang]
		if(text === undefined) {
			console.log('no regional or lang entry for this key', regionalLang, key)
		}

		this.shadowRoot.innerHTML = text
	}

	static splitLang(regionalLang) {
		const [ lang ] = regionalLang.split(SEPERATOR)
		return { lang }
	}
}
