const router = require("express").Router()
const {Service, Category, User} = require("../models/Models")

const print = console.log

router.get("/", async (req, res) => {
	const items = await Service.findAll({include: [Category, User]})
	res.send(items)
})

router.get("/:id", async (req, res) => {
	let id = req.params.id
	try {
		const o = await Service.findByPk(id, {include: [Category, User]})
		res.send(o)
	} catch(err) {
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

	res.send("error")
})

module.exports = router