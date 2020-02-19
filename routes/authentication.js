var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/api/isLoggedIn', (req, res, next) => {
  if (req.user !== null) {
    res.json({
      username: req.user.username,
      role: req.user.role
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/login',
  passport.authenticate('local', {
    failWithError: true
  }),
  (req, res, next) => {
    console.log('Successful login');
    return res.json({
      username: req.user.username,
      role: req.user.role
    });
  },
  (err, req, res, next) => {
    console.log('Failed login');
    return res.sendStatus(401);
  }
);

router.delete('/logout', (req, res, nex) => {
  req.logout();
  res.send(200);
});

module.exports = router;
