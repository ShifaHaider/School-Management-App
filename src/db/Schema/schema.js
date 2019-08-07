var mongoose = require("mongoose");
var StudentSchema = new mongoose.Schema({
    cnic: {type: String},
    phone: {type: String},
    photoURL: {type: String},
    dateOfBirth: {type: Number},
    currentClass: {type: String},

    lastInstitution: {type: String},
    name: {type: String, required: true},
    year: {type: String, required: true},
    address: {type: String, required: true},
    fatherName: {type: String, required: true},
    admissionDate: {type: Number, required: true},
    admittedInClass: {type: String, required: true},
    createdAt: {type: Number, default: Date.now},
}, {minimize: false});

exports.StudentModel = mongoose.model('students', StudentSchema);
