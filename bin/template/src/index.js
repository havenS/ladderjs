/* global __OPTIONS__ */
import ladderjs from 'ladderjs'
import routes from './routes'

const options = __OPTIONS__
options.routes = routes

const app = ladderjs(options)

app.start()
