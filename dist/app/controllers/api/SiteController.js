'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatus = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStatus = exports.getStatus = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var token, categories, products;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = res.locals.token;
            _context.next = 3;
            return token.getCategories();

          case 3:
            categories = _context.sent;
            _context.next = 6;
            return token.getProducts();

          case 6:
            products = _context.sent;
            return _context.abrupt('return', {
              connected: true,
              initialConfig: categories.length > 0 && products.length > 0
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getStatus(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();