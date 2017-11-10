/**
  name
  port
  env
 */
var spawn = require('child_process').spawn
var cpr = require('cpr')
var fs = require('fs')

var deps = ['ladderjs', 'sequelize-cli']
var devDeps = [
  'babel-cli',
  'babel-plugin-transform-export-extensions',
  'babel-plugin-transform-runtime',
  'babel-preset-es2015',
  'babel-preset-stage-2',
  'nodemon',
]

var installDep = function(dest, dep, dev) {
  return new Promise(function(resolve) {
    process.stdout.write('.')
    var install = spawn(
      'npm',
      ['install', '--save' + (dev ? '-dev' : ''), dep],
      {cwd: dest}
    )
    install.on('close', function() {
      process.stdout.write('.')
      resolve()
    })
  })
}

var createProject = function(dir, answers) {
  var name = answers.name

  process.stdout.write('Creating project ')
  return new Promise(function(resolve) {
    // Copy template folder to app name
    var source = __dirname + '/../../template'

    var packageJSON = dir + '/package.json'

    cpr(source, dir, function() {
      process.stdout.write('.')

      // change app name in package.json
      var data = fs.readFileSync(packageJSON, 'utf8')
      process.stdout.write('.')

      var result = data.replace(/__PROJECT_NAME__/g, name)

      fs.writeFileSync(packageJSON, result, 'utf8')
      process.stdout.write('.')

      // add ladderjs dep
      process.stdout.write(
        '\nInstallings project deps (this can take some times) \n'
      )

      var depInstall = deps.map(function(dep) {
        return installDep.bind(this, dir, dep, false)
      })
      var devDepInstall = devDeps.map(function(dep) {
        return installDep.bind(this, dir, dep, true)
      })

      var installs = []
        .concat(depInstall)
        .concat(devDepInstall)
        .reduce(function(promise, func) {
          return promise.then(function(result) {
            return func().then(Array.prototype.concat.bind(result))
          })
        }, Promise.resolve([]))

      return installs.then(function() {
        // Add config in answers in env or config object
        process.stdout.write('\n\n')
        resolve()
      })
    })
  })
}

module.exports = {
  createProject: createProject,
}
