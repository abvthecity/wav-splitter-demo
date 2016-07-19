// wav splitter demo
// Andrew Jiang
// BCG Digital Ventures

// dependencies
var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var multer = require('multer');
var _ = require('lodash');

// local dependencies
var emotion = require('./microservices/getEmotion');
var slicer = require('./microservices/slicer');

// set up
var app = express();
var server = http.Server(app);

// establish middleware
app.use('/', serveStatic(path.join(__dirname, '..', 'public')));
app.use('/dist', serveStatic(path.join(__dirname, '..', 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var upload = multer({ dest: path.join(__dirname, '..', 'public', 'files') });

// store info
var data = {};

app.post('/upload', upload.single('audiofile'), function (req, res) {
  if(_.isUndefined(req.file)) res.sendStatus(400);
  var filename = req.file.path + '.wav';
  fs.renameSync(req.file.path, filename);
  var id = shortid.generate();
  // save
  data[id] = { fn: filename, sub: {} };
  // generate public file
  var publicFile = '/files/' + path.basename(filename);
  // get emotion data
  emotion(filename, function (emotions, dominant) {
    res.json({ id, file: publicFile, emotions, dominant });
  });
});

app.post('/split', function (req, res) {
  if (_.isUndefined(req.body)) res.sendStatus(400);
  var fid   = req.body.id,
      start = req.body.start,
      end   = req.body.end;
  if (_.isUndefined(fid) || _.isUndefined(start) || _.isUndefined(end))
    res.sendStatus(400); // if any parameter is undefined
  var src  = data[fid].fn,
      id   = shortid.generate(),
      dest = path.join(__dirname, '..', 'public', 'files', fid, id);
  slicer(src, dest, start, end, function (filename) {
    emotion(filename, function (emotions, dominant) {
      data[fid].sub[id] = { fn: filename, emotions, dominant }
      var publicFile = '/files/' + fid + '/' + path.basename(filename);
      res.json({
        id: fid,
        sid: id,
        file: publicFile,
        start, end,
        emotions,
        dominant
      });
    });
  });
});

// listen
server.listen(8080, function () {
  console.log('Listening on port 8080...');
});
