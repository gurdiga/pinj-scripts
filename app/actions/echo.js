'use strict';

module.exports = function(req, res) {
  var to = req.param('to');

  if (to.substr(0, 1) === '/') to = req.get('Referer') + to;

  res.redirect(to);
};
