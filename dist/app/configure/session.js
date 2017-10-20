'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use((0, _cookieParser2.default)());

  app.use((0, _expressSession2.default)({
    secret: process.env.SESSION_TOKEN || '4564f6s4fdsfdfd',
    resave: true,
    saveUninitialized: true,
    store: new (require('session-file-store')(_expressSession2.default))()
  }));

  app.use((0, _connectFlash2.default)());
};