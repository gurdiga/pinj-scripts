'use strict';

var TwocheckoutAPIClient = require('2checkout-node');
var apiClient = new TwocheckoutAPIClient({
  'apiUser':    process.env['2CO_API_USER'],
  'apiPass':    process.env['2CO_API_PASS'],
  'sellerId':   process.env['2CO_SID'],
  'secretWord': process.env['2CO_SECRET']
});

module.exports = apiClient;
