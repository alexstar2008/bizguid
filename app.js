'use strict';


const express = require('express');
const fs = require('fs');
//
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


app.listen(port, (err) => {
	if (err) {
		logger.err('[Server]:ERROR start' + err);
	}
	logger.info(`[Server]:started at port ${port}`);
});



