'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router, prefix) {
  /**
   * @apiDefine CategoryBlock
   * @apiParam {String} id Category id on your store.
   * @apiParam {String} name Category name.
   * @apiParam {String} description Category descript.
   */

  /**
   * @apiVersion 1.0.0
   * @apiGroup Categories
   * @apiPermission website_token
   * 
   * @apiUse CategoryBlock
   * 
   * @api {post} /category Create a single category or update it if exists
   * @apiName CreateCategory
   *
   * @apiSuccess {Object} result Object Result of the transaction.
   * @apiSuccess {String} result.error Content of the error or null if none
   * @apiSuccess {Integer} result.data Id of the created category
   * 
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "error": null,
   *    "data": 777
   *  }
   */
  router.post(prefix + '/category', _CategoryController.createOrUpdate);

  /**
   * @apiVersion 1.0.0
   * @apiGroup Categories
   * @apiPermission website_token
   * 
   * @apiUse CategoryBlock
   * 
   * @api {post} /categories Create multiple categories or update them if they exist
   * @apiName BulkCreateCategories
   *
   * @apiSuccess {Object[]} result Result of the transactions.
   * @apiSuccess {String} result.error Content of the error or null if none
   * @apiSuccess {Integer[]} result.data Id of the created categories
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
  router.post(prefix + '/categories', _CategoryController.bulkCreateOrUpdate);
};

var _CategoryController = require('../../../controllers/api/CategoryController');