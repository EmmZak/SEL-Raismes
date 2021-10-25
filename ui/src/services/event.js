import axios from "axios"

const API = "http://localhost:5000/events"
//const print = console.log

// Event
async function getEvents() {
	return axios.get(API)
}

async function createEvent(event) {
	return axios.post(API, event)
}

async function updateEvent(event) {
	return axios.put(API, event)
}

async function deleteEvent(id) {
	return axios.delete(`${API}/${id}`)
}

export {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent
}