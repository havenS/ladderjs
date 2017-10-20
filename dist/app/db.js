'use strict';

var logging = {};
require('./logger')(logging, {});
var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: process.env.DB_LOGGING === 'true' ? logging.logger.info : false
});

module.exports = sequelize;