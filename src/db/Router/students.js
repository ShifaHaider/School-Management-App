var express = require("express");
var api = express.Router();
var schema = require('../Schema/schema');
var StudentModel = schema.StudentModel;

api.post('/find-student', function (req, res) {
    StudentModel.find(req.body, ((error, data) => {
        res.send(data || error);
    }));
});

api.post('/find-student-detail', function (req, res) {
    StudentModel.findOne({_id: req.body.studentID}, ((error, data) => {
        res.send(data || error);
    }));
});


api.post('/add-student', function (req, res) {
    var studentModel = new StudentModel(req.body);
    studentModel.save(function (error, data) {
        console.log(data);
        res.send(data || error);
    });
});


api.post('/update-student-profile', function (req, res) {
    console.log(req.body);
    StudentModel.update({_id: req.body.studentID}, (req.body.updatedData), function (error, data) {
        res.send(data || error);
    })
});


api.get('/find-by-keyword', function (req, res) {
    var regexQuery = {
        $or: [
            {cnic: new RegExp(req.query.keyword, 'i')},
            {phone: new RegExp(req.query.keyword, 'i')},
            {address: new RegExp(req.query.keyword, 'i')},
            {fatherName: new RegExp(req.query.keyword, 'i')},
            {name: new RegExp(req.query.keyword, 'i')},
            {lastInstitution: new RegExp(req.query.keyword, 'i')},
        ]
    };
    StudentModel.find(regexQuery).exec((error, data) => {
        res.send(data || error);
    });
});
api.get('/find-by-date-of-birth', function (req, res) {
    StudentModel.find({dateOfBirth: {$gte: req.query.startDate , $lte: req.query.endDate}}).exec((error, data) => {
        res.send(data || error);
    });
});


module.exports = api;

