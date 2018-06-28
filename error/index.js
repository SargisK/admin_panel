var util = require('util');
var http = require('http');

function HttpError(statusNum, message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError);

  this.status = statusNum;
  this.message = message || http.STATUS_CODES[statusNum] || 'Error';
}

util.inherits(HttpError, Error);

HttpError.prototype.name = 'HttpError';

module.exports = HttpError;