'use strict';

var SMTP_CONFIG = {
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

function EmailSender() {
  this.transport = nodemailer.createTransport(smtp(SMTP_CONFIG));
}

EmailSender.prototype.send = function(message) {
  return Q.invoke(this.transport, 'sendMail', message);
};

module.exports = EmailSender;

var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');
var Q = require('q');
Q.longStackSupport = true;
