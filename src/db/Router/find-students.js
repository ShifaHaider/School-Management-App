var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var api = express.Router();
var connection = require('../Connection/connection');
var schema = require('../Schema/schema');
var StudentModel = schema.StudentModel;




api.get('/find-student', function (req, res) {
    console.log(req.body);
    console.log(req.body.filters);
    res.send('find-students');

    // StudentModel.find({}).exec((error, data) => {
    //     console.log(error, data);
    //     res.send(data);
    // });
});
module.exports = api;
