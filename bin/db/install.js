module.exports = function (verbose, dburl) {
  if (dburl) {
    process.env.DATABASE_URL = dburl
  } else {
    require('dotenv').config()
  }

  if (verbose) {
    console.log(`Using db url: ${process.env.DATABASE_URL}`)
  }

  const { Sequelize, User } = require('../../dist/app/models')

  Sequelize.sync().then(function(){
    User.create({
      email: 'user@ladderjs.io',
      role: 'USER',
      password: 'ladderjs',
      password_confirmation: 'ladderjs',
    })
    .then(function(){
      process.exit()
    })
    .catch(function(){
      process.exit()
    })
  })
}
  