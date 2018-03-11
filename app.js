const db = require('./src/libs/db');
const server = require('./server/server.js');
const cron = require('./src/libs/cron');

db.connect().then((msg) => {
	console.log(msg);
	server.start().then((msg) => {
		console.log(msg);
		cron.start();
	}).catch(err => console.log(err));
}).catch(err => console.log(err));