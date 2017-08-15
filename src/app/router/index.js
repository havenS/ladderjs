import * as policies from '../policies'
import appRoutes from './routes'

const getViewPath = (prefix, view) => prefix ? `${prefix}/${view}` : view
const getUrl = (prefix, url) => prefix ? `/${prefix}${url}` : url
const authenticateUrl = auth => !auth ? (req, res, next) => next() : policies[auth]
const respond = (res, data, error = null) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(error ? 400 : 200)
  res.send(
    JSON.stringify({
      error,
      data: data || {},
    })
  )
}

const processUrl = ({action, auth, controller, method, prefix, url, view}, customControllerPath) => async (req, res, next) => {
  if (req.error) {
    return respond(res, null, req.error)
  }

  const viewPath = getViewPath(prefix, view)

  if (!controller) {
    return res.render(viewPath)
  }
  
  let controllerToUse
  try {
    controllerToUse = require(`${customControllerPath}/${controller}`)
  } catch (err) {
    try{
      controllerToUse = require(`../controllers/${controller}`)
    } catch (e) {
      res.status(500)
      res.render('500', {error: String(err)})
      return res.end()
    }
  }

  const data = await controllerToUse[action](req, res, next)

  if (data) {
    return view ? res.render(viewPath, data) : respond(res, data)
  }
}

module.exports = app => {
  const routes = [
    ...(app.routesToAdd || []),
    ...appRoutes,
  ]
  const customControllerPath = `${process.cwd()}${app.controllersPath}`

  routes.forEach(config => {
    app[config.method](
      getUrl(config.prefix, config.url),
      authenticateUrl(config.auth),
      processUrl(config, customControllerPath)
    )
  })

  return app
}
