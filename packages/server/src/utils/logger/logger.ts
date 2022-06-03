import winston from 'winston';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

// TODO: Log rotation
const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  levels: logLevels,

  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    myFormat
  ),
  transports: [
    new winston.transports.File({
      filename: `${process.cwd()}/logs/error.log`,
      level: 'warn',
      maxsize: 5242880,
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
    })
  );
  logger.add(
    new winston.transports.File({
      filename: `${process.cwd()}/logs/debug.log`,
      level: 'debug',
      maxsize: 5242880,
    })
  );
}
