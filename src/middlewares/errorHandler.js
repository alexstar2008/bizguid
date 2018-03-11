const ApiError = require('../../helpers/ApiError');
const HTTP_STATUS = require('http-status');
const logger = require('../libs/winston');



module.exports = () => (err, req, res) => {
	if (err instanceof ApiError) {
		logger.error(err);
		res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).send(err.message);
		return;
	}
	logger.error(err.message);
	res.status(err.message || HTTP_STATUS.INTERNAL_SERVER_ERROR).send(err.message);
};