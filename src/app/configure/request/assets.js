import {static as exstatic} from 'express'

export default (app, config) => {
  app.use('/', [
    exstatic(`${process.cwd()}${config.publicPath}`),
    exstatic(__dirname + '/../../..'),
  ])
  app.use('/img', [
    exstatic(`${process.cwd()}${config.publicPath}/img`),
    exstatic(__dirname + '/../../../img'),
  ])
}
