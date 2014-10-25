'use strict';

var url = require('url');

module.exports = function(req, res) {
  var to = req.param('to');
  var referer = req.get('Referer');

  if (!to || !referer) return res.redirect('back');

  if (to.substr(0, 1) === '/') {
    referer = url.parse(referer);
    to = referer.protocol + '//' + referer.host + to;
  }

  res.redirect(to);
};
