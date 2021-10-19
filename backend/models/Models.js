const { Sequelize, Model, DataTypes, DATE } = require('sequelize');

const sequelize = new Sequelize('troc-db', 'emzak', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

const Event = sequelize.define("event", {
	text: DataTypes.STRING,
	rdv: DataTypes.DATE
})

const Town = sequelize.define("town", {
	name: DataTypes.STRING,
	code: DataTypes.STRING
})

const Category = sequelize.define("category", {
	name: DataTypes.STRING,
})

const User = sequelize.define("user", {
	firebaseID: DataTypes.STRING,
	mail: DataTypes.STRING,
	name: DataTypes.STRING,
	surname: DataTypes.STRING,
	admin: DataTypes.BOOLEAN,
	credit: DataTypes.INTEGER,
})

const Service = sequelize.define("service", {
	description: DataTypes.STRING,
})

Town.hasMany(User)
User.belongsTo(Town)

const init = async () => {
	await sequelize.sync({ force: true });

	Town.bulkCreate([
		{name: "Raismes", code: "59590"},
		{name: "VA", code: "59300"},
		{name: "Anzin", code: "410"}
	])

	Category.bulkCreate([
		{name: "Animaux"},
		{name: "Informatique"},
		{name: "Jardinage"},
	])
}
//init()

module.exports = {
	Event: Event,
	Town: Town,
	Category: Category,
	User: User,
	Service: Service
}