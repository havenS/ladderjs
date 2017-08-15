'use strict';

var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DB_URL, {
  logging: process.env.DB_LOGGING === 'true' ? console.log : false
});

module.exports = sequelize;