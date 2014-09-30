'use strict';

function PaymentRecorder(firebaseClient) {
  this.firebaseClient = firebaseClient;
}

PaymentRecorder.prototype.record = function(response) {
  var deferred = Q.defer();

  // TODO
  deferred.resolve(response);

  return deferred.promise;
};

module.exports = PaymentRecorder;

var Q = require('q');
Q.longStackSupport = true;
