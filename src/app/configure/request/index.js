import handleAssets from './assets'
import decorateLadderjs from './ladderjs'
import parsers from './parsers'
import debugRoutes from './debugRoutes'
import decorateViewVariables from './viewVariables'

export default app => {
  const {config} = app.ladderjs

  handleAssets(app, config)

  app.use(parsers)
  app.use(decorateLadderjs(app))
  app.use(decorateViewVariables)

  debugRoutes(app, config)
}
