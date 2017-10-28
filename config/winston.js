'use strict';
const winston = require('winston');
const {combine, timestamp, printf} = winston.format;

const logFormat = printf(info => {
	return `${info.timestamp}|${info.level}: ${info.message}`;
});
const logger = winston.createLogger({
	level: 'info',
	format: combine(timestamp(), logFormat),
	transports: [
		new winston.transports.File({filename: './log/server.log'}),
		new winston.transports.Console({colorize: true})
	]
});

module.exports = logger;