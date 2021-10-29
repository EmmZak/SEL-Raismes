const { Sequelize, Model, DataTypes, DATE } = require('sequelize');

const sequelize = new Sequelize('troc-db', 'emzak', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

const Event = sequelize.define("event", {
	type: DataTypes.STRING,
	text: DataTypes.STRING,
	date: DataTypes.DATEONLY,
	startHour: DataTypes.STRING,
	startMinute: DataTypes.STRING,
	endHour: DataTypes.STRING,
	endMinute: DataTypes.STRING,
})

const User = sequelize.define("user", {
	firebaseID: DataTypes.STRING,
	idToken: DataTypes.STRING(1000),
	mail: DataTypes.STRING,
	mailVerified: DataTypes.BOOLEAN,
	number: DataTypes.STRING,
	name: DataTypes.STRING,
	surname: DataTypes.STRING,
	town: DataTypes.STRING, // postal code
	admin: DataTypes.BOOLEAN,
	credit: DataTypes.INTEGER,
	verified: DataTypes.BOOLEAN
})

const Service = sequelize.define("service", {
	description: DataTypes.STRING,
	category: DataTypes.STRING,
})

User.hasMany(Service, { onDelete: "CASCADE" })
Service.belongsTo(User)

const init = async () => {
	await sequelize.sync({ force: true });

	Event.bulkCreate([
		{ type: "Permanences", text: "venez nois voir tel jour", date: new Date(), startHour: "14", startMinute: "15", endHour: "15", endMinute: "45" }
	])

	// User.bulkCreate([
	// 	{ firebaseID: "f-1", mail: "e@e", number: "0766554490", name: "manu", surname: "ee", admin: true, credit: 33, town: "1" },
	// 	{ firebaseID: "f-2", mail: "a@a", number: "0766554490", name: "zak", surname: "aa", admin: true, credit: 55, town: "2" },
	// 	{ firebaseID: "f-3", mail: "b@b", number: "0766554490", name: "deph", surname: "dd", admin: false, credit: 66, town: "3" },
	// 	{ firebaseID: "f-4", mail: "c@c", number: "0766554490", name: "ler", surname: "ff", admin: false, credit: 444, town: "2" },
	// 	{ firebaseID: "f-5", mail: "i@i", number: "0766554490", name: "miko", surname: "vv", admin: false, credit: 3334, town: "1" },
	// ])

	// Service.bulkCreate([
	// 	{ description: "first description", userId: "1", category: categories[0].name },
	// 	{ description: "animaux test", userId: "2", category: categories[1].name },
	// 	{ description: "jardinage description", userId: "2", category: categories[2].name },
	// 	{ description: "sfd description", userId: "3", category: categories[3].name },
	// 	{ description: "fffff description", userId: "2", category: categories[4].name },
	// 	{ description: "a description", userId: "5", category: categories[5].name },
	// 	{ description: "fdsfdsf description", userId: "2", category: categories[6].name },
	// 	{ description: "4 description", userId: "5", category: categories[1].name },
	// 	{ description: "d description", userId: "2", category: categories[2].name },
	// 	{ description: "first description", userId: "1", category: categories[3].name },
	// 	{ description: "first description", userId: "1", category: categories[0].name },
	// 	{ description: "animaux test", userId: "2", category: categories[1].name },
	// 	{ description: "jardinage description", userId: "2", category: categories[2].name },
	// 	{ description: "sfd description", userId: "3", category: categories[3].name },
	// 	{ description: "fffff description", userId: "2", category: categories[4].name },
	// 	{ description: "a description", userId: "5", category: categories[5].name },
	// 	{ description: "fdsfdsf description", userId: "2", category: categories[6].name },
	// 	{ description: "4 description", userId: "5", category: categories[1].name },
	// 	{ description: "d description", userId: "2", category: categories[2].name },
	// 	{ description: "first description", userId: "1", category: categories[3].name }
	// ])
}
//init()

module.exports = {
	Event: Event,
	User: User,
	Service: Service
}