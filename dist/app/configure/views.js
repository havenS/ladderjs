'use strict';

var _randomId = require('random-id');

var _randomId2 = _interopRequireDefault(_randomId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, config) {
  app.set('view engine', 'pug');
  app.set('views', ['' + process.cwd() + config.viewsPath, __dirname + '/../../../views']);
  app.locals.compileDebug = process.env.NODE_ENV !== 'production';
  app.locals.cache = process.env.NODE_ENV === 'production';
  app.locals.loadingElement = '';
  app.locals.errorElement = '';
  app.locals.ainclude = function (route) {
    var loadingElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : app.locals.loadingElement;
    var errorElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : app.locals.errorElement;

    var id = (0, _randomId2.default)(10);
    return '<div id="' + id + '">' + loadingElement + '</div>\n      <script type="text/javascript">\n        $(function(){\n          $.post(\'/lai\', {route: \'' + route + '\'})\n            .done(function(data){\n              $(\'#' + id + '\').html(data)\n            })\n            .error(function(){\n              $(\'#' + id + '\').html(\'' + errorElement + '\')\n            })\n        })\n      </script>\n      ';
  };
};