'use strict';

var moment = require('moment');
var sequelize = require('../sequelize');

module.exports = function (app, config) {
  var apiPrefix = config.apiPrefix || process.env.API_PREFIX;

  app.ladderjs = {
    apiPrefix: apiPrefix,
    getUrl: function getUrl(url) {
      return apiPrefix ? '' + apiPrefix + url : url;
    }
  };
  app.auth = config.auth;
  app.routesToAdd = config.routes;
  app.disabledRoutes = config.disabledRoutes;
  app.controllersPath = '' + process.cwd() + config.controllersPath;
  app.modelsPath = '' + process.cwd() + config.modelsPath;
  app.db = sequelize;
  app.locals.moment = moment;
};