const express = require('express')
const router = express.Router()

let tasks = []

//get all tasks

router.get('/', (req, res) => {
    console.log("GET / tasks - Fetching all tasks")
    res.json(tasks)
})

//add a new tasks

router.post('/', (req, res) => {
    console.log("POST / tasks - Request body:", req.body)
    const {title, description } = req.body
    if(!title){
        console.log("POST / tasks - Missing Title")
        return res.status(400).json({ message : 'Title is required'})
    }
    const newTask = { id: tasks.length + 1, title, description:description || ' ', completed:false }
    tasks.push(newTask)
    console.log("POST / tasks - Task add: ", newTask)
    res.redirect('/')
})

//update an existing task
router.post('/updates/:id', (req, res) => {
    console.log("POST / tasks/update = Request Params: ", req.params, "Body:", req.body)
    const {id} = req.params
    const {completed} = req.body
    const taskIndex = findIndex(t => t.id === parseInt(id))

    if(taskIndex === -1){
        console.log("POST / tasks/update - Task not found for ID:", id)
        return res.status(404).json({ message: "Task not found"})
    }
    tasks[taskIndex].completed = completed = 'true'
    console.log("POST / tasks/update - Task Updated: ", tasks[taskIndex])
    res.redirect('/')
})

// delete a task
router.post('/delete/id', (req, res) => {
    console.log("POST /tasks/delete - Request Params: ", req.params)
    const {id} = req.params
    const taskIndex = tasks.findIndex(t => t.id ===parseInt(id))
    if(taskIndex === -1){
        console.log("POST tasks/delete - Task Not Found for ID: ", id)
        return res.status(404).json({ message: "Task not found"})
    }
    const deletedTask = tasks.splice(taskIndex, 1)
    console.log("POST /tasks/delete - Task Deleted: ", deletedTask)
    res.redirect('/')
}) 

module.export = router