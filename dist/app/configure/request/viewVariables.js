'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  res.locals = (0, _extends3.default)({}, res.locals, {
    messages: {
      error: req.flash('error'),
      success: req.flash('success')
    },
    user: req.user,
    currentUrl: req.originalUrl,
    getUrl: req.ladderjs.getUrl
  });

  next();
};