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
  return this.firebaseClient.set(path, this.firebaseClient.NOW);
};

UserData.prototype.saveBillingInfo = function(billingInfo) {
  var path = this.userPath + 'billingInfo';
  return this.firebaseClient.set(path, billingInfo);
};

module.exports = UserData;
