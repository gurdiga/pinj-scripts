'use strict';

var FirebaseClient = {};

var authenticatePromise;
var ref;

FirebaseClient.start = function(firebaseUrl, firebaseSecret) {
  ref = new Firebase(firebaseUrl);
  authenticatePromise = authenticate(firebaseSecret);
};

FirebaseClient.get = function(path) {
  return authenticatePromise.then(function() {
    var deferred = Q.defer();

    ref.child(path).once('value', function(snapshot) {
      deferred.resolve(snapshot.val());
    }, function errorHandler(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  });
};

FirebaseClient.set = function(path, value) {
  return authenticatePromise.then(function() {
    var deferred = Q.defer();

    ref.child(path).set(value, function(error) {
      if (error) deferred.reject(error);
      else deferred.resolve();
    });

    return deferred.promise;
  });
};

FirebaseClient.getRef = function() {
  return authenticatePromise.then(function() {
    return ref;
  });
};

function authenticate(firebaseSecret) {
  var tokenGenerator = new FirebaseTokenGenerator(firebaseSecret);
  var token = tokenGenerator.createToken({
    'uid': 'script'
  });
  var deferred = Q.defer();

  ref.authWithCustomToken(token, function(error) {
    if (error) deferred.reject(error);
    else deferred.resolve();
  });

  return deferred.promise
  .catch(function(error) {
    console.error('FirebaseClient: error while authenticating:', error.stack);
  });
}

module.exports = FirebaseClient;

var Q = require('q');
Q.longStackSupport = true;

var Firebase = require('firebase');
var FirebaseTokenGenerator = require('firebase-token-generator');
