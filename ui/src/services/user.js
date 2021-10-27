import axios from "axios"

const API = "http://localhost:5000/users/"

// User
async function getUsers() {
	return axios.get(API)
	// return axios.get(API, {
	// 	params: pagination
	// })
}

async function getUser(id) {
	return axios.get(`${API}/${id}`)
}

async function getUserByFirebaseId(id) {
	return axios.get(`${API}/firebase/${id}`)
}

async function saveUser(user) {
	if (user.id) {
		return axios.put(API, user)
	} else {
		return axios.post(API, user)
	}
}

async function deleteUser(id) {
	return axios.delete(`${API}/firebase/${id}`)
}

export {
	getUser,
	getUserByFirebaseId,
	getUsers,
	saveUser,
	deleteUser
}