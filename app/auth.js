'use strict';

module.exports = function (req, res, next) {
  if (invalidAuth(req)) res.status(401).end('Bad auth');
  else next();
};

function invalidAuth(req) {
  return req.param('pass') !== process.env.KEY;
}
