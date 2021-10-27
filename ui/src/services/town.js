import axios from "axios"

const API = "http://localhost:5000/towns"

// Town
async function getTowns() {
	return axios.get(API)
}

export {
    getTowns
}