'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _ladderjs = require('./ladderjs');

var _ladderjs2 = _interopRequireDefault(_ladderjs);

var _parsers = require('./parsers');

var _parsers2 = _interopRequireDefault(_parsers);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

var _debugRoutes = require('./debugRoutes');

var _debugRoutes2 = _interopRequireDefault(_debugRoutes);

var _viewVariables = require('./viewVariables');

var _viewVariables2 = _interopRequireDefault(_viewVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  var config = app.ladderjs.config;


  (0, _assets2.default)(app, config);

  app.use(_parsers2.default);
  app.use((0, _ladderjs2.default)(app));
  app.use(_viewVariables2.default);

  (0, _errors2.default)(app);

  (0, _debugRoutes2.default)(app, config);
};