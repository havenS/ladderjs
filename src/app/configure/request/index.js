import handleAssets from './assets'
import decorateLadderjs from './ladderjs'
import debugRoutes from './debugRoutes'
import decorateViewVariables from './viewVariables'

export default app => {
  const {config} = app.ladderjs

  handleAssets(app, config)

  app.use(decorateLadderjs(app))
  app.use(decorateViewVariables(app))

  debugRoutes(app, config)
}
