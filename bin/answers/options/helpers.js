var fs = require('fs')

var getConnectionString = function(answers) {
  var auth =
    answers.password && answers.password !== ''
      ? [answers.db_username, answers.password].join(':')
      : answers.db_username

  return [
    'postgres://',
    auth,
    '@',
    answers.db_address,
    ':',
    answers.db_port,
    '/',
    answers.db_name,
  ].join('')
}

var saveToEnvFile = function(dest, config) {
  var configEnv = Object.keys(config).reduce(function(string, key) {
    string += key + '=' + config[key] + '\n'
    return string
  }, '')
  fs.writeFileSync(dest + '/.env', configEnv, {encoding: 'utf8', flag: 'w'})
}

var saveToConfigObject = function(dest, config) {
  var indexFile = dest + '/src/index.js'

  var data = fs.readFileSync(indexFile, 'utf8')

  var modifiedIndexFile = data.replace(/__OPTIONS__/g, JSON.stringify(config))

  fs.writeFileSync(indexFile, modifiedIndexFile, 'utf8')
}

module.exports = {
  getConnectionString: getConnectionString,
  saveToEnvFile: saveToEnvFile,
  saveToConfigObject: saveToConfigObject,
}
