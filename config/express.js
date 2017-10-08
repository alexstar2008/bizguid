'use strict';

const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('../routes/index.route');

const app = express();

app.use(logger('combined'));
app.use(helmet());
app.use(cors());

app.use('/api', routes);

module.exports = app;






