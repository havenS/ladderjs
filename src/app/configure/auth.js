import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

import {User} from '../models'

export default app => {
  app.use(passport.initialize())
  app.use(passport.session())

  const AuthModel = app.auth && app.auth.model ? app.auth.model : User
  const idField = app.auth && app.auth.id ? app.auth.id : 'id'
  const usernameField =
    app.auth && app.auth.username ? app.auth.username : 'email'
  const passwordField =
    app.auth && app.auth.password ? app.auth.password : 'password'

  passport.use(
    new LocalStrategy(
      {
        usernameField,
        passwordField,
      },
      function(username, password, done) {
        AuthModel.findOne({
          where: {
            [usernameField]: username,
          },
        }).then(function(user) {
          if (user == null) {
            return done(null, false, {message: 'Incorrect credentials'})
          }

          if (user.authenticate(password)) {
            return done(null, user)
          }

          return done(null, false, {message: 'Incorrect credentials.'})
        })
      }
    )
  )

  passport.serializeUser(function(user, done) {
    done(null, user[idField])
  })

  passport.deserializeUser(function(id, done) {
    AuthModel.findOne({
      where: {
        [idField]: id,
      },
    }).then(function(user) {
      done(null, user)
    })
  })
}
