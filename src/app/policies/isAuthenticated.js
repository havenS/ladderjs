export default (req, res, next) => {
  if (req.isAuthenticated())
    return next()

  req.session.returnTo = req.path
  req.flash('error', 'You have to be logged in to access the page.')
  res.redirect('/login')
}
