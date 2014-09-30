'use strict';

function ResponseIntegrityVeryfier() {
}

ResponseIntegrityVeryfier.prototype.valid = function(response) {
  return apiClient.response.valid(response, response.total);
};

module.exports = ResponseIntegrityVeryfier;

var apiClient = require('./2co-api-client');
