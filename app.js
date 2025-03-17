const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const taskRoutes = require('./routes/tasks')

const app = express()
const PORT = 3000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/api/tasks', taskRoutes)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log(`Task Manager is running at http://localhost${PORT}`)
})

/*
Erin:
All code to use the http methods is handled in the specific route, instead of all in one main file.
The only code in the app.js is middleware and a get method to render the home page. The new app also
defines at which path the code should be read for the new route.

Ali:
Both app.js and the task.js do have their middlewares, Globally Defined in app.js where in the routes/tasks.js  it's more of Route-Specific Middleware
*/