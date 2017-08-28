'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
var express = require('express');

var configureLogger = require('./app/configure/logger');
var configureVariables = require('./app/configure/variables');
var configureViews = require('./app/configure/views');
var configureStyles = require('./app/configure/styles');
var configureSession = require('./app/configure/session');
var configureRequest = require('./app/configure/request');
var configureAuth = require('./app/configure/auth');

var ladderjs = function ladderjs(conf) {
  var config = (0, _assign2.default)({}, {
    auth: null, // model, username field, password field, default login redirect url
    debugRoutes: false,
    controllersPath: '/controllers',
    loggerLevel: 'info',
    modelsPath: '/models',
    port: 8080,
    publicPath: '/public',
    routes: [],
    stylesPath: '/public/styles',
    stylesProcessor: 'less',
    viewsPath: '/views',
    disabledRoutes: []
  }, conf);

  var app = express();

  configureLogger(app, config);
  configureVariables(app, config);
  configureViews(app, config);
  configureStyles(app, config);
  configureSession(app);
  configureAuth(app);
  configureRequest(app, config);

  app.start = function () {
    var port = config.port || process.env.PORT;
    this.listen(port);
    this.logger.info('LadderJS server started on port ' + port);
  };

  return app;
};

module.exports = ladderjs;