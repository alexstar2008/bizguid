'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const responseTime = require('response-time');
const logger = require('../src/libs/winston');
const bodyParder = require('body-parser');
const routes = require('../src/routes/index.route');
const ApiError = require('../helpers/ApiError');

const HTTPstatus = require('http-status');
const app = express();

app.use(helmet());
app.use(bodyParder.json());
app.use(cors({ exposedHeaders: ['X-Response-Time', 'X-Total-Count'] }));
app.use(compression());
app.use(responseTime());

app.use('/api', routes);
app.use((err, req, res, next) => {
	if (err instanceof ApiError) {
		logger.error(err);
		res.status(err.status || HTTPstatus.INTERNAL_SERVER_ERROR).send(err.message);
		return;
	}
	logger.error(err.message);
	res.status(err.message || HTTPstatus.INTERNAL_SERVER_ERROR).send(err.message);
});

module.exports = app;






