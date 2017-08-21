module.exports = (app, config) => {
  app.set('view engine', 'pug')
  app.set('views', [`${process.cwd()}${config.viewsPath}`, __dirname + '/../../../views']);
  app.locals.compileDebug = process.env.NODE_ENV !== 'production'
  app.locals.cache = process.env.NODE_ENV === 'production'
}
