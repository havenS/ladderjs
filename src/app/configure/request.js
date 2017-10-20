import {static as exstatic} from 'express'
import bodyParser from 'body-parser'

import addRoutes from '../router'

export default app => {
  const {config} = app.ladderjs
  app.use(
    bodyParser.json({
      strict: false,
    })
  )
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

  app.use('/', [
    exstatic(`${process.cwd()}${config.publicPath}`),
    exstatic(__dirname + '/../../..'),
  ])
  app.use('/img', [
    exstatic(`${process.cwd()}${config.publicPath}/img`),
    exstatic(__dirname + '/../../../img'),
  ])

  app.use((req, res, next) => {
    req.ladderjs = app.ladderjs
    next()
  })

  app.use((req, res, next) => {
    res.locals.messages = {
      error: [],
      success: [],
    }
    try {
      res.locals.messages.error = req.flash('error')
      res.locals.messages.success = req.flash('success')
    } catch (e) {
      app.logger.error(e)
    }
    res.locals.user = req.user
    res.locals.currentUrl = req.originalUrl
    res.locals.getUrl = req.ladderjs.getUrl

    next()
  })

  addRoutes(app)

  app.use((req, res) => {
    res.status(404).render('404')
  })
  app.use((err, req, res) => {
    app.logger.error(err)
    res.status(500).render('500')
  })

  if (config.debugRoutes) {
    const debugRoutes = app._router.stack
      .filter(r => r.route)
      .map(
        r =>
          `${Object.keys(r.route.methods).map(m => `${m.toUpperCase()} - `)}${r
            .route.path}`
      )
    app.logger.info(debugRoutes)
  }
}
