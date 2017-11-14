export default app => (req, res, next) => {
  res.locals = {
    ...res.locals,
    messages: {
      error: req.flash('error'),
      success: req.flash('success'),
    },
    user: req.user,
    currentUrl: req.originalUrl,
    generateUrl: app.generateUrl,
  }

  next()
}
