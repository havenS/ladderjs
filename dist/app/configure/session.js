'use strict';

var session = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

module.exports = function (app) {
  app.use(cookieParser());

  app.use(session({
    secret: process.env.SESSION_TOKEN || '4564f6s4fdsfdfd',
    resave: true,
    saveUninitialized: true,
    store: new (require('session-file-store')(session))()
  }));

  app.use(flash());
};