import dotenv from 'dotenv'
const express = require('express')

import configureLogger from './app/configure/logger'
import configureDb from './app/configure/database'
import configureModels from './app/models'
import configureVariables from './app/configure/variables'
import configureViews from './app/configure/views'
import configureStyles from './app/configure/styles'
import configureSession from './app/configure/session'
import configureRequest from './app/configure/request'
import configureErrors from './app/configure/errors'
import configureAuth from './app/configure/auth'
import configureRoutes from './app/router'

dotenv.config({path: `${process.cwd()}/.env`})

const defaultOptions = {
  apiPrefix: process.env.API_PREFIX || '',
  routes: [],
  disabledRoutes: [],
  dbUrl: process.env.DATABASE_URL || '',
  dbLogging: process.env.DATABASE_LOGGING || false,
  sequelizeOperatorsAliases: false,
  loggerLevel: 'info',
  auth: {
    model: 'users',
    id: 'id',
    username: 'email',
    password: 'password',
  },
  debugRoutes: false,
  port: process.env.PORT || 3000,
  controllersPath: '/controllers',
  modelsPath: '/models',
  publicPath: '/public',
  viewsPath: '/views',
  stylesPath: '/public/styles',
  stylesProcessor: 'less',
  sessionToken: process.env.SESSION_TOKEN || '4564f6s4fdsfdfd',
}
let ladder = {}

/**
 * TODO
 * - les controllers locaux ne sont pas utilisés
 * - réorganiser les routes pour permettre l'override des crud
 *  [
 *    config.routes,
 *    ...defaultRoutes
 *  ]
 *  ou
 *  [
 *    defaultRoutes.global,
 *    defaultRoutes.auth,
 *    config.routes,
 *    defaultRoutes.crud
 *  }]
 *  ou
 *  {
 *    ...defaultRoutes,
 *    config.routes
 *  } pour utiliser un id de route '<METHOD>_<URL>'
 */

const ladderjs = conf => {
  ladder = express()
  const config = {
    ...defaultOptions,
    ...conf,
  }

  configureVariables(ladder, config)
  configureLogger(ladder)

  configureSession(ladder)
  if (config.dbUrl !== '') {
    configureDb(ladder)
    configureModels(ladder)
    configureAuth(ladder)
  }

  configureStyles(ladder)
  configureRequest(ladder)
  configureRoutes(ladder)
  configureErrors(ladder)
  configureViews(ladder)

  ladder.start = function() {
    const port = config.port
    this.listen(port)
    this.logger.info('LadderJS server started on port ' + port)
  }

  return ladder
}

export default ladderjs
export const app = ladder

module.exports = ladderjs
module.exports.app = ladder
