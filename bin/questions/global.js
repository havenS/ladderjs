var validate = require('validate-npm-package-name')

module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of your app ?',
    default: 'my-ladderjs-app',
    validate: function(input) {
      var validation = validate(input)
      return validation.validForNewPackages
        ? true
        : validation.errors.join(', ')
    },
  },
  {
    type: 'input',
    name: 'port',
    message: 'On which port do you want your app to run ?',
    default: '3000',
  },
  {
    type: 'confirm',
    name: 'env',
    message: 'Do you want to you use .env file (recommended) ?',
    default: true,
  },
]
