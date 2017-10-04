const express = require('express')
const bodyParser = require('body-parser')

const addRoutes = require('../router')

module.exports = (app, config) => {
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

  app.use('/img', [
    express.static(`${process.cwd()}${config.publicPath}/img`),
    express.static(__dirname + '/../../../img'),
  ])
  app.use('/', [
    express.static(`${process.cwd()}${config.publicPath}`),
    express.static(__dirname + '/../../..'),
  ])

  app.use((req, res, next) => {
    req.ladderjs = app.ladderjs
    next()
  })

  app.use((req, res, next) => {
    res.locals.messages = {}
    try {
      res.locals.messages.error = req.flash('error')
      res.locals.messages.success = req.flash('success')
    } catch (e) {
      app.error(e)
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
