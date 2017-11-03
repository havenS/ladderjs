import Sequelize from 'sequelize'

export default app => {
  const {ladderjs} = app

  const db = new Sequelize(ladderjs.config.dbUrl, {
    logging: ladderjs.config.dbLogging === 'true' ? app.logger.info : false,
    operatorsAliases: ladderjs.config.sequelizeOperatorsAliases,
  })
  app.db = db
  app.models = {}
  app.registerModel = function(registration) {
    registration(this.db, () => {
      app.models = this.db.models
    })
  }
}
