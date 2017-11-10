var helpers = require('./helpers')

module.exports = function(answers) {
  return new Promise(function(resolve) {
    if (!answers.db_use || !answers.db_create) {
      resolve()
    }

    helpers.createDb(answers).then(resolve)
  })
}
