var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var flash = require('connect-flash');

// AUTHENTICATION
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// ROUTES
var authenticationRouter = require('./routes/authentication');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var matchesRouter = require('./routes/matchesRouter');
var pitNavRouter = require('./routes/pitNavRouter');
var pitFormRouter = require('./routes/pitFormRouter');
var competitionRouter = require('./routes/competitionRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: process.env.APPLICATION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (req.user == null && req.path.indexOf('/login') !== 0) {
    res.redirect('/login');
  } else {
    next()
  }
});
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', authenticationRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/api', matchesRouter);
app.use('/api', pitNavRouter);
app.use('/api', pitFormRouter);
app.use('/', competitionRouter);

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// PASSPORT CONFIGURATION
var db = require('./db');
var argon2 = require('argon2');

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.query('SELECT * FROM users WHERE username = $1 LIMIT 1', [username]).then((result) => {
      const user = result.rows[0];

      if (!user) {
        return done(null, false, 'User not found or credentials not valid');
      }

      argon2.verify(user.password, password).then((correct) => {
        if (correct) {
          return done(null, user);
        } else {
          return done(null, false, 'User not found or credentials not valid');
        }
      });
    })
    .catch((err) => {
      return done(null, false, 'An unknown error occurred');
    });
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user.user_id);
});

passport.deserializeUser(function(user_id, done) {
  db.query('SELECT * FROM users WHERE user_id = $1 LIMIT 1', [user_id]).then((result) => {
    return done(null, result.rows[0]);
  }).catch((err) => {
    return done(err);
  });
});

module.exports = app;
