import axios from "axios"

const API = "http://localhost:5000/events"
const print = console.log

// Event
async function getEvents() {
	return axios.get(API)
}

export {
	getEvents
}