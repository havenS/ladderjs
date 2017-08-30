'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.logout = exports.login = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = function login(req, res, next) {
  var returnToField = req.body.returnTo;
  var returnToSession = req.session.returnTo;
  var returnTo = returnToSession || returnToField || '/';

  delete req.session.returnTo;

  _passport2.default.authenticate('local', function (err, user, info) {
    if (err) {
      req.flash('error', 'An error occured, please try again');
      res.redirect(req.ladderjs.getUrl('/login'));
      return;
    }

    if (!user) {
      req.flash('error', 'Invalid email or password');
      res.redirect(req.ladderjs.getUrl('/login'));
      return;
    }
    req.logIn(user, function (err) {
      if (err) {
        req.flash('error', 'Invalid email or password');
        next(err);
        return;
      }

      res.redirect(req.ladderjs.getUrl(returnTo));
      return;
    });
  })(req, res, next);
};

var logout = exports.logout = function logout(req, res) {
  req.logout();
  var returnTo = req.params.returnTo || '/login';
  res.redirect(req.ladderjs.getUrl(returnTo));
};

var signup = exports.signup = function signup(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var password_confirmation = req.body.password_confirmation;

  if (!email || !password || !password_confirmation) {
    req.flash('error', "All fields are required");
    return res.redirect(req.ladderjs.getUrl('/create-account'));
  }

  var salt = _bcrypt2.default.genSaltSync(10);
  var hashedPassword = _bcrypt2.default.hashSync(password, salt);

  var newUser = {
    email: email,
    password: password,
    password_confirmation: password_confirmation
  };

  _models.User.create(newUser).then(function () {
    res.redirect(req.ladderjs.getUrl('/login'));
    _passport2.default.authenticate('local', {
      successRedirect: req.ladderjs.getUrl('/manager')
    })({
      body: { email: email, password: password }
    });
  }).catch(function (error) {
    var message = void 0;
    switch (error.name) {
      case 'SequelizeUniqueConstraintError':
        message = 'An account using this email address already exists';
        break;
      default:
        message = error.message;
        break;
    }
    req.flash('error', message);
    res.redirect(req.ladderjs.getUrl('/create-account'));
  });
};