'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize) {
  var Product = sequelize.define('products', attributes, options);

  return Product;
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attributes = {
  name: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  distantId: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  description: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  link: {
    type: _sequelize2.default.STRING
  },
  image: {
    type: _sequelize2.default.STRING
  },
  price: {
    type: _sequelize2.default.STRING
  },
  rebate: {
    type: _sequelize2.default.STRING
  },
  promo: {
    type: _sequelize2.default.STRING
  },
  processed: {
    type: _sequelize2.default.BOOLEAN
  },
  accessTokenId: {
    type: _sequelize2.default.INTEGER
  }
};

var options = {
  freezeTableName: true
};