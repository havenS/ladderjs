const moment = require('moment')
const sequelize = require('../sequelize')

module.exports = (app, config) => {
  const apiPrefix = config.apiPrefix || process.env.API_PREFIX

  app.ladderjs = {
    apiPrefix: apiPrefix,
    getUrl: url => apiPrefix ? `${apiPrefix}${url}` : url,
  }
  app.auth = config.auth
  app.routesToAdd = config.routes
  app.disabledRoutes = config.disabledRoutes
  app.controllersPath = `${process.cwd()}${config.controllersPath}`
  app.modelsPath = `${process.cwd()}${config.modelsPath}`
  app.db = sequelize
  app.locals.moment = moment
}
