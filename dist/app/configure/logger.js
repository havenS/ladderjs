'use strict';

var winston = require('winston');

module.exports = function (app, config) {
  var logger = new winston.Logger({
    level: config.loggerLevel || 'info',
    transports: [new winston.transports.Console({
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: function timestamp() {
        var d = new Date();
        return d.toISOString();
      }
    }), new winston.transports.File({
      filename: process.cwd() + '/ladderjs.log',
      maxsize: 5242880
    })]
  });
  app.logger = logger;
};