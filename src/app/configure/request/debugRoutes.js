export default (app, config) => {
  if (config.debugRoutes) {
    const debugRoutes = app._router.stack
      .filter(r => r.route)
      .map(
        r =>
          `${Object.keys(r.route.methods).map(m => `${m.toUpperCase()} - `)}${r
            .route.path}`
      )
    app.logger.info(debugRoutes)
  }
}
