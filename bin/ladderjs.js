#! /usr/bin/env node
var program = require('commander')
var createProject = require('./commands/createProject')
var createUser = require('./commands/createUser')
var ladder = require('../package.json')

require('dotenv').config({path: process.cwd() + '/.env'})

program
  .version(ladder.version)
  .option('-c, --create', 'Create a new app')
  .option(
    '-u, --new-user',
    'Create a new user migration and execute it if you want to'
  )
  .parse(process.argv)

// TO ADD
// create user with role
// create route
// create model (sequelize)
if (program.create) {
  createProject()
} else if (program.newUser) {
  if (!process.env.DATABASE_URL) {
    process.stdout.write(
      '.env file and database config cannot be found, are you sure you’re running the CLI inside your LadderJS project folder ?'
    )
    process.exit()
  } else {
    createUser()
  }
} else {
  process.stdout.write(
    'You didn’t provide any argument, to view the list of available options type `ladderjs-cli -h`'
  )
}
