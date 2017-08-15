'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error', 'You have to be logged in to access the page.');
  res.redirect('/connexion');
};