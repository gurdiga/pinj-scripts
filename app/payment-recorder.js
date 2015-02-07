'use strict';

module.exports = PaymentRecorder;

function PaymentRecorder() {
}

PaymentRecorder.prototype.record = function(response) {
  var email = response['pinj_email'];
  var userData = new UserData(email);

  var subscriptionId = response['merchant_product_id'];
  var billingInfo = _(response).pick('country', 'card_holder_name', 'street_address', 'street_address2', 'city', 'state', 'zip', 'phone', 'phone_extension', 'email');

  return Q.all([
    userData.setSubscription(subscriptionId),
    userData.recordPayment(),
    userData.recordLastPayment(),
    userData.saveBillingInfo(billingInfo)
  ]);
};

var Q = require('q');
Q.longStackSupport = true;
var _ = require('underscore');

var UserData = require('./user-data');
