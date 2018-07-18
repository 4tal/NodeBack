console.log("App Started");


//Express
const express = require('express')
var app = express()

//BodyParser
var bodyParser = require('body-parser')

//Path
var path = require('path');

//Mongoose
var mongoose = require('mongoose');
var db = "mongodb://4tal:123qwe@ds237620.mlab.com:37620/fun";



var User = require('./User.model');
var Task = require('./Task.model');



mongoose.connect(db, {
    useNewUrlParser: true
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('html'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname +'/html/index.html'));
})

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname +'/html/login.html'));
})

app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname +'/html/signup.html'));
})

app.get('/todolist', function (req, res) {
    res.sendFile(path.join(__dirname +'/html/todolist.html'));
})


app.get('/todolist/:userName', function (req, res) {
    Task.find({userName:"idan"});
    
    (req.params.userName);
    
  });


 //Signin 
app.post('/', function (req, res) {
    // User.find().and(
    //     $and: [
    //         { UserName : req.body["un"]},
    //         { Password : req.body["pw"]}
    //     ] 
    // )


    // .exec(function(err,users){
    //     if(err){
    //         //Redirect to the login.
    //         res.send('error');
    //     }else{
    //         //Redirect to the todolist with header array.
    //         console.log(users);
    //     }
    // })
    //res.send(JSON.stringify({ 'url': '/todolist/'+' '}));
    
    User.find().and([{ UserName: req.body["un"] }, { Password: req.body["pw"] }])
    .then(users => { 
        //if(users.length>0){
        //res.send(users.length);
        res.send(JSON.stringify(users))
        //}
        console.log(users)
     })
    .catch(error => { 
        console.log(error)
     })
})


//Get New Notes
app.post('/getes', function (req, res) {
    Task.find({ UserName: req.body["un"] })
    .then(tasks => { 
        res.send(JSON.stringify(tasks))
        console.log(tasks)
     })
    .catch(error => { 
        console.log(error)
     })
})


app.get('/check', function (req, res) {
    User.find().and([{ UserName: req.body["un"] }, { Password: req.body["pw"] }])
    .then(users => { 
        //if(users.length>0){
        //res.send(users.length);
        res.send(JSON.stringify( users))
        //}
        console.log(users)
     })
    .catch(error => { 
        console.log(error)
     })
    
  });

//addnewnote
app.post('/addnewnote', function (req, res) {
    //Update the new note.
    //on callback res.send(JSON.stringify({ 'url': '/todolist/'+' '}))
    var _us = req.body["userName"];
    var _title = req.body["password"];
    var _desc = req.body["firstName"];    
    
    Task.create({
        UserName: _us,
        Title: _title,
        Desc:_desc
    })
    res.send(JSON.stringify({ 'url': '/todolist'}));
})


app.post('/signup', function (req, res) {
    var _us = req.body["userName"];
    var _pw = req.body["password"];
    var _fn = req.body["firstName"];
    var _ln = req.body["lastName"];
    User.create({
            userName: _us,
            Password: _pw,
            FirstName: _fn,
            LastName: _ln

        },function(err,herrr){
        if(err){
            return res.send("Error");
        }else{
            return res.send(JSON.stringify({ 'url': '/login'}))
        }
    });
   
    
    //Now add inserttion to the mongo.
    res.setHeader('Content-Type', 'application/json');
    //Return rendered page
    res.send(JSON.stringify({ 'url': '/login'}));
})


app.listen(3000)


