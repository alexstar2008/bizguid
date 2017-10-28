'use strict';
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const logger = require('./winston');
const routes = require('../routes/index.route');

const app = express();
app.use(helmet());
app.use(cors());

app.use('/api', routes);
app.use((err, req, res) => {
	logger.error(err.message);
	res.status(503).send(err.message);
});

module.exports = app;






