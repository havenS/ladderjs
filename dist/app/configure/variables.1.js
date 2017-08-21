'use strict';

var sequelize = require('../sequelize');

module.exports = function (app, config) {
  app.routesToAdd = config.routes;
  app.controllersPath = '' + process.cwd() + config.controllersPath;
  app.modelsPath = '' + process.cwd() + config.modelsPath;
  app.db = sequelize;
};