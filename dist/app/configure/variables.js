'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app, config) {
  var apiPrefix = config.apiPrefix || process.env.API_PREFIX;

  app.ladderjs = {
    apiPrefix: apiPrefix,
    getUrl: function getUrl(url) {
      return apiPrefix ? '' + apiPrefix + url : url;
    },
    config: config
  };
  app.auth = config.auth;
  app.routesToAdd = config.routes;
  app.policies = config.policies;
  app.disabledRoutes = config.disabledRoutes;
  app.controllersPath = '' + process.cwd() + config.controllersPath;
  app.modelsPath = '' + process.cwd() + config.modelsPath;
  app.locals.moment = _moment2.default;
};