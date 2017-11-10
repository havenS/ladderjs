var processGlobal = require('./global')
var processDatabase = require('./database')
var processOptions = require('./options')

module.exports = function(answers) {
  var dir = process.cwd() + '/' + answers.name

  return [
    processGlobal.bind(this, dir, answers),
    processDatabase.bind(this, answers),
    processOptions.bind(this, dir, answers),
  ]
    .reduce(function(promise, func) {
      return promise.then(function(result) {
        return func().then(Array.prototype.concat.bind(result))
      })
    }, Promise.resolve([]))
    .then(function() {
      process.stdout.write('You can now run you app by executing:\n')
      process.stdout.write('$ cd ' + answers.name + ' && npm run dev\n')
    })
}
