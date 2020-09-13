const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
else {
  // - Write all logs with level `info` and below to `combined.log`
  logger.add(new winston.transports.File({ filename: 'combined.log' }));
}

module.exports = logger;