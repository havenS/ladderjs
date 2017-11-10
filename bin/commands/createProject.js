#! /usr/bin/env node
var inquirer = require('inquirer'),
  questions = require('../questions'),
  processAnswers = require('../answers')

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

module.exports = function() {
  inquirer.prompt(questions).then(processAnswers)
}
