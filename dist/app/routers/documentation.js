'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get('/docs/:uid?', _ContentController.index);
};

var _ContentController = require('../controllers/ContentController');