'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sequelize = exports.db = exports.logger = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _sequelize = require('sequelize');

Object.defineProperty(exports, 'Sequelize', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sequelize).default;
  }
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _logger = require('./app/configure/logger');

var _logger2 = _interopRequireDefault(_logger);

var _db = require('./app/configure/db');

var _db2 = _interopRequireDefault(_db);

var _models = require('./app/models');

var _variables = require('./app/configure/variables');

var _variables2 = _interopRequireDefault(_variables);

var _views = require('./app/configure/views');

var _views2 = _interopRequireDefault(_views);

var _styles = require('./app/configure/styles');

var _styles2 = _interopRequireDefault(_styles);

var _session = require('./app/configure/session');

var _session2 = _interopRequireDefault(_session);

var _request = require('./app/configure/request');

var _request2 = _interopRequireDefault(_request);

var _auth = require('./app/configure/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

_dotenv2.default.config();

var app = {};
var ladderjs = function ladderjs(conf) {
  app = express();
  var config = (0, _assign2.default)({}, {
    dbUrl: process.env.DATABASE_URL || '',
    dbLogging: process.env.DB_LOGGING || false,
    apiPrefix: null,
    auth: null, // model, username field, password field, default login redirect url
    debugRoutes: false,
    controllersPath: '/controllers',
    loggerLevel: 'info',
    modelsPath: '/models',
    port: null,
    publicPath: '/public',
    routes: [],
    stylesPath: '/public/styles',
    stylesProcessor: 'less',
    viewsPath: '/views',
    disabledRoutes: []
  }, conf);

  (0, _variables2.default)(app, config);
  (0, _logger.configureLogger)(app);

  (0, _db.configureDb)(app);
  (0, _models.configureModels)(app);

  (0, _session2.default)(app);
  (0, _auth2.default)(app);
  (0, _styles2.default)(app);
  (0, _request2.default)(app);
  (0, _views2.default)(app);

  app.start = function () {
    var port = config.port || process.env.PORT;
    this.listen(port);
    this.logger.info('LadderJS server started on port ' + port);
  };

  return app;
};

exports.default = ladderjs;

module.exports = ladderjs;
var logger = exports.logger = _logger2.default;
var db = exports.db = _db2.default;