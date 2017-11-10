import UserModel from './User.js'

export default app => {
  app.registerModel((db, done) => {
    UserModel(db)

    done()
  })
}
