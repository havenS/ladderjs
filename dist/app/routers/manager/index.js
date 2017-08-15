'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.all(prefix + "/*", _isAuthenticated2.default, function (req, res, next) {
    next();
  });

  router.get(prefix + '/tableau-de-bord', function (req, res) {
    res.render('dashboard', {
      layout: _layouts2.default.manager
    });
  });

  (0, _sites2.default)(router, prefix);
};

var _sites = require('./sites');

var _sites2 = _interopRequireDefault(_sites);

var _layouts = require('../../helpers/layouts');

var _layouts2 = _interopRequireDefault(_layouts);

var _isAuthenticated = require('../../policies/isAuthenticated');

var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = '/manager';