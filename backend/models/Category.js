const { Sequelize, Model, DataTypes, DATE } = require('sequelize');

const print = console.log
const sequelize = new Sequelize('troc-db', 'emzak', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

const Category = sequelize.define("category", {
	name: DataTypes.STRING,
})

//print("before async function exec")
const init = async () => {
	await sequelize.sync({ force: true });
}
//init()

const create = async () => {
	const map = [
		"Animaux",
		"Bricolage, travaux, tâches ménagères",
		"Cuisine",
		"Décoration, DIY, Couture",
		"Informatique",
		"Jardinage",
		"Loisirs, jeux, sport",
		"Mobilité",
		"Savoirs, connaissances",
		"Social (garde d'enfant...)",
		"Prết/Don Biens culturels (livres, CD, DVD, magazine...)",
		"Prết/Don Électroménager/Informatique",
		"Prết/Don Jeux, Loisirs",
		"Prết/Don Meubles",
		"Prết/Don Outillage",
		"Prết/Don Petite décoration",
		"Prết/Don Textile",
		"Prết/Don Plantes/Potager",
		"Prết/Don Autres biens",
	]
	for (let i = 0; i < map.length; i++) {
		let item = map[i]
		let t = await Category.create({
			name: item
		})
		await t.save()
	}
}

//create()

module.exports = Category