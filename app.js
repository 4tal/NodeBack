console.log("App Started");

var express = require('express');
var app = express();

var path = require('path');
 
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
    console.log(req.params.userName);
  });


app.post('/', function (req, res) {
    console.log(req);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ 'url': '/todolist/'+'userNameIdan'}));
  })
// app.get('/signup', function (req, res) {
//     res.sendFile(path.join(__dirname +'/html/signup.html'));
// })



app.listen(3000)