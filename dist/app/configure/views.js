'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _randomId = require('random-id');

var _randomId2 = _interopRequireDefault(_randomId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.set('view engine', 'pug');
  app.set('views', ['' + process.cwd() + app.ladderjs.config.viewsPath, __dirname + '/../../../views']);
  app.locals = (0, _extends3.default)({}, app.locals, {
    moment: _moment2.default,
    compileDebug: process.env.NODE_ENV !== 'production',
    cache: process.env.NODE_ENV === 'production',
    loadingElement: '',
    errorElement: '',
    ainclude: function ainclude(route, id) {
      var loadingElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : app.locals.loadingElement;
      var errorElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : app.locals.errorElement;

      var generate = false;
      if (!id) {
        id = (0, _randomId2.default)(10);
        generate = true;
      }
      return (generate ? '<div id="' + id + '"></div>' : '') + '\n      <script type="text/javascript">\n      $(function(){\n        $(\'#' + id + '\').html(\'' + loadingElement + '\')\n        $.post(\'/lai\', {route: \'' + route + '\'})\n        .done(function(data){\n          $(\'#' + id + '\').html(data)\n        })\n        .error(function(){\n          $(\'#' + id + '\').html(\'' + errorElement + '\')\n        })\n      })\n      </script>\n      ';
    }
  });
};