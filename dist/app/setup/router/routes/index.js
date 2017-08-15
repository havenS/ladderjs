'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.prefixes = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Example route:
{
	"key": "dashboard",
	"method": "get", 	// method used
	"prefix": "manager 		// url matching the route
	"url": "/", 		// url matching the route
	"controller": null, // controller to be used
	"action": null,		// method in that controller to use
	"auth": "isAuthenticated",		// if need authentication and the role the user needs to be granted to access the route
	"view": "index"		// the view used
}
*/

// Routes
var prefixes = exports.prefixes = {
	apiv1: 'api/v1',
	manager: 'manager'
};

exports.default = [].concat((0, _toConsumableArray3.default)(_auth2.default), (0, _toConsumableArray3.default)(_global2.default), (0, _toConsumableArray3.default)(_manager2.default), (0, _toConsumableArray3.default)(_api2.default));