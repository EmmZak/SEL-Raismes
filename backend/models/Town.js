const { Sequelize, Model, DataTypes, DATE } = require('sequelize');

const print = console.log
const sequelize = new Sequelize('troc-db', 'emzak', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
})

const Town = sequelize.define("town", {
	name: DataTypes.STRING,
	code: DataTypes.STRING
})


//print("before async function exec")
const init = async () => {
	await sequelize.sync({ force: true });
}
//init()

const create = async () => {
	print("CREATING TOWNS")
	const map = [
		{
			name: 'Raismes',
			code: '59590'
		},
		{
			name: 'Anzin',
			code: '59410'
		},
		{
			name: 'Valenciennes',
			code: '59300'
		},
	]
	for (let i=0; i<map.length; i++) {
		let item = map[i]
		let t = await Town.create({
			name: item.name, 
			code: item.code
		})
		await t.save()
	}
}

//create()

module.exports = Town