module.exports = [
  {
    type: 'confirm',
    name: 'db_use',
    message: 'Will you use a database (only PostgreSQL at the moment) ?',
    default: true,
  },
  {
    type: 'input',
    name: 'db_address',
    message: 'What is the address of your database server ?',
    default: '127.0.0.1',
    when: function(answers) {
      return answers.db_use
    },
  },
  {
    type: 'input',
    name: 'db_port',
    message: 'What is the port used by that database server ?',
    default: '5432',
  },
  {
    type: 'input',
    name: 'db_username',
    message: 'What is the username of your database ?',
    default: function() {
      return require('os').userInfo().username
    },
    when: function(answers) {
      return answers.db_use
    },
  },
  {
    type: 'input',
    name: 'db_password',
    message: 'What is the password for that username ?',
    when: function(answers) {
      return answers.db_use
    },
  },
  {
    type: 'input',
    name: 'db_name',
    message: 'What should be the name of the LadderJS database ?',
    default: function(answers) {
      return answers.name
    },
    when: function(answers) {
      return answers.db_use
    },
  },
  {
    type: 'confirm',
    name: 'db_logging',
    message: 'Do you want to enable the database logging (logs all requests) ?',
    default: false,
    when: function(answers) {
      return answers.db_use
    },
  },
  {
    type: 'confirm',
    name: 'db_create',
    message: 'Do you want us to try to create it ?',
    when: function(answers) {
      return answers.db_use
    },
  },
]
