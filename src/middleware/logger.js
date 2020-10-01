const logger = require('./../logger/logger')

function timeLog(req, res, next) {
  logger.log({
    level: 'debug',
    message: `${getRequest(req)} at ${getFormatedTime()} from ${req.user == undefined ? 'anonymous' : req.user.name}`
  });
  next();
}

function getFormatedTime() {
  const date = new Date();
  return `
    ${ f(date.getDate()) }/${ f(date.getMonth()) }/${ f(date.getFullYear()) } ${ f(date.getHours()) }:${ f(date.getMinutes()) }:${ f(date.getMilliseconds()) }
  `;
}

function f(val) {
  return `${val > 9 ? val : '0' + val}`
}

function getRequest(req) {
  return `${req.method}: ${req.protocol + '://' + req.get('host') + req.originalUrl}`;
}

module.exports = timeLog;