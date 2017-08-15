'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize) {
  var Website = sequelize.define('websites', attributes, options);

  Website.beforeCreate(function (website, options) {
    website.domain = parseDomain(website);
    createScreenshot(website);
    website.screenshot = (0, _Upload.getPublicUrl)(slugify(website.domain));
  });
  Website.beforeUpdate(function (website, options) {
    website.domain = parseDomain(website);
    createScreenshot(website);
    website.screenshot = (0, _Upload.getPublicUrl)(slugify(website.domain));
  });

  return Website;
};

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _helpers = require('../helpers');

var _Upload = require('./Upload');

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slugify = require("underscore.string/slugify");

var attributes = {
  name: {
    type: _sequelize2.default.STRING,
    allowNull: false
  },
  domain: {
    type: _sequelize2.default.STRING,
    allowNull: false,
    unique: true
  },
  platform: {
    type: _sequelize2.default.ENUM(_helpers.platforms.map(function (p) {
      return p.id;
    })),
    allowNull: false
  },
  screenshot: {
    type: _sequelize2.default.STRING
  }
};

var options = {
  freezeTableName: true
};

var parseDomain = function parseDomain(website) {
  var url = (0, _urlParse2.default)(website.domain, true);
  return '' + url.origin + url.pathname;
};
var createScreenshot = function createScreenshot(website) {
  (0, _Upload.makeScreenshot)(website.domain, slugify(website.domain)).catch(function (e) {
    console.log('error making screenshot');
    console.error(e);
  });
};