'use strict';

function PaymentRecorder(firebaseClient) {
  this.firebaseClient = firebaseClient;
}

PaymentRecorder.prototype.record = function(response) {
  var email = response['pinj_email'];
  var userData = new UserData(this.firebaseClient, email);

  var subscriptionId = response['merchant_product_id'];
  var billingInfo = _(response).pick('country', 'card_holder_name', 'street_address', 'street_address2', 'city', 'state', 'zip', 'phone', 'phone_extension', 'email');

  return Q.all([
    userData.setSubscription(subscriptionId),
    userData.recordLastPayment(),
    userData.saveBillingInfo(billingInfo)
  ]);
};

module.exports = PaymentRecorder;

var Q = require('q');
Q.longStackSupport = true;
var _ = require('underscore');

var UserData = require('./user-data');
