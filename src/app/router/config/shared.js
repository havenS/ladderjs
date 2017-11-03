import * as defaultPolicies from '../../policies'
import appRoutes from '../routes'

export const getRoutes = app => [
  ...appRoutes.filter(
    route => !app.ladderjs.config.disabledRoutes.includes(route.url)
  ),
  ...(app.routesToAdd || []),
]

export const authenticateUrl = (auth, appPolicies) => {
  if (!auth) {
    return (req, res, next) => next()
  }
  const policies = {
    ...defaultPolicies,
    ...appPolicies,
  }

  return policies[auth]
}

export const respond = (res, data, error = null) => {
  res.setHeader('Content-Type', 'application/json')
  res.status(error ? 400 : 200)
  res.send(
    JSON.stringify({
      error,
      data: data || {},
    })
  )
}

export const getView = (view, url, crudType) => {
  if (view) {
    return crudType ? `${view}/${crudType}` : view
  }

  return crudType ? `crud/${crudType}` : url.replace('/', '')
}
