class Letter {
	constructor(char) {
		this.char = char
		this.element = document.createElement('span')
		this.element.innerHTML = char
	}

	get boundingClientRect() {
		return this.element.getBoundingClientRect()
	}
}

const WHITESPACE = ' '
const WHITESPACE_ENTITY = '&nbsp;'

export class FixedLetter extends Letter {
	constructor(char) {
		super(char)
	}

	isNotWhitespace() {
		return this.char !== WHITESPACE
	}

	makeInvisible() {
		this.element.innerHTML = WHITESPACE_ENTITY
	}
}

export class CascadingLetter extends Letter {
	constructor(letter) {
		super(letter.char)
		const { top, left, height } = letter.boundingClientRect
		this.top = top
		this.height = height
		this.element.style.position = 'absolute'
		this.element.style.top = top + 'px'
		this.element.style.left = left + 'px'
		document.body.appendChild(this.element)
	}

	cascadeDown() {
		this.top += 1
		this.element.style.top = this.top + 'px'
	}

	hasReachedBottomAt(bottom) {
		return this.top + this.height >= bottom
	}
}
