'use strict';

module.exports = PaymentRecorder;

function PaymentRecorder() {
}

PaymentRecorder.prototype.record = function(response) {
  var email = response['pinj_email'];
  var userData = new UserData(email);

  var subscriptionId = response['merchant_product_id'];
  var paymentDetails = _(response).pick('merchant_product_id', 'total',
    'currency_code', 'quantity', 'product_id', 'pinj_email', 'card_holder_name',
    'credit_card_processed', 'pay_method', 'order_number');
  var billingInfo = _(response).pick('country', 'card_holder_name',
    'street_address', 'street_address2', 'city', 'state', 'zip', 'phone',
    'phone_extension', 'email');

  return Q.all([
    userData.setSubscription(subscriptionId),
    userData.recordPayment(paymentDetails),
    userData.recordLastPayment(),
    userData.saveBillingInfo(billingInfo)
  ]);
};

var Q = require('q');
Q.longStackSupport = true;
var _ = require('underscore');

var UserData = require('./user-data');
