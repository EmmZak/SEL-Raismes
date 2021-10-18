const router = require("express").Router()
const Service = require("../models/Service")
const print = console.log

router.get("/", async (req, res) => {
	const items = await Service.findAll()
	res.send(items)
})

module.exports = router