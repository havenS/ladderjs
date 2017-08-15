'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.view = exports.update = exports.create = exports.index = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _helpers = require('../helpers');

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getWebsite = function getWebsite(req, id, res) {
  return new _promise2.default(function (resolve, reject) {
    req.user.getWebsites({
      include: [{
        model: _models.AccessToken,
        include: [_models.Product, _models.Category, _models.Attribute]
      }, {
        model: _models.User
      }],
      where: { id: id }
    }).then(function (websites) {
      var site = websites[0];
      if (!site) {
        req.flash('error', 'Le site demandé est introuvable');
        res.redirect('/manager/mes-sites');
      } else {
        resolve(site);
      }
    });
  });
};

var index = exports.index = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.user.getWebsites({
              include: {
                all: true
              }
            }).then(function (websites) {
              return {
                languages: _helpers.languages,
                platforms: _helpers.platforms,
                websites: websites
              };
            });

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function index(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var create = exports.create = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var _req$body, name, domain, platform, lang, website, accessToken;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, domain = _req$body.domain, platform = _req$body.platform, lang = _req$body.lang;
            _context2.prev = 1;
            _context2.next = 4;
            return _models.Website.create({
              name: name,
              domain: domain,
              platform: platform
            });

          case 4:
            website = _context2.sent;
            _context2.next = 7;
            return website.setUser(req.user);

          case 7:
            _context2.next = 9;
            return _models.AccessToken.create({
              lang: lang
            });

          case 9:
            accessToken = _context2.sent;
            _context2.next = 12;
            return accessToken.setWebsite(website);

          case 12:

            req.flash('success', 'Votre site a bien été ajouté');
            res.redirect(req.headers.referer);
            _context2.next = 21;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2['catch'](1);

            console.error(_context2.t0);
            req.flash('error', 'Une erreur s’est produite, veuillez essayer à nouveau');
            res.redirect(req.headers.referer);

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 16]]);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var update = exports.update = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var id, _req$body2, name, domain, platform, site;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, name = _req$body2.name, domain = _req$body2.domain, platform = _req$body2.platform;
            _context3.prev = 2;
            _context3.next = 5;
            return getWebsite(req, id, res);

          case 5:
            site = _context3.sent;
            _context3.next = 8;
            return site.update({
              name: name || site.name,
              domain: domain || site.domain,
              platform: platform || site.platform
            });

          case 8:

            req.flash('success', 'Votre site a bien été modifié');
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3['catch'](2);

            console.error(_context3.t0);
            req.flash('error', 'Une erreur s’est produite, veuillez essayer à nouveau');

          case 15:
            res.redirect(req.headers.referer);

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[2, 11]]);
  }));

  return function update(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var view = exports.view = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getWebsite(req, req.params.id, res).then(function (site) {
              return {
                languages: _helpers.languages,
                platforms: _helpers.platforms,
                site: site
              };
            });

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function view(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();