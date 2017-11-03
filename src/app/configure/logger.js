import winston from 'winston'

export default app => {
  const logger = new winston.Logger({
    level: app.ladderjs.config.loggerLevel,
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

  app.logger = logger
}
