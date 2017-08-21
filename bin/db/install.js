module.exports = function (verbose, dburl) {
  if (dburl) {
    console.log(dburl)
    process.env.DATABASE_URL = dburl
  } else {
    require('dotenv').config()
  }

  if (verbose) {
    console.log(`Using db url: ${process.env.DATABASE_URL}`)
  }
  // const { Sequelize, User } = require('../../dist/app/models')

  // Sequelize.sync().then(function(){
  //   User.create({
  //     email: 'user@laderjs.io',
  //     role: 'USER',
  //     password: 'ladder',
  //     password_confirmation: 'ladder',
  //   })
  //   .then(function(){
  //     process.exit()
  //   })
  //   .catch(function(){
  //     process.exit()
  //   })
  // })
}
  