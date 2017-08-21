require('dotenv').config()
const express = require('express')

const configureLogger = require('./app/configure/logger')
const configureVariables = require('./app/configure/variables')
const configureViews = require('./app/configure/views')
const configureStyles = require('./app/configure/styles')
const configureSession = require('./app/configure/session')
const configureRequest = require('./app/configure/request')
const configureAuth = require('./app/configure/auth')

const ladderjs = (config) => {
  const {
    auth = null, // model, username field, password field
    debugRoutes = false,
    controllersPath = '/controllers',
    loggerLevel ='info',
    modelsPath = '/models',
    port = 8080,
    publicPath = '/public',
    routes = [],
    stylesPath = '/public/styles',
    stylesProcessor = 'less',
    viewsPath = '/views',
  } = config

  const app = express()

  configureLogger(app, config)
  configureVariables(app, config)
  configureViews(app, config)
  configureStyles(app, config)
  configureSession(app)
  configureAuth(app)
  configureRequest(app, config)

  app.start = function () {
    const port = config.port || process.env.PORT
    this.listen(port)
    this.logger.info('LadderJS server started on port ' + port)
  }

  return app
}

module.exports = ladderjs