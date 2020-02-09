export default function shuffleArray(arr) {
	let temp
	let rand1, rand2
	for (let i = 0; i < arr.length; i++) {
		rand1 = Math.floor(Math.random() * arr.length)
		rand2 = Math.floor(Math.random() * arr.length)
		temp = arr[rand1]
		arr[rand1] = arr[rand2]
		arr[rand2] = temp
	}
}
