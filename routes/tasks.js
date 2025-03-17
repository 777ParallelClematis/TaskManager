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