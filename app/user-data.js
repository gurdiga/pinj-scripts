'use strict';

function UserData(firebaseClient, email) {
  this.firebaseClient = firebaseClient;

  var aid = email.replace(/\./g, ':');
  this.userPath = '/data/' + aid + '/';
}

UserData.prototype.setSubscription = function(subscriptionId) {
  var path = this.userPath + 'subscription';
  return this.firebaseClient.set(path, subscriptionId);
};

UserData.prototype.recordLastPayment = function() {
  var path = this.userPath + 'timestamps/lastPayment';

  return Q.all([
    this.firebaseClient.get(path),
    this.firebaseClient.get(this.userPath + 'timestamps/registration')
  ])
  .then(function(timestamps) {
    var lastPayment = timestamps[0];
    var registration = timestamps[1];

    lastPayment = lastPayment ? oneMonthFrom(lastPayment) : whenTrialEnds(registration);

    this.firebaseClient.set(path, lastPayment);
  }.bind(this));
};

UserData.prototype.saveBillingInfo = function(billingInfo) {
  var path = this.userPath + 'billingInfo';
  return this.firebaseClient.set(path, billingInfo);
};

function oneMonthFrom(lastPayment) {
  return lastPayment + 31 * 24 * 3600 * 1000;
}

function whenTrialEnds(registration) {
  return registration + 7 * 24 * 3600 * 1000;
}

module.exports = UserData;

var Q = require('q');
Q.longStackSupport = true;
