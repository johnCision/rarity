import * as fs from 'fs/promises'
import { readFileSync } from 'fs'

import Handlebars from 'handlebars'

const UTF_8 = 'utf8'

async function build_index(indexTemplate, options) {
	Handlebars.registerHelper('include', (file, id, opt) => {
		return readFileSync(file, { encoding: UTF_8 })
	})

	const template = Handlebars.compile(indexTemplate)
	const result = template(options)
	return result
}

const index_template = './public/index.handlebars'

const applejacks_templates = (await Promise.all([

].map(filename => fs.readFile(filename, { encoding: UTF_8 }))))
.join('\n')


const indexTemplate = await fs.readFile(index_template, { encoding: UTF_8 })

const result = await build_index(indexTemplate, { foo: 'bar' })

console.log(result)
