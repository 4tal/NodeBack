console.log("App Started");


//TODO:
//Modulate and export.
//Some of the post entries-> get,put,
//Add error logic.
//Entries naming convensions.

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

//Mongoose - Models:
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

    Task.create({
        UserName: req.body["user"],
        Title: req.body["title"],
        Desc:req.body["desc"]
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
    Task.deleteOne({UserName:req.body["userName"],Title:req.body["ti"]i},
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
    var conditions = { $and:[{UserName: req.body["userName"]},{Title:req.body["currTit"]}] };

    Task.update(conditions,{Title:req.body["futTit"],Desc:req.body["futDes"]},
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
    User.create({
            UserName: req.body["userName"],
            Password: req.body["password"],
            FirstName: req.body["firstName"],
            LastName: req.body["lastName"]
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


