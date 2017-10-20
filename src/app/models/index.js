import UserModel from './User.js'

let user

export const configureModels = app => {
  user = UserModel(app.db)
}

export const User = user
