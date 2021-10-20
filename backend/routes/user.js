const router = require("express").Router()
const { Town, User } = require("../models/Models")
const { associations } = require("../models/Town")
const print = console.log

router.get("/count", async (req, res) => {
	const n = await User.count()
	res.status(200).send({count: n})
})

// pagination, offset, limit, order ASC or DESC
router.get("/", async (req, res) => {

	try {
		// const offset = req.query.offset
		// const limit = req.query.limit
		// const order = req.query.order

		const users = await User.findAll(
			{
				// offset: offset,
				// limit: limit,
				// order: [
				// 	['createdAt', order]
				// ],
				include: [Town]
			}
		)
		res.send(users)
	} catch(err) {
		res.send(err)
	}

})

router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id
		const o = await User.findByPk(id, { include: [Town] })
		res.send(o)
	} catch (err) {
		res.send(err)
	}
})

router.post("/", async (req, res) => {
	try {
		let userTown = await Town.findByPk(req.body.townId)

		let user = await User.create({
			firebaseID: req.body.firebaseID,
			mail: req.body.mail,
			name: req.body.name,
			surname: req.body.surname,
			admin: req.body.admin,
			credit: req.body.credit
		})
		user.setTown(userTown)
		user = await user.save()

		res.send(user)
	} catch (err) {
		print("err", err)
		res.send(err)
	}
})

router.put("/", async (req, res) => {
	try {
		let user = await User.update(
			{
				firebaseID: req.body.firebaseID,
				mail: req.body.mail,
				name: req.body.name,
				surname: req.body.surname,
				admin: req.body.admin,
				credit: req.body.credit,
				townId: req.body.townId
			},
			{
				returning: true,
				where: {
					id: req.body.id
				}
			})
		res.send(user)
	} catch (err) {
		res.send(err)
	}
})

// localhost:5000/users/id
router.delete("/:id", async (req, res) => {
	try {
		let id = req.params.id

		let deleteUser = await User.destroy({
			where: {
				id: id
			}
		})

		res.status(200).send({ done: deleteUser == 1 ? true : false })
	} catch (err) {
		res.send(err)
	}

})

module.exports = router