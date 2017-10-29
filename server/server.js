'use strict';

const app = require('../config/express');
const {port} = require('../config/config').serverSettings;

const start = () => {
	return new Promise((resolve, reject) => {
		if (!port) {
			reject('[Server]:ERROR start');
		}

		app.listen(port, (err) => {
			if (err)
				reject('[Server]:ERROR start');
			resolve(`[Server]:started at port ${port}`);
		});
	});
};

module.exports = {start};





