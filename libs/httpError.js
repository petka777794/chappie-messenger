function httpError(status, message) {
  this.name = "HttpError";

  this.status = status || 500;
  this.message = message || 'There is some troubles =(';

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, httpError);
  } else {
    this.stack = (new Error()).stack;
  }
  
  Error.call(this, this.status, this.message);
}


module.exports = httpError;