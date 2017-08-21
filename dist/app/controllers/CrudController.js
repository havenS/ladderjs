'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEntity = exports.updateEntity = exports.viewEntity = exports.createEntity = exports.newEntity = exports.indexEntity = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexEntity = exports.indexEntity = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, Model, logger) {
    var entities;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.info('CRUD - index');
            _context.next = 3;
            return Model.findAll();

          case 3:
            entities = _context.sent;
            return _context.abrupt('return', {
              entities: entities
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function indexEntity(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var newEntity = exports.newEntity = function newEntity() {
  return {};
};
var createEntity = exports.createEntity = function createEntity(req, res, Model, logger) {
  logger.info('CRUD - create');
};
var viewEntity = exports.viewEntity = function viewEntity(req, res, Model, logger) {
  logger.info('CRUD - view');
};
var updateEntity = exports.updateEntity = function updateEntity(req, res, Model, logger) {
  logger.info('CRUD - update');
};
var deleteEntity = exports.deleteEntity = function deleteEntity(req, res, Model, logger) {
  logger.info('CRUD - delete');
};