const winston = require('winston');
const { format } = winston
const { combine, colorize } = format

const ENV = process.env.NODE_ENV === undefined ? process.env.NODE_ENV = 'development' : process.env.NODE_ENV;

module.exports = function logger(module) {

  var path = module.filename.split('\\').slice(-2).join('/');

  const myConsoleFormat = winston.format.printf(function (info) {
    return `${info.level}: [${path}] - ${info.message} `;
  });
 
  return winston.createLogger({

    transports: [
      new winston.transports.Console({ 
        format: combine(
          colorize({all: true}),
          myConsoleFormat
        ),
        level: ENV == 'development' ? 'debug' : 'error' ,      
      })
    ]
  }) 

}