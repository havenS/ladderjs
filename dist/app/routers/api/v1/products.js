'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router, prefix) {
  /**
   * @apiDefine ProductBlock
   * @apiParam {String} id Product id on your store.
   * @apiParam {String} name Product name.
   * @apiParam {String} description Product descript.
   */

  /**
   * @apiVersion 1.0.0
   * @apiGroup Products
   * @apiPermission website_token
   * 
   * @apiUse ProductBlock
   * 
   * @api {post} /product Create a single product or update it if exists
   * @apiName CreateProduct
   *
   * @apiSuccess {Object} result Object Result of the transaction.
   * @apiSuccess {String} result.error Content of the error or null if none
   * @apiSuccess {Integer} result.data Id of the created product
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "error": null,
   *    "data": 777
   *  }
   */
  router.post(prefix + '/product', _ProductController.createOrUpdate);

  /**
   * @apiVersion 1.0.0
   * @apiGroup Products
   * @apiPermission website_token
   * 
   * @apiUse ProductBlock
   * 
   * @api {post} /products Create multiple products or update them if they exist
   * @apiName BulkCreateProducts
   *
   * @apiSuccess {Object[]} result Result of the transactions.
   * @apiSuccess {String} result.error Content of the error or null if none
   * @apiSuccess {Integer[]} result.data Id of the created products
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "error": null,
   *    "data": [
   *      777,
   *      778
   *    ]
   *  }
   */
  router.post(prefix + '/products', _ProductController.bulkCreateOrUpdate);
};

var _ProductController = require('../../../controllers/api/ProductController');