'use strict';

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = require('sequelize'),
    sequelize = new Sequelize(_config2.default.db.url, {
    logging: false
});

module.exports = sequelize;