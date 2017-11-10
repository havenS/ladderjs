/* global __OPTIONS__ */
import ladderjs from 'ladderjs'
import routes from './routes'

const options = __OPTIONS__

const app = ladderjs({
  ...options,
  routes: routes,
  controllersPath: `${__dirname}/controllers`,
  modelsPath: `${__dirname}/models`,
})

app.start()
