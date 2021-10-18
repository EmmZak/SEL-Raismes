const router = require("express").Router()
const Category = require("../models/Category")
//const print = console.log

router.get("/", async (req, res) => {
	const categs = await Category.findAll()
	res.send(categs)
})

module.exports = router