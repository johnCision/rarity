import roughjs from '../../node_modules/roughjs/bundled/rough.esm.js'

// eslint-disable-next-line import/unambiguous
class Painter {
	static get inputProperties() {
		return [
			'--rough-stroke',
			'--rough-fill'
		]
	}

	static get inputArguments() { return [ '<color>', '<color>' ] }

  //   static get contextOptions() { return {alpha: true}; }


	paint(ctx, geom, properties) {
		try {
			const stroke = properties.get('--rough-stroke').toString()
			const fill = properties.get('--rough-fill').toString()


			const r = roughjs.canvas({ getContext: () => ctx }, {})

			// ctx.fillStyle = 'grey'
			// ctx.fillRect(0, 0, 100, 100)

			r.rectangle(10, 10, geom.width - 20, geom.height - 20, {
				roughness: 2.8,
				strokeWidth: 3,
				stroke, fill
			})

			// r.line(5, 5, 5, geom.height - 5, { roughness: 2.8, strokeWidth: 3 })
			// r.line(5, 5, geom.width - 5, 5, { roughness: 2.8, strokeWidth: 3 })
			// r.line(5, geom.height - 5, geom.width - 5, geom.height - 5, { roughness: 2.8, strokeWidth: 3 })
			// r.line(geom.width - 5, 5, geom.width - 5, geom.height - 5, { roughness: 2.8, strokeWidth: 3 })


		} catch (e) {
			console.warn('paint error', e)
		}
	}
}

try {
	registerPaint('rough-rect', Painter)
} catch (e) {
	console.warn('paint worklet not loaded', e)
}
