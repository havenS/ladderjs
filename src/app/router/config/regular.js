import {getView, authenticateUrl, respond} from './shared'

const processUrl = ({action, controller, url, view, prefix}, app) => async (
  req,
  res,
  next
) => {
  if (req.error) {
    return respond(res, null, req.error)
  }
  const viewPath = getView(view, url, prefix)

  if (!controller) {
    return res.render(viewPath)
  }

  let controllerToUse
  try {
    controllerToUse = require(`${app.controllersPath}/${controller}`)
  } catch (err) {
    try {
      controllerToUse = require(`../../controllers/${controller}`)
    } catch (e) {
      app.logger.error(err)
      return res.status(500).render('500', {error: String(err)})
    }
  }

  try {
    const data = await controllerToUse[action](req, res, next)
    if (data) {
      return view ? res.render(viewPath, data) : respond(res, data)
    }
    return data
  } catch (err) {
    app.logger.error(err)
    return res.status(500).render('500', {error: String(err)})
  }
}

export const processRoute = (app, config) => {
  app[config.method](
    app.generateUrl(config, app),
    (req, res, next) => {
      authenticateUrl(config.auth, app.ladderjs.config.policies)(
        req,
        res,
        next,
        config
      )
    },
    processUrl(config, app)
  )
}
