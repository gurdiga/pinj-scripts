'use strict';

function UserData(email) {
  var aid = email.replace(/\./g, ':');
  this.userPath = '/data/' + aid + '/';
}

UserData.prototype.setSubscription = function(subscriptionId) {
  var path = this.userPath + 'subscription';
  return FirebaseClient.set(path, subscriptionId);
};

UserData.prototype.recordLastPayment = function() {
  var path = this.userPath + 'timestamps/lastPayment';

  return Q.all([
    FirebaseClient.get(path),
    FirebaseClient.get(this.userPath + 'timestamps/registration'),
    FirebaseClient.set(this.userPath + 'timestamps/paymentOverdueNotification', null)
  ])
  .then(function(timestamps) {
    var lastPayment = timestamps[0];
    var registration = timestamps[1];

    lastPayment = lastPayment ? Math.max(Date.now(), oneMonthFrom(lastPayment)) : Math.max(Date.now(), whenTrialEnds(registration));

    FirebaseClient.set(path, lastPayment);
  }.bind(this));
};

UserData.prototype.saveBillingInfo = function(billingInfo) {
  var path = this.userPath + 'billingInfo';
  return FirebaseClient.set(path, billingInfo);
};

function oneMonthFrom(lastPayment) {
  return lastPayment + 31 * 24 * 3600 * 1000;
}

function whenTrialEnds(registration) {
  return registration + 31 * 24 * 3600 * 1000;
}

module.exports = UserData;

var Q = require('q');
Q.longStackSupport = true;

var FirebaseClient = require('./firebase-client');
