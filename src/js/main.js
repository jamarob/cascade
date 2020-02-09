import Cascade from './Cascade'

const p = document.querySelector('[data-js=cascade-target]')
const btn = document.querySelector('[data-js=start-button]')

btn.addEventListener('click', startDemo, { once: true })

function startDemo() {
	const cascade = new Cascade(p)
	cascade.run()
	btn.disabled = true
}
