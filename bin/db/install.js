module.exports = function () {
  require('dotenv').config()
  const { Sequelize, User } = require('../../dist/app/models')

  Sequelize.sync().then(function(){
    User.create({
      email: 'user@laderjs.io',
      role: 'USER',
      password: 'ladder',
      password_confirmation: 'ladder',
    })
    .then(function(){
      process.exit()
    })
    .catch(function(){
      process.exit()
    })
  })
}
  