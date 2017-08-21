const winston = require('winston')

module.exports = (app, config) => {
  const logger = new winston.Logger({
    level: config.loggerLevel || 'info',
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp() {
          const d = new Date();
          return d.toISOString();
        },
      }),
      new winston.transports.File({
        filename: `${process.cwd()}/ladderjs.log`,
        maxsize: 5242880,
      }),
    ],
  });
  app.logger = logger
}
