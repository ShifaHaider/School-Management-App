var mongoose = require("mongoose");
var StudentSchema = new mongoose.Schema({
    name: {type: String , required: true},
    age: {type: String , required: true},
    class: {type: String , required: true},
    year: {type: String , required: true},
    date: {type: Number , default: Date.now()},
    _id: {type: String , required: true},

}, {minimize: false});

exports.UserModel = mongoose.model('studentsData' , StudentSchema);
