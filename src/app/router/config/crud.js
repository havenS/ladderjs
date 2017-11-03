import {getView, authenticateUrl} from './shared'

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
  const fields = Object.keys(attributes)
    .map(field => {
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
    })
    .filter(field => !field.primary)

  return {
    primaryField,
    fields,
  }
}

const processCrud = (type, {model, url, view}, crudRoutes, Model) => async (
  req,
  res
) => {
  const action = require('../controllers/CrudController')[`${type}Entity`]
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

export const processCrudRoute = (app, config) => {
  const crudRoutes = getCrudRoutes(config.url)
  Object.keys(crudRoutes).forEach(type => {
    const {url, method} = crudRoutes[type]
    const model = require(`${app.modelsPath}/${config.model}`)
    const Model = model.default ? model.default(app.db) : model(app.db)
    app[method](
      app.ladderjs.getUrl(url),
      (req, res, next) =>
        authenticateUrl(config.auth, app.policies)(req, res, next, config),
      processCrud(type, config, crudRoutes, Model)
    )
  })
}
