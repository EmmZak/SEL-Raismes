const router = require("express").Router()
const { Event } = require("../models/Models")
const print = console.log

router.get("/", async (req, res) => {
	try {
		const e = await Event.findOne()
		res.send(e)
	} catch (err) {
		res.send(err)
	}
})

router.put("/", async (req, res) => {
	try {
		const text = req.body.text
		const rdv = req.body.rdv

		let e = await Event.findOne()

		e = await Event.update(
			{
				text: text,
				rdv: rdv
			},
			{
				returning: true,
				where: {
					id: e.id
				}
			}
		)
		res.send(e)
	} catch (err) {
		res.send(err)
	}
})

module.exports = router