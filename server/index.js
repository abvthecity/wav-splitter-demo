// wav splitter demo
// Andrew Jiang
// BCG Digital Ventures

// dependencies
var http = require('http');
var path = require('path');
var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var _ = require('lodash');

// set up
var app = express();
var server = http.Server(app);

// establish middleware
app.use('/', serveStatic(path.join(__dirname, '..', 'public')));
app.use('/dist', serveStatic(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
var upload = multer({ dest: path.join(__dirname, '..', 'public', 'files') });

app.post('/upload', upload.single('audiofile'), function (req, res) {

});

app.post('/split', function (req, res) {

});

server.listen(8080, function () {
  console.log('Listening on port 8080...');
});
