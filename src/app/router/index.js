import {getRoutes} from './config/shared'
import {processCrudRoute} from './config/crud'
import {processRoute} from './config/regular'

export default app => {
  getRoutes(app).forEach(
    config =>
      config.crud ? processCrudRoute(app, config) : processRoute(app, config)
  )

  return app
}
