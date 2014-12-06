'use strict';

module.exports = function (req, res, next) {
  if (isPublic(req.path)) return next();
  if (isAuthenticated(req)) next();
  else res.status(401).end('Bad auth');
};

function isAuthenticated(req) {
  var hasPass = new RegExp('pass=' + process.env.KEY)
  return hasPass.test(req.originalUrl);
}

isPublic['/echo'] = true;

function isPublic(path) {
  return isPublic[path];
}
