const { Sequelize, Model, DataTypes, DATE } = require('sequelize');
const Town = require("./Town")

const sequelize = new Sequelize('troc-db', 'emzak', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

const User = sequelize.define("user", {
	firebaseID: DataTypes.STRING,
	mail: DataTypes.STRING,
	name: DataTypes.STRING,
	surname: DataTypes.STRING,
	admin: DataTypes.BOOLEAN,
	credit: DataTypes.INTEGER,
})
Town.hasMany(User)
User.belongsTo(Town)

const init = async () => {
	await sequelize.sync({ force: true });
}
//init()

module.exports = User