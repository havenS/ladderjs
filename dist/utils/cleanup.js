'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../app/models');

var _sequelize = require('../app/setup/sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(callback) {
    var user, token, website;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _sequelize2.default.query('\n    DROP TABLE IF EXISTS "session";\n    CREATE TABLE "session" (\n      "sid" varchar NOT NULL COLLATE "default",\n      "sess" json NOT NULL,\n      "expire" timestamp(6) NOT NULL\n    )\n    WITH (OIDS=FALSE);\n    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;');

            _context.next = 3;
            return _models.User.sync({ force: true });

          case 3:
            _context.next = 5;
            return _models.Website.sync({ force: true });

          case 5:
            _context.next = 7;
            return _models.AccessToken.sync({ force: true });

          case 7:
            _context.next = 9;
            return _models.Attribute.sync({ force: true });

          case 9:
            _context.next = 11;
            return _models.Category.sync({ force: true });

          case 11:
            _context.next = 13;
            return _models.Product.sync({ force: true });

          case 13:
            _context.next = 15;
            return _models.Property.sync({ force: true });

          case 15:
            _context.next = 17;
            return _models.Variant.sync({ force: true });

          case 17:
            _context.next = 19;
            return _sequelize2.default.models.variant_attribute.sync({ force: true });

          case 19:
            _context.next = 21;
            return _sequelize2.default.models.category_product.sync({ force: true });

          case 21:
            _context.next = 23;
            return _models.User.create({
              email: 'fournier.j@sfr.fr',
              role: 'ADMIN',
              password: 'azerty1234',
              password_confirmation: 'azerty1234'
            });

          case 23:
            user = _context.sent;
            _context.next = 26;
            return _models.AccessToken.create({
              lang: 'fr'
            });

          case 26:
            token = _context.sent;
            _context.next = 29;
            return _models.Website.create({
              name: 'presta',
              domain: 'http://www.prestashop.com',
              platform: 'PRESTASHOP'
            });

          case 29:
            website = _context.sent;
            _context.next = 32;
            return website.setUser(user);

          case 32:
            _context.next = 34;
            return token.setWebsite(website);

          case 34:

            console.log(token.token);

            callback();

          case 36:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();