const router = require("express").Router()
const User = require("../models/User")
const print = console.log

router.get("/", async (req, res) => {
	const users = await User.findAll()
	res.send(users)
})

router.get("/:id", async (req, res) => {
	let id = req.params.id
	const o = await User.findByPk(id)
	res.send(o)
})

module.exports = router