import axios from "axios"

const API = "localhost:5000/"
const print = console.log
// Event
function getEvent() {
	let e = null

	axios.get(API + "events")
		.then((e) => {
			print("event ", e)
		})
		.catch((err) => {
			print("err", err)
		})
}

export {
	getEvent
}