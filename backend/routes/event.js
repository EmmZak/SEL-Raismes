const router = require("express").Router()
const { Event } = require("../models/Models")
const cors = require("cors")
const print = console.log

router.get("/", async (req, res) => {
	print("events get request")
	try {
		const e = await Event.findAll()
		res.status(200).send(e)
	} catch (err) {
		res.status(400).send(err)
	}
})

router.put("/", async (req, res) => {
	try {
		const id = req.body.id
		const type = req.body.type
		const text = req.body.text
		const rdv = req.body.rdv

		let e = await Event.update(
			{
				type: type,
				text: text,
				rdv: rdv
			},
			{
				returning: true,
				where: {
					id: id
				}
			}
		)
		res.send(e)
	} catch (err) {
		res.send(err)
	}
})

router.post("/", async (req, res) => {
	try {
		const type = req.body.type
		const text = req.body.text
		const rdv = req.body.rdv

		e = await Event.create(
			{
				type: type,
				text: text,
				rdv: rdv
			}
		)
		res.status(200).send(e)
	} catch (err) {
		res.status(400).send(err)
	}
})

router.delete("/:id", async (req, res) => {
	try {
		let id = req.params.id

		let deleteEvent = await Event.destroy({
			where: {
				id: id
			}
		})
		res.status(200).send({ done: deleteEvent == 1 ? true : false })
	} catch (err) {
		res.status(400).send(err)
	}
})

module.exports = router