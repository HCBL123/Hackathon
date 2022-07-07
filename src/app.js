var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const path = require('path');

var ajax = require('ajax');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/login", function(req, res) {
    console.log("0");
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + ' ' + password);
    res.sendFile(path.join(__dirname, '/login.html'));
});

// app.get("/flashcard", function(req, res) {
//     res.sendFile(path.join(__dirname, '/login.html'));

// });  

app.listen(8080, () => {
    console.log("Server started...")
});

// index
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

//resouce provider
app.get('/main.css', function(req, res) {
    res.sendFile(path.join(__dirname, "../main.css"));
});

app.get('/images/weblogo.png', function(req, res) {
    res.sendFile(path.join(__dirname, "..//images/weblogo.png"));
});
app.get('/DAFC/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, "../DAFC/style.css"));
});

app.get('/DAFC/index.html', (req, res) => {
    console.log(req.body.front);
    console.log(req.body.back);
    res.sendFile(path.join(__dirname, "../DAFC/index.html"));
});

app.get('/DAFC/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, "../DAFC/script.js"));
});