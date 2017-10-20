'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _expressLess = require('express-less');

var _expressLess2 = _interopRequireDefault(_expressLess);

var _nodeSassMiddleware = require('node-sass-middleware');

var _nodeSassMiddleware2 = _interopRequireDefault(_nodeSassMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  var config = app.ladderjs.config;

  if (config.stylesProcessor === 'sass') {
    app.use((0, _nodeSassMiddleware2.default)({
      src: '' + process.cwd() + config.stylesPath,
      dest: '' + process.cwd() + config.publicPath + '/styles',
      debug: false,
      outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'extended',
      prefix: '/styles'
    }));
    app.use('/styles', (0, _express.static)('' + process.cwd() + config.publicPath + '/styles'));

    app.use((0, _nodeSassMiddleware2.default)({
      src: __dirname + '/../../../styles/sass',
      dest: __dirname + '/styles/css',
      debug: false,
      outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'extended',
      prefix: '/styles'
    }));
    app.use('/styles', (0, _express.static)(__dirname + '/public/styles'));
  } else {
    app.use('/styles', [(0, _expressLess2.default)(__dirname + '/../../../styles/less', {
      cache: process.env.NODE_ENV === 'production',
      compress: process.env.NODE_ENV === 'production'
    }), (0, _expressLess2.default)('' + process.cwd() + config.stylesPath, {
      cache: process.env.NODE_ENV === 'production',
      compress: process.env.NODE_ENV === 'production'
    })]);
  }
};