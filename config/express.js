'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const responseTime = require('response-time');
const logger = require('./winston');
const routes = require('../routes/index.route');

const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(responseTime());
// X-Response-Time

app.use('/api', routes);
// app.use((err, req, res) => {
// 	if(err && err.message){
// 		logger.error(err.message);
// 		res.status(503).send(err.message);
// 	}
// });

module.exports = app;






