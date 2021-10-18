const { Sequelize, Model, DataTypes, DATE } = require('sequelize');

const print = console.log
//const sequelize = new Sequelize('postgresql://emzak:postgres@troc-db-container:5432/troc-db')
const sequelize = new Sequelize('troc-db', 'emzak', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

const Event = sequelize.define("event", {
	text: DataTypes.STRING,
	rdv: DataTypes.DATE
})

//print("before async function exec")
const init = async () => {
	await sequelize.sync({ force: true });
}
//init()

module.exports = Event