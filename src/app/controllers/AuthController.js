import passport from 'passport'
import bcrypt from 'bcrypt'
import { User } from '../models'

export const login = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      req.flash('error', 'An error occured, please try again');
      res.redirect('/login');
      return
    }

    if (!user) {
      req.flash('error', 'Invalid email or password');
      res.redirect('/login');
      return
    }
    req.logIn(user, function(err) {
      if ( err ) {
        req.flash('error', 'Invalid email or password');
        next(err);
        return
      }
      res.redirect(req.session.returnTo || '/manager');
      delete req.session.returnTo
      return
    });
  })(req, res, next)
}

export const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

export const signup = (req, res) => {
  var email = req.body.email
  var password = req.body.password
  var password_confirmation = req.body.password_confirmation
  
  if (!email || !password || !password_confirmation) {
  req.flash('error', "All fields are required")
  return res.redirect('/create-account')
  }
  
  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  
  var newUser = {
  email,
  password,
  password_confirmation
  }
  
  User.create(newUser).then(function() {
    res.redirect('/login')
    passport.authenticate('local', {
      successRedirect: '/manager',
    })({
      body: { email, password }
    })
  }).catch(function(error) {
  let message
  switch(error.name) {
    case 'SequelizeUniqueConstraintError':
      message = 'An account using this email address already exists'
      break
    default:
      message = error.message
      break
  }
  req.flash('error', message)
  res.redirect('/create-account')
  })
}