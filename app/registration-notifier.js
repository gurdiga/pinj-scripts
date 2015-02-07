'use strict';

function RegistrationNotifier() {
  this.initialChildrenEnumeration = true;

  listenToChildAddedOnFirebaseRef(this);
  skipInitialChildrenEnumeration(this);
}

function listenToChildAddedOnFirebaseRef(self) {
  FirebaseClient.getRef()
  .then(function(ref) {
    ref.child('/data').on('child_added', function(childSnapshot) {
      if (self.initialChildrenEnumeration) return;
      notifyAbout(childSnapshot.key(), childSnapshot.val());
    });
  });
}

function skipInitialChildrenEnumeration(self) {
  setTimeout(function() {
    self.initialChildrenEnumeration = false;
  }, 5000);
}

function notifyAbout(aid, data) {
  var email = aid.replace(/:/g, '.');

  if (email.substr(-9) === '@test.com') return console.log('Would have sent an email to ' + email + ' if it wasn’t a test account');
  if (email.substr(0, 8) === 'gurdiga+') return;

  var text = 'New user’s email address: ' + email + '\n\n' +
    'Data: ' + JSON.stringify(data, null, 2);

  var emailMessage = new EmailMessage({
    'from': 'registration-notifier@pinj.pentru.md',
    'to': 'info@pinj.pentru.md',
    'subject': 'New account registration'
  }, text);

  emailSender.send(emailMessage)
  .catch(function(error) {
    console.error('Failed to send notification email: ', error);
  });
}

module.exports = RegistrationNotifier;
var Q = require('q');
Q.longStackSupport = true;

var EmailSender = require('./email-sender');
var emailSender = new EmailSender();

var EmailMessage = require('./email-message');
var FirebaseClient = require('./firebase-client');
