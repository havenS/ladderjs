import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

export default app => {
  app.use(passport.initialize())
  app.use(passport.session())

  const {models, ladderjs} = app
  const {config} = ladderjs
  const {model, id, username, password} = config.auth

  const AuthModel = models[model]
  const idField = id
  const usernameField = username
  const passwordField = password

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
