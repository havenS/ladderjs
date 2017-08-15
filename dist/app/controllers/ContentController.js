'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Content = require('../models/Content');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = exports.index = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req) {
    var categories, article;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getSortedCategories();

          case 2:
            categories = _context.sent;

            if (!req.params.uid) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return (0, _Content.getArticle)(req.params.uid);

          case 6:
            _context.t0 = _context.sent;
            _context.next = 10;
            break;

          case 9:
            _context.t0 = false;

          case 10:
            article = _context.t0;
            return _context.abrupt('return', {
              categories: categories,
              article: article
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function index(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getSortedCategories = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var rawCategories, articles, categories;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _Content.getCategories)();

          case 2:
            rawCategories = _context2.sent;
            _context2.next = 5;
            return (0, _Content.getArticles)();

          case 5:
            articles = _context2.sent;
            categories = {};

            rawCategories.forEach(function (category) {
              category.subcategories = [];
              categories[category.id] = category;
              categories[category.id].articles = [];
            });
            articles.forEach(function (article) {
              categories[article.data.category.id].articles.push(article);
            });
            rawCategories.forEach(function (category) {
              if (category.data.parent && category.data.parent.id) {
                categories[category.data.parent.id].subcategories.push(category);
                delete categories[category.id];
              }
            });

            return _context2.abrupt('return', categories);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getSortedCategories() {
    return _ref2.apply(this, arguments);
  };
}();

// const categories = { 
//   'WWs-9ygAACcAnhmu': {
//     id: 'WWs-9ygAACcAnhmu',
//     uid: 'connectez-votre-site',
//     type: 'category',
//     href: 'https://greeter.prismic.io/api/v2/documents/search?ref=WWtABygAACcAnh5o&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22WWs-9ygAACcAnhmu%22%29+%5D%5D',
//     tags: [],
//     first_publication_date: '2017-07-16T10:26:29+0000',
//     last_publication_date: '2017-07-16T10:26:29+0000',
//     slugs: [ 'connectez-votre-site', 'connecter-votre-site' ],
//     linked_documents: [],
//     lang: 'fr-fr',
//     alternate_languages: [],
//     data: {
//       name: {
//         fr: 'Connectez votre site'
//       },
//     },
//     subcategories: [ 
//       { 
//         id: 'WWs-9ygAACcAnhmu',
//         uid: 'module-plateforme',
//         type: 'category',
//         href: 'https://greeter.prismic.io/api/v2/documents/search?ref=WWtABygAACcAnh5o&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22WWs-9ygAACcAnhmu%22%29+%5D%5D',
//         tags: [],
//         first_publication_date: '2017-07-16T10:26:29+0000',
//         last_publication_date: '2017-07-16T10:26:29+0000',
//         slugs: [ 'connectez-votre-site', 'connecter-votre-site' ],
//         linked_documents: [],
//         lang: 'fr-fr',
//         alternate_languages: [],
//         data: {
//           name: {
//             fr: 'Module plateforme'
//           },
//         }
//       }
//     ]
//   }
// }