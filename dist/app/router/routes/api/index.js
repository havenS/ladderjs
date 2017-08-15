'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _attributes = require('./attributes');

var _attributes2 = _interopRequireDefault(_attributes);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

var _sites = require('./sites');

var _sites2 = _interopRequireDefault(_sites);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [].concat((0, _toConsumableArray3.default)(_attributes2.default), (0, _toConsumableArray3.default)(_categories2.default), (0, _toConsumableArray3.default)(_products2.default), (0, _toConsumableArray3.default)(_sites2.default));