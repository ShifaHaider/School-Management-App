var mongoose = require("mongoose");
var StudentSchema = new mongoose.Schema({
    name: {type: String , required: true},
    age: {type: String , required: true},
    class: {type: String , required: true},
    year: {type: String , required: true},
    admissionDate: {type: String , required: true},
    // _id: {type: String},

}, {minimize: false});

exports.StudentModel = mongoose.model('studentsData' , StudentSchema);
