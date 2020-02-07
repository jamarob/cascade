import Cascade from './Cascade'

const p = document.querySelector('p')
const btn = document.querySelector('button')
btn.addEventListener(
	'click',
	() => {
		const cascade = new Cascade(p)
		cascade.run()
		btn.disabled = true
	},
	{ once: true }
)
