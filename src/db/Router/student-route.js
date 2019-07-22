var express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
var api = express.Router();


api.get('/test', function (req, res) {
    res.send('testing');
});

module.exports = api;
