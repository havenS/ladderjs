'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (router) {
  router.get('/nouveau-compte', _SignupController.show);
  router.post('/nouveau-compte', _SignupController.signup);

  router.get('/connexion', function (req, res) {
    res.render('login', {
      layout: _layouts2.default.login
    });
  });
  router.post('/connexion', _passport2.default.authenticate('local', {
    successRedirect: '/manager/tableau-de-bord',
    failureRedirect: '/connexion',
    failureFlash: true
  }));

  router.get('/deconnexion', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _SignupController = require('../controllers/SignupController.js');

var _layouts = require('../helpers/layouts');

var _layouts2 = _interopRequireDefault(_layouts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }