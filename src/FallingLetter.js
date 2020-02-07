export default class FallingLetter {
	constructor(letter, top, left, height) {
		this.letter = letter
		this.top = top
		this.height = height
		this.el = this.makeElement(letter, top, left)
		document.body.appendChild(this.el)
	}
	makeElement(letter, top, left) {
		const el = document.createElement('span')
		el.textContent = letter
		el.style.position = 'absolute'
		el.style.top = top + 'px'
		el.style.left = left + 'px'
		this.el = el
		return el
	}
	move(top) {
		if (this.top < window.innerHeight - this.height) {
			this.top += top
			this.el.style.top = this.top + 'px'
		}
	}
}
