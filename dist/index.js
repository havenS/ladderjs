'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _logger = require('./app/configure/logger');

var _logger2 = _interopRequireDefault(_logger);

var _database = require('./app/configure/database');

var _database2 = _interopRequireDefault(_database);

var _models = require('./app/models');

var _models2 = _interopRequireDefault(_models);

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

var _router = require('./app/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

_dotenv2.default.config({ path: process.cwd() + '/.env' });

var defaultOptions = {
  apiPrefix: process.env.API_PREFIX || '',
  routes: [],
  disabledRoutes: [],
  dbUrl: process.env.DATABASE_URL || '',
  dbLogging: process.env.DATABASE_LOGGING || false,
  sequelizeOperatorsAliases: false,
  loggerLevel: 'info',
  auth: {
    model: 'users',
    id: 'id',
    username: 'email',
    password: 'password'
  },
  debugRoutes: false,
  port: process.env.PORT || 3000,
  controllersPath: '/controllers',
  modelsPath: '/models',
  publicPath: '/public',
  viewsPath: '/views',
  stylesPath: '/public/styles',
  stylesProcessor: 'less',
  sessionToken: process.env.SESSION_TOKEN || '4564f6s4fdsfdfd'
};
var ladder = {};

var ladderjs = function ladderjs(conf) {
  ladder = express();
  var config = (0, _extends3.default)({}, defaultOptions, {
    conf: conf
  });

  (0, _variables2.default)(ladder, config);
  (0, _logger2.default)(ladder);

  (0, _session2.default)(ladder);
  if (config.dbUrl !== '') {
    (0, _database2.default)(ladder);
    (0, _models2.default)(ladder);
    (0, _auth2.default)(ladder);
  }

  (0, _styles2.default)(ladder);
  (0, _router2.default)(ladder);
  (0, _request2.default)(ladder);
  (0, _views2.default)(ladder);

  ladder.start = function () {
    var port = config.port;
    this.listen(port);
    this.logger.info('LadderJS server started on port ' + port);
  };

  return ladder;
};

exports.default = ladderjs;
var app = exports.app = ladder;

module.exports = ladderjs;
module.exports.app = ladder;