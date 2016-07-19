// wav splitter demo
// Andrew Jiang
// BCG Digital Ventures

// dependencies
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

// local dependencies
var emotion = require('./microservices/getEmotion');
var slicer = require('./microservices/slicer');
var router = require('./router');

// set up
var app = express();
var server = http.Server(app);

// establish middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// store info
var data = {};

// route pages
router(app, data);

// listen
server.listen(8080, function () {
  console.log('Listening on port 8080...');
});
