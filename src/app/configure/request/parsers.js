import bodyParser from 'body-parser'

export default [
  bodyParser.json({
    strict: false,
  }),
  bodyParser.urlencoded({
    extended: false,
  }),
]
