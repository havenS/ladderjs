var Client = require('pg').Client
var fs = require('fs')

var getClient = function(answers, dbName) {
  return new Client({
    host: answers.db_address,
    port: answers.db_port,
    user: answers.db_username,
    password: answers.db_password,
    database: dbName || answers.db_name,
  })
}

var createDb = function(answers) {
  return new Promise(function(resolve) {
    var client = getClient(answers, 'postgres')
    client.connect(function(err) {
      if (err) {
        process.stderr.write(err + '\n')
        resolve()
      }
      client.query('CREATE DATABASE "' + answers.db_name + '"', function(err) {
        if (err) {
          process.stderr.write(err + '\n')
          client.end()
          resolve()
        }
        client.end()
        resolve()
      })
    })
  })
}

var createStructure = function(answers) {
  return new Promise(function(resolve, reject) {
    var client = getClient(answers)
    var structureSql = fs.readFileSync(__dirname + '/../structure.sql', 'utf8')
    var structureQuery = structureSql.replace(
      /__DATABASE_NAME__/g,
      answers.db_name
    )
    client.connect(function(err) {
      if (err) {
        process.stderr.write(err + '\n')
        resolve()
      }
      client.query(structureQuery, function(err) {
        if (err) {
          process.stderr.write(err + '\n')
          client.end()
          reject()
        }
        client.end()
        resolve()
      })
    })
  })
}

module.exports = {
  createDb: createDb,
  createStructure: createStructure,
}
