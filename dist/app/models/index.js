'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _User = require('./User.js');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.registerModel(function (db, done) {
    (0, _User2.default)(db);

    done();
  });
};