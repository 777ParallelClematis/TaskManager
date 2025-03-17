const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

//middleware to parse JSON and URL-encoded requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//set up pug as the template engine
app.set('view engine', 'pug') // set pug as the template engine
app.set('views', path.join(__dirname, 'views')) // define the directory for views 

//in memory task storage (this will reset on server restarting)
let tasks = []

// default route to render the pug template with the list of tasks
app.get('/', (req, res) => {
    console.log("GET / - Rendering Tasks") - //rendering log
    res.render('index', {tasks}) //render the index.pug view with tasks
})

// API endpoints to get all tasks in JSON format 
app.get('/api/tasks', (req, res) => {
    console.log("GET /api/tasks - fetching all tasks");
    res.json(tasks); // send tasks as json response
})

//API endpoint to add a new task
app.post('/api/tasks', (req, res) => {
    console.log("GET /api/tasks - request body", req.body)
    const {title, description} = req.body // extract title and description from request
    if(!title){
        console.log("POST /api/tasks - Missing title") //log error
        return res.status(400).json({message: 'Title is required'}) //return error response
    }
    const newTask = {id: tasks.length + 1, title, description: description || '', complete:false} //create a new task object
    tasks.push(newTask) // add task to list
    console.log("POST /api/tasks - Task added:", newTask) //debug log
    res.redirect('/') // redirect to home page
})

// api endpoint to update an existing task
app.post('/api/tasks/update/:id'), (req, res) =>{
    console.log("POST /api/tasks/update - Request params:", req.params, "Body:", req.body) //debug log
    const {id} = req.params //get task ID from the URL parameter
    const {completed} = req.body //extract the completed status from the request body
    const taskIndex = tasks.findIndex( t => t.id === parseInt(id)) // find the tassk index by id
    if(taskIndex === -1){
        console.log("POST /api/tasks/update - Task Not Found for ID", id) // errror log
        return res.status(404).json({message: "Task Not Found"}) // return error response
    }
    tasks[taskIndex].completed == completed === true //  update task completion status
    console.log("POST /api/tasks/update - task updated: ", tasks[taskIndex]) // debug log
    res.redirect('/')
}

//API endpoint to delete a task
app.post('/api/tasks/delete/:id', (req, res) => {
    console.log("POST /api/tasks/delete - request params:", req.params) //debug log
    const id = req.params //get task id from url
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id)) // find the task index by id
    if(taskIndex === -1){
        console.log("POST /api/tasks/delete - not found for ID", id) // error log
        return res.status(404).json({ message: "Task not found"}) // return error response
    }
    const deletedTask = tasks.splice(taskIndex, 1) // remove task from the array
    console.log("POST /api/tasks/delete - task deleted", deletedTask) //debug log
    res.redirect('/') // redirect to home page
})

//serve static files (CSS) from public directory
app.use(express.static(path.join(__dirname, 'public')))

// start the server and listen on the defined port

app.listen(port, () => {
    console.log(`Task Manager is running at https://localhost:${port}`) // log server start
})