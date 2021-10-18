const router = require("express").Router()
const Town = require("../models/Town")
const print = console.log

router.get("/", async (req, res) => {
	const towns = await Town.findAll()
	print("Town", towns)
	res.send(towns)
	//res.send("ok")
})

module.exports = router