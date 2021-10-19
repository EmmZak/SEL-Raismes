const router = require("express").Router()
const { Town, User, Category } = require("../models/Models")
const { associations } = require("../models/Town")
const print = console.log

router.get("/", async (req, res) => {
	const users = await User.findAll({ include: [Town, Category] })
	res.send(users)
})

router.get("/:id", async (req, res) => {
	let id = req.params.id
	try {
		const o = await User.findByPk(id)
		res.send(o)
	} catch (err) {
		res.send(err)
	}
})

router.post("/", async (req, res) => {
	let userTown = await Town.findByPk(req.body.townId)

	try {
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
	let id = req.params.id

	try {
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