import moment from 'moment'

export default (app, config) => {
  const apiPrefix = config.apiPrefix || process.env.API_PREFIX

  app.ladderjs = {
    apiPrefix: apiPrefix,
    getUrl: url => (apiPrefix ? `${apiPrefix}${url}` : url),
    config: config,
  }
  app.auth = config.auth
  app.routesToAdd = config.routes
  app.policies = config.policies
  app.disabledRoutes = config.disabledRoutes
  app.controllersPath = `${process.cwd()}${config.controllersPath}`
  app.modelsPath = `${process.cwd()}${config.modelsPath}`
  app.locals.moment = moment
}
