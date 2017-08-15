import UserModel from './User.js'

const connection = require('../sequelize.js')

const user = UserModel(connection)

export const User = user

export const Sequelize = connection
