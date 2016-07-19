// Slicer microservice, javascript side
var PythonShell = require('python-shell');
var path = require('path');

function slicer(src, dest, start, end, cb) {
  var options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: __dirname,
    args:[src, dest, parseFloat(start), parseFloat(end)],
  }

  PythonShell.run('slicer.py', options, function (err, results) {
    if (err) throw err;
    cb(results);
  });
}

module.exports = slicer;
