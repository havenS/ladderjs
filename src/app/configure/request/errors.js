export default app => {
  app.use((req, res) => {
    res.status(404).render('404')
  })
  app.use((err, req, res) => {
    app.logger.error(err)
    res.status(500).render('500')
  })
}
