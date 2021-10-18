const router = require("express").Router()
const User = require("../models/User")
const print = console.log

router.get("/", async (req, res) => {
	const users = await User.findAll()
	res.send(users)
})

module.exports = router