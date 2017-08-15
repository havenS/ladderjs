'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _policies = require('../policies');

var policies = _interopRequireWildcard(_policies);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getViewPath = function getViewPath(prefix, view) {
  return prefix ? prefix + '/' + view : view;
};
var getUrl = function getUrl(prefix, url) {
  return prefix ? '/' + prefix + url : url;
};
var authenticateUrl = function authenticateUrl(auth) {
  return !auth ? function (req, res, next) {
    return next();
  } : policies[auth];
};
var respond = function respond(res, data) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  res.setHeader('Content-Type', 'application/json');
  res.status(error ? 400 : 200);
  res.send((0, _stringify2.default)({
    error: error,
    data: data || {}
  }));
};

var processUrl = function processUrl(_ref, customControllerPath) {
  var action = _ref.action,
      auth = _ref.auth,
      controller = _ref.controller,
      method = _ref.method,
      prefix = _ref.prefix,
      url = _ref.url,
      view = _ref.view;
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var viewPath, controllerToUse, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!req.error) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', respond(res, null, req.error));

            case 2:
              viewPath = getViewPath(prefix, view);

              if (controller) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', res.render(viewPath));

            case 5:
              controllerToUse = void 0;
              _context.prev = 6;

              controllerToUse = require(customControllerPath + '/' + controller);
              _context.next = 21;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](6);
              _context.prev = 12;

              controllerToUse = require('../controllers/' + controller);
              _context.next = 21;
              break;

            case 16:
              _context.prev = 16;
              _context.t1 = _context['catch'](12);

              res.status(500);
              res.render('500', { error: String(_context.t0) });
              return _context.abrupt('return', res.end());

            case 21:
              _context.next = 23;
              return controllerToUse[action](req, res, next);

            case 23:
              data = _context.sent;

              if (!data) {
                _context.next = 26;
                break;
              }

              return _context.abrupt('return', view ? res.render(viewPath, data) : respond(res, data));

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[6, 10], [12, 16]]);
    }));

    return function (_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

module.exports = function (app) {
  var routes = [].concat((0, _toConsumableArray3.default)(app.routesToAdd || []), (0, _toConsumableArray3.default)(_routes2.default));
  var customControllerPath = '' + process.cwd() + app.controllersPath;

  routes.forEach(function (config) {
    app[config.method](getUrl(config.prefix, config.url), authenticateUrl(config.auth), processUrl(config, customControllerPath));
  });

  return app;
};