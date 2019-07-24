var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
app.use(bodyParser.json({limit: '5000kb'}));
var connection = require('./Connection/connection');
var schema = require('./Schema/schema');
var StudentModel = schema.StudentModel;

var AddStudents = require("./Router/add-students");
var FindStudents = require("./Router/find-students");

app.use('/add-students', AddStudents);
app.use('/find-students', FindStudents);

app.get('/index' , function (req , res) {
    res.send('testing');
});
app.set('port', process.env.PORT || 9000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

