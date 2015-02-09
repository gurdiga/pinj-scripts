'use strict';

describe('PaymentRecorder', function() {
  var PaymentRecorder, UserData;
  var paymentRecorder;

  beforeEach(function() {
    UserData = require('app/user-data');
    this.sinon.stub(UserData.prototype, 'setSubscription');
    this.sinon.stub(UserData.prototype, 'recordPayment');
    this.sinon.stub(UserData.prototype, 'recordLastPayment');
    this.sinon.stub(UserData.prototype, 'saveBillingInfo');

    PaymentRecorder = proxyquire('app/payment-recorder', {
      './user-data': UserData
    });
    paymentRecorder = new PaymentRecorder();
  });

  describe('record', function() {
    this.timeout(5000);

    var response;

    beforeEach(function() {
      response = {
        'pinj_email': 'test@test.com',
        'merchant_product_id': 42,
        'product_id': 2,
        'total': '3.00',
        'currency_code': 'USD',
        'quantity': '1',
        'credit_card_processed': 'Y',
        'pay_method': 'cc',
        'order_number': '01234567',
        'country': 'Moldova',
        'card_holder_name': 'John DOE',
        'street_address': 'first line',
        'street_address2': 'second line',
        'city': 'Chisinau',
        'state': 'Chisinau',
        'zip': '2000',
        'phone': '+37301234567',
        'phone_extension': '123',
        'email': 'test@test.com'
      };

      paymentRecorder.record(response);
    });

    it('sets subscription as on the response', function() {
      expect(UserData.prototype.setSubscription).to.have.been.calledWith(response['merchant_product_id']);
    });

    it('records the payment', function() {
      var expectedPaymentDetails = {
        'merchant_product_id': response['merchant_product_id'],
        'total': response['total'],
        'currency_code': response['currency_code'],
        'quantity': response['quantity'],
        'product_id': response['product_id'],
        'pinj_email': response['pinj_email'],
        'card_holder_name': response['card_holder_name'],
        'credit_card_processed': response['credit_card_processed'],
        'pay_method': response['pay_method'],
        'order_number': response['order_number']
      };

      expect(UserData.prototype.recordPayment).to.have.been.called;
      expect(UserData.prototype.recordPayment.firstCall.args[0]).to.deep.equal(expectedPaymentDetails);
    });

    it('records last payment', function() {
      expect(UserData.prototype.recordLastPayment).to.have.been.called;
    });

    it('saves the billing info', function() {
      var expectedSavedBillingInfo = {
        'country': response['country'],
        'card_holder_name': response['card_holder_name'],
        'street_address': response['street_address'],
        'street_address2': response['street_address2'],
        'city': response['city'],
        'state': response['state'],
        'zip': response['zip'],
        'phone': response['phone'],
        'phone_extension': response['phone_extension'],
        'email': response['email']
      };

      expect(UserData.prototype.saveBillingInfo).to.have.been.called;
      expect(UserData.prototype.saveBillingInfo.firstCall.args[0]).to.deep.equal(expectedSavedBillingInfo);
    });
  });

});
