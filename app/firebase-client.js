'use strict';

function FirebaseClient(firebaseUrl) {
  // TODO
  this.firebaseUrl = firebaseUrl;
}

FirebaseClient.prototype.get = function(path) {
  // TODO
  var deferred = Q.defer();
  deferred.resolve(path);
  return deferred.promise;
};

FirebaseClient.prototype.set = function(path, value) {
  // TODO
  var deferred = Q.defer();
  deferred.resolve(value);
  return deferred.promise;
};

module.exports = FirebaseClient;

var Q = require('q');
Q.longStackSupport = true;
