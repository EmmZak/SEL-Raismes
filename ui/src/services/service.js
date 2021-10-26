import axios from "axios"

const API = "http://localhost:5000/services/"
//const print = console.log

// Service
async function getCount() {
	return axios.get(API + "count")
}

async function getServices(pagination) {
	return axios.get(API, {
		params: pagination
	})
}

async function saveService(service) {
	if (service.id) {
		return axios.put(API, service)
	} else {
		return axios.post(API, service)
	}
} 

async function deleteService(id) {
	return axios.delete(`${API}/${id}`)
}

export {
	getCount,
	getServices,
	saveService,
	deleteService
}