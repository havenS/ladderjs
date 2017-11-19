import bodyParser from 'body-parser'
export default app => {
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  )
  app.use(bodyParser.json({strict: false}))
}
