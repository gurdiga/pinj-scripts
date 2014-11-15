'use strict';

var request = require('request');

module.exports = function(req, res) {
  var url = req.param('url');
  var start = Date.now();

  request(url, function (error, response, body) {
    var text;

    if (!error && response.statusCode === 200) {
      text = body;
    } else {
      text = response.statusCode + ': ' + error.message;
    }

    var time = Date.now() - start;
    text = '<pre>' + time + '\n' + text + '</pre>';

    res
      .status(200)
      .send(text);
  });
};
