'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _policies = require('../policies');

var policies = _interopRequireWildcard(_policies);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticateUrl = function authenticateUrl(auth) {
  return !auth ? function (req, res, next) {
    return next();
  } : policies[auth];
};
var respond = function respond(res, data) {
  var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  res.setHeader('Content-Type', 'application/json');
  res.status(error ? 400 : 200);
  res.send((0, _stringify2.default)({
    error: error,
    data: data || {}
  }));
};

var getView = function getView(view, url, crudType) {
  if (view) {
    return crudType ? view + '/' + crudType : view;
  }

  return crudType ? 'crud/' + crudType : url.replace('/', '');
};

var processUrl = function processUrl(_ref, app) {
  var action = _ref.action,
      auth = _ref.auth,
      controller = _ref.controller,
      method = _ref.method,
      url = _ref.url,
      view = _ref.view;
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var viewPath, controllerToUse, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!req.error) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', respond(res, null, req.error));

            case 2:
              viewPath = getView(view, url);

              if (controller) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', res.render(viewPath));

            case 5:
              controllerToUse = void 0;
              _context.prev = 6;

              controllerToUse = require(app.controllersPath + '/' + controller);
              _context.next = 20;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](6);
              _context.prev = 12;

              controllerToUse = require('../controllers/' + controller);
              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t1 = _context['catch'](12);

              app.logger.error(_context.t0);
              return _context.abrupt('return', res.status(500).render('500', { error: String(_context.t0) }));

            case 20:
              _context.prev = 20;
              _context.next = 23;
              return controllerToUse[action](req, res, next);

            case 23:
              data = _context.sent;

              if (!data) {
                _context.next = 26;
                break;
              }

              return _context.abrupt('return', view ? res.render(viewPath, data) : respond(res, data));

            case 26:
              return _context.abrupt('return', data);

            case 29:
              _context.prev = 29;
              _context.t2 = _context['catch'](20);

              app.logger.error(_context.t2);
              return _context.abrupt('return', res.status(500).render('500', { error: String(_context.t2) }));

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[6, 10], [12, 16], [20, 29]]);
    }));

    return function (_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var getCrudRoutes = function getCrudRoutes(url) {
  return {
    index: {
      url: url,
      method: 'get'
    },
    new: {
      url: url + '/new',
      method: 'get'
    },
    create: {
      url: url + '/create',
      method: 'post'
    },
    view: {
      url: url + '/:id',
      method: 'get'
    },
    edit: {
      url: url + '/:id',
      method: 'get'
    },
    update: {
      url: url + '/:id',
      method: 'post'
    },
    delete: {
      url: url + '/:id',
      method: 'delete'
    }
  };
};

var getCrudFields = function getCrudFields(Model) {
  var primaryField = void 0;
  var attributes = Model.attributes;
  var fields = (0, _keys2.default)(attributes).map(function (field) {
    if (field.primaryKey) {
      primaryField = attributes[field];
    }
    return {
      name: field,
      type: attributes[field].type.key,
      auto: !!attributes[field]._autoGenerated,
      primary: !!attributes[field].primaryKey,
      allowNull: attributes[field].allowNull
    };
  }).filter(function (field) {
    return !field.primary;
  });

  return {
    primaryField: primaryField,
    fields: fields
  };
};

var processCrud = function processCrud(type, _ref3, crudRoutes, Model) {
  var model = _ref3.model,
      url = _ref3.url,
      view = _ref3.view;
  return function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
      var action, viewPath, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              action = require('../controllers/CrudController')[type + 'Entity'];
              viewPath = getView(view, url, type);
              _context2.next = 4;
              return action(req, res, Model);

            case 4:
              data = _context2.sent;

              if (!data) {
                _context2.next = 10;
                break;
              }

              data = (0, _extends3.default)({
                modelName: model,
                newUrl: crudRoutes.new.url,
                createUrl: crudRoutes.create.url
              }, getCrudFields(Model), data);
              return _context2.abrupt('return', res.render(viewPath, data));

            case 10:
              return _context2.abrupt('return', res.redirect(crudRoutes.index.url));

            case 11:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x5, _x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }();
};

module.exports = function (app) {
  var routes = [].concat((0, _toConsumableArray3.default)(app.routesToAdd || []), (0, _toConsumableArray3.default)(_routes2.default));

  routes.filter(function (route) {
    return !app.disabledRoutes.includes(route.url);
  }).forEach(function (config) {
    if (config.crud) {
      var crudRoutes = getCrudRoutes(config.url);
      (0, _keys2.default)(crudRoutes).forEach(function (type) {
        var _crudRoutes$type = crudRoutes[type],
            url = _crudRoutes$type.url,
            method = _crudRoutes$type.method;

        var model = require(app.modelsPath + '/' + config.model);
        var Model = model.default ? model.default(app.db) : model(app.db);
        app[method](url, authenticateUrl(config.auth), processCrud(type, config, crudRoutes, Model));
      });
    } else {
      app[config.method](config.url, authenticateUrl(config.auth), processUrl(config, app));
    }
  });

  return app;
};