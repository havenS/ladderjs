'use strict';

require('dotenv').config();
var express = require('express');

var configureLogger = require('./app/configure/logger');
var configureVariables = require('./app/configure/variables');
var configureViews = require('./app/configure/views');
var configureStyles = require('./app/configure/styles');
var configureSession = require('./app/configure/session');
var configureRequest = require('./app/configure/request');
var configureAuth = require('./app/configure/auth');

var ladderjs = function ladderjs(config) {
  var _config$auth = config.auth,
      auth = _config$auth === undefined ? null : _config$auth,
      _config$debugRoutes = config.debugRoutes,
      debugRoutes = _config$debugRoutes === undefined ? false : _config$debugRoutes,
      _config$controllersPa = config.controllersPath,
      controllersPath = _config$controllersPa === undefined ? '/controllers' : _config$controllersPa,
      _config$loggerLevel = config.loggerLevel,
      loggerLevel = _config$loggerLevel === undefined ? 'info' : _config$loggerLevel,
      _config$modelsPath = config.modelsPath,
      modelsPath = _config$modelsPath === undefined ? '/models' : _config$modelsPath,
      _config$port = config.port,
      port = _config$port === undefined ? 8080 : _config$port,
      _config$publicPath = config.publicPath,
      publicPath = _config$publicPath === undefined ? '/public' : _config$publicPath,
      _config$routes = config.routes,
      routes = _config$routes === undefined ? [] : _config$routes,
      _config$stylesPath = config.stylesPath,
      stylesPath = _config$stylesPath === undefined ? '/public/styles' : _config$stylesPath,
      _config$stylesProcess = config.stylesProcessor,
      stylesProcessor = _config$stylesProcess === undefined ? 'less' : _config$stylesProcess,
      _config$viewsPath = config.viewsPath,
      viewsPath = _config$viewsPath === undefined ? '/views' : _config$viewsPath;


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