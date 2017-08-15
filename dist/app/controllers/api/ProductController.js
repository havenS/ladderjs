'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bulkCreateOrUpdate = exports.createOrUpdate = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOrUpdate = exports.createOrUpdate = function createOrUpdate(req, res) {
  var _res$locals = res.locals,
      website = _res$locals.website,
      token = _res$locals.token;

  upsertProduct(req.body, website, token);
  return req.body.id;
};

var bulkCreateOrUpdate = exports.bulkCreateOrUpdate = function bulkCreateOrUpdate(req, res) {
  var _res$locals2 = res.locals,
      website = _res$locals2.website,
      token = _res$locals2.token;

  updateAllProducts(req.body, website, token);
  return req.body.map(function (product) {
    return product.id;
  });
};

var updateAllProducts = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(products, website, token) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, product;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 3;
            _iterator = (0, _getIterator3.default)(products);

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 12;
              break;
            }

            product = _step.value;
            _context.next = 9;
            return upsertProduct(product, website, token);

          case 9:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function updateAllProducts(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var upsertProduct = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(product, website, token) {
    var distantId, variants, categories, properties, where, values, localProduct;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            distantId = String(product.id);
            variants = product.attributes || [];
            categories = product.categories || [];
            properties = product.properties || [];


            delete product.id;
            delete product.attributes;
            delete product.categories;
            delete product.properties;

            where = {
              distantId: distantId,
              accessTokenId: token.id
            };
            values = (0, _extends3.default)({}, product, {
              distantId: distantId,
              accessTokenId: token.id,
              userId: website.userId
            });
            _context2.next = 12;
            return _models.Product.findOne({
              where: where
            });

          case 12:
            localProduct = _context2.sent;

            if (!localProduct) {
              _context2.next = 19;
              break;
            }

            _context2.next = 16;
            return _models.Product.update(values, {
              where: where
            });

          case 16:
            localProduct = _context2.sent;
            _context2.next = 22;
            break;

          case 19:
            _context2.next = 21;
            return _models.Product.create(values);

          case 21:
            localProduct = _context2.sent;

          case 22:

            _models.Product.findOne({
              where: {
                distantId: distantId
              }
            }).then(function (savedProduct) {
              _models.Variant.destroy({
                where: {
                  productId: savedProduct.id
                }
              }).then(function () {
                (0, _keys2.default)(variants).forEach(function (variantId) {
                  var variant = (0, _extends3.default)({}, variants[variantId], {
                    accessTokenId: token.id,
                    productId: savedProduct.id
                  });
                  var variantAttributes = variant.attributes || [];
                  delete variant.attribute;

                  _models.Variant.create(variant).then(function (savedVariant) {
                    variantAttributes.forEach(function (attribute) {
                      _models.Attribute.findOne({
                        where: {
                          distantId: attribute,
                          accessTokenId: token.id
                        }
                      }).then(function (foundAttribute) {
                        savedVariant.addAttribute(foundAttribute);
                      });
                    });
                  });
                });
              });

              _models.Property.destroy({
                where: {
                  productId: product.id
                }
              }).then(function () {
                properties.forEach(function (property) {
                  _models.Property.create(property).then(function (savedProperty) {
                    savedProduct.addProperty(savedProperty);
                  });
                });
              });

              categories.forEach(function (categoryId) {
                _models.Category.findOne({
                  where: {
                    distantId: categoryId
                  }
                }).then(function (category) {
                  savedProduct.addCategory(category);
                });
              });
            });

          case 23:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function upsertProduct(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/*
array(11) {
    ["id"]=>
    int(1)
    ["name"]=>
    string(35) "T-shirt délavé à manches courtes"
    ["description"]=>
    string(165) "T-shirt délavé à manches courtes et col rond. Matière douce et extensible pour un confort inégalé. Pour un look estival, portez-le avec un chapeau de paille !"
    ["categories"]=>
    array(4) {
      [0]=>
      string(1) "2"
      [1]=>
      string(1) "3"
      [2]=>
      string(1) "4"
      [3]=>
      string(1) "5"
    }
    ["attributes"]=>
    array(6) {
      [1]=>
      array(7) {
        ["url"]=>
        string(92) "http://localhost/prestashop/1-1-t-shirt-delave-manches-courtes.html#/taille-s/couleur-orange"
        ["image"]=>
        string(70) "localhost/prestashop/1-home_default/t-shirt-delave-manches-courtes.jpg"
        ["stock"]=>
        int(299)
        ["price"]=>
        string(11) "519,81 €"
        ["rebate"]=>
        string(7) "-10 €"
        ["promo"]=>
        string(11) "509,81 €"
        ["attributes"]=>
        array(2) {
          [0]=>
          string(1) "1"
          [1]=>
          string(2) "13"
        }
      }
      [2]=>
      array(7) {
        ["url"]=>
        string(90) "http://localhost/prestashop/1-2-t-shirt-delave-manches-courtes.html#/taille-s/couleur-bleu"
        ["image"]=>
        string(70) "localhost/prestashop/3-home_default/t-shirt-delave-manches-courtes.jpg"
        ["stock"]=>
        int(300)
        ["price"]=>
        string(10) "14,81 €"
        ["rebate"]=>
        string(4) "-5 %"
        ["promo"]=>
        string(10) "14,07 €"
        ["attributes"]=>
        array(2) {
          [0]=>
          string(1) "1"
          [1]=>
          string(2) "14"
        }
      }
      [3]=>
      array(7) {
        ["url"]=>
        string(92) "http://localhost/prestashop/1-3-t-shirt-delave-manches-courtes.html#/taille-m/couleur-orange"
        ["image"]=>
        string(70) "localhost/prestashop/1-home_default/t-shirt-delave-manches-courtes.jpg"
        ["stock"]=>
        int(300)
        ["price"]=>
        string(10) "19,81 €"
        ["rebate"]=>
        string(6) "-5 €"
        ["promo"]=>
        string(10) "14,81 €"
        ["attributes"]=>
        array(2) {
          [0]=>
          string(1) "2"
          [1]=>
          string(2) "13"
        }
      }
      [4]=>
      array(7) {
        ["url"]=>
        string(90) "http://localhost/prestashop/1-4-t-shirt-delave-manches-courtes.html#/taille-m/couleur-bleu"
        ["image"]=>
        string(70) "localhost/prestashop/3-home_default/t-shirt-delave-manches-courtes.jpg"
        ["stock"]=>
        int(300)
        ["price"]=>
        string(10) "19,81 €"
        ["rebate"]=>
        string(6) "-5 €"
        ["promo"]=>
        string(10) "14,81 €"
        ["attributes"]=>
        array(2) {
          [0]=>
          string(1) "2"
          [1]=>
          string(2) "14"
        }
      }
      [5]=>
      array(7) {
        ["url"]=>
        string(92) "http://localhost/prestashop/1-5-t-shirt-delave-manches-courtes.html#/taille-l/couleur-orange"
        ["image"]=>
        string(70) "localhost/prestashop/1-home_default/t-shirt-delave-manches-courtes.jpg"
        ["stock"]=>
        int(300)
        ["price"]=>
        string(10) "19,81 €"
        ["rebate"]=>
        string(6) "-5 €"
        ["promo"]=>
        string(10) "14,81 €"
        ["attributes"]=>
        array(2) {
          [0]=>
          string(1) "3"
          [1]=>
          string(2) "13"
        }
      }
      [6]=>
      array(7) {
        ["url"]=>
        string(90) "http://localhost/prestashop/1-6-t-shirt-delave-manches-courtes.html#/taille-l/couleur-bleu"
        ["image"]=>
        string(70) "localhost/prestashop/3-home_default/t-shirt-delave-manches-courtes.jpg"
        ["stock"]=>
        int(300)
        ["price"]=>
        string(10) "19,81 €"
        ["rebate"]=>
        string(6) "-5 €"
        ["promo"]=>
        string(10) "14,81 €"
        ["attributes"]=>
        array(2) {
          [0]=>
          string(1) "3"
          [1]=>
          string(2) "14"
        }
      }
    }
    ["properties"]=>
    array(3) {
      [0]=>
      array(2) {
        ["name"]=>
        string(12) "Compositions"
        ["value"]=>
        string(5) "Coton"
      }
      [1]=>
      array(2) {
        ["name"]=>
        string(6) "Styles"
        ["value"]=>
        string(13) "Décontracté"
      }
      [2]=>
      array(2) {
        ["name"]=>
        string(12) "Propriétés"
        ["value"]=>
        string(15) "Manches courtes"
      }
    }
    ["link"]=>
    string(65) "http://localhost/prestashop/1-t-shirt-delave-manches-courtes.html"
    ["image"]=>
    string(70) "localhost/prestashop/1-home_default/t-shirt-delave-manches-courtes.jpg"
    ["price"]=>
    string(10) "19,81 €"
    ["rebate"]=>
    string(7) "-10 €"
    ["promo"]=>
    string(10) "19,81 €"
  }



add product variant
remove product attribute
add variant attribute
change product controller



  */