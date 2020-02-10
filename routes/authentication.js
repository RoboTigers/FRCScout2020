var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', (req, res, next) => {
  res.render('login', { errors: req.flash('error') });
});

router.post('/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res, next) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res, nex) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
