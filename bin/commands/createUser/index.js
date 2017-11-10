#! /usr/bin/env node
var fs = require('fs')
var path = require('path')
var spawn = require('child_process').spawn
var bcrypt = require('bcrypt')
var moment = require('moment')
var inquirer = require('inquirer')

/**
 * Let you create a new Ladder JS app
 *  Create the database
 *  Configure the new app with your info
 *    - db config
 *    - style: less or sass
 *    - view path
 *    - controller path
 *    - model path
 *    - css framework (materialize or bootstrap)
 *    - authentication model
 *  Copy the structure of a new app
 */

var getFilename = function() {
  return `${moment().format('X')}_create_user.js`
}

module.exports = function() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'email',
        message: 'What is the email of your user ?',
        default: '',
      },
      {
        type: 'input',
        name: 'password',
        message: 'What is the password of your user ?',
        default: '',
      },
      {
        type: 'input',
        name: 'role',
        message: 'What is the role of your user ?',
        default: 'USER',
      },
      {
        type: 'confirm',
        name: 'execute',
        message: 'Do you want to execute the migration',
        default: true,
      },
    ])
    .then(function(answers) {
      // Copy the example migration file
      var data = fs.readFileSync(
        path.join(__dirname, 'migration.example'),
        'utf8'
      )

      var password = bcrypt.hashSync(answers.password, 10)
      // Replace the data
      data = data.replace(/__EMAIL__/g, answers.email)
      data = data.replace(/__PASSWORD__/g, password)
      data = data.replace(/__ROLE__/g, answers.role)

      var migrationPathDir = path.join(process.cwd(), 'migrations')
      var migrationPath = path.join(migrationPathDir, getFilename())
      fs.writeFileSync(migrationPath, data, 'utf8')

      if (answers.execute) {
        // Run the sequelize query
        return new Promise(function(resolve) {
          var migrate = spawn('npm', ['run', 'sequelize', '--', 'db:migrate'], {
            cwd: process.cwd(),
          })
          migrate.on('close', function() {
            process.stdout.write('Your user has successfully been created')
            resolve()
          })
        })
      } else {
        process.stdout.write(
          `The migration file has successfully been created in: \n\n${
            migrationPath
          }\n\nyou can run it when you want by executing:\n`
        )
        process.stdout.write('`npm run sequelize -- db:migrate`\n')
      }
    })
}
