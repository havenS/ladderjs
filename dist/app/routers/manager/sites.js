'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router, prefix) {
  router.get(prefix + '/mes-sites', _SiteController.list);
  router.post(prefix + '/mes-sites', function (req, res, next) {
    req.body.id ? (0, _SiteController.update)(req, res, next) : (0, _SiteController.create)(req, res, next);
  });
  router.get(prefix + '/mes-sites/:id', _SiteController.get);
  router.post(prefix + '/mes-sites/:id', _SiteController.update);
};

var _SiteController = require('../../controllers/SiteController');