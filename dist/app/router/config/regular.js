'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processRoute = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _shared = require('./shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processUrl = function processUrl(_ref, app) {
  var action = _ref.action,
      controller = _ref.controller,
      url = _ref.url,
      view = _ref.view;
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var viewPath, controllerToUse, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!req.error) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', (0, _shared.respond)(res, null, req.error));

            case 2:
              viewPath = (0, _shared.getView)(view, url);

              if (controller) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', res.render(viewPath));

            case 5:
              controllerToUse = void 0;
              _context.prev = 6;

              controllerToUse = require(app.controllersPath + '/' + controller);
              _context.next = 20;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](6);
              _context.prev = 12;

              controllerToUse = require('../controllers/' + controller);
              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t1 = _context['catch'](12);

              app.logger.error(_context.t0);
              return _context.abrupt('return', res.status(500).render('500', { error: String(_context.t0) }));

            case 20:
              _context.prev = 20;
              _context.next = 23;
              return controllerToUse[action](req, res, next);

            case 23:
              data = _context.sent;

              if (!data) {
                _context.next = 26;
                break;
              }

              return _context.abrupt('return', view ? res.render(viewPath, data) : (0, _shared.respond)(res, data));

            case 26:
              return _context.abrupt('return', data);

            case 29:
              _context.prev = 29;
              _context.t2 = _context['catch'](20);

              app.logger.error(_context.t2);
              return _context.abrupt('return', res.status(500).render('500', { error: String(_context.t2) }));

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[6, 10], [12, 16], [20, 29]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var processRoute = exports.processRoute = function processRoute(app, config) {
  app[config.method](app.ladderjs.getUrl(config.url, app), function (req, res, next) {
    return (0, _shared.authenticateUrl)(config.auth, app.policies)(req, res, next, config);
  }, processUrl(config, app));
};