const router = require("express").Router()
const { Service, Category, User } = require("../models/Models")

const print = console.log

router.get("/count", async (req, res) => {
	try {
		const n = await Service.count()
		res.status(200).send({ count: n })
	} catch (err) {
		res.send(err)
	}
})

// pagination, offset, limit, order ASC or DESC
router.get("/", async (req, res) => {
	try {
		const offset = req.query.offset
		const limit = req.query.limit
		const order = req.query.order

		const items = await Service.findAll(
			{
				offset: req.query.offset,
				limit: req.query.limit,
				order: [
					['createdAt', req.query.order]
				],
				include: [Category, User]
			}
		)
		res.send(items)
	} catch (err) {
		res.send(err)
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
			{ include: [Category, User] }
		)
		res.send(items)
	} catch (err) {
		res.send(err)
	}
})

// find services by category
router.get("/category/:id", async (req, res) => {
	try {
		const categoryId = req.params.id

		const items = await Service.findAll(
			{
				where: {
					categoryId: categoryId
				}
			},
			{ include: [Category, User] }
		)
		res.send(items)
	} catch (err) {
		res.send(err)
	}
})

router.get("/:id", async (req, res) => {
	try {
		let id = req.params.id
		const o = await Service.findByPk(id, { include: [Category, User] })
		res.send(o)
	} catch (err) {
		res.send(err)
	}
})

router.post("/", async (req, res) => {
	try {
		let user = await User.findByPk(req.body.userId)
		let category = await Category.findByPk(req.body.categoryId)

		let service = await Service.create({
			description: req.body.description,
		})
		service.setUser(user)
		service.setCategory(category)

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
				categoryId: req.body.categoryId,
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