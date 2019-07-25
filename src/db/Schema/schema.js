var mongoose = require("mongoose");
var StudentSchema = new mongoose.Schema({
    studentName: {type: String , required: true},
    fatherName: {type: String , required: true},
    dateOfBirth: {type: String , required: true},
    address: {type: String , required: true},
    CNIC: {type: String , required: true},
    phoneNo: {type: String , required: true},
    lastInstitution: {type: String , required: true},
    admittedClass: {type: String , required: true},
    admissionDate: {type: String , required: true},
    year: {type: String , required: true},
    studentPhotoURL:{type: String}
    // _id: {type: String},

}, {minimize: false});

exports.StudentModel = mongoose.model('studentsData' , StudentSchema);
