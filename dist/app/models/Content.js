'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticle = exports.getArticles = exports.getCategories = undefined;

var _prismicJavascript = require('prismic-javascript');

var _prismicJavascript2 = _interopRequireDefault(_prismicJavascript);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getContent = function getContent() {
  return _prismicJavascript2.default.api(_config2.default.prismic.apiEndpoint);
};

var getCategories = exports.getCategories = function getCategories() {
  return getContent().then(function (api) {
    return api.query('[at(document.type, "category")]');
  }).then(function (response) {
    return response.results;
  });
};
var getArticles = exports.getArticles = function getArticles() {
  return getContent().then(function (api) {
    return api.query('[at(document.type, "article")]');
  }).then(function (response) {
    return response.results;
  });
};
var getArticle = exports.getArticle = function getArticle(uid) {
  return getContent().then(function (api) {
    return api.query('[at(my.article.uid, "' + uid + '")]');
  }).then(function (response) {
    return response.results[0];
  });
};

exports.default = getContent;