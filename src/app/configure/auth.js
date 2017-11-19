import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

const getAuthVariables = app => {
  const {models, ladderjs} = app
  const {config} = ladderjs
  const {model, id, username, password} = config.auth
  const AuthModel = typeof model === 'string' ? models[model] : model

  return {
    id,
    username,
    password,
    AuthModel,
  }
}

export default app => {
  const {id, username, password, AuthModel} = getAuthVariables(app)
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
    const {AuthModel} = getAuthVariables(app)
    AuthModel.findById(id).then(function(user) {
      done(null, user)
    })
  })

  app.login = (...args) => (req, res, next) =>
    passport.authenticate('local', ...args)(req, res, next)

  app.use(passport.initialize())
  app.use(passport.session())
}
