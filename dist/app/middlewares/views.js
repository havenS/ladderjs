'use strict';

modules.export = function (app) {
  console.log(__dirname + '/../../../views');
  app.set('view engine', 'pug');
  app.set('views', ['' + process.cwd() + viewsPath, __dirname + '/../../../views']);
  app.locals.compileDebug = process.env.NODE_ENV !== 'production';
  app.locals.cache = process.env.NODE_ENV === 'production';
};