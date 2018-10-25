//contains express and bodyparser, routes, app.listen
//requires mongoose, Todo and User from db and models


var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')
var { ObjectID } = require('mongodb')

var express = require('express')
var bodyParser = require('body-parser')

var app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) =>
        res.send(doc))
}, (e) => {
    res.status(400).send()
})


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })
    }, (e) => {
        res.status(400).send()
    })
})

app.get('/todos/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send()
    }

    Todo.findById(req.params.id).then((todos) => {
        if (!todos){
            return res.status(404).send()
        }
        
        
        res.send({ todos })
    }, (e) => {
        res.status(400).send()
    })
})




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// var newTodo = new Todo({
//     text: '  Edit This Video   ',
//     completed: true,
//     completedAt: 9999
// })

// newTodo.save().then((doc)=>{
//     console.log('Saved todo: ', doc)
// },(e)=>{
//     console.log('Unable to save')
// });





// var sampleUser = new User({
//     email:'mgamatero@pogi.com',
// })

// sampleUser.save().then((doc)=>{
//     console.log('User saved ',doc)
// }, (e)=>{
//     console.log('Error in saving user ',e)
// })