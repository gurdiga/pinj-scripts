'use strict';

module.exports = function(req, res) {
  if (!responseIntegrityVeryfier.valid(req.query)) {
    res.status(400).end();
    return;
  }

  var emailText = JSON.stringify(req.query, null, 2);
  var emailMessage = new EmailMessage(emailHeaders, emailText);

  Q.all([
    emailSender.send(emailMessage),
    paymentRecorder.record(req.query)
  ])
  .then(function() {
    res.redirect('http://pinj.pentru.md/app.html#thank-you-message');
  })
  .catch(function(error) {
    res.status(500).send(error.message);
  });
};

var ResponseIntegrityVeryfier = require('../response-integrity-verifier');
var responseIntegrityVeryfier = new ResponseIntegrityVeryfier();

var EmailMessage = require('../email-message');
var emailHeaders = require('../email-headers.json');

var EmailSender = require('../email-sender');
var smtpConfig = {
  'port':   process.env.SMTP_PORT,
  'host':   process.env.SMTP_HOST,
  'name':   process.env.SMTP_NAME,
  'secure': process.env.SMTP_SECURE === 'true',
  'debug':  process.env.SMTP_DEBUG === 'true',
  'auth': {
    'user': process.env.SMTP_USER,
    'pass': process.env.SMTP_PASS
  }
};
var emailSender = new EmailSender(smtpConfig);

var FirebaseClient = require('../firebase-client');
var firebaseClient = new FirebaseClient(process.env.FIREBASE_URL);

var PaymentRecorder = require('../payment-recorder');
var paymentRecorder = new PaymentRecorder(firebaseClient);

var Q = require('q');
Q.longStackSupport = true;
