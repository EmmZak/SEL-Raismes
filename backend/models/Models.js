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

User.hasMany(Service, {onDelete: "CASCADE"})
Service.belongsTo(User)

Category.hasMany(Service)
Service.belongsTo(Category)

const init = async () => {
	await sequelize.sync({ force: true });

	Event.bulkCreate([
		{text: "venez nois voir tel jour", rdv: new Date()}
	])

	Town.bulkCreate([
		{name: "Raismes", code: "59590"},
		{name: "VA", code: "59300"},
		{name: "Anzin", code: "410"}
	])

	Category.bulkCreate([
		{name: "Animaux"},
		{name: "Informatique"},
		{name: "Jardinage"},
		{name: "Cuisine"},
		{name: "Game"},
		{name: "Mac"},
		{name: "Love"},
		{name: "Python"},
	])

	User.bulkCreate([
		{firebaseID: "f-1", mail: "e@e", name: "manu", surname: "ee", admin: true, credit: 33, townId: "1"},
		{firebaseID: "f-2", mail: "a@a", name: "zak", surname: "aa", admin: true, credit: 55, townId: "2"},
		{firebaseID: "f-3", mail: "b@b", name: "deph", surname: "dd", admin: false, credit: 66, townId: "3"},
		{firebaseID: "f-4", mail: "c@c", name: "ler", surname: "ff", admin: false, credit: 444, townId: "2"},
		{firebaseID: "f-5", mail: "i@i", name: "miko", surname: "vv", admin: false, credit: 3334, townId: "1"},
	])

	Service.bulkCreate([
		{description: "first description",  userId: "1", categoryId: "3"},
		{description: "animaux test",  userId: "2", categoryId: "4"},
		{description: "jardinage description",  userId: "2", categoryId: "5"},
		{description: "sfd description",  userId: "3", categoryId: "5"},
		{description: "fffff description",  userId: "2", categoryId: "3"},
		{description: "a description",  userId: "5", categoryId: "1"},
		{description: "fdsfdsf description",  userId: "2", categoryId: "3"},
		{description: "4 description",  userId: "5", categoryId: "2"},
		{description: "d description",  userId: "2", categoryId: "4"},
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