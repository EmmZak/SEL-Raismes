const express = require("express")
const app = express()
// routes
const eventRoutes = require("./routes/event")
const townRoutes = require("./routes/town")
const categoryRoutes = require("./routes/category")
const userRoutes = require("./routes/user")
const serviceRoutes = require("./routes/service")

print = console.log

app.use('/events', eventRoutes)
app.use('/towns', townRoutes)
app.use('/categories', categoryRoutes)
app.use('/users', userRoutes)
app.use('/services', serviceRoutes)

app.listen(5000, '0.0.0.0', () => {
	print("ok")
})

