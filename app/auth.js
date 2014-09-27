'use strict';

var basicAuth = require('basic-auth-connect');

module.exports = basicAuth(function(user, pass){
  return user === process.env.HTTP_USER &&
         pass === process.env.HTTP_PASS;
});
