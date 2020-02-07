export default class Cascade {
	constructor(el) {
		this.el = el
		this.text = el.textContent.replace(/\s/gi, ' ')
		this.tokens = [...this.text]
		this.replaceable = this.tokens.reduce((acc, cur, index) => {
			return cur == ' ' ? acc : [...acc, index]
		}, [])
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

	run() {
		let counter = 0
		const inner = () => {
			if (this.hasMore()) {
				counter++
				counter % 60 || this.replaceNext()
				this.falling.forEach((f, i) => {
					const rect = f.getBoundingClientRect()
					const top = rect.top
					f.style.top = top + 1 + 'px'
				})
				window.requestAnimationFrame(inner)
			} else {
				console.log('cascade has finished')
			}
		}
		console.log('starting cascade')
		inner()
	}

	hasMore() {
		return this.replaceable.length !== 0
	}

	replaceNext() {
		const index = this.replaceable.pop()
		const letter = this.tokens[index]
		const replacement = document.createElement('span')
		replacement.innerHTML = '&nbsp;'
		//replacement.style.backgroundColor = 'blue'
		//		const replacement = '<span>&nbsp;</span>'
		this.tokens[index] = replacement
		//this.el.innerHTML = this.getHTML()
		this.el.innerHTML = ''
		this.el.append(...this.tokens)
		const { left, top } = replacement.getBoundingClientRect()
		const falling = document.createElement('div')
		falling.className = 'falling'
		falling.textContent = letter
		falling.style.top = top + 'px'
		falling.style.left = left + 'px'
		document.body.appendChild(falling)
		this.falling.push(falling)
	}

	getHTML() {
		return this.tokens.join('')
	}
}
