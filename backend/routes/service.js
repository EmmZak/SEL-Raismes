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
		const offset = req.query.offset
		const limit = req.query.limit
		const order = req.query.order
		const categories = req.query.categories
		print(req.query)
		//const loan = req.query.loan

		const items = await Service.findAll(
			{
				offset: req.query.offset,
				limit: req.query.limit,
				where: {
					category: categories
				},
				order: [
					['updatedAt', req.query.order]
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
	const userId = req.params.id
	try {
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
		let user = await User.findByPk(req.body.userId)

		let service = await Service.create({
			description: req.body.description,
			category: req.body.category,
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
		let service = await Service.update(
			{
				description: req.body.description,
				userId: req.body.userId,
				category: req.body.category,
			},
			{
				returning: true,
				where: {
					id: req.body.id
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