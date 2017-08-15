'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sequelize = exports.User = undefined;

var _User = require('./User.js');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = require('../sequelize.js');

var user = (0, _User2.default)(connection);

var User = exports.User = user;

var Sequelize = exports.Sequelize = connection;