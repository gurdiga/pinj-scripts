'use strict';

function ResponseIntegrityVeryfier() {
}

ResponseIntegrityVeryfier.prototype.valid = function(response) {
  return apiClient.response.valid(response, response.total);
};

module.exports = ResponseIntegrityVeryfier;

var TwocheckoutAPIClient = require('2checkout-node');
var apiClient = new TwocheckoutAPIClient({
  'apiUser':    process.env['2CO_API_USER'],
  'apiPass':    process.env['2CO_API_PASS'],
  'sellerId':   process.env['2CO_SID'],
  'secretWord': process.env['2CO_SECRET']
});
