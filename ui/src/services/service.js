import axios from "axios"

const API = "http://localhost:5000/services/"
const print = console.log

// Service
async function getCount(pagination) {
	return axios.get(API+"count")
}

async function getServices(pagination) {
	return axios.get(API, {
		params: pagination
	})
}

export {
	getCount,
	getServices
}