'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getView = exports.respond = exports.authenticateUrl = exports.getRoutes = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _policies = require('../../policies');

var defaultPolicies = _interopRequireWildcard(_policies);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRoutes = exports.getRoutes = function getRoutes(app) {
  return [].concat((0, _toConsumableArray3.default)(_routes2.default.filter(function (route) {
    return !app.ladderjs.config.disabledRoutes.includes(route.url);
  })), (0, _toConsumableArray3.default)(app.routesToAdd || []));
};

var authenticateUrl = exports.authenticateUrl = function authenticateUrl(auth, appPolicies) {
  if (!auth) {
    return function (req, res, next) {
      return next();
    };
  }
  var policies = (0, _extends3.default)({}, defaultPolicies, appPolicies);

  return policies[auth];
};

var respond = exports.respond = function respond(res, data) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  res.setHeader('Content-Type', 'application/json');
  res.status(error ? 400 : 200);
  res.send((0, _stringify2.default)({
    error: error,
    data: data || {}
  }));
};

var getView = exports.getView = function getView(view, url, crudType) {
  if (view) {
    return crudType ? view + '/' + crudType : view;
  }

  return crudType ? 'crud/' + crudType : url.replace('/', '');
};