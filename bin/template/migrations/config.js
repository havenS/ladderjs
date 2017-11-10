require('dotenv').config()

module.exports = {
  url: process.env.DATABASE_URL,
  dialect: process.env.DIALECT,
  operatorsAliases: false,
}
