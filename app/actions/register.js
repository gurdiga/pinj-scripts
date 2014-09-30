'use strict';

module.exports = function(req, res) {
  if (invalid(req)) {
    res.status(400).end();
    return;
  }

  sendEmail(req);
  updateFirebase(req);

  res.redirect('http://pinj.pentru.md/app.html#thank-you-message');
};

function invalid() {
  // TODO
  return false;
}

function sendEmail(req) {
  var email = require('../email-template.json');
  var text = JSON.stringify(req.query, null, 2);

  email.html = '<pre>' + text + '</pre>';
  email.text = text;

  nodemailer
  .createTransport(smtp(smtpConfig))
  .sendMail(email);
}

function updateFirebase(req) {
  /*jshint unused:false*/
}

var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');
var smtpConfig = require('../smtp-config.json');
