import * as policies from '../policies'
import appRoutes from './routes'

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

const getView = (view, url, crudType) => {
  if (view) {
    return crudType ? `${view}/${crudType}` : view
  }

  return crudType ? `crud/${crudType}` : url.replace('/', '')
}

const processUrl = ({action, auth, controller, method, url, view}, app) => async (req, res, next) => {
  if (req.error) {
    return respond(res, null, req.error)
  }
  const viewPath = getView(view, url)

  if (!controller) {
    return res.render(viewPath)
  }
  
  let controllerToUse
  try {
    controllerToUse = require(`${app.controllersPath}/${controller}`)
  } catch (err) {
    try{
      controllerToUse = require(`../controllers/${controller}`)
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

const getCrudRoutes = url => {
  return {
    index: {
      url: url,
      method: 'get', 
    },
    new: {
      url: `${url}/new`,
      method: 'get', 
    },
    create: {
      url: `${url}/create`,
      method: 'post', 
    },
    view: {
      url: `${url}/:id`,
      method: 'get', 
    },
    edit: {
      url: `${url}/:id`,
      method: 'get', 
    },
    update: {
      url: `${url}/:id`,
      method: 'post', 
    },
    delete: {
      url: `${url}/:id`,
      method: 'delete', 
    },
  }
}

const getCrudFields = Model => {
  let primaryField
  const attributes = Model.attributes
  const fields = Object.keys(attributes).map(field => {
    if (field.primaryKey) {
      primaryField = attributes[field]
    }
    return {
      name: field,
      type: attributes[field].type.key,
      auto: !!attributes[field]._autoGenerated,
      primary: !!attributes[field].primaryKey,
      allowNull: attributes[field].allowNull,
    }
  }).filter(field => !field.primary)
  
  return {
    primaryField,
    fields,
  }
}

const processCrud = (type, {model, url, view}, crudRoutes, Model) => async (req, res, next) => {
  const action = require(`../controllers/CrudController`)[`${type}Entity`]
  const viewPath = getView(view, url, type)
  let data = await action(req, res, Model)

  if (data) {
    data = {
      modelName: model,
      newUrl: crudRoutes.new.url,
      createUrl: crudRoutes.create.url,
      ...getCrudFields(Model),
      ...data,
    }
    return res.render(viewPath, data)
  } else {
    return res.redirect(req.ladderjs.getUrl(crudRoutes.index.url, req.ladderjs))
  }
}

module.exports = app => {
  const routes = [
    ...(app.routesToAdd || []),
    ...appRoutes,
  ]

  routes
    .filter(route => !app.disabledRoutes.includes(route.url))
    .forEach(config => {
      if (config.crud) {
        const crudRoutes = getCrudRoutes(config.url)
        Object.keys(crudRoutes).forEach(type => {
          const {url, method} = crudRoutes[type]
          const model = require(`${app.modelsPath}/${config.model}`)
          const Model = model.default ? model.default(app.db) : model(app.db)
          app[method](
            app.ladderjs.getUrl(url),
            authenticateUrl(config.auth),
            processCrud(type, config, crudRoutes, Model)
          )
        })
      } else {
        app[config.method](
          app.ladderjs.getUrl(config.url, app),
          authenticateUrl(config.auth),
          processUrl(config, app)
        )
      }
    })

  return app
}
