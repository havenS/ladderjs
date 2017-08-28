const moment = require('moment')
const sequelize = require('../sequelize')

module.exports = (app, config) => {
  app.auth = config.auth
  app.routesToAdd = config.routes
  app.disabledRoutes = config.disabledRoutes
  app.controllersPath = `${process.cwd()}${config.controllersPath}`
  app.modelsPath = `${process.cwd()}${config.modelsPath}`
  app.db = sequelize
  app.locals.moment = moment
}
