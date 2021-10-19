const router = require("express").Router()
const { Service, Category, User } = require("../models/Models")

const print = console.log

router.get("/", async (req, res) => {
	const items = await Service.findAll({ include: [Category, User] })
	res.send(items)
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
	const categoryId = req.params.id
	try {
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
	let id = req.params.id
	try {
		const o = await Service.findByPk(id, { include: [Category, User] })
		res.send(o)
	} catch (err) {
		res.send(err)
	}
})

router.post("/", async (req, res) => {
	let user = await User.findByPk(req.body.userId)
	let category = await Category.findByPk(req.body.categoryId)

	try {
		let service = await Service.create({
			description: req.body.description,
		})
		service.setUser(user)
		service.setCategory(category)

		service = await service.save()
		res.send(service)
	} catch (err) {
		print("err", err)
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
	let id = req.params.id
	try {
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