const winston = require('winston');
const fs = require( 'fs' );
const path = require('path');
require('winston-daily-rotate-file');

const homeLevel = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    verbose: 4
  },
  colors: {
    error: 'red',
    warn: 'magenta',
    info: 'yellow',
    debug: 'grey',
    verbose: 'blue'
  }
};

const transport = new winston.transports.DailyRotateFile({
  filename: path.join('logs', "%DATE%.log"),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'verbose',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ), 
});

transport.on('rotate', function(oldFilename, newFilename) {
  // file rotate
});

const logger = winston.createLogger({
  levels: homeLevel.levels,
  transports: [
    transport,
    new winston.transports.Console({ 
      level: 'info', 
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()),
    }),
    new winston.transports.File({ 
      filename: path.join('logs', "error.log"),
      level: 'warn',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ), 
    })
  ]
});

winston.addColors(homeLevel.colors);

module.exports = logger;