import axios from "axios"

const API = "http://localhost:5000/users/"

// User
async function getUsers() {
	return axios.get(API)
	// return axios.get(API, {
	// 	params: pagination
	// })
}

async function saveUser(user) {
	if (user.id) {
		return axios.put(API, user)
	} else {
		return axios.post(API, user)
	}
}

export {
	getUsers,
	saveUser
}