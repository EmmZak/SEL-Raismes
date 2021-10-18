const { Sequelize, Model, DataTypes, DATE } = require('sequelize');
const User = require("./User")
const Category = require("./Category")

const sequelize = new Sequelize('troc-db', 'emzak', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

const Service = sequelize.define("service", {
	description: DataTypes.STRING,
})
// category
Category.hasMany(Service)
Service.belongsTo(Category)
// user
User.hasMany(Service)
Service.belongsTo(User)

const init = async () => {
	await sequelize.sync({ force: true });
}
//init()

module.exports = Service