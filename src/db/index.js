var cors = require('cors');
var express = require("express");
var bodyParser = require('body-parser');
var app = express();


var connection = require('./Connection/connection');

app.use(cors());
app.use(bodyParser.json({limit: '5000kb'}));


var students = require("./Router/students");
app.use('/students', students);


app.get('/index', function (req, res) {
    res.send('testing');
});


app.set('port', process.env.PORT || 9000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

