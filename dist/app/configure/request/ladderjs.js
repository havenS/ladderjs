"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  return function (req, res, next) {
    req.ladderjs = app.ladderjs;
    next();
  };
};