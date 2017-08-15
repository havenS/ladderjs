'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var authorization, accessToken, token, website;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authorization = req.header('authorization');
            accessToken = authorization ? authorization.replace('Token ', '') : null;

            if (accessToken) {
              _context.next = 5;
              break;
            }

            req.error = 'MISSING_WEBSITE_ACCESS_TOKEN';
            return _context.abrupt('return', next());

          case 5:
            _context.next = 7;
            return _models.AccessToken.findOne({
              where: {
                token: accessToken
              }
            });

          case 7:
            token = _context.sent;

            if (token) {
              _context.next = 11;
              break;
            }

            req.error = 'UNKNOWN_WEBSITE_ACCESS_TOKEN';
            return _context.abrupt('return', next());

          case 11:
            _context.next = 13;
            return token.getWebsite({
              include: [{
                all: true
              }]
            });

          case 13:
            website = _context.sent;

            if (website) {
              _context.next = 17;
              break;
            }

            req.error = 'UNKNOWN_WEBSITE_ACCESS_TOKEN';
            return _context.abrupt('return', next());

          case 17:

            res.locals.website = website;
            res.locals.token = token;
            next();

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();