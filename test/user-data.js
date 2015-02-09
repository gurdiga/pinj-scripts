'use strict';

describe('UserData', function() {
  this.timeout(5000);

  var userData;

  before(function() {
    userData = new UserData('test@test.com');
  });

  describe('recordPayment', function() {
    it('records a new item in the ./payments array', function() {
      var paymentDetails = {
        'merchant_product_id': 'c15',
        'total': '3.00',
        'currency_code': 'USD',
        'quantity': 1,
        'product_id': 2,
        'pinj_email': 'test@tet.com',
        'card_holder_name': 'John DOE',
        'credit_card_processed': 'Y',
        'pay_method': 'CC',
        'order_number': '205592913279'
      };

      return userData.recordPayment(paymentDetails)
      .then(function() {
        return FirebaseClient.get(userData.userPath + 'payments');
      })
      .then(function(timestamps) {
        var lastTimestamp = timestamps.pop();
        expect(lastTimestamp).to.deep.equal(paymentDetails);
      });
    });

    after(function() {
      return FirebaseClient.set(userData.userPath + 'payments', null);
    });
  });
});

var UserData = require('app/user-data');
var FirebaseClient = require('app/firebase-client');
FirebaseClient.start(process.env.FIREBASE_URL, process.env.FIREBASE_SECRET);
