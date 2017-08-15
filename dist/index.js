'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
var express = require('express');
var flash = require('connect-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressLess = require('express-less');
var basicAuth = require('basic-auth');

var setupPassport = require('./app/passport');
var configureRoutes = require('./app/router');

exports.default = function (_ref) {
  var _ref$debugRoutes = _ref.debugRoutes,
      debugRoutes = _ref$debugRoutes === undefined ? false : _ref$debugRoutes,
      _ref$port = _ref.port,
      port = _ref$port === undefined ? 8080 : _ref$port,
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? [] : _ref$routes,
      _ref$publicPath = _ref.publicPath,
      publicPath = _ref$publicPath === undefined ? '/public' : _ref$publicPath,
      _ref$stylesPath = _ref.stylesPath,
      stylesPath = _ref$stylesPath === undefined ? '/public/styles' : _ref$stylesPath,
      _ref$controllersPath = _ref.controllersPath,
      controllersPath = _ref$controllersPath === undefined ? '/controllers' : _ref$controllersPath,
      _ref$viewsPath = _ref.viewsPath,
      viewsPath = _ref$viewsPath === undefined ? '/views' : _ref$viewsPath;

  // Configure Express
  var app = express();

  app.routesToAdd = routes;
  app.controllersPath = controllersPath;

  app.set('view engine', 'pug');
  app.set('views', ['' + process.cwd() + viewsPath, __dirname + '/../views']);
  app.locals.compileDebug = process.env.NODE_ENV !== 'production';
  app.locals.cache = process.env.NODE_ENV === 'production';

  // Configures all used middleware
  app.use(cookieParser());

  app.use(session({
    secret: process.env.SESSION_TOKEN || '4564f6s4fdsfdfd',
    resave: true,
    saveUninitialized: true,
    store: new (require('session-file-store')(session))()
  }));
  app.use('/img', express.static(__dirname + '/../img'));
  app.use(express.static('' + process.cwd() + publicPath));
  app.use('/styles', [expressLess('' + process.cwd() + stylesPath, {
    cache: process.env.NODE_ENV === 'production',
    compress: process.env.NODE_ENV === 'production'
  }), expressLess(__dirname + '/../styles', {
    cache: process.env.NODE_ENV === 'production',
    compress: process.env.NODE_ENV === 'production'
  })]);

  app.use(flash());

  app.use(bodyParser.json({
    strict: false
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Configure authentication
  setupPassport(app);

  // Configure the flash message system
  app.use(function (req, res, next) {
    res.locals.messages = {};
    try {
      res.locals.messages.error = req.flash('error');
      res.locals.messages.success = req.flash('success');
    } catch (e) {}
    res.locals.user = req.user;
    res.locals.currentUrl = req.originalUrl;

    next();
  });

  configureRoutes(app);
  app.use(function (req, res) {
    res.status(404).render('404');
  });
  app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).render('500');
  });

  if (debugRoutes) {
    var _debugRoutes = app._router.stack.filter(function (r) {
      return r.route;
    }).map(function (r) {
      return '' + (0, _keys2.default)(r.route.methods).map(function (m) {
        return m.toUpperCase() + ' - ';
      }) + r.route.path;
    });
    console.log(_debugRoutes);
  }

  app.start = function () {
    // Configure routes with errors fallback pages
    port = port || process.env.PORT;
    this.listen(port);
    console.log('Server started on port ' + port);
  };

  return app;
};