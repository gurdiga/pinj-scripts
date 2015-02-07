'use strict';

describe('UserData', function() {
  this.timeout(5000);

  var userData;

  before(function() {
    userData = new UserData('test@test.com');
  });

  describe('recordPayment', function() {
    it('records a new item in the ./payments array', function() {
      return userData.recordPayment()
      .then(function() {
        return FirebaseClient.get(userData.userPath + 'payments');
      })
      .then(function(timestamps) {
        var lastTimestamp = timestamps.pop();
        expect(lastTimestamp).to.be.within(Date.now() - 3*1000, Date.now(),
          'last timestamp whould be within last 3 seconds');
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
