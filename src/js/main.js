import Cascade from './Cascade'

const p = document.querySelector('p')
const btn = document.querySelector('button')

btn.addEventListener('click', startDemo, { once: true })

function startDemo() {
	const cascade = new Cascade(p)
	cascade.run()
	btn.disabled = true
}
