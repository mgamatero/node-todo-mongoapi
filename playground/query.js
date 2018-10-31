var {mongoose} = require('./../server/db/mongoose')
var {Todo} = require('./../server/models/todo')
var {User} = require('./../server/models/user')

var {ObjectID} = require('mongodb')

var id = '5bd0ad4301186807ecc1ee4fzzzzz'

if (!ObjectID.isValid(id)){
    console.log('ID not valid (caught by ObjectID)')
}
// User.find({
//     email:'mikepogs@aol.com'
// }).then((doc)=>{
//     console.log('User.find ----> ',doc)
// },(e)=>{
//     console.log(e)
// })

User.findById(id).then((doc)=>{
    if(!doc){
        return console.log('Unable to find user')
    }
    console.log('findById ----> ',JSON.stringify(doc,undefined,2))
},(e)=>{
    console.log(e)
})

//remove all
Todo.remove({})((result)=>{
    console.log(result)
})

//gets the doc back and removes from DB
Todo.findOneAndRemove({})((result)=>{
    console.log(result)
})

//gets the doc back and removes from DB
Todo.findByIdAndRemove('asdf')((result)=>{
    console.log(result)
})