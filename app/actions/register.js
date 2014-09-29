'use strict';

module.exports = function(req, res) {
  sendEmail(req);
  updateSubscriptionPaymentStatus(req);
  saveUserBillingInfo(req);

  res.redirect('http://pinj.pentru.md/app.html#thank-you-message');
};

function sendEmail(req) {
  var email = require('../email-template.json');
  var text = JSON.stringify(req.body, null, 2);

  email.html = '<pre>' + text + '</pre>';
  email.text = text;

  nodemailer
  .createTransport(smtp(smtpConfig))
  .sendMail(email);
}

function updateSubscriptionPaymentStatus(req) {
  /*jshint unused:false*/
}

function saveUserBillingInfo(req) {
  /*jshint unused:false*/
}

var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');
var smtpConfig = require('../smtp-config.json');
