export const indexEntity = async (req, res, Model, logger) => {
  logger.info('CRUD - index')
  const entities = await Model.findAll()
  
  return {
    entities,
  }
}

export const newEntity = () => ({})
export const createEntity = (req, res, Model, logger) => {
  logger.info('CRUD - create')

}
export const viewEntity = (req, res, Model, logger) => {
  logger.info('CRUD - view')

}
export const updateEntity = (req, res, Model, logger) => {
  logger.info('CRUD - update')

}
export const deleteEntity = (req, res, Model, logger) => {
  logger.info('CRUD - delete')

}
