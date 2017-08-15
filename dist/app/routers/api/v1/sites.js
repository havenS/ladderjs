'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router, prefix) {
  /**
   * @apiVersion 1.0.0
   * @api {get} /sites/status Status
   * @apiPermission website_token
   * @apiName GetStatus
   * @apiGroup Sites
   *
   * @apiSuccess {Object} status Object containing the statuses.
   * @apiSuccess {Boolean} status.connected If the API can connect to the site
   * @apiSuccess {Boolean} status.initialConfig If the site has catalog data 
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "connected": true,
   *    "initialConfig": false
   *  }
   */
  router.get(prefix + '/sites/status', _SiteController.getStatus);
};

var _SiteController = require('../../../controllers/api/SiteController');