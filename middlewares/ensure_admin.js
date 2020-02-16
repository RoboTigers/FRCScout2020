const ensureAdmin = function(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else if (req.user) {
    res.sendStatus(403);
  } else {
    res.sendStatus(401);
  }
}

module.exports = ensureAdmin;
