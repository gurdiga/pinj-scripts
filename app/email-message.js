'use strict';

function EmailMessage(headers, text) {
  this.from    = headers.from;
  this.to      = headers.to;
  this.subject = headers.subject;
  this.text    = text;
}

module.exports = EmailMessage;
