'use strict';

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _documentation = require('./documentation');

var _documentation2 = _interopRequireDefault(_documentation);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (express) {
  var router = express.Router();

  (0, _home2.default)(router);
  (0, _documentation2.default)(router);
  (0, _auth2.default)(router);
  (0, _manager2.default)(router);
  (0, _api2.default)(router);

  return router;
};