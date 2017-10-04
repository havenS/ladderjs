'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  var AuthModel = app.auth && app.auth.model ? app.auth.model : _models.User;
  var idField = app.auth && app.auth.id ? app.auth.id : 'id';
  var usernameField = app.auth && app.auth.username ? app.auth.username : 'email';
  var passwordField = app.auth && app.auth.password ? app.auth.password : 'password';

  passport.use(new LocalStrategy({
    usernameField: usernameField,
    passwordField: passwordField
  }, function (username, password, done) {
    AuthModel.findOne({
      where: (0, _defineProperty3.default)({}, usernameField, username)
    }).then(function (user) {
      if (user == null) {
        return done(null, false, { message: 'Incorrect credentials' });
      }

      if (user.authenticate(password)) {
        return done(null, user);
      }

      return done(null, false, { message: 'Incorrect credentials.' });
    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user[idField]);
  });

  passport.deserializeUser(function (id, done) {
    AuthModel.findOne({
      where: (0, _defineProperty3.default)({}, idField, id)
    }).then(function (user) {
      done(null, user);
    });
  });
};