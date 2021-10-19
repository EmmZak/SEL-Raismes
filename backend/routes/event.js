const router = require("express").Router()
const {Event} = require("../models/Models")
const print = console.log

router.get("/", async (req, res) => {
	const events = await Event.findAll()
	res.send(events)
	//res.send("ok")
})

router.post("/", async (req, res) => {
	let e = await Event.findOne()
	e.text = req.query.text,
	e.rdv= req.query.date

	let update = await e.save()
	res.send(update)
})

module.exports = router