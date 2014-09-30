'use strict';

function EmailSender(smtpConfig) {
  this.transport = nodemailer.createTransport(smtp(smtpConfig));
}

EmailSender.prototype.send = function(message) {
  return Q.invoke(this.transport, 'sendMail', message);
};

module.exports = EmailSender;

var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');

var Q = require('q');
Q.longStackSupport = true;
