'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize) {
  var Variant = sequelize.define('variants', attributes, options);

  return Variant;
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attributes = {
  link: {
    type: _sequelize2.default.STRING
  },
  image: {
    type: _sequelize2.default.STRING
  },
  stock: {
    type: _sequelize2.default.INTEGER
  },
  price: {
    type: _sequelize2.default.STRING
  },
  rebate: {
    type: _sequelize2.default.STRING
  },
  promo: {
    type: _sequelize2.default.STRING
  }
};

var options = {
  freezeTableName: true
};