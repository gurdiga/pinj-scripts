'use strict';

var fs = require('fs');


module.exports = function(app) {
  fs.readdir('app/actions', function(err, files) {
    files
      .filter(function(fileName) {
        return fileName.substr(-3) === '.js';
      })
      .map(function(fileName) {
        return fileName.replace('.js', '');
      })
      .forEach(function(fileName) {
        app.all('/' + fileName, require('./actions/' + fileName));
      });
  });
};
