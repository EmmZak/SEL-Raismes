import axios from "axios"

const API = "http://localhost:5000/users/"
const print = console.log

// User

async function getUsers() {
	return axios.get(API)
	// return axios.get(API, {
	// 	params: pagination
	// })
}

async function createUser(user) {
	return axios.post(API, user)
}

export {
	getUsers
}