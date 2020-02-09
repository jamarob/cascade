import shuffleArray from './util/shuffleArray'
import { FixedLetter, CascadingLetter } from './Letters'

export default class Cascade {
	constructor(element) {
		this.element = element
		const chars = element.textContent.replace(/\s/gi, ' ').split('')
		this.letters = chars.map(char => new FixedLetter(char))
		this.replaceable = this.letters.filter(letter => letter.isNotWhitespace())
		shuffleArray(this.replaceable)
		this.cascading = []
	}

	run() {
		let counter = 0
		const inner = () => {
			counter++ % 60 || (this.hasMore() && this.replaceNext())
			this.cascading.forEach(letter => letter.cascadeDown())
			const bottom = window.innerHeight
			this.cascading = this.cascading.filter(
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
		const letter = this.replaceable.pop()
		this.hideOriginalLetter(letter)
		this.createFallingLetter(letter)
	}

	hideOriginalLetter(letter) {
		letter.makeInvisible()
		this.render()
	}

	createFallingLetter(letter) {
		const cascadingLetter = new CascadingLetter(letter)
		this.cascading.push(cascadingLetter)
	}

	render() {
		this.element.innerHTML = ''
		this.letters.forEach(letter => this.renderLetter(letter))
	}

	renderLetter(letter) {
		this.element.appendChild(letter.element)
	}
}
