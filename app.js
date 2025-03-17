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

app.use('api/tasks', taskRoutes)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Task Manager is running at http://localhost${PORT}`)
})

/*
differences between app.js and old-app.js:
middleware is missing, we can expect that to be somewhere else

Handles all the routes w taskRoutes

Accounts for using pug



*/