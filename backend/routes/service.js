const router = require("express").Router()
const {Service, Category, User} = require("../models/Models")

const print = console.log

router.get("/", async (req, res) => {
	const items = await Service.findAll({include: [Category, User]})
	res.send(items)
})

module.exports = router