const router = require("express").Router()
const {Town} = require("../models/Models")
const print = console.log

router.get("/", async (req, res) => {
	const towns = await Town.findAll()
	res.send(towns)
})

router.get("/:id", async (req, res) => {
	let id = req.params.id
	const t = await Town.findByPk(id)
	res.send(t)
})

module.exports = router