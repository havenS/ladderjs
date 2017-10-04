'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var bodyParser = require('body-parser');

var addRoutes = require('../router');

module.exports = function (app, config) {
  app.use(bodyParser.json({
    strict: false
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use('/img', [express.static('' + process.cwd() + config.publicPath + '/img'), express.static(__dirname + '/../../../img')]);
  app.use('/', [express.static('' + process.cwd() + config.publicPath), express.static(__dirname + '/../../..')]);

  app.use(function (req, res, next) {
    req.ladderjs = app.ladderjs;
    next();
  });

  app.use(function (req, res, next) {
    res.locals.messages = {};
    try {
      res.locals.messages.error = req.flash('error');
      res.locals.messages.success = req.flash('success');
    } catch (e) {
      app.error(e);
    }
    res.locals.user = req.user;
    res.locals.currentUrl = req.originalUrl;
    res.locals.getUrl = req.ladderjs.getUrl;

    next();
  });

  addRoutes(app);

  app.use(function (req, res) {
    res.status(404).render('404');
  });
  app.use(function (err, req, res) {
    app.logger.error(err);
    res.status(500).render('500');
  });

  if (config.debugRoutes) {
    var debugRoutes = app._router.stack.filter(function (r) {
      return r.route;
    }).map(function (r) {
      return '' + (0, _keys2.default)(r.route.methods).map(function (m) {
        return m.toUpperCase() + ' - ';
      }) + r.route.path;
    });
    app.logger.info(debugRoutes);
  }
};