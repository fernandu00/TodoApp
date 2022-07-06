require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')

// import model
const todo = require('./models/todo')

// use static files
app.use(express.static(__dirname + '/static'));

// set the view engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

// connect to the database mongodb://localhost/todo1
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true, useUnifiedTopology:true
})
// renders todos
app.get('/', async (req,res) => {
    const todoList = await todo.find()
    res.render("index", {todoList})
})

// create new todo
app.post('/todo', async (req,res) => {
    const newTodo = await todo.create({name:req.body.todo})
    newTodo.save()
    // console.log('saved')
    res.redirect('/')
})

// delete todo
app.post('/todo/delete/:_id', async (req,res) => {
    const {_id} = req.params
    const delTodo = await todo.deleteOne({_id})
    // console.log(`tarefa removida id: ${_id}`)
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {
    // console.log('server running')
})

