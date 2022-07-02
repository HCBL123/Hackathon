var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", function(req, res) {
    console.log("0");
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + ' ' + password);
    res.sendFile(path.join(__dirname, '/login.html'));
});

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, '/login.html'));
});


app.listen(8080, () => {
    console.log("Server started...")
});