import {app} from 'ladderjs'

export const login = (req, res, next) => {
  const returnToField = req.body.returnTo
  const returnToSession = req.session.returnTo
  const returnTo = returnToSession || returnToField || '/'

  delete req.session.returnTo
  app.login((err, user) => {
    if (err) {
      req.flash('error', 'An error occured, please try again')
      res.redirect(app.generateUrl('/login'))
      return
    }

    if (!user) {
      req.flash('error', 'Invalid email or password')
      res.redirect(app.generateUrl('/login'))
      return
    }
    req.logIn(user, err => {
      if (err) {
        req.flash('error', 'Invalid email or password')
        next(err)
        return
      }

      res.redirect(app.generateUrl(returnTo))
      return
    })
  })(req, res, next)
}

export const logout = (req, res) => {
  req.logout()
  const returnTo = req.params.returnTo || '/login'
  res.redirect(app.generateUrl(returnTo))
}

export const signup = (req, res) => {
  var email = req.body.email
  var password = req.body.password
  var password_confirmation = req.body.password_confirmation

  if (!email || !password || !password_confirmation) {
    req.flash('error', 'All fields are required')
    return res.redirect(app.generateUrl('/create-account'))
  }

  var newUser = {
    email,
    password,
    password_confirmation,
  }

  app.AuthModel.create(newUser)
    .then(() => {
      // res.redirect(app.generateUrl('/login'))
      app.login({
        successRedirect: app.generateUrl('/manager'),
      })({
        body: {email, password},
      })
    })
    .catch(error => {
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
      res.redirect(app.generateUrl('/create-account'))
    })
}
