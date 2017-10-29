const HTTPstatus = require('http-status');


class ApiError extends Error{
	constructor(msg,status = HTTPstatus.INTERNAL_SERVER_ERROR){
		super(msg);
		this.status = status;
		Error.captureStackTrace(this, ApiError);
	}
}

module.exports = ApiError;