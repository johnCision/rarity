import * as fs from 'fs/promises'

import Handlebars from 'handlebars'

const UTF_8 = 'utf8'

async function build_index(indexTemplate, options) {
	Handlebars.registerHelper('include', (file, context, opt) => {
		return file
	})

	const template = Handlebars.compile(indexTemplate)
	const result = template(options)
	return result
}

const index_template = './public/index.handlebars'

const applejacks_templates = (await Promise.all([
	'./node_modules/@johncision/applejacks/templates/application-bar.html',
	'./node_modules/@johncision/applejacks/templates/application-frame.html',
	'./node_modules/@johncision/applejacks/templates/button-set.html',
	'./node_modules/@johncision/applejacks/templates/button.html',
	'./node_modules/@johncision/applejacks/templates/face.html',
	'./node_modules/@johncision/applejacks/templates/icon.html',
	'./node_modules/@johncision/applejacks/templates/progress.html',
	'./node_modules/@johncision/applejacks/templates/text-input.html'
].map(filename => fs.readFile(filename, { encoding: UTF_8 }))))
.join('\n')


const indexTemplate = await fs.readFile(index_template, { encoding: UTF_8 })

const result = await build_index(indexTemplate, { applejacks_templates })

console.log(result)
