const ensureLoggedIn = function(req, res, next) {
  if (req.user == null && req.path.indexOf('/login') !== 0) {
    res.sendStatus(401);
  } else {
    next()
  }
}

module.exports = ensureLoggedIn;
