// grabs data from deepEmotion
var request = require('request');
var _ = require('lodash');

var url = 'http://localhost:8085/v1/predict?inputFilePath=';

var colors = {
	anger: "#9A1510",
	fear: "#CC66CA",
	happy: "#D2DF73",
	neutral: "#6E77BC",
	sad: "#91CA61",
	surprise: "orange",
	disgust: "#3C4852"
};

var dummdumm = [{ anger: '0.2380952',
	fear: '0.02564103',
	happy: '0.753993',
	neutral: '0.6580952',
	sad: '0.7673993',
	surprise: '0.7873993',
	disgust: '0.35'
}];

function getEmotion(filename, cb){
	request.get({ url: url + filename, json:true }, function (err, res, body) {
    var emotions = [],
        count = 0,
        dominantName = '',
        dominantVal = 0;

    if(!_.isArray(body) || _.isUndefined(body)) body = dummdumm;

    _.forEach(body[0], function (val, key) {
      if (val > dominantVal) {
        dominantName = key;
        dominantVal = val;
      }

      emotions.push({
        title: key,
        id: key + (++count),
        confidence: _.ceil(val * 100),
        color: colors[key],
        desc: '',
      });
    });

    cb(emotions, dominantName);

  });
}

module.exports = getEmotion;
