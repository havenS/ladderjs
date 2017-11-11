import ladderjs from 'ladderjs'
import routes from './routes'
import registerModels from './models'

const options = __OPTIONS__

const app = ladderjs({
  ...options,
  routes: routes,
  controllersPath: `${__dirname}/controllers`,
  modelsPath: `${__dirname}/models`,
})

registerModels(app)

app.start()
