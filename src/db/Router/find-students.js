var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var api = express.Router();
var connection = require('../Connection/connection');
var schema = require('../Schema/schema');
var StudentModel = schema.StudentModel;


api.post('/find-student', function (req, res) {
    console.log(req.body);
    StudentModel.find(req.body ,((error, data) => {
        console.log(error, data);
        res.send(data);
    }));
});
api.post('/find-student-detail', function (req, res) {
    console.log(req.body);
    StudentModel.findOne({_id: req.body.studentID},((error, data) => {
        console.log(error, data);
        res.send(data);
    }));
});
module.exports = api;
