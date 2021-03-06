const router = require("express").Router()
const { User } = require("../models/Models")
const print = console.log

router.get("/count", async (req, res) => {
	const n = await User.count()
	res.status(200).send({count: n})
})

// pagination, offset, limit, order ASC or DESC
router.get("/", async (req, res) => {
	try {
		const users = await User.findAll()
		res.send(users)
	} catch(err) {
		res.send(err)
	}
})

router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id
		const o = await User.findByPk(id)
		res.send(o)
	} catch (err) {
		res.send(err)
	}
})

router.get("/firebase/:id", async (req, res) => {
	try {
		let firebaseID = req.params.id
		print("firebase id", firebaseID)
		const o = await User.findOne({
			where: {
				firebaseID: firebaseID
			}
		})
		res.status(200).send(o)
	} catch (err) {
		res.status(400).send(err)
	}
})

router.post("/", async (req, res) => {
	try {
		const { firebaseID, idToken,mail, number, name, surname, town, admin, credit } = req.body
		credit = credit == "" ? 0: credit

		let user = await User.create({
			firebaseID: firebaseID,
			idToken: idToken,
			mail: mail,
			number: number,
			name: name,
			surname: surname,
			town: town,
			admin: admin,
			credit: credit
		})
		user = await user.save()

		res.send(user)
	} catch (err) {
		print("err", err)
		res.send(err)
	}
})

router.put("/", async (req, res) => {
	try {
		const { id, firebaseID, idToken,mail, number, name, surname, town, admin, credit } = req.body

		let user = await User.update(
			{
				firebaseID: firebaseID,
				idToken: idToken,
				mail: mail,
				number: number,
				name: name,
				surname: surname,
				admin: admin,
				credit: credit,
				town: town
			},
			{
				returning: true,
				where: {
					id: id
				}
			})
		res.send(user)
	} catch (err) {
		res.send(err)
	}
})

// localhost:5000/users/id
router.delete("/firebase/:id", async (req, res) => {
	try {
		let firebaseID = req.params.id

		let deleteUser = await User.destroy({
			where: {
				firebaseID: firebaseID
			}
		})
		res.status(200).send({ done: deleteUser == 1 ? true : false })
	} catch (err) {
		res.status(400).send(err)
	}
})

module.exports = router