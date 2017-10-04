"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testAsync = exports.render = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = exports.render = function render(req, res) {
  var route = req.body.route;

  return res.redirect(route);
};

var testAsync = exports.testAsync = function testAsync() {
  return new _promise2.default(function (resolve) {
    setTimeout(function () {
      resolve({ text: "Async Include Rendering test" });
    }, 2000);
  });
};