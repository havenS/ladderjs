'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routes
exports.default = [].concat((0, _toConsumableArray3.default)(_auth2.default), (0, _toConsumableArray3.default)(_global2.default));