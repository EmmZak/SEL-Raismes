const express = require("express")
const app = express()
var cors = require('cors')

var bodyParser = require('body-parser')

// routes
const eventRoutes = require("./routes/event")
const townRoutes = require("./routes/town")
const categoryRoutes = require("./routes/category")
const userRoutes = require("./routes/user")
const serviceRoutes = require("./routes/service")

print = console.log
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use('/events', eventRoutes)
app.use('/towns', townRoutes)
app.use('/categories', categoryRoutes)
app.use('/users', userRoutes)
app.use('/services', serviceRoutes)

//app.use(express.urlencoded({ extended: true })) 


app.listen(5000, '0.0.0.0', () => {
	print("ok")
})

