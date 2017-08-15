'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router, prefix) {
  /**
   * @apiDefine AttributesBlock
   * @apiParam {String} id Attribute id on your store.
   * @apiParam {String} name Attribute name.
   * @apiParam {String} value Attribute value.
   */

  /**
   * @apiVersion 1.0.0
   * @apiGroup Attributes
   * @apiPermission website_token
   * 
   * @apiUse AttributesBlock
   * 
   * @api {post} /attributes Create a single attribute or update it if exists
   * @apiName CreateAttribute
   *
   * @apiSuccess {Object} result Object Result of the transaction.
   * @apiSuccess {String} result.error Content of the error or null if none
   * @apiSuccess {Integer} result.data Id of the created attribute
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "error": null,
   *    "data": 2
   *  }
   */
  router.post(prefix + '/attribute', _AttributeController.createOrUpdate);

  /**
   * @apiVersion 1.0.0
   * @apiGroup Attributes
   * @apiPermission website_token
   * 
   * @apiUse AttributesBlock
   * 
   * @api {post} /attributes Create multiple attributes or update them if they exist
   * @apiName BulkCreateAttributes
   *
   * @apiSuccess {Object[]} result Result of the transactions.
   * @apiSuccess {String} result.error Content of the error or null if none
   * @apiSuccess {Integer[]} result.data Id of the created attributes
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "error": null,
   *    "data": [
   *      2,
   *      4
   *    ]
   *  }
   */
  router.post(prefix + '/attributes', _AttributeController.bulkCreateOrUpdate);
};

var _AttributeController = require('../../../controllers/api/AttributeController');