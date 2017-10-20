'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataAsync = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataAsync = exports.dataAsync = function dataAsync() {
  return new _promise2.default(function (resolve) {
    setTimeout(function () {
      resolve({
        data: [{ id: 1, firstname: 'John', lastname: 'Doe' }, { id: 2, firstname: 'Bob', lastname: 'Roberson' }, { id: 3, firstname: 'Allan', lastname: 'Roberts' }]
      });
    }, 2000);
  });
};