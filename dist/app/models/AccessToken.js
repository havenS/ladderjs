'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize) {
  var AccessToken = sequelize.define('access_token', attributes, options);

  AccessToken.beforeValidate(function (accessToken, options) {
    accessToken.token = accessToken.token ? accessToken.token : generateToken();
  });

  AccessToken.prototype.generateToken = generateToken;

  return AccessToken;
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attributes = {
  token: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  lang: {
    type: _sequelize2.default.ENUM(_helpers.languages.map(function (l) {
      return l.id;
    })),
    allowNull: false
  }
};

var options = {
  freezeTableName: true
};

var generateToken = function generateToken() {
  return (0, _md2.default)(new Date() + '8d4f3156a159ecb8dbddee464117088d0ef609e6');
};