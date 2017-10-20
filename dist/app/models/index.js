'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.configureModels = undefined;

var _User = require('./User.js');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = void 0;

var configureModels = exports.configureModels = function configureModels(app) {
  user = (0, _User2.default)(app.db);
};

var User = exports.User = user;