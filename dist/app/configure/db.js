'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureDb = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = {};

var configureDb = exports.configureDb = function configureDb(app) {
  sequelize = new _sequelize2.default(app.ladderjs.config.dbUrl, {
    logging: app.ladderjs.config.dbLoggin === 'true' ? app.logger.info : false
  });
  app.db = sequelize;
};

exports.default = sequelize;