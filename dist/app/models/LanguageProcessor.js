'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _child_process = require('child_process');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config$recast = _config2.default.recast,
    baseUrl = _config$recast.baseUrl,
    userSlug = _config$recast.userSlug,
    botSlug = _config$recast.botSlug,
    attributeKey = _config$recast.attributeKey,
    productKey = _config$recast.productKey,
    requestToken = _config$recast.requestToken,
    devToken = _config$recast.devToken;
// https://recast.ai/docs/gazette
// https://man.recast.ai/#bulk-creating-synonyms

var call = function call(route, method, data) {
  var devApi = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var url = '' + baseUrl + route;
  var token = devApi ? devToken : requestToken;
  return (0, _axios2.default)({
    method: method,
    url: url,
    data: data,
    headers: {
      'Authorization': 'Token ' + token,
      'Content-Type': 'application/json'
    }
  }).catch(function (e) {
    // console.log(e)
  });
};

var getWordVariation = function getWordVariation(word) {
  return new _promise2.default(function (resolve, reject) {
    (0, _child_process.exec)('python ' + process.cwd() + '/word/process.py ' + word, function (err, stdout, stderr) {
      if (err) {
        resolve([]);
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        resolve([]);
      }
    });
  });
};

var LanguageProcessor = {
  createSearchProduct: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(word) {
      var route, variations, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, currentWord, w, data, distantWord;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              route = 'users/' + userSlug + '/bots/' + botSlug + '/gazettes/' + productKey + '/synonyms/';
              _context.next = 3;
              return getWordVariation(word);

            case 3:
              variations = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 7;
              _iterator = (0, _getIterator3.default)([word].concat((0, _toConsumableArray3.default)(variations)).filter(function (word) {
                return word !== '';
              }));

            case 9:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 26;
                break;
              }

              currentWord = _step.value;
              w = currentWord.toLowerCase();
              data = {
                value: w,
                language: {
                  isocode: 'fr'
                }
              };
              _context.next = 15;
              return call('' + route + w, 'GET', null, true);

            case 15:
              distantWord = _context.sent;

              if (distantWord) {
                _context.next = 21;
                break;
              }

              _context.next = 19;
              return call('' + route, 'POST', data, true);

            case 19:
              _context.next = 23;
              break;

            case 21:
              _context.next = 23;
              return call('' + route + w, 'PUT', data, true);

            case 23:
              _iteratorNormalCompletion = true;
              _context.next = 9;
              break;

            case 26:
              _context.next = 32;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context['catch'](7);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 32:
              _context.prev = 32;
              _context.prev = 33;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 35:
              _context.prev = 35;

              if (!_didIteratorError) {
                _context.next = 38;
                break;
              }

              throw _iteratorError;

            case 38:
              return _context.finish(35);

            case 39:
              return _context.finish(32);

            case 40:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[7, 28, 32, 40], [33,, 35, 39]]);
    }));

    return function createSearchProduct(_x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  createSearchAttribute: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(word) {
      var route, variations, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, currentWord, w, data, distantWord;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              route = 'users/' + userSlug + '/bots/' + botSlug + '/gazettes/' + attributeKey + '/synonyms/';
              _context2.next = 3;
              return getWordVariation(word);

            case 3:
              variations = _context2.sent;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context2.prev = 7;
              _iterator2 = (0, _getIterator3.default)([word].concat((0, _toConsumableArray3.default)(variations)).filter(function (word) {
                return word !== '';
              }));

            case 9:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context2.next = 26;
                break;
              }

              currentWord = _step2.value;
              w = currentWord.toLowerCase();
              data = {
                value: w,
                language: {
                  isocode: 'fr'
                }
              };
              _context2.next = 15;
              return call('' + route + w, 'GET', null, true);

            case 15:
              distantWord = _context2.sent;

              if (distantWord) {
                _context2.next = 21;
                break;
              }

              _context2.next = 19;
              return call('' + route, 'POST', data, true);

            case 19:
              _context2.next = 23;
              break;

            case 21:
              _context2.next = 23;
              return call('' + route + w, 'PUT', data, true);

            case 23:
              _iteratorNormalCompletion2 = true;
              _context2.next = 9;
              break;

            case 26:
              _context2.next = 32;
              break;

            case 28:
              _context2.prev = 28;
              _context2.t0 = _context2['catch'](7);
              _didIteratorError2 = true;
              _iteratorError2 = _context2.t0;

            case 32:
              _context2.prev = 32;
              _context2.prev = 33;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 35:
              _context2.prev = 35;

              if (!_didIteratorError2) {
                _context2.next = 38;
                break;
              }

              throw _iteratorError2;

            case 38:
              return _context2.finish(35);

            case 39:
              return _context2.finish(32);

            case 40:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[7, 28, 32, 40], [33,, 35, 39]]);
    }));

    return function createSearchAttribute(_x3) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.default = LanguageProcessor;