'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  app.use(function (req, res) {
    res.status(404).render('404');
  });
  app.use(function (err, req, res) {
    app.logger.error(err);
    res.status(500).render('500');
  });
};