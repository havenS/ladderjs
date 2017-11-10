export default (app, config) => {
  const {apiPrefix, controllersPath, modelsPath} = config

  app.ladderjs = {
    apiPrefix: apiPrefix,
    getUrl: url => (apiPrefix ? `${apiPrefix}${url}` : url),
    config: config,
  }
  app.controllersPath = controllersPath
  app.modelsPath = modelsPath
}
