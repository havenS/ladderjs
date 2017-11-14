export default app => {
  return (req, res, next) => {
    req.ladderjs = {
      ...app.ladderjs,
      generateUrl: app.generateUrl,
    }
    next()
  }
}
