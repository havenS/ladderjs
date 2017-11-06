export default (req, res, next) => {
  res.locals = {
    ...res.locals,
    messages: {
      error: req.flash('error'),
      success: req.flash('success'),
    },
    user: req.user,
    currentUrl: req.originalUrl,
    getUrl: req.ladderjs.getUrl,
  }

  next()
}