'use strict';

module.exports = function(req, res) {
  var emailOptions = {
    to: 'gurdiga@gmail.com',
    html: '<pre>' + JSON.stringify(req.body, null, 2) + '</pre>',
    text: 'Please use an email program capable of rendering HTML messages',
    from: 'PINJ Payment Registrar <payment-registrar@pinj.pentru.md>',
    subject: 'Testing Mandrill'
  };

  var transport = getTransport();

  transport.sendMail(emailOptions);

  res.status(200).send('OK');
};

function getTransport() {
  var transportOptions = {
    'port': '587',
    'host': 'smtp.mandrillapp.com',
    'secure': false,
    'name': 'heroku.com',
    'debug': true,
    'auth': {
      'user': 'app30088942@heroku.com',
      'pass': 'd9Bl3rOqlCXqyDF5wik5UA'
    }
  };
  var transport = require('nodemailer-smtp-transport');

  return nodemailer.createTransport(transport(transportOptions));
}

var nodemailer = require('nodemailer');
