'use strict';

module.exports = function (req, res, next) {
  if (badKey(req)) res.status(401).end('Bad key');
  else next();
};

function badKey(req) {
  return req.param('pass') !== process.env.KEY;
}
