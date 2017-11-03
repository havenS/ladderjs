'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  var ladderjs = app.ladderjs;


  var db = new _sequelize2.default(ladderjs.config.dbUrl, {
    logging: ladderjs.config.dbLogging === 'true' ? app.logger.info : false,
    operatorsAliases: ladderjs.config.sequelizeOperatorsAliases
  });
  app.db = db;
  app.models = {};
  app.registerModel = function (registration) {
    var _this = this;

    registration(this.db, function () {
      app.models = _this.db.models;
    });
  };
};