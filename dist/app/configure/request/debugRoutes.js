"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app, config) {
  if (config.debugRoutes) {
    var debugRoutes = app._router.stack.filter(function (r) {
      return r.route;
    }).map(function (r) {
      return "" + (0, _keys2.default)(r.route.methods).map(function (m) {
        return m.toUpperCase() + " - ";
      }) + r.route.path;
    });
    app.logger.info(debugRoutes);
  }
};