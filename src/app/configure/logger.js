import winston from 'winston'

let logger = new winston.Logger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp() {
        const d = new Date()
        return d.toISOString()
      },
    }),
    new winston.transports.File({
      filename: `${process.cwd()}/ladderjs.log`,
      maxsize: 5242880,
    }),
  ],
})

export const configureLogger = app => {
  logger.level = app.ladderjs.config.loggerLevel || logger.level
  app.logger = logger
  // app.logger = console
}

export default logger
