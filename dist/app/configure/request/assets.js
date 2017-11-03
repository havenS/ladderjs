'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

exports.default = function (app, config) {
  app.use('/', [(0, _express.static)('' + process.cwd() + config.publicPath), (0, _express.static)(__dirname + '/../../..')]);
  app.use('/img', [(0, _express.static)('' + process.cwd() + config.publicPath + '/img'), (0, _express.static)(__dirname + '/../../../img')]);
};