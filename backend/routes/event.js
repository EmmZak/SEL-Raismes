const router = require("express").Router()
const { Event } = require("../models/Models")
const cors = require("cors")
const print = console.log

router.get("/", async (req, res) => {
	try {
		const e = await Event.findAll()
		res.status(200).send(e)
	} catch (err) {
		res.status(400).send(err)
	}
})

router.put("/", async (req, res) => {
	try {
		const { id, type, text, date, startHour, startMinute, endHour, endMinute } = req.body

		let e = await Event.update(
			{
				type: type,
				text: text,
				date: date,
				startHour: startHour,
				startMinute: startMinute,
				endHour: endHour,
				endMinute: endMinute
			},
			{
				returning: true,
				where: {
					id: id
				}
			}
		)
		res.status(200).send(e)
	} catch (err) {
		res.status(400).send(err)
	}
})

router.post("/", async (req, res) => {
	console.log("post request events req.body", req.body)
	try {
		const { type, text, date, startHour, startMinute, endHour, endMinute } = req.body

		e = await Event.create(
			{
				type: type,
				text: text,
				date: date,
				startHour: startHour,
				startMinute: startMinute,
				endHour: endHour,
				endMinute: endMinute
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