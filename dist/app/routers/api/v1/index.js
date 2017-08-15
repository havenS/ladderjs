'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router, prefix) {
  var versionPrefix = prefix + version;

  /**
   * @api {any} /* website_token
   * @apiGroup Permission
   * @apiName website_token
   * 
   * @apiHeader (auth) {String} authorization the website token.
   * @apiHeaderExample {json} Header-Example:
   *     {
   *       "Authorization": "Token dfsf43FDSdfszdqs"
   *     }
   * 
   * @apiError MISSING_WEBSITE_ACCESS_TOKEN The <code>token</code> of the website is missing.
   * @apiError UNKNOWN_WEBSITE_ACCESS_TOKEN The <code>token</code> of the website does’nt match any existing website.
   */
  router.all(versionPrefix + "/*", _isWebsite2.default, function (req, res, next) {
    next();
  });

  (0, _sites2.default)(router, versionPrefix);
  (0, _categories2.default)(router, versionPrefix);
  (0, _attributes2.default)(router, versionPrefix);
  (0, _products2.default)(router, versionPrefix);
};

var _layouts = require('../../../helpers/layouts');

var _layouts2 = _interopRequireDefault(_layouts);

var _isWebsite = require('../../../policies/isWebsite');

var _isWebsite2 = _interopRequireDefault(_isWebsite);

var _sites = require('./sites');

var _sites2 = _interopRequireDefault(_sites);

var _categories = require('./categories');

var _categories2 = _interopRequireDefault(_categories);

var _attributes = require('./attributes');

var _attributes2 = _interopRequireDefault(_attributes);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '/v1';