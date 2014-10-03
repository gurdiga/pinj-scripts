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
    console.error(error.stack);
    res.status(500).send(error.message);
  });
};

var ResponseIntegrityVeryfier = require('../response-integrity-verifier');
var responseIntegrityVeryfier = new ResponseIntegrityVeryfier();

var EmailMessage = require('../email-message');
var emailHeaders = require('../email-headers.json');

var EmailSender = require('../email-sender');
var emailSender = new EmailSender();

var PaymentRecorder = require('../payment-recorder');
var paymentRecorder = new PaymentRecorder();

var Q = require('q');
Q.longStackSupport = true;
