import shuffleArray from './util/shuffleArray'
import { FixedLetter, FallingLetter } from './Letters'

export default class Cascade {
	constructor(element) {
		this.element = element
		const chars = element.textContent.replace(/\s/gi, ' ').split('')
		this.letters = chars.map(char => new FixedLetter(char))
		this.replaceable = this.letters.filter(letter => letter.isNotWhitespace())
		shuffleArray(this.replaceable)
		this.falling = []
	}

	run() {
		let counter = 0
		const inner = () => {
			counter++ % 60 || this.replaceNext()
			this.falling.forEach(letter => letter.cascadeDown())
			const bottom = window.innerHeight
			this.falling = this.falling.filter(
				letter => !letter.hasReachedBottomAt(bottom)
			)
			window.requestAnimationFrame(inner)
		}
		inner()
	}

	hasMore() {
		return this.replaceable.length !== 0
	}

	replaceNext() {
		if (!this.hasMore()) {
			return
		}
		const letter = this.replaceable.pop()
		this.hideOriginalLetter(letter)
		this.createFallingLetter(letter)
	}

	hideOriginalLetter(letter) {
		letter.makeInvisible()
		this.render()
	}

	createFallingLetter(letter) {
		const cascadingLetter = new FallingLetter(letter, () => {
			const index = this.falling.length
			this.removeFallingLetter(index)
		})
		this.falling.push(cascadingLetter)
	}

	removeFallingLetter(index) {
		this.falling.splice(index, 1)
		this.render()
	}

	render() {
		this.element.innerHTML = ''
		this.letters.forEach(letter => this.renderLetter(letter))
	}

	renderLetter(letter) {
		this.element.appendChild(letter.element)
	}
}
