const router = require("express").Router()
const { Service, User } = require("../models/Models")

const print = console.log

router.get("/count", async (req, res) => {
	try {
		const n = await Service.count()
		res.status(200).send(n)
	} catch (err) {
		res.send(err)
	}
})

router.get("/all", async (req, res) => {
	try {
		const items = await Service.findAll(
			{
				include: [User]
			}
		)
		res.send(items)
	} catch (err) {
		res.send(err)
	}
})

// pagination, offset, limit, order ASC or DESC, categories
router.get("/", async (req, res) => {
	print("INTO get services")
	try {
		const { offset, limit, order, categories } = req.query

		const items = await Service.findAll(
			{
				offset: offset,
				limit: limit,
				where: {
					category: categories
				},
				order: [
					['updatedAt', order]
				],
				include: [User]
			}
		)
		res.status(200).send(items)
	} catch (err) {
		console.log("service.get.err", err)
		res.status(400).send(err)
	}
})

// find services by user
router.get("/user/:id", async (req, res) => {
	try {
		const userId = req.params.id
		const items = await Service.findAll(
			{
				where: {
					userId: userId
				}
			},
			{ include: [User] }
		)
		res.send(items)
	} catch (err) {
		res.send(err)
	}
})

// find services by category
router.get("/category/:category", async (req, res) => {
	try {
		const category = req.params.category

		const items = await Service.findAll(
			{
				where: {
					category: category
				}
			},
			{ include: [User] }
		)
		res.send(items)
	} catch (err) {
		res.send(err)
	}
})

router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id
		const o = await Service.findByPk(id, { include: [User] })
		res.send(o)
	} catch (err) {
		res.send(err)
	}
})

router.post("/", async (req, res) => {
	try {
		const { description, userId, category } = req.body

		let user = await User.findByPk(userId)

		let service = await Service.create({
			description: description,
			category: category,
		})
		service.setUser(user)

		service = await service.save()
		res.send(service)
	} catch (err) {
		res.send(err)
	}
})

router.put("/", async (req, res) => {
	try {
		const { id, description, userId, category } = req.body
		let service = await Service.update(
			{
				description: description,
				userId: userId,
				category: category,
			},
			{
				returning: true,
				where: {
					id: id
				}
			})
		res.send(service)
	} catch (err) {
		res.send(err)
	}
})

// localhost:5000/services/id
router.delete("/:id", async (req, res) => {
	try {
		let id = req.params.id

		let service = await Service.destroy({
			where: {
				id: id
			}
		})
		res.status(200).send({ done: service == 1 ? true : false })
	} catch (err) {
		res.send(err)
	}
})

module.exports = router