"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var render = exports.render = function render(req, res) {
  var route = req.body.route;

  return res.redirect(route);
};