import FallingLetter from './FallingLetter'

export default class Cascade {
	constructor(el) {
		this.el = el
		this.tokens = el.textContent.replace(/\s/gi, ' ').split('')
		this.replaceable = this.tokens.reduce(this.nonWhitespaceIndex, [])
		const length = this.replaceable.length
		for (let i = 0; i < length; i++) {
			const r1 = Math.floor(Math.random() * length)
			const r2 = Math.floor(Math.random() * length)
			const temp = this.replaceable[r1]
			this.replaceable[r1] = this.replaceable[r2]
			this.replaceable[r2] = temp
		}
		this.falling = []
	}

	nonWhitespaceIndex(list, char, index) {
		if (char !== ' ') {
			list.push(index)
		}
		return list
	}

	run() {
		let counter = 0
		const inner = () => {
			counter++ % 60 || (this.hasMore() && this.replaceNext())
			this.falling.forEach(f => f.move(1))
			window.requestAnimationFrame(inner)
		}
		inner()
	}

	hasMore() {
		return this.replaceable.length !== 0
	}

	replaceNext() {
		const index = this.replaceable.pop()
		const letter = this.tokens[index]
		const replacement = this.makeReplacementElement()
		this.tokens[index] = replacement
		this.render()
		const { left, top, height } = replacement.getBoundingClientRect()
		const fallingLetter = new FallingLetter(letter, top, left, height)
		this.falling.push(fallingLetter)
	}

	makeReplacementElement() {
		const replacement = document.createElement('span')
		replacement.innerHTML = '&nbsp;'
		return replacement
	}

	render() {
		this.el.innerHTML = ''
		this.el.append(...this.tokens)
	}
}
