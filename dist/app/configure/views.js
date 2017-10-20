'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _randomId = require('random-id');

var _randomId2 = _interopRequireDefault(_randomId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.set('view engine', 'pug');
  app.set('views', ['' + process.cwd() + app.ladderjs.config.viewsPath, __dirname + '/../../../views']);
  app.locals.compileDebug = process.env.NODE_ENV !== 'production';
  app.locals.cache = process.env.NODE_ENV === 'production';
  app.locals.loadingElement = '';
  app.locals.errorElement = '';
  app.locals.ainclude = function (route, id) {
    var loadingElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : app.locals.loadingElement;
    var errorElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : app.locals.errorElement;

    var generate = false;
    if (!id) {
      id = (0, _randomId2.default)(10);
      generate = true;
    }
    return (generate ? '<div id="' + id + '"></div>' : '') + '\n      <script type="text/javascript">\n        $(function(){\n          $(\'#' + id + '\').html(\'' + loadingElement + '\')\n          $.post(\'/lai\', {route: \'' + route + '\'})\n            .done(function(data){\n              $(\'#' + id + '\').html(data)\n            })\n            .error(function(){\n              $(\'#' + id + '\').html(\'' + errorElement + '\')\n            })\n        })\n      </script>\n      ';
  };
};