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
  res.sendFile(path.join(__dirname +'/html/login.html'));
})


app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname +'/html/login.html'));
})

 //Signin 
app.post('/', function (req, res) {
    User.find().and([{ UserName: req.body["un"] }, { Password: req.body["pw"] }])
    .then(users => { 
        res.send(JSON.stringify(users))
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
     })
    .catch(error => { 
        console.log(error)
     })
})

//addnewnote
app.post('/addnewnote', function (req, res) {
    //Update the new note.
    var _us = req.body["user"];
    var _title = req.body["title"];
    var _desc = req.body["desc"];    
    
    Task.create({
        UserName: _us,
        Title: _title,
        Desc:_desc
    },
    function(err,herrr){
        if(err){
            return res.send("Error");
        }
        else{
            return res.send("OK");
        }
    });
})


//delete
app.post('/delete', function (req, res) {
    
    var _un = req.body["userName"];
    var _ti = req.body["ti"];


    Task.deleteOne({UserName:_un,Title:_ti},
        function(err,herrr){
            if(err){
                return res.send("Error");
            }
            else{
                return res.send("OK");
            }
    });
})


//update
app.post('/update', function (req, res) {
    
    var _currTi = req.body["currTit"];
    var _currDe = req.body["currDes"];
    var _fuTi = req.body["futTit"];
    var _fuDe = req.body["futDes"];    
    var _user = req.body["userName"];

    var conditions = { $and:[{UserName: _user},{Title:_currTi}] };

    Task.update(conditions,{Title:_fuTi,Desc:_fuDe},
    function(err,herrr){
        if(err){
            return res.send("Error");
        }
        else{
            return res.send("OK");
        }
    });
})


//Register function
app.post('/signup', function (req, res) {
    var _us = req.body["userName"];
    var _pw = req.body["password"];
    var _fn = req.body["firstName"];
    var _ln = req.body["lastName"];
    User.create({
            UserName: _us,
            Password: _pw,
            FirstName: _fn,
            LastName: _ln
        },
        function(err,herrr){
        if(err){
            return res.send("Error");
        }
        else{
            return res.sendStatus(200)
        }
    });
})


app.listen(3000)


