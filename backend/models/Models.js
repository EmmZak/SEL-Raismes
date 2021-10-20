const { Sequelize, Model, DataTypes, DATE } = require('sequelize');

const sequelize = new Sequelize('troc-db', 'emzak', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

const Event = sequelize.define("event", {
	type: DataTypes.STRING,
	text: DataTypes.STRING,
	date: DataTypes.DATEONLY,
	start: DataTypes.STRING,
	end: DataTypes.STRING
})

const Town = sequelize.define("town", {
	name: DataTypes.STRING,
	code: DataTypes.STRING
})

// const Category = sequelize.define("category", {
// 	name: DataTypes.STRING,
// 	loan: DataTypes.BOOLEAN
// })

const User = sequelize.define("user", {
	firebaseID: DataTypes.STRING,
	mail: DataTypes.STRING,
	number: DataTypes.STRING,
	name: DataTypes.STRING,
	surname: DataTypes.STRING,
	admin: DataTypes.BOOLEAN,
	credit: DataTypes.INTEGER,
})

const Service = sequelize.define("service", {
	description: DataTypes.STRING,
	category: DataTypes.STRING,
})

Town.hasMany(User)
User.belongsTo(Town)

User.hasMany(Service, { onDelete: "CASCADE" })
Service.belongsTo(User)

//Category.hasMany(Service)
//Service.belongsTo(Category)

const init = async () => {
	await sequelize.sync({ force: true });

	Event.bulkCreate([
		{ type: "Permanences", text: "venez nois voir tel jour", date: new Date(), start: "14h30", end: "15h" },
		{ type: "Inscription", text: "venez vous inscrre les amis", date: new Date(), start: "3h", end: "9h" },
		{ type: "Fête", text: "venez deguster les amis", date: new Date(), start: "4h", end: "14h" }
	])

	Town.bulkCreate([
		{ name: "Raismes", code: "59590" },
		{ name: "VA", code: "59300" },
		{ name: "Anzin", code: "410" }
	])

	categories = [
		{ name: "Autre", loan: false },
		{ name: "Animaux", loan: false },
		{ name: "Bricolage, travaux, tâches ménagères", loan: false },
		{ name: "Cuisine", loan: false },
		{ name: "Décoration, DIY, Couture", loan: false },
		{ name: "Informatique", loan: false },
		{ name: "Jardinage", loan: false },
		{ name: "Loisirs, jeux, sport", loan: false },
		{ name: "Mobilité", loan: false },
		{ name: "Savoirs, connaissances", loan: false },
		{ name: "Social (garde d'enfant...)", loan: false },
		{ name: "Prêt/Don Biens culturels (livres, CD)", loan: true },
		{ name: "Prêt/Don Électroménager/Informatique", loan: true },
		{ name: "Prêt/Don Jeux, Loisirs", loan: true },
		{ name: "Prêt/Don Meubles", loan: true },
		{ name: "Prêt/Don Outillage", loan: true },
		{ name: "Prêt/Don Petite décoration", loan: true },
		{ name: "Prêt/Don Textile", loan: true },
		{ name: "Prêt/Don Plantes/Potager", loan: true },
		{ name: "Prêt/Don Autres biens", loan: true }
	]
	User.bulkCreate([
		{ firebaseID: "f-1", mail: "e@e", number: "0766554490", name: "manu", surname: "ee", admin: true, credit: 33, townId: "1" },
		{ firebaseID: "f-2", mail: "a@a", number: "0766554490", name: "zak", surname: "aa", admin: true, credit: 55, townId: "2" },
		{ firebaseID: "f-3", mail: "b@b", number: "0766554490", name: "deph", surname: "dd", admin: false, credit: 66, townId: "3" },
		{ firebaseID: "f-4", mail: "c@c", number: "0766554490", name: "ler", surname: "ff", admin: false, credit: 444, townId: "2" },
		{ firebaseID: "f-5", mail: "i@i", number: "0766554490", name: "miko", surname: "vv", admin: false, credit: 3334, townId: "1" },
	])

	Service.bulkCreate([
		{ description: "first description", userId: "1", category: categories[0].name },
		{ description: "animaux test", userId: "2", category: categories[1].name },
		{ description: "jardinage description", userId: "2", category: categories[2].name },
		{ description: "sfd description", userId: "3", category: categories[3].name },
		{ description: "fffff description", userId: "2", category: categories[4].name },
		{ description: "a description", userId: "5", category: categories[5].name },
		{ description: "fdsfdsf description", userId: "2", category: categories[6].name },
		{ description: "4 description", userId: "5", category: categories[1].name },
		{ description: "d description", userId: "2", category: categories[2].name },
		{ description: "first description", userId: "1", category: categories[3].name },
		{ description: "first description", userId: "1", category: categories[0].name },
		{ description: "animaux test", userId: "2", category: categories[1].name },
		{ description: "jardinage description", userId: "2", category: categories[2].name },
		{ description: "sfd description", userId: "3", category: categories[3].name },
		{ description: "fffff description", userId: "2", category: categories[4].name },
		{ description: "a description", userId: "5", category: categories[5].name },
		{ description: "fdsfdsf description", userId: "2", category: categories[6].name },
		{ description: "4 description", userId: "5", category: categories[1].name },
		{ description: "d description", userId: "2", category: categories[2].name },
		{ description: "first description", userId: "1", category: categories[3].name }
	])
}
//init()

module.exports = {
	Event: Event,
	Town: Town,
	User: User,
	Service: Service
}