'use strict';


const express = require('express');
const fs = require('fs');
const HTTP_STATUS = require('http-status');
//
const ApiError = require('./helpers/ApiError');

const { serverSettings: { port } } = require('./config');
const logger = require('./src/libs/winston');
const db = require('./src/libs/db');
// const cron = require('./src/libs/cron');
const routes = require('./src/index.route');

const app = express();

const middlewares = fs.readdirSync(`${__dirname}/src/middlewares`);
middlewares.forEach(middleware => app.use(require(`./src/middlewares/${middleware}`)()));

db.connect().catch(err => console.log(err));
app.use('/api', routes);
app.use((err, req, res) => {
	if (err instanceof ApiError) {
		// logger.error(err);
		res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).send(err.message);
		return;
	}
	// logger.error(err.message);
	res.status(err.message || HTTP_STATUS.INTERNAL_SERVER_ERROR).send(err.message);
});

app.listen(port, (err) => {
	if (err) {
		logger.err('[Server]:ERROR start' + err);
	}
	logger.info(`[Server]:started at port ${port}`);
});



