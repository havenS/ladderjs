'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bulkCreateOrUpdate = exports.createOrUpdate = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOrUpdate = exports.createOrUpdate = function createOrUpdate(req, res) {
  var _res$locals = res.locals,
      website = _res$locals.website,
      token = _res$locals.token;

  upsertCategory(req.body, website, token);
  return req.body.id;
};

var bulkCreateOrUpdate = exports.bulkCreateOrUpdate = function bulkCreateOrUpdate(req, res) {
  var _res$locals2 = res.locals,
      website = _res$locals2.website,
      token = _res$locals2.token;

  updateAllCategories(req.body, website, token);
  return req.body.map(function (category) {
    return category.id;
  });
};

var updateAllCategories = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(categories, website, token) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, category;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = (0, _getIterator3.default)(categories);

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 12;
              break;
            }

            category = _step.value;
            _context.next = 9;
            return upsertCategory(category, website, token);

          case 9:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function updateAllCategories(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var upsertCategory = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(category, website, token) {
    var distantId, where, values, localCategory;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            distantId = category.id;

            delete category.id;

            where = {
              distantId: distantId,
              accessTokenId: token.id
            };
            values = (0, _extends3.default)({}, category, {
              distantId: distantId,
              accessTokenId: token.id,
              userId: website.userId
            });
            _context2.next = 6;
            return _models.Category.findOne({
              where: where
            });

          case 6:
            localCategory = _context2.sent;

            if (!localCategory) {
              _context2.next = 12;
              break;
            }

            _context2.next = 10;
            return _models.Category.update(values, {
              where: where
            });

          case 10:
            _context2.next = 14;
            break;

          case 12:
            _context2.next = 14;
            return _models.Category.create(values);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function upsertCategory(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();