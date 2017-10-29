'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const responseTime = require('response-time');
const logger = require('./winston');
const routes = require('../routes/index.route');
const ApiError = require('../helpers/ApiError');

const HTTPstatus = require('http-status');
const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(responseTime());

app.use('/api', routes);
app.use((err, req, res, next) => {
	if(err instanceof ApiError){
		logger.error(err);
		res.status(err.status || HTTPstatus.INTERNAL_SERVER_ERROR).send(err.message);
		return;
	}
	logger.error(err.message);
	res.status(err.message || HTTPstatus.INTERNAL_SERVER_ERROR).send(err.message);
});

module.exports = app;






