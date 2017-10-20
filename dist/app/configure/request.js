'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  var config = app.ladderjs.config;

  app.use(_bodyParser2.default.json({
    strict: false
  }));
  app.use(_bodyParser2.default.urlencoded({
    extended: true
  }));

  app.use('/', [(0, _express.static)('' + process.cwd() + config.publicPath), (0, _express.static)(__dirname + '/../../..')]);
  app.use('/img', [(0, _express.static)('' + process.cwd() + config.publicPath + '/img'), (0, _express.static)(__dirname + '/../../../img')]);

  app.use(function (req, res, next) {
    req.ladderjs = app.ladderjs;
    next();
  });

  app.use(function (req, res, next) {
    res.locals.messages = {
      error: [],
      success: []
    };
    try {
      res.locals.messages.error = req.flash('error');
      res.locals.messages.success = req.flash('success');
    } catch (e) {
      app.logger.error(e);
    }
    res.locals.user = req.user;
    res.locals.currentUrl = req.originalUrl;
    res.locals.getUrl = req.ladderjs.getUrl;

    next();
  });

  (0, _router2.default)(app);

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