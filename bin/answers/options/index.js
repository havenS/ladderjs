var helpers = require('./helpers')

/**
  db_use: true,
  db_address: '127.0.0.1',
  db_port: '5432',
  db_username: 'julienfournier',
  db_password: '',
  db_name: 'ladderjs',
  db_create: true
 */
module.exports = function(dest, answers) {
  var envConfig = {}
  return new Promise(function(resolve) {
    if (answers.env) {
      if (answers.db_use) {
        envConfig.DATABASE_DIALECT = 'postgresql'
        envConfig.DATABASE_URL = helpers.getConnectionString(answers)
        envConfig.DATABASE_LOGGING = answers.db_logging
      }
      envConfig.PORT = answers.port

      helpers.saveToEnvFile(dest, envConfig)
      helpers.saveToConfigObject(dest, {})
    } else {
      if (answers.db_use) {
        envConfig.db_url = helpers.getConnectionString(answers)
        envConfig.db_logging = answers.db_logging
      }
      envConfig.port = answers.port

      helpers.saveToConfigObject(dest, envConfig)
    }
    resolve()
  })
}
