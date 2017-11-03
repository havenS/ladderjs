'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());

  var models = app.models,
      ladderjs = app.ladderjs;
  var config = ladderjs.config;
  var _config$auth = config.auth,
      model = _config$auth.model,
      id = _config$auth.id,
      username = _config$auth.username,
      password = _config$auth.password;


  var AuthModel = models[model];
  var idField = id;
  var usernameField = username;
  var passwordField = password;

  _passport2.default.use(new _passportLocal.Strategy({
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

  _passport2.default.serializeUser(function (user, done) {
    done(null, user[idField]);
  });

  _passport2.default.deserializeUser(function (id, done) {
    AuthModel.findOne({
      where: (0, _defineProperty3.default)({}, idField, id)
    }).then(function (user) {
      done(null, user);
    });
  });
};