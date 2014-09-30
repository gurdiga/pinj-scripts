'use strict';

function FirebaseClient(firebaseUrl, firebaseSecret) {
  this.NOW = Firebase.ServerValue.TIMESTAMP;
  this.ref = new Firebase(firebaseUrl);
  this.auth = auth(this.ref, firebaseSecret);
}

function auth(ref, firebaseSecret) {
  var tokenGenerator = new FirebaseTokenGenerator(firebaseSecret);
  var token = tokenGenerator.createToken({ 'paymentRegistrar': true });
  var deferred = Q.defer();

  ref.auth(token, function(error) {
    if (error) deferred.reject(error);
    else deferred.resolve();
  });

  return deferred.promise;
}

FirebaseClient.prototype.get = function(path) {
  return this.auth.then(function() {
    var deferred = Q.defer();

    this.ref.child(path).once('value', function(snapshot) {
      deferred.resolve(snapshot.val());
    }, function errorHandler(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }.bind(this));
};

FirebaseClient.prototype.set = function(path, value) {
  return this.auth.then(function() {
    var deferred = Q.defer();

    this.ref.child(path).set(value, function(error) {
      if (error) deferred.reject(error);
      else deferred.resolve();
    });

    return deferred.promise;
  }.bind(this));
};

module.exports = FirebaseClient;

var Q = require('q');
Q.longStackSupport = true;
var Firebase = require('firebase');
var FirebaseTokenGenerator = require('firebase-token-generator');
