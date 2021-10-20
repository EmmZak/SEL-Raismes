import axios from "axios"

const API = "http://localhost:5000/categories/"
const print = console.log

// Event
async function getCategories() {
	return axios.get(API)
}

export {
	getCategories
}