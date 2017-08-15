'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bulkCreateOrUpdate = exports.createOrUpdate = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOrUpdate = exports.createOrUpdate = function createOrUpdate(req, res) {
  var _res$locals = res.locals,
      website = _res$locals.website,
      token = _res$locals.token;

  upsertAttribute(req.body, website, token);
  return req.body.id;
};

var bulkCreateOrUpdate = exports.bulkCreateOrUpdate = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    var _res$locals2, website, token;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _res$locals2 = res.locals, website = _res$locals2.website, token = _res$locals2.token;

            updateAllAttributes(req.body, website, token);
            return _context.abrupt('return', req.body.map(function (attribute) {
              return attribute.id;
            }));

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function bulkCreateOrUpdate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var updateAllAttributes = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(attributes, website, token) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, attribute;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 3;
            _iterator = (0, _getIterator3.default)(attributes);

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 12;
              break;
            }

            attribute = _step.value;
            _context2.next = 9;
            return upsertAttribute(attribute, website, token);

          case 9:
            _iteratorNormalCompletion = true;
            _context2.next = 5;
            break;

          case 12:
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 18:
            _context2.prev = 18;
            _context2.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context2.prev = 21;

            if (!_didIteratorError) {
              _context2.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context2.finish(21);

          case 25:
            return _context2.finish(18);

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function updateAllAttributes(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var upsertAttribute = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(attribute, website, token) {
    var distantId, where, values, localAttribute;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            distantId = attribute.id;

            delete attribute.id;

            where = {
              distantId: distantId,
              accessTokenId: token.id
            };
            values = (0, _extends3.default)({}, attribute, {
              distantId: distantId,
              accessTokenId: token.id,
              userId: website.userId
            });
            _context3.next = 6;
            return _models.Attribute.findOne({
              where: where
            });

          case 6:
            localAttribute = _context3.sent;

            if (!localAttribute) {
              _context3.next = 12;
              break;
            }

            _context3.next = 10;
            return _models.Attribute.update(values, {
              where: where
            });

          case 10:
            _context3.next = 14;
            break;

          case 12:
            _context3.next = 14;
            return _models.Attribute.create(values);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function upsertAttribute(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();