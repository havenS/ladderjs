import dotenv from 'dotenv'
const express = require('express')

import Logger, {configureLogger} from './app/configure/logger'
import DB, {configureDb} from './app/configure/db'
import {configureModels} from './app/models'
import configureVariables from './app/configure/variables'
import configureViews from './app/configure/views'
import configureStyles from './app/configure/styles'
import configureSession from './app/configure/session'
import configureRequest from './app/configure/request'
import configureAuth from './app/configure/auth'

dotenv.config()

let app = {}
const ladderjs = conf => {
  app = express()
  const config = Object.assign(
    {},
    {
      dbUrl: process.env.DATABASE_URL || '',
      dbLogging: process.env.DB_LOGGING || false,
      apiPrefix: null,
      auth: null, // model, username field, password field, default login redirect url
      debugRoutes: false,
      controllersPath: '/controllers',
      loggerLevel: 'info',
      modelsPath: '/models',
      port: null,
      publicPath: '/public',
      routes: [],
      stylesPath: '/public/styles',
      stylesProcessor: 'less',
      viewsPath: '/views',
      disabledRoutes: [],
    },
    conf
  )

  configureVariables(app, config)
  configureLogger(app)

  configureDb(app)
  configureModels(app)

  configureSession(app)
  configureAuth(app)
  configureStyles(app)
  configureRequest(app)
  configureViews(app)

  app.start = function() {
    const port = config.port || process.env.PORT
    this.listen(port)
    this.logger.info('LadderJS server started on port ' + port)
  }

  return app
}

export default ladderjs
module.exports = ladderjs
export const logger = Logger
export const db = DB
export {default as Sequelize} from 'sequelize'
