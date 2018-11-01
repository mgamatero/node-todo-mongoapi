//contains express and bodyparser, routes, app.listen
//requires mongoose, Todo and User from db and models

const _ = require('lodash');

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
        if (!todos) {
            return res.status(404).send()
        }


        res.send({ todos })
    }, (e) => {
        res.status(400).send()
    })
})


app.delete('/todos/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send()
    }


    Todo.findByIdAndRemove(req.params.id).then((result) => {
        if (!result) {
            return res.status(404).send()
        }
        res.send({ result })
    }).catch((e) => {
        res.status(400).send()
    })
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); //only takes these properties, not completedAt

    //valid id?
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send()
    }

    //if boolean and completed = true
    if ((_.isBoolean) && body.completed) {
        body.completedAt = new Date().getTime();
    } 
    else 
    {
        body.completed = false;
        body.completedAt = null;
    }

    //actual update happens here
    //1st arg - id, 2nd is body, 3rd is a parameter that says return new updated obj
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({ todo })
    }).catch((e) => {
        rest.statsus(400).send()
    })

});




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