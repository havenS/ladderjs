'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureLogger = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = new _winston2.default.Logger({
  level: 'info',
  transports: [new _winston2.default.transports.Console({
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: function timestamp() {
      var d = new Date();
      return d.toISOString();
    }
  }), new _winston2.default.transports.File({
    filename: process.cwd() + '/ladderjs.log',
    maxsize: 5242880
  })]
});

var configureLogger = exports.configureLogger = function configureLogger(app) {
  logger.level = app.ladderjs.config.loggerLevel || logger.level;
  app.logger = logger;
  // app.logger = console
};

exports.default = logger;