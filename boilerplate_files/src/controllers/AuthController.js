import passport from 'passport'
import {User} from '../models'

export const login = (req, res, next) => {
  const returnToField = req.body.returnTo
  const returnToSession = req.session.returnTo
  const returnTo = returnToSession || returnToField || '/'

  delete req.session.returnTo

  passport.authenticate('local', function(err, user) {
    if (err) {
      req.flash('error', 'An error occured, please try again')
      res.redirect(req.ladderjs.getUrl('/login'))
      return
    }

    if (!user) {
      req.flash('error', 'Invalid email or password')
      res.redirect(req.ladderjs.getUrl('/login'))
      return
    }
    req.logIn(user, function(err) {
      if (err) {
        req.flash('error', 'Invalid email or password')
        next(err)
        return
      }

      res.redirect(req.ladderjs.getUrl(returnTo))
      return
    })
  })(req, res, next)
}

export const logout = (req, res) => {
  req.logout()
  const returnTo = req.params.returnTo || '/login'
  res.redirect(req.ladderjs.getUrl(returnTo))
}

export const signup = (req, res) => {
  var email = req.body.email
  var password = req.body.password
  var password_confirmation = req.body.password_confirmation

  if (!email || !password || !password_confirmation) {
    req.flash('error', 'All fields are required')
    return res.redirect(req.ladderjs.getUrl('/create-account'))
  }

  var newUser = {
    email,
    password,
    password_confirmation,
  }

  User.create(newUser)
    .then(function() {
      res.redirect(req.ladderjs.getUrl('/login'))
      passport.authenticate('local', {
        successRedirect: req.ladderjs.getUrl('/manager'),
      })({
        body: {email, password},
      })
    })
    .catch(function(error) {
      let message
      switch (error.name) {
      case 'SequelizeUniqueConstraintError':
        message = 'An account using this email address already exists'
        break
      default:
        message = error.message
        break
      }
      req.flash('error', message)
      res.redirect(req.ladderjs.getUrl('/create-account'))
    })
}
