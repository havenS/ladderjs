var postgres = require('./language/postgres')

var createDb = function(answers) {
  return postgres
    .createDb(answers)
    .then(function() {
      return postgres.createStructure(answers)
    })
    .catch(function() {
      process.stdout.write(
        'ERROR: an error occured while creating and populating the database. Maybe a database with the same name already exists. \n\n'
      )
    })
}

module.exports = {
  createDb: createDb,
}
