'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = function (sequelize) {
  var Attribute = sequelize.define('attributes', attributes, options);

  Attribute.beforeUpsert(sendToLP);

  return Attribute;
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _LanguageProcessor = require('./LanguageProcessor');

var _LanguageProcessor2 = _interopRequireDefault(_LanguageProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attributes = {
  name: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  value: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  distantId: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  processed: {
    type: _sequelize2.default.BOOLEAN
  }
};

var options = {
  freezeTableName: true
};

var sendToLP = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(instance) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _LanguageProcessor2.default.createSearchAttribute(instance.name).then;

          case 2:
            _context.next = 4;
            return _LanguageProcessor2.default.createSearchAttribute(instance.value);

          case 4:
            instance.processed = true;

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function sendToLP(_x) {
    return _ref.apply(this, arguments);
  };
}();