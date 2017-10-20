import Sequelize from 'sequelize'
let sequelize = {}

export const configureDb = app => {
  sequelize = new Sequelize(app.ladderjs.config.dbUrl, {
    logging: app.ladderjs.config.dbLoggin === 'true' ? app.logger.info : false,
  })
  app.db = sequelize
}

export default sequelize
