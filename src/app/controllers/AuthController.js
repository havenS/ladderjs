import passport from 'passport'
import bcrypt from 'bcrypt'
import { User } from '../models'

export const login = passport.authenticate('local', {
  successRedirect: '/manager',
  failureRedirect: '/login',
  failureFlash: true,
})

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