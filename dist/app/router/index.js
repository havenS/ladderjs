'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shared = require('./config/shared');

var _crud = require('./config/crud');

var _regular = require('./config/regular');

exports.default = function (app) {
  (0, _shared.getRoutes)(app).forEach(function (config) {
    return config.crud ? (0, _crud.processCrudRoute)(app, config) : (0, _regular.processRoute)(app, config);
  });

  return app;
};