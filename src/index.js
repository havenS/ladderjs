require('dotenv').config()
const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressLess = require('express-less')
const basicAuth = require('basic-auth')

const setupPassport = require('./app/passport')
const configureRoutes = require('./app/router')

export default ({
  debugRoutes= false,
  port= 8080,
  routes= [],
  publicPath= '/public',
  stylesPath= '/public/styles',
  controllersPath= '/controllers',
  viewsPath= '/views',
}) => {
  // Configure Express
  const app = express()

  app.routesToAdd = routes
  app.controllersPath = controllersPath
  
  app.set('view engine', 'pug')
  app.set('views', [`${process.cwd()}${viewsPath}`, __dirname + '/../views']);
  app.locals.compileDebug = process.env.NODE_ENV !== 'production'
  app.locals.cache = process.env.NODE_ENV === 'production'

  // Configures all used middleware
  app.use(cookieParser())

  app.use(session({
    secret: process.env.SESSION_TOKEN || '4564f6s4fdsfdfd',
    resave: true,
    saveUninitialized: true,
    store: new (require('session-file-store')(session)),
  }))
  app.use('/img', express.static(__dirname + '/../img'))
  app.use(express.static(`${process.cwd()}${publicPath}`))
  app.use('/styles', [
    expressLess(`${process.cwd()}${stylesPath}`, {
      cache: process.env.NODE_ENV === 'production',
      compress: process.env.NODE_ENV === 'production',
    }), 
    expressLess(__dirname + '/../styles', {
      cache: process.env.NODE_ENV === 'production',
      compress: process.env.NODE_ENV === 'production',
    })
  ]);

  app.use(flash())

  app.use(bodyParser.json({
    strict: false
  }))
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // Configure authentication
  setupPassport(app)

  // Configure the flash message system
  app.use(function(req, res, next) {
    res.locals.messages = {}
    try {
      res.locals.messages.error = req.flash('error')
      res.locals.messages.success = req.flash('success')
    } catch (e) {}
    res.locals.user = req.user
    res.locals.currentUrl = req.originalUrl
    
    next()
  });

  configureRoutes(app);
  app.use(function(req, res) {
    res.status(404).render('404')
  })
  app.use(function(err, req, res, next) {
    console.error(err)
    res.status(500).render('500')
  })

  if (debugRoutes) {
    const debugRoutes = app._router.stack
      .filter(r => r.route)
      .map(r => `${Object.keys(r.route.methods).map(m => `${m.toUpperCase()} - `)}${r.route.path}`)
      console.log(debugRoutes)
  }

  app.start = function () {
    // Configure routes with errors fallback pages
    port = port || process.env.PORT
    this.listen(port)
    console.log('Server started on port ' + port)
  }

  return app
}
  