import {static as exstatic} from 'express'

export default (app, config) => {
  app.use('/', exstatic(`${process.cwd()}${config.publicPath}`))
  app.use('/styles', [
    exstatic(`${process.cwd()}${config.publicPath}/styles`),
    exstatic(__dirname + '/../../../styles'),
  ])
  app.use('/img', [
    exstatic(`${process.cwd()}${config.publicPath}/img`),
    exstatic(__dirname + '/../../../img'),
  ])
}
