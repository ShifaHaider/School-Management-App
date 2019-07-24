var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var api = express.Router();
var connection = require('../Connection/connection');
var schema = require('../Schema/schema');
var StudentModel = schema.StudentModel;

api.post('/add-student', function (req, res) {
    console.log(req.body);
    var studentModel = new StudentModel(req.body);
    studentModel.save(function (error, data) {
        console.log(data , error);
        res.send(data);
    });
});

api.get('/add-student', function (req, res) {
    StudentModel.find().exec((error, data) => {
        console.log(error, data);
        res.send(data);
    });
});


module.exports = api;
