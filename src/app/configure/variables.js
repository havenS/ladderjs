export default (app, config) => {
  config.routes = config.routes.map(route => {
    const view = route.view ? route.view.replace(/\//g, '_') : ''
    const type = route.controller ? route.controller.split('/')[0] : view
    const action = route.action ? `_${route.action}` : ''
    const key = `${route.method}_${type}${action}`.toLocaleLowerCase()
    route.key = route.key || key

    return route
  })

  const {apiPrefix, controllersPath, modelsPath} = config

  app.ladderjs = {
    apiPrefix: apiPrefix,
    config: config,
  }

  app.generateUrl = route => {
    if (route[0] && route[0] === '/') {
      return route
    }
    let routeObj = null
    if (typeof route === 'string') {
      routeObj = config.routes.find(({key}) => key === route)
      if (!routeObj) {
        app.logger.error(`No route found for key ${route}`)
        return route
      }
    } else {
      routeObj = route
    }

    const prefix = routeObj.prefix ? `/${routeObj.prefix}` : ''
    const url = `${prefix}${routeObj.url}`

    return url
  }
  app.controllersPath = controllersPath
  app.modelsPath = modelsPath
}
