var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var shortid = require('shortid');
var slicer = require('./../microservices/slicer');
var emotion = require('./../microservices/getEmotion');

var express = require('express');

var upload = multer({ dest: path.join(__dirname, '..', '..', 'public', 'files') });

function uploader(data) {
  var router = express.Router();

  router.post('/upload', upload.single('audiofile'), function (req, res) {
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

  router.post('/split', function (req, res) {
    if (_.isUndefined(req.body)) res.sendStatus(400);
    var fid   = req.body.id,
        start = req.body.start,
        end   = req.body.end;

    if (_.isUndefined(fid) || _.isUndefined(start) || _.isUndefined(end))
      res.sendStatus(400); // if any parameter is undefined

    var src  = data[fid].fn,
        id   = shortid.generate(),
        dest = path.join(__dirname, '..', '..', 'public', 'files', fid, id);

    slicer(src, dest, start, end, function getEmotion(filename) {
      emotion(filename, sendBack);

      function sendBack(emotions, dominant) {
        data[fid].sub[id] = { fn: filename, emotions, dominant }
        var publicFile = '/files/' + fid + '/' + path.basename(filename);
        var json = {
          id: fid,
          sid: id,
          file: publicFile,
          start, end,
          emotions,
          dominant
        };
        res.json(json); //send
      }
    });
  });

  return router;
}

module.exports = uploader;
